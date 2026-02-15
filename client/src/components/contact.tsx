import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, ArrowLeft, Send } from "lucide-react";

export default function Contact() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    categoria: "",
    servicio: "",
    direccion: "",
    comuna: "",
    presupuesto: "",
    mensaje: "",
    cliente: "",
    telefono: ""
  });

  const servicesMap: Record<string, string[]> = {
    Arq: ["Permiso Edificación", "Obra Menor", "Recepción Final", "Anteproyecto"],
    Inm: ["Tasación", "Subdivisión", "Estudio Cabida", "Rol Propiedad"],
    Esp: ["Eléctrico", "Agua/Alcantarillado", "Gas TC-6", "Cálculo"],
    Cons: ["Construcción Casa", "Ampliación", "Remodelación", "EIFS"]
  };

  const nextStep = () => {
    if (step === 1 && (!formData.categoria || !formData.servicio)) {
      toast({ title: "Error", description: "Selecciona una categoría y servicio", variant: "destructive" });
      return;
    }
    if (step === 2 && (!formData.direccion || !formData.comuna || !formData.presupuesto)) {
      toast({ title: "Error", description: "Completa la ubicación y presupuesto", variant: "destructive" });
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // URL de webhook de n8n (reemplazar con la real cuando se tenga)
      const WEBHOOK_URL = "https://n8n.arquitectochile.com/webhook/contacto";
      
      // Por ahora simulamos la petición o mostramos alerta como pidió el prompt
      console.log("🚀 Enviando datos a n8n:", formData);
      
      // Simulamos delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Evaluación Solicitada",
        description: "Tus datos han sido enviados para validación técnica. Te contactaremos pronto.",
      });
      
      // Reset
      setStep(1);
      setFormData({
        categoria: "",
        servicio: "",
        direccion: "",
        comuna: "",
        presupuesto: "",
        mensaje: "",
        cliente: "",
        telefono: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar la solicitud. Intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-neutral dark:bg-gray-900">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl font-bold text-dark dark:text-white mb-2">Evaluación de Proyecto</h2>
          <p className="text-gray-600 dark:text-gray-400">Completa los datos para validar la factibilidad técnica.</p>
        </div>

        <Card className="shadow-xl border-none">
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <div className="space-y-2">
                    <Label className="font-bold">1. ¿En qué área necesitas ayuda?</Label>
                    <Select 
                      value={formData.categoria} 
                      onValueChange={(val) => setFormData({ ...formData, categoria: val, servicio: "" })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Seleccione categoría..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Arq">Arquitectura y Permisos</SelectItem>
                        <SelectItem value="Inm">Asesoría Inmobiliaria</SelectItem>
                        <SelectItem value="Esp">Especialidades (Luz, Agua, Gas)</SelectItem>
                        <SelectItem value="Cons">Construcción y Remodelación</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.categoria && (
                    <div className="space-y-2 animate-in fade-in zoom-in-95">
                      <Label>Servicio específico:</Label>
                      <Select 
                        value={formData.servicio} 
                        onValueChange={(val) => setFormData({ ...formData, servicio: val })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Seleccione servicio..." />
                        </SelectTrigger>
                        <SelectContent>
                          {servicesMap[formData.categoria].map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button type="button" onClick={nextStep} className="w-full bg-dark hover:bg-black h-12 text-lg">
                    Siguiente <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <Label className="font-bold">2. Ubicación y Presupuesto</Label>
                  <Input 
                    placeholder="Calle y Número Exacto" 
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    className="h-12"
                  />
                  <Input 
                    placeholder="Comuna" 
                    value={formData.comuna}
                    onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
                    className="h-12"
                  />
                  
                  <div className="space-y-2">
                    <Label>Presupuesto estimado:</Label>
                    <Select 
                      value={formData.presupuesto} 
                      onValueChange={(val) => setFormData({ ...formData, presupuesto: val })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Seleccione presupuesto..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="40k">Desde $40.000 (Asesoría)</SelectItem>
                        <SelectItem value="300k-5m">$300.000 - $5.000.000</SelectItem>
                        <SelectItem value="5m-30m">$5.000.000 - $30.000.000</SelectItem>
                        <SelectItem value="30m+">Más de $30.000.000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12">
                      <ArrowLeft className="mr-2 w-5 h-5" /> Atrás
                    </Button>
                    <Button type="button" onClick={nextStep} className="flex-[2] bg-dark hover:bg-black h-12 text-lg">
                      Siguiente <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <Label className="font-bold">3. Cuéntanos tu caso (Para análisis de IA)</Label>
                  <Textarea 
                    placeholder="Describe tu proyecto con detalle..." 
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="min-h-[120px]"
                  />
                  
                  <Input 
                    placeholder="Tu Nombre" 
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    className="h-12"
                  />
                  <Input 
                    placeholder="WhatsApp (+569...)" 
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="h-12"
                  />
                  
                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12">
                      <ArrowLeft className="mr-2 w-5 h-5" /> Atrás
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex-[2] bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-bold"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send className="mr-2 w-5 h-5" /> SOLICITAR EVALUACIÓN</>}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
