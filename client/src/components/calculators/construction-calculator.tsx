import { useState } from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";

const comunas: Record<string, { label: string; factor: number }> = {
  "santiago-centro": { label: "Santiago Centro", factor: 1.15 },
  "providencia": { label: "Providencia", factor: 1.25 },
  "las-condes": { label: "Las Condes", factor: 1.30 },
  "la-florida": { label: "La Florida", factor: 1.10 },
  "maipu": { label: "Maipú", factor: 1.05 },
  "nunoa": { label: "Ñuñoa", factor: 1.20 },
  "puente-alto": { label: "Puente Alto", factor: 1.00 },
  "san-bernardo": { label: "San Bernardo", factor: 0.95 },
  "colina": { label: "Colina", factor: 1.05 },
  "vitacura": { label: "Vitacura", factor: 1.35 },
  "lo-barnechea": { label: "Lo Barnechea", factor: 1.30 },
  "valparaiso": { label: "Valparaíso", factor: 1.10 },
  "vina-del-mar": { label: "Viña del Mar", factor: 1.15 },
  "concepcion": { label: "Concepción", factor: 1.00 },
  "temuco": { label: "Temuco", factor: 0.95 },
  "otra": { label: "Otra comuna", factor: 1.00 },
};

const BASE_MIN_UF = 22;
const BASE_MAX_UF = 30;

export default function ConstructionCalculator() {
  const [, setLocation] = useLocation();
  const [comuna, setComuna] = useState("");
  const [m2, setM2] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    if (!comuna || !m2 || parseFloat(m2) <= 0) return;
    setShowResult(true);
  };

  const getResult = () => {
    if (!comuna || !m2) return null;
    const factor = comunas[comuna]?.factor || 1.0;
    const area = parseFloat(m2);
    const minUF = Math.round(BASE_MIN_UF * factor);
    const maxUF = Math.round(BASE_MAX_UF * factor);
    const totalMin = minUF * area;
    const totalMax = maxUF * area;
    return { minUF, maxUF, totalMin, totalMax, area };
  };

  const result = getResult();

  return (
    <Card className="bg-white rounded-xl shadow-lg border border-gray-200">
      <CardHeader className="text-center pb-4">
        <div className="bg-gray-50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Calculator className="w-7 h-7 text-[#0f172a]" />
        </div>
        <CardTitle className="text-xl font-bold text-[#0f172a]">
          Calculadora de Costos de Construcción
        </CardTitle>
        <p className="text-sm text-gray-500">Estimación referencial en UF por m²</p>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Comuna</Label>
          <Select value={comuna} onValueChange={(v) => { setComuna(v); setShowResult(false); }}>
            <SelectTrigger><SelectValue placeholder="Seleccione comuna" /></SelectTrigger>
            <SelectContent>
              {Object.entries(comunas).map(([key, val]) => (
                <SelectItem key={key} value={key}>{val.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Superficie (m²)</Label>
          <Input
            type="number"
            placeholder="Ej: 120"
            min="1"
            value={m2}
            onChange={(e) => { setM2(e.target.value); setShowResult(false); }}
          />
        </div>

        <Button
          onClick={handleCalculate}
          disabled={!comuna || !m2 || parseFloat(m2) <= 0}
          className="w-full bg-[#0f172a] text-white hover:bg-[#1e293b] font-semibold"
        >
          Calcular Estimación
        </Button>

        {showResult && result && (
          <div className="space-y-4 pt-2">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="text-center mb-4">
                <p className="text-sm text-[#64748b] font-semibold mb-1">Rango estimado para {result.area} m²</p>
                <p className="text-3xl font-bold text-[#0f172a]">
                  {result.minUF} – {result.maxUF} UF/m²
                </p>
              </div>
              <div className="border-t border-gray-200 pt-3 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748b]">Inversión mínima estimada</span>
                  <span className="font-bold text-[#0f172a]">{result.totalMin.toLocaleString("es-CL")} UF</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748b]">Inversión máxima estimada</span>
                  <span className="font-bold text-[#0f172a]">{result.totalMax.toLocaleString("es-CL")} UF</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-[#64748b] font-semibold leading-relaxed">
                Cálculo sujeto a factibilidad normativa local. Requiere validación técnica en terreno. Los valores son referenciales y pueden variar según calidad de materiales, condiciones del terreno y complejidad del proyecto.
              </p>
            </div>

            <Button
              onClick={() => setLocation("/contacto")}
              variant="outline"
              className="w-full border-gray-300 text-[#0f172a] hover:bg-gray-50 font-semibold"
            >
              Solicitar Presupuesto Profesional
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
