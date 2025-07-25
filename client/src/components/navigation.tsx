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
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold text-primary">ArquitectoChile.com</h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
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
                className="text-dark hover:text-primary transition-colors text-sm font-semibold"
              >
                Asesoría a Domicilio
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
              <a
                href="/colaboradores"
                className="bg-green-600 text-white px-4 py-2.5 rounded-md hover:bg-green-700 transition-colors font-semibold text-sm"
              >
                Colaboradores
              </a>
              <a
                href="/portal-cliente"
                className="bg-blue-600 text-white px-4 py-2.5 rounded-md hover:bg-blue-700 transition-colors font-semibold text-sm"
              >
                Portal Cliente
              </a>
              <button 
                onClick={() => scrollToSection('contacto')}
                className="bg-accent text-white px-4 py-2.5 rounded-md hover:bg-yellow-500 transition-colors font-semibold text-sm"
              >
                Contacto
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-dark hover:text-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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
              className="block w-full text-left px-3 py-2 mx-3 bg-accent text-white rounded-md"
            >
              Contacto
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
