import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, FileText, CheckSquare, Video, Download, ArrowRight, Star, Target } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AdvancedLeadMagnets() {
  const [selectedMagnet, setSelectedMagnet] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    comuna: ""
  });
  const { toast } = useToast();

  const leadMagnets = [
    {
      id: "calculadora-avanzada",
      title: "Calculadora de Costos Arquitectónicos 2025",
      description: "Herramienta AI que calcula costos exactos de tu proyecto en 60 segundos",
      icon: Calculator,
      value: "$97,000",
      timeToConsume: "5 minutos",
      results: "Presupuesto detallado + Lista de materiales + Cronograma",
      color: "from-blue-600 to-blue-800",
      hook: "Descubre el costo REAL de tu proyecto antes de hablar con cualquier constructor"
    },
    {
      id: "checklist-permisos",
      title: "Checklist Completo: Permisos Municipales 2025",
      description: "Lista definitiva para aprobar tu permiso en el primer intento",
      icon: CheckSquare,
      value: "$45,000",
      timeToConsume: "10 minutos",
      results: "37 puntos de revisión + Documentos necesarios + Errores comunes",
      color: "from-green-600 to-green-800",
      hook: "Evita rechazos costosos con la lista que usan los arquitectos profesionales"
    },
    {
      id: "masterclass-planificacion",
      title: "MasterClass: Planifica tu Casa Perfecta",
      description: "Video de 60 minutos con los secretos de 26+ años de experiencia",
      icon: Video,
      value: "$197,000",
      timeToConsume: "60 minutos",
      results: "Metodología completa + Plantillas + Casos reales de Santiago",
      color: "from-purple-600 to-purple-800",
      hook: "Los 7 errores que cometen el 89% de personas antes de construir su casa"
    },
    {
      id: "plantillas-diseno",
      title: "Pack Plantillas de Diseño Arquitectónico",
      description: "15 plantillas profesionales editables para tu proyecto",
      icon: FileText,
      value: "$127,000",
      timeToConsume: "Inmediato",
      results: "Planos base + Especificaciones técnicas + Guías de uso",
      color: "from-orange-600 to-orange-800",
      hook: "Las mismas plantillas que uso para proyectos de $200M+"
    }
  ];

  const handleMagnetSelect = (magnetId: string) => {
    setSelectedMagnet(magnetId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMagnet) {
      toast({
        title: "Selecciona un recurso",
        description: "Por favor elige el recurso que más te interesa",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: `Lead Magnet: ${selectedMagnet}`,
          leadMagnet: selectedMagnet,
          status: 'qualified' // Alex Hormozi: Pre-qualified leads
        }),
      });

      if (response.ok) {
        const selectedMagnetData = leadMagnets.find(m => m.id === selectedMagnet);
        toast({
          title: "¡Perfecto! Revisa tu email",
          description: `Te enviamos ${selectedMagnetData?.title} inmediatamente`,
        });
        
        // Reset form
        setFormData({ name: "", email: "", phone: "", projectType: "", comuna: "" });
        setSelectedMagnet(null);
      } else {
        throw new Error('Error al procesar la solicitud');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema. Intenta nuevamente o contáctanos",
        variant: "destructive"
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con Hook principal */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold mb-6">
            <Star className="w-4 h-4 mr-2" />
            Recursos GRATIS que normalmente cuestan $470,000
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-dark mb-6">
            Acelera Tu Proyecto de Construcción
          </h2>
          <p className="text-xl text-gray-600 mb-4 max-w-4xl mx-auto">
            <strong>Descarga GRATIS los mismos recursos</strong> que uso con clientes que invierten $200M+ en sus proyectos
          </p>
          <p className="text-lg text-primary font-semibold">
            ⏰ Solo por tiempo limitado - Valor real: $470,000
          </p>
        </div>

        {/* Grid de Lead Magnets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {leadMagnets.map((magnet) => {
            const IconComponent = magnet.icon;
            const isSelected = selectedMagnet === magnet.id;
            
            return (
              <Card 
                key={magnet.id}
                className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-4 ring-primary shadow-2xl transform scale-105' 
                    : 'hover:shadow-xl'
                }`}
                onClick={() => handleMagnetSelect(magnet.id)}
              >
                {isSelected && (
                  <div className="absolute -top-3 -right-3 bg-primary text-white rounded-full p-2">
                    <Target className="w-4 h-4" />
                  </div>
                )}
                
                <CardHeader className={`bg-gradient-to-r ${magnet.color} text-white rounded-t-lg`}>
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="w-8 h-8" />
                    <div className="text-right">
                      <div className="text-sm opacity-75 line-through">Valor: {magnet.value}</div>
                      <div className="text-lg font-bold text-accent">GRATIS</div>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold leading-tight">
                    {magnet.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 text-sm">
                    {magnet.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <ArrowRight className="w-4 h-4 text-primary mr-2" />
                      <span><strong>Tiempo:</strong> {magnet.timeToConsume}</span>
                    </div>
                    <div className="flex items-start">
                      <ArrowRight className="w-4 h-4 text-primary mr-2 mt-0.5" />
                      <span><strong>Recibes:</strong> {magnet.results}</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                    <p className="text-sm font-semibold text-center text-primary">
                      "{magnet.hook}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Formulario de Captura */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-2 border-primary/20">
            <CardHeader className="bg-primary text-white text-center">
              <CardTitle className="text-2xl">
                {selectedMagnet 
                  ? `Descargar: ${leadMagnets.find(m => m.id === selectedMagnet)?.title}`
                  : "Selecciona el recurso que más te interesa ↑"
                }
              </CardTitle>
              {selectedMagnet && (
                <p className="text-accent text-lg font-semibold">
                  📧 Te lo enviamos a tu email en menos de 2 minutos
                </p>
              )}
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre Completo *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      placeholder="Ej: Juan Carlos Pérez"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Teléfono (opcional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="comuna">Comuna del Proyecto</Label>
                    <Input
                      id="comuna"
                      type="text"
                      value={formData.comuna}
                      onChange={(e) => setFormData({...formData, comuna: e.target.value})}
                      placeholder="Ej: Las Condes, Providencia..."
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="projectType">Tipo de Proyecto</Label>
                  <Select value={formData.projectType} onValueChange={(value) => setFormData({...formData, projectType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de proyecto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casa-nueva">Casa Nueva</SelectItem>
                      <SelectItem value="ampliacion">Ampliación</SelectItem>
                      <SelectItem value="remodelacion">Remodelación</SelectItem>
                      <SelectItem value="regularizacion">Regularización de Inmueble</SelectItem>
                      <SelectItem value="permisos">Solo Permisos</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-secondary text-white py-4 text-lg font-bold"
                  disabled={!selectedMagnet}
                >
                  <Download className="w-5 h-5 mr-2" />
                  {selectedMagnet ? "Descargar Recurso GRATIS" : "Primero selecciona un recurso ↑"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Al descargar, aceptas recibir emails valiosos sobre arquitectura y construcción. 
                  Puedes cancelar en cualquier momento.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Garantía y Valor */}
        <div className="mt-16 text-center">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              🛡️ Garantía de Valor o Dinero Devuelto
            </h3>
            <p className="text-green-700 text-lg mb-4">
              Si estos recursos no valen al menos <strong>10 veces</strong> lo que dices que valen, 
              te devuelvo personalmente $100.000 en efectivo.
            </p>
            <p className="text-sm text-green-600">
              - Patricio Becar, Arquitecto Universidad de Chile | 26+ años de experiencia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}