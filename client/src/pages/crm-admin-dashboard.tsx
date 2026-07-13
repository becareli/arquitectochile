import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSEO } from "@/hooks/useSEO";
import {
  Users,
  FolderOpen, 
  CheckSquare, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  AlertCircle,
  Clock,
  Target,
  BarChart3,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Settings,
  Home,
  Building,
  MapPin,
  LogOut,
  X
} from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import KpiDashboard from "@/components/crm/KpiDashboard";

interface DashboardData {
  totalCustomers: number;
  activeProjects: number;
  pendingTasks: number;
  monthlyRevenue: number;
  conversionRate: number;
  recentInteractions: Array<{
    id: number;
    customerId: number;
    projectId?: number;
    type: string;
    subject: string;
    content: string;
    date: string;
    createdBy: string;
  }>;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: string;
  source: string;
  assignedTo: string;
  createdAt: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  customerId: number;
  status: string;
  priority: string;
  budget: string;
  progress: number;
  assignedTo: string;
  startDate: string;
  endDate: string;
}

export default function CRMAdminDashboard() {
  useSEO({
    title: "CRM Admin | ArquitectoChile.com",
    description: "Panel interno de administración CRM de ArquitectoChile.com.",
    path: "/crm-admin",
    noindex: true,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [newClientForm, setNewClientForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    rut: "",
    address: "",
    source: "manual",
    notes: ""
  });
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Acceso requerido",
        description: "Debe iniciar sesión para acceder al CRM. Redirigiendo...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  // Queries para datos del CRM con manejo de errores de autenticación
  const { data: dashboardData } = useQuery<DashboardData>({
    queryKey: ['/api/crm/reports/dashboard'],
    enabled: isAuthenticated,
    retry: (failureCount, error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Sesión expirada",
          description: "Su sesión ha expirado. Redirigiendo al login...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1500);
        return false;
      }
      return failureCount < 3;
    }
  });

  const { data: customers = [] } = useQuery<Customer[]>({
    queryKey: ['/api/crm/customers'],
    enabled: isAuthenticated,
    retry: (failureCount, error) => {
      if (isUnauthorizedError(error as Error)) return false;
      return failureCount < 3;
    }
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ['/api/crm/projects'],
    enabled: isAuthenticated,
    retry: (failureCount, error) => {
      if (isUnauthorizedError(error as Error)) return false;
      return failureCount < 3;
    }
  });

  // Mostrar loading mientras se verifica autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Verificando acceso...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No mostrar nada si no está autenticado (se redirige)
  if (!isAuthenticated) {
    return null;
  }

  // Mutación para crear nuevo cliente
  const createCustomerMutation = useMutation({
    mutationFn: async (customerData: typeof newClientForm) => {
      return await apiRequest("POST", "/api/crm/customers", customerData);
    },
    onSuccess: () => {
      toast({
        title: "Cliente creado",
        description: "El cliente ha sido creado exitosamente.",
      });
      setIsNewClientModalOpen(false);
      setNewClientForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        rut: "",
        address: "",
        source: "manual",
        notes: ""
      });
      // Invalidar las queries para actualizar la lista
      queryClient.invalidateQueries({ queryKey: ['/api/crm/customers'] });
      queryClient.invalidateQueries({ queryKey: ['/api/crm/reports/dashboard'] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Sesión expirada",
          description: "Su sesión ha expirado. Redirigiendo al login...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1500);
        return;
      }
      toast({
        title: "Error al crear cliente",
        description: "Ha ocurrido un error al crear el cliente. Inténtelo nuevamente.",
        variant: "destructive",
      });
    },
  });

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientForm.name.trim()) {
      toast({
        title: "Nombre requerido",
        description: "Por favor ingrese el nombre del cliente.",
        variant: "destructive",
      });
      return;
    }
    createCustomerMutation.mutate(newClientForm);
  };

  const resetForm = () => {
    setNewClientForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      rut: "",
      address: "",
      source: "manual",
      notes: ""
    });
  };

  // Filtros y cálculos
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (customer.company && customer.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const activeProjects = projects.filter(p => p.status === 'in_progress' || p.status === 'design_phase');
  const pendingProjects = projects.filter(p => p.status === 'quotation' || p.status === 'planning');

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      active: "bg-green-100 text-green-800",
      prospect: "bg-blue-100 text-blue-800",
      qualified: "bg-purple-100 text-purple-800",
      negotiation: "bg-yellow-100 text-yellow-800",
      closed: "bg-gray-100 text-gray-800",
      in_progress: "bg-blue-100 text-blue-800",
      planning: "bg-yellow-100 text-yellow-800",
      design_phase: "bg-purple-100 text-purple-800",
      permit_phase: "bg-orange-100 text-orange-800",
      quotation: "bg-gray-100 text-gray-800",
      completed: "bg-green-100 text-green-800"
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority: string) => {
    const priorityColors: { [key: string]: string } = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };
    return priorityColors[priority] || "bg-gray-100 text-gray-800";
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(Number(amount));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Sitio Web
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                CRM ArquitectoChile
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar clientes, proyectos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button size="sm" onClick={() => setIsNewClientModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Cliente
              </Button>
              {!!user && (
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={(user as any).profileImageUrl || undefined} />
                      <AvatarFallback>
                        {(user as any).firstName?.charAt(0) || (user as any).email?.charAt(0) || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {(user as any).firstName ? `${(user as any).firstName} ${(user as any).lastName || ''}`.trim() : (user as any).email}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">Administrador</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = "/api/logout"}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Salir
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Clientes ({customers.length})
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <FolderOpen className="w-4 h-4 mr-2" />
              Proyectos ({projects.length})
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <CheckSquare className="w-4 h-4 mr-2" />
              Tareas
            </TabsTrigger>
            <TabsTrigger value="interactions" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Interacciones
            </TabsTrigger>
            <TabsTrigger value="kpis" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-2" />
              KPIs de Ventas
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPIs Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData?.totalCustomers || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    +2.5% vs mes anterior
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Proyectos Activos</CardTitle>
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeProjects.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {pendingProjects.length} en cotización
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tareas Pendientes</CardTitle>
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData?.pendingTasks || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    3 urgentes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$35M</div>
                  <p className="text-xs text-muted-foreground">
                    +15.3% vs mes anterior
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasa Conversión</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-xs text-muted-foreground">
                    +5.2% vs mes anterior
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Proyectos Activos y Actividad Reciente */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Proyectos Activos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FolderOpen className="w-5 h-5 mr-2" />
                    Proyectos Activos
                  </CardTitle>
                  <CardDescription>
                    Proyectos en desarrollo con progreso actualizado
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeProjects.slice(0, 4).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{project.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {formatCurrency(project.budget)}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Progress value={project.progress} className="flex-1 h-2" />
                          <span className="text-xs font-medium">{project.progress}%</span>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end space-y-1">
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority}
                        </Badge>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Todos los Proyectos
                  </Button>
                </CardContent>
              </Card>

              {/* Actividad Reciente */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Actividad Reciente
                  </CardTitle>
                  <CardDescription>
                    Últimas interacciones con clientes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData?.recentInteractions?.slice(0, 5).map((interaction) => (
                    <div key={interaction.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        {interaction.type === 'phone_call' && <Phone className="w-4 h-4 text-green-600" />}
                        {interaction.type === 'email' && <Mail className="w-4 h-4 text-blue-600" />}
                        {interaction.type === 'meeting' && <Calendar className="w-4 h-4 text-purple-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{interaction.subject}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {interaction.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(interaction.date).toLocaleDateString('es-CL')} - {interaction.createdBy}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Todas las Interacciones
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gestión de Clientes */}
          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Clientes</CardTitle>
                <CardDescription>
                  Administra tu base de clientes y prospectos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCustomers.map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{customer.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            <span>{customer.email}</span>
                            <Phone className="w-3 h-3 ml-2" />
                            <span>{customer.phone}</span>
                          </div>
                          {customer.company && (
                            <div className="flex items-center mt-1 text-sm text-muted-foreground">
                              <Building className="w-3 h-3 mr-1" />
                              <span>{customer.company}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                        <Badge variant="outline">
                          {customer.source}
                        </Badge>
                        <div className="flex space-x-1 ml-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gestión de Proyectos */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Proyectos</CardTitle>
                <CardDescription>
                  Seguimiento y control de proyectos arquitectónicos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => {
                    const customer = customers.find(c => c.id === project.customerId);
                    return (
                      <div key={project.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{project.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {project.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {customer?.name || 'Cliente no encontrado'}
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {formatCurrency(project.budget)}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(project.startDate).toLocaleDateString('es-CL')} - {new Date(project.endDate).toLocaleDateString('es-CL')}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <div className="flex space-x-2">
                              <Badge className={getPriorityColor(project.priority)}>
                                {project.priority}
                              </Badge>
                              <Badge className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                            </div>
                            <div className="flex space-x-1">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm font-medium">Progreso:</Label>
                          <Progress value={project.progress} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Otras pestañas temporalmente vacías */}
          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Tareas</CardTitle>
                <CardDescription>Próximamente disponible</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="interactions">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Interacciones</CardTitle>
                <CardDescription>Próximamente disponible</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="kpis">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">KPIs de Ventas ArquitectoChile</h2>
                  <p className="text-gray-600 dark:text-gray-400">Métricas de rendimiento basadas en la metodología de seguimiento de leads</p>
                </div>
                <Button>
                  <Settings className="w-4 h-4 mr-2" />
                  Configurar KPIs
                </Button>
              </div>
              <KpiDashboard />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal para nuevo cliente */}
      <Dialog open={isNewClientModalOpen} onOpenChange={setIsNewClientModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Cliente</DialogTitle>
            <DialogDescription>
              Complete la información del cliente para agregarlo al CRM.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateCustomer} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    value={newClientForm.name}
                    onChange={(e) => setNewClientForm(prev => ({...prev, name: e.target.value}))}
                    placeholder="Nombre completo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rut">RUT</Label>
                  <Input
                    id="rut"
                    value={newClientForm.rut}
                    onChange={(e) => setNewClientForm(prev => ({...prev, rut: e.target.value}))}
                    placeholder="12.345.678-9"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newClientForm.email}
                    onChange={(e) => setNewClientForm(prev => ({...prev, email: e.target.value}))}
                    placeholder="cliente@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={newClientForm.phone}
                    onChange={(e) => setNewClientForm(prev => ({...prev, phone: e.target.value}))}
                    placeholder="+56 9 1234 5678"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  value={newClientForm.company}
                  onChange={(e) => setNewClientForm(prev => ({...prev, company: e.target.value}))}
                  placeholder="Nombre de la empresa"
                />
              </div>

              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={newClientForm.address}
                  onChange={(e) => setNewClientForm(prev => ({...prev, address: e.target.value}))}
                  placeholder="Dirección completa"
                />
              </div>

              <div>
                <Label htmlFor="source">Fuente de Lead</Label>
                <Select value={newClientForm.source} onValueChange={(value) => setNewClientForm(prev => ({...prev, source: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione la fuente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Ingreso Manual</SelectItem>
                    <SelectItem value="website">Sitio Web</SelectItem>
                    <SelectItem value="referral">Referido</SelectItem>
                    <SelectItem value="social_media">Redes Sociales</SelectItem>
                    <SelectItem value="google_ads">Google Ads</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="phone">Llamada Telefónica</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  value={newClientForm.notes}
                  onChange={(e) => setNewClientForm(prev => ({...prev, notes: e.target.value}))}
                  placeholder="Información adicional del cliente..."
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsNewClientModalOpen(false);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={createCustomerMutation.isPending}
              >
                {createCustomerMutation.isPending ? "Creando..." : "Crear Cliente"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}