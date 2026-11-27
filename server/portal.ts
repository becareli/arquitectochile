import type { Express, Request, Response, NextFunction, RequestHandler } from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { and, asc, desc, eq, gt, isNull, sql } from "drizzle-orm";
import { OAuth2Client } from "google-auth-library";
import { db } from "./db";
import {
  clients,
  clientProjects,
  clientDocuments,
  clientPayments,
  clientTimeline,
  portalLoginTokens,
  clientMessages,
  clientFeedback,
  clientReferrals,
} from "@shared/schema";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";
import { assignProjectCode, nextDocVersion } from "./classification";
import { recordLedger, ADMIN_NAME } from "./ledger";
import { DISCIPLINE_CODES, DOC_KIND_CODES, extensionOf, slugify, stdFileName } from "@shared/classification";

/**
 * Portal de clientes de ArquitectoChile.
 *
 * Acceso: enlace de un solo uso enviado por correo (sin contraseñas).
 * Permisos: cada cliente solo ve sus propios proyectos, documentos y pagos.
 * Administración: rutas /api/portal/admin/* protegidas con el middleware de admin del sitio.
 */

const LOGIN_LINK_TTL_MIN = 20;
const SESSION_DAYS = 90; // la sesión del cliente queda abierta y se renueva al usar el portal
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const PORTAL_BASE_URL = process.env.PORTAL_BASE_URL || "https://arquitectochile.com";

const sha256 = (v: string) => crypto.createHash("sha256").update(v).digest("hex");
const normalizeEmail = (v: string) => v.trim().toLowerCase();

// ---------- sesión ----------

function getSession(req: Request): any {
  return (req as any).session;
}

function regenerateSession(req: Request): Promise<void> {
  return new Promise((resolve, reject) => {
    getSession(req).regenerate((err: unknown) => (err ? reject(err) : resolve()));
  });
}

function saveSession(req: Request): Promise<void> {
  return new Promise((resolve, reject) => {
    getSession(req).save((err: unknown) => (err ? reject(err) : resolve()));
  });
}

async function startPortalSession(req: Request, clientId: number) {
  await regenerateSession(req);
  const s = getSession(req);
  s.portalClientId = clientId;
  s.portalSeenAt = Date.now();
  s.cookie.maxAge = SESSION_DAYS * 24 * 60 * 60 * 1000;
  await saveSession(req);
  await db.update(clients).set({ lastLogin: new Date() }).where(eq(clients.id, clientId));
}

export const requirePortalClient: RequestHandler = async (req, res, next) => {
  const clientId = getSession(req)?.portalClientId;
  if (!clientId) return res.status(401).json({ error: "Debes iniciar sesión." });

  const [client] = await db.select().from(clients).where(eq(clients.id, clientId)).limit(1);
  if (!client || client.status === "inactive") {
    return res.status(401).json({ error: "Acceso no disponible." });
  }
  // Renueva la sesión como máximo una vez al día para que el cliente no tenga que volver a entrar
  const s = getSession(req);
  if (!s.portalSeenAt || Date.now() - s.portalSeenAt > 24 * 60 * 60 * 1000) {
    s.portalSeenAt = Date.now();
    s.cookie.maxAge = SESSION_DAYS * 24 * 60 * 60 * 1000;
  }
  (req as any).portalClient = client;
  next();
};

// ---------- correo ----------

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  attachments?: { filename: string; content: Buffer; contentType: string }[],
): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    console.log("ℹ️ SMTP no configurado: correo del portal no enviado");
    return false;
  }
  const port = parseInt(process.env.SMTP_PORT || "587");
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  await transporter.sendMail({ from: process.env.SMTP_FROM || user, to, subject, html, attachments });
  return true;
}

export function emailShell(inner: string) {
  return `<div style="font-family:sans-serif;max-width:520px;margin:auto;color:#1e293b">${inner}
    <p style="font-size:13px;color:#64748b;margin-top:28px">Arq. Patricio Becar · ArquitectoChile.com</p></div>`;
}

function sendLoginEmail(to: string, name: string, link: string) {
  return sendEmail(
    to,
    "Tu acceso al portal de ArquitectoChile.com",
    emailShell(`
      <h2 style="color:#1e3a5f">Hola ${escapeHtml(name)},</h2>
      <p>Usa este botón para entrar a tu portal. El enlace funciona una sola vez y vence en ${LOGIN_LINK_TTL_MIN} minutos.</p>
      <p style="margin:28px 0"><a href="${link}" style="background:#1e3a5f;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none">Entrar a mi portal</a></p>
      <p style="font-size:13px;color:#64748b">Si no lo pediste tú, puedes ignorar este correo.</p>`),
  );
}

