import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Settings, Cookie } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
  preferences: false,
};

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(cookieConsent);
        setPreferences(savedPreferences);
      } catch {
        // If parsing fails, use defaults
        setPreferences(defaultPreferences);
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptNecessaryOnly = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(defaultPreferences));
    setPreferences(defaultPreferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveCustomPreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'necessary') return; // Necessary cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <Card className="mx-auto max-w-4xl shadow-xl border-2">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  Este sitio web utiliza cookies
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Utilizamos cookies para mejorar su experiencia, analizar el tráfico del sitio y personalizar el contenido. 
                  Al hacer clic en "Aceptar todas", acepta el uso de todas las cookies. También puede personalizar sus 
                  preferencias o rechazar las cookies opcionales.
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Para más información, consulte nuestra{" "}
                  <a href="/politica-cookies" className="text-primary hover:underline">
                    Política de Cookies
                  </a>{" "}
                  y{" "}
                  <a href="/politica-privacidad" className="text-primary hover:underline">
                    Política de Privacidad
                  </a>.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Button onClick={acceptAll} className="bg-primary text-white hover:bg-primary/90">
                    Aceptar Todas
                  </Button>
                  <Button onClick={acceptNecessaryOnly} variant="outline">
                    Solo Necesarias
                  </Button>
                  <Button onClick={openSettings} variant="outline" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Personalizar
                  </Button>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={acceptNecessaryOnly}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración de Cookies
            </DialogTitle>
            <DialogDescription>
              Personalice qué tipos de cookies desea permitir. Las cookies necesarias no se pueden desactivar.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Cookies Necesarias</Label>
                  <p className="text-sm text-gray-600">
                    Estas cookies son esenciales para el funcionamiento básico del sitio web y no se pueden desactivar.
                  </p>
                </div>
                <Switch 
                  checked={preferences.necessary} 
                  disabled={true}
                  className="opacity-50"
                />
              </div>
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                <strong>Incluye:</strong> Gestión de sesiones, configuración de idioma, funcionalidad de formularios
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Cookies Analíticas</Label>
                  <p className="text-sm text-gray-600">
                    Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.
                  </p>
                </div>
                <Switch 
                  checked={preferences.analytics}
                  onCheckedChange={(checked) => updatePreference('analytics', checked)}
                />
              </div>
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                <strong>Incluye:</strong> Google Analytics, estadísticas de uso, rendimiento del sitio
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Cookies de Marketing</Label>
                  <p className="text-sm text-gray-600">
                    Se utilizan para mostrar anuncios relevantes y medir la efectividad de las campañas.
                  </p>
                </div>
                <Switch 
                  checked={preferences.marketing}
                  onCheckedChange={(checked) => updatePreference('marketing', checked)}
                />
              </div>
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                <strong>Incluye:</strong> Facebook Pixel, Google Ads, remarketing
              </div>
            </div>

            {/* Preference Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Cookies de Preferencias</Label>
                  <p className="text-sm text-gray-600">
                    Permiten recordar sus configuraciones y personalizar su experiencia.
                  </p>
                </div>
                <Switch 
                  checked={preferences.preferences}
                  onCheckedChange={(checked) => updatePreference('preferences', checked)}
                />
              </div>
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                <strong>Incluye:</strong> Preferencias de visualización, configuraciones personalizadas, ubicación
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button onClick={acceptAll} className="flex-1">
              Aceptar Todas
            </Button>
            <Button onClick={saveCustomPreferences} variant="outline" className="flex-1">
              Guardar Configuración
            </Button>
            <Button onClick={acceptNecessaryOnly} variant="outline" className="flex-1">
              Solo Necesarias
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 text-center pt-2">
            Puede cambiar estas configuraciones en cualquier momento visitando nuestra{" "}
            <a href="/politica-cookies" className="text-primary hover:underline">
              Política de Cookies
            </a>.
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}