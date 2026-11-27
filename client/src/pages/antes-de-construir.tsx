import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import logo from "@assets/ArquitectoChile.com_Logo_1771886286621.webp";
import foto from "@assets/patricio-circulo-naranjo.webp";

// Landing "Antes de construir" (página 1: video + test) y "Agende su visita" (página 2).
// Colores del manual de marca ArquitectoChile.com
const NAVY = "#1D2530";
const ORANGE = "#F97015";
const ORANGE_DARK = "#C2410C";
const INK = "#263238";
const MUTED = "#5B6573";
const SURFACE = "#F4F7FA";
const GREEN = "#38B26A";

const VIDEO_ID = "N-tYdckEG5Y";
const TIDY_DOMICILIO = "https://tidycal.com/arquitectopatriciobecar/asesoria-de-arquitectura-a-domicilio";
const TIDY_ONLINE = "https://tidycal.com/arquitectopatriciobecar/asesoria-online-arquitectura";
const FORM_CIP = "/formulario/diseno-arquitectura";
const EBOOK = "/#ebook";

// Comunas dentro o tangentes al anillo Américo Vespucio: $45.000. Fuera del anillo: $60.000.
const ANILLO = [
  "La Florida", "Ñuñoa", "Las Condes", "Vitacura", "La Reina", "Peñalolén", "Providencia", "Santiago",
  "Macul", "San Joaquín", "La Granja", "San Ramón", "La Cisterna", "El Bosque", "San Miguel", "Lo Espejo",
  "Pedro Aguirre Cerda", "Cerrillos", "Estación Central", "Maipú", "Quinta Normal", "Lo Prado", "Pudahuel",
  "Cerro Navia", "Renca", "Independencia", "Recoleta", "Conchalí", "Huechuraba", "Quilicura",
];
const EXTERIOR = [
  "Lo Barnechea", "Puente Alto", "San Bernardo", "Padre Hurtado", "Pirque", "Colina", "Lampa",
  "Calera de Tango", "Peñaflor", "San José de Maipo",
];
const OTRA = "Otra comuna o región";
const COMUNAS = [...ANILLO, ...EXTERIOR].sort((a, b) => a.localeCompare(b, "es")).concat([OTRA]);

const PREGUNTAS = [
  "¿Ya tiene terreno o casa donde construir o ampliar?",
  "¿Tiene claro lo que necesita su familia hoy y en 10 años?",
  "¿Conoce las opciones de confort para su casa (luz, ventilación, aislación)?",
  "¿Sabe qué permite la norma en su terreno?",
  "¿Conoce todas las etapas, del diseño a la recepción final?",
  "¿Sabe si su presupuesto alcanza para lo que quiere?",
];

const font: CSSProperties = { fontFamily: "'Inter', system-ui, sans-serif" };
const btnOrange: CSSProperties = {
  background: ORANGE, color: NAVY, fontWeight: 700, padding: "16px 28px", borderRadius: 8,
  textDecoration: "none", display: "inline-block",
};

function useLandingFonts() {
  useEffect(() => {
    const id = "landing-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Mrs+Saint+Delafield&display=swap";
    document.head.appendChild(link);
  }, []);
}

function TopBar() {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #E3E8EE" }}>
      <div className="max-w-[1120px] mx-auto px-6 py-3 flex items-center gap-4">
        <img src={logo} alt="ArquitectoChile.com" width={140} height={70}
          style={{ width: 140, height: 70, objectFit: "cover", objectPosition: "50% 52%" }} />
        <span className="flex flex-col">
          <strong style={{ fontSize: 15, color: NAVY }}>Patricio Becar Elissegaray</strong>
          <span style={{ fontSize: 12, color: MUTED }}>Arquitecto · Revisor Independiente MINVU</span>
        </span>
      </div>
    </div>
  );
}

function MiniFooter() {
  const l: CSSProperties = { color: "#CBD5E1", textDecoration: "none" };
  return (
    <footer style={{ background: "#0F172A", color: "#CBD5E1" }}>
      <div className="max-w-[1120px] mx-auto px-6 py-7 flex flex-wrap gap-x-8 gap-y-4 justify-between" style={{ fontSize: 13 }}>
        <span>© {new Date().getFullYear()} ArquitectoChile.com · Arq. Patricio Becar Elissegaray</span>
        <span className="flex flex-wrap gap-5">
          <Link href="/aviso-legal" style={l}>Aviso legal</Link>
          <Link href="/politica-privacidad" style={l}>Privacidad</Link>
        </span>
      </div>
    </footer>
  );
}

