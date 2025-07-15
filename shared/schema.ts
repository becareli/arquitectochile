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
  status: text("status").notNull().default("processed"), // 'processed', 'failed', 'pending'
  response: json("response"), // Response data from processing
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const leadsRelations = relations(leads, ({ many }) => ({
  calculatorResults: many(calculatorResults),
  aiAgentEvents: many(aiAgentEvents),
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
