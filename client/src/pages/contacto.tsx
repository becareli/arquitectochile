import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import FormsAppEmbed from "@/components/forms-app-embed";
import { useSEO } from "@/hooks/useSEO";

export default function Contacto() {
  useSEO({
    title: "Contacto | Agenda tu Asesoría - ArquitectoChile.com",
    description: "Contacta al arquitecto Patricio Becar Elissegaray en Santiago. Agenda tu asesoría en diseño, regularización, permisos o inspección técnica en Chile.",
    path: "/contacto",
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <section className="bg-blueprint-dark text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold text-[#f97316] uppercase tracking-[0.2em] mb-4">
              Contacto general
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Cuéntanos sobre tu proyecto
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mx-auto">
              Selecciona el servicio que necesitas y comparte los antecedentes principales para que podamos orientarte.
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FormsAppEmbed
              src="https://share.forms.app/becareligroup/formulario-de-calificacion-profesional-arquitectochilecom"
              title="Formulario de calificación profesional de ArquitectoChile.com"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}