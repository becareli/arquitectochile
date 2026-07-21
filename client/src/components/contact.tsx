import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, ArrowRight, ChevronRight, Save, Phone, Mail, CalendarDays } from "lucide-react";

type Branch = "" | "empresa" | "particular";

interface LeadData {
  branch: Branch;
  service: string;
  budget: string;
  calle: string;
  comuna: string;
  rol: string;
  observaciones: string;
  hasAudio: boolean;
  nombre: string;
  email: string;
  telefono: string;
}

const fadeSlide = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

const empresaServices = [
  { name: "Revisoria Indep.", icon: null },
  { name: "ITO Obras", icon: null },
  { name: "Proy. Electricos", icon: null },
  { name: "Proyectos Gas", icon: null },
  { name: "Subdivision", icon: null },
  { name: "Loteos", icon: null },
  { name: "Diseno 3D", icon: null },
];

const particularServices = [
  { name: "Asesoria Terreno", icon: null },
  { name: "Ampliaciones", icon: null },
  { name: "Remodelacion", icon: null },
  { name: "Ley del Mono", icon: null },
  { name: "Fusion/Subdiv.", icon: null },
  { name: "Permisos/3D", icon: null },
  { name: "Revisor Indep.", icon: null },
  { name: "Agua/Alcant.", icon: null },
  { name: "Electricidad/Gas", icon: null },
  { name: "Proyecto desde Cero", icon: null },
];

function generateVCard() {
  const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:Patricio Becar Elissegaray\nORG:ArquitectoChile.com\nTITLE:Arquitecto U. de Chile | Revisor Independiente MINVU\nTEL;TYPE=CELL:+56979316827\nEMAIL:contacto@arquitectochile.com\nURL:https://arquitectochile.com\nEND:VCARD`;
  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Patricio_Becar_ArquitectoChile.vcf";
  a.click();
  URL.revokeObjectURL(url);
}

