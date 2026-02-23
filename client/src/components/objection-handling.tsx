import { HelpCircle, ArrowRight } from "lucide-react";

export default function ObjectionHandling() {
  const faqs = [
    {
      question: "¿Cuánto demora un permiso de edificación en la municipalidad?",
      answer: "Los plazos municipales varían según la comuna y el tipo de proyecto. En promedio, un permiso de edificación toma entre 30 y 60 días hábiles. Nosotros nos encargamos de presentar una carpeta técnica completa para minimizar observaciones y agilizar la aprobación."
    },
    {
      question: "¿Para qué sirve el Diagnóstico Técnico de $45.000?",
      answer: "Es una visita profesional a tu terreno o propiedad donde evaluamos normativa municipal, factibilidad constructiva, cabida del terreno y te entregamos un informe con recomendaciones claras. Es el primer paso antes de cualquier proyecto, y su costo se descuenta si continúas con nosotros."
    },
    {
      question: "¿Cómo el diseño 3D evita sobrecostos en la obra?",
      answer: "Al visualizar tu proyecto completo en 3D antes de construir, puedes ajustar distribución, materiales y terminaciones sin gastar en demoliciones ni cambios de obra. Los proyectos con diseño 3D previo reducen significativamente los imprevistos durante la construcción."
    },
    {
      question: "¿Qué incluye un proyecto de arquitectura integral?",
      answer: "Incluye diseño arquitectónico personalizado, planos técnicos completos, visualización 3D, gestión de permisos ante la municipalidad y acompañamiento durante la construcción. Los presupuestos son personalizados tras el Diagnóstico Técnico."
    },
    {
      question: "¿Trabajan solo en Santiago o también en regiones?",
      answer: "Nuestra oficina está en Santiago (La Florida), pero atendemos proyectos en toda la Región Metropolitana. Para proyectos en regiones, evaluamos caso a caso la factibilidad de servicio."
    },
    {
      question: "¿Qué diferencia hay entre diseño y regularización?",
      answer: "El diseño es para obras nuevas o ampliaciones que aún no se construyen. La regularización es para construcciones existentes que nunca obtuvieron permiso municipal. Ambos servicios requieren un arquitecto y trámites ante la DOM."
    },
  ];

  return (
    <section className="bg-blueprint section-padding">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">
            Preguntas Frecuentes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-4">
            Resuelve tus Dudas
          </h2>
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            Las consultas más comunes sobre plazos, costos y proceso de trabajo.
          </p>
        </div>

        <div className="space-y-0">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group border-b border-gray-200 last:border-b-0"
            >
              <summary className="flex items-start gap-3 py-5 cursor-pointer list-none">
                <HelpCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 group-open:text-[#f97316] transition-colors" strokeWidth={1.5} />
                <span className="text-sm font-semibold text-[#1e293b] group-open:text-[#f97316] transition-colors flex-1">
                  {faq.question}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0 mt-0.5 group-open:rotate-90 transition-transform" strokeWidth={1.5} />
              </summary>
              <p className="text-sm text-gray-500 leading-relaxed pb-5 pl-7">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">¿Tienes otra consulta?</p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 bg-[#f97316] text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
          >
            Contáctanos
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
