import { marked } from "marked";

// Blog estático: cada artículo es un archivo .md en client/src/content/blog/<slug>.md
// con frontmatter YAML simple (clave: valor). Se carga en build, sin base de datos.

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  content: string; // HTML
  createdAt: string; // YYYY-MM-DD
  author: string;
  category: string;
  cta: string;
  imageUrl: string | null;
}

const files = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].replace(/\s+#.*$/, "").trim();
    if (/^(["']).*\1$/.test(value)) value = value.slice(1, -1);
    data[m[1]] = value;
  }
  return { data, body: match[2] };
}

const posts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const { data, body } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title || slug,
      seoTitle: data.seoTitle || data.title || slug,
      excerpt: data.description || "",
      content: marked.parse(body, { async: false }) as string,
      createdAt: data.date || "",
      author: data.author || "Patricio Becar, arquitecto",
      category: data.category || "",
      cta: data.cta || "",
      imageUrl: data.image || null,
    };
  })
  .filter((p) => data_isPublishable(p))
  .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

function data_isPublishable(p: BlogPost) {
  return !p.slug.startsWith("_");
}

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export const blogSlugs = posts.map((p) => p.slug);

export function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Santiago",
  });
}
