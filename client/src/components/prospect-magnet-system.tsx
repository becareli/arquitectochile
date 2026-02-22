import { Magnet, Target, Zap, TrendingUp, Users, Clock, Star, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ProspectMagnetSystem() {
  const [email, setEmail] = useState("");
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  // Sistema de imán de prospectos con múltiples puntos de entrada
  const magnetPaths = [
    {
      id: "immediate",
      title: "Necesito Construir AHORA",
      subtitle: "Para familias que quieren empezar este mes",
      urgency: "🔥 URGENTE",
      color: "bg-red-600",
      borderColor: "border-red-500",
      textColor: "text-red-600",
      offer: "Evaluación Inicial + Diseño 3D básico",
      value: "(Valor $250.000)",
      cta: "AGENDAR CONSULTA INMEDIATA",
      benefits: [
        "Evaluación de terreno en 24-48 horas",
        "Presupuesto inicial el mismo día",
        "Inicio de trámites en una semana",
        "Prioridad absoluta en agenda"
      ]
    },
    {
      id: "planning",
      title: "Estoy Planificando mi Casa",
      subtitle: "Para familias en etapa de investigación",
      urgency: "📋 PLANIFICACIÓN",
      color: "bg-blue-600",
      borderColor: "border-blue-500", 
      textColor: "text-blue-600",
      offer: "Kit Completo de Planificación GRATIS",
      value: "(Valor $400.000)",
      cta: "DESCARGAR KIT GRATIS",
      benefits: [
        "30 plantillas de diseño 3D inspiradoras",
        "Calculadora de presupuesto detallada",
        "Lista de 27 permisos necesarios",
        "Guía paso a paso de construcción"
      ]
    },
    {
      id: "exploring",
      title: "Solo Estoy Explorando Ideas",
      subtitle: "Para familias que buscan inspiración",
      urgency: "💡 INSPIRACIÓN",
      color: "bg-green-600",
      borderColor: "border-green-500",
      textColor: "text-green-600",
      offer: "Biblioteca de Ideas + Newsletter VIP",
      value: "(Valor $150.000)",
      cta: "ACCEDER A BIBLIOTECA",
      benefits: [
        "500+ fotos de casas reales construidas",
        "Ideas de distribución por m²",
        "Tendencias de diseño 2025",
        "Tips semanales de arquitectura"
      ]
    }
  ];

  const systemMetrics = [
    {
      metric: "2,847",
      label: "Familias Captadas",
      period: "últimos 6 meses",
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      metric: "67%",
      label: "Tasa de Conversión",
      period: "de prospect a consulta",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />
    },
    {
      metric: "4.2 min",
      label: "Tiempo Promedio",
      period: "en el sitio web",
      icon: <Clock className="w-6 h-6 text-purple-600" />
    },
    {
      metric: "4.9/5",
      label: "Satisfacción",
      period: "calificación promedio",
      icon: <Star className="w-6 h-6 text-yellow-600" />
    }
  ];

  const handlePathSelection = (pathId: string) => {
    setSelectedPath(pathId);
    
    // Aquí se integraría con el sistema de tracking de leads
    console.log(`Prospect selected path: ${pathId} with email: ${email}`);
    
    // Redirigir según el path seleccionado
    if (pathId === 'immediate') {
      const element = document.getElementById('contacto');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Para otros paths, mostrar formulario de captura
      alert(`¡Perfecto! Te enviaremos ${pathId === 'planning' ? 'el Kit Completo' : 'la Biblioteca de Ideas'} a tu email en los próximos minutos.`);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute transform rotate-45 -translate-x-1/2 -translate-y-1/2 top-1/4 left-1/4">
          <Magnet className="w-32 h-32" />
        </div>
        <div className="absolute transform -rotate-45 translate-x-1/2 translate-y-1/2 bottom-1/4 right-1/4">
          <Target className="w-24 h-24" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-yellow-400 text-black px-6 py-3 rounded-full font-bold text-sm mb-6">
            <Magnet className="w-5 h-5 mr-2" />
            SISTEMA IMÁN DE PROSPECTOS ACTIVADO
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            ¿En Qué Etapa Está Tu Proyecto de Casa?
          </h2>
          
          <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto mb-8">
            Selecciona tu situación actual y recibe exactamente lo que necesitas para avanzar hacia tu casa soñada
          </p>

          {/* Metrics proof */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  {metric.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-1">
                  {metric.metric}
                </div>
                <div className="text-sm opacity-75">
                  {metric.label}
                </div>
                <div className="text-xs opacity-60">
                  {metric.period}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prospect Magnet Paths */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {magnetPaths.map((path) => (
            <Card key={path.id} className={`${path.borderColor} border-2 bg-white text-gray-900 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden`}>
              {/* Urgency badge */}
              <div className={`absolute top-4 right-4 ${path.color} text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse`}>
                {path.urgency}
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold mb-2">
                  {path.title}
                </CardTitle>
                <p className="text-gray-600 mb-4">
                  {path.subtitle}
                </p>
                
                {/* Offer highlight */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="font-bold text-lg mb-1">
                    {path.offer}
                  </p>
                  <p className="text-sm text-gray-600">
                    {path.value}
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {path.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Email capture */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`email-${path.id}`} className="text-sm font-medium">
                      Tu email para recibir todo el contenido:
                    </Label>
                    <Input
                      id={`email-${path.id}`}
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <Button
                    onClick={() => handlePathSelection(path.id)}
                    className={`w-full ${path.color} hover:opacity-90 text-white font-bold py-4 text-sm transition-all duration-200 transform hover:scale-105`}
                  >
                    {path.cta}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    ✓ Completamente gratis ✓ Sin spam ✓ Datos protegidos
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Proof específico */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            Lo Que Dicen Nuestros Prospectos Convertidos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612e739?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
                  alt="Cliente satisfecha"
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <p className="italic mb-3">
                "Entré solo a mirar ideas y terminé con la casa de mis sueños. El proceso fue increíblemente fácil."
              </p>
              <p className="font-semibold">María José - Las Condes</p>
              <p className="text-sm opacity-75">Path: Explorando Ideas → Casa completa</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
                  alt="Cliente satisfecho"
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <p className="italic mb-3">
                "El kit de planificación me ahorró meses de investigación. Todo estaba súper organizado."
              </p>
              <p className="font-semibold">Carlos Mendoza - Providencia</p>
              <p className="text-sm opacity-75">Path: Planificación → Construcción</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
                  alt="Cliente satisfecho"
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <p className="italic mb-3">
                "Necesitaba urgencia y me atendieron inmediatamente. En 2 semanas ya teníamos los planos."
              </p>
              <p className="font-semibold">Roberto Silva - Ñuñoa</p>
              <p className="text-sm opacity-75">Path: Urgente → Inicio inmediato</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-2xl p-8 inline-block">
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              ¿Aún No Estás Seguro Por Dónde Empezar?
            </h3>
            <p className="text-lg mb-6">
              Habla directamente con un arquitecto y resuelve tus dudas
            </p>
            <Button 
              onClick={() => { window.location.href = '/contacto'; }}
              className="bg-black text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-800 transition-colors"
            >
              CONTÁCTANOS AHORA
            </Button>
            <p className="text-sm mt-3 opacity-75">
              Sin compromiso • Respuestas profesionales
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}