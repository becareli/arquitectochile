// Medición con Google Analytics 4, cargada SOLO si el visitante acepta las cookies de análisis.
//
// Cómo funciona (analogía de obra): el medidor (gtag.js) no se instala hasta que el
// dueño de casa (el visitante) da permiso. Mientras no haya permiso, los eventos se descartan.

import { GA_MEASUREMENT_ID } from "@/lib/site-config";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "cookieConsent";
export const CONSENT_EVENT = "cookie-consent-updated";

let loaded = false;

function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? Boolean(JSON.parse(raw)?.analytics) : false;
  } catch {
    return false;
  }
}

function loadGoogleAnalytics() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag necesita recibir el objeto "arguments" tal cual.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
}

/** Registra un evento (p. ej. "generate_lead", "click_whatsapp"). Sin permiso, no hace nada. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !loaded || !window.gtag) return;
  window.gtag("event", name, params);
}

// Clasifica los clics en enlaces de contacto para no tener que marcarlos uno por uno.
function onDocumentClick(e: MouseEvent) {
  const link = (e.target as HTMLElement | null)?.closest?.("a") as HTMLAnchorElement | null;
  if (!link?.href) return;
  const href = link.href;
  const where = window.location.pathname;

  if (href.includes("wa.me/")) trackEvent("click_whatsapp", { page: where });
  else if (href.startsWith("tel:")) trackEvent("click_llamar", { page: where });
  else if (href.startsWith("mailto:")) trackEvent("click_correo", { page: where });
  else if (href.includes("arquitectochile.cl/ebook")) trackEvent("click_ebook", { page: where });
  else if (href.includes("forms.app")) trackEvent("click_formulario_externo", { page: where });
}

/** Se llama una vez al iniciar la app (solo en el navegador). */
export function initAnalytics() {
  if (typeof window === "undefined") return;
  if (hasAnalyticsConsent()) loadGoogleAnalytics();
  window.addEventListener(CONSENT_EVENT, () => {
    if (hasAnalyticsConsent()) loadGoogleAnalytics();
  });
  document.addEventListener("click", onDocumentClick, { capture: true });
}
