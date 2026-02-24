import { Mail, Clock, Target, Zap, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdvancedNurturing() {
  // Sistema de nurturing automatizado por segmentos
  const nurturingSequences = [
    {
      segment: "Prospects Inmediatos",
      description: "Familias que necesitan empezar ahora",
      emails: 5,
      duration: "7 días",
      conversions: "47%",
      color: "bg-red-100 text-red-800",
      sequence: [
        { day: "Día 1", subject: "Tu consulta GRATIS está reservada", type: "Confirmación + Value" },
        { day: "Día 2", subject: "3 errores que NO debes cometer", type: "Educación + Autoridad" },
        { day: "Día 3", subject: "¿Por qué algunas familias fallan?", type: "Problem Agitation" },
        { day: "Día 5", subject: "Case Study: Casa en Las Condes", type: "Social Proof" },
        { day: "Día 7", subject: "Último llamado - Cupo se cierra", type: "Urgency + CTA" }
      ]
    },
    {
      segment: "Prospects Planificadores",
      description: "Familias en etapa de investigación",
      emails: 8,
      duration: "14 días",
      conversions: "31%",
      color: "bg-blue-100 text-blue-800",
      sequence: [
        { day: "Día 1", subject: "Kit de planificación en tu email", type: "Entrega de valor" },
        { day: "Día 3", subject: "Cómo calcular tu presupuesto real", type: "Educación práctica" },
        { day: "Día 5", subject: "Los 5 estilos más pedidos en Santiago", type: "Inspiración + Trends" },
        { day: "Día 7", subject: "Errores costosos que debes evitar", type: "Problem Awareness" },
        { day: "Día 9", subject: "Historia: De 0 a casa soñada en 8 meses", type: "Case Study completo" },
        { day: "Día 11", subject: "¿Cuándo es el momento ideal?", type: "Timing + Urgency suave" },
        { day: "Día 13", subject: "Consulta gratuita disponible", type: "Soft pitch" },
        { day: "Día 14", subject: "¿Estás listo para el siguiente paso?", type: "Decision point" }
      ]
    },
    {
      segment: "Prospects Exploradores",
      description: "Familias buscando inspiración",
      emails: 12,
      duration: "30 días",
      conversions: "18%",
      color: "bg-green-100 text-green-800",
      sequence: [
        { day: "Día 1", subject: "500+ ideas para tu proyecto de vivienda", type: "Biblioteca de inspiración" },
        { day: "Día 3", subject: "Tendencias 2025: Lo que está de moda", type: "Trends + Autoridad" },
        { day: "Día 7", subject: "Casa pequeña, gran impacto", type: "Inspiración específica" },
        { day: "Día 10", subject: "Antes y después: Transformaciones", type: "Visual storytelling" },
        { day: "Día 14", subject: "¿Cómo saber si un diseño es para ti?", type: "Educación + Self-assessment" },
        { day: "Día 18", subject: "Los secretos de una buena distribución", type: "Expertise + Tips" },
        { day: "Día 21", subject: "Colores que nunca pasan de moda", type: "Practical advice" },
        { day: "Día 24", subject: "¿Remodelar o construir de nuevo?", type: "Decision framework" },
        { day: "Día 26", subject: "Cliente feliz: Su historia completa", type: "Long-form case study" },
        { day: "Día 28", subject: "¿Es hora de dar el siguiente paso?", type: "Transition + Soft pitch" },
        { day: "Día 30", subject: "Consulta gratuita - Sin compromiso", type: "Low-pressure CTA" }
      ]
    }
  ];

  const automationMetrics = [
    {
      metric: "Open Rate",
      value: "68%",
      benchmark: "vs 21% promedio",
      icon: <Mail className="w-6 h-6 text-blue-600" />
    },
    {
      metric: "Click Rate", 
      value: "23%",
      benchmark: "vs 3.1% promedio",
      icon: <Target className="w-6 h-6 text-green-600" />
    },
    {
      metric: "Conversión Final",
      value: "34%",
      benchmark: "de lead a cliente",
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />
    },
    {
      metric: "Time to Close",
      value: "12 días",
      benchmark: "vs 45 días industria",
      icon: <Clock className="w-6 h-6 text-orange-600" />
    }
  ];

  const personalizationTriggers = [
    {
      trigger: "Descarga calculadora",
      action: "Secuencia de presupuesto detallado",
      conversion: "+89%"
    },
    {
      trigger: "Ve testimoniales >3 veces",
      action: "Case study similar enviado",
      conversion: "+67%"
    },
    {
      trigger: "Abandona formulario",
      action: "Email de objeción handling",
      conversion: "+123%"
    },
    {
      trigger: "Visita página precios",
      action: "Comparación de valor",
      conversion: "+156%"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-100 text-purple-800 px-6 py-3 rounded-full font-bold text-sm mb-4">
            🤖 SISTEMA DE NURTURING AUTOMATIZADO
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Cómo Convertimos Visitantes en Clientes Durante 30 Días
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Sistema automatizado que nurture cada lead con contenido personalizado 
            basado en su comportamiento y etapa del customer journey.
          </p>
        </div>

        {/* Automation Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {automationMetrics.map((metric, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="flex justify-center mb-2">
                  {metric.icon}
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.metric}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <div className="text-xs text-gray-500">
                  {metric.benchmark}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Nurturing Sequences */}
        <div className="space-y-8 mb-16">
          {nurturingSequences.map((sequence, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-2 ${sequence.color}`}>
                      {sequence.segment}
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {sequence.description}
                    </CardTitle>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{sequence.conversions}</div>
                    <div className="text-sm text-gray-500">conversión</div>
                  </div>
                </div>
                <div className="flex space-x-6 text-sm text-gray-600">
                  <span>{sequence.emails} emails</span>
                  <span>{sequence.duration}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sequence.sequence.map((email, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </div>
                        <div className="text-xs text-gray-500">{email.day}</div>
                      </div>
                      <div className="font-medium text-sm mb-2">{email.subject}</div>
                      <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                        {email.type}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Personalization Triggers */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Triggers de Personalización Automática
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalizationTriggers.map((trigger, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Zap className="w-8 h-8 text-yellow-500 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-900 mb-1">
                    Cuando: {trigger.trigger}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Acción: {trigger.action}
                  </div>
                  <div className="text-xs font-bold text-green-600">
                    Resultado: {trigger.conversion} más conversión
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8">
          <div className="text-center mb-8">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">
              Segmentación Inteligente en Acción
            </h3>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Cada prospect recibe exactamente el contenido que necesita, 
              cuando lo necesita, basado en su comportamiento real.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">AI-Powered</div>
                <div className="text-sm opacity-90">
                  Machine learning optimiza timing y contenido automáticamente
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">Real-Time</div>
                <div className="text-sm opacity-90">
                  Respuesta inmediata a cada acción del prospect
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">Multi-Channel</div>
                <div className="text-sm opacity-90">
                  Email, SMS, retargeting y notificaciones push coordinadas
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-400 text-black px-8 py-4 rounded-lg inline-block">
              <div className="text-lg font-bold mb-2">
                Resultado: 340% Más Leads Calificados
              </div>
              <div className="text-sm opacity-75">
                Comparado con nurturing manual tradicional
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}