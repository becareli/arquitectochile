import { useState, type FormEvent } from "react";
import { CheckCircle2, Paperclip, Loader2 } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/useSEO";
import { trackEvent } from "@/lib/analytics";
import { CONTACT, whatsappLink } from "@/lib/site-config";
import { FORMULARIOS, type Campo } from "@/lib/formularios-config";

// Formulario genérico por servicio. Reemplaza los iframes de forms.app.
// 1) sube los archivos a Vercel Blob  2) envía todo a /api/formulario, que lo manda por correo a contacto@.

const MAX_MB = 15;
const MAX_ARCHIVOS = 6;
const inputCls =
  "w-full rounded-lg border border-[#C9D1DB] bg-white px-3 py-2.5 text-base text-[#263238] focus:border-[#F97015] focus:outline-none focus:ring-2 focus:ring-[#F97015]/30";
const labelCls = "block text-sm font-semibold text-[#1D2530] mb-1.5";

type Archivo = { campo: Campo; file: File };

async function subir(archivos: Archivo[], avance: (t: string) => void) {
  const urls: { etiqueta: string; nombre: string; url: string }[] = [];
  if (!archivos.length) return { urls, fallo: 0 };
  try {
    const { upload } = await import("@vercel/blob/client");
    for (let i = 0; i < archivos.length; i++) {
      const { campo, file } = archivos[i];
      avance(`Subiendo archivo ${i + 1} de ${archivos.length}…`);
      const limpio = file.name.normalize("NFD").replace(/[^\w.\-]+/g, "_");
      const blob = await upload(`contacto/${Date.now()}-${limpio}`, file, { access: "public", handleUploadUrl: "/api/upload" });
      urls.push({ etiqueta: campo.label, nombre: file.name, url: blob.url });
    }
    return { urls, fallo: 0 };
  } catch (e) {
    console.error("Error subiendo archivos", e);
    return { urls: [], fallo: archivos.length };
  }
}

