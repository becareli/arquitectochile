import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ArquitectoChile</h3>
            <p className="text-gray-300 mb-4">
              Diseñamos y construimos tus sueños con pasión y profesionalismo.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#servicios" className="hover:text-white transition-colors">Arquitecto a Domicilio</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Revisor Independiente</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Sistema EIFS</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Diseño de Espacios</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Construcción</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#ebook" className="hover:text-white transition-colors">Ebook Gratis</a></li>
              <li><a href="#calculadoras" className="hover:text-white transition-colors">Calculadora de Costos</a></li>
              <li><a href="#calculadoras" className="hover:text-white transition-colors">Calculadora Energética</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#proyectos" className="hover:text-white transition-colors">Proyectos</a></li>
              <li><a href="#testimonios" className="hover:text-white transition-colors">Testimonios</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <Mail size={16} className="mr-2" />
                info@arquitectochile.com
              </p>
              <p className="flex items-center">
                <Phone size={16} className="mr-2" />
                +56 9 XXXX XXXX
              </p>
              <p className="flex items-center">
                <MapPin size={16} className="mr-2" />
                Santiago, Chile
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ArquitectoChile. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
