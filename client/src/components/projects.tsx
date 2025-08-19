import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Bath, Bed, Square } from "lucide-react";

interface HouseModel {
  id: number;
  name: string;
  bedrooms: number;
  bathrooms: number;
  totalArea: number;
  imageUrl: string;
  description: string;
  planPrice?: string;
}

export default function Projects() {
  // Modelos de casas diseñados por Patricio Becar según el prompt
  const houseModels: HouseModel[] = [
    {
      id: 1,
      name: "Amanda",
      bedrooms: 3,
      bathrooms: 2,
      totalArea: 150,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Casa Amanda combina elegancia contemporánea con funcionalidad familiar. Espacios luminosos y distribución inteligente crean el hogar perfecto para familias modernas que valoran la comodidad y el estilo.",
      planPrice: "Consultar precio"
    },
    {
      id: 2,
      name: "Isidora", 
      bedrooms: 4,
      bathrooms: 3,
      totalArea: 200,
      imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Casa Isidora representa la sofisticación arquitectónica. Con amplios espacios y diseño vanguardista, ofrece el equilibrio perfecto entre privacidad familiar y áreas de encuentro social.",
      planPrice: "Consultar precio"
    },
    {
      id: 3,
      name: "Valentina",
      bedrooms: 3,
      bathrooms: 2,
      totalArea: 125,
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Casa Valentina maximiza cada metro cuadrado con diseño inteligente y funcional. Perfecta para parejas jóvenes que buscan su primer hogar sin renunciar al confort y la modernidad.",
      planPrice: "Consultar precio"
    },
    {
      id: 4,
      name: "Francisca",
      bedrooms: 5,
      bathrooms: 4,
      totalArea: 280,
      imageUrl: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Casa Francisca es sinónimo de amplitud y lujo familiar. Diseñada para familias numerosas que desean espacios generosos, privacidad personal y áreas comunes espectaculares para compartir.",
      planPrice: "Consultar precio"
    },
    {
      id: 5,
      name: "Catalina",
      bedrooms: 2,
      bathrooms: 2,
      totalArea: 95,
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Casa Catalina demuestra que la elegancia no necesita grandes espacios. Diseño minimalista y distribución optimizada crean un ambiente acogedor y contemporáneo ideal para la vida urbana.",
      planPrice: "Consultar precio"
    },
    {
      id: 6,
      name: "Esperanza",
      bedrooms: 4,
      bathrooms: 3,
      totalArea: 220,
      imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      description: "Casa Esperanza inspira con su arquitectura sustentable y espacios conectados con la naturaleza. Diseño ecológico que combina responsabilidad ambiental con confort familiar excepcional.",
      planPrice: "Consultar precio"
    }
  ];

  return (
    <section id="proyectos" className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Modelos de Casas</h2>
          <p className="text-xl text-gray-600 mb-2">Diseños únicos creados por el Arquitecto Patricio Becar</p>
          <p className="text-lg text-gray-500">Planos disponibles para la construcción de tu hogar ideal</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {houseModels.map((house) => (
            <Card key={house.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-64 group">
                <img 
                  src={house.imageUrl} 
                  alt={`Casa ${house.name}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-white font-medium px-3 py-1">
                    Casa {house.name}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                  <Button 
                    className="bg-white text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-white"
                    size="lg"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Ver Planos
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-dark">Casa {house.name}</h3>
                  <span className="text-lg font-semibold text-primary">{house.totalArea} m²</span>
                </div>
                
                {/* Características técnicas */}
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Bed className="w-4 h-4" />
                    <span className="text-sm font-medium">{house.bedrooms} dorm.</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Bath className="w-4 h-4" />
                    <span className="text-sm font-medium">{house.bathrooms} baños</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Square className="w-4 h-4" />
                    <span className="text-sm font-medium">{house.totalArea} m² total</span>
                  </div>
                </div>
                
                {/* Descripción persuasiva */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  {house.description}
                </p>
                
                {/* Call to action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-500">{house.planPrice}</span>
                  <Button 
                    size="sm" 
                    className="bg-primary text-white hover:bg-secondary transition-colors"
                  >
                    Cotizar Planos
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Footer profesional */}
        <div className="text-center mt-12 p-8 bg-white rounded-xl shadow-md">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-dark mb-3">¿Te gustó algún modelo?</h3>
            <p className="text-gray-600 mb-6">
              Cada diseño ha sido cuidadosamente creado por el Arquitecto Patricio Becar con más de 25 años de experiencia. 
              Los planos incluyen detalles técnicos, especificaciones de materiales y normativa vigente para que puedas construir con total confianza.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-white hover:bg-secondary">
                <Home className="w-5 h-5 mr-2" />
                Solicitar Cotización de Planos
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Ver Más Modelos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}