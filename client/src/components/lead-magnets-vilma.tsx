import { Download, Gift, Clock, Users, Star, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function LeadMagnetsVilma() {
  const [email, setEmail] = useState("");
  const [selectedMagnet, setSelectedMagnet] = useState<string | null>(null);

  // Lead magnets estratégicos basados en metodología Vilma Núñez
  const leadMagnets = [
    {
      id: "calculadora_presupuesto",
      title: "Calculadora Inteligente de Presupuesto",
      description: "Descubre el costo real de tu proyecto arquitectónico en 2 minutos",
      icon: <Gift className="w-8 h-8 text-blue-600" />,
      value: "Valor: $150.000",
      benefit: "Evita sorpresas de costos",
      urgency: "Descarga inmediata",
      cta: "DESCARGAR CALCULADORA GRATIS"
    },
    {
      id: "checklist_permisos",
      title: "Checklist Completo de Permisos",
      description: "Los 27 trámites legales que SÍ o SÍ necesitas para construir sin problemas",
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      value: "Valor: $200.000",
      benefit: "Cero problemas legales",
      urgency: "Solo esta semana",
      cta: "OBTENER CHECKLIST AHORA"
    },
    {
      id: "plantillas_3d",
      title: "25 Plantillas de Diseño 3D",
      description: "Inspiraciones reales de casas construidas por nuestros clientes",
      icon: <Star className="w-8 h-8 text-purple-600" />,
      value: "Valor: $300.000",
      benefit: "Visualiza tu casa ideal",
      urgency: "Últimas 48 horas",
      cta: "VER PLANTILLAS GRATIS"
    }
  ];

  const handleDownload = (magnetId: string) => {
    if (!email) {
      alert("Por favor ingresa tu email para descargar el recurso");
      return;
    }
    
    // Aquí iría la lógica de captura de lead
    console.log(`Lead captured: ${email} for magnet: ${magnetId}`);
    setSelectedMagnet(magnetId);
    
    // Simular descarga
    setTimeout(() => {
      alert("¡Recurso enviado a tu email! Revisa tu bandeja de entrada.");
      setSelectedMagnet(null);
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con autoridad (Vilma Núñez style) */}
        <div className="text-center mb-16">
          <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm mb-4">
            🎁 RECURSOS GRATUITOS DE ALTO VALOR
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Descarga las Herramientas que Usan los Arquitectos Profesionales
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Más de 2,000 familias han usado estos recursos para planificar su casa perfecta. 
            Ahora puedes acceder a ellos completamente gratis.
          </p>

          {/* Social proof específico */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2,147</div>
              <p className="text-sm text-gray-600">Descargas este mes</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">4.8★</div>
              <p className="text-sm text-gray-600">Valoración promedio</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <p className="text-sm text-gray-600">Lo recomiendan</p>
            </div>
          </div>
        </div>

        {/* Lead Magnets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {leadMagnets.map((magnet) => (
            <Card key={magnet.id} className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-t-4 border-t-primary">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {magnet.icon}
                </div>
                <CardTitle className="text-xl font-bold mb-2">
                  {magnet.title}
                </CardTitle>
                <p className="text-gray-600 text-sm mb-4">
                  {magnet.description}
                </p>
                
                {/* Value proposition */}
                <div className="space-y-2">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {magnet.value}
                  </div>
                  <div className="text-primary font-semibold text-sm">
                    ✓ {magnet.benefit}
                  </div>
                  <div className="text-red-600 font-semibold text-xs">
                    ⏰ {magnet.urgency}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`email-${magnet.id}`} className="text-sm font-medium">
                      Tu email para recibir el recurso:
                    </Label>
                    <Input
                      id={`email-${magnet.id}`}
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <Button
                    onClick={() => handleDownload(magnet.id)}
                    disabled={selectedMagnet === magnet.id}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 text-sm"
                  >
                    {selectedMagnet === magnet.id ? (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Enviando...
                      </div>
                    ) : (
                      magnet.cta
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    ✓ Sin spam ✓ Datos protegidos ✓ Descarga instantánea
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA final con urgencia (Vilma Núñez methodology) */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">
            ¿Todavía No Estás Seguro?
          </h3>
          
          <p className="text-xl mb-6 opacity-90">
            Estos recursos han ayudado a 2,000+ familias a construir su casa sin errores costosos. 
            Tu casa perfecta está a solo un email de distancia.
          </p>
          
          {/* Testimonial inline */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <p className="italic mb-4">
              "Gracias a la calculadora de presupuesto evité un sobrecosto de $800.000. 
              Los recursos son súper prácticos y fáciles de usar."
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm opacity-90">- María José, Las Condes</span>
            </div>
          </div>
          
          <Button 
            onClick={() => {
              const element = document.getElementById('contacto');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-yellow-400 text-black px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-300 transition-colors shadow-xl"
          >
            O MEJOR AÚN: AGENDA TU CONSULTA GRATUITA AHORA
          </Button>
          
          <p className="text-sm opacity-75 mt-4">
            En la consulta recibes TODOS estos recursos + análisis personalizado de tu proyecto
          </p>
        </div>
      </div>
    </section>
  );
}