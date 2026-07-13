import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock, ExternalLink, Settings, TestTube } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSEO } from '@/hooks/useSEO';

interface IntegrationHealth {
  status: 'healthy' | 'unhealthy';
  integrations: Record<string, boolean>;
  timestamp: string;
}

interface TidyCalValidation {
  success: boolean;
  configuration: {
    hasTidyCalIntegration: boolean;
    googleMeetConfigured: boolean;
    issues: string[];
  };
  recommendations: string[];
  timestamp: string;
}

export default function AdminIntegrationsPage() {
  useSEO({
    title: "Integraciones | ArquitectoChile.com",
    description: "Panel interno de integraciones de ArquitectoChile.com.",
    path: "/admin",
    noindex: true,
  });

  const queryClient = useQueryClient();

  // Health check query
  const { data: healthData, isLoading: healthLoading } = useQuery<IntegrationHealth>({
    queryKey: ['/api/integrations/health'],
    refetchInterval: 30000 // Check every 30 seconds
  });

  // TidyCal validation mutation
  const validateTidyCalMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/integrations/tidycal/validate-meet');
      if (!response.ok) throw new Error('Validation failed');
      return response.json() as Promise<TidyCalValidation>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/integrations/health'] });
    }
  });

  // Test webhook mutation
  const testWebhookMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/integrations/tidycal/test-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Test failed');
      return response.json();
    }
  });

  const getStatusIcon = (isHealthy: boolean) => {
    return isHealthy ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-600" />
    );
  };

  const getStatusBadge = (isHealthy: boolean) => {
    return (
      <Badge variant={isHealthy ? "default" : "destructive"}>
        {isHealthy ? "Activo" : "Inactivo"}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integraciones Externas</h1>
          <p className="text-muted-foreground">
            Monitoreo y configuración de servicios externos
          </p>
        </div>
        <Button
          onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/integrations/health'] })}
          variant="outline"
          size="sm"
        >
          <Settings className="w-4 h-4 mr-2" />
          Actualizar Estado
        </Button>
      </div>

      {/* Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Estado General del Sistema
          </CardTitle>
          <CardDescription>
            Última verificación: {healthData?.timestamp ? new Date(healthData.timestamp).toLocaleString('es-CL') : 'Cargando...'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {healthLoading ? (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 animate-spin" />
              <span>Verificando integraciones...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthData?.integrations && Object.entries(healthData.integrations).map(([name, isHealthy]) => (
                <div key={name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(isHealthy)}
                    <span className="font-medium capitalize">{name.replace('_', ' ')}</span>
                  </div>
                  {getStatusBadge(isHealthy)}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* TidyCal Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            TidyCal - Configuración Google Meet
          </CardTitle>
          <CardDescription>
            Verificar que TidyCal está enviando enlaces de Google Meet correctamente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Button
              onClick={() => validateTidyCalMutation.mutate()}
              disabled={validateTidyCalMutation.isPending}
              variant="outline"
            >
              {validateTidyCalMutation.isPending ? (
                <Clock className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Settings className="w-4 h-4 mr-2" />
              )}
              Validar Configuración
            </Button>
            
            <Button
              onClick={() => testWebhookMutation.mutate()}
              disabled={testWebhookMutation.isPending}
              variant="secondary"
            >
              {testWebhookMutation.isPending ? (
                <Clock className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <TestTube className="w-4 h-4 mr-2" />
              )}
              Probar Webhook
            </Button>
          </div>

          {/* Validation Results */}
          {validateTidyCalMutation.data && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Resultado de Validación:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(validateTidyCalMutation.data.configuration.hasTidyCalIntegration)}
                  <span>Integración TidyCal: {validateTidyCalMutation.data.configuration.hasTidyCalIntegration ? 'Configurada' : 'No configurada'}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(validateTidyCalMutation.data.configuration.googleMeetConfigured)}
                  <span>Google Meet: {validateTidyCalMutation.data.configuration.googleMeetConfigured ? 'Configurado' : 'Requiere configuración'}</span>
                </div>
              </div>

              {validateTidyCalMutation.data.configuration.issues.length > 0 && (
                <div className="mt-3">
                  <h5 className="font-medium text-red-600 mb-1">Problemas detectados:</h5>
                  <ul className="list-disc list-inside text-sm text-red-600">
                    {validateTidyCalMutation.data.configuration.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {validateTidyCalMutation.data.recommendations.length > 0 && (
                <div className="mt-3">
                  <h5 className="font-medium text-amber-600 mb-1">Recomendaciones:</h5>
                  <ul className="list-disc list-inside text-sm text-amber-600">
                    {validateTidyCalMutation.data.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Test Results */}
          {testWebhookMutation.data && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Resultado de Prueba:</h4>
              <div className="text-sm">
                <p><strong>Estado:</strong> {testWebhookMutation.data.success ? '✅ Exitoso' : '❌ Fallido'}</p>
                <p><strong>Mensaje:</strong> {testWebhookMutation.data.message}</p>
                {testWebhookMutation.data.appointmentData && (
                  <div className="mt-2">
                    <p><strong>Cliente prueba:</strong> {testWebhookMutation.data.appointmentData.appointment.clientName}</p>
                    <p><strong>Enlace Meet detectado:</strong> {testWebhookMutation.data.appointmentData.appointment.meetingLink || 'No detectado'}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* WhatsApp Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            WhatsApp Business
          </CardTitle>
          <CardDescription>
            Estado de la integración con WhatsApp para respuestas automáticas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon(healthData?.integrations?.whatsapp ?? false)}
              <span className="font-medium">WhatsApp Integration</span>
            </div>
            {getStatusBadge(healthData?.integrations?.whatsapp ?? false)}
          </div>
          
          {!healthData?.integrations?.whatsapp && (
            <div className="mt-3 p-3 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-600">
                💡 Para activar WhatsApp, configura las variables de entorno WHATSAPP_ACCESS_TOKEN y WHATSAPP_PHONE_NUMBER_ID
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Integration Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Instrucciones de Configuración</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">TidyCal + Google Meet:</h4>
            <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
              <li>En TidyCal, ve a Settings → Integrations</li>
              <li>Conecta tu Google Calendar</li>
              <li>Activa "Auto-generate Google Meet links"</li>
              <li>Configura los webhooks para enviar a: <code className="bg-gray-100 px-1 rounded">/api/webhooks/tidycal</code></li>
              <li>Usa el botón "Probar Webhook" para verificar que funciona correctamente</li>
            </ol>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">WhatsApp Business:</h4>
            <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
              <li>Crea una aplicación en Meta for Developers</li>
              <li>Configura WhatsApp Business API</li>
              <li>Obtén el Access Token y Phone Number ID</li>
              <li>Agrega las variables de entorno correspondientes</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}