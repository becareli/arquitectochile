import { Search, Pen, FileCheck, Handshake } from "lucide-react";

export default function SalesMechanism() {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Diagnóstico Técnico",
      description: "Evaluamos tu terreno o propiedad, revisamos normativa municipal y definimos la factibilidad real del proyecto.",
    },
    {
      step: "02",
      icon: Pen,
      title: "Diseño 3D Personalizado",
      description: "Creamos tu proyecto en 3D para que visualices cada espacio antes de construir. Rondas de ajuste acordadas en contrato.",
    },
    {
      step: "03",
      icon: FileCheck,
      title: "Gestión de Permisos",
      description: "Tramitamos permisos de edificación, recepciones y toda la documentación ante DOM, SII y Conservador de Bienes Raíces.",
    },
    {
      step: "04",
      icon: Handshake,
      title: "Acompañamiento en Obra",
      description: "Te guiamos durante la construcción con supervisión técnica y comunicación constante hasta la entrega final.",
    },
  ];

  return (
    <section className="bg-white section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">
            Cómo Trabajamos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
            Método ArquitectoChile: Diseño con Certeza Técnica
          </h2>
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            Un proceso claro y profesional respaldado por más de 26 años de experiencia en proyectos residenciales y comerciales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-lg border border-gray-200 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-[#0f172a]" strokeWidth={1.5} />
                </div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#f97316] mb-2">
                  Paso {item.step}
                </p>
                <h4 className="text-base font-bold text-[#0f172a] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-blueprint border border-gray-200 rounded-md px-8 py-6">
            <p className="text-sm text-gray-500 mb-1">
              El primer paso es un <span className="font-semibold text-[#0f172a]">Diagnóstico Técnico</span> en terreno.
            </p>
            <p className="text-xs text-gray-400">
              Presupuestos personalizados tras la visita de diagnóstico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
