import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, Phone, CheckCircle, Star, Shield, Zap, AlertTriangle, 
  ArrowRight, Clock, DollarSign, Users, Award, Eye, Camera,
  FileText, Search, Wrench, ThermometerSun, Building, Mail,
  Target, TrendingUp, TrendingDown, MapPin, CheckSquare, Calculator,
  BarChart3, Clipboard, MessageCircle
} from "lucide-react";
import Chatbot from "@/components/chatbot";
import Footer from "@/components/footer";

// Import generated images
import confusedFamilyImg from "@assets/generated_images/Confused_family_property_anxiety_64cc6752.png";
import authorityArchitectImg from "@assets/generated_images/Authority_architect_diploma_certificate_a1d080dd.png";
import professionalReportImg from "@assets/generated_images/Professional_appraisal_report_document_7522a297.png";
import workflowInfographicImg from "@assets/generated_images/Appraisal_process_workflow_infographic_4c8810d1.png";
import successComparisonImg from "@assets/generated_images/Property_valuation_success_comparison_df77c676.png";
import happyFamilyImg from "@assets/generated_images/Happy_family_property_success_aaa72930.png";

export default function TasacionViviendasUrbanas() {
  const [, setLocation] = useLocation();

  // SEO Meta tags optimization
  useEffect(() => {
    document.title = "Tasación de Viviendas Urbanas Chile - Arquitecto Tasador Universidad de Chile";
    
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

    setMetaTag('description', 'Tasación profesional de viviendas urbanas por arquitecto con Diplomado Universidad de Chile. Conoce el valor real de tu propiedad. Informe detallado para venta o compra segura.');
    setMetaTag('keywords', 'tasación vivienda urbana chile, arquitecto tasador universidad chile, valor comercial propiedad, tasación inmueble santiago, informe tasación profesional');
    setMetaTag('og:title', 'Tasación Profesional de Viviendas - Arquitecto U. de Chile', true);
    setMetaTag('og:description', 'Descubre el valor real de tu propiedad con tasación profesional. Arquitecto certificado Universidad de Chile te entrega informe completo para negociar con confianza.', true);
    setMetaTag('og:type', 'website', true);

    // JSON-LD Schema for better SEO
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Tasación de Viviendas Urbanas",
      "description": "Tasación profesional de viviendas urbanas por arquitecto con Diplomado en Tasación de Inmuebles Urbanos de la Universidad de Chile.",
      "provider": {
        "@type": "Person",
        "name": "Patricio Becar Elissegaray",
        "jobTitle": "Arquitecto Tasador",
        "url": "https://arquitectochile.com",
        "telephone": "+56979316827",
        "hasCredential": "Diplomado en Tasación de Inmuebles Urbanos - Universidad de Chile"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Chile"
      },
      "serviceType": "Real Estate Appraisal"
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
    const message = "Hola Patricio, necesito una tasación profesional de mi vivienda urbana. ¿Podrías ayudarme con una cotización?";
    window.open(`https://wa.me/56979316827?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollToContact = () => {
    setLocation('/#contacto');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Gary Halbert Style */}
      <section className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Badge className="bg-yellow-500 text-black mb-4 text-sm font-bold px-4 py-2">
              🏠 DIPLOMADO UNIVERSIDAD DE CHILE
            </Badge>
            
            <div className="relative w-20 h-20 mx-auto mb-6">
              <Calculator className="w-20 h-20 text-emerald-300" />
              <Shield className="w-8 h-8 text-yellow-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            {/* 1. Titular Principal - Gary Halbert Style - 3 Opciones */}
            <div className="mb-8">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                🔍 EL PRECIO JUSTO DE SU CASA EN SANTIAGO,<br/>
                REVELADO POR UN ARQUITECTO TASADOR DE LA U. DE CHILE
              </h1>
              
              {/* Alternativas de titular comentadas */}
              {/* 
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                💰 DESCUBRA CUÁNTOS MILLONES VALE REALMENTE SU PROPIEDAD<br/>
                (ANTES DE VENDER O COMPRAR)
              </h1>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                ⚖️ LA TASACIÓN QUE DETERMINA SI USTED GANA O PIERDE MILLONES<br/>
                EN SU PRÓXIMA TRANSACCIÓN INMOBILIARIA
              </h1>
              */}
            </div>
            
            {/* 2. Sección de Héroe - Russell Brunson Style */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
              <p className="text-2xl leading-relaxed">
                Si está a punto de <strong>vender su propiedad</strong> o <strong>comprar una nueva vivienda</strong>, 
                hay una pregunta que no lo deja dormir: <em>"¿Cuánto vale REALMENTE mi casa?"</em>
                <br/><br/>
                Esa incertidumbre puede costarle <strong>millones de pesos</strong> si toma la decisión equivocada.
              </p>
            </div>
            
            {/* Imagen 1: Problema - Familia Confundida */}
            <div className="flex justify-center mb-8">
              <img 
                src={confusedFamilyImg}
                alt="Familia chilena preocupada por el valor de su propiedad, revisando documentos con incertidumbre sobre tasación inmobiliaria"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problema y Agitación - Alex Hormozi Style */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-800 mb-6">
              ⚠️ LOS RIESGOS DE NO CONOCER EL VALOR REAL DE SU PROPIEDAD
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-red-100 border-red-300">
              <CardHeader>
                <CardTitle className="text-2xl text-red-800 flex items-center">
                  <TrendingDown className="w-8 h-8 mr-3" />
                  SI VA A VENDER
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-red-700">
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-red-600" />
                    <span>Vender por menos y dejar <strong>millones de pesos sobre la mesa</strong></span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-red-600" />
                    <span>Negociaciones fallidas por <strong>pedir un precio irreal</strong></span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-red-600" />
                    <span>Meses sin vender por <strong>incertidumbre en el precio</strong></span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-red-600" />
                    <span>Compradores desconfiados que <strong>no creen en su precio</strong></span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-red-100 border-red-300">
              <CardHeader>
                <CardTitle className="text-2xl text-red-800 flex items-center">
                  <TrendingUp className="w-8 h-8 mr-3" />
                  SI VA A COMPRAR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-red-700">
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-red-600" />
                    <span>Pagar de más y empezar su nueva vida con <strong>una deuda injusta</strong></span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-red-600" />
                    <span>Desconfianza total: <strong>"¿Me están estafando?"</strong></span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-red-600" />
                    <span>Perder oportunidades por <strong>no saber si el precio es justo</strong></span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-red-600" />
                    <span>Arrepentimiento de por vida: <strong>"Pagué demasiado"</strong></span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. La Solución - Vilma Núñez Style */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-emerald-800 mb-8">
            ✅ LA SOLUCIÓN DEFINITIVA: TASACIÓN PROFESIONAL DE VIVIENDAS URBANAS
          </h2>
          
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Una <strong>tasación profesional</strong> no es solo un número en un papel. Es su <strong>herramienta de poder</strong> 
              para negociar con confianza total, conociendo exactamente cuánto vale su propiedad en el mercado actual.
            </p>
            
            <p className="text-lg text-gray-600 mb-8">
              Elimina la incertidumbre, le da argumentos sólidos para negociar y le garantiza que está tomando 
              la decisión financiera más inteligente de su vida.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-emerald-800 mb-2">SEGURIDAD TOTAL</h3>
                <p className="text-gray-600">Conoce el valor exacto respaldado por análisis profesional</p>
              </div>
              <div className="text-center">
                <Target className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-emerald-800 mb-2">PODER DE NEGOCIACIÓN</h3>
                <p className="text-gray-600">Argumentos sólidos para defender su precio o regatear</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-emerald-800 mb-2">TRANQUILIDAD</h3>
                <p className="text-gray-600">Decisión informada sin dudas ni remordimientos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Presentación de la Autoridad - Vilma Núñez Style */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              🎓 SU GUÍA EXPERTO: ARQUITECTO CON DIPLOMADO DE LA UNIVERSIDAD DE CHILE
            </h2>
          </div>
          
          {/* Imagen 2: Autoridad - Arquitecto con Diploma */}
          <div className="flex justify-center mb-8">
            <img 
              src={authorityArchitectImg}
              alt="Arquitecto profesional con Diplomado Universidad de Chile en Tasación de Inmuebles Urbanos, autoridad certificada MINVU"
              className="rounded-lg shadow-xl max-w-md h-auto"
            />
          </div>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl text-blue-800">PATRICIO BECAR ELISSEGARAY</CardTitle>
              <p className="text-xl text-blue-600 font-semibold">Arquitecto • Universidad de Chile</p>
              <Badge className="bg-yellow-500 text-black text-lg px-4 py-2 mt-2">
                DIPLOMADO EN TASACIÓN DE INMUEBLES URBANOS
              </Badge>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                Con más de <strong>15 años de experiencia</strong> en el mercado inmobiliario chileno y un 
                <strong> Diplomado especializado en Tasación de Inmuebles Urbanos</strong> otorgado por la prestigiosa 
                Universidad de Chile, Patricio no es solo un arquitecto: es su <strong>aliado estratégico</strong> para 
                tomar la decisión inmobiliaria más importante de su vida.
                <br/><br/>
                Su formación académica especializada y experiencia práctica le permiten entregar tasaciones 
                <strong> precisas, fundamentadas y respaldadas</strong> que los bancos, notarios y tribunales reconocen y respetan.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 6. ¿Qué Obtendrás Exactamente? - Alex Hormozi Value Stack */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              📋 SU DOSSIER DE INTELIGENCIA INMOBILIARIA
            </h2>
            <p className="text-xl">
              No es solo un informe. Es su <strong>arma secreta</strong> para negociar con confianza total.
            </p>
          </div>
          
          {/* Imagen 3: Valor - Informe Profesional */}
          <div className="flex justify-center mb-8">
            <img 
              src={professionalReportImg}
              alt="Informe de tasación profesional detallado con análisis de mercado, evaluación técnica y valor comercial fundamentado"
              className="rounded-lg shadow-xl max-w-lg h-auto"
            />
          </div>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-white">
                LO QUE RECIBIRÁ EN SU INFORME PROFESIONAL:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <BarChart3 className="w-6 h-6 mr-3 mt-1 text-emerald-400" />
                    <div>
                      <strong>Análisis Comparativo de Mercado</strong>
                      <p className="text-gray-300 text-sm">Propiedades similares vendidas recientemente en su sector</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Building className="w-6 h-6 mr-3 mt-1 text-emerald-400" />
                    <div>
                      <strong>Evaluación de Calidad Constructiva</strong>
                      <p className="text-gray-300 text-sm">Estado de terminaciones, materialidad y conservación</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="w-6 h-6 mr-3 mt-1 text-emerald-400" />
                    <div>
                      <strong>Revisión Normativa Urbana</strong>
                      <p className="text-gray-300 text-sm">Regulaciones municipales que afectan el valor</p>
                    </div>
                  </li>
                </ul>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Calculator className="w-6 h-6 mr-3 mt-1 text-emerald-400" />
                    <div>
                      <strong>Valor Comercial Fundamentado</strong>
                      <p className="text-gray-300 text-sm">Precio justo calculado con metodología profesional</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Target className="w-6 h-6 mr-3 mt-1 text-emerald-400" />
                    <div>
                      <strong>Conclusiones y Recomendaciones</strong>
                      <p className="text-gray-300 text-sm">Estrategias claras para su negociación</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-6 h-6 mr-3 mt-1 text-emerald-400" />
                    <div>
                      <strong>Respaldo Legal y Técnico</strong>
                      <p className="text-gray-300 text-sm">Válido para bancos, notarías y tribunales</p>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 7. ¿Cómo Funciona el Servicio? - Russell Brunson Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              🔄 PROCESO SIMPLE EN 4 PASOS
            </h2>
            <p className="text-xl text-gray-600">
              Diseñado para su comodidad y tranquilidad total
            </p>
          </div>
          
          {/* Imagen 4: Proceso - Infografía Workflow */}
          <div className="flex justify-center mb-12">
            <img 
              src={workflowInfographicImg}
              alt="Proceso de tasación paso a paso: contacto, documentos, análisis profesional y entrega de informe detallado"
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <CardTitle className="text-xl text-emerald-800">CONTACTO Y SOLICITUD</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nos contacta vía WhatsApp o formulario. Le explicamos el proceso y coordinamos.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <CardTitle className="text-xl text-emerald-800">ENVÍO DE ANTECEDENTES</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Usted envía permisos, recepciones, planos, CIP y documentos de la propiedad.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <CardTitle className="text-xl text-emerald-800">ANÁLISIS PROFESIONAL</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nuestro arquitecto analiza, investiga el mercado y confecciona su informe detallado.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <CardTitle className="text-xl text-emerald-800">RECEPCIÓN DEL INFORME</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Recibe su Dossier de Inteligencia Inmobiliaria vía email en formato PDF profesional.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 8. Llamada a la Acción Principal - CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            🚀 TOME EL CONTROL DE SU NEGOCIACIÓN HOY
          </h2>
          
          <p className="text-2xl mb-8">
            No deje que la incertidumbre le cueste millones de pesos
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={openWhatsApp}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-xl px-12 py-6"
            >
              <Calculator className="w-6 h-6 mr-3" />
              COTIZAR MI TASACIÓN AHORA
            </Button>
          </div>
          
          <p className="text-lg opacity-90">
            📞 Reciba una propuesta sin compromiso en menos de 24 horas
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-8">
            <p className="text-lg">
              <strong>Atención personalizada:</strong> Hablamos directamente con usted, sin intermediarios, 
              para entender exactamente sus necesidades y entregar la tasación más precisa posible.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Preguntas Frecuentes - Vilma Núñez FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              ❓ PREGUNTAS FRECUENTES
            </h2>
            <p className="text-xl text-gray-600">
              Resolvemos sus dudas más comunes
            </p>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-xl text-emerald-800">
                  ✅ ¿Por qué necesito un arquitecto y no un tasador de banco?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Los tasadores de banco trabajan para la institución financiera, no para usted. Nosotros somos 
                  <strong> completamente independientes</strong> y nuestro único compromiso es entregarle el valor 
                  real y justo de su propiedad. Además, como arquitectos, entendemos aspectos constructivos y 
                  normativos que otros tasadores pueden pasar por alto.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-xl text-emerald-800">
                  📋 ¿Qué documentos necesito para la tasación?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Necesitamos: <strong>permisos de edificación, certificado de recepción final, planos aprobados, 
                  CIP (Certificado de Informaciones Previas), escritura de la propiedad</strong> y cualquier documento 
                  que acredite modificaciones o ampliaciones. Si no tiene alguno, le ayudamos a obtenerlo.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-xl text-emerald-800">
                  ⏰ ¿En cuánto tiempo tendré mi informe?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Una vez que recibimos todos los antecedentes, <strong>entregamos su informe en un plazo máximo 
                  de 7 días hábiles</strong>. Para casos urgentes, podemos acelerar el proceso con un recargo adicional 
                  y entregar en 3-4 días hábiles.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-xl text-emerald-800">
                  🏛️ ¿Esta tasación me sirve para el banco?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  <strong>Absolutamente sí.</strong> Nuestras tasaciones están realizadas bajo normativas profesionales 
                  y son reconocidas por bancos, notarías y tribunales. El informe incluye toda la fundamentación 
                  técnica y legal necesaria para cualquier trámite oficial.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 10. Cierre y Última Llamada a la Acción - Gary Halbert / Alex Hormozi */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">
            ⚡ NO DEJE QUE LA DUDA LE CUESTE MILLONES
          </h2>
          
          <div className="bg-red-600/20 border border-red-500 rounded-lg p-8 mb-8">
            <p className="text-2xl mb-6">
              Cada día que pasa sin conocer el valor real de su propiedad es un día más cerca de cometer 
              el <strong>error financiero más costoso</strong> de su vida.
            </p>
            
            <p className="text-xl mb-6">
              Mientras usted duda, otros están tomando <strong>decisiones informadas</strong> y obteniendo 
              las mejores oportunidades del mercado.
            </p>
          </div>
          
          <div className="bg-emerald-600/20 border border-emerald-500 rounded-lg p-8 mb-8">
            <p className="text-2xl font-bold text-emerald-400 mb-4">
              TOME EL CONTROL DE SU NEGOCIACIÓN HOY
            </p>
            <p className="text-lg">
              Una inversión pequeña en una tasación profesional puede ahorrarle millones en su transacción inmobiliaria.
            </p>
          </div>
          
          {/* Imagen 5: Comparación de Éxito - Valores de Propiedades */}
          <div className="flex justify-center mb-8">
            <img 
              src={successComparisonImg}
              alt="Comparación exitosa de valores de propiedades chilenas, mostrando beneficios de tasación profesional en negociación inmobiliaria"
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
          
          <Button 
            onClick={openWhatsApp}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-2xl px-16 py-8 mb-6"
          >
            <Phone className="w-8 h-8 mr-4" />
            CONTACTAR ARQUITECTO TASADOR AHORA
          </Button>
          
          <p className="text-lg opacity-75">
            WhatsApp directo: +56 9 7931 6827 | Respuesta garantizada en menos de 2 horas
          </p>
          
          {/* Imagen 6: Resultado Final - Familia Feliz */}
          <div className="flex justify-center mt-8">
            <img 
              src={happyFamilyImg}
              alt="Familia chilena feliz celebrando éxito en transacción inmobiliaria gracias a tasación profesional arquitecto"
              className="rounded-lg shadow-xl max-w-md h-auto"
            />
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}