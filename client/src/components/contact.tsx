import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Route = "none" | "regularizacion" | "ampliacion" | "obra-nueva";

interface StepData {
  route: Route;
  subChoice: string;
  m2: string;
  urgencia: string;
  objetivo: string;
  terreno: string;
  estilo: string;
  nombre: string;
  email: string;
  telefono: string;
}

const fadeSlide = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

function OptionCard({ icon, title, subtitle, selected, onClick }: {
  icon: string; title: string; subtitle?: string; selected?: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-5 sm:p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer group ${
        selected
          ? "border-[hsl(14,70%,50%)] bg-[hsl(14,70%,50%)]/5 shadow-md"
          : "border-gray-200 bg-white hover:border-[hsl(14,70%,50%)]/50 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl flex-shrink-0">{icon}</span>
        <div>
          <p className="font-semibold text-[hsl(210,15%,30%)] text-base sm:text-lg tracking-wide">{title}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1 font-light tracking-wide">{subtitle}</p>}
        </div>
        <span className={`ml-auto text-xl transition-colors ${selected ? "text-[hsl(14,70%,50%)]" : "text-gray-300 group-hover:text-gray-400"}`}>
          {selected ? "✓" : "→"}
        </span>
      </div>
    </button>
  );
}

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 sm:gap-4 mb-8">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[hsl(210,15%,30%)] flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
        A
      </div>
      <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-md px-5 py-4 sm:px-6 sm:py-5 text-[15px] sm:text-base leading-relaxed text-gray-700 shadow-sm max-w-lg">
        {children}
      </div>
    </div>
  );
}

function NextButton({ onClick, label = "Continuar", color = "green" }: { onClick: () => void; label?: string; color?: string }) {
  const bgClass = color === "green"
    ? "bg-emerald-600 hover:bg-emerald-700"
    : "bg-[hsl(210,15%,30%)] hover:bg-[hsl(210,15%,25%)]";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${bgClass} text-white px-8 py-4 rounded-xl font-semibold text-base tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
    >
      {label}
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-gray-400 hover:text-gray-600 text-sm font-medium underline underline-offset-4 transition-colors"
    >
      ← Volver
    </button>
  );
}

