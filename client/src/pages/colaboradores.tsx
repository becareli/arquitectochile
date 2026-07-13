import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ColaboradoresSection from "@/components/colaboradores-section";
import { useSEO } from "@/hooks/useSEO";

export default function Colaboradores() {
  const [, setLocation] = useLocation();

  useSEO({
    title: "Red de Colaboradores | ArquitectoChile.com",
    description: "Conoce a los colaboradores de ArquitectoChile.com: profesionales verificados que apoyan proyectos de diseño y construcción en toda la Región Metropolitana.",
    path: "/colaboradores",
  });

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button onClick={() => setLocation("/")} className="text-xl sm:text-2xl font-display font-semibold hover:opacity-80 transition-opacity">
              <span className="text-primary">ArquitectoChile</span>
              <span className="text-secondary">.com</span>
            </button>
            <Button variant="outline" onClick={() => setLocation("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Button>
          </div>
        </div>
      </nav>

      <ColaboradoresSection />
    </div>
  );
}
