import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Mail, CheckCircle, Paperclip, LogOut } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { apiRequest } from "@/lib/queryClient";
import { DOC_KINDS } from "@shared/classification";

type Task = { id: number; title: string; status: string; dueDate: string | null; project: string | null; fee: string | null; feeStatus: string; deliverableFormat: string; revision: number };
type Me = { collaborator: { onboarded: boolean; canDo3d: boolean; name: string; email: string; specialty: string; isCoordinator: boolean; phone: string | null; description: string | null; linkedinUrl: string | null; cvName: string | null; titleCertName: string | null; titleVerified: boolean; hasPhoto: boolean; publishConsent: boolean }; tasks: Task[]; fees: { pending: number; paid: number } };
type Detail = {
  task: { id: number; title: string; description: string | null; status: string; dueDate: string | null; project: string | null; bim: boolean; discipline: string | null; deliverableFormat: string; revision: number; fee: string | null; feeStatus: string; kickoffRequired: boolean; acceptedAt: string | null; advancePercent: number; advancePaidAt: string | null; kickoffAt: string | null; kickoffLink: string | null; kickoffDoneAt: string | null; deliveryDays: number | null };
  files: { id: number; name: string; stdName: string | null; version: number; kind: string; uploadedAt: string; reviewedBy: string | null; approvedBy: string | null; returnedNote: string | null }[];
  comments: { id: number; author: string; body: string; createdAt: string }[];
  events: { id: number; type: string; text: string; createdAt: string }[];
};
type TeamTask = { id: number; title: string; status: string; dueDate: string | null; deliverableFormat: string; revision: number; collaborator: string; specialty: string; project: string; bim: boolean };

const STATUS: Record<string, string> = { todo: "Por hacer", doing: "En curso", review: "En revisión", done: "Hecha" };
const clp = (n: number | string) => `$${Math.round(Number(n)).toLocaleString("es-CL")}`;
const day = (d: string | null) => (d ? new Date(d).toLocaleDateString("es-CL") : "sin fecha");
const FEE: Record<string, string> = { pending: "pendiente", invoiced: "boleta recibida, por pagar", paid: "pagado" };
const daysTo = (d: string | null) => (d ? Math.ceil((new Date(d).getTime() - Date.now()) / 86_400_000) : null);
function Countdown({ due, status }: { due: string | null; status: string }) {
  const n = daysTo(due);
  if (n === null || status === "done") return null;
  const late = n < 0;
  const text = late ? `Atrasada ${-n} día${-n === 1 ? "" : "s"}` : n === 0 ? "Se entrega hoy" : n === 1 ? "Se entrega mañana" : `Faltan ${n} días`;
  return <Badge className={late ? "bg-red-600 text-white" : n <= 2 ? "bg-[#F97015] text-[#1D2530]" : "bg-gray-200 text-gray-800"}>{text}</Badge>;
}
const send = async (method: string, url: string, body?: unknown) => (await apiRequest(method, url, body)).json();

