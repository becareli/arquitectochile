import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Shield,
  FileText,
  CreditCard,
  Calendar,
  CheckCircle,
  Users,
  Smartphone,
  Image,
  ClipboardList,
  Lock,
  User,
  Eye,
  Star,
  ArrowRight
} from "lucide-react";

export default function ClientPortal() {
  const [, setLocation] = useLocation();

  const features = [
    { icon: Lock, title: "Acceso Privado por Gmail", description: "Ingresa de forma segura con tu cuenta de Google. Solo tú y tu arquitecto tienen acceso a tu proyecto." },
    { icon: FileText, title: "Planos y Documentos", description: "Todos tus planos en PDF listos para construir, centralizados y siempre disponibles para descarga." },
    { icon: ClipboardList, title: "Especificaciones Técnicas", description: "Detalles técnicos completos de tu proyecto: materiales, medidas, normativas y más." },
    { icon: Image, title: "Galería de Avances", description: "Fotos del progreso de tu obra organizadas por etapa. Ve cómo tu proyecto cobra vida." },
    { icon: Calendar, title: "Timeline por Hitos", description: "Cronograma visual desde el diseño hasta la entrega final. Siempre sabes en qué etapa estás." },
    { icon: CreditCard, title: "Control de Pagos", description: "Historial completo de pagos, boletas y facturas. Transparencia total sobre tu inversión." }
  ];

  const benefits = [
    "Acceso 24/7 desde cualquier dispositivo",
    "Documentos siempre actualizados",
    "Sin sorpresas en costos ni plazos",
    "Comunicación directa con tu arquitecto",
    "Historial completo de tu proyecto",
    "Seguridad bancaria con Google Auth"
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button onClick={() => setLocation("/")} className="text-xl sm:text-2xl font-display font-semibold hover:opacity-80 transition-opacity">
              <span className="text-primary">ArquitectoChile</span>
              <span className="text-secondary">.com</span>
            </button>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setLocation("/")} size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Volver al Inicio</span>
                <span className="sm:hidden">Inicio</span>
              </Button>
              <Button onClick={() => setLocation("/portal-cliente/login")} size="sm" variant="outline">
                <User className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Iniciar Sesión</span>
                <span className="sm:hidden">Login</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-800 mb-4 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              TECNOLOGÍA EXCLUSIVA PARA CLIENTES
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Portal del Cliente
            </h1>
            <p className="text-xl text-gray-600 mb-2 max-w-3xl mx-auto">
              La plataforma que te da control total sobre tu proyecto de arquitectura
            </p>
            <p className="text-lg text-blue-700 font-semibold">
              Transparencia, control y facilidad en una sola plataforma
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-8"
              onClick={() => setLocation("/portal-cliente/demo")}
            >
              <Eye className="w-5 h-5 mr-2" />
              Ver Demo del Portal
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8"
              onClick={() => setLocation("/portal-cliente/login")}
            >
              <User className="w-5 h-5 mr-2" />
              Iniciar Sesión con Google
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Tu proyecto, bajo tu control
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                <strong>Imagínate tener acceso 24/7 a toda la información de tu proyecto:</strong>{" "}
                planos actualizados, cronograma en tiempo real, estado de pagos y comunicación directa con tu arquitecto.
              </p>
              <p className="text-gray-600 mb-8">
                Nuestra plataforma exclusiva te empodera como cliente, eliminando la incertidumbre
                y dándote el control que mereces sobre tu inversión más importante.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardTitle className="text-center text-xl">
                  ¿Qué encontrarás en tu portal?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">
                Lo que nos diferencia
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Mientras otros arquitectos te mantienen en la incertidumbre, nosotros te damos el poder de la información
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 rounded-lg p-6">
                  <Users className="w-8 h-8 mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Comunicación Transparente</h4>
                  <p className="text-sm opacity-90">Sin sorpresas, sin misterios. Todo al alcance de un clic.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <Shield className="w-8 h-8 mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Tecnología Segura</h4>
                  <p className="text-sm opacity-90">Acceso controlado con la seguridad de Google.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <CheckCircle className="w-8 h-8 mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Control Total</h4>
                  <p className="text-sm opacity-90">Tu proyecto, tus documentos, tu cronograma. Todo bajo tu control.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                  onClick={() => setLocation("/portal-cliente/demo")}
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Ver Demo del Portal
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
                  onClick={() => setLocation("/portal-cliente/login")}
                >
                  <User className="w-5 h-5 mr-2" />
                  Iniciar Sesión con Google
                </Button>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => setLocation("/contacto")}
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors underline"
            >
              ¿Preguntas? Contáctanos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
