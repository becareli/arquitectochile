import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Mail, Lock, Users, LayoutDashboard, Star, PlayCircle, Calculator, ArrowRight, ArrowLeft } from "lucide-react";
import MarqueeBanner from "@/components/marquee-banner";
import { useLocation } from "wouter";
import logoImg from "@assets/ArquitectoChile.com_Logo_1771886286621.webp";

function TopBar() {
  const linkClass = "flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors";
  return (
    <div className="bg-[#0f172a] text-white" style={{ height: "36px" }}>
      <div className="w-full px-3 sm:px-6 lg:px-10 h-full">
        <div className="flex justify-end items-center h-full gap-4 sm:gap-5">
          <a href="/portal-cliente" className={linkClass}>
            <LayoutDashboard className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden md:inline text-[11px] font-medium tracking-wide">Portal de Clientes</span>
          </a>
          <a href="/colaboradores" className={linkClass}>
            <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden md:inline text-[11px] font-medium tracking-wide">Red de Colaboradores</span>
          </a>
          <a href="/casos-de-exito" className={linkClass}>
            <Star className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden md:inline text-[11px] font-medium tracking-wide">Casos de Éxito</span>
          </a>
          <a href="/revista" className={linkClass}>
            <PlayCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden md:inline text-[11px] font-medium tracking-wide">Revista Técnica</span>
          </a>
          <a href="/contacto" className={linkClass}>
            <Mail className="w-3 h-3" strokeWidth={1.5} />
            <span className="hidden md:inline text-[11px] font-medium tracking-wide">Contacto</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({
  isOpen,
  onClose,
  navigateToService,
}: {
  isOpen: boolean;
  onClose: () => void;
  navigateToService: (path: string) => void;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const drawerItems = [
    { label: "Revista Técnica", href: "/revista", icon: PlayCircle },
    { label: "Casos de Éxito", href: "/casos-de-exito", icon: Star },
    { label: "Red de Colaboradores", href: "/colaboradores", icon: Users },
    { label: "Portal de Clientes", href: "/portal-cliente", icon: LayoutDashboard },
    { label: "Contacto", href: "/contacto", icon: Mail },
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
            {drawerItems.map((item, index) => (
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
            className="flex items-center justify-center gap-2 w-full bg-[#f97316] text-white rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 py-3.5"
          >
            Arquitecto a Domicilio
            <ArrowRight size={18} strokeWidth={2} />
          </a>
        </div>
      </div>
    </>
  );
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

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
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setIsMobileServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigateToHome = () => {
    setLocation('/');
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
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
    setIsMobileServicesOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50">
      <TopBar />
      <nav className="bg-white border-b border-gray-200">
        <div className="w-full px-2 sm:px-4 lg:px-10">
          <div className="flex items-center justify-between flex-nowrap h-[56px] sm:h-[72px] lg:h-[96px] gap-2">

            {/* Logo + Brand */}
            <button onClick={navigateToHome} className="flex items-center gap-2 lg:gap-4 hover:opacity-80 transition-opacity flex-shrink-0 min-w-0">
              <img src={logoImg} alt="ArquitectoChile" className="h-[58px] sm:h-[68px] lg:h-[86px] w-auto flex-shrink-0" />
              <span className="inline lg:hidden text-sm sm:text-base font-bold text-[#0f172a] whitespace-nowrap tracking-tight">ArquitectoChile<span className="text-gray-400">.com</span></span>
              <span className="hidden lg:inline text-lg font-semibold whitespace-nowrap">
                <span className="text-[#0f172a]">ArquitectoChile</span>
                <span className="text-gray-400">.com</span>
              </span>
            </button>

            {/* ALWAYS-VISIBLE: Servicios + Calculadoras */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-10 flex-shrink-0">
              {/* Mobile Servicios dropdown */}
              <div className="relative lg:hidden" ref={mobileDropdownRef}>
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="flex items-center gap-1 text-base font-bold text-[#0f172a] hover:text-[#f97316] transition-colors whitespace-nowrap py-2"
                >
                  Servicios
                  <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileServicesOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                    <div className="py-1.5 max-h-[60vh] overflow-y-auto">
                      {servicesMenuItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => navigateToService(item.href)}
                          className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#0f172a] transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Servicios dropdown */}
              <div className="relative hidden lg:block" ref={dropdownRef}>
                <button
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className="flex items-center gap-1.5 text-lg font-semibold text-gray-600 hover:text-[#0f172a] transition-colors whitespace-nowrap"
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

              {/* Calculadoras - always visible */}
              <button
                onClick={() => navigateToService('/calculadora-costos')}
                className="text-base lg:text-lg font-bold lg:font-semibold text-[#0f172a] lg:text-gray-600 hover:text-[#f97316] lg:hover:text-[#0f172a] transition-colors whitespace-nowrap py-2 lg:px-0"
              >
                Calculadoras
              </button>
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href="/contacto"
                className="bg-[#f97316] text-white rounded-lg font-extrabold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 whitespace-nowrap inline-flex items-center justify-center text-sm sm:text-sm lg:text-base px-4 py-2.5 sm:px-5 sm:py-3 lg:py-4 lg:min-w-[220px] tracking-wide"
              >
                <span className="sm:hidden">Asesoría</span>
                <span className="hidden sm:inline">Arquitecto a Domicilio</span>
              </a>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-[#0f172a] p-1.5 flex-shrink-0"
                aria-label="Abrir menu"
              >
                <Menu size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MarqueeBanner />

      {location !== "/" && !location.startsWith("/admin") && !location.startsWith("/crm") && (
        <div className="bg-white border-b border-gray-100">
          <div className="w-full px-3 sm:px-6 lg:px-10">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-1.5 py-2 text-sm text-gray-500 hover:text-[#f97316] transition-colors group"
            >
              <ArrowLeft size={15} strokeWidth={2} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-medium">Volver</span>
            </button>
          </div>
        </div>
      )}

      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navigateToService={navigateToService}
      />
    </div>
  );
}
