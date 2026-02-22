import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  Star,
  Users,
  Shield,
  ArrowLeft,
  Briefcase,
  Eye
} from "lucide-react";

const colaboradores = [
  {
    slug: "carlos-rodriguez",
    name: "Carlos Rodríguez",
    specialty: "Arquitecto",
    experience: 8,
    location: "Santiago, Chile",
    rating: 4.8,
    totalProjects: 23,
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    description: "Arquitecto especializado en diseño residencial y remodelaciones. Amplia experiencia en proyectos de ampliación y regularización de viviendas en la Región Metropolitana.",
    verified: true,
    availability: "available" as const,
    skills: ["Diseño Residencial", "Remodelaciones", "Regularización", "Ampliaciones"]
  },
  {
    slug: "maria-gonzalez",
    name: "María González",
    specialty: "Ingeniera Estructural",
    experience: 12,
    location: "Viña del Mar, Chile",
    rating: 4.9,
    totalProjects: 45,
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    description: "Ingeniera estructural con más de 12 años de experiencia en cálculo y diseño de estructuras para proyectos residenciales y comerciales. Especialista en reforzamiento sísmico.",
    verified: true,
    availability: "available" as const,
    skills: ["Cálculo Estructural", "Reforzamiento Sísmico", "Proyectos Comerciales", "Hormigón Armado"]
  }
];

export default function Colaboradores() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button onClick={() => setLocation("/")} className="text-xl sm:text-2xl font-display font-semibold hover:opacity-80 transition-opacity">
              <span className="text-primary">ArquitectoChile</span>
              <span className="text-secondary">.com</span>
            </button>
            <Button variant="outline" onClick={() => setLocation("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Colaboradores</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Profesionales verificados que forman parte de la red ArquitectoChile. 
            Cada colaborador ha sido seleccionado por su experiencia y compromiso con la excelencia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {colaboradores.map((colab) => (
            <Card key={colab.slug} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-primary/20 flex-shrink-0">
                    <img
                      src={colab.profileImage}
                      alt={colab.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">{colab.name}</h3>
                      {colab.verified && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Verificado
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 font-medium">{colab.specialty}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-medium">{colab.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-1" />
                        {colab.totalProjects} proyectos
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {colab.experience} años
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{colab.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {colab.skills.slice(0, 3).map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {colab.location}
                  </div>
                  <Button
                    onClick={() => setLocation(`/colaboradores/${colab.slug}`)}
                    size="sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Perfil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Card className="max-w-lg mx-auto">
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">¿Quieres ser colaborador?</h3>
              <p className="text-gray-600 mb-4">
                Únete a nuestra red de profesionales y accede a nuevas oportunidades de proyecto.
              </p>
              <Button onClick={() => setLocation("/contacto")} variant="outline">
                Contáctanos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
