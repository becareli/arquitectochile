import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Home, Phone, CheckCircle, Star, Shield, Zap, Heart, 
  ArrowRight, Clock, DollarSign, Users, Award, Eye,
  AlertTriangle, Target, Lightbulb, Compass, Camera
} from "lucide-react";
import Chatbot from "@/components/chatbot";
import Navigation from "@/components/navigation";

export default function DisenemosNuevosEspacios() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    document.title = "Diseño de Nuevos Espacios - Arquitecto Santiago | ArquitectoChile.com";
    
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

    setMetaTag('description', 'Transforme su hogar con diseño arquitectónico profesional. Arquitecto especialista en redistribución de espacios, ampliaciones y remodelaciones. Solo 3 proyectos por mes en Santiago.');
    setMetaTag('keywords', 'diseño arquitectónico santiago, redistribución espacios, remodelación casa, ampliación vivienda, arquitecto diseño interior, transformación hogar chile');
    setMetaTag('author', 'Patricio Becar Elissegaray - Arquitecto Universidad de Chile');
    setMetaTag('robots', 'index, follow');
    
    setMetaTag('og:title', 'Diseño de Nuevos Espacios - Arquitecto Especialista Santiago', true);
    setMetaTag('og:description', 'Transforme su hogar con diseño arquitectónico profesional. Solo 3 proyectos exclusivos por mes. Arquitecto Universidad de Chile con 26+ años experiencia.', true);
    setMetaTag('og:type', 'service', true);
    setMetaTag('og:url', 'https://arquitectochile.com/disenemos-tus-nuevos-espacios', true);
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Diseño de Nuevos Espacios",
      "description": "Servicio especializado de diseño arquitectónico para transformación de espacios residenciales",
      "provider": {
        "@type": "Person",
        "name": "Patricio Becar Elissegaray",
        "jobTitle": "Arquitecto",
        "url": "https://arquitectochile.com",
        "telephone": "+56979316827",
        "alumniOf": "Universidad de Chile"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Chile"
      },
      "serviceType": "Diseño Arquitectónico",
      "category": "Remodelación y Diseño Interior"
    };

    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (existingSchema) {
      existingSchema.remove();
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }, []);

  const openWhatsApp = () => {
    window.open('https://wa.me/56979316827?text=Hola,%20quiero%20información%20sobre%20el%20servicio%20de%20Diseño%20de%20Nuevos%20Espacios', '_blank');
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
            <div className="relative w-20 h-20 mx-auto mb-6">
              <Compass className="w-20 h-20 text-[#f97316]" />
              <Star className="w-8 h-8 text-[#f97316] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fill-current" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              ⚠️ CARTA ABIERTA A TODO PROPIETARIO<br/>
              QUE ESTÁ HARTO DE VIVIR EN ESPACIOS QUE NO LO HACEN FELIZ
            </h1>
            <div className="bg-[#f97316] text-white px-6 py-3 rounded-lg mb-8 inline-block animate-pulse">
              <p className="font-bold text-xl">
                🔥 SOLO 3 PROYECTOS POR MES - CUPOS LIMITADOS
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <p className="text-2xl font-bold mb-4">De: Patricio Becar, Arquitecto Universidad de Chile</p>
            <p className="text-xl">Para: Propietarios que sueñan con el hogar perfecto pero no saben por dónde empezar</p>
          </div>

          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            <strong>Estimado/a Propietario/a que busca transformar su vida:</strong><br/>
            Si está leyendo esto, probablemente está HARTO de vivir en espacios que no funcionan para su familia...
          </p>
        </div>
      </section>

      {/* El Problema */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0f172a] mb-6">
              ❌ ¿Le Suena Familiar Esta Situación?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 border-l-4 border-gray-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#0f172a] mb-4">😤 LA CRUDA REALIDAD:</h3>
              <ul className="space-y-3 text-[#64748b]">
                <li>• Su casa se siente pequeña y claustrofóbica</li>
                <li>• Los espacios no funcionan para su familia actual</li>
                <li>• Cada día se frustra más con la distribución</li>
                <li>• Sus invitados comentan lo "incómodo" que se siente</li>
                <li>• Su hogar no refleja quién es usted realmente</li>
                <li>• Ha postergado el cambio por años "por falta de tiempo"</li>
              </ul>
            </div>

            <div className="bg-gray-50 border-l-4 border-[#f97316] p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#0f172a] mb-4">💸 LO QUE ESTO LE ESTÁ COSTANDO:</h3>
              <ul className="space-y-3 text-[#64748b]">
                <li>• <strong>Estrés diario</strong> por espacios disfuncionales</li>
                <li>• <strong>Dinero perdido</strong> en "soluciones temporales"</li>
                <li>• <strong>Tiempo perdido</strong> buscando "DIY" en YouTube</li>
                <li>• <strong>Relaciones tensas</strong> por espacios inadecuados</li>
                <li>• <strong>Valor de propiedad</strong> que no crece</li>
                <li>• <strong>Oportunidades perdidas</strong> de disfrutar su hogar</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              🚨 PERO AQUÍ ESTÁ EL VERDADERO PROBLEMA...
            </h3>
            <p className="text-xl leading-relaxed">
              <strong>No es que no tenga dinero... No es que no tenga tiempo...</strong><br/>
              El problema real es que <span className="underline">NO SABE POR DÓNDE EMPEZAR</span> y tiene MIEDO de tomar 
              la decisión equivocada y desperdiciar su inversión.
            </p>
          </div>
        </div>
      </section>

      {/* La Solución */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0f172a] mb-6">
              ✅ DESCUBRA EL MÉTODO QUE YA HA TRANSFORMADO<br/>
              MÁS DE 500+ HOGARES EN CHILE
            </h2>
            <p className="text-xl text-[#64748b] max-w-4xl mx-auto">
              Mi método "DISEÑO DE VIDA" garantiza que su hogar se convierta en el refugio perfecto 
              para su familia, sin errores costosos y sin eternos re-trabajos.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-center text-[#0f172a] mb-6">
              🎯 EL HOGAR QUE SIEMPRE IMAGINASTE, DISEÑADO ESPECÍFICAMENTE PARA TU ESTILO DE VIDA
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-[#0f172a] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2 text-[#0f172a]">100% PERSONALIZADO</h4>
                <p className="text-sm text-[#64748b]">Diseñado específicamente para SU familia y SU estilo de vida</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#0f172a] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2 text-[#0f172a]">VISUALIZACIÓN 3D</h4>
                <p className="text-sm text-[#64748b]">Vea su futuro hogar antes de construir una sola pared</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#0f172a] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2 text-[#0f172a]">GARANTÍA LEGAL</h4>
                <p className="text-sm text-[#64748b]">Cumplimiento normativo total y permisos garantizados</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-[#0f172a] mb-6">✨ LO QUE OBTENDRÁ:</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#0f172a] mr-3 mt-1" />
                  <span><strong>Diseño 100% personalizado</strong> que refleja su personalidad y necesidades familiares</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#0f172a] mr-3 mt-1" />
                  <span><strong>Planos completos ejecutivos</strong> listos para construir sin sorpresas</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#0f172a] mr-3 mt-1" />
                  <span><strong>Optimización inteligente</strong> de cada metro cuadrado de su espacio</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#0f172a] mr-3 mt-1" />
                  <span><strong>Asesoría completa</strong> en materiales, acabados y presupuesto</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#0f172a] mr-3 mt-1" />
                  <span><strong>Modelado 3D fotorealista</strong> para que vea exactamente cómo quedará</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#0f172a] mr-3 mt-1" />
                  <span><strong>Acompañamiento total</strong> desde la idea hasta la construcción final</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#0f172a] mb-6">🚀 LO QUE ESTO SIGNIFICA PARA USTED:</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Zap className="w-6 h-6 text-[#0f172a] mr-3 mt-1" />
                  <span><strong>Tranquilidad total:</strong> No más noches sin dormir preocupándose por errores</span>
                </div>
                <div className="flex items-start">
                  <Zap className="w-6 h-6 text-[#0f172a] mr-3 mt-1" />
                  <span><strong>Ahorro garantizado:</strong> Evita sobre-costos por cambios durante la construcción</span>
                </div>
                <div className="flex items-start">
                  <Zap className="w-6 h-6 text-[#0f172a] mr-3 mt-1" />
                  <span><strong>Tiempo protegido:</strong> No más fines de semana perdidos "investigando"</span>
                </div>
                <div className="flex items-start">
                  <Zap className="w-6 h-6 text-[#0f172a] mr-3 mt-1" />
                  <span><strong>Orgullo familiar:</strong> Un hogar que sus hijos recordarán toda la vida</span>
                </div>
                <div className="flex items-start">
                  <Zap className="w-6 h-6 text-[#0f172a] mr-3 mt-1" />
                  <span><strong>Valor incrementado:</strong> Su propiedad vale significativamente más</span>
                </div>
                <div className="flex items-start">
                  <Zap className="w-6 h-6 text-[#0f172a] mr-3 mt-1" />
                  <span><strong>Legado familiar:</strong> Un hogar diseñado para generaciones</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* El Método */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0f172a] mb-6">
              🎯 EL MÉTODO "DISEÑO DE VIDA" DE 5 PASOS
            </h2>
            <p className="text-xl text-[#64748b]">
              El mismo proceso que usé para transformar más de 500 hogares en los últimos 26 años
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#0f172a]">
              <div className="flex items-start">
                <div className="bg-[#0f172a] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-6">1</div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4">📋 ANÁLISIS PROFUNDO DE SUS NECESIDADES</h3>
                  <p className="text-[#64748b] mb-4">
                    <strong>No comenzamos dibujando...</strong> Comenzamos ENTENDIENDO. Analizamos cómo vive su familia, 
                    qué necesita realmente, y cuáles son sus sueños no confesados para su hogar.
                  </p>
                  <ul className="list-disc list-inside text-[#64748b] space-y-1">
                    <li>Entrevista familiar detallada</li>
                    <li>Análisis de rutinas diarias</li>
                    <li>Definición de presupuesto realista</li>
                    <li>Identificación de prioridades</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#0f172a]">
              <div className="flex items-start">
                <div className="bg-[#0f172a] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-6">2</div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4">🔍 FACTIBILIDAD LEGAL Y TÉCNICA</h3>
                  <p className="text-[#64748b] mb-4">
                    <strong>Protegemos su inversión desde el día 1.</strong> Verificamos que su proyecto sea 100% legal 
                    y viable antes de invertir un peso en diseño.
                  </p>
                  <ul className="list-disc list-inside text-[#64748b] space-y-1">
                    <li>Revisión completa de normativas municipales</li>
                    <li>Análisis del Plan Regulador Comunal</li>
                    <li>Certificado de Informes Previos</li>
                    <li>Viabilidad técnica del terreno</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#0f172a]">
              <div className="flex items-start">
                <div className="bg-[#0f172a] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-6">3</div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4">🎨 DISEÑO COLABORATIVO EN 3D</h3>
                  <p className="text-[#64748b] mb-4">
                    <strong>Aquí es donde la magia sucede.</strong> Creamos su hogar virtualmente, probamos diferentes 
                    opciones, y refinamos hasta que sea PERFECTO.
                  </p>
                  <ul className="list-disc list-inside text-[#64748b] space-y-1">
                    <li>Modelado 3D fotorealista en tiempo real</li>
                    <li>Múltiples opciones de distribución</li>
                    <li>Visualización de materiales y acabados</li>
                    <li>Recorridos virtuales del espacio</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#f97316]">
              <div className="flex items-start">
                <div className="bg-[#f97316] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-6">4</div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4">📐 DOCUMENTACIÓN EJECUTIVA COMPLETA</h3>
                  <p className="text-[#64748b] mb-4">
                    <strong>Planos que cualquier constructor puede entender.</strong> Documentación tan detallada 
                    que elimina errores y sobre-costos durante la construcción.
                  </p>
                  <ul className="list-disc list-inside text-[#64748b] space-y-1">
                    <li>Planos ejecutivos detallados</li>
                    <li>Especificaciones técnicas completas</li>
                    <li>Lista de materiales optimizada</li>
                    <li>Expediente para permiso municipal</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#f97316]">
              <div className="flex items-start">
                <div className="bg-[#f97316] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-6">5</div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4">🏛️ PERMISOS Y ACOMPAÑAMIENTO</h3>
                  <p className="text-[#64748b] mb-4">
                    <strong>Nos hacemos cargo de la burocracia.</strong> Gestionamos todos los permisos municipales 
                    y lo acompañamos hasta que su sueño sea realidad.
                  </p>
                  <ul className="list-disc list-inside text-[#64748b] space-y-1">
                    <li>Gestión completa de permisos municipales</li>
                    <li>Asesoría durante la construcción</li>
                    <li>Supervisión técnica opcional</li>
                    <li>Soporte hasta la recepción final</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Autoridad y Credibilidad */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0f172a] mb-6">
              👨‍🎓 ¿POR QUÉ PATRICIO BECAR ES SU MEJOR OPCIÓN?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-[#0f172a] mb-6">🏆 CREDENCIALES QUE IMPORTAN:</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-[#0f172a] mr-3" />
                  <span><strong>Arquitecto Universidad de Chile</strong> (1999)</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-[#0f172a] mr-3" />
                  <span><strong>26+ años</strong> diseñando espacios que transforman vidas</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-[#0f172a] mr-3" />
                  <span><strong>Magíster en Gestión</strong> para la Globalización</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-[#0f172a] mr-3" />
                  <span><strong>Master in Management</strong> - Universidad Macquarie, Australia</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-[#0f172a] mr-3" />
                  <span><strong>Ex-funcionario municipal</strong> - conozco el sistema por dentro</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-[#0f172a] mb-6">📊 RESULTADOS COMPROBADOS:</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#0f172a] mb-2">500+</div>
                  <div className="text-sm text-[#64748b]">Proyectos Completados</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#0f172a] mb-2">26</div>
                  <div className="text-sm text-[#64748b]">Años de Experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#f97316] mb-2">100%</div>
                  <div className="text-sm text-[#64748b]">Permisos Aprobados</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#f97316] mb-2">0</div>
                  <div className="text-sm text-[#64748b]">Proyectos Rechazados</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing y Urgencia */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0f172a] mb-6">
              💰 INVERSIÓN Y CUPOS LIMITADOS
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-[#0f172a] mb-4">🔥 SOLO 3 PROYECTOS POR MES</h3>
              <p className="text-xl text-[#64748b]">
                Para garantizar la calidad que usted merece, limitamos nuestros cupos a solo 3 familias por mes.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <h4 className="text-2xl font-bold text-center text-[#0f172a] mb-6">INVERSIÓN COMPLETA:</h4>
              
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-[#0f172a] mb-4">$2.490.000</div>
                <p className="text-xl text-[#64748b]">
                  <strong>Incluye TODO:</strong> Análisis, Diseño 3D, Planos Ejecutivos, Permisos y Acompañamiento
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-bold mb-3 text-[#0f172a]">✅ LO QUE ESTÁ INCLUIDO:</h5>
                  <ul className="text-sm space-y-1 text-[#64748b]">
                    <li>• Análisis completo de necesidades</li>
                    <li>• Factibilidad legal y técnica</li>
                    <li>• Diseño arquitectónico personalizado</li>
                    <li>• Modelado 3D fotorealista</li>
                    <li>• Planos ejecutivos completos</li>
                    <li>• Gestión de permisos municipales</li>
                    <li>• Acompañamiento hasta construcción</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold mb-3 text-[#0f172a]">💡 VALOR REAL:</h5>
                  <ul className="text-sm space-y-1 text-[#64748b]">
                    <li>• Evita errores de $5+ millones</li>
                    <li>• Ahorra 6+ meses de tiempo</li>
                    <li>• Incrementa valor propiedad 15-25%</li>
                    <li>• Tranquilidad total para familia</li>
                    <li>• Hogar diseñado para toda la vida</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#0f172a] text-white rounded-lg p-6 text-center">
              <h4 className="text-xl font-bold mb-4">⏰ ADVERTENCIA IMPORTANTE:</h4>
              <p className="text-lg">
                Debido a la alta demanda y nuestro compromiso con la excelencia, 
                <strong> los cupos para este mes se agotan rápidamente.</strong><br/>
                No postergue más su sueño.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-16 bg-[#0f172a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            🚀 RESERVE SU CUPO AHORA
          </h2>
          <p className="text-xl mb-8">
            No deje que otro mes pase viviendo en un espacio que no lo hace feliz.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={openWhatsApp}
              className="bg-[#f97316] hover:bg-orange-600 text-white px-8 py-4 text-lg font-bold rounded-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              WhatsApp +56 9 7931 6827
            </Button>
            <Button 
              onClick={scrollToContact}
              className="bg-white hover:bg-gray-100 text-[#0f172a] px-8 py-4 text-lg font-bold rounded-lg"
            >
              Solicitar Reunión Gratuita
            </Button>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
            <p className="text-lg">
              <strong>P.D.:</strong> Recuerde que solo trabajamos con 3 familias por mes. 
              Si realmente está listo para transformar su vida a través de su hogar, 
              no espere más.
            </p>
          </div>
        </div>
      </section>
      <Chatbot />
    </div>
  );
}
