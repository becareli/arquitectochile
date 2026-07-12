import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";

const ADMIN_PASSWORD = "1Lm2ndr1";
const STORAGE_KEY = "admin_auth";

function isAdminAuthenticated(): boolean {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return false;
    const parsed = JSON.parse(data);
    // Expira después de 8 horas
    const expiresAt = parsed.timestamp + 8 * 60 * 60 * 1000;
    if (Date.now() > expiresAt) {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }
    return parsed.authenticated === true;
  } catch {
    return false;
  }
}

function setAdminAuthenticated() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ authenticated: true, timestamp: Date.now() }));
}

export function logoutAdmin() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = "/";
}

interface AdminGateProps {
  children: React.ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setAuthenticated(isAdminAuthenticated());
    setChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password === ADMIN_PASSWORD) {
      setAdminAuthenticated();
      setAuthenticated(true);
    } else {
      setError("Contraseña incorrecta. Intente nuevamente.");
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Verificando acceso...</div>
      </div>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-[#f97316]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-[#f97316]" />
            </div>
            <h1 className="text-2xl font-bold text-[#0f172a]">Acceso Privado</h1>
            <p className="text-sm text-gray-500 mt-2">
              Panel de administración de ArquitectoChile
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-semibold"
            >
              Ingresar al Panel
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              ← Volver al sitio público
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
