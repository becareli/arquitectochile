import { BaseIntegration, type IntegrationConfig, type IntegrationResult, type HealthCheckResult } from './index';
import { storage } from '../storage';

export interface TidyCalAppointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  serviceType: string;
  scheduledAt: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  meetingLink?: string;
  notes?: string;
}

export interface TidyCalWebhookData {
  event: 'appointment.scheduled' | 'appointment.cancelled' | 'appointment.rescheduled' | 'appointment.completed';
  appointment: TidyCalAppointment;
  timestamp: string;
}

export class TidyCalIntegration extends BaseIntegration {
  private baseUrl = 'https://tidycal.com/api/v1';
  
  constructor(config: IntegrationConfig) {
    super(config);
  }

  async isHealthy(): Promise<boolean> {
    if (!this.config.enabled) return false;
    
    try {
      // Simple ping to TidyCal API if we have API key
      if (this.config.apiKey) {
        const response = await fetch(`${this.baseUrl}/health`, {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json'
          }
        });
        return response.ok;
      }
      return true; // Assume healthy if no API key (webhook-only mode)
    } catch (error) {
      console.error('TidyCal health check failed:', error);
      return false;
    }
  }

  async processWebhook(data: TidyCalWebhookData): Promise<IntegrationResult> {
    try {
      console.log('Processing TidyCal webhook:', data.event, data.appointment.id);

      const appointment = data.appointment;
      
      // Create or update lead based on appointment
      if (data.event === 'appointment.scheduled') {
        await this.handleAppointmentScheduled(appointment);
      } else if (data.event === 'appointment.cancelled') {
        await this.handleAppointmentCancelled(appointment);
      } else if (data.event === 'appointment.completed') {
        await this.handleAppointmentCompleted(appointment);
      }

      return {
        success: true,
        data: { processed: data.event, appointmentId: appointment.id },
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('TidyCal webhook processing failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  private async handleAppointmentScheduled(appointment: TidyCalAppointment) {
    // Check if lead exists by email
    const existingLead = await storage.getLeadByEmail?.(appointment.clientEmail);
    
    if (existingLead) {
      // Update existing lead status
      await storage.updateLeadStatus?.(existingLead.id, 'appointment_scheduled');
    } else {
      // Create new lead from appointment
      const leadData = {
        name: appointment.clientName,
        email: appointment.clientEmail,
        phone: appointment.clientPhone || '',
        helpType: appointment.serviceType || 'Asesoría de Arquitectura',
        timeline: 'Inmediato',
        message: `Asesoría agendada para ${appointment.scheduledAt}. ${appointment.notes || ''}`,
        source: 'tidycal_appointment',
        status: 'appointment_scheduled'
      };
      
      await storage.createLead?.(leadData);
    }

    // Log integration event
    console.log(`TidyCal: Appointment scheduled for ${appointment.clientName} at ${appointment.scheduledAt}`);
  }

  private async handleAppointmentCancelled(appointment: TidyCalAppointment) {
    const lead = await storage.getLeadByEmail?.(appointment.clientEmail);
    if (lead) {
      await storage.updateLeadStatus?.(lead.id, 'appointment_cancelled');
    }
    
    console.log(`TidyCal: Appointment cancelled for ${appointment.clientName}`);
  }

  private async handleAppointmentCompleted(appointment: TidyCalAppointment) {
    const lead = await storage.getLeadByEmail?.(appointment.clientEmail);
    if (lead) {
      await storage.updateLeadStatus?.(lead.id, 'consultation_completed');
    }
    
    console.log(`TidyCal: Appointment completed for ${appointment.clientName}`);
  }

  // Public methods for manual scheduling
  async scheduleAppointment(appointmentData: Partial<TidyCalAppointment>): Promise<IntegrationResult> {
    try {
      if (!this.config.apiKey) {
        return {
          success: false,
          error: 'TidyCal API key not configured',
          timestamp: new Date().toISOString()
        };
      }

      const response = await fetch(`${this.baseUrl}/appointments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
      });

      if (response.ok) {
        const appointment = await response.json();
        return {
          success: true,
          data: appointment,
          timestamp: new Date().toISOString()
        };
      } else {
        throw new Error(`TidyCal API error: ${response.status}`);
      }

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  getBookingUrl(serviceType = 'asesoria-arquitectura'): string {
    const baseBookingUrl = this.config.settings?.bookingUrl || 
      'https://tidycal.com/arquitectopatriciobecar/mi-asesoria-de-arquitectura-y-construccion-gratuita';
    
    return `${baseBookingUrl}?service=${serviceType}`;
  }
}