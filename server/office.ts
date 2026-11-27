import type { Express, Request, Response, RequestHandler } from "express";
import crypto from "crypto";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { and, asc, desc, eq, gt, inArray, isNull, ne, sql } from "drizzle-orm";
import { db } from "./db";
import {
  collaborators,
  collaboratorLoginTokens,
  officeTasks,
  officeTaskFiles,
  officeTaskComments,
  officeTaskEvents,
  clientProjects,
  clientDocuments,
} from "@shared/schema";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";
import { sendEmail, emailShell, escapeHtml, parseId, PORTAL_BASE_URL } from "./portal";

/**
 * Oficina digital de ArquitectoChile.
 *
 * Los colaboradores (arquitectos, dibujantes, ingenieros, técnicos) entran con un enlace de un solo uso
 * por correo. Solo ven SUS tareas: el nombre del proyecto y lo que se les pide, nunca datos del cliente.
 * Lo que suben queda como entregable interno; llega al cliente solo si el arquitecto lo publica.
 * Administración: rutas /api/office/admin/* protegidas con el middleware de admin del sitio.
 */

const LOGIN_LINK_TTL_MIN = 20;
const SESSION_DAYS = 90;
const NOTIFY_EMAIL = process.env.PORTAL_NOTIFY_EMAIL || "contacto@arquitectochile.com";

const sha256 = (v: string) => crypto.createHash("sha256").update(v).digest("hex");
const normalizeEmail = (v: string) => v.trim().toLowerCase();
const getSession = (req: Request): any => (req as any).session;

function sessionStep(req: Request, fn: "regenerate" | "save"): Promise<void> {
  return new Promise((resolve, reject) => getSession(req)[fn]((err: unknown) => (err ? reject(err) : resolve())));
}

async function startOfficeSession(req: Request, collaboratorId: number) {
  await sessionStep(req, "regenerate");
  const s = getSession(req);
  s.officeCollaboratorId = collaboratorId;
  s.officeSeenAt = Date.now();
  s.cookie.maxAge = SESSION_DAYS * 24 * 60 * 60 * 1000;
  await sessionStep(req, "save");
}

const requireCollaborator: RequestHandler = async (req, res, next) => {
  const id = getSession(req)?.officeCollaboratorId;
  if (!id) return res.status(401).json({ error: "Debes iniciar sesión." });
  const [collab] = await db.select().from(collaborators).where(eq(collaborators.id, id)).limit(1);
  if (!collab || !collab.active) return res.status(401).json({ error: "Acceso no disponible." });
  const s = getSession(req);
  if (!s.officeSeenAt || Date.now() - s.officeSeenAt > 24 * 60 * 60 * 1000) {
    s.officeSeenAt = Date.now();
    s.cookie.maxAge = SESSION_DAYS * 24 * 60 * 60 * 1000;
  }
  (req as any).collaborator = collab;
  next();
};

async function createLoginLink(collaboratorId: number): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  await db.insert(collaboratorLoginTokens).values({
    collaboratorId,
    tokenHash: sha256(token),
    expiresAt: new Date(Date.now() + LOGIN_LINK_TTL_MIN * 60 * 1000),
  });
  return `${PORTAL_BASE_URL}/oficina/acceso?token=${token}`;
}

function sendLoginEmail(to: string, name: string, link: string) {
  return sendEmail(
    to,
    "Tu acceso a la oficina digital de ArquitectoChile",
    emailShell(`
      <h2 style="color:#1D2530">Hola ${escapeHtml(name)},</h2>
      <p>Usa este botón para entrar a la oficina digital. El enlace funciona una sola vez y vence en ${LOGIN_LINK_TTL_MIN} minutos.</p>
      <p style="margin:28px 0"><a href="${link}" style="background:#F97015;color:#1D2530;font-weight:600;padding:12px 22px;border-radius:8px;text-decoration:none">Entrar a la oficina</a></p>
      <p style="font-size:13px;color:#64748b">Si no lo pediste tú, puedes ignorar este correo.</p>`),
  );
}

// ---------- validación ----------

