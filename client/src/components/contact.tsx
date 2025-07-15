import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    helpType: "",
    timeline: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.helpType || !formData.timeline || !formData.message) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/leads", {
        ...formData,
        source: "contact_form",
        status: "new"
      });

      toast({
        title: "¡Mensaje enviado!",
        description: "Te contactaremos pronto para ayudarte con tu proyecto",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        helpType: "",
        timeline: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Inténtalo nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInstantConsult = () => {
    // This would integrate with WhatsApp or phone system
    window.open("https://wa.me/56912345678?text=Hola%2C%20necesito%20una%20consulta%20inmediata%20sobre%20mi%20proyecto", '_blank');
  };

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Cotizar Ahora</h2>
          <p className="text-xl text-gray-600">Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad</p>
        </div>
        
        <Card className="bg-neutral rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Formulario de Contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input 
                    id="name"
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email"
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Teléfono *</Label>
                <Input 
                  id="phone"
                  type="tel" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              
              <div>
                <Label>¿Cómo podemos ayudarte? *</Label>
                <RadioGroup 
                  value={formData.helpType} 
                  onValueChange={(value) => setFormData({...formData, helpType: value})}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="trabajo" id="trabajo" />
                    <Label htmlFor="trabajo" className="text-sm">
                      Sólo busco trabajo y/o no tengo interés en contratar servicios de Arquitectura o Construcción
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="contratar" id="contratar" />
                    <Label htmlFor="contratar" className="text-sm">
                      Deseo contratar un Arquitecto o Empresa constructora para diseñar y/o construir
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label>¿Cuándo quieres comenzar con tu proyecto? *</Label>
                <RadioGroup 
                  value={formData.timeline} 
                  onValueChange={(value) => setFormData({...formData, timeline: value})}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="despues" id="despues" />
                    <Label htmlFor="despues" className="text-sm">
                      No deseo iniciar ahora. Será luego de 6 meses
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pronto" id="pronto" />
                    <Label htmlFor="pronto" className="text-sm">
                      Deseo iniciar pronto (1 a 3 Meses)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inmediato" id="inmediato" />
                    <Label htmlFor="inmediato" className="text-sm">
                      Deseo iniciar de inmediato. Este mes.
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="message">¿Qué quieres realizar? Cuéntanos como podemos ayudarte *</Label>
                <Textarea 
                  id="message"
                  rows={4} 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 bg-primary text-white hover:bg-secondary"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Consulta"}
                </Button>
                <Button 
                  type="button" 
                  onClick={handleInstantConsult}
                  className="flex-1 bg-accent text-white hover:bg-yellow-500"
                >
                  Consultar de Inmediato
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
