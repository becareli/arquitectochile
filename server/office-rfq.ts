import type { Express, Request, Response, RequestHandler } from "express";
import { z } from "zod";
import { and, asc, desc, eq, inArray, ne, sql } from "drizzle-orm";
import { db } from "./db";
import { collaborators, clientProjects, officeTasks, officeRfqs, officeRfqFiles, officeRfqInvites, officeQuotes } from "@shared/schema";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";
import { sendEmail, emailShell, escapeHtml, parseId, PORTAL_BASE_URL } from "./portal";
import { recordLedger, ADMIN_NAME } from "./ledger";
import { requireCollaborator, logEvent, fechaCL } from "./office";
import { DISCIPLINE_CODES } from "@shared/classification";

/**
 * Cotizaciones, onboarding y arranque (kickoff) de la oficina digital.
 *
 *  1. Patricio publica los requerimientos de un trabajo y elige a quién invitar (p. ej. 3 proyectistas eléctricos).
 *  2. Cada invitado responde desde la plataforma: monto, plazo, anticipo y forma de pago. No ve las otras cotizaciones.
 *  3. Patricio compara y adjudica: se crea la tarea con el honorario pactado y empieza el arranque:
 *     aceptación del colaborador -> primer pago (anticipo) -> reunión de inicio -> el plazo empieza a correr.
 */

const NOTIFY_EMAIL = process.env.PORTAL_NOTIFY_EMAIL || "contacto@arquitectochile.com";
export const TERMS_VERSION = "2026-11";
const clp = (n: number | string) => `$${Math.round(Number(n)).toLocaleString("es-CL")}`;
const button = (href: string, label: string) => `<p style="margin:24px 0"><a href="${href}" style="background:#F97015;color:#1D2530;font-weight:600;padding:12px 22px;border-radius:8px;text-decoration:none">${label}</a></p>`;
const notify = (to: string, subject: string, html: string) => sendEmail(to, subject, emailShell(html)).catch((e) => console.error("office-rfq mail error:", (e as Error).message));

const rfqInput = z.object({
  projectId: z.number().int().positive().nullable().optional(),
  discipline: z.enum(DISCIPLINE_CODES),
  title: z.string().min(3).max(200),
  requirements: z.string().min(10).max(6000),
  deliverableFormat: z.enum(["2d", "3d"]).default("2d"),
  quoteDeadline: z.string().nullable().optional(),
  collaboratorIds: z.array(z.number().int().positive()).min(1).max(20),
  files: z.array(z.object({ name: z.string().min(1).max(200), path: z.string().startsWith("/objects/client-files/").max(500), size: z.number().int().nonnegative().optional() })).max(15).default([]),
});
const quoteInput = z.object({
  amount: z.number().int().positive().max(1_000_000_000),
  deliveryDays: z.number().int().min(1).max(730),
  advancePercent: z.number().int().min(0).max(100).default(0),
  paymentNotes: z.string().max(1000).optional().nullable(),
  notes: z.string().max(2000).optional().nullable(),
});

