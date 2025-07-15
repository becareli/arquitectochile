import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertCalculatorResultSchema } from "@shared/schema";
import { z } from "zod";

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
        "/api/webhooks/ai-agent"
      ]
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
