import { AlertTriangle, DollarSign, Clock, Users, Shield, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ObjectionHandling() {
  // Objeciones comunes basadas en el documento de Arquiboost
  const objections = [
    {
      id: 1,
      icon: <DollarSign className="w-6 h-6 text-red-500" />,
      objection: "Es demasiado caro",
      response: "Entiendo que parezca caro ahora. ¿Pero cuánto vale para ti tener la casa de tus sueños con total seguridad legal? Nos centramos en dar el mejor resultado, no el precio más bajo.",
      category: "Precio"
    },
    {
      id: 2,
      icon: <Clock className="w-6 h-6 text-yellow-500" />,
      objection: "Necesito tiempo para pensarlo",
      response: "¿No estás interesado o no estás seguro? Si es para ti y te ayudamos, ¿qué específicamente necesitas pensar que no hayamos discutido hoy?",
      category: "Tiempo"
    },
    {
      id: 3,
      icon: <Users className="w-6 h-6 text-blue-500" />,
      objection: "Debo consultar con mi pareja",
      response: "¿Estás diciendo que estás dentro y solo necesitas el 'ok' de tu pareja? Perfecto. Pongamos a tu pareja al teléfono ahora mismo.",
      category: "Decisión"
    },
    {
      id: 4,
      icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
      objection: "No es buen momento",
      response: "¿Cuándo será un buen momento para que empieces a priorizar las cosas que dijiste que necesitas? Hoy siempre será el mejor momento.",
      category: "Timing"
    }
  ];

  const guarantees = [
    {
      title: "Compromiso de Diseño",
      description: "Revisiones ilimitadas hasta que ames tu diseño 3D",
      icon: <CheckCircle className="w-8 h-8 text-green-600" />
    },
    {
      title: "Gestión Legal Profesional",
      description: "Tramitamos todos los permisos con el respaldo de más de 26 años de experiencia",
      icon: <Shield className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Compromiso de Plazos",
      description: "Nos comprometemos con los plazos acordados y comunicamos avances constantemente",
      icon: <Clock className="w-8 h-8 text-purple-600" />
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con urgencia (Alex Hormozi style) */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¿Aún Tienes Dudas? Te Entendemos Perfectamente
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Estas son las preguntas que nos hacen el 95% de las familias antes de decidirse. 
            Te damos respuestas honestas porque queremos que tomes la mejor decisión.
          </p>
          
          {/* Urgencia y escasez */}
          <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg max-w-2xl mx-auto">
            <p className="text-red-800 font-semibold">
              ⚠️ IMPORTANTE: Solo trabajamos con 3 familias por mes para asegurar atención dedicada. 
              Quedan 1 cupos disponibles para inicio inmediato.
            </p>
          </div>
        </div>

        {/* Objeciones comunes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {objections.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <div>
                    <CardTitle className="text-lg text-red-600">
                      "{item.objection}"
                    </CardTitle>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-medium">
                  {item.response}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Triple Compromiso (Russell Brunson style) */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Triple Compromiso de Tranquilidad
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {guarantee.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {guarantee.title}
                </h4>
                <p className="text-gray-600">
                  {guarantee.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stack de valor (Alex Hormozi $100M Offers) */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white p-8 mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">
            Lo Que Recibes Cuando Decides HOY
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                <span>Diseño 3D personalizado completo (Valor: $800.000)</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                <span>Gestión completa de permisos legales (Valor: $600.000)</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                <span>Acompañamiento hasta entrega final (Valor: $400.000)</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                <span>Revisiones ilimitadas de diseño (Valor: $300.000)</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                <span>Asesoría arquitectónica permanente (Valor: $250.000)</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                <span>Plan de construcción paso a paso (Valor: $200.000)</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                <span>Respaldo legal profesional (Valor: $500.000)</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                <span>🎁 BONUS: Consulta de diseño interior (Valor: $150.000)</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-blue-400">
            <p className="text-xl mb-2">Valor Total: <span className="line-through text-blue-200">$3.200.000</span></p>
            <p className="text-3xl font-bold text-yellow-300">Tu Precio HOY: $1.800.000</p>
            <p className="text-lg text-blue-100 mt-2">Ahorras $1.400.000 si decides ahora</p>
          </div>
        </div>

        {/* CTA final con urgencia */}
        <div className="text-center bg-yellow-100 border-2 border-yellow-400 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Esta Oferta Desaparece en 24 Horas
          </h3>
          <p className="text-gray-700 mb-6">
            No podemos mantener estos precios especiales indefinidamente. 
            Si no actúas hoy, volverás a pagar el precio regular de $3.200.000.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={() => { window.location.href = '/contacto'; }}
              className="bg-red-600 text-white px-10 py-4 rounded-lg text-xl font-bold hover:bg-red-700 transition-colors shadow-lg block w-full md:w-auto md:inline-block"
            >
              SÍ, QUIERO MI CASA SOÑADA POR $1.800.000
            </button>
            
            <p className="text-sm text-gray-600">
              ✓ Sin compromisos ocultos ✓ Respaldo profesional ✓ Inicio inmediato
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}