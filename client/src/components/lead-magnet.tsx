import { useEffect, useRef } from "react";
import { Shield, Users, Award, Gift, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ebookCover from "@assets/PortadaEbook_1752612398787.png";

export default function LeadMagnet() {
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formContainerRef.current) return;
    
    // Load systeme.io form script inside the container
    const script = document.createElement('script');
    script.id = 'form-script-tag-20884222';
    script.src = 'https://www.arquitectochile.cl/public/remote/page/33938295c0dcb9fe58761b712e8df05602099d31.js';
    script.async = true;
    
    formContainerRef.current.appendChild(script);
    
    return () => {
      // Cleanup script on unmount
      const existingScript = document.getElementById('form-script-tag-20884222');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-primary via-blue-600 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Ebook presentation */}
          <div className="text-white">
            <div className="bg-gradient-to-b from-blue-600/30 via-blue-700/20 to-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
              <div className="text-center mb-8">
                {/* Imagen del Ebook original más grande */}
                <div className="w-full max-w-md mx-auto mb-8 flex items-center justify-center transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <img 
                    src={ebookCover} 
                    alt="Ebook: ¿Cómo Ampliar o Remodelar Mi Casa? en Santiago de Chile"
                    className="w-full h-auto object-contain"
                    style={{ 
                      filter: 'drop-shadow(16px 16px 40px rgba(0,0,0,0.6))',
                      maxHeight: '500px',
                      minHeight: '400px',
                      width: 'auto'
                    }}
                  />
                </div>
                
                <h2 className="text-4xl font-bold mb-3 text-white">NUEVO EBOOK GRATUITO</h2>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  <span className="text-yellow-300">¿Cómo Ampliar o Remodelar Mi Casa?</span> en Santiago de Chile
                </h3>
                <p className="text-xl text-yellow-300 font-bold">
                  ...y no morir en el intento!!
                </p>
              </div>
              
              <p className="text-lg mb-6 opacity-90">
                Revela el código secreto para transformar tu hogar, obtener todos los permisos y ahorrar miles en el proceso. 
                Descubre cómo la <strong>Metodología MDAC</strong> está ayudando a familias como la tuya a navegar el laberinto de la ampliación... 
                incluso si crees que tu casa ya no puede crecer más.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <p className="text-sm">Todos los Permisos</p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <p className="text-sm">Metodología MDAC</p>
                </div>
                <div className="text-center">
                  <Award className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <p className="text-sm">Ahorra Miles</p>
                </div>
              </div>
            </div>
            
            {/* Testimonials */}
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm italic mb-2">
                  "Pensé que remodelar mi casa en Ñuñoa sería una pesadilla, pero este libro lo hizo sorprendentemente fácil. 
                  Los consejos sobre permisos municipales fueron oro puro. ¡Altamente recomendado!"
                </p>
                <p className="text-sm font-semibold">- Roberto Fuentes, 45 años, Ñuñoa</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm italic mb-2">
                  "Gracias a este ebook, pude ampliar mi casa sin dolores de cabeza. La Metodología MDAC me ahorró tiempo, 
                  dinero y muchísimo estrés. ¡Ahora disfruto de mi nuevo espacio sin remordimientos!"
                </p>
                <p className="text-sm font-semibold">- María José Gómez, 38 años, Providencia</p>
              </div>
            </div>
            
            {/* Call to Action Visual Elements */}
            <div className="text-center mb-8 mt-12">
              {/* Call to Action Text */}
              <div className="bg-yellow-400 text-black px-6 py-4 rounded-xl font-bold text-xl mb-4 transform rotate-1 hover:rotate-0 transition-transform">
                🎁 ¡DESCARGA GRATIS AQUÍ! 🎁
              </div>
              
              <p className="text-black font-medium text-sm leading-relaxed max-w-md mx-auto">
                ® ArquitectoChile es marca registrada. <br />
                Metodología respaldada por más de 25 años de experiencia profesional y cientos de proyectos exitosos en Chile.
              </p>
            </div>
          </div>
          
          {/* Right side - Systeme.io form */}
          <div className="relative -mt-16">
            {/* Título principal fuera de la caja, sobre el fondo azul */}
            <div className="text-center mb-4 relative">
              <h2 className="text-5xl font-black text-white drop-shadow-2xl relative z-10 mb-4">
                DESCARGA AQUÍ TU GUÍA GRATIS
              </h2>
              
              {/* Tres flechas 3D apuntando hacia abajo debajo del título */}
              <div className="flex justify-center space-x-8 mt-2 mb-4">
                {/* Flecha izquierda */}
                <div>
                  <svg width="40" height="50" viewBox="0 0 40 50" className="drop-shadow-2xl">
                    <defs>
                      <linearGradient id="arrowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:"#EF4444", stopOpacity:1}} />
                        <stop offset="50%" style={{stopColor:"#DC2626", stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:"#B91C1C", stopOpacity:1}} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M10 5 L30 5 L30 18 L37 18 L20 42 L3 18 L10 18 Z"
                      fill="url(#arrowGradient1)"
                    />
                    <path
                      d="M12 7 L28 7 L28 16 L32 16 L20 36 L8 16 L12 16 Z"
                      fill="rgba(255,255,255,0.3)"
                    />
                  </svg>
                </div>
                
                {/* Flecha centro */}
                <div>
                  <svg width="40" height="50" viewBox="0 0 40 50" className="drop-shadow-2xl">
                    <defs>
                      <linearGradient id="arrowGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:"#EF4444", stopOpacity:1}} />
                        <stop offset="50%" style={{stopColor:"#DC2626", stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:"#B91C1C", stopOpacity:1}} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M10 5 L30 5 L30 18 L37 18 L20 42 L3 18 L10 18 Z"
                      fill="url(#arrowGradient2)"
                    />
                    <path
                      d="M12 7 L28 7 L28 16 L32 16 L20 36 L8 16 L12 16 Z"
                      fill="rgba(255,255,255,0.3)"
                    />
                  </svg>
                </div>
                
                {/* Flecha derecha */}
                <div>
                  <svg width="40" height="50" viewBox="0 0 40 50" className="drop-shadow-2xl">
                    <defs>
                      <linearGradient id="arrowGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:"#EF4444", stopOpacity:1}} />
                        <stop offset="50%" style={{stopColor:"#DC2626", stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:"#B91C1C", stopOpacity:1}} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M10 5 L30 5 L30 18 L37 18 L20 42 L3 18 L10 18 Z"
                      fill="url(#arrowGradient3)"
                    />
                    <path
                      d="M12 7 L28 7 L28 16 L32 16 L20 36 L8 16 L12 16 Z"
                      fill="rgba(255,255,255,0.3)"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Beneficios destacados - Iconos grandes */}
              <div className="flex justify-center gap-6 mb-6">
                <div className="flex flex-col items-center text-white">
                  <Gift className="w-10 h-10 mb-1 text-yellow-300" />
                  <p className="text-xs font-semibold">Sin costo</p>
                </div>
                <div className="flex flex-col items-center text-white">
                  <CheckCircle className="w-10 h-10 mb-1 text-yellow-300" />
                  <p className="text-xs font-semibold">Envío instantáneo</p>
                </div>
                <div className="flex flex-col items-center text-white">
                  <Shield className="w-10 h-10 mb-1 text-yellow-300" />
                  <p className="text-xs font-semibold">100% seguro</p>
                </div>
              </div>
            </div>
            
            {/* Systeme.io form container - styled to match design */}
            <div 
              ref={formContainerRef}
              className="bg-white rounded-2xl shadow-2xl border-4 border-yellow-400 p-6"
            >
              {/* Systeme.io will inject the form here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
