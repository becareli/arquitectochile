import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { csrfHeaders } from "@/lib/csrf";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  createdAt: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-CL", {
    year: "numeric", month: "short", day: "numeric",
  });
}

export default function AdminBlog() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Admin Blog — ArquitectoChile";
  }, []);

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog"],
    queryFn: async () => {
      const res = await fetch("/api/admin/blog");
      if (!res.ok) throw new Error("Error cargando posts");
      return res.json();
    },
  });

  const togglePublish = useMutation({
    mutationFn: async ({ id, published }: { id: number; published: boolean }) => {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PUT",
        headers: csrfHeaders("application/json"),
        body: JSON.stringify({ published }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error actualizando");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] }),
  });

  const deletePost = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
        headers: csrfHeaders(),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error eliminando");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] }),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLocation("/admin")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Gestión de Blog</h1>
        </div>
        <Button
          onClick={() => setLocation("/admin/blog/new")}
          className="bg-[#f97316] hover:bg-orange-600 text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          Nuevo Artículo
        </Button>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {isLoading && (
          <div className="text-center py-20 text-gray-400">Cargando artículos...</div>
        )}

        {!isLoading && posts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <p className="text-xl font-semibold text-gray-700 mb-2">Sin artículos aún</p>
            <p className="text-gray-400 mb-6">Crea el primer artículo para el blog.</p>
            <Button
              onClick={() => setLocation("/admin/blog/new")}
              className="bg-[#f97316] hover:bg-orange-600 text-white gap-2"
            >
              <Plus className="w-4 h-4" /> Nuevo Artículo
            </Button>
          </div>
        )}

        {!isLoading && posts.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-500">Título</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-500 hidden sm:table-cell">Fecha</th>
                  <th className="text-center px-6 py-3 text-sm font-semibold text-gray-500">Estado</th>
                  <th className="text-right px-6 py-3 text-sm font-semibold text-gray-500">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#0f172a] text-sm">{post.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">/blog/{post.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                      {formatDate(post.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        className={post.published
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-gray-100 text-gray-500 border-gray-200"
                        }
                      >
                        {post.published ? "Publicado" : "Borrador"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => togglePublish.mutate({ id: post.id, published: !post.published })}
                          title={post.published ? "Despublicar" : "Publicar"}
                          className="p-1.5 text-gray-400 hover:text-[#f97316] transition-colors"
                        >
                          {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setLocation(`/admin/blog/${post.id}/edit`)}
                          title="Editar"
                          className="p-1.5 text-gray-400 hover:text-[#0f172a] transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Eliminar "${post.title}"?`)) {
                              deletePost.mutate(post.id);
                            }
                          }}
                          title="Eliminar"
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
