import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { getAllPosts, formatDate } from "@/lib/blog";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";


export default function Blog() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const posts = getAllPosts();
  const isLoading = false;

  useSEO({
    title: "Blog de arquitectura: permisos, recepción final y regularización | ArquitectoChile",
    description: "Guías claras sobre permisos de edificación, recepción final, regularización y trámites en la DOM, escritas por un arquitecto con 25 años de experiencia.",
    path: "/blog",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://arquitectochile.com" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://arquitectochile.com/blog" },
      ],
    },
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="bg-[#0f172a] text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="rounded-lg bg-[#f97316] text-white mb-4 text-sm font-bold px-4 py-2">
            ✍️ BLOG TÉCNICO
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Artículos de Arquitectura
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Conocimiento profesional sobre regularización, diseño, permisos y construcción en Chile.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && (
            <div className="text-center py-20 text-gray-500">
              Cargando artículos...
            </div>
          )}

          {!isLoading && posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl font-semibold text-gray-700 mb-2">Próximamente</p>
              <p className="text-gray-500">
                Estamos preparando contenido de alto valor. ¡Vuelve pronto!
              </p>
            </div>
          )}

          {!isLoading && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
                >
                  {post.imageUrl ? (
                    <div className="p-3 pb-0">
                      <img
                        src={post.imageUrl}
                        alt={post.imageAlt}
                        width={1200}
                        height={630}
                        loading="lazy"
                        className="w-full h-auto aspect-[1200/630] rounded-2xl object-contain group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-52 bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] flex items-center justify-center">
                      <span className="text-5xl">🏗️</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.createdAt)}
                    </div>
                    <h2 className="text-lg font-bold text-[#0f172a] mb-2 group-hover:text-[#f97316] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-1 text-[#f97316] font-semibold text-sm">
                      Leer artículo <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
