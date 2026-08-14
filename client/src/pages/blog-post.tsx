import { useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
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
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`);
      if (!res.ok) throw new Error("Artículo no encontrado");
      return res.json();
    },
    enabled: !!slug,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const pageUrl = `https://arquitectochile.com/blog/${encodeURIComponent(post.slug)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.createdAt,
    "dateModified": post.createdAt,
    "url": pageUrl,
    ...(post.imageUrl ? { "image": { "@type": "ImageObject", "url": `https://arquitectochile.com/api/blog/${encodeURIComponent(post.slug)}/og-image` } } : {}),
    "author": {
      "@type": "Person",
      "name": "Patricio Becar Elissegaray",
      "jobTitle": "Arquitecto",
      "url": "https://arquitectochile.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ArquitectoChile.com",
      "url": "https://arquitectochile.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://arquitectochile.com/favicon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{post.title} — ArquitectoChile.com</title>
        <meta name="description" content={post.excerpt} />
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={pageUrl} />
        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
        <meta property="og:site_name" content="ArquitectoChile.com" />
        <meta property="og:locale" content="es_CL" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.imageUrl && <meta name="twitter:image" content={post.imageUrl} />}
        {/* Canonical */}
        <link rel="canonical" href={pageUrl} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {/* JSON-LD BreadcrumbList */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Inicio",
              "item": "https://arquitectochile.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Blog",
              "item": "https://arquitectochile.com/blog"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": post.title,
              "item": pageUrl
            }
          ]
        })}</script>
      </Helmet>
      <Navigation />

      {/* Cover image */}
      {post.imageUrl && (
        <div className="w-full bg-gray-50 flex items-center justify-center">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full max-w-4xl mx-auto object-contain"
          />
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
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Footer />
    </div>
  );
}
