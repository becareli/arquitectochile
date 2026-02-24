import { Users, HardHat, Zap, ArrowRight } from "lucide-react";

export default function CollaboratorsBanner() {
  return (
    <section className="bg-[#0f172a] py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <HardHat className="w-5 h-5 text-gray-300" strokeWidth={1.5} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-gray-300" strokeWidth={1.5} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-300" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-1.5">
              Equipo de Especialistas
            </p>
            <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
              Contamos con una Red de Colaboradores Certificados: desde ingeniería estructural hasta especialistas en eficiencia energética, gestionamos a los mejores profesionales para tu obra.
            </p>
          </div>

          <a
            href="/colaboradores"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors whitespace-nowrap flex-shrink-0"
          >
            Conocer más
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