function Login() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try { await send("POST", "/api/office/auth/request", { email }); } catch { /* respuesta genérica igual */ }
    setState("sent");
  };
  return (
    <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader><CardTitle className="text-[#1D2530]">Oficina digital · ArquitectoChile</CardTitle></CardHeader>
        <CardContent>
          {state === "sent" ? (
            <div className="text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-green-600 mx-auto" />
              <p className="text-gray-700">Si tu correo está registrado, te enviamos un enlace de acceso. Revisa tu bandeja (y el spam).</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              <p className="text-sm text-gray-600">Ingresa tu correo y te enviamos un enlace para entrar. No necesitas contraseña.</p>
              <Input type="email" required placeholder="tu@correo.cl" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button type="submit" className="w-full bg-[#F97015] text-[#1D2530] hover:bg-[#e0630f]" disabled={state === "sending"}>
                <Mail className="w-4 h-4 mr-2" /> {state === "sending" ? "Enviando..." : "Enviarme el enlace"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TaskPanel({ id, onChange }: { id: number; onChange: () => void }) {
  const qc = useQueryClient();
  const key = ["office-task", id];
  const { data } = useQuery({ queryKey: key, queryFn: async () => { const r = await fetch(`/api/office/tasks/${id}`, { credentials: "include" }); if (!r.ok) throw new Error(); return r.json() as Promise<Detail>; } });
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [docKind, setDocKind] = useState("");
  const [desc, setDesc] = useState("");
  const [existing, setExisting] = useState(""); // corrección de un documento ya entregado: "TIPO|slug"
  const docs = useQuery({ queryKey: ["office-task-docs", id], queryFn: async () => { const r = await fetch(`/api/office/tasks/${id}/documents`, { credentials: "include" }); return r.ok ? (r.json() as Promise<{ docKind: string; docSlug: string; version: number }[]>) : []; } });
  const refresh = () => { qc.invalidateQueries({ queryKey: key }); onChange(); };
  const run = async (fn: () => Promise<unknown>, ok: string) => {
    setBusy(true);
    try { await fn(); setMsg(ok); refresh(); } catch (e) { setMsg(`Error: ${(e as Error).message}`); } finally { setBusy(false); }
  };
  if (!data) return <p className="text-sm text-gray-500">Cargando...</p>;
  const t = data.task;
  const closed = t.status === "done";

  const upload = (file: File, kind: "deliverable" | "invoice" = "deliverable") => run(async () => {
    const { uploadUrl, internalPath } = await send("POST", "/api/office/upload-url");
    const put = await fetch(uploadUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
    if (!put.ok) throw new Error("No se pudo subir el archivo");
    await send("POST", `/api/office/tasks/${id}/files`, { name: file.name, path: internalPath, size: file.size, kind, ...(kind === "deliverable" && t.project && t.discipline
      ? existing
        ? { docKind: existing.split("|")[0], docSlug: existing.split("|")[1] }
        : { docKind: docKind || (t.deliverableFormat === "3d" ? "MOD" : "PLA"), description: desc || undefined }
      : {}) });
  }, kind === "invoice" ? "Boleta subida. Patricio ya fue avisado." : "Archivo subido: el sistema le asignó su código y versión.");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t.title}</CardTitle>
        <p className="text-sm text-gray-500 flex flex-wrap items-center gap-2">
          <span>{t.project ? `Proyecto: ${t.project} · ` : ""}Entrega: {day(t.dueDate)}</span>
          <Badge variant="outline">{STATUS[t.status]}</Badge>
          <Countdown due={t.dueDate} status={t.status} />
          {t.bim && <Badge variant="outline">Proyecto BIM</Badge>}
          <Badge variant="outline">Entrega en {t.deliverableFormat === "3d" ? "3D / modelo" : "2D (planos)"}</Badge>
          {t.revision > 0 && <Badge variant="outline">Modificación n.º {t.revision}</Badge>}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {t.description && <p className="text-sm whitespace-pre-wrap">{t.description}</p>}
        {t.kickoffRequired && !t.kickoffDoneAt && (
          <div className="rounded-md border border-[#F97015] bg-orange-50 p-3 text-sm space-y-2">
            <h4 className="font-semibold">¡Ganaste este proyecto! Así arrancamos</h4>
            <ol className="space-y-1">
              <li>{t.acceptedAt ? "✔" : "1."} Confirma las condiciones: <b>{t.fee ? clp(t.fee) : "—"}</b>, plazo de <b>{t.deliveryDays ?? "—"} días</b> desde el kickoff{t.advancePercent ? `, anticipo de ${t.advancePercent}% (${clp((Number(t.fee ?? 0) * t.advancePercent) / 100)})` : ", sin anticipo"}.
                {!t.acceptedAt && <Button size="sm" className="ml-2" disabled={busy} onClick={() => run(() => send("POST", `/api/office/tasks/${id}/accept`), "Gracias: Patricio fue avisado.")}>Acepto las condiciones</Button>}</li>
              {t.advancePercent > 0 && <li>{t.advancePaidAt ? "✔ Anticipo pagado" : "2. Patricio registra el pago del anticipo (te avisaremos por correo). Sube tu boleta o factura en esta tarea."}</li>}
              <li>{t.kickoffAt ? <>✔ Reunión de inicio: <b>{new Date(t.kickoffAt).toLocaleString("es-CL", { dateStyle: "full", timeStyle: "short" })}</b> {t.kickoffLink && <a className="text-[#C2410C] underline" href={t.kickoffLink}>Unirme</a>}</> : "3. Patricio agendará la reunión de inicio y te avisará."}</li>
              <li>4. Tras el kickoff el proyecto arranca y empieza a correr tu plazo.</li>
            </ol>
          </div>
        )}
        {t.kickoffDoneAt && <p className="text-xs text-gray-500">Proyecto arrancado el {day(t.kickoffDoneAt)}.</p>}
        {!closed && (
          <div className="flex flex-wrap gap-2">
            {(["todo", "doing", "review"] as const).map((s) => (
              <Button key={s} size="sm" variant={t.status === s ? "default" : "outline"} disabled={busy || t.status === s} onClick={() => run(() => send("PATCH", `/api/office/tasks/${id}/status`, { status: s }), "Estado actualizado.")}>
                {s === "review" ? "Entregar a revisión" : STATUS[s]}
              </Button>
            ))}
          </div>
        )}
        {t.deliverableFormat === "3d" && (
          <p className="text-sm rounded-md bg-[#F4F7FA] p-2">Entrega en ArchiCAD: sube el archivo del proyecto (.pln o .pla) y también su exportación en <b>IFC</b>.</p>
        )}
        {t.fee && (
          <p className="text-sm">Honorario pactado: <b>{clp(t.fee)}</b> · {FEE[t.feeStatus]}</p>
        )}
        <div>
          <h4 className="font-semibold text-sm mb-1">Archivos</h4>
          {data.files.length === 0 && <p className="text-sm text-gray-500">Aún no subes archivos.</p>}
          <ul className="text-sm space-y-1">
            {data.files.map((f) => (
              <li key={f.id}><a className="text-[#C2410C] underline" href={`/api/office/files/${f.id}/download`}>{f.stdName ?? f.name}</a> <span className="text-gray-400">· {f.kind === "invoice" ? "boleta/factura" : "entregable"} · {day(f.uploadedAt)}</span>
                {f.kind !== "invoice" && (f.approvedBy ? <Badge className="ml-2 bg-green-600 text-white">Aprobado</Badge> : f.returnedNote ? <span className="ml-2 text-red-700">Devuelto: {f.returnedNote}</span> : f.reviewedBy ? <Badge variant="outline" className="ml-2">Revisado</Badge> : <Badge variant="outline" className="ml-2">En revisión</Badge>)}
              </li>
            ))}
          </ul>
          {!closed && t.project && t.discipline && (
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <select className="border rounded-md p-1.5 bg-white" value={existing} onChange={(e) => setExisting(e.target.value)}>
                <option value="">Documento nuevo</option>
                {(docs.data ?? []).map((d) => <option key={`${d.docKind}|${d.docSlug}`} value={`${d.docKind}|${d.docSlug}`}>Corrección de: {d.docSlug.replace(/-/g, " ")} (va en V{String(d.version).padStart(2, "0")})</option>)}
              </select>
              {!existing && (
                <>
                  <select className="border rounded-md p-1.5 bg-white" value={docKind || (t.deliverableFormat === "3d" ? "MOD" : "PLA")} onChange={(e) => setDocKind(e.target.value)}>
                    {DOC_KINDS.filter((k) => k.code !== "BOL").map((k) => <option key={k.code} value={k.code}>{k.label}</option>)}
                  </select>
                  <Input className="w-56" placeholder="Nombre (ej. Planta sanitaria 1er piso)" value={desc} onChange={(e) => setDesc(e.target.value)} />
                </>
              )}
              <span className="text-xs text-gray-500 w-full">No te preocupes por códigos ni versiones: el sistema los asigna solo. Si es una corrección, elígela de la lista.</span>
            </div>
          )}
          {!closed && (
            <label className="mt-2 inline-flex items-center gap-2 text-sm cursor-pointer text-[#1D2530]">
              <Paperclip className="w-4 h-4" /> Subir archivo
              <input type="file" className="hidden" disabled={busy} onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
            </label>
          )}
          {t.fee && t.feeStatus !== "paid" && (
            <label className="mt-2 ml-4 inline-flex items-center gap-2 text-sm cursor-pointer text-[#C2410C]">
              <Paperclip className="w-4 h-4" /> Subir mi boleta o factura
              <input type="file" className="hidden" disabled={busy} onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f, "invoice"); e.target.value = ""; }} />
            </label>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-1">Conversación</h4>
          <div className="space-y-2 mb-2">
            {data.comments.map((c) => (
              <div key={c.id} className={`text-sm rounded-md p-2 ${c.author === "admin" ? "bg-[#F4F7FA]" : "bg-orange-50"}`}>
                <span className="font-medium">{c.author === "admin" ? "Patricio" : "Tú"}</span> <span className="text-gray-400">· {day(c.createdAt)}</span>
                <p className="whitespace-pre-wrap">{c.body}</p>
              </div>
            ))}
          </div>
          <Textarea rows={2} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Escribe una duda o un aviso..." />
          <Button size="sm" className="mt-2" disabled={busy || !comment.trim()} onClick={() => run(async () => { await send("POST", `/api/office/tasks/${id}/comments`, { body: comment }); setComment(""); }, "Comentario enviado.")}>Enviar</Button>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-1">Línea de tiempo</h4>
          <ol className="border-l-2 border-[#F97015] pl-3 space-y-1 text-sm">
            {data.events.map((ev) => (
              <li key={ev.id}><span className="text-gray-400">{day(ev.createdAt)}</span> · {ev.text}</li>
            ))}
            {t.dueDate && t.status !== "done" && <li className="font-medium">Fecha de entrega: {day(t.dueDate)}</li>}
          </ol>
        </div>
        {msg && <p className="text-sm text-gray-600">{msg}</p>}
      </CardContent>
    </Card>
  );
}

const CLOSE_MSG: Record<string, string> = { invited: "Pendiente de tu respuesta", quoted: "Cotizaste", declined: "Declinaste", awarded: "¡Ganaste!", not_selected: "No fue seleccionada" };
type RfqItem = { id: number; title: string; discipline: string; project: string | null; quoteDeadline: string | null; rfqStatus: string; inviteStatus: string; myQuote: { amount: string; deliveryDays: number } | null };
type RfqDetail = { rfq: { id: number; title: string; requirements: string; deliverableFormat: string; quoteDeadline: string | null; status: string; project: string | null }; inviteStatus: string; files: { id: number; name: string }[]; quote: { amount: string; deliveryDays: number; advancePercent: number; paymentNotes: string | null; notes: string | null } | null };

function RfqForm({ id, onDone }: { id: number; onDone: () => void }) {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["office-rfq", id], queryFn: async () => { const r = await fetch(`/api/office/rfqs/${id}`, { credentials: "include" }); if (!r.ok) throw new Error(); return r.json() as Promise<RfqDetail>; } });
  const [f, setF] = useState<{ amount: string; days: string; advance: string; pay: string; notes: string } | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  if (!data) return <p className="text-sm text-gray-500">Cargando...</p>;
  const form = f ?? { amount: data.quote ? String(Math.round(Number(data.quote.amount))) : "", days: data.quote ? String(data.quote.deliveryDays) : "", advance: data.quote ? String(data.quote.advancePercent) : "0", pay: data.quote?.paymentNotes ?? "", notes: data.quote?.notes ?? "" };
  const open = data.rfq.status === "open" && data.inviteStatus !== "declined";
  const refresh = () => { qc.invalidateQueries({ queryKey: ["office-rfq", id] }); qc.invalidateQueries({ queryKey: ["office-rfqs"] }); onDone(); };
  const submit = async () => {
    try {
      await send("PUT", `/api/office/rfqs/${id}/quote`, { amount: Number(form.amount), deliveryDays: Number(form.days), advancePercent: Number(form.advance || 0), paymentNotes: form.pay || null, notes: form.notes || null });
      setMsg("Cotización enviada. Puedes corregirla hasta que se cierre."); refresh();
    } catch (e) { setMsg(`Error: ${(e as Error).message}`); }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{data.rfq.title}</CardTitle>
        <p className="text-xs text-gray-500">{data.rfq.project ? `${data.rfq.project} · ` : ""}Entrega en {data.rfq.deliverableFormat === "3d" ? "3D / modelo" : "2D (planos)"} · responder antes de {day(data.rfq.quoteDeadline)} · <b>{CLOSE_MSG[data.inviteStatus]}</b></p>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="whitespace-pre-wrap">{data.rfq.requirements}</p>
        {data.files.length > 0 && <div>{data.files.map((fl) => <a key={fl.id} className="text-[#C2410C] underline mr-3" href={`/api/office/rfq-files/${fl.id}/download`}>{fl.name}</a>)}</div>}
        {open ? (
          <div className="rounded-md border p-3 space-y-2">
            <h4 className="font-semibold">Tu cotización</h4>
            <div className="grid grid-cols-3 gap-2">
              <Input type="number" min={1} placeholder="Monto total CLP" value={form.amount} onChange={(e) => setF({ ...form, amount: e.target.value })} />
              <Input type="number" min={1} placeholder="Plazo (días)" value={form.days} onChange={(e) => setF({ ...form, days: e.target.value })} />
              <Input type="number" min={0} max={100} placeholder="Anticipo %" value={form.advance} onChange={(e) => setF({ ...form, advance: e.target.value })} />
            </div>
            <Input placeholder="Forma de pago (ej. 50% al inicio, 50% contra entrega)" value={form.pay} onChange={(e) => setF({ ...form, pay: e.target.value })} />
            <Textarea rows={2} placeholder="Observaciones (qué incluye, qué necesitas del cliente...)" value={form.notes} onChange={(e) => setF({ ...form, notes: e.target.value })} />
            <p className="text-xs text-gray-500">El plazo corre desde la reunión de inicio. Nadie más ve tu cotización.</p>
            <div className="flex gap-2">
              <Button size="sm" disabled={!Number(form.amount) || !Number(form.days)} onClick={submit}>{data.quote ? "Actualizar cotización" : "Enviar cotización"}</Button>
              <Button size="sm" variant="outline" onClick={async () => { const reason = window.prompt("¿Por qué no puedes cotizar? (opcional)") ?? ""; try { await send("POST", `/api/office/rfqs/${id}/decline`, { reason }); refresh(); } catch (e) { setMsg(`Error: ${(e as Error).message}`); } }}>No puedo cotizar</Button>
            </div>
          </div>
        ) : data.quote && <p>Tu cotización: <b>{clp(data.quote.amount)}</b> en {data.quote.deliveryDays} días.</p>}
        {msg && <p className="text-gray-600">{msg}</p>}
      </CardContent>
    </Card>
  );
}

