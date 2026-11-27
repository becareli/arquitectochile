import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useSEO } from "@/hooks/useSEO";
import { getRouteSeoFallback } from "@/lib/route-seo";
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
import PortalClienteAcceso from "@/pages/portal-cliente-acceso";
import PortalClienteMiProyecto from "@/pages/portal-cliente-mi-proyecto";
import PortalClienteBienvenida from "@/pages/portal-cliente-bienvenida";
import Oficina from "@/pages/oficina";
import OficinaAcceso from "@/pages/oficina-acceso";
import Recomendado from "@/pages/recomendado";
import AdminPortal from "@/pages/admin-portal";
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
import AntesDeConstruir, { AntesDeConstruirAgenda } from "@/pages/antes-de-construir";
import NotFound from "@/pages/not-found";
import CookieConsent from "@/components/cookie-consent";
import FloatingContact from "@/components/floating-contact";
import { initAnalytics } from "@/lib/analytics";

// Medición: se activa solo en el navegador y solo con permiso de cookies.
if (typeof window !== "undefined") initAnalytics();
import AdminGate from "@/components/AdminGate";
import FormularioServicio from "@/pages/formulario-servicio";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import AdminBlog from "@/pages/admin-blog";
import AdminBlogEditor from "@/pages/admin-blog-editor";

function RouteMetadataContent({ options }: { options: NonNullable<ReturnType<typeof getRouteSeoFallback>> }) {
  useSEO(options);
  return null;
}

function RouteMetadata() {
  const [location] = useLocation();
  const fallback = getRouteSeoFallback(location);
  return fallback ? <RouteMetadataContent options={fallback} /> : null;
}

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
      <Route path="/portal-cliente/acceso" component={PortalClienteAcceso} />
      <Route path="/portal-cliente/mi-proyecto" component={PortalClienteMiProyecto} />
      <Route path="/portal-cliente/bienvenida" component={PortalClienteBienvenida} />
      <Route path="/oficina" component={Oficina} />
      <Route path="/oficina/acceso" component={OficinaAcceso} />
      <Route path="/recomendado/:code" component={Recomendado} />
      <Route path="/admin/portal">
        {() => (
          <AdminGate>
            <AdminPortal />
          </AdminGate>
        )}
      </Route>
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
      <Route path="/antes-de-construir" component={AntesDeConstruir} />
      <Route path="/antes-de-construir/agenda" component={AntesDeConstruirAgenda} />
      <Route path="/formulario/colaboradores">
        {() => <FormularioServicio clave="colaboradores" />}
      </Route>
      <Route path="/formulario/asesoria-domicilio">
        {() => <FormularioServicio clave="asesoria-domicilio" />}
      </Route>
      <Route path="/formulario/diseno-arquitectura">
        {() => <FormularioServicio clave="diseno-arquitectura" />}
      </Route>
      <Route path="/formulario/regularizacion">
        {() => <FormularioServicio clave="regularizacion" />}
      </Route>
      <Route path="/formulario/revisor-independiente">
        {() => <FormularioServicio clave="revisor-independiente" />}
      </Route>
      <Route path="/formulario/contacto">
        {() => <Redirect to="/contacto" />}
      </Route>
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/admin/blog/new">
        {() => (
          <AdminGate>
            <AdminBlogEditor />
          </AdminGate>
        )}
      </Route>
      <Route path="/admin/blog/:id/edit">
        {() => (
          <AdminGate>
            <AdminBlogEditor />
          </AdminGate>
        )}
      </Route>
      <Route path="/admin/blog">
        {() => (
          <AdminGate>
            <AdminBlog />
          </AdminGate>
        )}
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
        <RouteMetadata />
        <Router />
        <FloatingContact />
        <CookieConsent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
