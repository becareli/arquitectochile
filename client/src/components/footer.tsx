import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logoImg from "@assets/ArquitectoChile.com Logo_1754020481868.png";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div>
            <div className="mb-4">
              <img 
                src={logoImg} 
                alt="ArquitectoChile.com" 
                className="h-24 w-auto md:h-28"
              />
            </div>
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
              <li><a href="#servicios" className="hover:text-white transition-colors">Regularización de Inmuebles</a></li>
              <li><a href="/revisor-independiente-de-arquitectura" className="hover:text-white transition-colors">Revisor Independiente</a></li>
              <li><a href="/fusion-terrenos-urbanos" className="hover:text-white transition-colors">Fusión de Terrenos</a></li>
              <li><a href="/inspeccion-tecnica-viviendas" className="hover:text-white transition-colors">Inspección de Viviendas</a></li>
              <li><a href="/tasacion-viviendas-urbanas" className="hover:text-white transition-colors">Tasación de Viviendas</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Sistema EIFS</a></li>
              <li><a href="/disenemos-tus-nuevos-espacios" className="hover:text-white transition-colors">Diseño de Espacios</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#ebook" className="hover:text-white transition-colors">Ebook Gratis</a></li>
              <li><a href="#calculadoras" className="hover:text-white transition-colors">Calculadora de Costos</a></li>
              <li><a href="#calculadoras" className="hover:text-white transition-colors">Calculadora Energética</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Revista</a></li>
              <li><a href="#proyectos" className="hover:text-white transition-colors">Modelos de Casas</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Accesos</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/portal-cliente" className="hover:text-white transition-colors">Portal del Cliente</a></li>
              <li><a href="/colaboradores" className="hover:text-white transition-colors">Portal Colaboradores</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-gray-300">
              <a 
                href="mailto:contacto@arquitectochile.com"
                className="flex items-center hover:text-white transition-colors"
              >
                <Mail size={16} className="mr-2" />
                contacto@arquitectochile.com
              </a>
              <a 
                href="https://wa.me/56979316827?text=Hola%20Patricio,%20me%20interesa%20conocer%20más%20sobre%20tus%20servicios%20de%20arquitectura"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-white transition-colors cursor-pointer"
              >
                <Phone size={16} className="mr-2" />
                +56 9 7931 6827
              </a>
              <a 
                href="https://www.google.cl/maps/place/Arquitecto+en+Chile-+Arquitecto+Patricio+Becar+Elissegaray/@-33.5253021,-70.5977888,140m/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-white transition-colors"
              >
                <MapPin size={16} className="mr-2" />
                Av. Vicuña Mackenna Poniente 7735, La Florida
              </a>
              <div className="mt-3">
                <a 
                  href="https://www.google.cl/maps/place/Arquitecto+en+Chile-+Arquitecto+Patricio+Becar+Elissegaray/@-33.5253021,-70.5977888,140m/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  <MapPin size={14} className="mr-1" />
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</a></li>
              <li><a href="/politica-privacidad" className="hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="/politica-cookies" className="hover:text-white transition-colors">Política de Cookies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Personalizar Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ArquitectoChile. Todos los derechos reservados.</p>
          <p className="mt-2 text-sm">
            Diseñado para cumplir con estándares de Meta, Google y regulaciones de privacidad chilenas
          </p>
        </div>
      </div>
    </footer>
  );
}
