import { pgTable, text, serial, integer, boolean, timestamp, decimal, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
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
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clientDocuments = pgTable("client_documents", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => clientProjects.id).notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // plans, contracts, permits, specifications, photos
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size"), // in bytes
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

// CRM Customers (evolución de leads convertidos)
export const crmCustomers = pgTable("crm_customers", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => leads.id), // Referencia al lead original
  customerNumber: text("customer_number").notNull().unique(), // Número de cliente único
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  region: text("region"),
  rut: text("rut"), // RUT chileno
  customerType: text("customer_type").notNull().default("particular"), // particular, empresa
  businessName: text("business_name"), // Razón social si es empresa
  businessRut: text("business_rut"), // RUT empresa
  salesExecutive: text("sales_executive").notNull(), // Ejecutivo asignado
  customerValue: text("customer_value").notNull().default("standard"), // standard, premium, vip
  loyaltyLevel: integer("loyalty_level").default(1), // 1-5 nivel de lealtad
  lastContactDate: timestamp("last_contact_date"),
  nextFollowUpDate: timestamp("next_follow_up_date"),
  preferredContactMethod: text("preferred_contact_method").default("email"), // email, phone, whatsapp
  status: text("status").notNull().default("active"), // active, inactive, suspended
  notes: text("notes"),
  tags: text("tags").array(), // Tags personalizables
  referralSource: text("referral_source"), // De dónde viene el cliente
  totalProjectsValue: decimal("total_projects_value", { precision: 12, scale: 2 }).default("0.00"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// CRM Projects (gestión completa del ciclo de proyecto)
export const crmProjects = pgTable("crm_projects", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => crmCustomers.id).notNull(),
  projectNumber: text("project_number").notNull().unique(), // Número de proyecto único
  name: text("name").notNull(),
  description: text("description"),
  projectType: text("project_type").notNull(), // ampliacion, remodelacion, casa_nueva, permiso, etc.
  serviceType: text("service_type").notNull(), // diseno_conceptual, anteproyecto, proyecto_arquitectura, permisos, construccion
  
  // Etapas del proyecto
  currentStage: text("current_stage").notNull().default("design_conceptual"), 
  // Etapas: design_conceptual, anteproyecto, proyecto_arquitectura, permisos, construccion, post_venta
  
  stageProgress: json("stage_progress"), // Progreso detallado por etapa
  
  // Información financiera
  budgetEstimated: decimal("budget_estimated", { precision: 12, scale: 2 }),
  budgetApproved: decimal("budget_approved", { precision: 12, scale: 2 }),
  totalPaid: decimal("total_paid", { precision: 12, scale: 2 }).default("0.00"),
  
  // Fechas y plazos
  startDate: timestamp("start_date"),
  estimatedEndDate: timestamp("estimated_end_date"),
  actualEndDate: timestamp("actual_end_date"),
  
  // Ubicación del proyecto
  projectAddress: text("project_address"),
  city: text("city"),
  region: text("region"),
  
  // Equipo asignado
  projectManager: text("project_manager").notNull(),
  architect: text("architect"),
  engineer: text("engineer"),
  constructor: text("constructor"),
  
  // Estado y prioridad
  status: text("status").notNull().default("planning"), // planning, active, on_hold, completed, cancelled
  priority: text("priority").notNull().default("medium"), // low, medium, high, urgent
  
  // Hitos importantes
  milestones: json("milestones"), // Array de hitos con fechas
  
  // Documentos y archivos
  documentsFolder: text("documents_folder"), // Ruta a carpeta de documentos
  
  // Notas y observaciones
  notes: text("notes"),
  internalNotes: text("internal_notes"), // Notas internas del equipo
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// CRM Interactions (registro completo de interacciones)
export const crmInteractions = pgTable("crm_interactions", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => crmCustomers.id),
  projectId: integer("project_id").references(() => crmProjects.id),
  leadId: integer("lead_id").references(() => leads.id), // Para interacciones pre-conversión
  
  // Tipo y canal de interacción
  interactionType: text("interaction_type").notNull(), // call, email, meeting, whatsapp, video_call
  direction: text("direction").notNull(), // inbound, outbound
  channel: text("channel").notNull(), // phone, email, whatsapp, in_person, video
  
  // Contenido de la interacción
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  outcome: text("outcome"), // Resultado de la interacción
  nextAction: text("next_action"), // Siguiente acción requerida
  
  // Participantes
  contactedBy: text("contacted_by").notNull(), // Quién realizó la interacción
  attendees: text("attendees").array(), // Otros participantes
  
  // Datos específicos por tipo
  callDuration: integer("call_duration"), // Duración en minutos
  emailSubject: text("email_subject"),
  meetingLocation: text("meeting_location"),
  
  // Seguimiento
  followUpRequired: boolean("follow_up_required").default(false),
  followUpDate: timestamp("follow_up_date"),
  completed: boolean("completed").default(true),
  
  // Categorización
  category: text("category"), // sales, support, technical, admin
  priority: text("priority").default("medium"), // low, medium, high
  tags: text("tags").array(),
  
  // Archivos adjuntos
  attachments: json("attachments"), // URLs de archivos adjuntos
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// CRM Documents (gestión centralizada de documentos)
export const crmDocuments = pgTable("crm_documents", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => crmCustomers.id),
  projectId: integer("project_id").references(() => crmProjects.id),
  
  // Información del documento
  fileName: text("file_name").notNull(),
  originalName: text("original_name").notNull(),
  fileType: text("file_type").notNull(), // pdf, dwg, jpg, docx, etc.
  fileSize: integer("file_size"), // Tamaño en bytes
  filePath: text("file_path").notNull(), // Ruta en el sistema de archivos
  
  // Categorización
  category: text("category").notNull(), // planos, contratos, permisos, facturas, fotos, especificaciones
  subCategory: text("sub_category"), // subcategorías específicas
  stage: text("stage"), // Etapa del proyecto asociada
  
  // Metadatos
  description: text("description"),
  version: text("version").default("1.0"),
  status: text("status").default("active"), // active, archived, deleted
  
  // Control de acceso
  uploadedBy: text("uploaded_by").notNull(),
  isPublic: boolean("is_public").default(false), // Visible para el cliente
  requiresApproval: boolean("requires_approval").default(false),
  approved: boolean("approved").default(true),
  approvedBy: text("approved_by"),
  approvedDate: timestamp("approved_date"),
  
  // Fechas importantes
  documentDate: timestamp("document_date"), // Fecha del documento
  expirationDate: timestamp("expiration_date"), // Para documentos que expiran
  
  tags: text("tags").array(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// CRM Reports Data (datos para reportes y métricas)
export const crmReportsData = pgTable("crm_reports_data", {
  id: serial("id").primaryKey(),
  reportType: text("report_type").notNull(), // sales, projects, interactions, conversion
  periodType: text("period_type").notNull(), // daily, weekly, monthly, quarterly, yearly
  periodDate: timestamp("period_date").notNull(), // Fecha del período
  
  // Métricas de ventas
  totalLeads: integer("total_leads").default(0),
  convertedLeads: integer("converted_leads").default(0),
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 2 }).default("0.00"),
  totalRevenue: decimal("total_revenue", { precision: 12, scale: 2 }).default("0.00"),
  averageProjectValue: decimal("average_project_value", { precision: 10, scale: 2 }).default("0.00"),
  
  // Métricas de proyectos
  activeProjects: integer("active_projects").default(0),
  completedProjects: integer("completed_projects").default(0),
  onTimeCompletion: decimal("on_time_completion", { precision: 5, scale: 2 }).default("0.00"),
  averageProjectDuration: integer("average_project_duration").default(0), // días
  
  // Métricas de interacciones
  totalInteractions: integer("total_interactions").default(0),
  callsCount: integer("calls_count").default(0),
  emailsCount: integer("emails_count").default(0),
  meetingsCount: integer("meetings_count").default(0),
  
  // Datos adicionales en JSON
  additionalMetrics: json("additional_metrics"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// CRM Tasks (gestión de tareas y seguimientos)
export const crmTasks = pgTable("crm_tasks", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => crmCustomers.id),
  projectId: integer("project_id").references(() => crmProjects.id),
  leadId: integer("lead_id").references(() => leads.id),
  
  title: text("title").notNull(),
  description: text("description"),
  taskType: text("task_type").notNull(), // follow_up, meeting, call, email, document_review
  priority: text("priority").notNull().default("medium"), // low, medium, high, urgent
  
  // Asignación
  assignedTo: text("assigned_to").notNull(),
  assignedBy: text("assigned_by").notNull(),
  
  // Fechas
  dueDate: timestamp("due_date").notNull(),
  reminderDate: timestamp("reminder_date"),
  completedDate: timestamp("completed_date"),
  
  // Estado
  status: text("status").notNull().default("pending"), // pending, in_progress, completed, cancelled
  
  // Resultado
  result: text("result"),
  completedBy: text("completed_by"),
  
  tags: text("tags").array(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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
export type User = typeof users.$inferSelect;
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

export const crmCustomersRelations = relations(crmCustomers, ({ one, many }) => ({
  lead: one(leads, {
    fields: [crmCustomers.leadId],
    references: [leads.id],
  }),
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
  lead: one(leads, {
    fields: [crmInteractions.leadId],
    references: [leads.id],
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
  lead: one(leads, {
    fields: [crmTasks.leadId],
    references: [leads.id],
  }),
}));

// ========== CRM SCHEMAS ==========

export const insertCrmCustomerSchema = createInsertSchema(crmCustomers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  customerNumber: true, // Auto-generated
  totalProjectsValue: true // Calculated
});

export const insertCrmProjectSchema = createInsertSchema(crmProjects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  projectNumber: true // Auto-generated
});

export const insertCrmInteractionSchema = createInsertSchema(crmInteractions).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertCrmDocumentSchema = createInsertSchema(crmDocuments).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertCrmTaskSchema = createInsertSchema(crmTasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true
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
