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
  helpType: text("help_type").notNull(),
  timeline: text("timeline").notNull(),
  message: text("message").notNull(),
  source: text("source").notNull().default("contact_form"),
  status: text("status").notNull().default("new"),
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
