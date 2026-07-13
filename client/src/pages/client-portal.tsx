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
  Clock,
  Download,
  ChevronRight,
  Mail,
  KeyRound,
  UserCheck,
  Monitor
} from "lucide-react";
import portalDocumentos from "../assets/portal/portal-documentos.webp";
import portalPlanos from "../assets/portal/portal-planos.webp";
import portalTimeline from "../assets/portal/portal-timeline.webp";
import portalPagos from "../assets/portal/portal-pagos.webp";
import { useSEO } from "@/hooks/useSEO";

export default function ClientPortal() {
  useSEO({
    title: "Portal Cliente | Seguimiento de Proyecto - ArquitectoChile.com",
    description: "Portal de clientes de ArquitectoChile.com: revisa documentos, planos, avances y pagos de tu proyecto de arquitectura en un solo lugar, en tiempo real.",
    path: "/portal-cliente",
  });

  const [, setLocation] = useLocation();

  const portalFeatures = [
    { icon: FileText, title: "Documentos Centralizados", description: "Contratos, presupuestos y certificados organizados y listos para descargar en cualquier momento." },
    { icon: ClipboardList, title: "Planos del Proyecto", description: "Planos arquitectónicos, estructurales y de instalaciones con control de versiones y descarga en PDF." },
    { icon: ClipboardList, title: "Especificaciones Técnicas", description: "Materiales, medidas y normativas detalladas. Todo lo que necesitas saber sobre tu proyecto." },
    { icon: Image, title: "Galería de Avances", description: "Fotos del progreso de tu obra organizadas por etapa. Ve cómo tu proyecto cobra vida semana a semana." },
    { icon: Calendar, title: "Timeline por Hitos", description: "Cronograma visual con cada etapa: desde la firma del contrato hasta la entrega de llaves." },
    { icon: CreditCard, title: "Pagos, Boletas y Facturas", description: "Estado de cada pago, montos, fechas de vencimiento, boletas y facturas descargables." }
  ];

  const screenshots = [
    { src: portalDocumentos, title: "Documentos del Proyecto", description: "Todos tus archivos organizados y listos para descargar" },
    { src: portalPlanos, title: "Planos Arquitectónicos", description: "Versiones actualizadas con control de cambios" },
    { src: portalTimeline, title: "Cronograma Visual", description: "Cada hito con fecha, estado y descripción clara" },
    { src: portalPagos, title: "Control de Pagos", description: "Montos, fechas y comprobantes en un solo lugar" }
  ];

  const steps = [
    { number: "01", title: "Recibes tu invitación", description: "Al iniciar tu proyecto, te enviamos un acceso exclusivo a tu portal personalizado vía correo electrónico.", icon: Mail },
    { number: "02", title: "Ingresas con Google", description: "Accedes de forma segura con tu cuenta de Gmail. Sin contraseñas extra, sin complicaciones.", icon: KeyRound },
    { number: "03", title: "Todo en un solo lugar", description: "Planos, documentos, cronograma, pagos y fotos de avance. Disponible 24/7 desde cualquier dispositivo.", icon: Monitor }
  ];

  const securityBullets = [
    { icon: Lock, text: "Acceso exclusivo mediante cuenta de Gmail verificada" },
    { icon: UserCheck, text: "Solo clientes con invitación directa del arquitecto" },
    { icon: Shield, text: "Encriptación de datos con estándares de seguridad bancaria" },
    { icon: KeyRound, text: "Control de permisos: cada cliente ve únicamente su proyecto" },
    { icon: Users, text: "Sin acceso de terceros no autorizados a tu información" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
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
                <span className="hidden sm:inline">Acceso Clientes</span>
                <span className="sm:hidden">Login</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* A) Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 mb-6 px-4 py-2 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              PLATAFORMA EXCLUSIVA PARA CLIENTES
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Tu proyecto de arquitectura,
              <br />
              <span className="text-blue-300">siempre bajo control</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto leading-relaxed">
              Deja atrás la incertidumbre. Accede a planos, cronograma, pagos y avances de tu obra desde un solo lugar, en cualquier momento.
            </p>
            <p className="text-lg text-blue-200/80 mb-10">
              Orden, transparencia y tranquilidad para la inversión más importante de tu vida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-10 py-6 text-lg shadow-xl"
                onClick={() => setLocation("/portal-cliente/demo")}
              >
                <Eye className="w-5 h-5 mr-2" />
                Ver Demo del Portal
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-semibold px-10 py-6 text-lg"
                onClick={() => setLocation("/portal-cliente/login")}
              >
                <User className="w-5 h-5 mr-2" />
                Acceso de Clientes (Google)
              </Button>
            </div>
            <p className="text-sm text-blue-300/60 mt-4">Solo clientes con invitación</p>
          </div>
        </div>
      </section>

      {/* B) Qué incluye el Portal */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Qué incluye tu Portal?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Todo lo que necesitas para seguir tu proyecto con total claridad, desde el primer día hasta la entrega de llaves.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portalFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className="border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* C) Así se ve por dentro */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Así se ve por dentro
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Una plataforma diseñada para que siempre sepas exactamente en qué estado está tu proyecto.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {screenshots.map((shot, i) => (
              <div key={i} className="group">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300">
                  <div className="bg-gray-800 px-4 py-2.5 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-gray-400 text-xs ml-2">portal.arquitectochile.com</span>
                  </div>
                  <img
                    src={shot.src}
                    alt={shot.title}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 px-1">
                  <h4 className="font-bold text-gray-900 text-lg">{shot.title}</h4>
                  <p className="text-gray-500 text-sm">{shot.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-8"
              onClick={() => setLocation("/portal-cliente/demo")}
            >
              <Eye className="w-5 h-5 mr-2" />
              Explorar Demo Interactiva
            </Button>
          </div>
        </div>
      </section>

      {/* D) Cómo funciona */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cómo funciona
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Acceder a tu portal es tan simple como revisar tu correo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative text-center">
                  <div className="w-20 h-20 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon className="w-9 h-9" />
                  </div>
                  <span className="absolute top-0 right-1/2 translate-x-[3.5rem] -translate-y-2 text-xs font-bold text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  {i < steps.length - 1 && (
                    <ChevronRight className="hidden md:block absolute top-10 -right-6 w-8 h-8 text-gray-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* E) Seguridad y acceso privado */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-green-500/20 text-green-300 border-green-400/30 mb-6 px-3 py-1">
                <Shield className="w-4 h-4 mr-2" />
                SEGURIDAD DE NIVEL BANCARIO
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tu información, protegida
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Sabemos que tus planos, documentos legales y datos financieros son sensibles. Por eso construimos un portal con los más altos estándares de seguridad y privacidad.
              </p>
              <div className="space-y-4">
                {securityBullets.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-300" />
                      </div>
                      <span className="text-gray-200">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-800/50 to-indigo-800/50 rounded-2xl p-8 border border-blue-700/30">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-12 h-12 text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Acceso Privado</h3>
                <p className="text-gray-300 mb-6">
                  Cada portal es exclusivo para el cliente y su arquitecto. Nadie más puede ver tu información.
                </p>
                <div className="space-y-3 text-left max-w-xs mx-auto">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">Autenticación vía Google</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">Datos encriptados en tránsito</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">Sin acceso de terceros</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">Historial de actividad registrado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* F) CTA Final */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para ver tu proyecto con total claridad?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Explora cómo funciona el portal con nuestra demo interactiva, o accede directamente si ya eres cliente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-10 py-6 text-lg shadow-xl"
              onClick={() => setLocation("/portal-cliente/demo")}
            >
              <Eye className="w-5 h-5 mr-2" />
              Ver Demo del Portal
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 font-semibold px-10 py-6 text-lg"
              onClick={() => setLocation("/portal-cliente/login")}
            >
              <User className="w-5 h-5 mr-2" />
              Acceso de Clientes (Google)
            </Button>
          </div>
          <p className="text-sm text-blue-200/60">Solo clientes con invitación directa del arquitecto</p>
          <div className="mt-8 pt-6 border-t border-white/20">
            <button
              onClick={() => setLocation("/contacto")}
              className="text-sm text-blue-200/70 hover:text-white transition-colors underline"
            >
              ¿Preguntas sobre el portal? Contáctanos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
