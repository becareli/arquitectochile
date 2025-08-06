import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Target, 
  Award,
  AlertTriangle,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

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
  highQuality: number;
  mediumQuality: number;
  lowQuality: number;
  averageScore: number;
}

interface AvatarPerformance {
  [key: string]: {
    leads: number;
    conversions: number;
    rate: number;
  };
}

interface ExecutiveSummary {
  summary: {
    totalLeads: number;
    overallConversion: number;
    averageLeadQuality: number;
    topSource: string;
    topAvatar: string;
  };
  alerts: string[];
  recommendations: string[];
}

export default function AdminEnhancedAnalytics() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch enhanced analytics data
  const { data: conversionData, isLoading: conversionLoading } = useQuery<ConversionMetrics>({
    queryKey: ['/api/analytics/conversion-metrics', refreshKey],
  });

  const { data: qualityData, isLoading: qualityLoading } = useQuery<LeadQualityMetrics>({
    queryKey: ['/api/analytics/lead-quality', refreshKey],
  });

  const { data: avatarData, isLoading: avatarLoading } = useQuery<AvatarPerformance>({
    queryKey: ['/api/analytics/avatar-performance', refreshKey],
  });

  const { data: executiveData, isLoading: executiveLoading } = useQuery<ExecutiveSummary>({
    queryKey: ['/api/analytics/executive-summary', refreshKey],
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const getQualityColor = (quality: 'high' | 'medium' | 'low') => {
    switch (quality) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
    }
  };

  const getAvatarName = (avatar: string) => {
    switch (avatar) {
      case 'juan_carlos': return 'Juan Carlos (Familia)';
      case 'ana_maria': return 'Ana María (Profesional)';
      case 'carlos_rodriguez': return 'Carlos R. (Inversionista)';
      default: return 'General';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Avanzado</h1>
          <p className="text-muted-foreground">
            Inteligencia de negocio y optimización de conversiones
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualizar
        </Button>
      </div>

      {/* Executive Summary */}
      {executiveData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Resumen Ejecutivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{executiveData.summary.totalLeads}</div>
                <div className="text-sm text-muted-foreground">Total Leads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{executiveData.summary.overallConversion}%</div>
                <div className="text-sm text-muted-foreground">Conversión General</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{executiveData.summary.averageLeadQuality}</div>
                <div className="text-sm text-muted-foreground">Calidad Promedio</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-orange-600">{executiveData.summary.topSource}</div>
                <div className="text-sm text-muted-foreground">Mejor Fuente</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-indigo-600">{getAvatarName(executiveData.summary.topAvatar)}</div>
                <div className="text-sm text-muted-foreground">Mejor Avatar</div>
              </div>
            </div>

            {executiveData.alerts.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Alertas Críticas
                </h4>
                <div className="space-y-1">
                  {executiveData.alerts.map((alert, index) => (
                    <div key={index} className="text-sm bg-amber-50 border-l-4 border-amber-500 p-2">
                      {alert}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-medium mb-2">Recomendaciones de Optimización</h4>
              <div className="space-y-1">
                {executiveData.recommendations.map((rec, index) => (
                  <div key={index} className="text-sm bg-blue-50 border-l-4 border-blue-500 p-2">
                    💡 {rec}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="conversions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="conversions">Conversiones</TabsTrigger>
          <TabsTrigger value="quality">Calidad de Leads</TabsTrigger>
          <TabsTrigger value="avatars">Avatares</TabsTrigger>
          <TabsTrigger value="funnel">Embudo</TabsTrigger>
        </TabsList>

        {/* Conversion Metrics */}
        <TabsContent value="conversions">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{conversionData?.totalLeads || 0}</div>
                <p className="text-xs text-muted-foreground">Leads generados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Citas Agendadas</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{conversionData?.appointmentsScheduled || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {conversionData?.conversionRates.leadToAppointment.toFixed(1)}% conversión
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cotizaciones</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{conversionData?.quotesGenerated || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {conversionData?.conversionRates.appointmentToQuote.toFixed(1)}% de citas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventas Cerradas</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{conversionData?.quotesAccepted || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {conversionData?.conversionRates.quoteToSale.toFixed(1)}% de cotizaciones
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Lead Quality */}
        <TabsContent value="quality">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Calidad de Leads</CardTitle>
              <CardDescription>
                Análisis basado en scoring de leads y probabilidad de conversión
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${getQualityColor('high')}`}></div>
                    <span>Alta Calidad (60+ puntos)</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{qualityData?.highQuality || 0}</div>
                    <div className="text-sm text-muted-foreground">leads</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${getQualityColor('medium')}`}></div>
                    <span>Media Calidad (40-60 puntos)</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{qualityData?.mediumQuality || 0}</div>
                    <div className="text-sm text-muted-foreground">leads</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${getQualityColor('low')}`}></div>
                    <span>Baja Calidad (&lt;40 puntos)</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{qualityData?.lowQuality || 0}</div>
                    <div className="text-sm text-muted-foreground">leads</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Score Promedio:</span>
                    <Badge variant="outline" className="text-lg">
                      {qualityData?.averageScore.toFixed(1) || '0.0'} puntos
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Avatar Performance */}
        <TabsContent value="avatars">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento por Avatar</CardTitle>
              <CardDescription>
                Análisis de conversión por perfil de cliente ideal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {avatarData && Object.entries(avatarData).map(([avatar, data]) => (
                  <div key={avatar} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{getAvatarName(avatar)}</h4>
                      <p className="text-sm text-muted-foreground">
                        {data.leads} leads • {data.conversions} conversiones
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{data.rate}%</div>
                      <div className="text-sm text-muted-foreground">conversión</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Funnel Analysis */}
        <TabsContent value="funnel">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Embudo</CardTitle>
              <CardDescription>
                Identificación de puntos de fuga y oportunidades de optimización
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Análisis de embudo detallado próximamente
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}