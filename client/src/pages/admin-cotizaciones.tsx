import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { DISCIPLINES, guessDiscipline } from "@shared/classification";

type Collab = { id: number; name: string; specialty: string; discipline: string | null; active: boolean };
type ClientLite = { id: number; name: string };
type ProjectLite = { id: number; name: string; code?: string | null };
type RfqRow = { id: number; title: string; discipline: string; status: string; quoteDeadline: string | null; invited: number; quoted: number };
type RfqFull = {
  rfq: { id: number; title: string; discipline: string; requirements: string; status: string; quoteDeadline: string | null; awardedQuoteId: number | null };
  files: { id: number; name: string }[];
  invites: { collaboratorId: number; status: string; declineReason: string | null; name: string; specialty: string }[];
  quotes: { id: number; name: string; amount: string; deliveryDays: number; advancePercent: number; paymentNotes: string | null; notes: string | null }[];
};

const sel = "border rounded-md p-2 text-sm bg-white";
const clp = (n: number | string) => `$${Math.round(Number(n)).toLocaleString("es-CL")}`;
const day = (d: string | null) => (d ? new Date(d).toLocaleDateString("es-CL") : "sin fecha");
const INVITE: Record<string, string> = { invited: "Aún no responde", quoted: "Cotizó", declined: "Declinó", awarded: "Ganó", not_selected: "No elegido" };
const get = async <T,>(url: string): Promise<T> => { const r = await fetch(url, { credentials: "include" }); if (!r.ok) throw new Error(String(r.status)); return r.json(); };
const send = async (method: string, url: string, body?: unknown) => (await apiRequest(method, url, body)).json();
async function uploadPrivate(file: File) {
  const { uploadUrl, internalPath } = await send("POST", "/api/portal/admin/upload-url");
  const put = await fetch(uploadUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
  if (!put.ok) throw new Error("No se pudo subir el archivo");
  return { name: file.name, path: internalPath as string, size: file.size };
}

function Compare({ id, onChange }: { id: number; onChange: () => void }) {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["admin-rfq", id], queryFn: () => get<RfqFull>(`/api/office/admin/rfqs/${id}`) });
  const [msg, setMsg] = useState<string | null>(null);
  if (!data) return <p className="text-sm text-gray-500">Cargando...</p>;
  const { rfq, quotes, invites } = data;
  const open = rfq.status === "open";
  const cheapest = quotes.length ? Math.min(...quotes.map((q) => Number(q.amount))) : 0;
  const fastest = quotes.length ? Math.min(...quotes.map((q) => q.deliveryDays)) : 0;
  const run = async (fn: () => Promise<unknown>, ok: string) => { try { await fn(); setMsg(ok); qc.invalidateQueries({ queryKey: ["admin-rfq", id] }); onChange(); } catch (e) { setMsg(`Error: ${(e as Error).message}`); } };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{rfq.title}</CardTitle>
        <p className="text-xs text-gray-500">{rfq.discipline} · responder antes de: {day(rfq.quoteDeadline)} · {rfq.status === "open" ? "abierta" : rfq.status === "awarded" ? "adjudicada" : "cerrada"}</p>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="whitespace-pre-wrap text-gray-700">{rfq.requirements}</p>
        {data.files.length > 0 && <p>{data.files.map((f) => <a key={f.id} className="text-[#C2410C] underline mr-3" href={`/api/office/admin/rfq-files/${f.id}/download`}>{f.name}</a>)}</p>}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-left text-xs text-gray-500 border-b"><tr><th className="p-2">Colaborador</th><th className="p-2">Monto</th><th className="p-2">Plazo</th><th className="p-2">Forma de pago</th><th className="p-2"></th></tr></thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} className={`border-b align-top ${rfq.awardedQuoteId === q.id ? "bg-green-50" : ""}`}>
                  <td className="p-2 font-medium">{q.name}</td>
                  <td className="p-2 whitespace-nowrap">{clp(q.amount)} {Number(q.amount) === cheapest && quotes.length > 1 && <Badge variant="outline">más económica</Badge>}</td>
                  <td className="p-2 whitespace-nowrap">{q.deliveryDays} días {q.deliveryDays === fastest && quotes.length > 1 && <Badge variant="outline">más rápida</Badge>}</td>
                  <td className="p-2">Anticipo {q.advancePercent}% ({clp((Number(q.amount) * q.advancePercent) / 100)}){q.paymentNotes && <div className="text-xs text-gray-600">{q.paymentNotes}</div>}{q.notes && <div className="text-xs text-gray-500">Nota: {q.notes}</div>}</td>
                  <td className="p-2">{open && <Button size="sm" onClick={() => { if (window.confirm(`¿Adjudicar a ${q.name} por ${clp(q.amount)}?`)) run(() => send("POST", `/api/office/admin/rfqs/${id}/award`, { quoteId: q.id }), "Adjudicada: se creó la tarea y se avisó a todos."); }}>Elegir</Button>}{rfq.awardedQuoteId === q.id && <Badge>Ganó</Badge>}</td>
                </tr>
              ))}
              {quotes.length === 0 && <tr><td className="p-3 text-gray-500" colSpan={5}>Aún no llegan cotizaciones.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-gray-600">{invites.map((i) => <span key={i.collaboratorId} className="mr-3">{i.name}: {INVITE[i.status]}{i.declineReason ? ` (${i.declineReason})` : ""}</span>)}</div>
        {open && <Button size="sm" variant="outline" onClick={() => run(() => send("POST", `/api/office/admin/rfqs/${id}/close`), "Cerrada sin adjudicar.")}>Cerrar sin adjudicar</Button>}
        {msg && <p className="text-gray-600">{msg}</p>}
      </CardContent>
    </Card>
  );
}

