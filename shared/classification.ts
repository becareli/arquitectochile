/**
 * Clasificación de proyectos y documentos de ArquitectoChile.
 *
 *   Proyecto:   AC-2026-014            (AC + año de ingreso + correlativo del año)
 *   Carpeta:    AC-2026-014 Los Aromos 9445
 *   Documento:  AC-2026-014_ARQ_PLA_Planta-1er-piso_V02.pdf
 *               código_disciplina_tipo_descripción_versión.extensión
 *
 * Todos los archivos del proyecto empiezan con el mismo código, así se ordenan solos
 * en cualquier carpeta y un script puede armar el índice de un expediente.
 */

export const DISCIPLINES = [
  { code: "ARQ", label: "Arquitectura", stems: ["arquitect"] },
  { code: "EST", label: "Estructura / cálculo", stems: ["estructur", "calcul"] },
  { code: "SAN", label: "Agua potable", stems: ["sanitari", "agua potable"] },
  { code: "ALC", label: "Alcantarillado", stems: ["alcantarill"] },
  { code: "ELE", label: "Electricidad", stems: ["electric"] },
  { code: "GAS", label: "Gas", stems: ["gas"] },
  { code: "CLI", label: "Climatización y ventilación", stems: ["climatiz", "ventilac"] },
  { code: "TER", label: "Eficiencia térmica", stems: ["termic", "eficiencia"] },
  { code: "TOP", label: "Topografía", stems: ["topograf"] },
  { code: "LEG", label: "Legal y municipal (expediente)", stems: ["legal", "municipal", "expediente"] },
  { code: "OBR", label: "Obra e inspección", stems: ["obra", "inspecci"] },
  { code: "ADM", label: "Administración (contratos, pagos)", stems: ["administr"] },
] as const;

export const DOC_KINDS = [
  { code: "PLA", label: "Planos" },
  { code: "MEM", label: "Memoria" },
  { code: "ESP", label: "Especificaciones técnicas" },
  { code: "CAL", label: "Cálculo" },
  { code: "CUB", label: "Cubicación y presupuesto" },
  { code: "MOD", label: "Modelo 3D / BIM (.pln, .ifc)" },
  { code: "REN", label: "Render" },
  { code: "ACT", label: "Acta o minuta" },
  { code: "INF", label: "Informe" },
  { code: "CER", label: "Certificado" },
  { code: "FOR", label: "Formulario" },
  { code: "PER", label: "Permiso o resolución" },
  { code: "CON", label: "Contrato" },
  { code: "BOL", label: "Boleta o factura" },
  { code: "FOT", label: "Fotos" },
] as const;

export type DisciplineCode = (typeof DISCIPLINES)[number]["code"];
export type DocKindCode = (typeof DOC_KINDS)[number]["code"];

export const DISCIPLINE_CODES = DISCIPLINES.map((d) => d.code) as [DisciplineCode, ...DisciplineCode[]];
export const DOC_KIND_CODES = DOC_KINDS.map((d) => d.code) as [DocKindCode, ...DocKindCode[]];

/** Texto libre -> código "limpio" para nombres de archivo: sin tildes, sin espacios ni símbolos. */
export function slugify(v: string, max = 48): string {
  return v
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, max)
    .replace(/-+$/g, "");
}

export function extensionOf(filename: string): string {
  const m = /\.([A-Za-z0-9]{1,8})$/.exec(filename.trim());
  return m ? m[1].toLowerCase() : "";
}

export function stdFileName(p: { code: string; discipline: string; kind: string; description: string; version: number; ext?: string }): string {
  const ver = `V${String(Math.max(1, Math.floor(p.version))).padStart(2, "0")}`;
  const desc = slugify(p.description) || "Documento";
  return `${p.code}_${p.discipline}_${p.kind}_${desc}_${ver}${p.ext ? `.${p.ext.replace(/^\./, "").toLowerCase()}` : ""}`;
}

export function projectFolderName(code: string, address: string | null | undefined, fallback: string): string {
  return `${code} ${(address || fallback).trim()}`;
}

/** Lee un nombre estándar; devuelve null si el archivo no sigue la convención. */
export function parseStdFileName(name: string) {
  const m = /^(AC-\d{4}-\d{3})_([A-Z]{3})_([A-Z]{3})_(.+)_V(\d{2})(?:\.([A-Za-z0-9]+))?$/.exec(name);
  if (!m) return null;
  return { code: m[1], discipline: m[2], kind: m[3], description: m[4], version: Number(m[5]), ext: m[6] ?? "" };
}

/** Deduce la disciplina de un colaborador a partir de su especialidad, para sugerirla al crear tareas. */
export function guessDiscipline(text: string | null | undefined): DisciplineCode | null {
  if (!text) return null;
  const t = text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  return DISCIPLINES.find((d) => d.stems.some((s) => t.includes(s)))?.code ?? null;
}
