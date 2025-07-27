import { BaseIntegration, type IntegrationConfig } from './index';
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
  googleMeetLink?: string;
  location?: string;
  notes?: string;
  meetingDetails?: {
    platform: 'google_meet' | 'zoom' | 'teams' | 'presencial';
    link?: string;
    address?: string;
    instructions?: string;
  };
}

export interface TidyCalWebhookData {
  event: 'appointment.scheduled' | 'appointment.cancelled' | 'appointment.rescheduled' | 'appointment.completed';
  appointment: TidyCalAppointment;
  timestamp: string;
}

interface IntegrationResult {
  success: boolean;
  data?: any;
  error?: string;
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
      
      // Process based on appointment event
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
    // Extract Google Meet link that TidyCal already generated
    const meetLink = this.extractGoogleMeetLink(appointment);
    
    // Log meeting details for verification
    console.log('TidyCal appointment scheduled:', {
      appointmentId: appointment.id,
      clientName: appointment.clientName,
      scheduledAt: appointment.scheduledAt,
      googleMeetDetected: !!meetLink,
      meetingLink: meetLink
    });

    // Warn if no Google Meet link detected
    if (!meetLink) {
      console.warn(`⚠️  No Google Meet link detected for appointment ${appointment.id}. Check TidyCal Google Meet configuration.`);
    }

    // Enhanced lead processing with business intelligence
    const { processEnhancedTidyCalLead, triggerNurturingSequence } = await import('./tidycal-leads');
    
    const tidyCalLead = {
      name: appointment.clientName,
      email: appointment.clientEmail,
      phone: appointment.clientPhone,
      appointmentId: appointment.id,
      meetingLink: meetLink,
      scheduledAt: appointment.scheduledAt,
      serviceType: appointment.serviceType || 'Asesoría de Arquitectura',
      source: 'tidycal_appointment'
    };
    
    // Process lead with enhanced business intelligence
    const lead = await processEnhancedTidyCalLead(tidyCalLead);
    
    // Trigger automated nurturing sequence
    triggerNurturingSequence(lead);

    // Log success if Google Meet link is present
    if (meetLink) {
      console.log(`✅ Google Meet link confirmed for ${appointment.clientName}: ${meetLink}`);
    }
  }

  private async handleAppointmentCancelled(appointment: TidyCalAppointment) {
    console.log(`TidyCal: Appointment cancelled for ${appointment.clientName}`);
    
    // Update lead status if exists
    const existingLead = await storage.getLeadByEmail?.(appointment.clientEmail);
    if (existingLead) {
      await storage.updateLeadStatus?.(existingLead.id, 'appointment_cancelled');
    }
  }

  private async handleAppointmentCompleted(appointment: TidyCalAppointment) {
    console.log(`TidyCal: Appointment completed for ${appointment.clientName}`);
    
    // Update lead status if exists
    const existingLead = await storage.getLeadByEmail?.(appointment.clientEmail);
    if (existingLead) {
      await storage.updateLeadStatus?.(existingLead.id, 'appointment_completed');
    }
  }

  // Extract Google Meet link from TidyCal appointment data
  private extractGoogleMeetLink(appointment: TidyCalAppointment): string | null {
    // Check different possible fields for Google Meet link
    const possibleLinks = [
      appointment.meetingLink,
      appointment.googleMeetLink,
      appointment.meetingDetails?.link,
      appointment.location
    ].filter(Boolean);

    for (const link of possibleLinks) {
      if (link && typeof link === 'string' && link.includes('meet.google.com')) {
        return link;
      }
    }

    return null;
  }

  // Manual appointment scheduling (if API key is available)
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

  // Validate TidyCal Google Meet configuration
  async validateGoogleMeetConfig(): Promise<{valid: boolean, issues: string[]}> {
    const issues: string[] = [];
    
    if (!this.config.apiKey) {
      issues.push('TidyCal API key not configured - cannot verify meeting settings');
    }

    console.log('🔍 Validating TidyCal Google Meet configuration...');
    
    return {
      valid: issues.length === 0,
      issues
    };
  }

  getBookingUrl(serviceType = 'asesoria-arquitectura'): string {
    const baseBookingUrl = this.config.settings?.bookingUrl || 
      'https://tidycal.com/arquitectopatriciobecar/mi-asesoria-de-arquitectura-y-construccion-gratuita';
    
    return `${baseBookingUrl}?service=${serviceType}`;
  }
}