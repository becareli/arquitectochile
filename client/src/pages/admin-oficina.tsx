import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";

type Collab = { id: number; name: string; email: string; phone: string | null; specialty: string; active: boolean; open: number; review: number; feePending: string };
type Task = { id: number; title: string; status: string; dueDate: string | null; collaborator: string; project: string | null; fee: string | null; feeStatus: string; collaboratorId: number };
type TaskFull = {
  task: Task & { description: string | null };
  files: { id: number; name: string; uploadedAt: string; publishedDocumentId: number | null }[];
  comments: { id: number; author: string; body: string; createdAt: string }[];
};
type ClientLite = { id: number; name: string };
type ProjectLite = { id: number; name: string };

const STATUS: Record<string, string> = { todo: "Por hacer", doing: "En curso", review: "En revisión", done: "Hecha" };
const DOC_TYPES: [string, string][] = [["plans", "Planos"], ["renders", "Renders"], ["specifications", "Especificaciones"], ["observations", "Acta de observaciones"], ["permits", "Permisos"], ["photos", "Fotos"], ["other", "Otros"]];
const clp = (n: number | string) => `$${Math.round(Number(n)).toLocaleString("es-CL")}`;
const day = (d: string | null) => (d ? new Date(d).toLocaleDateString("es-CL") : "sin fecha");
const sel = "border rounded-md p-2 text-sm bg-white";
const get = async <T,>(url: string): Promise<T> => { const r = await fetch(url, { credentials: "include" }); if (!r.ok) throw new Error(String(r.status)); return r.json(); };
const send = async (method: string, url: string, body?: unknown) => (await apiRequest(method, url, body)).json();

function TaskDetail({ id, onChange }: { id: number; onChange: () => void }) {
  const qc = useQueryClient();
  const key = ["admin-office-task", id];
  const { data } = useQuery({ queryKey: key, queryFn: () => get<TaskFull>(`/api/office/admin/tasks/${id}`) });
  const [comment, setComment] = useState("");
  const [pub, setPub] = useState<Record<number, string>>({});
  const [msg, setMsg] = useState<string | null>(null);
  const run = async (fn: () => Promise<unknown>, ok: string) => {
    try { await fn(); setMsg(ok); qc.invalidateQueries({ queryKey: key }); onChange(); } catch (e) { setMsg(`Error: ${(e as Error).message}`); }
  };
  if (!data) return <p className="text-sm text-gray-500">Cargando...</p>;
  const t = data.task;
  const patch = (body: object, ok: string) => run(() => send("PATCH", `/api/office/admin/tasks/${id}`, body), ok);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t.title}</CardTitle>
        <p className="text-sm text-gray-500">{t.project ? `${t.project} · ` : "Interna · "}{t.collaborator} · entrega {day(t.dueDate)} · <Badge variant="outline">{STATUS[t.status]}</Badge></p>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {t.description && <p className="whitespace-pre-wrap">{t.description}</p>}
        <div className="flex flex-wrap gap-2">
          {(["todo", "doing", "review", "done"] as const).map((s) => (
            <Button key={s} size="sm" variant={t.status === s ? "default" : "outline"} disabled={t.status === s} onClick={() => patch({ status: s }, "Estado actualizado.")}>{s === "done" ? "Dar por cerrada" : STATUS[s]}</Button>
          ))}
        </div>
        {t.fee && (
          <div className="flex items-center gap-2">
            <span>Honorario {clp(t.fee)}: <b>{t.feeStatus === "paid" ? "pagado" : "pendiente"}</b></span>
            <Button size="sm" variant="outline" onClick={() => patch({ feeStatus: t.feeStatus === "paid" ? "pending" : "paid" }, "Honorario actualizado.")}>{t.feeStatus === "paid" ? "Marcar pendiente" : "Marcar pagado"}</Button>
          </div>
        )}
        <div>
          <h4 className="font-semibold mb-1">Entregables</h4>
          {data.files.length === 0 && <p className="text-gray-500">Sin archivos.</p>}
          {data.files.map((f) => (
            <div key={f.id} className="flex flex-wrap items-center gap-2 py-1">
              <a className="text-[#C2410C] underline" href={`/api/office/admin/files/${f.id}/download`}>{f.name}</a>
              <span className="text-gray-400">{day(f.uploadedAt)}</span>
              {f.publishedDocumentId ? (
                <Badge>Publicado al cliente</Badge>
              ) : t.project ? (
                <>
                  <select className={sel} value={pub[f.id] ?? "plans"} onChange={(e) => setPub({ ...pub, [f.id]: e.target.value })}>
                    {DOC_TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                  <Button size="sm" variant="outline" onClick={() => run(() => send("POST", `/api/office/admin/files/${f.id}/publish`, { type: pub[f.id] ?? "plans" }), "Publicado en el portal del cliente.")}>Publicar al cliente</Button>
                </>
              ) : null}
            </div>
          ))}
          <p className="text-xs text-gray-500 mt-1">Publicar deja el archivo visible en el portal del cliente, sin enviarle correo.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Conversación</h4>
          {data.comments.map((c) => (
            <div key={c.id} className={`rounded-md p-2 mb-1 ${c.author === "admin" ? "bg-[#F4F7FA]" : "bg-orange-50"}`}>
              <b>{c.author === "admin" ? "Tú" : t.collaborator}</b> <span className="text-gray-400">· {day(c.createdAt)}</span>
              <p className="whitespace-pre-wrap">{c.body}</p>
            </div>
          ))}
          <Textarea rows={2} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Responder (le llega por correo)..." />
          <Button size="sm" className="mt-2" disabled={!comment.trim()} onClick={() => run(async () => { await send("POST", `/api/office/admin/tasks/${id}/comments`, { body: comment }); setComment(""); }, "Comentario enviado.")}>Enviar</Button>
        </div>
        {msg && <p className="text-gray-600">{msg}</p>}
      </CardContent>
    </Card>
  );
}