export function registerRfqRoutes(app: Express, isAdmin: RequestHandler) {
  const storage = new ObjectStorageService();
  const admin = "/api/office/admin";

  async function stream(res: Response, objectPath: string, filename: string) {
    try {
      const file = await storage.getObjectEntityFile(objectPath);
      res.set("Content-Disposition", `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
      await storage.downloadObject(file, res, 0);
    } catch (err) {
      if (err instanceof ObjectNotFoundError) return res.status(404).json({ error: "Archivo no disponible." });
      console.error("rfq download error:", (err as Error).message);
      return res.status(500).json({ error: "No pudimos descargar el archivo." });
    }
  }

  const projectName = async (id: number | null) =>
    id ? (await db.select({ name: clientProjects.name }).from(clientProjects).where(eq(clientProjects.id, id)).limit(1))[0]?.name ?? null : null;

  // ================= Onboarding del colaborador =================

  app.post("/api/office/onboarding/complete", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const parsed = z
      .object({
        accepted: z.literal(true),
        phone: z.string().max(40).optional().nullable(),
        description: z.string().max(1500).optional().nullable(),
        linkedinUrl: z.string().max(300).regex(/^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/.+/i, "Debe ser un enlace de LinkedIn").optional().nullable(),
        canDo3d: z.boolean().optional(),
      })
      .safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Debes aceptar los compromisos de trabajo." });
    const d = parsed.data;
    const set: Record<string, unknown> = { onboardedAt: new Date(), termsVersion: TERMS_VERSION };
    if (d.phone !== undefined) set.phone = d.phone;
    if (d.description !== undefined) set.description = d.description;
    if (d.linkedinUrl !== undefined) set.linkedinUrl = d.linkedinUrl;
    if (d.canDo3d !== undefined) set.canDo3d = d.canDo3d;
    await db.update(collaborators).set(set).where(eq(collaborators.id, collab.id));
    notify(NOTIFY_EMAIL, `Nuevo colaborador listo: ${collab.name}`, `<p><b>${escapeHtml(collab.name)}</b> (${escapeHtml(collab.specialty)}) completó su bienvenida y aceptó los compromisos de trabajo.</p>`);
    res.json({ ok: true });
  });

  // ================= Cotizaciones: lado colaborador =================

  app.get("/api/office/rfqs", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const rows = await db
      .select({ rfq: officeRfqs, invite: officeRfqInvites, quote: officeQuotes })
      .from(officeRfqInvites)
      .innerJoin(officeRfqs, eq(officeRfqInvites.rfqId, officeRfqs.id))
      .leftJoin(officeQuotes, and(eq(officeQuotes.rfqId, officeRfqs.id), eq(officeQuotes.collaboratorId, collab.id)))
      .where(eq(officeRfqInvites.collaboratorId, collab.id))
      .orderBy(desc(officeRfqs.createdAt));
    const names = new Map<number, string | null>();
    for (const r of rows) if (r.rfq.projectId && !names.has(r.rfq.projectId)) names.set(r.rfq.projectId, await projectName(r.rfq.projectId));
    res.json(
      rows.map((r) => ({
        id: r.rfq.id,
        title: r.rfq.title,
        discipline: r.rfq.discipline,
        project: r.rfq.projectId ? names.get(r.rfq.projectId) ?? null : null,
        quoteDeadline: r.rfq.quoteDeadline,
        rfqStatus: r.rfq.status,
        inviteStatus: r.invite.status,
        myQuote: r.quote ? { amount: r.quote.amount, deliveryDays: r.quote.deliveryDays } : null,
      })),
    );
  });

  async function myInvite(collabId: number, rfqId: number) {
    const [row] = await db
      .select({ rfq: officeRfqs, invite: officeRfqInvites })
      .from(officeRfqInvites)
      .innerJoin(officeRfqs, eq(officeRfqInvites.rfqId, officeRfqs.id))
      .where(and(eq(officeRfqInvites.rfqId, rfqId), eq(officeRfqInvites.collaboratorId, collabId)))
      .limit(1);
    return row;
  }

  app.get("/api/office/rfqs/:id", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Cotización inválida." });
    const row = await myInvite(collab.id, id);
    if (!row) return res.status(404).json({ error: "Cotización no encontrada." });
    const [files, [quote]] = await Promise.all([
      db.select({ id: officeRfqFiles.id, name: officeRfqFiles.name, fileSize: officeRfqFiles.fileSize }).from(officeRfqFiles).where(eq(officeRfqFiles.rfqId, id)),
      db.select().from(officeQuotes).where(and(eq(officeQuotes.rfqId, id), eq(officeQuotes.collaboratorId, collab.id))).limit(1),
    ]);
    res.json({
      rfq: { id: row.rfq.id, title: row.rfq.title, discipline: row.rfq.discipline, requirements: row.rfq.requirements, deliverableFormat: row.rfq.deliverableFormat, quoteDeadline: row.rfq.quoteDeadline, status: row.rfq.status, project: await projectName(row.rfq.projectId) },
      inviteStatus: row.invite.status,
      files,
      quote: quote ?? null,
    });
  });

  app.get("/api/office/rfq-files/:id/download", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Archivo inválido." });
    const [row] = await db
      .select({ file: officeRfqFiles })
      .from(officeRfqFiles)
      .innerJoin(officeRfqInvites, and(eq(officeRfqInvites.rfqId, officeRfqFiles.rfqId), eq(officeRfqInvites.collaboratorId, collab.id)))
      .where(eq(officeRfqFiles.id, id))
      .limit(1);
    if (!row) return res.status(404).json({ error: "Archivo no encontrado." });
    return stream(res, row.file.fileUrl, row.file.name);
  });

  app.put("/api/office/rfqs/:id/quote", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const id = parseId(req.params.id);
    const parsed = quoteInput.safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Revisa el monto, el plazo y el anticipo." });
    const row = await myInvite(collab.id, id);
    if (!row) return res.status(404).json({ error: "Cotización no encontrada." });
    if (row.rfq.status !== "open") return res.status(409).json({ error: "Esta cotización ya se cerró." });
    if (row.rfq.quoteDeadline && row.rfq.quoteDeadline.getTime() < Date.now()) return res.status(409).json({ error: "El plazo para cotizar venció." });
    if (row.invite.status === "declined") return res.status(409).json({ error: "Ya declinaste esta cotización." });
    const d = parsed.data;
    const [prev] = await db.select({ id: officeQuotes.id }).from(officeQuotes).where(and(eq(officeQuotes.rfqId, id), eq(officeQuotes.collaboratorId, collab.id))).limit(1);
    const values = { amount: String(d.amount), deliveryDays: d.deliveryDays, advancePercent: d.advancePercent, paymentNotes: d.paymentNotes ?? null, notes: d.notes ?? null };
    if (prev) await db.update(officeQuotes).set({ ...values, updatedAt: new Date() }).where(eq(officeQuotes.id, prev.id));
    else await db.insert(officeQuotes).values({ rfqId: id, collaboratorId: collab.id, ...values });
    await db.update(officeRfqInvites).set({ status: "quoted" }).where(and(eq(officeRfqInvites.rfqId, id), eq(officeRfqInvites.collaboratorId, collab.id)));
    await recordLedger({ projectId: row.rfq.projectId, action: `${prev ? "Actualizó su cotización" : "Envió su cotización"}: ${row.rfq.title}`, role: "Cotizó", actorType: "collaborator", actorName: collab.name, detail: `${clp(d.amount)} · ${d.deliveryDays} días · anticipo ${d.advancePercent}%` });
    notify(NOTIFY_EMAIL, `Cotización de ${collab.name}: ${row.rfq.title}`, `<p><b>${escapeHtml(collab.name)}</b> ${prev ? "actualizó" : "envió"} su cotización de <b>${escapeHtml(row.rfq.title)}</b>: <b>${clp(d.amount)}</b>, ${d.deliveryDays} días, anticipo ${d.advancePercent}%.</p>${button(`${PORTAL_BASE_URL}/admin/portal`, "Comparar cotizaciones")}`);
    res.json({ ok: true });
  });

  app.post("/api/office/rfqs/:id/decline", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const id = parseId(req.params.id);
    const parsed = z.object({ reason: z.string().max(500).optional() }).safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const row = await myInvite(collab.id, id);
    if (!row || row.rfq.status !== "open") return res.status(404).json({ error: "Cotización no disponible." });
    await db.update(officeRfqInvites).set({ status: "declined", declineReason: parsed.data.reason ?? null }).where(and(eq(officeRfqInvites.rfqId, id), eq(officeRfqInvites.collaboratorId, collab.id)));
    notify(NOTIFY_EMAIL, `${collab.name} no cotiza: ${row.rfq.title}`, `<p><b>${escapeHtml(collab.name)}</b> declinó cotizar <b>${escapeHtml(row.rfq.title)}</b>.</p>${parsed.data.reason ? `<p>Motivo: ${escapeHtml(parsed.data.reason)}</p>` : ""}`);
    res.json({ ok: true });
  });

  // El colaborador acepta monto, plazo y forma de pago del proyecto ganado
  app.post("/api/office/tasks/:id/accept", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Tarea inválida." });
    const [task] = await db.select().from(officeTasks).where(and(eq(officeTasks.id, id), eq(officeTasks.collaboratorId, collab.id))).limit(1);
    if (!task || !task.kickoffRequired) return res.status(404).json({ error: "Tarea no encontrada." });
    if (task.acceptedAt) return res.json({ ok: true });
    await db.update(officeTasks).set({ acceptedAt: new Date() }).where(eq(officeTasks.id, id));
    await logEvent(id, "status", `${collab.name} aceptó las condiciones (monto, plazo y forma de pago)`);
    await recordLedger({ projectId: task.projectId, taskId: id, action: `Aceptó las condiciones: ${task.title}`, role: "Aceptó", actorType: "collaborator", actorName: collab.name, detail: `${task.fee ? clp(task.fee) : ""} · ${task.deliveryDays ?? ""} días · anticipo ${task.advancePercent}%` });
    notify(NOTIFY_EMAIL, `${collab.name} aceptó: ${task.title}`, `<p><b>${escapeHtml(collab.name)}</b> aceptó las condiciones de <b>${escapeHtml(task.title)}</b>.</p>${task.advancePercent > 0 ? `<p>Siguiente paso: pagar el anticipo (${task.advancePercent}%${task.fee ? ` = ${clp((Number(task.fee) * task.advancePercent) / 100)}` : ""}) y agendar el kickoff.</p>` : "<p>Siguiente paso: agendar el kickoff.</p>"}${button(`${PORTAL_BASE_URL}/admin/portal`, "Abrir el panel")}`);
    res.json({ ok: true });
  });

  // ================= Cotizaciones: lado administrador =================

  app.post(`${admin}/rfqs`, isAdmin, async (req, res) => {
    const parsed = rfqInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Datos inválidos", details: parsed.error.flatten() });
    const d = parsed.data;
    const invitees = await db.select().from(collaborators).where(and(inArray(collaborators.id, d.collaboratorIds), eq(collaborators.active, true)));
    if (!invitees.length) return res.status(400).json({ error: "Elige al menos un colaborador activo." });
    const [rfq] = await db
      .insert(officeRfqs)
      .values({ projectId: d.projectId ?? null, discipline: d.discipline, title: d.title, requirements: d.requirements, deliverableFormat: d.deliverableFormat, quoteDeadline: d.quoteDeadline ? new Date(d.quoteDeadline) : null })
      .returning();
    if (d.files.length) await db.insert(officeRfqFiles).values(d.files.map((f) => ({ rfqId: rfq.id, name: f.name, fileUrl: f.path, fileSize: f.size ?? null })));
    await db.insert(officeRfqInvites).values(invitees.map((c) => ({ rfqId: rfq.id, collaboratorId: c.id })));
    await recordLedger({ projectId: rfq.projectId, action: `Pidió cotizaciones: ${rfq.title}`, role: "Solicitó", actorType: "admin", actorName: ADMIN_NAME, detail: `Invitados: ${invitees.map((c) => c.name).join(", ")}` });
    for (const c of invitees) {
      notify(c.email, `Te invitamos a cotizar: ${rfq.title}`, `<h2 style="color:#1D2530">Hola ${escapeHtml(c.name)},</h2><p>Queremos cotizar contigo: <b>${escapeHtml(rfq.title)}</b>.</p>${rfq.quoteDeadline ? `<p>Necesitamos tu cotización antes del <b>${fechaCL(rfq.quoteDeadline)}</b>.</p>` : ""}<p>Entra, revisa los requerimientos y responde con tu monto, plazo y forma de pago. Es rápido.</p>${button(`${PORTAL_BASE_URL}/oficina`, "Ver y cotizar")}`);
    }
    res.status(201).json({ id: rfq.id, invited: invitees.length });
  });

  app.get(`${admin}/rfqs`, isAdmin, async (_req, res) => {
    const rows = await db
      .select({
        id: officeRfqs.id,
        title: officeRfqs.title,
        discipline: officeRfqs.discipline,
        status: officeRfqs.status,
        quoteDeadline: officeRfqs.quoteDeadline,
        createdAt: officeRfqs.createdAt,
        invited: sql<number>`(select count(*)::int from ${officeRfqInvites} i where i.rfq_id = ${officeRfqs.id})`,
        quoted: sql<number>`(select count(*)::int from ${officeQuotes} q where q.rfq_id = ${officeRfqs.id})`,
      })
      .from(officeRfqs)
      .orderBy(desc(officeRfqs.createdAt))
      .limit(100);
    res.json(rows);
  });

  app.get(`${admin}/rfqs/:id`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Cotización inválida." });
    const [rfq] = await db.select().from(officeRfqs).where(eq(officeRfqs.id, id)).limit(1);
    if (!rfq) return res.status(404).json({ error: "Cotización no encontrada." });
    const [files, invites, quotes] = await Promise.all([
      db.select().from(officeRfqFiles).where(eq(officeRfqFiles.rfqId, id)),
      db.select({ collaboratorId: officeRfqInvites.collaboratorId, status: officeRfqInvites.status, declineReason: officeRfqInvites.declineReason, name: collaborators.name, specialty: collaborators.specialty }).from(officeRfqInvites).innerJoin(collaborators, eq(officeRfqInvites.collaboratorId, collaborators.id)).where(eq(officeRfqInvites.rfqId, id)),
      db.select({ quote: officeQuotes, name: collaborators.name }).from(officeQuotes).innerJoin(collaborators, eq(officeQuotes.collaboratorId, collaborators.id)).where(eq(officeQuotes.rfqId, id)).orderBy(asc(officeQuotes.amount)),
    ]);
    res.json({ rfq, files, invites, quotes: quotes.map((q) => ({ ...q.quote, name: q.name })) });
  });

  app.get(`${admin}/rfq-files/:id/download`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Archivo inválido." });
    const [f] = await db.select().from(officeRfqFiles).where(eq(officeRfqFiles.id, id)).limit(1);
    if (!f) return res.status(404).json({ error: "Archivo no encontrado." });
    return stream(res, f.fileUrl, f.name);
  });

  app.post(`${admin}/rfqs/:id/close`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Cotización inválida." });
    const [r] = await db.update(officeRfqs).set({ status: "closed" }).where(and(eq(officeRfqs.id, id), eq(officeRfqs.status, "open"))).returning();
    if (!r) return res.status(409).json({ error: "La cotización ya no está abierta." });
    res.json({ ok: true });
  });

  // Adjudicar: crea la tarea con el honorario pactado y abre el arranque (kickoff)
  app.post(`${admin}/rfqs/:id/award`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = z.object({ quoteId: z.number().int().positive() }).safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const [row] = await db
      .select({ quote: officeQuotes, rfq: officeRfqs, name: collaborators.name, email: collaborators.email })
      .from(officeQuotes)
      .innerJoin(officeRfqs, eq(officeQuotes.rfqId, officeRfqs.id))
      .innerJoin(collaborators, eq(officeQuotes.collaboratorId, collaborators.id))
      .where(and(eq(officeQuotes.id, parsed.data.quoteId), eq(officeQuotes.rfqId, id)))
      .limit(1);
    if (!row) return res.status(404).json({ error: "Cotización no encontrada." });
    const claimed = await db.update(officeRfqs).set({ status: "awarded", awardedQuoteId: row.quote.id }).where(and(eq(officeRfqs.id, id), eq(officeRfqs.status, "open"))).returning();
    if (!claimed.length) return res.status(409).json({ error: "Esta cotización ya fue adjudicada o cerrada." });
    const q = row.quote;
    const [task] = await db
      .insert(officeTasks)
      .values({ collaboratorId: q.collaboratorId, projectId: row.rfq.projectId, title: row.rfq.title, description: row.rfq.requirements, discipline: row.rfq.discipline, deliverableFormat: row.rfq.deliverableFormat, fee: q.amount, rfqId: id, kickoffRequired: true, deliveryDays: q.deliveryDays, advancePercent: q.advancePercent })
      .returning();
    await db.update(officeRfqInvites).set({ status: "awarded" }).where(and(eq(officeRfqInvites.rfqId, id), eq(officeRfqInvites.collaboratorId, q.collaboratorId)));
    const others = await db.select({ collaboratorId: officeRfqInvites.collaboratorId, name: collaborators.name, email: collaborators.email, status: officeRfqInvites.status }).from(officeRfqInvites).innerJoin(collaborators, eq(officeRfqInvites.collaboratorId, collaborators.id)).where(and(eq(officeRfqInvites.rfqId, id), ne(officeRfqInvites.collaboratorId, q.collaboratorId)));
    await db.update(officeRfqInvites).set({ status: "not_selected" }).where(and(eq(officeRfqInvites.rfqId, id), ne(officeRfqInvites.collaboratorId, q.collaboratorId), ne(officeRfqInvites.status, "declined")));
    await logEvent(task.id, "created", `Adjudicada a ${row.name}: ${clp(q.amount)}, ${q.deliveryDays} días, anticipo ${q.advancePercent}%`);
    await recordLedger({ projectId: row.rfq.projectId, taskId: task.id, action: `Adjudicó: ${row.rfq.title}`, role: "Asignó", actorType: "admin", actorName: ADMIN_NAME, detail: `${row.name} · ${clp(q.amount)} · ${q.deliveryDays} días · anticipo ${q.advancePercent}%` });
    notify(row.email, `¡Ganaste el proyecto! ${row.rfq.title}`, `<h2 style="color:#1D2530">Hola ${escapeHtml(row.name)},</h2><p>Elegimos tu cotización para <b>${escapeHtml(row.rfq.title)}</b>: <b>${clp(q.amount)}</b>, entrega en ${q.deliveryDays} días${q.advancePercent ? `, con anticipo de ${q.advancePercent}% (${clp((Number(q.amount) * q.advancePercent) / 100)})` : ""}.</p><p>Entra a la oficina digital, confirma las condiciones y te acompañamos en el arranque (kickoff). El plazo empieza a correr cuando hagamos la reunión de inicio.</p>${button(`${PORTAL_BASE_URL}/oficina`, "Confirmar y arrancar")}`);
    for (const o of others.filter((x) => x.status !== "declined")) {
      notify(o.email, `Resultado de la cotización: ${row.rfq.title}`, `<p>Hola ${escapeHtml(o.name)}, gracias por cotizar <b>${escapeHtml(row.rfq.title)}</b>. Esta vez elegimos otra propuesta. Tu respuesta fue muy útil y volveremos a contar contigo en próximos proyectos.</p>`);
    }
    res.json({ ok: true, taskId: task.id });
  });

  // ================= Arranque (kickoff): lado administrador =================

  async function kickoffTask(id: number) {
    const [row] = await db
      .select({ task: officeTasks, name: collaborators.name, email: collaborators.email })
      .from(officeTasks)
      .innerJoin(collaborators, eq(officeTasks.collaboratorId, collaborators.id))
      .where(and(eq(officeTasks.id, id), eq(officeTasks.kickoffRequired, true)))
      .limit(1);
    return row;
  }

  app.post(`${admin}/tasks/:id/advance-paid`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Tarea inválida." });
    const row = await kickoffTask(id);
    if (!row) return res.status(404).json({ error: "Tarea no encontrada." });
    if (row.task.advancePaidAt) return res.json({ ok: true });
    const amount = row.task.fee ? (Number(row.task.fee) * row.task.advancePercent) / 100 : 0;
    await db.update(officeTasks).set({ advancePaidAt: new Date() }).where(eq(officeTasks.id, id));
    await logEvent(id, "fee", `Anticipo pagado${amount ? `: ${clp(amount)}` : ""}`);
    await recordLedger({ projectId: row.task.projectId, taskId: id, action: `Pagó el anticipo: ${row.task.title}`, role: "Pagó", actorType: "admin", actorName: ADMIN_NAME, detail: amount ? `${clp(amount)} (${row.task.advancePercent}%)` : null });
    notify(row.email, `Anticipo pagado: ${row.task.title}`, `<p>Hola ${escapeHtml(row.name)}, registramos el pago del anticipo${amount ? ` de <b>${clp(amount)}</b>` : ""} de <b>${escapeHtml(row.task.title)}</b>. Si necesitas tu comprobante, escríbenos en la tarea.</p>${button(`${PORTAL_BASE_URL}/oficina`, "Abrir la oficina")}`);
    res.json({ ok: true });
  });

  app.post(`${admin}/tasks/:id/kickoff`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = z.object({ kickoffAt: z.string().min(8), kickoffLink: z.string().url().max(500).optional().nullable() }).safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Indica fecha y hora del kickoff." });
    const row = await kickoffTask(id);
    if (!row) return res.status(404).json({ error: "Tarea no encontrada." });
    const when = new Date(parsed.data.kickoffAt);
    if (isNaN(when.getTime())) return res.status(400).json({ error: "Fecha inválida." });
    await db.update(officeTasks).set({ kickoffAt: when, kickoffLink: parsed.data.kickoffLink ?? null }).where(eq(officeTasks.id, id));
    await logEvent(id, "status", `Kickoff agendado: ${when.toLocaleString("es-CL", { dateStyle: "long", timeStyle: "short", timeZone: "America/Santiago" })}`);
    notify(row.email, `Kickoff agendado: ${row.task.title}`, `<p>Hola ${escapeHtml(row.name)}, agendamos la reunión de inicio de <b>${escapeHtml(row.task.title)}</b> para el <b>${when.toLocaleString("es-CL", { dateStyle: "full", timeStyle: "short", timeZone: "America/Santiago" })}</b>.</p>${parsed.data.kickoffLink ? button(parsed.data.kickoffLink, "Unirme a la reunión") : ""}<p>Ahí revisamos requerimientos, información de partida y dudas. El plazo de entrega corre desde esa reunión.</p>`);
    res.json({ ok: true });
  });

  // Kickoff realizado: el plazo empieza a correr y los recordatorios se activan
  app.post(`${admin}/tasks/:id/kickoff-done`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Tarea inválida." });
    const row = await kickoffTask(id);
    if (!row) return res.status(404).json({ error: "Tarea no encontrada." });
    if (row.task.kickoffDoneAt) return res.json({ ok: true });
    if (!row.task.acceptedAt) return res.status(409).json({ error: "El colaborador aún no acepta las condiciones." });
    if (row.task.advancePercent > 0 && !row.task.advancePaidAt) return res.status(409).json({ error: "Falta registrar el pago del anticipo." });
    const now = new Date();
    const due = new Date(now.getTime() + (row.task.deliveryDays ?? 7) * 86_400_000);
    await db.update(officeTasks).set({ kickoffDoneAt: now, dueDate: due, status: "doing", remindersSent: sql`'{}'::text[]` }).where(eq(officeTasks.id, id));
    await logEvent(id, "status", `Kickoff realizado: el proyecto arrancó, entrega ${fechaCL(due)}`);
    await recordLedger({ projectId: row.task.projectId, taskId: id, action: `Kickoff realizado: ${row.task.title}`, role: "Inició", actorType: "admin", actorName: ADMIN_NAME, detail: `Entrega ${fechaCL(due)}` });
    notify(row.email, `Arrancamos: ${row.task.title}`, `<p>Hola ${escapeHtml(row.name)}, ¡el proyecto <b>${escapeHtml(row.task.title)}</b> está en marcha! La entrega es el <b>${fechaCL(due)}</b>. Te avisaremos antes de la fecha.</p>${button(`${PORTAL_BASE_URL}/oficina`, "Abrir la tarea")}`);
    res.json({ ok: true, dueDate: due });
  });
}
