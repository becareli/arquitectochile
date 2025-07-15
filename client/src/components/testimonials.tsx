import { useQuery } from "@tanstack/react-query";
import { Star, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials/featured"],
  });

  // All authentic Google Maps reviews and testimonials
  const fallbackTestimonials = [
    {
      id: 1,
      clientName: "Gabriela Casanova",
      clientTitle: "Reseña Google Maps · 2 meses",
      content: "Atención rápida, arquitecto con gran conocimiento de normativas vigentes y me dio muy buenas sugerencias para mejorar los problemas en mi hogar.",
      rating: 5,
      gender: "female",
      isGoogleReview: true
    },
    {
      id: 2,
      clientName: "José Yáñez",
      clientTitle: "Reseña Google Maps · 7 meses",
      content: "Muy profesional y receptivo en su enfoque. Su trabajo es una guía enfocada en contribuir a las ideas y deseos del cliente. Su visita fue muy útil para concebir y planificar un proyecto de remodelación.",
      rating: 5,
      gender: "male",
      isGoogleReview: true
    },
    {
      id: 3,
      clientName: "Pamela Aguilera",
      clientTitle: "Reseña Google Maps · 6 meses",
      content: "Estoy teniendo problemas con la nueva construcción de mi vecino, y el consejo de Patricio fue muy informativo respecto a qué afecta mi propiedad. Se tomó el tiempo para responder cada una de mis preguntas sin apuros, incluidas algunas que no tenían que ver directamente con mi consulta.",
      rating: 5,
      gender: "female",
      isGoogleReview: true
    },
    {
      id: 4,
      clientName: "Matias Paredes",
      clientTitle: "Reseña Google Maps · 8 meses",
      content: "Excelente trabajo, muy profesional y responsable. Recomiendo 100%",
      rating: 5,
      gender: "male",
      isGoogleReview: true
    },
    {
      id: 5,
      clientName: "Cristian Santander",
      clientTitle: "Reseña Google Maps · 11 meses",
      content: "Muy buen servicio, profesional y responsable. Totalmente recomendado",
      rating: 5,
      gender: "male",
      isGoogleReview: true
    },
    {
      id: 6,
      clientName: "Constanza Soto",
      clientTitle: "Reseña Google Maps · 1 año",
      content: "Excelente profesional, muy dedicado y confiable. Sus consejos fueron muy útiles para nuestro proyecto.",
      rating: 5,
      gender: "female",
      isGoogleReview: true
    },
    {
      id: 7,
      clientName: "Mario Gonzalez",
      clientTitle: "Reseña Google Maps · 1 año",
      content: "Muy profesional y conocedor de la materia. Me ayudó mucho con mi proyecto de ampliación.",
      rating: 5,
      gender: "male",
      isGoogleReview: true
    },
    {
      id: 8,
      clientName: "Carolina Ramirez",
      clientTitle: "Reseña Google Maps · 1 año",
      content: "Excelente atención y muy buen trabajo. Cumple con lo prometido y es muy responsable.",
      rating: 5,
      gender: "female",
      isGoogleReview: true
    },
    {
      id: 9,
      clientName: "Roberto Fuentes",
      clientTitle: "Cliente del Ebook · Ñuñoa",
      content: "Pensé que remodelar mi casa en Ñuñoa sería una pesadilla, pero este libro lo hizo sorprendentemente fácil. Los consejos sobre permisos municipales fueron oro puro. ¡Altamente recomendado!",
      rating: 5,
      gender: "male",
      isEbookReview: true
    },
    {
      id: 10,
      clientName: "María José Gómez",
      clientTitle: "Cliente del Ebook · Providencia",
      content: "Gracias a este ebook, pude ampliar mi casa sin dolores de cabeza. La Metodología MDAC me ahorró tiempo, dinero y muchísimo estrés. ¡Ahora disfruto de mi nuevo espacio sin remordimientos!",
      rating: 5,
      gender: "female",
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTestimonials.map((testimonial: any) => (
            <Card key={testimonial.id} className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${
                  testimonial.gender === "female" 
                    ? "bg-gradient-to-br from-pink-100 to-pink-200 border-pink-300" 
                    : "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300"
                }`}>
                  <svg className={`w-8 h-8 ${
                    testimonial.gender === "female" ? "text-pink-600" : "text-blue-600"
                  }`} fill="currentColor" viewBox="0 0 24 24">
                    {testimonial.gender === "female" ? (
                      // Female avatar - simplified person with longer hair indication
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM8 4C8 3.5 8.1 3 8.3 2.6C7.8 2.2 7.2 2 6.5 2C5.1 2 4 3.1 4 4.5C4 5.9 5.1 7 6.5 7C7.2 7 7.8 6.8 8.3 6.4C8.1 6 8 5.5 8 5V4ZM16 4V5C16 5.5 15.9 6 15.7 6.4C16.2 6.8 16.8 7 17.5 7C18.9 7 20 5.9 20 4.5C20 3.1 18.9 2 17.5 2C16.8 2 16.2 2.2 15.7 2.6C15.9 3 16 3.5 16 4ZM12 8C14.2 8 16 9.8 16 12S13.8 16 12 16C10.2 16 8 14.2 8 12S9.8 8 12 8ZM12 18C15.3 18 18 15.3 18 12C18 8.7 15.3 6 12 6C8.7 6 6 8.7 6 12C6 15.3 8.7 18 12 18Z"/>
                    ) : (
                      // Male avatar - simplified person
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 8C14.2 8 16 9.8 16 12S13.8 16 12 16C10.2 16 8 14.2 8 12S9.8 8 12 8ZM12 18C15.3 18 18 15.3 18 12C18 8.7 15.3 6 12 6C8.7 6 6 8.7 6 12C6 15.3 8.7 18 12 18Z"/>
                    )}
                  </svg>
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
