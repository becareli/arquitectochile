import type { SEOOptions } from "@/hooks/useSEO";

// Pages that still set their metadata in browser effects need these synchronous
// values so their initial HTML is complete during prerendering.
export const routeSeoFallbacks: Record<string, SEOOptions> = {
  "/": {
    title: "ArquitectoChile.com | Arquitecto Especialista en Santiago - Patricio Becar",
    description:
      "Servicios profesionales de arquitectura en Santiago. Especialista en regularización de inmuebles, reacondicionamiento térmico, construcción y asesoría a domicilio. Arquitecto Universidad de Chile con 26+ años experiencia.",
    path: "/",
  },
  "/servicios-a-domicilio": {
    title: "Servicios de Arquitectura a Domicilio Santiago | Arquitecto en Terreno",
    description:
      "Arquitecto a domicilio en Santiago. Servicios profesionales de arquitectura en su terreno: análisis, asesoría, inspección y presupuestos. Cobertura Santiago y alrededores.",
    path: "/servicios-a-domicilio",
  },
  "/asesoria-arquitectonica-terreno": {
    title: "Asesoría Arquitectónica en Terreno - Arquitecto a Domicilio $45.000 | ArquitectoChile",
    description:
      "Arquitecto a domicilio por $45.000. Asesoría profesional en tu terreno con análisis de factibilidad, recomendaciones expertas y presupuesto de arquitectura detallado.",
    path: "/asesoria-arquitectonica-terreno",
  },
  "/regularizacion-inmuebles": {
    title: "Regularización de Inmuebles Chile - Ley del Mono | ArquitectoChile",
    description:
      "Regularización de inmuebles sin permisos (Ley del Mono). Gestión profesional de Permiso de Edificación y Recepción Final. Especialistas en DOM de La Florida.",
    path: "/regularizacion-inmuebles",
  },
  "/regularizacion-viviendas-la-florida": {
    title: "Regularización de Viviendas La Florida | Ley del Mono | ArquitectoChile",
    description:
      "Regularización de viviendas en La Florida bajo Ley del Mono. Especialistas en la DOM de La Florida con 26+ años de experiencia. Gestión profesional integral.",
    path: "/regularizacion-viviendas-la-florida",
  },
  "/disenemos-tus-nuevos-espacios": {
    title: "Diseño de Nuevos Espacios - Arquitecto Santiago | ArquitectoChile.com",
    description:
      "Transforme su hogar con diseño arquitectónico profesional. Arquitecto especialista en redistribución de espacios, ampliaciones y remodelaciones. Solo 3 proyectos por mes en Santiago.",
    path: "/disenemos-tus-nuevos-espacios",
  },
  "/inspeccion-tecnica-viviendas": {
    title: "Inspección Técnica de Viviendas Chile - Arquitecto Certificado MINVU | $180.000",
    description:
      "Inspección técnica profesional de viviendas en Chile por arquitecto certificado MINVU. Detecta defectos ocultos, filtraciones, problemas eléctricos antes de comprar. Evita reparaciones millonarias por solo $180.000.",
    path: "/inspeccion-tecnica-viviendas",
  },
  "/tasacion-viviendas-urbanas": {
    title: "Tasación de Viviendas Urbanas Chile - Arquitecto Tasador Universidad de Chile",
    description:
      "Tasación profesional de viviendas urbanas por arquitecto con Diplomado Universidad de Chile. Conoce el valor real de tu propiedad. Informe detallado para venta o compra segura.",
    path: "/tasacion-viviendas-urbanas",
  },
  "/reacondicionamiento-termico-viviendas": {
    title: "Reacondicionamiento Térmico de Viviendas Chile - Arquitecto Especialista",
    description:
      "Reacondicionamiento térmico profesional de viviendas en Santiago. Diagnóstico especializado y soluciones para reducir gastos de calefacción hasta 70%. Arquitecto certificado.",
    path: "/reacondicionamiento-termico-viviendas",
  },
  "/sistema-eifs": {
    title: "Sistema EIFS Chile - Aislación Térmica Exterior | ArquitectoChile",
    description:
      "Sistema EIFS: Aislación térmica exterior que reduce hasta 60% los costos de calefacción. Deje de perder dinero en energía. Instalación profesional garantizada.",
    path: "/sistema-eifs",
  },
  "/permiso-edificacion-recepcion-final": {
    title: "Permiso de Edificación y Recepción Final Chile | ArquitectoChile",
    description:
      "Permiso de Edificación y Recepción Final en Chile. Gestión integral DOM con arquitecto certificado. Evita rechazos costosos y legaliza tu construcción en tiempo récord.",
    path: "/permiso-edificacion-recepcion-final",
  },
  "/blog": {
    title: "Blog de Arquitectura | ArquitectoChile.com",
    description:
      "Artículos de arquitectura: regularización, diseño, permisos y construcción en Chile. Conocimiento profesional de ArquitectoChile.com.",
    path: "/blog",
  },
};

export function getRouteSeoFallback(path: string): SEOOptions | undefined {
  return routeSeoFallbacks[path];
}
