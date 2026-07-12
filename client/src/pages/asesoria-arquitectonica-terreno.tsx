import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, CheckCircle, MapPin, FileText, 
  Lightbulb, Eye, Calendar, Clock, ChevronDown, ChevronUp,
  User, Award, Shield, TrendingUp
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";

const faqs = [
  {
    question: "¿Cuánto dura la visita en terreno?",
    answer: "La asesoría tiene una duración aproximada de 1 hora. En ese tiempo analizamos el terreno o edificación, conversamos sobre tus necesidades y objetivos, y resolvemos todas tus dudas. Al final recibes el presupuesto de servicios arquitectónicos."
  },
  {
    question: "¿Qué debo preparar para la visita?",
    answer: "Si tienes planos o certificados prediales de tu propiedad, llévalos a mano — nos ahorran tiempo. Si no los tienes, no es problema: podemos obtenerlos. Ven con tus preguntas e ideas claras, eso es lo más importante."
  },
  {
    question: "¿El presupuesto de arquitectura está incluido en los $45.000?",
    answer: "Sí. El presupuesto detallado de los servicios arquitectónicos necesarios para tu proyecto está incluido en el precio de la visita, sin costo adicional."
  },
  {
    question: "¿Atienden fuera de La Florida / Santiago?",
    answer: "Sí atendemos otras comunas y regiones. El precio base de $45.000 corresponde a sectores cercanos a La Florida. Para otras zonas el valor puede ajustarse según distancia. Al agendar te confirmaremos el costo exacto."
  },
  {
    question: "¿Estoy obligado a contratar después de la visita?",
    answer: "No. La asesoría en terreno es un servicio independiente. Puedes contratar los servicios de arquitectura o simplemente quedarte con la información y el presupuesto. La decisión es completamente tuya."
  }
];

