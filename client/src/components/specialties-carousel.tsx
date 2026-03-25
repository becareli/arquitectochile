import {
  Thermometer,
  FileText,
  MapPin,
  PenTool,
  Building2,
  ScanSearch,
  ClipboardCheck,
  GitBranch,
} from "lucide-react";

const specialties = [
  {
    title: "Aislación Térmica EIFS",
    description: "Reacondicionamiento de fachadas y eficiencia energética certificada",
    icon: Thermometer,
    route: "/reacondicionamiento-termico-viviendas",
    accent: "#f97316",
  },
  {
    title: "Regularización Ley del Mono",
    description: "Tramitación DOM La Florida y toda la Región Metropolitana",
    icon: FileText,
    route: "/regularizacion-inmuebles",
    accent: "#f97316",
  },
  {
    title: "Fusión de Terrenos",
    description: "Unión predial urbana y optimización normativa ante el municipio",
    icon: GitBranch,
    route: "/fusion-terrenos-urbanos",
    accent: "#f97316",
  },
  {
    title: "Vivienda de Autor",
    description: "Diseño arquitectónico personalizado con visión Universidad de Chile",
    icon: PenTool,
    route: "/disenemos-tus-nuevos-espacios",
    accent: "#f97316",
  },
  {
    title: "Inspección Técnica ITV",
    description: "Diagnóstico profesional de estructuras, instalaciones y patologías",
    icon: ScanSearch,
    route: "/inspeccion-tecnica-viviendas",
    accent: "#f97316",
  },
  {
    title: "Permisos de Edificación",
    description: "Gestión completa de permisos y recepción final ante la DOM",
    icon: ClipboardCheck,
    route: "/permiso-edificacion-recepcion-final",
    accent: "#f97316",
  },
  {
    title: "Subdivisión de Terrenos",
    description: "División de sitios urbanos con planos y tramitación municipal",
    icon: MapPin,
    route: "/subdivision-terrenos-urbanos",
    accent: "#f97316",
  },
  {
    title: "Remodelación Corporativa",
    description: "Arquitectura de espacios para empresas, locales y oficinas",
    icon: Building2,
    route: "/servicios-a-domicilio",
    accent: "#f97316",
  },
];

const doubled = [...specialties, ...specialties];

export default function SpecialtiesCarousel() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      {/* Blueprint grid overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* Glow accent top-right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", textAlign: "center", marginBottom: "3rem", position: "relative" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#f97316", marginBottom: "0.75rem" }}>
          Especialidades
        </p>
        <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#ffffff", marginBottom: "0.75rem", lineHeight: 1.15 }}>
          Ecosistema de Soluciones Técnicas
        </h2>
        <p style={{ fontSize: "1rem", color: "#94a3b8", maxWidth: "36rem", margin: "0 auto" }}>
          26+ años resolviendo desafíos de arquitectura, normativa y construcción en Chile
        </p>
      </div>

      {/* Carousel track */}
      <div style={{ position: "relative" }}>
        {/* Fade edges */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "120px",
            height: "100%",
            background: "linear-gradient(90deg, #0f172a 0%, transparent 100%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "120px",
            height: "100%",
            background: "linear-gradient(270deg, #0f172a 0%, transparent 100%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        <div className="animate-scroll" style={{ display: "flex", gap: "1.25rem", width: "max-content", alignItems: "stretch" }}>
          {doubled.map((spec, index) => (
            <a
              key={index}
              href={spec.route}
              style={{
                flexShrink: 0,
                width: "280px",
                display: "flex",
                flexDirection: "column",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(249,115,22,0.2)",
                borderRadius: "16px",
                padding: "2rem 1.5rem",
                textDecoration: "none",
                transition: "background 0.3s, border-color 0.3s, transform 0.3s",
                backdropFilter: "blur(8px)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.background = "rgba(249,115,22,0.1)";
                el.style.borderColor = "rgba(249,115,22,0.5)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.borderColor = "rgba(249,115,22,0.2)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Orange corner accent */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "80px",
                  height: "80px",
                  background: "radial-gradient(circle at top right, rgba(249,115,22,0.18) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* Icon container */}
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "18px",
                  background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  boxShadow: "0 8px 24px rgba(249,115,22,0.35)",
                  flexShrink: 0,
                }}
              >
                <spec.icon size={36} color="#ffffff" strokeWidth={1.75} />
              </div>

              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                {spec.title}
              </h3>
              <p style={{ fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.55, flexGrow: 1 }}>
                {spec.description}
              </p>

              <div
                style={{
                  marginTop: "1.25rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#f97316",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Ver servicio
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
