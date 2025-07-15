import { useState } from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ConstructionCalculator() {
  const [formData, setFormData] = useState({
    constructionType: "",
    squareMeters: "",
    materialQuality: "",
    region: "",
    email: ""
  });
  
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const costRates = {
    casa: { basica: 800, media: 1200, alta: 1600, premium: 2200 },
    departamento: { basica: 900, media: 1300, alta: 1700, premium: 2400 },
    comercial: { basica: 1000, media: 1400, alta: 1800, premium: 2600 },
    oficina: { basica: 1100, media: 1500, alta: 1900, premium: 2800 }
  };

  const regionMultipliers = {
    rm: 1.2,
    valparaiso: 1.1,
    biobio: 1.0,
    otras: 0.9
  };

  const handleCalculate = () => {
    const { constructionType, squareMeters, materialQuality, region } = formData;
    
    if (!constructionType || !squareMeters || !materialQuality || !region) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    const baseRate = costRates[constructionType as keyof typeof costRates][materialQuality as keyof typeof costRates.casa];
    const regionMultiplier = regionMultipliers[region as keyof typeof regionMultipliers];
    const totalCost = baseRate * parseFloat(squareMeters) * regionMultiplier;

    const calculationResult = {
      constructionType,
      squareMeters: parseFloat(squareMeters),
      materialQuality,
      region,
      totalCost,
      costPerSquareMeter: totalCost / parseFloat(squareMeters)
    };

    setResult(calculationResult);
    setShowResult(true);
  };

  const handleSendPDF = async () => {
    if (!formData.email) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu email",
        variant: "destructive"
      });
      return;
    }

    try {
      await apiRequest("POST", "/api/calculator-results", {
        type: "construction",
        email: formData.email,
        inputs: formData,
        results: result
      });

      toast({
        title: "Éxito",
        description: "Te enviaremos el PDF detallado a tu email",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al procesar tu solicitud",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg">
      <CardHeader className="text-center">
        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calculator className="text-primary text-2xl" />
        </div>
        <CardTitle className="text-2xl font-bold text-dark mb-2">
          Calculadora de Costos de Construcción
        </CardTitle>
        <p className="text-gray-600">Calcula el presupuesto estimado para tu proyecto</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Construcción</Label>
          <Select value={formData.constructionType} onValueChange={(value) => setFormData({...formData, constructionType: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casa">Casa Habitación</SelectItem>
              <SelectItem value="departamento">Departamento</SelectItem>
              <SelectItem value="comercial">Local Comercial</SelectItem>
              <SelectItem value="oficina">Oficina</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Metros Cuadrados</Label>
          <Input 
            type="number" 
            placeholder="Ej: 100" 
            value={formData.squareMeters}
            onChange={(e) => setFormData({...formData, squareMeters: e.target.value})}
          />
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Calidad de Materiales</Label>
          <Select value={formData.materialQuality} onValueChange={(value) => setFormData({...formData, materialQuality: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona la calidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basica">Básica</SelectItem>
              <SelectItem value="media">Media</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Región</Label>
          <Select value={formData.region} onValueChange={(value) => setFormData({...formData, region: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona la región" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rm">Región Metropolitana</SelectItem>
              <SelectItem value="valparaiso">Valparaíso</SelectItem>
              <SelectItem value="biobio">Biobío</SelectItem>
              <SelectItem value="otras">Otras Regiones</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={handleCalculate}
          className="w-full bg-primary text-white hover:bg-secondary"
        >
          Calcular Presupuesto
        </Button>
        
        {showResult && result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="font-semibold text-green-800 mb-2">Estimación de Costos</h4>
            <div className="text-green-700 space-y-2">
              <p><strong>Tipo:</strong> {result.constructionType.charAt(0).toUpperCase() + result.constructionType.slice(1)}</p>
              <p><strong>Superficie:</strong> {result.squareMeters} m²</p>
              <p><strong>Calidad:</strong> {result.materialQuality.charAt(0).toUpperCase() + result.materialQuality.slice(1)}</p>
              <p><strong>Región:</strong> {result.region.toUpperCase()}</p>
              <hr className="my-3" />
              <p className="text-lg font-bold">
                Costo Estimado: ${result.totalCost.toLocaleString('es-CL')} CLP
              </p>
              <p className="text-sm opacity-75">
                Precio por m²: ${result.costPerSquareMeter.toLocaleString('es-CL')} CLP
              </p>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg border">
              <p className="text-sm text-gray-600 mb-3">¿Quieres un presupuesto detallado?</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input 
                  type="email" 
                  placeholder="Tu email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendPDF}
                  className="bg-accent text-white hover:bg-yellow-500"
                >
                  Enviar PDF
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
