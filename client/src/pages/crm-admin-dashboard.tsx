import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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
  MapPin
} from "lucide-react";
import { Link } from "wouter";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Queries para datos del CRM
  const { data: dashboardData } = useQuery<DashboardData>({
    queryKey: ['/api/crm/reports/dashboard'],
  });

  const { data: customers = [] } = useQuery<Customer[]>({
    queryKey: ['/api/crm/customers'],
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ['/api/crm/projects'],
  });

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
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Cliente
              </Button>
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
        </Tabs>
      </div>
    </div>
  );
}