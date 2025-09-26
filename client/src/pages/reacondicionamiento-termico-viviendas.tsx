import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Home, Phone, CheckCircle, Star, Shield, Zap, AlertTriangle, 
  ArrowRight, Clock, DollarSign, Users, Award, Eye, Camera,
  FileText, Search, Wrench, ThermometerSun, Building, Mail,
  Target, TrendingUp, TrendingDown, MapPin, CheckSquare, Calculator,
  BarChart3, Clipboard, MessageCircle, Snowflake, Flame, 
  TrendingUpIcon, PiggyBank, HomeIcon
} from "lucide-react";
import Chatbot from "@/components/chatbot";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

// Import generated images for thermal reconditioning service
import thermalInfographicImg from "@assets/generated_images/House_thermal_efficiency_infographic_1c36aeed.png";
import mineralWoolInstallationImg from "@assets/generated_images/Worker_installing_mineral_wool_insulation_7c19536f.png";
import eifsWallSystemImg from "@assets/generated_images/Modern_EIFS_wall_system_09a53a8a.png";
import thermopaneWindowImg from "@assets/generated_images/Thermopane_window_double_glazing_3d79bf11.png";
import architectInspectionImg from "@assets/generated_images/Architect_thermal_inspection_service_fdd26f97.png";
import happyFamilyComfortImg from "@assets/generated_images/Happy_family_comfortable_home_40405dcd.png";

// Import original ArquitectoChile thermal images
import pasosAislacionImg from "@assets/pasos-aislacion-termica2.jpeg";
import pasosReacondicionamientoImg from "@assets/pasos-reacondicionamiento-termico2.jpeg";
import pilaresPresupuestoImg from "@assets/pilares_presupuesto2.png";

