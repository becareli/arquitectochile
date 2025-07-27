import { Express } from "express";
import { getIntegration, healthCheckAll } from "./index";
import { TidyCalIntegration, TidyCalWebhookData } from "./tidycal";
import { WhatsAppIntegration, WhatsAppWebhookData } from "./whatsapp";

export function setupIntegrationRoutes(app: Express) {
  
  // Health check endpoint for all integrations
  app.get("/api/integrations/health", async (req, res) => {
    try {
      const healthResults = await healthCheckAll();
      const allHealthy = Object.values(healthResults).every(status => status);
      
      res.status(allHealthy ? 200 : 503).json({
        status: allHealthy ? "healthy" : "unhealthy",
        integrations: healthResults,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      });
    }
  });

  // TidyCal webhook endpoint
  app.post("/api/webhooks/tidycal", async (req, res) => {
    try {
      const tidyCalIntegration = getIntegration('tidycal') as TidyCalIntegration;
      
      if (!tidyCalIntegration) {
        return res.status(503).json({
          success: false,
          error: "TidyCal integration not configured",
          timestamp: new Date().toISOString()
        });
      }

      const webhookData: TidyCalWebhookData = req.body;
      const result = await tidyCalIntegration.processWebhook(webhookData);
      
      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error("TidyCal webhook error:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      });
    }
  });

  // WhatsApp webhook endpoint
  app.post("/api/webhooks/whatsapp", async (req, res) => {
    try {
      const whatsAppIntegration = getIntegration('whatsapp') as WhatsAppIntegration;
      
      if (!whatsAppIntegration) {
        return res.status(503).json({
          success: false,
          error: "WhatsApp integration not configured",
          timestamp: new Date().toISOString()
        });
      }

      const webhookData: WhatsAppWebhookData = req.body;
      const result = await whatsAppIntegration.processWebhook(webhookData);
      
      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error("WhatsApp webhook error:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      });
    }
  });

  // WhatsApp verification endpoint (required by Meta)
  app.get("/api/webhooks/whatsapp", (req, res) => {
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "your_verify_token";
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === verifyToken) {
      console.log("WhatsApp webhook verified");
      res.status(200).send(challenge);
    } else {
      res.status(403).send("Forbidden");
    }
  });

  // Manual TidyCal booking endpoint
  app.post("/api/integrations/tidycal/book", async (req, res) => {
    try {
      const tidyCalIntegration = getIntegration('tidycal') as TidyCalIntegration;
      
      if (!tidyCalIntegration) {
        return res.status(503).json({
          success: false,
          error: "TidyCal integration not configured"
        });
      }

      const result = await tidyCalIntegration.scheduleAppointment(req.body);
      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get TidyCal booking URL
  app.get("/api/integrations/tidycal/booking-url", (req, res) => {
    try {
      const tidyCalIntegration = getIntegration('tidycal') as TidyCalIntegration;
      
      if (!tidyCalIntegration) {
        return res.status(503).json({
          success: false,
          error: "TidyCal integration not configured"
        });
      }

      const serviceType = req.query.service as string;
      const bookingUrl = tidyCalIntegration.getBookingUrl(serviceType);
      
      res.json({
        success: true,
        bookingUrl,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Send WhatsApp message
  app.post("/api/integrations/whatsapp/send", async (req, res) => {
    try {
      const whatsAppIntegration = getIntegration('whatsapp') as WhatsAppIntegration;
      
      if (!whatsAppIntegration) {
        return res.status(503).json({
          success: false,
          error: "WhatsApp integration not configured"
        });
      }

      const result = await whatsAppIntegration.sendMessage(req.body);
      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get WhatsApp chat URL
  app.get("/api/integrations/whatsapp/chat-url", (req, res) => {
    try {
      const whatsAppIntegration = getIntegration('whatsapp') as WhatsAppIntegration;
      
      if (!whatsAppIntegration) {
        return res.status(503).json({
          success: false,
          error: "WhatsApp integration not configured"
        });
      }

      const phone = req.query.phone as string;
      const message = req.query.message as string;
      
      if (!phone) {
        return res.status(400).json({
          success: false,
          error: "Phone number is required"
        });
      }

      const chatUrl = whatsAppIntegration.getWhatsAppChatUrl(phone, message);
      
      res.json({
        success: true,
        chatUrl,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get WhatsApp quick reply templates
  app.get("/api/integrations/whatsapp/templates", (req, res) => {
    try {
      const whatsAppIntegration = getIntegration('whatsapp') as WhatsAppIntegration;
      
      if (!whatsAppIntegration) {
        return res.status(503).json({
          success: false,
          error: "WhatsApp integration not configured"
        });
      }

      const templates = whatsAppIntegration.getQuickReplyTemplates();
      
      res.json({
        success: true,
        templates,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
}