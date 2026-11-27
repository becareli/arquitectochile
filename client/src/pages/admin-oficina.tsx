import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { DISCIPLINES, guessDiscipline } from "@shared/classification";
import Cotizaciones from "@/pages/admin-cotizaciones";

type Collab = { id: number; name: string; email: string; phone: string | null; specialty: string; active: boolean; onboarded: boolean; discipline: string | null; canDo3d: boolean; isCoordinator: boolean; showOnWebsite: boolean; linkedinUrl: string | null; open: number; review: number; feePending: string };
type Task = { id: number; title: string; status: string; dueDate: string | null; collaborator: string; project: string | null; fee: string | null; feeStatus: string; collaboratorId: number; deliverableFormat: string; revision: number; kickoffRequired?: boolean; acceptedAt?: string | null; advancePercent?: number; advancePaidAt?: string | null; kickoffAt?: string | null; kickoffLink?: string | null; kickoffDoneAt?: string | null };
type TaskFull = {
  task: Task & { description: string | null };
  files: { id: number; name: string; stdName: string | null; version: number; kind: string; uploadedAt: string; publishedDocumentId: number | null; reviewedBy: string | null; approvedBy: string | null; returnedNote: string | null }[];
  comments: { id: number; author: string; body: string; createdAt: string }[];
  events: { id: number; type: string; text: string; createdAt: string }[];
};
type ClientLite = { id: number; name: string };
type ProjectLite = { id: number; name: string; bimRequired?: boolean };

const STATUS: Record<string, string> = { todo: "Por hacer", doing: "En curso", review: "En revisión", done: "Hecha" };
const DOC_TYPES: [string, string][] = [["plans", "Planos"], ["renders", "Renders"], ["specifications", "Especificaciones"], ["observations", "Acta de observaciones"], ["permits", "Permisos"], ["photos", "Fotos"], ["other", "Otros"]];
const clp = (n: number | string) => `$${Math.round(Number(n)).toLocaleString("es-CL")}`;
const day = (d: string | null) => (d ? new Date(d).toLocaleDateString("es-CL") : "sin fecha");
const FEE: Record<string, string> = { pending: "pendiente", invoiced: "boleta recibida, por pagar", paid: "pagado" };
const sel = "border rounded-md p-2 text-sm bg-white";
const get = async <T,>(url: string): Promise<T> => { const r = await fetch(url, { credentials: "include" }); if (!r.ok) throw new Error(String(r.status)); return r.json(); };
const send = async (method: string, url: string, body?: unknown) => (await apiRequest(method, url, body)).json();

