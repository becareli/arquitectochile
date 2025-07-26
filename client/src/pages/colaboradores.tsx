import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FileUploadDropzone from "@/components/file-upload-dropzone";
import { 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Users, 
  FileText, 
  Calendar,
  Upload,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Shield,
  Zap,
  Eye
} from "lucide-react";

export default function Colaboradores() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data - in production, these would come from API calls
  const collaboratorProfile = {
    id: 1,
    name: "Carlos Rodriguez",
    email: "carlos@ejemplo.com",
    specialty: "Arquitecto",
    experience: 8,
    location: "Santiago, Chile",
    rating: 4.8,
    totalProjects: 23,
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    description: "Arquitecto especializado en diseño residencial y remodelaciones",
    verified: true,
    availability: "available"
  };

  const activeProjects = [
    {
      id: 1,
      title: "Remodelación Casa Las Condes",
      progress: 65,
      deadline: "2025-02-15",
      totalAmount: 2500000,
      paidAmount: 1250000,
      status: "in_progress"
    },
    {
      id: 2,
      title: "Ampliación Vivienda Providencia",
      progress: 30,
      deadline: "2025-03-20",
      totalAmount: 3200000,
      paidAmount: 800000,
      status: "in_progress"
    }
  ];

  const availableOffers = [
    {
      id: 1,
      title: "Diseño de Ampliación - Ñuñoa",
      description: "Se requiere diseño arquitectónico para ampliación de 40m² en segundo piso",
      budget: 1800000,
      deadline: "2025-02-28",
      location: "Ñuñoa, Santiago",
      category: "ampliacion",
      bidsCount: 3
    },
    {
      id: 2,
      title: "Remodelación Baños - Las Condes",
      description: "Remodelación completa de 2 baños principales con diseños modernos",
      budget: 2200000,
      deadline: "2025-03-15",
      location: "Las Condes, Santiago",
      category: "remodelacion",
      bidsCount: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="mb-4">
              <Logo size="medium" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                <img 
                  src={collaboratorProfile.profileImage} 
                  alt={collaboratorProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-dark">{collaboratorProfile.name}</h1>
                  {collaboratorProfile.verified && (
                    <Badge className="bg-green-100 text-green-800">
                      <Shield className="w-3 h-3 mr-1" />
                      Verificado
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600">{collaboratorProfile.specialty} • {collaboratorProfile.experience} años de experiencia</p>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{collaboratorProfile.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm">{collaboratorProfile.totalProjects} proyectos</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm">{collaboratorProfile.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={collaboratorProfile.availability === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                <Zap className="w-3 h-3 mr-1" />
                {collaboratorProfile.availability === 'available' ? 'Disponible' : 'Ocupado'}
              </Badge>
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Soporte
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Panel Principal</TabsTrigger>
            <TabsTrigger value="projects">Mis Proyectos</TabsTrigger>
            <TabsTrigger value="offers">Ofertas Disponibles</TabsTrigger>
            <TabsTrigger value="payments">Pagos</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Proyectos Activos</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeProjects.length}</div>
                  <p className="text-xs text-muted-foreground">En progreso</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2.050.000</div>
                  <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Calificación</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{collaboratorProfile.rating}</div>
                  <p className="text-xs text-muted-foreground">De 23 evaluaciones</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ofertas Nuevas</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{availableOffers.length}</div>
                  <p className="text-xs text-muted-foreground">Esta semana</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Proyectos en Progreso</CardTitle>
                  <CardDescription>Estado actual de tus proyectos activos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeProjects.map((project) => (
                    <div key={project.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{project.title}</p>
                          <p className="text-xs text-gray-500">Vence: {project.deadline}</p>
                        </div>
                        <Badge variant="outline">{project.progress}%</Badge>
                      </div>
                      <Progress value={project.progress} className="w-full" />
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Pagado: ${project.paidAmount.toLocaleString()}</span>
                        <span>Total: ${project.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ofertas Recientes</CardTitle>
                  <CardDescription>Nuevas oportunidades de proyecto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {availableOffers.slice(0, 2).map((offer) => (
                    <div key={offer.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">{offer.title}</h4>
                          <p className="text-xs text-gray-500">{offer.description}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          ${offer.budget.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {offer.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {offer.bidsCount} ofertas
                        </div>
                      </div>
                      <Button size="sm" className="w-full">
                        Ver Detalles
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mis Proyectos Activos</CardTitle>
                <CardDescription>Gestiona tus proyectos en curso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activeProjects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Vence: {project.deadline}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              ${project.totalAmount.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <Badge className={project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                          {project.status === 'in_progress' ? 'En Progreso' : 'Completado'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progreso del Proyecto</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="w-full" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500">Total del Proyecto</p>
                          <p className="text-lg font-semibold">${project.totalAmount.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-gray-500">Pagado</p>
                          <p className="text-lg font-semibold text-green-600">${project.paidAmount.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <p className="text-xs text-gray-500">Pendiente</p>
                          <p className="text-lg font-semibold text-yellow-600">${(project.totalAmount - project.paidAmount).toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <FileUploadDropzone
                          title="Documentos y Planos"
                          description="Sube los planos, documentos técnicos y entregables del proyecto"
                          acceptedTypes={["application/pdf", "image/jpeg", "image/png", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]}
                          maxFiles={20}
                          maxSize={50}
                          onFilesUploaded={(files) => console.log('Documentos subidos:', files)}
                        />
                        
                        <FileUploadDropzone
                          title="Boletas y Facturas"
                          description="Sube tus boletas de honorarios y facturas para el seguimiento de pagos"
                          acceptedTypes={["application/pdf", "image/jpeg", "image/png"]}
                          maxFiles={10}
                          maxSize={10}
                          onFilesUploaded={(files) => console.log('Boletas subidas:', files)}
                        />
                      </div>

                      <div className="flex space-x-3">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Mensajes
                        </Button>
                        <Button size="sm">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Actualizar Progreso
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Offers Tab */}
          <TabsContent value="offers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ofertas de Proyectos Disponibles</CardTitle>
                <CardDescription>Encuentra nuevas oportunidades de trabajo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {availableOffers.map((offer) => (
                    <div key={offer.id} className="border rounded-lg p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">{offer.title}</h3>
                          <p className="text-sm text-gray-600">{offer.description}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          ${offer.budget.toLocaleString()}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {offer.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {offer.deadline}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <Badge variant="outline">{offer.category}</Badge>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {offer.bidsCount} ofertas recibidas
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor={`bid-amount-${offer.id}`}>Tu Oferta (CLP)</Label>
                          <Input 
                            id={`bid-amount-${offer.id}`}
                            placeholder="Ingresa tu precio"
                            type="number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`cover-letter-${offer.id}`}>Mensaje de Presentación</Label>
                          <Textarea 
                            id={`cover-letter-${offer.id}`}
                            placeholder="Explica por qué eres el mejor candidato para este proyecto..."
                            className="min-h-[80px]"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Documentos de Respaldo (Opcional)</Label>
                          <FileUploadDropzone
                            title="Adjuntar Documentos"
                            description="Portfolio, certificaciones, referencias, etc."
                            acceptedTypes={["application/pdf", "image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]}
                            maxFiles={5}
                            maxSize={10}
                            onFilesUploaded={(files) => console.log('Documentos de propuesta:', files)}
                            className="border-none shadow-none"
                          />
                        </div>
                        
                        <Button className="w-full">
                          <FileText className="w-4 h-4 mr-2" />
                          Enviar Propuesta
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            {/* File Upload Section for Invoices */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FileUploadDropzone
                title="Boletas de Honorarios"
                description="Sube tus boletas de honorarios para el control de pagos"
                acceptedTypes={["application/pdf", "image/jpeg", "image/png"]}
                maxFiles={20}
                maxSize={10}
                onFilesUploaded={(files) => console.log('Boletas subidas:', files)}
                existingFiles={[
                  {
                    id: "1",
                    name: "Boleta_Enero_2025.pdf",
                    size: 245760,
                    type: "application/pdf",
                    uploadDate: "2025-01-15T10:30:00Z",
                    status: "completed",
                    url: "#boleta-1"
                  },
                  {
                    id: "2", 
                    name: "Boleta_Diciembre_2024.pdf",
                    size: 198432,
                    type: "application/pdf",
                    uploadDate: "2024-12-20T14:15:00Z",
                    status: "completed",
                    url: "#boleta-2"
                  }
                ]}
              />
              
              <FileUploadDropzone
                title="Facturas y Comprobantes"
                description="Facturas, comprobantes de gastos y documentos de respaldo"
                acceptedTypes={["application/pdf", "image/jpeg", "image/png", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]}
                maxFiles={15}
                maxSize={10}
                onFilesUploaded={(files) => console.log('Facturas subidas:', files)}
                existingFiles={[
                  {
                    id: "3",
                    name: "Factura_Materiales_Proyecto_LC.pdf",
                    size: 189234,
                    type: "application/pdf", 
                    uploadDate: "2025-01-10T09:20:00Z",
                    status: "completed",
                    url: "#factura-1"
                  }
                ]}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Historial de Pagos</CardTitle>
                  <CardDescription>Todos tus pagos recibidos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 1, project: "Remodelación Casa Las Condes", amount: 1250000, date: "2025-01-15", milestone: "Segundo Pago", status: "completed" },
                      { id: 2, project: "Ampliación Vivienda Providencia", amount: 800000, date: "2025-01-05", milestone: "Primer Pago", status: "completed" },
                      { id: 3, project: "Diseño Oficina Comercial", amount: 900000, date: "2024-12-20", milestone: "Pago Final", status: "completed" }
                    ].map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{payment.project}</p>
                          <p className="text-sm text-gray-500">{payment.milestone} • {payment.date}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="font-semibold text-green-600">${payment.amount.toLocaleString()}</p>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-xs text-green-600">Completado</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumen Financiero</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Ingresos Enero</span>
                      <span className="font-medium">$2.050.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pendiente de Cobro</span>
                      <span className="font-medium text-yellow-600">$1.550.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Próximo Pago</span>
                      <span className="font-medium text-blue-600">$1.250.000</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Recordatorios</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="text-xs">Entrega pendiente</p>
                          <p className="text-xs text-gray-500">Remodelación Las Condes - 3 días</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Clock className="w-4 h-4 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-xs">Pago programado</p>
                          <p className="text-xs text-gray-500">$1.250.000 - 28 Enero</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}