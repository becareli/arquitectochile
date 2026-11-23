// Vercel Function: autoriza la subida de adjuntos del formulario de contacto a Vercel Blob.
// El navegador sube el archivo directo a Blob (sin pasar por aquí), así no hay límite de 4,5 MB.
// Requiere el almacenamiento "Blob" conectado al proyecto en Vercel (crea BLOB_READ_WRITE_TOKEN solo).
import { handleUpload } from "@vercel/blob/client";

const MAX_BYTES = 15 * 1024 * 1024;
const TIPOS = ["application/pdf", "image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("contacto/")) throw new Error("Ruta no permitida");
        return {
          allowedContentTypes: TIPOS,
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });
    return res.status(200).json(json);
  } catch (err) {
    console.error("upload error:", err?.message);
    return res.status(400).json({ error: "No se pudo autorizar la subida" });
  }
}
