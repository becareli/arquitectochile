import { Shield, Users, Award, Gift, CheckCircle, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ebookCover from "@assets/PortadaEbook_1752612398787.png";

export default function LeadMagnet() {
  return (
    <section className="py-24 bg-gradient-to-b from-primary via-blue-600 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Ebook presentation */}
          <div className="text-white space-y-8">
            {/* Main title */}
            <div className="text-center lg:text-left space-y-4">
              <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold mb-2">
                🎁 COMPLETAMENTE GRATIS
              </div>
              <h2 className="text-5xl md:text-6xl font-black leading-tight">
                DESCARGA TU
                <span className="block text-yellow-300">EBOOK GRATIS</span>
              </h2>
            </div>

            {/* Ebook cover with animation */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-yellow-400/20 rounded-3xl blur-2xl transform rotate-6"></div>
              <div className="relative transform hover:scale-105 transition-transform duration-500">
                <img 
                  src={ebookCover} 
                  alt="Ebook: ¿Cómo Ampliar o Remodelar Mi Casa? en Santiago de Chile"
                  className="w-full h-auto object-contain rounded-2xl shadow-2xl"
                  style={{ 
                    filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.5))',
                  }}
                />
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <Shield className="w-12 h-12 mx-auto mb-2 text-yellow-300" />
                <p className="text-sm font-semibold">Todos los Permisos</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-2 text-yellow-300" />
                <p className="text-sm font-semibold">Metodología MDAC</p>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 mx-auto mb-2 text-yellow-300" />
                <p className="text-sm font-semibold">Ahorra Miles</p>
              </div>
            </div>
          </div>
          
          {/* Right side - CTA and description */}
          <div className="space-y-8">
            {/* Title section */}
            <div className="bg-gradient-to-br from-blue-600/40 to-transparent backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                <span className="text-yellow-300">¿Cómo Ampliar o Remodelar Mi Casa?</span>
                <span className="block mt-2">en Santiago de Chile</span>
              </h3>
              <p className="text-2xl text-yellow-300 font-bold mb-6">
                ...y no morir en el intento!!
              </p>
              
              <p className="text-lg text-white/90 leading-relaxed">
                Revela el código secreto para transformar tu hogar, obtener todos los permisos y ahorrar miles en el proceso. 
                Descubre cómo la <strong className="text-yellow-300">Metodología MDAC</strong> está ayudando a familias como la tuya a navegar el laberinto de la ampliación.
              </p>
            </div>

            {/* CTA Button - Large and prominent */}
            <div className="text-center space-y-6">
              {/* Arrows pointing down */}
              <div className="flex justify-center gap-4">
                {[1, 2, 3].map((i) => (
                  <svg key={i} width="40" height="50" viewBox="0 0 40 50" className="drop-shadow-2xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                    <defs>
                      <linearGradient id={`arrowGrad${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:"#FBBF24", stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:"#F59E0B", stopOpacity:1}} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M10 5 L30 5 L30 18 L37 18 L20 42 L3 18 L10 18 Z"
                      fill={`url(#arrowGrad${i})`}
                    />
                  </svg>
                ))}
              </div>

              <a 
                href="https://www.arquitectochile.cl/ebook" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Button 
                  size="lg"
                  className="w-full max-w-md mx-auto bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xl py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-yellow-300"
                  data-testid="button-descargar-ebook"
                >
                  <Download className="w-6 h-6 mr-3" />
                  DESCARGAR EBOOK GRATIS
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </a>

              {/* Trust indicators */}
              <div className="flex justify-center gap-8 text-white">
                <div className="flex items-center gap-2">
                  <Gift className="w-6 h-6 text-yellow-300" />
                  <span className="text-sm font-semibold">100% Gratis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-yellow-300" />
                  <span className="text-sm font-semibold">Descarga Inmediata</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-yellow-300" />
                  <span className="text-sm font-semibold">Sin Registro</span>
                </div>
              </div>

              <p className="text-white/80 text-sm max-w-md mx-auto">
                ® ArquitectoChile es marca registrada. Metodología respaldada por más de 25 años de experiencia profesional y cientos de proyectos exitosos en Chile.
              </p>
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <p className="text-white/90 italic mb-3">
                  "Pensé que remodelar mi casa en Ñuñoa sería una pesadilla, pero este libro lo hizo sorprendentemente fácil. 
                  Los consejos sobre permisos municipales fueron oro puro. ¡Altamente recomendado!"
                </p>
                <p className="text-yellow-300 font-semibold text-sm">- Roberto Fuentes, 45 años, Ñuñoa</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <p className="text-white/90 italic mb-3">
                  "Gracias a este ebook, pude ampliar mi casa sin dolores de cabeza. La Metodología MDAC me ahorró tiempo, 
                  dinero y muchísimo estrés. ¡Ahora disfruto de mi nuevo espacio sin remordimientos!"
                </p>
                <p className="text-yellow-300 font-semibold text-sm">- María José Gómez, 38 años, Providencia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
