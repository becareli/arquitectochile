import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { apiRequest } from "@/lib/queryClient";

export default function PortalClienteLogin() {
  useSEO({
    title: "Iniciar Sesión | Portal Cliente - ArquitectoChile.com",
    description: "Ingresa al portal de clientes de ArquitectoChile.com para revisar el avance de tu proyecto.",
    path: "/portal-cliente/login",
    noindex: true,
  });

  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [googleError, setGoogleError] = useState<string | null>(null);
  const googleBtn = useRef<HTMLDivElement>(null);

  // Botón "Continuar con Google": solo aparece si el servidor tiene el acceso con Google activo
  useEffect(() => {
    let cancelled = false;
    fetch("/api/portal/config", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((cfg) => {
        if (cancelled || !cfg?.googleClientId) return;
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.onload = () => {
          const g = (window as any).google?.accounts?.id;
          if (!g || !googleBtn.current) return;
          g.initialize({
            client_id: cfg.googleClientId,
            callback: async (resp: { credential: string }) => {
              try {
                const res = await apiRequest("POST", "/api/portal/auth/google", { credential: resp.credential });
                const data = await res.json();
                setLocation(data.welcomeSeen ? "/portal-cliente/mi-proyecto" : "/portal-cliente/bienvenida");
              } catch (err) {
                const msg = String(err).includes("403")
                  ? "Ese correo de Google no está registrado como cliente. Escríbenos y te invitamos."
                  : "No pudimos entrar con Google. Prueba con el enlace por correo.";
                setGoogleError(msg);
              }
            },
          });
          g.renderButton(googleBtn.current, { theme: "outline", size: "large", width: 320, text: "continue_with", locale: "es" });
        };
        document.head.appendChild(script);
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, [setLocation]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await apiRequest("POST", "/api/portal/auth/request", { email });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

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
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              {status === "sent" ? <CheckCircle className="w-8 h-8 text-green-600" /> : <Mail className="w-8 h-8 text-blue-600" />}
            </div>
            <CardTitle className="text-2xl">{status === "sent" ? "Revisa tu correo" : "Accede a tu portal"}</CardTitle>
            <p className="text-gray-600 mt-2">
              {status === "sent"
                ? "Si tu correo está registrado, te enviamos un enlace de acceso. Vence en 20 minutos y funciona una sola vez."
                : "Escribe el correo con el que te invitamos y te enviaremos un enlace para entrar. Sin contraseñas."}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {status !== "sent" && (
              <form onSubmit={submit} className="space-y-4">
                <Input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="tu@correo.cl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {status === "error" && (
                  <p className="text-sm text-red-600">No pudimos enviar la solicitud. Inténtalo de nuevo en unos minutos.</p>
                )}
                <Button type="submit" className="w-full" disabled={status === "sending"}>
                  {status === "sending" ? "Enviando..." : "Enviarme el enlace"}
                </Button>
              </form>
            )}
            <div className="flex flex-col items-center gap-2">
              <div ref={googleBtn} />
              {googleError && <p className="text-sm text-red-600 text-center">{googleError}</p>}
            </div>
            <Button variant="outline" onClick={() => setLocation("/contacto")} className="w-full">
              ¿Aún no eres cliente? Escríbenos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
