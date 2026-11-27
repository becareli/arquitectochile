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
  projectLedger,
  clientProjects,
  clientDocuments,
} from "@shared/schema";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";
import { sendEmail, emailShell, escapeHtml, parseId, PORTAL_BASE_URL } from "./portal";
import { backfillProjectCodes, nextDocVersion } from "./classification";
import { recordLedger, ADMIN_NAME } from "./ledger";
import { DISCIPLINE_CODES, DOC_KIND_CODES, extensionOf, slugify, stdFileName } from "@shared/classification";

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

export const requireCollaborator: RequestHandler = async (req, res, next) => {
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
const CRED_EXT: Record<string, string[]> = { cv: ["pdf", "doc", "docx"], title: ["pdf", "jpg", "jpeg", "png"], photo: ["jpg", "jpeg", "png", "webp"] };
const credentialInput = z.object({
  kind: z.enum(["cv", "title", "photo"]),
  name: z.string().min(1).max(200),
  path: z.string().startsWith("/objects/client-files/").max(500),
});
const profileInput = z.object({
  publishConsent: z.boolean().optional(),
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
  discipline: z.enum(DISCIPLINE_CODES).nullable().optional(),
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
  discipline: z.enum(DISCIPLINE_CODES).nullable().optional(),
});
const commentInput = z.object({ body: z.string().min(1).max(3000) });
const fileInput = z.object({
  name: z.string().min(1).max(200),
  path: z.string().startsWith("/objects/client-files/").max(500),
  size: z.number().int().nonnegative().optional(),
  kind: z.enum(["deliverable", "invoice"]).default("deliverable"),
  docKind: z.enum(DOC_KIND_CODES).optional(),
  description: z.string().max(120).optional(), // documento nuevo
  docSlug: z.string().max(60).regex(/^[A-Za-z0-9-]+$/).optional(), // corrección de un documento ya entregado
});

const toDate = (v: string | null | undefined) => (v ? new Date(v) : null);

export const STATUS_LABEL: Record<string, string> = { todo: "Por hacer", doing: "En curso", review: "En revisión", done: "Hecha" };
export const logEvent = (taskId: number, type: string, text: string) =>
  db.insert(officeTaskEvents).values({ taskId, type, text }).catch((e) => console.error("office event error:", (e as Error).message));

export const fechaCL = (d: Date) => d.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Santiago" });
const santiagoHour = () => Number(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hour12: false, timeZone: "America/Santiago" }).format(new Date()));

// ---------- sugerencia de impacto de una modificación ----------

const norm = (v: string) => v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// Reglas simples y revisables: palabras del cambio -> disciplinas que suelen verse afectadas.
// "stems" reconoce la disciplina del colaborador (su campo disciplina o su especialidad).
const IMPACT_RULES: { discipline: string; stems: string[]; keywords: string[] }[] = [
  { discipline: "Arquitectura", stems: ["arquitect"], keywords: [] }, // siempre
  { discipline: "Estructura", stems: ["estructur", "calcul"], keywords: ["muro", "tabique", "losa", "viga", "pilar", "fundacion", "ampliar", "ampliacion", "segundo piso", "mansarda", "escalera", "abertura", "porton", "demoler", "demolicion", "altura", "techumbre", "cercha"] },
  { discipline: "Agua potable", stems: ["sanitari", "agua potable"], keywords: ["bano", "cocina", "lavaplatos", "lavadora", "ducha", "tina", "wc", "artefacto", "agua potable", "llave", "calefon", "termo", "logia", "piscina", "riego", "lavamanos"] },
  { discipline: "Alcantarillado", stems: ["alcantarill", "sanitari"], keywords: ["bano", "cocina", "lavaplatos", "wc", "ducha", "tina", "lavamanos", "desague", "alcantarillado", "camara", "fosa", "aguas lluvia", "bajada", "patio", "logia"] },
  { discipline: "Electricidad", stems: ["electric"], keywords: ["enchufe", "tomacorriente", "iluminacion", "luz", "tablero", "electric", "ampliacion", "ampliar", "cocina", "bano", "dormitorio", "muro", "tabique", "cargador", "porton", "calefaccion", "climatiz", "aire acondicionado"] },
  { discipline: "Gas", stems: ["gas"], keywords: ["gas", "cocina", "calefon", "caldera", "estufa", "logia", "termo", "campana"] },
  { discipline: "Climatización y ventilación", stems: ["climatiz", "ventilac"], keywords: ["clima", "aire acondicionado", "ventilacion", "extraccion", "calefaccion", "campana", "bano", "cocina"] },
  { discipline: "Eficiencia térmica", stems: ["termic", "eficiencia"], keywords: ["aislacion", "ventana", "termopanel", "termic", "eifs", "muro", "techumbre", "ampliacion", "orientacion"] },
];

