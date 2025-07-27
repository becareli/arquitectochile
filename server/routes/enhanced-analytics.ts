// Enhanced Analytics API Routes - Plan Implementation

import { Router } from 'express';
import { enhancedAnalytics } from '../enhanced-analytics';

const router = Router();

// Get comprehensive conversion metrics
router.get('/conversion-metrics', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const dateRange = startDate && endDate ? {
      start: new Date(startDate as string),
      end: new Date(endDate as string)
    } : undefined;

    const metrics = await enhancedAnalytics.getConversionMetrics(dateRange);
    res.json(metrics);
  } catch (error) {
    console.error('Error fetching conversion metrics:', error);
    res.status(500).json({ error: 'Failed to fetch conversion metrics' });
  }
});

// Get lead quality distribution
router.get('/lead-quality', async (req, res) => {
  try {
    const metrics = await enhancedAnalytics.getLeadQualityMetrics();
    res.json(metrics);
  } catch (error) {
    console.error('Error fetching lead quality metrics:', error);
    res.status(500).json({ error: 'Failed to fetch lead quality metrics' });
  }
});

// Get avatar performance analysis
router.get('/avatar-performance', async (req, res) => {
  try {
    const performance = await enhancedAnalytics.getAvatarPerformance();
    res.json(performance);
  } catch (error) {
    console.error('Error fetching avatar performance:', error);
    res.status(500).json({ error: 'Failed to fetch avatar performance' });
  }
});

// Get source performance metrics
router.get('/source-performance', async (req, res) => {
  try {
    const performance = await enhancedAnalytics.getSourcePerformance();
    res.json(performance);
  } catch (error) {
    console.error('Error fetching source performance:', error);
    res.status(500).json({ error: 'Failed to fetch source performance' });
  }
});

// Get funnel analysis with stage breakdown
router.get('/funnel-analysis', async (req, res) => {
  try {
    const analysis = await enhancedAnalytics.getFunnelAnalysis();
    res.json(analysis);
  } catch (error) {
    console.error('Error fetching funnel analysis:', error);
    res.status(500).json({ error: 'Failed to fetch funnel analysis' });
  }
});

// Get executive dashboard summary
router.get('/executive-summary', async (req, res) => {
  try {
    const summary = await enhancedAnalytics.getExecutiveSummary();
    res.json(summary);
  } catch (error) {
    console.error('Error fetching executive summary:', error);
    res.status(500).json({ error: 'Failed to fetch executive summary' });
  }
});

// Export for real-time dashboard updates
router.get('/dashboard-data', async (req, res) => {
  try {
    const [conversionMetrics, qualityMetrics, avatarPerformance, funnelAnalysis] = await Promise.all([
      enhancedAnalytics.getConversionMetrics(),
      enhancedAnalytics.getLeadQualityMetrics(),
      enhancedAnalytics.getAvatarPerformance(),
      enhancedAnalytics.getFunnelAnalysis()
    ]);

    res.json({
      conversions: conversionMetrics,
      quality: qualityMetrics,
      avatars: avatarPerformance,
      funnel: funnelAnalysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

export default router;