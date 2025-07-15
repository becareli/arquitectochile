import { Home, Shield, Snowflake, Compass, Thermometer, Tags, Box, FileText, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Services() {
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
      id: "revisor-independiente",
      title: "Revisor Independiente",
      description: "Informe favorable para tu proyecto",
      icon: Shield,
      bgColor: "bg-white"
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
      title: "Diseña tu Espacio",
      description: "Diseño arquitectónico profesional",
      icon: Compass,
      bgColor: "bg-white"
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
    // Scroll to contact section
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
                <Card key={service.id} className={`${service.bgColor} text-white md:col-span-2 lg:col-span-1 transform hover:scale-105 transition-transform duration-300`}>
                  <CardHeader className="text-center">
                    <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="text-white text-2xl" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-2">{service.title}</CardTitle>
                    <div className="text-3xl font-bold mb-2">{service.price}</div>
                    <p className="opacity-90">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features?.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      onClick={() => handleServiceClick(service.id)}
                      className="w-full bg-white text-accent font-semibold hover:bg-gray-50"
                    >
                      Agendar Visita
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
