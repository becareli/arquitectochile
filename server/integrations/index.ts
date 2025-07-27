// External Services Integration Hub
// Centralized management for TidyCal, WhatsApp, and other external services

export interface IntegrationConfig {
  name: string;
  enabled: boolean;
  apiKey?: string;
  webhookUrl?: string;
  settings: Record<string, any>;
}

export interface IntegrationResponse {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: string;
}

export abstract class BaseIntegration {
  protected config: IntegrationConfig;

  constructor(config: IntegrationConfig) {
    this.config = config;
  }

  abstract isHealthy(): Promise<boolean>;
  abstract processWebhook(data: any): Promise<IntegrationResponse>;
}

// Integration registry
export const integrations = new Map<string, BaseIntegration>();

export function registerIntegration(name: string, integration: BaseIntegration) {
  integrations.set(name, integration);
}

export function getIntegration(name: string): BaseIntegration | undefined {
  return integrations.get(name);
}

export async function healthCheckAll(): Promise<Record<string, boolean>> {
  const results: Record<string, boolean> = {};
  
  for (const [name, integration] of Array.from(integrations.entries())) {
    try {
      results[name] = await integration.isHealthy();
    } catch (error) {
      console.error(`Health check failed for ${name}:`, error);
      results[name] = false;
    }
  }
  
  return results;
}