import { useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { useSEO } from '@/hooks/useSEO';

function YouTubeThumbnail({ videoId, alt, className }: { videoId: string; alt: string; className?: string }) {
  const [hasError, setHasError] = useState(false);

  if (!videoId || hasError) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center border border-gray-200`}>
        <div className="text-center text-[#0f172a]">
          <Play className="w-8 h-8 mx-auto mb-1" strokeWidth={1.5} />
          <div className="text-xs font-semibold">Video Disponible</div>
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
  { url: 'https://youtu.be/qXySVvF6FcM', title: 'Mapa para sus Construcciones, Ampliaciones y Remodelaciones', description: 'Guía completa para planificar proyectos de construcción' },
  { url: 'https://youtu.be/N-tYdckEG5Y', title: 'Evita este Error al construir una casa | Asesoria de Arquitectura', description: 'Consejos para evitar errores costosos en construcción' },
  { url: 'https://youtu.be/URJ0rRVLBU0', title: 'Arquitecto a Domicilio en Santiago de Chile', description: 'Servicio profesional de consultoría a domicilio' },
  { url: 'https://youtu.be/Jugr5k4z-Eg', title: 'EIFS Aislacion Termica de Casas | Reacondicionamiento Termico', description: 'Sistema de aislación térmica exterior para viviendas' },
  { url: 'https://youtu.be/OpBr5j4cxZA', title: 'EIFS: Aislacion Termica para Casas - Testimonio de Cliente', description: 'Experiencia real de cliente con sistema EIFS' },
  { url: 'https://youtu.be/9N1Y3LGqRq8', title: 'Construccion de Casas Mediterranea | Testimonio de Cliente', description: 'Testimonio sobre proyecto de casa mediterránea' },
  { url: 'https://youtu.be/EnHBFo6UOS8', title: 'Ventanas de Termopanel VEKA Chile en Ampliaciones de Casas', description: 'Instalación de ventanas VEKA en ampliaciones' },
  { url: 'https://youtu.be/LxbHRbNXCh4', title: 'Aislacion Termica de Casas en Santiago de Chile', description: 'Servicio de aislación térmica para viviendas en Santiago' },
  { url: 'https://youtu.be/bh7eZ8X9mxU', title: 'Ventanas de Termopanel con Perfiles PVC de VEKA', description: 'Sistema de ventanas con perfiles PVC VEKA' },
  { url: 'https://youtu.be/NcLDm5RbJT8', title: 'Materiales de Construccion en la Construccion de Baños', description: 'Selección de materiales para construcción de baños' },
  { url: 'https://youtu.be/Ne661ndvL8g', title: 'Instalacion de Ceramicas en la Construccion de Baños', description: 'Técnicas de instalación de revestimientos cerámicos' },
  { url: 'https://youtu.be/-SIHxp1c_Ig', title: 'Preparando los Tabiques antes de Pintar', description: 'Preparación de superficies previo al acabado' },
  { url: 'https://youtu.be/spAhkKnNjts', title: 'Teja Continua de Metalcom en las Ampliaciones de Casas', description: 'Sistema de techado continuo con estructura metálica' },
  { url: 'https://youtu.be/xK3fsZvJhx0', title: 'Avances de Obra Gruesa en la Ampliacion de Casas', description: 'Progreso en estructura principal de ampliación' },
  { url: 'https://youtu.be/wJUwbeAwkY4', title: 'Tabiques Interiores de una Construccion de Casa', description: 'Instalación de divisiones internas en construcción' },
  { url: 'https://youtu.be/BcGIoUDLNWg', title: 'La Rasante de 45 construida con Tabiqueria de Volcometal', description: 'Construcción de rasante con estructura Volcometal' },
  { url: 'https://youtu.be/zXAk4mk_154', title: 'Usando Tabiqueria de Metalcon para cumplir con las Rasantes', description: 'Cumplimiento normativo con estructura Metalcon' },
  { url: 'https://youtu.be/ApmGCWHk9Jw', title: 'Ampliaciones de Casas usando Tabiqueria de Metalcon', description: 'Ampliaciones con estructuras metálicas' },
  { url: 'https://youtu.be/fDFaPcjqY1k', title: 'Mansardas de Casas con Tabiqueria de Steelframe', description: 'Construcción de mansardas con estructura de acero' },
  { url: 'https://youtu.be/nrsek_GtvBg', title: 'Construcción de Mansardas de Casas en Steelframe', description: 'Técnica steelframe para mansardas habitables' },
  { url: 'https://youtu.be/MfjLf2Ax7tc', title: '5 Aspectos Claves para elegir a su Arquitecto en Chile', description: 'Guía para seleccionar el arquitecto correcto' },
  { url: 'https://youtu.be/BRIS-vT2Kvg', title: 'Testimonio Cliente | Ampliaciones de Casas | Planos', description: 'Experiencia real de cliente con ampliaciones' },
  { url: 'https://youtu.be/1bx78RgH2hE', title: 'Planos Casa Mediterranea | Casas Modernas | Testimonio', description: 'Proyecto de casa mediterránea con testimonio' },
  { url: 'https://youtu.be/tYZlUAyxvuA', title: 'Revisor Independiente Arquitectura en Santiago', description: 'Servicio de revisión técnica independiente' },
  { url: 'https://youtu.be/gXKl4efGwRY', title: 'Casas de hormigon armado y enfierradura de losas', description: 'Construcción estructural con hormigón armado' },
  { url: 'https://youtu.be/3cJ4BvlqG6o', title: 'Construccion Casa Mediterranea Avance de Obra Gruesa', description: 'Progreso en construcción de casa mediterránea' },
  { url: 'https://youtu.be/QsowaE8w0Fg', title: 'Construir una Casa: Proyectos de Instalaciones', description: 'Planificación de instalaciones en construcción' },
  { url: 'https://youtu.be/xqHWNpyHJXk', title: 'Construir una Casa estilo Mediterranea', description: 'Proyecto de construcción con diseño mediterráneo' },
  { url: 'https://youtu.be/LYVzV8gB0YQ', title: 'Constructora de Casas: Construcciones Modernas', description: 'Desarrollo de proyectos habitacionales modernos' },
  { url: 'https://youtu.be/3SO-hrtBVFg', title: 'Parcelas de Agrado: 7 preguntas para organizar tu Parcela', description: 'Guía completa para planificar parcelas de agrado' },
  { url: 'https://youtu.be/8UGM6Fl-nhs', title: 'Remodelacion de Oficinas y Ampliaciones en Santiago', description: 'Servicios de remodelación para espacios comerciales' },
  { url: 'https://youtu.be/HgNuSTDP9UM', title: 'Fusion Predial: Documentos para la Fusion de Terrenos', description: 'Documentación requerida para fusión de terrenos' },
  { url: 'https://youtu.be/TLbEa1Tcrw8', title: 'Fusion de Terrenos: Como hacer una Fusion de Terrenos', description: 'Proceso completo para realizar fusión de terrenos' },
  { url: 'https://youtu.be/nfb18xuS3-Y', title: 'Diseño de Ágora en Plaza de Polpaico', description: 'Proyecto de espacio público comunitario' },
  { url: 'https://youtu.be/Icqa3D3myqQ', title: 'Diseño de Equipamiento Deportivo - Canchas Techadas', description: 'Diseño de espacios deportivos cubiertos' },
];

function getYouTubeVideoId(url: string): string {
  if (!url || typeof url !== 'string') return '';
  url = url.trim();
  let match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];
  match = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];
  match = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];
  match = url.match(/([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];
  return '';
}

export default function Revista() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useSEO({
    title: "Revista Técnica | ArquitectoChile.com",
    description: "Revista técnica de ArquitectoChile.com: videos y artículos sobre construcción, regularización, aislación térmica y normativa de edificación en Chile.",
    path: "/revista",
  });

  const openVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="bg-blueprint-dark section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-4">
            Canal de YouTube
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Revista Técnica ArquitectoChile
          </h1>
          <p className="text-base text-gray-300 max-w-2xl mx-auto mb-6">
            Proyectos, consejos de arquitectura y casos reales documentados en video. {videos.length} videos disponibles.
          </p>
        </div>
      </section>

      <section className="bg-blueprint section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => {
              const videoId = getYouTubeVideoId(video.url);
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => openVideo(video.url)}
                >
                  <div className="relative aspect-video">
                    <YouTubeThumbnail
                      videoId={videoId}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 bg-[#0f172a]/80 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-[#f97316] transition-all duration-300">
                        <Play className="w-6 h-6 text-white ml-0.5" fill="white" strokeWidth={0} />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-[#0f172a] mb-1.5 text-sm leading-tight line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closeVideo}>
          <div className="relative bg-white rounded-lg max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeVideo}
              className="absolute -top-3 -right-3 w-8 h-8 bg-[#0f172a] text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors z-10 text-sm font-bold"
            >
              X
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

      <section className="bg-white section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">
            Siguiente Paso
          </p>
          <h2 className="text-3xl font-bold text-[#0f172a] mb-4">
            Solicite su Diagnóstico Técnico
          </h2>
          <p className="text-base text-gray-500 mb-8 max-w-xl mx-auto">
            Contacte al Arquitecto Patricio Becar para una asesoría personalizada sobre su proyecto.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 bg-[#f97316] text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
            style={{ padding: "16px 32px" }}
          >
            Diagnóstico Técnico — $45.000
            <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
