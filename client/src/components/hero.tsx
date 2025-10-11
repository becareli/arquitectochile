export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="bg-gradient-to-br from-primary via-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            {/* Urgency Banner - Refined */}
            <div className="bg-accent text-white px-5 py-2.5 rounded-lg mb-8 inline-block">
              <p className="font-semibold text-sm">
                ✨ ÚLTIMO CUPO ENERO 2025 - Solo 1 cupo disponible
              </p>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">¿Quieres construir una casa hermosa y única para tu familia, sin preocuparte por trámites o problemas legales?</h1>
            <p className="text-lg sm:text-xl mb-6 opacity-90 leading-relaxed">
              Para padres de familia de Santiago que buscan diseño personalizado con visualización 3D, gestión completa de permisos y acompañamiento especializado hasta la entrega final.
            </p>
            
            {/* Value Stack Preview */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-3">OFERTA ESPECIAL HOY:</h3>
              <p className="text-xl sm:text-2xl font-bold text-accent">
                Descuento Exclusivo para Nuevos Clientes
              </p>
              <p className="text-sm sm:text-base opacity-90 mt-2">Aprovecha esta oferta especial por tiempo limitado</p>
            </div>
            
            {/* Beneficios clave basados en VSL */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-8">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <span className="text-accent text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0 mt-0.5">✓</span>
                  <p className="text-base sm:text-lg font-semibold leading-snug">Diseño único que refleja tus sueños</p>
                </div>
                <div className="flex items-start">
                  <span className="text-accent text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0 mt-0.5">✓</span>
                  <p className="text-base sm:text-lg font-semibold leading-snug">Visualización 3D antes de construir</p>
                </div>
                <div className="flex items-start">
                  <span className="text-accent text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0 mt-0.5">✓</span>
                  <p className="text-base sm:text-lg font-semibold leading-snug">Paz mental con trámites legales completos</p>
                </div>
                <div className="flex items-start">
                  <span className="text-accent text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0 mt-0.5">✓</span>
                  <p className="text-base sm:text-lg font-semibold leading-snug">Acompañamiento integral hasta la entrega</p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">Arquitecto a Domicilio</p>
                    <p className="opacity-90">Consulta inicial en tu terreno</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">$45.000</p>
                    <p className="text-sm opacity-75">Primera consulta</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-5 mt-10">
              <button 
                onClick={() => scrollToSection('contacto')}
                className="bg-accent text-white px-10 py-5 rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-300 text-center shadow-2xl transform hover:scale-105"
              >
                SÍ, QUIERO AGENDAR Y APROVECHAR LA OFERTA
              </button>
              <button 
                onClick={() => scrollToSection('ebook')}
                className="bg-white/15 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-base font-medium hover:bg-white/25 transition-all duration-300 text-center border border-white/40"
              >
                📖 O descarga primero el Ebook Gratuito
              </button>
              
              {/* Risk Reversal - Refined */}
              <div className="text-center mt-6 space-y-2">
                <p className="text-sm opacity-95 font-light">
                  ✓ Consulta 100% gratuita ✓ Sin compromiso ✓ Garantía total
                </p>
                <p className="text-xs text-accent/90 font-medium">
                  ⏰ Oferta válida solo por 24 horas
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Diseño arquitectónico moderno" 
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
