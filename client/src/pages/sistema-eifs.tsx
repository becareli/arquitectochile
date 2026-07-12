import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, Phone, CheckCircle, Star, Shield, Zap, AlertTriangle, 
  ArrowRight, ThermometerSun, DollarSign, TrendingUp,
  Snowflake, Flame, PiggyBank, HomeIcon, Award
} from "lucide-react";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

export default function SistemaEIFS() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    document.title = "Sistema EIFS Chile - Aislación Térmica Exterior | ArquitectoChile";
    
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

    setMetaTag('description', 'Sistema EIFS: Aislación térmica exterior que reduce hasta 60% los costos de calefacción. Deje de perder dinero en energía. Instalación profesional garantizada.');
    setMetaTag('keywords', 'sistema eifs chile, aislación térmica exterior, eifs santiago, revestimiento térmico, eficiencia energética, aislación fachadas');
    setMetaTag('og:title', 'Sistema EIFS - Pare de Quemar Dinero en Calefacción', true);
    setMetaTag('og:description', 'Transforme su hogar con el Sistema EIFS. Aislación térmica exterior que reduce costos energéticos hasta 60%. Instalación profesional con garantía.', true);
    setMetaTag('og:type', 'website', true);

    return () => {
      const titleTag = document.querySelector('title');
      if (titleTag) titleTag.textContent = 'ArquitectoChile.com - Servicios de Arquitectura';
    };
  }, []);

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola Patricio, me interesa el Sistema EIFS de aislación térmica. Quisiera recibir más información y una cotización.");
    window.open(`https://wa.me/56979316827?text=${message}`, '_blank');
  };

  const scrollToContact = () => {
    setLocation('/#contacto');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-[#0f172a] text-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge className="bg-[#f97316] text-white mb-6 px-6 py-3 text-base font-bold animate-pulse">
              🔥 PARE DE QUEMAR DINERO EN CALEFACCIÓN
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-5xl md:text-6xl font-black mb-8 leading-tight">
                ¿Ya Está CANSADO de que su Hogar sea un <span className="text-[#f97316]">HORNO en Verano</span> y un <span className="text-gray-300">TÉMPANO en Invierno?</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200 leading-relaxed">
                <strong>El Sistema EIFS</strong> es la solución definitiva para convertir su casa en un espacio confortable todo el año, mientras <strong>reduce hasta 60% sus costos de energía.</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={openWhatsApp} 
                  size="lg" 
                  className="bg-[#f97316] hover:bg-orange-600 text-white font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg"
                  data-testid="button-whatsapp-hero"
                >
                  <Phone className="mr-2 h-6 w-6" />
                  CONSULTA GRATUITA
                </Button>
                <Button 
                  onClick={scrollToContact} 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 text-white border-white hover:bg-white/20 font-semibold text-lg px-8 py-6 backdrop-blur-sm transition-all duration-300 rounded-lg"
                  data-testid="button-cotizacion-hero"
                >
                  <DollarSign className="mr-2 h-6 w-6" />
                  COTIZAR AHORA
                </Button>
              </div>

              <div className="flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Star className="text-[#f97316] fill-[#f97316]" size={32} />
                <div>
                  <p className="font-bold text-lg">4.9 estrellas en Google</p>
                  <p className="text-sm text-gray-300">29+ familias confían en nosotros</p>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Jugr5k4z-Eg"
                  title="Sistema EIFS - Aislación Térmica para Casas"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Empatía */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-[#0f172a] mb-8">
            ¿Se Siente Identificado con Esta Situación?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Flame, text: "Su casa es un HORNO insoportable en verano", color: "text-[#f97316]" },
              { icon: Snowflake, text: "En invierno, su hogar es un CONGELADOR", color: "text-[#0f172a]" },
              { icon: DollarSign, text: "Las cuentas de luz y gas SE DISPARAN cada mes", color: "text-[#0f172a]" },
              { icon: AlertTriangle, text: "Aparece MOHO y humedad en las paredes", color: "text-[#f97316]" }
            ].map((item, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-[#f97316] transition-all duration-300 shadow-lg">
                <CardContent className="pt-6">
                  <item.icon className={`${item.color} mx-auto mb-4`} size={48} />
                  <p className="font-semibold text-lg text-[#0f172a]">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-[#f97316] text-white rounded-xl p-8 shadow-xl">
            <p className="font-serif text-2xl font-bold mb-4">
              "Enfrente el Tema: Usted tiene un GRAVE problema de Aislación Térmica"
            </p>
            <p className="text-lg">
              Pero existe una solución profesional que le ayudará a disfrutar de un hogar confortable mientras AHORRA MILES en costos energéticos.
            </p>
          </div>
        </div>
      </section>

      {/* ¿Qué es el Sistema EIFS? */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl font-bold text-[#0f172a] mb-6">
              Su Problema de Aislación Térmica AHORA Tiene Solución
            </h2>
            <p className="text-2xl text-[#f97316] font-semibold">
              Le Presentamos el Sistema EIFS
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="bg-[#0f172a] text-white rounded-xl p-8 mb-8">
                <HomeIcon className="text-[#f97316] mb-4" size={48} />
                <h3 className="font-serif text-3xl font-bold mb-4 text-white">¿Qué es el EIFS?</h3>
                <p className="text-lg leading-relaxed text-white">
                  <strong>EIFS</strong> (Exterior Insulation Finishing System) es un sistema de aislación térmica para las fachadas de su casa u oficina. Es un revestimiento exterior de capas que se aplica sobre los muros exteriores, <strong>envolviendo y abrigando a su casa en todas sus fachadas.</strong>
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
                  <CheckCircle className="text-[#f97316] flex-shrink-0" size={24} />
                  <p className="text-[#64748b]">
                    <strong>Reduce los puentes térmicos</strong> y evita la fuga de energía desde el interior al exterior (y viceversa)
                  </p>
                </div>
                <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
                  <CheckCircle className="text-[#f97316] flex-shrink-0" size={24} />
                  <p className="text-[#64748b]">
                    <strong>Funciona como un cooler</strong> para conservar la temperatura ideal en su hogar
                  </p>
                </div>
                <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
                  <CheckCircle className="text-[#f97316] flex-shrink-0" size={24} />
                  <p className="text-[#64748b]">
                    <strong>Eficiencia energética garantizada:</strong> reduce costos de calefacción en invierno y refrigeración en verano
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f172a] text-white rounded-xl p-8 shadow-xl">
              <Award className="text-[#f97316] mb-6" size={56} />
              <h3 className="font-serif text-3xl font-bold mb-6 text-white">Ventajas del Sistema EIFS</h3>
              <div className="space-y-4">
                {[
                  { title: "Eficiencia Energética", desc: "Estabiliza temperatura interior y reduce puentes térmicos" },
                  { title: "Flexibilidad en Diseño", desc: "Se amolda a cualquier base con molduras personalizadas" },
                  { title: "Durabilidad Premium", desc: "Resistente a suciedad, sin fisuras ni pérdida de color" },
                  { title: "Peso Liviano", desc: "No sobrecarga la estructura existente" },
                  { title: "Resistente al Clima", desc: "Impermeable exterior, permeable al vapor interior" },
                  { title: "Alta Rentabilidad", desc: "Instalación rápida y bajo costo de mantenimiento" }
                ].map((item, index) => (
                  <div key={index} className="border-l-4 border-[#f97316] pl-4">
                    <h4 className="font-bold text-lg mb-1 text-white">{item.title}</h4>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 bg-[#f97316] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl font-bold mb-6">
              ¿Qué Beneficios Va a Tener al Invertir en el Sistema EIFS?
            </h2>
            <p className="text-2xl font-semibold">
              Vale la Pena Invertir en el Sistema EIFS, porque...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: HomeIcon,
                title: "Hogar Perfecto Todo el Año",
                description: "Disfrutará junto a su familia de una vivienda MÁS FRESCA en verano y MÁS TEMPERADA en invierno"
              },
              {
                icon: Shield,
                title: "Aire Interior Saludable",
                description: "Sin contaminación de combustibles. Sus espacios SIN OLOR A PARAFINA ni gases tóxicos"
              },
              {
                icon: Star,
                title: "Familia Más Sana",
                description: "MENOS enfermedades respiratorias en sus hijos y abuelos. Menos resfríos y alergias"
              },
              {
                icon: Zap,
                title: "Adiós al Moho",
                description: "Verá cómo de forma NATURAL se alejará el moho de su vivienda. Paredes secas y saludables"
              },
              {
                icon: PiggyBank,
                title: "Ahorro Garantizado",
                description: "Reducción de hasta 60% en gastos de calefacción y refrigeración. La inversión se paga sola"
              },
              {
                icon: TrendingUp,
                title: "Valor Comercial Superior",
                description: "AUMENTA el valor de su propiedad hasta 15%. Se diferencia positivamente del resto del barrio"
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
            <p className="font-serif text-3xl font-bold mb-8">¡Y mucho, mucho más!</p>
            <Button 
              onClick={openWhatsApp}
              size="lg"
              className="bg-white text-[#f97316] hover:bg-gray-100 font-bold text-xl px-12 py-8 shadow-2xl hover:scale-105 transition-all duration-300 rounded-lg"
              data-testid="button-beneficios-whatsapp"
            >
              <Phone className="mr-3 h-6 w-6" />
              QUIERO TRANSFORMAR MI HOGAR AHORA
            </Button>
          </div>
        </div>
      </section>

      {/* Video Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-[#0f172a] mb-6">
              Escuche a Nuestros Clientes Satisfechos
            </h2>
            <p className="text-xl text-[#64748b]">
              Familias reales que transformaron sus hogares con el Sistema EIFS
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-2xl">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/OpBr5j4cxZA"
                title="EIFS: Testimonio de Cliente"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Garantía */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-[#0f172a] mb-6">
              ¿Existe Alguna Garantía por la Instalación del Sistema EIFS?
            </h2>
            <p className="text-2xl text-[#f97316] font-bold">
              Por Supuesto que SÍ
            </p>
          </div>

          <Card className="border-4 border-[#f97316] shadow-2xl">
            <CardHeader className="bg-[#0f172a] text-white">
              <CardTitle className="font-serif text-3xl text-center">
                <Shield className="inline-block mr-3" size={36} />
                Nuestra Garantía de Satisfacción Total
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-[#f97316] flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="font-bold text-xl mb-2 text-[#0f172a]">Garantía de Calidad</h3>
                  <p className="text-[#64748b]">Estamos TAN CONVENCIDOS de la calidad de nuestros trabajos que garantizamos los materiales y la instalación</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="text-[#f97316] flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="font-bold text-xl mb-2 text-[#0f172a]">Profesionales Certificados</h3>
                  <p className="text-[#64748b]">Disponemos de profesionales y personal calificado con 26+ años de experiencia</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="text-[#f97316] flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="font-bold text-xl mb-2 text-[#0f172a]">Instalación Garantizada</h3>
                  <p className="text-[#64748b]">Nos encargamos del Reacondicionamiento Térmico INTEGRAL de su vivienda con garantía escrita</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Urgencia y Escasez */}
      <section className="py-20 bg-[#0f172a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <AlertTriangle className="text-[#f97316] mx-auto mb-6" size={64} />
            <h2 className="font-serif text-5xl font-bold text-white mb-8">
              ¿Qué Sucede Si NO Instala AHORA el Sistema EIFS?
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-10 mb-12">
            <p className="text-2xl font-bold mb-6 text-[#f97316]">
              Simplemente Usted NO AVANZARÁ Este Año
            </p>
            <p className="text-xl mb-6 leading-relaxed">
              Es muy probable que tenga que soportar un <strong>nuevo y largo año</strong> en el cual su casa seguirá siendo una <strong>húmeda y fría vivienda en el invierno</strong> (posiblemente con moho), y los niños nuevamente seguirán expuestos a resfríos y problemas respiratorios.
            </p>
            <p className="text-xl leading-relaxed">
              Y adivine, ¿qué va a suceder en su hogar en el verano? Usted ya sabe que estará deseando <strong>HUIR de su casa</strong>, pues a veces será insoportable el exceso de calor que usted y su familia tendrán que soportar.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {[
              { icon: DollarSign, text: "Seguirá DESPERDICIANDO miles de pesos mensuales en calefacción y refrigeración ineficiente" },
              { icon: AlertTriangle, text: "El moho y la humedad SEGUIRÁN creciendo, afectando la salud de su familia" },
              { icon: TrendingUp, text: "Perderá la oportunidad de AUMENTAR el valor de su propiedad" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/10 border-2 border-gray-200 rounded-lg p-6">
                <item.icon className="text-[#f97316] flex-shrink-0" size={32} />
                <p className="text-lg font-semibold text-left">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#f97316] rounded-xl p-8 mb-8">
            <p className="font-serif text-3xl font-bold mb-4">
              🔥 ATENCIÓN: Cupos Limitados por Mes
            </p>
            <p className="text-xl">
              Por la complejidad técnica de la instalación, solo podemos atender un número limitado de proyectos mensuales. ¡No pierda su oportunidad!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={openWhatsApp}
              size="lg"
              className="bg-[#f97316] hover:bg-orange-600 text-white font-bold text-xl px-12 py-8 shadow-2xl hover:scale-105 transition-all duration-300 rounded-lg"
              data-testid="button-urgencia-whatsapp"
            >
              <Phone className="mr-3 h-6 w-6" />
              SÍ, QUIERO AGENDAR MI CUPO AHORA
            </Button>
            <Button 
              onClick={scrollToContact}
              size="lg"
              variant="outline"
              className="bg-white text-[#0f172a] hover:bg-gray-100 font-bold text-xl px-12 py-8 border-2 border-white shadow-xl rounded-lg"
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
          <h2 className="font-serif text-5xl font-bold text-[#0f172a] mb-8">
            Transforme Su Hogar Hoy con el Sistema EIFS
          </h2>
          <p className="text-2xl text-[#64748b] mb-12">
            En <strong>ArquitectoChile.com</strong> nos encargamos del Reacondicionamiento Térmico Integral de su vivienda
          </p>

          <div className="bg-[#0f172a] text-white rounded-xl p-10 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <ThermometerSun className="text-[#f97316] mx-auto mb-4" size={48} />
                <h3 className="font-bold text-xl mb-2 text-white">Paso 1</h3>
                <p>Diagnóstico Térmico Profesional</p>
              </div>
              <div>
                <Shield className="text-[#f97316] mx-auto mb-4" size={48} />
                <h3 className="font-bold text-xl mb-2">Paso 2</h3>
                <p>Instalación por Expertos Certificados</p>
              </div>
              <div>
                <Star className="text-[#f97316] mx-auto mb-4" size={48} />
                <h3 className="font-bold text-xl mb-2">Paso 3</h3>
                <p>Disfrute su Hogar Confortable</p>
              </div>
            </div>

            <Button 
              onClick={openWhatsApp}
              size="lg"
              className="bg-[#f97316] hover:bg-orange-600 text-white font-bold text-xl px-12 py-8 shadow-2xl hover:scale-105 transition-all duration-300 rounded-lg"
              data-testid="button-cta-final"
            >
              <Phone className="mr-3 h-6 w-6" />
              AGENDAR CONSULTA GRATUITA
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