export default function ReacondicionamientoTermicoViviendas() {
  const [, setLocation] = useLocation();

  // SEO Meta tags optimization and scroll to top
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    document.title = "Reacondicionamiento Térmico de Viviendas Chile - Arquitecto Especialista";
    
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (meta) {
        meta.content = content;
      } else {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', name);
        } else {
          meta.name = name;
        }
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    setMetaTag('description', 'Reacondicionamiento térmico profesional de viviendas en Santiago. Diagnóstico especializado y soluciones para reducir gastos de calefacción hasta 70%. Arquitecto certificado.');
    setMetaTag('keywords', 'reacondicionamiento térmico chile, aislación térmica vivienda, eficiencia energética casa, arquitecto térmico santiago, aislación techumbre, sistema EIFS, ventanas termopanel');
    setMetaTag('og:title', 'Reacondicionamiento Térmico - Reduzca 70% su Gasto en Calefacción', true);
    setMetaTag('og:description', 'Transforme su casa fría en un hogar confortable. Diagnóstico térmico profesional por arquitecto especialista. Soluciones garantizadas para reducir gastos energéticos.', true);
    setMetaTag('og:type', 'website', true);

    // JSON-LD Schema for better SEO
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Reacondicionamiento Térmico de Viviendas",
      "description": "Servicio especializado de mejora térmica para viviendas con normativas antiguas. Incluye diagnóstico profesional e implementación de soluciones de aislación.",
      "provider": {
        "@type": "Person",
        "name": "Patricio Becar Elissegaray",
        "jobTitle": "Arquitecto Especialista en Eficiencia Térmica",
        "url": "https://arquitectochile.com",
        "telephone": "+56979316827"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Chile"
      },
      "serviceType": "Reacondicionamiento Térmico",
      "offers": {
        "@type": "Offer",
        "name": "Diagnóstico Térmico Profesional",
        "price": "100000",
        "priceCurrency": "CLP",
        "description": "Informe completo de diagnóstico térmico con recomendaciones personalizadas"
      }
    };

    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (script) {
      script.textContent = JSON.stringify(schema);
    } else {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Cleanup function to reset meta tags
    return () => {
      const titleTag = document.querySelector('title');
      if (titleTag) titleTag.textContent = 'ArquitectoChile.com - Servicios de Arquitectura';
    };
  }, []);

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola, me interesa el Diagnóstico Térmico de mi vivienda. Quisiera recibir más información sobre el servicio.");
    window.open(`https://wa.me/56979316827?text=${message}`, '_blank');
  };

  const scrollToContact = () => {
    setLocation('/#contacto');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* 1. Titular Principal - Gary Halbert Style */}
      <section className="bg-gradient-to-br from-red-600 via-orange-600 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="bg-red-700 text-white mb-4 px-4 py-2 text-sm font-bold">
              🔥 PARE DE QUEMAR DINERO EN CALEFACCIÓN
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                DEJE DE GASTAR <span className="text-yellow-400">FORTUNAS</span> EN CALEFACCIÓN
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-100">
                Transforme Su Casa en un Hogar Confortable Todo el Año
              </h2>
              <p className="text-xl mb-8 text-gray-100">
                <strong>¿Su casa es un horno en verano y un congelador en invierno?</strong> 
                No es su culpa, es un problema de construcción que tiene solución.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button onClick={openWhatsApp} size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold">
                  <Phone className="mr-2 h-5 w-5" />
                  CONSULTA GRATUITA
                </Button>
                <Button onClick={scrollToContact} size="lg" variant="outline" className="bg-white/20 text-white border-white hover:bg-white/30">
                  <Calculator className="mr-2 h-5 w-5" />
                  DIAGNÓSTICO TÉRMICO
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={thermalInfographicImg} 
                alt="Infografía de eficiencia térmica mostrando pérdidas de calor"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-black p-3 rounded-lg font-bold text-sm">
                💡 SU CASA PIERDE HASTA 70% DEL CALOR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sección de Héroe y Empatía - Russell Brunson Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            ¿Se Siente Identificado con Esta Situación?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            <strong>¿Su casa es un horno en verano y un congelador en invierno?</strong> 
            ¿Las cuentas de luz o gas se disparan cada temporada? ¿Siente que no importa 
            cuánto gaste en calefacción, su hogar nunca está realmente confortable?
          </p>
          <div className="bg-blue-100 border-l-4 border-blue-500 p-6 rounded-lg">
            <p className="text-lg text-blue-800 font-medium">
              💡 <strong>No es su culpa, es un problema de construcción que tiene solución.</strong> 
              Miles de viviendas en Chile fueron construidas con normativas térmicas antiguas. 
              Pero existe una manera científica de solucionarlo definitivamente.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Video Explicativo */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            📹 DESCUBRA POR QUÉ SU CASA PIERDE TANTO CALOR (Y DINERO)
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            En este video, nuestro arquitecto le explica en 2 minutos por qué su casa pierde tanto calor y cómo puede solucionarlo.
          </p>
          
          <div className="relative rounded-lg overflow-hidden shadow-xl max-w-3xl mx-auto">
            <iframe 
              width="100%" 
              height="400" 
              src="https://www.youtube.com/embed/LxbHRbNXCh4?start=2" 
              title="Reacondicionamiento Térmico de Viviendas - ArquitectoChile"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 4. Agitación del Problema - Alex Hormozi Style */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-700 mb-6">
              ⚠️ EL COSTO REAL DE NO ACTUAR
            </h2>
            <p className="text-xl text-gray-700">
              No vendemos aislación. Vendemos la eliminación definitiva de estos problemas:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-red-500">
                <DollarSign className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Gastos que Nunca Terminan</h3>
                  <p className="text-gray-600">Cuentas de calefacción y aire acondicionado que aumentan cada año sin control</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-orange-500">
                <HomeIcon className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Incomodidad Constante</h3>
                  <p className="text-gray-600">No puede disfrutar de su propio hogar por el frío o calor extremo</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-blue-500">
                <Zap className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Problemas de Humedad</h3>
                  <p className="text-gray-600">Condensación y humedad por cambios bruscos de temperatura</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-purple-500">
                <TrendingDown className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Desvalorización</h3>
                  <p className="text-gray-600">Bajo valor de reventa por la ineficiencia energética de su propiedad</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src={thermalInfographicImg} 
              alt="Casa con pérdidas térmicas en invierno y verano"
              className="rounded-lg shadow-xl w-full"
            />
            <div className="absolute -top-4 -left-4 bg-red-600 text-white p-3 rounded-lg font-bold text-sm">
              ❄️🔥 SU DINERO SE ESCAPA
            </div>
          </div>
        </div>
      </section>

      {/* 5. La Solución Inteligente - Vilma Núñez Style */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              🎯 LA SOLUCIÓN INTELIGENTE: DIAGNOSTICAR ANTES DE ACTUAR
            </h2>
            <p className="text-xl mb-8">
              Antes de invertir en soluciones costosas, necesita un mapa. 
              <strong> Nuestro informe es ese mapa</strong>: una evaluación experta que le dice 
              exactamente dónde está el problema y cuál es la solución más rentable para usted.
            </p>
          </div>

          {/* Información Educativa Técnica */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">📚 GUÍA TÉCNICA: TIPOS DE AISLACIÓN TÉRMICA</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-bold text-yellow-300 mb-2">🧱 EIFS (Sistema EXTERIOR)</h4>
                <p className="text-sm mb-2"><strong>Conductividad:</strong> 0.038 W/mK</p>
                <p className="text-sm mb-2"><strong>Espesor:</strong> 50-100mm</p>
                <p className="text-sm"><strong>Vida útil:</strong> 50+ años</p>
                <p className="text-xs mt-2 text-blue-200">Ideal para fachadas completas</p>
              </div>
              
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-bold text-yellow-300 mb-2">🏠 LANA MINERAL</h4>
                <p className="text-sm mb-2"><strong>Conductividad:</strong> 0.035 W/mK</p>
                <p className="text-sm mb-2"><strong>Espesor:</strong> 80-150mm</p>
                <p className="text-sm"><strong>Vida útil:</strong> 30+ años</p>
                <p className="text-xs mt-2 text-blue-200">Excelente para techumbres</p>
              </div>
              
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-bold text-yellow-300 mb-2">🪟 TERMOPANEL</h4>
                <p className="text-sm mb-2"><strong>Transmitancia:</strong> 1.8-2.8 W/m²K</p>
                <p className="text-sm mb-2"><strong>Aislamiento:</strong> Doble/Triple vidrio</p>
                <p className="text-sm"><strong>Vida útil:</strong> 25+ años</p>
                <p className="text-xs mt-2 text-blue-200">Reduce pérdidas por ventanas</p>
              </div>
            </div>
            
            <div className="border-t border-white/30 pt-6">
              <h4 className="text-lg font-bold mb-4 text-center">📐 NORMATIVA CHILENA VIGENTE</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Zona Térmica 3 (Santiago):</strong></p>
                  <ul className="list-disc ml-4 space-y-1">
                    <li>Muros: R ≥ 1.9 m²K/W</li>
                    <li>Techumbre: R ≥ 4.6 m²K/W</li>
                    <li>Ventanas: U ≤ 2.8 W/m²K</li>
                  </ul>
                </div>
                <div>
                  <p><strong>Zona Térmica 4 (Temuco):</strong></p>
                  <ul className="list-disc ml-4 space-y-1">
                    <li>Muros: R ≥ 2.2 m²K/W</li>
                    <li>Techumbre: R ≥ 5.0 m²K/W</li>
                    <li>Ventanas: U ≤ 2.4 W/m²K</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                🔍 INFORME DE DIAGNÓSTICO TÉRMICO
              </h3>
              <p className="text-lg mb-6 text-blue-100">
                El primer paso inteligente y de bajo riesgo. Una inversión de $100.000 
                que puede ahorrarle millones en soluciones incorrectas.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-300" />
                  <span>Evaluación científica basada en normativa vigente</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-300" />
                  <span>Recomendaciones personalizadas para su hogar</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-300" />
                  <span>Evita gastos innecesarios en soluciones incorrectas</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={pasosReacondicionamientoImg} 
                alt="Pasos del proceso de reacondicionamiento térmico profesional"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-3 -right-3 bg-yellow-500 text-black p-2 rounded-lg font-bold text-xs">
                📋 PROCESO EXPERTO
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ¿Qué Incluye Nuestro Diagnóstico? - Hormozi Style */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              📋 ¿QUÉ INCLUYE NUESTRO DIAGNÓSTICO TÉRMICO?
            </h2>
            <div className="bg-green-100 border border-green-300 rounded-lg p-6 mb-8">
              <p className="text-2xl font-bold text-green-800">
                💰 Inversión: $100.000 CLP
              </p>
              <p className="text-green-700 mt-2">
                (Puede ahorrarse millones en soluciones incorrectas)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center text-blue-800">
                  <Home className="w-6 h-6 mr-2" />
                  Visita a Terreno
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  <strong>Arquitecto Experto</strong> evalúa personalmente su vivienda
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Inspección completa de la envolvente
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Mediciones técnicas especializadas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Identificación de puntos críticos
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center text-green-800">
                  <Search className="w-6 h-6 mr-2" />
                  Análisis Técnico Completo
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  Evaluación detallada de todos los elementos térmicos
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Análisis de techumbre y entretecho
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Evaluación de muros perimetrales
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Inspección de ventanas y puertas
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 shadow-lg">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center text-purple-800">
                  <FileText className="w-6 h-6 mr-2" />
                  Informe Digital Detallado
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  Documento técnico con diagnóstico y recomendaciones
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Diagnóstico específico por áreas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Recomendaciones priorizadas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Estimación de ahorros energéticos
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 shadow-lg">
              <CardHeader className="bg-orange-50">
                <CardTitle className="flex items-center text-orange-800">
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Asesoría Personalizada
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  Acompañamiento completo para resolver todas sus dudas
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Explicación detallada del informe
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Priorización de intervenciones
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Orientación sobre proveedores
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-blue-800 mb-2">
              🏛️ BONUS: CUMPLIMIENTO NORMATIVO
            </h3>
            <p className="text-blue-700">
              Referencia directa al <strong>artículo 4.1.10 de la OGUC</strong> para que sepa 
              que la solución cumple con la normativa vigente de eficiencia térmica.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Llamada a la Acción Principal */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            🚀 SOLICITE SU DIAGNÓSTICO TÉRMICO AHORA
          </h2>
          <p className="text-xl mb-8">
            Invierta en certeza. Deje de adivinar y empiece a solucionar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-white text-gray-800">
              <CardContent className="p-6 text-center">
                <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Consulta Inmediata</h3>
                <p className="text-sm mb-4">Hable directamente con el arquitecto</p>
                <Button onClick={openWhatsApp} className="w-full bg-green-600 hover:bg-green-700">
                  <Phone className="mr-2 h-4 w-4" />
                  WhatsApp: +56 9 7931 6827
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white text-gray-800">
              <CardContent className="p-6 text-center">
                <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Formulario Completo</h3>
                <p className="text-sm mb-4">Información detallada de su caso</p>
                <Button onClick={scrollToContact} variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Formulario de Contacto
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
            <div className="bg-green-100 border border-green-300 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-800 mb-2">
                🛡️ GARANTÍA DE ASESORÍA PROFESIONAL
              </h3>
              <p className="text-green-700">
                Respaldamos nuestro diagnóstico con más de 26 años de experiencia en arquitectura. 
                Su inversión está protegida por nuestro compromiso profesional.
              </p>
            </div>
            <div className="relative">
              <img 
                src={pasosAislacionImg} 
                alt="Pasos detallados del proceso de aislación térmica"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -top-2 -right-2 bg-blue-600 text-white p-2 rounded-lg font-bold text-xs">
                🔧 PROCESO TÉCNICO
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. La Transformación Completa - Russell Brunson Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              🏗️ LA TRANSFORMACIÓN COMPLETA DE SU HOGAR
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Una vez que tenga su diagnóstico, si lo desea, podemos convertir 
              esas recomendaciones en realidad. Estas son las soluciones más efectivas:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl">
              <CardHeader className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Snowflake className="w-10 h-10" />
                </div>
                <CardTitle className="text-xl">Aislación de Techumbre</CardTitle>
                <p className="text-blue-100 text-sm">Lana Mineral / Celulosa Proyectada</p>
              </CardHeader>
              <CardContent>
                <img 
                  src={mineralWoolInstallationImg} 
                  alt="Instalación profesional de lana mineral"
                  className="rounded-lg mb-4 w-full"
                />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Hasta 40% de ahorro energético
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Instalación rápida y limpia
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Material ignífugo y duradero
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white shadow-xl">
              <CardHeader className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10" />
                </div>
                <CardTitle className="text-xl">Sistema EIFS</CardTitle>
                <p className="text-green-100 text-sm">Aislación Exterior Integral</p>
              </CardHeader>
              <CardContent>
                <img 
                  src={eifsWallSystemImg} 
                  alt="Sistema EIFS moderno en muro exterior"
                  className="rounded-lg mb-4 w-full"
                />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Eliminación de puentes térmicos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Acabado arquitectónico superior
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Protección contra humedad
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-xl">
              <CardHeader className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-10 h-10" />
                </div>
                <CardTitle className="text-xl">Ventanas Termopanel</CardTitle>
                <p className="text-purple-100 text-sm">Alta Eficiencia Energética</p>
              </CardHeader>
              <CardContent>
                <img 
                  src={thermopaneWindowImg} 
                  alt="Detalle de ventana termopanel de doble vidrio"
                  className="rounded-lg mb-4 w-full"
                />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Doble vidriado hermético
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Reducción de ruido exterior
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mayor seguridad y estética
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-6 inline-block">
              <h3 className="text-xl font-bold text-blue-800 mb-2">
                💡 IMPORTANTE
              </h3>
              <p className="text-blue-700">
                Cada solución se implementa según las recomendaciones específicas 
                de su diagnóstico térmico personalizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Transparencia en la Inversión - Vilma Núñez Style */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            💰 TRANSPARENCIA TOTAL EN LA INVERSIÓN
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Junto al informe de diagnóstico, o cuando usted lo solicite, 
            recibirá una cotización transparente y detallada para implementar las mejoras.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">
                  ✅ PRESUPUESTO GARANTIZADO
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center text-green-700">
                    <CheckCircle className="w-5 h-5 mr-3" />
                    Sin costos ocultos ni sorpresas
                  </li>
                  <li className="flex items-center text-green-700">
                    <CheckCircle className="w-5 h-5 mr-3" />
                    Desglose detallado por materiales y mano de obra
                  </li>
                  <li className="flex items-center text-green-700">
                    <CheckCircle className="w-5 h-5 mr-3" />
                    Plazo de validez de 30 días
                  </li>
                  <li className="flex items-center text-green-700">
                    <CheckCircle className="w-5 h-5 mr-3" />
                    Facilidades de pago disponibles
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-6">
                <p className="text-blue-800 font-bold">
                  💡 El costo del diagnóstico ($100.000) se descuenta completamente 
                  si decide ejecutar las mejoras con nosotros.
                </p>
              </div>
              
              <div className="relative">
                <img 
                  src={pilaresPresupuestoImg} 
                  alt="Pilares del presupuesto transparente y garantizado"
                  className="rounded-lg shadow-lg w-full"
                />
                <div className="absolute -top-2 -left-2 bg-green-600 text-white p-2 rounded-lg font-bold text-xs">
                  💰 PRESUPUESTO CLARO
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={happyFamilyComfortImg} 
                alt="Familia disfrutando en hogar confortable"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-3 -right-3 bg-green-500 text-white p-2 rounded-lg font-bold text-xs">
                🏠 SU HOGAR IDEAL
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Preguntas Frecuentes (FAQ) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              ❓ PREGUNTAS FRECUENTES
            </h2>
            <p className="text-xl text-gray-600">
              Resolvemos todas sus dudas sobre el reacondicionamiento térmico
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="text-left font-bold text-blue-800 hover:text-blue-600 py-6">
                ¿Realmente vale la pena invertir en reacondicionamiento térmico?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                <strong>Absolutamente sí.</strong> Una vivienda con reacondicionamiento térmico puede reducir 
                los gastos de calefacción y refrigeración entre un 40% y 70%. Además, mejora significativamente 
                la calidad de vida y aumenta el valor de su propiedad. <strong>La inversión se recupera 
                típicamente en 3-5 años</strong> solo en ahorro energético, sin contar el confort adicional.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="text-left font-bold text-blue-800 hover:text-blue-600 py-6">
                Mi casa es muy antigua, ¿se puede mejorar igualmente?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                <strong>Las casas antiguas son las que más se benefician</strong> del reacondicionamiento térmico. 
                Fueron construidas con normativas menos exigentes y tienen el mayor potencial de mejora. 
                Nuestro diagnóstico identifica exactamente qué se puede hacer en su caso específico, 
                respetando la estructura y características originales de su vivienda.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="text-left font-bold text-blue-800 hover:text-blue-600 py-6">
                ¿Cuánto tiempo toman los trabajos de instalación?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                Los tiempos varían según la solución:
                <br/>• <strong>Aislación de techumbre:</strong> 1-2 días
                <br/>• <strong>Sistema EIFS:</strong> 1-2 semanas (según superficie)
                <br/>• <strong>Ventanas termopanel:</strong> 1-3 días
                <br/><br/>
                La mayoría de trabajos se realizan desde el exterior, minimizando las molestias 
                en su rutina diaria. Coordinamos todo para su mayor comodidad.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="text-left font-bold text-blue-800 hover:text-blue-600 py-6">
                ¿El diagnóstico de $100.000 se descuenta si contrato la instalación?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                <strong>Sí, completamente.</strong> Si decide ejecutar las mejoras recomendadas con nosotros, 
                el costo total del diagnóstico ($100.000) se descuenta íntegramente del valor final de la obra. 
                De esta manera, <strong>el diagnóstico le sale gratis</strong> y además tiene la garantía 
                de que las mejoras se implementarán exactly como se recomendó en el informe técnico.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="text-left font-bold text-blue-800 hover:text-blue-600 py-6">
                ¿Qué garantía tienen los trabajos de reacondicionamiento?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                Todos nuestros trabajos incluyen:
                <br/>• <strong>Garantía de materiales:</strong> Según fabricante (5-25 años)
                <br/>• <strong>Garantía de instalación:</strong> 2 años
                <br/>• <strong>Servicio post-venta:</strong> Seguimiento a los 6 meses
                <br/><br/>
                Además, todos los trabajos cumplen con las normativas vigentes y 
                son respaldados por nuestros 26+ años de experiencia profesional.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="text-left font-bold text-blue-800 hover:text-blue-600 py-6">
                ¿Puedo hacer las mejoras por etapas?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                <strong>Por supuesto.</strong> El diagnóstico incluye una priorización de las intervenciones 
                según su impacto en el confort y ahorro energético. Puede implementar las mejoras 
                gradualmente según su presupuesto. <strong>Lo importante es comenzar con las intervenciones 
                de mayor impacto</strong> que identifiquemos en el diagnóstico técnico.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}