import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Clock, CreditCard, Download, FileText, Home, Loader2, LogOut, Mail, Receipt, Sparkles, Star } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { apiRequest } from "@/lib/queryClient";

type Project = {
  id: number;
  name: string;
  description: string | null;
  status: string;
  progress: number | null;
  startDate: string | null;
  estimatedCompletion: string | null;
  permitFileNumber: string | null;
  permitStatus: string | null;
};
type Me = { client: { id: number; name: string; email: string; welcomeSeen: boolean }; projects: Project[] };
type Msg = { id: number; kind: "official" | "receipt" | "notice"; subject: string; body: string; hasAttachment: boolean; createdAt: string };
type Doc = { id: number; name: string; type: string; fileSize: number | null; version: number; uploadDate: string };
type Payment = {
  id: number;
  description: string;
  amount: string;
  dueDate: string;
  paidDate: string | null;
  status: "paid" | "pending" | "overdue";
  receiptType: string | null;
  receiptNumber: string | null;
  hasReceipt: boolean;
};
type TimelineItem = { id: number; title: string; description: string | null; date: string; status: "completed" | "current" | "upcoming" };
type ProjectData = {
  project: Project;
  documents: Doc[];
  payments: Payment[];
  paymentSummary: { totalPaid: number; totalPending: number; totalContract: number };
  timeline: TimelineItem[];
  messages: Msg[];
  feedbackSent: boolean;
};

const PERMIT_STEPS: { key: string; label: string }[] = [
  { key: "ingresado", label: "Ingresado" },
  { key: "observado", label: "Observado" },
  { key: "reingresado", label: "Reingresado" },
  { key: "aprobado", label: "Aprobado" },
  { key: "recepcion", label: "Recepción final" },
];
const DOC_ORDER = ["plans", "renders", "specifications", "observations", "permits", "contracts", "photos", "other"];
const MSG_LABEL: Record<string, string> = { official: "Oficial", receipt: "Comprobante", notice: "Aviso" };
const OFFERS = [
  { title: "Informe de tu propiedad 360", text: "Un diagnóstico completo de tu propiedad: normativa, potencial de ampliación y riesgos. Próximamente.", cta: "Quiero saber más" },
  { title: "Asesoría de arquitectura a domicilio", text: "Una visita para evaluar mejoras, ampliaciones o regularizaciones en otra propiedad tuya o de un familiar.", cta: "Agendar asesoría" },
  { title: "Regularización de viviendas", text: "Si conoces a alguien con una construcción sin permiso, podemos ayudarlo a regularizarla.", cta: "Recomendar" },
];

const STATUS_LABEL: Record<string, string> = {
  planning: "Planificación",
  design: "Diseño",
  permits: "Permisos",
  construction: "Construcción",
  completed: "Terminado",
};
const DOC_LABEL: Record<string, string> = {
  plans: "Planos",
  contracts: "Contratos",
  permits: "Permisos",
  specifications: "Especificaciones",
  renders: "Renders",
  observations: "Actas de observaciones",
  photos: "Fotos",
  other: "Otros",
};