function Tick() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" style={{ flex: "none" }}>
      <circle cx="12" cy="12" r="12" fill={GREEN} />
      <path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SEAL_POINTS = Array.from({ length: 48 }, (_, i) => {
  const r = i % 2 === 0 ? 60 : 52;
  const a = (Math.PI * 2 * i) / 48;
  return `${(64 + r * Math.cos(a)).toFixed(1)},${(64 + r * Math.sin(a)).toFixed(1)}`;
}).join(" ");

function Sello() {
  return (
    <div className="flex gap-4 items-center">
      <svg role="img" aria-label="Sello de compromiso personal ArquitectoChile" width="128" height="128" viewBox="0 0 128 128" style={{ flex: "none" }}>
        <polygon points={SEAL_POINTS} fill={ORANGE} />
        <circle cx="64" cy="64" r="46" fill={NAVY} />
        <circle cx="64" cy="64" r="40" fill="none" stroke={ORANGE} strokeWidth="1.5" />
        <text x="64" y="44" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" letterSpacing="1">COMPROMISO</text>
        <text x="64" y="74" textAnchor="middle" fill={ORANGE} fontFamily="Inter, sans-serif" fontSize="26" fontWeight="800">100%</text>
        <text x="64" y="92" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" letterSpacing="1">PERSONAL</text>
      </svg>
      <div className="flex flex-col gap-1">
        <strong style={{ fontSize: 16, color: NAVY }}>Compromiso 100% personal</strong>
        <span style={{ fontSize: 14, lineHeight: "22px", color: MUTED }}>
          No envío a un tercero: voy yo. Le hablo claro y le cito la norma que aplica a su caso.
        </span>
      </div>
    </div>
  );
}

