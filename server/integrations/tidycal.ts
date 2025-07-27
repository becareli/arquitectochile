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
    // Verify Google Meet link is present
    const meetingInfo = this.extractMeetingInfo(appointment);
    
    // Log meeting details for verification
    console.log('TidyCal appointment scheduled with meeting info:', {
      appointmentId: appointment.id,
      clientName: appointment.clientName,
      scheduledAt: appointment.scheduledAt,
      meetingLink: meetingInfo.link,
      meetingPlatform: meetingInfo.platform,
      hasGoogleMeet: meetingInfo.hasGoogleMeet
    });

    // Warn if no Google Meet link detected
    if (!meetingInfo.hasGoogleMeet) {
      console.warn(`⚠️  No Google Meet link detected for appointment ${appointment.id}. Check TidyCal configuration.`);
    }

    // Check if lead exists by email
    const existingLead = await storage.getLeadByEmail?.(appointment.clientEmail);
    
    const appointmentDetails = `Asesoría agendada para ${appointment.scheduledAt}. ${
      meetingInfo.hasGoogleMeet 
        ? `Enlace de reunión: ${meetingInfo.link}` 
        : 'Sin enlace de reunión - verificar configuración TidyCal'
    }. ${appointment.notes || ''}`;
    
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
        message: appointmentDetails,
        source: 'tidycal_appointment',
        status: 'appointment_scheduled'
      };
      
      await storage.createLead?.(leadData);
    }

    // Send confirmation if Google Meet link is present
    if (meetingInfo.hasGoogleMeet) {
      console.log(`✅ Google Meet link confirmed for ${appointment.clientName}: ${meetingInfo.link}`);
    }
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

  // Extract and validate meeting information from appointment
  private extractMeetingInfo(appointment: TidyCalAppointment) {
    const meetingInfo = {
      link: null as string | null,
      platform: 'unknown' as 'google_meet' | 'zoom' | 'teams' | 'presencial' | 'unknown',
      hasGoogleMeet: false,
      instructions: null as string | null
    };

    // Check different possible fields for meeting link
    const possibleLinks = [
      appointment.meetingLink,
      appointment.googleMeetLink,
      appointment.meetingDetails?.link,
      appointment.location
    ].filter(Boolean);

    for (const link of possibleLinks) {
      if (link && typeof link === 'string') {
        // Detect Google Meet
        if (link.includes('meet.google.com')) {
          meetingInfo.link = link;
          meetingInfo.platform = 'google_meet';
          meetingInfo.hasGoogleMeet = true;
          break;
        }
        // Detect Zoom
        else if (link.includes('zoom.us') || link.includes('zoom.com')) {
          meetingInfo.link = link;
          meetingInfo.platform = 'zoom';
          break;
        }
        // Detect Teams
        else if (link.includes('teams.microsoft.com')) {
          meetingInfo.link = link;
          meetingInfo.platform = 'teams';
          break;
        }
        // Generic link detection
        else if (link.startsWith('http')) {
          meetingInfo.link = link;
          meetingInfo.platform = 'unknown';
          break;
        }
      }
    }

    // Check for physical location
    if (appointment.location && !meetingInfo.link) {
      if (appointment.location.toLowerCase().includes('presencial') || 
          appointment.location.toLowerCase().includes('domicilio') ||
          !appointment.location.startsWith('http')) {
        meetingInfo.platform = 'presencial';
        meetingInfo.instructions = appointment.location;
      }
    }

    return meetingInfo;
  }

  // Validate TidyCal configuration for Google Meet
  async validateGoogleMeetConfig(): Promise<{valid: boolean, issues: string[]}> {
    const issues: string[] = [];
    
    if (!this.config.apiKey) {
      issues.push('TidyCal API key not configured - cannot verify meeting settings');
    }

    // Additional validation can be added here when TidyCal provides configuration endpoints
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