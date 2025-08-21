import { useState } from 'react';

const videos = [
  'https://youtu.be/Icqa3D3myqQ',
  'https://youtu.be/nfb18xuS3-Y',
  'https://youtu.be/URJ0rRVLBU0',
  'https://youtu.be/Jugr5k4z-Eg',
  'https://youtu.be/OpBr5j4cxZA',
  'https://youtu.be/9N1Y3LGqRq8',
  'https://youtu.be/EnHBFo6UOS8',
  'https://youtu.be/LxbHRbNXCh4',
  'https://youtu.be/bh7eZ8X9mxU',
  'https://youtu.be/NcLDm5RbJT8',
  'https://youtu.be/Ne661ndvL8g',
  'https://youtu.be/-SIHxp1c_Ig',
  'https://youtu.be/spAhkKnNjts',
  'https://youtu.be/xK3fsZvJhx0',
  'https://youtu.be/wJUwbeAwkY4',
  'https://youtu.be/BcGIoUDLNWg',
  'https://youtu.be/zXAk4mk_154',
  'https://youtu.be/ApmGCWHk9Jw',
  'https://youtu.be/fDFaPcjqY1k',
  'https://youtu.be/nrsek_GtvBg',
  'https://youtu.be/MfjLf2Ax7tc',
  'https://youtu.be/BRIS-vT2Kvg',
  'https://youtu.be/N-tYdckEG5Y',
  'https://youtu.be/1bx78RgH2hE',
  'https://youtu.be/tYZlUAyxvuA',
  'https://youtu.be/gXKl4efGwRY',
  'https://youtu.be/3cJ4BvlqG6o',
  'https://youtu.be/QsowaE8w0Fg',
  'https://youtu.be/xqHWNpyHJXk'
];

// Convertir URL de YouTube a ID de video
function getYouTubeVideoId(url: string): string {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
}

// Obtener thumbnail de YouTube
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
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
            {videos.map((videoUrl, index) => {
              const videoId = getYouTubeVideoId(videoUrl);
              const thumbnail = getYouTubeThumbnail(videoId);
              
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                  onClick={() => openVideo(videoUrl)}
                >
                  <div className="relative aspect-video">
                    <img
                      src={thumbnail}
                      alt={`Video ${index + 1}`}
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
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Video ArquitectoChile #{index + 1}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Contenido especializado en arquitectura y construcción
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