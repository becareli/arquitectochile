import { useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Calendar, ArrowLeft } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
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

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";

  const { data: post, isLoading, isError } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
    queryFn: async () => {
      const res = await fetch(`/api/blog/${slug}`);
      if (!res.ok) throw new Error("Artículo no encontrado");
      return res.json();
    },
    enabled: !!slug,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) document.title = `${post.title} — ArquitectoChile.com`;
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center py-32 text-gray-400">Cargando...</div>
        <Footer />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-3xl mx-auto px-4 py-32 text-center">
          <p className="text-2xl font-bold text-gray-700 mb-4">Artículo no encontrado</p>
          <a href="/blog" className="text-[#f97316] hover:underline">← Volver al Blog</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Cover image */}
      {post.imageUrl && (
        <div className="w-full h-72 md:h-96 overflow-hidden">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <a
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#f97316] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Volver al Blog
        </a>

        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <Calendar className="w-4 h-4" />
          {formatDate(post.createdAt)}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-6 leading-tight">
          {post.title}
        </h1>

        <p className="text-lg text-gray-600 mb-8 border-l-4 border-[#f97316] pl-4 italic">
          {post.excerpt}
        </p>

        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap"
        >
          {post.content}
        </div>
      </article>

      <Footer />
    </div>
  );
}
