import type { Express, RequestHandler } from "express";
import crypto from "crypto";
import { z } from "zod";
import { and, asc, desc, eq, inArray, isNull, or } from "drizzle-orm";
import { db } from "./db";
import { clients, clientProjects, clientMeetings, leads, meetingAgreements } from "@shared/schema";
import { emailShell, escapeHtml, parseId, PORTAL_BASE_URL, requirePortalClient, sendEmail } from "./portal";

/**
 * Bitácora de reuniones.
 *
 * Entrada: Fathom (grabadora de reuniones de Meet, Zoom y Teams) envía un webhook cuando termina
 * de procesar una reunión. También se pueden ingresar reuniones a mano.
 * Regla clave: nada de lo que genera la IA llega al cliente sin que el arquitecto lo revise y lo publique.
 */

const FATHOM_SECRET = process.env.FATHOM_WEBHOOK_SECRET || "";

// ---------- verificación de firma (Standard Webhooks, el formato que usa Fathom) ----------

function verifyFathomSignature(headers: Record<string, unknown>, rawBody: Buffer): boolean {
  if (!FATHOM_SECRET.startsWith("whsec_")) return false;
  const id = String(headers["webhook-id"] ?? "");
  const ts = String(headers["webhook-timestamp"] ?? "");
  const sigHeader = String(headers["webhook-signature"] ?? "");
  if (!id || !ts || !sigHeader) return false;
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false; // evita reenvíos de mensajes antiguos

  const key = Buffer.from(FATHOM_SECRET.slice("whsec_".length), "base64");
  const expected = crypto.createHmac("sha256", key).update(`${id}.${ts}.${rawBody.toString("utf8")}`).digest();
  return sigHeader.split(" ").some((part) => {
    const got = Buffer.from(part.split(",").slice(1).join(","), "base64");
    return got.length === expected.length && crypto.timingSafeEqual(got, expected);
  });
}

// ---------- payload de Fathom (solo los campos que usamos) ----------

const fathomMeeting = z.object({
  recording_id: z.union([z.number(), z.string()]),
  title: z.string().optional(),
  meeting_title: z.string().nullable().optional(),
  meeting_url: z.string().nullable().optional(),
  share_url: z.string().optional(),
  recording_start_time: z.string().optional(),
  scheduled_start_time: z.string().optional(),
  created_at: z.string().optional(),
  calendar_invitees: z
    .array(z.object({ name: z.string().nullable().optional(), email: z.string().nullable().optional(), is_external: z.boolean().optional() }))
    .default([]),
  recorded_by: z.object({ email: z.string().optional() }).optional(),
  default_summary: z.object({ markdown_formatted: z.string().nullable().optional() }).nullable().optional(),
  transcript: z
    .array(z.object({ speaker: z.object({ display_name: z.string().nullable().optional() }).optional(), text: z.string(), timestamp: z.string().optional() }))
    .nullable()
    .optional(),
  action_items: z
    .array(z.object({ description: z.string(), assignee: z.object({ email: z.string().nullable().optional() }).nullable().optional() }))
    .nullable()
    .optional(),
});

function detectPlatform(url?: string | null): string | null {
  if (!url) return null;
  if (url.includes("meet.google.com")) return "meet";
  if (url.includes("zoom.us")) return "zoom";
  if (url.includes("teams.microsoft.com") || url.includes("teams.live.com")) return "teams";
  return "otra";
}

const lower = (v?: string | null) => (v ? v.trim().toLowerCase() : "");

// ---------- validaciones ----------

const meetingPatch = z.object({
  title: z.string().min(2).optional(),
  heldAt: z.coerce.date().optional(),
  platform: z.string().optional(),
  clientId: z.number().int().nullable().optional(),
  projectId: z.number().int().nullable().optional(),
  leadId: z.number().int().nullable().optional(),
  minuteText: z.string().max(20000).optional(),
});

const manualMeeting = z.object({
  title: z.string().min(2),
  heldAt: z.coerce.date(),
  platform: z.string().optional(),
  clientId: z.number().int().optional(),
  projectId: z.number().int().optional(),
  leadId: z.number().int().optional(),
  minuteText: z.string().max(20000).optional(),
});

const agreementInput = z.object({
  description: z.string().min(3).max(500),
  owner: z.enum(["architect", "client"]).default("architect"),
  dueDate: z.coerce.date().nullable().optional(),
});

