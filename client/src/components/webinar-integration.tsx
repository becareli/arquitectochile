import { Zap, Target, TrendingUp, Users, PlayCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WebinarIntegration() {
  // Integration de webinarios en el funnel completo
  const funnelWithWebinars = [
    {
      stage: "Captación",
      traffic: "10,000 visitantes/mes",
      webinarRole: "Anuncios dirigidos a webinar gratuito",
      conversion: "4.2%",
      description: "WebinarKit ads + organic traffic"
    },
    {
      stage: "Interés",
      traffic: "420 registros webinar",
      webinarRole: "Registro a masterclass como lead magnet principal",
      conversion: "87%",
      description: "Alta asistencia por valor percibido"
    },
    {
      stage: "Educación",
      traffic: "365 asistentes reales",
      webinarRole: "Contenido de valor + social proof en vivo",
      conversion: "43%",
      description: "Q&A personalizado aumenta autoridad"
    },
    {
      stage: "Conversión",
      traffic: "157 consultas agendadas",
      webinarRole: "CTA directo al final del webinar",
      conversion: "89%",
      description: "Prospects pre-calificados y educados"
    },
    {
      stage: "Cliente",
      traffic: "140 proyectos iniciados",
      webinarRole: "Follow-up exclusivo para asistentes",
      conversion: "1.4%",
      description: "ROI 280x vs funnel tradicional"
    }
  ];

  const webinarAdvantages = [
    {
      benefit: "Autoridad Instantánea",
      description: "90 minutos posicionándote como el experto #1",
      metric: "+340% confianza",
      icon: <Users className="w-8 h-8 text-blue-600" />
    },
    {
      benefit: "Educación a Escala",
      description: "250+ familias educadas simultáneamente",
      metric: "vs 1:1 tradicional",
      icon: <Target className="w-8 h-8 text-green-600" />
    },
    {
      benefit: "Objeciones Pre-Resueltas",
      description: "Manejas objeciones antes de la consulta",
      metric: "+156% conversión",
      icon: <Zap className="w-8 h-8 text-purple-600" />
    },
    {
      benefit: "Segmentación Avanzada",
      description: "Prospects auto-calificados por comportamiento",
      metric: "89% qualified leads",
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />
    }
  ];

  const automationFlow = [
    {
      trigger: "Prospect descarga lead magnet",
      action: "Auto-invitación a próximo webinar",
      platform: "WebinarKit + Email sequence"
    },
    {
      trigger: "Registro a webinar confirmado",
      action: "Serie de 3 emails pre-webinar",
      platform: "Nurturing automation + reminders"
    },
    {
      trigger: "Asiste al webinar completo",
      action: "Oferta especial post-webinar",
      platform: "Behavioral trigger + CTA personalizado"
    },
    {
      trigger: "No asiste pero registrado",
      action: "Replay exclusivo + invitación a contacto",
      platform: "Recovery sequence + WebinarKit replay"
    },
    {
      trigger: "Asiste pero no convierte",
      action: "Webinar automatizado específico",
      platform: "Advanced nurturing + 24/7 webinar"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-sm mb-4">
            🎯 WEBINARKIT INTEGRADO AL FUNNEL COMPLETO
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Cómo los Webinarios Multiplican tu Conversión por 280x
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Integración estratégica de WebinarKit con tu funnel de conversión para 
            educar prospects a escala y convertir más clientes automáticamente.
          </p>
        </div>

        {/* Funnel with Webinars */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Funnel Potenciado con WebinarKit
          </h3>
          
          <div className="space-y-6">
            {funnelWithWebinars.map((stage, index) => (
              <div key={index} className="flex items-center">
                <div className="w-32 text-right pr-6">
                  <div className="text-lg font-bold text-gray-900">{stage.stage}</div>
                  <div className="text-sm text-gray-600">{stage.traffic}</div>
                </div>
                
                <div className="flex-1 relative">
                  <div className="bg-gray-200 rounded-full h-12 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out flex items-center px-4"
                      style={{ width: `${100 - (index * 15)}%` }}
                    >
                      <span className="text-white text-sm font-semibold">
                        {stage.conversion}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="w-80 pl-6">
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {stage.webinarRole}
                  </div>
                  <div className="text-xs text-gray-600">
                    {stage.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-block bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">280x ROI</div>
              <div className="text-sm text-gray-600">vs funnel sin webinarios</div>
            </div>
          </div>
        </div>

        {/* Webinar Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {webinarAdvantages.map((advantage, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {advantage.icon}
                </div>
                <CardTitle className="text-lg font-bold">
                  {advantage.benefit}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  {advantage.description}
                </p>
                <div className="text-lg font-bold text-blue-600">
                  {advantage.metric}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Automation Flow */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Flujo de Automatización WebinarKit
          </h3>
          
          <div className="space-y-6">
            {automationFlow.map((flow, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">TRIGGER</div>
                        <div className="font-medium text-gray-900">{flow.trigger}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">ACCIÓN AUTOMÁTICA</div>
                        <div className="font-medium text-gray-900">{flow.action}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">PLATAFORMA</div>
                        <div className="text-sm text-blue-600">{flow.platform}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8 inline-block">
            <PlayCircle className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-6">
              Resultado: Sistema de Webinarios Completo
            </h3>
            <div className="grid grid-cols-3 gap-8 text-center mb-6">
              <div>
                <div className="text-4xl font-bold mb-2">365</div>
                <div className="text-sm opacity-90">Asistentes promedio/mes</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">43%</div>
                <div className="text-sm opacity-90">Conversión webinar→cliente</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">$8.4M</div>
                <div className="text-sm opacity-90">Pipeline generado anual</div>
              </div>
            </div>
            <div className="bg-yellow-400 text-black px-6 py-3 rounded-lg">
              <div className="font-bold">WebinarKit + Funnel Optimizado = Máquina de Conversión Imparable</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}