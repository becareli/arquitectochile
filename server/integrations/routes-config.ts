import { Express } from "express";
import { getIntegration } from "./index";
import { TidyCalIntegration } from "./tidycal";

// Add route to validate TidyCal Google Meet configuration
export function setupConfigurationRoutes(app: Express) {
  
  // TidyCal Google Meet validation endpoint
  app.get("/api/integrations/tidycal/validate-meet", async (req, res) => {
    try {
      const tidyCalIntegration = getIntegration('tidycal') as TidyCalIntegration;
      
      if (!tidyCalIntegration) {
        return res.status(503).json({
          success: false,
          error: "TidyCal integration not configured"
        });
      }

      const validation = await tidyCalIntegration.validateGoogleMeetConfig();
      
      res.json({
        success: validation.valid,
        configuration: {
          hasTidyCalIntegration: true,
          googleMeetConfigured: validation.valid,
          issues: validation.issues
        },
        recommendations: validation.valid ? [] : [
          "Verificar que TidyCal está configurado para generar enlaces de Google Meet",
          "Asegurar que la integración de Google Calendar está activa en TidyCal",
          "Revisar que los webhooks están enviando el campo 'meetingLink' o 'googleMeetLink'"
        ],
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Test webhook endpoint to simulate TidyCal appointment with Google Meet
  app.post("/api/integrations/tidycal/test-webhook", async (req, res) => {
    try {
      const tidyCalIntegration = getIntegration('tidycal') as TidyCalIntegration;
      
      if (!tidyCalIntegration) {
        return res.status(503).json({
          success: false,
          error: "TidyCal integration not configured"
        });
      }

      // Simulate appointment with Google Meet link
      const testAppointment = {
        event: 'appointment.scheduled' as const,
        appointment: {
          id: `test-${Date.now()}`,
          clientName: 'Cliente Prueba',
          clientEmail: 'test@example.com',
          clientPhone: '+56912345678',
          serviceType: 'Asesoría de Arquitectura',
          scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
          duration: 60,
          status: 'scheduled' as const,
          meetingLink: 'https://meet.google.com/abc-defg-hij',
          googleMeetLink: 'https://meet.google.com/abc-defg-hij',
          notes: 'Prueba de integración Google Meet'
        },
        timestamp: new Date().toISOString()
      };

      const result = await tidyCalIntegration.processWebhook(testAppointment);
      
      res.json({
        success: true,
        message: "Webhook de prueba procesado correctamente",
        testResult: result,
        appointmentData: testAppointment,
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