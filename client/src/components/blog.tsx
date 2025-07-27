import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Blog() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["/api/blog"],
  });

  // Fallback blog posts with actual content from the original site
  const fallbackPosts = [
    {
      id: 1,
      title: "Diseño de Ampliaciones y Mansardas",
      slug: "diseno-ampliaciones-mansardas",
      excerpt: "Conoce las mejores prácticas para ampliar tu hogar aprovechando al máximo el espacio disponible.",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      createdAt: "2024-03-15T00:00:00Z"
    },
    {
      id: 2,
      title: "Diseño de Casas en Terreno Angosto",
      slug: "diseno-casas-terreno-angosto",
      excerpt: "El diseño de casa en terreno angosto se adapta a la forma del terreno, la expresión de su volumen.",
      imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      createdAt: "2024-03-10T00:00:00Z"
    },
    {
      id: 3,
      title: "Servicio de Asesoría de Arquitecto a Domicilio",
      slug: "servicio-asesoria-arquitecto-domicilio",
      excerpt: "Ya está disponible el servicio para aclarar tus dudas de diseño y construcción a domicilio.",
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      createdAt: "2024-03-05T00:00:00Z"
    }
  ];

  const displayPosts = Array.isArray(posts) && posts.length > 0 ? posts : fallbackPosts;

  if (isLoading) {
    return (
      <section id="blog" className="py-20 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark mb-4">Revista ArquitectoChile</h2>
            <p className="text-xl text-gray-600">Artículos especializados y tendencias en arquitectura</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-3 w-24 mb-2" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Revista ArquitectoChile</h2>
          <p className="text-xl text-gray-600">Artículos especializados y tendencias en arquitectura</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post: any) => (
            <Card key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-primary to-secondary">
                {post.imageUrl && (
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <CardContent className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {formatDate(post.createdAt)}
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">
                  <a href={`#blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a 
                  href={`#blog/${post.slug}`} 
                  className="text-primary font-medium hover:text-secondary transition-colors"
                >
                  Leer artículo →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-secondary transition-colors">
            Ver Toda la Revista
          </Button>
        </div>
      </div>
    </section>
  );
}
