import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  FolderOpen, 
  CheckSquare, 
  DollarSign, 
  TrendingUp, 
  MessageSquare,
  Calendar,
  FileText,
  Plus,
  Search,
  Filter
} from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface DashboardData {
  totalCustomers: number;
  activeProjects: number;
  pendingTasks: number;
  monthlyRevenue: number;
  conversionRate: number;
  recentInteractions: Array<{
    id: number;
    type: string;
    subject: string;
    createdAt: string;
    customerId?: number;
    projectId?: number;
  }>;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  customerNumber: string;
  status: string;
  salesExecutive: string;
  totalProjectsValue?: string;
  createdAt: string;
}

interface Project {
  id: number;
  projectNumber: string;
  name: string;
  stage: string;
  contractValue?: string;
  customerId: number;
  createdAt: string;
}

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  assignedTo: string;
  dueDate?: string;
  createdAt: string;
}

export default function CRMDashboard() {
  const { data: dashboardData, isLoading: loadingDashboard } = useQuery<DashboardData>({
    queryKey: ['/api/crm/reports/dashboard'],
  });

  const { data: customers = [], isLoading: loadingCustomers } = useQuery<Customer[]>({
    queryKey: ['/api/crm/customers'],
  });

  const { data: projects = [], isLoading: loadingProjects } = useQuery<Project[]>({
    queryKey: ['/api/crm/projects'],
  });

  const { data: tasks = [], isLoading: loadingTasks } = useQuery<Task[]>({
    queryKey: ['/api/crm/tasks', { status: 'pending' }],
  });

  if (loadingDashboard) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
      case 'planning':
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'on_hold':
      case 'overdue':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sistema CRM ArquitectoChile</h1>
              <p className="text-gray-600 mt-1">Panel de control completo para gestión de clientes</p>
            </div>
            <div className="flex space-x-3">
              <Button asChild>
                <Link href="/crm/leads">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Lead
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/crm/customers/new">
                  <Users className="h-4 w-4 mr-2" />
                  Nuevo Cliente
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.totalCustomers || 0}</div>
              <p className="text-xs text-muted-foreground">
                +2 nuevos este mes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proyectos Activos</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.activeProjects || 0}</div>
              <p className="text-xs text-muted-foreground">
                En progreso y planificación
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
                Requieren atención
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(dashboardData?.monthlyRevenue || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Proyectos completados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversión</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(dashboardData?.conversionRate || 0).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Leads a clientes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="tasks">Tareas</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Interactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>
                    Últimas interacciones con clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData?.recentInteractions?.slice(0, 5).map((interaction) => (
                      <div key={interaction.id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <MessageSquare className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {interaction.subject}
                          </p>
                          <p className="text-sm text-gray-500 capitalize">
                            {interaction.type}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-sm text-gray-500">
                          {format(new Date(interaction.createdAt), 'dd MMM', { locale: es })}
                        </div>
                      </div>
                    )) || (
                      <p className="text-gray-500 text-center py-4">
                        No hay actividad reciente
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/crm/interactions">Ver todas las interacciones</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Pipeline Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Estado del Pipeline</CardTitle>
                  <CardDescription>
                    Proyectos por etapa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['planning', 'in_progress', 'under_review', 'completed'].map((stage) => {
                      const stageProjects = projects.filter(p => p.stage === stage);
                      const stageLabels = {
                        planning: 'Planificación',
                        in_progress: 'En Progreso',
                        under_review: 'En Revisión',
                        completed: 'Completado'
                      };
                      
                      return (
                        <div key={stage} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              stage === 'completed' ? 'bg-green-500' :
                              stage === 'in_progress' ? 'bg-blue-500' :
                              stage === 'under_review' ? 'bg-yellow-500' :
                              'bg-gray-500'
                            }`}></div>
                            <span className="text-sm font-medium">
                              {stageLabels[stage as keyof typeof stageLabels]}
                            </span>
                          </div>
                          <Badge variant="secondary">{stageProjects.length}</Badge>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/crm/projects">Ver todos los proyectos</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Clientes</CardTitle>
                  <CardDescription>
                    Gestión completa de clientes
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loadingCustomers ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : customers.length > 0 ? (
                  <div className="space-y-4">
                    {customers.slice(0, 10).map((customer) => (
                      <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{customer.name}</h4>
                            <p className="text-sm text-gray-500">{customer.email}</p>
                            <p className="text-xs text-gray-400">{customer.customerNumber}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusColor(customer.status)}>
                            {customer.status}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {customer.totalProjectsValue ? 
                                formatCurrency(parseFloat(customer.totalProjectsValue)) : 
                                'Sin proyectos'
                              }
                            </p>
                            <p className="text-xs text-gray-500">
                              {format(new Date(customer.createdAt), 'dd MMM yyyy', { locale: es })}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/crm/customers/${customer.id}`}>Ver</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay clientes</h3>
                    <p className="text-gray-500 mb-4">Comienza agregando tu primer cliente</p>
                    <Button asChild>
                      <Link href="/crm/customers/new">Agregar Cliente</Link>
                    </Button>
                  </div>
                )}
                {customers.length > 10 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline" asChild>
                      <Link href="/crm/customers">Ver todos los clientes</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Proyectos</CardTitle>
                  <CardDescription>
                    Seguimiento de proyectos activos
                  </CardDescription>
                </div>
                <Button asChild>
                  <Link href="/crm/projects/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Proyecto
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {loadingProjects ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-20 bg-gray-100 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : projects.length > 0 ? (
                  <div className="space-y-4">
                    {projects.slice(0, 8).map((project) => (
                      <div key={project.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-medium">{project.name}</h4>
                              <Badge className={getStatusColor(project.stage)}>
                                {project.stage}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{project.projectNumber}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>
                                <Calendar className="h-4 w-4 inline mr-1" />
                                {format(new Date(project.createdAt), 'dd MMM yyyy', { locale: es })}
                              </span>
                              {project.contractValue && (
                                <span>
                                  <DollarSign className="h-4 w-4 inline mr-1" />
                                  {formatCurrency(parseFloat(project.contractValue))}
                                </span>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/crm/projects/${project.id}`}>Ver Detalles</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay proyectos</h3>
                    <p className="text-gray-500 mb-4">Comienza creando tu primer proyecto</p>
                    <Button asChild>
                      <Link href="/crm/projects/new">Crear Proyecto</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Tareas Pendientes</CardTitle>
                  <CardDescription>
                    Tareas que requieren tu atención
                  </CardDescription>
                </div>
                <Button asChild>
                  <Link href="/crm/tasks/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Tarea
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {loadingTasks ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : tasks.length > 0 ? (
                  <div className="space-y-4">
                    {tasks.slice(0, 8).map((task) => (
                      <div key={task.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{task.title}</h4>
                            {task.description && (
                              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                            )}
                            <div className="flex items-center space-x-4">
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                Asignado a: {task.assignedTo}
                              </span>
                              {task.dueDate && (
                                <span className="text-sm text-gray-500">
                                  Vence: {format(new Date(task.dueDate), 'dd MMM', { locale: es })}
                                </span>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/crm/tasks/${task.id}`}>Ver</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay tareas pendientes</h3>
                    <p className="text-gray-500 mb-4">¡Excelente trabajo! Todas las tareas están completas</p>
                    <Button asChild>
                      <Link href="/crm/tasks/new">Crear Nueva Tarea</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}