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
        
        {/* Main Navigation Section */}
        <div className="flex justify-center items-center h-16">
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
              <a
                href="/servicios-a-domicilio"
                className="text-dark hover:text-primary transition-colors text-sm font-semibold whitespace-nowrap"
              >
                Asesoría en Terreno
              </a>
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
        
        {/* Access Links Section */}
        <div className="hidden md:flex justify-center items-center py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-medium text-gray-600">Acceso:</span>
            <a
              href="/colaboradores"
              className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition-colors font-semibold text-xs"
            >
              Colaboradores
            </a>
            <a
              href="/portal-cliente"
              className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors font-semibold text-xs"
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
            <a
              href="/servicios-a-domicilio"
              className="block w-full text-left px-3 py-2 text-dark hover:text-primary font-semibold whitespace-nowrap"
            >
              Asesoría en Terreno
            </a>
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
            
            {/* Mobile Action Buttons */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <a
                href="/colaboradores"
                className="block w-full bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors font-semibold text-center"
              >
                Colaboradores
              </a>
              <a
                href="/portal-cliente"
                className="block w-full bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold text-center"
              >
                Portal Cliente
              </a>
              <button 
                onClick={() => scrollToSection('contacto')}
                className="block w-full bg-accent text-white px-3 py-2 rounded-md hover:bg-yellow-500 transition-colors font-semibold"
              >
                Contacto
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
