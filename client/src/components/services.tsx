import { Home, Shield, Snowflake, Thermometer, Box, FileText, CheckCircle, BadgeCheck, Merge, Search, Calculator, MapPin, Building2, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

type Service = {
  id: string;
  title: string;
  price: string;
  description: string;
  icon: typeof Home;
  features: string[];
  featured: boolean;
  path?: string;
  urgency?: string;
  legalBacking?: string;
  valueProposition?: string;
};

type ServiceSection = {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Home;
  accentColor: string;
  buttonClass: string;
  accentBarClass: string;
  services: Service[];
};

function stripLeadingEmoji(text: string): string {
  return text.replace(/^[^\w\dÁÉÍÓÚáéíóúñÑ(]+/, "").trim();
}

export default function Services() {
  const [, setLocation] = useLocation();

  const sections: ServiceSection[] = [
    {
      id: "vivienda-de-autor",
      title: "Vivienda de Autor",
      subtitle: "Arquitectura y construcción residencial — diseño personalizado, confort térmico y asesoría profesional para su hogar",
      icon: Home,
      accentColor: "text-orange-500",
      buttonClass: "bg-orange-500 text-white hover:bg-orange-600",
      accentBarClass: "bg-orange-500",
      services: [
        {
          id: "arquitecto-domicilio",
          title: "Arquitecto a Domicilio",
          price: "$45.000",
          description: "El arquitecto va a tu casa por solo $45.000",
          icon: Home,
          features: [
            "Visita profesional al terreno",
            "Análisis de factibilidad completo",
            "Recomendaciones expertas personalizadas",
            "Presupuesto de arquitectura detallado",
            "Precio puede variar según distancia (base: Vicuña Mackenna Pte. 7730)"
          ],
          featured: true,
          path: "/asesoria-arquitectonica-terreno",
        },
        {
          id: "disena-espacio",
          title: "Diseñemos tus Nuevos Espacios",
          price: "Desde $2.490.000",
          description: "Transformamos tu hogar en el espacio de tus sueños — 26+ años creando hogares únicos",
          icon: Home,
          features: [
            "Diseño 100% personalizado para tu familia",
            "Planos completos listos para construir",
            "Optimización de espacios y funcionalidad",
            "Asesoría en materiales y acabados",
            "Visualización 3D de tu futuro hogar",
            "Proceso colaborativo paso a paso"
          ],
          featured: true,
          urgency: "SOLO 3 PROYECTOS POR MES",
          valueProposition: "El hogar que siempre imaginaste, diseñado específicamente para tu estilo de vida",
        },
        {
          id: "reacondicionamiento-termico",
          title: "Reacondicionamiento Térmico de Viviendas",
          price: "Desde $100.000",
          description: "Diagnóstico térmico profesional para reducir hasta 70% gastos calefacción",
          icon: Thermometer,
          features: [
            "Diagnóstico térmico completo por arquitecto",
            "Informe detallado con recomendaciones",
            "Ahorre hasta 70% en gastos energéticos",
            "Soluciones de aislación profesional",
            "Cumplimiento normativa térmica OGUC",
            "Asesoría especializada certificada"
          ],
          featured: true,
          urgency: "PARE DE QUEMAR DINERO EN CALEFACCION",
          path: "/reacondicionamiento-termico-viviendas",
        },
        {
          id: "eifs",
          title: "Sistema EIFS",
          price: "Desde $1.800.000",
          description: "Aislación térmica exterior que reduce hasta 60% los costos energéticos",
          icon: Snowflake,
          features: [
            "Aislación térmica exterior de última generación",
            "Envuelve y abriga completamente su hogar",
            "Reduce 60% costos calefacción/refrigeración",
            "Temperatura estable todo el año",
            "Impermeable + resistente al clima chileno",
            "Instalación profesional con garantía"
          ],
          featured: true,
          urgency: "PARE DE SUFRIR FRIO/CALOR EXTREMO",
          valueProposition: "El único sistema que abraza su casa completa para máximo confort térmico",
          path: "/sistema-eifs",
        },
        {
          id: "inspeccion-tecnica-viviendas",
          title: "Inspección Técnica de Viviendas",
          price: "Desde $180.000",
          description: "La única forma científica de comprar seguro — Evita reparaciones millonarias ocultas",
          icon: Search,
          features: [
            "Inspección visual completa por arquitecto",
            "Informe técnico con fotografías y diagnóstico",
            "Revisión instalaciones, estructura y terminaciones",
            "Análisis térmico y eficiencia energética",
            "Evita costos ocultos de $2-8 millones",
            "Respaldo para negociar mejor precio"
          ],
          featured: true,
          urgency: "SOLO 15 INSPECCIONES POR MES",
          valueProposition: "Transforme la compra más grande de su vida en una decisión científica",
        },
        {
          id: "tasacion-viviendas-urbanas",
          title: "Tasación de Viviendas Urbanas",
          price: "Consultar",
          description: "Conoce el valor REAL de tu propiedad — Arquitecto con Diplomado U. de Chile",
          icon: Calculator,
          features: [
            "Arquitecto con Diplomado U. de Chile en Tasación",
            "Dossier de Inteligencia Inmobiliaria completo",
            "Análisis comparativo de mercado actualizado",
            "Evaluación técnica de calidad constructiva",
            "Válido para bancos, notarías y tribunales",
            "Evita perder millones en tu negociación"
          ],
          featured: true,
          urgency: "DECISION MILLONARIA REQUIERE CERTEZA",
          valueProposition: "No deje que la duda le cueste millones — Conozca el valor exacto de su propiedad",
        },
      ],
    },
    {
      id: "unidad-tecnica-normativa",
      title: "Unidad Técnica Normativa",
      subtitle: "Regularización, fusión, subdivisión y permisos — gestión profesional ante DOM, SII y CBR con respaldo técnico certificado",
      icon: Scale,
      accentColor: "text-blue-500",
      buttonClass: "bg-blue-600 text-white hover:bg-blue-700",
      accentBarClass: "bg-blue-500",
      services: [
        {
          id: "regularizacion-inmuebles",
          title: "Regularización de Inmuebles",
          price: "Consultar",
          description: "Solución integral para propiedades sin permisos (Ley del Mono)",
          icon: BadgeCheck,
          features: [
            "Permiso de Edificación + Recepción Final simultáneos",
            "Ideal para venta con mejor valor comercial",
            "Cumplimiento normativo completo",
            "Gestión integral del proceso"
          ],
          featured: true,
          path: "/regularizacion-inmuebles",
        },
        {
          id: "fusion-terrenos-urbanos",
          title: "Fusión de Terrenos Urbanos",
          price: "Desde $890.000",
          description: "Aumenta el valor de tu propiedad hasta 30% — Proceso respaldado por normativa vigente",
          icon: Merge,
          features: [
            "Aumenta el valor comercial automáticamente",
            "30% más capacidad de construcción por LEY",
            "Permite proyectos de mayor envergadura",
            "Acceso desde múltiples calles/avenidas",
            "Proceso completo en 45-60 días",
            "Gestión integral: DOM → SII → CBR"
          ],
          featured: true,
          urgency: "BENEFICIO LEY ART. 63 LIMITADO",
          valueProposition: "La única forma LEGAL de aumentar instantáneamente el valor y capacidad de tu terreno",
        },
        {
          id: "subdivision-terrenos-urbanos",
          title: "Subdivisión de Terrenos Urbanos",
          price: "Consultar",
          description: "Multiplique su patrimonio: Convierta 1 terreno en 2+ propiedades independientes",
          icon: MapPin,
          features: [
            "De 1 terreno a múltiples propiedades",
            "Multiplique el valor patrimonial automáticamente",
            "Gestión completa: Proyecto → DOM → CBR",
            "Soluciones especiales para herencias familiares",
            "Análisis de superficie predial mínima",
            "26+ años experiencia en subdivisiones"
          ],
          featured: true,
          urgency: "CAPITAL DORMIDO PIERDE VALOR CADA DIA",
          valueProposition: "Desbloquee el potencial oculto de su terreno sin invertir un peso adicional",
        },
        {
          id: "permiso-recepcion",
          title: "Permiso de Edificación + Recepción Final",
          price: "Consultar",
          description: "Legalice su construcción sin rechazos — Proceso completo DOM",
          icon: FileText,
          features: [
            "Permiso de Edificación con Revisor Independiente MINVU",
            "Aprobación en 15 días (vs 30-60 días normal)",
            "30% descuento derechos municipales por LEY",
            "Recepción Final sin costo adicional DOM",
            "Certificación MINVU ROL 00237-13 vigente",
            "Proceso completo: desde permiso hasta legalización"
          ],
          featured: true,
          urgency: "EVITA RECHAZOS Y MULTAS MILLONARIAS",
          valueProposition: "Servicio integral profesional para aprobación y legalización completa",
          path: "/permiso-edificacion-recepcion-final",
        },
        {
          id: "revisor-independiente-de-arquitectura",
          title: "Revisor Independiente",
          price: "Desde $497,000",
          description: "Revisión profesional de tu proyecto — Certificación MINVU ROL 00237-13",
          icon: Shield,
          features: [
            "Revisión exhaustiva para cumplimiento normativo",
            "Proceso ágil en solo 15 días (vs 60 días)",
            "30% descuento en derechos municipales",
            "Respaldo profesional con certificación MINVU",
            "26+ años experiencia Universidad Chile",
            "Informe Favorable — documento oficial"
          ],
          featured: true,
          urgency: "REVISION PROFESIONAL CERTIFICADA",
          legalBacking: "Certificación MINVU N° 369500 Vigente",
        },
      ],
    },
    {
      id: "consultoria-corporativa",
      title: "Consultoría Corporativa",
      subtitle: "Servicios integrales para empresas — gestión de permisos, coordinación de obras y cumplimiento normativo para proyectos comerciales e industriales",
      icon: Building2,
      accentColor: "text-emerald-500",
      buttonClass: "bg-emerald-600 text-white hover:bg-emerald-700",
      accentBarClass: "bg-emerald-500",
      services: [
        {
          id: "obras-menores-empresas",
          title: "Obras Menores Empresas",
          price: "Consultar",
          description: "Gestión integral para grandes empresas y retail",
          icon: Box,
          features: [
            "Gestión completa de permisos municipales",
            "Coordinación con equipos corporativos",
            "Cumplimiento normativo para locales comerciales",
            "Plazos optimizados para apertura de sucursales"
          ],
          featured: true,
          path: "/obras-menores-empresas",
        },
      ],
    },
  ];

  const handleServiceClick = (serviceId: string) => {
    const routeMap: Record<string, string> = {
      "arquitecto-domicilio": "/asesoria-arquitectonica-terreno",
      "regularizacion-inmuebles": "/regularizacion-inmuebles",
      "revisor-independiente-de-arquitectura": "/revisor-independiente-de-arquitectura",
      "disena-espacio": "/disenemos-tus-nuevos-espacios",
      "fusion-terrenos-urbanos": "/fusion-terrenos-urbanos",
      "inspeccion-tecnica-viviendas": "/inspeccion-tecnica-viviendas",
      "tasacion-viviendas-urbanas": "/tasacion-viviendas-urbanas",
      "subdivision-terrenos-urbanos": "/subdivision-terrenos-urbanos",
      "reacondicionamiento-termico": "/reacondicionamiento-termico-viviendas",
      "eifs": "/sistema-eifs",
      "permiso-recepcion": "/permiso-edificacion-recepcion-final",
      "obras-menores-empresas": "/obras-menores-empresas",
    };

    const route = routeMap[serviceId];
    if (route) {
      setLocation(route);
      return;
    }

    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl font-bold text-[hsl(210,15%,30%)] mb-6">Nuestros Servicios</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Soluciones completas de arquitectura organizadas en tres unidades especializadas</p>
        </div>

        <div className="space-y-20">
          {sections.map((section) => {
            const SectionIcon = section.icon;
            return (
              <div key={section.id} id={section.id}>
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${section.accentColor}`}>
                    <SectionIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-[hsl(210,15%,30%)]">{section.title}</h3>
                </div>
                <p className="text-gray-500 text-lg mb-10 ml-16">{section.subtitle}</p>

                <div className={`grid grid-cols-1 ${section.services.length === 1 ? 'md:grid-cols-1 max-w-lg mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-10`}>
                  {section.services.map((service) => {
                    const IconComponent = service.icon;
                    return (
                      <Card key={service.id} className="bg-slate-900 text-white border border-slate-800 transform hover:scale-105 transition-all duration-300 relative overflow-hidden shadow-xl hover:shadow-2xl flex flex-col">
                        <div className={`h-1 w-full ${section.accentBarClass}`} />

                        {service.urgency && (
                          <div className={`${section.accentBarClass} text-white text-center py-2.5 px-4 text-sm font-semibold`}>
                            {service.urgency}
                          </div>
                        )}

                        <CardHeader className="text-center pb-6">
                          <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <IconComponent className="w-10 h-10 text-white" />
                          </div>
                          <CardTitle className="font-serif text-3xl font-bold mb-3">{service.title}</CardTitle>
                          {service.price && (
                            <div className="text-3xl font-bold mb-2">{service.price}</div>
                          )}
                          <p className="opacity-90 text-lg">{service.description}</p>

                          {service.legalBacking && (
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mt-4">
                              <p className="text-sm font-medium opacity-95">{service.legalBacking}</p>
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="mt-auto">
                          <ul className="space-y-3 mb-6">
                            {service.features.map((feature, index) => (
                              <li key={index} className="flex items-start text-sm">
                                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-slate-400" />
                                <span className="leading-tight text-slate-200">{stripLeadingEmoji(feature)}</span>
                              </li>
                            ))}
                          </ul>

                          <Button
                            onClick={() => handleServiceClick(service.id)}
                            className={`w-full font-semibold text-lg py-3 ${section.buttonClass}`}
                            data-testid={`button-${service.id}`}
                          >
                            {service.id === 'arquitecto-domicilio' ? 'Agendar Visita' : 'Más Información'}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
