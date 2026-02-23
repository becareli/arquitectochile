import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BadgeCheck, Phone, CheckCircle, AlertTriangle, 
  FileText, Clock, DollarSign, Home, TrendingUp,
  Shield, Building, Award, Target
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";

export default function RegularizacionInmuebles() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    document.title = "Regularización de Inmuebles Chile - Ley del Mono | ArquitectoChile";
    
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

    setMetaTag('description', 'Regularización de inmuebles sin permisos (Ley del Mono). Obtén Permiso de Edificación y Recepción Final simultáneos. Aumenta el valor de tu propiedad legalmente.');
    setMetaTag('keywords', 'regularización inmuebles, ley del mono chile, permiso edificación, recepción final, legalizar construcción, propiedad sin permisos');
    setMetaTag('og:title', 'Regularización de Inmuebles - Ley del Mono | Aumenta el Valor de tu Propiedad', true);
    setMetaTag('og:description', 'Solución integral para propiedades sin permisos. Permiso de Edificación y Recepción Final simultáneos para venta con mejor valor comercial.', true);
    setMetaTag('og:type', 'website', true);

    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Regularización de Inmuebles - Ley del Mono",
      "description": "Servicio integral de regularización de propiedades sin permisos. Gestión completa del proceso DOM.",
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

  const openCotizacionForm = () => {
    window.open('https://qv3ysdfj.forms.app/formulario-de-contacto', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-[#0f172a] text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#f97316] text-white mb-6 text-sm font-semibold px-6 py-2">
            <BadgeCheck className="inline h-4 w-4 mr-2" />
            LEY DEL MONO
          </Badge>
          
          <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-6">
            Regularización de Inmuebles
          </h1>
          
          <p className="text-2xl lg:text-3xl font-semibold mb-8">
            Solución Integral para Propiedades sin Permisos
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <p className="text-lg lg:text-xl">
              <strong>Permiso de Edificación + Recepción Final simultáneos</strong><br/>
              Ideal para venta con mejor valor comercial
            </p>
          </div>

          <Button 
            onClick={openCotizacionForm}
            size="lg" 
            className="bg-[#f97316] hover:bg-orange-600 text-white text-xl px-10 py-6 font-bold shadow-xl rounded-lg"
            data-testid="button-cotizar-hero"
          >
            <FileText className="mr-3 h-6 w-6" />
            COTIZAR MI REGULARIZACIÓN
          </Button>
        </div>
      </section>

      {/* El Problema */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#0f172a] mb-6">
              ¿Tienes una Propiedad sin Permisos?
            </h2>
            <p className="text-xl text-[#64748b] max-w-3xl mx-auto">
              Miles de propiedades en Chile fueron construidas o ampliadas sin los permisos correspondientes. 
              Esto genera problemas legales, impide la venta y reduce el valor comercial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-xl">
              <CardHeader className="text-center pb-4">
                <AlertTriangle className="w-16 h-16 text-[#f97316] mx-auto mb-4" />
                <CardTitle className="text-2xl font-bold text-[#0f172a]">Problema Legal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#64748b] text-center">
                  Propiedad irregular ante la DOM. Riesgo de multas y complicaciones legales.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl">
              <CardHeader className="text-center pb-4">
                <DollarSign className="w-16 h-16 text-[#f97316] mx-auto mb-4" />
                <CardTitle className="text-2xl font-bold text-[#0f172a]">Valor Reducido</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#64748b] text-center">
                  Imposible vender a precio justo sin regularización. Pérdida de valor patrimonial.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl">
              <CardHeader className="text-center pb-4">
                <Building className="w-16 h-16 text-[#0f172a] mx-auto mb-4" />
                <CardTitle className="text-2xl font-bold text-[#0f172a]">Bloqueo Comercial</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#64748b] text-center">
                  Bancos no financian propiedades irregulares. Venta restringida a compradores con pago al contado.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* La Solución - Ley del Mono */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#0f172a] mb-6">
              La Ley del Mono: Tu Solución Legal
            </h2>
            <p className="text-xl text-[#64748b] max-w-3xl mx-auto mb-8">
              El Decreto con Fuerza de Ley N° 2 (Ley del Mono) permite <strong>regularizar construcciones existentes</strong> 
              obteniendo el Permiso de Edificación y la Recepción Final de forma <strong>simultánea</strong>.
            </p>
          </div>

          <div className="bg-gray-50 border-l-4 border-[#f97316] p-8 mb-12">
            <div className="flex items-start gap-4">
              <CheckCircle className="text-[#0f172a] w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-3">Beneficio Único</h3>
                <p className="text-lg text-[#64748b]">
                  A diferencia del proceso tradicional (primero permiso, después construcción, luego recepción), 
                  la Ley del Mono permite <strong>legalizar lo ya construido</strong> en un solo proceso.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={openCotizacionForm}
              size="lg" 
              className="bg-[#0f172a] hover:bg-[#1e293b] text-white text-xl px-10 py-6 font-bold rounded-lg"
              data-testid="button-cotizar-middle"
            >
              <FileText className="mr-3 h-6 w-6" />
              COTIZAR MI REGULARIZACIÓN
            </Button>
          </div>
        </div>
      </section>

      {/* Beneficios del Servicio */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-[#0f172a] text-center mb-12">
            ¿Qué Incluye Nuestro Servicio?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="bg-[#0f172a]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="text-[#0f172a] w-10 h-10" />
                </div>
                <CardTitle className="font-serif text-2xl font-bold text-[#0f172a]">
                  Gestión Integral del Proceso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Levantamiento arquitectónico completo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Elaboración de planos conforme a obra</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Tramitación ante la Dirección de Obras Municipales</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Obtención de Permiso de Edificación</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Obtención de Recepción Final</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="bg-[#f97316]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="text-[#f97316] w-10 h-10" />
                </div>
                <CardTitle className="font-serif text-2xl font-bold text-[#0f172a]">
                  Aumenta el Valor de tu Propiedad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Propiedad 100% legal y regularizada</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Mayor valor comercial comprobable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Acceso a financiamiento bancario</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Venta sin restricciones</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Tranquilidad legal total</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="bg-[#0f172a]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="text-[#0f172a] w-10 h-10" />
                </div>
                <CardTitle className="font-serif text-2xl font-bold text-[#0f172a]">
                  Proceso Ágil y Profesional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">26+ años de experiencia en regularizaciones</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Conocimiento profundo de normativas municipales</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Seguimiento constante del proceso</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Comunicación clara en cada etapa</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="bg-[#f97316]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="text-[#f97316] w-10 h-10" />
                </div>
                <CardTitle className="font-serif text-2xl font-bold text-[#0f172a]">
                  Cumplimiento Normativo Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Verificación de cumplimiento OGUC</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Análisis de normativa local aplicable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Solución de observaciones municipales</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#0f172a] w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-[#64748b]">Garantía de aprobación final</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Casos Ideales */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-[#0f172a] text-center mb-12">
            ¿Cuándo Necesitas Este Servicio?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <Home className="text-[#f97316] w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">Ampliaciones sin Permiso</h3>
              <p className="text-[#64748b]">
                Segundo piso, terraza, bodega o cualquier ampliación construida sin permisos.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <Building className="text-[#f97316] w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">Construcción Original Irregular</h3>
              <p className="text-[#64748b]">
                Vivienda completa construida sin recepción final o permisos originales.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <Target className="text-[#f97316] w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">Venta de Propiedad</h3>
              <p className="text-[#64748b]">
                Necesitas regularizar para vender a mejor precio y con financiamiento disponible.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <DollarSign className="text-[#f97316] w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">Acceso a Créditos</h3>
              <p className="text-[#64748b]">
                Requieres regularizar para que la propiedad pueda ser evaluada por bancos.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <FileText className="text-[#f97316] w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">Herencias y Sucesiones</h3>
              <p className="text-[#64748b]">
                Propiedad heredada sin documentación municipal al día.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <Award className="text-[#f97316] w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">Tranquilidad Legal</h3>
              <p className="text-[#64748b]">
                Quieres eliminar riesgos legales y tener tu propiedad 100% regularizada.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={openCotizacionForm}
              size="lg" 
              className="bg-[#f97316] hover:bg-orange-600 text-white text-xl px-10 py-6 font-bold rounded-lg"
              data-testid="button-cotizar-casos"
            >
              <FileText className="mr-3 h-6 w-6" />
              COTIZAR MI REGULARIZACIÓN
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-[#0f172a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
            Regulariza tu Propiedad Ahora
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Obtén una cotización personalizada para regularizar tu inmueble bajo la Ley del Mono
          </p>
          
          <Button 
            onClick={openCotizacionForm}
            size="lg" 
            className="bg-[#f97316] hover:bg-orange-600 text-white text-xl px-10 py-6 font-bold shadow-xl rounded-lg"
            data-testid="button-cotizar-final"
          >
            <FileText className="mr-3 h-6 w-6" />
            COTIZAR MI REGULARIZACIÓN
          </Button>
          
          <p className="mt-6 text-white/80">
            Respuesta en menos de 24 horas
          </p>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}