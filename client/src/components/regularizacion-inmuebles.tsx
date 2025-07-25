import { BadgeCheck, Home, FileText, CheckCircle, TrendingUp, Clock, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RegularizacionInmuebles() {
  const benefits = [
    {
      icon: BadgeCheck,
      title: "Permiso + Recepción Simultáneos",
      description: "Obtienes ambos documentos en un solo proceso, ahorrando tiempo y dinero"
    },
    {
      icon: TrendingUp,
      title: "Mejor Valor Comercial",
      description: "Tu propiedad alcanza su máximo precio de venta al estar 100% legal"
    },
    {
      icon: Clock,
      title: "Proceso Eficiente",
      description: "Evitas los largos trámites separados y complicaciones burocráticas"
    },
    {
      icon: Award,
      title: "Cumplimiento Total",
      description: "Garantizamos el cumplimiento de todas las normativas vigentes"
    }
  ];

  const handleContactClick = () => {
    window.open("https://wa.me/56979316827?text=Hola%20Patricio%2C%20me%20interesa%20conocer%20más%20sobre%20la%20Regularización%20de%20Inmuebles%20(Ley%20del%20Mono)", '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
            <BadgeCheck className="w-4 h-4 mr-2" />
            SERVICIO ESPECIALIZADO
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Regularización de Inmuebles
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            La solución definitiva para propiedades sin permisos
          </p>
          <p className="text-lg text-green-700 font-semibold">
            Conocida como "Ley del Mono" - Permiso de Edificación + Recepción Final simultáneos
          </p>
        </div>

        {/* Main Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Tienes una construcción sin permisos?
            </h3>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                <strong>No te preocupes.</strong> Con nuestro servicio especializado en Regularización de Inmuebles, 
                convertimos tu propiedad irregular en una inversión completamente legal y vendible.
              </p>
              <p>
                A diferencia del proceso tradicional que requiere dos trámites separados, nosotros gestionamos 
                <strong> el Permiso de Edificación y la Recepción Final de forma simultánea</strong>, 
                ahorrándote tiempo, dinero y dolores de cabeza.
              </p>
              <p className="text-green-700 font-semibold">
                ✓ Ideal para vender tu propiedad al mejor precio del mercado
              </p>
            </div>
          </div>
          
          <Card className="bg-white shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <CardTitle className="text-center text-2xl">
                ¿Por qué elegir nuestro servicio?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Aumenta el valor comercial hasta un 30%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Proceso 50% más rápido que métodos tradicionales</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Experiencia de 26+ años en regularizaciones</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Garantía de cumplimiento normativo completo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            ¿Listo para regularizar tu propiedad?
          </h3>
          <p className="text-xl mb-6 opacity-90">
            Consulta gratuita para evaluar tu caso específico
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleContactClick}
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
            >
              📞 Consulta Gratuita por WhatsApp
            </Button>
            <Button 
              onClick={() => {
                const contactSection = document.getElementById('contacto');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 font-semibold px-8 py-3 text-lg"
            >
              Más Información
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}