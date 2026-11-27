import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { apiRequest } from "@/lib/queryClient";

export default function PortalClienteAcceso() {
  useSEO({
    title: "Validando acceso | Portal Cliente - ArquitectoChile.com",
    description: "Validando tu enlace de acceso al portal de clientes.",
    path: "/portal-cliente/acceso",
    noindex: true,
  });

  const [, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token") ?? "";
    // Se quita el token de la barra de direcciones para que no quede en el historial
    window.history.replaceState(null, "", window.location.pathname);

    apiRequest("POST", "/api/portal/auth/verify", { token })
      .then(() => setLocation("/portal-cliente/mi-proyecto"))
      .catch(() => setError("El enlace venció o ya fue usado. Pide uno nuevo para entrar."));
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            {error ? <AlertTriangle className="w-10 h-10 text-yellow-600" /> : <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />}
          </div>
          <CardTitle>{error ? "No pudimos validar tu acceso" : "Validando tu acceso..."}</CardTitle>
        </CardHeader>
        {error && (
          <CardContent className="space-y-3">
            <p className="text-gray-600">{error}</p>
            <Button className="w-full" onClick={() => setLocation("/portal-cliente/login")}>
              Pedir un enlace nuevo
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