function RfqView() {
  const [sel, setSel] = useState<number | null>(null);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["office-rfqs"], queryFn: async () => { const r = await fetch("/api/office/rfqs", { credentials: "include" }); if (!r.ok) throw new Error(); return r.json() as Promise<RfqItem[]> } });
  if (!data) return <p className="text-sm text-gray-500">Cargando...</p>;
  return (
    <div className="grid lg:grid-cols-5 gap-4">
      <div className="lg:col-span-2 space-y-2">
        {data.length === 0 && <p className="text-sm text-gray-500">No tienes solicitudes de cotización por ahora.</p>}
        {data.map((r) => (
          <button key={r.id} onClick={() => setSel(r.id)} className={`w-full text-left rounded-md border p-3 bg-white hover:border-[#F97015] ${sel === r.id ? "border-[#F97015]" : ""}`}>
            <div className="font-medium text-sm">{r.title}</div>
            <div className="text-xs text-gray-500">{r.project ? `${r.project} · ` : ""}{CLOSE_MSG[r.inviteStatus]}{r.rfqStatus === "open" && r.inviteStatus === "invited" ? ` · responder antes de ${day(r.quoteDeadline)}` : ""}</div>
          </button>
        ))}
      </div>
      <div className="lg:col-span-3">{sel ? <RfqForm key={sel} id={sel} onDone={() => qc.invalidateQueries({ queryKey: ["office-me"] })} /> : data.length > 0 && <p className="text-sm text-gray-500">Elige una solicitud para ver los requerimientos y cotizar.</p>}</div>
    </div>
  );
}

