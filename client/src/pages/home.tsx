import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import LeadMagnet from "@/components/lead-magnet";
import ConstructionCalculator from "@/components/calculators/construction-calculator";
import EnergyCalculator from "@/components/calculators/energy-calculator";
import Services from "@/components/services";
import RegularizacionInmuebles from "@/components/regularizacion-inmuebles";
import AsesoriaTerreno from "@/components/asesoria-terreno";
import AboutArchitect from "@/components/about-architect";
import Projects from "@/components/projects";
import Testimonials from "@/components/testimonials";
import SocialProof from "@/components/social-proof";
import SalesMechanism from "@/components/sales-mechanism";
import AdvancedLeadMagnets from "@/components/advanced-lead-magnets";
import ObjectionHandling from "@/components/objection-handling";
import Guarantees from "@/components/guarantees";
import Blog from "@/components/blog";
import Contact from "@/components/contact";
import GoogleBusinessIntegration from "@/components/google-business-integration";
import Footer from "@/components/footer";
import CookieConsent from "@/components/cookie-consent";

export default function Home() {
  // SEO Meta tags optimization
  useEffect(() => {
    document.title = "ArquitectoChile.com | Arquitecto Especialista en Santiago - Patricio Becar";
    
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

    setMetaTag('description', 'Servicios profesionales de arquitectura en Santiago. Especialista en regularización de inmuebles, reacondicionamiento térmico, construcción y asesoría a domicilio. Arquitecto Universidad de Chile con 26+ años experiencia.');
    setMetaTag('keywords', 'arquitecto santiago chile, servicios arquitectura, regularización inmuebles, reacondicionamiento térmico, construcción casa, asesoría domicilio, patricio becar, universidad chile');
    setMetaTag('author', 'Patricio Becar Elissegaray - Arquitecto Universidad de Chile');
    setMetaTag('robots', 'index, follow');
    
    // Open Graph tags
    setMetaTag('og:title', 'ArquitectoChile.com | Arquitecto Especialista en Santiago - Patricio Becar', true);
    setMetaTag('og:description', 'Servicios profesionales de arquitectura: regularización de inmuebles, reacondicionamiento térmico, construcción y más. 26+ años de experiencia Universidad de Chile.', true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', 'https://arquitectochile.com', true);
    setMetaTag('og:site_name', 'ArquitectoChile.com', true);
    setMetaTag('og:locale', 'es_CL', true);
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', 'ArquitectoChile.com | Arquitecto Especialista en Santiago');

    // LocalBusiness Schema JSON-LD for SEO
    const createSchemaMarkup = () => {
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Arquitecto en Chile - Arquitecto Patricio Becar Elissegaray - ArquitectoChile.com",
        "alternateName": "ArquitectoChile.com",
        "description": "Servicios profesionales de arquitectura en Santiago: regularización de inmuebles, reacondicionamiento térmico, construcción, asesoría a domicilio y más. 26+ años de experiencia.",
        "url": "http://www.arquitectochile.com/",
        "telephone": "+56 9 7931 6827",
        "email": "contacto@arquitectochile.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. Vicuña Mackenna, Poniente 7735",
          "addressLocality": "La Florida",
          "postalCode": "8260302",
          "addressRegion": "Región Metropolitana",
          "addressCountry": "Chile"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-33.5186",
          "longitude": "-70.5895"
        },
        "hasMap": "https://maps.google.com/?cid=12123957937748651818",
        "founder": {
          "@type": "Person",
          "name": "Patricio Becar Elissegaray",
          "jobTitle": "Arquitecto",
          "alumniOf": "Universidad de Chile"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Chile"
        },
        "serviceType": [
          "Regularización de inmuebles",
          "Reacondicionamiento térmico",
          "Construcción de viviendas",
          "Asesoría arquitectónica a domicilio",
          "Fusión de terrenos",
          "Subdivisión de terrenos",
          "Inspección técnica de viviendas",
          "Tasación de viviendas",
          "Revisor independiente de arquitectura"
        ],
        "priceRange": "$$",
        "openingHours": "Mo-Fr 09:00-18:00",
        "sameAs": [
          "https://www.facebook.com/arquitectoconstructor",
          "https://www.instagram.com/patricio.becar.elissegaray/",
          "https://www.linkedin.com/in/patriciobecar/"
        ]
      };

      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (script) {
        script.textContent = JSON.stringify(schemaData);
      } else {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schemaData);
        document.head.appendChild(script);
      }
    };

    createSchemaMarkup();
    setMetaTag('twitter:description', 'Servicios profesionales de arquitectura en Santiago. Especialista con 26+ años experiencia Universidad de Chile.');
    
    // JSON-LD Schema for Local Business
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "ArquitectoChile.com",
      "description": "Servicios profesionales de arquitectura en Santiago, Chile",
      "url": "https://arquitectochile.com",
      "telephone": "+56979316827",
      "priceRange": "$$",
      "areaServed": {
        "@type": "Country",
        "name": "Chile"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CL",
        "addressRegion": "Región Metropolitana",
        "addressLocality": "Santiago"
      },
      "founder": {
        "@type": "Person",
        "name": "Patricio Becar Elissegaray",
        "jobTitle": "Arquitecto",
        "alumniOf": "Universidad de Chile"
      },
      "serviceType": [
        "Regularización de Inmuebles",
        "Reacondicionamiento Térmico",
        "Construcción",
        "Asesoría Arquitectónica",
        "Inspección Técnica"
      ]
    };

    // Remove existing schema if present
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
      <Hero />
      
      <section id="calculadoras" className="bg-blueprint section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">Herramientas</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-4">Calculadoras Interactivas</h2>
            <p className="text-base text-gray-500 max-w-xl mx-auto">Estimaciones referenciales para planificar su proyecto</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ConstructionCalculator />
            <EnergyCalculator />
          </div>
        </div>
      </section>

      <Services />
      
      {/* Lead Magnet Section */}
      <section id="ebook">
        <LeadMagnet />
      </section>
      
      <RegularizacionInmuebles />
      <AsesoriaTerreno />
      <AboutArchitect />
      <Projects />
      <Testimonials />
      <SocialProof />
      <SalesMechanism />
      <AdvancedLeadMagnets />
      <ObjectionHandling />
      <Guarantees />
      <Blog />
      
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GoogleBusinessIntegration />
        </div>
      </section>
      
      <Contact />
      <Footer />
      <CookieConsent />
    </div>
  );
}
