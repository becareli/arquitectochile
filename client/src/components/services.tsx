import { Home, Shield, Search, Calculator, Merge, MapPin, BadgeCheck, FileText, Box, Briefcase, Scale, Building2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  accentColor: string;
  accentBg: string;
  borderColor: string;
  buttonClass: string;
  icon: typeof Home;
  services: SubService[];
};

export default function Services() {
  const [, setLocation] = useLocation();

  const pillars: Pillar[] = [
    {
      id: "vivienda",
      title: "Vivienda de Alto Estándar",
      subtitle: "Arquitectura residencial personalizada, asesoría en terreno, inspecciones y tasaciones profesionales",
      accentColor: "text-orange-600",
      accentBg: "bg-orange-50",
      borderColor: "border-orange-200",
      buttonClass: "bg-orange-500 text-white hover:bg-orange-600",
      icon: Home,
      services: [
        { id: "arquitecto-domicilio", title: "Arquitecto a Domicilio", price: "$45.000", route: "/asesoria-arquitectonica-terreno", icon: Home },
        { id: "disena-espacio", title: "Diseño de Nuevos Espacios y 3D", price: "Desde $2.490.000", route: "/disenemos-tus-nuevos-espacios", icon: Home },
        { id: "inspeccion-tecnica-viviendas", title: "Inspección Técnica de Viviendas", price: "Desde $180.000", route: "/inspeccion-tecnica-viviendas", icon: Search },
        { id: "tasacion-viviendas-urbanas", title: "Tasación de Viviendas Urbanas", price: "Consultar", route: "/tasacion-viviendas-urbanas", icon: Calculator },
      ],
    },
    {
      id: "normativa",
      title: "Gestión Normativa",
      subtitle: "Fusión, subdivisión, regularización y permisos — respaldo técnico ante DOM, SII y CBR",
      accentColor: "text-blue-600",
      accentBg: "bg-blue-50",
      borderColor: "border-blue-200",
      buttonClass: "bg-blue-600 text-white hover:bg-blue-700",
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
      subtitle: "Gestión de proyectos, permisos y obras menores para empresas, retail e instituciones",
      accentColor: "text-emerald-600",
      accentBg: "bg-emerald-50",
      borderColor: "border-emerald-200",
      buttonClass: "bg-emerald-600 text-white hover:bg-emerald-700",
      icon: Building2,
      services: [
        { id: "obras-menores-empresas", title: "Obras Menores para Empresas", price: "Consultar", route: "/obras-menores-empresas", icon: Box },
        { id: "gestion-proyectos", title: "Gestión Integral de Proyectos", price: "Consultar", route: "/contacto", icon: Briefcase },
      ],
    },
  ];

  return (
    <section id="servicios" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[hsl(210,15%,30%)] mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Tres unidades especializadas para cubrir todas sus necesidades de arquitectura, normativa y gestión empresarial
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const PillarIcon = pillar.icon;
            const isOpen = expanded === pillar.id;
            return (
              <Card
                key={pillar.id}
                className={`relative overflow-hidden border-2 ${pillar.borderColor} bg-white hover:shadow-xl transition-all duration-300 flex flex-col`}
              >
                <div className={`${pillar.accentBg} px-6 pt-8 pb-6`}>
                  <div className={`w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-5 ${pillar.accentColor}`}>
                    <PillarIcon className="w-7 h-7" />
                  </div>
                  <h3 className={`font-serif text-2xl font-bold ${pillar.accentColor} mb-2`}>
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {pillar.subtitle}
                  </p>
                </div>

                <CardContent className="flex-1 flex flex-col px-6 py-6">
                  <ul className="space-y-0 flex-1">
                    {pillar.services.map((svc, idx) => {
                      const SvcIcon = svc.icon;
                      return (
                        <li key={svc.id}>
                          <button
                            onClick={() => setLocation(svc.route)}
                            className="w-full flex items-center gap-3 py-3.5 text-left group hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors"
                          >
                            <SvcIcon className={`w-5 h-5 flex-shrink-0 ${pillar.accentColor} opacity-70`} />
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 block leading-tight">
                                {svc.title}
                              </span>
                              <span className="text-xs text-gray-500 mt-0.5 block">{svc.price}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 flex-shrink-0 transition-colors" />
                          </button>
                          {idx < pillar.services.length - 1 && <div className="border-b border-gray-100" />}
                        </li>
                      );
                    })}
                  </ul>

                  <Button
                    onClick={() => setLocation("/contacto")}
                    className={`w-full mt-6 font-semibold ${pillar.buttonClass}`}
                  >
                    Solicitar Información
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
