import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import LeadMagnet from "@/components/lead-magnet";
import ConstructionCalculator from "@/components/calculators/construction-calculator";
import EnergyCalculator from "@/components/calculators/energy-calculator";
import Services from "@/components/services";
import RegularizacionInmuebles from "@/components/regularizacion-inmuebles";
import ClientPortalCTA from "@/components/client-portal-cta";
import AsesoriaTerreno from "@/components/asesoria-terreno";
import AboutArchitect from "@/components/about-architect";
import VideoCallWidget from "@/components/video-call-widget";
import HomeownerVideoCallWidget from "@/components/homeowner-video-call-widget";
import ColaboradoresSection from "@/components/colaboradores-section";
import Projects from "@/components/projects";
import Testimonials from "@/components/testimonials";
import SocialProof from "@/components/social-proof";
import SalesMechanism from "@/components/sales-mechanism";
import LeadMagnetsVilma from "@/components/lead-magnets-vilma";
import AdvancedLeadMagnets from "@/components/advanced-lead-magnets";
import FunnelOptimizationVilma from "@/components/funnel-optimization-vilma";
import ProspectMagnetSystem from "@/components/prospect-magnet-system";
import ConversionOptimization from "@/components/conversion-optimization";
import ConversionOptimizer from "@/components/conversion-optimizer";
import AdvancedNurturing from "@/components/advanced-nurturing";
import WebinarSystem from "@/components/webinar-system";
import WebinarIntegration from "@/components/webinar-integration";
import AutomatedWebinarSystem from "@/components/automated-webinar-system";
import ObjectionHandling from "@/components/objection-handling";
import Guarantees from "@/components/guarantees";
import Blog from "@/components/blog";
import Contact from "@/components/contact";
import GoogleBusinessIntegration from "@/components/google-business-integration";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";
import CookieConsent from "@/components/cookie-consent";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      
      {/* Lead Magnet Section */}
      <section id="ebook">
        <LeadMagnet />
      </section>
      
      {/* Interactive Calculators Section */}
      <section id="calculadoras" className="py-20 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark mb-4">Calculadoras Interactivas</h2>
            <p className="text-xl text-gray-600">Obtén estimaciones instantáneas para tu proyecto</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ConstructionCalculator />
            <EnergyCalculator />
          </div>
        </div>
      </section>

      <Services />
      <RegularizacionInmuebles />
      <AsesoriaTerreno />
      <ClientPortalCTA />
      <AboutArchitect />
      <VideoCallWidget />
      <HomeownerVideoCallWidget />
      <ColaboradoresSection />
      <Projects />
      <Testimonials />
      <SocialProof />
      <SalesMechanism />
      <LeadMagnetsVilma />
      <AdvancedLeadMagnets />
      <ProspectMagnetSystem />
      <FunnelOptimizationVilma />
      <ConversionOptimization />
      <ConversionOptimizer />
      <AdvancedNurturing />
      <WebinarSystem />
      <AutomatedWebinarSystem />
      <WebinarIntegration />
      <ObjectionHandling />
      <Guarantees />
      <Blog />
      
      {/* Google My Business Integration */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GoogleBusinessIntegration />
        </div>
      </section>
      
      <Contact />
      <Footer />
      <Chatbot />
      <CookieConsent />
    </div>
  );
}
