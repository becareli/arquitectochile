import { TrendingUp, Target, Users, Zap, BarChart3, Repeat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FunnelOptimizationVilma() {
  // Funnel metrics basado en metodología Vilma Núñez
  const funnelSteps = [
    {
      step: "01",
      title: "Captación",
      description: "Tráfico cualificado a la web",
      visitors: "1,000",
      percentage: "100%",
      color: "bg-blue-500",
      tactics: ["SEO optimizado", "Facebook Ads", "Content Marketing", "Referidos"]
    },
    {
      step: "02", 
      title: "Interés",
      description: "Descargan lead magnets",
      visitors: "340",
      percentage: "34%",
      color: "bg-green-500",
      tactics: ["Calculadoras gratis", "Ebooks descargables", "Checklists", "Plantillas"]
    },
    {
      step: "03",
      title: "Consideración",
      description: "Agendan consulta gratuita",
      visitors: "102",
      percentage: "30%",
      color: "bg-yellow-500",
      tactics: ["Email nurturing", "Casos de éxito", "Testimoniales", "Garantías"]
    },
    {
      step: "04",
      title: "Conversión",
      description: "Contratan servicios",
      visitors: "31",
      percentage: "30%",
      color: "bg-purple-500",
      tactics: ["Consulta presencial", "Propuesta valor", "Urgencia", "Bonos"]
    }
  ];

  const conversionMetrics = [
    {
      metric: "Tasa de Conversión Global",
      value: "3.1%",
      benchmark: "vs 1.2% promedio industria",
      status: "excellent",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />
    },
    {
      metric: "Costo por Lead",
      value: "$12.500",
      benchmark: "vs $25.000 promedio",
      status: "good", 
      icon: <Target className="w-6 h-6 text-blue-600" />
    },
    {
      metric: "Lifetime Value",
      value: "$1.800.000",
      benchmark: "144x ROI promedio",
      status: "excellent",
      icon: <BarChart3 className="w-6 h-6 text-purple-600" />
    },
    {
      metric: "Tiempo de Conversión",
      value: "7 días",
      benchmark: "vs 21 días industria",
      status: "excellent",
      icon: <Zap className="w-6 h-6 text-yellow-600" />
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con autoridad Vilma Núñez */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-bold text-sm mb-4">
            📊 FUNNEL DE CONVERSIÓN OPTIMIZADO
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Cómo Convertimos el 3.1% de Visitantes en Clientes Satisfechos
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Usando las metodologías de Vilma Núñez, hemos creado un sistema automatizado 
            que convierte 158% más que el promedio de la industria arquitectónica.
          </p>
        </div>

        {/* Funnel visualization */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {funnelSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`inline-block px-4 py-2 rounded-full text-white font-bold text-sm mb-4 ${step.color}`}>
                      PASO {step.step}
                    </div>
                    <CardTitle className="text-lg font-bold">
                      {step.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm mb-4">
                      {step.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-gray-900">
                        {step.visitors}
                      </div>
                      <div className="text-sm text-gray-500">personas</div>
                      <div className={`text-lg font-bold mt-2 ${step.color.replace('bg-', 'text-')}`}>
                        {step.percentage}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      {step.tactics.map((tactic, i) => (
                        <div key={i} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                          ✓ {tactic}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Arrow connector */}
                {index < funnelSteps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-0.5 bg-gray-300"></div>
                    <div className="w-0 h-0 border-l-4 border-l-gray-300 border-t-2 border-t-transparent border-b-2 border-b-transparent absolute right-0 top-1/2 transform -translate-y-1/2"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Métricas de rendimiento */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Métricas de Rendimiento (Metodología Vilma Núñez)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conversionMetrics.map((metric, index) => (
              <Card key={index} className="text-center bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    {metric.icon}
                  </div>
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {metric.metric}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {metric.value}
                  </div>
                  <div className={`text-xs font-medium ${
                    metric.status === 'excellent' ? 'text-green-600' : 
                    metric.status === 'good' ? 'text-blue-600' : 'text-yellow-600'
                  }`}>
                    {metric.benchmark}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Automatización de marketing */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8">
          <div className="text-center mb-8">
            <Repeat className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">
              Sistema 100% Automatizado
            </h3>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Inspirado en las estrategias de Vilma Núñez, nuestro funnel trabaja 24/7 
              nutriendo leads y convirtiendo prospectos mientras duermes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Segmentación Inteligente</h4>
                <p className="text-sm opacity-90">
                  Cada lead recibe contenido personalizado según su tipo de proyecto
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Zap className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Respuesta Inmediata</h4>
                <p className="text-sm opacity-90">
                  Email automático en menos de 60 segundos con recursos valiosos
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <BarChart3 className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Optimización Continua</h4>
                <p className="text-sm opacity-90">
                  A/B testing constante para mejorar cada elemento del funnel
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => { window.location.href = '/contacto'; }}
              className="bg-yellow-400 text-black px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-300 transition-colors shadow-xl"
            >
              Contáctanos
            </button>
            <p className="text-sm opacity-75 mt-3">
              Únete a las 2,000+ familias que ya forman parte de nuestro sistema
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}