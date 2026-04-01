import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertLeadSchema, 
  insertCalculatorLeadSchema, 
  insertCalculatorResultSchema, 
  insertBudgetTemplateSchema, 
  insertGeneratedQuoteSchema,
  insertCrmCustomerSchema,
  insertCrmProjectSchema,
  insertCrmInteractionSchema,
  insertCrmDocumentSchema,
  insertCrmTaskSchema
} from "@shared/schema";
import { z } from "zod";
import { setupIntegrationRoutes } from "./integrations/routes";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";
import { setupAuth, isAuthenticated, isCrmAdmin } from "./replitAuth";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import type { RequestHandler } from "express";
import { sendLeadEmail } from "./lead-integrations";
import { upsertSystemeIoContact, buildTags } from "./systeme-io";
import { upsertHubSpotContact } from "./hubspot";
// Enhanced analytics will be loaded separately to avoid circular imports

// Webhook schemas for AI agent integration
const webhookSchema = z.object({
  event: z.string(),
  data: z.record(z.any()),
  timestamp: z.string().optional(),
  source: z.string().optional(),
});

// Specific schemas for stricter validation
const quoteGenerationWebhookSchema = z.object({
  event: z.literal("quote_generation_request"),
  data: z.object({
    lead_id: z.string().refine(val => !isNaN(Number(val)), "lead_id must be a valid number"),
    service_type: z.enum([
      "reacondicionamiento-termico",
      "fusion-terrenos", 
      "construccion-nueva",
      "ampliacion-vivienda",
      "regularizacion-inmuebles",
      "consultoria-arquitectonica"
    ]),
    area: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, "area must be a positive number"),
    complexity: z.enum(["simple", "standard", "complex"]).optional().default("standard"),
    region: z.string().optional().default("santiago"),
  }),
  timestamp: z.string().optional(),
  source: z.string().optional(),
});

const permitUpdateWebhookSchema = z.object({
  event: z.literal("permit_status_update"),
  data: z.object({
    project_id: z.string().refine(val => !isNaN(Number(val)), "project_id must be a valid number"),
    permit_type: z.string().min(1),
    permit_status: z.enum(["pending", "approved", "rejected", "under_review"]),
    notes: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]).optional().default("medium"),
  }),
  timestamp: z.string().optional(),
  source: z.string().optional(),
});

// In-memory replay protection cache (for 5 minutes)
const replayCache = new Map<string, number>();
const REPLAY_WINDOW = 300; // 5 minutes

// Clean expired entries from replay cache
setInterval(() => {
  const now = Math.floor(Date.now() / 1000);
  replayCache.forEach((timestamp, key) => {
    if (now - timestamp > REPLAY_WINDOW) {
      replayCache.delete(key);
    }
  });
}, 60000); // Clean every minute

// Production security validation
const validateProductionSecurity = () => {
  if (process.env.NODE_ENV === "production") {
    const requiredSecrets = [
      'WEBHOOK_SECRET',
      'N8N_WEBHOOK_TOKEN', 
      'MAKE_WEBHOOK_TOKEN',
      'WEBHOOK_AUTH_TOKEN'
    ];
    
    const missing = requiredSecrets.filter(secret => !process.env[secret]);
    if (missing.length > 0) {
      throw new Error(`Production webhook security requires these environment variables: ${missing.join(', ')}`);
    }
  }
};

// Call validation at startup
validateProductionSecurity();

