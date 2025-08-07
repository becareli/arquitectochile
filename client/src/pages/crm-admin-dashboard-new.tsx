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
  LogOut
} from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import KpiDashboard from "@/components/crm/KpiDashboard";

interface DashboardData {
  totalCustomers: number;
  totalProjects: number;
  totalTasks: number;
  totalRevenue: number;
  monthlyGrowth: number;
  activeProjects: number;
  completedTasks: number;
  pendingTasks: number;
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

export default function CRMAdminDashboardNew() {
  // Estados
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

  // Hooks de React Query y Auth (deben ir al inicio)
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

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

  // Mutación para crear cliente
  const createCustomerMutation = useMutation({
    mutationFn: async (customerData: typeof newClientForm) => {
      return await apiRequest("/api/crm/customers", "POST", customerData);
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

  // Funciones
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

  // Effect para redireccionar si no está autenticado
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
    }
  }, [isAuthenticated, isLoading, toast]);

  // Estados de carga y verificación de acceso
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Verificando autenticación...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Verificar acceso de administrador
  if (user && (user as any).email !== "aibecareli@gmail.com") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Acceso Denegado</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Solo el administrador tiene acceso al panel CRM.
          </p>
          <div className="space-y-3">
            <Button 
              className="w-full"
              onClick={() => { window.location.href = "/api/logout"; }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión Actual
            </Button>
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => { window.location.href = "/api/login"; }}
            >
              Iniciar Sesión como Admin
            </Button>
            <Link href="/">
              <Button variant="secondary" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Panel CRM ArquitectoChile</h1>
              <Badge className="ml-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Admin
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button size="sm" onClick={() => setIsNewClientModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Cliente
              </Button>
              {user && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={(user as any).profileImageUrl || undefined} />
                      <AvatarFallback>
                        {(user as any).firstName?.[0]}{(user as any).lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {(user as any).firstName} {(user as any).lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(user as any).email}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { window.location.href = "/api/logout"; }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Salir
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Dashboard</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="tasks">Tareas</TabsTrigger>
            <TabsTrigger value="kpis">KPIs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Dashboard Overview */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData?.totalCustomers || 0}</div>
                  <p className="text-xs text-muted-foreground">+{dashboardData?.monthlyGrowth || 0}% desde el mes pasado</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Proyectos Activos</CardTitle>
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData?.activeProjects || 0}</div>
                  <p className="text-xs text-muted-foreground">de {dashboardData?.totalProjects || 0} proyectos totales</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tareas Completadas</CardTitle>
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData?.completedTasks || 0}</div>
                  <p className="text-xs text-muted-foreground">{dashboardData?.pendingTasks || 0} pendientes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${dashboardData?.totalRevenue?.toLocaleString() || 0}</div>
                  <p className="text-xs text-muted-foreground">CLP este mes</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Customers and Projects */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Clientes Recientes</CardTitle>
                  <CardDescription>Los últimos clientes agregados al CRM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customers.slice(0, 5).map((customer) => (
                      <div key={customer.id} className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {customer.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {customer.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {customer.email}
                          </p>
                        </div>
                        <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                          {customer.status === 'active' ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Proyectos Activos</CardTitle>
                  <CardDescription>Proyectos actualmente en desarrollo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.slice(0, 5).map((project) => (
                      <div key={project.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {project.title}
                          </p>
                          <Badge variant={project.priority === 'high' ? 'destructive' : 'default'}>
                            {project.priority === 'high' ? 'Alta' : 'Media'}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={project.progress} className="flex-1" />
                          <span className="text-xs text-gray-500 dark:text-gray-400 min-w-0">
                            {project.progress}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Clientes</CardTitle>
                <CardDescription>Lista completa de clientes del CRM</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Buscar clientes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtros
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Cliente
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Contacto
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Estado
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Fuente
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                          {customers.map((customer) => (
                            <tr key={customer.id}>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                      {customer.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {customer.name}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      {customer.company}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">{customer.email}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{customer.phone}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                                  {customer.status === 'active' ? 'Activo' : 'Inactivo'}
                                </Badge>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {customer.source}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Proyectos</CardTitle>
                <CardDescription>Próximamente disponible</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Tareas</CardTitle>
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