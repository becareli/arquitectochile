import { Phone } from "lucide-react";
import { useLocation } from "wouter";
import { CONTACT, whatsappLink } from "@/lib/site-config";

// Botones fijos de contacto: WhatsApp (siempre) y Llamar (solo en celular).
// Quedan abajo a la derecha, visibles en cualquier página pública.

const HIDDEN_PREFIXES = ["/admin", "/crm", "/portal-cliente", "/formulario", "/antes-de-construir"];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="w-7 h-7 fill-current">
      <path d="M16.04 3C9.4 3 4 8.33 4 14.9c0 2.3.67 4.45 1.83 6.27L4 29l8.06-1.8a12.2 12.2 0 0 0 3.98.66C22.67 27.86 28 22.53 28 15.96 28 9.4 22.67 3 16.04 3Zm0 22.6c-1.3 0-2.58-.24-3.78-.7l-.46-.17-4.78 1.07 1.1-4.6-.3-.48a9.7 9.7 0 0 1-1.6-5.33c0-5.38 4.37-9.76 9.8-9.76 5.4 0 9.78 4.38 9.78 9.9 0 5.43-4.38 10.07-9.76 10.07Zm5.37-7.3c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.91-2.2-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.45 1.06 2.86 1.21 3.06.15.2 2.09 3.2 5.07 4.48.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

export default function FloatingContact() {
  const [location] = useLocation();
  if (HIDDEN_PREFIXES.some((p) => location.startsWith(p))) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 print:hidden">
      <a
        href={`tel:${CONTACT.phoneE164}`}
        aria-label={`Llamar al ${CONTACT.phoneDisplay}`}
        className="sm:hidden flex items-center justify-center w-12 h-12 rounded-full bg-[#0f172a] text-white shadow-lg"
      >
        <Phone className="w-5 h-5" strokeWidth={2} />
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
