import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload, Loader2, ImageIcon } from "lucide-react";
import { csrfHeaders } from "@/lib/csrf";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string | null;
  imageWidth: number | null;
  imageHeight: number | null;
  published: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminBlogEditor() {
  const [, setLocation] = useLocation();
  const [matchNew] = useRoute("/admin/blog/new");
  const [matchEdit, paramsEdit] = useRoute("/admin/blog/:id/edit");
  const editId = matchEdit ? parseInt(paramsEdit?.id ?? "0") : null;
  const isNew = matchNew;
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const [published, setPublished] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Load existing post when editing
  const { data: existing } = useQuery<BlogPost>({
    queryKey: ["/api/admin/blog", editId],
    queryFn: async () => {
      const res = await fetch(`/api/admin/blog/${editId}`);
      if (!res.ok) throw new Error("No encontrado");
      return res.json();
    },
    enabled: !!editId,
  });

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setSlug(existing.slug);
      setSlugManual(true);
      setExcerpt(existing.excerpt);
      setContent(existing.content);
      setImageUrl(existing.imageUrl);
      setImageWidth(existing.imageWidth ?? null);
      setImageHeight(existing.imageHeight ?? null);
      setPublished(existing.published);
    }
  }, [existing]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManual && title) {
      setSlug(slugify(title));
    }
  }, [title, slugManual]);

  // Read image dimensions from a File object before or after upload
  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> =>
    new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
        URL.revokeObjectURL(url);
      };
      img.onerror = () => {
        resolve({ width: 0, height: 0 });
        URL.revokeObjectURL(url);
      };
      img.src = url;
    });

  // Image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      // Read dimensions locally before uploading (no extra network request)
      const { width, height } = await getImageDimensions(file);

      const res = await fetch("/api/admin/blog/upload-url", {
        method: "POST",
        headers: csrfHeaders(),
        credentials: "include",
      });
      if (!res.ok) throw new Error("No se pudo obtener URL de subida");
      const { uploadUrl, internalPath } = await res.json();
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!putRes.ok) throw new Error("Error al subir imagen");
      setImageUrl(internalPath);
      setImageWidth(width || null);
      setImageHeight(height || null);
    } catch (err: any) {
      alert("Error al subir imagen: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const body = { title, slug, excerpt, content, imageUrl, imageWidth, imageHeight, published };
      const url = isNew ? "/api/admin/blog" : `/api/admin/blog/${editId}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: csrfHeaders("application/json"),
        body: JSON.stringify(body),
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Error al guardar");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      setLocation("/admin/blog");
    },
    onError: (err: any) => setSaveError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError("");
    if (!title.trim()) return setSaveError("El título es obligatorio.");
    if (!slug.trim()) return setSaveError("El slug es obligatorio.");
    if (!excerpt.trim()) return setSaveError("El extracto es obligatorio.");
    if (!content.trim()) return setSaveError("El contenido es obligatorio.");
    saveMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center gap-4">
        <button onClick={() => setLocation("/admin/blog")} className="text-gray-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">
          {isNew ? "Nuevo Artículo" : "Editar Artículo"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Título *</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Cómo regularizar tu vivienda en Chile"
            className="text-lg"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Slug (URL) *
            <span className="text-xs font-normal text-gray-400 ml-2">
              /blog/<strong>{slug || "tu-articulo"}</strong>
            </span>
          </label>
          <Input
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }}
            placeholder="como-regularizar-tu-vivienda"
            required
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Extracto / Descripción corta *</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Resumen del artículo (aparece en la lista del blog y redes sociales)"
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent resize-none"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Contenido *</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe el contenido completo del artículo aquí..."
            rows={18}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent resize-y font-mono"
            required
          />
          <p className="text-xs text-gray-400 mt-1">El salto de línea se respeta en la vista pública.</p>
        </div>

        {/* Cover image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Imagen de portada</label>
          <div className="flex items-start gap-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Portada"
                className="w-32 h-24 object-cover rounded-lg border border-gray-200"
              />
            ) : (
              <div className="w-32 h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-300" />
              </div>
            )}
            <div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                  {uploading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Subiendo...</>
                  ) : (
                    <><Upload className="w-4 h-4" /> Subir imagen</>
                  )}
                </div>
              </label>
              {imageUrl && (
                <button
                  type="button"
                  onClick={() => { setImageUrl(null); setImageWidth(null); setImageHeight(null); }}
                  className="block mt-2 text-xs text-red-400 hover:text-red-600"
                >
                  Eliminar imagen
                </button>
              )}
              <p className="text-xs text-gray-400 mt-2">PNG, JPG o WebP. Recomendado: 1200×630px.</p>
            </div>
          </div>
        </div>

        {/* Published toggle */}
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 accent-[#f97316]"
          />
          <label htmlFor="published" className="text-sm font-semibold text-gray-700 cursor-pointer">
            Publicar artículo
            <span className="block text-xs font-normal text-gray-400">
              Si está desmarcado, se guarda como borrador y no aparece en el blog público.
            </span>
          </label>
        </div>

        {saveError && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">{saveError}</p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            disabled={saveMutation.isPending || uploading}
            className="bg-[#f97316] hover:bg-orange-600 text-white px-8"
          >
            {saveMutation.isPending ? (
              <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Guardando...</>
            ) : (
              isNew ? "Crear Artículo" : "Guardar Cambios"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setLocation("/admin/blog")}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
