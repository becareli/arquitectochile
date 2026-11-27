import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CreditCard, Calendar, Loader2, Play } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { apiRequest } from "@/lib/queryClient";

function youtubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

const steps = [
  { icon: FileText, title: "Tus documentos", text: "Planos, especificaciones, renders y actas, siempre actualizados y listos para descargar." },
  { icon: Calendar, title: "Tu expediente", text: "Ve en qué etapa está tu trámite y qué viene después, sin tener que preguntar." },
  { icon: CreditCard, title: "Tus pagos", text: "Pagos realizados y pendientes, con sus boletas y comprobantes." },
];

export default function PortalClienteBienvenida() {
  useSEO({
    title: "Bienvenido | Portal Cliente - ArquitectoChile.com",
    description: "Bienvenida al portal de clientes de ArquitectoChile.com.",
    path: "/portal-cliente/bienvenida",
    noindex: true,
  });

  const [, setLocation] = useLocation();
  const [newsletter, setNewsletter] = useState(true);
  const [saving, setSaving] = useState(false);

  const me = useQuery({
    queryKey: ["portal-me"],
    queryFn: async () => {
      const res = await fetch("/api/portal/me", { credentials: "include" });
      if (res.status === 401) return null;
      return res.json();
    },
    retry: false,
  });

  if (me.isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }
  if (!me.data) {
    setTimeout(() => setLocation("/portal-cliente/login"), 0);
    return null;
  }

  const videoUrl = me.data.projects?.[0]?.welcomeVideoUrl || me.data.defaultWelcomeVideo;
  const vid = youtubeId(videoUrl);

  async function enter() {
    setSaving(true);
    await apiRequest("POST", "/api/portal/welcome/seen", { newsletterOptIn: newsletter }).catch(() => undefined);
    setLocation("/portal-cliente/mi-proyecto");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Bienvenido, {me.data.client.name.split(" ")[0]}</h1>
          <p className="text-gray-600 mt-2">Este es tu espacio para seguir tu proyecto con tranquilidad.</p>
        </div>

        <Card className="overflow-hidden">
          {vid ? (
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1&hl=es`}
                title="Bienvenida del arquitecto"
                allow="accelerometer; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-video bg-slate-900 flex flex-col items-center justify-center text-slate-300 gap-2">
              <Play className="w-10 h-10" />
              <p className="text-sm">Aquí irá el video de bienvenida del arquitecto Patricio Becar</p>
            </div>
          )}
        </Card>

        <div className="grid sm:grid-cols-3 gap-3">
          {steps.map(({ icon: Icon, title, text }) => (
            <Card key={title}>
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Icon className="w-5 h-5 text-blue-600" />{title}</CardTitle></CardHeader>
              <CardContent className="text-sm text-gray-600">{text}</CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" className="mt-1" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
              <span>Quiero recibir el boletín de ArquitectoChile con consejos para cuidar y valorizar mi propiedad. Puedo cancelarlo cuando quiera.</span>
            </label>
            <Button className="w-full" size="lg" onClick={enter} disabled={saving}>
              {saving ? "Entrando..." : "Entrar a mi proyecto"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
