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
type Me = { collaborator: { name: string; email: string; specialty: string; isCoordinator: boolean; phone: string | null; description: string | null; linkedinUrl: string | null }; tasks: Task[]; fees: { pending: number; paid: number } };
type Detail = {
  task: { id: number; title: string; description: string | null; status: string; dueDate: string | null; project: string | null; bim: boolean; discipline: string | null; deliverableFormat: string; revision: number; fee: string | null; feeStatus: string };
  files: { id: number; name: string; stdName: string | null; version: number; kind: string; uploadedAt: string }[];
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
    await send("POST", `/api/office/tasks/${id}/files`, { name: file.name, path: internalPath, size: file.size, kind, ...(kind === "deliverable" && t.project && t.discipline ? { docKind: docKind || (t.deliverableFormat === "3d" ? "MOD" : "PLA"), description: desc || undefined } : {}) });
  }, kind === "invoice" ? "Boleta subida. Patricio ya fue avisado." : "Archivo subido.");

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
              <li key={f.id}><a className="text-[#C2410C] underline" href={`/api/office/files/${f.id}/download`}>{f.stdName ?? f.name}</a> <span className="text-gray-400">· {f.kind === "invoice" ? "boleta/factura" : "entregable"} · {day(f.uploadedAt)}</span></li>
            ))}
          </ul>
          {!closed && t.project && t.discipline && (
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <select className="border rounded-md p-1.5 bg-white" value={docKind || (t.deliverableFormat === "3d" ? "MOD" : "PLA")} onChange={(e) => setDocKind(e.target.value)}>
                {DOC_KINDS.filter((k) => k.code !== "BOL").map((k) => <option key={k.code} value={k.code}>{k.code} · {k.label}</option>)}
              </select>
              <Input className="w-56" placeholder="Descripción (ej. Planta 1er piso)" value={desc} onChange={(e) => setDesc(e.target.value)} />
              <span className="text-xs text-gray-500">El archivo se nombrará solo con el código del proyecto y la versión.</span>
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

function ProfileForm({ me, onSaved }: { me: Me["collaborator"]; onSaved: () => void }) {
  const [f, setF] = useState({ phone: me.phone ?? "", description: me.description ?? "", linkedinUrl: me.linkedinUrl ?? "" });
  const [msg, setMsg] = useState<string | null>(null);
  const save = async () => {
    try {
      await send("PATCH", "/api/office/profile", { phone: f.phone || null, description: f.description || null, linkedinUrl: f.linkedinUrl || null });
      setMsg("Perfil guardado."); onSaved();
    } catch (e) { setMsg(`Error: ${(e as Error).message}`); }
  };
  return (
    <Card className="max-w-xl">
      <CardHeader><CardTitle className="text-base">Mi perfil</CardTitle></CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p className="text-gray-600">Este perfil es de uso interno del equipo. Si Patricio te incorpora al staff de la web, solo se publicará con tu autorización.</p>
        <Input placeholder="Teléfono" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
        <Input placeholder="LinkedIn (https://www.linkedin.com/in/...)" value={f.linkedinUrl} onChange={(e) => setF({ ...f, linkedinUrl: e.target.value })} />
        <Textarea rows={4} placeholder="Cuéntanos tu experiencia, especialidad y software que usas (AutoCAD, Revit, ArchiCAD...)" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
        <Button size="sm" onClick={save}>Guardar</Button>
        {msg && <p className="text-gray-600">{msg}</p>}
      </CardContent>
    </Card>
  );
}

export default function Oficina() {
  useSEO({ title: "Oficina digital | ArquitectoChile.com", description: "Tareas y entregas de colaboradores de ArquitectoChile.", path: "/oficina", noindex: true });
  const qc = useQueryClient();
  const [sel, setSel] = useState<number | null>(null);
  const [view, setView] = useState<"tareas" | "equipo" | "perfil">("tareas");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["office-me"],
    queryFn: async () => { const r = await fetch("/api/office/me", { credentials: "include" }); if (!r.ok) throw new Error(String(r.status)); return r.json() as Promise<Me>; },
    retry: false,
  });
  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Cargando...</div>;
  if (isError || !data) return <Login />;

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
          {([["tareas", "Mis tareas"], ["equipo", data.collaborator.isCoordinator ? "Equipo BIM" : "Equipo"], ["perfil", "Mi perfil"]] as const).map(([v, l]) => (
            <Button key={v} size="sm" variant={view === v ? "default" : "outline"} onClick={() => setView(v)}>{l}</Button>
          ))}
        </div>
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
