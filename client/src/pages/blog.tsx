import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string | null;
  published: boolean;
  createdAt: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Blog() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blog — ArquitectoChile.com";
  }, []);

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    queryFn: async () => {
      const res = await fetch("/api/blog");
      if (!res.ok) throw new Error("Error cargando artículos");
      return res.json();
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
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => setLocation(`/blog/${post.slug}`)}
                >
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
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
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
