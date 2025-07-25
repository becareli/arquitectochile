import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppChat() {
  const handleWhatsAppClick = () => {
    const message = "Hola Patricio, me interesa conocer más sobre tus servicios de arquitectura.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/56979316827?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-lg transition-colors"
        aria-label="Chat por WhatsApp"
      >
        <MessageCircle size={24} />
      </Button>
    </div>
  );
}
