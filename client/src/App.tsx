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
import NotFound from "@/pages/not-found";

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
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
