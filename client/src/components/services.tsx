import { Home, Shield, Snowflake, Compass, Thermometer, Tags, Box, FileText, CheckCircle, BadgeCheck, Merge, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Services() {
  const [, setLocation] = useLocation();
  
  const services = [
    {
      id: "arquitecto-domicilio",
      title: "Arquitecto a Domicilio",
      price: "$40,000",
      description: "Asesoría profesional en tu terreno",
      icon: Home,
      features: [
        "Visita al terreno",
        "Análisis de factibilidad",
        "Recomendaciones expertas",
        "Informe detallado"
      ],
      featured: true,
      bgColor: "bg-gradient-to-br from-accent to-yellow-500"
    },
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
      bgColor: "bg-gradient-to-br from-green-600 to-emerald-500"
    },
    {
      id: "revisor-independiente-de-arquitectura",
      title: "Revisor Independiente",
      price: "Desde $497,000",
      description: "Garantiza aprobación de tu permiso - Certificación MINVU ROL 00237-13",
      icon: Shield,
      features: [
        "🚫 IMPOSIBLE que rechacen tu solicitud",
        "⚡ Aprobación en solo 15 días (vs 60 días)",
        "💰 30% descuento en derechos municipales",
        "⚖️ Respaldo legal garantizado por ley",
        "✅ 26+ años experiencia Universidad Chile",
        "📋 Informe Favorable - documento oficial"
      ],
      featured: true,
      bgColor: "bg-gradient-to-br from-blue-600 to-purple-600",
      urgency: "🔥 EVITA RECHAZOS COSTOSOS",
      legalBacking: "Certificación MINVU N° 369500 Vigente"
    },
    {
      id: "eifs",
      title: "Sistema EIFS",
      description: "Aislación térmica para reducir costos energéticos",
      icon: Snowflake,
      bgColor: "bg-white"
    },
    {
      id: "disena-espacio",
      title: "Diseñemos tus Nuevos Espacios",
      price: "Desde $2.490.000",
      description: "Transformamos tu hogar en el espacio de tus sueños - 26+ años creando hogares únicos",
      icon: Home,
      features: [
        "🎨 Diseño 100% personalizado para TU familia",
        "📐 Planos completos listos para construir",
        "🏠 Optimización de espacios y funcionalidad",
        "💡 Asesoría en materiales y acabados",
        "📱 Visualización 3D de tu futuro hogar",
        "⚡ Proceso colaborativo paso a paso"
      ],
      featured: true,
      bgColor: "bg-gradient-to-br from-purple-600 to-pink-600",
      urgency: "🔥 SOLO 3 PROYECTOS POR MES",
      valueProposition: "El hogar que siempre imaginaste, diseñado específicamente para tu estilo de vida"
    },
    {
      id: "fusion-terrenos-urbanos",
      title: "Fusión de Terrenos Urbanos",
      price: "Desde $890.000",
      description: "Aumenta INSTANTÁNEAMENTE el valor de tu propiedad hasta 30% - Proceso garantizado por ley",
      icon: Merge,
      features: [
        "💰 Aumenta el valor comercial automáticamente",
        "📈 30% más capacidad de construcción por LEY",
        "🏗️ Permite proyectos de mayor envergadura", 
        "🎯 Acceso desde múltiples calles/avenidas",
        "⚡ Proceso completo en 45-60 días",
        "✅ Gestión integral: DOM→SII→CBR"
      ],
      featured: true,
      bgColor: "bg-gradient-to-br from-emerald-600 to-green-700",
      urgency: "🔥 BENEFICIO LEY ART. 63 LIMITADO",
      valueProposition: "La única forma LEGAL de aumentar instantáneamente el valor y capacidad de tu terreno"
    },
    {
      id: "inspeccion-tecnica-viviendas",
      title: "Inspección Técnica de Viviendas",
      price: "Desde $180.000",
      description: "La única forma científica de comprar seguro - Evita reparaciones millonarias ocultas",
      icon: Search,
      features: [
        "🔍 Inspección visual completa por arquitecto",
        "📋 Informe técnico con fotografías y diagnóstico",
        "⚡ Revisión instalaciones, estructura y terminaciones",
        "🌡️ Análisis térmico y eficiencia energética", 
        "💰 Evita costos ocultos de $2-8 millones",
        "⚖️ Respaldo para negociar mejor precio"
      ],
      featured: true,
      bgColor: "bg-gradient-to-br from-blue-800 to-indigo-900",
      urgency: "🔥 SOLO 15 INSPECCIONES POR MES",
      valueProposition: "Transforme la compra más grande de su vida en una decisión científica"
    },
    {
      id: "acondicionamiento-termico",
      title: "Acondicionamiento Térmico",
      description: "Mejora el confort de tu hogar",
      icon: Thermometer,
      bgColor: "bg-white"
    },
    {
      id: "tasacion-propiedades",
      title: "Tasación de Propiedades",
      description: "Conoce el valor real de tu propiedad",
      icon: Tags,
      bgColor: "bg-white"
    },
    {
      id: "estudio-cabidas",
      title: "Estudio de Cabidas",
      description: "Análisis de capacidad de edificación",
      icon: Box,
      bgColor: "bg-white"
    },
    {
      id: "permiso-edificacion",
      title: "Permiso de Edificación",
      description: "Gestión completa de permisos",
      icon: FileText,
      bgColor: "bg-white"
    },
    {
      id: "recepcion-final",
      title: "Recepción Final",
      description: "Legalización de tu proyecto",
      icon: CheckCircle,
      bgColor: "bg-white"
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    // Special handling for services with dedicated pages
    if (serviceId === 'revisor-independiente-de-arquitectura') {
      setLocation('/revisor-independiente-de-arquitectura');
      return;
    }
    
    if (serviceId === 'disena-espacio') {
      setLocation('/disenemos-tus-nuevos-espacios');
      return;
    }
    
    if (serviceId === 'fusion-terrenos-urbanos') {
      setLocation('/fusion-terrenos-urbanos');
      return;
    }
    
    if (serviceId === 'inspeccion-tecnica-viviendas') {
      setLocation('/inspeccion-tecnica-viviendas');
      return;
    }
    
    // Scroll to contact section for other services
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Nuestros Servicios</h2>
          <p className="text-xl text-gray-600">Soluciones completas para tus proyectos de arquitectura y construcción</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            
            if (service.featured) {
              return (
                <Card key={service.id} className={`${service.bgColor} text-white md:col-span-2 lg:col-span-1 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden`}>
                  {/* Urgency Banner for Revisor Independiente */}
                  {service.urgency && (
                    <div className="bg-red-600 text-white text-center py-2 px-4 text-sm font-bold animate-pulse">
                      {service.urgency}
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="text-white text-2xl" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-2">{service.title}</CardTitle>
                    {service.price && (
                      <div className="text-3xl font-bold mb-2">{service.price}</div>
                    )}
                    <p className="opacity-90 text-lg">{service.description}</p>
                    
                    {/* Legal backing for Revisor Independiente */}
                    {service.legalBacking && (
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mt-4">
                        <p className="text-sm font-medium opacity-95">{service.legalBacking}</p>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {service.features?.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      onClick={() => handleServiceClick(service.id)}
                      className={`w-full font-semibold text-lg py-3 ${
                        service.id === 'revisor-independiente-de-arquitectura' 
                          ? 'bg-white text-blue-600 hover:bg-gray-50 border-2 border-white' 
                          : service.id === 'disena-espacio'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : service.id === 'fusion-terrenos-urbanos'
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-white text-accent hover:bg-gray-50'
                      }`}
                    >
                      {service.id === 'revisor-independiente-de-arquitectura' || service.id === 'disena-espacio' || service.id === 'fusion-terrenos-urbanos'
                        ? 'Más Información' 
                        : 'Agendar Visita'
                      }
                    </Button>
                  </CardContent>
                </Card>
              );
            }

            return (
              <Card key={service.id} className={`${service.bgColor} rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <CardHeader className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-primary text-2xl" />
                  </div>
                  <CardTitle className="text-xl font-bold text-dark mb-2">{service.title}</CardTitle>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    onClick={() => handleServiceClick(service.id)}
                    className="w-full bg-primary text-white hover:bg-secondary"
                  >
                    Más Información
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
