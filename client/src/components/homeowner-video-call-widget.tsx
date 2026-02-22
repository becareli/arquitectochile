import { Video, Home, Clock, Gift, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomeownerVideoCallWidget() {
  const handleBookCall = () => {
    window.open('https://tidycal.com/arquitectopatriciobecar/mi-asesoria-de-arquitectura-y-construccion-gratuita', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full mb-6">
            <Home className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-dark mb-4">Asesoría para tu Hogar</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Agenda una videollamada de 30 minutos para planificar la ampliación o remodelación de tu casa
          </p>
        </div>

        <Card className="bg-white shadow-xl border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Asesoría Especializada</h3>
                <p className="text-green-100">Para Dueños de Casa</p>
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
                <h4 className="text-xl font-semibold text-dark mb-4">Perfecto para:</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <Home className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-dark">Ampliaciones de casa</p>
                      <p className="text-gray-600 text-sm">Segundo piso, habitaciones, cocinas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <Users className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-dark">Remodelaciones familiares</p>
                      <p className="text-gray-600 text-sm">Adaptar espacios para la familia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium text-dark">Problemas con vecinos</p>
                      <p className="text-gray-600 text-sm">Construcciones que afectan tu propiedad</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium text-dark">Regularización de obras</p>
                      <p className="text-gray-600 text-sm">Construcciones sin permisos</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">¿Por qué elegir videollamada?</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Puedes mostrar tu casa en tiempo real</li>
                    <li>• Evaluación visual del espacio</li>
                    <li>• Asesoría personalizada y directa</li>
                    <li>• Sin necesidad de visitas iniciales</li>
                  </ul>
                </div>
              </div>

              {/* Call to Action */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-dark mb-4">¿Qué obtendrás?</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium text-dark">Análisis de viabilidad</p>
                      <p className="text-gray-600 text-sm">¿Se puede hacer lo que quieres?</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium text-dark">Orientación de permisos</p>
                      <p className="text-gray-600 text-sm">Qué necesitas para hacer la obra</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium text-dark">Estimación de costos</p>
                      <p className="text-gray-600 text-sm">Presupuesto aproximado del proyecto</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium text-dark">Metodología MDAC</p>
                      <p className="text-gray-600 text-sm">Mi sistema para ampliar sin estrés</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="flex items-center justify-center space-x-4 mb-4 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">30 min</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4" />
                      <span className="text-sm">Online</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Gift className="w-4 h-4" />
                      <span className="text-sm">Gratis</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleBookCall}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Video className="w-5 h-5 mr-2" />
                    Agendar Mi Asesoría
                  </Button>
                  
                  <p className="text-xs text-gray-500 mt-3">
                    * Ideal para dueños de casa • Sin compromisos • Asesoría personalizada
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonial snippet */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M50 2C14.5 2 16.5 4 16.5 6.5C16.5 8.5 15.5 10.2 14 11.2C14.8 11.5 15.5 11.9 16.1 12.4C17.2 13.3 18 14.5 18.5 15.8C18.7 16.3 18.5 16.9 18 17.1C17.5 17.3 16.9 17.1 16.7 16.6C16.3 15.6 15.7 14.7 14.8 14C13.9 13.3 12.9 12.9 11.9 12.9C10.9 12.9 9.9 13.3 9 14C8.1 14.7 7.5 15.6 7.1 16.6C6.9 17.1 6.3 17.3 5.8 17.1C5.3 16.9 5.1 16.3 5.3 15.8C5.8 14.5 6.6 13.3 7.7 12.4C8.3 11.9 9 11.5 9.8 11.2C8.3 10.2 7.3 8.5 7.3 6.5C7.3 4 9.3 2 11.8 2H12ZM5.5 3C6.3 3 7 3.7 7 4.5C7 5.3 6.3 6 5.5 6C4.7 6 4 5.3 4 4.5C4 3.7 4.7 3 5.5 3ZM18.5 3C19.3 3 20 3.7 20 4.5C20 5.3 19.3 6 18.5 6C17.7 6 17 5.3 17 4.5C17 3.7 17.7 3 18.5 3Z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-gray-700 italic">
                "Tengo problemas con la construcción nueva de mi vecino y la asesoría de Patricio fue muy esclarecedora con respecto a lo que afecta mi propiedad. Se tomó el tiempo para responder cada una de mis consultas sin ningún apuro."
              </p>
              <p className="text-sm text-gray-500 mt-2">- Pamela Aguilera, Google Maps</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}