// Guarda el mensaje en el portal y lo envía por correo (con aviso para entrar a verlo)
async function postMessage(input: {
  clientId: number;
  projectId?: number | null;
  kind: "official" | "receipt" | "notice";
  subject: string;
  body: string;
  attachmentUrl?: string | null;
}) {
  const [client] = await db.select().from(clients).where(eq(clients.id, input.clientId)).limit(1);
  if (!client) throw new Error("Cliente no encontrado");
  const emailed = await sendEmail(
    client.email,
    input.subject,
    emailShell(`
      <h2 style="color:#1e3a5f">Hola ${escapeHtml(client.name)},</h2>
      <p style="white-space:pre-line">${escapeHtml(input.body)}</p>
      ${input.attachmentUrl ? "<p>Adjuntamos el documento en tu portal.</p>" : ""}
      <p style="margin:24px 0"><a href="${PORTAL_BASE_URL}/portal-cliente/login" style="background:#1e3a5f;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none">Ver en mi portal</a></p>`),
  ).catch(() => false);
  const [row] = await db
    .insert(clientMessages)
    .values({
      clientId: input.clientId,
      projectId: input.projectId ?? null,
      kind: input.kind,
      subject: input.subject,
      body: input.body,
      attachmentUrl: input.attachmentUrl ?? null,
      emailedAt: emailed ? new Date() : null,
    })
    .returning();
  return { message: row, emailed };
}

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

async function createLoginLink(clientId: number): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  await db.insert(portalLoginTokens).values({
    clientId,
    tokenHash: sha256(token),
    expiresAt: new Date(Date.now() + LOGIN_LINK_TTL_MIN * 60 * 1000),
  });
  return `${PORTAL_BASE_URL}/portal-cliente/acceso?token=${token}`;
}

// ---------- resumen de pagos ----------

function withComputedPaymentStatus<T extends { status: string; dueDate: Date; paidDate: Date | null }>(p: T) {
  if (p.status === "paid" || p.paidDate) return { ...p, status: "paid" };
  if (new Date(p.dueDate).getTime() < Date.now()) return { ...p, status: "overdue" };
  return { ...p, status: "pending" };
}

function summarizePayments(payments: { amount: string; status: string }[]) {
  const sum = (arr: { amount: string }[]) => arr.reduce((t, p) => t + Number(p.amount), 0);
  const paid = payments.filter((p) => p.status === "paid");
  const pending = payments.filter((p) => p.status !== "paid");
  return { totalPaid: sum(paid), totalPending: sum(pending), totalContract: sum(payments) };
}

// ---------- validaciones admin ----------

const clientInput = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
});

const projectInput = z.object({
  clientId: z.number().int(),
  name: z.string().min(2),
  description: z.string().optional(),
  status: z.enum(["planning", "design", "permits", "construction", "completed"]).default("planning"),
  progress: z.number().int().min(0).max(100).default(0),
  startDate: z.coerce.date().optional(),
  estimatedCompletion: z.coerce.date().optional(),
  totalValue: z.string().optional(),
  permitFileNumber: z.string().optional(),
  permitStatus: z.enum(["ingresado", "observado", "reingresado", "aprobado", "recepcion"]).optional(),
  welcomeVideoUrl: z.string().url().optional(),
  address: z.string().max(200).optional(),
});

const messageInput = z.object({
  clientId: z.number().int(),
  projectId: z.number().int().optional(),
  kind: z.enum(["official", "receipt", "notice"]).default("notice"),
  subject: z.string().min(3),
  body: z.string().min(3),
  attachmentUrl: z.string().startsWith("/objects/client-files/").optional(),
});

const feedbackInput = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10).max(2000),
  canPublish: z.boolean().default(false),
  referralName: z.string().max(120).optional(),
  referralContact: z.string().max(160).optional(),
});

const documentInput = z.object({
  name: z.string().min(2),
  type: z.enum(["plans", "contracts", "permits", "specifications", "renders", "observations", "photos", "other"]),
  fileUrl: z.string().startsWith("/objects/client-files/"),
  fileSize: z.number().int().optional(),
  version: z.number().int().min(1).default(1),
  visibleToClient: z.boolean().default(true),
  discipline: z.enum(DISCIPLINE_CODES).optional(),
  docKind: z.enum(DOC_KIND_CODES).optional(),
});

