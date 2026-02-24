import { useEffect } from "react";
import { Star, Quote, MapPin, ArrowRight } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const testimonials = [
  {
    id: 21,
    clientName: "Ivan Romaratti",
    clientTitle: "Reseña Google Maps",
    content: "Cumple con lo prometido en la descripción del servicio Asesoría a Domicilio. Escucha las inquietudes y se asegura de aclarar todas las dudas.",
    rating: 5,
    service: "Asesoría a Domicilio",
  },
  {
    id: 1,
    clientName: "Gabriela Casanova",
    clientTitle: "Reseña Google Maps",
    content: "Atención rápida, arquitecto con gran conocimiento de la normativa vigente y me entregó muy buenas sugerencias para mejorar los problemas en mi vivienda.",
    rating: 5,
    service: "Consultoría Normativa",
  },
  {
    id: 2,
    clientName: "Pamela Aguilera",
    clientTitle: "Reseña Google Maps",
    content: "Tengo problemas con la construcción nueva de mi vecino y la asesoría de Patricio fue muy esclarecedora con respecto a lo que afecta mi propiedad. Se tomó el tiempo para responder cada una de mis consultas sin ningún apuro.",
    rating: 5,
    service: "Asesoría a Domicilio",
  },
  {
    id: 3,
    clientName: "José Yáñez",
    clientTitle: "Reseña Google Maps",
    content: "Muy profesional y adecuado en el trato. Su intervención es una guía centrada en contribuir a las ideas y deseos de uno como cliente. Su visita me fue de mucha ayuda para idear y planificar un proyecto de remodelación.",
    rating: 5,
    service: "Diseño de Arquitectura",
  },
  {
    id: 4,
    clientName: "Carlos Olivares",
    clientTitle: "Reseña Google Maps",
    content: "Necesitaba hacer un vano para una puerta en una pared y no sabía si necesitaba refuerzo o no. Al contactarlo y coordinar una visita a domicilio revisó el perímetro de la casa, revisó pilares y cadenas y determinó que tipo de refuerzo se necesitaba.",
    rating: 5,
    service: "Inspección Técnica",
  },
  {
    id: 5,
    clientName: "Fernanda Paz",
    clientTitle: "Reseña Google Maps",
    content: "Excelente asesoría, muy profesional. Captó muy bien la idea que tenía en mente.",
    rating: 5,
    service: "Diseño de Arquitectura",
  },
  {
    id: 6,
    clientName: "Yasna Moya Vera",
    clientTitle: "Reseña Google Maps",
    content: "Excelente atención de Patricio, muy preocupado y atento a nuestras consultas, buscando siempre lo más cómodo, económico y adecuado a nuestras necesidades. 100% recomendado",
    rating: 5,
    service: "Asesoría a Domicilio",
  },
  {
    id: 7,
    clientName: "Daihyana Nicolett Rodriguez",
    clientTitle: "Reseña Google Maps",
    content: "Busqué y coticé varias empresas desde un principio, pero todas tenían una forma de comunicación mediante correo donde no te daba la libertad de poder tener contacto directo o hacer tus consultas. Llamé a Patricio por las buenas opiniones.",
    rating: 5,
    service: "Construcción",
  },
  {
    id: 8,
    clientName: "Sandra del Carmen Pezo",
    clientTitle: "Reseña Google Maps",
    content: "Excelente profesional, explicación detallada de principio a fin. Claro, preciso y conciso. Gracias.",
    rating: 5,
    service: "Consultoría Normativa",
  },
  {
    id: 9,
    clientName: "Waldo Varas",
    clientTitle: "Reseña Google Maps",
    content: "Quiero manifestarle que estoy muy agradecido de usted, por su disponibilidad a mi persona, por su correcto Profesionalismo de Arquitecto, siendo muy responsable en su trabajo.",
    rating: 5,
    service: "Diseño de Arquitectura",
  },
  {
    id: 10,
    clientName: "Juan Fuentes Riffo",
    clientTitle: "Reseña Google Maps",
    content: "Muy buena atención, de una gentileza que no es fácil de encontrar cuando no hay relación previa y además no se ha pactado una tarifa previa. Me orientó y solo puedo expresar mi agradecimiento.",
    rating: 5,
    service: "Asesoría a Domicilio",
  },
  {
    id: 12,
    clientName: "Rafael Quiros",
    clientTitle: "Reseña Google Maps",
    content: "Estimado Patricio, gracias por la gestión de regularización del año 2014 ante la DOM de la municipalidad de la Florida. Fui citado y está en orden toda tu gestión, saludos y gracias.",
    rating: 5,
    service: "Regularización DOM La Florida",
  },
  {
    id: 13,
    clientName: "Maritza Villanueva",
    clientTitle: "Reseña Google Maps",
    content: "Buena asesoría de Patricio, pudo resolver todas mis dudas tomándose el tiempo para ver cada una, 100% recomendable.",
    rating: 5,
    service: "Asesoría a Domicilio",
  },
  {
    id: 11,
    clientName: "J Concha",
    clientTitle: "Reseña Google Maps",
    content: "100% Recomendado, la dedicación tiempo y compromiso es destacable. Siempre atento a responder las dudas y apoyar para tomar las mejores decisiones.",
    rating: 5,
    service: "Diseño de Arquitectura",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#f97316] text-[#f97316]" />
      ))}
    </div>
  );
}

export default function CasosDeExito() {
  useEffect(() => {
    document.title = "Casos de Éxito | ArquitectoChile.com";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="bg-blueprint-dark section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-4">
            Testimonios Verificados
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Casos de Éxito
          </h1>
          <p className="text-base text-gray-300 max-w-2xl mx-auto mb-6">
            Opiniones reales de clientes que confiaron en nuestro trabajo. Todas las reseñas provienen de Google Maps y son 100% verificables.
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <MapPin className="w-4 h-4" strokeWidth={1.5} />
            <span>Santiago de Chile · 26+ años de trayectoria</span>
          </div>
        </div>
      </section>

      <section className="bg-blueprint section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-gray-200 rounded-md p-6 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <Quote className="w-8 h-8 text-gray-200" strokeWidth={1} />
                  <StarRating rating={t.rating} />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5">
                  "{t.content}"
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-semibold text-[#0f172a]">{t.clientName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.clientTitle}</p>
                  <span className="inline-block mt-2 text-[10px] font-medium uppercase tracking-wider text-[#f97316] bg-orange-50 px-2 py-0.5 rounded">
                    {t.service}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 bg-[#f97316] text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
              style={{ padding: "16px 32px" }}
            >
              Solicitar Diagnóstico Técnico — $45.000
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
