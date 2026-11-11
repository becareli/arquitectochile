import { useLocation } from "wouter";
import {
  Award,
  Building2,
  CalendarDays,
  Check,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import Chatbot from "@/components/chatbot";
import { useSEO } from "@/hooks/useSEO";
import arquitectoPhoto from "@assets/1651766771115_1753490676082.jpeg";

const faqItems = [
  {
    question: "¿Qué es un revisor independiente de arquitectura?",
    answer:
      "Es un profesional inscrito en el Registro Nacional de Revisores Independientes del MINVU (Ley 20.071) que verifica e informa a la DOM que el proyecto y sus obras cumplen las normas urbanísticas y de construcción aplicables.",
  },
  {
    question: "¿Cuándo es obligatorio contratar un revisor independiente?",
    answer:
      "Según el artículo 116 bis de la LGUC, es obligatorio en edificios de uso público. En los demás casos es voluntario, pero trae beneficios concretos en plazo y derechos municipales.",
  },
  {
    question: "¿Qué beneficios tiene presentar informe favorable de revisor independiente?",
    answer:
      "Con la Ley 21.826 (junio de 2026), la DOM debe pronunciarse en 15 días hábiles en vez de 25, y los derechos municipales se reducen en 30%. Pero el beneficio de fondo es otro: ingresar un expediente que ya fue revisado con criterio de DOM.",
  },
  {
    question: "¿El revisor independiente es responsable del proyecto?",
    answer:
      "Sí. Desde la Ley 21.718, el revisor independiente es solidariamente responsable con el arquitecto de que el proyecto y sus obras cumplan las normas aplicables. Por eso la calidad de la revisión importa tanto.",
  },
  {
    question: "¿Qué proyectos puede revisar un revisor de Tercera Categoría?",
    answer:
      "Proyectos y obras cuya superficie total construida no supere los 2.500 m² (artículo 4° de la Ley 20.071).",
  },
  {
    question: "¿Cuánto cobra un revisor independiente?",
    answer:
      "Depende de la superficie, el destino y el estado del expediente. Envíeme su expediente y le cotizo dentro de 48 horas hábiles.",
  },
  {
    question: "¿El informe sirve también para la recepción definitiva?",
    answer:
      "Sí. La participación del revisor independiente cubre el permiso y la recepción definitiva de las obras.",
  },
  {
    question: "¿En qué comunas trabaja?",
    answer: "En todas las comunas de la Región Metropolitana.",
  },
  {
    question: "¿Qué pasa si mi expediente vence?",
    answer:
      "Los reingresos están incluidos mientras el expediente se mantenga vigente. Si vence por falta de respuesta, una nueva revisión se cotiza aparte.",
  },
];

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ArquitectoChile – Revisor Independiente de Arquitectura",
  url: "https://arquitectochile.com/revisor-independiente-de-arquitectura",
  telephone: "+56979316827",
  email: "contacto@arquitectochile.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Vicuña Mackenna Poniente 7735",
    addressLocality: "La Florida",
    addressRegion: "Región Metropolitana",
    addressCountry: "CL",
  },
  areaServed: "Región Metropolitana de Santiago",
  serviceType: "Revisor independiente de arquitectura",
  founder: {
    "@type": "Person",
    name: "Patricio Becar Elissegaray",
    jobTitle: "Arquitecto Revisor Independiente, Tercera Categoría, Rol MINVU 237",
    alumniOf: ["Universidad de Chile", "Universidad de los Andes"],
    sameAs: ["https://www.linkedin.com/in/patriciobecar/"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

const processSteps = [
  {
    title: "Estado de cada documento y lámina",
    description:
      "Una tabla con todo lo que exige el expediente y su estado: OK, pendiente o no aplica. Usted ve de un vistazo qué falta.",
    icon: ClipboardCheck,
  },
  {
    title: "Observaciones por prioridad",
    description:
      "C = crítica (puede mover el proyecto), A = alta (obligatoria para el permiso), M = media (forma o recomendación). Usted parte por lo que cambia superficies o emplazamiento, no por la ortografía.",
    icon: Award,
  },
  {
    title: "Qué, por qué y qué norma",
    description:
      "Cada observación indica qué corregir, por qué, y el artículo que lo exige: OGUC, LGUC, PRC, PRMS o circular DDU. Nada de «criterio del revisor».",
    icon: FileCheck2,
  },
  {
    title: "Cruce contra el CIP",
    description:
      "Reviso el proyecto contra el Certificado de Informaciones Previas vigente: zona, riesgos, afectaciones y roles.",
    icon: MapPin,
  },
  {
    title: "Carta de respuesta punto por punto",
    description:
      "Usted responde cada observación indicando la lámina corregida; yo reviso lo que cambió y cerramos.",
    icon: Check,
  },
  {
    title: "Informe Favorable",
    description: "En el formato oficial MINVU, cuando el expediente está realmente listo.",
    icon: ShieldCheck,
  },
];

const includedItems = [
  ["Revisión integral del expediente: documentos, planimetría y especificaciones técnicas", "Nada queda sin mirar antes de la DOM"],
  ["Cruce contra CIP, OGUC, LGUC, PRC, PRMS y circulares DDU vigentes", "Respaldo normativo en cada punto"],
  ["Informe de observaciones con prioridad C/A/M y norma citada", "Usted sabe por dónde partir"],
  ["Tabla de estado de documentos y láminas", "Su checklist de ingreso, ya hecho"],
  ["Revisión de su carta de respuesta y reingresos", "Cierre ordenado, sin idas y vueltas"],
  ["Informe Favorable en el formato oficial MINVU", "Plazo de la DOM de 15 días hábiles y 30% menos de derechos municipales"],
  ["Acompañamiento si la DOM emite observaciones", "No queda solo frente a la DOM"],
  ["Informe favorable para la recepción definitiva", "La misma mirada desde el permiso hasta el final"],
];

const trustItems = [
  { label: "Arquitecto U. de Chile", icon: GraduationCap },
  { label: "Revisor Independiente MINVU, Rol 237", icon: ShieldCheck },
  { label: "Ex DOM de La Florida, Santiago y Peñalolén", icon: Building2 },
  { label: "25 años de ejercicio", icon: CalendarDays },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 text-3xl font-bold leading-tight text-[#0f172a] sm:text-4xl">
      {children}
    </h2>
  );
}

function ContactButton({ children = "Quiero que revisen mi expediente" }: { children?: React.ReactNode }) {
  const [, setLocation] = useLocation();
  return (
    <Button
      onClick={() => setLocation("/formulario/revisor-independiente")}
      className="min-h-12 bg-[#f97316] px-6 text-base font-bold text-white hover:bg-orange-600"
    >
      {children}
    </Button>
  );
}

export default function RevisorIndependienteDeArquitectura() {
  useSEO({
    title: "Revisor Independiente de Arquitectura en Santiago | Becar",
    description:
      "Arquitecto revisor independiente MINVU (Rol 237), con experiencia en tres DOM. Informes donde cada observación cita su norma. Pida su revisión.",
    path: "/revisor-independiente-de-arquitectura",
    jsonLd: [professionalServiceSchema, faqSchema],
  });

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navigation />

      <main>
        <section className="bg-[#0f172a] py-16 text-white sm:py-20">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <p className="mb-4 inline-flex rounded-full bg-[#f97316] px-4 py-2 text-sm font-bold">
              Para arquitectos que necesitan informe favorable de revisor independiente
            </p>
            <h1 className="mx-auto mb-6 max-w-5xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Revisor Independiente de Arquitectura para colegas que no quieren sorpresas en la DOM
            </h1>
            <p className="mx-auto mb-8 max-w-4xl text-lg leading-relaxed text-slate-200 sm:text-xl">
              Reviso su expediente como lo haría un revisor de la Dirección de Obras, porque lo fui en tres municipios. Cada observación le dice qué corregir, por qué y qué norma lo exige, para que su proyecto llegue a la DOM sin nada que observar.
            </p>
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ContactButton />
              <a
                href="#revision-trazable"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/50 px-6 font-semibold text-white transition hover:bg-white/10"
              >
                Ver cómo reviso
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-200">
              {trustItems.map(({ label, icon: Icon }) => (
                <span key={label} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#f97316]" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionTitle>Desde la Ley 21.718, su revisor independiente responde junto a usted</SectionTitle>
            <div className="space-y-5 text-lg leading-relaxed text-slate-700">
              <p>Estimado colega:</p>
              <p>
                Usted ya sabe lo que pasa cuando un expediente vuelve con observaciones. El cliente pregunta qué pasó. Usted corrige láminas que ya daba por cerradas. Y si el error era de fondo —un área de riesgo sin graficar, una carga de ocupación mal calculada, un rol que no calza con la escritura—, no basta con corregir un plano: hay que rehacer parte del proyecto.
              </p>
              <p>
                Lo que muchos colegas no han dimensionado es esto: la Ley 21.718 modificó el artículo 116 bis de la LGUC y hoy el revisor independiente es <strong>solidariamente responsable</strong> con el arquitecto de que el proyecto y sus obras cumplan todas las normas aplicables.
              </p>
              <p>En otras palabras, su revisor ya no es un trámite. Es la otra firma en su proyecto.</p>
              <p>
                Entonces la pregunta no es «¿quién me firma el informe?». La pregunta es:{" "}
                <strong>¿quién va a leer mi expediente completo, con el CIP en una mano y la OGUC en la otra, antes de que lo lea la DOM?</strong>
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionTitle>Por qué reviso como revisa la DOM</SectionTitle>
            <p className="mb-6 text-lg leading-relaxed text-slate-700">
              Antes de ser revisor independiente, trabajé del otro lado del mesón, en tres Direcciones de Obras de Santiago:
            </p>
            <ul className="mb-8 space-y-4 text-lg leading-relaxed text-slate-700">
              <li><strong>Municipalidad de La Florida (2002–2006):</strong> fiscalización de edificaciones y recepciones finales de conjuntos habitacionales, loteos y condominios.</li>
              <li><strong>Municipalidad de Santiago (2006–2008):</strong> Dirección de Obras, revisión de expedientes en una de las comunas con más tramitación del país.</li>
              <li><strong>Municipalidad de Peñalolén (2011–2013):</strong> revisor de proyectos en permisos de edificación, recepciones de urbanización y recepciones finales. Solo en el período que certifica la propia DOM (Certificado N° 589), participé en 24 expedientes que suman 65.503 m².</li>
            </ul>
            <p className="mb-5 text-lg leading-relaxed text-slate-700">
              Ahí aprendí algo que no se enseña en la universidad: <strong>los expedientes casi nunca se observan por falta de talento del arquitecto. Se observan por detalles.</strong> Un formulario con la dirección escrita distinta al CIP. Una superficie que no suma igual en el cuadro y en la lámina. Un documento que «se adjunta después».
            </p>
            <p className="mb-5 text-lg leading-relaxed text-slate-700">
              Desde el otro lado del mesón, esos detalles se ven al tiro. Desde el escritorio del proyectista, casi nunca.
            </p>
            <p className="text-lg leading-relaxed text-slate-700">
              Por eso, cuando en 2013 me inscribí en el Registro Nacional de Revisores Independientes del MINVU, me puse una regla: <strong>entregarles a mis colegas el informe que me habría gustado recibir cuando era revisor municipal.</strong>
            </p>
          </div>
        </section>

        <section id="revision-trazable" className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionTitle>La Revisión Trazable: cada observación con su norma</SectionTitle>
            <p className="mb-10 max-w-4xl text-lg text-slate-700">
              Mi informe no es una lista de «corregir lámina 3». Es una hoja de ruta para dejar su expediente sin observaciones:
            </p>
            <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {processSteps.map(({ title, description, icon: Icon }, index) => (
                <Card key={title} className="relative h-full border-slate-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0f172a] text-lg font-bold text-white">
                        {index + 1}
                      </span>
                      <Icon className="h-6 w-6 text-[#f97316]" aria-hidden="true" />
                    </div>
                    <CardTitle className="pt-3 text-lg text-[#0f172a]">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="leading-relaxed text-slate-600">{description}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionTitle>Lo que detecta una revisión a fondo</SectionTitle>
            <p className="mb-6 text-lg leading-relaxed text-slate-700">
              Un caso reciente: la revisión de un permiso de ampliación mayor a 100 m² en la Región Metropolitana. En la primera revisión detecté, entre otras cosas:
            </p>
            <ul className="mb-7 list-disc space-y-3 pl-6 text-lg leading-relaxed text-slate-700 marker:text-[#f97316]">
              <li>Un canal que atraviesa el predio en una zona que el CIP declara de riesgo por napa freática e inundación, sin el área de riesgo graficada en el emplazamiento.</li>
              <li>Dos roles de avalúo mezclados entre planos y documentos.</li>
              <li>Una superficie de ampliación declarada que no coincidía con la suma de los recintos.</li>
            </ul>
            <p className="text-lg leading-relaxed text-slate-700">
              Cualquiera de esos puntos, detectado por la DOM después del ingreso, significa observaciones y reingreso. Detectados antes, son solo correcciones.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div className="mx-auto w-full max-w-sm">
              <img
                src={arquitectoPhoto}
                alt="Patricio Becar, arquitecto revisor independiente"
                className="aspect-[4/5] w-full rounded-xl object-cover shadow-lg"
                loading="lazy"
              />
            </div>
            <div>
              <SectionTitle>Quién va a firmar junto a usted</SectionTitle>
              <p className="mb-5 text-xl font-bold text-[#0f172a]">Patricio Becar Elissegaray, arquitecto.</p>
              <ul className="mb-6 space-y-3 leading-relaxed text-slate-700">
                <li>Arquitecto titulado en la Universidad de Chile (1999), aprobado con distinción.</li>
                <li>Revisor Independiente inscrito en el Registro Nacional del MINVU desde 2013: Rol 237, Tercera Categoría, Región Metropolitana.</li>
                <li>Ex arquitecto de las Direcciones de Obras de La Florida, Santiago y Peñalolén.</li>
                <li>Curso de Tramitología de Permisos de Edificación, Centro de Estudios Territoriales, Universidad de los Andes (2024).</li>
                <li>MBA y 25 años de ejercicio en proyectos, permisos, tasaciones e inspección técnica de obras.</li>
              </ul>
              <a
                className="font-semibold text-[#c2410c] underline decoration-orange-300 underline-offset-4 hover:text-[#9a3412]"
                href="https://proveedorestecnicos.minvu.gob.cl/revisores-independientes-de-obras-de-construccion/"
                target="_blank"
                rel="noreferrer"
              >
                Verifique mi inscripción en el Registro de Revisores Independientes del MINVU →
              </a>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionTitle>Lo que incluye la revisión</SectionTitle>
            <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">
              <table className="w-full border-collapse text-left">
                <thead className="bg-[#0f172a] text-white">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Incluye</th>
                    <th className="px-6 py-4 font-semibold">Para qué le sirve</th>
                  </tr>
                </thead>
                <tbody>
                  {includedItems.map(([item, benefit]) => (
                    <tr key={item} className="border-t border-slate-200">
                      <td className="px-6 py-4">{item}</td>
                      <td className="px-6 py-4 text-slate-600">{benefit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-4 md:hidden">
              {includedItems.map(([item, benefit]) => (
                <Card key={item}>
                  <CardHeader><CardTitle className="text-base text-[#0f172a]">{item}</CardTitle></CardHeader>
                  <CardContent className="text-slate-600">{benefit}</CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-8 text-lg">
              <strong>Honorarios:</strong> Según superficie, destino y estado del expediente. Le envío una cotización dentro de 48 horas hábiles.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              El informe favorable reduce en 30% los derechos municipales del permiso. En muchos proyectos, ese ahorro cubre buena parte de la revisión.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Card className="border-l-4 border-l-[#f97316] shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl text-[#0f172a]">Mi compromiso con su expediente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg leading-relaxed text-slate-700">
                <p>
                  Reviso sus reingresos hasta emitir el Informe Favorable, sin cobro adicional, mientras el expediente se mantenga vigente. Si el expediente vence por falta de respuesta, una nueva revisión se cotiza aparte.
                </p>
                <p>La ley ya me hace responder junto a usted. Este compromiso es la forma práctica de asumirlo.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionTitle>¿Es para usted?</SectionTitle>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-t-4 border-t-emerald-600">
                <CardHeader><CardTitle className="text-2xl text-[#0f172a]">Sí, si…</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>Es arquitecto y necesita informe favorable para un permiso de edificación, ampliación o recepción definitiva.</li>
                    <li>Su proyecto es un edificio de uso público, donde el revisor independiente es obligatorio.</li>
                    <li>Quiere un revisor que lea, no uno que solo firme.</li>
                    <li>Su proyecto tiene hasta 2.500 m² de superficie total construida (límite de la Tercera Categoría, Ley 20.071).</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-t-4 border-t-[#f97316]">
                <CardHeader><CardTitle className="text-2xl text-[#0f172a]">No, si…</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>Solo busca a alguien que firme rápido sin revisar. La ley hoy me hace responsable junto a usted, y no firmo lo que no he revisado.</li>
                    <li>Su proyecto supera los 2.500 m². En ese caso, con gusto le recomiendo a un colega de categoría superior.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionTitle>Cómo trabajamos, en 4 pasos</SectionTitle>
            <ol className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <li className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0f172a] font-bold text-white">1</span><strong>Me envía el expediente</strong><p className="mt-2 text-slate-600">(CIP, planos, formularios y documentos) por correo o enlace.</p></li>
              <li className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0f172a] font-bold text-white">2</span><strong>Le cotizo</strong><p className="mt-2 text-slate-600">Según superficie, destino y estado del expediente.</p></li>
              <li className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0f172a] font-bold text-white">3</span><strong>Recibe el informe de observaciones</strong><p className="mt-2 text-slate-600">Con prioridades y normas.</p></li>
              <li className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0f172a] font-bold text-white">4</span><strong>Corrige, responde y cerramos</strong><p className="mt-2 text-slate-600">Con el Informe Favorable en el formato oficial.</p></li>
            </ol>
            <ContactButton>Enviar mi expediente para cotizar</ContactButton>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionTitle>Preguntas frecuentes sobre el revisor independiente de arquitectura</SectionTitle>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map(({ question, answer }, index) => (
                <AccordionItem key={question} value={`faq-${index}`}>
                  <AccordionTrigger><h3 className="text-left text-base font-semibold">{question}</h3></AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-slate-700">{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="bg-[#0f172a] py-16 text-white sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <SectionTitle>
              <span className="text-white">Su próximo expediente puede entrar a la DOM ya revisado</span>
            </SectionTitle>
            <p className="mb-8 text-lg leading-relaxed text-slate-200">
              Envíeme su expediente. Le respondo con una cotización y le digo, sin compromiso, si veo algo crítico a primera vista.
            </p>
            <div className="mb-8"><ContactButton /></div>
            <div className="flex flex-col items-center justify-center gap-3 text-slate-200 sm:flex-row sm:gap-6">
              <a className="inline-flex items-center gap-2 hover:text-white" href="mailto:contacto@arquitectochile.com"><Mail className="h-4 w-4" />contacto@arquitectochile.com</a>
              <a className="inline-flex items-center gap-2 hover:text-white" href="tel:+56979316827"><Phone className="h-4 w-4" />+56 9 7931 6827</a>
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" />Vicuña Mackenna Poniente N° 7735, La Florida, Santiago</span>
            </div>
            <p className="mt-8 text-left text-sm leading-relaxed text-slate-300">
              <strong>P.D.</strong> La DOM va a leer su expediente de todas maneras. La única pregunta es si alguien con criterio de DOM lo lee antes. Esa es mi pega.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
