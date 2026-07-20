import { useState, useRef } from "react";
import Navigation from "@/components/navigation";
import fotoPBE from "@assets/FotoPBE_1774406857562.jpg";
import { useSEO } from "@/hooks/useSEO";

const svcData = {
  particular: [
    { n: "Asesoria de Arquitecto a domicilio", i: null },
    { n: "Diseno de ampliaciones de casas", i: null },
    { n: "Diseno de remodelacion", i: null },
    { n: "Inspeccion Tecnica de Viviendas", i: null },
    { n: "Tasacion de Viviendas Urbanas", i: null },
    { n: "Reacondicionamiento Termico / EIFS", i: null },
    { n: "Proyecto desde Cero", i: null },
  ],
  normativa: [
    { n: "Fusion de Terrenos Urbanos", i: null },
    { n: "Subdivision de Terrenos Urbanos", i: null },
    { n: "Regularizacion de Inmuebles (Ley del Mono)", i: null },
    { n: "Permiso de Edificacion y Recepcion Final", i: null },
    { n: "Revisor Independiente de Arquitectura", i: null },
  ],
  empresa: [
    { n: "Obras Menores para Empresas", i: null },
    { n: "Revisoria Independiente de Arquitectura", i: null },
    { n: "Inspeccion Tecnica de Obras (ITO)", i: null },
    { n: "Diseno de Arquitectura para Empresas", i: null },
    { n: "Permiso de Edificacion y Regularizacion", i: null },
    { n: "Gestion Integral de Proyectos", i: null },
  ],
};

const etapas = [
  "Solo estoy cotizando",
  "Necesito empezar pronto",
  "Es urgente",
  "Ya tengo proyecto, necesito apoyo técnico",
];

type Branch = "empresa" | "particular" | "normativa" | "";
type Step = 1 | 2 | 3 | 4 | 5;

