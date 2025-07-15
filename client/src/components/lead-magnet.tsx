import { useState } from "react";
import { Download, Shield, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
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
        name,
        email,
        phone: "",
        helpType: "ebook_download",
        timeline: "informacion",
        message: "Descarga del ebook: Cómo Ampliar o Remodelar Tu Vivienda en Santiago",
        source: "lead_magnet",
        status: "new"
      });

      toast({
        title: "¡Gracias!",
        description: "Te enviaremos el ebook a tu correo electrónico",
      });

      // Reset form
      setEmail("");
      setName("");
      
      // Simulate ebook download - in real implementation, this would trigger actual download
      window.open("https://www.arquitectochile.cl/ebook", "_blank");
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al procesar tu solicitud. Inténtalo nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Ebook presentation */}
          <div className="text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="text-center mb-6">
                <div className="bg-white/20 w-32 h-40 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="text-4xl">📖</div>
                </div>
                <h2 className="text-3xl font-bold mb-2">NUEVO EBOOK GRATUITO</h2>
                <h3 className="text-xl font-semibold mb-4">
                  Descubre cómo <span className="text-accent">Ampliar</span> o <span className="text-accent">Remodelar</span> Tu Vivienda en Santiago de Chile
                </h3>
              </div>
              
              <p className="text-lg mb-6 opacity-90">
                Revela el código secreto para transformar tu hogar, obtener todos los permisos y ahorrar miles en el proceso. 
                Descubre cómo la <strong>Metodología MDAC</strong> está ayudando a familias como la tuya a navegar el laberinto de la ampliación... 
                incluso si crees que tu casa ya no puede crecer más.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <p className="text-sm">Todos los Permisos</p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <p className="text-sm">Metodología MDAC</p>
                </div>
                <div className="text-center">
                  <Award className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <p className="text-sm">Ahorra Miles</p>
                </div>
              </div>
            </div>
            
            {/* Testimonials */}
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm italic mb-2">
                  "Pensé que remodelar mi casa en Ñuñoa sería una pesadilla, pero este libro lo hizo sorprendentemente fácil. 
                  Los consejos sobre permisos municipales fueron oro puro. ¡Altamente recomendado!"
                </p>
                <p className="text-sm font-semibold">- Roberto Fuentes, 45 años, Ñuñoa</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm italic mb-2">
                  "Gracias a este ebook, pude ampliar mi casa sin dolores de cabeza. La Metodología MDAC me ahorró tiempo, 
                  dinero y muchísimo estrés. ¡Ahora disfruto de mi nuevo espacio sin remordimientos!"
                </p>
                <p className="text-sm font-semibold">- María José Gómez, 38 años, Providencia</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Download form */}
          <div>
            <Card className="bg-white rounded-2xl shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-dark mb-2">
                  <Download className="w-8 h-8 mx-auto mb-2 text-primary" />
                  Descarga Aquí tu Guía GRATIS
                </CardTitle>
                <p className="text-gray-600">y desbloquea el potencial oculto de tu hogar...</p>
                <p className="text-sm text-gray-500 mt-2">🔒 Y no hacemos Spam</p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleDownload} className="space-y-4">
                  <div>
                    <Label htmlFor="lead-name">Nombre Completo</Label>
                    <Input 
                      id="lead-name"
                      type="text" 
                      placeholder="Ingresa tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lead-email">Email</Label>
                    <Input 
                      id="lead-email"
                      type="email" 
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-accent text-white hover:bg-yellow-500 py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? "Procesando..." : "DESCARGAR EBOOK GRATIS"}
                  </Button>
                </form>
                
                <div className="mt-6 text-center">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-dark mb-2">Acerca del Autor</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Arquitecto Universidad de Chile desde 1999</p>
                      <p>• Experto en Ampliaciones y Remodelaciones</p>
                      <p>• Creador de la Metodología MDAC</p>
                      <p>• Arquitecto Revisor independiente MINVU</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}