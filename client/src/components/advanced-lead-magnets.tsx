import { Calculator, FileText, CheckSquare, ArrowRight } from "lucide-react";

export default function AdvancedLeadMagnets() {
  const resources = [
    {
      icon: Calculator,
      title: "Calculadora de Costos 2025",
      description: "Estima el costo referencial de tu proyecto en minutos según comuna y m².",
      cta: "Usar Calculadora",
      href: "/calculadora-costos",
    },
    {
      icon: CheckSquare,
      title: "Checklist: Permisos Municipales",
      description: "Los documentos y pasos que necesitas para presentar tu proyecto ante la DOM.",
      cta: "Descargar Checklist",
      href: "/contacto",
    },
    {
      icon: FileText,
      title: "Ebook: Cómo Ampliar tu Casa",
      description: "Guía completa para planificar tu ampliación sin errores costosos.",
      cta: "Descargar Ebook",
      href: "https://www.arquitectochile.cl/ebook",
    },
  ];

  return (
    <section className="bg-blueprint section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">
            Recursos Gratuitos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
            Herramientas para Planificar tu Proyecto
          </h2>
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            Recursos profesionales basados en nuestra experiencia para ayudarte a tomar mejores decisiones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-white border border-gray-200 rounded-md p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center mb-5">
                  <Icon className="w-8 h-8 text-[#0f172a]" strokeWidth={1.5} />
                </div>
                <h4 className="text-base font-bold text-[#0f172a] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{item.description}</p>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm font-medium text-[#f97316] hover:text-orange-600 transition-colors flex items-center gap-1.5"
                >
                  {item.cta}
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
