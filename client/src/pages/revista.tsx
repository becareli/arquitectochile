import { useState } from 'react';

// Componente para manejar imágenes con fallback
function YouTubeThumbnail({ videoId, alt, className }: { videoId: string; alt: string; className?: string }) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fallbackLevel, setFallbackLevel] = useState(0);
  
  const thumbnailOptions = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/default.jpg`
  ];

  const handleImageError = () => {
    if (fallbackLevel < thumbnailOptions.length - 1) {
      setFallbackLevel(prev => prev + 1);
      setImageError(false);
      setIsLoading(true);
    } else {
      setImageError(true);
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div className={`${className} bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center`}>
        <div className="text-center text-gray-600">
          <div className="text-3xl mb-2">🎬</div>
          <div className="text-sm font-medium">Video Disponible</div>
          <div className="text-xs mt-1">Click para reproducir</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`${className} bg-gray-200 flex items-center justify-center absolute inset-0`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      <img
        src={thumbnailOptions[fallbackLevel]}
        alt={alt}
        className={className}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
}

const videos = [
  { url: 'https://youtu.be/Icqa3D3myqQ', title: 'Proyecto Residencial - Casa Moderna', description: 'Diseño contemporáneo con espacios amplios' },
  { url: 'https://youtu.be/nfb18xuS3-Y', title: 'Ampliación de Vivienda', description: 'Proceso completo de expansión habitacional' },
  { url: 'https://youtu.be/URJ0rRVLBU0', title: 'Asesoría de Arquitectura a Domicilio', description: 'Servicio profesional en tu hogar' },
  { url: 'https://youtu.be/Jugr5k4z-Eg', title: 'Regularización de Construcciones', description: 'Legalización de ampliaciones existentes' },
  { url: 'https://youtu.be/OpBr5j4cxZA', title: 'Diseño de Cocinas Modernas', description: 'Optimización de espacios culinarios' },
  { url: 'https://youtu.be/9N1Y3LGqRq8', title: 'Proyecto de Segundo Piso', description: 'Ampliación vertical profesional' },
  { url: 'https://youtu.be/EnHBFo6UOS8', title: 'Remodelación Integral', description: 'Transformación completa de vivienda' },
  { url: 'https://youtu.be/LxbHRbNXCh4', title: 'Subdivisión de Terrenos', description: 'Proceso legal y técnico de división' },
  { url: 'https://youtu.be/bh7eZ8X9mxU', title: 'Casa Sustentable', description: 'Arquitectura eco-friendly y eficiente' },
  { url: 'https://youtu.be/NcLDm5RbJT8', title: 'Inspección Técnica de Viviendas', description: 'Evaluación profesional de estructuras' },
  { url: 'https://youtu.be/Ne661ndvL8g', title: 'Diseño de Baños Modernos', description: 'Espacios funcionales y elegantes' },
  { url: 'https://youtu.be/-SIHxp1c_Ig', title: 'Fusión de Predios', description: 'Unificación legal de terrenos' },
  { url: 'https://youtu.be/spAhkKnNjts', title: 'Casa de Campo', description: 'Diseño rural con estilo contemporáneo' },
  { url: 'https://youtu.be/xK3fsZvJhx0', title: 'Reacondicionamiento Térmico', description: 'Mejora del aislamiento y eficiencia' },
  { url: 'https://youtu.be/wJUwbeAwkY4', title: 'Quincho y Terraza', description: 'Espacios exteriores para el disfrute' },
  { url: 'https://youtu.be/BcGIoUDLNWg', title: 'Casa Unifamiliar', description: 'Proyecto residencial completo' },
  { url: 'https://youtu.be/zXAk4mk_154', title: 'Ático Moderno', description: 'Aprovechamiento de espacios superiores' },
  { url: 'https://youtu.be/ApmGCWHk9Jw', title: 'Tasación de Viviendas', description: 'Evaluación comercial profesional' },
  { url: 'https://youtu.be/fDFaPcjqY1k', title: 'Proyecto Minimalista', description: 'Diseño limpio y funcional' },
  { url: 'https://youtu.be/nrsek_GtvBg', title: 'Ampliación de Dormitorios', description: 'Expansión de espacios privados' },
  { url: 'https://youtu.be/MfjLf2Ax7tc', title: 'Casa Mediterránea', description: 'Estilo clásico con toques modernos' },
  { url: 'https://youtu.be/BRIS-vT2Kvg', title: 'Oficina en Casa', description: 'Espacios de trabajo profesional' },
  { url: 'https://youtu.be/N-tYdckEG5Y', title: 'Consultoría Arquitectónica', description: 'Asesoría especializada para tu proyecto' },
  { url: 'https://youtu.be/1bx78RgH2hE', title: 'Proyecto Duplex', description: 'Vivienda de dos niveles optimizada' },
  { url: 'https://youtu.be/tYZlUAyxvuA', title: 'Diseño de Fachadas', description: 'Mejora estética y funcional exterior' },
  { url: 'https://youtu.be/gXKl4efGwRY', title: 'Casa Esquina', description: 'Aprovechamiento de ubicación privilegiada' },
  { url: 'https://youtu.be/3cJ4BvlqG6o', title: 'Proyecto Familiar', description: 'Espacios pensados para la familia' },
  { url: 'https://youtu.be/QsowaE8w0Fg', title: 'Remodelación de Cocina', description: 'Modernización del corazón del hogar' },
  { url: 'https://youtu.be/xqHWNpyHJXk', title: 'Casa con Piscina', description: 'Integración de área recreativa' }
];

// Convertir URL de YouTube a ID de video
function getYouTubeVideoId(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
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