export default function Cotizaciones({ collabs, clients }: { collabs: Collab[]; clients: ClientLite[] }) {
  const qc = useQueryClient();
  const [sel1, setSel1] = useState<number | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [f, setF] = useState({ clientId: "", projectId: "", discipline: "", title: "", requirements: "", deadline: "", format: "2d", invitees: [] as number[] });
  const list = useQuery({ queryKey: ["admin-rfqs"], queryFn: () => get<RfqRow[]>("/api/office/admin/rfqs") });
  const projects = useQuery({ queryKey: ["admin-client-projects", f.clientId], queryFn: () => get<ProjectLite[]>(`/api/portal/admin/clients/${f.clientId}/projects`), enabled: Boolean(f.clientId) });
  const reload = () => qc.invalidateQueries({ queryKey: ["admin-rfqs"] });
  const matching = collabs.filter((c) => c.active && (!f.discipline || guessDiscipline(c.discipline ?? c.specialty) === f.discipline));
  const toggle = (id: number) => setF({ ...f, invitees: f.invitees.includes(id) ? f.invitees.filter((i) => i !== id) : [...f.invitees, id] });

  const create = async () => {
    try {
      const up = [];
      for (const file of files) up.push(await uploadPrivate(file));
      const r = await send("POST", "/api/office/admin/rfqs", { projectId: f.projectId ? Number(f.projectId) : null, discipline: f.discipline, title: f.title, requirements: f.requirements, deliverableFormat: f.format, quoteDeadline: f.deadline || null, collaboratorIds: f.invitees, files: up });
      setMsg(`Solicitud enviada a ${r.invited} colaborador(es).`);
      setF({ ...f, title: "", requirements: "", invitees: [] }); setFiles([]); reload(); setSel1(r.id);
    } catch (e) { setMsg(`Error: ${(e as Error).message}`); }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="text-base">Pedir cotizaciones</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <select className={sel} value={f.discipline} onChange={(e) => setF({ ...f, discipline: e.target.value, invitees: [] })}>
              <option value="">Disciplina...</option>
              {DISCIPLINES.map((d) => <option key={d.code} value={d.code}>{d.code} · {d.label}</option>)}
            </select>
            <select className={sel} value={f.format} onChange={(e) => setF({ ...f, format: e.target.value })}>
              <option value="2d">Entrega en 2D (planos)</option>
              <option value="3d">Entrega en 3D / modelo</option>
            </select>
            <select className={sel} value={f.clientId} onChange={(e) => setF({ ...f, clientId: e.target.value, projectId: "" })}>
              <option value="">Sin cliente (trabajo interno)</option>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select className={sel} value={f.projectId} disabled={!f.clientId} onChange={(e) => setF({ ...f, projectId: e.target.value })}>
              <option value="">Proyecto...</option>
              {(projects.data ?? []).map((p) => <option key={p.id} value={p.id}>{p.code ? `${p.code} · ` : ""}{p.name}</option>)}
            </select>
          </div>
          <Input placeholder="Qué necesitas (ej. Proyecto eléctrico vivienda 120 m²)" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
          <Textarea rows={4} placeholder="Requerimientos: superficie, ubicación, normativa, qué debe entregar (planos, memoria, TE1, declaración SEC), información que ya tienes..." value={f.requirements} onChange={(e) => setF({ ...f, requirements: e.target.value })} />
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs text-gray-600">Responder antes de</label>
            <Input type="date" className="w-44" value={f.deadline} onChange={(e) => setF({ ...f, deadline: e.target.value })} />
            <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />
          </div>
          <p className="text-xs text-gray-500">Los colaboradores solo verán el nombre del proyecto y los archivos que adjuntes aquí, nunca los datos del cliente. Adjunta los planos base para que coticen bien.</p>
          <div>
            <div className="font-medium mb-1">A quién invitar {f.discipline ? "(filtrado por disciplina)" : ""}</div>
            {matching.length === 0 && <p className="text-gray-500">No hay colaboradores activos de esa disciplina: agrégalos en "Colaboradores".</p>}
            <div className="grid sm:grid-cols-2 gap-1">
              {matching.map((c) => <label key={c.id} className="flex items-center gap-2"><input type="checkbox" checked={f.invitees.includes(c.id)} onChange={() => toggle(c.id)} />{c.name} <span className="text-xs text-gray-500">· {c.specialty}</span></label>)}
            </div>
          </div>
          <Button size="sm" disabled={!f.discipline || f.title.length < 3 || f.requirements.length < 10 || f.invitees.length === 0} onClick={create}>Enviar solicitud ({f.invitees.length})</Button>
          {msg && <p className="text-gray-600">{msg}</p>}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 space-y-2">
          {(list.data ?? []).map((r) => (
            <button key={r.id} onClick={() => setSel1(r.id)} className={`w-full text-left rounded-md border p-3 bg-white hover:border-[#F97015] ${sel1 === r.id ? "border-[#F97015]" : ""}`}>
              <div className="font-medium text-sm">{r.title}</div>
              <div className="text-xs text-gray-500">{r.discipline} · {r.quoted} de {r.invited} cotizaron · {r.status === "open" ? "abierta" : r.status === "awarded" ? "adjudicada" : "cerrada"}</div>
            </button>
          ))}
          {list.data?.length === 0 && <p className="text-sm text-gray-500">Aún no has pedido cotizaciones.</p>}
        </div>
        <div className="lg:col-span-3">{sel1 ? <Compare key={sel1} id={sel1} onChange={() => { reload(); qc.invalidateQueries({ queryKey: ["office-tasks"] }); }} /> : <p className="text-sm text-gray-500">Elige una solicitud para comparar las cotizaciones y adjudicar.</p>}</div>
      </div>
    </div>
  );
}
