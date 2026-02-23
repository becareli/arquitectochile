import { CheckCircle, Shield, Clock, Award } from "lucide-react";

export default function Guarantees() {
  const commitments = [
    {
      icon: CheckCircle,
      title: "Compromiso de Diseño",
      description: "Rondas de ajuste definidas en contrato para que el diseño 3D refleje tus necesidades.",
    },
    {
      icon: Shield,
      title: "Gestión Legal Profesional",
      description: "Tramitamos permisos con el respaldo de más de 26 años de experiencia ante DOM.",
    },
    {
      icon: Clock,
      title: "Plazos Claros",
      description: "Te comunicamos plazos reales y mantenemos informes de avance constantes.",
    },
    {
      icon: Award,
      title: "Respaldo Universitario",
      description: "Arquitecto titulado U. de Chile, Revisor Independiente MINVU, MBA.",
    },
  ];

  return (
    <section className="bg-white section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">
            Nuestro Compromiso
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-4">
            Respaldo Profesional en Cada Etapa
          </h2>
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            Compromisos concretos para que avances con tranquilidad en cada fase de tu proyecto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {commitments.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-md border border-gray-200 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#1e293b]" strokeWidth={1.5} />
                </div>
                <h4 className="text-sm font-bold text-[#1e293b] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
