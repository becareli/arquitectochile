// Enhanced Analytics System - Plan Implementation
// This system provides advanced funnel tracking and conversion optimization

import { storage } from './storage';

interface ConversionMetrics {
  totalLeads: number;
  appointmentsScheduled: number;
  appointmentsCompleted: number;
  quotesGenerated: number;
  quotesAccepted: number;
  conversionRates: {
    leadToAppointment: number;
    appointmentToQuote: number;
    quoteToSale: number;
    overallConversion: number;
  };
}

interface LeadQualityMetrics {
  highQuality: number;  // Score > 60
  mediumQuality: number; // Score 40-60
  lowQuality: number;   // Score < 40
  averageScore: number;
}

interface AvatarPerformance {
  juan_carlos: { leads: number; conversions: number; rate: number };
  ana_maria: { leads: number; conversions: number; rate: number };
  carlos_rodriguez: { leads: number; conversions: number; rate: number };
  general: { leads: number; conversions: number; rate: number };
}

export class EnhancedAnalytics {
  
  // Calculate comprehensive conversion metrics
  async getConversionMetrics(dateRange?: { start: Date; end: Date }): Promise<ConversionMetrics> {
    const leads = await storage.getLeads();
    const filteredLeads = dateRange 
      ? leads.filter(lead => {
          const createdAt = new Date(lead.createdAt);
          return createdAt >= dateRange.start && createdAt <= dateRange.end;
        })
      : leads;

    const totalLeads = filteredLeads.length;
    const appointmentsScheduled = filteredLeads.filter(lead => 
      lead.status === 'appointment_scheduled' || 
      lead.status === 'appointment_completed'
    ).length;
    
    const appointmentsCompleted = filteredLeads.filter(lead => 
      lead.status === 'appointment_completed'
    ).length;

    // Mock data for quotes (in real implementation, fetch from quotes table)
    const quotesGenerated = Math.floor(appointmentsCompleted * 0.7); // Assume 70% get quotes
    const quotesAccepted = Math.floor(quotesGenerated * 0.25); // Assume 25% conversion rate

    const conversionRates = {
      leadToAppointment: totalLeads > 0 ? (appointmentsScheduled / totalLeads) * 100 : 0,
      appointmentToQuote: appointmentsCompleted > 0 ? (quotesGenerated / appointmentsCompleted) * 100 : 0,
      quoteToSale: quotesGenerated > 0 ? (quotesAccepted / quotesGenerated) * 100 : 0,
      overallConversion: totalLeads > 0 ? (quotesAccepted / totalLeads) * 100 : 0
    };

    return {
      totalLeads,
      appointmentsScheduled,
      appointmentsCompleted,
      quotesGenerated,
      quotesAccepted,
      conversionRates
    };
  }

  // Analyze lead quality distribution
  async getLeadQualityMetrics(): Promise<LeadQualityMetrics> {
    const leads = await storage.getLeads();
    
    // Extract lead scores from conversion data or calculate basic score
    const leadScores = leads.map(lead => {
      // In real implementation, this would read from leadScore field
      // For now, calculate basic score based on existing data
      let score = 0;
      
      // Appointment booked = +25 points
      if (lead.status.includes('appointment')) score += 25;
      
      // Phone provided = +10 points
      if (lead.phone && lead.phone.length > 8) score += 10;
      
      // Immediate timeline = +15 points
      if (lead.timeline === 'Inmediato') score += 15;
      
      // TidyCal source = +20 points (higher intent)
      if (lead.source === 'tidycal_appointment') score += 20;
      
      return score;
    });

    const highQuality = leadScores.filter(score => score > 60).length;
    const mediumQuality = leadScores.filter(score => score >= 40 && score <= 60).length;
    const lowQuality = leadScores.filter(score => score < 40).length;
    const averageScore = leadScores.reduce((sum, score) => sum + score, 0) / leadScores.length || 0;

    return {
      highQuality,
      mediumQuality, 
      lowQuality,
      averageScore: Math.round(averageScore * 10) / 10
    };
  }

  // Analyze avatar performance
  async getAvatarPerformance(): Promise<AvatarPerformance> {
    const leads = await storage.getLeads();
    
    const avatars = ['juan_carlos', 'ana_maria', 'carlos_rodriguez', 'general'];
    const performance: any = {};

    for (const avatar of avatars) {
      // In real implementation, filter by avatarMatch field
      // For now, use heuristics based on existing data
      const avatarLeads = leads.filter(lead => {
        const message = lead.message?.toLowerCase() || '';
        switch (avatar) {
          case 'juan_carlos':
            return message.includes('familia') || message.includes('casa') || message.includes('ampliacion');
          case 'ana_maria':
            return message.includes('oficina') || message.includes('remodelacion') || message.includes('profesional');
          case 'carlos_rodriguez':
            return message.includes('inversion') || message.includes('comercial') || message.includes('multiple');
          default:
            return true; // General category includes all others
        }
      });

      const conversions = avatarLeads.filter(lead => 
        lead.status === 'appointment_completed' || lead.status === 'converted'
      ).length;

      performance[avatar] = {
        leads: avatarLeads.length,
        conversions,
        rate: avatarLeads.length > 0 ? Math.round((conversions / avatarLeads.length) * 100 * 10) / 10 : 0
      };
    }

    return performance;
  }