function Credenciales() {
  const items: [string, string][] = [
    ["Arquitecto U. de Chile,", "ejerciendo desde 1999."],
    ["Revisor Independiente,", "Registro MINVU Rol N° 237-13."],
    ["Visita de 45 minutos:", "recorrido, medición y conversación."],
    ["Propuesta por escrito", "en 1 a 2 días hábiles."],
  ];
  return (
    <ul className="list-none m-0 p-0 flex flex-col gap-3.5">
      {items.map(([b, t]) => (
        <li key={b} className="flex gap-3 items-start">
          <Tick />
          <span style={{ fontSize: 16, lineHeight: "24px", color: INK }}>
            <strong style={{ color: NAVY }}>{b}</strong> {t}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Firma({ width }: { width: number }) {
  return (
    <div className="flex flex-col items-center gap-1" style={{ flex: "none" }}>
      <img src={foto} alt="Patricio Becar Elissegaray, arquitecto" width={width} style={{ width, height: "auto" }} />
      <span style={{ fontFamily: "'Mrs Saint Delafield', cursive", fontSize: 38, lineHeight: "56px", color: NAVY, whiteSpace: "nowrap" }}>
        Patricio Becar Elissegaray
      </span>
      <span style={{ width: 250, borderTop: `2.5px solid ${NAVY}` }} />
      <span style={{ fontSize: 12, fontWeight: 600, color: MUTED, paddingTop: 4 }}>Arquitecto · Registro MINVU Rol N° 237-13</span>
    </div>
  );
}

function Pasos({ actual }: { actual: 1 | 2 | 3 }) {
  const labels = ["Mire el video", "Haga el test", "Agende su visita"];
  return (
    <div className="flex flex-wrap items-center gap-2.5" style={{ fontSize: 14 }}>
      {labels.map((l, i) => {
        const n = i + 1;
        const done = n < actual;
        const on = n === actual;
        const dot: CSSProperties = on
          ? { background: ORANGE, color: NAVY, border: "none" }
          : done
            ? { background: "#A9B2BD", color: NAVY, border: "none" }
            : { background: "transparent", border: "1px solid #A9B2BD" };
        return (
          <span key={l} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" style={{ color: "#5B6573", marginRight: 2 }}>—</span>}
            <span style={{ width: 28, height: 28, borderRadius: "50%", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", ...dot }}>{n}</span>
            {l}
          </span>
        );
      })}
    </div>
  );
}

function Section({ bg, children, narrow }: { bg: string; children: ReactNode; narrow?: boolean }) {
  return (
    <section style={{ background: bg }}>
      <div className={`${narrow ? "max-w-[820px]" : "max-w-[1120px]"} mx-auto px-6 py-16`}>{children}</div>
    </section>
  );
}

function Video() {
  const [sonido, setSonido] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const src = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=${sonido ? 0 : 1}&cc_load_policy=0&iv_load_policy=3&hl=es&rel=0&playsinline=1&modestbranding=1&enablejsapi=1`;
  // YouTube activa los subtítulos cuando el video parte en silencio: los apagamos vía la API del reproductor.
  const apagarSubtitulos = () => {
    const send = (func: string, args: unknown[] = []) =>
      frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "*");
    [500, 1500, 3000, 6000].forEach((ms) =>
      setTimeout(() => {
        send("unloadModule", ["captions"]);
        send("unloadModule", ["cc"]);
        send("setOption", ["captions", "track", {}]);
      }, ms),
    );
  };
  return (
    <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: 16, overflow: "hidden", background: "#131820" }}>
      <iframe
        key={sonido ? "on" : "off"}
        ref={frame}
        onLoad={apagarSubtitulos}
        src={src}
        title="Evita este error al construir una casa – Arquitecto Patricio Becar"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
      />
      {!sonido && (
        <button
          type="button"
          onClick={() => setSonido(true)}
          style={{ position: "absolute", right: 16, top: 56, background: ORANGE, color: NAVY, fontWeight: 700, fontSize: 14, padding: "10px 16px", borderRadius: 8, border: 0, cursor: "pointer" }}
        >
          Toque para activar el sonido
        </button>
      )}
    </div>
  );
}

function Curvas() {
  const hand: CSSProperties = { fontFamily: "Caveat, cursive" };
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-[720px] flex flex-col gap-3">
        <h2 style={{ fontSize: 32, lineHeight: "38px", fontWeight: 700, color: NAVY }}>Mientras antes se decide, más barato sale</h2>
        <p style={{ fontSize: 16, lineHeight: "26px", color: MUTED }}>
          Al comienzo usted tiene toda la libertad para cambiar su proyecto y casi no cuesta nada. A medida que avanza, esa libertad baja y el costo de cada cambio sube.
        </p>
      </div>
      <svg role="img" aria-label="Dos curvas en S: la libertad para cambiar el diseño baja y el costo de un cambio sube a lo largo de las 5 etapas" viewBox="0 0 1000 420" style={{ width: "100%", height: "auto", display: "block", borderRadius: 16 }}>
        <defs>
          <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1000" height="420" fill="#1E4E86" />
        <rect width="1000" height="420" fill="url(#bp-grid)" />
        <path d="M60 384V34M48 50L60 30L72 50" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M56 380H966M946 368L968 380L946 392" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="80" y="58" fill="#fff" style={hand} fontSize="44" fontWeight="700">$</text>
        <text x="958" y="414" textAnchor="end" fill="#fff" style={hand} fontSize="30" fontWeight="700">Tiempo</text>
        <text x="640" y="58" fill="#fff" style={hand} fontSize="28">costo de un cambio</text>
        <text x="182" y="140" fill="#fff" style={hand} fontSize="28">libertad para cambiar</text>
        <path d="M150 372l8-16M330 372l8-16M500 372l8-16M670 372l8-16M850 372l8-16" stroke="#fff" strokeWidth="2" />
        <path d="M150 380V60M500 380V60M850 380V60" stroke="#fff" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="4 6" />
        <path d="M70 80C380 78 560 352 940 352" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="14 8" strokeLinecap="round" />
        <path d="M70 352C380 352 560 82 940 74" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <circle cx="150" cy="350" r="14" fill={ORANGE} />
      </svg>
      <div className="grid grid-cols-5 gap-2 text-center" style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>
        <span>1. Necesidades</span><span>2. Anteproyecto</span><span>3. Proyecto</span><span>4. Permiso</span><span>5. Obra</span>
      </div>
      <div className="flex flex-wrap gap-6" style={{ fontSize: 14, color: INK }}>
        <span className="flex items-center gap-2"><svg aria-hidden="true" width="32" height="8"><path d="M2 4H30" stroke="#1E4E86" strokeWidth="4" strokeLinecap="round" /></svg>Costo de hacer un cambio</span>
        <span className="flex items-center gap-2"><svg aria-hidden="true" width="32" height="8"><path d="M2 4H30" stroke="#1E4E86" strokeWidth="2.5" strokeDasharray="7 4" /></svg>Libertad para cambiar el diseño</span>
        <span className="flex items-center gap-2"><svg aria-hidden="true" width="16" height="16"><circle cx="8" cy="8" r="7" fill={ORANGE} /></svg>Aquí entra la asesoría a domicilio</span>
      </div>
      <p style={{ fontSize: 16, lineHeight: "26px", color: MUTED, maxWidth: 760 }}>
        La asesoría a domicilio es el primer paso, a bajo costo. Si después decide seguir, avanzamos juntos con el anteproyecto, el proyecto y el permiso.
      </p>
    </div>
  );
}

function Test() {
  const [ans, setAns] = useState<Record<number, "si" | "no">>({});
  const answered = Object.keys(ans).length;
  const done = answered === PREGUNTAS.length;
  const dudas = [1, 2, 3, 4, 5].filter((i) => ans[i] === "no").length;
  const ebook = done && ans[0] === "no";
  const asesoria = done && ans[0] === "si" && dudas >= 2;
  const cip = done && ans[0] === "si" && dudas < 2;

  const card: CSSProperties = { background: NAVY, color: "#fff", borderRadius: 16, padding: 32, display: "flex", flexDirection: "column", gap: 16 };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h2 style={{ fontSize: 32, lineHeight: "38px", fontWeight: 700, color: NAVY }}>Averigüe si necesita una evaluación antes de diseñar su proyecto</h2>
        <p style={{ fontSize: 16, lineHeight: "26px", color: MUTED }}>Responda las 6 preguntas, en orden. Su resultado aparece al terminar.</p>
        <div className="flex items-center gap-3">
          <div style={{ flex: 1, height: 8, background: "#E3E8EE", borderRadius: 4 }}>
            <div style={{ height: 8, borderRadius: 4, background: NAVY, width: `${Math.round((answered / 6) * 100)}%`, transition: "width .2s" }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>{answered} de 6</span>
        </div>
      </div>
      {PREGUNTAS.map((q, i) => (
        <div key={q} className="flex flex-wrap gap-4 items-center justify-between" style={{ background: SURFACE, borderRadius: 8, padding: "18px 20px" }}>
          <div className="flex items-center gap-4" style={{ flex: "1 1 360px" }}>
            <span style={{ flex: "none", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, border: `2px solid ${NAVY}`, background: ans[i] ? NAVY : "#fff", color: ans[i] ? "#fff" : NAVY }}>{i + 1}</span>
            <span style={{ fontSize: 16, lineHeight: "24px", color: NAVY, fontWeight: 600 }}>{q}</span>
          </div>
          <div className="flex gap-2">
            {(["si", "no"] as const).map((v) => {
              const sel = ans[i] === v;
              return (
                <button key={v} type="button" aria-pressed={sel} onClick={() => setAns({ ...ans, [i]: v })}
                  style={{ fontSize: 14, fontWeight: 600, padding: "10px 16px", borderRadius: 8, cursor: "pointer", minHeight: 44, background: sel ? NAVY : "#fff", color: sel ? "#fff" : NAVY, border: `1px solid ${sel ? NAVY : "#757F8A"}` }}>
                  {v === "si" ? "Sí" : i === 0 ? "No" : "No estoy seguro"}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {asesoria && (
        <div style={card}>
          <h3 style={{ fontSize: 22, lineHeight: "30px", fontWeight: 700, color: "#fff" }}>Tiene {dudas} puntos sin resolver. Le conviene una evaluación previa.</h3>
          <p style={{ color: "#D6DCE3", lineHeight: "26px" }}>Resolvámoslos en su terreno, antes de gastar en planos.</p>
          <Link href="/antes-de-construir/agenda" style={{ ...btnOrange, alignSelf: "flex-start" }}>Agendar mi visita</Link>
        </div>
      )}
      {cip && (
        <div style={card}>
          <h3 style={{ fontSize: 22, lineHeight: "30px", fontWeight: 700, color: "#fff" }}>Su proyecto está bien definido. Pasemos a cotizarlo.</h3>
          <p style={{ color: "#D6DCE3", lineHeight: "26px" }}>Envíe su Certificado de Informaciones Previas (CIP) y, si es ampliación, el plano de planta. Le respondo con una propuesta.</p>
          <Link href={FORM_CIP} style={{ ...btnOrange, alignSelf: "flex-start" }}>Enviar mi CIP</Link>
        </div>
      )}
      {ebook && (
        <div style={card}>
          <h3 style={{ fontSize: 22, lineHeight: "30px", fontWeight: 700, color: "#fff" }}>Está en la etapa de sueños: el mejor momento para informarse.</h3>
          <p style={{ color: "#D6DCE3", lineHeight: "26px" }}>Descargue gratis la guía con los pasos para construir sin sorpresas. Cuando tenga terreno, lo visito.</p>
          <a href={EBOOK} style={{ ...btnOrange, alignSelf: "flex-start" }}>Descargar la guía gratis</a>
        </div>
      )}
    </div>
  );
}

export default function AntesDeConstruir() {
  useSEO({
    title: "Evite el error más caro al construir | Asesoría de Arquitectura a Domicilio",
    description:
      "Antes de diseñar, evalúe sus necesidades, opciones y presupuesto con un arquitecto en su propio terreno. Mire el video, haga el test de 6 preguntas y agende su visita.",
    path: "/antes-de-construir",
  });
  useLandingFonts();

  return (
    <div style={{ ...font, color: INK, background: "#fff" }}>
      <TopBar />
      <section style={{ background: NAVY, color: "#fff" }}>
        <div className="max-w-[1120px] mx-auto px-6 py-16 flex flex-wrap gap-12 items-center">
          <div className="flex flex-col gap-6" style={{ flex: "1 1 440px", minWidth: 0 }}>
            <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: 0.5, color: "#A9B2BD" }}>Asesoría de Arquitectura a Domicilio</span>
            <h1 className="text-[36px] leading-[42px] md:text-[48px] md:leading-[54px]" style={{ fontWeight: 800, color: "#fff" }}>Evite el error más caro al construir su casa o proyecto</h1>
            <p style={{ fontSize: 18, lineHeight: "28px", color: "#D6DCE3" }}>
              Cambiar un muro en el plano cuesta una goma de borrar. En obra, cuesta un martillo demoledor. Antes de diseñar, evaluemos juntos sus necesidades, opciones y presupuesto, en su propio terreno.
            </p>
            <div style={{ color: "#D6DCE3" }}><Pasos actual={1} /></div>
            <p style={{ fontSize: 14, color: "#A9B2BD" }}>Más de 285.000 personas ya vieron este consejo en YouTube.</p>
          </div>
          <div style={{ flex: "1 1 440px", minWidth: 0 }}><Video /></div>
        </div>
      </section>
      <Section bg="#fff"><Curvas /></Section>
      <Section bg={SURFACE}>
        <div className="flex flex-wrap gap-12 items-center">
          <Firma width={220} />
          <div className="flex flex-col gap-5" style={{ flex: "1 1 440px", minWidth: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: ORANGE_DARK }}>Quién va a su propiedad</span>
            <h2 style={{ fontSize: 32, lineHeight: "38px", fontWeight: 700, color: NAVY }}>Usted sabe desde antes quién toca su timbre</h2>
            <Credenciales />
            <Sello />
          </div>
        </div>
      </Section>
      <Section bg="#fff" narrow><div id="test"><Test /></div></Section>
      <MiniFooter />
    </div>
  );
}

export function AntesDeConstruirAgenda() {
  useSEO({
    title: "Agende su visita | Asesoría de Arquitectura a Domicilio – ArquitectoChile",
    description: "Vea el valor exacto de la asesoría de arquitectura a domicilio para su comuna y agende su visita con el arquitecto Patricio Becar Elissegaray.",
    path: "/antes-de-construir/agenda",
    noindex: true,
  });
  useLandingFonts();
  const [comuna, setComuna] = useState("");
  const [tipo, setTipo] = useState<"viv" | "eq">("viv");

  let p: { label: string; price: string; note: string; cta: string; href: string } | null = null;
  if (tipo === "eq") p = { label: "Local, colegio o equipamiento", price: "Se cotiza", note: "Requiere un análisis previo. Envíe su CIP y le respondo con una propuesta.", cta: "Enviar mi CIP", href: FORM_CIP };
  else if (ANILLO.includes(comuna)) p = { label: `Visita a domicilio en ${comuna}`, price: "$45.000", note: "Vivienda · 45 minutos en su propiedad", cta: "Agendar visita", href: TIDY_DOMICILIO };
  else if (EXTERIOR.includes(comuna)) p = { label: `Visita a domicilio en ${comuna}`, price: "$60.000", note: "Vivienda · 45 minutos en su propiedad · incluye traslado", cta: "Agendar visita", href: TIDY_DOMICILIO };
  else if (comuna === OTRA) p = { label: "Fuera de Santiago: asesoría online", price: "$40.000", note: "Videollamada de 30 minutos. Envíe antes su CIP y fotos o video del terreno.", cta: "Agendar videollamada", href: TIDY_ONLINE };

  const tBtn = (on: boolean): CSSProperties => ({
    flex: 1, fontSize: 14, fontWeight: 600, padding: "10px 16px", borderRadius: 8, cursor: "pointer", minHeight: 44,
    background: on ? NAVY : "#fff", color: on ? "#fff" : NAVY, border: `1px solid ${on ? NAVY : "#757F8A"}`,
  });
  const external = p && p.href.startsWith("http");

  return (
    <div style={{ ...font, color: INK, background: "#fff" }}>
      <TopBar />
      <section>
        <div className="max-w-[1120px] mx-auto px-6 py-14 flex flex-wrap gap-12 items-start">
          <div className="flex flex-col gap-6" style={{ flex: "1 1 520px", minWidth: 0 }}>
            <div style={{ color: MUTED }}><Pasos actual={3} /></div>
            <h1 style={{ fontSize: 40, lineHeight: "46px", fontWeight: 800, color: NAVY }}>Agende su visita</h1>
            <p style={{ fontSize: 16, lineHeight: "26px", color: MUTED }}>Indique dónde está la propiedad y qué tipo es. Verá el valor exacto antes de reservar.</p>
            <label className="flex flex-col gap-2" style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>
              Comuna de la propiedad
              <select value={comuna} onChange={(e) => setComuna(e.target.value)}
                style={{ padding: 12, border: "1px solid #757F8A", borderRadius: 8, background: "#fff", color: INK, minHeight: 48, fontSize: 16 }}>
                <option value="">Seleccione su comuna</option>
                {COMUNAS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <div className="flex flex-col gap-2">
              <span style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>Tipo de propiedad</span>
              <div className="flex gap-2">
                <button type="button" aria-pressed={tipo === "viv"} onClick={() => setTipo("viv")} style={tBtn(tipo === "viv")}>Vivienda</button>
                <button type="button" aria-pressed={tipo === "eq"} onClick={() => setTipo("eq")} style={tBtn(tipo === "eq")}>Local, colegio u otro</button>
              </div>
            </div>
            {p && (
              <div className="flex flex-wrap gap-6 items-center justify-between" style={{ border: `2px solid ${NAVY}`, borderRadius: 16, padding: 28 }}>
                <div className="flex flex-col gap-2" style={{ flex: "1 1 260px" }}>
                  <span style={{ fontSize: 14, color: MUTED }}>{p.label}</span>
                  <span style={{ fontSize: 40, lineHeight: "46px", fontWeight: 800, color: NAVY }}>{p.price}</span>
                  <span style={{ fontSize: 14, lineHeight: "20px", color: MUTED }}>{p.note}</span>
                </div>
                {external
                  ? <a href={p.href} target="_blank" rel="noopener" style={btnOrange}>{p.cta}</a>
                  : <Link href={p.href} style={btnOrange}>{p.cta}</Link>}
              </div>
            )}
            <p style={{ fontSize: 14, lineHeight: "22px", color: INK }}><strong>Pago:</strong> el día de la visita, en efectivo o transferencia.</p>
            <p style={{ fontSize: 13, lineHeight: "20px", color: MUTED }}>
              Horarios: lunes a viernes 10:00 y 17:00, sábados 10:00. Reserve con al menos 24 horas de anticipación. Si por fuerza mayor no puedo asistir, usted elige: reagendar sin costo o la devolución del 100% de lo pagado.
            </p>
          </div>
          <aside className="flex flex-col gap-6 items-center" style={{ flex: "1 1 340px", minWidth: 0, background: SURFACE, borderRadius: 16, padding: "32px 24px" }}>
            <Firma width={170} />
            <Credenciales />
            <Sello />
          </aside>
        </div>
      </section>
      <MiniFooter />
    </div>
  );
}
