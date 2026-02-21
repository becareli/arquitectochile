import { useState, useRef } from "react";

export default function Contact() {
  const [step, setStep] = useState(1);
  const [areas, setAreas] = useState<string[]>([]);
  const [calle, setCalle] = useState("");
  const [comuna, setComuna] = useState("");
  const [urgencia, setUrgencia] = useState("");
  const [fileCount, setFileCount] = useState(0);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [leadSvc, setLeadSvc] = useState("");
  const [newsChecked, setNewsChecked] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleArea = (area: string) => {
    setAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const nav = (n: number) => setStep(n);

  const goTo2 = () => {
    if (areas.length === 0) {
      alert("Por favor, seleccione un área.");
      return;
    }
    nav(2);
  };

  const evalGift = () => {
    let svc = "";
    if (areas.includes("Construcción")) svc = "Construcción";
    else if (areas.includes("Regularización")) svc = "Regularización";
    else if (areas.includes("Terrenos")) svc = "Terrenos";
    else svc = "Ingeniería";
    setLeadSvc(svc);
    nav(4);
  };

  const giftTitles: Record<string, string> = {
    "Construcción": "Manual: Construir sin Sobrecostos",
    "Regularización": "Guía: Ley del Mono 2026",
    "Terrenos": "Manual: Subdivisión de Terrenos",
    "Ingeniería": "Checklist: Proyectos Eléctricos"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Antecedentes enviados. El sistema de Patricio Vega ha priorizado su revisión.");
    setStep(1);
    setAreas([]);
    setCalle("");
    setComuna("");
    setUrgencia("");
    setFileCount(0);
    setNombre("");
    setEmail("");
    setTel("");
    setLeadSvc("");
  };

  const areaOptions = [
    { value: "Construcción", icon: "🏠", label: "Construcción / Ampliación" },
    { value: "Regularización", icon: "📜", label: "Regularización / Permisos" },
    { value: "Terrenos", icon: "🌍", label: "Subdivisión / Loteos" },
    { value: "Ingeniería", icon: "⚡", label: "Especialidades Técnicas" },
  ];

  return (
    <section id="contacto" className="min-h-screen flex flex-col items-center py-12 sm:py-16 px-4 sm:px-5" style={{ background: "#f8fafc" }}>
      <div className="text-center max-w-[750px] mb-8 sm:mb-10">
        <h2 className="font-display text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold mb-4 tracking-tight text-[#1a1a1a]">
          Centro de Diagnóstico Técnico
        </h2>
        <p className="text-base sm:text-lg text-[#555] leading-relaxed">
          Inicie su proyecto con el respaldo de un equipo experto. Analizamos la normativa de su propiedad antes de cualquier inversión.
        </p>
      </div>

      <div className="w-full max-w-[580px] rounded-[28px] overflow-hidden border border-[#eee]" style={{ background: "rgba(255,255,255,0.98)", boxShadow: "0 30px 60px -12px rgba(0,0,0,0.12)" }}>
        <div className="flex items-center gap-4 p-5 sm:p-6 text-white" style={{ background: "#1a1a1a" }}>
          <div className="w-[65px] h-[65px] rounded-full border-2 border-[#e67e22] bg-[#334155] flex-shrink-0" />
          <div>
            <h3 className="text-[17px] font-semibold m-0">Asistente de Patricio Vega</h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#2ecc71]">
              <span className="w-2 h-2 rounded-full bg-[#2ecc71] animate-pulse" />
              Patricio está revisando nuevos casos
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-9 min-h-[480px]">
          <form onSubmit={handleSubmit}>

            {step === 1 && (
              <div className="animate-fadeIn">
                <div className="bg-[#f1f5f9] p-5 rounded-[20px_20px_20px_5px] text-[15px] leading-relaxed mb-6 border border-[#e2e8f0]">
                  Hola, estoy aquí para guiarle. Patricio necesita conocer el enfoque de su consulta. <b>¿Qué área le interesa?</b>
                </div>
                <div className="grid gap-2.5">
                  {areaOptions.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggleArea(opt.value)}
                      className={`flex justify-between items-center bg-white border rounded-[14px] px-5 py-4 text-left text-sm font-medium transition-all duration-200 cursor-pointer ${
                        areas.includes(opt.value)
                          ? "border-[#e67e22] bg-[#fffaf5] shadow-[0_0_0_2px_#e67e22]"
                          : "border-[#e2e8f0] hover:border-[#e67e22] hover:bg-[#fffaf5]"
                      }`}
                    >
                      <span>{opt.icon} {opt.label}</span>
                      <span className="text-[#94a3b8]">{areas.includes(opt.value) ? "✓" : "+"}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button type="button" onClick={goTo2} className="bg-[#1a1a1a] text-white border-none px-8 py-4 rounded-[14px] font-bold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    Siguiente
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fadeIn">
                <div className="bg-[#f1f5f9] p-5 rounded-[20px_20px_20px_5px] text-[15px] leading-relaxed mb-6 border border-[#e2e8f0]">
                  Para dar un veredicto técnico, Patricio debe estudiar el <b>Plan Regulador</b> de su comuna.
                </div>
                <input
                  type="text"
                  placeholder="Calle y Número"
                  value={calle}
                  onChange={e => setCalle(e.target.value)}
                  className="w-full p-4 mb-3 border border-[#cbd5e1] rounded-xl text-[15px] box-border focus:outline-none focus:border-[#e67e22]"
                  required
                />
                <input
                  type="text"
                  placeholder="Comuna"
                  value={comuna}
                  onChange={e => setComuna(e.target.value)}
                  className="w-full p-4 mb-3 border border-[#cbd5e1] rounded-xl text-[15px] box-border focus:outline-none focus:border-[#e67e22]"
                  required
                />
                <select
                  value={urgencia}
                  onChange={e => setUrgencia(e.target.value)}
                  className="w-full p-4 mb-3 border border-[#cbd5e1] rounded-xl text-[15px] box-border bg-white focus:outline-none focus:border-[#e67e22]"
                >
                  <option value="" disabled>Grado de urgencia</option>
                  <option value="Urgente">🔥 Plazos legales / Crítico</option>
                  <option value="Plan">📅 Planificación (1-3 meses)</option>
                  <option value="Info">👀 Recopilando información</option>
                </select>
                <div className="mt-6 flex justify-between items-center">
                  <button type="button" onClick={() => nav(1)} className="bg-transparent border-none text-[#94a3b8] underline cursor-pointer text-[13px]">
                    Volver
                  </button>
                  <button type="button" onClick={() => nav(3)} className="bg-[#1a1a1a] text-white border-none px-8 py-4 rounded-[14px] font-bold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    Siguiente
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fadeIn">
                <div className="bg-[#f1f5f9] p-5 rounded-[20px_20px_20px_5px] text-[15px] leading-relaxed mb-6 border border-[#e2e8f0]">
                  <b>¿Tiene documentos técnicos?</b> Si adjunta su CIP, planos o fotos, Patricio podrá enviarle un diagnóstico preliminar mucho más rápido.
                </div>
                <div className="border-2 border-dashed border-[#cbd5e1] p-8 rounded-[15px] text-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    className="hidden"
                    onChange={e => setFileCount(e.target.files?.length || 0)}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-transparent border-none cursor-pointer text-[#e67e22] font-bold text-base"
                  >
                    📂 SUBIR ANTECEDENTES
                  </button>
                  <div className="text-[11px] text-[#64748b] mt-2">
                    {fileCount > 0 ? `${fileCount} archivos seleccionados ✅` : "Opcional (Máx 10MB)"}
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <button type="button" onClick={() => nav(2)} className="bg-transparent border-none text-[#94a3b8] underline cursor-pointer text-[13px]">
                    Volver
                  </button>
                  <button type="button" onClick={evalGift} className="bg-[#1a1a1a] text-white border-none px-8 py-4 rounded-[14px] font-bold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    Ver Regalo
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fadeIn">
                <div className="bg-[#f1f5f9] p-5 rounded-[20px_20px_20px_5px] text-[15px] leading-relaxed mb-6 border border-[#e2e8f0]">
                  Excelente. Como le interesa la <b>{leadSvc}</b>, Patricio le obsequiará su material:
                </div>
                <div className="bg-[#fff7ed] border-2 border-dashed border-[#fb923c] rounded-[20px] p-6 text-center mt-4">
                  <div className="w-[110px] h-[150px] bg-[#334155] mx-auto mb-4 rounded shadow-[0_10px_20px_rgba(0,0,0,0.2)]" />
                  <h4 className="font-bold text-base m-0 mb-2.5">{giftTitles[leadSvc] || ""}</h4>
                  <p className="text-xs text-[#7c2d12]">Material exclusivo para suscriptores de ArquitectoChile.</p>
                  <label className="flex items-center gap-2 justify-center text-xs font-semibold mt-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newsChecked}
                      onChange={e => setNewsChecked(e.target.checked)}
                    />
                    Solicitar regalo y asesoría
                  </label>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <button type="button" onClick={() => nav(3)} className="bg-transparent border-none text-[#94a3b8] underline cursor-pointer text-[13px]">
                    Volver
                  </button>
                  <button type="button" onClick={() => nav(5)} className="bg-[#1a1a1a] text-white border-none px-8 py-4 rounded-[14px] font-bold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    Finalizar
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="animate-fadeIn">
                <div className="bg-[#f1f5f9] p-5 rounded-[20px_20px_20px_5px] text-[15px] leading-relaxed mb-6 border border-[#e2e8f0]">
                  ¡Todo listo! Patricio recibirá su caso. Confirme dónde enviarle el diagnóstico y su regalo:
                </div>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  className="w-full p-4 mb-3 border border-[#cbd5e1] rounded-xl text-[15px] box-border focus:outline-none focus:border-[#e67e22]"
                  required
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-4 mb-3 border border-[#cbd5e1] rounded-xl text-[15px] box-border focus:outline-none focus:border-[#e67e22]"
                  required
                />
                <input
                  type="tel"
                  placeholder="WhatsApp +569..."
                  value={tel}
                  onChange={e => setTel(e.target.value)}
                  className="w-full p-4 mb-3 border border-[#cbd5e1] rounded-xl text-[15px] box-border focus:outline-none focus:border-[#e67e22]"
                  required
                />
                <button
                  type="submit"
                  className="w-full mt-4 bg-[#059669] text-white border-none px-8 py-4 rounded-[14px] font-bold text-base cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  ENVIAR A REVISIÓN
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}