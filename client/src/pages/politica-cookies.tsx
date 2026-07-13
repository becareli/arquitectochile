import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSEO } from "@/hooks/useSEO";

export default function PoliticaCookies() {
  useSEO({
    title: "Política de Cookies | ArquitectoChile.com",
    description: "Política de cookies de ArquitectoChile.com: qué cookies utilizamos, con qué fines y cómo puedes gestionar tus preferencias al navegar nuestro sitio web.",
    path: "/politica-cookies",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Política de Cookies</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>¿Qué son las Cookies?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo 
              (computadora, tablet, teléfono móvil) cuando visita nuestro sitio web. 
              Estas cookies nos permiten reconocer su dispositivo y recordar cierta información 
              sobre sus preferencias y acciones anteriores.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>¿Cómo Utilizamos las Cookies?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>En ArquitectoChile.com utilizamos cookies para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Asegurar que nuestro sitio web funcione correctamente</li>
              <li>Recordar sus preferencias y configuraciones</li>
              <li>Analizar cómo los visitantes utilizan nuestro sitio</li>
              <li>Mejorar la experiencia del usuario</li>
              <li>Personalizar el contenido mostrado</li>
              <li>Facilitar el uso de formularios de contacto</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tipos de Cookies que Utilizamos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">1. Cookies Técnicas o Necesarias</h4>
              <p>
                Son esenciales para el funcionamiento básico del sitio web. Sin estas cookies, 
                el sitio no puede funcionar correctamente.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Gestión de sesiones</li>
                <li>Configuración de idioma</li>
                <li>Funcionalidad de formularios</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">2. Cookies de Preferencias</h4>
              <p>
                Permiten recordar información que cambia la forma en que se comporta o ve el sitio web.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Preferencias de visualización</li>
                <li>Configuraciones personalizadas</li>
                <li>Ubicación geográfica</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">3. Cookies Analíticas</h4>
              <p>
                Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web 
                recopilando y reportando información de forma anónima.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Google Analytics</li>
                <li>Estadísticas de uso</li>
                <li>Rendimiento del sitio</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">4. Cookies de Marketing</h4>
              <p>
                Se utilizan para rastrear a los visitantes en los sitios web con la intención 
                de mostrar anuncios que sean relevantes y atractivos.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Facebook Pixel</li>
                <li>Google Ads</li>
                <li>Remarketing</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cookies de Terceros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Nuestro sitio web puede incluir cookies de terceros para proporcionar servicios 
              adicionales como análisis web, mapas, videos y redes sociales.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border rounded-lg p-4">
                <h5 className="font-semibold">Google Analytics</h5>
                <p className="text-sm text-gray-600">
                  Análisis de tráfico web y comportamiento de usuarios
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h5 className="font-semibold">Google Maps</h5>
                <p className="text-sm text-gray-600">
                  Servicio de mapas y ubicación
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h5 className="font-semibold">YouTube</h5>
                <p className="text-sm text-gray-600">
                  Reproducción de videos incrustados
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h5 className="font-semibold">WhatsApp Web</h5>
                <p className="text-sm text-gray-600">
                  Widget de chat y comunicación
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Duración de las Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold">Cookies de Sesión</h4>
              <p>
                Se eliminan automáticamente cuando cierra su navegador. Se utilizan para 
                funciones básicas del sitio durante su visita.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold">Cookies Persistentes</h4>
              <p>
                Permanecen en su dispositivo durante un período determinado (que puede variar 
                desde minutos hasta años) o hasta que las elimine manualmente.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Gestión y Control de Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Usted tiene control total sobre las cookies. Puede configurar su navegador para:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Aceptar todas las cookies</li>
              <li>Rechazar todas las cookies</li>
              <li>Eliminar cookies existentes</li>
              <li>Recibir notificación antes de que se instale una cookie</li>
              <li>Bloquear cookies de sitios específicos</li>
            </ul>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
              <p className="text-sm">
                <strong>Nota:</strong> Desactivar las cookies puede afectar la funcionalidad 
                de nuestro sitio web y limitar su experiencia de usuario.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Configuración por Navegador</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold">Google Chrome</h5>
                <p className="text-sm">Configuración → Privacidad y seguridad → Cookies</p>
              </div>
              
              <div>
                <h5 className="font-semibold">Mozilla Firefox</h5>
                <p className="text-sm">Opciones → Privacidad y seguridad → Cookies</p>
              </div>
              
              <div>
                <h5 className="font-semibold">Safari</h5>
                <p className="text-sm">Preferencias → Privacidad → Cookies</p>
              </div>
              
              <div>
                <h5 className="font-semibold">Microsoft Edge</h5>
                <p className="text-sm">Configuración → Privacidad → Cookies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Consentimiento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Al continuar navegando y utilizando nuestro sitio web, usted acepta el uso de 
              cookies de acuerdo con esta política. Puede retirar su consentimiento en cualquier 
              momento configurando su navegador para rechazar cookies.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Si tiene preguntas sobre nuestra política de cookies, puede contactarnos en:
            </p>
            <p>
              <strong>Email:</strong> contacto@arquitectochile.com<br/>
              <strong>Teléfono:</strong> +56 9 7931 6827
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-12 text-gray-600">
          <p>Última actualización: Agosto 2025</p>
        </div>
      </div>
    </div>
  );
}