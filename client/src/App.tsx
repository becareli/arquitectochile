import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import AdminDashboard from "@/pages/admin-dashboard";
import ClientPortal from "@/pages/client-portal";
import ServiciosADomicilio from "@/pages/servicios-a-domicilio";
import Colaboradores from "@/pages/colaboradores";
import RevisorIndependienteDeArquitectura from "@/pages/revisor-independiente-de-arquitectura";
import DisenemosNuevosEspacios from "@/pages/disenemos-tus-nuevos-espacios";
import FusionTerrenosUrbanos from "@/pages/fusion-terrenos-urbanos";
import InspeccionTecnicaViviendas from "@/pages/inspeccion-tecnica-viviendas";
import TasacionViviendasUrbanas from "@/pages/tasacion-viviendas-urbanas";
import SubdivisionTerrenosUrbanos from "@/pages/subdivision-terrenos-urbanos";
import ReacondicionamientoTermicoViviendas from "@/pages/reacondicionamiento-termico-viviendas";
import CalculadoraCostos from "@/pages/calculadora-costos";
import AvisoLegal from "@/pages/aviso-legal";
import PoliticaPrivacidad from "@/pages/politica-privacidad";
import PoliticaCookies from "@/pages/politica-cookies";
import NotFound from "@/pages/not-found";
import CookieConsent from "@/components/cookie-consent";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/portal-cliente" component={ClientPortal} />
      <Route path="/servicios-a-domicilio" component={ServiciosADomicilio} />
      <Route path="/colaboradores" component={Colaboradores} />
      <Route path="/revisor-independiente-de-arquitectura" component={RevisorIndependienteDeArquitectura} />
      <Route path="/disenemos-tus-nuevos-espacios" component={DisenemosNuevosEspacios} />
      <Route path="/fusion-terrenos-urbanos" component={FusionTerrenosUrbanos} />
      <Route path="/inspeccion-tecnica-viviendas" component={InspeccionTecnicaViviendas} />
      <Route path="/tasacion-viviendas-urbanas" component={TasacionViviendasUrbanas} />
      <Route path="/subdivision-terrenos-urbanos" component={SubdivisionTerrenosUrbanos} />
      <Route path="/reacondicionamiento-termico-viviendas" component={ReacondicionamientoTermicoViviendas} />
      <Route path="/calculadora-costos" component={CalculadoraCostos} />
      <Route path="/aviso-legal" component={AvisoLegal} />
      <Route path="/politica-privacidad" component={PoliticaPrivacidad} />
      <Route path="/politica-cookies" component={PoliticaCookies} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <CookieConsent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
