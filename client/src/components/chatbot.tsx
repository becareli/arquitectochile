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
      text: '¡Hola! Soy el asistente virtual de ArquitectoChile. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre fusión de terrenos, permisos, o cualquier servicio de arquitectura.',
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
    
    if (message.includes('fusión') || message.includes('fusion') || message.includes('terreno')) {
      return 'La fusión de terrenos permite aumentar hasta 30% la capacidad de construcción según el Art. 63 de la Ley General de Urbanismo. El proceso completo toma 45-60 días y cuesta desde $890.000. ¿Te gustaría una evaluación gratuita?';
    }
    
    if (message.includes('precio') || message.includes('costo') || message.includes('cuanto')) {
      return 'Nuestros servicios tienen diferentes precios: Fusión de Terrenos desde $890.000, Diseño de Espacios desde $2.490.000, Revisor Independiente desde $290.000. ¿Sobre qué servicio específico te gustaría saber más?';
    }
    
    if (message.includes('tiempo') || message.includes('demora') || message.includes('cuánto')) {
      return 'Los tiempos varían según el servicio: Fusión de Terrenos 45-60 días, Revisor Independiente 15-20 días, Diseño de Espacios 30-45 días. ¿Qué servicio te interesa?';
    }
    
    if (message.includes('contacto') || message.includes('telefono') || message.includes('whatsapp')) {
      return 'Puedes contactarnos por WhatsApp al +56979316827 o email a contacto@arquitectochile.com. También puedes solicitar una consulta directamente desde la página. ¿Prefieres que te conecte por WhatsApp?';
    }
    
    if (message.includes('patricio') || message.includes('arquitecto')) {
      return 'Patricio Becar Elissegaray es Arquitecto de la Universidad de Chile con 26+ años de experiencia. Tiene un Magister en Gestión y Master in Management de Australia. Ha trabajado en municipalidades y empresas inmobiliarias.';
    }
    
    if (message.includes('hola') || message.includes('buenas') || message.includes('buenos dias')) {
      return '¡Hola! Es un gusto poder ayudarte. Soy el asistente de ArquitectoChile. ¿En qué servicio de arquitectura estás interesado? Puedo ayudarte con fusión de terrenos, diseño de espacios, permisos, y más.';
    }
    
    // Respuesta por defecto
    return 'Gracias por tu consulta. Para darte la mejor respuesta, puedes contactar directamente a Patricio por WhatsApp al +56979316827 o contarme más detalles sobre lo que necesitas. ¿Te ayudo a conectarte?';
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