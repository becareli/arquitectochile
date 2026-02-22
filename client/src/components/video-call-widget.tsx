import { Video, Calendar, Clock, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VideoCallWidget() {
  const handleBookCall = () => {
    window.open('https://tidycal.com/arquitectopatriciobecar/asesoria-de-arquitectura-y-construccion-gratuita', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full mb-6">
            <Video className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-dark mb-4">Videollamada de Asesoría</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Agenda una asesoría de 30 minutos para discutir tu proyecto de construcción o remodelación
          </p>
        </div>

        <Card className="bg-white shadow-xl border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Asesoría Profesional</h3>
                <p className="text-blue-100">Arquitectura y Construcción</p>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                <Gift className="w-5 h-5" />
                <span className="font-semibold">GRATIS</span>
              </div>
            </div>
          </div>

          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Benefits */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-dark mb-4">¿Qué incluye?</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium text-dark">Evaluación de viabilidad</p>
                      <p className="text-gray-600 text-sm">Análisis inicial de tu proyecto</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium text-dark">Orientación normativa</p>
                      <p className="text-gray-600 text-sm">Guía sobre permisos y regulaciones</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium text-dark">Estimación de costos</p>
                      <p className="text-gray-600 text-sm">Presupuesto aproximado del proyecto</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium text-dark">Plan de acción</p>
                      <p className="text-gray-600 text-sm">Próximos pasos recomendados</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-dark mb-4">Detalles de la sesión</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-dark">Duración: 30 minutos</p>
                      <p className="text-gray-600 text-sm">Tiempo suficiente para evaluar tu proyecto</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Video className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-dark">Modalidad: Online</p>
                      <p className="text-gray-600 text-sm">Desde la comodidad de tu hogar</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-dark">Horarios flexibles</p>
                      <p className="text-gray-600 text-sm">Mañana, tarde o noche</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-600 mb-4">
                    Agenda tu sesión ahora y obtén la orientación profesional que necesitas
                  </p>
                  
                  <Button
                    onClick={handleBookCall}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Agendar Videollamada
                  </Button>
                  
                  <p className="text-xs text-gray-500 mt-3">
                    * Sin compromisos • Asesoría profesional
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">25+ años de experiencia</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">4.9★ en Google Maps</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Arquitecto Universidad de Chile</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}