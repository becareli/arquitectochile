import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
}

const fadeSlide = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

const empresaServices = [
  { name: "Revisoría Indep.", icon: "⚖️" },
  { name: "ITO Obras", icon: "🏗️" },
  { name: "Proy. Eléctricos", icon: "⚡" },
  { name: "Proyectos Gas", icon: "🔥" },
  { name: "Subdivisión", icon: "🗺️" },
  { name: "Loteos", icon: "📐" },
  { name: "Diseño 3D", icon: "🖥️" },
];

const particularServices = [
  { name: "Asesoría Terreno", icon: "📍" },
  { name: "Ampliaciones", icon: "🏠" },
  { name: "Remodelación", icon: "✨" },
  { name: "Ley del Mono", icon: "📜" },
  { name: "Fusión/Subdiv.", icon: "🗺️" },
  { name: "Permisos/3D", icon: "📐" },
  { name: "Revisor Indep.", icon: "⚖️" },
  { name: "Agua/Alcant.", icon: "💧" },
  { name: "Electricidad/Gas", icon: "⚡" },
  { name: "Proyecto desde Cero", icon: "🌱" },
];

function generateVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Patricio Becar Elissegaray
ORG:ArquitectoChile.com
TITLE:Arquitecto U. de Chile | Revisor Independiente MINVU
TEL;TYPE=CELL:+56912345678
EMAIL:contacto@arquitectochile.com
URL:https://arquitectochile.com
END:VCARD`;
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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [data, setData] = useState<LeadData>({
    branch: "",
    service: "",
    budget: "",
    calle: "",
    comuna: "",
    rol: "",
    observaciones: "",
    hasAudio: false,
  });

  const [speechText, setSpeechText] = useState(
    '¡Hola! Soy <b>Agustín</b>, asistente de Patricio. ¿Tu requerimiento es para una <b>Empresa</b> o un proyecto <b>Particular</b>?'
  );

  const selectBranch = (b: Branch) => {
    setData(prev => ({ ...prev, branch: b }));
    setSpeechText(
      b === "empresa"
        ? 'Entendido. Somos expertos en normativa corporativa. <b>¿Qué servicio requiere la empresa?</b>'
        : 'Excelente. Ayudamos a familias a construir sueños legalmente. <b>¿Qué necesitas hacer?</b>'
    );
    setStep("servicios");
  };

  const selectService = (s: string) => {
    setData(prev => ({ ...prev, service: s }));
    if (s === "Proyecto desde Cero") {
      setStep("budget");
    } else {
      setSpeechText('Perfecto. Necesito algunos datos para que Patricio analice la normativa de tu propiedad.');
      setStep("form");
    }
  };

  const setBudget = (b: string) => {
    setData(prev => ({ ...prev, budget: b }));
    setSpeechText('Perfecto. Necesito algunos datos para que Patricio analice la normativa de tu propiedad.');
    setStep("form");
  };

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = () => {
        setAudioReady(true);
        setData(prev => ({ ...prev, hasAudio: true }));
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      alert("No se pudo acceder al micrófono. Verifica los permisos de tu navegador.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  }, []);

  const submitLead = () => {
    if (!data.calle || !data.comuna) {
      alert("Calle y Comuna son obligatorios.");
      return;
    }
    console.log("📤 Lead enviado:", data);
    setSpeechText('<b>¡Solicitud enviada con éxito!</b>');
    setStep("thanks");
  };

  const reset = () => {
    setStep("inicio");
    setAudioReady(false);
    setIsRecording(false);
    setData({ branch: "", service: "", budget: "", calle: "", comuna: "", rol: "", observaciones: "", hasAudio: false });
    setSpeechText('¡Hola! Soy <b>Agustín</b>, asistente de Patricio. ¿Tu requerimiento es para una <b>Empresa</b> o un proyecto <b>Particular</b>?');
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
                alt="Agustín"
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
                <span className="text-3xl">🏢</span>
                <div>
                  <b className="block text-[#0f172a]">Empresa / Institución</b>
                  <span className="text-xs text-gray-500">Proyectos corporativos y técnicos</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => selectBranch("particular")}
                className="p-6 rounded-2xl text-left flex items-center gap-4 border-2 border-gray-200 bg-white transition-all duration-200 hover:border-orange-500 hover:bg-orange-50 hover:scale-[1.02] cursor-pointer"
              >
                <span className="text-3xl">🏠</span>
                <div>
                  <b className="block text-orange-600">Proyecto Particular</b>
                  <span className="text-xs text-gray-500">Casas, ampliaciones y trámites</span>
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
                    className="p-3 border rounded-xl flex flex-col items-center text-[10px] font-bold hover:bg-gray-50 transition-all cursor-pointer bg-white"
                  >
                    <span className="text-xl mb-1">{svc.icon}</span>
                    {svc.name}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => selectService("Especial")}
                  className="col-span-2 p-3 border-2 border-dashed rounded-xl text-gray-400 text-xs font-bold uppercase mt-2 cursor-pointer hover:bg-gray-50 transition-all bg-white"
                >
                  ¿No encuentras lo que buscas?
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
              <h3 className="font-bold mb-4 text-gray-800">¿Qué presupuesto estimas para la obra?</h3>
              <div className="flex flex-col gap-3">
                {[
                  { val: "<50M", label: "Menos de $50 Millones" },
                  { val: "50-100M", label: "$50M a $100 Millones" },
                  { val: ">100M", label: "Más de $100 Millones" },
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
                ← Volver
              </button>
            </motion.div>
          )}

          {step === "form" && (
            <motion.div key="form" {...fadeSlide} className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Calle y N° *"
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
                  placeholder="Cuéntame más detalles aquí..."
                  value={data.observaciones}
                  onChange={e => setData(prev => ({ ...prev, observaciones: e.target.value }))}
                  className="p-3 bg-gray-50 border rounded-xl w-full h-24 outline-none resize-none text-sm"
                />

                {audioReady && (
                  <p className="text-xs text-[#0f172a] font-semibold">✅ Audio grabado correctamente</p>
                )}

                <div className="flex gap-2">
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="flex-1 bg-[#0f172a] text-white font-bold py-4 rounded-xl shadow-lg shadow-gray-200 flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-[#1e293b] text-sm border-none"
                    >
                      🎤 {audioReady ? "Grabar de nuevo" : "Grabar Audio"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="flex-1 bg-[#f97316] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer animate-pulse text-sm border-none"
                    >
                      ⏹️ Detener
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={submitLead}
                    className="flex-1 bg-[#f97316] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-100 cursor-pointer transition-all hover:bg-[#ea580c] text-sm border-none"
                  >
                    Enviar Datos
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep("servicios")}
                className="w-full mt-5 text-gray-400 text-sm underline text-center bg-transparent border-none cursor-pointer"
              >
                ← Volver
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
                "Tu proyecto ahora está en manos expertas."
              </h2>
              <p className="text-sm text-gray-600 mt-3">
                <b>Patricio Becar Elissegaray</b><br />
                Arquitecto U. de Chile | Revisor Independiente MINVU
              </p>

              <div className="mt-6 p-4 bg-orange-50 rounded-2xl text-xs text-gray-700 border border-orange-100 text-left">
                ⚠️ <b>AVISO:</b> Patricio te contactará personalmente. Por favor, <b>descarga su contacto</b> ahora para que su llamada no sea bloqueada como spam.
              </div>

              <button
                type="button"
                onClick={generateVCard}
                className="w-full mt-6 text-white font-bold py-4 rounded-2xl shadow-xl uppercase tracking-wider cursor-pointer border-none text-sm"
                style={{ background: "linear-gradient(135deg, #ff851b 0%, #ff4136 100%)" }}
              >
                💾 Guardar Contacto de Patricio
              </button>

              <button
                type="button"
                onClick={reset}
                className="block mt-6 text-[#0f172a] font-bold text-sm bg-transparent border-none cursor-pointer mx-auto"
              >
                ← Volver a la Web Principal
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}