const COMMITMENTS = [
  "Los datos de los clientes y de sus proyectos son confidenciales: los uso solo para este trabajo y no los comparto.",
  "Entrego mi trabajo por esta plataforma, en el plazo acordado, y aviso con anticipación si necesito más tiempo.",
  "Reviso lo que entrego antes de subirlo y corrijo las observaciones que me hagan.",
  "El honorario, el plazo y la forma de pago se acuerdan por escrito en cada proyecto, antes de empezar.",
  "Los planos y documentos que elaboro para un proyecto se entregan al cliente a través de ArquitectoChile.",
];

function Onboarding({ me, onDone }: { me: Me["collaborator"]; onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ phone: me.phone ?? "", linkedinUrl: me.linkedinUrl ?? "", description: me.description ?? "", canDo3d: me.canDo3d });
  const [ok, setOk] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const steps = [
    ["Tus tareas", "Patricio te asigna tareas con fecha de entrega. Las ves en \"Mis tareas\" y avanzas el estado: por hacer, en curso y en revisión."],
    ["Entregas sin enredos", "Subes tus archivos y escribes qué es. El sistema les pone el código del proyecto y controla las versiones: tú no te preocupas de eso. Si hay una corrección, la eliges de la lista y se actualiza sola."],
    ["Revisión y aprobación", "Patricio revisa y aprueba cada entrega. Si hay observaciones, te llegan por correo y subes la corrección en la misma tarea."],
    ["Fechas y avisos", "Te mandamos recordatorios antes de cada fecha de entrega, para que nada se atrase."],
    ["Cotizar y cobrar", "Cuando haya un trabajo para cotizar, te llega un correo: respondes con tu monto, plazo y forma de pago. Si ganas, confirmas, recibes el anticipo, hacemos el kickoff y arrancamos. Subes tu boleta o factura en la misma tarea."],
  ];
  const finish = async () => {
    try {
      await send("POST", "/api/office/onboarding/complete", { accepted: true, phone: f.phone || null, linkedinUrl: f.linkedinUrl || null, description: f.description || null, canDo3d: f.canDo3d });
      onDone();
    } catch (e) { setMsg(`Error: ${(e as Error).message}`); }
  };
  return (
    <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-[#1D2530]">Bienvenido/a, {me.name}</CardTitle>
          <p className="text-sm text-gray-500">Paso {Math.min(step + 1, steps.length + 2)} de {steps.length + 2}</p>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {step < steps.length && (<><h3 className="font-semibold text-base">{steps[step][0]}</h3><p>{steps[step][1]}</p></>)}
          {step === steps.length && (
            <div className="space-y-2">
              <h3 className="font-semibold text-base">Tu perfil</h3>
              <Input placeholder="Teléfono" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
              <Input placeholder="LinkedIn (opcional)" value={f.linkedinUrl} onChange={(e) => setF({ ...f, linkedinUrl: e.target.value })} />
              <Textarea rows={3} placeholder="Tu experiencia, especialidad y software que usas (AutoCAD, Revit, ArchiCAD...)" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
              <label className="flex items-center gap-2"><input type="checkbox" checked={f.canDo3d} onChange={(e) => setF({ ...f, canDo3d: e.target.checked })} /> Entrego también en 3D / modelo BIM</label>
            </div>
          )}
          {step === steps.length + 1 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-base">Compromisos de trabajo</h3>
              <ul className="list-disc pl-5 space-y-1">{COMMITMENTS.map((c) => <li key={c}>{c}</li>)}</ul>
              <label className="flex items-start gap-2 pt-2"><input type="checkbox" className="mt-1" checked={ok} onChange={(e) => setOk(e.target.checked)} /> Leí y acepto estos compromisos.</label>
            </div>
          )}
          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep(step - 1)}>Atrás</Button>
            {step <= steps.length ? <Button size="sm" onClick={() => setStep(step + 1)}>Siguiente</Button> : <Button size="sm" disabled={!ok} onClick={finish}>Entrar a la oficina</Button>}
          </div>
          {msg && <p className="text-gray-600">{msg}</p>}
        </CardContent>
      </Card>
    </div>
  );
}

