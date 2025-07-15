import { useQuery } from "@tanstack/react-query";
import { Star, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials/featured"],
  });

  // Fallback testimonials with actual content from the original site
  const fallbackTestimonials = [
    {
      id: 1,
      clientName: "María González",
      clientTitle: "Casa en Las Condes",
      content: "Excelente servicio y profesionalismo. Cumplieron con todos los plazos y el resultado superó nuestras expectativas.",
      rating: 5,
      imageUrl: "https://arquitectochile.com/wp-content/uploads/2021/04/Testimonio-01.png",
      videoUrl: "#"
    },
    {
      id: 2,
      clientName: "Carlos Rodríguez",
      clientTitle: "Departamento en Providencia",
      content: "La asesoría a domicilio fue clave para nuestro proyecto. Nos ahorraron mucho tiempo y dinero con sus recomendaciones.",
      rating: 5,
      imageUrl: "https://arquitectochile.com/wp-content/uploads/2021/04/Testimonio-02.png",
      videoUrl: "#"
    },
    {
      id: 3,
      clientName: "Ana Torres",
      clientTitle: "Casa en Ñuñoa",
      content: "El sistema EIFS que instalaron redujo significativamente nuestros costos de calefacción. Muy recomendable.",
      rating: 5,
      imageUrl: "https://arquitectochile.com/wp-content/uploads/2021/03/Screen-Shot-2021-03-29-at-18.53.41.png",
      videoUrl: "#"
    },
    {
      id: 4,
      clientName: "Miguel Herrera",
      clientTitle: "Oficina en Santiago Centro",
      content: "Profesionales de primera calidad. Nos ayudaron desde el diseño hasta la recepción final del proyecto.",
      rating: 5,
      imageUrl: "https://arquitectochile.com/wp-content/uploads/2021/04/Testimonio-04.png",
      videoUrl: "#"
    }
  ];

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;

  if (isLoading) {
    return (
      <section id="testimonios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark mb-4">Lo que Dicen Nuestros Clientes</h2>
            <p className="text-xl text-gray-600">Testimonios reales de proyectos exitosos</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="bg-gray-50 rounded-xl p-8">
                <div className="text-center">
                  <Skeleton className="w-full h-64 rounded-lg mb-6" />
                  <Skeleton className="h-4 w-24 mx-auto mb-4" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-3 w-32 mx-auto" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Lo que Dicen Nuestros Clientes</h2>
          <p className="text-xl text-gray-600">Testimonios reales de proyectos exitosos</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {displayTestimonials.map((testimonial: any) => (
            <Card key={testimonial.id} className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="relative mb-6">
                <div className="w-full h-64 bg-gray-300 rounded-lg relative overflow-hidden">
                  <img 
                    src={testimonial.imageUrl} 
                    alt={`Testimonio ${testimonial.clientName}`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                      onClick={() => window.open(testimonial.videoUrl, '_blank')}
                    >
                      <Play className="text-2xl" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mb-4">
                <div className="flex space-x-1">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star key={index} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
              <div className="text-dark font-semibold">- {testimonial.clientName}</div>
              <div className="text-sm text-gray-500">{testimonial.clientTitle}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
