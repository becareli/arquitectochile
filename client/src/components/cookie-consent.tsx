import { useState, useEffect } from "react";
import { CONSENT_EVENT } from "@/lib/analytics";

// El sitio solo usa cookies necesarias y Google Analytics (medición).
// No hay píxel de Meta ni Google Ads instalados: si se agregan, sumar su categoría aquí.
export const OPEN_COOKIE_SETTINGS_EVENT = "open-cookie-settings";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const REJECTED: CookiePreferences = { necessary: true, analytics: false, marketing: false, preferences: false };
const ACCEPTED: CookiePreferences = { necessary: true, analytics: true, marketing: false, preferences: false };

const btn = "h-10 px-4 rounded-lg text-sm font-semibold transition-colors";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const saved = localStorage.getItem("cookieConsent");
    if (!saved) {
      timer = setTimeout(() => setOpen(true), 1500);
    } else {
      try { setAnalytics(!!JSON.parse(saved).analytics); } catch { /* usa valores por defecto */ }
    }
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    };
  }, []);

  const save = (prefs: CookiePreferences) => {
    localStorage.setItem("cookieConsent", JSON.stringify(prefs));
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setAnalytics(prefs.analytics);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-[#E3E8EE] bg-white p-4 sm:p-5 shadow-2xl text-left">
        <p className="text-sm leading-relaxed text-[#263238]">
          Usamos cookies necesarias para que el sitio funcione y, solo si usted lo permite, Google Analytics para
          saber qué páginas se visitan y mejorar el sitio. No usamos cookies de publicidad.{" "}
          <a href="/politica-cookies" className="underline text-[#C2410C]">Más información</a>
        </p>
        <label className="mt-3 flex items-center gap-2 text-sm text-[#263238]">
          <input
            type="checkbox"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
            className="h-4 w-4 accent-[#F97015]"
          />
          Permitir cookies de medición (Google Analytics)
        </label>
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => save(ACCEPTED)}
            className={`${btn} bg-[#F97015] text-[#1D2530] hover:bg-[#e8630d]`}
          >
            Aceptar
          </button>
          <button
            onClick={() => save(REJECTED)}
            className={`${btn} border border-[#1D2530] text-[#1D2530] bg-white hover:bg-[#F4F7FA]`}
          >
            Rechazar
          </button>
          <button
            onClick={() => save({ ...REJECTED, analytics })}
            className={`${btn} text-[#1D2530] hover:bg-[#F4F7FA] sm:ml-auto`}
          >
            Guardar mi elección
          </button>
        </div>
      </div>
    </div>
  );
}
