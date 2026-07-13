import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  MapPin, Building2, DollarSign, Clock, Shield, CheckCircle, ArrowRight, 
  Calculator, FileText, Users, AlertTriangle, Target, TrendingUp, Star,
  Home, Zap, Award, Phone, Mail
} from "lucide-react";
import Chatbot from "@/components/chatbot";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

import subdivisionAerialImg from "@assets/generated_images/Subdivision_aerial_view_technical_de94368c.png";
import architectConsultationImg from "@assets/generated_images/Architect_consultation_subdivision_process_35d30a54.png";
import beforeAfterComparisonImg from "@assets/generated_images/Before_after_subdivision_comparison_3d231415.png";
import municipalPermitsImg from "@assets/generated_images/Municipal_permits_approval_process_94199078.png";
import familyInheritanceImg from "@assets/generated_images/Family_inheritance_subdivision_meeting_9b154685.png";
import happyFamilySuccessImg from "@assets/generated_images/Happy_family_subdivision_success_5003b1c0.png";

export default function SubdivisionTerrenosUrbanos() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Subdivisión de Terrenos Urbanos",
      "description": "Servicio profesional de subdivisión de terrenos urbanos para multiplicar el valor patrimonial de su propiedad. Gestión completa desde el diseño hasta la inscripción final.",
      "provider": {
        "@type": "Person",
        "name": "Patricio Eduardo Becar Elissegaray",
        "jobTitle": "Arquitecto",
        "url": "https://arquitectochile.com",
        "telephone": "+56979316827"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Chile"
      },
      "serviceType": "Real Estate Development"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    
    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (existingSchema) {
      existingSchema.remove();
    }
    
    document.head.appendChild(script);
  }, []);

  const openWhatsApp = () => {
    const message = "Hola Patricio, me interesa el servicio de Subdivisión de Terrenos Urbanos. Quiero multiplicar el valor de mi propiedad. ¿Podrías ayudarme?";
    window.open(`https://wa.me/56979316827?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollToContact = () => {
    setLocation('/#contacto');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-[#0f172a] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Badge className="bg-[#f97316] text-white mb-4 text-sm font-bold px-4 py-2">
              MULTIPLICACIÓN PATRIMONIAL
            </Badge>
            
            <div className="relative w-20 h-20 mx-auto mb-6">
              <MapPin className="w-20 h-20 text-gray-300" />
              <DollarSign className="w-8 h-8 text-[#f97316] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            <div className="mb-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                CÓMO CONVERTIR SU TERRENO EN DOS O MÁS PROPIEDADES<br/>
                Y MULTIPLICAR SU PATRIMONIO
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                <p className="text-2xl leading-relaxed text-white">
                  <strong>Usted tiene un terreno.</strong> Pero, ¿sabe que podría tener <em>dos, tres o más propiedades</em> 
                  en ese mismo lugar?
                  <br/><br/>
                  Su terreno actual es como un cofre del tesoro <strong>cerrado con llave</strong>. 
                  Adentro hay millones esperando ser liberados a través de una <em>subdivisión estratégica</em>.
                </p>
              </div>
              <div className="relative">
                <img 
                  src={subdivisionAerialImg} 
                  alt="Vista aérea de subdivisión de terreno urbano"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-[#f97316] text-white p-3 rounded-lg font-bold text-sm">
                  MULTIPLIQUE SU PATRIMONIO
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema y Agitación */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0f172a] mb-6">
              SU TERRENO ES "CAPITAL DORMIDO"<br/>
              Y ESTÁ PERDIENDO VALOR CADA DÍA
            </h2>
            
            <p className="text-xl text-[#64748b] mb-8">
              Mientras lee esto, su propiedad podría estar generando <strong>doble o triple valor</strong>, 
              pero está bloqueada por la falta de conocimiento técnico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-orange-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-[#f97316] mr-3" />
                  <h3 className="text-lg font-bold text-[#0f172a]">Riesgos de Hacerlo Solo</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#f97316] mr-2">❌</span>
                    <span>Perder meses en trámites rechazados por la Dirección de Obras</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f97316] mr-2">❌</span>
                    <span>Diseñar una subdivisión que NO maximiza el valor de los lotes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f97316] mr-2">❌</span>
                    <span>Enfrentar costos inesperados de subdivisión "afecta a utilidad pública"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f97316] mr-2">❌</span>
                    <span>Conflictos familiares en herencias por falta de plan claro</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-8 h-8 text-[#0f172a] mr-3" />
                  <h3 className="text-lg font-bold text-[#0f172a]">El Costo de No Actuar</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#f97316] mr-2">⏰</span>
                    <span>Cada mes de retraso = Oportunidades de venta perdidas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f97316] mr-2">📈</span>
                    <span>Plusvalía congelada mientras el mercado sube</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f97316] mr-2">+</span>
                    <span>Herencia mal planificada genera conflictos familiares</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f97316] mr-2">💸</span>
                    <span>Impuestos territoriales altos por un terreno grande y único</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* La Solución */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0f172a] mb-6">
              💡 LA SOLUCIÓN: SU ARQUITECTO COMO GUÍA EXPERTO
            </h2>
            
            <p className="text-xl text-[#64748b] mb-8">
              No vendemos "trámites"... <strong>Vendemos un proyecto de inversión guiado por un experto</strong> 
              que transforma su potencial bloqueado en patrimonio multiplicado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Building2 className="w-16 h-16 text-[#0f172a] mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Estado Actual</h3>
                <p className="text-[#64748b]">1 terreno grande<br/>Potencial bloqueado<br/>Capital dormido</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gray-50 border-gray-200">
              <CardContent className="p-6">
                <ArrowRight className="w-16 h-16 text-[#f97316] mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2 text-[#0f172a]">Nuestro Proceso</h3>
                <p className="text-gray-600">Análisis experto<br/>Diseño estratégico<br/>Gestión municipal</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Home className="w-16 h-16 text-[#f97316] mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Estado Deseado</h3>
                <p className="text-[#64748b]">2+ propiedades<br/>Patrimonio multiplicado<br/>Capital liberado</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-6">🏆 26 Años de Experiencia Garantizan Su Éxito</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-bold text-lg mb-3">Lo Que SÍ Obtiene Con Nosotros:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-[#0f172a] mr-2" />Análisis de máximo aprovechamiento del terreno</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-[#0f172a] mr-2" />Diseño que maximiza el valor de cada lote</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-[#0f172a] mr-2" />Gestión municipal especializada</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-[#0f172a] mr-2" />Acompañamiento hasta la inscripción final</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3">Especialización Técnica:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center"><Star className="w-5 h-5 text-[#f97316] mr-2" />Manejo de CIP y superficie predial mínima</li>
                  <li className="flex items-center"><Star className="w-5 h-5 text-[#f97316] mr-2" />Subdivisiones normales y afectas a utilidad pública</li>
                  <li className="flex items-center"><Star className="w-5 h-5 text-[#f97316] mr-2" />Soluciones especializadas para herencias</li>
                  <li className="flex items-center"><Star className="w-5 h-5 text-[#f97316] mr-2" />Optimización de costos municipales</li>
                </ul>
              </div>
              <div className="flex flex-col items-center">
                <img 
                  src={architectConsultationImg} 
                  alt="Consulta profesional de arquitecto para subdivisión"
                  className="rounded-lg shadow-md mb-3 w-full"
                />
                <p className="text-sm text-center text-[#64748b] font-medium">
                  Consulta personalizada en su terreno
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Los Dos Caminos de la Subdivisión */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0f172a] mb-6">
              LOS DOS CAMINOS DE LA SUBDIVISIÓN
            </h2>
            <p className="text-xl text-[#64748b]">
              Como expertos, dominamos <strong>todos los escenarios</strong> para maximizar su inversión
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-gray-200">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-center text-[#0f172a]">
                  <Calculator className="w-8 h-8 mx-auto mb-2" />
                  SUBDIVISIÓN NORMAL
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h4 className="font-bold text-[#0f172a] mb-2">Ideal Para:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Terrenos con acceso a servicios básicos</li>
                    <li>• Proyectos de hasta 4-5 lotes</li>
                    <li>• Inversión mínima en urbanización</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="font-bold text-[#0f172a] mb-2">Proceso:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Diseño según CIP municipal</li>
                    <li>• Aprobación en Dirección de Obras</li>
                    <li>• Pago de derechos e inscripción</li>
                  </ul>
                </div>
                <div className="bg-gray-100 p-3 rounded">
                  <p className="text-sm font-bold text-[#0f172a]">⚡ Proceso más rápido y económico</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-center text-[#0f172a]">
                  <Building2 className="w-8 h-8 mx-auto mb-2" />
                  SUBDIVISIÓN AFECTA A UTILIDAD PÚBLICA
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h4 className="font-bold text-[#0f172a] mb-2">Ideal Para:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Terrenos grandes (5+ lotes)</li>
                    <li>• Proyectos inmobiliarios complejos</li>
                    <li>• Máximo aprovechamiento del suelo</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="font-bold text-[#f97316] mb-2">Proceso:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Proyecto de urbanización completo</li>
                    <li>• Cesión de terrenos para áreas verdes</li>
                    <li>• Instalación de servicios básicos</li>
                  </ul>
                </div>
                <div className="bg-orange-100 p-3 rounded">
                  <p className="text-sm font-bold text-[#0f172a]">⚡ Mayor inversión, mayor rentabilidad</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-bold text-lg text-[#0f172a] mb-2">
                  Nuestra Ventaja Competitiva
                </h3>
                <p className="text-[#64748b]">
                  <strong>Evaluamos su terreno</strong> y le recomendamos el camino más rentable. 
                  No todos los arquitectos manejan ambos tipos de subdivisión.
                </p>
              </div>
              <div className="relative">
                <img 
                  src={beforeAfterComparisonImg} 
                  alt="Comparación antes y después de subdivisión"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -top-3 -left-3 bg-[#0f172a] text-white p-2 rounded-lg font-bold text-xs">
                  ANTES → DESPUÉS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Proceso Paso a Paso */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0f172a] mb-6">
              NUESTRO PROCESO PASO A PASO
            </h2>
            <p className="text-xl text-[#64748b]">
              Transformamos la complejidad en un proceso simple y manejable
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0f172a] text-white rounded-full flex items-center justify-center font-bold text-xl mr-6">
                1
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-[#0f172a] mb-2">
                  <FileText className="inline w-6 h-6 mr-2" />
                  Diagnóstico y Estudio de Cabida
                </h3>
                <p className="text-[#64748b] mb-3">
                  Analizamos su CIP municipal y evaluamos el terreno para determinar la máxima cantidad de lotes posibles 
                  respetando la superficie predial mínima.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-bold text-[#0f172a]">
                    📄 Documentos necesarios: Plano del terreno + CIP vigente
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0f172a] text-white rounded-full flex items-center justify-center font-bold text-xl mr-6">
                2
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-[#0f172a] mb-2">
                  <Target className="inline w-6 h-6 mr-2" />
                  Diseño del Proyecto de Subdivisión
                </h3>
                <p className="text-[#64748b] mb-3">
                  Creamos el proyecto técnico optimizando la configuración de lotes para maximizar valor y cumplir 
                  todas las normativas municipales.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-bold text-[#0f172a]">
                    Incluye: Planos técnicos + Memoria de cálculo + Especificaciones
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#f97316] text-white rounded-full flex items-center justify-center font-bold text-xl mr-6">
                3
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-[#0f172a] mb-2">
                  <Building2 className="inline w-6 h-6 mr-2" />
                  Gestión Municipal Especializada
                </h3>
                <p className="text-[#64748b] mb-3">
                  Ingresamos y gestionamos el proyecto en la Dirección de Obras Municipal, realizando seguimiento 
                  hasta obtener la aprobación final.
                </p>
                <div className="bg-orange-50 p-3 rounded">
                  <p className="text-sm font-bold text-[#0f172a]">
                    ⚡ Seguimiento semanal + Resolución de observaciones técnicas
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0f172a] text-white rounded-full flex items-center justify-center font-bold text-xl mr-6">
                4
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-[#0f172a] mb-2">
                  <CheckCircle className="inline w-6 h-6 mr-2" />
                  Aprobación y Trámites Finales
                </h3>
                <p className="text-[#64748b] mb-3">
                  Le guiamos en el pago de derechos municipales y la inscripción en el Conservador de Bienes Raíces 
                  para materializar las nuevas propiedades.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-bold text-[#0f172a]">
                    Resultado: Nuevos roles de propiedad listos para venta o construcción
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="bg-[#0f172a] text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  ⏰ Tiempo Total del Proceso
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2 text-white">Subdivisión Normal:</h4>
                    <p className="text-xl text-white">3-4 meses</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Afecta a Utilidad Pública:</h4>
                    <p className="text-xl">6-8 meses</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={municipalPermitsImg} 
                  alt="Proceso de aprobación municipal de permisos"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-3 -right-3 bg-[#f97316] text-white p-2 rounded-lg font-bold text-xs">
                  GESTIÓN MUNICIPAL
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soluciones para Herencias */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-4">
              SOLUCIONES ESPECIALES PARA HERENCIAS
            </h2>
          </div>

          <Card className="border-amber-200 bg-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mb-6">
                <div className="flex items-start">
                  <Users className="w-12 h-12 text-amber-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-[#0f172a] mb-3">
                      Entendemos que Gestionar una Herencia es Complejo
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Sabemos que gestionar una herencia familiar es emocionalmente complejo y técnicamente desafiante. 
                      <strong>Nos encargamos de la parte técnica</strong> para facilitar el acuerdo entre los herederos, 
                      asesorándolos para designar un representante legal y que el proceso avance sin conflictos.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src={familyInheritanceImg} 
                    alt="Reunión familiar para subdivisión de herencia"
                    className="rounded-lg shadow-lg w-full"
                  />
                  <div className="absolute -top-3 -left-3 bg-amber-600 text-white p-2 rounded-lg font-bold text-xs">
                    SOLUCIONES FAMILIARES
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-amber-50 p-6 rounded-lg">
                  <h4 className="font-bold text-[#0f172a] mb-3">Facilitamos el Acuerdo Familiar</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-[#0f172a] mr-2 mt-0.5" />
                      Reunión familiar para explicar el proceso técnico
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-[#0f172a] mr-2 mt-0.5" />
                      Asesoría para designación de representante legal
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-[#0f172a] mr-2 mt-0.5" />
                      Propuesta de división que beneficie a todos
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-[#0f172a] mb-3">Requisitos Especiales</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <FileText className="w-4 h-4 text-[#0f172a] mr-2 mt-0.5" />
                      Posesión efectiva al día
                    </li>
                    <li className="flex items-start">
                      <FileText className="w-4 h-4 text-[#0f172a] mr-2 mt-0.5" />
                      Mandato firmado por todos los herederos
                    </li>
                    <li className="flex items-start">
                      <FileText className="w-4 h-4 text-[#0f172a] mr-2 mt-0.5" />
                      Acuerdo sobre el representante técnico
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg">
                <p className="text-[#0f172a] font-bold text-center">
                  💡 "Transformamos conflictos familiares en oportunidades de crecimiento patrimonial conjunto"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Llamada a la Acción Principal */}
      <section className="py-16 bg-[#0f172a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            🚀 SOLICITE SU ESTUDIO DE SUBDIVISIÓN
          </h2>
          <p className="text-xl mb-8 text-white">
            Descubra el potencial real de su terreno. Reciba un análisis preliminar sin compromiso.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-white text-gray-800">
              <CardContent className="p-6 text-center">
                <Phone className="w-12 h-12 text-[#f97316] mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2 text-white">Consulta Inmediata</h3>
                <p className="text-sm mb-4">Hable directamente con el arquitecto</p>
                <Button onClick={openWhatsApp} className="w-full bg-[#f97316] hover:bg-orange-600 rounded-lg">
                  <Phone className="mr-2 h-4 w-4" />
                  WhatsApp: +56 9 7931 6827
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white text-gray-800">
              <CardContent className="p-6 text-center">
                <Mail className="w-12 h-12 text-[#0f172a] mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2 text-white">Consulta Detallada</h3>
                <p className="text-sm mb-4">Formulario completo en página principal</p>
                <Button onClick={scrollToContact} variant="outline" className="w-full rounded-lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Formulario de Contacto
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">
                ⚡ ¿Qué Incluye Su Consulta Inicial?
              </h3>
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Análisis preliminar del CIP
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Estimación de lotes posibles
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Presupuesto personalizado
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={happyFamilySuccessImg} 
                alt="Familia feliz con proyecto de subdivisión exitoso"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-3 -right-3 bg-[#f97316] text-black p-2 rounded-lg font-bold text-xs">
                ✨ SU FUTURO EXITOSO
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0f172a] mb-4">
              ❓ PREGUNTAS FRECUENTES
            </h2>
            <p className="text-xl text-[#64748b]">
              Eliminamos todas sus dudas sobre el proceso de subdivisión
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="text-left font-bold text-[#0f172a] hover:text-[#0f172a] py-6">
                ¿Qué es la "superficie predial mínima" y por qué es tan importante?
              </AccordionTrigger>
              <AccordionContent className="text-[#64748b] pb-6">
                La superficie predial mínima es el tamaño mínimo que debe tener cada lote según la normativa municipal. 
                Está definida en el CIP y determina cuántos lotes se pueden crear. <strong>Es crucial respetarla</strong> 
                porque una subdivisión que no la cumpla será rechazada automáticamente por la Dirección de Obras.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="text-left font-bold text-[#0f172a] hover:text-[#0f172a] py-6">
                ¿Cuánto tiempo tarda todo el proceso de subdivisión?
              </AccordionTrigger>
              <AccordionContent className="text-[#64748b] pb-6">
                <strong>Subdivisión Normal:</strong> 3-4 meses desde el diseño hasta la inscripción final.
                <br/>
                <strong>Subdivisión Afecta a Utilidad Pública:</strong> 6-8 meses debido a la complejidad del proyecto de urbanización.
                <br/><br/>
                Los tiempos pueden variar según la carga de trabajo de la municipalidad y la complejidad específica del terreno.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="text-left font-bold text-[#0f172a] hover:text-[#0f172a] py-6">
                ¿Qué costos debo considerar además de sus honorarios?
              </AccordionTrigger>
              <AccordionContent className="text-[#64748b] pb-6">
                <strong>Costos adicionales típicos:</strong>
                <br/>• Derechos municipales (variable según la comuna)
                <br/>• Inscripción en el Conservador de Bienes Raíces
                <br/>• Topografía actualizada (si es necesaria)
                <br/>• En subdivisiones afectas a utilidad pública: costos de urbanización
                <br/><br/>
                Le proporcionamos un presupuesto detallado en la consulta inicial.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="text-left font-bold text-[#0f172a] hover:text-[#0f172a] py-6">
                ¿Puedo subdividir si tengo una construcción en el terreno?
              </AccordionTrigger>
              <AccordionContent className="text-[#64748b] pb-6">
                <strong>Sí, es posible</strong>, pero requiere consideraciones especiales:
                <br/>• La construcción debe quedar completamente dentro de uno de los lotes resultantes
                <br/>• Debe cumplir con las distanciamientos mínimos a los nuevos deslindes
                <br/>• Puede requerir modificaciones menores o regularizaciones
                <br/><br/>
                Evaluamos cada caso específicamente para encontrar la mejor solución técnica.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="text-left font-bold text-[#0f172a] hover:text-[#0f172a] py-6">
                ¿Necesito contratar un topógrafo por separado?
              </AccordionTrigger>
              <AccordionContent className="text-[#64748b] pb-6">
                No necesariamente. En muchos casos, <strong>el plano existente es suficiente</strong> para iniciar el proceso. 
                Solo recomendamos topografía nueva cuando:
                <br/>• El plano tiene más de 5 años de antigüedad
                <br/>• Existen diferencias significativas con la realidad actual
                <br/>• La municipalidad lo exige específicamente
                <br/><br/>
                Le indicamos en la consulta inicial si necesita topografía actualizada.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="text-left font-bold text-[#0f172a] hover:text-[#0f172a] py-6">
                ¿Qué documentos necesito para comenzar el proceso?
              </AccordionTrigger>
              <AccordionContent className="text-[#64748b] pb-6">
                <strong>Documentos esenciales:</strong>
                <br/>• Plano del terreno (preferiblemente actualizado)
                <br/>• Certificado de Informes Previos (CIP) vigente
                <br/>• Escritura de propiedad
                <br/>• Certificado de avalúo fiscal
                <br/>• Para herencias: Posesión efectiva al día
                <br/><br/>
                Si no tiene algún documento, le ayudamos a obtenerlo como parte del servicio.
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