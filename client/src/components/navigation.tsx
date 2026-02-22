import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isArquitectoDropdownOpen, setIsArquitectoDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const arquitectoDropdownRef = useRef<HTMLDivElement>(null);

  const isHomePage = location === "/";

  const services = [
    { name: "Regularización de Viviendas La Florida", path: "/regularizacion-viviendas-la-florida" },
    { name: "Reacondicionamiento Térmico de Viviendas", path: "/reacondicionamiento-termico-viviendas" },
    { name: "Subdivisión de Terrenos Urbanos", path: "/subdivision-terrenos-urbanos" },
    { name: "Tasación de Viviendas Urbanas", path: "/tasacion-viviendas-urbanas" },
    { name: "Inspección Técnica de Viviendas", path: "/inspeccion-tecnica-viviendas" },
    { name: "Fusión de Terrenos Urbanos", path: "/fusion-terrenos-urbanos" },
    { name: "Diseño de Espacios", path: "/#servicios" },
    { name: "Revisor Independiente", path: "/#servicios" },
    { name: "Regularización de Inmuebles", path: "/#servicios" },
    { name: "Sistema EIFS", path: "/#servicios" },
    { name: "Permisos y Recepciones", path: "/#servicios" },
    { name: "Obras Menores Empresas", path: "/obras-menores-empresas" }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
      if (arquitectoDropdownRef.current && !arquitectoDropdownRef.current.contains(event.target as Node)) {
        setIsArquitectoDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    setIsArquitectoDropdownOpen(false);
    setIsMenuOpen(false);
  };

  if (!isHomePage) {
    return (
      <nav className="bg-background shadow-md sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button onClick={navigateToHome} className="text-xl sm:text-2xl font-display font-semibold hover:opacity-80 transition-opacity">
              <span className="text-primary">ArquitectoChile</span>
              <span className="text-secondary">.com</span>
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={navigateToHome}
                className="flex items-center gap-2 text-sm font-medium text-dark hover:text-primary transition-colors"
              >
                <ArrowLeft size={18} />
                <span className="hidden sm:inline">Volver al Inicio</span>
                <span className="sm:hidden">Inicio</span>
              </button>

              <div className="hidden sm:flex items-center space-x-3 border-l border-gray-200 pl-4">
                <a href="https://wa.me/56979316827" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-600 transition-colors" title="WhatsApp">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a href="https://www.instagram.com/arquitectochile/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600 transition-colors" title="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/patriciobecar/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 transition-colors" title="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-background shadow-md sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 border-b border-border">
          <button onClick={navigateToHome} className="text-xl sm:text-2xl font-display font-semibold hover:opacity-80 transition-opacity">
            <span className="text-primary">ArquitectoChile</span>
            <span className="text-secondary">.com</span>
          </button>
          <div className="hidden lg:flex items-center space-x-3">
            <span className="text-accent text-sm">★★★</span>
            <a
              href="/servicios-a-domicilio"
              className="bg-accent text-white px-4 sm:px-5 py-2.5 rounded-lg hover:opacity-90 transition-all duration-300 font-medium text-sm whitespace-nowrap shadow-md hover:shadow-lg"
            >
              Asesoría de Arquitectura a Domicilio
            </a>
            <span className="text-accent text-sm">★★★</span>
          </div>
        </div>

        <div className="flex justify-center items-center min-h-[2.5rem] py-2">
          <div className="hidden md:block">
            <div className="flex items-center space-x-4 lg:space-x-6 justify-center">
              <button 
                onClick={() => handleNavigation('inicio')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Inicio
              </button>
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => {
                    handleNavigation('servicios');
                    setIsServicesDropdownOpen(!isServicesDropdownOpen);
                  }}
                  className="text-dark hover:text-primary transition-colors text-sm font-medium flex items-center gap-1"
                >
                  Servicios
                  <ChevronDown size={16} className={`transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                        Servicios Especializados
                      </div>
                      {services.slice(0, 5).map((service, index) => (
                        <button
                          key={index}
                          onClick={() => navigateToService(service.path)}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {service.name}
                        </button>
                      ))}
                      <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide border-b border-gray-100 border-t border-gray-100 mt-2">
                        Servicios Tradicionales
                      </div>
                      {services.slice(5).map((service, index) => (
                        <button
                          key={index + 5}
                          onClick={() => navigateToService(service.path)}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {service.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" ref={arquitectoDropdownRef}>
                <button 
                  onClick={() => {
                    setIsArquitectoDropdownOpen(!isArquitectoDropdownOpen);
                    setIsServicesDropdownOpen(false);
                  }}
                  className="text-dark hover:text-primary transition-colors text-sm font-medium flex items-center gap-1"
                >
                  Sobre el Arquitecto
                  <ChevronDown size={16} className={`transition-transform ${isArquitectoDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isArquitectoDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-4">
                      <div className="px-4 pb-3 border-b border-gray-100">
                        <h3 className="font-bold text-lg text-gray-800">Patricio Eduardo Becar Elissegaray</h3>
                        <p className="text-sm text-gray-600">Arquitecto Revisor Independiente de Arquitectura</p>
                        <p className="text-sm text-gray-600">Universidad de Chile desde 1999 • MBA • MINVU 3° Categoría</p>
                      </div>
                      
                      <div className="px-4 py-3 space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-700 mb-2">Experiencia Clave</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• MBA Universidad de Chile (2008-2009)</li>
                            <li>• Global MBA University of Macquarie, Australia (2009)</li>
                            <li>• Revisor Independiente MINVU (3° Categoría)</li>
                            <li>• ArquitectoChile.com (2010-Presente)</li>
                            <li>• Especialista en Inteligencia Artificial y Automatizaciones</li>
                            <li>• Experto en normativa de edificación y ascensores</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm text-gray-700 mb-2">Contacto Profesional</h4>
                          <div className="text-xs text-gray-600 space-y-1">
                            <div>📧 arquitectopatricio.becar@gmail.com</div>
                            <div>📧 contacto@arquitectochile.com</div>
                            <div>📱 +56 979316827</div>
                            <div>💼 <a href="https://www.linkedin.com/in/patriciobecar/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">LinkedIn</a></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-4 pt-3 border-t border-gray-100">
                        <a 
                          href="/CV_Arquitecto_Patricio_Becar_2025.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          📄 Descargar CV Completo
                        </a>
                        <button 
                          onClick={() => handleNavigation('arquitecto')}
                          className="block w-full text-center mt-2 text-primary hover:text-blue-700 transition-colors text-xs"
                        >
                          Ver perfil en sitio
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button 
                onClick={() => handleNavigation('ebook')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Ebook Gratis
              </button>
              <button 
                onClick={() => navigateToService('/calculadora-costos')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Calculadoras
              </button>
              <button 
                onClick={() => handleNavigation('testimonios')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Testimonios
              </button>
              <button 
                onClick={() => navigateToService('/revista')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Revista
              </button>
              <button 
                onClick={() => navigateToService('/contacto')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Contacto
              </button>
            </div>
          </div>
          
          <div className="md:hidden absolute right-4">
            <button 
              onClick={toggleMenu}
              className="text-dark hover:text-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        <div className="hidden md:flex justify-center items-center py-1 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-medium text-gray-600">Acceso:</span>
            <a
              href="/crm-admin-dashboard"
              className="bg-gray-400 text-white px-3 py-1.5 rounded-md hover:bg-gray-600 transition-all duration-300 font-medium text-xs shadow-md hover:shadow-lg"
            >
              📊 CRM Admin
            </a>
            <a
              href="/colaboradores"
              className="bg-gray-400 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition-all duration-300 font-medium text-xs shadow-md hover:shadow-lg"
            >
              Colaboradores
            </a>
            <a
              href="/portal-cliente"
              className="bg-gray-400 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition-all duration-300 font-medium text-xs shadow-md hover:shadow-lg"
            >
              Portal de Clientes
            </a>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => handleNavigation('inicio')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Inicio
            </button>
            <div>
              <button 
                onClick={() => {
                  handleNavigation('servicios');
                  setIsMobileServicesOpen(!isMobileServicesOpen);
                }}
                className="flex items-center justify-between w-full text-left px-3 py-2 text-dark hover:text-primary"
              >
                Servicios
                <ChevronDown size={16} className={`transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isMobileServicesOpen && (
                <div className="ml-4 border-l-2 border-gray-200 pl-4 space-y-1">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide py-1">
                    Especializados
                  </div>
                  {services.slice(0, 4).map((service, index) => (
                    <button
                      key={index}
                      onClick={() => navigateToService(service.path)}
                      className="block w-full text-left px-2 py-2 text-sm text-gray-600 hover:text-blue-600"
                    >
                      {service.name}
                    </button>
                  ))}
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide py-1 pt-3">
                    Tradicionales
                  </div>
                  {services.slice(4).map((service, index) => (
                    <button
                      key={index + 4}
                      onClick={() => navigateToService(service.path)}
                      className="block w-full text-left px-2 py-2 text-sm text-gray-600 hover:text-blue-600"
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => handleNavigation('arquitecto')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Arquitecto
            </button>
            <button 
              onClick={() => handleNavigation('ebook')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Ebook Gratis
            </button>
            <button 
              onClick={() => handleNavigation('calculadoras')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Calculadoras
            </button>
            <button 
              onClick={() => handleNavigation('testimonios')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Testimonios
            </button>
            <button 
              onClick={() => navigateToService('/revista')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Revista
            </button>
            <button 
              onClick={() => navigateToService('/contacto')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Contacto
            </button>

            <div className="pt-4 border-t border-gray-200 space-y-2">
              <div className="text-center mb-3">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-black text-sm">★★★</span>
                  <span className="text-xs font-medium text-gray-600">Servicio Principal</span>
                  <span className="text-black text-sm">★★★</span>
                </div>
                <a
                  href="/servicios-a-domicilio"
                  className="block w-full text-center px-3 py-3 bg-accent text-black font-bold rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Asesoría de Arquitectura a Domicilio
                </a>
              </div>
              <div className="text-center text-xs font-medium text-gray-600 mb-2">Acceso:</div>
              <a
                href="/crm-admin-dashboard"
                className="block w-full bg-gray-400 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition-all duration-300 font-medium text-center text-xs shadow-md hover:shadow-lg"
              >
                📊 CRM Admin
              </a>
              <a
                href="/colaboradores"
                className="block w-full bg-gray-400 text-white px-3 py-2 rounded-md hover:bg-green-600 transition-all duration-300 font-medium text-center text-xs shadow-md hover:shadow-lg"
              >
                Colaboradores
              </a>
              <a
                href="/portal-cliente"
                className="block w-full bg-gray-400 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 font-medium text-center text-xs shadow-md hover:shadow-lg"
              >
                Portal de Clientes
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