const paymentInput = z.object({
  description: z.string().min(2),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
  dueDate: z.coerce.date(),
  paidDate: z.coerce.date().nullable().optional(),
  status: z.enum(["pending", "paid", "overdue"]).optional(),
  paymentMethod: z.enum(["transfer", "check", "cash"]).nullable().optional(),
  receiptType: z.enum(["boleta", "factura"]).nullable().optional(),
  receiptNumber: z.string().nullable().optional(),
  receiptUrl: z.string().startsWith("/objects/client-files/").nullable().optional(),
  notify: z.boolean().optional(), // al marcar pagado, envía el comprobante al cliente
});

const timelineInput = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  date: z.coerce.date(),
  status: z.enum(["completed", "current", "upcoming"]),
  category: z.enum(["design", "permits", "construction", "delivery"]).optional(),
});

const referralInput = z.object({
  name: z.string().min(2).max(120),
  contact: z.string().min(6).max(160),
  need: z.string().max(200).optional(),
  note: z.string().max(1000).optional(),
});

const NOTIFY_EMAIL = process.env.PORTAL_NOTIFY_EMAIL || "contacto@arquitectochile.com";

// Código corto y fácil de dictar (sin letras que se confunden)
function newReferralCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.randomBytes(8);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

async function ensureReferralCode(client: { id: number; referralCode: string | null }): Promise<string> {
  if (client.referralCode) return client.referralCode;
  for (let i = 0; i < 5; i++) {
    const code = newReferralCode();
    try {
      await db.update(clients).set({ referralCode: code }).where(eq(clients.id, client.id));
      return code;
    } catch (err) {
      if ((err as any)?.code !== "23505") throw err; // choque de código: se prueba otro
    }
  }
  throw new Error("No se pudo generar el código de recomendación");
}

async function saveReferral(referrerId: number, referrerName: string, data: z.infer<typeof referralInput>, source: "portal" | "link") {
  const [row] = await db.insert(clientReferrals).values({ ...data, referrerId, source }).returning();
  // Aviso al arquitecto para que contacte pronto a la persona recomendada
  sendEmail(
    NOTIFY_EMAIL,
    `Nueva recomendación de ${referrerName}: ${data.name}`,
    emailShell(`<h3 style="color:#1e3a5f">Te recomendaron a alguien</h3>
      <p><b>${escapeHtml(data.name)}</b> — ${escapeHtml(data.contact)}</p>
      ${data.need ? `<p>Necesita: ${escapeHtml(data.need)}</p>` : ""}
      ${data.note ? `<p>${escapeHtml(data.note)}</p>` : ""}
      <p style="color:#64748b">Recomendado por ${escapeHtml(referrerName)} (${source === "link" ? "enlace personal" : "portal"}).</p>`),
  ).catch(() => undefined);
  return row;
}

export function parseId(v: string): number | null {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : null;
}

// ---------- registro de rutas ----------

