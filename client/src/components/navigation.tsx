import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import logoImg from "@assets/ArquitectoChile.com_Logo_1771886286621.png";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
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

  const handleNavigation = (sectionId: string) => {
    const currentPath = window.location.pathname;
    if (currentPath !== '/') {
      setLocation(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

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

  const navLinkClass = "text-gray-600 hover:text-[#0f172a] transition-colors text-sm font-medium";

  const LogoBrand = ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
      <img src={logoImg} alt="ArquitectoChile" className="h-[45px] w-auto" />
      <span className="text-lg font-bold">
        <span className="text-[#0f172a]">ArquitectoChile</span>
        <span className="text-gray-400">.com</span>
      </span>
    </button>
  );

  if (!isHomePage) {
    return (
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <LogoBrand onClick={navigateToHome} />
            <div className="flex items-center gap-4">
              <button onClick={navigateToHome} className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#0f172a] transition-colors">
                <ArrowLeft size={16} strokeWidth={1.5} />
                <span className="hidden sm:inline">Volver al Inicio</span>
                <span className="sm:hidden">Inicio</span>
              </button>
              <a
                href="/contacto"
                className="bg-[#f97316] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <LogoBrand onClick={navigateToHome} />

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => handleNavigation('inicio')} className={navLinkClass}>Inicio</button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                className={`${navLinkClass} flex items-center gap-1`}
              >
                Servicios
                <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                  <div className="py-1">
                    {servicesMenuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => navigateToService(item.href)}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#0f172a] transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => navigateToService('/calculadora-costos')} className={navLinkClass}>Calculadoras</button>
            <button onClick={() => handleNavigation('testimonios')} className={navLinkClass}>Testimonios</button>
            <button onClick={() => navigateToService('/contacto')} className={navLinkClass}>Contacto</button>
          </div>

          <div className="hidden md:block">
            <a
              href="/contacto"
              className="bg-[#f97316] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
            >
              Arquitecto a Domicilio
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#0f172a]"
          >
            {isMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-1">
            <button onClick={() => handleNavigation('inicio')} className="block w-full text-left px-3 py-2.5 text-sm text-gray-600 hover:text-[#0f172a] rounded-lg">Inicio</button>
            <div>
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="flex items-center justify-between w-full text-left px-3 py-2.5 text-sm text-gray-600 hover:text-[#0f172a] rounded-lg"
              >
                Servicios
                <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileServicesOpen && (
                <div className="ml-4 border-l border-gray-200 pl-4 space-y-0.5 mt-1">
                  {servicesMenuItems.map((item, index) => (
                    <button key={index} onClick={() => navigateToService(item.href)} className="block w-full text-left px-2 py-2 text-sm text-gray-500 hover:text-[#0f172a]">
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => navigateToService('/calculadora-costos')} className="block w-full text-left px-3 py-2.5 text-sm text-gray-600 hover:text-[#0f172a] rounded-lg">Calculadoras</button>
            <button onClick={() => handleNavigation('testimonios')} className="block w-full text-left px-3 py-2.5 text-sm text-gray-600 hover:text-[#0f172a] rounded-lg">Testimonios</button>
            <button onClick={() => navigateToService('/contacto')} className="block w-full text-left px-3 py-2.5 text-sm text-gray-600 hover:text-[#0f172a] rounded-lg">Contacto</button>
            <div className="pt-3 border-t border-gray-100 mt-2">
              <a href="/contacto" className="block w-full text-center bg-[#f97316] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                Arquitecto a Domicilio
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
