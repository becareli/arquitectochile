import { useEffect } from "react";
import { Home, Shield, Search, Calculator, Merge, MapPin, BadgeCheck, FileText, Box, Briefcase, Scale, Building2 } from "lucide-react";
import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import LeadMagnet from "@/components/lead-magnet";
import ViviendaAutor from "@/components/vivienda-autor";
import ServicePillar from "@/components/service-pillar";
import CollaboratorsBanner from "@/components/collaborators-banner";
import SalesMechanism from "@/components/sales-mechanism";
import EnergyCalculator from "@/components/calculators/energy-calculator";
import ConstructionCalculator from "@/components/calculators/construction-calculator";
import Testimonials from "@/components/testimonials";
import SocialProof from "@/components/social-proof";
import AdvancedLeadMagnets from "@/components/advanced-lead-magnets";
import Guarantees from "@/components/guarantees";
import ObjectionHandling from "@/components/objection-handling";
import GoogleBusinessIntegration from "@/components/google-business-integration";
import Contact from "@/components/contact";
import SpecialtiesCarousel from "@/components/specialties-carousel";
import Footer from "@/components/footer";
import CookieConsent from "@/components/cookie-consent";

export default function HomePage() {
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

    setMetaTag('og:title', 'ArquitectoChile.com | Arquitecto Especialista en Santiago - Patricio Becar', true);
    setMetaTag('og:description', 'Servicios profesionales de arquitectura: regularización de inmuebles, reacondicionamiento térmico, construcción y más. 26+ años de experiencia Universidad de Chile.', true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', 'https://arquitectochile.com', true);
    setMetaTag('og:site_name', 'ArquitectoChile.com', true);
    setMetaTag('og:locale', 'es_CL', true);

    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', 'ArquitectoChile.com | Arquitecto Especialista en Santiago');
    setMetaTag('twitter:description', 'Servicios profesionales de arquitectura en Santiago. Especialista con 26+ años experiencia Universidad de Chile.');
  }, []);

  const gestionNormativaServices = [
    { id: "fusion-terrenos-urbanos", title: "Fusión de Terrenos Urbanos", price: "Desde $890.000", route: "/fusion-terrenos-urbanos", icon: Merge },
    { id: "subdivision-terrenos-urbanos", title: "Subdivisión de Terrenos Urbanos", price: "Consultar", route: "/subdivision-terrenos-urbanos", icon: MapPin },
    { id: "regularizacion-inmuebles", title: "Regularización de Inmuebles (Ley del Mono)", price: "Consultar", route: "/regularizacion-inmuebles", icon: BadgeCheck },
    { id: "permiso-recepcion", title: "Permiso de Edificación + Recepción Final", price: "Consultar", route: "/permiso-edificacion-recepcion-final", icon: FileText },
    { id: "revisor-independiente", title: "Revisor Independiente de Arquitectura", price: "Desde $497.000", route: "/revisor-independiente-de-arquitectura", icon: Shield },
  ];

  const consultoriaCorporativaServices = [
    { id: "obras-menores-empresas", title: "Obras Menores para Empresas", price: "Consultar", route: "/obras-menores-empresas", icon: Box },
    { id: "gestion-proyectos", title: "Gestión Integral de Proyectos", price: "Consultar", route: "/contacto", icon: Briefcase },
    { id: "oficina-tecnica", title: "Oficina Técnica Externalizada", price: "Consultar", route: "/contacto", icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Ebook / Lead Magnet */}
      <section id="ebook">
        <LeadMagnet />
      </section>

      {/* 3. Vivienda de Autor */}
      <ViviendaAutor />

      {/* 4. Gestión Normativa */}
      <section id="servicios">
        <ServicePillar
          sectionLabel="Gestión Normativa y Legal"
          title="Gestión Normativa"
          subtitle="Expertos en gestión municipal. Fusión, subdivisión, regularización y permisos ante DOM, SII y CBR."
          badge="Recomendado en YouTube"
          icon={Scale}
          services={gestionNormativaServices}
          background="blueprint"
        />
      </section>

      {/* 5. Equipo de Especialistas */}
      <CollaboratorsBanner />

      {/* 6. Consultoría Corporativa */}
      <ServicePillar
        sectionLabel="Soluciones Empresariales"
        title="Consultoría Corporativa"
        subtitle="Obras menores para empresas, gestión de proyectos y oficina técnica para retail e instituciones."
        icon={Building2}
        services={consultoriaCorporativaServices}
        background="white"
      />

      <SalesMechanism />

      <section id="calculadoras" className="bg-blueprint section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">Herramientas</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">Calculadoras y Simuladores</h2>
            <p className="text-base text-gray-500 max-w-xl mx-auto">Estimaciones referenciales para planificar su proyecto</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ConstructionCalculator />
            <EnergyCalculator />
          </div>
        </div>
      </section>

      <Testimonials />
      <SocialProof />
      <AdvancedLeadMagnets />
      <Guarantees />
      <ObjectionHandling />

      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GoogleBusinessIntegration />
        </div>
      </section>

      <Contact />
      <SpecialtiesCarousel />
      <Footer />
      <CookieConsent />
    </div>
  );
}
