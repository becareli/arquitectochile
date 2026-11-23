// Datos de contacto del sitio en UN solo lugar.
// Para cambiar al número de la empresa (+56 9 5028 6387), basta con editar este archivo.

export const CONTACT = {
  phoneDisplay: "+56 9 7931 6827",
  phoneE164: "+56979316827", // para enlaces tel:
  whatsappNumber: "56979316827", // para enlaces wa.me (sin + ni espacios)
  email: "contacto@arquitectochile.com",
} as const;

export function whatsappLink(message = "Hola Patricio, vengo desde arquitectochile.com y quiero hacer una consulta.") {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// ID de medición de Google Analytics 4 (propiedad "Pagina ArquitectoChile").
export const GA_MEASUREMENT_ID = "G-25B82C475Z";
