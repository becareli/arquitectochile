import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ClientType = "" | "empresa" | "particular";
type Priority = "alta" | "media" | "baja" | "";

interface LeadData {
  clientType: ClientType;
  serviceArea: string;
  mensaje: string;
  audioBlob: Blob | null;
  calle: string;
  comuna: string;
  rol: string;
  nombre: string;
  email: string;
  telefono: string;
  priority: Priority;
}

const fadeSlide = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
};

const WHATSAPP_NUMBER = "56912345678";

const EMPRESA_SERVICES = [
  { val: "revisoria", icon: "🔍", title: "Revisoría Independiente", sub: "Inspección técnica oficial de obras", priority: "alta" as Priority },
  { val: "electrico-gas", icon: "⚡", title: "Proyectos Eléctricos / Gas", sub: "TE-1, TE-4, TC-6, SEC", priority: "alta" as Priority },
  { val: "industrial", icon: "🏭", title: "Bodegas / Industrial / ENAER", sub: "Proyectos industriales y especiales", priority: "alta" as Priority },
  { val: "edificios", icon: "🏢", title: "Edificios / Comercial", sub: "Servicentros, locales, oficinas", priority: "alta" as Priority },
  { val: "subdiv-empresa", icon: "🌍", title: "Subdivisión / Loteos", sub: "Desarrollo inmobiliario", priority: "alta" as Priority },
];

const PARTICULAR_SERVICES = [
  { val: "regularizacion", icon: "📜", title: "Regularización / Ley del Mono", sub: "Permisos para construcciones existentes", priority: "media" as Priority },
  { val: "mansarda-eifs", icon: "🏠", title: "Mansarda / EIFS / Ampliación VIP", sub: "Proyectos residenciales de alta gama", priority: "media" as Priority },
  { val: "ampliacion", icon: "🏗️", title: "Ampliación o Remodelación", sub: "Mejorar tu vivienda actual", priority: "media" as Priority },
  { val: "obra-nueva", icon: "🏡", title: "Construcción Casa Nueva", sub: "Construir desde cero en tu terreno", priority: "baja" as Priority },
  { val: "consulta", icon: "💬", title: "Consulta General", sub: "Tengo una duda técnica", priority: "baja" as Priority },
];

