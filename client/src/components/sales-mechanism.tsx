import { Target, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SalesMechanism() {
  // Mecanismo de venta basado en Russell Brunson y Alex Hormozi
  const problems = [
    {
      icon: <AlertCircle className="w-8 h-8 text-red-500" />,
      title: "El Problema Oculto",
      description: "El 87% de las familias que intentan construir o remodelar sin un arquitecto profesional terminan con problemas legales costosos, retrasos de meses y sobrecostos del 40%."
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "La Solución Única",
      description: "Nuestro sistema '3D + Legal + Acompañamiento' es el único en Chile que garantiza tu casa exactamente como la soñaste, sin sorpresas legales ni sobrecostos."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "El Resultado Garantizado",
      description: "100+ familias ya tienen su casa soñada con nosotros. Cero problemas legales. Cero retrasos importantes. Total satisfacción garantizada."
    }
  ];

  const mechanisms = [
    {
      step: "01",
      title: "Diagnóstico Profundo",
      description: "Evaluamos tu terreno, tus necesidades y tu presupuesto real en una consulta de 90 minutos",
      color: "bg-blue-100 text-blue-800"
    },
    {
      step: "02", 
      title: "Diseño 3D Personalizado",
      description: "Creamos tu casa en 3D exactamente como la imaginas, con revisiones ilimitadas",
      color: "bg-green-100 text-green-800"
    },
    {
      step: "03",
      title: "Gestión Legal Completa", 
      description: "Nos encargamos de TODOS los permisos y trámites legales sin que te preocupes",
      color: "bg-purple-100 text-purple-800"
    },
    {
      step: "04",
      title: "Acompañamiento Total",
      description: "Te guiamos paso a paso hasta que tengas las llaves de tu nueva casa",
      color: "bg-orange-100 text-orange-800"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hook de apertura (Russell Brunson style) */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            ¿Por Qué el 87% de las Familias Fallan al Construir Su Casa Soñada?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Después de ayudar a más de 100 familias a construir sus casas, descubrimos el patrón oculto 
            que separa a quienes logran su hogar perfecto de quienes terminan frustrados y con sobrecostos.
          </p>
        </div>

        {/* Problema - Agitación - Solución */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {problems.map((item, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <CardTitle className="text-xl font-bold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* El Mecanismo Único */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestro Sistema "Casa Perfecta" (El Único en Chile)
            </h3>
            <p className="text-xl text-gray-600">
              4 pasos probados que han funcionado para 100+ familias exitosas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mechanisms.map((mechanism, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md relative">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-4 ${mechanism.color}`}>
                  PASO {mechanism.step}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  {mechanism.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {mechanism.description}
                </p>
                
                {/* Arrow connector */}
                {index < mechanisms.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-0.5 bg-gray-300"></div>
                    <div className="w-0 h-0 border-l-4 border-l-gray-300 border-t-2 border-t-transparent border-b-2 border-b-transparent absolute right-0 top-1/2 transform -translate-y-1/2"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Mechanism */}
        <div className="bg-green-50 rounded-lg p-8 mb-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              ¿Por Qué Funciona Nuestro Sistema Cuando Otros Fallan?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">0</div>
                <p className="text-gray-700">Problemas Legales</p>
                <p className="text-sm text-gray-500">En 100+ proyectos</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">97%</div>
                <p className="text-gray-700">Entregados a Tiempo</p>
                <p className="text-sm text-gray-500">Sin retrasos importantes</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">4.9★</div>
                <p className="text-gray-700">Satisfacción Google</p>
                <p className="text-sm text-gray-500">29 reseñas verificadas</p>
              </div>
            </div>

            <p className="text-gray-600 italic">
              "La diferencia está en nuestros 15 años de experiencia y el sistema probado 
              que elimina los errores típicos que cometen otros arquitectos."
            </p>
          </div>
        </div>

        {/* Urgencia y Escasez (Alex Hormozi) */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-red-500 mr-3" />
            <h3 className="text-2xl font-bold text-red-800">
              Solo Trabajamos con 3 Familias por Mes
            </h3>
          </div>
          
          <p className="text-red-700 mb-6 text-lg">
            No es por capricho. Es porque dedicamos 100% de nuestra atención a cada proyecto 
            para garantizar resultados perfectos. <strong>Queda 1 cupo disponible este mes.</strong>
          </p>
          
          <button 
            onClick={() => {
              const element = document.getElementById('contacto');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors shadow-lg"
          >
            Reservar Mi Cupo Ahora - Consulta Gratuita
          </button>
          
          <p className="text-red-600 text-sm mt-4 font-medium">
            ⚠️ Si no actúas hoy, el próximo cupo disponible será en febrero 2025
          </p>
        </div>
      </div>
    </section>
  );
}