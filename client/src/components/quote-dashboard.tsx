import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FileText, Calendar, DollarSign, CheckCircle, Clock, XCircle, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { GeneratedQuote, Lead } from "@shared/schema";

interface QuoteWithLead extends GeneratedQuote {
  lead?: Lead;
}

export default function QuoteDashboard() {
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<QuoteWithLead | null>(null);

  const { data: quotes, isLoading } = useQuery({
    queryKey: ["/api/quotes"],
    enabled: true,
  });

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'sent':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredQuotes = Array.isArray(quotes) ? quotes.filter((quote: QuoteWithLead) => 
    !searchEmail || quote.lead?.email?.toLowerCase().includes(searchEmail.toLowerCase())
  ) : [];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Cotizaciones</h1>
        <p className="text-gray-600">Gestiona y revisa todas las cotizaciones generadas automáticamente</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="search-email">Buscar por email del cliente</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="search-email"
                type="email"
                placeholder="cliente@email.com"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuotes.map((quote: QuoteWithLead) => (
          <Card key={quote.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedQuote(quote)}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Cotización #{quote.id}
                </CardTitle>
                <Badge className={getStatusColor(quote.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(quote.status)}
                    {quote.status}
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Cliente</p>
                  <p className="font-medium">{quote.lead?.name || 'N/A'}</p>
                  <p className="text-sm text-gray-500">{quote.lead?.email || 'N/A'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Servicio</p>
                  <p className="font-medium capitalize">{quote.region} - {quote.complexity}</p>
                  <p className="text-sm text-gray-500">{quote.projectSize}m²</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-xl font-bold text-primary">
                      {formatPrice(quote.totalPrice)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Generado por</p>
                    <p className="text-sm font-medium">{quote.generatedBy}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  Válida hasta: {new Date(quote.validUntil).toLocaleDateString('es-CL')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuotes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay cotizaciones</h3>
          <p className="text-gray-500">
            {searchEmail ? 'No se encontraron cotizaciones para ese email.' : 'Las cotizaciones generadas aparecerán aquí.'}
          </p>
        </div>
      )}

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Cotización #{selectedQuote.id}</CardTitle>
                <Button variant="outline" onClick={() => setSelectedQuote(null)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Información del Cliente</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Nombre:</span> {selectedQuote.lead?.name || 'N/A'}</p>
                    <p><span className="text-gray-600">Email:</span> {selectedQuote.lead?.email || 'N/A'}</p>
                    <p><span className="text-gray-600">Teléfono:</span> {selectedQuote.lead?.phone || 'N/A'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Detalles del Proyecto</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Región:</span> {selectedQuote.region.toUpperCase()}</p>
                    <p><span className="text-gray-600">Complejidad:</span> {selectedQuote.complexity}</p>
                    <p><span className="text-gray-600">Tamaño:</span> {selectedQuote.projectSize}m²</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Desglose de Precios</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Precio base:</span>
                    <span className="font-medium">{formatPrice(selectedQuote.basePrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Precio por m² ({selectedQuote.projectSize}m²):</span>
                    <span className="font-medium">{formatPrice(selectedQuote.sizePrice)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">{formatPrice(selectedQuote.totalPrice)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Estado y Validez</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedQuote.status)}
                    <Badge className={getStatusColor(selectedQuote.status)}>
                      {selectedQuote.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Válida hasta</p>
                    <p className="font-medium">{new Date(selectedQuote.validUntil).toLocaleDateString('es-CL')}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Información de Generación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Generado por</p>
                    <p className="font-medium">{selectedQuote.generatedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fecha de creación</p>
                    <p className="font-medium">{new Date(selectedQuote.createdAt).toLocaleString('es-CL')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}