export function registerMeetingRoutes(app: Express, isAdmin: RequestHandler) {
  // ===== Entrada desde Fathom =====
  // Ruta bajo /api/webhooks: ya recibe el cuerpo sin procesar (rawBody) y no exige token CSRF
  app.post("/api/webhooks/fathom", async (req, res) => {
    const raw: Buffer | undefined = (req as any).rawBody;
    if (!raw || !verifyFathomSignature(req.headers, raw)) {
      return res.status(401).json({ error: "Firma inválida" });
    }
    const parsed = fathomMeeting.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Payload inesperado" });
    const m = parsed.data;

    try {
      const externalId = `fathom:${m.recording_id}`;
      const [existing] = await db.select({ id: clientMeetings.id }).from(clientMeetings).where(eq(clientMeetings.externalId, externalId)).limit(1);
      if (existing) return res.json({ ok: true, duplicate: true }); // Fathom puede reenviar: no se duplica

      // Asignación automática por el correo de quien asistió desde afuera
      const emails = m.calendar_invitees.filter((i) => i.email && i.is_external !== false).map((i) => lower(i.email));
      let kind: "client" | "lead" | "other" = "other";
      let clientId: number | null = null;
      let projectId: number | null = null;
      let leadId: number | null = null;

      if (emails.length) {
        const [client] = await db.select().from(clients).where(inArray(clients.email, emails)).limit(1);
        if (client) {
          kind = "client";
          clientId = client.id;
          const [project] = await db
            .select({ id: clientProjects.id })
            .from(clientProjects)
            .where(eq(clientProjects.clientId, client.id))
            .orderBy(desc(clientProjects.createdAt))
            .limit(1);
          projectId = project?.id ?? null;
        } else {
          const [lead] = await db.select({ id: leads.id }).from(leads).where(inArray(leads.email, emails)).orderBy(desc(leads.createdAt)).limit(1);
          if (lead) {
            kind = "lead";
            leadId = lead.id;
          }
        }
      }

      const transcript = m.transcript?.length
        ? m.transcript.map((t) => `${t.timestamp ?? ""} ${t.speaker?.display_name ?? "?"}: ${t.text}`.trim()).join("\n")
        : null;
      const summary = m.default_summary?.markdown_formatted ?? null;

      const [meeting] = await db
        .insert(clientMeetings)
        .values({
          kind,
          clientId,
          projectId,
          leadId,
          title: m.meeting_title || m.title || "Reunión",
          heldAt: new Date(m.recording_start_time || m.scheduled_start_time || m.created_at || Date.now()),
          platform: detectPlatform(m.meeting_url),
          source: "fathom",
          externalId,
          recordingUrl: m.share_url ?? null,
          attendees: m.calendar_invitees.map((i) => ({ name: i.name ?? null, email: i.email ?? null, external: i.is_external ?? null })),
          summary,
          transcript,
          minuteText: summary, // punto de partida para que el arquitecto lo revise y edite
        })
        .returning();

      // Acuerdos propuestos a partir de las tareas que detecta Fathom (se revisan antes de publicar)
      const recorder = lower(m.recorded_by?.email);
      if (m.action_items?.length) {
        await db.insert(meetingAgreements).values(
          m.action_items.map((a) => {
            const who = lower(a.assignee?.email);
            return { meetingId: meeting.id, description: a.description.slice(0, 500), owner: who && who !== recorder && emails.includes(who) ? "client" : "architect" };
          }),
        );
      }

      // Aviso al arquitecto: hay una reunión lista para revisar
      sendEmail(
        process.env.PORTAL_NOTIFY_EMAIL || "contacto@arquitectochile.com",
        `Reunión lista para revisar: ${meeting.title}`,
        emailShell(`<p>Fathom terminó de procesar <b>${escapeHtml(meeting.title)}</b>.</p>
          <p>${kind === "other" ? "No pude asignarla a ningún cliente o lead: asígnala en el panel." : `Quedó asignada como ${kind === "client" ? "cliente" : "lead"}.`}</p>
          <p><a href="${PORTAL_BASE_URL}/admin/portal">Revisar y publicar la minuta</a></p>`),
      ).catch(() => undefined);

      return res.status(201).json({ ok: true, id: meeting.id });
    } catch (err) {
      console.error("fathom webhook error:", (err as Error).message);
      return res.status(500).json({ error: "No se pudo guardar la reunión" });
    }
  });

  // ===== Administración =====
  const admin = "/api/portal/admin/meetings";

  app.get(admin, isAdmin, async (req, res) => {
    const filter = String(req.query.filter ?? "all");
    const rows = await db
      .select({
        id: clientMeetings.id,
        kind: clientMeetings.kind,
        title: clientMeetings.title,
        heldAt: clientMeetings.heldAt,
        platform: clientMeetings.platform,
        source: clientMeetings.source,
        status: clientMeetings.status,
        clientId: clientMeetings.clientId,
        leadId: clientMeetings.leadId,
        projectId: clientMeetings.projectId,
        clientName: clients.name,
        leadName: leads.name,
      })
      .from(clientMeetings)
      .leftJoin(clients, eq(clientMeetings.clientId, clients.id))
      .leftJoin(leads, eq(clientMeetings.leadId, leads.id))
      .where(
        filter === "unassigned"
          ? and(isNull(clientMeetings.clientId), isNull(clientMeetings.leadId))
          : filter === "draft"
            ? eq(clientMeetings.status, "draft")
            : undefined,
      )
      .orderBy(desc(clientMeetings.heldAt))
      .limit(200);
    res.json(rows);
  });

  app.get(`${admin}/:id`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Reunión inválida." });
    const [meeting] = await db.select().from(clientMeetings).where(eq(clientMeetings.id, id)).limit(1);
    if (!meeting) return res.status(404).json({ error: "Reunión no encontrada." });
    const agreements = await db.select().from(meetingAgreements).where(eq(meetingAgreements.meetingId, id)).orderBy(asc(meetingAgreements.createdAt));
    res.json({ meeting, agreements });
  });

  app.post(admin, isAdmin, async (req, res) => {
    const parsed = manualMeeting.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Datos inválidos", details: parsed.error.flatten() });
    const d = parsed.data;
    const kind = d.clientId ? "client" : d.leadId ? "lead" : "other";
    const [row] = await db.insert(clientMeetings).values({ ...d, kind, source: "manual" }).returning();
    res.status(201).json(row);
  });

  app.patch(`${admin}/:id`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = meetingPatch.safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const d = parsed.data;
    // Al reasignar, el tipo se recalcula para que la bitácora quede ordenada
    const kind = d.clientId ? "client" : d.leadId ? "lead" : d.clientId === null && d.leadId === null ? "other" : undefined;
    const [row] = await db.update(clientMeetings).set({ ...d, ...(kind ? { kind } : {}) }).where(eq(clientMeetings.id, id)).returning();
    if (!row) return res.status(404).json({ error: "Reunión no encontrada." });
    res.json(row);
  });

  app.post(`${admin}/:id/agreements`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = agreementInput.safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const [row] = await db.insert(meetingAgreements).values({ ...parsed.data, meetingId: id }).returning();
    res.status(201).json(row);
  });

  app.patch("/api/portal/admin/agreements/:id", isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = agreementInput.partial().extend({ status: z.enum(["pending", "done"]).optional() }).safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const { status, ...rest } = parsed.data;
    const [row] = await db
      .update(meetingAgreements)
      .set({ ...rest, ...(status ? { status, doneAt: status === "done" ? new Date() : null } : {}) })
      .where(eq(meetingAgreements.id, id))
      .returning();
    if (!row) return res.status(404).json({ error: "Acuerdo no encontrado." });
    res.json(row);
  });

  app.delete("/api/portal/admin/agreements/:id", isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Acuerdo inválido." });
    await db.delete(meetingAgreements).where(eq(meetingAgreements.id, id));
    res.json({ ok: true });
  });

  // Publica la minuta: queda visible en el portal del cliente y se envía por correo
  app.post(`${admin}/:id/publish`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Reunión inválida." });
    const [meeting] = await db.select().from(clientMeetings).where(eq(clientMeetings.id, id)).limit(1);
    if (!meeting) return res.status(404).json({ error: "Reunión no encontrada." });
    if (!meeting.minuteText?.trim()) return res.status(400).json({ error: "Escribe o revisa la minuta antes de publicarla." });

    // Destinatario: el cliente, o el lead si todavía no es cliente
    let to: { name: string; email: string } | undefined;
    if (meeting.clientId) {
      [to] = await db.select({ name: clients.name, email: clients.email }).from(clients).where(eq(clients.id, meeting.clientId)).limit(1);
    } else if (meeting.leadId) {
      [to] = await db.select({ name: leads.name, email: leads.email }).from(leads).where(eq(leads.id, meeting.leadId)).limit(1);
    }
    if (!to) return res.status(400).json({ error: "Asigna la reunión a un cliente o lead antes de publicarla." });

    const agreements = await db.select().from(meetingAgreements).where(eq(meetingAgreements.meetingId, id)).orderBy(asc(meetingAgreements.createdAt));
    await db.update(clientMeetings).set({ status: "published", publishedAt: new Date() }).where(eq(clientMeetings.id, id));

    const list = (owner: string) => agreements.filter((a) => a.owner === owner).map((a) => `<li>${escapeHtml(a.description)}</li>`).join("");
    const mine = list("architect");
    const yours = list("client");
    const emailed = await sendEmail(
      to.email,
      `Minuta de nuestra reunión: ${meeting.title}`,
      emailShell(`
        <h2 style="color:#1e3a5f">Hola ${escapeHtml(to.name)},</h2>
        <p>Te comparto lo que conversamos en nuestra reunión.</p>
        <div style="white-space:pre-line;background:#f8fafc;border-radius:8px;padding:14px">${escapeHtml(meeting.minuteText)}</div>
        ${mine ? `<h3 style="color:#1e3a5f">Lo que haré yo</h3><ul>${mine}</ul>` : ""}
        ${yours ? `<h3 style="color:#1e3a5f">Lo que necesito de ti</h3><ul>${yours}</ul>` : ""}
        ${meeting.clientId ? `<p><a href="${PORTAL_BASE_URL}/portal-cliente/login">Ver en mi portal</a></p>` : ""}`),
    ).catch(() => false);
    res.json({ ok: true, emailed });
  });

  // ===== Portal del cliente: solo minutas publicadas y sus acuerdos =====

  app.get("/api/portal/projects/:id/meetings", requirePortalClient, async (req, res) => {
    const client = (req as any).portalClient;
    const projectId = parseId(req.params.id);
    if (!projectId) return res.status(400).json({ error: "Proyecto inválido." });
    const [project] = await db
      .select({ id: clientProjects.id })
      .from(clientProjects)
      .where(and(eq(clientProjects.id, projectId), eq(clientProjects.clientId, client.id)))
      .limit(1);
    if (!project) return res.status(404).json({ error: "Proyecto no encontrado." });

    // Nunca se envía la transcripción, el resumen interno ni el enlace a la grabación
    const meetings = await db
      .select({
        id: clientMeetings.id,
        title: clientMeetings.title,
        heldAt: clientMeetings.heldAt,
        minuteText: clientMeetings.minuteText,
      })
      .from(clientMeetings)
      .where(
        and(
          eq(clientMeetings.clientId, client.id),
          eq(clientMeetings.status, "published"),
          or(eq(clientMeetings.projectId, projectId), isNull(clientMeetings.projectId)),
        ),
      )
      .orderBy(desc(clientMeetings.heldAt));

    const ids = meetings.map((m) => m.id);
    const agreements = ids.length
      ? await db
          .select({
            id: meetingAgreements.id,
            meetingId: meetingAgreements.meetingId,
            description: meetingAgreements.description,
            owner: meetingAgreements.owner,
            dueDate: meetingAgreements.dueDate,
            status: meetingAgreements.status,
          })
          .from(meetingAgreements)
          .where(inArray(meetingAgreements.meetingId, ids))
          .orderBy(asc(meetingAgreements.createdAt))
      : [];
    res.json(meetings.map((m) => ({ ...m, agreements: agreements.filter((a) => a.meetingId === m.id) })));
  });

  // El cliente puede marcar como cumplidos los acuerdos que le tocan a él
  app.post("/api/portal/agreements/:id/done", requirePortalClient, async (req, res) => {
    const client = (req as any).portalClient;
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Acuerdo inválido." });
    const [row] = await db
      .select({ agreement: meetingAgreements })
      .from(meetingAgreements)
      .innerJoin(clientMeetings, eq(meetingAgreements.meetingId, clientMeetings.id))
      .where(and(eq(meetingAgreements.id, id), eq(clientMeetings.clientId, client.id), eq(clientMeetings.status, "published"), eq(meetingAgreements.owner, "client")))
      .limit(1);
    if (!row) return res.status(404).json({ error: "Acuerdo no encontrado." });
    await db.update(meetingAgreements).set({ status: "done", doneAt: new Date() }).where(eq(meetingAgreements.id, id));
    res.json({ ok: true });
  });
}
