import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { apiRequest } from "@/lib/queryClient";

export default function OficinaAcceso() {
  useSEO({ title: "Validando acceso | Oficina digital - ArquitectoChile.com", description: "Validando tu enlace de acceso.", path: "/oficina/acceso", noindex: true });
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token") ?? "";
    window.history.replaceState(null, "", window.location.pathname); // el token no queda en el historial
    apiRequest("POST", "/api/office/auth/verify", { token })
      .then((res) => res.json())
      .then(() => setLocation("/oficina"))
      .catch(() => setError("El enlace venció o ya fue usado. Pide uno nuevo para entrar."));
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4">{error ? <AlertTriangle className="w-10 h-10 text-yellow-600" /> : <Loader2 className="w-10 h-10 text-[#1D2530] animate-spin" />}</div>
          <CardTitle>{error ? "No pudimos validar tu acceso" : "Validando tu acceso..."}</CardTitle>
        </CardHeader>
        {error && (
          <CardContent className="space-y-3">
            <p className="text-gray-600">{error}</p>
            <Button className="w-full" onClick={() => setLocation("/oficina")}>Pedir un enlace nuevo</Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
