import Navigation from "@/components/navigation";
import AsesoriaTerreno from "@/components/asesoria-terreno";
import Footer from "@/components/footer";
import WhatsAppChat from "@/components/whatsapp-chat";

export default function ServiciosADomicilio() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Servicios de Arquitectura a Domicilio
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            El arquitecto va a tu casa • Análisis profesional en terreno • Presupuesto detallado
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full text-lg font-semibold">
            🏠 Cobertura: Santiago y alrededores
          </div>
        </div>
      </section>

      <AsesoriaTerreno />
      
      {/* Video Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Reserva tu Visita a Domicilio
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Descubre por qué cada vez más personas eligen nuestro servicio de arquitectura a domicilio
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/URJ0rRVLBU0?start=1"
                  title="Asesoría de Arquitectura a Domicilio - ArquitectoChile.com"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                🏠 Video Promocional
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                Conoce las ventajas de contar con un arquitecto profesional que va directamente a tu hogar. 
                Análisis experto, presupuesto detallado y eliminación de todas tus dudas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/56979316827?text=Hola%20Patricio,%20quiero%20reservar%20una%20asesoría%20de%20arquitectura%20a%20domicilio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gray-600 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 font-semibold"
                >
                  💬 Reservar Visita por WhatsApp
                </a>
                <a
                  href="tel:+56979316827"
                  className="inline-flex items-center px-8 py-4 bg-gray-600 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-semibold"
                >
                  📞 Llamar +56979316827
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Services Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Después de la asesoría, accede a todos nuestros servicios
            </h2>
            <p className="text-lg text-gray-600">
              Una vez que conoces las posibilidades de tu proyecto, podemos desarrollar:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Proyectos Completos</h3>
              <p className="text-gray-600">Ampliaciones, remodelaciones y obra nueva con planos ejecutivos</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Gestión de Permisos</h3>
              <p className="text-gray-600">Tramitación completa ante DOM y otros organismos</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Regularización</h3>
              <p className="text-gray-600">Ley del Mono - Permiso y Recepción Final simultáneos</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a
              href="/#servicios"
              className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-semibold"
            >
              Ver Todos los Servicios
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsAppChat />
    </div>
  );
}