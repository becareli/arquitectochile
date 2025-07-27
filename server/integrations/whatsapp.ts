import { BaseIntegration, type IntegrationConfig, type IntegrationResult, type HealthCheckResult } from './index';

export interface WhatsAppMessage {
  to: string;
  message: string;
  type: 'text' | 'template' | 'interactive';
  templateName?: string;
  templateParams?: string[];
}

export interface WhatsAppWebhookData {
  event: 'message.received' | 'message.delivered' | 'message.read';
  from: string;
  to: string;
  message: string;
  timestamp: string;
  messageId: string;
}

export class WhatsAppIntegration extends BaseIntegration {
  private baseUrl = 'https://graph.facebook.com/v18.0';
  
  constructor(config: IntegrationConfig) {
    super(config);
  }

  async isHealthy(): Promise<boolean> {
    if (!this.config.enabled || !this.config.apiKey) return false;
    
    try {
      // Test WhatsApp Business API connection
      const response = await fetch(`${this.baseUrl}/me`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch (error) {
      console.error('WhatsApp health check failed:', error);
      return false;
    }
  }

  async processWebhook(data: WhatsAppWebhookData): Promise<IntegrationResult> {
    try {
      console.log('Processing WhatsApp webhook:', data.event, data.from);

      if (data.event === 'message.received') {
        await this.handleIncomingMessage(data);
      }

      return {
        success: true,
        data: { processed: data.event, messageId: data.messageId },
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('WhatsApp webhook processing failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  private async handleIncomingMessage(data: WhatsAppWebhookData) {
    // Auto-reply logic for common inquiries
    const message = data.message.toLowerCase();
    
    if (message.includes('precio') || message.includes('costo') || message.includes('presupuesto')) {
      await this.sendMessage({
        to: data.from,
        message: `¡Hola! Gracias por tu consulta sobre precios. 

Para darte un presupuesto preciso, necesito conocer algunos detalles de tu proyecto:

1️⃣ ¿Qué tipo de trabajo necesitas? (ampliación, remodelación, permisos, etc.)
2️⃣ ¿Cuántos m² aproximadamente?
3️⃣ ¿En qué comuna está ubicada la propiedad?

También puedes agendar una asesoría gratuita aquí: ${this.getBookingLink()}

¡Te responderé lo antes posible! 🏗️`,
        type: 'text'
      });
    } else if (message.includes('agendar') || message.includes('cita') || message.includes('reunion')) {
      await this.sendMessage({
        to: data.from,
        message: `¡Perfecto! Me alegra que quieras agendar una consulta.

Puedes reservar tu asesoría gratuita de arquitectura aquí:
${this.getBookingLink()}

📅 Disponibilidad inmediata
⏰ 30-45 minutos
💰 Completamente gratis
🏠 Presencial en Santiago

¿Prefieres que te ayude a agendar por aquí? ¡Solo dime qué día te acomoda mejor! 😊`,
        type: 'text'
      });
    } else if (message.includes('permisos') || message.includes('municipalidad') || message.includes('dom')) {
      await this.sendMessage({
        to: data.from,
        message: `¡Excelente consulta sobre permisos! 📋

Manejamos todos los trámites municipales:
• ✅ Permisos de Edificación
• ✅ Recepciones Finales  
• ✅ Regularización de Inmuebles (Ley del Mono)
• ✅ Modificaciones de Proyectos

Cada caso es único, pero generalmente:
📍 Plazo: 2-4 meses
💰 Incluye: Planos + Tramitación completa
📞 Asesoría inicial gratuita

¿Quieres que revisemos tu caso específico? Agenda aquí: ${this.getBookingLink()}`,
        type: 'text'
      });
    }
    
    // Log the interaction
    console.log(`WhatsApp: Auto-replied to ${data.from} for query about: ${message.substring(0, 50)}...`);
  }

  async sendMessage(messageData: WhatsAppMessage): Promise<IntegrationResult> {
    try {
      if (!this.config.apiKey) {
        return {
          success: false,
          error: 'WhatsApp API key not configured',
          timestamp: new Date().toISOString()
        };
      }

      const phoneNumberId = this.config.settings?.phoneNumberId;
      if (!phoneNumberId) {
        return {
          success: false,
          error: 'WhatsApp phone number ID not configured',
          timestamp: new Date().toISOString()
        };
      }

      const payload = {
        messaging_product: 'whatsapp',
        to: messageData.to,
        type: messageData.type,
        text: { body: messageData.message }
      };

      const response = await fetch(`${this.baseUrl}/${phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          data: result,
          timestamp: new Date().toISOString()
        };
      } else {
        throw new Error(`WhatsApp API error: ${response.status}`);
      }

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  // Utility methods
  formatPhoneNumber(phone: string): string {
    // Convert Chilean phone numbers to WhatsApp format
    const cleaned = phone.replace(/[^\d]/g, '');
    
    if (cleaned.startsWith('56')) {
      return cleaned; // Already in international format
    } else if (cleaned.startsWith('9')) {
      return `569${cleaned.substring(1)}`; // Add country code
    } else if (cleaned.length === 8) {
      return `569${cleaned}`; // Add mobile prefix and country code
    }
    
    return cleaned;
  }

  getWhatsAppChatUrl(phone: string, message?: string): string {
    const formattedPhone = this.formatPhoneNumber(phone);
    const encodedMessage = message ? encodeURIComponent(message) : '';
    
    return `https://wa.me/${formattedPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
  }

  private getBookingLink(): string {
    return this.config.settings?.tidycalBookingUrl || 
      'https://tidycal.com/arquitectopatriciobecar/mi-asesoria-de-arquitectura-y-construccion-gratuita';
  }

  // Pre-defined message templates
  getQuickReplyTemplates() {
    return {
      greeting: `¡Hola! Soy Patricio Bécar, arquitecto con 26+ años de experiencia. 

¿En qué puedo ayudarte hoy?
• 🏗️ Ampliaciones y remodelaciones
• 📋 Permisos y tramitación  
• 🏠 Asesoría a domicilio ($45.000)
• ⚖️ Regularización de inmuebles

Agenda tu consulta gratuita: ${this.getBookingLink()}`,

      pricing: `💰 **Nuestros Servicios Principales:**

🏠 **Asesoría a Domicilio**: $45.000
   → Análisis completo en terreno
   → Presupuesto detallado
   → Eliminación de dudas

📋 **Permisos Municipales**: Desde $500.000
   → Planos + Tramitación completa
   → Seguimiento hasta aprobación

🏗️ **Proyectos Completos**: Consultar
   → Diseño + Ingeniería + Permisos

¡Agenda tu asesoría gratuita para conocer tu caso específico!`,

      urgency: `⚡ **DISPONIBILIDAD LIMITADA**

Solo tomo 3 proyectos nuevos por mes para garantizar atención personalizada.

Este mes quedan: 2 cupos disponibles ⏰

¿Quieres asegurar tu lugar?
Agenda aquí: ${this.getBookingLink()}`
    };
  }
}