import { useState } from "react";
import { Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";

const comunas: Record<string, { label: string; zone: "calido" | "templado" | "frio" }> = {
  "santiago-centro": { label: "Santiago Centro", zone: "templado" },
  "providencia": { label: "Providencia", zone: "templado" },
  "las-condes": { label: "Las Condes", zone: "templado" },
  "la-florida": { label: "La Florida", zone: "templado" },
  "maipu": { label: "Maipú", zone: "templado" },
  "nunoa": { label: "Ñuñoa", zone: "templado" },
  "puente-alto": { label: "Puente Alto", zone: "frio" },
  "san-bernardo": { label: "San Bernardo", zone: "frio" },
  "colina": { label: "Colina", zone: "frio" },
  "valparaiso": { label: "Valparaíso", zone: "templado" },
  "vina-del-mar": { label: "Viña del Mar", zone: "templado" },
  "concepcion": { label: "Concepción", zone: "frio" },
  "temuco": { label: "Temuco", zone: "frio" },
  "la-serena": { label: "La Serena", zone: "calido" },
  "antofagasta": { label: "Antofagasta", zone: "calido" },
  "otra": { label: "Otra comuna", zone: "templado" },
};

const lossData: Record<string, Record<string, Record<string, { muros: number; ventanas: number; techo: number; piso: number }>>> = {
  calido: {
    ladrillo: {
      simple: { muros: 30, ventanas: 25, techo: 15, piso: 10 },
      termopanel: { muros: 30, ventanas: 10, techo: 15, piso: 10 },
    },
    hormigon: {
      simple: { muros: 35, ventanas: 25, techo: 15, piso: 10 },
      termopanel: { muros: 35, ventanas: 10, techo: 15, piso: 10 },
    },
    madera: {
      simple: { muros: 20, ventanas: 25, techo: 20, piso: 15 },
      termopanel: { muros: 20, ventanas: 10, techo: 20, piso: 15 },
    },
  },
  templado: {
    ladrillo: {
      simple: { muros: 35, ventanas: 30, techo: 18, piso: 12 },
      termopanel: { muros: 35, ventanas: 12, techo: 18, piso: 12 },
    },
    hormigon: {
      simple: { muros: 40, ventanas: 30, techo: 18, piso: 12 },
      termopanel: { muros: 40, ventanas: 12, techo: 18, piso: 12 },
    },
    madera: {
      simple: { muros: 25, ventanas: 30, techo: 22, piso: 15 },
      termopanel: { muros: 25, ventanas: 12, techo: 22, piso: 15 },
    },
  },
  frio: {
    ladrillo: {
      simple: { muros: 40, ventanas: 35, techo: 20, piso: 15 },
      termopanel: { muros: 40, ventanas: 15, techo: 20, piso: 15 },
    },
    hormigon: {
      simple: { muros: 45, ventanas: 35, techo: 20, piso: 15 },
      termopanel: { muros: 45, ventanas: 15, techo: 20, piso: 15 },
    },
    madera: {
      simple: { muros: 30, ventanas: 35, techo: 25, piso: 18 },
      termopanel: { muros: 30, ventanas: 15, techo: 25, piso: 18 },
    },
  },
};

export default function EnergyCalculator() {
  const [, setLocation] = useLocation();
  const [comuna, setComuna] = useState("");
  const [material, setMaterial] = useState("");
  const [ventanas, setVentanas] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    if (!comuna || !material || !ventanas) return;
    setShowResult(true);
  };

  const getResult = () => {
    if (!comuna || !material || !ventanas) return null;
    const zone = comunas[comuna]?.zone || "templado";
    return lossData[zone]?.[material]?.[ventanas] || null;
  };

  const result = getResult();
  const totalLoss = result ? result.muros + result.ventanas + result.techo + result.piso : 0;

  const barItems = result
    ? [
        { label: "Muros", value: result.muros, color: "bg-[#f97316]" },
        { label: "Ventanas", value: result.ventanas, color: "bg-[#0f172a]" },
        { label: "Techo", value: result.techo, color: "bg-[#64748b]" },
        { label: "Piso", value: result.piso, color: "bg-gray-400" },
      ]
    : [];

  return (
    <Card className="bg-white rounded-xl shadow-lg border border-gray-200">
      <CardHeader className="text-center pb-4">
        <div className="bg-orange-50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Thermometer className="w-7 h-7 text-orange-600" />
        </div>
        <CardTitle className="text-xl font-bold text-gray-900">
          Diagnóstico de Confort Térmico
        </CardTitle>
        <p className="text-sm text-gray-500">Evalúe las pérdidas energéticas de su vivienda</p>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Comuna (clima)</Label>
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
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Material de Muros</Label>
          <Select value={material} onValueChange={(v) => { setMaterial(v); setShowResult(false); }}>
            <SelectTrigger><SelectValue placeholder="Seleccione material" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ladrillo">Ladrillo</SelectItem>
              <SelectItem value="hormigon">Hormigón</SelectItem>
              <SelectItem value="madera">Madera</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Tipo de Ventanas</Label>
          <Select value={ventanas} onValueChange={(v) => { setVentanas(v); setShowResult(false); }}>
            <SelectTrigger><SelectValue placeholder="Seleccione tipo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="simple">Vidrio Simple</SelectItem>
              <SelectItem value="termopanel">Termopanel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleCalculate}
          disabled={!comuna || !material || !ventanas}
          className="w-full bg-orange-500 text-white hover:bg-orange-600 font-semibold"
        >
          Evaluar Pérdida Energética
        </Button>

        {showResult && result && (
          <div className="space-y-5 pt-2">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Distribución de Pérdida Energética</h4>
              <div className="space-y-3">
                {barItems.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${item.color} h-3 rounded-full transition-all duration-700`}
                        style={{ width: `${Math.min(item.value * 2, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Pérdida total estimada</span>
                <span className={`text-lg font-bold ${totalLoss > 80 ? "text-[#f97316]" : totalLoss > 60 ? "text-[#f97316]" : "text-[#0f172a]"}`}>
                  {totalLoss}%
                </span>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-center">
              <p className="text-sm font-bold text-orange-800 mb-1">
                Ahorre hasta un 35% con nuestro sistema EIFS
              </p>
              <p className="text-xs text-orange-600 mb-4">
                Aislación térmica exterior profesional para su vivienda
              </p>
              <Button
                onClick={() => setLocation("/asesoria-arquitectonica-terreno")}
                className="bg-orange-500 text-white hover:bg-orange-600 font-semibold"
              >
                Agendar Asesoría — $45.000
              </Button>
            </div>

            <p className="text-[11px] text-gray-400 text-center leading-snug">
              Estimación referencial basada en parámetros generales. Los valores reales dependen de factores constructivos específicos. Requiere validación técnica en terreno.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
