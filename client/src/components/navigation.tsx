import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

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
              <button 
                onClick={() => handleNavigation('servicios')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Servicios
              </button>
              <button 
                onClick={() => handleNavigation('arquitecto')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Arquitecto
              </button>
              <button 
                onClick={() => handleNavigation('ebook')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Ebook Gratis
              </button>
              <button 
                onClick={() => handleNavigation('calculadoras')}
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
            <button 
              onClick={() => handleNavigation('servicios')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Servicios
            </button>

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
