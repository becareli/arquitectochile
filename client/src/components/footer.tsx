import { Mail, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import logoImg from "@assets/ArquitectoChile.com_Logo_1771886286621.webp";

export default function Footer() {
  return (
    <footer className="bg-blueprint-dark text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img
              src={logoImg}
              alt="ArquitectoChile.com"
              className="h-[100px] w-auto mb-5"
            />
            <p className="text-sm font-semibold text-white mb-1">
              Arq. Patricio Becar Elissegaray
            </p>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Universidad de Chile · Revisor Independiente MINVU · MBA · Desde 1999
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/patricio.becar.elissegaray/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors text-xs"
              >
                Instagram
              </a>
              <span className="text-gray-700">·</span>
              <a
                href="https://www.linkedin.com/in/patriciobecar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors text-xs"
              >
                LinkedIn
              </a>
              <span className="text-gray-700">·</span>
              <a
                href="https://www.facebook.com/arquitectoconstructor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors text-xs"
              >
                Facebook
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-5">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Asesoría a Domicilio", href: "/asesoria-arquitectonica-terreno" },
                { label: "Diseño de Arquitectura", href: "/disenemos-tus-nuevos-espacios" },
                { label: "Regularización de Inmuebles", href: "/regularizacion-inmuebles" },
                { label: "Fusión de Terrenos", href: "/fusion-terrenos-urbanos" },
                { label: "Subdivisión de Terrenos", href: "/subdivision-terrenos-urbanos" },
                { label: "Inspección de Viviendas", href: "/inspeccion-tecnica-viviendas" },
                { label: "Revisor Independiente", href: "/revisor-independiente-de-arquitectura" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-5">
              Recursos
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Calculadora de Costos", href: "/calculadora-costos" },
                { label: "Ebook Gratuito", href: "/#ebook" },
                { label: "Revista", href: "/revista" },
                { label: "Portal del Cliente", href: "/portal-cliente" },
                { label: "Colaboradores", href: "/colaboradores" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-4 mt-8">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li><a href="/aviso-legal" className="text-sm text-gray-400 hover:text-white transition-colors">Aviso Legal</a></li>
              <li><a href="/politica-privacidad" className="text-sm text-gray-400 hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="/politica-cookies" className="text-sm text-gray-400 hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-5">
              Contacto
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:contacto@arquitectochile.com"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                contacto@arquitectochile.com
              </a>
              <a
                href="https://wa.me/56979316827?text=Hola%2C%20quiero%20más%20información%20sobre%20sus%20servicios%20de%20arquitectura"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                WhatsApp +56 9 7931 6827
              </a>
              <div className="text-sm text-gray-500 leading-relaxed">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    Av. Vicuña Mackenna Pte. 7735<br />
                    La Florida, Santiago<br />
                    Región Metropolitana
                  </div>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/2xs5GE5gcr3R5ouf9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#f97316] hover:text-orange-400 transition-colors font-medium"
              >
                Ver en Google Maps
                <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
              </a>
            </div>

            <div className="mt-8">
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 bg-[#f97316] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
              >
                Solicitar Asesoría
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col items-center gap-3">
          <img src={logoImg} alt="ArquitectoChile.com" className="h-10 w-auto opacity-60" />
          <p className="text-xs text-gray-500">
            &copy; 2025 ArquitectoChile.com · Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
