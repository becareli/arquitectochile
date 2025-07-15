import { useState } from "react";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function EnergyCalculator() {
  const [formData, setFormData] = useState({
    housingType: "",
    energyMeters: "",
    currentEnergyCost: "",
    climateZone: "",
    email: ""
  });
  
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const efficiencyRates = {
    casa: { norte: 0.25, centro: 0.35, sur: 0.45 },
    departamento: { norte: 0.20, centro: 0.30, sur: 0.40 },
    oficina: { norte: 0.30, centro: 0.40, sur: 0.50 }
  };

  const handleCalculate = () => {
    const { housingType, energyMeters, currentEnergyCost, climateZone } = formData;
    
    if (!housingType || !energyMeters || !currentEnergyCost || !climateZone) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    const savingsRate = efficiencyRates[housingType as keyof typeof efficiencyRates][climateZone as keyof typeof efficiencyRates.casa];
    const monthlySavings = parseFloat(currentEnergyCost) * savingsRate;
    const annualSavings = monthlySavings * 12;
    const co2Reduction = parseFloat(energyMeters) * 0.5 * 12;

    const calculationResult = {
      housingType,
      energyMeters: parseFloat(energyMeters),
      currentEnergyCost: parseFloat(currentEnergyCost),
      climateZone,
      monthlySavings,
      annualSavings,
      co2Reduction,
      treesEquivalent: co2Reduction / 22,
      fiveYearSavings: annualSavings * 5
    };

    setResult(calculationResult);
    setShowResult(true);
  };

  const handleSendQuote = async () => {
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
        type: "energy",
        email: formData.email,
        inputs: formData,
        results: result
      });

      toast({
        title: "Éxito",
        description: "Te enviaremos una cotización personalizada de EIFS",
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
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Leaf className="text-green-600 text-2xl" />
        </div>
        <CardTitle className="text-2xl font-bold text-dark mb-2">
          Calculadora de Eficiencia Energética
        </CardTitle>
        <p className="text-gray-600">Descubre cuánto puedes ahorrar con EIFS</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Vivienda</Label>
          <Select value={formData.housingType} onValueChange={(value) => setFormData({...formData, housingType: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="departamento">Departamento</SelectItem>
              <SelectItem value="oficina">Oficina</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Metros Cuadrados</Label>
          <Input 
            type="number" 
            placeholder="Ej: 120" 
            value={formData.energyMeters}
            onChange={(e) => setFormData({...formData, energyMeters: e.target.value})}
          />
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Gasto Mensual Actual en Energía</Label>
          <Input 
            type="number" 
            placeholder="Ej: 80000" 
            value={formData.currentEnergyCost}
            onChange={(e) => setFormData({...formData, currentEnergyCost: e.target.value})}
          />
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Zona Climática</Label>
          <Select value={formData.climateZone} onValueChange={(value) => setFormData({...formData, climateZone: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona la zona" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="norte">Norte (Cálido)</SelectItem>
              <SelectItem value="centro">Centro (Templado)</SelectItem>
              <SelectItem value="sur">Sur (Frío)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={handleCalculate}
          className="w-full bg-green-600 text-white hover:bg-green-700"
        >
          Calcular Ahorros
        </Button>
        
        {showResult && result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="font-semibold text-green-800 mb-2">Potencial de Ahorro</h4>
            <div className="text-green-700 space-y-2">
              <p><strong>Ahorro Mensual:</strong> ${result.monthlySavings.toLocaleString('es-CL')} CLP</p>
              <p><strong>Ahorro Anual:</strong> ${result.annualSavings.toLocaleString('es-CL')} CLP</p>
              <p><strong>Reducción CO₂:</strong> {result.co2Reduction.toFixed(1)} kg/año</p>
              <p><strong>Equivalente a:</strong> {result.treesEquivalent.toFixed(1)} árboles plantados</p>
              <hr className="my-3" />
              <p className="text-lg font-bold text-green-600">
                Ahorro en 5 años: ${result.fiveYearSavings.toLocaleString('es-CL')} CLP
              </p>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg border">
              <p className="text-sm text-gray-600 mb-3">¿Quieres una cotización personalizada de EIFS?</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input 
                  type="email" 
                  placeholder="Tu email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendQuote}
                  className="bg-accent text-white hover:bg-yellow-500"
                >
                  Solicitar Cotización
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
