import { Link } from "wouter";
import { Cpu, Gavel } from "lucide-react";
import Navigation from "@/components/navigation";
import { useSEO } from "@/hooks/useSEO";

export default function ObrasMenoresEmpresas() {
  useSEO({
    title: "Obras Menores y Regularización para Empresas | ArquitectoChile",
    description: "Gestión integral de obras menores, regularizaciones y cumplimiento normativo para empresas, transnacionales y retail en Chile. Continuidad operativa garantizada.",
    path: "/obras-menores-empresas",
  });

  return (
    <div className="bg-gray-50 text-gray-900 font-sans leading-relaxed">
      <Navigation />
      <header className="bg-[#0f172a] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Proteja su Continuidad Operativa y Asegure el Cumplimiento Normativo de sus Instalaciones.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-10">
            Gestión integral de Obras Menores y Regularizaciones para Grandes Empresas, Transnacionales y Retail.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="#contacto" className="bg-[#f97316] hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300">
              Agendar Diagnóstico Online Gratis
            </a>
            <a href="#visita" className="bg-white text-[#0f172a] hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300">
              Solicitar Visita Técnica a Terreno
            </a>
          </div>
        </div>
      </header>

      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-sm font-semibold text-[#64748b] uppercase tracking-widest mb-8">Confían en nuestra gestión estratégica:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale">
            <span className="text-2xl font-bold text-gray-800">ENAER</span>
            <span className="text-2xl font-bold text-gray-800">ISA INTERCHILE</span>
            <span className="text-2xl font-bold text-gray-800">SIBELCO</span>
            <span className="text-2xl font-bold text-gray-800">ALDEA NATIVA</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-[#0f172a] border-l-4 border-[#f97316] pl-4">Donde la Eficiencia no es Negociable</h2>
        <p className="text-lg mb-6">
          Para una gran empresa, una instalación que no cumple con la normativa o un espacio mal optimizado no es solo un detalle estético; <strong>es un riesgo patrimonial.</strong> Las multas de la DOM, las posibles clausuras y la pérdida de productividad por infraestructuras deficientes son costos que su balance no debe asumir.
        </p>
        <p className="text-lg mb-10">
          La mayoría de los contratistas entienden de construcción, pero pocos entienden de <strong>procesos corporativos y blindaje legal.</strong> En ArquitectoChile.com, no solo construimos: gestionamos activos bajo estándares internacionales.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <Cpu className="text-[#0f172a] w-8 h-8 mb-4" />
            <h3 className="font-bold text-xl mb-2">Visualización de Vanguardia</h3>
            <p className="text-[#64748b]">Elimine la incertidumbre. Utilizamos tecnología de renderizado hiper-realista para que visualice el resultado final antes de la primera palada. Cero sorpresas.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <Gavel className="text-[#0f172a] w-8 h-8 mb-4" />
            <h3 className="font-bold text-xl mb-2">Respaldo Normativo</h3>
            <p className="text-[#64748b]">Bajo la dirección de Patricio Becar (U. de Chile, MBA y Revisor Independiente MINVU), cada obra nace alineada con la LGUC para asegurar su Recepción Final.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Nuestras Áreas de Intervención Especializada</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <h4 className="font-bold text-xl mb-3">Infraestructura de Alta Exigencia</h4>
              <p className="text-[#64748b] italic">Salas eléctricas, celdas de control, centros de datos y casinos industriales.</p>
            </div>
            <div className="p-6">
              <h4 className="font-bold text-xl mb-3">Retail y Espacios de Marca</h4>
              <p className="text-[#64748b] italic">Despliegue de tiendas de alto estándar donde el diseño es el vendedor silencioso.</p>
            </div>
            <div className="p-6">
              <h4 className="font-bold text-xl mb-3">Remodelaciones Críticas</h4>
              <p className="text-[#64748b] italic">Oficinas de gerencia y áreas administrativas ejecutadas sin detener su operación.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto bg-[#0f172a] rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Hablamos de su próximo proyecto?</h2>
          <p className="text-xl text-gray-300 mb-12 italic">Seleccione el nivel de asesoría que su empresa requiere hoy:</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-[#f97316] transition cursor-pointer">
              <h3 className="text-2xl font-bold mb-4 text-white">Diagnóstico Estratégico</h3>
              <p className="text-gray-300 text-sm mb-6 uppercase tracking-wider font-bold">Sin Costo - 15 Minutos Online</p>
              <p className="text-gray-400 mb-8">Revisión preliminar de objetivos, normativa aplicable y factibilidad técnica vía Meet/Zoom.</p>
              <a href="https://tidycal.com/arquitectopatriciobecar/" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#f97316] py-3 rounded-lg font-bold hover:bg-orange-600 transition text-white">Agendar Videollamada</a>
            </div>

            <div id="visita" className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-[#f97316] transition cursor-pointer">
              <h3 className="text-2xl font-bold mb-4">Visita Técnica In Situ</h3>
              <p className="text-[#f97316] text-sm mb-6 uppercase tracking-wider font-bold">Inversión Profesional Reembolsable</p>
              <p className="text-gray-400 mb-8">Inspección técnica detallada y levantamiento en terreno. El valor de la visita se abona al presupuesto final de obra.</p>
              <Link href="/contacto" className="block w-full bg-[#f97316] py-3 rounded-lg font-bold hover:bg-orange-600 transition text-center">Solicitar Visita Presencial</Link>
            </div>
          </div>

          <p className="mt-12 text-sm text-gray-500">
            Liderado por Patricio Becar E. | Arquitecto Universidad de Chile | MBA | Revisor Independiente MINVU
          </p>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-400 text-sm border-t border-gray-200">
        &copy; 2026 ArquitectoChile.com - Todos los derechos reservados.
      </footer>
    </div>
  );
}