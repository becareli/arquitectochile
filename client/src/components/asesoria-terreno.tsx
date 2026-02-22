import { MapPin, CheckCircle, Clock, FileText, Calculator, Shield, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AsesoriaTerreno() {
  const handleScheduleVisit = () => {
    window.open('https://tidycal.com/arquitectopatriciobecar/asesoria-de-arquitectura-a-domicilio', '_blank');
  };

  const handleContactClick = () => {
    window.location.href = '/contacto';
  };

  const benefits = [
    {
      icon: MapPin,
      title: "Análisis Profesional en Tu Terreno",
      description: "Revisión completa de tu edificación actual desde el punto de vista normativo y técnico"
    },
    {
      icon: CheckCircle,
      title: "Evaluación de Potencial Real",
      description: "Estudio de tus deseos y certificados previos para determinar las posibilidades exactas de ampliación o remodelación"
    },
    {
      icon: Clock,
      title: "Asesoría Inmediata y Verbal",
      description: "Respuestas y recomendaciones profesionales en el momento de la visita"
    },
    {
      icon: FileText,
      title: "Presupuesto Detallado Posterior",
      description: "Recibes un presupuesto completo de servicios arquitectónicos basado en el análisis en terreno"
    }
  ];

  const whyChoose = [
    "Conoces al arquitecto y su metodología antes de contratar",
    "Eliminas dudas y objeciones directamente en terreno",
    "Obtienes una visión clara y realista de tu proyecto",
    "Inversión mínima para máxima información profesional"
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            SERVICIO PRESENCIAL
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Asesoría Arquitectónica en Terreno
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            El arquitecto va a tu casa por solo $45.000
          </p>
          <p className="text-lg text-green-700 font-semibold">
            Análisis profesional + presupuesto detallado + eliminación de dudas
          </p>
        </div>

        {/* Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Tienes dudas sobre tu proyecto? Te las resuelvo en terreno
            </h3>
            <div className="space-y-4 text-gray-700 mb-8">
              <p className="text-lg">
                <strong>Imagínate tener al arquitecto en tu casa, analizando personalmente</strong> 
                las posibilidades reales de tu ampliación o remodelación, respondiendo todas tus preguntas 
                y eliminando la incertidumbre por solo $45.000.
              </p>
              <p>
                Esta asesoría presencial te permite conocer mi metodología de trabajo, generar confianza 
                mutua y obtener información profesional valiosa antes de tomar cualquier decisión importante.
              </p>
            </div>
            
            <div className="space-y-3 mb-8">
              {whyChoose.map((reason, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{reason}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold">Solo $45.000</h4>
                  <p className="opacity-90">Asesoría completa en tu terreno</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">💰</div>
                  <p className="text-sm opacity-75">Inversión mínima</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleScheduleVisit}
                className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-8 py-4 text-lg"
              >
                📅 Agendar Visita Online
              </Button>
              <Button 
                onClick={handleContactClick}
                className="bg-green-600 text-white hover:bg-green-700 font-semibold px-8 py-4 text-lg"
              >
                Contáctanos
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            ¿Cómo funciona la asesoría?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Agendas Online</h4>
              <p className="text-gray-600">Seleccionas fecha y hora disponible en TidyCal</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Visito tu terreno</h4>
              <p className="text-gray-600">Análisis completo in situ de tu edificación actual</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Asesoría verbal</h4>
              <p className="text-gray-600">Respondo todas tus preguntas en el momento</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Presupuesto</h4>
              <p className="text-gray-600">Recibes presupuesto detallado posterior</p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl font-medium mb-4">
              "La asesoría en terreno me dio la tranquilidad que necesitaba. Patricio me explicó 
              todo claramente y pude conocer su forma de trabajar antes de decidirme. 
              Los $45.000 fueron la mejor inversión para mi proyecto."
            </blockquote>
            <cite className="text-gray-300">
              - Carmen Silva, Las Condes (Ampliación 2024)
            </cite>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Listo para conocer las posibilidades reales de tu proyecto?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Por solo $45.000 obtienes análisis profesional + eliminación de dudas + presupuesto detallado
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleScheduleVisit}
              className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-8 py-4 text-lg"
            >
              📅 Agendar Visita Online
            </Button>
            <Button 
              onClick={handleContactClick}
              className="bg-green-600 text-white hover:bg-green-700 font-semibold px-8 py-4 text-lg"
            >
              Contáctanos
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            🏠 Cobertura: Santiago y alrededores • ⏰ Agendamiento online 24/7 disponible
          </p>
        </div>
      </div>
    </section>
  );
}