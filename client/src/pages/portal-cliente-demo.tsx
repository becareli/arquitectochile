import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  FileText,
  Download,
  CreditCard,
  Calendar,
  CheckCircle,
  Clock,
  Image,
  ClipboardList,
  User,
  Home,
  AlertTriangle
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const demoProject = {
  name: "Ampliación Casa Familiar - Las Condes",
  client: "Juan Carlos Méndez",
  status: "En Diseño",
  progress: 35,
  startDate: "15 Enero 2025",
  estimatedCompletion: "30 Junio 2025",
  architect: "Patricio Becar Elissegaray"
};

const documents = [
  { name: "Planos Arquitectónicos - Ampliación.pdf", type: "plans", date: "20 Ene 2025", size: "2.4 MB" },
  { name: "Contrato de Servicios Profesionales.pdf", type: "contracts", date: "15 Ene 2025", size: "890 KB" },
  { name: "Presupuesto Detallado v2.pdf", type: "contracts", date: "18 Ene 2025", size: "1.1 MB" }
];

const plans = [
  { name: "Planta Primer Piso - Ampliación.pdf", date: "20 Ene 2025", version: "v2.1" },
  { name: "Planta Segundo Piso.pdf", date: "22 Ene 2025", version: "v1.3" },
  { name: "Elevaciones Norte y Sur.pdf", date: "25 Ene 2025", version: "v1.0" },
  { name: "Cortes Longitudinal y Transversal.pdf", date: "25 Ene 2025", version: "v1.0" }
];

const specs = [
  { category: "Estructura", items: ["Hormigón armado H-30", "Acero A630-420H", "Fundaciones corridas 60x30cm"] },
  { category: "Terminaciones", items: ["Piso porcelanato 60x60 rectificado", "Pintura látex Sherwin-Williams", "Cielo volcanita 15mm"] },
  { category: "Instalaciones", items: ["Eléctrica según SEC", "Sanitaria PVC y cobre", "Gas certificado por instalador autorizado"] }
];

const gallery = [
  { title: "Levantamiento inicial", date: "16 Ene 2025", description: "Fotos del estado actual de la vivienda antes de intervención" },
  { title: "Trazado en terreno", date: "28 Ene 2025", description: "Marcación de ejes y niveles para la ampliación" },
  { title: "Render 3D - Vista exterior", date: "02 Feb 2025", description: "Visualización del proyecto terminado" }
];

const timeline = [
  { title: "Firma de Contrato", date: "15 Ene 2025", status: "completed" as const, description: "Contrato firmado y anticipo recibido" },
  { title: "Levantamiento y Mediciones", date: "16-20 Ene 2025", status: "completed" as const, description: "Visita a terreno, mediciones y levantamiento fotográfico" },
  { title: "Diseño Arquitectónico", date: "21 Ene - 28 Feb 2025", status: "current" as const, description: "Desarrollo de planos, elevaciones y especificaciones técnicas" },
  { title: "Gestión Documental y Trámites", date: "01 Mar - 15 Abr 2025", status: "upcoming" as const, description: "Preparación y presentación de documentación técnica ante organismos competentes" },
  { title: "Inicio de Construcción", date: "01 May 2025", status: "upcoming" as const, description: "Comienzo de obras según cronograma aprobado" },
  { title: "Entrega Final", date: "30 Jun 2025", status: "upcoming" as const, description: "Recepción final y entrega de documentación completa" }
];

const payments = [
  { description: "Anticipo 30% - Diseño Arquitectónico", amount: 1200000, dueDate: "15 Ene 2025", paidDate: "15 Ene 2025", status: "paid" as const },
  { description: "Avance 40% - Planos de Construcción", amount: 1600000, dueDate: "15 Feb 2025", status: "pending" as const },
  { description: "Final 30% - Entrega de Documentación", amount: 1200000, dueDate: "15 Abr 2025", status: "pending" as const }
];

type TabKey = "documentos" | "planos" | "especificaciones" | "galeria" | "timeline" | "pagos";