export default function FormularioServicio({ clave }: { clave: string }) {
  const cfg = FORMULARIOS[clave];
  useSEO({ title: `${cfg.titulo} | ArquitectoChile.com`, description: cfg.intro, path: `/formulario/${clave}` });

  const [valores, setValores] = useState<Record<string, string>>({});
  const [archivos, setArchivos] = useState<Record<string, File[]>>({});
  const [aviso, setAviso] = useState<Record<string, string>>({});
  const [estado, setEstado] = useState<"editando" | "enviando" | "listo" | "error">("editando");
  const [progreso, setProgreso] = useState("");
  const [fallaron, setFallaron] = useState(0);

  const visible = (c: Campo) => !c.siCampo || valores[c.siCampo.name] === c.siCampo.valor;
  const set = (n: string, v: string) => setValores((p) => ({ ...p, [n]: v }));

  function elegir(c: Campo, lista: FileList | null) {
    if (!lista) return;
    const nuevos = Array.from(lista);
    const buenos = nuevos.filter((f) => f.size <= MAX_MB * 1024 * 1024 && (!c.soloPdf || f.type === "application/pdf"));
    const rechazados = nuevos.length - buenos.length;
    const todos = [...(c.multiple ? archivos[c.name] || [] : []), ...buenos].slice(0, c.multiple ? MAX_ARCHIVOS : 1);
    setArchivos((p) => ({ ...p, [c.name]: todos }));
    setAviso((p) => ({
      ...p,
      [c.name]: rechazados ? `${rechazados} archivo(s) no se agregaron (máximo ${MAX_MB} MB${c.soloPdf ? ", solo PDF" : ""}).` : "",
    }));
  }

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const faltaArchivo = cfg.campos.find((c) => c.tipo === "archivo" && c.requerido && visible(c) && !(archivos[c.name]?.length));
    if (faltaArchivo) {
      setAviso((p) => ({ ...p, [faltaArchivo.name]: "Este archivo es obligatorio." }));
      document.getElementById(`campo-${faltaArchivo.name}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setEstado("enviando");
    const aSubir: Archivo[] = cfg.campos
      .filter((c) => c.tipo === "archivo" && visible(c))
      .flatMap((c) => (archivos[c.name] || []).map((file) => ({ campo: c, file })));
    const { urls, fallo } = await subir(aSubir, setProgreso);
    setFallaron(fallo);
    setProgreso("Enviando su solicitud…");

    const respuestas = cfg.campos
      .filter((c) => c.tipo !== "archivo" && visible(c))
      .map((c) => ({ p: c.label, r: valores[c.name] || "" }));
    try {
      const res = await fetch("/api/formulario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          servicio: clave,
          nombre: valores.nombre,
          correo: valores.correo,
          telefono: valores.telefono,
          respuestas,
          adjuntos: urls,
          adjuntosFallaron: fallo,
          empresa_web: valores.empresa_web || "",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      trackEvent("generate_lead", { formulario: clave, con_adjuntos: urls.length > 0 });
      setEstado("listo");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setEstado("error");
    }
  }

  const campo = (c: Campo) => {
    if (!visible(c)) return null;
    const req = !!c.requerido;
    return (
      <div key={c.name} id={`campo-${c.name}`}>
        {c.tipo === "opciones" ? (
          <fieldset>
            <legend className={labelCls}>{c.label}</legend>
            {c.ayuda && <p className="text-xs text-[#5B6573] mb-2">{c.ayuda}</p>}
            <div className="grid gap-2">
              {c.opciones!.map((o) => (
                <label key={o} className="flex items-center gap-3 rounded-lg border border-[#D8DEE6] px-3 py-2.5 cursor-pointer hover:border-[#F97015] has-[:checked]:border-[#F97015] has-[:checked]:bg-orange-50">
                  <input type="radio" name={c.name} value={o} required={req} checked={valores[c.name] === o} onChange={() => set(c.name, o)} className="accent-[#F97015]" />
                  <span className="text-sm text-[#263238]">{o}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : (
          <>
            <label htmlFor={c.name} className={labelCls}>{c.label}{req ? " *" : ""}</label>
            {c.ayuda && <p className="text-xs text-[#5B6573] mb-1.5">{c.ayuda}</p>}
            {c.tipo === "largo" ? (
              <textarea id={c.name} rows={4} required={req} className={inputCls} value={valores[c.name] || ""} onChange={(e) => set(c.name, e.target.value)} />
            ) : c.tipo === "lista" ? (
              <select id={c.name} required={req} className={inputCls} value={valores[c.name] || ""} onChange={(e) => set(c.name, e.target.value)}>
                <option value="">Seleccione…</option>
                {c.opciones!.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : c.tipo === "archivo" ? (
              <div>
                <label className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#9AA6B5] px-4 py-3 text-sm text-[#1D2530] cursor-pointer hover:border-[#F97015]">
                  <Paperclip className="w-4 h-4" />
                  {c.multiple ? "Elegir archivos" : "Elegir archivo"}
                  <input
                    type="file"
                    className="sr-only"
                    multiple={c.multiple}
                    accept={c.soloPdf ? "application/pdf" : "application/pdf,image/*"}
                    onChange={(e) => { elegir(c, e.target.files); e.target.value = ""; }}
                  />
                </label>
                <ul className="mt-2 space-y-1 text-sm text-[#263238]">
                  {(archivos[c.name] || []).map((f, i) => (
                    <li key={i} className="flex items-center justify-between gap-2">
                      <span className="truncate">{f.name}</span>
                      <button type="button" className="text-[#C2410C] underline text-xs" onClick={() => setArchivos((p) => ({ ...p, [c.name]: p[c.name].filter((_, j) => j !== i) }))}>Quitar</button>
                    </li>
                  ))}
                </ul>
                {aviso[c.name] && <p className="mt-1 text-xs text-[#C2410C]">{aviso[c.name]}</p>}
              </div>
            ) : (
              <input
                id={c.name}
                type="text"
                inputMode={c.tipo === "numero" ? "decimal" : undefined}
                required={req}
                className={inputCls}
                value={valores[c.name] || ""}
                onChange={(e) => set(c.name, e.target.value)}
              />
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      <Navigation />
      <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12 text-left">
        {estado === "listo" ? (
          <div className="bg-white rounded-2xl border border-[#E3E8EE] p-6 sm:p-10 text-center">
            <CheckCircle2 className="w-16 h-16 text-[#F97015] mx-auto mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1D2530] mb-3">Solicitud recibida</h1>
            <p className="text-[#5B6573] mb-6">{cfg.confirmacion}</p>
            {fallaron > 0 && (
              <p className="text-sm text-[#C2410C] bg-orange-50 rounded-lg p-3 mb-6">
                Sus archivos no se pudieron subir. Por favor envíemelos por WhatsApp o a {CONTACT.email}.
              </p>
            )}
            <a href={whatsappLink(`Hola, acabo de enviar el formulario: ${cfg.titulo}`)} className="inline-block rounded-lg bg-[#F97015] text-[#1D2530] font-semibold px-6 py-3">
              Escribir por WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={enviar} className="bg-white rounded-2xl border border-[#E3E8EE] p-5 sm:p-8 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1D2530] mb-2">{cfg.titulo}</h1>
              <p className="text-[#5B6573]">{cfg.intro}</p>
            </div>
            {cfg.campos.map(campo)}
            <div className="border-t border-[#E3E8EE] pt-6 space-y-5">
              {campo({ name: "nombre", label: "Nombre y apellido", tipo: "texto", requerido: true })}
              <div>
                <label htmlFor="correo" className={labelCls}>Correo electrónico *</label>
                <input id="correo" type="email" required className={inputCls} value={valores.correo || ""} onChange={(e) => set("correo", e.target.value)} />
              </div>
              <div>
                <label htmlFor="telefono" className={labelCls}>Teléfono / WhatsApp *</label>
                <input id="telefono" type="tel" required className={inputCls} value={valores.telefono || ""} onChange={(e) => set("telefono", e.target.value)} />
              </div>
              {/* Trampa para robots: las personas no ven este campo. */}
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0" value={valores.empresa_web || ""} onChange={(e) => set("empresa_web", e.target.value)} />
              <label className="flex items-start gap-3 text-sm text-[#263238]">
                <input type="checkbox" required className="mt-1 accent-[#F97015]" />
                <span>Acepto el tratamiento de mis datos según la <a href="/politica-privacidad" className="underline text-[#C2410C]">Política de Privacidad</a>.</span>
              </label>
            </div>
            {estado === "error" && (
              <p className="text-sm text-[#C2410C] bg-orange-50 rounded-lg p-3">
                No se pudo enviar. Inténtelo de nuevo o escríbame por <a className="underline" href={whatsappLink("Hola, tuve un problema con el formulario")}>WhatsApp</a>.
              </p>
            )}
            <button type="submit" disabled={estado === "enviando"} className="w-full rounded-lg bg-[#F97015] text-[#1D2530] font-semibold px-6 py-3.5 disabled:opacity-60 flex items-center justify-center gap-2">
              {estado === "enviando" ? (<><Loader2 className="w-5 h-5 animate-spin" />{progreso || "Enviando…"}</>) : cfg.textoEnvio}
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