const clp = (n: number | string) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(Number(n));
const fecha = (d: string | null) => (d ? new Date(d).toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" }) : "—");
const size = (b: number | null) => (b ? (b > 1_000_000 ? `${(b / 1_000_000).toFixed(1)} MB` : `${Math.round(b / 1000)} KB`) : "");

async function getJson<T>(url: string): Promise<T | null> {
  const res = await fetch(url, { credentials: "include" });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

type TabKey = "documentos" | "pagos" | "timeline" | "mensajes" | "opinion" | "servicios";

export default function PortalClienteMiProyecto() {
  useSEO({
    title: "Mi proyecto | Portal Cliente - ArquitectoChile.com",
    description: "Documentos, pagos y avance de tu proyecto.",
    path: "/portal-cliente/mi-proyecto",
    noindex: true,
  });

  const [, setLocation] = useLocation();
  const [tab, setTab] = useState<TabKey>("documentos");
  const [selected, setSelected] = useState<number | null>(null);
  const qc = useQueryClient();
  const [fb, setFb] = useState({ rating: 5, comment: "", canPublish: true, referralName: "", referralContact: "" });
  const [fbState, setFbState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const me = useQuery({ queryKey: ["portal-me"], queryFn: () => getJson<Me>("/api/portal/me"), retry: false });
  const projectId = selected ?? me.data?.projects[0]?.id ?? null;
  const data = useQuery({
    queryKey: ["portal-project", projectId],
    queryFn: () => getJson<ProjectData>(`/api/portal/projects/${projectId}`),
    enabled: projectId !== null,
    retry: false,
  });

  async function logout() {
    await apiRequest("POST", "/api/portal/auth/logout").catch(() => undefined);
    setLocation("/portal-cliente/login");
  }

  if (me.isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }
  if (!me.data) {
    // Sin sesión: se pide un enlace nuevo
    setTimeout(() => setLocation("/portal-cliente/login"), 0);
    return null;
  }

  if (!me.data.client.welcomeSeen) {
    setTimeout(() => setLocation("/portal-cliente/bienvenida"), 0);
    return null;
  }

  async function sendFeedback() {
    if (!projectId) return;
    setFbState("sending");
    try {
      await apiRequest("POST", `/api/portal/projects/${projectId}/feedback`, {
        rating: fb.rating,
        comment: fb.comment,
        canPublish: fb.canPublish,
        ...(fb.referralName ? { referralName: fb.referralName } : {}),
        ...(fb.referralContact ? { referralContact: fb.referralContact } : {}),
      });
      setFbState("done");
      qc.invalidateQueries({ queryKey: ["portal-project", projectId] });
    } catch {
      setFbState("error");
    }
  }

  const d = data.data;
  const tabs: { key: TabKey; label: string; icon: typeof FileText }[] = [
    { key: "documentos", label: "Documentos", icon: FileText },
    { key: "pagos", label: "Pagos y boletas", icon: CreditCard },
    { key: "timeline", label: "Expediente y avance", icon: Calendar },
    { key: "mensajes", label: "Mensajes", icon: Mail },
    { key: "opinion", label: "Tu opinión", icon: Star },
    { key: "servicios", label: "Para ti", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center py-3">
          <div className="flex items-center gap-3">
            <Home className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">ArquitectoChile</h1>
              <p className="text-xs text-gray-500">Hola, {me.data.client.name}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4 mr-1" /> Salir
          </Button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {me.data.projects.length === 0 && (
          <Card><CardContent className="pt-6 text-gray-600">Aún no tienes proyectos asociados a tu cuenta. Si crees que es un error, escríbenos.</CardContent></Card>
        )}

        {me.data.projects.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {me.data.projects.map((p) => (
              <Button key={p.id} size="sm" variant={p.id === projectId ? "default" : "outline"} onClick={() => setSelected(p.id)}>
                {p.name}
              </Button>
            ))}
          </div>
        )}

        {data.isLoading && <Loader2 className="w-6 h-6 animate-spin text-blue-600" />}

        {d && (
          <>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{d.project.name}</h2>
                    {d.project.description && <p className="text-gray-600">{d.project.description}</p>}
                    <p className="text-sm text-gray-500 mt-1">
                      Inicio: {fecha(d.project.startDate)} · Entrega estimada: {fecha(d.project.estimatedCompletion)}
                    </p>
                  </div>
                  <Badge>{STATUS_LABEL[d.project.status] ?? d.project.status}</Badge>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Avance</span>
                    <span>{d.project.progress ?? 0}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: `${d.project.progress ?? 0}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2 overflow-x-auto">
              {tabs.map(({ key, label, icon: Icon }) => (
                <Button key={key} variant={tab === key ? "default" : "outline"} size="sm" onClick={() => setTab(key)}>
                  <Icon className="w-4 h-4 mr-1" /> {label}
                </Button>
              ))}
            </div>

            {tab === "documentos" && (
              <Card>
                <CardHeader><CardTitle className="text-lg">Documentos y planos</CardTitle></CardHeader>
                <CardContent className="divide-y">
                  {d.documents.length === 0 && <p className="text-gray-500">Todavía no hay documentos publicados.</p>}
                  {[...d.documents].sort((a, b) => DOC_ORDER.indexOf(a.type) - DOC_ORDER.indexOf(b.type)).map((doc, i, arr) => (
                    <div key={doc.id}>
                      {(i === 0 || arr[i - 1].type !== doc.type) && (
                        <p className="pt-3 text-xs font-semibold uppercase tracking-wide text-blue-700">{DOC_LABEL[doc.type] ?? doc.type}</p>
                      )}
                    <div className="flex items-center justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {DOC_LABEL[doc.type] ?? doc.type} · v{doc.version} · {fecha(doc.uploadDate)} {size(doc.fileSize) && `· ${size(doc.fileSize)}`}
                        </p>
                      </div>
                      <Button asChild size="sm" variant="outline">
                        <a href={`/api/portal/documents/${doc.id}/download`}><Download className="w-4 h-4 mr-1" /> Descargar</a>
                      </Button>
                    </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {tab === "pagos" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Card><CardContent className="pt-6"><p className="text-sm text-gray-500">Pagado</p><p className="text-xl font-bold text-green-700">{clp(d.paymentSummary.totalPaid)}</p></CardContent></Card>
                  <Card><CardContent className="pt-6"><p className="text-sm text-gray-500">Pendiente</p><p className="text-xl font-bold text-amber-700">{clp(d.paymentSummary.totalPending)}</p></CardContent></Card>
                  <Card><CardContent className="pt-6"><p className="text-sm text-gray-500">Total del proyecto</p><p className="text-xl font-bold text-gray-900">{clp(d.paymentSummary.totalContract)}</p></CardContent></Card>
                </div>
                <Card>
                  <CardContent className="pt-6 divide-y">
                    {d.payments.length === 0 && <p className="text-gray-500">Aún no hay pagos registrados.</p>}
                    {d.payments.map((p) => (
                      <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                        <div>
                          <p className="font-medium text-gray-900">{p.description}</p>
                          <p className="text-xs text-gray-500">
                            {p.status === "paid" ? `Pagado el ${fecha(p.paidDate)}` : `Vence el ${fecha(p.dueDate)}`}
                            {p.receiptNumber && ` · ${p.receiptType === "factura" ? "Factura" : "Boleta"} N° ${p.receiptNumber}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{clp(p.amount)}</span>
                          <Badge variant={p.status === "paid" ? "default" : "outline"} className={p.status === "overdue" ? "border-red-400 text-red-700" : ""}>
                            {p.status === "paid" ? "Pagado" : p.status === "overdue" ? "Atrasado" : "Pendiente"}
                          </Badge>
                          {p.hasReceipt && (
                            <Button asChild size="sm" variant="outline">
                              <a href={`/api/portal/payments/${p.id}/receipt`}><Receipt className="w-4 h-4 mr-1" /> {p.receiptType === "factura" ? "Factura" : "Boleta"}</a>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {tab === "timeline" && (
              <Card>
                <CardHeader><CardTitle className="text-lg">Expediente y avance</CardTitle></CardHeader>
                <CardContent className="space-y-5">
                  {d.project.permitStatus && (
                    <div className="rounded-lg bg-blue-50 p-4">
                      <p className="text-sm font-medium text-blue-900 mb-3">
                        Estado de tu expediente{d.project.permitFileNumber ? ` N° ${d.project.permitFileNumber}` : ""}
                      </p>
                      <div className="flex items-center gap-1 overflow-x-auto">
                        {PERMIT_STEPS.map((st, i) => {
                          const cur = PERMIT_STEPS.findIndex((x) => x.key === d.project.permitStatus);
                          const done = i < cur, active = i === cur;
                          return (
                            <div key={st.key} className="flex items-center gap-1">
                              <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${active ? "bg-blue-600 text-white" : done ? "bg-green-100 text-green-800" : "bg-white text-gray-400 border"}`}>
                                {done ? "✓ " : ""}{st.label}
                              </span>
                              {i < PERMIT_STEPS.length - 1 && <span className="text-gray-300">›</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {d.timeline.length === 0 && <p className="text-gray-500">El cronograma se publicará pronto.</p>}
                  {d.timeline.map((t) => (
                    <div key={t.id} className="flex gap-3">
                      {t.status === "completed" ? <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" /> : <Clock className={`w-5 h-5 mt-0.5 ${t.status === "current" ? "text-blue-600" : "text-gray-400"}`} />}
                      <div>
                        <p className={`font-medium ${t.status === "upcoming" ? "text-gray-500" : "text-gray-900"}`}>{t.title}</p>
                        <p className="text-xs text-gray-500">{fecha(t.date)}{t.status === "current" && " · En curso"}</p>
                        {t.description && <p className="text-sm text-gray-600 mt-1">{t.description}</p>}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {tab === "mensajes" && (
              <Card>
                <CardHeader><CardTitle className="text-lg">Mensajes y comprobantes</CardTitle></CardHeader>
                <CardContent className="divide-y">
                  {d.messages.length === 0 && <p className="text-gray-500">Aquí verás los mensajes oficiales y comprobantes que te enviemos.</p>}
                  {d.messages.map((m) => (
                    <div key={m.id} className="py-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{MSG_LABEL[m.kind]}</Badge>
                        <span className="text-xs text-gray-500">{fecha(m.createdAt)}</span>
                      </div>
                      <p className="font-medium text-gray-900">{m.subject}</p>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{m.body}</p>
                      {m.hasAttachment && (
                        <Button asChild size="sm" variant="outline">
                          <a href={`/api/portal/messages/${m.id}/attachment`}><Download className="w-4 h-4 mr-1" /> Descargar adjunto</a>
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {tab === "opinion" && (
              <Card>
                <CardHeader><CardTitle className="text-lg">Cuéntanos cómo te fue</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {d.feedbackSent || fbState === "done" ? (
                    <p className="text-green-700">¡Gracias! Recibimos tu opinión y la valoramos mucho.</p>
                  ) : (
                    <>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button key={n} type="button" aria-label={`${n} estrellas`} onClick={() => setFb({ ...fb, rating: n })}>
                            <Star className={`w-7 h-7 ${n <= fb.rating ? "fill-yellow-400 text-yellow-500" : "text-gray-300"}`} />
                          </button>
                        ))}
                      </div>
                      <textarea className="w-full border rounded-md p-3 text-sm min-h-[110px]" placeholder="¿Cómo fue tu experiencia con nosotros?" value={fb.comment} onChange={(e) => setFb({ ...fb, comment: e.target.value })} />
                      <label className="flex items-start gap-2 text-sm text-gray-700">
                        <input type="checkbox" className="mt-1" checked={fb.canPublish} onChange={(e) => setFb({ ...fb, canPublish: e.target.checked })} />
                        <span>Autorizo que ArquitectoChile publique mi opinión (con mi nombre) en su sitio.</span>
                      </label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input className="border rounded-md p-2 text-sm" placeholder="¿A quién podríamos ayudar? (nombre, opcional)" value={fb.referralName} onChange={(e) => setFb({ ...fb, referralName: e.target.value })} />
                        <input className="border rounded-md p-2 text-sm" placeholder="Su teléfono o correo (opcional)" value={fb.referralContact} onChange={(e) => setFb({ ...fb, referralContact: e.target.value })} />
                      </div>
                      {fbState === "error" && <p className="text-sm text-red-600">No pudimos enviarla. Revisa que tu comentario tenga al menos 10 caracteres.</p>}
                      <Button onClick={sendFeedback} disabled={fbState === "sending" || fb.comment.trim().length < 10}>
                        {fbState === "sending" ? "Enviando..." : "Enviar mi opinión"}
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {tab === "servicios" && (
              <div className="grid sm:grid-cols-3 gap-3">
                {OFFERS.map((o) => (
                  <Card key={o.title}>
                    <CardHeader className="pb-2"><CardTitle className="text-base">{o.title}</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">{o.text}</p>
                      <Button size="sm" variant="outline" onClick={() => setLocation("/contacto")}>{o.cta}</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