export default function Contact() {
  const [step, setStep] = useState<"inicio" | "servicios" | "budget" | "form" | "thanks">("inicio");
  const [isRecording, setIsRecording] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioBase64Ref = useRef<string>("");

  const [data, setData] = useState<LeadData>({
    branch: "",
    service: "",
    budget: "",
    calle: "",
    comuna: "",
    rol: "",
    observaciones: "",
    hasAudio: false,
    nombre: "",
    email: "",
    telefono: "",
  });

  const [speechText, setSpeechText] = useState(
    'Hola, soy <b>Agustin</b>, asistente de Patricio. Selecciona el area que mejor describe tu necesidad:'
  );

  const selectBranch = (b: Branch) => {
    setData(prev => ({ ...prev, branch: b }));
    setSpeechText(
      b === "empresa"
        ? 'Entendido. Trabajamos con empresas e instituciones a diario. <b>Selecciona el servicio que necesitas:</b>'
        : 'Excelente. Ayudamos a familias a construir sus suenos de forma legal y segura. <b>Que necesitas hacer?</b>'
    );
    setStep("servicios");
  };

  const selectService = (s: string) => {
    setData(prev => ({ ...prev, service: s }));
    if (s === "Proyecto desde Cero") {
      setStep("budget");
    } else {
      setSpeechText('Perfecto. Ahora ingresa los siguientes datos de tu propiedad y cuentanos mas.');
      setStep("form");
    }
  };

  const setBudget = (b: string) => {
    setData(prev => ({ ...prev, budget: b }));
    setSpeechText('Perfecto. Ahora ingresa los siguientes datos de tu propiedad y cuentanos mas.');
    setStep("form");
  };

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      audioBase64Ref.current = "";
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(",")[1];
          audioBase64Ref.current = base64;
        };
        reader.readAsDataURL(audioBlob);
        setAudioReady(true);
        setData(prev => ({ ...prev, hasAudio: true }));
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      alert("No se pudo acceder al microfono. Verifica los permisos de tu navegador.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  }, []);

  const submitLead = async () => {
    setFormError("");
    if (!data.nombre.trim()) {
      setFormError("Ingresa tu nombre completo.");
      return;
    }
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setFormError("Ingresa un email valido.");
      return;
    }
    if (!data.calle.trim() || !data.comuna.trim()) {
      setFormError("Calle y comuna son obligatorios.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono || "",
      comuna: data.comuna,
      tipo_proyecto: data.service || "General",
      etapa: "",
      presupuesto: data.budget || "",
      mensaje: data.observaciones || "",
      branch: data.branch,
      service: data.service,
      propertyType: "",
      direccion: data.calle,
      rol: data.rol || "",
      honeypot: "",
      ...(audioBase64Ref.current ? { audioBase64: audioBase64Ref.current } : {}),
    };

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "";
      const res = await fetch(`${apiBase}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error del servidor");
      await res.json();
      setSpeechText('<b>Solicitud enviada con exito.</b> Te contactaremos pronto.');
      setStep("thanks");
    } catch {
      setFormError("Hubo un error al enviar. Intenta de nuevo o escribenos a contacto@arquitectochile.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStep("inicio");
    setAudioReady(false);
    setIsRecording(false);
    setIsSubmitting(false);
    setFormError("");
    audioBase64Ref.current = "";
    setData({ branch: "", service: "", budget: "", calle: "", comuna: "", rol: "", observaciones: "", hasAudio: false, nombre: "", email: "", telefono: "" });
    setSpeechText('Hola, soy <b>Agustin</b>, asistente de Patricio. Selecciona el area que mejor describe tu necesidad:');
  };

  const currentServices = data.branch === "empresa" ? empresaServices : particularServices;

  return (
    <section id="contacto" className="min-h-screen flex items-center justify-center p-4 sm:py-20" style={{ background: "#f8fafc" }}>
      <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden border border-gray-100" style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>

        <div className="bg-gray-50 p-6 text-center border-b border-gray-100">
          {step !== "thanks" && (
            <div className="relative inline-block">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop"
                className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover mx-auto"
                alt="Agustin"
              />
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#f97316] border-2 border-white rounded-full" />
            </div>
          )}
          <p
            className="mt-4 text-gray-700 font-medium leading-snug text-[15px]"
            dangerouslySetInnerHTML={{ __html: speechText }}
          />
        </div>

        <AnimatePresence mode="wait">

          {step === "inicio" && (
            <motion.div key="inicio" {...fadeSlide} className="p-6 grid grid-cols-1 gap-4">
              <button
                type="button"
                onClick={() => selectBranch("empresa")}
                className="p-6 rounded-2xl text-left flex items-center gap-4 border-2 border-gray-200 bg-white transition-all duration-200 hover:border-[#0f172a] hover:bg-slate-50 hover:scale-[1.02] cursor-pointer"
              >
                <span className="w-12 h-12 rounded-xl bg-[#0f172a]/5 flex items-center justify-center">
                  <ChevronRight className="w-6 h-6 text-[#0f172a]" />
                </span>
                <div>
                  <b className="block text-[#0f172a]">Empresa / Institucion</b>
                  <span className="text-xs text-gray-500">Proyectos corporativos y tecnicos</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => selectBranch("particular")}
                className="p-6 rounded-2xl text-left flex items-center gap-4 border-2 border-gray-200 bg-white transition-all duration-200 hover:border-[#f97316] hover:bg-orange-50 hover:scale-[1.02] cursor-pointer"
              >
                <span className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <ChevronRight className="w-6 h-6 text-[#f97316]" />
                </span>
                <div>
                  <b className="block text-[#f97316]">Proyecto Particular</b>
                  <span className="text-xs text-gray-500">Casas, ampliaciones y tramites</span>
                </div>
              </button>
            </motion.div>
          )}

          {step === "servicios" && (
            <motion.div key="servicios" {...fadeSlide} className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {currentServices.map(svc => (
                  <button
                    key={svc.name}
                    type="button"
                    onClick={() => selectService(svc.name)}
                    className="p-3 border rounded-xl flex flex-col items-center text-xs font-bold hover:bg-gray-50 transition-all cursor-pointer bg-white text-center leading-tight"
                  >
                    {svc.name}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => selectService("Especial")}
                  className="col-span-2 p-3 border-2 border-dashed rounded-xl text-gray-400 text-xs font-bold uppercase mt-2 cursor-pointer hover:bg-gray-50 transition-all bg-white"
                >
                  No encuentras lo que buscas?
                </button>
              </div>
              <button
                type="button"
                onClick={reset}
                className="w-full mt-6 text-gray-400 text-sm underline text-center bg-transparent border-none cursor-pointer"
              >
                Volver al inicio
              </button>
            </motion.div>
          )}

          {step === "budget" && (
            <motion.div key="budget" {...fadeSlide} className="p-6 text-center">
              <h3 className="font-bold mb-4 text-gray-800">Que presupuesto estimas para la obra?</h3>
              <div className="flex flex-col gap-3">
                {[
                  { val: "<50M", label: "Menos de $50 Millones" },
                  { val: "50-100M", label: "$50M a $100 Millones" },
                  { val: ">100M", label: "Mas de $100 Millones" },
                ].map(opt => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setBudget(opt.val)}
                    className="p-4 border rounded-xl hover:bg-slate-50 transition-all cursor-pointer bg-white text-sm font-medium text-gray-700"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep("servicios")}
                className="w-full mt-6 text-gray-400 text-sm underline text-center bg-transparent border-none cursor-pointer"
              >
                Volver
              </button>
            </motion.div>
          )}

          {step === "form" && (
            <motion.div key="form" {...fadeSlide} className="p-6">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Tu nombre completo *"
                  value={data.nombre}
                  onChange={e => setData(prev => ({ ...prev, nombre: e.target.value }))}
                  className="p-3 bg-gray-50 border rounded-xl w-full outline-none focus:border-[#0f172a] text-sm"
                />
                <input
                  type="email"
                  placeholder="Tu email *"
                  value={data.email}
                  onChange={e => setData(prev => ({ ...prev, email: e.target.value }))}
                  className="p-3 bg-gray-50 border rounded-xl w-full outline-none focus:border-[#0f172a] text-sm"
                />
                <input
                  type="tel"
                  placeholder="Telefono / WhatsApp (opcional)"
                  value={data.telefono}
                  onChange={e => setData(prev => ({ ...prev, telefono: e.target.value }))}
                  className="p-3 bg-gray-50 border rounded-xl w-full outline-none text-sm"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Calle y N *"
                    value={data.calle}
                    onChange={e => setData(prev => ({ ...prev, calle: e.target.value }))}
                    className="p-3 bg-gray-50 border rounded-xl w-full outline-none focus:border-[#0f172a] text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Comuna *"
                    value={data.comuna}
                    onChange={e => setData(prev => ({ ...prev, comuna: e.target.value }))}
                    className="p-3 bg-gray-50 border rounded-xl w-full outline-none focus:border-[#0f172a] text-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="ROL de la propiedad (Opcional)"
                  value={data.rol}
                  onChange={e => setData(prev => ({ ...prev, rol: e.target.value }))}
                  className="p-3 bg-gray-50 border rounded-xl w-full outline-none text-sm"
                />
                <textarea
                  placeholder="Cuentanos mas detalles aqui..."
                  value={data.observaciones}
                  onChange={e => setData(prev => ({ ...prev, observaciones: e.target.value }))}
                  className="p-3 bg-gray-50 border rounded-xl w-full h-24 outline-none resize-none text-sm"
                />

                {audioReady && (
                  <p className="text-xs text-[#0f172a] font-semibold">Audio grabado correctamente</p>
                )}

                {formError && (
                  <p className="text-xs text-red-600 font-semibold text-center">{formError}</p>
                )}

                <div className="flex gap-2">
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="flex-1 bg-[#0f172a] text-white font-bold py-4 rounded-xl shadow-lg shadow-gray-200 flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-[#1e293b] text-sm border-none"
                    >
                      <Mic className="w-4 h-4" />
                      {audioReady ? "Grabar de nuevo" : "Grabar Audio"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="flex-1 bg-[#f97316] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer animate-pulse text-sm border-none"
                    >
                      Detener
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={submitLead}
                  disabled={isSubmitting}
                  className="w-full bg-[#f97316] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-100 cursor-pointer transition-all hover:bg-[#ea580c] text-sm border-none flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? "Enviando..." : (
                    <>
                      Siguiente <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={() => setStep("servicios")}
                className="w-full mt-5 text-gray-400 text-sm underline text-center bg-transparent border-none cursor-pointer"
              >
                Volver a servicios
              </button>
            </motion.div>
          )}

          {step === "thanks" && (
            <motion.div key="thanks" {...fadeSlide} className="p-8 text-center">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-[#0f172a] object-cover"
                alt="Patricio Becar"
              />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 italic leading-snug">
                "Tu proyecto ahora esta en manos expertas."
              </h2>
              <p className="text-sm text-gray-600 mt-3">
                <b>Patricio Becar Elissegaray</b><br />
                Arquitecto U. de Chile | Revisor Independiente MINVU
              </p>

              <div className="mt-6 p-4 bg-orange-50 rounded-2xl text-xs text-gray-700 border border-orange-100 text-left space-y-2">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#f97316]" />
                  <span>Te contactaremos por telefono en menos de 24 horas habiles.</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#f97316]" />
                  <a href="mailto:contacto@arquitectochile.com" className="text-[#0f172a] font-semibold hover:underline">contacto@arquitectochile.com</a>
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#f97316]" />
                  <a href="https://tidycal.com/arquitectopatriciobecar/" target="_blank" rel="noopener noreferrer" className="text-[#f97316] font-semibold hover:underline">Agendar videollamada ahora</a>
                </p>
              </div>

              <button
                type="button"
                onClick={generateVCard}
                className="w-full mt-6 text-white font-bold py-4 rounded-2xl shadow-xl uppercase tracking-wider cursor-pointer border-none text-sm flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}
              >
                <Save className="w-4 h-4" />
                Guardar Contacto de Patricio
              </button>

              <button
                type="button"
                onClick={reset}
                className="block mt-6 text-[#0f172a] font-bold text-sm bg-transparent border-none cursor-pointer mx-auto"
              >
                Volver a la Web Principal
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
