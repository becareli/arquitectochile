import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Users, Play, Star, CheckCircle, ArrowRight, Gift } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface WebinarSession {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: 'live' | 'automated';
  spotsLeft: number;
  totalSpots: number;
  presenter: string;
  value: string;
  topics: string[];
}

export default function AutomatedWebinarSystem() {
  const [selectedWebinar, setSelectedWebinar] = useState<string | null>(null);
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [timeLeft, setTimeLeft] = useState("");
  const { toast } = useToast();

  const webinars: WebinarSession[] = [
    {
      id: "masterclass-permisos",
      title: "MasterClass: Cómo Aprobar tu Permiso Municipal en 30 Días",
      date: "2025-02-15",
      time: "20:00",
      duration: "90 minutos",
      type: "live",
      spotsLeft: 12,
      totalSpots: 50,
      presenter: "Arq. Patricio Becar",
      value: "$297.000",
      topics: [
        "Los 7 errores más comunes que rechazan permisos",
        "Checklist completo DOM por DOM en Santiago",
        "Estrategias para acelerar el proceso de aprobación",
        "Casos reales: de rechazo a aprobación en 15 días",
        "Q&A exclusivo con casos de participantes"
      ]
    },
    {
      id: "regularizacion-express",
      title: "Webinar: Regularización Express - Ley del Mono Sin Complicaciones",
      date: "2025-02-08",
      time: "19:30",
      duration: "60 minutos",
      type: "automated",
      spotsLeft: 25,
      totalSpots: 100,
      presenter: "Arq. Patricio Becar",
      value: "$197.000",
      topics: [
        "Proceso completo de regularización paso a paso",
        "Documentos necesarios y cómo obtenerlos",
        "Costos reales vs beneficios económicos",
        "Timeline realista: cuánto demora realmente",
        "Bonus: Plantillas y formatos descargables"
      ]
    },
    {
      id: "construccion-inteligente",
      title: "Webinar Automatizado: Construcción Inteligente con Presupuesto Real",
      date: "Disponible 24/7",
      time: "A demanda",
      duration: "75 minutos",
      type: "automated",
      spotsLeft: 99,
      totalSpots: 999,
      presenter: "Arq. Patricio Becar",
      value: "$247.000",
      topics: [
        "Fórmula exacta para calcular costos reales de construcción",
        "3 secretos para ahorrar 30% sin sacrificar calidad",
        "Materiales inteligentes disponibles en Chile",
        "Cronograma optimizado para minimizar sobrecostos",
        "Acceso a calculadora exclusiva de costos"
      ]
    }
  ];

  const upcomingWebinars = webinars.filter(w => w.type === 'live');
  const automatedWebinars = webinars.filter(w => w.type === 'automated');

  useEffect(() => {
    const updateCountdown = () => {
      const nextWebinar = upcomingWebinars[0];
      if (nextWebinar) {
        const webinarDate = new Date(`${nextWebinar.date}T${nextWebinar.time}:00-03:00`);
        const now = new Date();
        const timeDiff = webinarDate.getTime() - now.getTime();
        
        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeLeft("¡En vivo ahora!");
        }
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [upcomingWebinars]);

  const handleWebinarSelect = (webinarId: string) => {
    setSelectedWebinar(webinarId);
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedWebinar) {
      toast({
        title: "Selecciona un webinar",
        description: "Por favor elige el webinar al que quieres asistir",
        variant: "destructive"
      });
      return;
    }

    try {
      const webinar = webinars.find(w => w.id === selectedWebinar);
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...registrationData,
          source: `Webinar: ${webinar?.title}`,
          webinarId: selectedWebinar,
          status: 'webinar-registered'
        }),
      });

      if (response.ok) {
        toast({
          title: "¡Registro exitoso!",
          description: `Te enviamos el link de acceso al webinar "${webinar?.title}". Revisa tu email.`,
        });
        
        setRegistrationData({ name: "", email: "", phone: "" });
        setSelectedWebinar(null);
      } else {
        throw new Error('Error al registrar');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema con el registro. Intenta nuevamente o contáctanos",
        variant: "destructive"
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-accent text-black px-6 py-3 text-lg font-bold mb-6">
            🎯 WebinarKit Integration - ROI 280x vs Funnel Tradicional
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Webinarios que Educan y Convierten
          </h2>
          <p className="text-xl text-gray-300 mb-4 max-w-4xl mx-auto">
            Únete a <strong>miles de propietarios</strong> que han transformado sus proyectos 
            con nuestros webinarios exclusivos
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
            <p className="text-2xl font-bold text-accent">87% Asistencia • 43% Conversión</p>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent">3,247</div>
            <div className="text-gray-300">Participantes este año</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent">4.9★</div>
            <div className="text-gray-300">Valoración promedio</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent">89%</div>
            <div className="text-gray-300">Implementa lo aprendido</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent">24/7</div>
            <div className="text-gray-300">Acceso automatizado</div>
          </div>
        </div>

        {/* Upcoming Live Webinars */}
        {upcomingWebinars.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center">
              🔴 Próximos Webinarios EN VIVO
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {upcomingWebinars.map((webinar) => (
                <Card 
                  key={webinar.id}
                  className={`bg-white text-black cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedWebinar === webinar.id ? 'ring-4 ring-accent shadow-2xl' : 'hover:shadow-xl'
                  }`}
                  onClick={() => handleWebinarSelect(webinar.id)}
                >
                  <CardHeader className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-t-lg">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-white text-red-600 font-bold">EN VIVO</Badge>
                      <div className="text-right">
                        <div className="text-sm opacity-75 line-through">Valor: {webinar.value}</div>
                        <div className="text-lg font-bold text-accent">GRATIS</div>
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">{webinar.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm opacity-90">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(webinar.date).toLocaleDateString('es-ES')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {webinar.time} hrs
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold">Cupos disponibles:</span>
                        <Badge variant="outline" className="text-red-600 border-red-600">
                          Solo {webinar.spotsLeft} de {webinar.totalSpots}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${((webinar.totalSpots - webinar.spotsLeft) / webinar.totalSpots) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Lo que aprenderás:</h4>
                      <ul className="space-y-1 text-sm">
                        {webinar.topics.slice(0, 3).map((topic, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {timeLeft && (
                      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 text-center">
                        <div className="text-sm text-red-600 font-semibold">Comienza en:</div>
                        <div className="text-2xl font-bold text-red-800">{timeLeft}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Automated Webinars */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">
            ⚡ Webinarios Automatizados - Disponibles 24/7
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {automatedWebinars.map((webinar) => (
              <Card 
                key={webinar.id}
                className={`bg-white text-black cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedWebinar === webinar.id ? 'ring-4 ring-accent shadow-2xl' : 'hover:shadow-xl'
                }`}
                onClick={() => handleWebinarSelect(webinar.id)}
              >
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-white text-blue-600 font-bold">24/7</Badge>
                    <div className="text-right">
                      <div className="text-sm opacity-75 line-through">Valor: {webinar.value}</div>
                      <div className="text-lg font-bold text-accent">GRATIS</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold leading-tight">{webinar.title}</CardTitle>
                  <div className="text-sm opacity-90">
                    <div className="flex items-center">
                      <Play className="w-4 h-4 mr-1" />
                      Acceso inmediato • {webinar.duration}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Contenido incluye:</h4>
                    <ul className="space-y-1 text-sm">
                      {webinar.topics.slice(0, 4).map((topic, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 text-center">
                    <div className="text-sm text-blue-600 font-semibold">⚡ Acceso Inmediato</div>
                    <div className="text-lg font-bold text-blue-800">Disponible ahora</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white text-black shadow-2xl border-4 border-accent">
            <CardHeader className="bg-gradient-to-r from-accent to-yellow-600 text-black text-center">
              <CardTitle className="text-2xl font-bold">
                {selectedWebinar 
                  ? `Registro: ${webinars.find(w => w.id === selectedWebinar)?.title}`
                  : "Selecciona un webinar arriba ↑"
                }
              </CardTitle>
              {selectedWebinar && (
                <div className="flex items-center justify-center space-x-4 text-black/80">
                  <div className="flex items-center">
                    <Gift className="w-5 h-5 mr-2" />
                    Acceso 100% Gratuito
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Certificado de Participación
                  </div>
                </div>
              )}
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleRegistration} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={registrationData.name}
                    onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                    required
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={registrationData.email}
                    onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                    required
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono (opcional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={registrationData.phone}
                    onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                    placeholder="+56 9 1234 5678"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-secondary text-white py-4 text-lg font-bold"
                  disabled={!selectedWebinar}
                >
                  {selectedWebinar ? (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Reservar Mi Cupo GRATIS
                    </>
                  ) : (
                    "Primero selecciona un webinar ↑"
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Al registrarte, recibirás el link de acceso y recordatorios por email. 
                  Cancela cuando quieras.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Authority Building */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              🏆 Webinarios Respaldados por 26+ Años de Experiencia
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Patricio Becar, Arquitecto Universidad de Chile, comparte los secretos que ha usado 
              en proyectos valorados en más de $200M en Santiago
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Star className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-xl font-bold">ROL MINVU</div>
                <div className="text-sm text-gray-300">00237-13 Vigente</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-xl font-bold">3,000+</div>
                <div className="text-sm text-gray-300">Proyectos Exitosos</div>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-xl font-bold">100%</div>
                <div className="text-sm text-gray-300">Metodología Probada</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}