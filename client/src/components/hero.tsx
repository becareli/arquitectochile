import { ArrowRight, CheckCircle } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="bg-blueprint-dark text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-6">
              Oficina Técnica de Arquitectura · Santiago, Chile
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
              Diseño, permisos y construcción con respaldo profesional de la Universidad de Chile.
            </h1>

            <p className="text-lg mb-8 text-gray-300 leading-relaxed max-w-lg">
              Más de 26 años de experiencia en arquitectura residencial, gestión normativa municipal y soluciones corporativas.
            </p>

            <div className="space-y-3 mb-10">
              {[
                "Diseño de autor personalizado con visualización 3D",
                "Gestión completa de permisos ante DOM, SII y CBR",
                "Acompañamiento integral hasta la entrega final",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#f97316] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-sm text-gray-300">{item}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('contacto')}
                className="bg-[#f97316] text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
              >
                Asesoría a Domicilio — $45.000
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => scrollToSection('servicios')}
                className="border border-white/20 text-white px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-white/5 transition-all duration-200"
              >
                Ver Servicios
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Arquitecto Patricio Becar Elissegaray · U. de Chile · Revisor Independiente MINVU
            </p>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="w-full max-w-sm">
              <div className="border border-white/10 rounded-md p-8 bg-white/5 backdrop-blur-sm">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#f97316] mb-4">
                  Servicio Destacado
                </p>
                <h3 className="text-xl font-bold text-white mb-2">Arquitecto a Domicilio</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  Visita técnica en su terreno o propiedad. Evaluación profesional, diagnóstico y plan de acción personalizado.
                </p>
                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-[#f97316]">$45.000</p>
                    <p className="text-xs text-gray-500">Consulta inicial</p>
                  </div>
                  <button
                    onClick={() => scrollToSection('contacto')}
                    className="bg-[#f97316] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Agendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