  // Get lead source performance
  async getSourcePerformance() {
    const leads = await storage.getLeads();
    const sourceStats: { [key: string]: { leads: number; conversions: number; rate: number } } = {};

    // Group by source
    for (const lead of leads) {
      if (!sourceStats[lead.source]) {
        sourceStats[lead.source] = { leads: 0, conversions: 0, rate: 0 };
      }
      
      sourceStats[lead.source].leads++;
      
      if (lead.status.includes('appointment') || lead.status === 'converted') {
        sourceStats[lead.source].conversions++;
      }
    }

    // Calculate conversion rates
    for (const source in sourceStats) {
      const stats = sourceStats[source];
      stats.rate = stats.leads > 0 ? Math.round((stats.conversions / stats.leads) * 100 * 10) / 10 : 0;
    }

    return sourceStats;
  }

  // Advanced funnel analysis with stage-by-stage breakdown
  async getFunnelAnalysis() {
    const leads = await storage.getLeads();
    
    const stages = {
      awareness: leads.filter(lead => lead.source === 'blog' || lead.source === 'ebook').length,
      consideration: leads.filter(lead => lead.source === 'calculator' || lead.source === 'contact_form').length,
      decision: leads.filter(lead => lead.source === 'tidycal_appointment').length,
      retention: leads.filter(lead => lead.status === 'converted').length
    };

    const totalLeads = leads.length;
    
    return {
      stages,
      dropoffRates: {
        awarenessToConsideration: totalLeads > 0 ? Math.round((1 - stages.consideration / totalLeads) * 100) : 0,
        considerationToDecision: stages.consideration > 0 ? Math.round((1 - stages.decision / stages.consideration) * 100) : 0,
        decisionToRetention: stages.decision > 0 ? Math.round((1 - stages.retention / stages.decision) * 100) : 0
      },
      recommendations: this.generateOptimizationRecommendations(stages, totalLeads)
    };
  }

  private generateOptimizationRecommendations(stages: any, totalLeads: number): string[] {
    const recommendations: string[] = [];
    
    if (stages.awareness / totalLeads < 0.3) {
      recommendations.push("Aumentar contenido de blog y lead magnets para mejorar awareness");
    }
    
    if (stages.consideration / totalLeads < 0.4) {
      recommendations.push("Optimizar calculadoras y formularios de contacto para mejor consideración");
    }
    
    if (stages.decision / totalLeads < 0.2) {
      recommendations.push("Mejorar call-to-actions para agendamiento de citas");
    }
    
    if (stages.retention / stages.decision < 0.25) {
      recommendations.push("Optimizar proceso de conversión post-cita");
    }

    return recommendations;
  }

  // Generate executive dashboard summary
  async getExecutiveSummary() {
    const [conversionMetrics, qualityMetrics, avatarPerformance, sourcePerformance] = await Promise.all([
      this.getConversionMetrics(),
      this.getLeadQualityMetrics(),
      this.getAvatarPerformance(),
      this.getSourcePerformance()
    ]);

    const topPerformingSource = Object.entries(sourcePerformance)
      .sort(([,a], [,b]) => b.rate - a.rate)[0];

    const topPerformingAvatar = Object.entries(avatarPerformance)
      .sort(([,a], [,b]) => b.rate - a.rate)[0];

    return {
      summary: {
        totalLeads: conversionMetrics.totalLeads,
        overallConversion: Math.round(conversionMetrics.conversionRates.overallConversion * 10) / 10,
        averageLeadQuality: qualityMetrics.averageScore,
        topSource: topPerformingSource ? topPerformingSource[0] : 'No data',
        topAvatar: topPerformingAvatar ? topPerformingAvatar[0] : 'No data'
      },
      alerts: this.generateAlerts(conversionMetrics, qualityMetrics),
      recommendations: await this.getOptimizationRecommendations()
    };
  }

  private generateAlerts(conversionMetrics: ConversionMetrics, qualityMetrics: LeadQualityMetrics): string[] {
    const alerts: string[] = [];
    
    if (conversionMetrics.conversionRates.leadToAppointment < 15) {
      alerts.push("🔴 Baja conversión de leads a citas (<15%)");
    }
    
    if (qualityMetrics.averageScore < 35) {
      alerts.push("🟡 Calidad promedio de leads baja");
    }
    
    if (conversionMetrics.conversionRates.quoteToSale < 20) {
      alerts.push("🔴 Baja conversión de cotizaciones a ventas (<20%)");
    }

    return alerts;
  }

  private async getOptimizationRecommendations(): Promise<string[]> {
    return [
      "Implementar secuencias de email automatizadas para leads inactivos",
      "Crear contenido específico para cada avatar identificado",
      "Optimizar formularios de contacto con campos de calificación",
      "Implementar chat bot para respuesta inmediata",
      "Crear landing pages específicas por fuente de tráfico"
    ];
  }
}

export const enhancedAnalytics = new EnhancedAnalytics();