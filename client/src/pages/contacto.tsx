import { useState, type FormEvent } from "react";
import { CheckCircle2, Paperclip, Loader2 } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/useSEO";
import { trackEvent } from "@/lib/analytics";
import { CONTACT, whatsappLink } from "@/lib/site-config";

// ─────────────────────────────────────────────────────────────
// Formulario de contacto propio (reemplaza el iframe de forms.app).
// Flujo: 1) sube los adjuntos (si hay) a Vercel Blob  2) envía los datos a /api/contacto,
// que manda un correo a contacto@ con todo y los enlaces a los archivos.
// ─────────────────────────────────────────────────────────────

const AREAS = [
  "Diseño y Gestión Municipal",
  "Asesoría Inmobiliaria y Normativa",
  "Proyectos de Especialidades",
  "Construcción y Ejecución",
];
const TIPOS = ["Casa Habitación", "Edificio Comercial", "Bodega Industrial", "Oficinas", "Local Gastronómico", "Otro"];
const URGENCIAS = ["URGENTE: para iniciar de inmediato", "COTIZANDO: evaluando a mediano plazo"];
const CIP_OPCIONES = ["Sí, lo adjunto", "No lo tengo", "No sé qué es"];

const MAX_FILES = 8;
const MAX_MB = 15;

type Estado = "editando" | "enviando" | "listo" | "error";