export default function Contact() {
  const [step, setStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [data, setData] = useState<LeadData>({
    clientType: "",
    serviceArea: "",
    mensaje: "",
    audioBlob: null,
    calle: "",
    comuna: "",
    rol: "",
    nombre: "",
    email: "",
    telefono: "",
    priority: "",
  });

  const getPriority = (clientType: ClientType, serviceVal: string): Priority => {
    if (clientType === "empresa") return "alta";
    const svc = PARTICULAR_SERVICES.find(s => s.val === serviceVal);
    return svc?.priority || "baja";
  };

  const selectType = (type: ClientType) => {
    setData(prev => ({ ...prev, clientType: type }));
    setStep(1);
  };

  const selectService = (val: string) => {
    const priority = getPriority(data.clientType, val);
    setData(prev => ({ ...prev, serviceArea: val, priority }));
    if (priority === "baja") {
      setStep(99);
    } else {
      setStep(2);
    }
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
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setData(prev => ({ ...prev, audioBlob: blob }));
        setAudioReady(true);
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

  const handleSubmit = () => {
    if (!data.nombre || !data.email || !data.telefono) {
      alert("Por favor complete todos los campos de contacto.");
      return;
    }
    console.log("📤 Lead capturado:", {
      ...data,
      audioBlob: data.audioBlob ? "Audio adjunto" : "Sin audio",
    });
    alert("✅ ¡Caso enviado! Patricio Becar priorizará tu revisión técnica.");
    setStep(0);
    setAudioReady(false);
    setData({ clientType: "", serviceArea: "", mensaje: "", audioBlob: null, calle: "", comuna: "", rol: "", nombre: "", email: "", telefono: "", priority: "" });
  };

  const totalSteps = 5;
  const currentProgress = step === 99 ? 100 : Math.min((step / totalSteps) * 100, 100);

  return (
    <section id="contacto" className="min-h-screen flex flex-col items-center justify-center py-14 sm:py-20 px-4" style={{ background: "linear-gradient(180deg, #f4f7f6 0%, #eef2f7 100%)" }}>
      <div className="w-full max-w-[460px]">

        <div className="bg-white rounded-[30px] overflow-hidden" style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}>

          <div className="bg-[#0056b3] text-white text-center py-3 px-4">
            <p className="text-xs font-bold tracking-[0.15em] uppercase m-0">ArquitectoChile.com</p>
          </div>

          <div className="text-center px-6 pt-8 pb-4" style={{ background: "linear-gradient(180deg, #eef6ff 0%, #ffffff 100%)" }}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop"
              alt="Agustín - Asistente Técnico"
              className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full object-cover mx-auto border-[6px] border-white"
              style={{ boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
            />
            <h3 className="text-xl font-bold text-[#0056b3] mt-4 mb-1">Soy Agustín</h3>
            <p className="text-sm text-gray-500 m-0">Asistente Técnico de Patricio Becar</p>
          </div>

          {step > 0 && step < 99 && (
            <div className="px-6 pt-4">
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <motion.div
                  className="bg-[#0056b3] h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${currentProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}

          <div className="px-5 sm:px-6 py-6 min-h-[240px]">
            <AnimatePresence mode="wait">

              {step === 0 && (
                <motion.div key="s0" {...fadeSlide}>
                  <div className="bg-[#f1f3f5] px-5 py-4 rounded-[20px_20px_20px_5px] text-[15px] leading-relaxed text-gray-700 mb-6">
                    "Hola. Para darte la mejor asesoría técnica, cuéntame: ¿Tu requerimiento es para una <b>empresa</b> o es un proyecto <b>particular</b>?"
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => selectType("empresa")}
                      className="border-2 border-gray-200 rounded-2xl p-5 bg-white text-center cursor-pointer transition-all duration-300 hover:border-[#0056b3] hover:bg-[#f0f7ff] group"
                    >
                      <span className="text-3xl block mb-2">🏢</span>
                      <span className="font-bold text-sm text-gray-700 group-hover:text-[#0056b3] tracking-wide">EMPRESA / IND.</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => selectType("particular")}
                      className="border-2 border-gray-200 rounded-2xl p-5 bg-white text-center cursor-pointer transition-all duration-300 hover:border-[#ff851b] hover:bg-[#fff8f0] group"
                    >
                      <span className="text-3xl block mb-2">🏠</span>
                      <span className="font-bold text-sm text-gray-700 group-hover:text-[#ff851b] tracking-wide">PARTICULAR</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="s1" {...fadeSlide}>
                  <div className="bg-[#f1f3f5] px-5 py-4 rounded-[20px_20px_20px_5px] text-[15px] leading-relaxed text-gray-700 mb-5">
                    {data.clientType === "empresa"
                      ? "Perfecto. Los proyectos empresariales son la especialidad de Patricio. <b>¿En qué área necesita apoyo?</b>"
                      : "Entendido. <b>¿Cuál es el tipo de proyecto que tienes en mente?</b>"
                    }
                  </div>
                  <div className="space-y-2.5">
                    {(data.clientType === "empresa" ? EMPRESA_SERVICES : PARTICULAR_SERVICES).map(svc => (
                      <button
                        key={svc.val}
                        type="button"
                        onClick={() => selectService(svc.val)}
                        className={`w-full text-left flex items-center gap-3.5 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                          data.clientType === "empresa"
                            ? "border-gray-200 bg-white hover:border-[#0056b3] hover:bg-[#f0f7ff]"
                            : "border-gray-200 bg-white hover:border-[#ff851b] hover:bg-[#fff8f0]"
                        }`}
                      >
                        <span className="text-2xl flex-shrink-0">{svc.icon}</span>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-gray-800 tracking-wide">{svc.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{svc.sub}</p>
                        </div>
                        <span className="ml-auto text-gray-300 text-lg flex-shrink-0">→</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-5">
                    <button type="button" onClick={() => setStep(0)} className="text-gray-400 hover:text-gray-600 text-sm underline underline-offset-4 transition-colors">
                      ← Volver
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" {...fadeSlide}>
                  <div className="bg-[#f1f3f5] px-5 py-4 rounded-[20px_20px_20px_5px] text-[15px] leading-relaxed text-gray-700 mb-5">
                    Excelente. Ahora cuéntame los detalles de tu proyecto. <b>Puedes escribir o grabar un audio</b> para que entienda mejor tu caso.
                  </div>
                  <textarea
                    placeholder="Escribe aquí o cuéntamelo por audio para entenderte mejor..."
                    value={data.mensaje}
                    onChange={e => setData(prev => ({ ...prev, mensaje: e.target.value }))}
                    className="w-full h-[110px] rounded-xl border border-gray-200 p-4 text-sm bg-[#fafafa] outline-none focus:border-[#0056b3] transition-all resize-none"
                    style={{ fontFamily: "inherit" }}
                  />
                  <div className="flex items-center justify-between mt-4">
                    {!isRecording ? (
                      <button
                        type="button"
                        onClick={startRecording}
                        className="flex items-center gap-2 bg-[#25D366] text-white border-none px-5 py-3 rounded-full font-bold text-sm cursor-pointer transition-all hover:brightness-110"
                      >
                        <span>🎤</span> {audioReady ? "GRABAR DE NUEVO" : "AUDIO"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="flex items-center gap-2 bg-red-500 text-white border-none px-5 py-3 rounded-full font-bold text-sm cursor-pointer animate-pulse"
                      >
                        <span>⏹️</span> DETENER
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (!data.mensaje && !audioReady) {
                          alert("Por favor, cuéntame un poco más sobre tu proyecto.");
                          return;
                        }
                        setStep(3);
                      }}
                      className="bg-[#0056b3] text-white border-none w-[50px] h-[50px] rounded-full cursor-pointer text-xl font-bold transition-all hover:bg-[#004494] hover:shadow-lg"
                    >
                      ➔
                    </button>
                  </div>
                  {audioReady && (
                    <p className="text-xs text-[#25D366] font-semibold mt-3">✅ Audio grabado correctamente</p>
                  )}
                  <div className="mt-5">
                    <button type="button" onClick={() => setStep(1)} className="text-gray-400 hover:text-gray-600 text-sm underline underline-offset-4 transition-colors">
                      ← Volver
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" {...fadeSlide}>
                  <div className="bg-[#f1f3f5] px-5 py-4 rounded-[20px_20px_20px_5px] text-[15px] leading-relaxed text-gray-700 mb-5">
                    Para el análisis normativo, Patricio necesita ubicar tu propiedad en el <b>Plan Regulador</b>. Estos datos son clave:
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Calle y Número"
                      value={data.calle}
                      onChange={e => setData(prev => ({ ...prev, calle: e.target.value }))}
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#0056b3] transition-all bg-[#fafafa]"
                    />
                    <input
                      type="text"
                      placeholder="Comuna"
                      value={data.comuna}
                      onChange={e => setData(prev => ({ ...prev, comuna: e.target.value }))}
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#0056b3] transition-all bg-[#fafafa]"
                    />
                    <input
                      type="text"
                      placeholder="ROL de la propiedad (ej: 1234-56)"
                      value={data.rol}
                      onChange={e => setData(prev => ({ ...prev, rol: e.target.value }))}
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#0056b3] transition-all bg-[#fafafa]"
                    />
                    <p className="text-[11px] text-gray-400 italic">El ROL aparece en tu contribución o en el SII.</p>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <button type="button" onClick={() => setStep(2)} className="text-gray-400 hover:text-gray-600 text-sm underline underline-offset-4 transition-colors">
                      ← Volver
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!data.comuna) {
                          alert("La comuna es indispensable para el análisis normativo.");
                          return;
                        }
                        setStep(4);
                      }}
                      className="bg-[#0056b3] text-white border-none px-7 py-3.5 rounded-xl font-bold text-sm cursor-pointer transition-all hover:bg-[#004494] hover:shadow-lg"
                    >
                      Siguiente
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="s4" {...fadeSlide}>
                  <div className="bg-[#f1f3f5] px-5 py-4 rounded-[20px_20px_20px_5px] text-[15px] leading-relaxed text-gray-700 mb-5">
                    Patricio ya tiene los parámetros iniciales. <b>Déjanos tu correo para enviarte tu Diagnóstico de Factibilidad Preliminar ahora mismo.</b>
                  </div>

                  {data.priority === "alta" && (
                    <div className="bg-[#0056b3]/5 border border-[#0056b3]/20 rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
                      <span className="text-lg">⭐</span>
                      <p className="text-xs text-[#0056b3] font-semibold">Proyecto de Alta Prioridad — Revisión preferente</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      value={data.nombre}
                      onChange={e => setData(prev => ({ ...prev, nombre: e.target.value }))}
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#0056b3] transition-all bg-[#fafafa]"
                    />
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      value={data.email}
                      onChange={e => setData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#0056b3] transition-all bg-[#fafafa]"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp +569..."
                      value={data.telefono}
                      onChange={e => setData(prev => ({ ...prev, telefono: e.target.value }))}
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#0056b3] transition-all bg-[#fafafa]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full mt-5 bg-[#28a745] text-white border-none px-6 py-4 rounded-xl font-bold text-base cursor-pointer transition-all hover:bg-[#22943e] hover:shadow-lg"
                  >
                    ENVIAR A REVISIÓN
                  </button>

                  <p className="text-center text-[11px] text-gray-400 mt-3">🔒 Tu información es confidencial y está protegida.</p>

                  <div className="mt-5">
                    <button type="button" onClick={() => setStep(3)} className="text-gray-400 hover:text-gray-600 text-sm underline underline-offset-4 transition-colors">
                      ← Volver
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 99 && (
                <motion.div key="s99" {...fadeSlide}>
                  <div className="bg-[#f1f3f5] px-5 py-4 rounded-[20px_20px_20px_5px] text-[15px] leading-relaxed text-gray-700 mb-5">
                    Gracias por tu interés. Por el momento, <b>Patricio se especializa en proyectos de alta complejidad técnica y regularizaciones avanzadas</b>. Sin embargo, puedo orientarte:
                  </div>
                  <div className="bg-[#fff8f0] border border-[#ff851b]/30 rounded-xl p-5 text-center">
                    <p className="text-sm text-gray-600 mb-4">Te recomendamos contactarnos por WhatsApp para evaluar si podemos ayudarte con una asesoría puntual.</p>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20Patricio,%20necesito%20asesor%C3%ADa%20para%20mi%20proyecto.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold text-sm no-underline transition-all hover:brightness-110"
                    >
                      💬 HABLAR POR WHATSAPP
                    </a>
                  </div>
                  <div className="mt-6">
                    <button type="button" onClick={() => { setStep(0); setData(prev => ({ ...prev, clientType: "", serviceArea: "", priority: "" })); }} className="text-gray-400 hover:text-gray-600 text-sm underline underline-offset-4 transition-colors">
                      ← Volver al inicio
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20Patricio,%20necesito%20asesor%C3%ADa%20t%C3%A9cnica.`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center pb-5 text-[#25D366] no-underline text-[13px] font-bold hover:underline"
          >
            HABLAR POR WHATSAPP AHORA
          </a>
        </div>

        <p className="text-center mt-6 text-[11px] text-gray-400 tracking-[0.12em] uppercase">
          ArquitectoChile — Patricio Becar Elissegaray
        </p>
      </div>
    </section>
  );
}