import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";
import ClientPortalCTA from "@/components/client-portal-cta";

export default function ClientPortal() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button onClick={() => setLocation("/")} className="text-xl sm:text-2xl font-display font-semibold hover:opacity-80 transition-opacity">
              <span className="text-primary">ArquitectoChile</span>
              <span className="text-secondary">.com</span>
            </button>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setLocation("/")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Button>
              <Button onClick={() => setLocation("/portal-cliente/login")}>
                <User className="w-4 h-4 mr-2" />
                Iniciar Sesión con Google
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <ClientPortalCTA />
    </div>
  );
}
