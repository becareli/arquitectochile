import { Ruler, Eye, ShieldCheck, ArrowRight } from "lucide-react";

export default function ViviendaAutor() {
  return (
    <section className="bg-white section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-4">
              Vivienda de Autor
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-6 leading-tight">
              El Diseño que tu Familia Merece
            </h2>
            <p className="text-base text-gray-500 mb-8 leading-relaxed max-w-lg">
              Diseño exclusivo con visualización 3D y respaldo técnico total. Tu visión, nuestra maestría técnica.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { icon: Ruler, title: "Diseño personalizado", text: "Planos a medida que reflejan cómo vive tu familia, no plantillas genéricas." },
                { icon: Eye, title: "Visualización 3D previa", text: "Recorre tu futuro hogar antes de mover un solo ladrillo. Ajustes en tiempo real." },
                { icon: ShieldCheck, title: "Gestión de permisos integrada", text: "Diseño y tramitación van de la mano. Sin sorpresas ante la municipalidad." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-[#0f172a]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#0f172a] mb-0.5">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
              href="/contacto"
              className="inline-flex items-center gap-2 bg-[#f97316] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
            >
              Solicitar Diagnóstico Técnico
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>

          <div className="hidden lg:block">
            <div className="bg-blueprint rounded-md p-10 border border-gray-200">
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-6">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#f97316] mb-2">
                    Método ArquitectoChile
                  </p>
                  <h3 className="text-lg font-bold text-[#0f172a] mb-1">Diseño con Certeza Técnica</h3>
                  <p className="text-xs text-gray-400">Proyectos de Arquitectura Integral</p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Diseñamos tu hogar con tecnología 3D y gestión total de permisos. Presupuestos personalizados tras Diagnóstico Técnico.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  {[
                    { label: "Diagnóstico", value: "$45.000" },
                    { label: "Plazo diseño", value: "30-45 días" },
                    { label: "Experiencia", value: "26+ años" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-lg font-bold text-[#0f172a]">{stat.value}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
