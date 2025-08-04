import { MapPin, Star, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function GoogleBusinessIntegration() {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-bold text-gray-800">Nos encuentras en Google Maps</h3>
                <p className="text-sm text-gray-600">Av. Vicuña Mackenna Poniente 7735, La Florida</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 bg-yellow-100 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-gray-800">4.9</span>
              <span className="text-sm text-gray-600">(29 reseñas)</span>
            </div>
          </div>
          
          <a 
            href="https://maps.app.goo.gl/2xs5GE5gcr3R5ouf9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="text-sm font-medium">Ver en Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}