export function suggestImpact(
  note: string,
  tasks: { id: number; title: string; status: string; revision: number; collaborator: string; specialty: string; discipline: string | null; isCoordinator: boolean }[],
  bim: boolean,
) {
  const text = norm(note);
  const matches = IMPACT_RULES.map((r) => ({ rule: r, hits: r.keywords.filter((k) => text.includes(k)) })).filter((m) => m.rule.keywords.length === 0 || m.hits.length > 0);
  const result = matches.map(({ rule, hits }) => {
    const mine = tasks.filter((t) => {
      const who = norm(`${t.discipline ?? ""} ${t.specialty}`);
      return rule.stems.some((st) => who.includes(st));
    });
    return { discipline: rule.discipline, reason: hits.length ? `Menciona: ${hits.join(", ")}` : "Todo cambio toca el diseño de arquitectura", tasks: mine, missing: mine.length === 0 };
  });
  if (bim) {
    const coord = tasks.filter((t) => t.isCoordinator);
    result.push({ discipline: "Coordinación BIM", reason: "Proyecto BIM: revisar interferencias entre disciplinas tras el cambio", tasks: coord, missing: coord.length === 0 });
  }
  return result;
}

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
    .where(and(sql`${officeTasks.status} in ('todo','doing')`, sql`${officeTasks.dueDate} is not null`, sql`(not ${officeTasks.kickoffRequired} or ${officeTasks.kickoffDoneAt} is not null)`, eq(collaborators.active, true)));
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
        onboarded: Boolean(collab.onboardedAt),
        canDo3d: collab.canDo3d,
        name: collab.name,
        email: collab.email,
        specialty: collab.specialty,
        isCoordinator: collab.isCoordinator,
        phone: collab.phone,
        description: collab.description,
        linkedinUrl: collab.linkedinUrl,
        cvName: collab.cvName,
        titleCertName: collab.titleCertName,
        titleVerified: Boolean(collab.titleVerifiedAt),
        hasPhoto: Boolean(collab.profileImage),
        publishConsent: collab.publishConsent,
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
    if (d.publishConsent !== undefined && d.publishConsent !== collab.publishConsent) {
      set.publishConsent = d.publishConsent;
      set.publishConsentAt = d.publishConsent ? new Date() : null;
      if (!d.publishConsent) set.showOnWebsite = false; // retirar el permiso lo saca de la web al instante
    }
    if (!Object.keys(set).length) return res.status(400).json({ error: "Nada que actualizar." });
    await db.update(collaborators).set(set).where(eq(collaborators.id, collab.id));
    res.json({ ok: true });
  });

  // Credenciales: CV, certificado de título y foto (el carnet de identidad NO se pide)
  app.post("/api/office/credentials", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const parsed = credentialInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const { kind, name, path } = parsed.data;
    if (!CRED_EXT[kind].includes(extensionOf(name).toLowerCase())) {
      return res.status(400).json({ error: `Formato no válido. Use: ${CRED_EXT[kind].join(", ")}.` });
    }
    const set: Record<string, unknown> =
      kind === "cv" ? { cvUrl: path, cvName: name }
      : kind === "title" ? { titleCertUrl: path, titleCertName: name, titleVerifiedAt: null }
      : { profileImage: path };
    await db.update(collaborators).set(set).where(eq(collaborators.id, collab.id));
    res.json({ ok: true });
  });

  app.get("/api/office/credentials/:kind/download", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const k = req.params.kind;
    const path = k === "cv" ? collab.cvUrl : k === "title" ? collab.titleCertUrl : k === "photo" ? collab.profileImage : null;
    if (!path) return res.status(404).json({ error: "No hay archivo." });
    return streamObject(res, path, k === "cv" ? collab.cvName ?? "CV" : k === "title" ? collab.titleCertName ?? "Titulo" : "Foto");
  });

  // Staff público: solo quienes aceptaron publicar Y Patricio activó en la web
  const publicStaff = and(eq(collaborators.active, true), eq(collaborators.publishConsent, true), eq(collaborators.showOnWebsite, true));
  app.get("/api/public/team", async (_req, res) => {
    const rows = await db
      .select({ id: collaborators.id, name: collaborators.name, specialty: collaborators.specialty, discipline: collaborators.discipline, linkedinUrl: collaborators.linkedinUrl, photo: collaborators.profileImage })
      .from(collaborators)
      .where(publicStaff)
      .orderBy(asc(collaborators.name));
    res.set("Cache-Control", "public, max-age=300");
    res.json(rows.map((r) => ({ id: r.id, name: r.name, specialty: r.specialty, discipline: r.discipline, linkedinUrl: r.linkedinUrl, photoUrl: r.photo ? `/api/public/team/${r.id}/photo` : null })));
  });
  app.get("/api/public/team/:id/photo", async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).end();
    const [c] = await db.select({ photo: collaborators.profileImage }).from(collaborators).where(and(eq(collaborators.id, id), publicStaff)).limit(1);
    if (!c?.photo) return res.status(404).end();
    try {
      const file = await objectStorage.getObjectEntityFile(c.photo);
      res.set("Cache-Control", "public, max-age=300");
      await objectStorage.downloadObject(file, res, 300);
    } catch { res.status(404).end(); }
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
      db.select({ id: officeTaskFiles.id, name: officeTaskFiles.name, stdName: officeTaskFiles.stdName, version: officeTaskFiles.version, kind: officeTaskFiles.kind, fileSize: officeTaskFiles.fileSize, uploadedAt: officeTaskFiles.uploadedAt, reviewedBy: officeTaskFiles.reviewedBy, approvedBy: officeTaskFiles.approvedBy, returnedNote: officeTaskFiles.returnedNote }).from(officeTaskFiles).where(eq(officeTaskFiles.taskId, id)).orderBy(desc(officeTaskFiles.uploadedAt)),
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
      await recordLedger({ projectId: task.projectId, taskId: id, action: `Entregó a revisión: ${task.title}`, role: "Diseñó / ejecutó", actorType: "collaborator", actorName: collab.name });
    }
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
    // Entregable de un proyecto con código: el sistema lo nombra y le asigna la versión.
    // Misma lámina (proyecto + disciplina + tipo + descripción), aunque la suba otra tarea = versión siguiente.
    let stdName: string | null = null;
    let version = 1;
    let docKind: string | null = null;
    let docSlug: string | null = null;
    if (kind === "deliverable" && task.projectId && task.discipline && parsed.data.docKind) {
      const [proj] = await db.select({ code: clientProjects.code }).from(clientProjects).where(eq(clientProjects.id, task.projectId)).limit(1);
      if (proj?.code) {
        docKind = parsed.data.docKind;
        docSlug = parsed.data.docSlug || slugify(parsed.data.description?.trim() || task.title) || "Documento";
        version = await nextDocVersion(task.projectId, task.discipline, docKind, docSlug);
        stdName = stdFileName({ code: proj.code, discipline: task.discipline, kind: docKind, description: docSlug, version, ext: extensionOf(parsed.data.name) });
      }
    }
    const [file] = await db.insert(officeTaskFiles).values({ taskId: id, name: parsed.data.name, fileUrl: parsed.data.path, fileSize: parsed.data.size ?? null, kind, docKind, version, stdName, docSlug }).returning();
    if (kind === "invoice") {
      if (task.feeStatus === "pending") await db.update(officeTasks).set({ feeStatus: "invoiced" }).where(eq(officeTasks.id, id));
      await logEvent(id, "invoice", `${collab.name} subió su boleta/factura: ${parsed.data.name}`);
      sendEmail(NOTIFY_EMAIL, `Boleta de ${collab.name}: ${task.title}`, emailShell(`<p><b>${escapeHtml(collab.name)}</b> subió su boleta o factura de <b>${escapeHtml(task.title)}</b>.</p><p><a href="${PORTAL_BASE_URL}/admin/portal">Abrir el panel</a></p>`)).catch(() => undefined);
    } else {
      await logEvent(id, "file", `${collab.name} subió ${version > 1 ? `la corrección (V${String(version).padStart(2, "0")})` : "un entregable"}: ${stdName ?? parsed.data.name}`);
    }
    if (kind === "deliverable") {
      await recordLedger({ projectId: task.projectId, taskId: id, fileId: file.id, docName: stdName ?? parsed.data.name, docVersion: stdName ? version : null, action: version > 1 ? `Entregó corrección V${String(version).padStart(2, "0")}` : "Entregó documento", role: "Diseñó / ejecutó", actorType: "collaborator", actorName: collab.name, detail: task.title });
    }
    res.status(201).json({ id: file.id, stdName, version });
  });

  // Documentos que ya existen en el proyecto para la disciplina de esta tarea: sirve para subir una corrección
  app.get("/api/office/tasks/:id/documents", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Tarea inválida." });
    const task = await ownTask(collab.id, id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada." });
    if (!task.projectId || !task.discipline) return res.json([]);
    const rows = await db
      .select({ docKind: officeTaskFiles.docKind, docSlug: officeTaskFiles.docSlug, version: sql<number>`max(${officeTaskFiles.version})::int` })
      .from(officeTaskFiles)
      .innerJoin(officeTasks, eq(officeTaskFiles.taskId, officeTasks.id))
      .where(and(eq(officeTasks.projectId, task.projectId), eq(officeTasks.discipline, task.discipline), sql`${officeTaskFiles.docSlug} is not null`))
      .groupBy(officeTaskFiles.docKind, officeTaskFiles.docSlug)
      .orderBy(asc(officeTaskFiles.docSlug));
    res.json(rows);
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
    return streamObject(res, row.file.fileUrl, row.file.stdName ?? row.file.name);
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
        onboarded: Boolean(c.onboardedAt),
        discipline: c.discipline,
        canDo3d: c.canDo3d,
        isCoordinator: c.isCoordinator,
        showOnWebsite: c.showOnWebsite,
        linkedinUrl: c.linkedinUrl,
        hasCv: Boolean(c.cvUrl),
        hasTitle: Boolean(c.titleCertUrl),
        titleVerified: Boolean(c.titleVerifiedAt),
        hasPhoto: Boolean(c.profileImage),
        publishConsent: c.publishConsent,
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
    if (d.showOnWebsite !== undefined) {
      if (d.showOnWebsite) {
        const [c] = await db.select({ ok: collaborators.publishConsent }).from(collaborators).where(eq(collaborators.id, id)).limit(1);
        if (!c?.ok) return res.status(409).json({ error: "Esta persona no ha autorizado publicar sus datos." });
      }
      set.showOnWebsite = d.showOnWebsite;
    }
    if (!Object.keys(set).length) return res.status(400).json({ error: "Nada que actualizar." });
    await db.update(collaborators).set(set).where(eq(collaborators.id, id));
    res.json({ ok: true });
  });

  app.get(`${admin}/collaborators/:id/credentials/:kind`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Inválido." });
    const [c] = await db.select().from(collaborators).where(eq(collaborators.id, id)).limit(1);
    const k = req.params.kind;
    const path = c ? (k === "cv" ? c.cvUrl : k === "title" ? c.titleCertUrl : k === "photo" ? c.profileImage : null) : null;
    if (!c || !path) return res.status(404).json({ error: "No hay archivo." });
    return streamObject(res, path, k === "cv" ? c.cvName ?? "CV" : k === "title" ? c.titleCertName ?? "Titulo" : "Foto");
  });

  app.post(`${admin}/collaborators/:id/verify-title`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Inválido." });
    const [c] = await db.select({ t: collaborators.titleCertUrl }).from(collaborators).where(eq(collaborators.id, id)).limit(1);
    if (!c?.t) return res.status(409).json({ error: "Aún no sube su certificado de título." });
    const on = req.body?.verified !== false;
    await db.update(collaborators).set({ titleVerifiedAt: on ? new Date() : null, verified: on }).where(eq(collaborators.id, id));
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
      .values({ collaboratorId: d.collaboratorId, projectId: d.projectId ?? null, title: d.title, description: d.description ?? null, dueDate: toDate(d.dueDate), fee: d.fee != null ? String(d.fee) : null, deliverableFormat: d.deliverableFormat ?? "2d", discipline: d.discipline ?? null })
      .returning();
    await logEvent(task.id, "created", `Tarea asignada a ${collab.name}${d.dueDate ? `, entrega ${fechaCL(new Date(d.dueDate))}` : ""}${d.fee != null ? `, honorario pactado $${Math.round(d.fee).toLocaleString("es-CL")}` : ""}`);
    await recordLedger({ projectId: d.projectId, taskId: task.id, action: `Asignó la tarea: ${d.title}`, role: "Asignó", actorType: "admin", actorName: ADMIN_NAME, detail: `Asignada a ${collab.name}${d.discipline ? ` (${d.discipline})` : ""}${d.dueDate ? `, entrega ${fechaCL(new Date(d.dueDate))}` : ""}` });
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
    if (d.discipline !== undefined) set.discipline = d.discipline;
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
    if (d.status !== undefined) {
      await logEvent(id, "status", `Patricio la pasó a "${STATUS_LABEL[d.status]}"`);
      if (d.status === "done") {
        const [tk] = await db.select({ projectId: officeTasks.projectId, title: officeTasks.title }).from(officeTasks).where(eq(officeTasks.id, id)).limit(1);
        if (tk) await recordLedger({ projectId: tk.projectId, taskId: id, action: `Cerró la tarea: ${tk.title}`, role: "Cerró", actorType: "admin", actorName: ADMIN_NAME });
      }
    }
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
    await recordLedger({ projectId: row.task.projectId, taskId: id, action: `Solicitó modificación n.º ${n}: ${row.task.title}`, role: "Solicitó", actorType: "admin", actorName: ADMIN_NAME, detail: parsed.data.note });
    sendEmail(
      row.email,
      `Modificación solicitada: ${row.task.title}`,
      emailShell(`<p>Hola ${escapeHtml(row.name)}, hay una modificación (n.º ${n}) en <b>${escapeHtml(row.task.title)}</b>:</p><blockquote>${escapeHtml(parsed.data.note)}</blockquote>${parsed.data.dueDate ? `<p>Nueva fecha de entrega: <b>${fechaCL(new Date(parsed.data.dueDate))}</b></p>` : ""}<p><a href="${PORTAL_BASE_URL}/oficina">Ver en la oficina digital</a></p>`),
    ).catch((e) => console.error("office notify error:", (e as Error).message));
    res.json({ ok: true, revision: n });
  });

  // Asistente de modificaciones: dado el cambio, sugiere qué disciplinas y tareas del proyecto se afectan
  app.post(`${admin}/projects/:id/impact`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = z.object({ note: z.string().min(3).max(3000) }).safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const [project] = await db.select({ bim: clientProjects.bimRequired }).from(clientProjects).where(eq(clientProjects.id, id)).limit(1);
    if (!project) return res.status(404).json({ error: "Proyecto no encontrado." });
    const tasks = await db
      .select({ id: officeTasks.id, title: officeTasks.title, status: officeTasks.status, revision: officeTasks.revision, collaborator: collaborators.name, specialty: collaborators.specialty, discipline: collaborators.discipline, isCoordinator: collaborators.isCoordinator })
      .from(officeTasks)
      .innerJoin(collaborators, eq(officeTasks.collaboratorId, collaborators.id))
      .where(eq(officeTasks.projectId, id));
    res.json({ bim: project.bim, suggestions: suggestImpact(parsed.data.note, tasks, project.bim) });
  });

  // Códigos para los proyectos que aún no tienen (del más antiguo al más nuevo)
  app.post(`${admin}/projects/assign-codes`, isAdmin, async (_req, res) => {
    res.json({ assigned: await backfillProjectCodes() });
  });

  // Archivo: índice único de documentos (de la oficina y del portal), con filtros. Base del futuro armado de expedientes.
  async function archiveRows(q: { projectId?: number; discipline?: string; docKind?: string; all?: boolean }) {
    const fromOffice = await db
      .select({
        id: officeTaskFiles.id,
        stdName: officeTaskFiles.stdName,
        original: officeTaskFiles.name,
        version: officeTaskFiles.version,
        docKind: officeTaskFiles.docKind,
        docSlug: officeTaskFiles.docSlug,
        discipline: officeTasks.discipline,
        date: officeTaskFiles.uploadedAt,
        author: collaborators.name,
        published: officeTaskFiles.publishedDocumentId,
        projectId: clientProjects.id,
        code: clientProjects.code,
        address: clientProjects.address,
        project: clientProjects.name,
      })
      .from(officeTaskFiles)
      .innerJoin(officeTasks, eq(officeTaskFiles.taskId, officeTasks.id))
      .innerJoin(collaborators, eq(officeTasks.collaboratorId, collaborators.id))
      .innerJoin(clientProjects, eq(officeTasks.projectId, clientProjects.id))
      .where(eq(officeTaskFiles.kind, "deliverable"));
    const fromPortal = await db
      .select({
        id: clientDocuments.id,
        stdName: clientDocuments.stdName,
        original: clientDocuments.name,
        version: clientDocuments.version,
        docKind: clientDocuments.docKind,
        docSlug: clientDocuments.docSlug,
        discipline: clientDocuments.discipline,
        date: clientDocuments.uploadDate,
        projectId: clientProjects.id,
        code: clientProjects.code,
        address: clientProjects.address,
        project: clientProjects.name,
        visible: clientDocuments.visibleToClient,
      })
      .from(clientDocuments)
      .innerJoin(clientProjects, eq(clientDocuments.projectId, clientProjects.id));
    const publishedIds = new Set(fromOffice.map((r) => r.published).filter((i): i is number => i !== null));
    const rows = [
      ...fromOffice.map((r) => ({ source: "oficina", id: r.id, name: r.stdName ?? r.original, classified: Boolean(r.stdName), docSlug: r.docSlug, version: r.version, docKind: r.docKind, discipline: r.discipline, date: r.date, author: r.author, projectId: r.projectId, code: r.code, address: r.address, project: r.project, clientVisible: r.published !== null })),
      ...fromPortal.filter((r) => !publishedIds.has(r.id)).map((r) => ({ source: "portal", id: r.id, name: r.stdName ?? r.original, classified: Boolean(r.stdName), docSlug: r.docSlug, version: r.version, docKind: r.docKind, discipline: r.discipline, date: r.date, author: "Patricio", projectId: r.projectId, code: r.code, address: r.address, project: r.project, clientVisible: r.visible })),
    ];
    // Vigente = la versión más alta de cada lámina (proyecto + disciplina + tipo + descripción)
    const key = (r: { projectId: number; discipline: string | null; docKind: string | null; docSlug: string | null }) => `${r.projectId}|${r.discipline}|${r.docKind}|${r.docSlug}`;
    const latest = new Map<string, number>();
    for (const r of rows) if (r.docSlug) latest.set(key(r), Math.max(latest.get(key(r)) ?? 0, r.version));
    const withCurrent = rows.map((r) => ({ ...r, current: !r.docSlug || latest.get(key(r)) === r.version }));
    return withCurrent
      .filter((r) => q.all || r.current)
      .filter((r) => (!q.projectId || r.projectId === q.projectId) && (!q.discipline || r.discipline === q.discipline) && (!q.docKind || r.docKind === q.docKind))
      .sort((a, b) => (a.code ?? "").localeCompare(b.code ?? "") || a.name.localeCompare(b.name));
  }
  const archiveQuery = (req: Request) => ({
    projectId: parseId(String(req.query.projectId ?? "")) ?? undefined,
    discipline: typeof req.query.discipline === "string" && req.query.discipline ? req.query.discipline : undefined,
    docKind: typeof req.query.docKind === "string" && req.query.docKind ? req.query.docKind : undefined,
    all: req.query.all === "1",
  });

  app.get(`${admin}/archive`, isAdmin, async (req, res) => {
    res.json(await archiveRows(archiveQuery(req)));
  });

  // CSV (separado por ;, con BOM para que Excel lo abra bien): índice de documentos por proyecto
  app.get(`${admin}/archive.csv`, isAdmin, async (req, res) => {
    const rows = await archiveRows(archiveQuery(req));
    const q = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const head = ["codigo_proyecto", "direccion", "disciplina", "tipo", "version", "nombre_estandar", "vigente", "fecha", "autor", "visible_cliente"];
    const lines = rows.map((r) => [r.code, r.address ?? r.project, r.discipline, r.docKind, r.version, r.name, r.current ? "si" : "no", new Date(r.date).toISOString().slice(0, 10), r.author, r.clientVisible ? "si" : "no"].map(q).join(";"));
    res.set("Content-Type", "text/csv; charset=utf-8").set("Content-Disposition", 'attachment; filename="indice-documentos.csv"');
    res.send("\uFEFF" + [head.join(";"), ...lines].join("\r\n"));
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
      db.select({ id: officeTaskFiles.id, name: officeTaskFiles.name, stdName: officeTaskFiles.stdName, version: officeTaskFiles.version, kind: officeTaskFiles.kind, fileSize: officeTaskFiles.fileSize, uploadedAt: officeTaskFiles.uploadedAt, publishedDocumentId: officeTaskFiles.publishedDocumentId, reviewedBy: officeTaskFiles.reviewedBy, approvedBy: officeTaskFiles.approvedBy, returnedNote: officeTaskFiles.returnedNote }).from(officeTaskFiles).where(eq(officeTaskFiles.taskId, id)).orderBy(desc(officeTaskFiles.uploadedAt)),
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
    return streamObject(res, file.fileUrl, file.stdName ?? file.name);
  });

  // Publicar un entregable revisado en el portal del cliente (no avisa por correo: eso lo decide el arquitecto)
  app.post(`${admin}/files/:id/publish`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = z.object({ type: z.string().min(2).max(40), name: z.string().min(1).max(200).optional() }).safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const [row] = await db
      .select({ file: officeTaskFiles, projectId: officeTasks.projectId, discipline: officeTasks.discipline })
      .from(officeTaskFiles)
      .innerJoin(officeTasks, eq(officeTaskFiles.taskId, officeTasks.id))
      .where(eq(officeTaskFiles.id, id))
      .limit(1);
    if (!row) return res.status(404).json({ error: "Archivo no encontrado." });
    if (row.file.kind !== "deliverable") return res.status(400).json({ error: "Las boletas no se publican al cliente." });
    if (!row.projectId) return res.status(400).json({ error: "La tarea no está asociada a un proyecto de cliente." });
    if (row.file.publishedDocumentId) return res.status(409).json({ error: "Este archivo ya fue publicado." });
    if (!row.file.approvedAt) return res.status(409).json({ error: "Primero apruébalo: solo se publica lo aprobado." });
    const [doc] = await db
      .insert(clientDocuments)
      .values({ projectId: row.projectId, name: parsed.data.name ?? row.file.stdName ?? row.file.name, type: parsed.data.type, fileUrl: row.file.fileUrl, fileSize: row.file.fileSize, visibleToClient: true, version: row.file.version, docKind: row.file.docKind, stdName: row.file.stdName, docSlug: row.file.docSlug, discipline: row.file.stdName ? row.discipline : null })
      .returning();
    await db.update(officeTaskFiles).set({ publishedDocumentId: doc.id }).where(eq(officeTaskFiles.id, id));
    // Al publicar una versión nueva, las anteriores de esa lámina dejan de verse para el cliente (quedan en el historial)
    if (row.file.docSlug && row.file.docKind && row.discipline) {
      await db.update(clientDocuments).set({ visibleToClient: false }).where(and(eq(clientDocuments.projectId, row.projectId), eq(clientDocuments.discipline, row.discipline), eq(clientDocuments.docKind, row.file.docKind), eq(clientDocuments.docSlug, row.file.docSlug), ne(clientDocuments.id, doc.id)));
    }
    await recordLedger({ projectId: row.projectId, taskId: row.file.taskId, fileId: id, docName: row.file.stdName ?? row.file.name, docVersion: row.file.stdName ? row.file.version : null, action: "Publicó al portal del cliente", role: "Publicó", actorType: "admin", actorName: ADMIN_NAME });
    res.status(201).json({ documentId: doc.id });
  });

  // ----- Revisión y aprobación de entregables -----

  async function fileWithTask(id: number) {
    const [row] = await db
      .select({ file: officeTaskFiles, task: officeTasks, collabEmail: collaborators.email, collabName: collaborators.name })
      .from(officeTaskFiles)
      .innerJoin(officeTasks, eq(officeTaskFiles.taskId, officeTasks.id))
      .innerJoin(collaborators, eq(officeTasks.collaboratorId, collaborators.id))
      .where(and(eq(officeTaskFiles.id, id), eq(officeTaskFiles.kind, "deliverable")))
      .limit(1);
    return row;
  }
  const docInfo = (f: { stdName: string | null; name: string; version: number }) => ({ docName: f.stdName ?? f.name, docVersion: f.stdName ? f.version : null });

  // Revisión técnica por un coordinador (no puede revisar lo que él mismo entregó)
  app.post("/api/office/files/:id/review", requireCollaborator, async (req, res) => {
    const collab = (req as any).collaborator;
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Archivo inválido." });
    if (!collab.isCoordinator) return res.status(403).json({ error: "Solo un coordinador puede revisar." });
    const row = await fileWithTask(id);
    if (!row) return res.status(404).json({ error: "Archivo no encontrado." });
    if (row.task.collaboratorId === collab.id) return res.status(403).json({ error: "No puedes revisar tu propio trabajo." });
    await db.update(officeTaskFiles).set({ reviewedBy: collab.name, reviewedAt: new Date(), returnedNote: null, returnedAt: null }).where(eq(officeTaskFiles.id, id));
    await logEvent(row.task.id, "file", `${collab.name} revisó ${row.file.stdName ?? row.file.name}`);
    await recordLedger({ projectId: row.task.projectId, taskId: row.task.id, fileId: id, ...docInfo(row.file), action: "Revisó el documento", role: "Revisó", actorType: "collaborator", actorName: collab.name });
    res.json({ ok: true });
  });

  app.post(`${admin}/files/:id/review`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Archivo inválido." });
    const row = await fileWithTask(id);
    if (!row) return res.status(404).json({ error: "Archivo no encontrado." });
    await db.update(officeTaskFiles).set({ reviewedBy: ADMIN_NAME, reviewedAt: new Date(), returnedNote: null, returnedAt: null }).where(eq(officeTaskFiles.id, id));
    await logEvent(row.task.id, "file", `Patricio revisó ${row.file.stdName ?? row.file.name}`);
    await recordLedger({ projectId: row.task.projectId, taskId: row.task.id, fileId: id, ...docInfo(row.file), action: "Revisó el documento", role: "Revisó", actorType: "admin", actorName: ADMIN_NAME });
    res.json({ ok: true });
  });

  app.post(`${admin}/files/:id/approve`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Archivo inválido." });
    const row = await fileWithTask(id);
    if (!row) return res.status(404).json({ error: "Archivo no encontrado." });
    const now = new Date();
    await db.update(officeTaskFiles).set({ approvedBy: ADMIN_NAME, approvedAt: now, reviewedBy: row.file.reviewedBy ?? ADMIN_NAME, reviewedAt: row.file.reviewedAt ?? now, returnedNote: null, returnedAt: null }).where(eq(officeTaskFiles.id, id));
    await logEvent(row.task.id, "file", `Patricio aprobó ${row.file.stdName ?? row.file.name}`);
    await recordLedger({ projectId: row.task.projectId, taskId: row.task.id, fileId: id, ...docInfo(row.file), action: "Aprobó el documento", role: "Aprobó", actorType: "admin", actorName: ADMIN_NAME });
    res.json({ ok: true });
  });

  // Devolver con observación: reabre la tarea y avisa al colaborador
  app.post(`${admin}/files/:id/return`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = z.object({ note: z.string().min(3).max(3000) }).safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Escribe la observación." });
    const row = await fileWithTask(id);
    if (!row) return res.status(404).json({ error: "Archivo no encontrado." });
    const name = row.file.stdName ?? row.file.name;
    await db.update(officeTaskFiles).set({ returnedNote: parsed.data.note, returnedAt: new Date(), approvedBy: null, approvedAt: null }).where(eq(officeTaskFiles.id, id));
    await db.update(officeTasks).set({ status: "doing", completedAt: null }).where(eq(officeTasks.id, row.task.id));
    await db.insert(officeTaskComments).values({ taskId: row.task.id, author: "admin", body: `Observación a ${name}: ${parsed.data.note}` });
    await logEvent(row.task.id, "revision", `Patricio devolvió ${name}: ${parsed.data.note}`);
    await recordLedger({ projectId: row.task.projectId, taskId: row.task.id, fileId: id, ...docInfo(row.file), action: "Devolvió con observaciones", role: "Devolvió", actorType: "admin", actorName: ADMIN_NAME, detail: parsed.data.note });
    sendEmail(row.collabEmail, `Observaciones a tu entrega: ${row.task.title}`, emailShell(`<p>Hola ${escapeHtml(row.collabName)}, hay observaciones a <b>${escapeHtml(name)}</b>:</p><blockquote>${escapeHtml(parsed.data.note)}</blockquote><p>Sube la corrección en la misma tarea: el sistema le asigna la versión siguiente.</p><p><a href="${PORTAL_BASE_URL}/oficina">Ver en la oficina digital</a></p>`)).catch(() => undefined);
    res.json({ ok: true });
  });

  // ----- Bitácora del proyecto -----

  const ledgerQuery = async (req: Request) => {
    const projectId = parseId(String(req.query.projectId ?? ""));
    if (!projectId) return null;
    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
    return db
      .select()
      .from(projectLedger)
      .where(and(eq(projectLedger.projectId, projectId), q ? sql`(${projectLedger.docName} ilike ${"%" + q + "%"} or ${projectLedger.action} ilike ${"%" + q + "%"} or ${projectLedger.actorName} ilike ${"%" + q + "%"})` : undefined))
      .orderBy(desc(projectLedger.createdAt), desc(projectLedger.id))
      .limit(1000);
  };

  app.get(`${admin}/ledger`, isAdmin, async (req, res) => {
    const rows = await ledgerQuery(req);
    if (!rows) return res.status(400).json({ error: "Elige un proyecto." });
    res.json(rows);
  });

  app.get(`${admin}/ledger.csv`, isAdmin, async (req, res) => {
    const rows = await ledgerQuery(req);
    if (!rows) return res.status(400).json({ error: "Elige un proyecto." });
    const q = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [...rows].reverse().map((r) => [new Date(r.createdAt).toLocaleString("es-CL", { timeZone: "America/Santiago" }), r.projectCode, r.docName, r.docVersion ? `V${String(r.docVersion).padStart(2, "0")}` : "", r.action, r.role, r.actorName, r.detail].map(q).join(";"));
    res.set("Content-Type", "text/csv; charset=utf-8").set("Content-Disposition", 'attachment; filename="bitacora-proyecto.csv"');
    res.send("\uFEFF" + ["fecha;codigo_proyecto;documento;version;accion;rol;persona;detalle", ...lines].join("\r\n"));
  });
}
