import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Projects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["/api/projects"],
  });

  // Fallback projects if no data from API
  const fallbackProjects = [
    {
      id: 1,
      title: "Casa Moderna Los Andes",
      description: "Diseño contemporáneo con eficiencia energética",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      size: "280 m²",
      location: "Los Andes",
      category: "Residencial"
    },
    {
      id: 2,
      title: "Departamento Providencia",
      description: "Remodelación completa con diseño minimalista",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      size: "95 m²",
      location: "Providencia",
      category: "Residencial"
    },
    {
      id: 3,
      title: "Oficina Corporativa",
      description: "Espacio de trabajo moderno y funcional",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      size: "450 m²",
      location: "Santiago Centro",
      category: "Comercial"
    },
    {
      id: 4,
      title: "Casa Sustentable",
      description: "Arquitectura ecológica con certificación LEED",
      imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      size: "320 m²",
      location: "La Reina",
      category: "Residencial"
    },
    {
      id: 5,
      title: "Remodelación de Cocina",
      description: "Transformación completa con isla central",
      imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      size: "35 m²",
      location: "Las Condes",
      category: "Remodelación"
    },
    {
      id: 6,
      title: "Terraza con Jardín",
      description: "Espacio exterior integrado con paisajismo",
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      size: "120 m²",
      location: "Vitacura",
      category: "Paisajismo"
    }
  ];

  const displayProjects = projects && projects.length > 0 ? projects : fallbackProjects;

  if (isLoading) {
    return (
      <section id="proyectos" className="py-20 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark mb-4">Modelos de Casas</h2>
            <p className="text-xl text-gray-600">Diseños únicos para inspirar tu proyecto</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="bg-white rounded-xl overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="proyectos" className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Modelos de Casas</h2>
          <p className="text-xl text-gray-600">Diseños únicos para inspirar tu proyecto</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project: any) => (
            <Card key={project.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 group">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <Button 
                    className="bg-white text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Ver Modelo
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-dark mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{project.size}</span>
                  <span className="text-sm text-primary font-medium">Ver más</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