const inputCls =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-[#0f172a] focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30";
const labelCls = "block text-sm font-semibold text-[#0f172a] mb-1.5";

function Opcion({ name, value, required }: { name: string; value: string; required?: boolean }) {
  return (
    <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2.5 cursor-pointer hover:border-[#f97316] has-[:checked]:border-[#f97316] has-[:checked]:bg-orange-50">
      <input type="radio" name={name} value={value} required={required} className="accent-[#f97316]" />
      <span className="text-sm text-[#0f172a]">{value}</span>
    </label>
  );
}

async function subirArchivos(archivos: File[], onProgreso: (txt: string) => void) {
  if (archivos.length === 0) return { urls: [] as { nombre: string; url: string }[], fallo: false };
  try {
    const { upload } = await import("@vercel/blob/client");
    const urls: { nombre: string; url: string }[] = [];
    for (let i = 0; i < archivos.length; i++) {
      const f = archivos[i];
      onProgreso(`Subiendo archivo ${i + 1} de ${archivos.length}…`);
      const limpio = f.name.normalize("NFD").replace(/[^\w.\-]+/g, "_");
      const blob = await upload(`contacto/${Date.now()}-${limpio}`, f, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      urls.push({ nombre: f.name, url: blob.url });
    }
    return { urls, fallo: false };
  } catch (err) {
    console.error("Error subiendo archivos", err);
    return { urls: [] as { nombre: string; url: string }[], fallo: true };
  }
}

export default function Contacto() {
  useSEO({
    title: "Contacto | Agenda tu Asesoría - ArquitectoChile.com",
    description:
      "Contacta al arquitecto Patricio Becar Elissegaray en Santiago. Agenda tu asesoría en diseño, Regularización, permisos o inspección técnica en Chile.",
    path: "/contacto",
  });

  const [estado, setEstado] = useState<Estado>("editando");
  const [progreso, setProgreso] = useState("");
  const [cip, setCip] = useState("");
  const [archivos, setArchivos] = useState<File[]>([]);
  const [avisoArchivos, setAvisoArchivos] = useState("");
  const [archivosFallaron, setArchivosFallaron] = useState(false);

  function elegirArchivos(lista: FileList | null) {
    if (!lista) return;
    const nuevos = Array.from(lista);
    const grandes = nuevos.filter((f) => f.size > MAX_MB * 1024 * 1024);
    const validos = nuevos.filter((f) => f.size <= MAX_MB * 1024 * 1024);
    const todos = [...archivos, ...validos].slice(0, MAX_FILES);
    setArchivos(todos);
    setAvisoArchivos(
      grandes.length
        ? `${grandes.length} archivo(s) superan ${MAX_MB} MB y no se agregaron.`
        : archivos.length + validos.length > MAX_FILES
          ? `Máximo ${MAX_FILES} archivos.`
          : "",
    );
  }

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const datos = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    // Los archivos van aparte (no como texto).
    delete datos.adjuntos;

    setEstado("enviando");
    const { urls, fallo } = await subirArchivos(archivos, setProgreso);
    setArchivosFallaron(fallo);
    setProgreso("Enviando tu solicitud…");

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, adjuntos: urls, adjuntosFallaron: fallo ? archivos.length : 0, pagina: document.referrer || "" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      trackEvent("generate_lead", { formulario: "contacto", area: datos.area || "", con_adjuntos: urls.length > 0 });
      setEstado("listo");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setEstado("error");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {estado === "listo" ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10 text-center">
            <CheckCircle2 className="w-16 h-16 text-[#f97316] mx-auto mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-3">¡Solicitud recibida!</h1>
            <p className="text-gray-600 mb-6">
              Revisaré tus antecedentes y te responderé por correo o WhatsApp a la brevedad.
            </p>
            {archivosFallaron && (
              <p className="text-sm text-orange-700 bg-orange-50 rounded-lg p-3 mb-6">
                Tus archivos no se pudieron subir. Por favor envíamelos por WhatsApp o a {CONTACT.email}.
              </p>
            )}
            <a
              href={whatsappLink("Hola Patricio, acabo de enviar el formulario de contacto en arquitectochile.com.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 font-bold text-white"
            >
              Escribir por WhatsApp
            </a>
          </div>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-2">Cuéntame de tu proyecto</h1>
            <p className="text-gray-600 mb-8">
              Respondo personalmente cada solicitud. Mientras más antecedentes me envíes, más precisa será mi respuesta.
            </p>

            <form onSubmit={enviar} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8 space-y-6">
              {/* Trampa para robots: un humano nunca ve ni llena este campo */}
              <input type="text" name="empresa_web" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <fieldset>
                <legend className={labelCls}>1. ¿En qué área necesitas apoyo? *</legend>
                <div className="grid sm:grid-cols-2 gap-2">
                  {AREAS.map((a) => (
                    <Opcion key={a} name="area" value={a} required />
                  ))}
                </div>
              </fieldset>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tipo" className={labelCls}>2. Tipo de edificación *</label>
                  <select id="tipo" name="tipo" required defaultValue="" className={inputCls}>
                    <option value="" disabled>Selecciona…</option>
                    {TIPOS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="superficie" className={labelCls}>3. Superficie aprox. (m²)</label>
                  <input id="superficie" name="superficie" type="number" min="0" inputMode="decimal" className={inputCls} placeholder="Opcional" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="direccion" className={labelCls}>4. Calle y número *</label>
                  <input id="direccion" name="direccion" required className={inputCls} autoComplete="street-address" />
                </div>
                <div>
                  <label htmlFor="comuna" className={labelCls}>5. Comuna y región *</label>
                  <input id="comuna" name="comuna" required className={inputCls} placeholder="Ej.: La Florida, RM" />
                </div>
              </div>

              <div>
                <label htmlFor="necesidad" className={labelCls}>6. ¿Qué necesitas hacer? *</label>
                <textarea id="necesidad" name="necesidad" required rows={4} className={inputCls} placeholder="Ej.: regularizar una ampliación de 30 m² en el patio" />
              </div>

              <fieldset>
                <legend className={labelCls}>7. ¿Qué tan urgente es? *</legend>
                <div className="grid sm:grid-cols-2 gap-2">
                  {URGENCIAS.map((u) => (
                    <Opcion key={u} name="urgencia" value={u} required />
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="presupuesto" className={labelCls}>8. Presupuesto aproximado (CLP o USD)</label>
                <input id="presupuesto" name="presupuesto" className={inputCls} placeholder="Opcional" />
              </div>

              {/* Antecedentes: opcionales, pero son la clave para evaluar el proyecto */}
              <div className="rounded-xl bg-blue-50/60 border border-blue-100 p-4 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-[#0f172a]">9. Antecedentes (opcional, pero me ayudan mucho)</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Con el Certificado de Informaciones Previas (CIP) y un plano o fotos de la construcción puedo darte una
                    respuesta mucho más precisa, sobre todo si es una ampliación o una Regularización.
                  </p>
                </div>
                <fieldset>
                  <legend className="text-sm text-[#0f172a] mb-2">¿Tienes el CIP de la propiedad?</legend>
                  <div className="grid sm:grid-cols-3 gap-2" onChange={(e) => setCip((e.target as HTMLInputElement).value)}>
                    {CIP_OPCIONES.map((c) => (
                      <Opcion key={c} name="cip" value={c} />
                    ))}
                  </div>
                  {cip === "No sé qué es" && (
                    <p className="text-xs text-gray-600 mt-2">
                      Es un documento que entrega la Dirección de Obras de tu comuna con las normas que aplican a tu terreno. Si no lo tienes, no te preocupes: te oriento.
                    </p>
                  )}
                </fieldset>
                <div>
                  <label htmlFor="adjuntos" className="flex items-center gap-2 text-sm font-semibold text-[#0f172a] mb-1.5">
                    <Paperclip className="w-4 h-4" /> CIP, planos o fotos (PDF, JPG o PNG)
                  </label>
                  <input
                    id="adjuntos"
                    name="adjuntos"
                    type="file"
                    multiple
                    accept=".pdf,image/*"
                    onChange={(e) => elegirArchivos(e.target.files)}
                    className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-[#0f172a] file:px-4 file:py-2 file:text-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">Hasta {MAX_FILES} archivos de {MAX_MB} MB cada uno. Puedes sacar las fotos con el celular.</p>
                  {archivos.length > 0 && (
                    <ul className="mt-2 text-sm text-[#0f172a] space-y-1">
                      {archivos.map((f, i) => (
                        <li key={i} className="flex justify-between gap-2">
                          <span className="truncate">{f.name}</span>
                          <button type="button" className="text-gray-500 hover:text-red-600" onClick={() => setArchivos(archivos.filter((_, j) => j !== i))}>
                            Quitar
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {avisoArchivos && <p className="text-xs text-orange-700 mt-1">{avisoArchivos}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="nombre" className={labelCls}>10. Nombre completo *</label>
                  <input id="nombre" name="nombre" required className={inputCls} autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="correo" className={labelCls}>11. Correo *</label>
                  <input id="correo" name="correo" type="email" required className={inputCls} autoComplete="email" />
                </div>
                <div>
                  <label htmlFor="telefono" className={labelCls}>12. Teléfono / WhatsApp *</label>
                  <input id="telefono" name="telefono" type="tel" required className={inputCls} autoComplete="tel" placeholder="+56 9 …" />
                </div>
              </div>

              <label className="flex items-start gap-3 text-sm text-gray-600">
                <input type="checkbox" name="acepta" value="sí" required className="mt-1 accent-[#f97316]" />
                <span>
                  Acepto que mis datos se usen para responder esta solicitud, según la{" "}
                  <a href="/politica-privacidad" className="underline">política de privacidad</a>.
                </span>
              </label>

              {estado === "error" && (
                <p className="text-sm text-red-700 bg-red-50 rounded-lg p-3">
                  No se pudo enviar. Inténtalo de nuevo o escríbeme por{" "}
                  <a className="underline" href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>{" "}
                  o a {CONTACT.email}.
                </p>
              )}

              <button
                type="submit"
                disabled={estado === "enviando"}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#f97316] px-5 py-3.5 text-base font-bold text-white hover:bg-orange-600 disabled:opacity-70"
              >
                {estado === "enviando" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> {progreso}
                  </>
                ) : (
                  "Enviar solicitud"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              ¿Prefieres hablar directo?{" "}
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0f172a] underline">WhatsApp</a>{" "}
              · <a href={`tel:${CONTACT.phoneE164}`} className="font-semibold text-[#0f172a] underline">{CONTACT.phoneDisplay}</a>{" "}
              · <a href={`mailto:${CONTACT.email}`} className="font-semibold text-[#0f172a] underline">{CONTACT.email}</a>
            </p>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
