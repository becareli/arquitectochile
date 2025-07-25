import { Shield, FileText, CreditCard, Calendar, CheckCircle, Users, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClientPortalCTA() {
  const features = [
    {
      icon: Shield,
      title: "Acceso Controlado y Seguro",
      description: "Accede con tu cuenta de Gmail de forma totalmente segura y privada"
    },
    {
      icon: FileText,
      title: "Todos tus Documentos",
      description: "Planos en PDF listos para construir y especificaciones técnicas completas"
    },
    {
      icon: CreditCard,
      title: "Control de Pagos",
      description: "Historial completo de pagos realizados y pendientes con fechas exactas"
    },
    {
      icon: Calendar,
      title: "Timeline del Proyecto",
      description: "Seguimiento en tiempo real desde contratación hasta finalización"
    }
  ];

  const benefits = [
    "Control total sobre tu proyecto 24/7",
    "Transparencia absoluta en costos y cronograma",
    "Acceso inmediato a todos tus documentos",
    "Comunicación directa con tu arquitecto"
  ];

  const handleDemoAccess = () => {
    // Redirect to client portal
    window.location.href = '/portal-cliente';
  };

  const handleContactArchitect = () => {
    window.open("https://wa.me/56979316827?text=Hola%20Patricio%2C%20me%20interesa%20conocer%20más%20sobre%20el%20Portal%20del%20Cliente%20y%20cómo%20puedo%20tener%20control%20total%20de%20mi%20proyecto", '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
            <Shield className="w-4 h-4 mr-2" />
            TECNOLOGÍA EXCLUSIVA
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Portal del Cliente
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            La plataforma que te da control total sobre tu proyecto
          </p>
          <p className="text-lg text-blue-700 font-semibold">
            Transparencia, control y facilidad en una sola plataforma
          </p>
        </div>

        {/* Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Tu proyecto, bajo tu control
            </h3>
            <div className="space-y-4 text-gray-700 mb-8">
              <p className="text-lg">
                <strong>Imagínate tener acceso 24/7 a toda la información de tu proyecto:</strong> 
                planos actualizados, cronograma en tiempo real, estado de pagos y comunicación directa con tu arquitecto.
              </p>
              <p>
                Nuestra plataforma exclusiva te empodera como cliente, eliminando la incertidumbre 
                y dándote el control que mereces sobre tu inversión más importante.
              </p>
            </div>
            
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleDemoAccess}
                className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-8 py-3"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Ver Demo del Portal
              </Button>
              <Button 
                onClick={handleContactArchitect}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3"
              >
                📞 Consultar por WhatsApp
              </Button>
            </div>
          </div>
          
          <Card className="bg-white shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-center text-xl">
                ¿Qué encontrarás en tu portal?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Differentiation Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Lo que nos diferencia de la competencia
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Mientras otros arquitectos te mantienen en la incertidumbre, nosotros te damos el poder de la información
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-6">
                <Users className="w-8 h-8 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Comunicación Transparente</h4>
                <p className="text-sm opacity-90">Sin sorpresas, sin misterios. Todo al alcance de un clic.</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <Shield className="w-8 h-8 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Tecnología Segura</h4>
                <p className="text-sm opacity-90">Acceso controlado con la seguridad de Google.</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <CheckCircle className="w-8 h-8 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Control Total</h4>
                <p className="text-sm opacity-90">Tu proyecto, tus documentos, tu cronograma. Todo bajo tu control.</p>
              </div>
            </div>
            
            <p className="text-lg font-semibold">
              🚀 Esta es la experiencia que mereces como cliente de ArquitectoChile
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}