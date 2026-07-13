import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Construction } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export default function PortalClienteLogin() {
  useSEO({
    title: "Iniciar Sesión | Portal Cliente - ArquitectoChile.com",
    description: "Inicia sesión en el portal de clientes de ArquitectoChile.com para revisar el avance de tu proyecto.",
    path: "/portal-cliente/login",
    noindex: true,
  });

  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button onClick={() => setLocation("/")} className="text-xl sm:text-2xl font-display font-semibold hover:opacity-80 transition-opacity">
              <span className="text-primary">ArquitectoChile</span>
              <span className="text-secondary">.com</span>
            </button>
            <Button variant="outline" onClick={() => setLocation("/portal-cliente")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Construction className="w-8 h-8 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl">En Construcción</CardTitle>
            <p className="text-gray-600 mt-2">
              El inicio de sesión con Google estará disponible próximamente.
              Estamos trabajando para ofrecerte una experiencia segura y confiable.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-blue-800">
                Tu seguridad es nuestra prioridad. Pronto podrás acceder a tus proyectos
                de forma segura con tu cuenta de Google.
              </p>
            </div>
            <Button
              onClick={() => setLocation("/contacto")}
              className="w-full"
            >
              Contactar para más información
            </Button>
            <Button
              variant="outline"
              onClick={() => setLocation("/")}
              className="w-full"
            >
              Volver al Inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
