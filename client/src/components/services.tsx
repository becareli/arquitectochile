import { Home, Shield, Search, Calculator, Merge, MapPin, BadgeCheck, FileText, Box, Briefcase, Scale, Building2, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

type SubService = {
  id: string;
  title: string;
  price: string;
  route: string;
  icon: typeof Home;
};

type Pillar = {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  icon: typeof Home;
  services: SubService[];
};

export default function Services() {
  const [, setLocation] = useLocation();

  const pillars: Pillar[] = [
    {
      id: "vivienda",
      title: "Vivienda de Autor",
      subtitle: "Arquitectura residencial personalizada, asesoría en terreno, inspecciones y tasaciones profesionales.",
      icon: Home,
      services: [
        { id: "arquitectura-desde-cero", title: "Arquitectura desde Cero (Diseño de Autor)", price: "Desde $2.490.000", route: "/disenemos-tus-nuevos-espacios", icon: Home },
        { id: "construccion", title: "Construcción y Gestión de Obra", price: "Consultar", route: "/contacto", icon: Box },
        { id: "arquitecto-domicilio", title: "Asesoría a Domicilio", price: "$45.000", route: "/asesoria-arquitectonica-terreno", icon: Search },
        { id: "inspeccion-tecnica-viviendas", title: "Inspección Técnica de Viviendas", price: "Desde $180.000", route: "/inspeccion-tecnica-viviendas", icon: Search },
        { id: "tasacion-viviendas-urbanas", title: "Tasación de Viviendas Urbanas", price: "Consultar", route: "/tasacion-viviendas-urbanas", icon: Calculator },
      ],
    },
    {
      id: "normativa",
      title: "Gestión Normativa",
      subtitle: "Expertos en gestión municipal. Fusión, subdivisión, regularización y permisos ante DOM, SII y CBR.",
      badge: "Recomendado en YouTube",
      icon: Scale,
      services: [
        { id: "fusion-terrenos-urbanos", title: "Fusión de Terrenos Urbanos", price: "Desde $890.000", route: "/fusion-terrenos-urbanos", icon: Merge },
        { id: "subdivision-terrenos-urbanos", title: "Subdivisión de Terrenos Urbanos", price: "Consultar", route: "/subdivision-terrenos-urbanos", icon: MapPin },
        { id: "regularizacion-inmuebles", title: "Regularización de Inmuebles (Ley del Mono)", price: "Consultar", route: "/regularizacion-inmuebles", icon: BadgeCheck },
        { id: "permiso-recepcion", title: "Permiso de Edificación + Recepción Final", price: "Consultar", route: "/permiso-edificacion-recepcion-final", icon: FileText },
        { id: "revisor-independiente", title: "Revisor Independiente de Arquitectura", price: "Desde $497.000", route: "/revisor-independiente-de-arquitectura", icon: Shield },
      ],
    },
    {
      id: "corporativa",
      title: "Consultoría Corporativa",
      subtitle: "Obras menores para empresas, gestión de proyectos y oficina técnica para retail e instituciones.",
      icon: Building2,
      services: [
        { id: "obras-menores-empresas", title: "Obras Menores para Empresas", price: "Consultar", route: "/obras-menores-empresas", icon: Box },
        { id: "gestion-proyectos", title: "Gestión Integral de Proyectos", price: "Consultar", route: "/contacto", icon: Briefcase },
        { id: "oficina-tecnica", title: "Oficina Técnica Externalizada", price: "Consultar", route: "/contacto", icon: Building2 },
      ],
    },
  ];

  return (
    <section id="servicios" className="bg-blueprint section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">
            Oficina Técnica de Arquitectura
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            Tres unidades especializadas para cubrir todas sus necesidades de arquitectura, normativa y gestión empresarial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const PillarIcon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-white border border-gray-200 rounded-md p-8 flex flex-col hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-md border border-gray-200 flex items-center justify-center mb-5">
                    <PillarIcon className="w-5 h-5 text-[#1e293b]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1e293b] mb-2">
                    {pillar.title}
                  </h3>
                  {pillar.badge && (
                    <span className="inline-block bg-orange-50 text-[#f97316] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider mb-2">
                      {pillar.badge}
                    </span>
                  )}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {pillar.subtitle}
                  </p>
                </div>

                <ul className="space-y-0 flex-1">
                  {pillar.services.map((svc, idx) => {
                    const SvcIcon = svc.icon;
                    return (
                      <li key={svc.id}>
                        <button
                          onClick={() => setLocation(svc.route)}
                          className="w-full flex items-center gap-3 py-3 text-left group rounded-md px-2 -mx-2 hover:bg-gray-50 transition-colors"
                        >
                          <SvcIcon className="w-4 h-4 flex-shrink-0 text-gray-400" strokeWidth={1.5} />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-[#1e293b] group-hover:text-[#f97316] block leading-tight transition-colors">
                              {svc.title}
                            </span>
                            <span className="text-xs text-gray-400 mt-0.5 block">{svc.price}</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#f97316] flex-shrink-0 transition-colors" strokeWidth={1.5} />
                        </button>
                        {idx < pillar.services.length - 1 && <div className="border-b border-gray-100" />}
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={() => setLocation("/contacto")}
                  className="mt-6 text-sm font-medium text-[#f97316] hover:text-orange-600 transition-colors text-left flex items-center gap-1.5"
                >
                  Ver más detalles
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