export default function Contact() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<StepData>({
    route: "none",
    subChoice: "",
    m2: "",
    urgencia: "",
    objetivo: "",
    terreno: "",
    estilo: "",
    nombre: "",
    email: "",
    telefono: "",
  });

  const setRoute = (r: Route) => {
    setData(prev => ({ ...prev, route: r }));
    setStep(1);
  };

  const handleSubmit = () => {
    if (!data.nombre || !data.email || !data.telefono) {
      alert("Por favor complete todos los campos de contacto.");
      return;
    }
    console.log("📤 Lead capturado:", data);
    alert("¡Excelente! Patricio Becar Elissegaray recibirá su diagnóstico y le contactará a la brevedad.");
    setStep(0);
    setData({ route: "none", subChoice: "", m2: "", urgencia: "", objetivo: "", terreno: "", estilo: "", nombre: "", email: "", telefono: "" });
  };

  const totalSteps = data.route === "none" ? 1 : 4;

  return (
    <section id="contacto" className="min-h-screen bg-white flex flex-col items-center justify-center py-16 sm:py-20 px-4">
      <div className="w-full max-w-2xl">

        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[hsl(14,70%,50%)] font-semibold text-sm tracking-[0.2em] uppercase mb-3">Diagnóstico de Proyecto</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[hsl(210,15%,30%)] tracking-tight mb-4">
            Centro de Evaluación Técnica
          </h2>
          <p className="text-gray-500 text-base sm:text-lg font-light tracking-wide max-w-lg mx-auto">
            Analizamos la normativa de su propiedad antes de cualquier inversión.
          </p>
        </div>

        {step > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-2 tracking-widest uppercase">
              <span>Paso {step} de {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <motion.div
                className="bg-emerald-500 h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-10 min-h-[420px]">
          <AnimatePresence mode="wait">

            {step === 0 && (
              <motion.div key="step0" {...fadeSlide}>
                <Bubble>
                  Hola, soy <b>Agustín</b>. Estoy aquí para guiarte en tu proyecto con <b>Patricio Becar Elissegaray</b>. ¿En qué etapa te encuentras hoy?
                </Bubble>
                <div className="space-y-3 sm:space-y-4 mt-6">
                  <OptionCard
                    icon="📜"
                    title="Regularización / Ley del Mono"
                    subtitle="Tengo una construcción existente que necesita permisos"
                    onClick={() => setRoute("regularizacion")}
                  />
                  <OptionCard
                    icon="🏗️"
                    title="Ampliación o Remodelación"
                    subtitle="Quiero ampliar o remodelar mi vivienda actual"
                    onClick={() => setRoute("ampliacion")}
                  />
                  <OptionCard
                    icon="🏡"
                    title="Obra Nueva / Construcción"
                    subtitle="Tengo un terreno y quiero construir desde cero"
                    onClick={() => setRoute("obra-nueva")}
                  />
                </div>
              </motion.div>
            )}

            {step === 1 && data.route === "regularizacion" && (
              <motion.div key="reg1" {...fadeSlide}>
                <Bubble>
                  Entendido, necesitas regularizar. Para que Patricio evalúe tu caso, necesito algunos datos. <b>¿Cuántos m² aproximados tiene la construcción a regularizar?</b>
                </Bubble>
                <div className="space-y-3 mt-6">
                  {[
                    { val: "menos-36", icon: "📐", title: "Menos de 36 m²", sub: "Ampliación menor" },
                    { val: "36-100", icon: "🏠", title: "Entre 36 y 100 m²", sub: "Vivienda estándar" },
                    { val: "100-200", icon: "🏘️", title: "Entre 100 y 200 m²", sub: "Vivienda grande" },
                    { val: "200+", icon: "🏛️", title: "Más de 200 m²", sub: "Proyecto mayor" },
                  ].map(opt => (
                    <OptionCard
                      key={opt.val}
                      icon={opt.icon}
                      title={opt.title}
                      subtitle={opt.sub}
                      selected={data.m2 === opt.val}
                      onClick={() => setData(prev => ({ ...prev, m2: opt.val }))}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-8">
                  <BackButton onClick={() => setStep(0)} />
                  {data.m2 && <NextButton onClick={() => setStep(2)} />}
                </div>
              </motion.div>
            )}

            {step === 1 && data.route === "ampliacion" && (
              <motion.div key="amp1" {...fadeSlide}>
                <Bubble>
                  Perfecto, una ampliación o remodelación. <b>¿Cuál es tu objetivo principal?</b>
                </Bubble>
                <div className="space-y-3 mt-6">
                  {[
                    { val: "espacio", icon: "📏", title: "Más espacio para la familia", sub: "Dormitorios, living, cocina" },
                    { val: "plusvalia", icon: "📈", title: "Aumentar la plusvalía", sub: "Inversión inteligente en tu propiedad" },
                    { val: "estetica", icon: "✨", title: "Mejorar la estética", sub: "Renovar fachada, interiores, acabados" },
                    { val: "funcional", icon: "⚙️", title: "Mejora funcional", sub: "Baños, cocina, distribución" },
                  ].map(opt => (
                    <OptionCard
                      key={opt.val}
                      icon={opt.icon}
                      title={opt.title}
                      subtitle={opt.sub}
                      selected={data.objetivo === opt.val}
                      onClick={() => setData(prev => ({ ...prev, objetivo: opt.val }))}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-8">
                  <BackButton onClick={() => setStep(0)} />
                  {data.objetivo && <NextButton onClick={() => setStep(2)} />}
                </div>
              </motion.div>
            )}

            {step === 1 && data.route === "obra-nueva" && (
              <motion.div key="obra1" {...fadeSlide}>
                <Bubble>
                  ¡Un proyecto nuevo! Eso es emocionante. <b>¿Cómo es la situación de tu terreno?</b>
                </Bubble>
                <div className="space-y-3 mt-6">
                  {[
                    { val: "propio", icon: "✅", title: "Ya tengo terreno", sub: "Listo para comenzar el proyecto" },
                    { val: "buscando", icon: "🔍", title: "Estoy buscando terreno", sub: "Necesito asesoría para elegir" },
                    { val: "heredado", icon: "📋", title: "Terreno heredado / familiar", sub: "Puede requerir subdivisión" },
                  ].map(opt => (
                    <OptionCard
                      key={opt.val}
                      icon={opt.icon}
                      title={opt.title}
                      subtitle={opt.sub}
                      selected={data.terreno === opt.val}
                      onClick={() => setData(prev => ({ ...prev, terreno: opt.val }))}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-8">
                  <BackButton onClick={() => setStep(0)} />
                  {data.terreno && <NextButton onClick={() => setStep(2)} />}
                </div>
              </motion.div>
            )}

            {step === 2 && data.route === "regularizacion" && (
              <motion.div key="reg2" {...fadeSlide}>
                <Bubble>
                  <b>¿Cuál es tu nivel de urgencia?</b> Esto nos ayuda a priorizar tu caso correctamente.
                </Bubble>
                <div className="space-y-3 mt-6">
                  {[
                    { val: "urgente", icon: "🔥", title: "Urgente — Plazos legales activos", sub: "Necesito resolver antes de una fecha límite" },
                    { val: "planificado", icon: "📅", title: "Planificado — 1 a 3 meses", sub: "Quiero avanzar pronto pero sin presión inmediata" },
                    { val: "explorando", icon: "👀", title: "Explorando — Recopilando información", sub: "Aún estoy evaluando opciones" },
                  ].map(opt => (
                    <OptionCard
                      key={opt.val}
                      icon={opt.icon}
                      title={opt.title}
                      subtitle={opt.sub}
                      selected={data.urgencia === opt.val}
                      onClick={() => setData(prev => ({ ...prev, urgencia: opt.val }))}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-8">
                  <BackButton onClick={() => setStep(1)} />
                  {data.urgencia && <NextButton onClick={() => setStep(3)} />}
                </div>
              </motion.div>
            )}

            {step === 2 && data.route === "ampliacion" && (
              <motion.div key="amp2" {...fadeSlide}>
                <Bubble>
                  Excelente elección. <b>¿Cuántos m² aproximados deseas intervenir?</b>
                </Bubble>
                <div className="space-y-3 mt-6">
                  {[
                    { val: "menos-30", icon: "📐", title: "Menos de 30 m²", sub: "Proyecto compacto" },
                    { val: "30-80", icon: "🏠", title: "Entre 30 y 80 m²", sub: "Ampliación mediana" },
                    { val: "80+", icon: "🏘️", title: "Más de 80 m²", sub: "Intervención mayor" },
                  ].map(opt => (
                    <OptionCard
                      key={opt.val}
                      icon={opt.icon}
                      title={opt.title}
                      subtitle={opt.sub}
                      selected={data.m2 === opt.val}
                      onClick={() => setData(prev => ({ ...prev, m2: opt.val }))}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-8">
                  <BackButton onClick={() => setStep(1)} />
                  {data.m2 && <NextButton onClick={() => setStep(3)} />}
                </div>
              </motion.div>
            )}

            {step === 2 && data.route === "obra-nueva" && (
              <motion.div key="obra2" {...fadeSlide}>
                <Bubble>
                  <b>¿Qué estilo de vivienda te atrae más?</b>
                </Bubble>
                <div className="space-y-3 mt-6">
                  {[
                    { val: "moderno", icon: "🔲", title: "Moderno / Minimalista", sub: "Líneas puras, techos planos, grandes ventanales" },
                    { val: "clasico", icon: "🏛️", title: "Clásico / Tradicional", sub: "Techos a dos aguas, materiales nobles" },
                    { val: "mediterraneo", icon: "🌿", title: "Mediterráneo", sub: "Terrazas, colores cálidos, integración exterior" },
                    { val: "no-se", icon: "💡", title: "Necesito asesoría de estilo", sub: "Patricio me puede guiar" },
                  ].map(opt => (
                    <OptionCard
                      key={opt.val}
                      icon={opt.icon}
                      title={opt.title}
                      subtitle={opt.sub}
                      selected={data.estilo === opt.val}
                      onClick={() => setData(prev => ({ ...prev, estilo: opt.val }))}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-8">
                  <BackButton onClick={() => setStep(1)} />
                  {data.estilo && <NextButton onClick={() => setStep(3)} />}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3-gift" {...fadeSlide}>
                <Bubble>
                  Ya tenemos los parámetros iniciales. Patricio ha preparado un <b>Diagnóstico de Factibilidad Preliminar</b> basado en tu caso. Es un documento personalizado que analiza la normativa aplicable a tu proyecto.
                </Bubble>
                <div className="bg-gradient-to-br from-[hsl(210,15%,30%)] to-[hsl(210,15%,22%)] text-white rounded-2xl p-6 sm:p-8 text-center mt-4 shadow-lg">
                  <div className="w-20 h-28 bg-white/10 border border-white/20 mx-auto mb-4 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">📄</span>
                  </div>
                  <h4 className="font-bold text-lg sm:text-xl mb-2">Diagnóstico de Factibilidad</h4>
                  <p className="text-white/70 text-sm font-light">
                    {data.route === "regularizacion" && "Análisis preliminar de regularización según Ley del Mono y normativa vigente"}
                    {data.route === "ampliacion" && "Estudio de factibilidad para ampliación según Plan Regulador comunal"}
                    {data.route === "obra-nueva" && "Evaluación preliminar de cabida y normativa para tu terreno"}
                  </p>
                  <p className="text-[hsl(14,70%,60%)] font-semibold text-sm mt-3">Material exclusivo — ArquitectoChile</p>
                </div>
                <div className="flex justify-between items-center mt-8">
                  <BackButton onClick={() => setStep(2)} />
                  <NextButton onClick={() => setStep(4)} label="Recibir Diagnóstico" />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4-contact" {...fadeSlide}>
                <Bubble>
                  Excelente. Patricio ya tiene los parámetros iniciales. <b>Déjanos tu correo para enviarte tu Diagnóstico de Factibilidad Preliminar ahora mismo.</b>
                </Bubble>
                <div className="space-y-4 mt-6">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={data.nombre}
                    onChange={e => setData(prev => ({ ...prev, nombre: e.target.value }))}
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[hsl(14,70%,50%)] focus:ring-1 focus:ring-[hsl(14,70%,50%)]/30 transition-all tracking-wide"
                  />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={data.email}
                    onChange={e => setData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[hsl(14,70%,50%)] focus:ring-1 focus:ring-[hsl(14,70%,50%)]/30 transition-all tracking-wide"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp +569..."
                    value={data.telefono}
                    onChange={e => setData(prev => ({ ...prev, telefono: e.target.value }))}
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[hsl(14,70%,50%)] focus:ring-1 focus:ring-[hsl(14,70%,50%)]/30 transition-all tracking-wide"
                  />
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg mt-2"
                  >
                    ENVIAR Y RECIBIR DIAGNÓSTICO
                  </button>
                  <p className="text-center text-xs text-gray-400 font-light tracking-wide mt-2">
                    🔒 Tu información es confidencial y está protegida.
                  </p>
                </div>
                <div className="mt-6">
                  <BackButton onClick={() => setStep(3)} />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <div className="text-center mt-8 text-xs text-gray-400 font-light tracking-widest uppercase">
          ArquitectoChile — Patricio Becar Elissegaray
        </div>
      </div>
    </section>
  );
}