// Enhanced webhook authentication middleware
const isWebhookAuthenticated: RequestHandler = async (req, res, next) => {
  const webhookSecret = process.env.WEBHOOK_SECRET;
  const authHeader = req.headers.authorization;
  const signatureHeader = req.headers['x-signature'] as string;
  const timestampHeader = req.headers['x-timestamp'] as string;
  
  console.log("🔒 Webhook authentication check:");
  console.log("  Authorization header:", authHeader ? "Present" : "Missing");
  console.log("  X-Signature header:", signatureHeader ? "Present" : "Missing");
  console.log("  Environment:", process.env.NODE_ENV);
  
  // Strict production-only development bypass
  if (process.env.NODE_ENV === "development") {
    console.log("  ⚠️  Development mode: bypassing authentication");
    return next();
  }
  
  // Method 1: Bearer Token Authentication
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const validTokens = [
      process.env.N8N_WEBHOOK_TOKEN,
      process.env.MAKE_WEBHOOK_TOKEN,
      process.env.WEBHOOK_AUTH_TOKEN
    ].filter(Boolean); // Remove undefined values
    
    if (validTokens.includes(token)) {
      console.log("  ✅ Bearer token authenticated");
      return next();
    } else {
      console.log("  ❌ Invalid bearer token");
      return res.status(401).json({ error: "Invalid authentication token" });
    }
  }
  
  // Method 2: HMAC Signature Authentication (production recommended)
  if (signatureHeader && timestampHeader && webhookSecret) {
    try {
      // Validate timestamp to prevent replay attacks
      const timestamp = parseInt(timestampHeader);
      const now = Math.floor(Date.now() / 1000);
      
      if (isNaN(timestamp) || Math.abs(now - timestamp) > REPLAY_WINDOW) {
        console.log("  ❌ Invalid or expired timestamp");
        return res.status(401).json({ error: "Request timestamp invalid or expired" });
      }
      
      // Check replay cache
      const cacheKey = `${signatureHeader}-${timestampHeader}`;
      if (replayCache.has(cacheKey)) {
        console.log("  ❌ Replay attack detected");
        return res.status(401).json({ error: "Request already processed (replay detected)" });
      }
      
      // Use raw body bytes for HMAC verification (captured by middleware)
      const rawBody = (req as any).rawBody;
      if (!rawBody) {
        console.log("  ❌ Raw body not available for HMAC");
        return res.status(401).json({ error: "Raw body required for HMAC verification" });
      }
      const payload = `${timestampHeader}.${rawBody}`;
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(payload, 'utf8')
        .digest('hex');
      
      // Extract signature (remove sha256= prefix if present)
      const providedSignature = signatureHeader.replace(/^sha256=/, '');
      
      // Secure comparison with length check first
      if (expectedSignature.length !== providedSignature.length) {
        console.log("  ❌ Signature length mismatch");
        return res.status(401).json({ error: "Invalid request signature" });
      }
      
      const expectedBuffer = Buffer.from(expectedSignature, 'hex');
      const providedBuffer = Buffer.from(providedSignature, 'hex');
      
      if (expectedBuffer.length !== providedBuffer.length) {
        console.log("  ❌ Signature buffer length mismatch");
        return res.status(401).json({ error: "Invalid request signature format" });
      }
      
      const isValidSignature = crypto.timingSafeEqual(expectedBuffer, providedBuffer);
      
      if (isValidSignature) {
        // Store in replay cache
        replayCache.set(cacheKey, timestamp);
        console.log("  ✅ HMAC signature authenticated");
        return next();
      } else {
        console.log("  ❌ Invalid HMAC signature");
        return res.status(401).json({ error: "Invalid request signature" });
      }
    } catch (error) {
      console.log("  ❌ HMAC validation error:", error);
      return res.status(401).json({ error: "Signature validation failed" });
    }
  }
  
  console.log("  ❌ No valid authentication method found");
  return res.status(401).json({ 
    error: "Webhook authentication required",
    hint: "Use Bearer token in Authorization header or HMAC signature (X-Signature + X-Timestamp headers)",
    required_env: process.env.NODE_ENV === "production" ? "WEBHOOK_SECRET and token env vars required" : undefined
  });
};

