import { 
  users, 
  leads, 
  calculatorResults, 
  projects, 
  testimonials, 
  blogPosts,
  aiAgentEvents,
  budgetTemplates,
  generatedQuotes,
  type User, 
  type InsertUser, 
  type Lead, 
  type InsertLead,
  type CalculatorResult,
  type InsertCalculatorResult,
  type Project,
  type InsertProject,
  type Testimonial,
  type InsertTestimonial,
  type BlogPost,
  type InsertBlogPost,
  type AiAgentEvent,
  type InsertAiAgentEvent,
  type BudgetTemplate,
  type InsertBudgetTemplate,
  type GeneratedQuote,
  type InsertGeneratedQuote
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Leads
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLeadById(id: number): Promise<Lead | undefined>;
  
  // Calculator Results
  createCalculatorResult(result: InsertCalculatorResult): Promise<CalculatorResult>;
  getCalculatorResultsByEmail(email: string): Promise<CalculatorResult[]>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  getTestimonialById(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // AI Agent Events
  createAiAgentEvent(event: InsertAiAgentEvent): Promise<AiAgentEvent>;
  getAiAgentEvents(): Promise<AiAgentEvent[]>;
  getAiAgentEventsByLeadId(leadId: number): Promise<AiAgentEvent[]>;
  getAiAgentEventsByType(eventType: string): Promise<AiAgentEvent[]>;
  
  // Budget Templates
  createBudgetTemplate(template: InsertBudgetTemplate): Promise<BudgetTemplate>;
  getBudgetTemplates(): Promise<BudgetTemplate[]>;
  getActiveBudgetTemplates(): Promise<BudgetTemplate[]>;
  getBudgetTemplateById(id: number): Promise<BudgetTemplate | undefined>;
  getBudgetTemplatesByServiceType(serviceType: string): Promise<BudgetTemplate[]>;
  updateBudgetTemplate(id: number, updates: Partial<InsertBudgetTemplate>): Promise<BudgetTemplate>;
  
  // Generated Quotes
  createGeneratedQuote(quote: InsertGeneratedQuote): Promise<GeneratedQuote>;
  getGeneratedQuotes(): Promise<GeneratedQuote[]>;
  getGeneratedQuotesByLeadId(leadId: number): Promise<GeneratedQuote[]>;
  getGeneratedQuoteById(id: number): Promise<GeneratedQuote | undefined>;
  updateQuoteStatus(id: number, status: string): Promise<GeneratedQuote>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Leads
  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }

  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLeadById(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead || undefined;
  }

  // Calculator Results
  async createCalculatorResult(result: InsertCalculatorResult): Promise<CalculatorResult> {
    const [newResult] = await db.insert(calculatorResults).values(result).returning();
    return newResult;
  }

  async getCalculatorResultsByEmail(email: string): Promise<CalculatorResult[]> {
    return await db.select().from(calculatorResults).where(eq(calculatorResults.email, email));
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.featured, true));
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).where(eq(testimonials.featured, true));
  }

  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial || undefined;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  // AI Agent Events
  async createAiAgentEvent(event: InsertAiAgentEvent): Promise<AiAgentEvent> {
    const [newEvent] = await db.insert(aiAgentEvents).values(event).returning();
    return newEvent;
  }

  async getAiAgentEvents(): Promise<AiAgentEvent[]> {
    return await db.select().from(aiAgentEvents).orderBy(desc(aiAgentEvents.createdAt));
  }

  async getAiAgentEventsByLeadId(leadId: number): Promise<AiAgentEvent[]> {
    return await db.select().from(aiAgentEvents).where(eq(aiAgentEvents.leadId, leadId)).orderBy(desc(aiAgentEvents.createdAt));
  }

  async getAiAgentEventsByType(eventType: string): Promise<AiAgentEvent[]> {
    return await db.select().from(aiAgentEvents).where(eq(aiAgentEvents.eventType, eventType)).orderBy(desc(aiAgentEvents.createdAt));
  }

  // Budget Templates
  async createBudgetTemplate(template: InsertBudgetTemplate): Promise<BudgetTemplate> {
    const [newTemplate] = await db.insert(budgetTemplates).values(template).returning();
    return newTemplate;
  }

  async getBudgetTemplates(): Promise<BudgetTemplate[]> {
    return await db.select().from(budgetTemplates).orderBy(desc(budgetTemplates.createdAt));
  }

  async getActiveBudgetTemplates(): Promise<BudgetTemplate[]> {
    return await db.select().from(budgetTemplates).where(eq(budgetTemplates.active, true)).orderBy(desc(budgetTemplates.createdAt));
  }

  async getBudgetTemplateById(id: number): Promise<BudgetTemplate | undefined> {
    const [template] = await db.select().from(budgetTemplates).where(eq(budgetTemplates.id, id));
    return template || undefined;
  }

  async getBudgetTemplatesByServiceType(serviceType: string): Promise<BudgetTemplate[]> {
    return await db.select().from(budgetTemplates).where(eq(budgetTemplates.serviceType, serviceType)).orderBy(desc(budgetTemplates.createdAt));
  }

  async updateBudgetTemplate(id: number, updates: Partial<InsertBudgetTemplate>): Promise<BudgetTemplate> {
    const [updatedTemplate] = await db.update(budgetTemplates).set(updates).where(eq(budgetTemplates.id, id)).returning();
    return updatedTemplate;
  }

  // Generated Quotes
  async createGeneratedQuote(quote: InsertGeneratedQuote): Promise<GeneratedQuote> {
    const [newQuote] = await db.insert(generatedQuotes).values(quote).returning();
    return newQuote;
  }

  async getGeneratedQuotes(): Promise<GeneratedQuote[]> {
    return await db.select().from(generatedQuotes).orderBy(desc(generatedQuotes.createdAt));
  }

  async getAllQuotesWithLeads(): Promise<(GeneratedQuote & { lead?: Lead })[]> {
    const allQuotes = await this.getGeneratedQuotes();
    const allLeads = await this.getLeads();
    
    return allQuotes.map(quote => ({
      ...quote,
      lead: allLeads.find(lead => lead.id === quote.leadId)
    }));
  }

  async getGeneratedQuotesByLeadId(leadId: number): Promise<GeneratedQuote[]> {
    return await db.select().from(generatedQuotes).where(eq(generatedQuotes.leadId, leadId)).orderBy(desc(generatedQuotes.createdAt));
  }

  async getGeneratedQuoteById(id: number): Promise<GeneratedQuote | undefined> {
    const [quote] = await db.select().from(generatedQuotes).where(eq(generatedQuotes.id, id));
    return quote || undefined;
  }

  async updateLeadStatus(id: number, status: string): Promise<Lead> {
    const [updatedLead] = await db.update(leads).set({ status }).where(eq(leads.id, id)).returning();
    return updatedLead;
  }

  async updateQuoteStatus(id: number, status: string): Promise<GeneratedQuote> {
    const [updatedQuote] = await db.update(generatedQuotes).set({ status }).where(eq(generatedQuotes.id, id)).returning();
    return updatedQuote;
  }
}

export const storage = new DatabaseStorage();
