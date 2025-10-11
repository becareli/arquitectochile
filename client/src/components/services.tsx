import { Home, Shield, Snowflake, Compass, Thermometer, Tags, Box, FileText, CheckCircle, BadgeCheck, Merge, Search, Calculator, MapPin } from "lucide-react";
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
      bgColor: "bg-gradient-to-br from-[hsl(14,70%,50%)] to-[hsl(14,65%,45%)]"
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
      bgColor: "bg-gradient-to-br from-[hsl(210,15%,30%)] to-[hsl(210,15%,25%)]"
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
      bgColor: "bg-gradient-to-br from-[hsl(210,15%,30%)] to-[hsl(210,20%,35%)]",
      urgency: "🔥 EVITA RECHAZOS COSTOSOS",
      legalBacking: "Certificación MINVU N° 369500 Vigente"
    },
    {
      id: "reacondicionamiento-termico",
      title: "Reacondicionamiento Térmico de Viviendas",
      price: "Desde $100.000",
      description: "Diagnóstico térmico profesional para reducir hasta 70% gastos calefacción",
      icon: Thermometer,
      features: [
        "🏠 Diagnóstico térmico completo por arquitecto",
        "📊 Informe detallado con recomendaciones",
        "💰 Ahorre hasta 70% en gastos energéticos",
        "🏗️ Soluciones de aislación profesional",
        "📋 Cumplimiento normativa térmica OGUC",
        "🛡️ Garantía de asesoría especializada"
      ],
      featured: true,
      bgColor: "bg-gradient-to-br from-[hsl(14,70%,50%)] to-[hsl(25,75%,50%)]",
      urgency: "🔥 PARE DE QUEMAR DINERO EN CALEFACCIÓN",
      path: "/reacondicionamiento-termico-viviendas"
    },
    {
      id: "eifs",
      title: "Sistema EIFS",
      price: "Desde $1.800.000",
      description: "Aislación térmica exterior que reduce hasta 60% los costos energéticos",
      icon: Snowflake,
      features: [
        "❄️ Aislación térmica exterior de última generación",
        "🏠 Envuelve y abrига completamente su hogar",
        "💰 Reduce 60% costos calefacción/refrigeración",
        "🌡️ Temperatura estable todo el año",
        "🛡️ Impermeable + resistente al clima chileno",
        "✅ Instalación profesional con garantía"
      ],
      featured: true,
      bgColor: "bg-gradient-to-br from-[hsl(210,15%,30%)] to-[hsl(210,15%,25%)]",
      urgency: "❄️ PARE DE SUFRIR FRÍO/CALOR EXTREMO",
      valueProposition: "El único sistema que abraza su casa completa para máximo confort térmico",
      path: "/sistema-eifs"
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
      bgColor: "bg-gradient-to-br from-[hsl(14,70%,50%)] to-[hsl(14,80%,55%)]",
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
      bgColor: "bg-gradient-to-br from-[hsl(210,15%,30%)] to-[hsl(210,15%,20%)]",
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
      bgColor: "bg-gradient-to-br from-[hsl(210,15%,25%)] to-[hsl(210,20%,20%)]",
      urgency: "🔥 SOLO 15 INSPECCIONES POR MES",
      valueProposition: "Transforme la compra más grande de su vida en una decisión científica"
    },
    {
      id: "tasacion-viviendas-urbanas",
      title: "Tasación de Viviendas Urbanas",
      price: "Consultar",
      description: "Conoce el valor REAL de tu propiedad - Arquitecto con Diplomado U. de Chile",
      icon: Calculator,
      features: [
        "🎓 Arquitecto con Diplomado U. de Chile en Tasación",
        "📊 Dossier de Inteligencia Inmobiliaria completo",
        "🏘️ Análisis comparativo de mercado actualizado",
        "🔍 Evaluación técnica de calidad constructiva",
        "⚖️ Válido para bancos, notarías y tribunales",
        "💰 Evita perder millones en tu negociación"
      ],
      featured: true,
      bgColor: "bg-gradient-to-br from-[hsl(210,15%,30%)] to-[hsl(210,18%,25%)]",
      urgency: "🔥 DECISIÓN MILLONARIA REQUIERE CERTEZA",
      valueProposition: "No deje que la duda le cueste millones - Conozca el valor exacto de su propiedad"
    },
    {
      id: "subdivision-terrenos-urbanos",
      title: "Subdivisión de Terrenos Urbanos",
      price: "Consultar",
      description: "Multiplique su patrimonio: Convierta 1 terreno en 2+ propiedades independientes",
      icon: MapPin,
      features: [
        "🏡➡️🏡🏡 De 1 terreno a múltiples propiedades",
        "💰 Multiplique el valor patrimonial automáticamente",
        "📋 Gestión completa: Proyecto→DOM→CBR",
        "⚖️ Soluciones especiales para herencias familiares",
        "🎯 Análisis de superficie predial mínima",
        "✅ 26+ años experiencia en subdivisiones"
      ],
      featured: true,
      bgColor: "bg-gradient-to-br from-[hsl(210,15%,28%)] to-[hsl(210,18%,22%)]",
      urgency: "🔥 CAPITAL DORMIDO PIERDE VALOR CADA DÍA",
      valueProposition: "Desbloquee el potencial oculto de su terreno sin invertir un peso adicional"
    },


    {
      id: "permiso-recepcion",
      title: "Permiso de Edificación + Recepción Final",
      price: "Desde $497.000",
      description: "Legalice su construcción sin rechazos - Proceso completo DOM garantizado",
      icon: FileText,
      features: [
        "📋 Permiso de Edificación con Revisor Independiente MINVU",
        "⚡ Aprobación en 15 días (vs 30-60 días normal)",
        "💰 30% descuento derechos municipales por LEY",
        "✅ Recepción Final sin costo adicional DOM",
        "🛡️ Certificación MINVU ROL 00237-13 vigente",
        "🏆 Proceso completo: desde permiso hasta legalización"
      ],
      featured: true,
      bgColor: "bg-gradient-to-br from-[hsl(210,15%,30%)] to-[hsl(210,15%,25%)]",
      urgency: "🚨 EVITA RECHAZOS Y MULTAS MILLONARIAS",
      valueProposition: "El único servicio que garantiza aprobación 100% y legalización completa",
      path: "/permiso-edificacion-recepcion-final"
    },
    {
      id: "estudio-cabidas",
      title: "Estudio de Cabidas",
      description: "Análisis de capacidad de edificación",
      icon: Box,
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
    
    if (serviceId === 'tasacion-viviendas-urbanas') {
      setLocation('/tasacion-viviendas-urbanas');
      return;
    }
    
    if (serviceId === 'subdivision-terrenos-urbanos') {
      setLocation('/subdivision-terrenos-urbanos');
      return;
    }
    
    if (serviceId === 'reacondicionamiento-termico') {
      setLocation('/reacondicionamiento-termico-viviendas');
      return;
    }
    
    if (serviceId === 'eifs') {
      setLocation('/sistema-eifs');
      return;
    }
    
    if (serviceId === 'permiso-recepcion') {
      setLocation('/permiso-edificacion-recepcion-final');
      return;
    }
    
    // Scroll to contact section for other services
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl font-bold text-[hsl(210,15%,30%)] mb-6">Nuestros Servicios</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Soluciones completas para tus proyectos de arquitectura y construcción</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => {
            const IconComponent = service.icon;
            
            if (service.featured) {
              return (
                <Card key={service.id} className={`${service.bgColor} text-white md:col-span-2 lg:col-span-1 transform hover:scale-105 transition-all duration-300 relative overflow-hidden shadow-xl hover:shadow-2xl`}>
                  {/* Urgency Banner */}
                  {service.urgency && (
                    <div className="bg-[hsl(14,70%,50%)] text-white text-center py-2.5 px-4 text-sm font-semibold">
                      {service.urgency}
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-6">
                    <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="text-white text-3xl" />
                    </div>
                    <CardTitle className="font-serif text-3xl font-bold mb-3">{service.title}</CardTitle>
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
                          : service.id === 'eifs'
                          ? 'bg-[hsl(14,70%,50%)] text-white hover:bg-[hsl(14,70%,45%)]'
                          : 'bg-white text-accent hover:bg-gray-50'
                      }`}
                    >
                      {service.id === 'revisor-independiente-de-arquitectura' || service.id === 'disena-espacio' || service.id === 'fusion-terrenos-urbanos' || service.id === 'inspeccion-tecnica-viviendas' || service.id === 'tasacion-viviendas-urbanas' || service.id === 'subdivision-terrenos-urbanos' || service.id === 'eifs' || service.id === 'reacondicionamiento-termico' || service.id === 'permiso-recepcion'
                        ? 'Más Información' 
                        : 'Agendar Visita'
                      }
                    </Button>
                  </CardContent>
                </Card>
              );
            }

            return (
              <Card key={service.id} className={`${service.bgColor} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200`}>
                <CardHeader className="text-center pb-6">
                  <div className="bg-[hsl(210,15%,30%)]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
                    <IconComponent className="text-[hsl(210,15%,30%)] text-3xl" />
                  </div>
                  <CardTitle className="font-serif text-2xl font-bold text-[hsl(210,15%,30%)] mb-3">{service.title}</CardTitle>
                  <p className="text-gray-600 text-base">{service.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    onClick={() => handleServiceClick(service.id)}
                    className="w-full bg-[hsl(210,15%,30%)] text-white hover:bg-[hsl(210,15%,25%)] transition-colors"
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
