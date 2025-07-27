import { TidyCalIntegration } from './tidycal';
import { WhatsAppIntegration } from './whatsapp';
import { registerIntegration } from './index';

// Initialize and register all integrations
export function initializeIntegrations() {
  console.log('Initializing external service integrations...');

  // TidyCal Integration
  const tidyCalConfig = {
    name: 'tidycal',
    enabled: process.env.TIDYCAL_ENABLED === 'true' || true, // Default enabled for webhooks
    apiKey: process.env.TIDYCAL_API_KEY,
    webhookUrl: process.env.TIDYCAL_WEBHOOK_URL,
    settings: {
      bookingUrl: process.env.TIDYCAL_BOOKING_URL || 
        'https://tidycal.com/arquitectopatriciobecar/mi-asesoria-de-arquitectura-y-construccion-gratuita'
    }
  };

  const tidyCalIntegration = new TidyCalIntegration(tidyCalConfig);
  registerIntegration('tidycal', tidyCalIntegration);
  console.log('✓ TidyCal integration registered');

  // WhatsApp Integration
  const whatsAppConfig = {
    name: 'whatsapp',
    enabled: process.env.WHATSAPP_ENABLED === 'true' || false,
    apiKey: process.env.WHATSAPP_ACCESS_TOKEN,
    webhookUrl: process.env.WHATSAPP_WEBHOOK_URL,
    settings: {
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
      verifyToken: process.env.WHATSAPP_VERIFY_TOKEN,
      tidycalBookingUrl: process.env.TIDYCAL_BOOKING_URL || 
        'https://tidycal.com/arquitectopatriciobecar/mi-asesoria-de-arquitectura-y-construccion-gratuita'
    }
  };

  const whatsAppIntegration = new WhatsAppIntegration(whatsAppConfig);
  registerIntegration('whatsapp', whatsAppIntegration);
  console.log('✓ WhatsApp integration registered');

  // Additional integrations can be added here
  // - Make.com integration
  // - N8N integration  
  // - Email service integration
  // - SMS service integration
  // - CRM integration
  
  console.log('All integrations initialized successfully');
}

// Health check helper
export async function performHealthChecks() {
  console.log('Performing integration health checks...');
  
  const { healthCheckAll } = await import('./index');
  const results = await healthCheckAll();
  
  Object.entries(results).forEach(([name, isHealthy]) => {
    const status = isHealthy ? '✓' : '✗';
    console.log(`${status} ${name}: ${isHealthy ? 'healthy' : 'unhealthy'}`);
  });
  
  return results;
}