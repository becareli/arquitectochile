import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { DISCIPLINES, DOC_KINDS } from "@shared/classification";

type Row = { source: string; id: number; name: string; classified: boolean; version: number; docKind: string | null; discipline: string | null; date: string; author: string; projectId: number; code: string | null; address: string | null; project: string; clientVisible: boolean };
type Client = { id: number; name: string };
type Project = { id: number; name: string; code: string | null; address: string | null };

const sel = "border rounded-md p-2 text-sm bg-white";
const get = async <T,>(url: string): Promise<T> => { const r = await fetch(url, { credentials: "include" }); if (!r.ok) throw new Error(String(r.status)); return r.json(); };

export default function ArchiveTab() {
  const qc = useQueryClient();
  const [f, setF] = useState({ clientId: "", projectId: "", discipline: "", docKind: "" });
  const [msg, setMsg] = useState<string | null>(null);
  const qs = new URLSearchParams(Object.entries({ projectId: f.projectId, discipline: f.discipline, docKind: f.docKind }).filter(([, v]) => v)).toString();
  const rows = useQuery({ queryKey: ["admin-archive", qs], queryFn: () => get<Row[]>(`/api/office/admin/archive${qs ? `?${qs}` : ""}`) });
  const clients = useQuery({ queryKey: ["admin-clients"], queryFn: () => get<Client[]>("/api/portal/admin/clients") });
  const projects = useQuery({ queryKey: ["admin-client-projects", f.clientId], queryFn: () => get<Project[]>(`/api/portal/admin/clients/${f.clientId}/projects`), enabled: Boolean(f.clientId) });

  const assign = async () => {
    try {
      const r = await (await apiRequest("POST", "/api/office/admin/projects/assign-codes")).json();
      setMsg(r.assigned ? `Se asignó código a ${r.assigned} proyecto(s).` : "Todos los proyectos ya tienen código.");
      qc.invalidateQueries({ queryKey: ["admin-client-projects"] });
    } catch (e) { setMsg(`Error: ${(e as Error).message}`); }
  };

  const data = rows.data ?? [];
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="text-base">Cómo se nombran los archivos</CardTitle></CardHeader>
        <CardContent className="text-sm space-y-2">
          <p className="font-mono bg-[#F4F7FA] rounded p-2">AC-2026-014_ARQ_PLA_Planta-1er-piso_V02.pdf</p>
          <p className="text-gray-600">Código del proyecto · disciplina · tipo · descripción · versión. La carpeta del proyecto es "AC-2026-014 El Hualle Sur 9445". Así todo lo de un proyecto queda junto y ordenado en cualquier carpeta.</p>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={assign}>Asignar códigos a proyectos sin código</Button>
            {msg && <span className="text-gray-600">{msg}</span>}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2 items-center">
        <select className={sel} value={f.clientId} onChange={(e) => setF({ ...f, clientId: e.target.value, projectId: "" })}>
          <option value="">Todos los clientes</option>
          {(clients.data ?? []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select className={sel} value={f.projectId} disabled={!f.clientId} onChange={(e) => setF({ ...f, projectId: e.target.value })}>
          <option value="">Todos los proyectos</option>
          {(projects.data ?? []).map((p) => <option key={p.id} value={p.id}>{p.code ? `${p.code} · ` : ""}{p.address ?? p.name}</option>)}
        </select>
        <select className={sel} value={f.discipline} onChange={(e) => setF({ ...f, discipline: e.target.value })}>
          <option value="">Todas las disciplinas</option>
          {DISCIPLINES.map((d) => <option key={d.code} value={d.code}>{d.code} · {d.label}</option>)}
        </select>
        <select className={sel} value={f.docKind} onChange={(e) => setF({ ...f, docKind: e.target.value })}>
          <option value="">Todos los tipos</option>
          {DOC_KINDS.map((d) => <option key={d.code} value={d.code}>{d.code} · {d.label}</option>)}
        </select>
        <Button size="sm" asChild><a href={`/api/office/admin/archive.csv${qs ? `?${qs}` : ""}`}>Descargar índice (CSV)</a></Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-gray-500 border-b"><tr><th className="p-2">Documento</th><th className="p-2">Disc.</th><th className="p-2">Tipo</th><th className="p-2">Ver.</th><th className="p-2">Fecha</th><th className="p-2">Autor</th><th className="p-2">Cliente</th></tr></thead>
            <tbody>
              {data.map((r) => (
                <tr key={`${r.source}-${r.id}`} className="border-b last:border-0">
                  <td className="p-2">
                    <a className="text-[#C2410C] underline break-all" href={r.source === "oficina" ? `/api/office/admin/files/${r.id}/download` : undefined}>{r.name}</a>
                    {!r.classified && <Badge variant="outline" className="ml-2">sin clasificar</Badge>}
                    <div className="text-xs text-gray-400">{r.code ? `${r.code} · ` : ""}{r.address ?? r.project}</div>
                  </td>
                  <td className="p-2">{r.discipline ?? "—"}</td><td className="p-2">{r.docKind ?? "—"}</td><td className="p-2">V{String(r.version).padStart(2, "0")}</td>
                  <td className="p-2 whitespace-nowrap">{new Date(r.date).toLocaleDateString("es-CL")}</td><td className="p-2">{r.author}</td>
                  <td className="p-2">{r.clientVisible ? "Visible" : "Interno"}</td>
                </tr>
              ))}
              {data.length === 0 && <tr><td className="p-4 text-gray-500" colSpan={7}>No hay documentos con estos filtros.</td></tr>}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
