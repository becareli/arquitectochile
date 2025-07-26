import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Download, 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Home,
  Shield,
  User,
  LogOut
} from "lucide-react";

interface ClientProject {
  id: string;
  name: string;
  status: 'planning' | 'design' | 'permits' | 'construction' | 'completed';
  progress: number;
  startDate: string;
  estimatedCompletion: string;
  documents: ProjectDocument[];
  payments: PaymentRecord[];
  timeline: TimelineEvent[];
}

interface ProjectDocument {
  id: string;
  name: string;
  type: 'plans' | 'specifications' | 'permits' | 'contracts';
  url: string;
  uploadDate: string;
}

interface PaymentRecord {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue';
}

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
}

export default function ClientPortal() {
  const [clientId, setClientId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock authentication check - In real implementation, this would verify JWT or session
  useEffect(() => {
    const authCheck = localStorage.getItem('client_session');
    if (authCheck) {
      setClientId(authCheck);
      setIsAuthenticated(true);
    }
  }, []);

  const { data: clientProject, isLoading } = useQuery({
    queryKey: ['/api/client-project', clientId],
    enabled: !!clientId,
    // Mock data for demonstration
    queryFn: async () => {
      // In real implementation, this would fetch from your API
      return {
        id: '1',
        name: 'Ampliación Casa Familiar - Las Condes',
        status: 'design' as const,
        progress: 35,
        startDate: '2025-01-15',
        estimatedCompletion: '2025-06-30',
        documents: [
          {
            id: '1',
            name: 'Planos Arquitectónicos - Ampliación.pdf',
            type: 'plans' as const,
            url: '/documents/planos-ampliacion.pdf',
            uploadDate: '2025-01-20'
          },
          {
            id: '2',
            name: 'Especificaciones Técnicas.pdf',
            type: 'specifications' as const,
            url: '/documents/especificaciones.pdf',
            uploadDate: '2025-01-22'
          },
          {
            id: '3',
            name: 'Contrato de Servicios Profesionales.pdf',
            type: 'contracts' as const,
            url: '/documents/contrato.pdf',
            uploadDate: '2025-01-15'
          }
        ],
        payments: [
          {
            id: '1',
            description: 'Anticipo 30% - Diseño Arquitectónico',
            amount: 1200000,
            dueDate: '2025-01-15',
            paidDate: '2025-01-15',
            status: 'paid' as const
          },
          {
            id: '2',
            description: 'Avance 40% - Planos de Construcción',
            amount: 1600000,
            dueDate: '2025-02-15',
            status: 'pending' as const
          },
          {
            id: '3',
            description: 'Final 30% - Entrega de Permisos',
            amount: 1200000,
            dueDate: '2025-04-15',
            status: 'pending' as const
          }
        ],
        timeline: [
          {
            id: '1',
            title: 'Inicio de Proyecto',
            description: 'Firma de contrato y levantamiento inicial',
            date: '2025-01-15',
            status: 'completed' as const
          },
          {
            id: '2',
            title: 'Diseño Arquitectónico',
            description: 'Desarrollo de planos y especificaciones',
            date: '2025-02-01',
            status: 'current' as const
          },
          {
            id: '3',
            title: 'Tramitación de Permisos',
            description: 'Presentación ante DOM y gestión de permisos',
            date: '2025-03-15',
            status: 'upcoming' as const
          },
          {
            id: '4',
            title: 'Inicio de Construcción',
            description: 'Comienzo de obras según cronograma',
            date: '2025-04-30',
            status: 'upcoming' as const
          }
        ]
      } as ClientProject;
    }
  });

  const handleLogin = () => {
    // Mock login - In real implementation, integrate with Google Auth or similar
    const mockClientId = 'client_12345';
    localStorage.setItem('client_session', mockClientId);
    setClientId(mockClientId);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('client_session');
    setClientId(null);
    setIsAuthenticated(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'overdue': return 'bg-red-500';
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-blue-500';
      case 'upcoming': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Portal del Cliente</CardTitle>
            <p className="text-gray-600">
              Accede a tu proyecto de arquitectura de forma segura
            </p>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogin} className="w-full bg-primary text-white">
              <User className="w-4 h-4 mr-2" />
              Iniciar Sesión con Google
            </Button>
            <p className="text-xs text-gray-500 text-center mt-4">
              Acceso controlado y seguro para clientes de ArquitectoChile
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Cargando tu proyecto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Home className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">ArquitectoChile</h1>
                <p className="text-sm text-gray-500">Portal del Cliente</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Overview */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{clientProject?.name}</CardTitle>
                  <p className="text-gray-600">Estado: {clientProject?.status}</p>
                </div>
                <Badge className={getStatusColor(clientProject?.status || '')}>
                  {clientProject?.progress}% Completado
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progreso del Proyecto</span>
                    <span>{clientProject?.progress}%</span>
                  </div>
                  <Progress value={clientProject?.progress} className="h-2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Fecha de Inicio</p>
                    <p className="font-semibold">{clientProject?.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Finalización Estimada</p>
                    <p className="font-semibold">{clientProject?.estimatedCompletion}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="payments">Pagos</TabsTrigger>
            <TabsTrigger value="timeline">Cronograma</TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Documentos del Proyecto
                </CardTitle>
                <p className="text-gray-600">
                  Todos tus planos y documentos técnicos listos para construir
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientProject?.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-6 h-6 text-blue-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            Subido: {doc.uploadDate}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Estado de Pagos
                </CardTitle>
                <p className="text-gray-600">
                  Historial completo de pagos y cuotas pendientes
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientProject?.payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {payment.status === 'paid' ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : payment.status === 'overdue' ? (
                          <AlertTriangle className="w-6 h-6 text-red-500" />
                        ) : (
                          <Clock className="w-6 h-6 text-yellow-500" />
                        )}
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-gray-500">
                            Vencimiento: {payment.dueDate}
                            {payment.paidDate && ` | Pagado: ${payment.paidDate}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(payment.amount)}</p>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status === 'paid' ? 'Pagado' : 
                           payment.status === 'overdue' ? 'Vencido' : 'Pendiente'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Cronograma del Proyecto
                </CardTitle>
                <p className="text-gray-600">
                  Seguimiento detallado desde la contratación hasta la finalización
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clientProject?.timeline.map((event, index) => (
                    <div key={event.id} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${getStatusColor(event.status)}`}></div>
                        {index < (clientProject?.timeline.length || 0) - 1 && (
                          <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{event.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {event.date}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}