const TASK_STATUS = ["todo", "doing", "review", "done"] as const;
const collabInput = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().nullable(),
  specialty: z.string().min(2).max(80),
  location: z.string().max(120).optional(),
  active: z.boolean().optional(),
  discipline: z.string().max(60).nullable().optional(),
  canDo3d: z.boolean().optional(),
  isCoordinator: z.boolean().optional(),
  showOnWebsite: z.boolean().optional(),
});
const profileInput = z.object({
  phone: z.string().max(40).nullable().optional(),
  description: z.string().max(1500).nullable().optional(),
  linkedinUrl: z
    .string()
    .max(300)
    .regex(/^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/.+/i, "Debe ser un enlace de LinkedIn (https://linkedin.com/in/...)")
    .nullable()
    .optional(),
});
const taskInput = z.object({
  collaboratorId: z.number().int().positive(),
  projectId: z.number().int().positive().nullable().optional(),
  title: z.string().min(2).max(200),
  description: z.string().max(4000).nullable().optional(),
  dueDate: z.string().nullable().optional(),
  fee: z.number().nonnegative().nullable().optional(),
  deliverableFormat: z.enum(["2d", "3d"]).optional(),
});
const taskPatch = z.object({
  title: z.string().min(2).max(200).optional(),
  description: z.string().max(4000).nullable().optional(),
  status: z.enum(TASK_STATUS).optional(),
  dueDate: z.string().nullable().optional(),
  collaboratorId: z.number().int().positive().optional(),
  projectId: z.number().int().positive().nullable().optional(),
  fee: z.number().nonnegative().nullable().optional(),
  feeStatus: z.enum(["pending", "invoiced", "paid"]).optional(),
  deliverableFormat: z.enum(["2d", "3d"]).optional(),
});
const commentInput = z.object({ body: z.string().min(1).max(3000) });
const fileInput = z.object({
  name: z.string().min(1).max(200),
  path: z.string().startsWith("/objects/client-files/").max(500),
  size: z.number().int().nonnegative().optional(),
  kind: z.enum(["deliverable", "invoice"]).default("deliverable"),
});

const toDate = (v: string | null | undefined) => (v ? new Date(v) : null);

const STATUS_LABEL: Record<string, string> = { todo: "Por hacer", doing: "En curso", review: "En revisión", done: "Hecha" };
const logEvent = (taskId: number, type: string, text: string) =>
  db.insert(officeTaskEvents).values({ taskId, type, text }).catch((e) => console.error("office event error:", (e as Error).message));

const fechaCL = (d: Date) => d.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Santiago" });
const santiagoHour = () => Number(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hour12: false, timeZone: "America/Santiago" }).format(new Date()));

// ---------- recordatorios automáticos de fechas de entrega ----------

type Reminder = "d7" | "d1" | `overdue:${number}`;

function reminderEmail(name: string, title: string, due: Date, kind: "soon" | "overdue", daysLeft: number) {
  const link = `${PORTAL_BASE_URL}/oficina`;
  const intro =
    kind === "overdue"
      ? `La tarea <b>${escapeHtml(title)}</b> tenía fecha de entrega el <b>${fechaCL(due)}</b> y aún no la vemos en revisión.`
      : daysLeft <= 1
        ? `La tarea <b>${escapeHtml(title)}</b> se entrega <b>mañana, ${fechaCL(due)}</b>.`
        : `Falta una semana para entregar la tarea <b>${escapeHtml(title)}</b>, con fecha <b>${fechaCL(due)}</b>.`;
  const close =
    kind === "overdue"
      ? "Por favor sube lo que tengas hoy o cuéntame en la tarea qué te está frenando, para ajustar el plan con el resto del equipo."
      : "Este es un cordial recordatorio: cuando termines, súbelo a la oficina digital y pásalo a revisión. Si necesitas más tiempo, avísame en la tarea con anticipación.";
  return emailShell(`<h2 style="color:#1D2530">Hola ${escapeHtml(name)},</h2><p>${intro}</p><p>${close}</p><p style="margin:24px 0"><a href="${link}" style="background:#F97015;color:#1D2530;font-weight:600;padding:12px 22px;border-radius:8px;text-decoration:none">Abrir la oficina digital</a></p><p style="font-size:13px;color:#64748b">Otros proyectos dependen de esta entrega: el equipo coordina sus tareas entre sí.</p>`);
}

export async function runOfficeReminders(): Promise<{ sent: number }> {
  const rows = await db
    .select({ task: officeTasks, name: collaborators.name, email: collaborators.email })
    .from(officeTasks)
    .innerJoin(collaborators, eq(officeTasks.collaboratorId, collaborators.id))
    .where(and(sql`${officeTasks.status} in ('todo','doing')`, sql`${officeTasks.dueDate} is not null`, eq(collaborators.active, true)));
  let sent = 0;
  const now = Date.now();
  for (const { task, name, email } of rows) {
    const due = task.dueDate as Date;
    const daysLeft = Math.ceil((due.getTime() - now) / 86_400_000);
    const done = task.remindersSent ?? [];
    let key: Reminder | null = null;
    let kind: "soon" | "overdue" = "soon";
    if (daysLeft < 0) {
      key = `overdue:${Math.floor(-daysLeft / 3)}`; // vencida: un aviso cada 3 días
      kind = "overdue";
    } else if (daysLeft <= 1) key = "d1";
    else if (daysLeft <= 7) key = "d7";
    if (!key || done.includes(key)) continue;
    const ok = await sendEmail(
      email,
      kind === "overdue" ? `Tarea atrasada: ${task.title}` : `Recordatorio de entrega: ${task.title}`,
      reminderEmail(name, task.title, due, kind, daysLeft),
    ).catch(() => false);
    if (!ok) continue; // sin correo configurado no se marca como enviado: se reintenta
    await db.update(officeTasks).set({ remindersSent: sql`array_append(${officeTasks.remindersSent}, ${key})` }).where(eq(officeTasks.id, task.id));
    await logEvent(task.id, "reminder", kind === "overdue" ? "Aviso de tarea atrasada enviado al colaborador" : daysLeft <= 1 ? "Recordatorio enviado: se entrega mañana" : "Recordatorio enviado: falta una semana");
    if (kind === "overdue" && key === "overdue:0") {
      sendEmail(NOTIFY_EMAIL, `Atrasada: ${task.title}`, emailShell(`<p>La tarea <b>${escapeHtml(task.title)}</b> de <b>${escapeHtml(name)}</b> venció el ${fechaCL(due)} sin pasar a revisión.</p><p><a href="${PORTAL_BASE_URL}/admin/portal">Abrir el panel</a></p>`)).catch(() => undefined);
    }
    sent++;
  }
  return { sent };
}

