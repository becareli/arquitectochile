import { pgTable, text, serial, integer, boolean, timestamp, decimal, json, date, varchar, index, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from 'drizzle-orm';

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  // Address fields for precise property location
  calle: text("calle"), // Street name
  numero: text("numero"), // Property number
  comuna: text("comuna"), // Municipality
  helpType: text("help_type"),
  timeline: text("timeline"),
  message: text("message"),
  source: text("source").notNull().default("contact_form"),
  status: text("status").notNull().default("new"),
  // Calculator-specific fields
  projectType: text("project_type"),
  budget: text("budget"),
  // Advanced lead qualification fields
  leadScore: integer("lead_score").default(0),
  customerStage: text("customer_stage").default("awareness"), // awareness, consideration, decision
  avatarMatch: text("avatar_match"), // juan_carlos, ana_maria, carlos_rodriguez based on target personas
  appointmentId: text("appointment_id"), // TidyCal appointment ID when scheduled
  meetingLink: text("meeting_link"), // Google Meet link from TidyCal
  lastActivity: timestamp("last_activity").defaultNow(),
  conversionData: json("conversion_data"), // Tracks funnel progression
  attachments: json("attachments"), // Array of uploaded file URLs
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const calculatorResults = pgTable("calculator_results", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'construction' or 'energy'
  email: text("email").notNull(),
  inputs: json("inputs").notNull(),
  results: json("results").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  size: text("size").notNull(),
  location: text("location").notNull(),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  clientTitle: text("client_title").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  videoUrl: text("video_url"),
  imageUrl: text("image_url"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  imageWidth: integer("image_width"),
  imageHeight: integer("image_height"),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Client Portal Authentication
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  password: text("password").notNull(), // hashed
  projectId: text("project_id").unique(), // unique access code for portal
  status: text("status").notNull().default("active"), // active, inactive, completed
  lastLogin: timestamp("last_login"),
  welcomeSeenAt: timestamp("welcome_seen_at"),
  newsletterOptIn: boolean("newsletter_opt_in").notNull().default(false),
  referralCode: text("referral_code").unique(), // código del enlace personal para recomendar
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clientProjects = pgTable("client_projects", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").notNull().default("planning"), // planning, design, permits, construction, completed
  progress: integer("progress").default(0), // 0-100
  startDate: timestamp("start_date"),
  estimatedCompletion: timestamp("estimated_completion"),
  totalValue: decimal("total_value", { precision: 12, scale: 2 }),
  permitFileNumber: text("permit_file_number"), // N° de expediente en la DOM
  permitStatus: text("permit_status"), // ingresado, observado, reingresado, aprobado, recepcion
  welcomeVideoUrl: text("welcome_video_url"), // video de bienvenida propio de este proyecto
  code: text("code").unique(), // AC-2026-014: identifica el proyecto en carpetas, archivos y expedientes
  address: text("address"), // calle y número, para nombrar la carpeta
  bimRequired: boolean("bim_required").notNull().default(false), // proyecto con modelo BIM/3D de instalaciones
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clientDocuments = pgTable("client_documents", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => clientProjects.id).notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // plans, contracts, permits, specifications, photos
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size"), // in bytes
  version: integer("version").notNull().default(1),
  visibleToClient: boolean("visible_to_client").notNull().default(true),
  discipline: text("discipline"), // ARQ, EST, SAN, ALC, ELE, GAS...
  docKind: text("doc_kind"), // PLA, MEM, ESP, CAL, MOD...
  stdName: text("std_name"), // nombre estándar: AC-2026-014_ARQ_PLA_Planta-1er-piso_V02.pdf
  docSlug: text("doc_slug"), // identifica la lámina/documento (Planta-1er-piso): misma lámina = mismo slug, versión sube sola
  uploadDate: timestamp("upload_date").defaultNow().notNull(),
});

export const clientPayments = pgTable("client_payments", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => clientProjects.id).notNull(),
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  dueDate: timestamp("due_date").notNull(),
  paidDate: timestamp("paid_date"),
  status: text("status").notNull().default("pending"), // pending, paid, overdue
  paymentMethod: text("payment_method"), // transfer, check, cash
  receiptType: text("receipt_type"), // boleta, factura
  receiptNumber: text("receipt_number"),
  receiptUrl: text("receipt_url"), // ruta del PDF en almacenamiento privado
});