export default function AsesoriaArquitectonicaTerreno() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    document.title = "Asesoría Arquitectónica en Terreno - Arquitecto a Domicilio $45.000 | ArquitectoChile";
    
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

    setMetaTag('description', 'Arquitecto a domicilio por $45.000. Asesoría profesional en tu terreno con análisis de factibilidad, recomendaciones expertas y presupuesto de arquitectura detallado.');
    setMetaTag('keywords', 'arquitecto a domicilio, asesoría terreno, visita arquitecto, presupuesto arquitectura, análisis factibilidad chile');
    setMetaTag('og:title', 'Asesoría Arquitectónica en Terreno - El arquitecto va a tu casa por $45.000', true);
    setMetaTag('og:description', 'Análisis profesional + presupuesto detallado + eliminación de dudas. Visita profesional al terreno con informe completo.', true);
    setMetaTag('og:type', 'website', true);

    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Asesoría Arquitectónica en Terreno",
      "description": "Arquitecto a domicilio por $45.000. Análisis profesional del terreno con presupuesto de arquitectura detallado.",
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
        "price": "45000",
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

  const openTidyCal = () => {
    window.open('https://tidycal.com/arquitectopatriciobecar/asesoria-de-arquitectura-a-domicilio', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section — navy blueprint background */}
      <section className="relative bg-blueprint-dark text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white/10 backdrop-blur-sm text-white border border-white/20 mb-6 text-sm font-semibold px-6 py-2 uppercase tracking-widest">
            <MapPin className="inline h-4 w-4 mr-2" />
            Servicio Presencial
          </Badge>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Asesoría Arquitectónica<br />
            <span className="text-[#f97316]">en Tu Terreno</span>
          </h1>
          
          <p className="text-2xl lg:text-3xl font-semibold mb-4 text-white/90">
            El arquitecto va a tu casa por solo{" "}
            <span className="text-[#f97316] font-extrabold">$45.000</span>
          </p>

          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Análisis profesional · Presupuesto detallado · Todas tus dudas resueltas en 1 hora
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <CheckCircle className="h-4 w-4 text-[#f97316]" />
              Sin compromiso de contratación
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <CheckCircle className="h-4 w-4 text-[#f97316]" />
              Presupuesto incluido
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <CheckCircle className="h-4 w-4 text-[#f97316]" />
              26 años de experiencia
            </div>
          </div>

          <Button 
            onClick={openTidyCal}
            size="lg" 
            className="bg-[#f97316] hover:bg-orange-600 text-white text-xl px-10 py-6 font-bold shadow-lg shadow-orange-500/30 rounded-lg"
            data-testid="button-agendar-visita-hero"
          >
            <Calendar className="mr-3 h-6 w-6" />
            AGENDAR MI VISITA AHORA
          </Button>

          <p className="text-white/50 text-sm mt-4">
            * Precio base desde La Florida. Puede variar según distancia.
          </p>
        </div>
      </section>

      {/* Propuesta de valor — ¿Qué obtienes? */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#f97316] uppercase tracking-[0.2em] mb-3">Lo que incluye</p>
            <h2 className="text-4xl font-bold text-[#0f172a] mb-4">
              Todo lo que obtienes por $45.000
            </h2>
            <p className="text-lg text-[#64748b] max-w-2xl mx-auto">
              Una visita profesional que puede ahorrarte meses de incertidumbre y errores costosos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 p-2">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[#f97316]/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="text-[#f97316] w-7 h-7" />
                </div>
                <CardTitle className="text-xl font-bold text-[#0f172a]">
                  Análisis profesional in situ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#64748b] leading-relaxed">
                  Revisión completa de tu terreno o edificación desde el punto de vista normativo y técnico. 
                  Identifico oportunidades y restricciones que solo se pueden detectar en persona, 
                  no en planos.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 p-2">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[#0f172a]/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="text-[#0f172a] w-7 h-7" />
                </div>
                <CardTitle className="text-xl font-bold text-[#0f172a]">
                  Evaluación del potencial real
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#64748b] leading-relaxed">
                  Analizamos tus certificados prediales y tus objetivos para determinar con exactitud 
                  qué se puede hacer, cuánto se puede ampliar y qué limitaciones aplican según 
                  normativa vigente.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 p-2">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[#f97316]/10 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="text-[#f97316] w-7 h-7" />
                </div>
                <CardTitle className="text-xl font-bold text-[#0f172a]">
                  Recomendaciones personalizadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#64748b] leading-relaxed">
                  Orientación experta sobre materiales, diseño, etapas y prioridades del proyecto. 
                  Consejos concretos para maximizar tu inversión y evitar los errores más comunes 
                  que encarecen las obras.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 p-2">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[#0f172a]/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="text-[#0f172a] w-7 h-7" />
                </div>
                <CardTitle className="text-xl font-bold text-[#0f172a]">
                  Presupuesto de arquitectura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#64748b] leading-relaxed">
                  Recibes un presupuesto profesional detallado de los servicios arquitectónicos 
                  necesarios para tu proyecto. Sin cifras al aire: valores reales, 
                  sin sorpresas ni costos ocultos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Proceso paso a paso */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#f97316] uppercase tracking-[0.2em] mb-3">Cómo funciona</p>
            <h2 className="text-4xl font-bold text-[#0f172a] mb-4">
              De cero a claridad total en 4 pasos
            </h2>
            <p className="text-lg text-[#64748b] max-w-2xl mx-auto">
              Un proceso simple, sin trámites complicados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: <Calendar className="w-7 h-7 text-[#f97316]" />,
                title: "Agendas en línea",
                desc: "Elige el día y hora que más te acomode. Solo toma 5 minutos."
              },
              {
                step: "02",
                icon: <MapPin className="w-7 h-7 text-[#0f172a]" />,
                title: "El arquitecto llega",
                desc: "Patricio va directamente a tu terreno o propiedad en la fecha acordada."
              },
              {
                step: "03",
                icon: <Eye className="w-7 h-7 text-[#f97316]" />,
                title: "Análisis conjunto",
                desc: "Revisamos juntos las posibilidades reales, resolvemos todas tus dudas."
              },
              {
                step: "04",
                icon: <FileText className="w-7 h-7 text-[#0f172a]" />,
                title: "Recibes el presupuesto",
                desc: "Te entregamos el presupuesto de servicios detallado antes de irte."
              }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-px border-t-2 border-dashed border-gray-300 z-0" />
                )}
                <div className="relative z-10 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-[#f97316] tracking-widest mb-2">{item.step}</span>
                <h3 className="text-base font-bold text-[#0f172a] mb-2">{item.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Vale la pena? — Comparativa */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#f97316] uppercase tracking-[0.2em] mb-3">Propuesta de valor</p>
            <h2 className="text-4xl font-bold text-[#0f172a] mb-4">
              ¿Vale la pena invertir $45.000?
            </h2>
            <p className="text-lg text-[#64748b] max-w-2xl mx-auto">
              Compara las dos alternativas antes de decidir
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0f172a] text-white">
                  <th className="py-4 px-6 text-left font-semibold text-sm">Situación</th>
                  <th className="py-4 px-6 text-center font-semibold text-sm text-[#f97316]">Con Asesoría</th>
                  <th className="py-4 px-6 text-center font-semibold text-sm text-white/60">Sin Asesoría</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Costo inicial", "$45.000", "$0"],
                  ["Claridad sobre tu proyecto", "Alta — sabes exactamente qué hacer", "Ninguna — sigues con dudas"],
                  ["Riesgo de errores costosos", "Muy bajo — vas con información real", "Alto — decisiones a ciegas"],
                  ["Presupuesto ajustado a realidad", "Sí, detallado y sin sorpresas", "No — cotizas sin base real"],
                  ["Tiempo hasta comenzar la obra", "Rápido — con plan claro desde el inicio", "Lento — correcciones sobre la marcha"],
                ].map(([label, pro, con], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-4 px-6 text-[#0f172a] font-medium text-sm">{label}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1.5 text-sm text-[#0f172a]">
                        <CheckCircle className="h-4 w-4 text-[#f97316] flex-shrink-0" />
                        {pro}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-sm text-[#64748b]">{con}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-[#f97316]/5 border border-[#f97316]/20 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="text-[#f97316] w-6 h-6 flex-shrink-0 mt-0.5" />
              <p className="text-[#0f172a] text-base">
                <strong>Piénsalo así:</strong> un error en la etapa de planificación de una ampliación puede costar 
                entre $500.000 y $3.000.000 en correcciones. La asesoría en terreno es la inversión 
                más inteligente que puedes hacer antes de comenzar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quién realiza la visita */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#f97316] uppercase tracking-[0.2em] mb-3">Tu arquitecto</p>
            <h2 className="text-4xl font-bold text-[#0f172a] mb-4">
              Quién realiza la visita
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-20 h-20 bg-[#0f172a] rounded-full flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                <User className="text-white w-10 h-10" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#0f172a] mb-1">Patricio Becar Elissegaray</h3>
                <p className="text-[#f97316] font-semibold mb-4">Arquitecto — Universidad de Chile</p>
                <p className="text-[#64748b] leading-relaxed mb-6">
                  Con más de 26 años de experiencia en proyectos residenciales a lo largo de Chile, 
                  me especializo en viviendas familiares, ampliaciones y regularizaciones. 
                  Mi forma de trabajar es directa y transparente: te digo exactamente lo que es posible, 
                  lo que conviene y lo que se puede mejorar — sin tecnicismos innecesarios.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <Award className="text-[#f97316] w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0f172a] text-sm">26+ años</p>
                      <p className="text-[#64748b] text-xs">de experiencia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Home className="text-[#f97316] w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0f172a] text-sm">Especialista</p>
                      <p className="text-[#64748b] text-xs">en vivienda familiar</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="text-[#f97316] w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0f172a] text-sm">Proceso colaborativo</p>
                      <p className="text-[#64748b] text-xs">adaptado a tu presupuesto</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nota sobre precio y distancia */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <MapPin className="text-[#f97316] w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-[#0f172a] mb-1">Importante: precio según distancia</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                El precio base de <strong className="text-[#0f172a]">$45.000</strong> aplica para sectores 
                cercanos a <strong className="text-[#0f172a]">Vicuña Mackenna Poniente 7730, La Florida</strong>. 
                Para otras comunas o regiones el precio puede variar. Te confirmamos el valor exacto al agendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#f97316] uppercase tracking-[0.2em] mb-3">Preguntas frecuentes</p>
            <h2 className="text-4xl font-bold text-[#0f172a] mb-4">
              Todo lo que necesitas saber
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#0f172a]">{faq.question}</span>
                  {openFaq === i 
                    ? <ChevronUp className="w-5 h-5 text-[#f97316] flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-[#64748b] flex-shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-[#64748b] leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final — navy blueprint */}
      <section className="py-20 bg-blueprint-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-[#f97316] uppercase tracking-[0.2em] mb-4">Da el primer paso</p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            ¿Listo para eliminar<br />la incertidumbre?
          </h2>
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
            Agenda tu visita arquitectónica y en menos de 1 hora tendrás claridad total 
            sobre tu proyecto, con presupuesto en mano.
          </p>
          
          <Button 
            onClick={openTidyCal}
            size="lg" 
            className="bg-[#f97316] hover:bg-orange-600 text-white text-xl px-10 py-6 font-bold rounded-lg shadow-lg shadow-orange-500/30"
            data-testid="button-agendar-visita-final"
          >
            <Calendar className="mr-3 h-6 w-6" />
            AGENDAR MI VISITA — $45.000
          </Button>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <CheckCircle className="h-4 w-4 text-[#f97316]" />
              Sin compromiso de contratación
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <CheckCircle className="h-4 w-4 text-[#f97316]" />
              Presupuesto incluido
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Clock className="h-4 w-4 text-[#f97316]" />
              Duración aprox. 1 hora
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
