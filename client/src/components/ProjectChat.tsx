import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";

type Project = { id: number; name: string; code?: string | null; messages?: number };
type Thread = { participants: { id: number; name: string; specialty: string }[]; messages: { id: number; author: string; mine: boolean; admin: boolean; body: string; createdAt: string }[] };
const getJson = async <T,>(url: string) => { const r = await fetch(url, { credentials: "include" }); if (!r.ok) throw new Error(String(r.status)); return r.json() as Promise<T>; };

/** Conversación por proyecto. base = "/api/office/chats" (colaborador) o "/api/office/admin/chats" (Patricio). */
export function ProjectChat({ base, admin = false }: { base: string; admin?: boolean }) {
  const qc = useQueryClient();
  const [sel, setSel] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const end = useRef<HTMLDivElement>(null);
  const projects = useQuery({ queryKey: ["chat-projects", base], queryFn: () => getJson<Project[]>(base) });
  const thread = useQuery({ queryKey: ["chat-thread", base, sel], queryFn: () => getJson<Thread>(`${base}/${sel}`), enabled: sel !== null, refetchInterval: 15000 });
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [thread.data?.messages.length]);

  const post = async () => {
    if (!text.trim() || sel === null) return;
    try { await apiRequest("POST", `${base}/${sel}`, { body: text.trim() }); setText(""); setErr(null); qc.invalidateQueries({ queryKey: ["chat-thread", base, sel] }); }
    catch (e) { setErr((e as Error).message); }
  };
  const remove = async (id: number) => {
    try { await apiRequest("DELETE", `/api/office/admin/chats/messages/${id}`); qc.invalidateQueries({ queryKey: ["chat-thread", base, sel] }); } catch (e) { setErr((e as Error).message); }
  };

  if (!projects.data) return <p className="text-sm text-gray-500">Cargando...</p>;
  if (!projects.data.length) return <p className="text-sm text-gray-500">Cuando tengas tareas en un proyecto, aquí se abrirá su conversación con el resto del equipo.</p>;
  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-4">
      <div className="space-y-2">
        {projects.data.map((p) => (
          <button key={p.id} onClick={() => setSel(p.id)} className={`w-full text-left rounded-md border p-2 bg-white text-sm hover:border-[#F97015] ${sel === p.id ? "border-[#F97015]" : ""}`}>
            <div className="font-medium">{p.name}</div>
            {(p.code || p.messages !== undefined) && <div className="text-xs text-gray-500">{p.code ?? ""}{p.messages !== undefined ? ` · ${p.messages} mensajes` : ""}</div>}
          </button>
        ))}
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{sel === null ? "Elija un proyecto" : projects.data.find((p) => p.id === sel)?.name}</CardTitle>
          {thread.data && <p className="text-xs text-gray-500">En esta conversación: {thread.data.participants.map((p) => `${p.name} (${p.specialty})`).join(" · ")}</p>}
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {sel !== null && thread.data && (
            <>
              <div className="max-h-96 overflow-y-auto space-y-2 rounded-md bg-[#F4F7FA] p-2">
                {!thread.data.messages.length && <p className="text-gray-500 text-center py-4">Aún no hay mensajes. Escriba el primero.</p>}
                {thread.data.messages.map((m) => (
                  <div key={m.id} className={`flex ${m.mine ? "justify-end" : ""}`}>
                    <div className={`max-w-[85%] rounded-lg px-3 py-2 ${m.mine ? "bg-[#1D2530] text-white" : "bg-white border"}`}>
                      <div className={`text-xs ${m.mine ? "text-gray-300" : "text-gray-500"}`}>{m.author}{m.admin ? " · ArquitectoChile" : ""} · {new Date(m.createdAt).toLocaleString("es-CL", { dateStyle: "short", timeStyle: "short" })}</div>
                      <div className="whitespace-pre-wrap">{m.body}</div>
                      {admin && <button className="text-xs underline opacity-70" onClick={() => remove(m.id)}>borrar</button>}
                    </div>
                  </div>
                ))}
                <div ref={end} />
              </div>
              <Textarea rows={2} placeholder="Escriba un mensaje para el equipo de este proyecto" value={text} onChange={(e) => setText(e.target.value)} />
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Solo lo ven las personas de este proyecto. Evite datos personales del cliente.</span>
                <Button size="sm" onClick={post} disabled={!text.trim()}>Enviar</Button>
              </div>
              {err && <p className="text-red-600">{err}</p>}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
