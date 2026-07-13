import { Link } from "wouter";
import { CheckCircle2, Download, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSEO } from "@/hooks/useSEO";

export default function GraciasPage() {
  useSEO({
    title: "Gracias por tu Suscripción | ArquitectoChile.com",
    description: "Gracias por tu solicitud. Un miembro del equipo de ArquitectoChile.com se pondrá en contacto contigo a la brevedad para avanzar con tu proyecto.",
    path: "/gracias",
    noindex: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#f97316]/20 dark:bg-[#f97316]/10 rounded-full blur-2xl" />
              <CheckCircle2 className="w-24 h-24 text-[#f97316] dark:text-[#f97316] relative" />
            </div>
          </div>

          {/* Main Message */}
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            ¡Gracias por suscribirte!
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
            Te enviaremos el ebook a tu correo electrónico en los próximos minutos.
          </p>

          {/* Next Steps Card */}
          <Card className="p-8 mb-8 bg-white dark:bg-slate-800 shadow-xl border-slate-200 dark:border-slate-700">
            <h2 className="font-serif text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
              Próximos Pasos
            </h2>
            
            <div className="space-y-6 text-left">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    1. Revisa tu correo electrónico
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Busca el email de ArquitectoChile con tu ebook gratuito. 
                    No olvides revisar tu carpeta de spam.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Download className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    2. Descarga tu ebook
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Haz clic en el enlace del correo para descargar tu guía completa 
                    sobre arquitectura y diseño.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    3. Explora nuestros servicios
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Descubre cómo podemos ayudarte con tu proyecto arquitectónico.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Call to Action */}
          <div className="space-y-4">
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              ¿Tienes un proyecto en mente?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
                  data-testid="button-contacto"
                >
                  Solicitar Cotización Gratuita
                </Button>
              </Link>
              <Link href="/">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  data-testid="button-volver-inicio"
                >
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </div>

          {/* Support Message */}
          <div className="mt-12 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              ¿No recibiste el correo? Contáctanos a{" "}
              <a 
                href="mailto:contacto@arquitectochile.cl" 
                className="text-primary hover:underline font-semibold"
              >
                contacto@arquitectochile.cl
              </a>
              {" "}y te lo enviaremos manualmente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
