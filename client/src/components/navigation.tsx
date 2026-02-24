import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Mail, Lock, Users, LayoutDashboard, Star, PlayCircle, Calculator, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import logoImg from "@assets/ArquitectoChile.com_Logo_1771886286621.png";

function TopBar() {
  const fullLinkClass = "flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-white transition-colors font-medium tracking-wide whitespace-nowrap";

  return (
    <div className="bg-[#0f172a] text-white" style={{ height: "40px" }}>
      <div className="w-full px-4 sm:px-6 lg:px-10 h-full">
        <div className="flex justify-end items-center h-full gap-3 sm:gap-5">
          <a href="/contacto" className={fullLinkClass}>
            <Mail className="w-3 h-3" strokeWidth={1.5} />
            <span className="hidden md:inline">Contacto</span>
          </a>
          <a href="/admin" className={fullLinkClass}>
            <Lock className="w-3 h-3" strokeWidth={1.5} />
            <span className="hidden md:inline">Admin</span>
          </a>
          <a href="/revista" className={fullLinkClass}>
            <PlayCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden md:inline">Revista Técnica</span>
          </a>
          <a href="/casos-de-exito" className={fullLinkClass}>
            <Star className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden md:inline">Casos de Éxito</span>
          </a>
          <a href="/colaboradores" className={fullLinkClass}>
            <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden md:inline">Red de Colaboradores</span>
          </a>
          <a href="/portal-cliente" className={fullLinkClass}>
            <LayoutDashboard className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden md:inline">Portal de Clientes</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({
  isOpen,
  onClose,
  servicesMenuItems,
  navigateToService,
}: {
  isOpen: boolean;
  onClose: () => void;
  servicesMenuItems: { label: string; href: string }[];
  navigateToService: (path: string) => void;
}) {
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsServicesExpanded(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const drawerMenuItems = [
    { label: "Calculadoras", href: "/calculadora-costos", icon: Calculator },
    { label: "Revista Técnica", href: "/revista", icon: PlayCircle },
    { label: "Casos de Éxito", href: "/casos-de-exito", icon: Star },
    { label: "Red de Colaboradores", href: "/colaboradores", icon: Users },
    { label: "Portal de Clientes", href: "/portal-cliente", icon: LayoutDashboard },
    { label: "Admin", href: "/admin", icon: Lock },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-[300px] max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col overflow-hidden">
        <div className="bg-blueprint border-b border-gray-200 px-5 py-4 flex items-center justify-between flex-shrink-0">
          <span className="text-base font-semibold text-[#0f172a]">Menu</span>
          <button onClick={onClose} className="text-[#0f172a] p-1">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-blueprint">
          <div className="px-5 py-4 space-y-1">
            <div>
              <button
                onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                className="flex items-center justify-between w-full text-left px-3 py-3 text-base font-semibold text-[#0f172a] hover:bg-white/60 rounded-lg transition-colors"
              >
                Servicios
                <ChevronDown size={18} strokeWidth={1.5} className={`text-gray-400 transition-transform ${isServicesExpanded ? 'rotate-180' : ''}`} />
              </button>
              {isServicesExpanded && (
                <div className="ml-3 border-l-2 border-[#f97316]/30 pl-4 space-y-0.5 mt-1 mb-2">
                  {servicesMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => navigateToService(item.href)}
                      className="block w-full text-left px-2 py-2.5 text-sm text-gray-500 hover:text-[#0f172a] hover:bg-white/60 rounded transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {drawerMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigateToService(item.href)}
                className="flex items-center gap-3 w-full text-left px-3 py-3 text-base font-semibold text-[#0f172a] hover:bg-white/60 rounded-lg transition-colors"
              >
                <item.icon size={18} strokeWidth={1.5} className="text-gray-400" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 py-4 border-t border-gray-200 bg-white flex-shrink-0">
          <a
            href="/contacto"
            className="flex items-center justify-center gap-2 w-full bg-[#f97316] text-white rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
            style={{ padding: "14px 20px" }}
          >
            Arquitecto a Domicilio
            <ArrowRight size={18} strokeWidth={2} />
          </a>
          <a
            href="/contacto"
            className="block text-center text-xs text-gray-400 mt-2 hover:text-[#0f172a] transition-colors"
          >
            contacto@arquitectochile.com
          </a>
        </div>
      </div>
    </>
  );
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHomePage = location === "/";

  const servicesMenuItems = [
    { label: "Asesoría de Arquitectura a Domicilio", href: "/asesoria-arquitectonica-terreno" },
    { label: "Diseño de Arquitectura", href: "/disenemos-tus-nuevos-espacios" },
    { label: "Obras Menores para Empresas", href: "/obras-menores-empresas" },
    { label: "Regularización de Inmuebles", href: "/regularizacion-inmuebles" },
    { label: "Permiso de Edificación y Recepción Final", href: "/permiso-edificacion-recepcion-final" },
    { label: "Revisor Independiente de Arquitectura", href: "/revisor-independiente-de-arquitectura" },
    { label: "Subdivisión de Terrenos Urbanos", href: "/subdivision-terrenos-urbanos" },
    { label: "Fusión de Terrenos Urbanos", href: "/fusion-terrenos-urbanos" },
    { label: "Inspección Técnica de Viviendas", href: "/inspeccion-tecnica-viviendas" },
    { label: "Tasación de Viviendas Urbanas", href: "/tasacion-viviendas-urbanas" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigateToHome = () => {
    setLocation('/');
    setIsMenuOpen(false);
  };

  const navigateToService = (path: string) => {
    if (path.startsWith('/#')) {
      const currentPath = window.location.pathname;
      if (currentPath !== '/') {
        setLocation(path);
      } else {
        const sectionId = path.substring(2);
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      setLocation(path);
    }
    setIsServicesDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const navLinkClass = "text-gray-600 hover:text-[#0f172a] transition-colors text-lg font-semibold whitespace-nowrap";

  return (
    <div className="sticky top-0 z-50">
      <TopBar />
      <nav className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between flex-wrap lg:flex-nowrap h-auto lg:h-[140px] py-3 lg:py-0 gap-y-2">
            <button onClick={navigateToHome} className="flex items-center gap-3 lg:gap-4 hover:opacity-80 transition-opacity flex-shrink-0 lg:mr-12">
              <img src={logoImg} alt="ArquitectoChile" className="h-[50px] sm:h-[60px] lg:h-[90px] w-auto flex-shrink-0" />
              <span className="hidden sm:inline text-lg lg:text-xl font-semibold whitespace-nowrap">
                <span className="text-[#0f172a]">ArquitectoChile</span>
                <span className="text-gray-400">.com</span>
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-10 flex-shrink-0 mr-8">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className={`${navLinkClass} flex items-center gap-1.5`}
                >
                  Servicios
                  <ChevronDown size={16} strokeWidth={1.5} className={`transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isServicesDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                    <div className="py-2">
                      {servicesMenuItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => navigateToService(item.href)}
                          className="w-full text-left px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#0f172a] transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => navigateToService('/calculadora-costos')} className={navLinkClass}>Calculadoras</button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <a
                href="/contacto"
                className="bg-[#f97316] text-white rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 whitespace-nowrap inline-flex items-center justify-center text-xs sm:text-sm lg:text-base px-3 py-2.5 sm:px-4 sm:py-3 lg:py-4 lg:min-w-[220px]"
              >
                <span className="sm:hidden">Consulta Gratis</span>
                <span className="hidden sm:inline">Arquitecto a Domicilio</span>
              </a>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-[#0f172a] p-1.5 flex-shrink-0"
                aria-label="Abrir menu"
              >
                <Menu size={26} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        servicesMenuItems={servicesMenuItems}
        navigateToService={navigateToService}
      />
    </div>
  );
}
