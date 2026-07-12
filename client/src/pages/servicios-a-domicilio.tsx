import { useEffect } from "react";
import Navigation from "@/components/navigation";
import AsesoriaTerreno from "@/components/asesoria-terreno";
import Footer from "@/components/footer";
import WhatsAppChat from "@/components/whatsapp-chat";

export default function ServiciosADomicilio() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    document.title = "Servicios de Arquitectura a Domicilio Santiago | Arquitecto en Terreno";
    
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (meta) {
        meta.content = content;
      } else {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', name);
        } else {
          meta.name = name;
        }
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    setMetaTag('description', 'Arquitecto a domicilio en Santiago. Servicios profesionales de arquitectura en su terreno: análisis, asesoría, inspección y presupuestos. Cobertura Santiago y alrededores.');
    setMetaTag('keywords', 'arquitecto domicilio santiago, arquitecto terreno, servicios arquitectura casa, asesoría domicilio, inspección técnica terreno, arquitecto visita');
    setMetaTag('author', 'Patricio Becar Elissegaray - Arquitecto Universidad de Chile');
    setMetaTag('robots', 'index, follow');
    
    setMetaTag('og:title', 'Servicios de Arquitectura a Domicilio Santiago | El Arquitecto va a Tu Casa', true);
    setMetaTag('og:description', 'Arquitecto profesional a domicilio en Santiago. Análisis en terreno, asesoría especializada y presupuestos detallados. Cobertura Santiago y alrededores.', true);
    setMetaTag('og:type', 'service', true);
    setMetaTag('og:url', 'https://arquitectochile.com/servicios-a-domicilio', true);
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Servicios de Arquitectura a Domicilio",
      "description": "Servicios profesionales de arquitectura en el domicilio del cliente, incluyendo análisis, asesoría e inspección en terreno",
      "provider": {
        "@type": "Person",
        "name": "Patricio Becar Elissegaray",
        "jobTitle": "Arquitecto",
        "url": "https://arquitectochile.com",
        "telephone": "+56979316827",
        "alumniOf": "Universidad de Chile"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Santiago"
        },
        {
          "@type": "State",
          "name": "Región Metropolitana"
        }
      ],
      "serviceType": "Arquitectura a Domicilio",
      "category": "Servicios Profesionales de Arquitectura"
    };

    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (existingSchema) {
      existingSchema.remove();
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Servicios de Arquitectura a Domicilio
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 text-white">
            El arquitecto va a tu casa • Análisis profesional en terreno • Presupuesto detallado
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full text-lg font-semibold">
            🏠 Cobertura: Santiago y alrededores
          </div>
        </div>
      </section>

      {/* VSL Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0f172a] mb-4">
              🎯 ¿Tienes un Proyecto en Mente?
            </h2>
            <p className="text-xl text-[#64748b] mb-4">
              <strong>Mira este video de 3 minutos</strong> y descubre cómo el Arquitecto Patricio Becar 
              puede ayudarte desde la comodidad de tu hogar
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-gray-50 text-[#0f172a] rounded-full text-sm font-semibold">
              ⏱️ Solo 3 minutos que pueden cambiar tu proyecto
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/N-tYdckEG5Y?start=4"
                  title="VSL Asesoría de Arquitectura a Domicilio - ArquitectoChile.com"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <div className="bg-gray-50 rounded-xl p-8 mb-6">

                <h3 className="text-2xl font-bold text-[#0f172a] mb-3">
                  ¿Te Convenció lo que Viste?
                </h3>
                <p className="text-[#64748b] max-w-3xl mx-auto mb-6 text-lg">
                  Como acabas de ver en el video, la <strong>asesoría a domicilio</strong> te permite recibir un análisis 
                  profesional sin moverte de casa. El Arquitecto Patricio Becar va directamente a tu terreno, 
                  evalúa las posibilidades reales y te entrega un presupuesto detallado.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">🏠</div>
                    <div className="font-semibold text-[#0f172a]">Comodidad Total</div>
                    <div className="text-sm text-[#64748b]">El arquitecto va a tu casa</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="font-semibold text-[#0f172a]">Análisis Experto</div>
                    <div className="text-sm text-[#64748b]">25+ años de experiencia</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">💰</div>
                    <div className="font-semibold text-[#0f172a]">Presupuesto Real</div>
                    <div className="text-sm text-[#64748b]">Sin sorpresas posteriores</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/56979316827?text=Hola%20Patricio,%20vi%20tu%20VSL%20y%20quiero%20reservar%20una%20asesoría%20de%20arquitectura%20a%20domicilio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-[#f97316] text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  💬 RESERVAR VISITA AHORA
                </a>
                <a
                  href="tel:+56979316827"
                  className="inline-flex items-center px-8 py-4 bg-[#0f172a] text-white rounded-lg hover:bg-[#1e293b] transition-colors duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  📞 LLAMAR +56979316827
                </a>
              </div>
              
              <div className="mt-6 text-sm text-[#64748b]">
                <p className="mb-2">⭐ Más de 500 asesorías realizadas | 🏆 Arquitecto Universidad de Chile desde 1999</p>
                <p className="font-medium text-[#0f172a]">📍 Cobertura: Santiago y alrededores</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AsesoriaTerreno />
      

      
      {/* Additional Services Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-4">
              Después de la asesoría, accede a todos nuestros servicios
            </h2>
            <p className="text-lg text-[#64748b]">
              Una vez que conoces las posibilidades de tu proyecto, podemos desarrollar:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-2">Proyectos Completos</h3>
              <p className="text-[#64748b]">Ampliaciones, remodelaciones y obra nueva con planos ejecutivos</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-2">Gestión de Permisos</h3>
              <p className="text-[#64748b]">Tramitación completa ante DOM y otros organismos</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏡</span>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-2">Regularización</h3>
              <p className="text-[#64748b]">Ley del Mono - Permiso y Recepción Final simultáneos</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a
              href="/#servicios"
              className="inline-flex items-center px-8 py-4 bg-[#f97316] text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
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
