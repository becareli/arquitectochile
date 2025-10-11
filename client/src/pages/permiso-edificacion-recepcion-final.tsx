import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, CheckCircle, Star, Shield, AlertTriangle, 
  ArrowRight, Clock, DollarSign, Award, FileText,
  Home, BadgeCheck, TrendingUp, Zap, Scale, Building2,
  ClipboardCheck, BanknoteIcon, Timer
} from "lucide-react";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

export default function PermisoEdificacionRecepcionFinal() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    document.title = "Permiso de Edificación y Recepción Final Chile | ArquitectoChile";
    
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

    setMetaTag('description', 'Permiso de Edificación y Recepción Final en Chile. Gestión integral DOM con arquitecto certificado. Evita rechazos costosos y legaliza tu construcción en tiempo récord.');
    setMetaTag('keywords', 'permiso edificación chile, recepción final DOM, tramites construcción, permiso municipal, arquitecto certificado');
    setMetaTag('og:title', 'Permiso de Edificación + Recepción Final - Proceso Garantizado', true);
    setMetaTag('og:description', 'Legaliza tu construcción sin rechazos ni demoras. Gestión integral desde Permiso hasta Recepción Final con arquitecto certificado.', true);
    setMetaTag('og:type', 'website', true);

    return () => {
      const titleTag = document.querySelector('title');
      if (titleTag) titleTag.textContent = 'ArquitectoChile.com - Servicios de Arquitectura';
    };
  }, []);

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola Patricio, necesito ayuda con Permiso de Edificación y/o Recepción Final. Quisiera recibir más información.");
    window.open(`https://wa.me/56979316827?text=${message}`, '_blank');
  };

  const scrollToContact = () => {
    setLocation('/#contacto');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section - Gary Halbert Style */}
      <section className="relative bg-gradient-to-br from-[hsl(210,15%,30%)] via-[hsl(210,15%,25%)] to-[hsl(210,15%,20%)] text-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge className="bg-red-600 text-white mb-6 px-6 py-3 text-base font-bold animate-pulse">
              🚨 EVITA RECHAZOS COSTOSOS Y MULTAS MILLONARIAS
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-5xl md:text-6xl font-black mb-8 leading-tight">
                ¿Necesita <span className="text-[hsl(14,70%,50%)]">LEGALIZAR</span> su Construcción sin Rechazos ni Demoras?
              </h1>
              <p className="text-xl mb-8 text-gray-200 leading-relaxed">
                Gestión integral de <strong>Permiso de Edificación y Recepción Final</strong> con arquitecto certificado MINVU. <strong>Garantizamos aprobación</strong> y cumplimiento normativo completo.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={openWhatsApp} 
                  size="lg" 
                  className="bg-[hsl(14,70%,50%)] hover:bg-[hsl(14,70%,45%)] text-white font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                  data-testid="button-whatsapp-hero"
                >
                  <Phone className="mr-2 h-6 w-6" />
                  CONSULTA GRATUITA AHORA
                </Button>
                <Button 
                  onClick={scrollToContact} 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 text-white border-white hover:bg-white/20 font-semibold text-lg px-8 py-6 backdrop-blur-sm transition-all duration-300"
                  data-testid="button-cotizacion-hero"
                >
                  <FileText className="mr-2 h-6 w-6" />
                  COTIZAR MI PROYECTO
                </Button>
              </div>

              <div className="flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Award className="text-[hsl(14,70%,50%)]" size={40} />
                <div>
                  <p className="font-bold text-lg">Certificación MINVU ROL 00237-13</p>
                  <p className="text-sm text-gray-300">26+ años experiencia | 150+ proyectos aprobados</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border-2 border-white/20">
              <h3 className="font-serif text-3xl font-bold mb-6 text-center">Proceso Completo Garantizado</h3>
              <div className="space-y-6">
                {[
                  { icon: FileText, title: "Permiso de Edificación", desc: "Aprobación en 15 días con revisor independiente", color: "text-blue-400" },
                  { icon: Building2, title: "Construcción Legal", desc: "Ejecuta tu obra con respaldo normativo completo", color: "text-green-400" },
                  { icon: BadgeCheck, title: "Recepción Final", desc: "Certifica y legaliza tu propiedad para uso inmediato", color: "text-[hsl(14,70%,50%)]" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                      <item.icon className={item.color} size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Problema - Russell Brunson Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-[hsl(210,15%,30%)] mb-8">
            ¿Le Suena Familiar Alguna de Estas Situaciones?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: AlertTriangle, text: "Su solicitud fue RECHAZADA por errores que no vio", color: "text-red-600" },
              { icon: Timer, text: "Lleva MESES esperando aprobación sin respuestas", color: "text-orange-600" },
              { icon: DollarSign, text: "Le cobraron MULTAS por construir sin permiso", color: "text-yellow-600" },
              { icon: Home, text: "No puede VENDER porque falta recepción final", color: "text-blue-600" }
            ].map((item, index) => (
              <Card key={index} className="border-2 hover:border-[hsl(14,70%,50%)] transition-all duration-300 shadow-lg">
                <CardContent className="pt-6">
                  <item.icon className={`${item.color} mx-auto mb-4`} size={48} />
                  <p className="font-semibold text-lg text-gray-800">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-8 shadow-xl">
            <p className="font-serif text-2xl font-bold mb-4">
              "El 70% de las solicitudes son RECHAZADAS por errores evitables"
            </p>
            <p className="text-lg">
              Cada rechazo significa <strong>60 días más de espera, costos adicionales y estrés innecesario.</strong> Pero existe una forma GARANTIZADA de aprobar a la primera.
            </p>
          </div>
        </div>
      </section>

      {/* Qué Incluye el Servicio */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl font-bold text-[hsl(210,15%,30%)] mb-6">
              Servicio Integral: De Permiso a Recepción Final
            </h2>
            <p className="text-2xl text-[hsl(14,70%,50%)] font-semibold">
              Todo lo que Necesita en un Solo Paquete
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Permiso de Edificación */}
            <Card className="border-4 border-[hsl(210,15%,30%)] shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-[hsl(210,15%,30%)] to-[hsl(210,15%,25%)] text-white">
                <FileText className="mx-auto mb-4" size={56} />
                <CardTitle className="font-serif text-3xl text-center">Permiso de Edificación</CardTitle>
                <p className="text-center text-lg mt-2">Aprobación DOM Garantizada</p>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {[
                  "📋 Revisión completa de antecedentes y planos",
                  "✅ Informe Favorable de Revisor Independiente MINVU",
                  "⚡ Aprobación en 15 días (vs 30 días normales)",
                  "💰 30% descuento en derechos municipales por LEY",
                  "🛡️ Garantía de cumplimiento normativo OGUC/LGUC",
                  "📱 Gestión integral: presentación y seguimiento DOM",
                  "⚖️ Respaldo legal certificación N° 369500 vigente"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-[hsl(14,70%,50%)] flex-shrink-0 mt-1" size={24} />
                    <p className="text-gray-700 leading-tight">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recepción Final */}
            <Card className="border-4 border-[hsl(14,70%,50%)] shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-[hsl(14,70%,50%)] to-[hsl(14,65%,45%)] text-white">
                <BadgeCheck className="mx-auto mb-4" size={56} />
                <CardTitle className="font-serif text-3xl text-center">Recepción Final</CardTitle>
                <p className="text-center text-lg mt-2">Legalización Completa</p>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {[
                  "🏠 Certificación que obra cumple con permiso aprobado",
                  "✅ Informe técnico de arquitecto certificando conformidad",
                  "📐 Planos As-Built (como se construyó realmente)",
                  "🔥 Certificados de Bomberos y plan de evacuación",
                  "⚡ Tramitación en 15 días con revisor independiente",
                  "💼 SIN COSTO adicional de derechos municipales",
                  "🏆 Autorización legal para habitar, vender o arrendar"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-[hsl(210,15%,30%)] flex-shrink-0 mt-1" size={24} />
                    <p className="text-gray-700 leading-tight">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beneficios - Vilma Núñez Emotional Style */}
      <section className="py-20 bg-gradient-to-br from-[hsl(14,70%,50%)] to-[hsl(14,80%,55%)] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl font-bold mb-6">
              ¿Por Qué Elegirnos para Legalizar Su Construcción?
            </h2>
            <p className="text-2xl font-semibold">
              La Diferencia que Marca el Éxito
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Velocidad Garantizada",
                description: "15 días de aprobación vs 30-60 días del proceso normal. Ahorre MESES de espera"
              },
              {
                icon: Shield,
                title: "Cero Rechazos",
                description: "Con Revisor Independiente MINVU es IMPOSIBLE que rechacen su solicitud"
              },
              {
                icon: BanknoteIcon,
                title: "Ahorro Automático",
                description: "30% descuento en derechos municipales por LEY. Miles de pesos menos"
              },
              {
                icon: Scale,
                title: "Respaldo Legal Total",
                description: "Certificación MINVU vigente. Tranquilidad jurídica absoluta"
              },
              {
                icon: TrendingUp,
                title: "Valor Comercial",
                description: "Propiedad legalizada vale 20-30% MÁS y se vende más rápido"
              },
              {
                icon: Award,
                title: "26+ Años Experiencia",
                description: "150+ proyectos aprobados. Universidad de Chile. Éxito comprobado"
              }
            ].map((benefit, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 shadow-xl">
                <CardHeader>
                  <benefit.icon className="text-white mb-4" size={48} />
                  <CardTitle className="font-serif text-2xl text-white mb-3">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 text-base leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button 
              onClick={openWhatsApp}
              size="lg"
              className="bg-white text-[hsl(14,70%,50%)] hover:bg-gray-100 font-bold text-xl px-12 py-8 shadow-2xl hover:scale-105 transition-all duration-300"
              data-testid="button-beneficios-whatsapp"
            >
              <Phone className="mr-3 h-6 w-6" />
              SÍ, QUIERO LEGALIZAR MI PROYECTO AHORA
            </Button>
          </div>
        </div>
      </section>

      {/* Proceso en 3 Pasos */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl font-bold text-[hsl(210,15%,30%)] mb-6">
              Cómo Funciona Nuestro Proceso
            </h2>
            <p className="text-xl text-gray-600">Simple, Rápido y Garantizado</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: ClipboardCheck,
                title: "Revisión Técnica",
                description: "Analizamos su proyecto, documentos y planos. Identificamos cualquier error ANTES de ingresar a DOM.",
                duration: "1-3 días"
              },
              {
                step: "2",
                icon: FileText,
                title: "Gestión DOM",
                description: "Confeccionamos Informe Favorable como Revisor Independiente. Presentamos expediente completo en municipalidad.",
                duration: "15 días"
              },
              {
                step: "3",
                icon: BadgeCheck,
                title: "Aprobación y Recepción",
                description: "Obtenemos Permiso aprobado. Al finalizar obra, tramitamos Recepción Final para legalización total.",
                duration: "15 días"
              }
            ].map((step, index) => (
              <Card key={index} className="relative border-2 border-[hsl(210,15%,30%)] hover:border-[hsl(14,70%,50%)] transition-all duration-300 shadow-xl hover:shadow-2xl">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[hsl(14,70%,50%)] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl">
                    {step.step}
                  </div>
                </div>
                <CardHeader className="pt-10 text-center">
                  <step.icon className="text-[hsl(210,15%,30%)] mx-auto mb-4" size={56} />
                  <CardTitle className="font-serif text-2xl text-[hsl(210,15%,30%)] mb-2">{step.title}</CardTitle>
                  <Badge className="bg-[hsl(14,70%,50%)] text-white">{step.duration}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-center leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marco Legal y Garantía */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-[hsl(210,15%,30%)] mb-6">
              Marco Legal y Garantía de Aprobación
            </h2>
          </div>

          <Card className="border-4 border-[hsl(14,70%,50%)] shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-[hsl(210,15%,30%)] to-[hsl(210,15%,25%)] text-white">
              <Scale className="mx-auto mb-4" size={48} />
              <CardTitle className="font-serif text-3xl text-center">Respaldo Legal Certificado</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="bg-[hsl(14,70%,50%)] text-white rounded-lg p-6">
                <h3 className="font-bold text-2xl mb-3">📜 Base Normativa:</h3>
                <ul className="space-y-2 text-lg">
                  <li>• <strong>Ley General de Urbanismo y Construcciones (LGUC)</strong></li>
                  <li>• <strong>Ordenanza General (OGUC)</strong></li>
                  <li>• <strong>Certificación MINVU ROL 00237-13</strong> - Revisor Independiente</li>
                  <li>• <strong>Resolución N° 369500 VIGENTE</strong></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-2xl text-[hsl(210,15%,30%)]">✅ Nuestra Garantía:</h3>
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-[hsl(14,70%,50%)] flex-shrink-0 mt-1" size={28} />
                  <div>
                    <h4 className="font-bold text-xl mb-2">Aprobación 100% Garantizada</h4>
                    <p className="text-gray-700">Con Informe Favorable de Revisor Independiente, es IMPOSIBLE que rechacen su solicitud. Respaldado por LEY.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-[hsl(14,70%,50%)] flex-shrink-0 mt-1" size={28} />
                  <div>
                    <h4 className="font-bold text-xl mb-2">Cumplimiento Normativo Total</h4>
                    <p className="text-gray-700">26+ años experiencia Universidad de Chile. Conocemos TODAS las normas y exigencias municipales.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-[hsl(14,70%,50%)] flex-shrink-0 mt-1" size={28} />
                  <div>
                    <h4 className="font-bold text-xl mb-2">Acompañamiento Hasta el Final</h4>
                    <p className="text-gray-700">No lo dejamos solo. Gestión completa desde Permiso hasta Recepción Final aprobada.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Urgencia - Hormozi Scarcity */}
      <section className="py-20 bg-gradient-to-br from-[hsl(210,15%,30%)] to-[hsl(210,15%,20%)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <AlertTriangle className="text-red-500 mx-auto mb-6 animate-pulse" size={64} />
            <h2 className="font-serif text-5xl font-bold mb-8">
              ⚠️ ¿Qué Pasa Si NO Legaliza Su Construcción AHORA?
            </h2>
          </div>

          <div className="space-y-6 mb-12">
            {[
              { icon: DollarSign, text: "MULTAS de 0.5% a 20% del presupuesto de obra (¡millones de pesos!)" },
              { icon: Clock, text: "PARALIZACIÓN obligatoria de su construcción por la municipalidad" },
              { icon: Home, text: "IMPOSIBLE vender, arrendar o acceder a financiamiento bancario" },
              { icon: Scale, text: "PROBLEMAS LEGALES que pueden llevar años en resolverse" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-red-600/20 border-2 border-red-500 rounded-lg p-6">
                <item.icon className="text-red-400 flex-shrink-0" size={32} />
                <p className="text-lg font-semibold text-left">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-red-600 rounded-xl p-8 mb-8">
            <p className="font-serif text-3xl font-bold mb-4">
              "Cada Día Sin Legalizar es un DÍA MÁS de RIESGO"
            </p>
            <p className="text-xl">
              Las fiscalizaciones municipales pueden llegar EN CUALQUIER MOMENTO. No arriesgue su patrimonio e inversión.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={openWhatsApp}
              size="lg"
              className="bg-[hsl(14,70%,50%)] hover:bg-[hsl(14,70%,45%)] text-white font-bold text-xl px-12 py-8 shadow-2xl hover:scale-105 transition-all duration-300"
              data-testid="button-urgencia-whatsapp"
            >
              <Phone className="mr-3 h-6 w-6" />
              LEGALIZAR AHORA - CONSULTA GRATIS
            </Button>
            <Button 
              onClick={scrollToContact}
              size="lg"
              variant="outline"
              className="bg-white text-[hsl(210,15%,30%)] hover:bg-gray-100 font-bold text-xl px-12 py-8 border-2 border-white shadow-xl"
              data-testid="button-urgencia-contacto"
            >
              <ArrowRight className="mr-3 h-6 w-6" />
              SOLICITAR COTIZACIÓN
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-5xl font-bold text-[hsl(210,15%,30%)] mb-8">
            Legalice Su Construcción con Total Tranquilidad
          </h2>
          <p className="text-2xl text-gray-600 mb-12">
            <strong>ArquitectoChile.com</strong> - 26+ años legalizando construcciones exitosamente
          </p>

          <div className="bg-gradient-to-br from-[hsl(210,15%,30%)] to-[hsl(210,15%,25%)] text-white rounded-xl p-10 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <FileText className="text-[hsl(14,70%,50%)] mx-auto mb-4" size={48} />
                <h3 className="font-bold text-xl mb-2">Permiso Aprobado</h3>
                <p>En solo 15 días</p>
              </div>
              <div>
                <Building2 className="text-[hsl(14,70%,50%)] mx-auto mb-4" size={48} />
                <h3 className="font-bold text-xl mb-2">Construcción Legal</h3>
                <p>Sin multas ni problemas</p>
              </div>
              <div>
                <BadgeCheck className="text-[hsl(14,70%,50%)] mx-auto mb-4" size={48} />
                <h3 className="font-bold text-xl mb-2">Recepción Final</h3>
                <p>Propiedad 100% legalizada</p>
              </div>
            </div>

            <Button 
              onClick={openWhatsApp}
              size="lg"
              className="bg-[hsl(14,70%,50%)] hover:bg-[hsl(14,70%,45%)] text-white font-bold text-xl px-16 py-8 shadow-2xl hover:scale-105 transition-all duration-300"
              data-testid="button-final-cta"
            >
              <Phone className="mr-3 h-7 w-7" />
              CONTACTAR AHORA POR WHATSAPP
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-gray-600 flex-wrap">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">4.9/5 estrellas</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="text-[hsl(14,70%,50%)]" />
              <span className="font-semibold">Certificación MINVU</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="text-[hsl(210,15%,30%)]" />
              <span className="font-semibold">150+ proyectos aprobados</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
