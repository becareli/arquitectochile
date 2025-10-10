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
      id: 21,
      clientName: "Ivan Romaratti",
      clientTitle: "Reseña Google Maps · 23 horas",
      content: "Cumple con lo prometido en la descripción del servicio Asesoría a Domicilio. Escucha las inquietudes y se asegura de aclarar todas las dudas.",
      rating: 5,
      gender: "male",
      isGoogleReview: true
    },
    {
      id: 1,
      clientName: "Gabriela Casanova",
      clientTitle: "Reseña Google Maps · 2 meses",
      content: "Atención rápida, arquitecto con gran conocimiento de la normativa vigente y me entregó muy buenas sugerencias para mejorar los problemas en mi vivienda.",
      rating: 5,
      gender: "female",
      isGoogleReview: true
    },
    {
      id: 2,
      clientName: "Pamela Aguilera",
      clientTitle: "Reseña Google Maps · 6 meses",
      content: "Tengo problemas con la construcción nueva de mi vecino y la asesoría de Patricio fue muy esclarecedora con respecto a lo que afecta mi propiedad. Se tomó el tiempo para responder cada una de mis consultas sin ningún apuro.",
      rating: 5,
      gender: "female",
      isGoogleReview: true
    },
    {
      id: 3,
      clientName: "José Yáñez",
      clientTitle: "Reseña Google Maps · 7 meses",
      content: "Muy profesional y adecuado en el trato. Su intervención es una guía centrada en contribuir a las ideas y deseos de uno como cliente. Su visita me fue de mucha ayuda para idear y planificar un proyecto de remodelación.",
      rating: 5,
      gender: "male",
      isGoogleReview: true
    },
    {
      id: 4,
      clientName: "Carlos Olivares",
      clientTitle: "Reseña Google Maps · 3 años",
      content: "Necesitaba hacer un vano para una puerta en una pared y no sabía si necesitaba refuerzo o no. Al contactarlo y coordinar una visita a domicilio revisó el perímetro de la casa, revisó pilares y cadenas y determinó que tipo de refuerzo se necesitaba.",
      rating: 5,
      gender: "male",
      isGoogleReview: true
    },
    {
      id: 5,
      clientName: "Fernanda Paz",
      clientTitle: "Reseña Google Maps · 11 meses",
      content: "Excelente asesoría, muy profesional. Captó muy bien la idea que tenía en mente.",
      rating: 5,
      gender: "female",
      isGoogleReview: true
    },
    {
      id: 6,
      clientName: "Yasna Moya Vera",
      clientTitle: "Reseña Google Maps · 2 años",
      content: "Excelente atención de Patricio, muy preocupado y atento a nuestras consultas, buscando siempre lo más cómodo, económico y adecuado a nuestras necesidades. 100% recomendado",
      rating: 5,
      gender: "female",
      isGoogleReview: true
    },
    {
      id: 7,
      clientName: "Daihyana Nicolett Rodriguez",
      clientTitle: "Reseña Google Maps · 5 años",
      content: "Busqué y coticé varias empresas desde un principio, pero todas tenían una forma de comunicación mediante correo donde no te daba la libertad de poder tener contacto directo o hacer tus consultas. Llamé a Patricio por las buenas opiniones.",
      rating: 5,
      gender: "female",
      isGoogleReview: true
    },
    {
      id: 8,
      clientName: "Sandra del Carmen Pezo",
      clientTitle: "Reseña Google Maps · 1 año",
      content: "Excelente profesional, explicación detallada de principio a fin. Claro, preciso y conciso. Gracias.",
      rating: 5,
      gender: "female",
      isGoogleReview: true
    },
    {
      id: 9,
      clientName: "Waldo Varas",
      clientTitle: "Reseña Google Maps · 3 años",
      content: "Quiero manifestarle que estoy muy agradecido de usted, por su disponibilidad a mi persona, por su correcto Profesionalismo de Arquitecto, siendo muy responsable en su trabajo.",
      rating: 5,
      gender: "male",
      isGoogleReview: true
    },
    {
      id: 10,
      clientName: "Juan Fuentes Riffo",
      clientTitle: "Reseña Google Maps · 4 años",
      content: "Muy buena atención, de una gentileza que no es fácil de encontrar cuando no hay relación previa y además no se ha pactado una tarifa previa. Me orientó y solo puedo expresar mi agradecimiento.",
      rating: 5,
      gender: "male",
      isGoogleReview: true
    },
    {
      id: 11,
      clientName: "J Concha",
      clientTitle: "Reseña Google Maps · 3 años",
      content: "100% Recomendado, la dedicación tiempo y compromiso es destacable. Siempre atento a responder las dudas y apoyar para tomar las mejores decisiones.",
      rating: 5,
      gender: "male",
      isGoogleReview: true
    },
    {
      id: 12,
      clientName: "Rafael Quiros",
      clientTitle: "Reseña Google Maps · 2 años",
      content: "Estimado Patricio, gracias por la gestión de regularización del año 2014 ante la DOM de la municipalidad de la Florida. Fui citado y está en orden toda tu gestión, saludos y gracias.",
      rating: 5,
      gender: "male",
      isGoogleReview: true
    },
    {
      id: 13,
      clientName: "Maritza Villanueva",
      clientTitle: "Reseña Google Maps · 3 años",
      content: "Buena asesoría de Patricio, pudo resolver todas mis dudas tomándose el tiempo para ver cada una, 100% recomendable.",
      rating: 5,
      gender: "female",
      isGoogleReview: true
    },
    {
      id: 14,
      clientName: "Jorge Augant",
      clientTitle: "Reseña Google Maps · 1 año",
      content: "Excelente asesoría, explicada de manera clara e ideas que ayudan a tomar decisiones.",
      rating: 5,
      gender: "male",
      isGoogleReview: true
    },
    {
      id: 15,
      clientName: "Krishna Beatriz Villanueva",
      clientTitle: "Reseña Google Maps · 3 años",
      content: "Un excelente profesional, realiza los trabajos con compromiso y dedicación, buena comunicación y atento a todos los detalles. Se recomienda 100% su trabajo.",
      rating: 5,
      gender: "female",
      isGoogleReview: true
    },
    {
      id: 16,
      clientName: "La Profe Abby",
      clientTitle: "Reseña Google Maps · 11 meses",
      content: "Buena asesoría. Respondió a todas las consultas.",
      rating: 5,
      gender: "female",
      isGoogleReview: true
    },
    {
      id: 17,
      clientName: "Valentina Morales",
      clientTitle: "Reseña Google Maps · 2 años",
      content: "Buen asesoramiento, resolvieron mis dudas, muy atentos a responder y detallar lo que necesitaba, muchas gracias.",
      rating: 5,
      gender: "female",
      isGoogleReview: true
    },
    {
      id: 18,
      clientName: "Mario Castro",
      clientTitle: "Reseña Google Maps · 1 año",
      content: "Muy buena asesoría. Amplia, clara y precisa.",
      rating: 5,
      gender: "male",
      isGoogleReview: true
    },
    {
      id: 19,
      clientName: "Jose Luis Lagos",
      clientTitle: "Reseña Google Maps · 3 años",
      content: "Muy buena atención, profesionalismo, 100% recomendable.",
      rating: 5,
      gender: "male",
      isGoogleReview: true
    },
    {
      id: 20,
      clientName: "Aldo Alexii Saavedra",
      clientTitle: "Reseña Google Maps · 2 años",
      content: "Empresa excelente que cumple con los plazos y un excelente servicio.",
      rating: 5,
      gender: "male",
      isGoogleReview: true
    },
    {
      id: 23,
      clientName: "Roberto Fuentes",
      clientTitle: "Cliente del Ebook · Ñuñoa",
      content: "Pensé que remodelar mi casa en Ñuñoa sería una pesadilla, pero este libro lo hizo sorprendentemente fácil. Los consejos sobre permisos municipales fueron oro puro. ¡Altamente recomendado!",
      rating: 5,
      gender: "male",
      isEbookReview: true
    },
    {
      id: 22,
      clientName: "María José Gómez",
      clientTitle: "Cliente del Ebook · Providencia",
      content: "Gracias a este ebook, pude ampliar mi casa sin dolores de cabeza. La Metodología MDAC me ahorró tiempo, dinero y muchísimo estrés. ¡Ahora disfruto de mi nuevo espacio sin remordimientos!",
      rating: 5,
      gender: "female",
      isEbookReview: true
    }
  ];

  const displayTestimonials = testimonials && Array.isArray(testimonials) && testimonials.length > 0 ? testimonials : fallbackTestimonials;

  if (isLoading) {
    return (
      <section id="testimonios" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl font-bold text-[hsl(210,15%,30%)] mb-6">Lo que Dicen Nuestros Clientes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Testimonios reales de proyectos exitosos</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="bg-white rounded-xl p-8 shadow-lg">
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
    <section id="testimonios" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl font-bold text-[hsl(210,15%,30%)] mb-6">Lo que Dicen Nuestros Clientes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Testimonios reales de proyectos exitosos</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(displayTestimonials || []).map((testimonial: any) => (
            <Card key={testimonial.id} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className={`relative w-14 h-14 rounded-full flex-shrink-0 overflow-hidden ${
                  testimonial.gender === "female" 
                    ? "bg-gradient-to-br from-[hsl(14,70%,50%)] to-[hsl(14,80%,55%)]" 
                    : "bg-gradient-to-br from-[hsl(210,15%,30%)] to-[hsl(210,15%,25%)]"
                }`}>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {testimonial.gender === "female" ? (
                      // Female avatar with long hair
                      <g>
                        {/* Hair */}
                        <path d="M50 15 C30 15, 20 25, 20 40 C20 45, 22 50, 25 54 L25 85 C25 90, 30 95, 35 95 L65 95 C70 95, 75 90, 75 85 L75 54 C78 50, 80 45, 80 40 C80 25, 70 15, 50 15 Z" fill="#2D1B1B"/>
                        {/* Face */}
                        <ellipse cx="50" cy="45" rx="18" ry="20" fill="#F4C2A1"/>
                        {/* Body/Shirt */}
                        <path d="M25 85 C25 75, 30 70, 40 70 L60 70 C70 70, 75 75, 75 85 L75 95 L25 95 Z" fill="#A91B60"/>
                        {/* Neck */}
                        <rect x="45" y="62" width="10" height="8" fill="#F4C2A1"/>
                      </g>
                    ) : (
                      // Male avatar with masculine features
                      <g>
                        {/* Hair - shorter and more masculine */}
                        <path d="M50 15 C38 15, 30 22, 30 32 C30 35, 31 38, 33 40 L33 85 C33 90, 38 95, 43 95 L57 95 C62 95, 67 90, 67 85 L67 40 C69 38, 70 35, 70 32 C70 22, 62 15, 50 15 Z" fill="#2D1B1B"/>
                        {/* Face - more angular and masculine */}
                        <path d="M50 25 C42 25, 35 30, 35 38 C35 46, 42 55, 50 55 C58 55, 65 46, 65 38 C65 30, 58 25, 50 25 Z" fill="#F4C2A1"/>
                        {/* Jawline */}
                        <path d="M38 45 C40 50, 45 53, 50 53 C55 53, 60 50, 62 45" fill="#E8A87C"/>
                        {/* Body/Shirt - broader shoulders */}
                        <path d="M33 85 C33 72, 38 65, 45 65 L55 65 C62 65, 67 72, 67 85 L67 95 L33 95 Z" fill="#1E3A8A"/>
                        {/* Neck - thicker and more masculine */}
                        <rect x="44" y="53" width="12" height="12" fill="#F4C2A1"/>
                      </g>
                    )}
                  </svg>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-[hsl(210,15%,30%)] font-bold text-lg">{testimonial.clientName}</h4>
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
                  
                  <p className="font-serif text-gray-600 italic text-base leading-relaxed">"{testimonial.content}"</p>
                  
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
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[hsl(210,15%,30%)] to-[hsl(210,15%,25%)] text-white rounded-xl p-8 inline-block shadow-xl">
            <h3 className="font-serif text-2xl font-bold mb-3">⭐ 4.9 estrellas en Google Maps</h3>
            <p className="text-base opacity-90 mb-6">29 reseñas verificadas de clientes reales</p>
            <Button 
              className="bg-white text-[hsl(210,15%,30%)] hover:bg-gray-100 transition-colors font-semibold"
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
