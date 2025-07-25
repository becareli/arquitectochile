import { Quote, Star, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SocialProof() {
  // VSL-specific testimonials reflecting the exact cases mentioned
  const vslTestimonials = [
    {
      id: 1,
      name: "María y Carlos",
      location: "Santiago",
      quote: "Trabajar con el equipo de ArquitectoChile fue una experiencia increíble. Desde el diseño en 3D hasta los trámites legales, todo fue perfecto. Hoy disfrutamos de un hogar que refleja exactamente lo que queríamos.",
      highlight: "Experiencia integral perfecta"
    },
    {
      id: 2,
      name: "Pedro",
      location: "Las Condes",
      quote: "Lo que más valoré fue la tranquilidad de saber que todo estaba en manos de profesionales. Nunca imaginé que diseñar y construir nuestra casa sería tan sencillo.",
      highlight: "Tranquilidad total"
    },
    {
      id: 3,
      name: "Ana y Tomás",
      location: "Vitacura",
      quote: "Gracias a su gestión de permisos y asesoramiento, evitamos muchos problemas legales. El diseño final superó nuestras expectativas.",
      highlight: "Sin problemas legales"
    }
  ];

  const stats = [
    { number: "15+", label: "Años de Experiencia", icon: <CheckCircle className="w-6 h-6 text-primary" /> },
    { number: "100+", label: "Familias Satisfechas", icon: <CheckCircle className="w-6 h-6 text-primary" /> },
    { number: "4.9★", label: "Calificación Google", icon: <Star className="w-6 h-6 text-yellow-500" /> },
    { number: "0", label: "Problemas Legales", icon: <CheckCircle className="w-6 h-6 text-green-600" /> }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestros Clientes Son Nuestra Mejor Carta de Presentación
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estas son algunas de las experiencias de familias que ya han construido 
            la casa de sus sueños con nuestra ayuda
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* VSL Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {vslTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary mb-4" />
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-primary/20">
                  <p className="text-xs font-semibold text-primary">
                    {testimonial.highlight}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ahora tú puedes ser el próximo en transformar tus ideas en un hogar único
          </h3>
          <p className="text-gray-600 mb-6">
            No dejes que las dudas retrasen el inicio del proyecto de tu hogar ideal. 
            Cada día que esperas es una oportunidad perdida.
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
            Empieza Hoy Mismo - Consulta Gratuita
          </button>
        </div>
      </div>
    </section>
  );
}