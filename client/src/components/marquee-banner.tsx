import { useLocation } from "wouter";

const services = [
  { label: "Regularización de Inmuebles", href: "/regularizacion-inmuebles" },
  { label: "Diseño de Arquitectura", href: "/disenemos-tus-nuevos-espacios" },
  { label: "Asesoría de Arquitectura a Domicilio", href: "/asesoria-arquitectonica-terreno" },
  { label: "Revisor Independiente de Arquitectura", href: "/revisor-independiente-de-arquitectura" },
  { label: "Registro de Colaboradores", href: "/colaboradores" },
  { label: "Contacto General", href: "/contacto" },
];

function ServiceList({
  ariaHidden,
  onNavigate,
}: {
  ariaHidden?: boolean;
  onNavigate: (href: string) => void;
}) {
  return (
    <div
      className="flex items-center gap-12 px-6"
      aria-hidden={ariaHidden || undefined}
    >
      {services.map((s, i) => (
        <span key={i} className="flex items-center gap-12">
          <button
            onClick={() => onNavigate(s.href)}
            className="text-sm font-semibold tracking-wide text-slate-200 hover:text-amber-400 transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            {s.label}
          </button>
          <span className="text-amber-500 text-xs select-none">◆</span>
        </span>
      ))}
    </div>
  );
}

export default function MarqueeBanner() {
  const [, setLocation] = useLocation();

  const navigate = (href: string) => {
    setLocation(href);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 border-b border-gray-800 py-3 z-40">
      <div className="flex animate-scroll whitespace-nowrap w-max">
        <ServiceList onNavigate={navigate} />
        <ServiceList ariaHidden onNavigate={navigate} />
      </div>
    </div>
  );
}
