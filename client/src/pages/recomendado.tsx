import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { apiRequest } from "@/lib/queryClient";

export default function Recomendado() {
  useSEO({
    title: "Te recomendaron a ArquitectoChile.com",
    description: "Cuéntanos qué necesitas y el arquitecto Patricio Becar te contactará.",
    path: "/recomendado",
    noindex: true,
  });

  const [, params] = useRoute("/recomendado/:code");
  const code = params?.code ?? "";
  const [referrer, setReferrer] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", contact: "", need: "", website: "" }); // website = campo trampa para bots
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    if (!code) return;
    fetch(`/api/portal/public/referrer/${encodeURIComponent(code)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setReferrer(d?.firstName ?? null))
      .catch(() => undefined);
  }, [code]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      await apiRequest("POST", "/api/portal/public/referral", { ...form, code });
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {state === "done" && <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-2" />}
          <CardTitle className="text-2xl">
            {state === "done" ? "¡Gracias!" : referrer ? `${referrer} te recomendó a ArquitectoChile` : "Te recomendaron a ArquitectoChile"}
          </CardTitle>
          <p className="text-gray-600 mt-2">
            {state === "done"
              ? "Recibimos tus datos. El arquitecto Patricio Becar te contactará pronto."
              : "Cuéntanos qué necesitas y el arquitecto Patricio Becar te contactará."}
          </p>
        </CardHeader>
        {state !== "done" && (
          <CardContent>
            <form onSubmit={submit} className="space-y-3">
              <Input required placeholder="Tu nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input required placeholder="Tu teléfono o correo" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
              <Input placeholder="¿Qué necesitas? (ampliar, regularizar, diseñar...)" value={form.need} onChange={(e) => setForm({ ...form, need: e.target.value })} />
              {/* Campo oculto: una persona no lo ve ni lo llena, un bot sí */}
              <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              {state === "error" && <p className="text-sm text-red-600">No pudimos enviarlo. Revisa tus datos e inténtalo de nuevo.</p>}
              <Button type="submit" className="w-full" disabled={state === "sending"}>
                {state === "sending" ? "Enviando..." : "Quiero que me contacten"}
              </Button>
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
