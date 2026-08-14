import FormPage from "@/pages/formulario-page";
import { useSEO } from "@/hooks/useSEO";

export default function Contacto() {
  useSEO({
    title: "Contacto | Agenda tu Asesoría - ArquitectoChile.com",
    description: "Contacta al arquitecto Patricio Becar Elissegaray en Santiago. Agenda tu asesoría en diseño, regularización, permisos o inspección técnica en Chile.",
    path: "/contacto",
  });

  return (
    <FormPage
      src="https://share.forms.app/becareligroup/formulario-de-calificacion-profesional-arquitectochilecom"
      title="Contacto General — ArquitectoChile.com"
    />
  );
}