function TaskDetail({ id, onChange }: { id: number; onChange: () => void }) {
  const qc = useQueryClient();
  const key = ["admin-office-task", id];
  const { data } = useQuery({ queryKey: key, queryFn: () => get<TaskFull>(`/api/office/admin/tasks/${id}`) });
  const [comment, setComment] = useState("");
  const [pub, setPub] = useState<Record<number, string>>({});
  const [rev, setRev] = useState({ note: "", dueDate: "" });
  const [ret, setRet] = useState<Record<number, string>>({});
  const [ko, setKo] = useState({ at: "", link: "" });
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
        <p className="text-sm text-gray-500">{t.project ? `${t.project} · ` : "Interna · "}{t.collaborator} · entrega {day(t.dueDate)} · en {t.deliverableFormat === "3d" ? "3D" : "2D"} · <Badge variant="outline">{STATUS[t.status]}</Badge></p>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {t.description && <p className="whitespace-pre-wrap">{t.description}</p>}
        <div className="flex flex-wrap gap-2">
          {(["todo", "doing", "review", "done"] as const).map((s) => (
            <Button key={s} size="sm" variant={t.status === s ? "default" : "outline"} disabled={t.status === s} onClick={() => patch({ status: s }, "Estado actualizado.")}>{s === "done" ? "Dar por cerrada" : STATUS[s]}</Button>
          ))}
        </div>
        {t.kickoffRequired && (
          <div className="rounded-md border p-2 space-y-2">
            <h4 className="font-semibold">Arranque del proyecto (kickoff)</h4>
            <ul className="space-y-1">
              <li>{t.acceptedAt ? "✔" : "○"} El colaborador acepta monto, plazo y forma de pago {t.acceptedAt ? `(${day(t.acceptedAt)})` : "(pendiente)"}</li>
              <li>{(t.advancePercent ?? 0) === 0 ? "✔ Sin anticipo" : t.advancePaidAt ? `✔ Anticipo pagado (${day(t.advancePaidAt)})` : `○ Falta pagar el anticipo (${t.advancePercent}%${t.fee ? `: ${clp((Number(t.fee) * (t.advancePercent ?? 0)) / 100)}` : ""})`}
                {(t.advancePercent ?? 0) > 0 && !t.advancePaidAt && <Button size="sm" variant="outline" className="ml-2" onClick={() => run(() => send("POST", `/api/office/admin/tasks/${id}/advance-paid`), "Anticipo registrado.")}>Marcar anticipo pagado</Button>}</li>
              <li>{t.kickoffAt ? `✔ Reunión de inicio: ${new Date(t.kickoffAt).toLocaleString("es-CL", { dateStyle: "medium", timeStyle: "short" })}` : "○ Reunión de inicio sin agendar"}</li>
              <li>{t.kickoffDoneAt ? `✔ Kickoff realizado (${day(t.kickoffDoneAt)}): el plazo está corriendo` : "○ Kickoff por realizar: al marcarlo, el plazo empieza a correr"}</li>
            </ul>
            {!t.kickoffDoneAt && (
              <div className="flex flex-wrap items-center gap-2">
                <Input type="datetime-local" className="w-56" value={ko.at} onChange={(e) => setKo({ ...ko, at: e.target.value })} />
                <Input className="w-56" placeholder="Enlace Meet/Zoom (opcional)" value={ko.link} onChange={(e) => setKo({ ...ko, link: e.target.value })} />
                <Button size="sm" variant="outline" disabled={!ko.at} onClick={() => run(() => send("POST", `/api/office/admin/tasks/${id}/kickoff`, { kickoffAt: new Date(ko.at).toISOString(), kickoffLink: ko.link || null }), "Kickoff agendado y avisado.")}>Agendar y avisar</Button>
                <Button size="sm" onClick={() => run(() => send("POST", `/api/office/admin/tasks/${id}/kickoff-done`), "Kickoff realizado: el proyecto arrancó.")}>Kickoff realizado</Button>
              </div>
            )}
          </div>
        )}
        {t.fee && (
          <div className="flex items-center gap-2">
            <span>Honorario pactado {clp(t.fee)}: <b>{FEE[t.feeStatus]}</b></span>
            {t.feeStatus !== "paid" && <Button size="sm" variant="outline" onClick={() => patch({ feeStatus: "paid" }, "Honorario pagado.")}>Marcar pagado</Button>}
            {t.feeStatus === "paid" && <Button size="sm" variant="ghost" onClick={() => patch({ feeStatus: "pending" }, "Honorario pendiente.")}>Deshacer</Button>}
          </div>
        )}
        <div>
          <h4 className="font-semibold mb-1">Archivos</h4>
          {data.files.length === 0 && <p className="text-gray-500">Sin archivos.</p>}
          {data.files.map((f) => (
            <div key={f.id} className="flex flex-wrap items-center gap-2 py-1">
              <a className="text-[#C2410C] underline break-all" href={`/api/office/admin/files/${f.id}/download`}>{f.stdName ?? f.name}</a>
              <span className="text-gray-400">{f.kind === "invoice" ? "boleta/factura" : "entregable"} · {day(f.uploadedAt)}</span>
              {f.kind !== "invoice" && (
                <span className="text-xs text-gray-600">
                  {f.approvedBy ? `Aprobó: ${f.approvedBy}` : f.reviewedBy ? `Revisó: ${f.reviewedBy}` : f.returnedNote ? "Devuelto" : "Sin revisar"}
                </span>
              )}
              {f.kind !== "invoice" && !f.publishedDocumentId && !f.approvedBy && (
                <div className="w-full flex flex-wrap items-center gap-2 pl-2">
                  {!f.reviewedBy && <Button size="sm" variant="outline" onClick={() => run(() => send("POST", `/api/office/admin/files/${f.id}/review`), "Marcado como revisado.")}>Revisé</Button>}
                  <Button size="sm" onClick={() => run(() => send("POST", `/api/office/admin/files/${f.id}/approve`), "Aprobado.")}>Aprobar</Button>
                  <Input className="w-64 h-8" placeholder="Observación para devolver..." value={ret[f.id] ?? ""} onChange={(e) => setRet({ ...ret, [f.id]: e.target.value })} />
                  <Button size="sm" variant="outline" disabled={(ret[f.id] ?? "").trim().length < 3} onClick={() => run(() => send("POST", `/api/office/admin/files/${f.id}/return`, { note: ret[f.id] }), "Devuelto al colaborador.")}>Devolver</Button>
                </div>
              )}
              {f.kind === "invoice" ? null : f.publishedDocumentId ? (
                <Badge>Publicado al cliente</Badge>
              ) : t.project && f.approvedBy ? (
                <>
                  <select className={sel} value={pub[f.id] ?? "plans"} onChange={(e) => setPub({ ...pub, [f.id]: e.target.value })}>
                    {DOC_TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                  <Button size="sm" variant="outline" onClick={() => run(() => send("POST", `/api/office/admin/files/${f.id}/publish`, { type: pub[f.id] ?? "plans" }), "Publicado en el portal del cliente.")}>Publicar al cliente</Button>
                </>
              ) : null}
            </div>
          ))}
          <p className="text-xs text-gray-500 mt-1">Solo se publica lo aprobado. Publicar deja el archivo visible en el portal del cliente, sin enviarle correo. Todo queda en la bitácora del proyecto.</p>
        </div>
        <div className="rounded-md border p-2 space-y-2">
          <h4 className="font-semibold">Pedir una modificación {t.revision > 0 && <span className="font-normal text-gray-500">(van {t.revision})</span>}</h4>
          <p className="text-xs text-gray-500">Para cambios del propietario, de la obra o de otra disciplina. Reabre la tarea, la deja "En curso" y le avisa por correo.</p>
          <Textarea rows={2} value={rev.note} onChange={(e) => setRev({ ...rev, note: e.target.value })} placeholder="Qué cambia y por qué..." />
          <div className="flex items-center gap-2">
            <Input type="date" className="w-44" value={rev.dueDate} onChange={(e) => setRev({ ...rev, dueDate: e.target.value })} />
            <span className="text-xs text-gray-500">nueva fecha (opcional)</span>
            <Button size="sm" disabled={rev.note.trim().length < 3} onClick={() => run(async () => { await send("POST", `/api/office/admin/tasks/${id}/revision`, { note: rev.note, dueDate: rev.dueDate || null }); setRev({ note: "", dueDate: "" }); }, "Modificación solicitada y avisada.")}>Solicitar</Button>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Línea de tiempo</h4>
          <ol className="border-l-2 border-[#F97015] pl-3 space-y-1">
            {data.events.map((ev) => <li key={ev.id}><span className="text-gray-400">{day(ev.createdAt)}</span> · {ev.text}</li>)}
          </ol>
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

type Impact = { bim: boolean; suggestions: { discipline: string; reason: string; missing: boolean; tasks: { id: number; title: string; status: string; revision: number; collaborator: string }[] }[] };

// Asistente: el cambio pedido -> disciplinas y tareas que probablemente se afectan -> avisa solo a las marcadas
function ChangeAssistant({ clients, onDone }: { clients: ClientLite[]; onDone: () => void }) {
  const [clientId, setClientId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [note, setNote] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [impact, setImpact] = useState<Impact | null>(null);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [msg, setMsg] = useState<string | null>(null);
  const projects = useQuery({ queryKey: ["admin-client-projects", clientId], queryFn: () => get<ProjectLite[]>(`/api/portal/admin/clients/${clientId}/projects`), enabled: Boolean(clientId) });

  const analyze = async () => {
    try {
      const r: Impact = await send("POST", `/api/office/admin/projects/${projectId}/impact`, { note });
      setImpact(r);
      setChecked(new Set(r.suggestions.flatMap((s) => s.tasks.map((t) => t.id))));
      setMsg(null);
    } catch (e) { setMsg(`Error: ${(e as Error).message}`); }
  };
  const apply = async () => {
    try {
      for (const id of Array.from(checked)) await send("POST", `/api/office/admin/tasks/${id}/revision`, { note, dueDate: dueDate || null });
      setMsg(`Modificación solicitada en ${checked.size} tarea(s) y avisada por correo.`);
      setImpact(null); setNote("");
      onDone();
    } catch (e) { setMsg(`Error: ${(e as Error).message}`); }
  };
  const toggle = (id: number) => { const n = new Set(checked); n.has(id) ? n.delete(id) : n.add(id); setChecked(n); };

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Modificación de un proyecto: ¿a quién afecta?</CardTitle></CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <select className={sel} value={clientId} onChange={(e) => { setClientId(e.target.value); setProjectId(""); setImpact(null); }}>
            <option value="">Cliente...</option>
            {clients.map((k) => <option key={k.id} value={k.id}>{k.name}</option>)}
          </select>
          <select className={sel} value={projectId} disabled={!clientId} onChange={(e) => { setProjectId(e.target.value); setImpact(null); }}>
            <option value="">Proyecto...</option>
            {(projects.data ?? []).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <Textarea rows={2} value={note} onChange={(e) => { setNote(e.target.value); setImpact(null); }} placeholder="Ej.: el propietario quiere mover el baño a la otra muralla y agregar una cocina en la ampliación" />
        <Button size="sm" disabled={!projectId || note.trim().length < 3} onClick={analyze}>Ver qué se afecta</Button>
        {impact && (
          <div className="space-y-2 pt-2">
            <p className="text-xs text-gray-500">Es una sugerencia por palabras clave: marca o desmarca según tu criterio. Revisa que no falte ninguna disciplina.</p>
            {impact.suggestions.map((s) => (
              <div key={s.discipline} className="rounded-md border p-2">
                <div className="font-medium">{s.discipline} <span className="font-normal text-xs text-gray-500">· {s.reason}</span></div>
                {s.missing && <p className="text-xs text-orange-700">No hay una tarea de esta disciplina en el proyecto: puede que falte asignarla.</p>}
                {s.tasks.map((t) => (
                  <label key={t.id} className="flex items-center gap-2 py-0.5">
                    <input type="checkbox" checked={checked.has(t.id)} onChange={() => toggle(t.id)} />
                    <span>{t.title} · {t.collaborator} · {STATUS[t.status]}{t.revision ? ` · modif. ${t.revision}` : ""}</span>
                  </label>
                ))}
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input type="date" className="w-44" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              <span className="text-xs text-gray-500">nueva fecha (opcional)</span>
              <Button size="sm" disabled={checked.size === 0} onClick={apply}>Solicitar a las {checked.size} marcadas</Button>
            </div>
          </div>
        )}
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
  const [t, setT] = useState({ collaboratorId: "", clientId: "", projectId: "", title: "", description: "", dueDate: "", fee: "", format: "2d", discipline: "" });

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
                  <div className="text-xs text-gray-500">{!k.onboarded && "Sin bienvenida · "}{k.specialty}{k.isCoordinator ? " · Coordinador BIM" : ""}{k.canDo3d ? " · hace 3D" : " · entrega 2D"}{k.showOnWebsite ? " · en la web" : ""} · {k.email} · {k.open} abiertas{k.review ? ` (${k.review} en revisión)` : ""}{Number(k.feePending) > 0 ? ` · por pagar ${clp(k.feePending)}` : ""}</div>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => run(async () => { const r = await send("POST", `/api/office/admin/collaborators/${k.id}/invite`); if (!r.emailed) throw new Error("correo no configurado (SMTP)"); }, `Enlace enviado a ${k.email}.`)}>Enviar acceso</Button>
                  <Button size="sm" variant="ghost" onClick={() => run(() => send("PATCH", `/api/office/admin/collaborators/${k.id}`, { canDo3d: !k.canDo3d }), "Actualizado.")}>{k.canDo3d ? "Quitar 3D" : "Hace 3D"}</Button>
                  <Button size="sm" variant="ghost" onClick={() => run(() => send("PATCH", `/api/office/admin/collaborators/${k.id}`, { isCoordinator: !k.isCoordinator }), "Actualizado.")}>{k.isCoordinator ? "Quitar coord." : "Coord. BIM"}</Button>
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
            <select className={`${sel} w-full`} value={t.collaboratorId} onChange={(e) => {
              const k = (collabs.data ?? []).find((x) => String(x.id) === e.target.value);
              setT({ ...t, collaboratorId: e.target.value, discipline: guessDiscipline(k?.discipline ?? k?.specialty) ?? t.discipline });
            }}>
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
            <div className="flex flex-wrap items-center gap-3">
              <select className={sel} value={t.discipline} onChange={(e) => setT({ ...t, discipline: e.target.value })}>
                <option value="">Disciplina (nombra sus archivos)</option>
                {DISCIPLINES.map((d) => <option key={d.code} value={d.code}>{d.code} · {d.label}</option>)}
              </select>
              <select className={sel} value={t.format} onChange={(e) => setT({ ...t, format: e.target.value })}>
                <option value="2d">Entrega en 2D (planos)</option>
                <option value="3d">Entrega en 3D / modelo</option>
              </select>
              {t.projectId && (() => {
                const pr = (projects.data ?? []).find((p) => String(p.id) === t.projectId);
                return pr ? (
                  <label className="flex items-center gap-1 text-xs">
                    <input type="checkbox" checked={Boolean(pr.bimRequired)} onChange={(e) => run(async () => { await send("PATCH", `/api/office/admin/projects/${pr.id}/bim`, { bimRequired: e.target.checked }); qc.invalidateQueries({ queryKey: ["admin-client-projects", t.clientId] }); }, "Proyecto actualizado.")} /> Proyecto BIM
                  </label>
                ) : null;
              })()}
            </div>
            <p className="text-xs text-gray-500">El colaborador solo verá el nombre del proyecto, nunca los datos del cliente.</p>
            <Button size="sm" disabled={!t.collaboratorId || !t.title || (Boolean(t.clientId) && !t.projectId)} onClick={() => run(async () => {
              await send("POST", "/api/office/admin/tasks", { collaboratorId: Number(t.collaboratorId), projectId: t.projectId ? Number(t.projectId) : null, title: t.title, description: t.description || null, dueDate: t.dueDate || null, fee: t.fee ? Number(t.fee) : null, deliverableFormat: t.format, discipline: t.discipline || null });
              setT({ ...t, title: "", description: "", dueDate: "", fee: "" });
            }, "Tarea creada y avisada por correo.")}>Crear y avisar</Button>
          </CardContent>
        </Card>
      </div>

      <Cotizaciones collabs={collabs.data ?? []} clients={clients.data ?? []} />

      <ChangeAssistant clients={clients.data ?? []} onDone={reload} />

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
