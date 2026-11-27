import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSEO } from "@/hooks/useSEO";
import { apiRequest } from "@/lib/queryClient";

type Client = { id: number; name: string; email: string; phone: string | null; status: string; lastLogin: string | null };
type Project = { id: number; name: string; status: string; progress: number | null; permitStatus: string | null; permitFileNumber: string | null; welcomeVideoUrl: string | null };
type Doc = { id: number; name: string; type: string; version: number; visibleToClient: boolean };
type Pay = { id: number; description: string; amount: string; dueDate: string; status: string; receiptNumber: string | null };
type Hito = { id: number; title: string; date: string; status: string };
type Full = { project: Project; documents: Doc[]; payments: Pay[]; timeline: Hito[] };

const get = async <T,>(url: string): Promise<T> => {
  const r = await fetch(url, { credentials: "include" });
  if (!r.ok) throw new Error(String(r.status));
  return r.json();
};
const send = async (method: string, url: string, body?: unknown) => (await apiRequest(method, url, body)).json();

// Sube un archivo a la carpeta privada de clientes y devuelve su ruta interna
async function uploadPrivate(file: File): Promise<{ path: string; size: number }> {
  const { uploadUrl, internalPath } = await send("POST", "/api/portal/admin/upload-url");
  const put = await fetch(uploadUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
  if (!put.ok) throw new Error("No se pudo subir el archivo");
  return { path: internalPath, size: file.size };
}

const DOC_TYPES: [string, string][] = [
  ["plans", "Planos"], ["renders", "Renders"], ["specifications", "Especificaciones"], ["observations", "Acta de observaciones"],
  ["permits", "Permisos"], ["contracts", "Contratos"], ["photos", "Fotos"], ["other", "Otros"],
];
const PERMIT: [string, string][] = [["", "Sin expediente"], ["ingresado", "Ingresado"], ["observado", "Observado"], ["reingresado", "Reingresado"], ["aprobado", "Aprobado"], ["recepcion", "Recepción final"]];
const sel = "border rounded-md p-2 text-sm bg-white";

function ProjectPanel({ clientId, projectId }: { clientId: number; projectId: number }) {
  const qc = useQueryClient();
  const key = ["admin-project", projectId];
  const { data } = useQuery({ queryKey: key, queryFn: () => get<Full>(`/api/portal/admin/projects/${projectId}`) });
  const [msg, setMsg] = useState<string | null>(null);
  const refresh = () => qc.invalidateQueries({ queryKey: key });
  const run = async (fn: () => Promise<unknown>, ok: string) => {
    try { await fn(); setMsg(ok); refresh(); } catch (e) { setMsg(`Error: ${(e as Error).message}`); }
  };

  const [st, setSt] = useState<Partial<Project> | null>(null);
  const [doc, setDoc] = useState({ name: "", type: "plans", version: 1, visible: true });
  const [docFile, setDocFile] = useState<File | null>(null);
  const [pay, setPay] = useState({ description: "", amount: "", dueDate: "" });
  const [hito, setHito] = useState({ title: "", date: "", status: "upcoming" });
  const [mail, setMail] = useState({ subject: "", body: "", kind: "official" });
  const [mailFile, setMailFile] = useState<File | null>(null);
  const [recFile, setRecFile] = useState<{ id: number; file: File | null; type: string; number: string } | null>(null);

  if (!data) return <p className="text-sm text-gray-500">Cargando proyecto...</p>;
  const p = { ...data.project, ...st };

  return (
    <div className="space-y-4">
      {msg && <p className="text-sm bg-blue-50 border border-blue-200 rounded p-2">{msg}</p>}

      <Card>
        <CardHeader><CardTitle className="text-base">Estado y expediente</CardTitle></CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-2">
          <select className={sel} value={p.status} onChange={(e) => setSt({ ...st, status: e.target.value })}>
            {["planning", "design", "permits", "construction", "completed"].map((s) => <option key={s}>{s}</option>)}
          </select>
          <Input type="number" min={0} max={100} placeholder="Avance %" value={p.progress ?? 0} onChange={(e) => setSt({ ...st, progress: Number(e.target.value) })} />
          <select className={sel} value={p.permitStatus ?? ""} onChange={(e) => setSt({ ...st, permitStatus: e.target.value || null })}>
            {PERMIT.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <Input placeholder="N° de expediente" value={p.permitFileNumber ?? ""} onChange={(e) => setSt({ ...st, permitFileNumber: e.target.value })} />
          <Input className="sm:col-span-2" placeholder="Video de bienvenida de este proyecto (YouTube, opcional)" value={p.welcomeVideoUrl ?? ""} onChange={(e) => setSt({ ...st, welcomeVideoUrl: e.target.value })} />
          <Button className="sm:col-span-2" disabled={!st} onClick={() => run(() => send("PATCH", `/api/portal/admin/projects/${projectId}`, {
            status: p.status, progress: p.progress ?? 0,
            ...(p.permitStatus ? { permitStatus: p.permitStatus } : {}),
            ...(p.permitFileNumber ? { permitFileNumber: p.permitFileNumber } : {}),
            ...(p.welcomeVideoUrl ? { welcomeVideoUrl: p.welcomeVideoUrl } : {}),
          }).then(() => setSt(null)), "Proyecto actualizado")}>Guardar</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Documentos</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {data.documents.map((d) => (
            <div key={d.id} className="flex justify-between text-sm"><span>{d.name} · v{d.version}</span><Badge variant="outline">{d.visibleToClient ? "Visible" : "Oculto"}</Badge></div>
          ))}
          <div className="grid sm:grid-cols-2 gap-2">
            <Input placeholder="Nombre (ej. Plano planta 1° piso.pdf)" value={doc.name} onChange={(e) => setDoc({ ...doc, name: e.target.value })} />
            <select className={sel} value={doc.type} onChange={(e) => setDoc({ ...doc, type: e.target.value })}>{DOC_TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
            <input type="file" onChange={(e) => setDocFile(e.target.files?.[0] ?? null)} />
            <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={doc.visible} onChange={(e) => setDoc({ ...doc, visible: e.target.checked })} /> Visible para el cliente</label>
          </div>
          <Button disabled={!docFile || doc.name.length < 2} onClick={() => run(async () => {
            const up = await uploadPrivate(docFile!);
            await send("POST", `/api/portal/admin/projects/${projectId}/documents`, { name: doc.name, type: doc.type, fileUrl: up.path, fileSize: up.size, version: doc.version, visibleToClient: doc.visible });
            setDocFile(null); setDoc({ ...doc, name: "" });
          }, "Documento subido")}>Subir documento</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Pagos y boletas</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {data.payments.map((x) => (
            <div key={x.id} className="space-y-2 border-b pb-2">
              <div className="flex flex-wrap justify-between gap-2 text-sm">
                <span>{x.description} · ${Number(x.amount).toLocaleString("es-CL")} · vence {new Date(x.dueDate).toLocaleDateString("es-CL")}</span>
                <Badge variant="outline">{x.status}{x.receiptNumber ? ` · N° ${x.receiptNumber}` : ""}</Badge>
              </div>
              {x.status !== "paid" && (recFile?.id === x.id ? (
                <div className="grid sm:grid-cols-4 gap-2">
                  <select className={sel} value={recFile.type} onChange={(e) => setRecFile({ ...recFile, type: e.target.value })}><option value="boleta">Boleta</option><option value="factura">Factura</option></select>
                  <Input placeholder="N°" value={recFile.number} onChange={(e) => setRecFile({ ...recFile, number: e.target.value })} />
                  <input type="file" onChange={(e) => setRecFile({ ...recFile, file: e.target.files?.[0] ?? null })} />
                  <Button size="sm" onClick={() => run(async () => {
                    const up = recFile.file ? await uploadPrivate(recFile.file) : null;
                    await send("PATCH", `/api/portal/admin/payments/${x.id}`, {
                      status: "paid", paidDate: new Date().toISOString(), receiptType: recFile.type,
                      ...(recFile.number ? { receiptNumber: recFile.number } : {}), ...(up ? { receiptUrl: up.path } : {}), notify: true,
                    });
                    setRecFile(null);
                  }, "Pago registrado y comprobante enviado al cliente")}>Marcar pagado y avisar</Button>
                </div>
              ) : <Button size="sm" variant="outline" onClick={() => setRecFile({ id: x.id, file: null, type: "boleta", number: "" })}>Registrar pago</Button>)}
            </div>
          ))}
          <div className="grid sm:grid-cols-3 gap-2">
            <Input placeholder="Descripción" value={pay.description} onChange={(e) => setPay({ ...pay, description: e.target.value })} />
            <Input placeholder="Monto (solo números)" value={pay.amount} onChange={(e) => setPay({ ...pay, amount: e.target.value })} />
            <Input type="date" value={pay.dueDate} onChange={(e) => setPay({ ...pay, dueDate: e.target.value })} />
          </div>
          <Button disabled={!pay.description || !pay.amount || !pay.dueDate} onClick={() => run(async () => {
            await send("POST", `/api/portal/admin/projects/${projectId}/payments`, pay); setPay({ description: "", amount: "", dueDate: "" });
          }, "Pago agregado")}>Agregar cobro</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Línea de tiempo</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {data.timeline.map((h) => (
            <div key={h.id} className="flex justify-between items-center text-sm">
              <span>{h.title} · {new Date(h.date).toLocaleDateString("es-CL")}</span>
              <select className={sel} value={h.status} onChange={(e) => run(() => send("PATCH", `/api/portal/admin/timeline/${h.id}`, { status: e.target.value }), "Hito actualizado")}>
                <option value="completed">Completado</option><option value="current">En curso</option><option value="upcoming">Próximo</option>
              </select>
            </div>
          ))}
          <div className="grid sm:grid-cols-3 gap-2">
            <Input placeholder="Hito (ej. Ingreso a la DOM)" value={hito.title} onChange={(e) => setHito({ ...hito, title: e.target.value })} />
            <Input type="date" value={hito.date} onChange={(e) => setHito({ ...hito, date: e.target.value })} />
            <select className={sel} value={hito.status} onChange={(e) => setHito({ ...hito, status: e.target.value })}><option value="upcoming">Próximo</option><option value="current">En curso</option><option value="completed">Completado</option></select>
          </div>
          <Button disabled={!hito.title || !hito.date} onClick={() => run(async () => {
            await send("POST", `/api/portal/admin/projects/${projectId}/timeline`, hito); setHito({ title: "", date: "", status: "upcoming" });
          }, "Hito agregado")}>Agregar hito</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Enviar mensaje al cliente</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="grid sm:grid-cols-2 gap-2">
            <Input placeholder="Asunto" value={mail.subject} onChange={(e) => setMail({ ...mail, subject: e.target.value })} />
            <select className={sel} value={mail.kind} onChange={(e) => setMail({ ...mail, kind: e.target.value })}><option value="official">Mensaje oficial</option><option value="receipt">Comprobante</option><option value="notice">Aviso</option></select>
          </div>
          <textarea className="w-full border rounded-md p-2 text-sm min-h-[90px]" placeholder="Mensaje" value={mail.body} onChange={(e) => setMail({ ...mail, body: e.target.value })} />
          <input type="file" onChange={(e) => setMailFile(e.target.files?.[0] ?? null)} />
          <Button disabled={mail.subject.length < 3 || mail.body.length < 3} onClick={() => run(async () => {
            const up = mailFile ? await uploadPrivate(mailFile) : null;
            const r = await send("POST", "/api/portal/admin/messages", { clientId, projectId, ...mail, ...(up ? { attachmentUrl: up.path } : {}) });
            setMail({ subject: "", body: "", kind: "official" }); setMailFile(null);
            if (!r.emailed) throw new Error("Guardado en el portal, pero el correo no salió (falta configurar SMTP)");
          }, "Mensaje guardado y enviado por correo")}>Enviar</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function ClientsTab() {
  const qc = useQueryClient();
  const clients = useQuery({ queryKey: ["admin-clients"], queryFn: () => get<Client[]>("/api/portal/admin/clients") });
  const [cid, setCid] = useState<number | null>(null);
  const [pid, setPid] = useState<number | null>(null);
  const [nc, setNc] = useState({ name: "", email: "", phone: "" });
  const [np, setNp] = useState({ name: "", description: "" });
  const [note, setNote] = useState<string | null>(null);
  const projects = useQuery({ queryKey: ["admin-client-projects", cid], queryFn: () => get<Project[]>(`/api/portal/admin/clients/${cid}/projects`), enabled: cid !== null });
  const fail = (e: unknown) => setNote(`Error: ${(e as Error).message}`);

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="space-y-3">
        <Card>
          <CardHeader><CardTitle className="text-base">Nuevo cliente</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <Input placeholder="Nombre" value={nc.name} onChange={(e) => setNc({ ...nc, name: e.target.value })} />
            <Input type="email" placeholder="Correo (con el que entrará)" value={nc.email} onChange={(e) => setNc({ ...nc, email: e.target.value })} />
            <Input placeholder="Teléfono (opcional)" value={nc.phone} onChange={(e) => setNc({ ...nc, phone: e.target.value })} />
            <Button className="w-full" disabled={nc.name.length < 2 || !nc.email} onClick={() => send("POST", "/api/portal/admin/clients", { name: nc.name, email: nc.email, ...(nc.phone ? { phone: nc.phone } : {}) })
              .then(() => { setNc({ name: "", email: "", phone: "" }); qc.invalidateQueries({ queryKey: ["admin-clients"] }); }).catch(fail)}>Crear cliente</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Clientes</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {clients.data?.map((c) => (
              <button key={c.id} onClick={() => { setCid(c.id); setPid(null); setNote(null); }} className={`w-full text-left rounded p-2 text-sm ${cid === c.id ? "bg-blue-50" : "hover:bg-gray-50"}`}>
                <p className="font-medium">{c.name}</p><p className="text-xs text-gray-500">{c.email}{c.lastLogin ? " · ya ingresó" : ""}</p>
              </button>
            ))}
            {clients.data?.length === 0 && <p className="text-sm text-gray-500">Aún no hay clientes.</p>}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {note && <p className="text-sm bg-yellow-50 border border-yellow-200 rounded p-2 break-all">{note}</p>}
        {cid && (
          <Card>
            <CardHeader><CardTitle className="text-base">Proyectos del cliente</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Button size="sm" variant="outline" onClick={() => send("POST", `/api/portal/admin/clients/${cid}/invite`)
                .then((r) => setNote(r.sent ? "Invitación enviada por correo." : `El correo no está configurado. Envía este enlace al cliente (vence en 20 minutos): ${r.link}`)).catch(fail)}>Enviar invitación de acceso</Button>
              <div className="flex flex-wrap gap-2">
                {projects.data?.map((p) => <Button key={p.id} size="sm" variant={pid === p.id ? "default" : "outline"} onClick={() => setPid(p.id)}>{p.name}</Button>)}
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                <Input placeholder="Nombre del proyecto" value={np.name} onChange={(e) => setNp({ ...np, name: e.target.value })} />
                <Input placeholder="Descripción (opcional)" value={np.description} onChange={(e) => setNp({ ...np, description: e.target.value })} />
              </div>
              <Button size="sm" disabled={np.name.length < 2} onClick={() => send("POST", "/api/portal/admin/projects", { clientId: cid, name: np.name, ...(np.description ? { description: np.description } : {}) })
                .then(() => { setNp({ name: "", description: "" }); qc.invalidateQueries({ queryKey: ["admin-client-projects", cid] }); }).catch(fail)}>Crear proyecto</Button>
            </CardContent>
          </Card>
        )}
        {cid && pid && <ProjectPanel key={pid} clientId={cid} projectId={pid} />}
        {!cid && <p className="text-sm text-gray-500">Elige un cliente de la lista, o crea uno nuevo.</p>}
      </div>
    </div>
  );
}

type Ref = { id: number; referrer: string; name: string; contact: string; need: string | null; note: string | null; source: string; status: string; rewardNote: string | null; createdAt: string };
function ReferralsTab() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["admin-referrals"], queryFn: () => get<Ref[]>("/api/portal/admin/referrals") });
  const patch = (id: number, body: object) => send("PATCH", `/api/portal/admin/referrals/${id}`, body).then(() => qc.invalidateQueries({ queryKey: ["admin-referrals"] }));
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Recomendaciones recibidas</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {data?.length === 0 && <p className="text-sm text-gray-500">Aún no hay recomendaciones.</p>}
        {data?.map((r) => (
          <div key={r.id} className="border rounded-md p-3 space-y-2 text-sm">
            <div className="flex flex-wrap justify-between gap-2">
              <p><b>{r.name}</b> · {r.contact}{r.need ? ` · ${r.need}` : ""}</p>
              <select className={sel} value={r.status} onChange={(e) => patch(r.id, { status: e.target.value })}>
                <option value="new">Nueva</option><option value="contacted">Contactada</option><option value="client">Ya es cliente</option><option value="discarded">Cerrada</option>
              </select>
            </div>
            <p className="text-xs text-gray-500">Recomendada por {r.referrer} · {r.source === "link" ? "enlace personal" : "portal"} · {new Date(r.createdAt).toLocaleDateString("es-CL")}</p>
            <Input defaultValue={r.rewardNote ?? ""} placeholder="Agradecimiento acordado (nota interna)" onBlur={(e) => e.target.value !== (r.rewardNote ?? "") && patch(r.id, { rewardNote: e.target.value })} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

type Fb = { id: number; clientName: string; rating: number; comment: string; canPublish: boolean; referralName: string | null; referralContact: string | null; createdAt: string };
function FeedbackTab() {
  const { data } = useQuery({ queryKey: ["admin-feedback"], queryFn: () => get<Fb[]>("/api/portal/admin/feedback") });
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Opiniones de clientes</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {data?.length === 0 && <p className="text-sm text-gray-500">Aún no hay opiniones.</p>}
        {data?.map((f) => (
          <div key={f.id} className="border rounded-md p-3 text-sm space-y-1">
            <p><b>{f.clientName}</b> · {"★".repeat(f.rating)} <Badge variant="outline">{f.canPublish ? "Autoriza publicar" : "No publicar"}</Badge></p>
            <p className="text-gray-700">{f.comment}</p>
            {f.referralName && <p className="text-xs text-gray-500">Recomienda a: {f.referralName} {f.referralContact ?? ""}</p>}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

type Mtg = { id: number; kind: string; title: string; heldAt: string; platform: string | null; source: string; status: string; clientId: number | null; leadId: number | null; projectId: number | null; clientName: string | null; leadName: string | null };
type Agr = { id: number; description: string; owner: string; status: string };
type MtgFull = { meeting: Mtg & { summary: string | null; minuteText: string | null; recordingUrl: string | null }; agreements: Agr[] };
type LeadLite = { id: number; name: string; email: string };

function MeetingEditor({ id, onChange }: { id: number; onChange: () => void }) {
  const qc = useQueryClient();
  const key = ["admin-meeting", id];
  const { data } = useQuery({ queryKey: key, queryFn: () => get<MtgFull>(`/api/portal/admin/meetings/${id}`) });
  const clients = useQuery({ queryKey: ["admin-clients"], queryFn: () => get<Client[]>("/api/portal/admin/clients") });
  const leads = useQuery({ queryKey: ["admin-leads-lite"], queryFn: () => get<LeadLite[]>("/api/leads") });
  const [minute, setMinute] = useState<string | null>(null);
  const [newA, setNewA] = useState({ description: "", owner: "architect" });
  const [note, setNote] = useState<string | null>(null);
  const clientId = data?.meeting.clientId ?? null;
  const projects = useQuery({ queryKey: ["admin-client-projects", clientId], queryFn: () => get<Project[]>(`/api/portal/admin/clients/${clientId}/projects`), enabled: clientId !== null });
  const refresh = () => { qc.invalidateQueries({ queryKey: key }); onChange(); };
  const run = async (fn: () => Promise<unknown>, ok: string) => { try { await fn(); setNote(ok); refresh(); } catch (e) { setNote(`Error: ${(e as Error).message}`); } };
  if (!data) return <p className="text-sm text-gray-500">Cargando...</p>;
  const m = data.meeting;
  const patch = (b: object, ok: string) => run(() => send("PATCH", `/api/portal/admin/meetings/${id}`, b), ok);

  return (
    <div className="space-y-3">
      {note && <p className="text-sm bg-blue-50 border border-blue-200 rounded p-2">{note}</p>}
      <div className="grid sm:grid-cols-2 gap-2">
        <select className={sel} value={m.clientId ?? ""} onChange={(e) => patch({ clientId: e.target.value ? Number(e.target.value) : null, projectId: null, leadId: null }, "Asignada")}>
          <option value="">Cliente: sin asignar</option>
          {clients.data?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select className={sel} value={m.projectId ?? ""} disabled={!m.clientId} onChange={(e) => patch({ projectId: e.target.value ? Number(e.target.value) : null }, "Proyecto asignado")}>
          <option value="">Proyecto: general</option>
          {projects.data?.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select className={sel} value={m.leadId ?? ""} disabled={Boolean(m.clientId)} onChange={(e) => patch({ leadId: e.target.value ? Number(e.target.value) : null }, "Lead asignado")}>
          <option value="">Lead (si aún no es cliente)</option>
          {Array.isArray(leads.data) && leads.data.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        {m.recordingUrl && <a className="text-sm underline self-center" href={m.recordingUrl} target="_blank" rel="noreferrer">Ver grabación</a>}
      </div>
      <p className="text-xs text-gray-500">Revisa la minuta antes de publicarla: viene del resumen automático y puede traer comentarios internos.</p>
      <textarea className="w-full border rounded-md p-2 text-sm min-h-[160px]" value={minute ?? m.minuteText ?? ""} onChange={(e) => setMinute(e.target.value)} placeholder="Minuta para el cliente" />
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" disabled={minute === null} onClick={() => patch({ minuteText: minute }, "Minuta guardada").then(() => setMinute(null))}>Guardar minuta</Button>
        <Button asChild size="sm" variant="outline"><a href={`/api/portal/admin/meetings/${id}/pdf`} target="_blank" rel="noreferrer">Ver PDF de la minuta</a></Button>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold">Acuerdos</p>
        {data.agreements.map((a) => (
          <div key={a.id} className="flex flex-wrap items-center gap-2 text-sm">
            <span className={`flex-1 ${a.status === "done" ? "line-through text-gray-400" : ""}`}>{a.description}</span>
            <select className={sel} value={a.owner} onChange={(e) => run(() => send("PATCH", `/api/portal/admin/agreements/${a.id}`, { owner: e.target.value }), "Acuerdo actualizado")}>
              <option value="architect">Arquitecto</option><option value="client">Cliente</option>
            </select>
            <Button size="sm" variant="outline" onClick={() => run(() => send("PATCH", `/api/portal/admin/agreements/${a.id}`, { status: a.status === "done" ? "pending" : "done" }), "Acuerdo actualizado")}>{a.status === "done" ? "Reabrir" : "Cumplido"}</Button>
            <Button size="sm" variant="outline" onClick={() => run(() => send("DELETE", `/api/portal/admin/agreements/${a.id}`), "Acuerdo eliminado")}>Quitar</Button>
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
          <Input className="flex-1 min-w-[200px]" placeholder="Nuevo acuerdo" value={newA.description} onChange={(e) => setNewA({ ...newA, description: e.target.value })} />
          <select className={sel} value={newA.owner} onChange={(e) => setNewA({ ...newA, owner: e.target.value })}><option value="architect">Arquitecto</option><option value="client">Cliente</option></select>
          <Button size="sm" disabled={newA.description.length < 3} onClick={() => run(async () => { await send("POST", `/api/portal/admin/meetings/${id}/agreements`, newA); setNewA({ ...newA, description: "" }); }, "Acuerdo agregado")}>Agregar</Button>
        </div>
      </div>

      <Button disabled={minute !== null || (!m.clientId && !m.leadId)} onClick={() => run(async () => {
        const r = await send("POST", `/api/portal/admin/meetings/${id}/publish`);
        if (!r.emailed) throw new Error("Publicada en el portal, pero el correo no salió (falta configurar SMTP)");
      }, "Minuta publicada y enviada por correo")}>
        {m.status === "published" ? "Reenviar minuta" : "Publicar y enviar minuta"}
      </Button>
      {minute !== null && <p className="text-xs text-amber-700">Guarda la minuta antes de publicar.</p>}
    </div>
  );
}

function MeetingsTab() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState("all");
  const [sel_, setSel] = useState<number | null>(null);
  const [nm, setNm] = useState({ title: "", heldAt: "" });
  const { data } = useQuery({ queryKey: ["admin-meetings", filter], queryFn: () => get<Mtg[]>(`/api/portal/admin/meetings?filter=${filter}`) });
  const reload = () => qc.invalidateQueries({ queryKey: ["admin-meetings"] });
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="space-y-3">
        <div className="flex gap-1 flex-wrap">
          {[["all", "Todas"], ["draft", "Por revisar"], ["unassigned", "Sin asignar"]].map(([k, l]) => <Button key={k} size="sm" variant={filter === k ? "default" : "outline"} onClick={() => setFilter(k)}>{l}</Button>)}
        </div>
        <Card><CardContent className="pt-4 space-y-1">
          {data?.length === 0 && <p className="text-sm text-gray-500">No hay reuniones.</p>}
          {data?.map((m) => (
            <button key={m.id} onClick={() => setSel(m.id)} className={`w-full text-left rounded p-2 text-sm ${sel_ === m.id ? "bg-blue-50" : "hover:bg-gray-50"}`}>
              <p className="font-medium">{m.title}</p>
              <p className="text-xs text-gray-500">{new Date(m.heldAt).toLocaleDateString("es-CL")} · {m.clientName ?? m.leadName ?? "Sin asignar"} · {m.status === "published" ? "Publicada" : "Borrador"}</p>
            </button>
          ))}
        </CardContent></Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Registrar reunión a mano</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <Input placeholder="Título" value={nm.title} onChange={(e) => setNm({ ...nm, title: e.target.value })} />
            <Input type="date" value={nm.heldAt} onChange={(e) => setNm({ ...nm, heldAt: e.target.value })} />
            <Button size="sm" disabled={nm.title.length < 2 || !nm.heldAt} onClick={() => send("POST", "/api/portal/admin/meetings", nm).then((r) => { setNm({ title: "", heldAt: "" }); setSel(r.id); reload(); })}>Crear</Button>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        {sel_ ? <MeetingEditor key={sel_} id={sel_} onChange={reload} /> : <p className="text-sm text-gray-500">Elige una reunión para revisar su minuta y sus acuerdos.</p>}
      </div>
    </div>
  );
}

export default function AdminPortal() {
  useSEO({ title: "Portal de clientes (admin) | ArquitectoChile.com", description: "Administración del portal de clientes.", path: "/admin/portal", noindex: true });
  const [tab, setTab] = useState<"clientes" | "reuniones" | "referidos" | "opiniones">("clientes");
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Portal de clientes</h1>
        <div className="flex gap-2">
          {(["clientes", "reuniones", "referidos", "opiniones"] as const).map((t) => (
            <Button key={t} size="sm" variant={tab === t ? "default" : "outline"} onClick={() => setTab(t)}>{t[0].toUpperCase() + t.slice(1)}</Button>
          ))}
        </div>
        {tab === "clientes" && <ClientsTab />}
        {tab === "reuniones" && <MeetingsTab />}
        {tab === "referidos" && <ReferralsTab />}
        {tab === "opiniones" && <FeedbackTab />}
      </div>
    </div>
  );
}
