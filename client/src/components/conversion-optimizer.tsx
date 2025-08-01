import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, Target, Zap, Award, ArrowRight, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface ConversionStats {
  totalVisitors: number;
  totalLeads: number;
  conversionRate: number;
  avgTimeOnPage: string;
  topPerformingService: string;
  monthlyGrowth: number;
}

export default function ConversionOptimizer() {
  const [stats, setStats] = useState<ConversionStats>({
    totalVisitors: 0,
    totalLeads: 0,
    conversionRate: 0,
    avgTimeOnPage: "00:00",
    topPerformingService: "Arquitecto a Domicilio",
    monthlyGrowth: 0
  });
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simular carga de estadísticas (en producción vendría de API)
    const loadStats = () => {
      setStats({
        totalVisitors: 12847,
        totalLeads: 3234,
        conversionRate: 25.2,
        avgTimeOnPage: "04:32",
        topPerformingService: "Revisor Independiente",
        monthlyGrowth: 89
      });
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
      loadStats();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const conversionTriggers = [
    {
      id: "social-proof",
      title: "Prueba Social en Tiempo Real",
      description: "4.9 estrellas • 29+ proyectos completados este mes",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: "urgency",
      title: "Disponibilidad Limitada",
      description: "Solo 3 cupos disponibles en febrero 2025",
      icon: Clock,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      id: "authority",
      title: "Certificación Oficial",
      description: "ROL MINVU 00237-13 • Universidad de Chile",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: "results",
      title: "Resultados Garantizados",
      description: "100% de proyectos aprobados en primer intento",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  const optimizationFeatures = [
    "Behavioral Triggers: Personalización automática basada en acciones del usuario",
    "A/B Testing: Optimización continua de headlines y CTAs",
    "Exit-Intent Technology: Recuperación de visitantes antes de abandonar",
    "Mobile-First Design: 85% del tráfico viene desde dispositivos móviles",
    "Speed Optimization: Carga en menos de 2 segundos para máxima conversión",
    "Trust Signals: Certificaciones y testimoniales estratégicamente ubicados"
  ];

  if (!isVisible) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-accent text-black px-4 py-2 text-lg font-bold mb-4">
            Sistema de Conversión Optimizado
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Tecnología que Convierte Visitantes en Clientes
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Usando las metodologías de <strong>Alex Hormozi, Russell Brunson y Vilma Núñez</strong> 
            para maximizar cada visita a tu sitio web
          </p>
        </div>

        {/* Estadísticas en Tiempo Real */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <TrendingUp className="w-8 h-8 text-accent" />
                <Badge className="bg-green-600">+{stats.monthlyGrowth}%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{stats.totalVisitors.toLocaleString()}</div>
              <p className="text-gray-300">Visitantes este mes</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Users className="w-8 h-8 text-accent" />
                <Badge className="bg-blue-600">Calificados</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{stats.totalLeads.toLocaleString()}</div>
              <p className="text-gray-300">Leads generados</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Zap className="w-8 h-8 text-accent" />
                <Badge className="bg-purple-600">Optimizado</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{stats.conversionRate}%</div>
              <p className="text-gray-300">Tasa de conversión</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Clock className="w-8 h-8 text-accent" />
                <Badge className="bg-orange-600">Engagement</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{stats.avgTimeOnPage}</div>
              <p className="text-gray-300">Tiempo promedio</p>
            </CardContent>
          </Card>
        </div>

        {/* Conversion Triggers */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Disparadores Psicológicos de Conversión
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conversionTriggers.map((trigger) => {
              const IconComponent = trigger.icon;
              
              return (
                <Card key={trigger.id} className="bg-white text-black hover:scale-105 transition-transform duration-300">
                  <CardHeader className={`${trigger.bgColor} rounded-t-lg`}>
                    <IconComponent className={`w-8 h-8 ${trigger.color} mb-2`} />
                    <CardTitle className="text-lg">{trigger.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-600">{trigger.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Optimización Features */}
        <div className="mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-3xl font-bold mb-8 text-center">
              Sistema de Optimización Continua
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {optimizationFeatures.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              ¿Listo para Maximizar tu Conversión?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Este mismo sistema ha generado <strong>+252% de conversión</strong> comparado con sitios web tradicionales
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => {
                  const contactSection = document.getElementById('contacto');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-accent hover:bg-yellow-600 text-black px-8 py-4 text-lg font-bold"
              >
                Implementar en Mi Negocio
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                onClick={() => window.open('https://api.whatsapp.com/send?phone=56979316827&text=Quiero%20saber%20más%20sobre%20el%20sistema%20de%20conversión', '_blank')}
                className="bg-white/20 hover:bg-white/30 text-white border-2 border-white px-8 py-4 text-lg font-bold"
              >
                Consultar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}