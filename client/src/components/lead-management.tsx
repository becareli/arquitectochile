import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Users, Phone, Mail, Calendar, MessageSquare, Search, Filter } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Lead } from "@shared/schema";

export default function LeadManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: leads, isLoading } = useQuery({
    queryKey: ["/api/leads"],
    enabled: true,
  });

  const updateLeadMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await fetch(`/api/leads/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update lead status');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast({
        title: "Estado actualizado",
        description: "El estado del lead ha sido actualizado exitosamente",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del lead",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-green-100 text-green-800';
      case 'quoted':
        return 'bg-purple-100 text-purple-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'website_form':
        return 'bg-indigo-100 text-indigo-800';
      case 'calculator':
        return 'bg-emerald-100 text-emerald-800';
      case 'lead_magnet':
        return 'bg-orange-100 text-orange-800';
      case 'ai_agent_qualification':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLeads = leads?.filter((lead: Lead) => {
    const matchesSearch = !searchTerm || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  }) || [];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Leads</h1>
        <p className="text-gray-600">Administra y hace seguimiento a todos los leads generados</p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="search">Buscar leads</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Nombre, email o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label>Estado</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="new">Nuevo</SelectItem>
                <SelectItem value="contacted">Contactado</SelectItem>
                <SelectItem value="qualified">Calificado</SelectItem>
                <SelectItem value="quoted">Cotizado</SelectItem>
                <SelectItem value="closed">Cerrado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Fuente</Label>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las fuentes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las fuentes</SelectItem>
                <SelectItem value="website_form">Formulario Web</SelectItem>
                <SelectItem value="calculator">Calculadora</SelectItem>
                <SelectItem value="lead_magnet">Lead Magnet</SelectItem>
                <SelectItem value="ai_agent_qualification">AI Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button variant="outline" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Filtros avanzados
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>Total: {filteredLeads.length} leads</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Nuevos: {filteredLeads.filter(l => l.status === 'new').length}</span>
          <span>Calificados: {filteredLeads.filter(l => l.status === 'qualified').length}</span>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLeads.map((lead: Lead) => (
          <Card key={lead.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    {lead.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Lead #{lead.id}</p>
                </div>
                <Badge className={getStatusColor(lead.status)}>
                  {lead.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{new Date(lead.createdAt).toLocaleDateString('es-CL')}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Tipo de ayuda</p>
                  <p className="font-medium capitalize">{lead.helpType.replace('_', ' ')}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Timeline</p>
                  <p className="text-sm">{lead.timeline.replace('_', ' ')}</p>
                </div>

                <div>
                  <Badge className={getSourceColor(lead.source)} variant="outline">
                    {lead.source.replace('_', ' ')}
                  </Badge>
                </div>

                {lead.message && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Mensaje</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{lead.message}</p>
                  </div>
                )}

                <Separator />

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedLead(lead)}
                    className="flex-1"
                  >
                    Ver detalles
                  </Button>
                  <Select 
                    value={lead.status} 
                    onValueChange={(status) => updateLeadMutation.mutate({ id: lead.id, status })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Nuevo</SelectItem>
                      <SelectItem value="contacted">Contactado</SelectItem>
                      <SelectItem value="qualified">Calificado</SelectItem>
                      <SelectItem value="quoted">Cotizado</SelectItem>
                      <SelectItem value="closed">Cerrado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay leads</h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== 'all' || sourceFilter !== 'all' 
              ? 'No se encontraron leads con los filtros aplicados.' 
              : 'Los leads aparecerán aquí cuando se generen.'}
          </p>
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Lead #{selectedLead.id} - {selectedLead.name}</CardTitle>
                <Button variant="outline" onClick={() => setSelectedLead(null)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Información de Contacto</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Nombre:</span> {selectedLead.name}</p>
                    <p><span className="text-gray-600">Email:</span> {selectedLead.email}</p>
                    <p><span className="text-gray-600">Teléfono:</span> {selectedLead.phone}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Estado y Seguimiento</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Estado:</span>
                      <Badge className={getStatusColor(selectedLead.status)}>
                        {selectedLead.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Fuente:</span>
                      <Badge className={getSourceColor(selectedLead.source)} variant="outline">
                        {selectedLead.source.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p><span className="text-gray-600">Creado:</span> {new Date(selectedLead.createdAt).toLocaleString('es-CL')}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Detalles del Proyecto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Tipo de ayuda</p>
                    <p className="font-medium capitalize">{selectedLead.helpType.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Timeline esperado</p>
                    <p className="font-medium">{selectedLead.timeline.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>

              {selectedLead.message && (
                <div>
                  <h3 className="font-semibold mb-3">Mensaje del Cliente</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedLead.message}</p>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-3">Actualizar Estado</h3>
                <Select 
                  value={selectedLead.status} 
                  onValueChange={(status) => {
                    updateLeadMutation.mutate({ id: selectedLead.id, status });
                    setSelectedLead({ ...selectedLead, status });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Nuevo</SelectItem>
                    <SelectItem value="contacted">Contactado</SelectItem>
                    <SelectItem value="qualified">Calificado</SelectItem>
                    <SelectItem value="quoted">Cotizado</SelectItem>
                    <SelectItem value="closed">Cerrado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contactar Cliente
                </Button>
                <Button variant="outline" className="flex-1">
                  Generar Cotización
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}