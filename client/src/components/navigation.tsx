import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isArquitectoDropdownOpen, setIsArquitectoDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [, setLocation] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const arquitectoDropdownRef = useRef<HTMLDivElement>(null);

  // Services list
  const services = [
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
    { name: "Estudios de Cabida", path: "/#servicios" }
  ];

  // Close dropdown when clicking outside
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
    // If we're not on the home page, navigate to home first
    const currentPath = window.location.pathname;
    if (currentPath !== '/') {
      setLocation(`/#${sectionId}`);
    } else {
      // If we're on home page, scroll to section
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
      // Handle anchor links
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
      // Navigate to specific service page
      setLocation(path);
    }
    setIsServicesDropdownOpen(false);
    setIsArquitectoDropdownOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <button onClick={navigateToHome} className="text-2xl font-bold hover:opacity-80 transition-opacity">
            <span className="text-primary">ArquitectoChile</span>
            <span className="text-gray-600">.com</span>
          </button>
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-black text-sm">★★★</span>
            <a
              href="/servicios-a-domicilio"
              className="bg-accent text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-all duration-300 font-bold text-xs whitespace-nowrap shadow-md hover:shadow-lg"
            >
              Asesoría de Arquitectura a Domicilio
            </a>
            <span className="text-black text-sm">★★★</span>
          </div>
        </div>
        
        {/* Primera Línea - Navegación Principal */}
        <div className="flex justify-center items-center h-10">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6 justify-center">
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
                
                {/* Services Dropdown */}
                {isServicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                        Servicios Especializados
                      </div>
                      {services.slice(0, 4).map((service, index) => (
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
                      {services.slice(4).map((service, index) => (
                        <button
                          key={index + 4}
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
                
                {/* Arquitecto Dropdown */}
                {isArquitectoDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-4">
                      <div className="px-4 pb-3 border-b border-gray-100">
                        <h3 className="font-bold text-lg text-gray-800">Patricio Eduardo Becar Elissegaray</h3>
                        <p className="text-sm text-gray-600">Arquitecto Universidad de Chile desde 1999</p>
                        <p className="text-sm text-gray-600">MBA - Revisor Independiente MINVU 3° Categoría</p>
                      </div>
                      
                      <div className="px-4 py-3 space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-700 mb-2">Experiencia Clave</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• MBA Universidad de Chile</li>
                            <li>• Revisor Independiente MINVU (3° Categoría)</li>
                            <li>• 15+ años experiencia municipal</li>
                            <li>• Especialista en normativa de edificación</li>
                            <li>• Experto en ascensores y montacargas</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm text-gray-700 mb-2">Contacto Profesional</h4>
                          <div className="text-xs text-gray-600 space-y-1">
                            <div>📧 arquitectopatriciobecar@gmail.com</div>
                            <div>📧 contacto@arquitectochile.com</div>
                            <div>📱 +56 9 7931 6827</div>
                            <div>💼 <a href="https://www.linkedin.com/in/patriciobecar/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">LinkedIn</a></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-4 pt-3 border-t border-gray-100">
                        <a 
                          href="/CV_PBE_2025.pdf"
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
                onClick={() => handleNavigation('proyectos')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Modelos de Casas
              </button>
              <button 
                onClick={() => handleNavigation('testimonios')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Testimonios
              </button>
              <button 
                onClick={() => handleNavigation('blog')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Revista
              </button>
              <button 
                onClick={() => handleNavigation('contacto')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Contacto
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden absolute right-4">
            <button 
              onClick={toggleMenu}
              className="text-dark hover:text-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        
        {/* Segunda Línea - Accesos */}
        <div className="hidden md:flex justify-center items-center py-1 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-medium text-gray-600">Acceso:</span>
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
      
      {/* Mobile Navigation */}
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
              
              {/* Mobile Services Dropdown */}
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
              onClick={() => handleNavigation('proyectos')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Modelos de Casas
            </button>
            <button 
              onClick={() => handleNavigation('testimonios')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Testimonios
            </button>
            <button 
              onClick={() => handleNavigation('blog')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Revista
            </button>
            <button 
              onClick={() => handleNavigation('contacto')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Contacto
            </button>
            

            
            {/* Mobile Access Buttons */}
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
