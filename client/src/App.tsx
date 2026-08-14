import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import AdminDashboard from "@/pages/admin-dashboard";
import CRMDashboard from "@/pages/crm-dashboard";
import CRMAdminDashboardNew from "@/pages/crm-admin-dashboard-new";
import ClientPortal from "@/pages/client-portal";
import ServiciosADomicilio from "@/pages/servicios-a-domicilio";
import Colaboradores from "@/pages/colaboradores";
import ColaboradorProfile from "@/pages/colaborador-profile";
import PortalClienteLogin from "@/pages/portal-cliente-login";
import PortalClienteDemo from "@/pages/portal-cliente-demo";
import RevisorIndependienteDeArquitectura from "@/pages/revisor-independiente-de-arquitectura";
import DisenemosNuevosEspacios from "@/pages/disenemos-tus-nuevos-espacios";
import FusionTerrenosUrbanos from "@/pages/fusion-terrenos-urbanos";
import InspeccionTecnicaViviendas from "@/pages/inspeccion-tecnica-viviendas";
import TasacionViviendasUrbanas from "@/pages/tasacion-viviendas-urbanas";
import SubdivisionTerrenosUrbanos from "@/pages/subdivision-terrenos-urbanos";
import ReacondicionamientoTermicoViviendas from "@/pages/reacondicionamiento-termico-viviendas";
import RegularizacionViviendasLaFlorida from "@/pages/regularizacion-viviendas-la-florida";
import SistemaEIFS from "@/pages/sistema-eifs";
import PermisoEdificacionRecepcionFinal from "@/pages/permiso-edificacion-recepcion-final";
import CalculadoraCostos from "@/pages/calculadora-costos";
import Revista from "@/pages/revista";
import AvisoLegal from "@/pages/aviso-legal";
import PoliticaPrivacidad from "@/pages/politica-privacidad";
import PoliticaCookies from "@/pages/politica-cookies";
import Gracias from "@/pages/gracias";
import AsesoriaArquitectonicaTerreno from "@/pages/asesoria-arquitectonica-terreno";
import RegularizacionInmuebles from "@/pages/regularizacion-inmuebles";
import Contacto from "@/pages/contacto";
import ObrasMenoresEmpresas from "@/pages/obras-menores-empresas";
import CasosDeExito from "@/pages/casos-de-exito";
import NotFound from "@/pages/not-found";
import CookieConsent from "@/components/cookie-consent";
import AdminGate from "@/components/AdminGate";
import FormPage from "@/pages/formulario-page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin">
        {() => (
          <AdminGate>
            <AdminDashboard />
          </AdminGate>
        )}
      </Route>
      <Route path="/crm">
        {() => (
          <AdminGate>
            <CRMDashboard />
          </AdminGate>
        )}
      </Route>
      <Route path="/crm-admin">
        {() => (
          <AdminGate>
            <CRMAdminDashboardNew />
          </AdminGate>
        )}
      </Route>
      <Route path="/crm-admin-dashboard">
        {() => (
          <AdminGate>
            <CRMAdminDashboardNew />
          </AdminGate>
        )}
      </Route>
      <Route path="/portal-cliente" component={ClientPortal} />
      <Route path="/servicios-a-domicilio" component={ServiciosADomicilio} />
      <Route path="/asesoria-arquitectonica-terreno" component={AsesoriaArquitectonicaTerreno} />
      <Route path="/regularizacion-inmuebles" component={RegularizacionInmuebles} />
      <Route path="/colaboradores" component={Colaboradores} />
      <Route path="/colaboradores/:slug" component={ColaboradorProfile} />
      <Route path="/portal-cliente/login" component={PortalClienteLogin} />
      <Route path="/portal-cliente/demo" component={PortalClienteDemo} />
      <Route path="/revisor-independiente-de-arquitectura" component={RevisorIndependienteDeArquitectura} />
      <Route path="/disenemos-tus-nuevos-espacios" component={DisenemosNuevosEspacios} />
      <Route path="/fusion-terrenos-urbanos" component={FusionTerrenosUrbanos} />
      <Route path="/inspeccion-tecnica-viviendas" component={InspeccionTecnicaViviendas} />
      <Route path="/tasacion-viviendas-urbanas" component={TasacionViviendasUrbanas} />
      <Route path="/subdivision-terrenos-urbanos" component={SubdivisionTerrenosUrbanos} />
      <Route path="/reacondicionamiento-termico-viviendas" component={ReacondicionamientoTermicoViviendas} />
      <Route path="/regularizacion-viviendas-la-florida" component={RegularizacionViviendasLaFlorida} />
      <Route path="/sistema-eifs" component={SistemaEIFS} />
      <Route path="/permiso-edificacion-recepcion-final" component={PermisoEdificacionRecepcionFinal} />
      <Route path="/calculadora-costos" component={CalculadoraCostos} />
      <Route path="/revista" component={Revista} />
      <Route path="/aviso-legal" component={AvisoLegal} />
      <Route path="/politica-privacidad" component={PoliticaPrivacidad} />
      <Route path="/politica-cookies" component={PoliticaCookies} />
      <Route path="/gracias" component={Gracias} />
      <Route path="/contacto" component={Contacto} />
      <Route path="/obras-menores-empresas" component={ObrasMenoresEmpresas} />
      <Route path="/casos-de-exito" component={CasosDeExito} />
      <Route path="/formulario/colaboradores">
        {() => <FormPage src="https://share.forms.app/becareligroup/registro-de-colaboradores-arquitectochilecom" title="Postulación a la Red de Colaboradores" />}
      </Route>
      <Route path="/formulario/asesoria-domicilio">
        {() => <FormPage src="https://share.forms.app/patriciobecarelissegaray/formulario-de-contacto-1" title="Solicitud de Asesoría Arquitectónica a Domicilio" />}
      </Route>
      <Route path="/formulario/diseno-arquitectura">
        {() => <FormPage src="https://share.forms.app/patriciobecarelissegaray/formulario-de-calificacion-arquitecto-patricio-becar-elissegaray" title="Formulario de Diseño de Arquitectura" />}
      </Route>
      <Route path="/formulario/regularizacion">
        {() => <FormPage src="https://share.forms.app/patriciobecarelissegaray/formulario-de-contacto" title="Solicitud de Regularización de Inmuebles" />}
      </Route>
      <Route path="/formulario/revisor-independiente">
        {() => <FormPage src="https://share.forms.app/patriciobecarelissegaray/solicitud-de-presupuesto-para-revision-independiente-ley-20016" title="Solicitud de Revisión Independiente de Arquitectura" />}
      </Route>
      <Route path="/formulario/contacto">
        {() => <FormPage src="https://share.forms.app/becareligroup/formulario-de-calificacion-profesional-arquitectochilecom" title="Contacto General — ArquitectoChile.com" />}
      </Route>
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
