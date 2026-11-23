// Definición de los formularios por servicio. Cada campo se dibuja en formulario-servicio.tsx.
export type Campo = {
  name: string;
  label: string;
  tipo: "texto" | "largo" | "numero" | "opciones" | "lista" | "archivo";
  opciones?: string[];
  requerido?: boolean;
  ayuda?: string;
  // Solo se muestra (y se exige) si otro campo tiene este valor.
  siCampo?: { name: string; valor: string };
  multiple?: boolean; // archivos
  soloPdf?: boolean;
};

export type FormularioServicio = {
  clave: string;
  titulo: string;
  intro: string;
  campos: Campo[];
  textoEnvio: string;
  confirmacion: string;
};

const COMUNA: Campo = { name: "comuna", label: "Comuna y región", tipo: "texto", requerido: true };
const DIRECCION: Campo = { name: "direccion", label: "Dirección exacta (calle y número)", tipo: "texto", requerido: true };
const CIP_OPCIONAL: Campo = {
  name: "cip",
  label: "Certificado de Informaciones Previas (CIP)",
  tipo: "archivo",
  multiple: true,
  ayuda: "Opcional, aunque muy recomendado. Se pide en la Dirección de Obras de su comuna.",
};

export const FORMULARIOS: Record<string, FormularioServicio> = {
  "asesoria-domicilio": {
    clave: "asesoria-domicilio",
    titulo: "Solicitar asesoría de arquitectura a su domicilio",
    intro: "Cuéntenos de su proyecto. Mientras más detalle, mejor podré prepararme para la visita.",
    textoEnvio: "Enviar solicitud",
    confirmacion: "Revisaré sus antecedentes y le responderé por correo o WhatsApp a la brevedad.",
    campos: [
      { name: "proyecto", label: "Cuéntenos de su proyecto", tipo: "largo", requerido: true },
      { name: "dormitorios", label: "¿Cuántos dormitorios desea agregar?", tipo: "lista", opciones: ["Ninguno", "1", "2", "3", "4", "5 o más"] },
      { name: "banos", label: "¿Cuántos baños desea agregar?", tipo: "lista", opciones: ["Ninguno", "1", "2", "3", "4", "5 o más"] },
      DIRECCION,
      COMUNA,
      { name: "imagenes", label: "Imágenes de su proyecto", tipo: "archivo", multiple: true, ayuda: "Opcional: fotos o planos." },
      CIP_OPCIONAL,
    ],
  },
  "diseno-arquitectura": {
    clave: "diseno-arquitectura",
    titulo: "Diseño de arquitectura",
    intro: "Respondiendo estas preguntas puedo evaluar si estamos alineados y enviarle una propuesta personalizada.",
    textoEnvio: "Solicitar propuesta",
    confirmacion: "Le enviaré una propuesta de trabajo y coordinaremos una reunión breve.",
    campos: [
      {
        name: "etapa",
        label: "¿En qué etapa se encuentra su proyecto hoy?",
        tipo: "opciones",
        requerido: true,
        opciones: [
          "Tengo una idea o terreno y necesito el diseño y planos de arquitectura",
          "Quiero diseñar una ampliación o remodelación para mi casa",
          "Ya tengo el proyecto diseñado y solo busco construcción",
          "Solo necesito trámites aislados o regularización rápida",
        ],
      },
      {
        name: "espacio",
        label: "¿Qué tipo de espacio desea transformar?",
        tipo: "opciones",
        requerido: true,
        opciones: ["Casa nueva o parcela", "Ampliación de vivienda", "Remodelación integral", "Proyecto comercial u oficinas", "Otro"],
      },
      DIRECCION,
      COMUNA,
      { name: "superficie", label: "Superficie aproximada a proyectar (m²)", tipo: "texto", requerido: true },
      {
        name: "plazo",
        label: "¿Cuál es su plazo ideal para iniciar el diseño?",
        tipo: "opciones",
        requerido: true,
        opciones: ["Lo antes posible (este mes)", "En los próximos 3 meses", "En 6 meses o más", "Solo estoy explorando ideas por ahora"],
      },
      CIP_OPCIONAL,
    ],
  },
  regularizacion: {
    clave: "regularizacion",
    titulo: "Regularizar las ampliaciones de su propiedad",
    intro: "La Ley 20.898 exige dos condiciones que necesito conocer antes de evaluar su caso.",
    textoEnvio: "Enviar solicitud",
    confirmacion: "Evaluaré si su caso cumple la Ley 20.898 y le responderé por correo o WhatsApp.",
    campos: [
      { name: "detalle", label: "Cuéntenos de su caso", tipo: "largo", requerido: true },
      DIRECCION,
      COMUNA,
      CIP_OPCIONAL,
      {
        name: "antes2016",
        label: "¿Se realizaron las ampliaciones antes del 4 de febrero de 2016?",
        tipo: "opciones",
        requerido: true,
        opciones: ["Sí", "No"],
        ayuda: "Es una de las exigencias de la Ley N° 20.898.",
      },
      {
        name: "denuncia",
        label: "¿Ha sido objeto de alguna denuncia en la Dirección de Obras o en el Juzgado de Policía Local por las ampliaciones?",
        tipo: "opciones",
        requerido: true,
        opciones: ["Sí", "No"],
        ayuda: "Es una de las exigencias de la Ley N° 20.898.",
      },
    ],
  },
  "revisor-independiente": {
    clave: "revisor-independiente",
    titulo: "Solicitud de presupuesto para informe favorable de Revisor Independiente (Ley 20.016)",
    intro: "Con estos antecedentes preparo su cotización sin pedirle más datos por WhatsApp.",
    textoEnvio: "Solicitar cotización",
    confirmacion: "Le enviaré la cotización al correo indicado.",
    campos: [
      { name: "rol", label: "¿Cuál es su rol principal en el proyecto?", tipo: "opciones", requerido: true, opciones: ["Arquitecto / proyectista", "Empresa constructora", "Mandante / propietario"] },
      { name: "autoridad", label: "¿Quién autoriza la contratación del Revisor Independiente?", tipo: "opciones", requerido: true, opciones: ["Arquitecto / equipo técnico", "Mandante / propietario"] },
      { name: "mandante", label: "Nombre del mandante o propietario", tipo: "texto", requerido: true },
      { name: "rutMandante", label: "RUT del mandante o propietario", tipo: "texto", requerido: true },
      { name: "proyecto", label: "Nombre del proyecto", tipo: "texto", requerido: true },
      { name: "destino", label: "Destino del proyecto", tipo: "opciones", requerido: true, opciones: ["Habitacional", "Comercial", "Industrial", "Otro"] },
      DIRECCION,
      COMUNA,
      { name: "cip", label: "Certificado de Informaciones Previas (CIP)", tipo: "archivo", requerido: true, multiple: true, ayuda: "Obligatorio. Es el primer documento que reviso." },
      { name: "ingresado", label: "¿El proyecto ya ingresó a la DOM y cuenta con acta de observaciones?", tipo: "opciones", requerido: true, opciones: ["Sí", "No"] },
      { name: "acta", label: "Acta de observaciones municipal (PDF)", tipo: "archivo", requerido: true, soloPdf: true, siCampo: { name: "ingresado", valor: "Sí" } },
      { name: "planta", label: "Lámina de planta general del proyecto de arquitectura (PDF)", tipo: "archivo", requerido: true, soloPdf: true },
      { name: "supExistente", label: "Superficie existente con permiso y recepción final previa (m²)", tipo: "numero" },
      { name: "supNueva", label: "Superficie de proyecto nuevo o ampliación (m²)", tipo: "numero", requerido: true },
      { name: "estructura", label: "Clase de estructura predominante según OGUC", tipo: "opciones", requerido: true, opciones: ["Acero (estructura metálica)", "Albañilería (ladrillo / hormigón)", "Madera", "Mixta / otra"] },
    ],
  },
  colaboradores: {
    clave: "colaboradores",
    titulo: "Postulación a la Red de Colaboradores",
    intro: "Cuéntenos su experiencia. Revisaré su postulación y le escribiré si hay un proyecto en su zona.",
    textoEnvio: "Enviar postulación",
    confirmacion: "Revisaré su postulación y lo contactaré cuando haya un proyecto que calce con su perfil.",
    campos: [
      {
        name: "grupo",
        label: "¿A qué grupo de trabajo pertenece?",
        tipo: "opciones",
        requerido: true,
        opciones: ["Grupo 1: profesional proyectista", "Grupo 2: técnico especialista de terreno", "Grupo 3: contratista / cuadrilla de construcción"],
      },
      { name: "especialidad", label: "Especialidad técnica", tipo: "texto", requerido: true },
      { name: "archicad", label: "¿Trabaja y modela en ARCHICAD?", tipo: "opciones", requerido: true, opciones: ["Sí, nivel avanzado", "Sí, nivel intermedio", "No / otro software"] },
      { name: "firma", label: "¿Cuenta con firma y certificación vigente (SEC, Minvu, etc.)?", tipo: "opciones", requerido: true, opciones: ["Sí", "No"] },
      { name: "herramientas", label: "¿Cuenta con herramientas propias para faena?", tipo: "opciones", requerido: true, opciones: ["Sí", "No", "Parcial"] },
      { name: "cuadrilla", label: "Cantidad de personas en la cuadrilla y tipo de obras ejecutadas", tipo: "largo" },
      { name: "experiencia", label: "Años de experiencia", tipo: "lista", requerido: true, opciones: ["Menos de 2", "2 a 5", "5 a 10", "Más de 10"] },
      { name: "zonas", label: "Comunas o regiones donde puede operar", tipo: "texto", requerido: true },
      { name: "disponibilidad", label: "Disponibilidad", tipo: "opciones", requerido: true, opciones: ["Por proyecto o faena", "Tiempo completo", "Fines de semana"] },
      { name: "cobro", label: "Modelo de cobro preferido", tipo: "lista", requerido: true, opciones: ["Por proyecto", "Por m²", "Por jornada", "A convenir"] },
      { name: "cv", label: "CV, portafolio o certificaciones (PDF)", tipo: "archivo", multiple: true, soloPdf: true },
    ],
  },
};
