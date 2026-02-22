import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logoImg from "@assets/ArquitectoChile.com Logo_1754020481868.png";

export default function Footer() {
  return (
    <footer className="bg-[hsl(210,15%,20%)] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
          <div>
            <div className="mb-4">
              <img 
                src={logoImg} 
                alt="ArquitectoChile.com" 
                className="h-24 w-auto md:h-28"
              />
            </div>
            <p className="text-gray-300 text-sm mb-2 font-medium">
              Arquitecto Patricio Becar Elissegaray
            </p>
            <p className="text-gray-300 mb-4">
              Diseñamos y construimos tus sueños con pasión y profesionalismo.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/arquitectoconstructor" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook - ArquitectoChile"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/patricio.becar.elissegaray/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram - Patricio Becar"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/patriciobecar/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn - Patricio Becar"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-xl font-bold mb-5 text-white">Servicios</h4>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li><a href="#servicios" className="hover:text-white transition-colors">Arquitecto a Domicilio</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Regularización de Inmuebles</a></li>
              <li><a href="/revisor-independiente-de-arquitectura" className="hover:text-white transition-colors">Revisor Independiente</a></li>
              <li><a href="/fusion-terrenos-urbanos" className="hover:text-white transition-colors">Fusión de Terrenos</a></li>
              <li><a href="/inspeccion-tecnica-viviendas" className="hover:text-white transition-colors">Inspección de Viviendas</a></li>
              <li><a href="/tasacion-viviendas-urbanas" className="hover:text-white transition-colors">Tasación de Viviendas</a></li>
              <li><a href="/subdivision-terrenos-urbanos" className="hover:text-white transition-colors">Subdivisión de Terrenos</a></li>
              <li><a href="/reacondicionamiento-termico-viviendas" className="hover:text-white transition-colors">Reacondicionamiento Térmico</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Sistema EIFS</a></li>
              <li><a href="/disenemos-tus-nuevos-espacios" className="hover:text-white transition-colors">Diseño de Espacios</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl font-bold mb-5 text-white">Recursos</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#ebook" className="hover:text-white transition-colors">Ebook Gratis</a></li>
              <li><a href="/calculadora-costos" className="hover:text-white transition-colors">Calculadora de Costos</a></li>
              <li><a href="#calculadoras" className="hover:text-white transition-colors">Calculadora Energética</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Revista</a></li>
              <li><a href="#proyectos" className="hover:text-white transition-colors">Modelos de Casas</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl font-bold mb-5 text-white">Accesos</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/portal-cliente" className="hover:text-white transition-colors">Portal del Cliente</a></li>
              <li><a href="/colaboradores" className="hover:text-white transition-colors">Portal Colaboradores</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl font-bold mb-5 text-white">Legal</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</a></li>
              <li><a href="/politica-privacidad" className="hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="/politica-cookies" className="hover:text-white transition-colors">Política de Cookies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Personalizar Cookies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl font-bold mb-5 text-white">Contacto</h4>
            <div className="space-y-3 text-gray-300">
              <a 
                href="mailto:contacto@arquitectochile.com"
                className="block text-sm hover:text-white transition-colors"
              >
                contacto@arquitectochile.com
              </a>
              <a 
                href="mailto:arquitectopatricio.becar@gmail.com"
                className="block text-sm hover:text-white transition-colors"
              >
                arquitectopatricio.becar@gmail.com
              </a>
              <a 
                href="/contacto"
                className="block text-sm hover:text-white transition-colors"
              >
                Formulario de Contacto
              </a>
              <div className="text-sm">
                <div>Av. Vicuña Mackenna, Poniente 7735</div>
                <div>8260302 La Florida</div>
                <div>Región Metropolitana, Chile</div>
                <a 
                  href="https://maps.google.com/?cid=12123957937748651818"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-2 px-3 py-1.5 bg-[hsl(14,70%,50%)] text-white text-xs rounded-md hover:bg-[hsl(14,70%,45%)] transition-colors font-medium"
                >
                  <MapPin size={12} className="mr-1" />
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-10 text-center text-gray-400">
          <p>&copy; 2025 ArquitectoChile. Todos los derechos reservados.</p>
          <p className="mt-2 text-sm">
            Diseñado para cumplir con estándares de Meta, Google y regulaciones de privacidad chilenas
          </p>
        </div>
      </div>
    </footer>
  );
}
