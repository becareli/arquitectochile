import type { Express, RequestHandler } from "express";
import { z } from "zod";
import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "./db";
import { collaborators, clientProjects, officeTasks, projectMessages } from "@shared/schema";
import { sendEmail, emailShell, escapeHtml, parseId, PORTAL_BASE_URL } from "./portal";
import { requireCollaborator } from "./office";
import { ADMIN_NAME } from "./ledger";

/**
 * Conversación por proyecto, dentro de la misma plataforma (sin Slack ni WhatsApp).
 * Participan solo quienes tienen tareas en ese proyecto (y el coordinador BIM en proyectos BIM) más Patricio.
 * Nunca se muestran datos del cliente ni correos/teléfonos/honorarios de los demás: solo nombre y perfil.
 */

const NOTIFY_EMAIL = process.env.PORTAL_NOTIFY_EMAIL || "contacto@arquitectochile.com";
const messageInput = z.object({ body: z.string().trim().min(1).max(2000) });

// Un aviso por persona y proyecto cada 30 min, para que la conversación no llene los correos.
const lastMail = new Map<string, number>();
const THROTTLE_MS = 30 * 60 * 1000;
const due = (key: string) => {
  const now = Date.now();
  if (now - (lastMail.get(key) ?? 0) < THROTTLE_MS) return false;
  lastMail.set(key, now);
  return true;
};

export function registerChatRoutes(app: Express, isAdmin: RequestHandler) {
  async function participants(projectId: number) {
    const [proj] = await db.select({ bim: clientProjects.bimRequired }).from(clientProjects).where(eq(clientProjects.id, projectId)).limit(1);
    if (!proj) return null;
    const withTask = await db.select({ id: officeTasks.collaboratorId }).from(officeTasks).where(eq(officeTasks.projectId, projectId));
    const ids = new Set(withTask.map((t) => t.id));
    const cond = proj.bim ? sql`(${inArray(collaborators.id, Array.from(ids).length ? Array.from(ids) : [-1])} or ${collaborators.isCoordinator} = true)` : inArray(collaborators.id, Array.from(ids).length ? Array.from(ids) : [-1]);
    const rows = await db
      .select({ id: collaborators.id, name: collaborators.name, specialty: collaborators.specialty, email: collaborators.email, active: collaborators.active })
      .from(collaborators)
      .where(and(cond, eq(collaborators.active, true)))
      .orderBy(asc(collaborators.name));
    return rows;
  }

  async function thread(projectId: number) {
    const [people, msgs] = await Promise.all([
      participants(projectId),
      db.select().from(projectMessages).where(eq(projectMessages.projectId, projectId)).orderBy(desc(projectMessages.id)).limit(200),
    ]);
    return {
      participants: [{ id: 0, name: ADMIN_NAME, specialty: "Arquitecto, ArquitectoChile" }, ...(people ?? []).map((p) => ({ id: p.id, name: p.name, specialty: p.specialty }))],
      messages: msgs.reverse().map((m) => ({ id: m.id, author: m.authorName, mine: false, admin: m.authorType === "admin", collaboratorId: m.collaboratorId, body: m.body, createdAt: m.createdAt })),
    };
  }

  async function announce(projectId: number, authorName: string, authorCollabId: number | null) {
    const [proj] = await db.select({ name: clientProjects.name }).from(clientProjects).where(eq(clientProjects.id, projectId)).limit(1);
    const people = (await participants(projectId)) ?? [];
    const html = emailShell(`<p><b>${escapeHtml(authorName)}</b> escribió en la conversación del proyecto <b>${escapeHtml(proj?.name ?? "")}</b>.</p><p><a href="${PORTAL_BASE_URL}/oficina">Entrar a la oficina digital para leer y responder</a></p>`);
    const targets = people.filter((p) => p.id !== authorCollabId).map((p) => ({ key: `c${p.id}:${projectId}`, email: p.email }));
    if (authorCollabId !== null) targets.push({ key: `admin:${projectId}`, email: NOTIFY_EMAIL });
    for (const t of targets) {
      if (due(t.key)) sendEmail(t.email, `Nuevo mensaje: ${proj?.name ?? "proyecto"}`, html).catch((e) => console.error("chat mail error:", (e as Error).message));
    }
  }

  // ----- Colaborador -----
  app.get("/api/office/chats", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const mine = await db.select({ projectId: officeTasks.projectId }).from(officeTasks).where(eq(officeTasks.collaboratorId, collab.id));
    const ids = Array.from(new Set(mine.map((m) => m.projectId).filter((i): i is number => i !== null)));
    const rows = await db
      .select({ id: clientProjects.id, name: clientProjects.name, bim: clientProjects.bimRequired })
      .from(clientProjects)
      .where(collab.isCoordinator ? sql`(${clientProjects.bimRequired} = true or ${ids.length ? inArray(clientProjects.id, ids) : sql`false`})` : ids.length ? inArray(clientProjects.id, ids) : sql`false`)
      .orderBy(asc(clientProjects.name));
    res.json(rows);
  });

  async function canSee(collab: { id: number; isCoordinator: boolean }, projectId: number) {
    const ok = (await participants(projectId))?.some((p) => p.id === collab.id);
    return Boolean(ok);
  }

  app.get("/api/office/chats/:id", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const id = parseId(req.params.id);
    if (!id || !(await canSee(collab, id))) return res.status(404).json({ error: "Conversación no encontrada." });
    const t = await thread(id);
    res.json({ ...t, messages: t.messages.map((m) => ({ ...m, mine: m.collaboratorId === collab.id })) });
  });

  app.post("/api/office/chats/:id", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const id = parseId(req.params.id);
    const parsed = messageInput.safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Mensaje inválido." });
    if (!(await canSee(collab, id))) return res.status(404).json({ error: "Conversación no encontrada." });
    await db.insert(projectMessages).values({ projectId: id, authorType: "collaborator", collaboratorId: collab.id, authorName: collab.name, body: parsed.data.body });
    announce(id, collab.name, collab.id);
    res.status(201).json({ ok: true });
  });

  // ----- Administración -----
  app.get("/api/office/admin/chats", isAdmin, async (_req, res) => {
    const rows = await db
      .select({
        id: clientProjects.id,
        name: clientProjects.name,
        code: clientProjects.code,
        messages: sql<number>`(select count(*) from ${projectMessages} where ${projectMessages.projectId} = ${clientProjects.id})::int`,
      })
      .from(clientProjects)
      .where(sql`exists (select 1 from ${officeTasks} where ${officeTasks.projectId} = ${clientProjects.id})`)
      .orderBy(asc(clientProjects.name));
    res.json(rows);
  });

  app.get("/api/office/admin/chats/:id", isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Inválido." });
    const t = await thread(id);
    res.json({ ...t, messages: t.messages.map((m) => ({ ...m, mine: m.admin })) });
  });

  app.post("/api/office/admin/chats/:id", isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = messageInput.safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Mensaje inválido." });
    await db.insert(projectMessages).values({ projectId: id, authorType: "admin", authorName: ADMIN_NAME, body: parsed.data.body });
    announce(id, ADMIN_NAME, null);
    res.status(201).json({ ok: true });
  });

  app.delete("/api/office/admin/chats/messages/:id", isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Inválido." });
    await db.delete(projectMessages).where(eq(projectMessages.id, id));
    res.json({ ok: true });
  });
}
