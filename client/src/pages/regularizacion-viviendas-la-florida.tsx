import { useEffect } from "react";
import {
  CheckCircle, AlertTriangle, Shield, Clock,
  FileText, MapPin, TrendingUp, Home,
  BadgeCheck, ArrowRight, Award, Building
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function RegularizacionViviendasLaFloridaPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Regularización de Viviendas La Florida | Ley del Mono | ArquitectoChile";

    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (meta) {
        meta.content = content;
      } else {
        meta = document.createElement('meta');
        if (isProperty) meta.setAttribute('property', name);
        else meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    setMetaTag('description', 'Regularización de viviendas en La Florida bajo Ley del Mono. Especialistas en la DOM de La Florida con 26+ años de experiencia. Gestión profesional integral.');
    setMetaTag('og:title', 'Regularización de Viviendas La Florida | Ley del Mono | ArquitectoChile', true);
    setMetaTag('og:description', 'Gestión profesional de regularización de viviendas en La Florida. Expertos en Ley del Mono y gestión municipal.', true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="bg-blueprint-dark text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-6">
            Regularización en La Florida
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
            Regulariza tu Hogar en La Florida con la Ley del Mono
          </h1>
          <p className="text-lg text-gray-300 mb-4 max-w-2xl mx-auto">
            Gestión profesional integral bajo Ley N° 20.898. Protege tu inversión con respaldo técnico de 26+ años de experiencia.
          </p>
          <p className="text-sm font-semibold text-[#f97316] mb-8">
            Especialistas en la DOM de La Florida — Expertos en Ley del Mono y Gestión Municipal
          </p>
          <div className="inline-block bg-white/10 border border-white/20 rounded-md px-6 py-3 mb-8">
            <p className="text-sm text-gray-300">
              Plazo vigente: <span className="font-bold text-white">Diciembre 2027</span>
            </p>
          </div>
          <div className="block">
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 bg-[#f97316] text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
            >
              Solicitar Diagnóstico Técnico — $45.000
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-blueprint section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">El Problema</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
              Riesgos de una Vivienda Sin Regularizar
            </h2>
            <p className="text-base text-[#64748b] max-w-2xl mx-auto">
              Una propiedad sin permisos genera problemas legales, limita opciones financieras y reduce su valor comercial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: AlertTriangle, title: "Riesgo de Multas", text: "La municipalidad puede aplicar sanciones por construcciones no autorizadas." },
              { icon: TrendingUp, title: "Venta Restringida", text: "La propiedad no puede venderse legalmente a su valor real de mercado." },
              { icon: FileText, title: "Sin Acceso a Créditos", text: "Los bancos no financian propiedades que carecen de documentación municipal." },
              { icon: Building, title: "Riesgo de Denuncias", text: "Vecinos pueden presentar reclamos ante la municipalidad por obras irregulares." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white border border-gray-200 rounded-md p-6 hover:shadow-lg transition-all">
                  <div className="w-14 h-14 rounded-lg border border-gray-200 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-[#0f172a]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-bold text-[#0f172a] mb-2">{item.title}</h3>
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
              La Ley N° 20.898 — Ley del Mono
            </h2>
            <p className="text-base text-[#64748b] max-w-2xl mx-auto">
              El gobierno chileno creó esta ley para resolver la situación de miles de propiedades.
              Permite regularizar construcciones existentes con gestión profesional ante la DOM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-5">
              {[
                { title: "Tranquilidad Legal", text: "Tu vivienda quedará completamente regularizada ante la municipalidad." },
                { title: "Seguridad Jurídica", text: "Certificados oficiales que respaldan la legalidad de tu construcción." },
                { title: "Valorización del Inmueble", text: "Tu propiedad recupera y aumenta su valor comercial al estar regularizada." },
                { title: "Acceso a Financiamiento", text: "Podrás acceder a créditos hipotecarios y subsidios de mejoramiento." },
                { title: "Descuentos Municipales", text: "Descuentos de hasta 75% en derechos municipales durante el proceso." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#f97316] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-sm font-semibold text-[#0f172a] mb-0.5">{item.title}</h4>
                    <p className="text-sm text-[#64748b]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blueprint border border-gray-200 rounded-md p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[#f97316]" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">Plazo Vigente</h3>
                <p className="text-sm text-[#64748b]">La Ley del Mono tiene fecha de vencimiento</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-md p-5">
                <div className="text-center">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#f97316] mb-1">Plazo Final</p>
                  <p className="text-2xl font-bold text-[#0f172a]">31 de Diciembre 2027</p>
                  <p className="text-xs text-[#64748b] mt-2">Después de esta fecha, la regularización será más compleja y costosa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blueprint section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">Proceso</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
              Servicio Integral de Regularización
            </h2>
            <p className="text-base text-[#64748b] max-w-2xl mx-auto">
              Te acompañamos en cada paso del proceso. Desde el diagnóstico inicial hasta la inscripción final.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: FileText, title: "Diagnóstico Técnico", text: "Visita profesional a tu propiedad para evaluar viabilidad de regularización." },
              { step: "02", icon: MapPin, title: "Levantamiento de Planos", text: "Medición profesional y elaboración de planos técnicos actualizados." },
              { step: "03", icon: Shield, title: "Informe Técnico", text: "Documentación técnica completa para presentar ante la DOM." },
              { step: "04", icon: CheckCircle, title: "Tramitación Completa", text: "Gestión ante DOM y Conservador de Bienes Raíces hasta la inscripción final." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="bg-white border border-gray-200 rounded-md p-6 text-center hover:shadow-lg transition-all">
                  <div className="w-14 h-14 rounded-lg border border-gray-200 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[#0f172a]" strokeWidth={1.5} />
                  </div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#f97316] mb-2">Paso {item.step}</p>
                  <h3 className="text-base font-bold text-[#0f172a] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-white border border-gray-200 rounded-md p-8">
            <div className="text-center">
              <h3 className="text-lg font-bold text-[#0f172a] mb-6">
                ¿Qué Incluye Nuestro Servicio Integral?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto text-left">
                {[
                  "Diagnóstico técnico inicial en terreno",
                  "Levantamiento topográfico y arquitectónico profesional",
                  "Elaboración de planos técnicos actualizados",
                  "Informe técnico estructural y de habitabilidad",
                  "Presentación y tramitación ante la Dirección de Obras",
                  "Gestión completa ante el Conservador de Bienes Raíces",
                  "Seguimiento personalizado durante todo el proceso",
                  "Entrega de certificados oficiales de regularización",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#0f172a] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-sm text-[#64748b]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">Inversión</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
              Presupuestos Personalizados
            </h2>
            <p className="text-base text-[#64748b] max-w-2xl mx-auto">
              Cada caso de regularización es único. Tras el Diagnóstico Técnico entregamos un presupuesto detallado
              según las características específicas de tu propiedad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: TrendingUp, title: "Valoriza tu Propiedad", text: "Una vivienda regularizada recupera y aumenta significativamente su valor de mercado." },
              { icon: Shield, title: "Elimina Riesgos", text: "Evita multas municipales y posibles conflictos legales por obras irregulares." },
              { icon: BadgeCheck, title: "Acceso a Créditos", text: "Podrás acceder a hipotecas y créditos sobre tu propiedad regularizada." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#f97316]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-bold text-[#0f172a] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-blueprint border border-gray-200 rounded-md p-8">
            <div className="text-center">
              <h3 className="text-lg font-bold text-[#0f172a] mb-4">Sistema de Pago por Hitos</h3>
              <p className="text-sm text-[#64748b] mb-8">
                El pago se distribuye en 3 etapas según el avance del proceso:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {[
                  { label: "Hito 1", title: "Al Contratar", text: "Primera cuota al firmar el contrato e iniciar el proceso." },
                  { label: "Hito 2", title: "Al Ingreso del Expediente", text: "Segunda cuota cuando se ingresa el expediente a la municipalidad." },
                  { label: "Hito 3", title: "Al Obtener Certificado", text: "Última cuota al obtener el certificado de regularización." },
                ].map((item) => (
                  <div key={item.label} className="bg-white border border-gray-200 rounded-md p-5">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#f97316] mb-2">{item.label}</p>
                    <h4 className="text-sm font-bold text-[#0f172a] mb-1">{item.title}</h4>
                    <p className="text-xs text-[#64748b]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blueprint section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">Respaldo Profesional</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
              Experiencia Comprobada en La Florida
            </h2>
            <p className="text-base text-[#64748b] max-w-2xl mx-auto">
              El Arquitecto Patricio Becar tiene más de 26 años de experiencia y conoce los procesos de la DOM de La Florida.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-1">Arq. Patricio Becar Elissegaray</h3>
                <p className="text-sm text-[#f97316] font-medium mb-4">Especialista en Regularización</p>
                <div className="space-y-2.5">
                  {[
                    "Arquitecto Universidad de Chile desde 1999",
                    "MBA Universidad de Chile + Global MBA University of Macquarie, Australia",
                    "Revisor Independiente acreditado MINVU",
                    "Conocimiento profundo de la normativa municipal de La Florida",
                    "Experiencia en gestión directa ante la DOM",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#0f172a] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-sm text-[#64748b]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "26+", label: "Años de experiencia" },
                  { value: "$45.000", label: "Diagnóstico Técnico" },
                  { value: "100%", label: "Compromiso profesional" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center bg-blueprint border border-gray-200 rounded-md p-4">
                    <p className="text-xl font-bold text-[#0f172a]">{stat.value}</p>
                    <p className="text-[10px] text-[#64748b] uppercase tracking-wider mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
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
            Asegura tu regularización bajo la Ley del Mono antes del plazo vigente.
            Presupuestos personalizados tras Diagnóstico Técnico.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Asesoría inicial: $45.000 — Respuesta en menos de 24 horas
          </p>
          <a
            href="/contacto"
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
