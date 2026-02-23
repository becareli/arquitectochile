import { Quote, Star, CheckCircle } from "lucide-react";

export default function SocialProof() {
  const testimonials = [
    {
      id: 1,
      name: "María y Carlos",
      location: "Santiago",
      quote: "Trabajar con el equipo de ArquitectoChile fue una experiencia muy positiva. Desde el diseño en 3D hasta los trámites legales, todo fue profesional. Hoy disfrutamos de un hogar que refleja lo que queríamos.",
      highlight: "Experiencia integral"
    },
    {
      id: 2,
      name: "Pedro",
      location: "Las Condes",
      quote: "Lo que más valoré fue la tranquilidad de saber que todo estaba en manos de profesionales. La gestión de permisos fue impecable.",
      highlight: "Tranquilidad total"
    },
    {
      id: 3,
      name: "Ana y Tomás",
      location: "Vitacura",
      quote: "Gracias a su gestión de permisos y asesoramiento, evitamos problemas con la municipalidad. El diseño final superó nuestras expectativas.",
      highlight: "Gestión profesional"
    }
  ];

  const stats = [
    { number: "26+", label: "Años de Experiencia" },
    { number: "4.9", label: "Google Reviews" },
    { number: "100+", label: "Proyectos Realizados" },
  ];

  return (
    <section className="bg-white section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">
            Trayectoria
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-4">
            Experiencia que Respalda
          </h2>
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            Lo que nuestros clientes dicen sobre trabajar con nosotros.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-16 max-w-md mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-[#1e293b]">{stat.number}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="border border-gray-200 rounded-md p-6 hover:shadow-lg transition-all duration-300">
              <Quote className="w-5 h-5 text-gray-300 mb-4" strokeWidth={1.5} />
              <p className="text-sm text-gray-600 mb-5 leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-sm font-semibold text-[#1e293b]">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
                <div className="flex text-[#f97316]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