export function registerOfficeRoutes(app: Express, isAdmin: RequestHandler) {
  const objectStorage = new ObjectStorageService();

  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Demasiados intentos. Intenta de nuevo en unos minutos." },
  });
  const verifyLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false });

  async function streamObject(res: Response, objectPath: string, filename: string) {
    try {
      const file = await objectStorage.getObjectEntityFile(objectPath);
      res.set("Content-Disposition", `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
      await objectStorage.downloadObject(file, res, 0);
    } catch (err) {
      if (err instanceof ObjectNotFoundError) return res.status(404).json({ error: "Archivo no disponible." });
      console.error("office download error:", (err as Error).message);
      return res.status(500).json({ error: "No pudimos descargar el archivo." });
    }
  }

  // La tarea solo existe para el colaborador si le pertenece
  async function ownTask(collaboratorId: number, taskId: number) {
    const [task] = await db
      .select()
      .from(officeTasks)
      .where(and(eq(officeTasks.id, taskId), eq(officeTasks.collaboratorId, collaboratorId)))
      .limit(1);
    return task;
  }

  async function projectNames(ids: (number | null)[]) {
    const clean = Array.from(new Set(ids.filter((i): i is number => i !== null)));
    if (!clean.length) return new Map<number, string>();
    const rows = await db.select({ id: clientProjects.id, name: clientProjects.name }).from(clientProjects).where(inArray(clientProjects.id, clean));
    return new Map(rows.map((r) => [r.id, r.name]));
  }

  // ===== Recordatorios automáticos =====

  // Cada hora, solo de 8:00 a 19:59 hora de Santiago. Cada aviso se manda una vez (queda marcado en la tarea).
  const tick = () => {
    const h = santiagoHour();
    if (h < 8 || h > 19) return;
    runOfficeReminders().catch((e) => console.error("office reminders error:", (e as Error).message));
  };
  setTimeout(tick, 2 * 60 * 1000);
  setInterval(tick, 60 * 60 * 1000);

  // Por si el servidor duerme: un cron externo puede llamar a esta ruta (POST con la clave OFFICE_CRON_SECRET)
  app.post("/api/office/cron/reminders", async (req, res) => {
    const secret = process.env.OFFICE_CRON_SECRET || "";
    const given = String(req.headers["x-cron-secret"] || "");
    const same = secret.length >= 16 && given.length === secret.length && crypto.timingSafeEqual(Buffer.from(given), Buffer.from(secret));
    if (!same) return res.status(401).json({ error: "No autorizado." });
    res.json(await runOfficeReminders());
  });

  // ===== Acceso de colaboradores =====

  app.post("/api/office/auth/request", loginLimiter, async (req, res) => {
    const generic = { ok: true, message: "Si tu correo está registrado, te enviamos un enlace de acceso." };
    try {
      const parsed = z.object({ email: z.string().email() }).safeParse(req.body);
      if (!parsed.success) return res.json(generic);
      const [collab] = await db.select().from(collaborators).where(eq(collaborators.email, normalizeEmail(parsed.data.email))).limit(1);
      if (collab && collab.active) {
        await sendLoginEmail(collab.email, collab.name, await createLoginLink(collab.id));
      }
    } catch (err) {
      console.error("office request error:", (err as Error).message);
    }
    return res.json(generic);
  });

  // POST (no GET) para que los antivirus de correo no consuman el enlace
  app.post("/api/office/auth/verify", verifyLimiter, async (req, res) => {
    try {
      const parsed = z.object({ token: z.string().length(64) }).safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Enlace inválido." });
      const [row] = await db
        .update(collaboratorLoginTokens)
        .set({ usedAt: new Date() })
        .where(
          and(
            eq(collaboratorLoginTokens.tokenHash, sha256(parsed.data.token)),
            isNull(collaboratorLoginTokens.usedAt),
            gt(collaboratorLoginTokens.expiresAt, new Date()),
          ),
        )
        .returning();
      if (!row) return res.status(400).json({ error: "El enlace venció o ya fue usado. Pide uno nuevo." });
      const [collab] = await db.select().from(collaborators).where(eq(collaborators.id, row.collaboratorId)).limit(1);
      if (!collab || !collab.active) return res.status(403).json({ error: "Acceso no disponible." });
      await startOfficeSession(req, collab.id);
      return res.json({ ok: true, name: collab.name });
    } catch (err) {
      console.error("office verify error:", (err as Error).message);
      return res.status(500).json({ error: "No pudimos iniciar tu sesión." });
    }
  });

  app.post("/api/office/auth/logout", (req, res) => {
    const s = getSession(req);
    if (s) delete s.officeCollaboratorId;
    res.json({ ok: true });
  });

  // ===== Vista del colaborador =====

  app.get("/api/office/me", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const tasks = await db.select().from(officeTasks).where(eq(officeTasks.collaboratorId, collab.id)).orderBy(asc(officeTasks.dueDate), desc(officeTasks.createdAt));
    const names = await projectNames(tasks.map((t) => t.projectId));
    const fees = tasks.filter((t) => t.fee !== null);
    const sum = (rows: typeof tasks) => rows.reduce((a, t) => a + Number(t.fee ?? 0), 0);
    res.json({
      collaborator: {
        name: collab.name,
        email: collab.email,
        specialty: collab.specialty,
        isCoordinator: collab.isCoordinator,
        phone: collab.phone,
        description: collab.description,
        linkedinUrl: collab.linkedinUrl,
      },
      tasks: tasks.map((t) => ({
        id: t.id,
        deliverableFormat: t.deliverableFormat,
        revision: t.revision,
        title: t.title,
        status: t.status,
        dueDate: t.dueDate,
        project: t.projectId ? names.get(t.projectId) ?? null : null,
        fee: t.fee,
        feeStatus: t.feeStatus,
      })),
      fees: { pending: sum(fees.filter((t) => t.feeStatus !== "paid")), paid: sum(fees.filter((t) => t.feeStatus === "paid")) },
    });
  });

  app.patch("/api/office/profile", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const parsed = profileInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Datos inválidos." });
    const d = parsed.data;
    const set: Record<string, unknown> = {};
    if (d.phone !== undefined) set.phone = d.phone;
    if (d.description !== undefined) set.description = d.description;
    if (d.linkedinUrl !== undefined) set.linkedinUrl = d.linkedinUrl;
    if (!Object.keys(set).length) return res.status(400).json({ error: "Nada que actualizar." });
    await db.update(collaborators).set(set).where(eq(collaborators.id, collab.id));
    res.json({ ok: true });
  });

  // Tablero del equipo: cada colaborador ve las demás tareas de SUS proyectos (sin honorarios);
  // el coordinador BIM ve además todos los proyectos BIM. Nunca hay datos del cliente.
  app.get("/api/office/team", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const mine = await db.select({ projectId: officeTasks.projectId }).from(officeTasks).where(eq(officeTasks.collaboratorId, collab.id));
    const projectIds = Array.from(new Set(mine.map((m) => m.projectId).filter((i): i is number => i !== null)));
    const scope = collab.isCoordinator
      ? projectIds.length
        ? sql`(${clientProjects.bimRequired} = true or ${officeTasks.projectId} in (${sql.join(projectIds.map((i) => sql`${i}`), sql`, `)}))`
        : sql`${clientProjects.bimRequired} = true`
      : projectIds.length
        ? inArray(officeTasks.projectId, projectIds)
        : sql`false`;
    const rows = await db
      .select({
        id: officeTasks.id,
        title: officeTasks.title,
        status: officeTasks.status,
        dueDate: officeTasks.dueDate,
        deliverableFormat: officeTasks.deliverableFormat,
        revision: officeTasks.revision,
        collaborator: collaborators.name,
        specialty: collaborators.specialty,
        discipline: collaborators.discipline,
        project: clientProjects.name,
        bim: clientProjects.bimRequired,
      })
      .from(officeTasks)
      .innerJoin(collaborators, eq(officeTasks.collaboratorId, collaborators.id))
      .innerJoin(clientProjects, eq(officeTasks.projectId, clientProjects.id))
      .where(and(scope, ne(officeTasks.status, "done")))
      .orderBy(asc(clientProjects.name), asc(officeTasks.dueDate))
      .limit(300);
    res.json(rows);
  });

  app.get("/api/office/tasks/:id", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Tarea inválida." });
    const task = await ownTask(collab.id, id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada." });
    const [files, comments, names, events, bimRow] = await Promise.all([
      db.select({ id: officeTaskFiles.id, name: officeTaskFiles.name, kind: officeTaskFiles.kind, fileSize: officeTaskFiles.fileSize, uploadedAt: officeTaskFiles.uploadedAt }).from(officeTaskFiles).where(eq(officeTaskFiles.taskId, id)).orderBy(desc(officeTaskFiles.uploadedAt)),
      db.select().from(officeTaskComments).where(eq(officeTaskComments.taskId, id)).orderBy(asc(officeTaskComments.createdAt)),
      projectNames([task.projectId]),
      db.select({ id: officeTaskEvents.id, type: officeTaskEvents.type, text: officeTaskEvents.text, createdAt: officeTaskEvents.createdAt }).from(officeTaskEvents).where(eq(officeTaskEvents.taskId, id)).orderBy(asc(officeTaskEvents.createdAt)),
      task.projectId ? db.select({ bim: clientProjects.bimRequired }).from(clientProjects).where(eq(clientProjects.id, task.projectId)).limit(1) : Promise.resolve([]),
    ]);
    res.json({
      task: { ...task, project: task.projectId ? names.get(task.projectId) ?? null : null, bim: bimRow[0]?.bim ?? false, projectId: undefined, collaboratorId: undefined, remindersSent: undefined },
      files,
      comments,
      events,
    });
  });

  // El colaborador avanza su tarea hasta "en revisión"; cerrarla ("hecha") la decide el arquitecto
  app.patch("/api/office/tasks/:id/status", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const id = parseId(req.params.id);
    const parsed = z.object({ status: z.enum(["todo", "doing", "review"]) }).safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const task = await ownTask(collab.id, id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada." });
    if (task.status === "done") return res.status(409).json({ error: "La tarea ya fue cerrada." });
    await db.update(officeTasks).set({ status: parsed.data.status }).where(eq(officeTasks.id, id));
    await logEvent(id, "status", `${collab.name} la pasó a "${STATUS_LABEL[parsed.data.status]}"`);
    if (parsed.data.status === "review" && task.status !== "review") {
      sendEmail(
        NOTIFY_EMAIL,
        `Para revisar: ${task.title}`,
        emailShell(`<p><b>${escapeHtml(collab.name)}</b> dejó en revisión la tarea <b>${escapeHtml(task.title)}</b>.</p><p><a href="${PORTAL_BASE_URL}/admin/portal">Abrir el panel</a></p>`),
      ).catch((e) => console.error("office notify error:", (e as Error).message));
    }
    res.json({ ok: true });
  });

  app.post("/api/office/tasks/:id/comments", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const id = parseId(req.params.id);
    const parsed = commentInput.safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const task = await ownTask(collab.id, id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada." });
    await db.insert(officeTaskComments).values({ taskId: id, author: "collaborator", body: parsed.data.body });
    sendEmail(
      NOTIFY_EMAIL,
      `Comentario de ${collab.name}: ${task.title}`,
      emailShell(`<p><b>${escapeHtml(collab.name)}</b> comentó en <b>${escapeHtml(task.title)}</b>:</p><blockquote>${escapeHtml(parsed.data.body)}</blockquote>`),
    ).catch((e) => console.error("office notify error:", (e as Error).message));
    res.status(201).json({ ok: true });
  });

  app.post("/api/office/upload-url", requireCollaborator, async (_req, res) => {
    try {
      res.json(await objectStorage.getClientFileUploadURL());
    } catch (err) {
      console.error("office upload-url error:", (err as Error).message);
      res.status(500).json({ error: "No se pudo preparar la subida." });
    }
  });

  app.post("/api/office/tasks/:id/files", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const id = parseId(req.params.id);
    const parsed = fileInput.safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const task = await ownTask(collab.id, id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada." });
    const { kind } = parsed.data;
    if (task.status === "done" && kind === "deliverable") return res.status(409).json({ error: "La tarea ya fue cerrada." });
    const [file] = await db.insert(officeTaskFiles).values({ taskId: id, name: parsed.data.name, fileUrl: parsed.data.path, fileSize: parsed.data.size ?? null, kind }).returning();
    if (kind === "invoice") {
      if (task.feeStatus === "pending") await db.update(officeTasks).set({ feeStatus: "invoiced" }).where(eq(officeTasks.id, id));
      await logEvent(id, "invoice", `${collab.name} subió su boleta/factura: ${parsed.data.name}`);
      sendEmail(NOTIFY_EMAIL, `Boleta de ${collab.name}: ${task.title}`, emailShell(`<p><b>${escapeHtml(collab.name)}</b> subió su boleta o factura de <b>${escapeHtml(task.title)}</b>.</p><p><a href="${PORTAL_BASE_URL}/admin/portal">Abrir el panel</a></p>`)).catch(() => undefined);
    } else {
      await logEvent(id, "file", `${collab.name} subió un entregable: ${parsed.data.name}`);
    }
    res.status(201).json({ id: file.id });
  });

  app.get("/api/office/files/:id/download", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Archivo inválido." });
    const [row] = await db
      .select({ file: officeTaskFiles })
      .from(officeTaskFiles)
      .innerJoin(officeTasks, eq(officeTaskFiles.taskId, officeTasks.id))
      .where(and(eq(officeTaskFiles.id, id), eq(officeTasks.collaboratorId, collab.id)))
      .limit(1);
    if (!row) return res.status(404).json({ error: "Archivo no encontrado." });
    return streamObject(res, row.file.fileUrl, row.file.name);
  });

  // ===== Administración (solo el arquitecto) =====

  const admin = "/api/office/admin";

  // Resumen: carga de trabajo y honorarios por colaborador
  app.get(`${admin}/collaborators`, isAdmin, async (_req, res) => {
    const [list, stats] = await Promise.all([
      db.select().from(collaborators).orderBy(asc(collaborators.name)),
      db
        .select({
          collaboratorId: officeTasks.collaboratorId,
          open: sql<number>`count(*) filter (where ${officeTasks.status} <> 'done')::int`,
          review: sql<number>`count(*) filter (where ${officeTasks.status} = 'review')::int`,
          feePending: sql<string>`coalesce(sum(${officeTasks.fee}) filter (where ${officeTasks.status} = 'done' and ${officeTasks.feeStatus} <> 'paid'), 0)`,
        })
        .from(officeTasks)
        .groupBy(officeTasks.collaboratorId),
    ]);
    const byId = new Map(stats.map((s) => [s.collaboratorId, s]));
    res.json(
      list.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        specialty: c.specialty,
        active: c.active,
        discipline: c.discipline,
        canDo3d: c.canDo3d,
        isCoordinator: c.isCoordinator,
        showOnWebsite: c.showOnWebsite,
        linkedinUrl: c.linkedinUrl,
        open: byId.get(c.id)?.open ?? 0,
        review: byId.get(c.id)?.review ?? 0,
        feePending: byId.get(c.id)?.feePending ?? "0",
      })),
    );
  });

  app.post(`${admin}/collaborators`, isAdmin, async (req, res) => {
    const parsed = collabInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Datos inválidos", details: parsed.error.flatten() });
    try {
      const d = parsed.data;
      const [row] = await db
        .insert(collaborators)
        .values({ name: d.name, email: normalizeEmail(d.email), phone: d.phone ?? null, specialty: d.specialty, location: d.location || "Santiago", experience: 0, active: d.active ?? true, discipline: d.discipline ?? null, canDo3d: d.canDo3d ?? false, isCoordinator: d.isCoordinator ?? false })
        .returning();
      res.status(201).json({ id: row.id });
    } catch (err) {
      if ((err as { code?: string }).code === "23505") return res.status(409).json({ error: "Ya existe un colaborador con ese correo." });
      console.error("office create collaborator error:", (err as Error).message);
      res.status(500).json({ error: "No se pudo crear el colaborador." });
    }
  });

  app.patch(`${admin}/collaborators/:id`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = collabInput.partial().safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const d = parsed.data;
    const set: Record<string, unknown> = {};
    if (d.name !== undefined) set.name = d.name;
    if (d.email !== undefined) set.email = normalizeEmail(d.email);
    if (d.phone !== undefined) set.phone = d.phone;
    if (d.specialty !== undefined) set.specialty = d.specialty;
    if (d.location !== undefined) set.location = d.location;
    if (d.active !== undefined) set.active = d.active;
    if (d.discipline !== undefined) set.discipline = d.discipline;
    if (d.canDo3d !== undefined) set.canDo3d = d.canDo3d;
    if (d.isCoordinator !== undefined) set.isCoordinator = d.isCoordinator;
    if (d.showOnWebsite !== undefined) set.showOnWebsite = d.showOnWebsite;
    if (!Object.keys(set).length) return res.status(400).json({ error: "Nada que actualizar." });
    await db.update(collaborators).set(set).where(eq(collaborators.id, id));
    res.json({ ok: true });
  });

  app.post(`${admin}/collaborators/:id/invite`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Colaborador inválido." });
    const [collab] = await db.select().from(collaborators).where(eq(collaborators.id, id)).limit(1);
    if (!collab || !collab.active) return res.status(404).json({ error: "Colaborador no disponible." });
    const sent = await sendLoginEmail(collab.email, collab.name, await createLoginLink(collab.id));
    res.json({ ok: true, emailed: sent });
  });

  app.get(`${admin}/tasks`, isAdmin, async (req, res) => {
    const status = typeof req.query.status === "string" ? req.query.status : "";
    const rows = await db
      .select({ task: officeTasks, collaborator: collaborators.name, project: clientProjects.name })
      .from(officeTasks)
      .innerJoin(collaborators, eq(officeTasks.collaboratorId, collaborators.id))
      .leftJoin(clientProjects, eq(officeTasks.projectId, clientProjects.id))
      .where(status && (TASK_STATUS as readonly string[]).includes(status) ? eq(officeTasks.status, status) : undefined)
      .orderBy(desc(officeTasks.createdAt))
      .limit(300);
    res.json(rows.map((r) => ({ ...r.task, collaborator: r.collaborator, project: r.project })));
  });

  app.post(`${admin}/tasks`, isAdmin, async (req, res) => {
    const parsed = taskInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Datos inválidos", details: parsed.error.flatten() });
    const d = parsed.data;
    const [collab] = await db.select().from(collaborators).where(eq(collaborators.id, d.collaboratorId)).limit(1);
    if (!collab || !collab.active) return res.status(400).json({ error: "Colaborador no disponible." });
    const [task] = await db
      .insert(officeTasks)
      .values({ collaboratorId: d.collaboratorId, projectId: d.projectId ?? null, title: d.title, description: d.description ?? null, dueDate: toDate(d.dueDate), fee: d.fee != null ? String(d.fee) : null, deliverableFormat: d.deliverableFormat ?? "2d" })
      .returning();
    await logEvent(task.id, "created", `Tarea asignada a ${collab.name}${d.dueDate ? `, entrega ${fechaCL(new Date(d.dueDate))}` : ""}${d.fee != null ? `, honorario pactado $${Math.round(d.fee).toLocaleString("es-CL")}` : ""}`);
    const emailed = await sendEmail(
      collab.email,
      `Nueva tarea: ${d.title}`,
      emailShell(`<h2 style="color:#1D2530">Hola ${escapeHtml(collab.name)},</h2><p>Tienes una tarea nueva: <b>${escapeHtml(d.title)}</b>.</p>${d.dueDate ? `<p>Fecha de entrega: ${new Date(d.dueDate).toLocaleDateString("es-CL")}</p>` : ""}<p><a href="${PORTAL_BASE_URL}/oficina">Ver en la oficina digital</a></p>`),
    ).catch(() => false);
    res.status(201).json({ id: task.id, emailed });
  });

  app.patch(`${admin}/tasks/:id`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = taskPatch.safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const d = parsed.data;
    const set: Record<string, unknown> = {};
    if (d.title !== undefined) set.title = d.title;
    if (d.description !== undefined) set.description = d.description;
    if (d.dueDate !== undefined) {
      set.dueDate = toDate(d.dueDate);
      set.remindersSent = sql`'{}'::text[]`; // nueva fecha, recordatorios de nuevo
    }
    if (d.deliverableFormat !== undefined) set.deliverableFormat = d.deliverableFormat;
    if (d.collaboratorId !== undefined) set.collaboratorId = d.collaboratorId;
    if (d.projectId !== undefined) set.projectId = d.projectId;
    if (d.fee !== undefined) set.fee = d.fee === null ? null : String(d.fee);
    if (d.status !== undefined) {
      set.status = d.status;
      set.completedAt = d.status === "done" ? new Date() : null;
    }
    if (d.feeStatus !== undefined) {
      set.feeStatus = d.feeStatus;
      set.feePaidAt = d.feeStatus === "paid" ? new Date() : null;
    }
    if (!Object.keys(set).length) return res.status(400).json({ error: "Nada que actualizar." });
    await db.update(officeTasks).set(set).where(eq(officeTasks.id, id));
    if (d.status !== undefined) await logEvent(id, "status", `Patricio la pasó a "${STATUS_LABEL[d.status]}"`);
    if (d.dueDate !== undefined) await logEvent(id, "status", d.dueDate ? `Nueva fecha de entrega: ${fechaCL(new Date(d.dueDate))}` : "Se quitó la fecha de entrega");
    if (d.feeStatus !== undefined) await logEvent(id, "fee", d.feeStatus === "paid" ? "Honorario pagado" : d.feeStatus === "invoiced" ? "Boleta recibida, honorario por pagar" : "Honorario pendiente");
    if (d.fee !== undefined) await logEvent(id, "fee", d.fee === null ? "Se quitó el honorario pactado" : `Honorario pactado: $${Math.round(d.fee).toLocaleString("es-CL")}`);
    res.json({ ok: true });
  });

  // Pedir una modificación (del propietario, de la obra o del propio proyecto): reabre la tarea y avisa
  app.post(`${admin}/tasks/:id/revision`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = z.object({ note: z.string().min(3).max(3000), dueDate: z.string().nullable().optional() }).safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const [row] = await db
      .select({ task: officeTasks, email: collaborators.email, name: collaborators.name })
      .from(officeTasks)
      .innerJoin(collaborators, eq(officeTasks.collaboratorId, collaborators.id))
      .where(eq(officeTasks.id, id))
      .limit(1);
    if (!row) return res.status(404).json({ error: "Tarea no encontrada." });
    const n = row.task.revision + 1;
    const set: Record<string, unknown> = { status: "doing", revision: n, completedAt: null };
    if (parsed.data.dueDate) {
      set.dueDate = new Date(parsed.data.dueDate);
      set.remindersSent = sql`'{}'::text[]`;
    }
    await db.update(officeTasks).set(set).where(eq(officeTasks.id, id));
    await db.insert(officeTaskComments).values({ taskId: id, author: "admin", body: `Modificación n.º ${n}: ${parsed.data.note}` });
    await logEvent(id, "revision", `Modificación n.º ${n} solicitada: ${parsed.data.note}`);
    sendEmail(
      row.email,
      `Modificación solicitada: ${row.task.title}`,
      emailShell(`<p>Hola ${escapeHtml(row.name)}, hay una modificación (n.º ${n}) en <b>${escapeHtml(row.task.title)}</b>:</p><blockquote>${escapeHtml(parsed.data.note)}</blockquote>${parsed.data.dueDate ? `<p>Nueva fecha de entrega: <b>${fechaCL(new Date(parsed.data.dueDate))}</b></p>` : ""}<p><a href="${PORTAL_BASE_URL}/oficina">Ver en la oficina digital</a></p>`),
    ).catch((e) => console.error("office notify error:", (e as Error).message));
    res.json({ ok: true, revision: n });
  });

  // Marcar un proyecto como BIM (modelo 3D de arquitectura e instalaciones)
  app.patch(`${admin}/projects/:id/bim`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = z.object({ bimRequired: z.boolean() }).safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    await db.update(clientProjects).set({ bimRequired: parsed.data.bimRequired }).where(eq(clientProjects.id, id));
    res.json({ ok: true });
  });

  app.get(`${admin}/tasks/:id`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Tarea inválida." });
    const [task] = await db.select().from(officeTasks).where(eq(officeTasks.id, id)).limit(1);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada." });
    const [files, comments, events] = await Promise.all([
      db.select({ id: officeTaskFiles.id, name: officeTaskFiles.name, kind: officeTaskFiles.kind, fileSize: officeTaskFiles.fileSize, uploadedAt: officeTaskFiles.uploadedAt, publishedDocumentId: officeTaskFiles.publishedDocumentId }).from(officeTaskFiles).where(eq(officeTaskFiles.taskId, id)).orderBy(desc(officeTaskFiles.uploadedAt)),
      db.select().from(officeTaskComments).where(eq(officeTaskComments.taskId, id)).orderBy(asc(officeTaskComments.createdAt)),
      db.select().from(officeTaskEvents).where(eq(officeTaskEvents.taskId, id)).orderBy(asc(officeTaskEvents.createdAt)),
    ]);
    res.json({ task, files, comments, events });
  });

  app.post(`${admin}/tasks/:id/comments`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = commentInput.safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const [row] = await db
      .select({ task: officeTasks, email: collaborators.email, name: collaborators.name })
      .from(officeTasks)
      .innerJoin(collaborators, eq(officeTasks.collaboratorId, collaborators.id))
      .where(eq(officeTasks.id, id))
      .limit(1);
    if (!row) return res.status(404).json({ error: "Tarea no encontrada." });
    await db.insert(officeTaskComments).values({ taskId: id, author: "admin", body: parsed.data.body });
    sendEmail(
      row.email,
      `Comentario en: ${row.task.title}`,
      emailShell(`<p>Hola ${escapeHtml(row.name)}, Patricio comentó en <b>${escapeHtml(row.task.title)}</b>:</p><blockquote>${escapeHtml(parsed.data.body)}</blockquote><p><a href="${PORTAL_BASE_URL}/oficina">Ver en la oficina digital</a></p>`),
    ).catch((e) => console.error("office notify error:", (e as Error).message));
    res.status(201).json({ ok: true });
  });

  app.get(`${admin}/files/:id/download`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Archivo inválido." });
    const [file] = await db.select().from(officeTaskFiles).where(eq(officeTaskFiles.id, id)).limit(1);
    if (!file) return res.status(404).json({ error: "Archivo no encontrado." });
    return streamObject(res, file.fileUrl, file.name);
  });

  // Publicar un entregable revisado en el portal del cliente (no avisa por correo: eso lo decide el arquitecto)
  app.post(`${admin}/files/:id/publish`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = z.object({ type: z.string().min(2).max(40), name: z.string().min(1).max(200).optional() }).safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const [row] = await db
      .select({ file: officeTaskFiles, projectId: officeTasks.projectId })
      .from(officeTaskFiles)
      .innerJoin(officeTasks, eq(officeTaskFiles.taskId, officeTasks.id))
      .where(eq(officeTaskFiles.id, id))
      .limit(1);
    if (!row) return res.status(404).json({ error: "Archivo no encontrado." });
    if (row.file.kind !== "deliverable") return res.status(400).json({ error: "Las boletas no se publican al cliente." });
    if (!row.projectId) return res.status(400).json({ error: "La tarea no está asociada a un proyecto de cliente." });
    if (row.file.publishedDocumentId) return res.status(409).json({ error: "Este archivo ya fue publicado." });
    const [doc] = await db
      .insert(clientDocuments)
      .values({ projectId: row.projectId, name: parsed.data.name ?? row.file.name, type: parsed.data.type, fileUrl: row.file.fileUrl, fileSize: row.file.fileSize, visibleToClient: true })
      .returning();
    await db.update(officeTaskFiles).set({ publishedDocumentId: doc.id }).where(eq(officeTaskFiles.id, id));
    res.status(201).json({ documentId: doc.id });
  });
}
