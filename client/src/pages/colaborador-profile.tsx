import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  Star,
  Users,
  Shield,
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  Award
} from "lucide-react";

const mockColaboradores = [
  {
    slug: "carlos-rodriguez",
    name: "Carlos Rodríguez",
    email: "carlos@ejemplo.com",
    phone: "+56 9 1234 5678",
    specialty: "Arquitecto",
    experience: 8,
    location: "Santiago, Chile",
    rating: 4.8,
    totalProjects: 23,
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    description: "Arquitecto especializado en diseño residencial y remodelaciones. Amplia experiencia en proyectos de ampliación y regularización de viviendas en la Región Metropolitana.",
    verified: true,
    skills: ["Diseño Residencial", "Remodelaciones", "Regularización", "Ampliaciones"],
    completedProjects: [
      { name: "Remodelación Casa Las Condes", year: 2024 },
      { name: "Ampliación Vivienda Providencia", year: 2024 },
      { name: "Diseño Interior Ñuñoa", year: 2023 }
    ]
  },
  {
    slug: "maria-gonzalez",
    name: "María González",
    email: "maria@ejemplo.com",
    phone: "+56 9 8765 4321",
    specialty: "Ingeniera Estructural",
    experience: 12,
    location: "Viña del Mar, Chile",
    rating: 4.9,
    totalProjects: 45,
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    description: "Ingeniera estructural con más de 12 años de experiencia en cálculo y diseño de estructuras para proyectos residenciales y comerciales. Especialista en reforzamiento sísmico.",
    verified: true,
    skills: ["Cálculo Estructural", "Reforzamiento Sísmico", "Proyectos Comerciales", "Hormigón Armado"],
    completedProjects: [
      { name: "Edificio Comercial Valparaíso", year: 2024 },
      { name: "Reforzamiento Edificio Histórico", year: 2023 },
      { name: "Estructura Galpón Industrial", year: 2023 }
    ]
  }
];

export default function ColaboradorProfile() {
  const [, params] = useRoute("/colaboradores/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug;

  const colaborador = mockColaboradores.find(c => c.slug === slug);

  if (!colaborador) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8 space-y-4">
            <div className="text-6xl">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800">Colaborador no encontrado</h2>
            <p className="text-gray-600">
              El perfil que buscas no existe o ha sido removido.
            </p>
            <Button onClick={() => setLocation("/colaboradores")} className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Colaboradores
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button onClick={() => setLocation("/")} className="text-xl sm:text-2xl font-display font-semibold hover:opacity-80 transition-opacity">
              <span className="text-primary">ArquitectoChile</span>
              <span className="text-secondary">.com</span>
            </button>
            <Button variant="outline" onClick={() => setLocation("/colaboradores")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Colaboradores
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 flex-shrink-0">
                <img
                  src={colaborador.profileImage}
                  alt={colaborador.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{colaborador.name}</h1>
                  {colaborador.verified && (
                    <Badge className="bg-green-100 text-green-800">
                      <Shield className="w-3 h-3 mr-1" />
                      Verificado
                    </Badge>
                  )}
                </div>
                <p className="text-lg text-gray-600 mb-3">{colaborador.specialty}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{colaborador.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {colaborador.totalProjects} proyectos
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {colaborador.location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {colaborador.experience} años experiencia
                  </div>
                </div>
                <p className="text-gray-700">{colaborador.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Award className="w-5 h-5 mr-2" />
                Especialidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {colaborador.skills.map((skill, i) => (
                  <Badge key={i} variant="outline" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Mail className="w-5 h-5 mr-2" />
                Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {colaborador.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {colaborador.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {colaborador.location}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Building2 className="w-5 h-5 mr-2" />
                Proyectos Completados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {colaborador.completedProjects.map((project, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-800">{project.name}</span>
                    <Badge variant="outline">{project.year}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