export function registerPortalRoutes(app: Express, isAdmin: RequestHandler) {
  const objectStorage = new ObjectStorageService();

  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Demasiados intentos. Intenta de nuevo en unos minutos." },
  });
  const verifyLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false });

  // Ownership: devuelve el proyecto solo si pertenece al cliente en sesión
  async function ownedProject(clientId: number, projectId: number) {
    const [project] = await db
      .select()
      .from(clientProjects)
      .where(and(eq(clientProjects.id, projectId), eq(clientProjects.clientId, clientId)))
      .limit(1);
    return project;
  }

  // ===== Acceso de clientes =====

  app.post("/api/portal/auth/request", loginLimiter, async (req, res) => {
    // Respuesta idéntica exista o no el correo, para no revelar quién es cliente
    const generic = { ok: true, message: "Si tu correo está registrado, te enviamos un enlace de acceso." };
    try {
      const parsed = z.object({ email: z.string().email() }).safeParse(req.body);
      if (!parsed.success) return res.json(generic);

      const [client] = await db
        .select()
        .from(clients)
        .where(eq(clients.email, normalizeEmail(parsed.data.email)))
        .limit(1);
      if (client && client.status !== "inactive") {
        const link = await createLoginLink(client.id);
        await sendLoginEmail(client.email, client.name, link);
      }
    } catch (err) {
      console.error("portal request error:", (err as Error).message);
    }
    return res.json(generic);
  });

  // POST (no GET) para que los antivirus de correo que abren enlaces no consuman el token
  app.post("/api/portal/auth/verify", verifyLimiter, async (req, res) => {
    try {
      const parsed = z.object({ token: z.string().length(64) }).safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Enlace inválido." });

      const tokenHash = sha256(parsed.data.token);
      const [row] = await db
        .update(portalLoginTokens)
        .set({ usedAt: new Date() })
        .where(
          and(
            eq(portalLoginTokens.tokenHash, tokenHash),
            isNull(portalLoginTokens.usedAt),
            gt(portalLoginTokens.expiresAt, new Date()),
          ),
        )
        .returning();
      if (!row) return res.status(400).json({ error: "El enlace venció o ya fue usado. Pide uno nuevo." });

      const [client] = await db.select().from(clients).where(eq(clients.id, row.clientId)).limit(1);
      if (!client || client.status === "inactive") return res.status(403).json({ error: "Acceso no disponible." });

      await startPortalSession(req, client.id);
      return res.json({ ok: true, name: client.name, welcomeSeen: Boolean(client.welcomeSeenAt) });
    } catch (err) {
      console.error("portal verify error:", (err as Error).message);
      return res.status(500).json({ error: "No pudimos iniciar tu sesión." });
    }
  });

  app.post("/api/portal/auth/logout", (req, res) => {
    const s = getSession(req);
    if (s) delete s.portalClientId;
    res.json({ ok: true });
  });

  // ===== Datos del cliente =====

  app.get("/api/portal/me", requirePortalClient, async (req, res) => {
    const client = (req as any).portalClient;
    const projects = await db
      .select()
      .from(clientProjects)
      .where(eq(clientProjects.clientId, client.id))
      .orderBy(desc(clientProjects.createdAt));
    res.json({
      client: {
        id: client.id,
        name: client.name,
        email: client.email,
        welcomeSeen: Boolean(client.welcomeSeenAt),
        newsletterOptIn: client.newsletterOptIn,
      },
      projects,
      defaultWelcomeVideo: process.env.PORTAL_WELCOME_VIDEO_URL || null,
    });
  });

  app.get("/api/portal/projects/:id", requirePortalClient, async (req, res) => {
    const client = (req as any).portalClient;
    const projectId = parseId(req.params.id);
    if (!projectId) return res.status(400).json({ error: "Proyecto inválido." });

    const project = await ownedProject(client.id, projectId);
    if (!project) return res.status(404).json({ error: "Proyecto no encontrado." });

    const [messages, feedbackRows] = await Promise.all([
      db
        .select({
          id: clientMessages.id,
          kind: clientMessages.kind,
          subject: clientMessages.subject,
          body: clientMessages.body,
          hasAttachment: sql<boolean>`${clientMessages.attachmentUrl} is not null`,
          createdAt: clientMessages.createdAt,
        })
        .from(clientMessages)
        .where(and(eq(clientMessages.clientId, client.id), eq(clientMessages.projectId, projectId)))
        .orderBy(desc(clientMessages.createdAt)),
      db
        .select({ id: clientFeedback.id })
        .from(clientFeedback)
        .where(and(eq(clientFeedback.clientId, client.id), eq(clientFeedback.projectId, projectId)))
        .limit(1),
    ]);

    const [documents, payments, timeline] = await Promise.all([
      db
        .select({
          id: clientDocuments.id,
          name: clientDocuments.name,
          type: clientDocuments.type,
          fileSize: clientDocuments.fileSize,
          version: clientDocuments.version,
          uploadDate: clientDocuments.uploadDate,
        })
        .from(clientDocuments)
        .where(and(eq(clientDocuments.projectId, projectId), eq(clientDocuments.visibleToClient, true)))
        .orderBy(desc(clientDocuments.uploadDate)),
      db.select().from(clientPayments).where(eq(clientPayments.projectId, projectId)).orderBy(asc(clientPayments.dueDate)),
      db.select().from(clientTimeline).where(eq(clientTimeline.projectId, projectId)).orderBy(asc(clientTimeline.date)),
    ]);

    const paymentsView = payments.map((p) => {
      const { receiptUrl, ...rest } = withComputedPaymentStatus(p);
      return { ...rest, hasReceipt: Boolean(receiptUrl) }; // la ruta interna del archivo nunca sale al navegador
    });

    res.json({
      project,
      documents,
      payments: paymentsView,
      paymentSummary: summarizePayments(paymentsView),
      timeline,
      messages,
      feedbackSent: feedbackRows.length > 0,
    });
  });

  async function streamObject(res: Response, objectPath: string, filename: string) {
    try {
      const file = await objectStorage.getObjectEntityFile(objectPath);
      res.set("Content-Disposition", `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
      await objectStorage.downloadObject(file, res, 0);
    } catch (err) {
      if (err instanceof ObjectNotFoundError) return res.status(404).json({ error: "Archivo no disponible." });
      console.error("portal download error:", (err as Error).message);
      return res.status(500).json({ error: "No pudimos descargar el archivo." });
    }
  }

  app.get("/api/portal/documents/:id/download", requirePortalClient, async (req, res) => {
    const client = (req as any).portalClient;
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Documento inválido." });

    const [doc] = await db
      .select({ doc: clientDocuments })
      .from(clientDocuments)
      .innerJoin(clientProjects, eq(clientDocuments.projectId, clientProjects.id))
      .where(
        and(
          eq(clientDocuments.id, id),
          eq(clientProjects.clientId, client.id),
          eq(clientDocuments.visibleToClient, true),
        ),
      )
      .limit(1);
    if (!doc) return res.status(404).json({ error: "Documento no encontrado." });
    return streamObject(res, doc.doc.fileUrl, doc.doc.stdName ?? doc.doc.name);
  });

  app.get("/api/portal/payments/:id/receipt", requirePortalClient, async (req, res) => {
    const client = (req as any).portalClient;
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Pago inválido." });

    const [row] = await db
      .select({ pay: clientPayments })
      .from(clientPayments)
      .innerJoin(clientProjects, eq(clientPayments.projectId, clientProjects.id))
      .where(and(eq(clientPayments.id, id), eq(clientProjects.clientId, client.id)))
      .limit(1);
    if (!row?.pay.receiptUrl) return res.status(404).json({ error: "Comprobante no disponible." });

    const label = `${row.pay.receiptType ?? "comprobante"}-${row.pay.receiptNumber ?? row.pay.id}.pdf`;
    return streamObject(res, row.pay.receiptUrl, label);
  });

  // ===== Acceso con cuenta de Google =====

  const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

  // El navegador necesita el ID público de Google para mostrar el botón (no es un secreto)
  app.get("/api/portal/config", (_req, res) => {
    res.json({ googleClientId: GOOGLE_CLIENT_ID || null });
  });

  app.post("/api/portal/auth/google", loginLimiter, async (req, res) => {
    if (!googleClient) return res.status(501).json({ error: "El acceso con Google aún no está activo." });
    const parsed = z.object({ credential: z.string().min(20) }).safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Solicitud inválida." });
    try {
      const ticket = await googleClient.verifyIdToken({ idToken: parsed.data.credential, audience: GOOGLE_CLIENT_ID });
      const payload = ticket.getPayload();
      if (!payload?.email || !payload.email_verified) {
        return res.status(401).json({ error: "Tu cuenta de Google no tiene el correo verificado." });
      }
      const [client] = await db.select().from(clients).where(eq(clients.email, normalizeEmail(payload.email))).limit(1);
      // Solo entran quienes fueron invitados: un correo de Google cualquiera no crea cuentas
      if (!client || client.status === "inactive") {
        return res.status(403).json({ error: "Ese correo no está registrado como cliente. Escríbenos y te invitamos." });
      }
      await startPortalSession(req, client.id);
      return res.json({ ok: true, name: client.name, welcomeSeen: Boolean(client.welcomeSeenAt) });
    } catch (err) {
      console.error("portal google error:", (err as Error).message);
      return res.status(401).json({ error: "No pudimos validar tu cuenta de Google." });
    }
  });

  // ===== Bienvenida, preferencias, mensajes y opiniones =====

  app.post("/api/portal/welcome/seen", requirePortalClient, async (req, res) => {
    const client = (req as any).portalClient;
    const parsed = z.object({ newsletterOptIn: z.boolean().optional() }).safeParse(req.body ?? {});
    if (!parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    await db
      .update(clients)
      .set({
        welcomeSeenAt: new Date(),
        ...(parsed.data.newsletterOptIn !== undefined ? { newsletterOptIn: parsed.data.newsletterOptIn } : {}),
      })
      .where(eq(clients.id, client.id));
    res.json({ ok: true });
  });

  app.post("/api/portal/preferences", requirePortalClient, async (req, res) => {
    const client = (req as any).portalClient;
    const parsed = z.object({ newsletterOptIn: z.boolean() }).safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    await db.update(clients).set({ newsletterOptIn: parsed.data.newsletterOptIn }).where(eq(clients.id, client.id));
    res.json({ ok: true });
  });

  app.get("/api/portal/messages/:id/attachment", requirePortalClient, async (req, res) => {
    const client = (req as any).portalClient;
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Mensaje inválido." });
    const [msg] = await db
      .select()
      .from(clientMessages)
      .where(and(eq(clientMessages.id, id), eq(clientMessages.clientId, client.id)))
      .limit(1);
    if (!msg?.attachmentUrl) return res.status(404).json({ error: "Adjunto no disponible." });
    return streamObject(res, msg.attachmentUrl, `${msg.subject}.pdf`);
  });

  // Testimonios y recomendaciones: una opinión por proyecto
  app.post("/api/portal/projects/:id/feedback", requirePortalClient, async (req, res) => {
    const client = (req as any).portalClient;
    const projectId = parseId(req.params.id);
    const parsed = feedbackInput.safeParse(req.body);
    if (!projectId || !parsed.success) return res.status(400).json({ error: "Revisa los datos de tu opinión." });
    if (!(await ownedProject(client.id, projectId))) return res.status(404).json({ error: "Proyecto no encontrado." });

    const [existing] = await db
      .select({ id: clientFeedback.id })
      .from(clientFeedback)
      .where(and(eq(clientFeedback.clientId, client.id), eq(clientFeedback.projectId, projectId)))
      .limit(1);
    if (existing) return res.status(409).json({ error: "Ya recibimos tu opinión. ¡Gracias!" });

    await db.insert(clientFeedback).values({ ...parsed.data, clientId: client.id, projectId });
    res.status(201).json({ ok: true });
  });

  // ===== Red de referidos =====

  app.get("/api/portal/referrals", requirePortalClient, async (req, res) => {
    const client = (req as any).portalClient;
    const code = await ensureReferralCode(client);
    const list = await db
      .select({
        id: clientReferrals.id,
        name: clientReferrals.name,
        need: clientReferrals.need,
        status: clientReferrals.status,
        createdAt: clientReferrals.createdAt,
      })
      .from(clientReferrals)
      .where(eq(clientReferrals.referrerId, client.id))
      .orderBy(desc(clientReferrals.createdAt));
    res.json({ code, link: `${PORTAL_BASE_URL}/recomendado/${code}`, referrals: list });
  });

  app.post("/api/portal/referrals", requirePortalClient, async (req, res) => {
    const client = (req as any).portalClient;
    const parsed = referralInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Revisa el nombre y el contacto." });
    await saveReferral(client.id, client.name, parsed.data, "portal");
    res.status(201).json({ ok: true });
  });

  // Página pública a la que llega la persona recomendada desde el enlace de su amigo
  const publicLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });

  app.get("/api/portal/public/referrer/:code", async (req, res) => {
    const [row] = await db
      .select({ name: clients.name })
      .from(clients)
      .where(eq(clients.referralCode, req.params.code.toUpperCase()))
      .limit(1);
    // Solo el primer nombre: no se expone el nombre completo del cliente
    res.json(row ? { firstName: row.name.split(" ")[0] } : { firstName: null });
  });

  app.post("/api/portal/public/referral", publicLimiter, async (req, res) => {
    const parsed = referralInput
      .extend({ code: z.string().min(6).max(12), website: z.string().optional() })
      .safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Revisa tus datos." });
    if (parsed.data.website) return res.json({ ok: true }); // campo trampa para bots: se ignora en silencio
    const [referrer] = await db.select().from(clients).where(eq(clients.referralCode, parsed.data.code.toUpperCase())).limit(1);
    if (!referrer) return res.status(404).json({ error: "El enlace no es válido." });
    const { code: _code, website: _w, ...data } = parsed.data;
    await saveReferral(referrer.id, referrer.name, data, "link");
    res.status(201).json({ ok: true });
  });

  // ===== Administración (solo el arquitecto) =====

  const admin = "/api/portal/admin";

  // URL firmada para subir planos, boletas y actas a la carpeta privada de clientes
  app.post(`${admin}/upload-url`, isAdmin, async (_req, res) => {
    try {
      res.json(await objectStorage.getClientFileUploadURL());
    } catch (err) {
      console.error("portal upload-url error:", (err as Error).message);
      res.status(500).json({ error: "No se pudo preparar la subida." });
    }
  });

  // Mensaje oficial / comprobante / aviso: queda en el portal y sale por correo
  app.post(`${admin}/messages`, isAdmin, async (req, res) => {
    const parsed = messageInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Datos inválidos", details: parsed.error.flatten() });
    try {
      const { message, emailed } = await postMessage(parsed.data);
      res.status(201).json({ id: message.id, emailed });
    } catch (err) {
      res.status(404).json({ error: (err as Error).message });
    }
  });

  app.get(`${admin}/feedback`, isAdmin, async (_req, res) => {
    const rows = await db
      .select({
        id: clientFeedback.id,
        clientName: clients.name,
        rating: clientFeedback.rating,
        comment: clientFeedback.comment,
        canPublish: clientFeedback.canPublish,
        referralName: clientFeedback.referralName,
        referralContact: clientFeedback.referralContact,
        createdAt: clientFeedback.createdAt,
      })
      .from(clientFeedback)
      .innerJoin(clients, eq(clientFeedback.clientId, clients.id))
      .orderBy(desc(clientFeedback.createdAt));
    res.json(rows);
  });

  app.get(`${admin}/referrals`, isAdmin, async (_req, res) => {
    const rows = await db
      .select({
        id: clientReferrals.id,
        referrer: clients.name,
        name: clientReferrals.name,
        contact: clientReferrals.contact,
        need: clientReferrals.need,
        note: clientReferrals.note,
        source: clientReferrals.source,
        status: clientReferrals.status,
        rewardNote: clientReferrals.rewardNote,
        createdAt: clientReferrals.createdAt,
      })
      .from(clientReferrals)
      .innerJoin(clients, eq(clientReferrals.referrerId, clients.id))
      .orderBy(desc(clientReferrals.createdAt));
    res.json(rows);
  });

  app.patch(`${admin}/referrals/:id`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = z
      .object({ status: z.enum(["new", "contacted", "client", "discarded"]).optional(), rewardNote: z.string().max(500).optional() })
      .safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    await db.update(clientReferrals).set(parsed.data).where(eq(clientReferrals.id, id));
    res.json({ ok: true });
  });

  app.get(`${admin}/clients/:id/projects`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Cliente inválido." });
    res.json(await db.select().from(clientProjects).where(eq(clientProjects.clientId, id)).orderBy(desc(clientProjects.createdAt)));
  });

  // Vista completa del proyecto, incluidos los documentos que el cliente aún no ve
  app.get(`${admin}/projects/:id`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Proyecto inválido." });
    const [project] = await db.select().from(clientProjects).where(eq(clientProjects.id, id)).limit(1);
    if (!project) return res.status(404).json({ error: "Proyecto no encontrado." });
    const [documents, payments, timeline] = await Promise.all([
      db.select().from(clientDocuments).where(eq(clientDocuments.projectId, id)).orderBy(desc(clientDocuments.uploadDate)),
      db.select().from(clientPayments).where(eq(clientPayments.projectId, id)).orderBy(asc(clientPayments.dueDate)),
      db.select().from(clientTimeline).where(eq(clientTimeline.projectId, id)).orderBy(asc(clientTimeline.date)),
    ]);
    res.json({ project, documents, payments, timeline });
  });

  app.get(`${admin}/clients`, isAdmin, async (_req, res) => {
    const rows = await db
      .select({
        id: clients.id,
        name: clients.name,
        email: clients.email,
        phone: clients.phone,
        status: clients.status,
        lastLogin: clients.lastLogin,
      })
      .from(clients)
      .orderBy(desc(clients.createdAt));
    res.json(rows);
  });

  app.post(`${admin}/clients`, isAdmin, async (req, res) => {
    const parsed = clientInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Datos inválidos", details: parsed.error.flatten() });
    try {
      // El portal no usa contraseñas: se guarda un valor aleatorio inutilizable
      const unusable = crypto.randomBytes(32).toString("hex");
      const [created] = await db
        .insert(clients)
        .values({ ...parsed.data, email: normalizeEmail(parsed.data.email), password: unusable, referralCode: newReferralCode() })
        .returning({ id: clients.id, name: clients.name, email: clients.email });
      res.status(201).json(created);
    } catch (err) {
      if ((err as any)?.code === "23505") return res.status(409).json({ error: "Ya existe un cliente con ese correo." });
      throw err;
    }
  });

  // Envía el enlace al cliente. Si el correo no está configurado, devuelve el enlace para copiarlo
  app.post(`${admin}/clients/:id/invite`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Cliente inválido." });
    const [client] = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
    if (!client) return res.status(404).json({ error: "Cliente no encontrado." });

    const link = await createLoginLink(client.id);
    const sent = await sendLoginEmail(client.email, client.name, link).catch(() => false);
    res.json(sent ? { sent: true } : { sent: false, link });
  });

  app.patch(`${admin}/clients/:id`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = z.object({ status: z.enum(["active", "inactive", "completed"]) }).safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    await db.update(clients).set({ status: parsed.data.status }).where(eq(clients.id, id));
    res.json({ ok: true });
  });

  app.post(`${admin}/projects`, isAdmin, async (req, res) => {
    const parsed = projectInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Datos inválidos", details: parsed.error.flatten() });
    const [created] = await db.insert(clientProjects).values(parsed.data).returning();
    const code = await assignProjectCode(created.id, created.createdAt).catch(() => null);
    res.status(201).json({ ...created, code: code ?? created.code });
  });

  app.patch(`${admin}/projects/:id`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = projectInput.omit({ clientId: true }).partial().safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const [updated] = await db.update(clientProjects).set(parsed.data).where(eq(clientProjects.id, id)).returning();
    if (!updated) return res.status(404).json({ error: "Proyecto no encontrado." });
    res.json(updated);
  });

  app.post(`${admin}/projects/:id/documents`, isAdmin, async (req, res) => {
    const projectId = parseId(req.params.id);
    const parsed = documentInput.safeParse(req.body);
    if (!projectId || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const { discipline, docKind, ...rest } = parsed.data;
    const [project] = await db.select({ code: clientProjects.code }).from(clientProjects).where(eq(clientProjects.id, projectId)).limit(1);
    if (!project) return res.status(404).json({ error: "Proyecto no encontrado." });
    // Con código de proyecto, disciplina y tipo, el documento queda con nombre estándar
    // La versión la asigna el sistema: misma lámina (proyecto + disciplina + tipo + descripción) = versión siguiente
    let stdName: string | null = null;
    let docSlug: string | null = null;
    let version = rest.version ?? 1;
    if (project.code && discipline && docKind) {
      const description = rest.name.replace(/\.[A-Za-z0-9]{1,8}$/, "");
      docSlug = slugify(description) || "Documento";
      version = await nextDocVersion(projectId, discipline, docKind, docSlug);
      stdName = stdFileName({ code: project.code, discipline, kind: docKind, description: docSlug, version, ext: extensionOf(rest.name) });
      // Las versiones anteriores de esa lámina dejan de verse para el cliente (quedan en el historial)
      await db.update(clientDocuments).set({ visibleToClient: false }).where(and(eq(clientDocuments.projectId, projectId), eq(clientDocuments.discipline, discipline), eq(clientDocuments.docKind, docKind), eq(clientDocuments.docSlug, docSlug)));
    }
    const [created] = await db.insert(clientDocuments).values({ ...rest, version, projectId, discipline: discipline ?? null, docKind: docKind ?? null, stdName, docSlug }).returning();
    await recordLedger({ projectId, docName: stdName ?? rest.name, docVersion: stdName ? version : null, action: version > 1 ? `Subió corrección V${String(version).padStart(2, "0")}` : "Subió documento", role: "Diseñó / ejecutó", actorType: "admin", actorName: ADMIN_NAME, detail: rest.visibleToClient ? "Visible para el cliente" : "Interno" });
    res.status(201).json(created);
  });

  app.post(`${admin}/projects/:id/payments`, isAdmin, async (req, res) => {
    const projectId = parseId(req.params.id);
    const parsed = paymentInput.safeParse(req.body);
    if (!projectId || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const [created] = await db.insert(clientPayments).values({ ...parsed.data, projectId }).returning();
    res.status(201).json(created);
  });

  app.patch(`${admin}/payments/:id`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = paymentInput.partial().safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const { notify, ...changes } = parsed.data;
    const [updated] = await db.update(clientPayments).set(changes).where(eq(clientPayments.id, id)).returning();
    if (!updated) return res.status(404).json({ error: "Pago no encontrado." });

    if (notify && updated.status === "paid") {
      const [project] = await db.select().from(clientProjects).where(eq(clientProjects.id, updated.projectId)).limit(1);
      if (project) {
        const doc = updated.receiptType === "factura" ? "factura" : "boleta";
        await postMessage({
          clientId: project.clientId,
          projectId: project.id,
          kind: "receipt",
          subject: `Comprobante de pago: ${updated.description}`,
          body: `Recibimos tu pago de ${Number(updated.amount).toLocaleString("es-CL")} CLP por "${updated.description}". Gracias.${
            updated.receiptNumber ? `\nTu ${doc} N° ${updated.receiptNumber} está disponible en tu portal.` : ""
          }`,
          attachmentUrl: updated.receiptUrl,
        }).catch((e) => console.error("portal receipt message error:", e.message));
      }
    }
    res.json(updated);
  });

  app.post(`${admin}/projects/:id/timeline`, isAdmin, async (req, res) => {
    const projectId = parseId(req.params.id);
    const parsed = timelineInput.safeParse(req.body);
    if (!projectId || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const [created] = await db.insert(clientTimeline).values({ ...parsed.data, projectId }).returning();
    res.status(201).json(created);
  });

  app.patch(`${admin}/timeline/:id`, isAdmin, async (req, res) => {
    const id = parseId(req.params.id);
    const parsed = timelineInput.partial().safeParse(req.body);
    if (!id || !parsed.success) return res.status(400).json({ error: "Datos inválidos." });
    const [updated] = await db.update(clientTimeline).set(parsed.data).where(eq(clientTimeline.id, id)).returning();
    if (!updated) return res.status(404).json({ error: "Hito no encontrado." });
    res.json(updated);
  });
}
