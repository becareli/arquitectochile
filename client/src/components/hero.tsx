export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="bg-gradient-to-br from-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">¿Quieres construir una casa hermosa y única para tu familia, sin preocuparte por trámites o problemas legales?</h1>
            <p className="text-xl mb-8 opacity-90">
              Para padres de familia de Santiago que buscan diseño personalizado con visualización 3D, gestión completa de permisos y acompañamiento especializado hasta la entrega final.
            </p>
            
            {/* Beneficios clave basados en VSL */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-accent text-xl mr-3">✓</span>
                  <p className="text-lg font-semibold">Diseño único que refleja tus sueños</p>
                </div>
                <div className="flex items-center">
                  <span className="text-accent text-xl mr-3">✓</span>
                  <p className="text-lg font-semibold">Visualización 3D antes de construir</p>
                </div>
                <div className="flex items-center">
                  <span className="text-accent text-xl mr-3">✓</span>
                  <p className="text-lg font-semibold">Paz mental con trámites legales completos</p>
                </div>
                <div className="flex items-center">
                  <span className="text-accent text-xl mr-3">✓</span>
                  <p className="text-lg font-semibold">Acompañamiento integral hasta la entrega</p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">Arquitecto a Domicilio</p>
                    <p className="opacity-90">Consulta inicial en tu terreno</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">$40,000</p>
                    <p className="text-sm opacity-75">Primera consulta</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('contacto')}
                className="bg-accent text-primary px-8 py-4 rounded-md text-lg font-semibold hover:bg-yellow-500 transition-colors text-center shadow-lg"
              >
                Consulta Gratuita Ahora
              </button>
              <button 
                onClick={() => scrollToSection('ebook')}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-white/20 transition-colors text-center border border-white/30"
              >
                📖 Descarga Ebook Gratis
              </button>
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