export const clientTimeline = pgTable("client_timeline", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => clientProjects.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  status: text("status").notNull(), // completed, current, upcoming
  category: text("category"), // design, permits, construction, delivery
});

// Mensajes oficiales, comprobantes y avisos al cliente (quedan guardados y también salen por correo)
export const clientMessages = pgTable(
  "client_messages",
  {
    id: serial("id").primaryKey(),
    clientId: integer("client_id").references(() => clients.id).notNull(),
    projectId: integer("project_id").references(() => clientProjects.id),
    kind: text("kind").notNull().default("notice"), // official, receipt, notice
    subject: text("subject").notNull(),
    body: text("body").notNull(),
    attachmentUrl: text("attachment_url"),
    emailedAt: timestamp("emailed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("idx_client_messages_client").on(t.clientId)],
);

// Personas recomendadas por un cliente (desde el portal o desde su enlace personal)
export const clientReferrals = pgTable(
  "client_referrals",
  {
    id: serial("id").primaryKey(),
    referrerId: integer("referrer_id").references(() => clients.id).notNull(),
    name: text("name").notNull(),
    contact: text("contact").notNull(), // teléfono o correo
    need: text("need"), // qué necesita (regularizar, ampliar, diseñar...)
    note: text("note"),
    source: text("source").notNull().default("portal"), // portal, link
    status: text("status").notNull().default("new"), // new, contacted, client, discarded
    rewardNote: text("reward_note"), // agradecimiento acordado, lo define el arquitecto
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("idx_client_referrals_referrer").on(t.referrerId)],
);

// Bitácora de reuniones con leads y clientes (grabadas con Fathom o ingresadas a mano)
export const clientMeetings = pgTable(
  "client_meetings",
  {
    id: serial("id").primaryKey(),
    kind: text("kind").notNull().default("other"), // lead, client, other (sin asignar)
    clientId: integer("client_id").references(() => clients.id),
    projectId: integer("project_id").references(() => clientProjects.id),
    leadId: integer("lead_id").references(() => leads.id),
    title: text("title").notNull(),
    heldAt: timestamp("held_at").notNull(),
    platform: text("platform"), // meet, zoom, teams, otra
    source: text("source").notNull().default("manual"), // fathom, manual
    externalId: text("external_id").unique(), // id de la grabación en Fathom (evita duplicados)
    recordingUrl: text("recording_url"), // enlace a la grabación (solo para el arquitecto)
    attendees: json("attendees"), // [{ name, email, external }]
    summary: text("summary"), // borrador interno generado por la herramienta
    transcript: text("transcript"), // solo para el arquitecto, nunca se muestra al cliente
    minuteText: text("minute_text"), // minuta revisada que sí puede ver el cliente
    status: text("status").notNull().default("draft"), // draft, published
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("idx_client_meetings_client").on(t.clientId), index("idx_client_meetings_lead").on(t.leadId)],
);

// Acuerdos de cada reunión, para ir cumpliéndolos
export const meetingAgreements = pgTable(
  "meeting_agreements",
  {
    id: serial("id").primaryKey(),
    meetingId: integer("meeting_id").references(() => clientMeetings.id, { onDelete: "cascade" }).notNull(),
    description: text("description").notNull(),
    owner: text("owner").notNull().default("architect"), // architect, client
    dueDate: timestamp("due_date"),
    status: text("status").notNull().default("pending"), // pending, done
    doneAt: timestamp("done_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("idx_meeting_agreements_meeting").on(t.meetingId)],
);

// Opiniones y recomendaciones que dejan los clientes desde el portal
export const clientFeedback = pgTable("client_feedback", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  projectId: integer("project_id").references(() => clientProjects.id),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment").notNull(),
  canPublish: boolean("can_publish").notNull().default(false),
  referralName: text("referral_name"),
  referralContact: text("referral_contact"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Enlaces de acceso de un solo uso para el portal de clientes (se guarda solo el hash)
export const portalLoginTokens = pgTable(
  "portal_login_tokens",
  {
    id: serial("id").primaryKey(),
    clientId: integer("client_id").references(() => clients.id).notNull(),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    usedAt: timestamp("used_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("idx_portal_login_tokens_client").on(t.clientId)],
);

// ========== OFICINA DIGITAL (colaboradores) ==========

export const collaboratorLoginTokens = pgTable(
  "collaborator_login_tokens",
  {
    id: serial("id").primaryKey(),
    collaboratorId: integer("collaborator_id").references(() => collaborators.id).notNull(),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    usedAt: timestamp("used_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("idx_collab_login_tokens_collab").on(t.collaboratorId)],
);

// Tarea asignada a un colaborador. projectId vacío = tarea interna de la oficina.
export const officeTasks = pgTable(
  "office_tasks",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id").references(() => clientProjects.id),
    collaboratorId: integer("collaborator_id").references(() => collaborators.id).notNull(),
    title: text("title").notNull(),
    description: text("description"),
    discipline: text("discipline"), // código de disciplina: define cómo se nombran sus archivos
    status: text("status").notNull().default("todo"), // todo, doing, review, done
    dueDate: timestamp("due_date"),
    fee: decimal("fee", { precision: 12, scale: 2 }), // honorario acordado por la tarea
    feeStatus: text("fee_status").notNull().default("pending"), // pending, invoiced (boleta recibida), paid
    feePaidAt: timestamp("fee_paid_at"),
    completedAt: timestamp("completed_at"),
    deliverableFormat: text("deliverable_format").notNull().default("2d"), // 2d, 3d
    // Arranque (kickoff) de un proyecto ganado en una cotización
    rfqId: integer("rfq_id"),
    kickoffRequired: boolean("kickoff_required").notNull().default(false),
    deliveryDays: integer("delivery_days"), // el plazo corre desde el kickoff
    advancePercent: integer("advance_percent").notNull().default(0),
    acceptedAt: timestamp("accepted_at"), // el colaborador aceptó monto, plazo y forma de pago
    advancePaidAt: timestamp("advance_paid_at"),
    kickoffAt: timestamp("kickoff_at"), // reunión de inicio agendada
    kickoffLink: text("kickoff_link"),
    kickoffDoneAt: timestamp("kickoff_done_at"),
    revision: integer("revision").notNull().default(0), // cuántas modificaciones se han pedido
    remindersSent: text("reminders_sent").array().notNull().default(sql`'{}'::text[]`), // d7, d1, overdue:<n>
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("idx_office_tasks_collab").on(t.collaboratorId), index("idx_office_tasks_project").on(t.projectId)],
);

// ----- Cotizaciones: Patricio pide precio a varios colaboradores, compara y adjudica -----
export const officeRfqs = pgTable("office_rfqs", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => clientProjects.id),
  discipline: text("discipline").notNull(),
  title: text("title").notNull(),
  requirements: text("requirements").notNull(),
  deliverableFormat: text("deliverable_format").notNull().default("2d"),
  quoteDeadline: timestamp("quote_deadline"),
  status: text("status").notNull().default("open"), // open, awarded, closed
  awardedQuoteId: integer("awarded_quote_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const officeRfqFiles = pgTable("office_rfq_files", {
  id: serial("id").primaryKey(),
  rfqId: integer("rfq_id").references(() => officeRfqs.id).notNull(),
  name: text("name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size"),
});

export const officeRfqInvites = pgTable(
  "office_rfq_invites",
  {
    id: serial("id").primaryKey(),
    rfqId: integer("rfq_id").references(() => officeRfqs.id).notNull(),
    collaboratorId: integer("collaborator_id").references(() => collaborators.id).notNull(),
    status: text("status").notNull().default("invited"), // invited, quoted, declined, awarded, not_selected
    declineReason: text("decline_reason"),
    invitedAt: timestamp("invited_at").defaultNow().notNull(),
  },
  (t) => [index("idx_rfq_invites_rfq").on(t.rfqId), index("idx_rfq_invites_collab").on(t.collaboratorId)],
);

export const officeQuotes = pgTable(
  "office_quotes",
  {
    id: serial("id").primaryKey(),
    rfqId: integer("rfq_id").references(() => officeRfqs.id).notNull(),
    collaboratorId: integer("collaborator_id").references(() => collaborators.id).notNull(),
    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
    deliveryDays: integer("delivery_days").notNull(),
    advancePercent: integer("advance_percent").notNull().default(0),
    paymentNotes: text("payment_notes"), // forma de pago: contra entrega, por etapas, etc.
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("idx_office_quotes_rfq").on(t.rfqId)],
);

// Entregables que sube el colaborador. Solo llegan al cliente si el arquitecto los publica.
export const officeTaskFiles = pgTable("office_task_files", {
  id: serial("id").primaryKey(),
  taskId: integer("task_id").references(() => officeTasks.id).notNull(),
  name: text("name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size"),
  publishedDocumentId: integer("published_document_id").references(() => clientDocuments.id),
  kind: text("kind").notNull().default("deliverable"), // deliverable | invoice (boleta o factura del colaborador)
  docKind: text("doc_kind"), // PLA, MEM, MOD...
  version: integer("version").notNull().default(1),
  stdName: text("std_name"),
  docSlug: text("doc_slug"),
  reviewedBy: text("reviewed_by"), // quién hizo la revisión técnica
  reviewedAt: timestamp("reviewed_at"),
  approvedBy: text("approved_by"), // quién lo aprobó (Patricio)
  approvedAt: timestamp("approved_at"),
  returnedNote: text("returned_note"), // observación si fue devuelto para corregir
  returnedAt: timestamp("returned_at"),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

// Bitácora del proyecto: registro permanente (solo se agrega, nunca se edita) de quién hizo qué, con qué documento y cuándo.
// actorType: admin | collaborator | agent | system  (agent queda previsto para cuando trabajen agentes de IA)
export const projectLedger = pgTable(
  "project_ledger",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id").references(() => clientProjects.id).notNull(),
    projectCode: text("project_code"),
    taskId: integer("task_id"),
    fileId: integer("file_id"),
    docName: text("doc_name"), // nombre estándar del documento, si corresponde
    docVersion: integer("doc_version"),
    action: text("action").notNull(), // Asignó tarea, Entregó V02, Revisó, Aprobó, Devolvió, Publicó al cliente...
    role: text("role").notNull(), // Asignó, Diseñó/ejecutó, Revisó, Aprobó, Devolvió, Publicó, Solicitó, Cerró
    actorType: text("actor_type").notNull(),
    actorName: text("actor_name").notNull(),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("idx_project_ledger_project").on(t.projectId, t.createdAt)],
);

// Línea del tiempo de cada tarea: quién hizo qué y cuándo (incluye los recordatorios enviados)
export const officeTaskEvents = pgTable(
  "office_task_events",
  {
    id: serial("id").primaryKey(),
    taskId: integer("task_id").references(() => officeTasks.id).notNull(),
    type: text("type").notNull(), // created, status, file, invoice, comment, revision, reminder, fee
    text: text("text").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("idx_office_task_events_task").on(t.taskId)],
);

export const officeTaskComments = pgTable("office_task_comments", {
  id: serial("id").primaryKey(),
  taskId: integer("task_id").references(() => officeTasks.id).notNull(),
  author: text("author").notNull(), // admin | collaborator
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// AI Agent Events table for tracking automation
export const aiAgentEvents = pgTable("ai_agent_events", {
  id: serial("id").primaryKey(),
  eventType: text("event_type").notNull(), // 'lead_qualification', 'appointment_scheduled', 'permit_update', etc.
  leadId: integer("lead_id").references(() => leads.id),
  source: text("source").notNull(), // 'n8n', 'make', 'manual', etc.
  data: json("data").notNull(), // Event-specific data
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// External Integrations Events
export const integrationEvents = pgTable("integration_events", {
  id: serial("id").primaryKey(),
  integration: text("integration").notNull(), // 'tidycal', 'whatsapp', 'make', 'n8n'
  eventType: text("event_type").notNull(), // 'webhook_received', 'message_sent', 'appointment_scheduled'
  status: text("status").notNull(), // 'success', 'failed', 'pending'
  data: json("data").notNull(),
  error: text("error"),
  leadId: integer("lead_id").references(() => leads.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Integration Configurations
export const integrationConfigs = pgTable("integration_configs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(), // 'tidycal', 'whatsapp', 'make'
  enabled: boolean("enabled").default(true),
  settings: json("settings").notNull().default({}),
  lastHealthCheck: timestamp("last_health_check"),
  healthStatus: boolean("health_status").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Budget Templates for automated quote generation
export const budgetTemplates = pgTable("budget_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  serviceType: text("service_type").notNull(), // 'ampliacion', 'remodelacion', 'permiso_edificacion', etc.
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  pricePerM2: decimal("price_per_m2", { precision: 10, scale: 2 }),
  minSize: integer("min_size").default(0),
  maxSize: integer("max_size"),
  region: text("region").notNull().default("rm"), // 'rm', 'valparaiso', 'bio_bio', etc.
  complexity: text("complexity").notNull().default("medium"), // 'low', 'medium', 'high'
  includesPermits: boolean("includes_permits").default(false),
  includesStructural: boolean("includes_structural").default(false),
  includesElectrical: boolean("includes_electrical").default(false),
  includesPlumbing: boolean("includes_plumbing").default(false),
  variables: json("variables").notNull(), // Additional calculation variables
  description: text("description").notNull(),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Generated Quotes from AI agents
export const generatedQuotes = pgTable("generated_quotes", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => leads.id),
  templateId: integer("template_id").references(() => budgetTemplates.id),
  projectSize: integer("project_size").notNull(),
  region: text("region").notNull(),
  complexity: text("complexity").notNull(),
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  sizePrice: decimal("size_price", { precision: 10, scale: 2 }).notNull(),
  adjustments: json("adjustments").notNull(), // Price adjustments and reasons
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("CLP"),
  validUntil: timestamp("valid_until").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'sent', 'accepted', 'rejected'
  generatedBy: text("generated_by").notNull().default("ai_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Collaborators/Providers for the platform
export const collaborators = pgTable("collaborators", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  specialty: text("specialty").notNull(), // 'arquitecto', 'ingeniero', 'constructor', 'electricista', etc.
  experience: integer("experience").notNull(), // years of experience
  location: text("location").notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  totalProjects: integer("total_projects").default(0),
  profileImage: text("profile_image"),
  description: text("description"),
  skills: text("skills").array(),
  certifications: text("certifications").array(),
  portfolio: json("portfolio"), // Array of portfolio items
  paymentTerms: text("payment_terms").notNull().default("2_payments"), // '2_payments', '3_payments'
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  fixedRateMin: decimal("fixed_rate_min", { precision: 10, scale: 2 }),
  fixedRateMax: decimal("fixed_rate_max", { precision: 10, scale: 2 }),
  availability: text("availability").notNull().default("available"), // 'available', 'busy', 'unavailable'
  verified: boolean("verified").default(false),
  active: boolean("active").default(true),
  linkedinUrl: text("linkedin_url"),
  discipline: text("discipline"), // arquitectura, sanitario, alcantarillado, electricidad, gas, estructura, bim...
  canDo3d: boolean("can_do_3d").notNull().default(false), // entrega modelo 3D/BIM; si no, entrega 2D
  isCoordinator: boolean("is_coordinator").notNull().default(false), // coordinador BIM: ve todo el equipo
  showOnWebsite: boolean("show_on_website").notNull().default(false), // aparecerá en el staff de la web
  onboardedAt: timestamp("onboarded_at"), // terminó la bienvenida y aceptó los compromisos de trabajo
  termsVersion: text("terms_version"),
  // Credenciales (solo las ve Patricio; no se pide carnet de identidad)
  cvUrl: text("cv_url"),
  cvName: text("cv_name"),
  titleCertUrl: text("title_cert_url"),
  titleCertName: text("title_cert_name"),
  titleVerifiedAt: timestamp("title_verified_at"), // Patricio revisó el certificado de título
  // Consentimiento para publicar nombre, foto y LinkedIn en la red de colaboradores / web
  publishConsent: boolean("publish_consent").notNull().default(false),
  publishConsentAt: timestamp("publish_consent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Project offers for collaborators to bid on
export const projectOffers = pgTable("project_offers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'ampliacion', 'remodelacion', 'permiso', etc.
  budget: decimal("budget", { precision: 10, scale: 2 }),
  deadline: timestamp("deadline").notNull(),
  location: text("location").notNull(),
  requirements: text("requirements").array(),
  attachments: json("attachments"), // File attachments
  clientId: integer("client_id").references(() => leads.id),
  status: text("status").notNull().default("open"), // 'open', 'in_progress', 'completed', 'cancelled'
  selectedBidId: integer("selected_bid_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Bids from collaborators on project offers
export const projectBids = pgTable("project_bids", {
  id: serial("id").primaryKey(),
  projectOfferId: integer("project_offer_id").references(() => projectOffers.id).notNull(),
  collaboratorId: integer("collaborator_id").references(() => collaborators.id).notNull(),
  bidAmount: decimal("bid_amount", { precision: 10, scale: 2 }).notNull(),
  proposedDeadline: timestamp("proposed_deadline").notNull(),
  coverLetter: text("cover_letter").notNull(),
  paymentSchedule: json("payment_schedule").notNull(), // Payment milestones
  status: text("status").notNull().default("pending"), // 'pending', 'accepted', 'rejected', 'withdrawn'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Active projects assigned to collaborators
export const activeProjects = pgTable("active_projects", {
  id: serial("id").primaryKey(),
  projectOfferId: integer("project_offer_id").references(() => projectOffers.id).notNull(),
  collaboratorId: integer("collaborator_id").references(() => collaborators.id).notNull(),
  bidId: integer("bid_id").references(() => projectBids.id).notNull(),
  startDate: timestamp("start_date").defaultNow().notNull(),
  deadline: timestamp("deadline").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paidAmount: decimal("paid_amount", { precision: 10, scale: 2 }).default("0.00"),
  progress: integer("progress").default(0), // 0-100%
  status: text("status").notNull().default("in_progress"), // 'in_progress', 'review', 'completed', 'cancelled'
  paymentSchedule: json("payment_schedule").notNull(),
  deliverables: json("deliverables"), // Array of deliverable files
  messages: json("messages"), // Internal messaging
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Payment records for collaborators
export const collaboratorPayments = pgTable("collaborator_payments", {
  id: serial("id").primaryKey(),
  activeProjectId: integer("active_project_id").references(() => activeProjects.id).notNull(),
  collaboratorId: integer("collaborator_id").references(() => collaborators.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentDate: timestamp("payment_date").defaultNow().notNull(),
  paymentMethod: text("payment_method").notNull().default("bank_transfer"),
  transactionId: text("transaction_id"),
  milestone: text("milestone").notNull(), // 'first_payment', 'second_payment', 'final_payment'
  status: text("status").notNull().default("completed"), // 'pending', 'completed', 'failed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ========== CRM SYSTEM TABLES ==========

// CRM Customers - Simplified version to match SQL structure
export const crmCustomers = pgTable("crm_customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  rut: text("rut"),
  address: text("address"),
  status: text("status").default("active"),
  source: text("source"),
  assignedTo: text("assigned_to"),
  notes: text("notes"),
  salesExecutive: text("sales_executive"),
  customerNumber: text("customer_number"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// CRM Projects - Simplified version to match SQL structure
export const crmProjects = pgTable("crm_projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  customerId: integer("customer_id").references(() => crmCustomers.id),
  status: text("status").default("planning"),
  priority: text("priority").default("medium"),
  budget: decimal("budget", { precision: 15, scale: 2 }),
  startDate: date("start_date"),
  endDate: date("end_date"),
  progress: integer("progress").default(0),
  assignedTo: text("assigned_to"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// CRM Interactions - Simplified version to match SQL structure
export const crmInteractions = pgTable("crm_interactions", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => crmCustomers.id),
  projectId: integer("project_id").references(() => crmProjects.id),
  type: text("type").notNull(),
  subject: text("subject"),
  content: text("content"),
  date: timestamp("date").defaultNow().notNull(),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// CRM Tasks - Simplified version to match SQL structure
export const crmTasks = pgTable("crm_tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  projectId: integer("project_id").references(() => crmProjects.id),
  customerId: integer("customer_id").references(() => crmCustomers.id),
  status: text("status").default("todo"),
  priority: text("priority").default("medium"),
  assignedTo: text("assigned_to"),
  dueDate: date("due_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// CRM Documents - Simplified version to match SQL structure
export const crmDocuments = pgTable("crm_documents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type"),
  url: text("url"),
  sizeBytes: integer("size_bytes"),
  customerId: integer("customer_id").references(() => crmCustomers.id),
  projectId: integer("project_id").references(() => crmProjects.id),
  uploadedBy: text("uploaded_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// CRM Reports Data - Simplified version to match SQL structure
export const crmReportsData = pgTable("crm_reports_data", {
  id: serial("id").primaryKey(),
  metricName: text("metric_name").notNull(),
  metricValue: decimal("metric_value", { precision: 15, scale: 2 }).notNull(),
  periodStart: date("period_start").notNull(),
  periodEnd: date("period_end").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const leadsRelations = relations(leads, ({ many }) => ({
  calculatorResults: many(calculatorResults),
  aiAgentEvents: many(aiAgentEvents),
  generatedQuotes: many(generatedQuotes),
}));

export const calculatorResultsRelations = relations(calculatorResults, ({ one }) => ({
  lead: one(leads, {
    fields: [calculatorResults.email],
    references: [leads.email],
  }),
}));

export const aiAgentEventsRelations = relations(aiAgentEvents, ({ one }) => ({
  lead: one(leads, {
    fields: [aiAgentEvents.leadId],
    references: [leads.id],
  }),
}));

export const budgetTemplatesRelations = relations(budgetTemplates, ({ many }) => ({
  generatedQuotes: many(generatedQuotes),
}));

export const generatedQuotesRelations = relations(generatedQuotes, ({ one }) => ({
  lead: one(leads, {
    fields: [generatedQuotes.leadId],
    references: [leads.id],
  }),
  template: one(budgetTemplates, {
    fields: [generatedQuotes.templateId],
    references: [budgetTemplates.id],
  }),
}));

export const collaboratorsRelations = relations(collaborators, ({ many }) => ({
  projectBids: many(projectBids),
  activeProjects: many(activeProjects),
  collaboratorPayments: many(collaboratorPayments),
}));

export const projectOffersRelations = relations(projectOffers, ({ one, many }) => ({
  client: one(leads, {
    fields: [projectOffers.clientId],
    references: [leads.id],
  }),
  projectBids: many(projectBids),
  activeProjects: many(activeProjects),
}));

export const projectBidsRelations = relations(projectBids, ({ one }) => ({
  projectOffer: one(projectOffers, {
    fields: [projectBids.projectOfferId],
    references: [projectOffers.id],
  }),
  collaborator: one(collaborators, {
    fields: [projectBids.collaboratorId],
    references: [collaborators.id],
  }),
  activeProject: one(activeProjects, {
    fields: [projectBids.id],
    references: [activeProjects.bidId],
  }),
}));

export const activeProjectsRelations = relations(activeProjects, ({ one, many }) => ({
  projectOffer: one(projectOffers, {
    fields: [activeProjects.projectOfferId],
    references: [projectOffers.id],
  }),
  collaborator: one(collaborators, {
    fields: [activeProjects.collaboratorId],
    references: [collaborators.id],
  }),
  bid: one(projectBids, {
    fields: [activeProjects.bidId],
    references: [projectBids.id],
  }),
  collaboratorPayments: many(collaboratorPayments),
}));

export const collaboratorPaymentsRelations = relations(collaboratorPayments, ({ one }) => ({
  activeProject: one(activeProjects, {
    fields: [collaboratorPayments.activeProjectId],
    references: [activeProjects.id],
  }),
  collaborator: one(collaborators, {
    fields: [collaboratorPayments.collaboratorId],
    references: [collaborators.id],
  }),
}));

// Zod schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const insertCalculatorLeadSchema = insertLeadSchema.extend({
  calle: z.string().min(3, "Ingresa el nombre de la calle"),
  numero: z.string().min(1, "Ingresa el número de la propiedad"),
  comuna: z.string().min(1, "Selecciona la comuna"),
  projectType: z.string().min(1, "Tipo de proyecto es requerido"),
  budget: z.string().min(1, "Presupuesto es requerido"),
  source: z.literal("calculadora-costos"),
}).omit({ helpType: true, timeline: true, message: true });

export const insertCalculatorResultSchema = createInsertSchema(calculatorResults).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
});

export const insertAiAgentEventSchema = createInsertSchema(aiAgentEvents).omit({
  id: true,
  createdAt: true,
});

export const insertBudgetTemplateSchema = createInsertSchema(budgetTemplates).omit({
  id: true,
  createdAt: true,
});

export const insertGeneratedQuoteSchema = createInsertSchema(generatedQuotes).omit({
  id: true,
  createdAt: true,
});

export const insertCollaboratorSchema = createInsertSchema(collaborators).omit({
  id: true,
  createdAt: true,
});

export const insertProjectOfferSchema = createInsertSchema(projectOffers).omit({
  id: true,
  createdAt: true,
});

export const insertProjectBidSchema = createInsertSchema(projectBids).omit({
  id: true,
  createdAt: true,
});

export const insertActiveProjectSchema = createInsertSchema(activeProjects).omit({
  id: true,
  createdAt: true,
});

export const insertCollaboratorPaymentSchema = createInsertSchema(collaboratorPayments).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type InsertCalculatorLead = z.infer<typeof insertCalculatorLeadSchema>;
export type CalculatorResult = typeof calculatorResults.$inferSelect;
export type InsertCalculatorResult = z.infer<typeof insertCalculatorResultSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type AiAgentEvent = typeof aiAgentEvents.$inferSelect;
export type InsertAiAgentEvent = z.infer<typeof insertAiAgentEventSchema>;
export type BudgetTemplate = typeof budgetTemplates.$inferSelect;
export type InsertBudgetTemplate = z.infer<typeof insertBudgetTemplateSchema>;
export type GeneratedQuote = typeof generatedQuotes.$inferSelect;
export type InsertGeneratedQuote = z.infer<typeof insertGeneratedQuoteSchema>;
export type Collaborator = typeof collaborators.$inferSelect;
export type InsertCollaborator = z.infer<typeof insertCollaboratorSchema>;
export type ProjectOffer = typeof projectOffers.$inferSelect;
export type InsertProjectOffer = z.infer<typeof insertProjectOfferSchema>;
export type ProjectBid = typeof projectBids.$inferSelect;
export type InsertProjectBid = z.infer<typeof insertProjectBidSchema>;
export type ActiveProject = typeof activeProjects.$inferSelect;
export type InsertActiveProject = z.infer<typeof insertActiveProjectSchema>;
export type CollaboratorPayment = typeof collaboratorPayments.$inferSelect;
export type InsertCollaboratorPayment = z.infer<typeof insertCollaboratorPaymentSchema>;

// Integration types
export type IntegrationEvent = typeof integrationEvents.$inferSelect;
export type InsertIntegrationEvent = typeof integrationEvents.$inferInsert;
export type IntegrationConfig = typeof integrationConfigs.$inferSelect;
export type InsertIntegrationConfig = typeof integrationConfigs.$inferInsert;

// ========== CRM RELATIONS ==========

export const crmCustomersRelations = relations(crmCustomers, ({ many }) => ({
  projects: many(crmProjects),
  interactions: many(crmInteractions),
  documents: many(crmDocuments),
  tasks: many(crmTasks),
}));

export const crmProjectsRelations = relations(crmProjects, ({ one, many }) => ({
  customer: one(crmCustomers, {
    fields: [crmProjects.customerId],
    references: [crmCustomers.id],
  }),
  interactions: many(crmInteractions),
  documents: many(crmDocuments),
  tasks: many(crmTasks),
}));

export const crmInteractionsRelations = relations(crmInteractions, ({ one }) => ({
  customer: one(crmCustomers, {
    fields: [crmInteractions.customerId],
    references: [crmCustomers.id],
  }),
  project: one(crmProjects, {
    fields: [crmInteractions.projectId],
    references: [crmProjects.id],
  }),
}));

export const crmDocumentsRelations = relations(crmDocuments, ({ one }) => ({
  customer: one(crmCustomers, {
    fields: [crmDocuments.customerId],
    references: [crmCustomers.id],
  }),
  project: one(crmProjects, {
    fields: [crmDocuments.projectId],
    references: [crmProjects.id],
  }),
}));

export const crmTasksRelations = relations(crmTasks, ({ one }) => ({
  customer: one(crmCustomers, {
    fields: [crmTasks.customerId],
    references: [crmCustomers.id],
  }),
  project: one(crmProjects, {
    fields: [crmTasks.projectId],
    references: [crmProjects.id],
  }),
}));

// ========== CRM SCHEMAS ==========

export const insertCrmCustomerSchema = createInsertSchema(crmCustomers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCrmProjectSchema = createInsertSchema(crmProjects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCrmInteractionSchema = createInsertSchema(crmInteractions).omit({
  id: true,
  createdAt: true,
});

export const insertCrmDocumentSchema = createInsertSchema(crmDocuments).omit({
  id: true,
  createdAt: true,
});

export const insertCrmTaskSchema = createInsertSchema(crmTasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// ========== CRM TYPES ==========

export type CrmCustomer = typeof crmCustomers.$inferSelect;
export type InsertCrmCustomer = z.infer<typeof insertCrmCustomerSchema>;
export type CrmProject = typeof crmProjects.$inferSelect;
export type InsertCrmProject = z.infer<typeof insertCrmProjectSchema>;
export type CrmInteraction = typeof crmInteractions.$inferSelect;
export type InsertCrmInteraction = z.infer<typeof insertCrmInteractionSchema>;
export type CrmDocument = typeof crmDocuments.$inferSelect;
export type InsertCrmDocument = z.infer<typeof insertCrmDocumentSchema>;
export type CrmReportsData = typeof crmReportsData.$inferSelect;
export type CrmTask = typeof crmTasks.$inferSelect;
export type InsertCrmTask = z.infer<typeof insertCrmTaskSchema>;
