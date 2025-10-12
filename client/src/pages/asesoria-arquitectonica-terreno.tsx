import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, Phone, CheckCircle, MapPin, FileText, 
  Lightbulb, BarChart3, DollarSign, Eye, Ruler
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";

export default function AsesoriaArquitectonicaTerreno() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    document.title = "Asesoría Arquitectónica en Terreno - Arquitecto a Domicilio $40.000 | ArquitectoChile";
    
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

    setMetaTag('description', 'Arquitecto a domicilio por $40.000. Asesoría profesional en tu terreno con análisis de factibilidad, recomendaciones expertas y presupuesto de arquitectura detallado.');
    setMetaTag('keywords', 'arquitecto a domicilio, asesoría terreno, visita arquitecto, presupuesto arquitectura, análisis factibilidad chile');
    setMetaTag('og:title', 'Asesoría Arquitectónica en Terreno - El arquitecto va a tu casa por $40.000', true);
    setMetaTag('og:description', 'Análisis profesional + presupuesto detallado + eliminación de dudas. Visita profesional al terreno con informe completo.', true);
    setMetaTag('og:type', 'website', true);

    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Asesoría Arquitectónica en Terreno",
      "description": "Arquitecto a domicilio por $40.000. Análisis profesional del terreno con presupuesto de arquitectura detallado.",
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
        "price": "40000",
        "priceCurrency": "CLP",
        "description": "Visita profesional al terreno con análisis completo y presupuesto de arquitectura"
      }
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
    const message = "Hola Patricio, me interesa agendar una asesoría arquitectónica en mi terreno. Necesito ayuda con mi proyecto.";
    window.open(`https://wa.me/56979316827?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[hsl(14,70%,50%)] to-[hsl(14,80%,55%)] text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white/20 backdrop-blur-sm text-white mb-6 text-sm font-semibold px-6 py-2">
            <MapPin className="inline h-4 w-4 mr-2" />
            SERVICIO PRESENCIAL
          </Badge>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-6">
            Asesoría Arquitectónica en Terreno
          </h1>
          
          <p className="text-2xl lg:text-3xl font-semibold mb-8">
            El arquitecto va a tu casa por solo $40.000
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <p className="text-lg lg:text-xl mb-4">
              <strong>Análisis profesional + presupuesto detallado + eliminación de dudas</strong>
            </p>
            <p className="text-sm text-white/80">
              * Precio puede variar según distancia desde Vicuña Mackenna Poniente 7730, La Florida
            </p>
          </div>

          <Button 
            onClick={openWhatsApp}
            size="lg" 
            className="bg-white text-[hsl(14,70%,50%)] hover:bg-gray-100 text-xl px-10 py-6 font-bold shadow-xl"
            data-testid="button-agendar-visita-hero"
          >
            <Phone className="mr-3 h-6 w-6" />
            AGENDAR VISITA AHORA
          </Button>
        </div>
      </section>

      {/* Problema/Solución Section */}
      <section className="py-20 bg-gradient-to-br from-[hsl(210,15%,30%)] to-[hsl(210,15%,25%)] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
              ¿Tienes dudas sobre tu proyecto? Te las resuelvo en terreno
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Imagínate tener al arquitecto en tu casa, analizando personalmente las posibilidades reales de tu ampliación o 
              remodelación, respondiendo todas tus preguntas y eliminando la incertidumbre por solo $45.000.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed">
              Esta asesoría presencial te permite <strong>conocer mi metodología de trabajo</strong>, generar confianza mutua y 
              obtener <strong>información profesional valiosa</strong> antes de tomar cualquier decisión importante.
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Análisis Profesional en Tu Terreno */}
            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="bg-[hsl(14,70%,50%)]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="text-[hsl(14,70%,50%)] w-10 h-10" />
                </div>
                <CardTitle className="font-serif text-2xl font-bold text-[hsl(210,15%,30%)]">
                  Análisis Profesional en Tu Terreno
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Revisión completa de tu edificación actual desde el punto de vista normativo y técnico. 
                  Identifico oportunidades y restricciones que solo se pueden ver en persona.
                </p>
              </CardContent>
            </Card>

            {/* Evaluación de Potencial Real */}
            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="bg-[hsl(210,15%,30%)]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="text-[hsl(210,15%,30%)] w-10 h-10" />
                </div>
                <CardTitle className="font-serif text-2xl font-bold text-[hsl(210,15%,30%)]">
                  Evaluación de Potencial Real
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Estudio de tus deseos y certificados prediales para determinar las posibilidades exactas de 
                  ampliación o remodelación según normativa vigente.
                </p>
              </CardContent>
            </Card>

            {/* Recomendaciones Personalizadas */}
            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="bg-[hsl(14,70%,50%)]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="text-[hsl(14,70%,50%)] w-10 h-10" />
                </div>
                <CardTitle className="font-serif text-2xl font-bold text-[hsl(210,15%,30%)]">
                  Recomendaciones Personalizadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Recibe orientación experta sobre materiales, diseño, etapas del proyecto y mejores prácticas 
                  para maximizar tu inversión y lograr el resultado que imaginas.
                </p>
              </CardContent>
            </Card>

            {/* Presupuesto de Arquitectura */}
            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="bg-[hsl(210,15%,30%)]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="text-[hsl(210,15%,30%)] w-10 h-10" />
                </div>
                <CardTitle className="font-serif text-2xl font-bold text-[hsl(210,15%,30%)]">
                  Presupuesto de Arquitectura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Obtén un presupuesto profesional detallado de los servicios arquitectónicos necesarios para 
                  materializar tu proyecto, sin sorpresas ni costos ocultos.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Metodología de Trabajo */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-[hsl(210,15%,30%)] text-center mb-12">
            Conoce al Arquitecto y su Metodología
          </h2>
          
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border-2 border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="text-green-600 w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">26+ años de experiencia</h3>
                <p className="text-gray-600">
                  Arquitecto titulado Universidad de Chile con vasta experiencia en proyectos residenciales
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="text-green-600 w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Proceso colaborativo</h3>
                <p className="text-gray-600">
                  Trabajo paso a paso contigo, escuchando tus necesidades y adaptando soluciones a tu presupuesto
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <CheckCircle className="text-green-600 w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Transparencia total</h3>
                <p className="text-gray-600">
                  Información clara sobre costos, plazos y alcances desde la primera visita
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nota sobre Precio Variable */}
      <section className="py-16 bg-amber-50 border-t-4 border-amber-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <MapPin className="text-amber-600 w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Importante: Precio según distancia</h3>
              <p className="text-lg text-gray-700 mb-4">
                El precio base de <strong>$40.000</strong> aplica para servicios dentro del radio cercano a nuestra 
                ubicación en <strong>Vicuña Mackenna Poniente 7730, La Florida</strong>.
              </p>
              <p className="text-gray-600">
                Para proyectos fuera de esta zona, el precio puede variar según la distancia. Te confirmaremos el 
                costo exacto al momento de agendar tu visita.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-[hsl(14,70%,50%)] to-[hsl(14,80%,55%)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
            ¿Listo para Eliminar tus Dudas?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Agenda tu visita arquitectónica profesional y da el primer paso hacia tu proyecto ideal
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={openWhatsApp}
              size="lg" 
              className="bg-white text-[hsl(14,70%,50%)] hover:bg-gray-100 text-xl px-10 py-6 font-bold"
              data-testid="button-agendar-visita-final"
            >
              <Phone className="mr-3 h-6 w-6" />
              AGENDAR MI VISITA
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
