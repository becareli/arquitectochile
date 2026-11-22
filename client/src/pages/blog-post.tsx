import { useEffect } from "react";
import { useRoute } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { getPost, formatDate } from "@/lib/blog";
import NotFound from "@/pages/not-found";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Calendar, ArrowLeft } from "lucide-react";


export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";

  const post = getPost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) return <NotFound />;

  return <Article post={post} />;
}

function Article({ post }: { post: NonNullable<ReturnType<typeof getPost>> }) {
  const pageUrl = `https://arquitectochile.com/blog/${encodeURIComponent(post.slug)}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://arquitectochile.com" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://arquitectochile.com/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": pageUrl },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.createdAt,
    "dateModified": post.createdAt,
    "url": pageUrl,
    ...(post.imageUrl ? { "image": `https://arquitectochile.com${post.imageUrl}` } : {}),
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

  useSEO({
    title: `${post.seoTitle} | ArquitectoChile`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage: post.imageUrl ? `https://arquitectochile.com${post.imageUrl}` : undefined,
    jsonLd: [jsonLd, breadcrumb],
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Cover image */}
      {post.imageUrl && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
          <img
            src={post.imageUrl}
            alt={post.imageAlt}
            width={1200}
            height={630}
            className="w-full h-auto rounded-2xl object-contain"
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
