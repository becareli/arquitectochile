// Enhanced TidyCal-Lead Integration System
// This module handles improved lead processing with TidyCal webhook data

import { storage } from '../storage';
import type { Lead, InsertLead } from '@shared/schema';

interface TidyCalLead {
  name: string;
  email: string;
  phone?: string;
  appointmentId: string;
  meetingLink?: string;
  scheduledAt: string;
  serviceType: string;
  source: string;
}

// Lead Scoring Algorithm based on business intelligence data
export function calculateLeadScore(leadData: TidyCalLead): number {
  let score = 0;
  
  // Base score for appointment booking
  score += 25;
  
  // Timeline urgency scoring
  if (leadData.serviceType.includes('inmediato') || leadData.serviceType.includes('urgente')) {
    score += 15;
  }
  
  // Service type scoring (based on conversion data)
  if (leadData.serviceType.includes('ampliacion')) score += 20;
  if (leadData.serviceType.includes('remodelacion')) score += 15;
  if (leadData.serviceType.includes('permiso')) score += 10;
  if (leadData.serviceType.includes('asesoria')) score += 5;
  
  // Phone number provided (higher conversion)
  if (leadData.phone && leadData.phone.length > 8) {
    score += 10;
  }
  
  // Google Meet link confirmed (TidyCal properly configured)
  if (leadData.meetingLink?.includes('meet.google.com')) {
    score += 5;
  }
  
  return Math.min(score, 100); // Cap at 100
}

// Target Avatar Matching (based on Juan Carlos persona)
export function matchTargetAvatar(leadData: TidyCalLead): string {
  const message = leadData.serviceType.toLowerCase();
  
  // Juan Carlos profile (45 años, padre de familia, Santiago, buena situación económica)
  if (message.includes('familia') || message.includes('casa') || 
      message.includes('ampliacion') || message.includes('santiago')) {
    return 'juan_carlos';
  }
  
  // Ana María profile (35 años, profesional independiente, remodelación)
  if (message.includes('oficina') || message.includes('remodelacion') || 
      message.includes('profesional')) {
    return 'ana_maria';
  }
  
  // Carlos Rodríguez profile (50 años, inversionista, permisos múltiples)
  if (message.includes('inversion') || message.includes('multiple') || 
      message.includes('comercial')) {
    return 'carlos_rodriguez';
  }
  
  return 'general';
}

// Customer Stage Detection
export function detectCustomerStage(leadData: TidyCalLead): string {
  const serviceType = leadData.serviceType.toLowerCase();
  
  // Decision stage - ready to hire, has specific project
  if (serviceType.includes('contratar') || serviceType.includes('cotizacion') || 
      serviceType.includes('presupuesto')) {
    return 'decision';
  }
  
  // Consideration stage - comparing options, seeking expert advice
  if (serviceType.includes('asesoria') || serviceType.includes('consulta') || 
      serviceType.includes('opciones')) {
    return 'consideration';
  }
  
  // Awareness stage - just learning, exploratory
  return 'awareness';
}

export async function processEnhancedTidyCalLead(tidyCalLead: TidyCalLead): Promise<Lead> {
  const leadScore = calculateLeadScore(tidyCalLead);
  const avatarMatch = matchTargetAvatar(tidyCalLead);
  const customerStage = detectCustomerStage(tidyCalLead);
  
  // Enhanced lead data with business intelligence
  const enhancedLeadData: InsertLead = {
    name: tidyCalLead.name,
    email: tidyCalLead.email,
    phone: tidyCalLead.phone || '',
    helpType: tidyCalLead.serviceType,
    timeline: 'Inmediato', // TidyCal bookings are immediate intent
    message: `Cita agendada: ${tidyCalLead.scheduledAt}. ${tidyCalLead.meetingLink ? `Enlace: ${tidyCalLead.meetingLink}` : 'Sin enlace de reunión'}`,
    source: tidyCalLead.source,
    status: 'appointment_scheduled',
    // Enhanced fields
    leadScore,
    customerStage,
    avatarMatch,
    appointmentId: tidyCalLead.appointmentId,
    meetingLink: tidyCalLead.meetingLink,
    conversionData: {
      appointmentBooked: true,
      bookingDate: new Date().toISOString(),
      tidyCalSource: true,
      leadQuality: leadScore > 60 ? 'high' : leadScore > 40 ? 'medium' : 'low'
    }
  };
  
  // Check if lead exists by email
  const existingLead = await storage.getLeadByEmail?.(tidyCalLead.email);
  
  if (existingLead) {
    // Update existing lead with appointment info
    console.log(`📞 Updating existing lead: ${tidyCalLead.name} (Score: ${leadScore})`);
    
    await storage.updateLeadStatus?.(existingLead.id, 'appointment_scheduled');
    
    // Return updated lead (simplified - in real implementation, update all fields)
    return { ...existingLead, status: 'appointment_scheduled' };
  } else {
    // Create new lead
    console.log(`🆕 Creating new lead: ${tidyCalLead.name} (Score: ${leadScore}, Avatar: ${avatarMatch}, Stage: ${customerStage})`);
    
    return await storage.createLead(enhancedLeadData);
  }
}

// Conversion Funnel Tracking
export function trackConversionEvent(leadId: number, event: string, data: any) {
  console.log(`📊 Conversion Event: Lead ${leadId} - ${event}`, data);
  
  // In a real implementation, this would:
  // 1. Update conversion_data field in leads table
  // 2. Trigger automation sequences based on stage
  // 3. Send data to analytics dashboard
  // 4. Notify AI agents for follow-up actions
}

// Lead Nurturing Trigger
export function triggerNurturingSequence(lead: Lead) {
  const stage = lead.customerStage || 'awareness';
  const avatar = lead.avatarMatch || 'general';
  
  console.log(`🎯 Triggering nurturing sequence: ${stage} stage for ${avatar} avatar`);
  
  // This would integrate with N8N/Make to:
  // - Send personalized email sequences
  // - Schedule follow-up WhatsApp messages  
  // - Add to retargeting audiences
  // - Create tasks for manual follow-up
}