export default function Contacto() {
  useSEO({
    title: "Contacto | Agenda tu Asesoría - ArquitectoChile.com",
    description: "Contacta al arquitecto Patricio Becar Elissegaray en Santiago. Agenda tu asesoría en diseño, regularización, permisos o inspección técnica en Chile.",
    path: "/contacto",
  });

  const [step, setStep] = useState<Step>(1);
  const [branch, setBranch] = useState<Branch>("");
  const [service, setService] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [direccion, setDireccion] = useState("");
  const [comuna, setComuna] = useState("");
  const [rol, setRol] = useState("");
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [etapa, setEtapa] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [hasAudio, setHasAudio] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speech, setSpeech] = useState(
    '¡Hola! Soy <b>Agustín</b>, asistente del Arquitecto Patricio Becar.<br/><br/>Seleccione el área que mejor describe su necesidad:'
  );
  const [showAvatar, setShowAvatar] = useState(true);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  function selectBranch(b: Branch) {
    setBranch(b);
    if (b === "empresa") {
      setSpeech('Perfecto, trabajamos con empresas e instituciones a diario. <b>¿En qué área necesitan apoyo técnico?</b>');
    } else if (b === "normativa") {
      setSpeech('Entendido. Somos especialistas en gestión normativa ante DOM, SII y CBR.<br/><br/><b>¿Qué trámite necesitas gestionar?</b><br/><span style="font-size:0.85rem;color:#64748b">Si viste alguno de nuestros videos en YouTube, indícalo para priorizar tu caso.</span>');
    } else {
      setSpeech('Excelente, ayudamos a familias a construir sus sueños de forma legal y segura. <b>¿Qué necesitas hacer?</b>');
    }
    setStep(2);
  }

  function selectService(s: string) {
    setService(s);
    setSpeech('Necesito tus datos de contacto y <b>ubicación del proyecto.</b>');
    setStep(3);
  }

  function goToDetails() {
    if (!nombre.trim() || !email.trim() || !comuna.trim()) {
      setFormError("Por favor completa nombre, email y comuna.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Por favor ingresa un email válido.");
      return;
    }
    setFormError("");
    setSpeech('Cuéntame un poco más acerca de esta propiedad y <b>qué es lo que realmente necesitas.</b>');
    setStep(4);
  }

  function toggleAudio() {
    if (!isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          audioChunksRef.current = [];
          recorder.ondataavailable = (e) => {
            if (e.data.size > 0) audioChunksRef.current.push(e.data);
          };
          recorder.onstop = () => {
            setHasAudio(true);
            setIsRecording(false);
            stream.getTracks().forEach((t) => t.stop());
          };
          recorder.start();
          mediaRecorderRef.current = recorder;
          setIsRecording(true);
        })
        .catch(() => alert("No se pudo acceder al micrófono."));
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  }

  function submitLead() {
    if (!nombre.trim() || !email.trim()) {
      setFormError("Nombre y email son obligatorios.");
      return;
    }
    setFormError("");
    setIsSubmitting(true);

    const sendPayload = (audioBase64?: string) => {
      const payload = {
        nombre,
        email,
        telefono,
        comuna,
        tipo_proyecto: service || "General",
        etapa,
        presupuesto,
        mensaje,
        branch,
        service,
        propertyType,
        direccion,
        rol,
        rut,
        honeypot,
        ...(audioBase64 ? { audioBase64 } : {}),
      };

      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((r) => r.json())
        .then((d) => console.log("Lead enviado:", d))
        .catch((e) => console.warn("Error:", e))
        .finally(() => setIsSubmitting(false));
    };

    if (audioChunksRef.current.length > 0) {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(",")[1];
        sendPayload(base64);
      };
      reader.readAsDataURL(audioBlob);
    } else {
      sendPayload();
    }

    setShowAvatar(false);
    setSpeech('<b>¡Solicitud recibida!</b><br/>Analizaremos tu caso de inmediato.');
    setStep(5);
  }

  function downloadVCard() {
    const vcard =
      "BEGIN:VCARD\nVERSION:3.0\nFN:Patricio Becar Elissegaray\nORG:ArquitectoChile.com\nTITLE:Arquitecto U. de Chile (Desde 1999)\nTEL;TYPE=CELL:+56979316827\nEMAIL:contacto@arquitectochile.com\nEMAIL:arquitectopatriciobecar@gmail.com\nURL:https://arquitectochile.com\nEND:VCARD";
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Patricio_Becar.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const services = branch ? svcData[branch as keyof typeof svcData] : [];

  return (
    <>
    <Navigation />
    <h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
      Contacto - Agenda tu Asesoría con el Arquitecto Patricio Becar Elissegaray
    </h1>
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#fff",
          borderRadius: "2rem",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "linear-gradient(180deg, #f0f9ff 0%, #fff 100%)",
            padding: "2rem 1.5rem 1.5rem",
            textAlign: "center",
            borderBottom: "2px solid #e0f2fe",
          }}
        >
          {showAvatar && (
            <div style={{ position: "relative", display: "inline-block", marginBottom: "1.25rem" }}>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop"
                alt="Agustín"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  border: "4px solid #bae6fd",
                  boxShadow: "0 8px 30px rgba(37,99,235,0.2)",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  width: 22,
                  height: 22,
                  background: "#22c55e",
                  border: "3px solid #fff",
                  borderRadius: "50%",
                }}
              />
            </div>
          )}
          {showAvatar && (
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: "0.75rem",
              }}
            >
              Asistente Virtual
            </p>
          )}
          <div
            style={{
              position: "relative",
              background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
              border: "1.5px solid #bae6fd",
              borderRadius: "1.25rem",
              padding: "1.15rem 1.25rem",
              maxWidth: 380,
              margin: "0 auto",
            }}
          >
            <p
              style={{ fontSize: "1rem", fontWeight: 500, color: "#1e3a5f", lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{ __html: speech }}
            />
          </div>
        </div>

        {step === 1 && (
          <div style={{ padding: "1.5rem", animation: "fadeIn 0.4s ease-out" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <button onClick={() => selectBranch("particular")} style={branchBtnStyle}>
                <div>
                  <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#c2410c", display: "block" }}>
                    Vivienda Particular
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    Diseño, inspección, tasación y asesoría a domicilio
                  </span>
                </div>
              </button>
              <button onClick={() => selectBranch("normativa")} style={branchBtnStyle}>
                <div>
                  <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#2563eb", display: "block" }}>
                    Gestion Normativa
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    Fusión, subdivisión, regularización y permisos
                  </span>
                </div>
              </button>
              <button onClick={() => selectBranch("empresa")} style={branchBtnStyle}>
                <div>
                  <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1e3a5f", display: "block" }}>
                    Empresa
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    Obras menores, ITO y gestión de proyectos
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ padding: "1.5rem", animation: "fadeIn 0.4s ease-out" }}>
            {branch === "normativa" && (
              <div style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe", borderRadius: "0.85rem", padding: "0.85rem 1rem", marginBottom: "1rem", fontSize: "0.8rem", color: "#1e40af", lineHeight: 1.5 }}>
                <b>¿Viste un trámite en YouTube?</b> Selecciónalo a continuación. Priorizamos casos que llegan informados.
              </div>
            )}
            <div style={{ maxHeight: 420, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {services.map((s) => (
                <button key={s.n} onClick={() => selectService(s.n)} style={serviceBtnStyle}>
                  <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{s.i}</span>
                  <span>{s.n}</span>
                </button>
              ))}
              <button
                onClick={() => selectService("Otro / No encuentro lo que busco")}
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  border: "2px dashed #cbd5e1",
                  borderRadius: "1rem",
                  background: "#fafafa",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginTop: "0.5rem",
                }}
              >
                ¿No encuentras lo que buscas? Escríbenos
              </button>
            </div>
            <button
              onClick={() => {
                setSpeech(
                  '¡Hola! Soy <b>Agustín</b>, asistente del Arquitecto Patricio Becar.<br/><br/>Seleccione el área que mejor describe su necesidad:'
                );
                setStep(1);
              }}
              style={backBtnStyle}
            >
              ← Volver
            </button>
          </div>
        )}

        {step === 3 && (
          <div style={{ padding: "1.5rem", animation: "fadeIn 0.4s ease-out" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", textAlign: "center", marginBottom: "1.25rem", letterSpacing: "0.15em" }}>
              Tus Datos y Ubicación
            </p>
            {formError && (
              <p style={{ fontSize: "0.8rem", color: "#dc2626", fontWeight: 600, marginBottom: "0.75rem", textAlign: "center" }}>
                {formError}
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input type="text" placeholder="Tu nombre completo *" value={nombre} onChange={(e) => setNombre(e.target.value)} style={inputStyle} />
              <input type="email" placeholder="Tu email *" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
              <input type="tel" placeholder="Teléfono / WhatsApp (ej: +56912345678)" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={inputStyle} />
              <input type="text" placeholder="Comuna *" value={comuna} onChange={(e) => setComuna(e.target.value)} style={inputStyle} />
              <input type="text" placeholder="Calle y número (opcional)" value={direccion} onChange={(e) => setDireccion(e.target.value)} style={inputStyle} />
              {branch === "normativa" && (
                <input type="text" placeholder="ROL de la propiedad (SII) *" value={rol} onChange={(e) => setRol(e.target.value)} style={{ ...inputStyle, borderColor: "#bfdbfe" }} />
              )}
              {branch === "empresa" && (
                <input type="text" placeholder="RUT de la empresa *" value={rut} onChange={(e) => setRut(e.target.value)} style={{ ...inputStyle, borderColor: "#d1d5db" }} />
              )}
              {branch === "particular" && (
                <input type="text" placeholder="ROL de la propiedad (opcional)" value={rol} onChange={(e) => setRol(e.target.value)} style={inputStyle} />
              )}
              <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, tabIndex: -1 } as any} autoComplete="off" tabIndex={-1} />
            </div>
            <div style={{ marginTop: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.6rem", color: "#334155" }}>
                ¿Qué tipo de propiedad es?
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                {["Vivienda", "Comercial", "Industrial"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setPropertyType(t)}
                    style={{
                      padding: "0.85rem 0.5rem",
                      border: `2px solid ${propertyType === t ? "#2563eb" : "#e2e8f0"}`,
                      borderRadius: "0.85rem",
                      background: propertyType === t ? "#2563eb" : "#fff",
                      color: propertyType === t ? "#fff" : "#334155",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      textAlign: "center",
                    }}
                  >
                    {t === "Comercial" ? "Local" : t === "Industrial" ? "Industria" : t}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={goToDetails} style={{ ...primaryBtnStyle, marginTop: "1.25rem" }}>
              Siguiente →
            </button>
            <button
              onClick={() => {
                if (branch === "empresa") {
                  setSpeech('Perfecto, trabajamos con empresas e instituciones a diario. <b>¿En qué área necesitan apoyo técnico?</b>');
                } else if (branch === "normativa") {
                  setSpeech('Entendido. Somos especialistas en gestión normativa ante DOM, SII y CBR.<br/><br/><b>¿Qué trámite necesitas gestionar?</b><br/><span style="font-size:0.85rem;color:#64748b">Si viste alguno de nuestros videos en YouTube, indícalo para priorizar tu caso.</span>');
                } else {
                  setSpeech('Excelente, ayudamos a familias a construir sus sueños de forma legal y segura. <b>¿Qué necesitas hacer?</b>');
                }
                setStep(2);
              }}
              style={backBtnStyle}
            >
              ← Volver a servicios
            </button>
          </div>
        )}

        {step === 4 && (
          <div style={{ padding: "1.5rem", animation: "fadeIn 0.4s ease-out" }}>
            {formError && (
              <p style={{ fontSize: "0.8rem", color: "#dc2626", fontWeight: 600, marginBottom: "0.75rem", textAlign: "center" }}>
                {formError}
              </p>
            )}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.6rem", color: "#334155" }}>
                ¿En qué etapa estás?
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {etapas.map((e) => (
                  <button
                    key={e}
                    onClick={() => setEtapa(e)}
                    style={{
                      padding: "0.75rem 1rem",
                      border: `2px solid ${etapa === e ? "#2563eb" : "#e2e8f0"}`,
                      borderRadius: "0.85rem",
                      background: etapa === e ? "#2563eb" : "#fff",
                      color: etapa === e ? "#fff" : "#334155",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                      textAlign: "left",
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              placeholder="Presupuesto estimado (opcional)"
              value={presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)}
              style={{ ...inputStyle, marginBottom: "0.75rem" }}
            />
            <textarea
              placeholder="Describe tu situación actual, qué quieres lograr, plazos, y cualquier detalle importante..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              style={{ ...inputStyle, height: 120, resize: "none", lineHeight: 1.6 }}
            />
            <p style={{ fontSize: "0.75rem", color: "#94a3b8", textAlign: "center", marginTop: "0.5rem" }}>
              Mientras más detalles nos des, mejor podremos ayudarte
            </p>
            {hasAudio && (
              <p style={{ fontSize: "0.8rem", color: "#10b981", fontWeight: 600, marginTop: "0.5rem", textAlign: "center" }}>
                Audio grabado correctamente
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
              <button
                onClick={toggleAudio}
                style={{
                  ...audioBtnStyle,
                  background: isRecording
                    ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                    : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                }}
              >
                {isRecording ? "Detener grabacion" : hasAudio ? "Grabar de nuevo" : "Grabar Mensaje de Audio"}
              </button>
              <button onClick={submitLead} disabled={isSubmitting} style={{ ...sendBtnStyle, opacity: isSubmitting ? 0.6 : 1 }}>
                {isSubmitting ? "Enviando..." : "Enviar mi Solicitud"}
              </button>
            </div>
            <button
              onClick={() => {
                setSpeech('Necesito tus datos de contacto y <b>ubicación del proyecto.</b>');
                setStep(3);
              }}
              style={backBtnStyle}
            >
              ← Volver a datos
            </button>
          </div>
        )}

        {step === 5 && (
          <div style={{ padding: "2.5rem 1.5rem", textAlign: "center", background: "linear-gradient(180deg, #f8fafc 0%, #fff 100%)", animation: "fadeIn 0.4s ease-out" }}>
            <img
              src={fotoPBE}
              alt="Arq. Patricio Becar Elissegaray"
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                border: "5px solid #2563eb",
                objectFit: "cover",
                boxShadow: "0 20px 50px rgba(37,99,235,0.2)",
                marginBottom: "1.25rem",
              }}
            />
            <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a" }}>Gracias, recibimos tu solicitud.</p>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#475569", fontStyle: "italic", lineHeight: 1.5, marginTop: "0.5rem" }}>
              "Tu proyecto ahora está en manos expertas."
            </p>
            <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "1rem", lineHeight: 1.8 }}>
              <b style={{ color: "#1e293b" }}>Patricio Becar Elissegaray</b>
              <br />
              Arquitecto U. de Chile desde 1999
              <br />
              Revisor Independiente MINVU
            </div>
            <div
              style={{
                marginTop: "1rem",
                padding: "0.85rem 1rem",
                background: "#f0f9ff",
                border: "1px solid #bae6fd",
                borderRadius: "1rem",
                fontSize: "0.82rem",
                lineHeight: 2,
              }}
            >
              <a href="mailto:contacto@arquitectochile.com" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>
                contacto@arquitectochile.com
              </a>
              <br />
              <a href="mailto:arquitectopatriciobecar@gmail.com" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>
                arquitectopatriciobecar@gmail.com
              </a>
            </div>
            <div
              style={{
                margin: "1.25rem 0",
                padding: "1rem 1.15rem",
                background: "#fffbeb",
                border: "1.5px solid #fde68a",
                borderRadius: "1rem",
                fontSize: "0.78rem",
                color: "#92400e",
                textAlign: "left",
                lineHeight: 1.5,
              }}
            >
              <b>IMPORTANTE:</b> Patricio o alguien de su equipo se contactara directamente con usted por telefono. Por favor,{" "}
              <b>descargue su contacto</b> para que la llamada no sea bloqueada como spam.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button onClick={downloadVCard} style={vcardBtnStyle}>
                GUARDAR CONTACTO DE PATRICIO
              </button>
              <a
                href="https://tidycal.com/arquitectopatriciobecar/"
                target="_blank"
                rel="noopener noreferrer"
                style={tidycalBtnStyle}
              >
                AGENDAR VIDEOLLAMADA
              </a>
            </div>
            <a href="/" style={{ ...backBtnStyle, display: "block", marginTop: "2rem", textDecoration: "none" }}>
              ← Volver a la Web Principal
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
    </>
  );
}

const branchBtnStyle: React.CSSProperties = {
  width: "100%",
  padding: "1.25rem 1.5rem",
  border: "2px solid #e2e8f0",
  borderRadius: "1.25rem",
  background: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  textAlign: "left",
  fontFamily: "inherit",
};

const serviceBtnStyle: React.CSSProperties = {
  width: "100%",
  padding: "1rem 1.15rem",
  border: "2px solid #e2e8f0",
  borderRadius: "1rem",
  background: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "0.85rem",
  textAlign: "left",
  fontFamily: "inherit",
  fontWeight: 600,
  fontSize: "0.88rem",
  color: "#334155",
  lineHeight: 1.4,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.95rem 1.1rem",
  background: "#f8fafc",
  border: "1.5px solid #e2e8f0",
  borderRadius: "0.85rem",
  fontFamily: "inherit",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
};

const primaryBtnStyle: React.CSSProperties = {
  width: "100%",
  padding: "1.1rem",
  border: "none",
  borderRadius: "1rem",
  background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
  color: "#fff",
  fontFamily: "inherit",
  fontWeight: 700,
  fontSize: "0.95rem",
  cursor: "pointer",
};

const audioBtnStyle: React.CSSProperties = {
  width: "100%",
  padding: "1.1rem",
  border: "none",
  borderRadius: "1rem",
  color: "#fff",
  fontFamily: "inherit",
  fontWeight: 700,
  fontSize: "0.95rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.6rem",
};

const sendBtnStyle: React.CSSProperties = {
  width: "100%",
  padding: "1.1rem",
  border: "none",
  borderRadius: "1rem",
  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
  color: "#fff",
  fontFamily: "inherit",
  fontWeight: 700,
  fontSize: "0.95rem",
  cursor: "pointer",
};

const vcardBtnStyle: React.CSSProperties = {
  width: "100%",
  padding: "1.1rem",
  border: "none",
  borderRadius: "1rem",
  background: "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
  color: "#fff",
  fontFamily: "inherit",
  fontWeight: 700,
  fontSize: "0.9rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.6rem",
};

const tidycalBtnStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "1.1rem",
  border: "none",
  borderRadius: "1rem",
  background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
  color: "#fff",
  fontFamily: "inherit",
  fontWeight: 700,
  fontSize: "0.9rem",
  cursor: "pointer",
  textDecoration: "none",
  textAlign: "center",
};

const backBtnStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  textAlign: "center",
  color: "#94a3b8",
  fontSize: "0.78rem",
  cursor: "pointer",
  background: "none",
  border: "none",
  fontFamily: "inherit",
  marginTop: "1.25rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontWeight: 700,
};
