import { Shield, CheckCircle, Clock, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Guarantees() {
  const guarantees = [
    {
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      title: "Garantía de Diseño",
      description: "Revisiones y ajustes ilimitados a tus planos en 3D hasta que estés 100% satisfecho.",
      highlight: "Ajustes ilimitados"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Garantía Legal",
      description: "Nos comprometemos a obtener todos los permisos necesarios cumpliendo con las normativas vigentes.",
      highlight: "Cumplimiento legal"
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "Garantía de Entrega",
      description: "Garantizamos cumplir con los plazos acordados o te compensamos cualquier retraso.",
      highlight: "Puntualidad asegurada"
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "Respaldo Profesional",
      description: "Arquitecto titulado y revisor independiente con más de 15 años de experiencia.",
      highlight: "15+ años experiencia"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestras Garantías de Tranquilidad
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Para que tomes esta decisión con total tranquilidad, cada etapa del proyecto 
            estará respaldada por profesionales comprometidos contigo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guarantees.map((guarantee, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-white border-t-4 border-t-primary">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {guarantee.icon}
                </div>
                <CardTitle className="text-xl font-semibold">
                  {guarantee.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/10 rounded-lg p-3 mb-4">
                  <p className="text-sm font-semibold text-primary">
                    {guarantee.highlight}
                  </p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {guarantee.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Con estas garantías tienes la certeza total
            </h3>
            <p className="text-gray-600 mb-6">
              Cada día que pospongas tu decisión, es un día más lejos de la casa que tu familia merece.
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('contacto');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
            >
              Agenda tu Consulta Gratuita Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}