import { useQuery } from "@tanstack/react-query";
import { Star, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials/featured"],
  });

  // Authentic Google Maps reviews and testimonials
  const fallbackTestimonials = [
    {
      id: 1,
      clientName: "Gabriela Casanova",
      clientTitle: "Reseña Google Maps · 2 meses",
      content: "Atención rápida, arquitecto con gran conocimiento de normativas vigentes y me dio muy buenas sugerencias para mejorar los problemas en mi hogar.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      isGoogleReview: true
    },
    {
      id: 2,
      clientName: "José Yáñez",
      clientTitle: "Reseña Google Maps · 7 meses",
      content: "Muy profesional y receptivo en su enfoque. Su trabajo es una guía enfocada en contribuir a las ideas y deseos del cliente. Su visita fue muy útil para concebir y planificar un proyecto de remodelación.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      isGoogleReview: true
    },
    {
      id: 3,
      clientName: "Pamela Aguilera",
      clientTitle: "Reseña Google Maps · 6 meses",
      content: "Estoy teniendo problemas con la nueva construcción de mi vecino, y el consejo de Patricio fue muy informativo respecto a qué afecta mi propiedad. Se tomó el tiempo para responder cada una de mis preguntas sin apuros.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      isGoogleReview: true
    },
    {
      id: 4,
      clientName: "Roberto Fuentes",
      clientTitle: "Cliente del Ebook · Ñuñoa",
      content: "Pensé que remodelar mi casa en Ñuñoa sería una pesadilla, pero este libro lo hizo sorprendentemente fácil. Los consejos sobre permisos municipales fueron oro puro. ¡Altamente recomendado!",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      isEbookReview: true
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
            <Card key={testimonial.id} className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={testimonial.imageUrl} 
                    alt={`Testimonio ${testimonial.clientName}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-dark font-semibold">{testimonial.clientName}</h4>
                      <p className="text-sm text-gray-500 flex items-center">
                        {testimonial.isGoogleReview && (
                          <span className="inline-flex items-center mr-2">
                            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Google Maps
                          </span>
                        )}
                        {testimonial.isEbookReview && (
                          <span className="inline-flex items-center mr-2">
                            📖 Ebook
                          </span>
                        )}
                        {testimonial.clientTitle}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      {Array.from({ length: testimonial.rating }).map((_, index) => (
                        <Star key={index} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                  
                  {testimonial.videoUrl && testimonial.videoUrl !== "#" && (
                    <Button 
                      className="mt-4 bg-primary text-white hover:bg-secondary transition-colors"
                      onClick={() => window.open(testimonial.videoUrl, '_blank')}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Ver Video
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Google Maps Business Profile Link */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6 inline-block">
            <h3 className="text-lg font-semibold mb-2">⭐ 4.9 estrellas en Google Maps</h3>
            <p className="text-sm opacity-90 mb-4">29 reseñas verificadas de clientes reales</p>
            <Button 
              className="bg-white text-primary hover:bg-gray-100 transition-colors"
              onClick={() => window.open('https://www.google.cl/maps/place/Arquitecto+en+Chile-+Arquitecto+Patricio+Becar+Elissegaray/@-33.5252759,-70.5979196,117m/data=!3m1!1e3!4m15!1m8!3m7!1s0x9662d0f533070f1d:0x76497030b1c56d0c!2sAv.+Vicu%C3%B1a+Mackenna+Poniente+7735,+8400000+La+Florida,+Regi%C3%B3n+Metropolitana!3b1!8m2!3d-33.5253901!4d-70.5976952!16s%2Fg%2F11vhtn6405!3m5!1s0x9662d13f8fcab879:0x7da3de8ed1769aa2!8m2!3d-33.5249749!4d-70.5978066!16s%2Fg%2F1vp74_0b', '_blank')}
            >
              Ver Todas las Reseñas en Google
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
