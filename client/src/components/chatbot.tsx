import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy el asistente virtual de ArquitectoChile. ¿En qué puedo ayudarte? Ofrezco información sobre: Reacondicionamiento Térmico, Subdivisión de Terrenos, Tasación de Viviendas, Inspección de Viviendas, Fusión de Terrenos, Diseño de Espacios, Revisor Independiente, Regularización, Sistema EIFS, Permisos, Portal Cliente y más.',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Respuestas básicas hasta conectar con N8N
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Servicios específicos
    if (message.includes('inspección') || message.includes('inspeccion') || message.includes('comprar') || message.includes('casa') || message.includes('vivienda') || message.includes('defecto')) {
      return 'La Inspección Técnica de Viviendas es la única forma científica de comprar seguro. Por solo $180.000 evitas reparaciones millonarias ocultas. Revisamos estructura, instalaciones, terminaciones y eficiencia térmica. ¿Estás por comprar una propiedad?';
    }
    
    if (message.includes('fusión') || message.includes('fusion') || message.includes('terreno')) {
      return 'La fusión de terrenos permite aumentar hasta 30% la capacidad de construcción según el Art. 63 de la Ley General de Urbanismo. El proceso completo toma 45-60 días y cuesta desde $890.000. ¿Te gustaría una evaluación gratuita?';
    }
    
    if (message.includes('revisor') || message.includes('independiente') || message.includes('rechaz')) {
      return 'El Revisor Independiente de Arquitectura evita rechazos costosos en permisos municipales. Tenemos certificación MINVU N° 369500 vigente. El servicio cuesta desde $290.000 y toma 15-20 días. ¿Necesitas revisar algún proyecto?';
    }
    
    if (message.includes('diseño') || message.includes('espacio') || message.includes('casa') || message.includes('hogar')) {
      return 'Nuestro servicio "Diseñemos tus Nuevos Espacios" incluye diseño 100% personalizado, planos completos, visualización 3D y asesoría en materiales. Desde $2.490.000, solo 3 proyectos por mes. ¿Te interesa transformar tu hogar?';
    }
    
    if (message.includes('regulariz') || message.includes('ley del mono') || message.includes('ampliaci')) {
      return 'La regularización de inmuebles (Ley del Mono) permite legalizar ampliaciones y construcciones sin permisos. Cubrimos todo el proceso legal y técnico. ¿Tienes alguna construcción que necesite regularizar?';
    }
    
    if (message.includes('reacondicionamiento') || message.includes('térmico') || message.includes('termico') || message.includes('aislación') || message.includes('aislacion') || message.includes('calefacción') || message.includes('calefaccion') || message.includes('frío') || message.includes('frio') || message.includes('calor') || message.includes('energía') || message.includes('energia') || message.includes('diagnóstico térmico')) {
      return 'NUEVO SERVICIO: Reacondicionamiento Térmico de Viviendas - ¿Su casa es un horno en verano y un congelador en invierno? Ofrecemos diagnóstico térmico completo por $100,000 que puede ahorrarle hasta 70% en gastos de calefacción. Incluye visita de arquitecto, análisis técnico completo, informe detallado y recomendaciones para cumplir normativa OGUC. ¿Le interesa dejar de quemar dinero en calefacción?';
    }
    
    if (message.includes('eifs') || message.includes('aislaci') && !message.includes('reacondicionamiento')) {
      return 'El Sistema EIFS proporciona aislación térmica de alta eficiencia para reducir costos energéticos hasta 40%. Ideal para mejorar el confort y valor de tu propiedad. ¿Te interesa una evaluación energética?';
    }
    
    if (message.includes('tasación') || message.includes('tasacion') || message.includes('avalúo') || message.includes('valor') || message.includes('precio propiedad') || message.includes('cuanto vale') || message.includes('vender') || message.includes('comprar propiedad')) {
      return 'NUEVO SERVICIO: Tasación de Viviendas Urbanas por arquitecto con Diplomado de la Universidad de Chile. Recibe un "Dossier de Inteligencia Inmobiliaria" completo con análisis de mercado, evaluación constructiva y valor comercial fundamentado. Válido para bancos y tribunales. No deje que la incertidumbre le cueste millones. ¿Va a vender o comprar una propiedad?';
    }
    
    if (message.includes('subdivisión') || message.includes('subdivision') || message.includes('dividir terreno') || message.includes('lotes') || message.includes('terreno grande') || message.includes('herencia') || message.includes('múltiples propiedades')) {
      return 'NUEVO SERVICIO: Subdivisión de Terrenos Urbanos - Convierta 1 terreno en 2+ propiedades independientes y multiplique su patrimonio. Manejamos tanto subdivisiones normales como afectas a utilidad pública. Soluciones especiales para herencias familiares. 26+ años de experiencia. ¿Tiene un terreno que quiere subdividir?';
    }
    
    if (message.includes('cabida') || message.includes('edificabilidad') || message.includes('construir')) {
      return 'El estudio de cabidas determina la capacidad máxima de edificación de tu terreno según normativas municipales. Te ayudamos a maximizar el potencial constructivo. ¿Quieres saber cuánto puedes construir?';
    }
    
    if (message.includes('permiso') || message.includes('edificación') || message.includes('municipal')) {
      return 'Gestionamos permisos de edificación completos ante la municipalidad, desde la documentación hasta la aprobación final. Evitamos rechazos y agilizamos el proceso. ¿Tienes un proyecto por presentar?';
    }
    
    if (message.includes('recepción') || message.includes('final') || message.includes('legalizar')) {
      return 'La recepción final legaliza tu proyecto ante la municipalidad para obtener el certificado de recepción definitiva. Necesario para habitar y vender legalmente. ¿Tu obra está lista para recepción?';
    }
    
    if (message.includes('domicilio') || message.includes('visita') || message.includes('terreno')) {
      return 'Ofrecemos servicios de arquitecto a domicilio con visitas técnicas especializadas. Evaluamos tu proyecto directamente en terreno y proporcionamos asesoría personalizada. ¿Necesitas una visita técnica?';
    }
    
    // Portal y colaboradores
    if (message.includes('portal') || message.includes('cliente') || message.includes('seguimiento')) {
      return 'El Portal del Cliente te permite hacer seguimiento de tu proyecto, ver documentos, cronograma y pagos en tiempo real. Acceso exclusivo para clientes activos. ¿Ya tienes un proyecto con nosotros?';
    }
    
    if (message.includes('colaborador') || message.includes('trabajar') || message.includes('unirse')) {
      return 'Buscamos colaboradores profesionales para nuestra red de servicios. Ofrecemos oportunidades para arquitectos, ingenieros y constructores. ¿Te interesa formar parte de nuestro equipo?';
    }
    
    // Precios generales
    if (message.includes('precio') || message.includes('costo') || message.includes('cuanto')) {
      return 'Precios de nuestros servicios principales: Tasación de Viviendas (consultar), Inspección Técnica $180.000, Fusión de Terrenos $890.000, Diseño de Espacios $2.490.000, Revisor Independiente $497.000, Subdivisión de Terrenos (consultar), Regularización según proyecto. ¿Qué servicio específico te interesa?';
    }
    
    // Tiempos
    if (message.includes('tiempo') || message.includes('demora') || message.includes('cuánto tarda')) {
      return 'Tiempos estimados: Tasación de Viviendas 7 días hábiles, Inspección Técnica 2-3 días, Fusión de Terrenos 45-60 días, Revisor Independiente 15 días, Diseño de Espacios 30-45 días, Subdivisión Normal 3-4 meses, Subdivisión Afecta a Utilidad Pública 6-8 meses, Permisos 30-60 días. ¿Qué servicio necesitas?';
    }
    
    // Calculadoras
    if (message.includes('calculadora') || message.includes('calcular') || message.includes('costo construcción')) {
      return 'Tenemos calculadoras gratuitas para estimar costos de construcción y eficiencia energética. Son herramientas orientativas basadas en nuestros 26 años de experiencia. ¿Te gustaría usar alguna calculadora?';
    }
    
    // Información general
    if (message.includes('servicios') || message.includes('qué hacen') || message.includes('especialidad')) {
      return 'Somos especialistas en: Subdivisión de Terrenos, Fusión de Terrenos, Diseño de Espacios, Revisor Independiente, Regularización de Inmuebles, Tasaciones, Inspección Técnica, Sistema EIFS, Permisos y Recepciones, Estudios de Cabida. ¿Cuál te interesa más?';
    }
    
    if (message.includes('contacto') || message.includes('telefono') || message.includes('whatsapp')) {
      return 'Contactos: WhatsApp +56979316827, Email contacto@arquitectochile.com, Oficina en Santiago. Atención personalizada de Patricio Becar. ¿Prefieres que te conecte por WhatsApp?';
    }
    
    if (message.includes('patricio') || message.includes('arquitecto') || message.includes('experiencia')) {
      return 'Patricio Becar Elissegaray: Arquitecto Universidad de Chile, 26+ años de experiencia, Magister en Gestión, Master in Management (Australia), ex-funcionario municipal. Especialista en fusiones y permisos complejos.';
    }
    
    if (message.includes('hola') || message.includes('buenas') || message.includes('buenos dias')) {
      return '¡Hola! Soy el asistente de ArquitectoChile. Puedo ayudarte con: Subdivisión de Terrenos, Fusión de Terrenos, Diseño de Espacios, Revisor Independiente, Regularización, Tasaciones, Inspección Técnica, EIFS, Permisos y más. ¿Qué necesitas?';
    }
    
    // Respuesta por defecto
    return 'Gracias por tu consulta. Ofrecemos servicios completos de arquitectura: subdivisión de terrenos, fusión de terrenos, diseño, permisos, tasaciones, regularización y más. Para información específica, contacta a Patricio por WhatsApp +56979316827. ¿Te ayudo a conectarte?';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simular delay de respuesta (después será la llamada a N8N)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const connectToWhatsApp = () => {
    const message = "Hola Patricio, vengo del chatbot de la web. Me interesa obtener más información sobre sus servicios de arquitectura.";
    const whatsappUrl = `https://wa.me/56979316827?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`w-80 shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-96'}`}>
        <CardHeader className="bg-blue-600 text-white p-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-sm font-medium">Asistente ArquitectoChile</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-blue-700 p-1 h-6 w-6"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 p-1 h-6 w-6"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-600'
                    }`}>
                      {message.sender === 'user' ? <User className="h-3 w-3 text-white" /> : <Bot className="h-3 w-3 text-white" />}
                    </div>
                    <div className={`p-2 rounded-lg text-sm ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="bg-gray-100 p-2 rounded-lg text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="border-t p-3">
              <div className="flex gap-2 mb-2">
                <Button
                  onClick={connectToWhatsApp}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Conectar WhatsApp
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu consulta..."
                  className="text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}