export default function OfficeTab() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState("");
  const [selTask, setSelTask] = useState<number | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [c, setC] = useState({ name: "", email: "", specialty: "", phone: "" });
  const [t, setT] = useState({ collaboratorId: "", clientId: "", projectId: "", title: "", description: "", dueDate: "", fee: "" });

  const collabs = useQuery({ queryKey: ["office-collabs"], queryFn: () => get<Collab[]>("/api/office/admin/collaborators") });
  const tasks = useQuery({ queryKey: ["office-tasks", filter], queryFn: () => get<Task[]>(`/api/office/admin/tasks${filter ? `?status=${filter}` : ""}`) });
  const clients = useQuery({ queryKey: ["admin-clients"], queryFn: () => get<ClientLite[]>("/api/portal/admin/clients") });
  const projects = useQuery({ queryKey: ["admin-client-projects", t.clientId], queryFn: () => get<ProjectLite[]>(`/api/portal/admin/clients/${t.clientId}/projects`), enabled: Boolean(t.clientId) });

  const reload = () => { qc.invalidateQueries({ queryKey: ["office-collabs"] }); qc.invalidateQueries({ queryKey: ["office-tasks"] }); };
  const run = async (fn: () => Promise<unknown>, ok: string) => { try { await fn(); setMsg(ok); reload(); } catch (e) { setMsg(`Error: ${(e as Error).message}`); } };

  return (
    <div className="space-y-6">
      {msg && <p className="text-sm text-gray-600">{msg}</p>}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Colaboradores</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            {(collabs.data ?? []).map((k) => (
              <div key={k.id} className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
                <div>
                  <div className="font-medium">{k.name} {!k.active && <Badge variant="outline">Inactivo</Badge>}</div>
                  <div className="text-xs text-gray-500">{k.specialty} · {k.email} · {k.open} abiertas{k.review ? ` (${k.review} en revisión)` : ""}{Number(k.feePending) > 0 ? ` · por pagar ${clp(k.feePending)}` : ""}</div>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => run(async () => { const r = await send("POST", `/api/office/admin/collaborators/${k.id}/invite`); if (!r.emailed) throw new Error("correo no configurado (SMTP)"); }, `Enlace enviado a ${k.email}.`)}>Enviar acceso</Button>
                  <Button size="sm" variant="ghost" onClick={() => run(() => send("PATCH", `/api/office/admin/collaborators/${k.id}`, { active: !k.active }), k.active ? "Desactivado." : "Activado.")}>{k.active ? "Desactivar" : "Activar"}</Button>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Input placeholder="Nombre" value={c.name} onChange={(e) => setC({ ...c, name: e.target.value })} />
              <Input placeholder="Especialidad (dibujante, ingeniero...)" value={c.specialty} onChange={(e) => setC({ ...c, specialty: e.target.value })} />
              <Input type="email" placeholder="Correo" value={c.email} onChange={(e) => setC({ ...c, email: e.target.value })} />
              <Input placeholder="Teléfono (opcional)" value={c.phone} onChange={(e) => setC({ ...c, phone: e.target.value })} />
            </div>
            <Button size="sm" disabled={!c.name || !c.email || !c.specialty} onClick={() => run(async () => { await send("POST", "/api/office/admin/collaborators", { name: c.name, email: c.email, specialty: c.specialty, phone: c.phone || null }); setC({ name: "", email: "", specialty: "", phone: "" }); }, "Colaborador agregado.")}>Agregar colaborador</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Nueva tarea</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <select className={`${sel} w-full`} value={t.collaboratorId} onChange={(e) => setT({ ...t, collaboratorId: e.target.value })}>
              <option value="">Asignar a...</option>
              {(collabs.data ?? []).filter((k) => k.active).map((k) => <option key={k.id} value={k.id}>{k.name} · {k.specialty}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <select className={sel} value={t.clientId} onChange={(e) => setT({ ...t, clientId: e.target.value, projectId: "" })}>
                <option value="">Tarea interna (sin cliente)</option>
                {(clients.data ?? []).map((k) => <option key={k.id} value={k.id}>{k.name}</option>)}
              </select>
              <select className={sel} value={t.projectId} disabled={!t.clientId} onChange={(e) => setT({ ...t, projectId: e.target.value })}>
                <option value="">Proyecto...</option>
                {(projects.data ?? []).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <Input placeholder="Título (ej. Planta de arquitectura 1:50)" value={t.title} onChange={(e) => setT({ ...t, title: e.target.value })} />
            <Textarea rows={3} placeholder="Qué necesitas, formato de entrega, referencias..." value={t.description} onChange={(e) => setT({ ...t, description: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <Input type="date" value={t.dueDate} onChange={(e) => setT({ ...t, dueDate: e.target.value })} />
              <Input type="number" placeholder="Honorario CLP (opcional)" value={t.fee} onChange={(e) => setT({ ...t, fee: e.target.value })} />
            </div>
            <p className="text-xs text-gray-500">El colaborador solo verá el nombre del proyecto, nunca los datos del cliente.</p>
            <Button size="sm" disabled={!t.collaboratorId || !t.title || (Boolean(t.clientId) && !t.projectId)} onClick={() => run(async () => {
              await send("POST", "/api/office/admin/tasks", { collaboratorId: Number(t.collaboratorId), projectId: t.projectId ? Number(t.projectId) : null, title: t.title, description: t.description || null, dueDate: t.dueDate || null, fee: t.fee ? Number(t.fee) : null });
              setT({ ...t, title: "", description: "", dueDate: "", fee: "" });
            }, "Tarea creada y avisada por correo.")}>Crear y avisar</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 space-y-2">
          <div className="flex flex-wrap gap-1">
            {[["", "Todas"], ["review", "En revisión"], ["doing", "En curso"], ["todo", "Por hacer"], ["done", "Hechas"]].map(([v, l]) => (
              <Button key={v} size="sm" variant={filter === v ? "default" : "outline"} onClick={() => setFilter(v)}>{l}</Button>
            ))}
          </div>
          {(tasks.data ?? []).map((k) => (
            <button key={k.id} onClick={() => setSelTask(k.id)} className={`w-full text-left rounded-md border p-3 bg-white hover:border-[#F97015] ${selTask === k.id ? "border-[#F97015]" : ""}`}>
              <div className="font-medium text-sm">{k.title}</div>
              <div className="text-xs text-gray-500">{k.collaborator} · {k.project ?? "interna"} · {STATUS[k.status]} · entrega {day(k.dueDate)}</div>
            </button>
          ))}
          {tasks.data?.length === 0 && <p className="text-sm text-gray-500">No hay tareas en esta vista.</p>}
        </div>
        <div className="lg:col-span-3">
          {selTask ? <TaskDetail key={selTask} id={selTask} onChange={reload} /> : <p className="text-sm text-gray-500">Elige una tarea para revisar entregables, comentar, cerrarla o marcar el honorario como pagado.</p>}
        </div>
      </div>
    </div>
  );
}
