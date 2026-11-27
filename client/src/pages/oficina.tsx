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

type Task = { id: number; title: string; status: string; dueDate: string | null; project: string | null; fee: string | null; feeStatus: string };
type Me = { collaborator: { name: string; email: string; specialty: string }; tasks: Task[]; fees: { pending: number; paid: number } };
type Detail = {
  task: { id: number; title: string; description: string | null; status: string; dueDate: string | null; project: string | null };
  files: { id: number; name: string; uploadedAt: string }[];
  comments: { id: number; author: string; body: string; createdAt: string }[];
};

const STATUS: Record<string, string> = { todo: "Por hacer", doing: "En curso", review: "En revisión", done: "Hecha" };
const clp = (n: number | string) => `$${Math.round(Number(n)).toLocaleString("es-CL")}`;
const day = (d: string | null) => (d ? new Date(d).toLocaleDateString("es-CL") : "sin fecha");
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
  const refresh = () => { qc.invalidateQueries({ queryKey: key }); onChange(); };
  const run = async (fn: () => Promise<unknown>, ok: string) => {
    setBusy(true);
    try { await fn(); setMsg(ok); refresh(); } catch (e) { setMsg(`Error: ${(e as Error).message}`); } finally { setBusy(false); }
  };
  if (!data) return <p className="text-sm text-gray-500">Cargando...</p>;
  const t = data.task;
  const closed = t.status === "done";

  const upload = (file: File) => run(async () => {
    const { uploadUrl, internalPath } = await send("POST", "/api/office/upload-url");
    const put = await fetch(uploadUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
    if (!put.ok) throw new Error("No se pudo subir el archivo");
    await send("POST", `/api/office/tasks/${id}/files`, { name: file.name, path: internalPath, size: file.size });
  }, "Archivo subido.");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t.title}</CardTitle>
        <p className="text-sm text-gray-500">{t.project ? `Proyecto: ${t.project} · ` : ""}Entrega: {day(t.dueDate)} · <Badge variant="outline">{STATUS[t.status]}</Badge></p>
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
        <div>
          <h4 className="font-semibold text-sm mb-1">Archivos entregados</h4>
          {data.files.length === 0 && <p className="text-sm text-gray-500">Aún no subes archivos.</p>}
          <ul className="text-sm space-y-1">
            {data.files.map((f) => (
              <li key={f.id}><a className="text-[#C2410C] underline" href={`/api/office/files/${f.id}/download`}>{f.name}</a> <span className="text-gray-400">· {day(f.uploadedAt)}</span></li>
            ))}
          </ul>
          {!closed && (
            <label className="mt-2 inline-flex items-center gap-2 text-sm cursor-pointer text-[#1D2530]">
              <Paperclip className="w-4 h-4" /> Subir archivo
              <input type="file" className="hidden" disabled={busy} onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
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
        {msg && <p className="text-sm text-gray-600">{msg}</p>}
      </CardContent>
    </Card>
  );
}

export default function Oficina() {
  useSEO({ title: "Oficina digital | ArquitectoChile.com", description: "Tareas y entregas de colaboradores de ArquitectoChile.", path: "/oficina", noindex: true });
  const qc = useQueryClient();
  const [sel, setSel] = useState<number | null>(null);
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
      <div className="text-xs text-gray-500">{t.project ? `${t.project} · ` : ""}{STATUS[t.status]} · entrega {day(t.dueDate)}</div>
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
        <div className="grid lg:grid-cols-5 gap-4">
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
        </div>
      </div>
    </div>
  );
}
