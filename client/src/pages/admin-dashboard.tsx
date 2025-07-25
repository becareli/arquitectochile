import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, FileText, Calculator, Zap, TrendingUp, Phone, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import QuoteDashboard from "@/components/quote-dashboard";
import LeadManagement from "@/components/lead-management";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: leads } = useQuery({
    queryKey: ["/api/leads"],
    enabled: true,
  });

  const { data: quotes } = useQuery({
    queryKey: ["/api/quotes"],
    enabled: true,
  });

  const { data: calculatorResults } = useQuery({
    queryKey: ["/api/calculator-results"],
    enabled: true,
  });

  const getStatusStats = (items: any[], statusField: string = 'status') => {
    if (!Array.isArray(items)) return {};
    return items.reduce((acc, item) => {
      const status = item[statusField];
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const leadsArray = Array.isArray(leads) ? leads : [];
  const quotesArray = Array.isArray(quotes) ? quotes : [];
  const calculatorArray = Array.isArray(calculatorResults) ? calculatorResults : [];

  const leadStats = getStatusStats(leadsArray);
  const quoteStats = getStatusStats(quotesArray);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
        <p className="text-gray-600">Gestiona todos los aspectos de ArquitectoChile desde un solo lugar</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="quotes">Cotizaciones</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-900">Total Leads</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{leadsArray.length || 0}</div>
                <p className="text-xs text-blue-600 mt-1">
                  {leadStats.new || 0} nuevos este mes
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-900">Cotizaciones</CardTitle>
                <FileText className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">{quotesArray.length || 0}</div>
                <p className="text-xs text-green-600 mt-1">
                  {quoteStats.pending || 0} pendientes
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-900">Calculadoras</CardTitle>
                <Calculator className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">{calculatorArray.length || 0}</div>
                <p className="text-xs text-purple-600 mt-1">
                  Usos totales
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-900">Conversión</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">
                  {leadsArray.length > 0 ? Math.round(((quoteStats.accepted || 0) / leadsArray.length) * 100) : 0}%
                </div>
                <p className="text-xs text-orange-600 mt-1">
                  Tasa de cierre
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Leads Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadsArray.slice(0, 5).map((lead: any) => (
                    <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </p>
                      </div>
                      <Badge className={
                        lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'qualified' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {lead.status}
                      </Badge>
                    </div>
                  ))}
                  {leadsArray.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No hay leads recientes</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Cotizaciones Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quotesArray.slice(0, 5).map((quote: any) => (
                    <div key={quote.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Cotización #{quote.id}</p>
                        <p className="text-sm text-gray-600">{quote.lead?.name || 'Cliente desconocido'}</p>
                        <p className="text-sm font-bold text-primary">
                          {new Intl.NumberFormat('es-CL', {
                            style: 'currency',
                            currency: 'CLP',
                            minimumFractionDigits: 0,
                          }).format(parseFloat(quote.totalPrice))}
                        </p>
                      </div>
                      <Badge className={
                        quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        quote.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        quote.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {quote.status}
                      </Badge>
                    </div>
                  ))}
                  {quotesArray.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No hay cotizaciones recientes</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-20 flex flex-col items-center justify-center gap-2">
                  <Users className="w-6 h-6" />
                  Crear Lead
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                  <FileText className="w-6 h-6" />
                  Nueva Cotización
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                  <Phone className="w-6 h-6" />
                  Contactar Cliente
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                  <BarChart3 className="w-6 h-6" />
                  Ver Reportes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads">
          <LeadManagement />
        </TabsContent>

        <TabsContent value="quotes">
          <QuoteDashboard />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análisis y Métricas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Distribución de Leads por Estado</h3>
                  <div className="space-y-2">
                    {Object.entries(leadStats).map(([status, count]) => (
                      <div key={status} className="flex justify-between items-center">
                        <span className="capitalize">{status}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(count / (leadsArray.length || 1)) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Estado de Cotizaciones</h3>
                  <div className="space-y-2">
                    {Object.entries(quoteStats).map(([status, count]) => (
                      <div key={status} className="flex justify-between items-center">
                        <span className="capitalize">{status}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(count / (quotesArray.length || 1)) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-4">Resumen de Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">{leadsArray.length || 0}</div>
                    <div className="text-sm text-blue-600">Total Leads</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-900">{quoteStats.accepted || 0}</div>
                    <div className="text-sm text-green-600">Cotizaciones Aceptadas</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-900">
                      {leadsArray.length > 0 ? Math.round(((quoteStats.accepted || 0) / leadsArray.length) * 100) : 0}%
                    </div>
                    <div className="text-sm text-purple-600">Tasa de Conversión</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}