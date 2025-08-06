import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Building, DollarSign, Download, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { InsertCalculatorLead } from '@shared/schema';

// Schema para captura de leads
const leadFormSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Teléfono debe tener al menos 8 dígitos"),
  projectType: z.string().min(1, "Selecciona el tipo de proyecto"),
  budget: z.string().min(1, "Selecciona tu presupuesto"),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

interface CalculationResult {
  totalCost: number;
  costPerM2: number;
  breakdown: {
    materials: number;
    labor: number;
    permits: number;
    contingency: number;
  };
}

export default function CalculadoraCostos() {
  const [area, setArea] = useState<number>(0);
  const [constructionType, setConstructionType] = useState<string>("");
  const [finishLevel, setFinishLevel] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { toast } = useToast();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
    },
  });

  const submitLeadMutation = useMutation({
    mutationFn: (leadData: InsertCalculatorLead) => 
      apiRequest('/api/leads/calculator', {
        method: 'POST',
        body: JSON.stringify(leadData),
      }),
    onSuccess: (data) => {
      toast({
        title: "¡Solicitud enviada!",
        description: data.message || "Te contactaremos pronto con tu presupuesto detallado",
      });
      setIsSubmitted(true);
      setShowLeadForm(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu solicitud. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  });

  // Tarifas base por m2 según tipo y nivel
  const basePrices = {
    casa: {
      basico: 800,
      medio: 1200,
      premium: 1800,
    },
    departamento: {
      basico: 700,
      medio: 1000,
      premium: 1500,
    },
    comercial: {
      basico: 900,
      medio: 1400,
      premium: 2000,
    },
  };

  const calculateCost = () => {
    if (!area || !constructionType || !finishLevel) return;

    const basePrice = basePrices[constructionType as keyof typeof basePrices][finishLevel as keyof typeof basePrices.casa];
    const totalBase = basePrice * area;

    const breakdown = {
      materials: Math.round(totalBase * 0.45),
      labor: Math.round(totalBase * 0.35),
      permits: Math.round(totalBase * 0.08),
      contingency: Math.round(totalBase * 0.12),
    };

    const totalCost = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0);

    setResult({
      totalCost,
      costPerM2: basePrice,
      breakdown,
    });

    // Mostrar formulario de leads después del cálculo
    setTimeout(() => setShowLeadForm(true), 1500);
  };

  const onSubmitLead = async (data: LeadFormData) => {
    const leadSubmission: InsertCalculatorLead = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      projectType: data.projectType,
      budget: data.budget,
      source: 'calculadora-costos',
    };

    submitLeadMutation.mutate(leadSubmission);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Calculator className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculadora de Costos de Construcción
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Obtén una estimación precisa de los costos de tu proyecto de construcción. 
            Basado en +20 años de experiencia en el mercado chileno.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario de Cálculo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Datos del Proyecto
              </CardTitle>
              <CardDescription>
                Ingresa los detalles de tu proyecto para obtener una estimación personalizada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="area">Área de Construcción (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="Ej: 120"
                  value={area || ""}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="constructionType">Tipo de Construcción</Label>
                <Select value={constructionType} onValueChange={setConstructionType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa Unifamiliar</SelectItem>
                    <SelectItem value="departamento">Departamento</SelectItem>
                    <SelectItem value="comercial">Local Comercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="finishLevel">Nivel de Terminaciones</Label>
                <Select value={finishLevel} onValueChange={setFinishLevel}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecciona el nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basico">Básico - Estándar económico</SelectItem>
                    <SelectItem value="medio">Medio - Calidad estándar</SelectItem>
                    <SelectItem value="premium">Premium - Alta calidad</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculateCost} 
                className="w-full"
                disabled={!area || !constructionType || !finishLevel}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calcular Costos
              </Button>
            </CardContent>
          </Card>

          {/* Resultados */}
          <Card className={result ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Estimación de Costos
              </CardTitle>
              <CardDescription>
                Desglose detallado de los costos estimados
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="text-center p-6 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {formatCurrency(result.totalCost)}
                    </div>
                    <div className="text-gray-600">
                      {formatCurrency(result.costPerM2)} por m²
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Desglose de Costos:</h4>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Materiales (45%)</span>
                      <span className="font-medium">{formatCurrency(result.breakdown.materials)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Mano de Obra (35%)</span>
                      <span className="font-medium">{formatCurrency(result.breakdown.labor)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Permisos (8%)</span>
                      <span className="font-medium">{formatCurrency(result.breakdown.permits)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Contingencias (12%)</span>
                      <span className="font-medium">{formatCurrency(result.breakdown.contingency)}</span>
                    </div>
                    
                    <div className="flex justify-between py-3 font-bold text-lg border-t-2">
                      <span>Total Estimado</span>
                      <span className="text-primary">{formatCurrency(result.totalCost)}</span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>Nota:</strong> Esta es una estimación referencial basada en promedios del mercado. 
                      Los costos reales pueden variar según ubicación, proveedores y especificaciones del proyecto.
                    </p>
                  </div>

                  <div className="mt-6 p-6 bg-gradient-to-r from-primary/5 to-blue-50 rounded-lg border border-primary/20">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      ¿Quieres una cotización exacta y personalizada?
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Obtén un presupuesto detallado y una consulta gratuita con nuestros arquitectos expertos.
                    </p>
                    <Button 
                      onClick={() => setShowLeadForm(true)}
                      className="w-full bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      Obtener Presupuesto Detallado Gratis
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Calculator className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Completa los datos del proyecto para ver la estimación</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-blue-50 border-primary/20">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Quieres una cotización exacta y personalizada?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Nuestros arquitectos pueden brindarte una evaluación precisa considerando 
                tu ubicación, preferencias específicas y condiciones del terreno.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Solicitar Cotización Gratuita
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar Guía de Construcción
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lead Capture Modal */}
        <Dialog open={showLeadForm} onOpenChange={setShowLeadForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>¡Excelente! Tu estimación está lista</DialogTitle>
              <DialogDescription>
                Para enviarte el reporte detallado y brindarte asesoría personalizada, 
                necesitamos algunos datos de contacto.
              </DialogDescription>
            </DialogHeader>
            
            {isSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Gracias!</h3>
                <p className="text-gray-600">
                  Hemos recibido tu información. Te contactaremos pronto con tu cotización personalizada.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitLead)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="tu@email.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input placeholder="+56 9 XXXX XXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Proyecto</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tu proyecto" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="casa-nueva">Casa Nueva</SelectItem>
                            <SelectItem value="remodelacion">Remodelación</SelectItem>
                            <SelectItem value="ampliacion">Ampliación</SelectItem>
                            <SelectItem value="comercial">Proyecto Comercial</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Presupuesto Estimado</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tu rango" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="50-100m">$50M - $100M</SelectItem>
                            <SelectItem value="100-200m">$100M - $200M</SelectItem>
                            <SelectItem value="200-300m">$200M - $300M</SelectItem>
                            <SelectItem value="300m+">Más de $300M</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    Obtener Cotización Personalizada
                  </Button>
                </form>
              </Form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}