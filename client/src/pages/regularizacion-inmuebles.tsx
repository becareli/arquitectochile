import { useEffect } from "react";
import {
  BadgeCheck, CheckCircle, AlertTriangle,
  FileText, Clock, Home, TrendingUp,
  Shield, Building, Award, Target, ArrowRight
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

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

    setMetaTag('description', 'Regularización de inmuebles sin permisos (Ley del Mono). Gestión profesional de Permiso de Edificación y Recepción Final. Especialistas en DOM de La Florida.');
    setMetaTag('keywords', 'regularización inmuebles, ley del mono chile, permiso edificación, recepción final, legalizar construcción');
    setMetaTag('og:title', 'Regularización de Inmuebles - Ley del Mono | ArquitectoChile', true);
    setMetaTag('og:description', 'Gestión profesional para propiedades sin permisos. Permiso de Edificación y Recepción Final con respaldo de 26+ años de experiencia.', true);
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
      "areaServed": { "@type": "Country", "name": "Chile" }
    };

    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (existingSchema) existingSchema.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="bg-blueprint-dark text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-6">
            Gestión Normativa
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
            Regularización de Inmuebles
          </h1>
          <p className="text-lg text-gray-300 mb-4 max-w-2xl mx-auto">
            Gestión profesional para propiedades sin permisos bajo la Ley del Mono.
            Permiso de Edificación y Recepción Final simultáneos.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Especialistas en la DOM de La Florida — Expertos en Ley del Mono y Gestión Municipal
          </p>
          <a
            href="/formulario/regularizacion"
            className="inline-flex items-center gap-2 bg-[#f97316] text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
          >
            <FileText className="w-4 h-4" strokeWidth={1.5} />
            Solicitar Diagnóstico Técnico — $45.000
          </a>
        </div>
      </section>

      <section className="bg-blueprint section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">El Problema</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
              ¿Tienes una Propiedad sin Permisos?
            </h2>
            <p className="text-base text-[#64748b] max-w-2xl mx-auto">
              Miles de propiedades en Chile fueron construidas o ampliadas sin los permisos correspondientes.
              Esto genera problemas legales, impide la venta y reduce el valor comercial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: AlertTriangle, title: "Problema Legal", text: "Propiedad irregular ante la DOM. Riesgo de multas y complicaciones legales." },
              { icon: TrendingUp, title: "Valor Reducido", text: "Imposible vender a precio justo sin regularización. Pérdida de valor patrimonial." },
              { icon: Building, title: "Bloqueo Comercial", text: "Bancos no financian propiedades irregulares. Venta restringida a pago contado." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white border border-gray-200 rounded-md p-8 hover:shadow-lg transition-all">
                  <div className="w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center mb-5">
                    <Icon className="w-8 h-8 text-[#0f172a]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-[#0f172a] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">La Solución</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
              La Ley del Mono: Tu Solución Legal
            </h2>
            <p className="text-base text-[#64748b] max-w-2xl mx-auto">
              El Decreto con Fuerza de Ley N° 2 (Ley del Mono) permite regularizar construcciones existentes
              obteniendo el Permiso de Edificación y la Recepción Final de forma simultánea.
            </p>
          </div>

          <div className="bg-blueprint border border-gray-200 rounded-md p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-7 h-7 text-[#0f172a]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">Beneficio Único</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  A diferencia del proceso tradicional (primero permiso, después construcción, luego recepción),
                  la Ley del Mono permite legalizar lo ya construido en un solo proceso.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/formulario/regularizacion"
              className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#1e293b] transition-colors"
            >
              <FileText className="w-4 h-4" strokeWidth={1.5} />
              Solicitar Diagnóstico Técnico
            </a>
          </div>
        </div>
      </section>

      <section className="bg-blueprint section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">Servicio Integral</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
              ¿Qué Incluye Nuestro Servicio?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: FileText, title: "Gestión Integral del Proceso",
                items: ["Levantamiento arquitectónico completo", "Elaboración de planos conforme a obra", "Tramitación ante la Dirección de Obras Municipales", "Obtención de Permiso de Edificación", "Obtención de Recepción Final"]
              },
              {
                icon: TrendingUp, title: "Aumenta el Valor de tu Propiedad",
                items: ["Propiedad 100% legal y regularizada", "Mayor valor comercial comprobable", "Acceso a financiamiento bancario", "Venta sin restricciones", "Tranquilidad legal total"]
              },
              {
                icon: Clock, title: "Proceso Ágil y Profesional",
                items: ["26+ años de experiencia en regularizaciones", "Conocimiento profundo de normativas municipales", "Seguimiento constante del proceso", "Comunicación clara en cada etapa"]
              },
              {
                icon: Shield, title: "Respaldo Técnico Profesional",
                items: ["Verificación de cumplimiento OGUC", "Análisis de normativa local aplicable", "Solución de observaciones municipales", "Gestión profesional ante la DOM"]
              },
            ].map((card) => {
              const CardIcon = card.icon;
              return (
                <div key={card.title} className="bg-white border border-gray-200 rounded-md p-8 hover:shadow-lg transition-all">
                  <div className="w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center mb-5">
                    <CardIcon className="w-8 h-8 text-[#0f172a]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-[#0f172a] mb-4">{card.title}</h3>
                  <ul className="space-y-2.5">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#0f172a] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-sm text-[#64748b]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">Casos Frecuentes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
              ¿Cuándo Necesitas Este Servicio?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Home, title: "Ampliaciones sin Permiso", text: "Segundo piso, terraza, bodega o cualquier ampliación construida sin permisos." },
              { icon: Building, title: "Construcción Original Irregular", text: "Vivienda completa construida sin recepción final o permisos originales." },
              { icon: Target, title: "Venta de Propiedad", text: "Necesitas regularizar para vender a mejor precio y con financiamiento disponible." },
              { icon: TrendingUp, title: "Acceso a Créditos", text: "Requieres regularizar para que la propiedad pueda ser evaluada por bancos." },
              { icon: FileText, title: "Herencias y Sucesiones", text: "Propiedad heredada sin documentación municipal al día." },
              { icon: Award, title: "Tranquilidad Legal", text: "Quieres eliminar riesgos legales y tener tu propiedad 100% regularizada." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-blueprint border border-gray-200 rounded-md p-6 hover:shadow-lg transition-all">
                  <div className="w-14 h-14 rounded-lg border border-gray-200 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-[#f97316]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-bold text-[#0f172a] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <a
              href="/formulario/regularizacion"
              className="inline-flex items-center gap-2 bg-[#f97316] text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
            >
              Solicitar Cotización
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-blueprint-dark text-white section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-4">
            Especialistas en la DOM de La Florida
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
            Regulariza tu Propiedad con Respaldo Profesional
          </h2>
          <p className="text-base text-gray-300 mb-4 max-w-2xl mx-auto">
            Expertos en Ley del Mono y Gestión Municipal. Presupuestos personalizados tras Diagnóstico Técnico.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Asesoría inicial: $45.000 — Respuesta en menos de 24 horas
          </p>
          <a
            href="/formulario/regularizacion"
            className="inline-flex items-center gap-2 bg-[#f97316] text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
          >
            Solicitar Diagnóstico Técnico
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
