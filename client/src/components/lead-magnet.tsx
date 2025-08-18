import { useState } from "react";
import { Download, Shield, Users, Award, ArrowDown, ArrowRight, Gift, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ebookCover from "@assets/PortadaEbook_1752612398787.png";

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
    <section className="py-20 bg-gradient-to-b from-primary via-blue-600 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Ebook presentation */}
          <div className="text-white">
            <div className="bg-gradient-to-b from-blue-600/30 via-blue-700/20 to-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
              <div className="text-center mb-8">
                {/* Imagen del Ebook original más grande */}
                <div className="w-full max-w-md mx-auto mb-8 flex items-center justify-center transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <img 
                    src={ebookCover} 
                    alt="Ebook: ¿Cómo Ampliar o Remodelar Mi Casa? en Santiago de Chile"
                    className="w-full h-auto object-contain"
                    style={{ 
                      filter: 'drop-shadow(16px 16px 40px rgba(0,0,0,0.6))',
                      maxHeight: '500px',
                      minHeight: '400px',
                      width: 'auto'
                    }}
                  />
                </div>
                
                <h2 className="text-4xl font-bold mb-3 text-white">NUEVO EBOOK GRATUITO</h2>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  <span className="text-yellow-300">¿Cómo Ampliar o Remodelar Mi Casa?</span> en Santiago de Chile
                </h3>
                <p className="text-xl text-yellow-300 font-bold">
                  ...y no morir en el intento!!
                </p>
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
            
            {/* Call to Action Visual Elements */}
            <div className="text-center mb-8">
              {/* Flechas animadas apuntando al formulario */}
              <div className="flex justify-center items-center gap-4 mb-6">
                <ArrowRight className="w-8 h-8 text-yellow-300 animate-bounce" />
                <ArrowRight className="w-10 h-10 text-yellow-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <ArrowRight className="w-12 h-12 text-yellow-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
              
              {/* Call to Action Text */}
              <div className="bg-yellow-400 text-black px-6 py-4 rounded-xl font-bold text-xl mb-4 transform rotate-1 hover:rotate-0 transition-transform">
                🎁 ¡DESCARGA GRATIS AQUÍ! 🎁
              </div>
              
              <p className="text-yellow-300 font-semibold text-lg animate-pulse">
                ⚡ ¡Solo toma 30 segundos! ⚡
              </p>
            </div>
          </div>
          
          {/* Right side - Download form */}
          <div className="relative">
            {/* Título principal fuera de la caja, sobre el fondo azul */}
            <div className="text-center mb-8 relative">
              {/* Flecha 3D única apuntando hacia abajo al título */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-2xl">
                  {/* Cuerpo de la flecha 3D */}
                  <defs>
                    <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:"#EF4444", stopOpacity:1}} />
                      <stop offset="50%" style={{stopColor:"#DC2626", stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:"#B91C1C", stopOpacity:1}} />
                    </linearGradient>
                    <linearGradient id="arrowShadow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:"#991B1B", stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:"#7F1D1D", stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                  
                  {/* Sombra de la flecha */}
                  <path
                    d="M15 5 L45 5 L45 25 L55 25 L30 60 L5 25 L15 25 Z"
                    fill="url(#arrowShadow)"
                    transform="translate(1, 1)"
                    opacity="0.3"
                  />
                  
                  {/* Cuerpo principal de la flecha */}
                  <path
                    d="M15 5 L45 5 L45 25 L55 25 L30 60 L5 25 L15 25 Z"
                    fill="url(#arrowGradient)"
                  />
                  
                  {/* Highlights para efecto 3D */}
                  <path
                    d="M17 7 L43 7 L43 23 L50 23 L30 52 L10 23 L17 23 Z"
                    fill="rgba(255,255,255,0.3)"
                  />
                  
                  {/* Línea de brillo */}
                  <path
                    d="M19 9 L41 9 L41 21 L47 21 L30 48 L13 21 L19 21 Z"
                    fill="rgba(255,255,255,0.2)"
                  />
                </svg>
              </div>
              
              <h2 className="text-5xl font-black text-white drop-shadow-2xl relative z-10 pt-8">
                DESCARGA AQUÍ TU GUÍA GRATIS
              </h2>
            </div>
            
            {/* Beneficios destacados - Iconos grandes */}
            <div className="flex justify-center gap-8 mb-6">
              <div className="flex flex-col items-center text-white">
                <Gift className="w-12 h-12 mb-2 text-yellow-300" />
                <p className="text-sm font-semibold">Sin costo</p>
              </div>
              <div className="flex flex-col items-center text-white">
                <CheckCircle className="w-12 h-12 mb-2 text-yellow-300" />
                <p className="text-sm font-semibold">Envío instantáneo</p>
              </div>
              <div className="flex flex-col items-center text-white">
                <Shield className="w-12 h-12 mb-2 text-yellow-300" />
                <p className="text-sm font-semibold">100% seguro</p>
              </div>
            </div>
            
            <Card className="bg-white rounded-2xl shadow-2xl border-4 border-yellow-400">
              <CardHeader className="text-center bg-gradient-to-r from-yellow-400 to-orange-400 rounded-t-2xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-white mb-2">
                  Completa tus datos:
                </CardTitle>
                <p className="text-white font-semibold text-sm">
                  Recíbela instantáneamente en tu email
                </p>
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
                
                {/* Información sobre tratamiento de datos */}
                <div className="mt-6 text-center">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-dark mb-2">Acerca del Autor</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Arquitecto Universidad de Chile desde 1999</p>
                      <p>• Experto en Ampliaciones y Remodelaciones</p>
                      <p>• Creador de la Metodología MDAC</p>
                      <p>• Arquitecto Revisor independiente MINVU</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    <p className="font-semibold">🔒 Protección de Datos - Sin Spam</p>
                    <p>Información 100% segura. Solo enviaremos contenido valioso. Nunca compartimos tus datos.</p>
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