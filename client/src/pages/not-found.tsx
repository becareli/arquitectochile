import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export default function NotFound() {
  useSEO({
    title: "Página no Encontrada | ArquitectoChile.com",
    description: "La página que buscas no existe o fue movida. Vuelve al inicio de ArquitectoChile.com para encontrar lo que necesitas.",
    noindex: true,
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-[#f97316]" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
