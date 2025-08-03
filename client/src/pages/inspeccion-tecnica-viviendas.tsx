import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, Phone, CheckCircle, Star, Shield, Zap, AlertTriangle, 
  ArrowRight, Clock, DollarSign, Users, Award, Eye, Camera,
  FileText, Search, Wrench, ThermometerSun, Building, Mail,
  Target, TrendingUp, MapPin, CheckSquare
} from "lucide-react";
import Chatbot from "@/components/chatbot";
import Footer from "@/components/footer";
import inspectorElectricalImg from "@assets/generated_images/Inspector_reviewing_electrical_panel_35e9d965.png";
import hiddenDamageImg from "@assets/generated_images/Hidden_damage_discovery_comparison_eb88f290.png";
import happyFamilyImg from "@assets/generated_images/Happy_family_with_inspection_report_99ef68f1.png";
import technicalReportImg from "@assets/generated_images/Technical_inspection_report_sample_e4f41b17.png";
import professionalInspectionImg from "@assets/generated_images/Professional_architect_conducting_inspection_30fd92ae.png";
import expensiveRepairsImg from "@assets/generated_images/Expensive_repair_bills_scenario_08b1d6ae.png";

export default function InspeccionTecnicaViviendas() {
  const [, setLocation] = useLocation();

  // SEO Meta tags optimization
  useEffect(() => {
    document.title = "Inspección Técnica de Viviendas Chile - Arquitecto Certificado MINVU | $180.000";
    
    // Meta description
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

    setMetaTag('description', 'Inspección técnica profesional de viviendas en Chile por arquitecto certificado MINVU. Detecta defectos ocultos, filtraciones, problemas eléctricos antes de comprar. Evita reparaciones millonarias por solo $180.000.');
    setMetaTag('keywords', 'inspección técnica vivienda chile, inspector certificado MINVU, defectos ocultos casa, arquitecto inspección santiago, informe técnico vivienda, evaluación estructural chile, revisor independiente');
    setMetaTag('og:title', 'Inspección Técnica de Viviendas Chile - Evita Reparaciones Millonarias', true);
    setMetaTag('og:description', 'Arquitecto certificado MINVU realiza inspección técnica completa de viviendas. Detecta defectos ocultos y previene reparaciones millonarias. Informe completo en 48 horas.', true);
    setMetaTag('og:type', 'website', true);

    // JSON-LD Schema for better SEO
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Inspección Técnica de Viviendas",
      "description": "Inspección técnica profesional de viviendas por arquitecto certificado MINVU. Detecta defectos ocultos, filtraciones, problemas eléctricos antes de comprar.",
      "provider": {
        "@type": "Person",
        "name": "Patricio Becar Elissegaray",
        "jobTitle": "Arquitecto",
        "url": "https://arquitectochile.com",
        "telephone": "+56979316827"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Chile"
      },
      "offers": {
        "@type": "Offer",
        "price": "180000",
        "priceCurrency": "CLP",
        "description": "Inspección técnica completa con informe detallado en 48 horas"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    
    // Remove existing schema if present
    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (existingSchema) {
      existingSchema.remove();
    }
    
    document.head.appendChild(script);
  }, []);

  const openWhatsApp = () => {
    const message = "Hola Patricio, me interesa el servicio de Inspección Técnica de Viviendas. Necesito seguridad antes de comprar mi propiedad.";
    window.open(`https://wa.me/56979316827?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollToContact = () => {
    setLocation('/#contacto');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Gary Halbert Style Opening */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Badge className="bg-red-600 text-white mb-4 text-sm font-bold px-4 py-2">
              🏠 INSPECCIÓN PROFESIONAL CERTIFICADA
            </Badge>
            
            <div className="relative w-20 h-20 mx-auto mb-6">
              <Search className="w-20 h-20 text-blue-300" />
              <Shield className="w-8 h-8 text-yellow-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              ⚠️ CARTA ABIERTA A TODO FUTURO PROPIETARIO<br/>
              QUE NO QUIERE COMETER EL ERROR MÁS CARO DE SU VIDA
            </h1>
            
            <div className="bg-yellow-500 text-black p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4">
                SI ESTÁ A PUNTO DE COMPRAR UNA VIVIENDA SIN UNA INSPECCIÓN TÉCNICA PROFESIONAL...
              </h2>
              <p className="text-xl">
                Podría estar a DÍAS de descubrir defectos que le costarán MILLONES en reparaciones
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="mb-4">
                <img 
                  src={hiddenDamageImg} 
                  alt="Daños ocultos filtraciones humedad vivienda inspección técnica Chile" 
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              </div>
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">EL PROBLEMA</h3>
              <p>El 73% de las viviendas nuevas y usadas tienen defectos ocultos que solo un experto puede detectar</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="mb-4">
                <img 
                  src={expensiveRepairsImg} 
                  alt="Reparaciones millonarias casa defectos constructivos Santiago Chile" 
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              </div>
              <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">EL COSTO</h3>
              <p>Reparaciones posteriores pueden costar entre $2-8 millones que nadie le advertirá</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="mb-4">
                <img 
                  src={professionalInspectionImg} 
                  alt="Arquitecto profesional inspección técnica vivienda Chile certificado" 
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              </div>
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">LA SOLUCIÓN</h3>
              <p>Inspección técnica profesional por solo $180.000 que puede ahorrarle millones</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={openWhatsApp}
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white text-xl px-8 py-4"
            >
              <Phone className="mr-2 h-6 w-6" />
              SOLICITAR INSPECCIÓN AHORA
            </Button>
            <Button 
              onClick={scrollToContact}
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 text-xl px-8 py-4"
            >
              <FileText className="mr-2 h-6 w-6" />
              VER INFORME DE EJEMPLO
            </Button>
          </div>
          
          <div className="mt-8 text-blue-200">
            <p className="text-lg">
              <Clock className="inline h-5 w-5 mr-2" />
              Disponibilidad limitada: Solo 15 inspecciones por mes
            </p>
          </div>
        </div>
      </section>

      {/* Problema Amplificado - Russell Brunson Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              LA HISTORIA QUE CAMBIÓ TODO...
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-lg text-gray-700 mb-6">
                  <strong>Enero 2023:</strong> La familia Rodríguez compra su casa soñada en Las Condes por $250 millones. 
                  Todo se veía perfecto en la visita...
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  <strong>Marzo 2023:</strong> Primeras lluvias. Descubren filtraciones en 3 habitaciones. 
                  Costo de reparación: $4.5 millones.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  <strong>Julio 2023:</strong> Problemas eléctricos graves. El tablero no cumple normas SEC. 
                  Cambio completo: $3.2 millones.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-6">
                  <p className="text-xl font-bold text-red-800">
                    TOTAL GASTADO EN REPARACIONES: $7.7 MILLONES
                  </p>
                  <p className="text-lg text-red-700 mt-2">
                    Una inspección técnica de $180.000 habría detectado todo esto ANTES de la compra.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <img 
                  src={hiddenDamageImg} 
                  alt="Inspección técnica detecta daños ocultos vivienda antes compra Chile" 
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4">
                  <p className="text-sm font-bold text-yellow-800">
                    ⚠️ ESTO PUDO HABERSE EVITADO CON UNA INSPECCIÓN PROFESIONAL
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Propuesta de Valor - Hormozi Value Equation */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              🔍 INSPECCIÓN TÉCNICA PROFESIONAL CERTIFICADA
            </h2>
            <p className="text-2xl mb-8">
              <strong>LA ÚNICA FORMA CIENTÍFICA DE COMPRAR SEGURO</strong>
            </p>
          </div>
          
          <div className="bg-white text-blue-900 p-8 rounded-lg mb-8">
            <h3 className="text-3xl font-bold text-center mb-6">FÓRMULA DEL VALOR</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-4 text-green-600">✅ LO QUE OBTIENE:</h4>
                <ul className="space-y-2">
                  <li>• Inspección visual completa por arquitecto certificado</li>
                  <li>• Informe técnico con fotografías y diagnóstico</li>
                  <li>• Revisión de estructura, instalaciones y terminaciones</li>
                  <li>• Análisis térmico y eficiencia energética</li>
                  <li>• Recomendaciones de reparación y costos estimados</li>
                  <li>• Respaldo profesional para negociar precio</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4 text-red-600">❌ LO QUE EVITA:</h4>
                <ul className="space-y-2">
                  <li>• Reparaciones millonarias no previstas</li>
                  <li>• Problemas de filtraciones y humedad</li>
                  <li>• Fallas eléctricas peligrosas</li>
                  <li>• Defectos en terminaciones costosos</li>
                  <li>• Sorpresas después de escriturar</li>
                  <li>• Pérdida de poder de negociación</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-500 text-black p-6 rounded-lg inline-block">
              <p className="text-2xl font-bold">
                INVERSIÓN: $180.000 | AHORRO POTENCIAL: $2-8 MILLONES
              </p>
              <p className="text-xl mt-2">
                ROI: HASTA 4,444% EN UNA SOLA INSPECCIÓN
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qué Incluye el Servicio */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              🏠 QUÉ INCLUYE SU INSPECCIÓN TÉCNICA CERTIFICADA
            </h2>
            <p className="text-xl text-gray-600">
              Revisión exhaustiva de 47 puntos críticos en 4 áreas fundamentales
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-2 border-blue-200">
              <CardHeader className="text-center">
                <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">ESTRUCTURA & TERMINACIONES</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Muros, techos y pisos</li>
                  <li>• Puertas y ventanas</li>
                  <li>• Revestimientos y pinturas</li>
                  <li>• Escaleras y barandas</li>
                  <li>• Calidad de terminaciones</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-green-200">
              <CardHeader className="text-center">
                <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">INSTALACIONES ELÉCTRICAS</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Tablero eléctrico y protecciones</li>
                  <li>• Enchufes y interruptores</li>
                  <li>• Iluminación completa</li>
                  <li>• Puesta a tierra</li>
                  <li>• Cumplimiento normas SEC</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-red-200">
              <CardHeader className="text-center">
                <Wrench className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-lg">INSTALACIONES SANITARIAS</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Presión y caudal de agua</li>
                  <li>• Desagües y alcantarillado</li>
                  <li>• Artefactos sanitarios</li>
                  <li>• Calefont y gas</li>
                  <li>• Detección de filtraciones</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-orange-200">
              <CardHeader className="text-center">
                <ThermometerSun className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-lg">EFICIENCIA TÉRMICA</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Aislación térmica</li>
                  <li>• Puentes térmicos</li>
                  <li>• Ventilación natural</li>
                  <li>• Orientación solar</li>
                  <li>• Costos de climatización</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-center mb-6">📋 PROCESO DE INSPECCIÓN PROFESIONAL</h3>
            
            <div className="mb-8">
              <img 
                src={professionalInspectionImg} 
                alt="Proceso inspección técnica profesional arquitecto certificado MINVU Chile" 
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h4 className="font-bold mb-2">CONTACTO INICIAL</h4>
                <p className="text-sm">Coordinamos fecha y hora según su disponibilidad</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h4 className="font-bold mb-2">INSPECCIÓN EN TERRENO</h4>
                <p className="text-sm">2-3 horas de revisión exhaustiva con equipos profesionales</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h4 className="font-bold mb-2">ANÁLISIS TÉCNICO</h4>
                <p className="text-sm">Procesamiento de datos y elaboración del informe</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h4 className="font-bold mb-2">ENTREGA DE INFORME</h4>
                <p className="text-sm">Informe digital completo en 48 horas máximo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfil del Cliente Ideal */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              🎯 ¿ES USTED NUESTRO CLIENTE IDEAL?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardHeader className="text-center">
                <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>COMPRADOR INTELIGENTE</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Está por invertir entre $80-500 millones en una propiedad y quiere:</p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Seguridad en su inversión</li>
                  <li>✓ Evitar sorpresas costosas</li>
                  <li>✓ Poder de negociación</li>
                  <li>✓ Tranquilidad familiar</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader className="text-center">
                <AlertTriangle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>MIEDO A LO DESCONOCIDO</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Tiene temores legítimos sobre:</p>
                <ul className="space-y-2 text-sm">
                  <li>⚠ Defectos ocultos costosos</li>
                  <li>⚠ Problemas estructurales</li>
                  <li>⚠ Instalaciones deficientes</li>
                  <li>⚠ Estafas inmobiliarias</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader className="text-center">
                <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>UBICACIÓN SANTIAGO</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Busca propiedades en:</p>
                <ul className="space-y-2 text-sm">
                  <li>📍 Las Condes, Vitacura</li>
                  <li>📍 Providencia, Ñuñoa</li>
                  <li>📍 La Reina, Maipú</li>
                  <li>📍 Cualquier comuna RM</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Argumentos de Venta Clave */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              💡 5 RAZONES PODEROSAS PARA ACTUAR HOY
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">INVERSIÓN SEGURA</h3>
              <p className="text-sm">Transforme la compra más grande de su vida en una decisión científica</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <DollarSign className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">EVITE COSTOS OCULTOS</h3>
              <p className="text-sm">Detecte problemas antes de escriturar y ahorre millones</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">TRANQUILIDAD TOTAL</h3>
              <p className="text-sm">Duerma en paz sabiendo que hizo la elección correcta</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">PODER DE NEGOCIACIÓN</h3>
              <p className="text-sm">Use defectos encontrados para negociar mejor precio</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Award className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">RESPALDO PROFESIONAL</h3>
              <p className="text-sm">Arquitecto certificado con 15+ años de experiencia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Garantías y Credibilidad */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              🏆 RESPALDO PROFESIONAL CERTIFICADO
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-blue-50">
              <CardHeader className="text-center">
                <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl">PATRICIO BECAR ELISSEGARAY</CardTitle>
                <p className="text-blue-600">Arquitecto Universidad de Chile</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span>15+ años experiencia en construcción</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span>Revisor Independiente MINVU Certificado</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span>Especialista en patologías constructivas</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span>+500 inspecciones realizadas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="flex flex-col justify-center">
              <img 
                src={inspectorElectricalImg} 
                alt="Inspector técnico revisando instalaciones eléctricas SEC normativa Chile" 
                className="w-full rounded-lg shadow-lg mb-4"
              />
              <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 text-center">
                <p className="text-sm font-bold text-yellow-800">
                  INSPECCIÓN REAL EN TERRENO
                </p>
              </div>
            </div>
            
            <Card className="bg-green-50">
              <CardHeader className="text-center">
                <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-xl">GARANTÍAS DE SERVICIO</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span>Informe entregado en 48 horas máximo</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span>Revisión de 47 puntos críticos garantizada</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span>Respaldo técnico post-inspección</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span>Seguro responsabilidad civil</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">EJEMPLO DE INFORME TÉCNICO</h3>
              <p className="text-lg text-gray-700 mb-4">
                Reciba un informe técnico completo y detallado con fotografías, 
                diagnósticos precisos y recomendaciones profesionales para cada área inspeccionada.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Fotografías de alta resolución de cada defecto</li>
                <li>✓ Clasificación de problemas por nivel de urgencia</li>
                <li>✓ Estimación de costos de reparación</li>
                <li>✓ Recomendaciones técnicas específicas</li>
                <li>✓ Respaldo para negociación de precio</li>
              </ul>
            </div>
            <div>
              <img 
                src={technicalReportImg} 
                alt="Informe técnico inspección vivienda fotografías diagnóstico Chile ejemplo" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Urgencia y Escasez - Vilma Núñez */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-6">
              ⏰ DISPONIBILIDAD LIMITADA
            </h2>
            <div className="bg-white text-red-600 p-6 rounded-lg mb-8">
              <p className="text-2xl font-bold mb-4">
                SOLO 15 INSPECCIONES POR MES
              </p>
              <p className="text-lg">
                Para mantener la calidad del servicio, limitamos nuestro cupo mensual.<br/>
                <strong>Quedan 7 cupos disponibles para Agosto 2025</strong>
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <Clock className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">TIEMPO PERDIDO</h3>
                <p>Cada día que espera, otros compradores toman las mejores oportunidades</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">RIESGO AUMENTA</h3>
                <p>Comprar sin inspección es apostar millones a ciegas</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">PRECIOS SUBIRÁN</h3>
                <p>Este servicio aumentará a $250.000 en Septiembre</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Poderoso */}
      <section className="py-20 bg-gradient-to-br from-green-800 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            🚀 RESERVE SU CUPO AHORA
          </h2>
          <p className="text-2xl mb-8">
            No permita que el miedo a lo desconocido arruine la inversión más importante de su vida
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
            <div className="bg-white text-green-900 p-8 rounded-lg">
              <h3 className="text-3xl font-bold mb-4">PRECIO ESPECIAL LANZAMIENTO</h3>
              <div className="flex items-center justify-center mb-4">
                <span className="text-2xl line-through text-gray-500 mr-4">$250.000</span>
                <span className="text-4xl font-bold text-green-600">$180.000</span>
              </div>
              <p className="text-lg">
                <strong>AHORRO: $70.000</strong> | Válido solo hasta fin de mes
              </p>
            </div>
            <div>
              <img 
                src={happyFamilyImg} 
                alt="Familia chilena feliz compra casa segura inspección técnica exitosa Santiago" 
                className="w-full rounded-lg shadow-lg"
              />
              <div className="bg-green-100 border border-green-400 rounded-lg p-4 mt-4 text-center">
                <p className="text-sm font-bold text-green-800">
                  ✅ ASÍ SE SIENTE COMPRAR CON SEGURIDAD Y TRANQUILIDAD
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={openWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-xl font-bold"
            >
              <Phone className="w-6 h-6 mr-2" />
              WhatsApp +56 9 7931 6827
            </Button>
            <Button 
              onClick={scrollToContact}
              className="bg-white hover:bg-gray-100 text-green-900 px-8 py-4 text-xl font-bold"
            >
              <Mail className="w-6 h-6 mr-2" />
              Más Información
            </Button>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
            <p className="text-xl">
              <strong>P.D.:</strong> Recuerde que cada día sin inspeccionar es un día más cerca 
              de cometer el error más caro de su vida. No se convierta en otra historia de horror inmobiliario.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}