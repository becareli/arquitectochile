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
  crmCustomers,
  crmProjects,
  crmInteractions,
  crmDocuments,
  crmTasks,
  crmReportsData,
  type User, 
  type UpsertUser, 
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
  type InsertGeneratedQuote,
  type CrmCustomer,
  type InsertCrmCustomer,
  type CrmProject,
  type InsertCrmProject,
  type CrmInteraction,
  type InsertCrmInteraction,
  type CrmDocument,
  type InsertCrmDocument,
  type CrmTask,
  type InsertCrmTask,
  type CrmReportsData
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Leads
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLeadById(id: number): Promise<Lead | undefined>;
  getLeadByEmail(email: string): Promise<Lead | undefined>;
  updateLeadStatus(id: number, status: string): Promise<Lead | undefined>;
  
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

  // ========== CRM METHODS ==========
  
  // CRM Customers
  createCrmCustomer(customer: Omit<InsertCrmCustomer, 'customerNumber'> & { customerNumber: string }): Promise<CrmCustomer>;
  getCrmCustomers(): Promise<CrmCustomer[]>;
  getCrmCustomer(id: number): Promise<CrmCustomer | undefined>;
  updateCrmCustomer(id: number, updates: Partial<CrmCustomer>): Promise<CrmCustomer>;
  getCrmCustomersByExecutive(executive: string): Promise<CrmCustomer[]>;

  // CRM Projects
  createCrmProject(project: Omit<InsertCrmProject, 'projectNumber'> & { projectNumber: string }): Promise<CrmProject>;
  getCrmProjects(): Promise<CrmProject[]>;
  getCrmProject(id: number): Promise<CrmProject | undefined>;
  updateCrmProject(id: number, updates: Partial<CrmProject>): Promise<CrmProject>;
  getCrmProjectsByCustomer(customerId: number): Promise<CrmProject[]>;
  getCrmProjectsByStage(stage: string): Promise<CrmProject[]>;

  // CRM Interactions
  createCrmInteraction(interaction: InsertCrmInteraction): Promise<CrmInteraction>;
  getCrmInteractions(filters?: { customerId?: number; projectId?: number }): Promise<CrmInteraction[]>;
  getCrmInteractionsByCustomer(customerId: number): Promise<CrmInteraction[]>;
  getCrmInteractionsByProject(projectId: number): Promise<CrmInteraction[]>;

  // CRM Documents
  createCrmDocument(document: InsertCrmDocument): Promise<CrmDocument>;
  getCrmDocuments(filters?: { customerId?: number; projectId?: number }): Promise<CrmDocument[]>;
  getCrmDocumentsByCustomer(customerId: number): Promise<CrmDocument[]>;
  getCrmDocumentsByProject(projectId: number): Promise<CrmDocument[]>;

  // CRM Tasks
  createCrmTask(task: InsertCrmTask): Promise<CrmTask>;
  getCrmTasks(filters?: { assignedTo?: string; status?: string }): Promise<CrmTask[]>;
  updateCrmTask(id: number, updates: Partial<CrmTask>): Promise<CrmTask>;
  getCrmTasksByAssignee(assignedTo: string): Promise<CrmTask[]>;

  // CRM Analytics and Reports
  getCrmDashboardData(): Promise<{
    totalCustomers: number;
    activeProjects: number;
    pendingTasks: number;
    monthlyRevenue: number;
    conversionRate: number;
    recentInteractions: CrmInteraction[];
  }>;
  getCrmConversionReport(period: string): Promise<{
    leadsGenerated: number;
    leadsConverted: number;
    conversionRate: number;
    averageConversionTime: number;
  }>;
  getCrmProjectsReport(period: string): Promise<{
    totalProjects: number;
    completedProjects: number;
    onTimeCompletion: number;
    averageProjectValue: number;
  }>;

  // Helper methods for CRM
  getLead(id: number): Promise<Lead | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Users for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
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

  async getLeadByEmail(email: string): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.email, email));
    return lead || undefined;
  }

  async updateLeadStatus(id: number, status: string): Promise<Lead | undefined> {
    const [lead] = await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id))
      .returning();
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



  async updateQuoteStatus(id: number, status: string): Promise<GeneratedQuote> {
    const [updatedQuote] = await db.update(generatedQuotes).set({ status }).where(eq(generatedQuotes.id, id)).returning();
    return updatedQuote;
  }

  // ========== CRM IMPLEMENTATIONS ==========

  // CRM Customers
  async createCrmCustomer(customer: Omit<InsertCrmCustomer, 'customerNumber'> & { customerNumber: string }): Promise<CrmCustomer> {
    const [newCustomer] = await db.insert(crmCustomers).values(customer).returning();
    return newCustomer;
  }

  // CRM Customers - Simplified
  async getCrmCustomers(): Promise<CrmCustomer[]> {
    return await db.select().from(crmCustomers).orderBy(desc(crmCustomers.createdAt));
  }

  async getCrmCustomer(id: number): Promise<CrmCustomer | undefined> {
    const [customer] = await db.select().from(crmCustomers).where(eq(crmCustomers.id, id));
    return customer || undefined;
  }

  async createCrmCustomer(customer: InsertCrmCustomer): Promise<CrmCustomer> {
    const [newCustomer] = await db.insert(crmCustomers).values(customer).returning();
    return newCustomer;
  }

  async updateCrmCustomer(id: number, updates: Partial<CrmCustomer>): Promise<CrmCustomer> {
    const [updatedCustomer] = await db.update(crmCustomers).set(updates).where(eq(crmCustomers.id, id)).returning();
    return updatedCustomer;
  }

  // CRM Projects - Simplified
  async createCrmProject(project: InsertCrmProject): Promise<CrmProject> {
    const [newProject] = await db.insert(crmProjects).values(project).returning();
    return newProject;
  }

  async getCrmProjects(): Promise<CrmProject[]> {
    return await db.select().from(crmProjects).orderBy(desc(crmProjects.createdAt));
  }

  async getCrmProject(id: number): Promise<CrmProject | undefined> {
    const [project] = await db.select().from(crmProjects).where(eq(crmProjects.id, id));
    return project || undefined;
  }

  async updateCrmProject(id: number, updates: Partial<CrmProject>): Promise<CrmProject> {
    const [updatedProject] = await db.update(crmProjects).set(updates).where(eq(crmProjects.id, id)).returning();
    return updatedProject;
  }

  async getCrmProjectsByCustomer(customerId: number): Promise<CrmProject[]> {
    return await db.select().from(crmProjects).where(eq(crmProjects.customerId, customerId));
  }

  // CRM Interactions - Simplified
  async createCrmInteraction(interaction: InsertCrmInteraction): Promise<CrmInteraction> {
    const [newInteraction] = await db.insert(crmInteractions).values(interaction).returning();
    return newInteraction;
  }

  async getCrmInteractions(filters?: { customerId?: number; projectId?: number }): Promise<CrmInteraction[]> {
    let query = db.select().from(crmInteractions);
    
    if (filters?.customerId) {
      query = query.where(eq(crmInteractions.customerId, filters.customerId));
    }
    if (filters?.projectId) {
      query = query.where(eq(crmInteractions.projectId, filters.projectId));
    }
    
    return await query.orderBy(desc(crmInteractions.createdAt));
  }

  // CRM Documents - Simplified
  async createCrmDocument(document: InsertCrmDocument): Promise<CrmDocument> {
    const [newDocument] = await db.insert(crmDocuments).values(document).returning();
    return newDocument;
  }

  async getCrmDocuments(filters?: { customerId?: number; projectId?: number }): Promise<CrmDocument[]> {
    let query = db.select().from(crmDocuments);
    
    if (filters?.customerId) {
      query = query.where(eq(crmDocuments.customerId, filters.customerId));
    }
    if (filters?.projectId) {
      query = query.where(eq(crmDocuments.projectId, filters.projectId));
    }
    
    return await query.orderBy(desc(crmDocuments.createdAt));
  }

  // CRM Tasks - Simplified
  async createCrmTask(task: InsertCrmTask): Promise<CrmTask> {
    const [newTask] = await db.insert(crmTasks).values(task).returning();
    return newTask;
  }

  async getCrmTasks(filters?: { assignedTo?: string; status?: string }): Promise<CrmTask[]> {
    let query = db.select().from(crmTasks);
    
    if (filters?.assignedTo) {
      query = query.where(eq(crmTasks.assignedTo, filters.assignedTo));
    }
    if (filters?.status) {
      query = query.where(eq(crmTasks.status, filters.status));
    }
    
    return await query.orderBy(desc(crmTasks.createdAt));
  }

  async updateCrmTask(id: number, updates: Partial<CrmTask>): Promise<CrmTask> {
    const [updatedTask] = await db.update(crmTasks).set(updates).where(eq(crmTasks.id, id)).returning();
    return updatedTask;
  }

  // CRM Analytics and Reports
  async getCrmDashboardData(): Promise<{
    totalCustomers: number;
    activeProjects: number;
    pendingTasks: number;
    monthlyRevenue: number;
    conversionRate: number;
    recentInteractions: CrmInteraction[];
  }> {
    const customers = await this.getCrmCustomers();
    const projects = await this.getCrmProjects();
    const tasks = await this.getCrmTasks({ status: 'pending' });
    const interactions = await this.getCrmInteractions();
    const leads = await this.getLeads();

    // Calculate monthly revenue from completed projects
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyProjects = projects.filter(p => {
      const projectDate = new Date(p.createdAt);
      return p.status === 'completed' && 
             projectDate.getMonth() === currentMonth && 
             projectDate.getFullYear() === currentYear;
    });

    const monthlyRevenue = monthlyProjects.reduce((sum, p) => sum + (parseFloat(p.contractValue || '0')), 0);

    // Calculate conversion rate
    const convertedLeads = leads.filter(l => l.status === 'converted').length;
    const totalLeads = leads.length;
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

    // Get recent interactions (last 10)
    const recentInteractions = interactions.slice(0, 10);

    return {
      totalCustomers: customers.length,
      activeProjects: projects.filter(p => ['planning', 'in_progress', 'under_review'].includes(p.stage)).length,
      pendingTasks: tasks.length,
      monthlyRevenue,
      conversionRate,
      recentInteractions
    };
  }

  async getCrmConversionReport(period: string): Promise<{
    leadsGenerated: number;
    leadsConverted: number;
    conversionRate: number;
    averageConversionTime: number;
  }> {
    const leads = await this.getLeads();
    
    // Filter by period (for now, just use all data)
    const leadsGenerated = leads.length;
    const leadsConverted = leads.filter(l => l.status === 'converted').length;
    const conversionRate = leadsGenerated > 0 ? (leadsConverted / leadsGenerated) * 100 : 0;
    
    // Calculate average conversion time (simplified)
    const convertedLeads = leads.filter(l => l.status === 'converted');
    const totalConversionTime = convertedLeads.reduce((sum, lead) => {
      const createdAt = new Date(lead.createdAt);
      const now = new Date();
      return sum + (now.getTime() - createdAt.getTime());
    }, 0);
    
    const averageConversionTime = convertedLeads.length > 0 
      ? totalConversionTime / convertedLeads.length / (1000 * 60 * 60 * 24) // days
      : 0;

    return {
      leadsGenerated,
      leadsConverted,
      conversionRate,
      averageConversionTime
    };
  }

  async getCrmProjectsReport(period: string): Promise<{
    totalProjects: number;
    completedProjects: number;
    onTimeCompletion: number;
    averageProjectValue: number;
  }> {
    const projects = await this.getCrmProjects();
    
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.stage === 'completed').length;
    const onTimeProjects = projects.filter(p => 
      p.stage === 'completed' && 
      p.scheduledEndDate && 
      new Date(p.actualEndDate || new Date()) <= new Date(p.scheduledEndDate)
    ).length;
    
    const onTimeCompletion = completedProjects > 0 ? (onTimeProjects / completedProjects) * 100 : 0;
    
    const totalValue = projects.reduce((sum, p) => sum + (parseFloat(p.contractValue || '0')), 0);
    const averageProjectValue = totalProjects > 0 ? totalValue / totalProjects : 0;

    return {
      totalProjects,
      completedProjects,
      onTimeCompletion,
      averageProjectValue
    };
  }

  // Helper method for getLead
  async getLead(id: number): Promise<Lead | undefined> {
    return await this.getLeadById(id);
  }
}

export const storage = new DatabaseStorage();