function TeamBoard({ coordinator }: { coordinator: boolean }) {
  const { data } = useQuery({ queryKey: ["office-team"], queryFn: async () => { const r = await fetch("/api/office/team", { credentials: "include" }); if (!r.ok) throw new Error(); return r.json() as Promise<TeamTask[]> } });
  if (!data) return <p className="text-sm text-gray-500">Cargando...</p>;
  const groups = new Map<string, TeamTask[]>();
  data.forEach((t) => groups.set(t.project, [...(groups.get(t.project) ?? []), t]));
  if (!groups.size) return <p className="text-sm text-gray-500">Aún no hay tareas de equipo en tus proyectos.</p>;
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">{coordinator ? "Como coordinador ves todos los proyectos BIM y los tuyos." : "Las tareas de los demás en tus proyectos: así sabes de quién depende tu trabajo."}</p>
      {Array.from(groups.entries()).map(([project, rows]) => (
        <Card key={project}>
          <CardHeader className="pb-2"><CardTitle className="text-base">{project} {rows[0].bim && <Badge variant="outline">BIM</Badge>}</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {rows.map((r) => (
              <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 border-b last:border-0 pb-1">
                <div><div className="font-medium">{r.title}</div><div className="text-xs text-gray-500">{r.collaborator} · {r.specialty} · {STATUS[r.status]} · en {r.deliverableFormat === "3d" ? "3D" : "2D"}{r.revision ? ` · modif. ${r.revision}` : ""}</div></div>
                <div className="flex items-center gap-2"><span className="text-xs text-gray-500">{day(r.dueDate)}</span><Countdown due={r.dueDate} status={r.status} /></div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CredentialRow({ kind, label, hint, accept, current, onDone, setMsg }: { kind: "cv" | "title" | "photo"; label: string; hint: string; accept: string; current: string | null | boolean; onDone: () => void; setMsg: (m: string) => void }) {
  const [busy, setBusy] = useState(false);
  const pick = async (file: File | undefined) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { setMsg("El archivo supera los 10 MB."); return; }
    setBusy(true);
    try {
      const { uploadUrl, internalPath } = await send("POST", "/api/office/upload-url");
      const put = await fetch(uploadUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
      if (!put.ok) throw new Error("No se pudo subir el archivo");
      await send("POST", "/api/office/credentials", { kind, name: file.name, path: internalPath });
      setMsg(`${label} guardado.`); onDone();
    } catch (e) { setMsg(`Error: ${(e as Error).message}`); } finally { setBusy(false); }
  };
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border p-2">
      <div>
        <div className="font-medium">{label} {current ? <Badge variant="outline">Subido</Badge> : <Badge variant="outline">Pendiente</Badge>}</div>
        <div className="text-xs text-gray-500">{typeof current === "string" ? current : hint}</div>
      </div>
      <div className="flex items-center gap-2">
        {current && <a className="text-xs text-[#C2410C] underline" href={`/api/office/credentials/${kind}/download`}>Ver</a>}
        <label className="cursor-pointer text-xs rounded-md border px-2 py-1 hover:border-[#F97015]">
          {busy ? "Subiendo..." : current ? "Reemplazar" : "Subir"}
          <input type="file" accept={accept} className="hidden" disabled={busy} onChange={(e) => { pick(e.target.files?.[0]); e.target.value = ""; }} />
        </label>
      </div>
    </div>
  );
}

function ProfileForm({ me, onSaved }: { me: Me["collaborator"]; onSaved: () => void }) {
  const [f, setF] = useState({ phone: me.phone ?? "", description: me.description ?? "", linkedinUrl: me.linkedinUrl ?? "" });
  const [msg, setMsg] = useState<string | null>(null);
  const save = async () => {
    try {
      await send("PATCH", "/api/office/profile", { phone: f.phone || null, description: f.description || null, linkedinUrl: f.linkedinUrl || null });
      setMsg("Perfil guardado."); onSaved();
    } catch (e) { setMsg(`Error: ${(e as Error).message}`); }
  };
  const consent = async (v: boolean) => {
    try { await send("PATCH", "/api/office/profile", { publishConsent: v }); setMsg(v ? "Gracias: autorizó mostrar su perfil." : "Listo: su perfil dejó de ser público."); onSaved(); }
    catch (e) { setMsg(`Error: ${(e as Error).message}`); }
  };
  return (
    <div className="max-w-xl space-y-4">
      <Card>
        <CardHeader><CardTitle className="text-base">Mi perfil</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <Input placeholder="Teléfono" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
          <Input placeholder="LinkedIn (https://www.linkedin.com/in/...)" value={f.linkedinUrl} onChange={(e) => setF({ ...f, linkedinUrl: e.target.value })} />
          <Textarea rows={4} placeholder="Cuéntanos tu experiencia, especialidad y software que usas (AutoCAD, Revit, ArchiCAD...)" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
          <Button size="sm" onClick={save}>Guardar</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Mis credenciales</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="text-gray-600">Solo las ve Patricio, para validar al equipo. No pedimos cédula de identidad.</p>
          <CredentialRow kind="cv" label="Currículum (CV)" hint="PDF o Word, máx. 10 MB" accept=".pdf,.doc,.docx" current={me.cvName} onDone={onSaved} setMsg={setMsg} />
          <CredentialRow kind="title" label="Certificado de título" hint="PDF o foto (JPG/PNG), máx. 10 MB" accept=".pdf,.jpg,.jpeg,.png" current={me.titleCertName ? `${me.titleCertName}${me.titleVerified ? " · verificado por Patricio" : " · en revisión"}` : null} onDone={onSaved} setMsg={setMsg} />
          <CredentialRow kind="photo" label="Foto de perfil" hint="Puede ser la de su LinkedIn (JPG, PNG o WebP)" accept=".jpg,.jpeg,.png,.webp" current={me.hasPhoto} onDone={onSaved} setMsg={setMsg} />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 space-y-2 text-sm">
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" className="mt-1" checked={me.publishConsent} onChange={(e) => consent(e.target.checked)} />
            <span>Autorizo que ArquitectoChile muestre mi nombre, especialidad, foto y enlace de LinkedIn en la red de colaboradores y en su sitio web, para dar confianza a los clientes. Mi CV, título y datos de contacto nunca se publican. Puedo retirar esta autorización cuando quiera desmarcando esta casilla.</span>
          </label>
        </CardContent>
      </Card>
      {msg && <p className="text-sm text-gray-600">{msg}</p>}
    </div>
  );
}

export default function Oficina() {
  useSEO({ title: "Oficina digital | ArquitectoChile.com", description: "Tareas y entregas de colaboradores de ArquitectoChile.", path: "/oficina", noindex: true });
  const qc = useQueryClient();
  const [sel, setSel] = useState<number | null>(null);
  const [view, setView] = useState<"tareas" | "cotizaciones" | "equipo" | "perfil">("tareas");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["office-me"],
    queryFn: async () => { const r = await fetch("/api/office/me", { credentials: "include" }); if (!r.ok) throw new Error(String(r.status)); return r.json() as Promise<Me>; },
    retry: false,
  });
  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Cargando...</div>;
  if (isError || !data) return <Login />;
  if (!data.collaborator.onboarded) return <Onboarding me={data.collaborator} onDone={() => qc.invalidateQueries({ queryKey: ["office-me"] })} />;

  const reload = () => qc.invalidateQueries({ queryKey: ["office-me"] });
  const logout = async () => { await send("POST", "/api/office/auth/logout"); qc.clear(); window.location.href = "/oficina"; };
  const open = data.tasks.filter((t) => t.status !== "done");
  const done = data.tasks.filter((t) => t.status === "done");

  const row = (t: Task) => (
    <button key={t.id} onClick={() => setSel(t.id)} className={`w-full text-left rounded-md border p-3 bg-white hover:border-[#F97015] ${sel === t.id ? "border-[#F97015]" : ""}`}>
      <div className="font-medium text-sm">{t.title}</div>
      <div className="text-xs text-gray-500 flex flex-wrap items-center gap-1">{t.project ? `${t.project} · ` : ""}{STATUS[t.status]} · entrega {day(t.dueDate)} · {t.deliverableFormat === "3d" ? "3D" : "2D"}{t.revision ? ` · modif. ${t.revision}` : ""} <Countdown due={t.dueDate} status={t.status} /></div>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1D2530]">Hola, {data.collaborator.name}</h1>
            <p className="text-sm text-gray-500">Oficina digital · {data.collaborator.specialty}</p>
          </div>
          <Button variant="outline" size="sm" onClick={logout}><LogOut className="w-4 h-4 mr-1" /> Salir</Button>
        </div>
        {(data.fees.pending > 0 || data.fees.paid > 0) && (
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Card><CardContent className="p-3"><div className="text-gray-500">Honorarios pendientes de pago</div><div className="text-lg font-semibold">{clp(data.fees.pending)}</div></CardContent></Card>
            <Card><CardContent className="p-3"><div className="text-gray-500">Honorarios pagados</div><div className="text-lg font-semibold">{clp(data.fees.paid)}</div></CardContent></Card>
          </div>
        )}
        <div className="flex gap-2">
          {([["tareas", "Mis tareas"], ["cotizaciones", "Cotizaciones"], ["equipo", data.collaborator.isCoordinator ? "Equipo BIM" : "Equipo"], ["perfil", "Mi perfil"]] as const).map(([v, l]) => (
            <Button key={v} size="sm" variant={view === v ? "default" : "outline"} onClick={() => setView(v)}>{l}</Button>
          ))}
        </div>
        {view === "cotizaciones" && <RfqView />}
        {view === "equipo" && <TeamBoard coordinator={data.collaborator.isCoordinator} />}
        {view === "perfil" && <ProfileForm me={data.collaborator} onSaved={reload} />}
        {view === "tareas" && <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 space-y-2">
            <h2 className="font-semibold text-[#1D2530]">Mis tareas ({open.length})</h2>
            {open.length === 0 && <p className="text-sm text-gray-500">No tienes tareas abiertas.</p>}
            {open.map(row)}
            {done.length > 0 && <h2 className="font-semibold text-[#1D2530] pt-3">Cerradas ({done.length})</h2>}
            {done.map(row)}
          </div>
          <div className="lg:col-span-3">
            {sel ? <TaskPanel key={sel} id={sel} onChange={reload} /> : <p className="text-sm text-gray-500">Elige una tarea para ver el detalle, subir archivos o escribir a Patricio.</p>}
          </div>
        </div>}
      </div>
    </div>
  );
}
