import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import LeadMagnet from "@/components/lead-magnet";
import ConstructionCalculator from "@/components/calculators/construction-calculator";
import EnergyCalculator from "@/components/calculators/energy-calculator";
import Services from "@/components/services";
import AboutArchitect from "@/components/about-architect";
import VideoCallWidget from "@/components/video-call-widget";
import Projects from "@/components/projects";
import Testimonials from "@/components/testimonials";
import Blog from "@/components/blog";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import WhatsAppChat from "@/components/whatsapp-chat";

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
      <AboutArchitect />
      <VideoCallWidget />
      <Projects />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
      <WhatsAppChat />
    </div>
  );
}
