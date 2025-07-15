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
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">DISEÑAMOS y CONSTRUIMOS TUS SUEÑOS</h1>
            <p className="text-xl mb-8 opacity-90">
              Con Pasión nos dedicamos para que Tú y tu Familia tengan una mejor Calidad de Vida en los espacios en tu hogar o en tu negocio.
            </p>
            
            {/* Destacar servicio de $40,000 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">🏠</span>
                </div>
                <h3 className="text-2xl font-semibold">Arquitecto a Domicilio</h3>
              </div>
              <p className="text-lg mb-4">
                Asesoría profesional en tu terreno por solo <span className="font-bold text-accent">$40,000</span>
              </p>
              <p className="opacity-90">Ahorra tiempo y dinero con nuestro servicio de consultoría personalizada</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('contacto')}
                className="bg-accent text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-yellow-500 transition-colors text-center"
              >
                Cotizar Ahora
              </button>
              <button 
                onClick={() => scrollToSection('calculadoras')}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-white/20 transition-colors text-center"
              >
                Calculadoras Gratis
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
