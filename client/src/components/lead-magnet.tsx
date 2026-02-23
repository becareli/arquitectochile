import { Shield, CheckCircle, Download, ArrowRight } from "lucide-react";
import ebookCover from "@assets/PortadaEbook_1752612398787.png";

export default function LeadMagnet() {
  return (
    <section className="bg-blueprint-dark text-white section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="max-w-sm mx-auto lg:mx-0">
              <img
                src={ebookCover}
                alt="Ebook: ¿Cómo Ampliar o Remodelar Mi Casa? en Santiago de Chile"
                className="w-full h-auto rounded-md shadow-2xl"
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316]">
              Recurso Gratuito
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              ¿Cómo Ampliar o Remodelar Mi Casa en Santiago?
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              Guía práctica con la metodología que usamos con nuestros clientes. Permisos, costos, plazos y los errores más comunes al ampliar o remodelar.
            </p>

            <div className="space-y-3">
              {[
                "Permisos municipales paso a paso",
                "Estimación de costos y plazos reales",
                "Errores frecuentes y cómo evitarlos",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#f97316] flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-sm text-gray-300">{item}</p>
                </div>
              ))}
            </div>

            <a
              href="https://www.arquitectochile.cl/ebook"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#f97316] text-white px-6 py-3.5 rounded-md text-sm font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
            >
              <Download className="w-4 h-4" strokeWidth={1.5} />
              Descargar Ebook Gratis
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-gray-500" strokeWidth={1.5} />
                <span className="text-xs text-gray-500">Sin registro</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-gray-500" strokeWidth={1.5} />
                <span className="text-xs text-gray-500">Descarga inmediata</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
