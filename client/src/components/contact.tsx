import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {
  useEffect(() => {
    // Remove existing script if present
    const existingScript = document.getElementById('form-script-tag-20884222');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and load the external form script
    const script = document.createElement('script');
    script.id = 'form-script-tag-20884222';
    script.src = 'https://www.arquitectochile.cl/public/remote/page/33938295c0dcb9fe58761b712e8df05602099d31.js';
    script.async = true;
    
    // Append script to document
    document.body.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      const scriptToRemove = document.getElementById('form-script-tag-20884222');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <section id="contacto" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark dark:text-white mb-4">
            Descarga tu Ebook Gratuito
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Completa el formulario y recibe tu guía arquitectónica personalizada
          </p>
          <div className="mt-6 inline-block bg-primary/10 rounded-lg p-4">
            <p className="text-lg font-semibold text-primary">
              ✓ Descarga inmediata ✓ Guía práctica ✓ Consejos de expertos
            </p>
          </div>
        </div>
        
        <Card className="bg-neutral dark:bg-gray-800 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl dark:text-white">
              Obtén tu Ebook Gratuito
            </CardTitle>
            <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
              Solo necesitamos tu nombre y correo para enviarte el material
            </p>
          </CardHeader>
          <CardContent>
            {/* Container for external form - the script will inject the form here */}
            <div 
              id="external-form-container" 
              className="min-h-[200px] flex items-center justify-center"
              data-testid="external-form-container"
            >
              {/* Loading indicator while script loads */}
              <div className="text-center text-gray-500">
                <div className="inline-flex items-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span>Cargando formulario...</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alternative contact method */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            ¿Prefieres hablar directamente con nosotros?
          </p>
          <a
            href="https://wa.me/56979316827?text=Hola%20Patricio%2C%20quiero%20información%20sobre%20el%20ebook"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            data-testid="whatsapp-contact-button"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
