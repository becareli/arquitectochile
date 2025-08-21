import { useState, useEffect } from 'react';

// Componente simplificado para miniaturas de YouTube
function YouTubeThumbnail({ videoId, alt, className }: { videoId: string; alt: string; className?: string }) {
  const [hasError, setHasError] = useState(false);
  
  if (!videoId || hasError) {
    return (
      <div className={`${className} bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center border border-blue-200`}>
        <div className="text-center text-blue-700">
          <div className="text-2xl mb-1">🎬</div>
          <div className="text-xs font-semibold">Video Disponible</div>
          <div className="text-xs opacity-75 mt-1">Click para ver</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
}

const videos = [
  { url: 'https://youtu.be/Icqa3D3myqQ', title: 'Planos Casa Mediterranea | Casas Modernas', description: 'Planos de Casas: En este video se expone el testimonio de nuestros clientes quienes...' },
  { url: 'https://youtu.be/nfb18xuS3-Y', title: 'Ampliaciones de Casas usando Tabiques con MANSARDA', description: 'Continuando con la construcción de Mansarda de Casa en Santiago de Chile' },
  { url: 'https://youtu.be/URJ0rRVLBU0', title: 'Arquitecto a Domicilio en Santiago de Chile', description: 'Arquitecto a domicilio en Santiago de Chile. En este servicio de asesoría...' },
  { url: 'https://youtu.be/Jugr5k4z-Eg', title: 'Revisor Independiente Arquitectura en Santiago Chile', description: 'REVISOR INDEPENDIENTE DE ARQUITECTURA. Áreas de Conseguir un Revisor...' },
  { url: 'https://youtu.be/OpBr5j4cxZA', title: 'Casas de hormigon armado enfierraduras', description: 'http://arquitectochile.com/ Casas de Hormigon Armado. En este video...' },
  { url: 'https://youtu.be/9N1Y3LGqRq8', title: 'Construccion Casa Mediterranea Avances', description: 'En la construcción de la Casa Mediterránea, a avanzado considerablemente...' },
  { url: 'https://youtu.be/EnHBFo6UOS8', title: 'Construir una Casa: Proyectos de Inspeccion', description: 'http://arquitectochile.com/ Construir una Casa y antes de comenzar es...' },
  { url: 'https://youtu.be/LxbHRbNXCh4', title: 'construir una casa estilo mediterranea', description: 'http://arquitectochile.com/ Construir una Casa de Estilo Mediterráneo: En estos...' },
  { url: 'https://youtu.be/bh7eZ8X9mxU', title: 'Mansardas de Casas con Tabiquería de Metalcon', description: 'Seg voy avanzando con la construcción de Casa en Santiago de Chile. La ampliación...' },
  { url: 'https://youtu.be/NcLDm5RbJT8', title: 'Construcción de Mansardas de Casas', description: 'Demos comienzo a una serie de Videos de Lugar común...' },
  { url: 'https://youtu.be/Ne661ndvL8g', title: 'Constructora de Casas | 5 Claves para Construir', description: 'En este Video conoceremos los 5...' },
  { url: 'https://youtu.be/-SIHxp1c_Ig', title: 'Testimonio Cliente | Ampliaciones de Casas', description: 'Planos de Casas: En este video se expone el testimonio de nuestros clientes quien...' },
  { url: 'https://youtu.be/spAhkKnNjts', title: 'Evita este Error al construir una casa', description: 'https://arquitectochile.com/contacto/ arquitectochile.cl En este video...' },
  { url: 'https://youtu.be/xK3fsZvJhx0', title: 'Preparando los Tabiques antes de Pintar', description: 'Seguimos avanzando con las Ampliaciones de Viviendas y ahora toca...' },
  { url: 'https://youtu.be/wJUwbeAwkY4', title: 'Teja Continua de Metalcon en las Ampliaciones', description: 'Hemos logrado La Teja Continua de Metalcon de la Empresa CINTAC. Est...' },
  { url: 'https://youtu.be/BcGIoUDLNWg', title: 'Avances de Obra Gruesa en la Ampliación de Casa', description: 'La ampliación de esta Construcción de Casa se está terminando y ya hemos cerrado...' },
  { url: 'https://youtu.be/zXAk4mk_154', title: 'Tabiques Interiores de una Construcción', description: 'Vamos avanzando en la Construcción de Casa y ya hemos cerrado completamente...' },
  { url: 'https://youtu.be/ApmGCWHk9Jw', title: 'La Rasante de 45 construida con Tabiques', description: 'Por Medio de la Construcción de la Rasante de 45° en una ampliación de Casa en...' },
  { url: 'https://youtu.be/fDFaPcjqY1k', title: 'Usando Tabiquería de Metalcon para cerrar Mansardas', description: 'En la construcción de esta Mansarda de Casa en Santiago de Chile, en esta...' },
  { url: 'https://youtu.be/nrsek_GtvBg', title: 'Construccion de Casas Mediterranea | Fundaciones', description: 'Construcción de Casa Mediterránea en Santiago de Chile. En este video se...' },
  { url: 'https://youtu.be/MfjLf2Ax7tc', title: 'Ventanas de Termopanel Ventanas VELUX', description: 'En esta Ampliación de viviendas: Ventanas de PVC de Termopanel de la...' },
  { url: 'https://youtu.be/BRIS-vT2Kvg', title: 'Aislacion Termica de Casas en Santiago Chile', description: 'Aislación Térmica de Casas en Santiago de Chile. Se refiere al Servicio de...' },
  { url: 'https://youtu.be/N-tYdckEG5Y', title: 'Ventanas de Termopanel con Perfiles de Aluminio', description: 'http://arquitectochile.com/servicios/acon-dicionamiento-termico-de-viviendas/ Seguimos con la...' },
  { url: 'https://youtu.be/1bx78RgH2hE', title: 'Materiales de Construccion en la Construccion de una Casa', description: 'http://arquitectochile.com/ Los Materiales de Construcción en la Construcción de u...' },
  { url: 'https://youtu.be/tYZlUAyxvuA', title: 'Instalacion de Ceramicas en la Construccion de Casas', description: 'Una vez definido todos los tabiques y los espacios de esta Ampliación de Viviend...' },
  { url: 'https://youtu.be/gXKl4efGwRY', title: 'Proyectos Sociales de ArquitectoChile', description: 'Recientemente hemos finalizado exitosamente la ejecución de 4 Proyecto...' },
  { url: 'https://youtu.be/3cJ4BvlqG6o', title: 'EFS Aislacion Termica de Casas | Reacondicionamiento', description: 'http://arquitectochile.com/servicios/efs/ EFS Sist. exterior Ideal para la Aislación...' },
  { url: 'https://youtu.be/QsowaE8w0Fg', title: 'EFS: Aislacion Termica para Casas Termopanel', description: 'EFS: ste sistema exterior Ideal para las fachadas de su Casa. En...' },
  { url: 'https://youtu.be/xqHWNpyHJXk', title: 'Diseño de Equipamiento Deportivo-Cancha', description: 'em Bienvenidos a un viaje arquitectónico emocional: Descubre cómo creamos...' }
];

// Convertir URL de YouTube a ID de video - versión mejorada
function getYouTubeVideoId(url: string): string {
  if (!url || typeof url !== 'string') return '';
  
  // Limpiar URL y extraer diferentes formatos
  url = url.trim();
  
  // Patrón para youtu.be/VIDEO_ID
  let match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];
  
  // Patrón para youtube.com/watch?v=VIDEO_ID
  match = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];
  
  // Patrón para youtube.com/embed/VIDEO_ID
  match = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];
  
  // Patrón general como fallback
  match = url.match(/([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];
  
  return '';
}

// Obtener thumbnail de YouTube con fallback
function getYouTubeThumbnail(videoId: string): string {
  // Usar hqdefault como más confiable que maxresdefault
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export default function Revista() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const openVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            📺 Revista ArquitectoChile
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Descubre nuestros proyectos, consejos de arquitectura y casos de éxito
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full text-lg font-semibold text-white">
            🎬 {videos.length} Videos Disponibles
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video, index) => {
              const videoId = getYouTubeVideoId(video.url);
              
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                  onClick={() => openVideo(video.url)}
                >
                  <div className="relative aspect-video">
                    <YouTubeThumbnail
                      videoId={videoId}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg 
                          className="w-8 h-8 text-white ml-1" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal para video seleccionado */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg max-w-4xl w-full">
            <button
              onClick={closeVideo}
              className="absolute -top-4 -right-4 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors z-10"
            >
              ✕
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideo)}?autoplay=1`}
                title="Video ArquitectoChile"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Te Interesó Algún Proyecto?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contacta al Arquitecto Patricio Becar para una asesoría personalizada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/56979316827?text=Hola%20Patricio,%20vi%20los%20videos%20de%20tu%20revista%20y%20me%20interesa%20una%20asesoría"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              💬 Contactar por WhatsApp
            </a>
            <a
              href="tel:+56979316827"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              📞 Llamar +56979316827
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}