const tabs: { key: TabKey; label: string; icon: typeof FileText }[] = [
  { key: "documentos", label: "Documentos", icon: FileText },
  { key: "planos", label: "Planos", icon: ClipboardList },
  { key: "especificaciones", label: "Especificaciones", icon: ClipboardList },
  { key: "galeria", label: "Galería", icon: Image },
  { key: "timeline", label: "Timeline", icon: Calendar },
  { key: "pagos", label: "Pagos", icon: CreditCard }
];

const formatCLP = (n: number) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(n);

export default function PortalClienteDemo() {
  useSEO({
    title: "Demo Portal Cliente | ArquitectoChile.com",
    description: "Vista de demostración del portal de clientes de ArquitectoChile.com con datos de ejemplo.",
    path: "/portal-cliente/demo",
    noindex: true,
  });

  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabKey>("documentos");

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <Home className="w-6 h-6 text-primary" />
              <div>
                <h1 className="text-lg font-bold text-gray-900">ArquitectoChile</h1>
                <p className="text-xs text-gray-500">Portal del Cliente — Demo</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setLocation("/portal-cliente")}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Volver al Portal</span>
                <span className="sm:hidden">Volver</span>
              </Button>
              <Button size="sm" onClick={() => setLocation("/portal-cliente/login")}>
                <User className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Iniciar Sesión</span>
                <span className="sm:hidden">Login</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <p className="text-sm text-yellow-800">
            <strong>Modo Demo</strong> — Estás viendo un proyecto de ejemplo. Para acceder a tu proyecto real, <button onClick={() => setLocation("/portal-cliente/login")} className="underline font-semibold hover:text-yellow-900">inicia sesión</button>.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{demoProject.name}</h2>
                <p className="text-gray-600">Cliente: {demoProject.client} · Arquitecto: {demoProject.architect}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Inicio: {demoProject.startDate} · Entrega estimada: {demoProject.estimatedCompletion}
                </p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm">
                {demoProject.progress}% Completado
              </Badge>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progreso del Proyecto</span>
                <span className="font-medium">{demoProject.progress}%</span>
              </div>
              <Progress value={demoProject.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "documentos" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documentos del Proyecto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-500">Subido: {doc.date} · {doc.size}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    <Download className="w-4 h-4 mr-1" />
                    Descargar
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {activeTab === "planos" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Planos del Proyecto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {plans.map((plan, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-indigo-500" />
                    <div>
                      <p className="font-medium text-gray-900">{plan.name}</p>
                      <p className="text-sm text-gray-500">{plan.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{plan.version}</Badge>
                    <Button variant="outline" size="sm" disabled>
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {activeTab === "especificaciones" && (
          <div className="space-y-4">
            {specs.map((spec, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{spec.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {spec.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "galeria" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gallery.map((item, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-400" />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "timeline" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Cronograma del Proyecto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timeline.map((event, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                        event.status === "completed" ? "bg-green-500" :
                        event.status === "current" ? "bg-blue-500" : "bg-gray-300"
                      }`} />
                      {i < timeline.length - 1 && <div className="w-0.5 h-12 bg-gray-200 mt-2" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <Badge variant="outline" className="text-xs">{event.date}</Badge>
                        {event.status === "completed" && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {event.status === "current" && <Clock className="w-4 h-4 text-blue-500" />}
                      </div>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "pagos" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Estado de Pagos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {payments.map((payment, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {payment.status === "paid" ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Clock className="w-6 h-6 text-yellow-500" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{payment.description}</p>
                      <p className="text-sm text-gray-500">
                        Vencimiento: {payment.dueDate}
                        {payment.paidDate && ` · Pagado: ${payment.paidDate}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatCLP(payment.amount)}</p>
                    <Badge className={payment.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {payment.status === "paid" ? "Pagado" : "Pendiente"}
                    </Badge>
                  </div>
                </div>
              ))}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                <span className="font-semibold text-gray-700">Total del Proyecto</span>
                <span className="text-xl font-bold text-gray-900">{formatCLP(4000000)}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
