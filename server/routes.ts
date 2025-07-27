import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertCalculatorResultSchema, insertBudgetTemplateSchema, insertGeneratedQuoteSchema } from "@shared/schema";
import { z } from "zod";
import { setupIntegrationRoutes } from "./integrations/routes";

// Webhook schema for AI agent integration
const webhookSchema = z.object({
  event: z.string(),
  data: z.record(z.any()),
  timestamp: z.string().optional(),
  source: z.string().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead creation endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      res.json({ success: true, lead });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // Get all leads
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.patch("/api/leads/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const lead = await storage.updateLeadStatus(parseInt(req.params.id), status);
      res.json({ success: true, lead });
    } catch (error) {
      res.status(500).json({ error: "Failed to update lead status" });
    }
  });

  // Calculator result creation endpoint
  app.post("/api/calculator-results", async (req, res) => {
    try {
      const resultData = insertCalculatorResultSchema.parse(req.body);
      const result = await storage.createCalculatorResult(resultData);
      res.json({ success: true, result });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // Get projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Get featured projects
  app.get("/api/projects/featured", async (req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured projects" });
    }
  });

  // Get testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Get featured testimonials
  app.get("/api/testimonials/featured", async (req, res) => {
    try {
      const testimonials = await storage.getFeaturedTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured testimonials" });
    }
  });

  // Get blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Get single blog post by slug
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Budget Templates Endpoints
  app.post("/api/budget-templates", async (req, res) => {
    try {
      const templateData = insertBudgetTemplateSchema.parse(req.body);
      const template = await storage.createBudgetTemplate(templateData);
      res.json({ success: true, template });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.get("/api/budget-templates", async (req, res) => {
    try {
      const templates = await storage.getActiveBudgetTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch budget templates" });
    }
  });

  app.get("/api/budget-templates/:serviceType", async (req, res) => {
    try {
      const templates = await storage.getBudgetTemplatesByServiceType(req.params.serviceType);
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch budget templates" });
    }
  });

  // Generated Quotes Endpoints
  app.post("/api/quotes", async (req, res) => {
    try {
      const quoteData = insertGeneratedQuoteSchema.parse(req.body);
      const quote = await storage.createGeneratedQuote(quoteData);
      res.json({ success: true, quote });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getAllQuotesWithLeads();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quotes" });
    }
  });

  app.get("/api/quotes/lead/:leadId", async (req, res) => {
    try {
      const quotes = await storage.getGeneratedQuotesByLeadId(parseInt(req.params.leadId));
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quotes" });
    }
  });

  app.patch("/api/quotes/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const quote = await storage.updateQuoteStatus(parseInt(req.params.id), status);
      res.json({ success: true, quote });
    } catch (error) {
      res.status(500).json({ error: "Failed to update quote status" });
    }
  });

  // AI Agent Webhook Endpoints for N8N/MAKE Integration
  
  // Lead qualification webhook
  app.post("/api/webhooks/lead-qualification", async (req, res) => {
    try {
      const webhook = webhookSchema.parse(req.body);
      // Process lead qualification data for AI agents
      console.log("Lead qualification webhook received:", webhook);
      
      // Update lead status if lead_id provided
      if (webhook.data.lead_id) {
        // Here AI agents can update lead status, add notes, etc.
        console.log(`Processing lead ${webhook.data.lead_id} for qualification`);
      }
      
      res.json({ 
        success: true, 
        message: "Lead qualification webhook processed",
        processed_at: new Date().toISOString()
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid webhook data" });
    }
  });

  // Appointment scheduling webhook
  app.post("/api/webhooks/appointment-scheduled", async (req, res) => {
    try {
      const webhook = webhookSchema.parse(req.body);
      console.log("Appointment scheduled webhook received:", webhook);
      
      // Process appointment data for AI agents
      // Connect with TidyCal, update lead status, send notifications
      
      res.json({ 
        success: true, 
        message: "Appointment webhook processed",
        processed_at: new Date().toISOString()
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid webhook data" });
    }
  });

  // Permit tracking webhook
  app.post("/api/webhooks/permit-update", async (req, res) => {
    try {
      const webhook = webhookSchema.parse(req.body);
      console.log("Permit update webhook received:", webhook);
      
      // Process permit status updates for AI agents
      // Update project status, notify clients, etc.
      
      res.json({ 
        success: true, 
        message: "Permit update webhook processed",
        processed_at: new Date().toISOString()
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid webhook data" });
    }
  });

  // Automated Quote Generation Webhook
  app.post("/api/webhooks/generate-quote", async (req, res) => {
    try {
      const webhook = webhookSchema.parse(req.body);
      console.log("Quote generation webhook received:", webhook);
      
      // Extract quote parameters from webhook data
      const { leadId, serviceType, projectSize, region, complexity } = webhook.data;
      
      // Find appropriate budget template
      const templates = await storage.getBudgetTemplatesByServiceType(serviceType);
      const template = templates.find(t => 
        t.region === region && 
        t.complexity === complexity &&
        (!t.maxSize || projectSize <= t.maxSize) &&
        projectSize >= (t.minSize || 0)
      );
      
      if (!template) {
        return res.status(404).json({ error: "No matching budget template found" });
      }
      
      // Calculate quote pricing
      const basePrice = parseFloat(template.basePrice);
      const sizePrice = template.pricePerM2 ? parseFloat(template.pricePerM2) * projectSize : 0;
      const totalPrice = basePrice + sizePrice;
      
      // Create quote
      const quote = await storage.createGeneratedQuote({
        leadId: parseInt(leadId),
        templateId: template.id,
        projectSize: parseInt(projectSize),
        region,
        complexity,
        basePrice: basePrice.toString(),
        sizePrice: sizePrice.toString(),
        adjustments: webhook.data.adjustments || {},
        totalPrice: totalPrice.toString(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        generatedBy: webhook.source || "ai_agent"
      });
      
      // Log AI agent event
      await storage.createAiAgentEvent({
        eventType: "quote_generated",
        leadId: parseInt(leadId),
        source: webhook.source || "ai_agent",
        data: {
          quoteId: quote.id,
          templateId: template.id,
          totalPrice: totalPrice,
          ...webhook.data
        },
        status: "processed"
      });
      
      res.json({ 
        success: true, 
        message: "Quote generated successfully",
        quote,
        processed_at: new Date().toISOString()
      });
    } catch (error) {
      console.error("Quote generation error:", error);
      res.status(400).json({ error: "Failed to generate quote" });
    }
  });

  // General AI agent webhook for business process automation
  app.post("/api/webhooks/ai-agent", async (req, res) => {
    try {
      const webhook = webhookSchema.parse(req.body);
      console.log("AI Agent webhook received:", webhook);
      
      // Process various AI agent events
      // Route to appropriate business logic based on event type
      
      const response = {
        success: true,
        message: `AI agent webhook processed for event: ${webhook.event}`,
        processed_at: new Date().toISOString(),
        event: webhook.event,
        source: webhook.source || "unknown"
      };
      
      res.json(response);
    } catch (error) {
      res.status(400).json({ error: "Invalid webhook data" });
    }
  });

  // Webhook status endpoint for AI agents to check connectivity
  app.get("/api/webhooks/status", (req, res) => {
    res.json({
      status: "active",
      timestamp: new Date().toISOString(),
      endpoints: [
        "/api/webhooks/lead-qualification",
        "/api/webhooks/appointment-scheduled", 
        "/api/webhooks/permit-update",
        "/api/webhooks/generate-quote",
        "/api/webhooks/ai-agent"
      ]
    });
  });

  // Setup integration routes
  setupIntegrationRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