// Google My Business review webhook schema
const googleReviewSchema = z.object({
  reviewerName: z.string(),
  rating: z.number().min(1).max(5),
  reviewText: z.string(),
  reviewTime: z.string(),
  reviewUrl: z.string().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve contacto.html directly with no-cache headers (before Vite catch-all)
  app.get('/contacto.html', (_req, res) => {
    const filePath = path.resolve(import.meta.dirname, '..', 'client', 'public', 'contacto.html');
    if (fs.existsSync(filePath)) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('Surrogate-Control', 'no-store');
      res.sendFile(filePath);
    } else {
      res.status(404).send('Página no encontrada');
    }
  });

  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Lead capture endpoint for /contacto (Agustín assistant + full form)
  const leadSchema = z.object({
    nombre: z.string().min(1, "Nombre requerido").max(200),
    email: z.string().email("Email inválido"),
    telefono: z.string().max(20).optional().default(""),
    comuna: z.string().max(100).default(""),
    tipo_proyecto: z.string().max(200).default("General"),
    etapa: z.string().max(100).default(""),
    presupuesto: z.string().max(100).optional().default(""),
    mensaje: z.string().max(2000).default(""),
    branch: z.string().max(50).optional().default(""),
    service: z.string().max(200).optional().default(""),
    propertyType: z.string().max(50).optional().default(""),
    direccion: z.string().max(300).optional().default(""),
    rol: z.string().max(50).optional().default(""),
    honeypot: z.string().max(0).optional().default(""),
  });

  app.post("/api/lead", async (req, res) => {
    try {
      const parsed = leadSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Datos inválidos", details: parsed.error.flatten() });
      }
      const d = parsed.data;

      if (d.honeypot && d.honeypot.length > 0) {
        console.log("🤖 Spam detectado (honeypot)");
        return res.json({ success: true, message: "Gracias, recibimos tu solicitud." });
      }

      const vipServices = [
        "Revisoría Independiente de Arquitectura",
        "Inspección Técnica de Obras (ITO)",
        "Construcción de Obras Menores para Empresas",
        "Diseño de Arquitectura para Empresas",
        "Proyecto desde Cero",
        "Autorización SEREMI de Salud",
      ];

      let classification = "NUEVO";
      if (d.branch === "empresa") classification = "VIP";
      else if (d.service && vipServices.includes(d.service)) classification = "VIP";
      else if (d.propertyType === "Industrial") classification = "VIP";

      console.log(`📋 [LEAD ${classification}] ${d.tipo_proyecto} - ${d.comuna} - ${d.nombre}`);

      try {
        await storage.createLead({
          name: d.nombre,
          email: d.email,
          phone: d.telefono || "",
          helpType: d.service || d.tipo_proyecto || "General",
          message: `[${classification}] ${d.branch?.toUpperCase() || "WEB"} | Etapa: ${d.etapa || "-"} | Presupuesto: ${d.presupuesto || "-"} | ${d.mensaje || "-"}`,
          source: "contacto-agustin",
          comuna: d.comuna || "",
          calle: d.direccion || "",
        });
      } catch (dbErr) {
        console.warn("⚠️ No se pudo guardar en DB:", dbErr);
      }

      const timestamp = new Date().toISOString();

      const emailResult = await sendLeadEmail({
        nombre: d.nombre,
        email: d.email,
        telefono: d.telefono,
        comuna: d.comuna,
        tipo_proyecto: d.tipo_proyecto || d.service || "General",
        etapa: d.etapa,
        presupuesto: d.presupuesto,
        mensaje: d.mensaje,
        branch: d.branch,
        service: d.service,
        propertyType: d.propertyType,
        direccion: d.direccion,
        rol: d.rol,
        classification,
        timestamp,
      });

      console.log(`📊 Email: ${emailResult.ok ? "enviado" : emailResult.error}`);

      try {
        const tags = buildTags({
          source: "contacto",
          classification,
          serviceInterest: d.service || d.tipo_proyecto || undefined,
        });
        const syncResult = await upsertSystemeIoContact({
          email: d.email,
          firstName: d.nombre.split(" ")[0],
          tags,
          source: "contacto-agustin",
        });
        console.log(`📧 Systeme.io: ${syncResult.ok ? `sincronizado (id=${syncResult.contactId})` : syncResult.error}`);
      } catch (sioErr: any) {
        console.warn("⚠️ Systeme.io error (no crítico):", sioErr.message);
      }

      try {
        const hsResult = await upsertHubSpotContact({
          email: d.email,
          firstname: d.nombre.split(" ")[0],
          lastname: d.nombre.split(" ").slice(1).join(" ") || "",
          phone: d.telefono || "",
          city: d.comuna || "",
          address: d.direccion || "",
          message: d.mensaje || "",
          lifecyclestage: classification === "VIP" ? "lead" : "subscriber",
        });
        console.log(`🟠 HubSpot: ${hsResult.ok ? `contacto upserted (id=${hsResult.contactId})` : hsResult.error}`);
      } catch (hsErr: any) {
        console.warn("⚠️ HubSpot error (no crítico):", hsErr.message);
      }

      res.json({
        ok: true,
        classification,
        message: "Gracias, recibimos tu solicitud.",
        emailSent: emailResult.ok,
      });
    } catch (error) {
      console.error("❌ Error procesando lead:", error);
      res.status(500).json({ error: "Error interno" });
    }
  });

  // Object Storage endpoints
  app.post("/api/objects/upload", async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ error: "Failed to get upload URL" });
    }
  });

  app.get("/objects/:objectPath(*)", async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error downloading object:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

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
        console.error("Error creating lead:", error);
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

  // Create calculator lead (captures lead from cost calculator)
  app.post("/api/leads/calculator", async (req, res) => {
    try {
      const leadData = insertCalculatorLeadSchema.parse(req.body);
      
      // Calculate lead score based on project type and budget
      let leadScore = 50; // Base score
      if (leadData.budget && leadData.budget !== "menos-50mil") leadScore += 30;
      if (leadData.projectType === "ampliacion" || leadData.projectType === "casa-nueva") leadScore += 20;
      
      const enrichedLeadData = {
        ...leadData,
        helpType: null,
        timeline: null, 
        message: null,
        leadScore,
        customerStage: "consideration" as const,
      };

      const lead = await storage.createLead(enrichedLeadData);

      try {
        const classification = leadScore >= 80 ? "VIP" : "NUEVO";
        const tags = buildTags({
          source: "calculadora",
          classification,
          serviceInterest: leadData.projectType || undefined,
        });
        const syncResult = await upsertSystemeIoContact({
          email: leadData.email,
          firstName: leadData.name.split(" ")[0],
          tags,
          source: "calculadora-costos",
        });
        console.log(`📧 Systeme.io (calculadora): ${syncResult.ok ? `sincronizado (id=${syncResult.contactId})` : syncResult.error}`);
      } catch (sioErr: any) {
        console.warn("⚠️ Systeme.io error (no crítico):", sioErr.message);
      }

      res.json({ 
        success: true, 
        lead, 
        message: "¡Gracias! Te contactaremos pronto con tu presupuesto personalizado." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        console.error("Calculator lead creation error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
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
  app.post("/api/webhooks/lead-qualification", isWebhookAuthenticated, async (req, res) => {
    try {
      const webhook = webhookSchema.parse(req.body);
      console.log("🎯 Lead qualification webhook received:", webhook);
      
      // Update lead status if lead_id provided
      if (webhook.data.lead_id) {
        console.log(`Processing lead ${webhook.data.lead_id} for qualification`);
        
        // Create AI agent event for tracking
        await storage.createAiAgentEvent({
          eventType: "lead_qualification",
          leadId: parseInt(webhook.data.lead_id),
          source: webhook.source || "n8n_automation",
          data: webhook.data
        });
      }
      
      res.json({ 
        success: true, 
        message: "Lead qualification webhook processed",
        processed_at: new Date().toISOString()
      });
    } catch (error) {
      console.error("Lead qualification webhook error:", error);
      res.status(400).json({ error: "Invalid webhook data" });
    }
  });

  // Appointment scheduling webhook
  app.post("/api/webhooks/appointment-scheduled", isWebhookAuthenticated, async (req, res) => {
    try {
      const webhook = webhookSchema.parse(req.body);
      console.log("📅 Appointment scheduled webhook received:", webhook);
      
      // Process appointment data for AI agents
      if (webhook.data.lead_id && webhook.data.appointment_id) {
        // Update lead with appointment information
        await storage.updateLeadStatus(parseInt(webhook.data.lead_id), "scheduled");
        
        // Create AI agent event
        await storage.createAiAgentEvent({
          eventType: "appointment_scheduled",
          leadId: parseInt(webhook.data.lead_id),
          source: webhook.source || "tidycal",
          data: webhook.data
        });
      }
      
      res.json({ 
        success: true, 
        message: "Appointment webhook processed",
        processed_at: new Date().toISOString()
      });
    } catch (error) {
      console.error("Appointment webhook error:", error);
      res.status(400).json({ error: "Invalid webhook data" });
    }
  });

  // Permit tracking webhook - Enhanced version
  app.post("/api/webhooks/permit-update", isWebhookAuthenticated, async (req, res) => {
    try {
      const webhook = permitUpdateWebhookSchema.parse(req.body);
      console.log("🏛️ Permit update webhook received:", webhook);

      if (webhook.data.project_id && webhook.data.permit_status) {
        // Create CRM task for permit tracking
        const task = await storage.createCrmTask({
          projectId: parseInt(webhook.data.project_id),
          title: `Actualización de Permiso: ${webhook.data.permit_type || 'General'}`,
          description: `Estado del permiso actualizado a: ${webhook.data.permit_status}. ${webhook.data.notes || ''}`,
          status: webhook.data.permit_status === "approved" ? "completed" : "in_progress",
          priority: webhook.data.priority || "medium",
          dueDate: undefined
        });

        // Create interaction
        try {
          const interaction = await storage.createCrmInteraction({
            projectId: parseInt(webhook.data.project_id),
            type: "permit_update",
            subject: `Permiso ${webhook.data.permit_type || 'General'} - ${webhook.data.permit_status}`,
            content: `Actualización automática del estado del permiso: ${webhook.data.permit_status}`
          });

          res.json({ 
            success: true, 
            task,
            interaction,
            message: "Permit update processed",
            automation_data: {
              project_id: webhook.data.project_id,
              task_id: task.id,
              interaction_id: interaction.id,
              permit_status: webhook.data.permit_status
            }
          });
        } catch (interactionError) {
          res.json({ 
            success: true, 
            task,
            message: "Permit update processed (task created)",
            automation_data: {
              project_id: webhook.data.project_id,
              task_id: task.id,
              permit_status: webhook.data.permit_status
            }
          });
        }
      } else {
        res.status(400).json({ error: "Missing required fields: project_id, permit_status" });
      }
    } catch (error) {
      console.error("Permit update webhook error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Invalid permit update data", 
          details: error.errors
        });
      } else {
        res.status(500).json({ error: "Failed to process permit update" });
      }
    }
  });

  // General AI agent webhook for business process automation
  app.post("/api/webhooks/ai-agent", isWebhookAuthenticated, async (req, res) => {
    try {
      const webhook = webhookSchema.parse(req.body);
      console.log("🤖 AI Agent webhook received:", webhook);
      
      // Create AI agent event for tracking
      await storage.createAiAgentEvent({
        eventType: webhook.event,
        leadId: webhook.data.lead_id ? parseInt(webhook.data.lead_id) : undefined,
        source: webhook.source || "ai_agent",
        data: webhook.data
      });
      
      const response = {
        success: true,
        message: `AI agent webhook processed for event: ${webhook.event}`,
        processed_at: new Date().toISOString(),
        event: webhook.event,
        source: webhook.source || "unknown"
      };
      
      res.json(response);
    } catch (error) {
      console.error("AI agent webhook error:", error);
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

  // ========== CRM ROUTES (PROTECTED) ==========
  
  // CRM Customers
  app.get("/api/crm/customers", isCrmAdmin, async (req, res) => {
    try {
      const customers = await storage.getCrmCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch customers" });
    }
  });

  app.post("/api/crm/customers", isCrmAdmin, async (req, res) => {
    try {
      const customerData = insertCrmCustomerSchema.parse(req.body);
      
      // Generate unique customer number
      const customerNumber = `CL-${Date.now().toString().slice(-6)}`;
      
      const customer = await storage.createCrmCustomer({
        ...customerData,
        customerNumber
      });
      res.json({ success: true, customer });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.get("/api/crm/customers/:id", isCrmAdmin, async (req, res) => {
    try {
      const customer = await storage.getCrmCustomer(parseInt(req.params.id));
      res.json(customer);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch customer" });
    }
  });

  app.patch("/api/crm/customers/:id", isCrmAdmin, async (req, res) => {
    try {
      const customer = await storage.updateCrmCustomer(parseInt(req.params.id), req.body);
      res.json({ success: true, customer });
    } catch (error) {
      res.status(500).json({ error: "Failed to update customer" });
    }
  });

  // Convert lead to customer
  app.post("/api/crm/customers/convert/:leadId", isCrmAdmin, async (req, res) => {
    try {
      const leadId = parseInt(req.params.leadId);
      const lead = await storage.getLead(leadId);
      
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }

      // Generate unique customer number
      const customerNumber = `CL-${Date.now().toString().slice(-6)}`;
      
      const customerData = {
        leadId,
        customerNumber,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        salesExecutive: req.body.salesExecutive || "Patricio Becar",
        ...req.body
      };

      const customer = await storage.createCrmCustomer(customerData);
      
      // Update lead status
      await storage.updateLeadStatus(leadId, "converted");
      
      res.json({ success: true, customer });
    } catch (error) {
      console.error("Convert lead error:", error);
      res.status(500).json({ error: "Failed to convert lead to customer" });
    }
  });

  // CRM Projects
  app.get("/api/crm/projects", isCrmAdmin, async (req, res) => {
    try {
      const projects = await storage.getCrmProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/crm/projects", isCrmAdmin, async (req, res) => {
    try {
      const projectData = insertCrmProjectSchema.parse(req.body);
      
      // Generate unique project number
      const projectNumber = `PR-${Date.now().toString().slice(-6)}`;
      
      const project = await storage.createCrmProject(projectData);
      res.json({ success: true, project });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.get("/api/crm/projects/:id", isCrmAdmin, async (req, res) => {
    try {
      const project = await storage.getCrmProject(parseInt(req.params.id));
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.patch("/api/crm/projects/:id", isCrmAdmin, async (req, res) => {
    try {
      const project = await storage.updateCrmProject(parseInt(req.params.id), req.body);
      res.json({ success: true, project });
    } catch (error) {
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  // CRM Interactions
  app.get("/api/crm/interactions", isCrmAdmin, async (req, res) => {
    try {
      const { customerId, projectId } = req.query;
      const interactions = await storage.getCrmInteractions({
        customerId: customerId ? parseInt(customerId as string) : undefined,
        projectId: projectId ? parseInt(projectId as string) : undefined
      });
      res.json(interactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch interactions" });
    }
  });

  app.post("/api/crm/interactions", isCrmAdmin, async (req, res) => {
    try {
      const interactionData = insertCrmInteractionSchema.parse(req.body);
      const interaction = await storage.createCrmInteraction(interactionData);
      res.json({ success: true, interaction });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // CRM Documents
  app.get("/api/crm/documents", isCrmAdmin, async (req, res) => {
    try {
      const { customerId, projectId } = req.query;
      const documents = await storage.getCrmDocuments({
        customerId: customerId ? parseInt(customerId as string) : undefined,
        projectId: projectId ? parseInt(projectId as string) : undefined
      });
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch documents" });
    }
  });

  app.post("/api/crm/documents", isCrmAdmin, async (req, res) => {
    try {
      const documentData = insertCrmDocumentSchema.parse(req.body);
      const document = await storage.createCrmDocument(documentData);
      res.json({ success: true, document });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // CRM Tasks
  app.get("/api/crm/tasks", isCrmAdmin, async (req, res) => {
    try {
      const { assignedTo, status } = req.query;
      const tasks = await storage.getCrmTasks({
        assignedTo: assignedTo as string,
        status: status as string
      });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  // AI Agent Automation Webhooks for N8N/MAKE Integration
  
  // Automated Quote Generation Webhook
  app.post("/api/webhooks/generate-quote", isWebhookAuthenticated, async (req, res) => {
    console.log("=== QUOTE WEBHOOK START ===");
    try {
      console.log("1. Parsing webhook data...");
      const webhook = quoteGenerationWebhookSchema.parse(req.body);
      console.log("2. 💰 Quote generation webhook received:", webhook);

      console.log("3. Checking required fields...");
      console.log("   lead_id:", webhook.data.lead_id);
      console.log("   service_type:", webhook.data.service_type);
      console.log("   area:", webhook.data.area);

      if (webhook.data.lead_id && webhook.data.service_type && webhook.data.area) {
        console.log("4. All required fields present");
        // Get active budget templates for the service type
        console.log(`5. Searching for templates with serviceType: "${webhook.data.service_type}"`);
        
        try {
          const templates = await storage.getBudgetTemplatesByServiceType(webhook.data.service_type);
          console.log(`6. Found ${templates.length} templates:`, templates.map(t => ({id: t.id, serviceType: t.serviceType, name: t.name})));
          
          if (templates.length > 0) {
          const baseTemplate = templates[0];
          const area = parseFloat(webhook.data.area);
          const complexity = webhook.data.complexity || "standard";
          
          // Calculate dynamic pricing
          let basePrice = parseFloat(baseTemplate.basePrice) || 100000;
          let totalEstimate = basePrice;
          
          // Area-based calculation
          if (area > 0) {
            const pricePerM2 = parseFloat(baseTemplate.pricePerM2 || "50000");
            totalEstimate = basePrice + (area * pricePerM2);
          }
          
          // Complexity multiplier
          const complexityMultipliers: { [key: string]: number } = { simple: 0.8, standard: 1.0, complex: 1.5 };
          totalEstimate *= complexityMultipliers[complexity] || 1.0;
          
          // Create generated quote
          const quoteData = {
            leadId: parseInt(webhook.data.lead_id),
            templateId: baseTemplate.id,
            basePrice: baseTemplate.basePrice,
            region: webhook.data.region || "santiago",
            complexity: complexity,
            projectSize: area,
            sizePrice: (area * parseFloat(baseTemplate.pricePerM2 || "50000")).toString(),
            adjustments: { 
              complexity_multiplier: complexityMultipliers[complexity] || 1.0,
              auto_generated: true 
            },
            totalPrice: Math.round(totalEstimate).toString(),
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            notes: `Presupuesto generado automáticamente para ${webhook.data.service_type}`,
            status: "draft"
          };
          
          const quote = await storage.createGeneratedQuote(quoteData);
          console.log(`7. Auto-generated quote for lead ${webhook.data.lead_id}: $${totalEstimate}`);
          
          res.json({ 
            success: true, 
            quote, 
            message: "Quote generated successfully",
            automation_data: {
              lead_id: webhook.data.lead_id,
              quote_id: quote.id,
              estimated_cost: Math.round(totalEstimate).toString(),
              service_type: webhook.data.service_type
            }
          });
        } else {
          console.log("7. ERROR: No templates found!");
          res.status(404).json({ error: "No matching budget template found" });
        }
        } catch (templateError) {
          console.error("8. ERROR getting templates:", templateError);
          res.status(500).json({ error: "Error fetching budget templates" });
        }
      } else {
        console.log("9. ERROR: Missing required fields!");
        res.status(400).json({ error: "Missing required fields: lead_id, service_type, and area" });
      }
    } catch (error) {
      console.error("10. WEBHOOK ERROR:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Invalid webhook data", 
          details: error.errors,
          hint: "Check that all required fields are present and have valid values"
        });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
    console.log("=== QUOTE WEBHOOK END ===");
  });

  // Lead Nurturing Sequence Webhook
  app.post("/api/webhooks/lead-nurturing", isWebhookAuthenticated, async (req, res) => {
    try {
      const webhook = webhookSchema.parse(req.body);
      console.log("📬 Lead nurturing webhook received:", webhook);

      if (webhook.data.lead_id && webhook.data.sequence_step) {
        // Create CRM interaction for nurturing step
        const interaction = await storage.createCrmInteraction({
          type: "automation",
          subject: `Secuencia de Nurturing - Paso ${webhook.data.sequence_step}`,
          content: webhook.data.message || `Ejecutado paso ${webhook.data.sequence_step} de secuencia de nurturing`
        });

        // Update lead status if specified
        if (webhook.data.update_status) {
          await storage.updateLeadStatus(parseInt(webhook.data.lead_id), webhook.data.update_status);
        }

        res.json({ 
          success: true, 
          interaction,
          message: "Nurturing sequence step processed",
          automation_data: {
            lead_id: webhook.data.lead_id,
            interaction_id: interaction.id,
            sequence_step: webhook.data.sequence_step
          }
        });
      } else {
        res.status(400).json({ error: "Missing required fields: lead_id, sequence_step" });
      }
    } catch (error) {
      console.error("Lead nurturing webhook error:", error);
      res.status(500).json({ error: "Failed to process nurturing sequence" });
    }
  });


  // AI Agent Status Check Endpoint
  app.get("/api/webhooks/status", async (req, res) => {
    try {
      // Get system statistics for AI agents
      const stats = {
        timestamp: new Date().toISOString(),
        system_status: "operational",
        endpoints: {
          lead_qualification: "/api/webhooks/lead-qualification",
          appointment_scheduling: "/api/webhooks/appointment-scheduled",
          quote_generation: "/api/webhooks/generate-quote",
          lead_nurturing: "/api/webhooks/lead-nurturing",
          permit_tracking: "/api/webhooks/permit-update",
          google_reviews: "/api/webhook/google-reviews"
        },
        recent_activity: {
          total_leads: await storage.getLeads().then(leads => leads.length),
          pending_quotes: await storage.getAllQuotesWithLeads().then(quotes => 
            quotes.filter(q => q.status === "draft" || q.status === "pending").length
          )
        }
      };

      res.json(stats);
    } catch (error) {
      console.error("Status check error:", error);
      res.status(500).json({ error: "Failed to get system status" });
    }
  });

  // Google My Business Review Webhook (for automation)
  app.post("/api/webhook/google-reviews", async (req, res) => {
    try {
      const reviewData = googleReviewSchema.parse(req.body);
      
      // Add testimonial to database
      const testimonial = await storage.createTestimonial({
        clientName: reviewData.reviewerName,
        clientTitle: `Reseña Google Maps · ${reviewData.reviewTime}`,
        content: reviewData.reviewText,
        rating: reviewData.rating,
        featured: true
      });

      console.log(`New Google review added: ${reviewData.reviewerName} - ${reviewData.rating} stars`);
      
      res.json({ success: true, testimonial });
    } catch (error) {
      console.error("Google review webhook error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid review data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to process review" });
      }
    }
  });

  // CRM Testimonial Management
  app.post("/api/crm/testimonials", isCrmAdmin, async (req, res) => {
    try {
      const testimonialData = {
        clientName: req.body.clientName,
        clientTitle: req.body.clientTitle || "Cliente",
        content: req.body.content,
        rating: req.body.rating || 5,
        featured: req.body.featured !== false
      };

      const testimonial = await storage.createTestimonial(testimonialData);
      res.json({ success: true, testimonial });
    } catch (error) {
      console.error("Create testimonial error:", error);
      res.status(500).json({ error: "Failed to create testimonial" });
    }
  });

  app.post("/api/crm/tasks", isCrmAdmin, async (req, res) => {
    try {
      const taskData = insertCrmTaskSchema.parse(req.body);
      const task = await storage.createCrmTask(taskData);
      res.json({ success: true, task });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.patch("/api/crm/tasks/:id", isCrmAdmin, async (req, res) => {
    try {
      const task = await storage.updateCrmTask(parseInt(req.params.id), req.body);
      res.json({ success: true, task });
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  });

  // CRM Reports and Analytics
  app.get("/api/crm/reports/dashboard", isCrmAdmin, async (req, res) => {
    try {
      const dashboardData = await storage.getCrmDashboardData();
      res.json(dashboardData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
  });

  app.get("/api/crm/reports/conversion", isCrmAdmin, async (req, res) => {
    try {
      const { period = 'monthly' } = req.query;
      const conversionData = await storage.getCrmConversionReport(period as string);
      res.json(conversionData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversion report" });
    }
  });

  app.get("/api/crm/reports/projects", isCrmAdmin, async (req, res) => {
    try {
      const { period = 'monthly' } = req.query;
      const projectsData = await storage.getCrmProjectsReport(period as string);
      res.json(projectsData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects report" });
    }
  });


  // Setup integration routes
  setupIntegrationRoutes(app);

  // Enhanced Analytics Routes (load dynamically)
  try {
    const enhancedAnalytics = await import('./routes/enhanced-analytics');
    app.use('/api/analytics', enhancedAnalytics.default);
  } catch (error) {
    console.error('Failed to load enhanced analytics routes:', error);
  }

  const httpServer = createServer(app);
  return httpServer;
}
