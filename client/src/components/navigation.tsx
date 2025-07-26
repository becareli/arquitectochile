import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="text-center py-4 border-b border-gray-100">
          <h1 className="text-4xl font-bold text-primary">ArquitectoChile.com</h1>
        </div>
        
        {/* Primera Línea - Navegación Principal */}
        <div className="flex justify-center items-center h-12">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6 justify-center">
              <button 
                onClick={() => scrollToSection('inicio')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Inicio
              </button>
              <button 
                onClick={() => scrollToSection('servicios')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Servicios
              </button>
              <button 
                onClick={() => scrollToSection('arquitecto')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Arquitecto
              </button>
              <button 
                onClick={() => scrollToSection('ebook')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Ebook Gratis
              </button>
              <button 
                onClick={() => scrollToSection('calculadoras')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Calculadoras
              </button>
              <button 
                onClick={() => scrollToSection('proyectos')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Proyectos
              </button>
              <button 
                onClick={() => scrollToSection('testimonios')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Testimonios
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="text-dark hover:text-primary transition-colors text-sm font-medium"
              >
                Blog
              </button>
              <button 
                onClick={() => scrollToSection('contacto')}
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
        
        {/* Segunda Línea - Servicio Principal Destacado */}
        <div className="hidden md:flex justify-center items-center py-2 bg-white">
          <div className="flex items-center space-x-3">
            <span className="text-black text-lg">★★★</span>
            <a
              href="/servicios-a-domicilio"
              className="bg-accent text-white px-5 py-2 rounded-md hover:bg-yellow-500 transition-colors font-bold text-sm whitespace-nowrap"
            >
              Asesoría de Arquitectura a Domicilio
            </a>
            <span className="text-black text-lg">★★★</span>
          </div>
        </div>
        
        {/* Tercera Línea - Accesos */}
        <div className="hidden md:flex justify-center items-center py-1.5 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-medium text-gray-600">Acceso:</span>
            <a
              href="/colaboradores"
              className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition-colors font-medium text-xs"
            >
              Colaboradores
            </a>
            <a
              href="/portal-cliente"
              className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors font-medium text-xs"
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
              onClick={() => scrollToSection('inicio')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollToSection('servicios')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Servicios
            </button>

            <button 
              onClick={() => scrollToSection('arquitecto')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Arquitecto
            </button>
            <button 
              onClick={() => scrollToSection('ebook')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Ebook Gratis
            </button>
            <button 
              onClick={() => scrollToSection('calculadoras')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Calculadoras
            </button>
            <button 
              onClick={() => scrollToSection('proyectos')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Proyectos
            </button>
            <button 
              onClick={() => scrollToSection('testimonios')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Testimonios
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection('contacto')}
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary"
            >
              Contacto
            </button>
            
            {/* Servicio Destacado en Mobile */}
            <div className="pt-4 border-t border-gray-200 bg-gray-50 rounded-lg mx-2">
              <div className="text-center mb-2">
                <span className="text-black text-sm">★★★</span>
              </div>
              <a
                href="/servicios-a-domicilio"
                className="block w-full text-center px-3 py-3 bg-accent text-white font-bold rounded-md mx-2 mb-3"
              >
                Asesoría de Arquitectura a Domicilio
              </a>
            </div>
            
            {/* Mobile Access Buttons */}
            <div className="pt-3 space-y-2">
              <div className="text-center text-xs font-medium text-gray-600 mb-2">Acceso:</div>
              <a
                href="/colaboradores"
                className="block w-full bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors font-medium text-center text-xs"
              >
                Colaboradores
              </a>
              <a
                href="/portal-cliente"
                className="block w-full bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium text-center text-xs"
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
