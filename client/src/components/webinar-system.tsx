import { Calendar, Users, PlayCircle, Clock, Star, CheckCircle, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function WebinarSystem() {
  const [email, setEmail] = useState("");
  const [selectedWebinar, setSelectedWebinar] = useState<string | null>(null);

  // Webinarios estructurados para diferentes etapas del funnel
  const webinars = [
    {
      id: "masterclass_live",
      type: "LIVE MENSUAL",
      title: "Masterclass: Cómo Construir tu Casa Soñada sin Errores Costosos",
      description: "Estrategias probadas para planificar, diseñar y construir tu casa perfecta en Santiago",
      nextDate: "Sábado 15 Febrero, 10:00 AM",
      duration: "90 minutos",
      attendees: "250+ familias",
      rating: "4.9/5",
      price: "GRATIS",
      urgency: "Solo 50 cupos disponibles",
      color: "bg-red-600",
      benefits: [
        "Los 5 errores más costosos (que te pueden costar +$500.000)",
        "Fórmula exacta para calcular presupuesto real",
        "3 casos reales: De idea a casa terminada",
        "Q&A en vivo con arquitecto experto",
        "BONUS: Kit de planificación valorado en $200.000"
      ],
      socialProof: "\"Este webinar me ahorró $800.000 en mi proyecto\" - María José, Las Condes"
    },
    {
      id: "automated_funnel",
      type: "AUTOMATIZADO 24/7",
      title: "Secretos de Arquitectura: De Terreno Vacío a Casa Lista",
      description: "Proceso completo revelado paso a paso con casos reales",
      nextDate: "Disponible AHORA",
      duration: "60 minutos",
      attendees: "1,200+ vistas",
      rating: "4.8/5", 
      price: "GRATIS",
      urgency: "Acceso por tiempo limitado",
      color: "bg-blue-600",
      benefits: [
        "Timeline realista: Cuánto demora realmente cada etapa",
        "Presupuesto detallado con costos ocultos revelados",
        "Permisos y trámites: La guía definitiva",
        "Antes y después: 10 transformaciones reales",
        "BONUS: Acceso a plantillas 3D exclusivas"
      ],
      socialProof: "\"Información que no encuentras en ningún otro lado\" - Carlos M., Providencia"
    }
  ];

  const webinarStats = [
    {
      metric: "1,450+",
      label: "Familias Educadas",
      description: "en nuestros webinarios",
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      metric: "87%",
      label: "Tasa de Asistencia",
      description: "vs 23% promedio industria",
      icon: <Calendar className="w-6 h-6 text-green-600" />
    },
    {
      metric: "43%",
      label: "Conversión a Cliente",
      description: "de asistentes a webinar",
      icon: <Star className="w-6 h-6 text-purple-600" />
    },
    {
      metric: "4.9/5",
      label: "Satisfacción",
      description: "calificación promedio",
      icon: <CheckCircle className="w-6 h-6 text-yellow-600" />
    }
  ];

  const handleWebinarRegistration = (webinarId: string) => {
    if (!email) {
      alert("Por favor ingresa tu email para registrarte al webinar");
      return;
    }
    
    setSelectedWebinar(webinarId);
    
    // Aquí se integraría con WebinarKit
    console.log(`Registering ${email} for webinar: ${webinarId}`);
    
    // Simular registro exitoso
    setTimeout(() => {
      alert("¡Registro exitoso! Te enviamos los detalles de acceso a tu email.");
      setSelectedWebinar(null);
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-bold text-sm mb-6">
            <PlayCircle className="w-5 h-5 mr-2" />
            WEBINARIOS EXCLUSIVOS POWERED BY WEBINARKIT
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Aprende Directamente del Arquitecto Experto
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
            Masterclasses en vivo y automatizadas donde revelamos exactamente cómo construir 
            tu casa perfecta sin errores costosos ni dolores de cabeza.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {webinarStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.metric}
                </div>
                <div className="text-sm font-medium text-gray-700">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Webinar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {webinars.map((webinar) => (
            <Card key={webinar.id} className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-t-4 border-t-primary overflow-hidden">
              {/* Type badge */}
              <div className={`${webinar.color} text-white px-4 py-2 text-center font-bold text-sm`}>
                {webinar.type}
              </div>

              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold mb-3 leading-tight">
                      {webinar.title}
                    </CardTitle>
                    <p className="text-gray-600 mb-4">
                      {webinar.description}
                    </p>
                  </div>
                </div>
                
                {/* Webinar details */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">{webinar.nextDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span>{webinar.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span>{webinar.attendees}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{webinar.rating}</span>
                  </div>
                </div>

                {/* Urgency */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                  <p className="text-sm font-medium text-yellow-800">
                    ⚠️ {webinar.urgency}
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="font-bold text-lg mb-3">Lo que aprenderás:</h4>
                  <div className="space-y-2">
                    {webinar.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social proof */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm italic text-blue-800 mb-2">
                    {webinar.socialProof}
                  </p>
                </div>

                {/* Registration */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`email-${webinar.id}`} className="text-sm font-medium">
                      Reserva tu cupo GRATIS:
                    </Label>
                    <Input
                      id={`email-${webinar.id}`}
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <Button
                    onClick={() => handleWebinarRegistration(webinar.id)}
                    disabled={selectedWebinar === webinar.id}
                    className={`w-full ${webinar.color} hover:opacity-90 text-white font-bold py-4 text-lg transition-all duration-200 transform hover:scale-105`}
                  >
                    {selectedWebinar === webinar.id ? (
                      <div className="flex items-center justify-center">
                        <Clock className="w-5 h-5 mr-2 animate-spin" />
                        Registrando...
                      </div>
                    ) : (
                      <>
                        <Gift className="w-5 h-5 mr-2" />
                        RESERVAR CUPO GRATIS
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    ✓ Acceso completamente gratuito ✓ Sin compromiso ✓ Certificado de participación
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Value proposition */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8 text-center mb-16">
          <h3 className="text-3xl font-bold mb-6">
            ¿Por Qué Estos Webinarios Son Diferentes?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <PlayCircle className="w-12 h-12 mx-auto mb-4" />
                <h4 className="font-bold text-xl mb-3">Contenido Real</h4>
                <p className="text-sm opacity-90">
                  Casos reales, números reales, problemas reales y soluciones probadas. 
                  Nada de teoría genérica.
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <h4 className="font-bold text-xl mb-3">Interacción Directa</h4>
                <p className="text-sm opacity-90">
                  Q&A en vivo donde puedes hacer preguntas específicas sobre tu proyecto.
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Gift className="w-12 h-12 mx-auto mb-4" />
                <h4 className="font-bold text-xl mb-3">Recursos Exclusivos</h4>
                <p className="text-sm opacity-90">
                  Plantillas, checklists y herramientas que solo compartimos en los webinarios.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-400 text-black px-8 py-4 rounded-lg inline-block">
            <div className="text-lg font-bold mb-1">
              Valor Total de Recursos: $500.000
            </div>
            <div className="text-sm opacity-75">
              Tu acceso: Completamente GRATIS
            </div>
          </div>
        </div>

        {/* Alternative CTA */}
        <div className="text-center">
          <div className="bg-white border-2 border-primary rounded-2xl p-8 inline-block max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Prefieres Hablar Directamente?
            </h3>
            <p className="text-gray-600 mb-6">
              Si tienes un proyecto específico en mente, agenda una consulta personalizada 
              en lugar de esperar al webinar.
            </p>
            <Button 
              onClick={() => {
                const element = document.getElementById('contacto');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              AGENDAR CONSULTA PERSONALIZADA
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              Consulta gratuita • 15 minutos • Sin compromiso
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}