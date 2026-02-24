import { Thermometer, FileCheck, Maximize, Home, Building } from "lucide-react";

const specialties = [
  {
    title: "Aislación Térmica (EIFS)",
    description: "Eficiencia energética superior",
    icon: Thermometer,
    route: "/reacondicionamiento-termico-viviendas",
  },
  {
    title: "Regularización Ley del Mono",
    description: "Gestión profesional en la DOM",
    icon: FileCheck,
    route: "/regularizacion-inmuebles",
  },
  {
    title: "Fusión de Terrenos",
    description: "Unión predial y optimización normativa",
    icon: Maximize,
    route: "/fusion-terrenos-urbanos",
  },
  {
    title: "Vivienda de Autor",
    description: "Diseño personalizado Universidad de Chile",
    icon: Home,
    route: "/disenemos-tus-nuevos-espacios",
  },
  {
    title: "Remodelación de Oficinas",
    description: "Soluciones corporativas de alto nivel",
    icon: Building,
    route: "/obras-menores-empresas",
  },
];

const doubledSpecialties = [...specialties, ...specialties];

export default function SpecialtiesCarousel() {
  return (
    <section className="bg-blueprint section-padding overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">
            Especialidades
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
            Ecosistema de Soluciones Técnicas
          </h2>
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            Más de 26 años resolviendo desafíos de arquitectura, normativa y construcción en Chile
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="flex animate-scroll gap-6" style={{ width: "max-content" }}>
          {doubledSpecialties.map((spec, index) => (
            <a
              key={index}
              href={spec.route}
              className="flex-shrink-0 w-[280px] sm:w-[300px] bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 group-hover:border-[#f97316]/30 transition-colors">
                <spec.icon className="w-7 h-7 text-[#0f172a]" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-bold text-[#0f172a] mb-1.5">
                {spec.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {spec.description}
              </p>
              <span className="inline-flex items-center text-xs font-bold text-[#f97316] bg-orange-50 border border-orange-100 rounded px-3 py-1.5 group-hover:bg-[#f97316] group-hover:text-white transition-colors">
                Ver Caso
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
