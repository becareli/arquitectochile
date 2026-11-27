import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

/**
 * Minuta de reunión en PDF con la identidad de ArquitectoChile.
 * Colores tomados del logo: azul y verde. Se genera al vuelo, no se guarda en ningún lado.
 */

// Colores del manual de marca ArquitectoChile.com (navy, naranjo; el verde solo vive dentro del logo)
const NAVY = "#1D2530";
const ORANGE = "#F97015";
const ORANGE_DARK = "#C2410C";
const INK = "#263238";
const MUTED = "#5B6573";
const PANEL = "#F4F7FA";

export type MinutaData = {
  title: string;
  heldAt: Date;
  platform: string | null;
  recipientName: string;
  projectName: string | null;
  minuteText: string;
  agreements: { description: string; owner: string; status: string; dueDate: Date | null }[];
  draft: boolean; // el arquitecto la ve con marca de "borrador" antes de publicarla
};

const PLATFORM_LABEL: Record<string, string> = { meet: "Google Meet", zoom: "Zoom", teams: "Microsoft Teams", otra: "Videollamada" };

function loadLogo(): Buffer | null {
  for (const p of [path.resolve(process.cwd(), "server/assets/logo-minuta.png"), path.resolve(process.cwd(), "assets/logo-minuta.png")]) {
    try {
      return fs.readFileSync(p);
    } catch {
      /* se prueba la siguiente ruta */
    }
  }
  return null; // sin logo, el encabezado usa el nombre en texto
}

const fechaLarga = (d: Date) => d.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Santiago" });

export function buildMinutaPdf(data: MinutaData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margins: { top: 50, bottom: 70, left: 50, right: 50 }, bufferPages: true, info: { Title: `Minuta: ${data.title}`, Author: "ArquitectoChile.com" } });
    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const left = doc.page.margins.left;
    const width = doc.page.width - left - doc.page.margins.right;
    const bottom = () => doc.page.height - doc.page.margins.bottom;
    const ensure = (h: number) => { if (doc.y + h > bottom()) doc.addPage(); };

    // ----- encabezado -----
    const logo = loadLogo();
    if (logo) doc.image(logo, left, 44, { height: 52 });
    else doc.font("Helvetica-Bold").fontSize(16).fillColor(NAVY).text("ArquitectoChile.com", left, 56);
    doc.font("Helvetica-Bold").fontSize(20).fillColor(NAVY).text("Minuta de reunión", left, 52, { width, align: "right" });
    doc.font("Helvetica").fontSize(10).fillColor(MUTED).text(fechaLarga(data.heldAt), left, 78, { width, align: "right" });
    if (data.draft) doc.font("Helvetica-Bold").fontSize(9).fillColor(ORANGE_DARK).text("BORRADOR · aún no enviada", left, 92, { width, align: "right" });
    doc.moveTo(left, 108).lineTo(left + width, 108).lineWidth(2).strokeColor(ORANGE).stroke();
    doc.y = 124;

    // ----- datos de la reunión -----
    const rows: [string, string][] = [
      ["Reunión", data.title],
      ["Fecha", fechaLarga(data.heldAt)],
      ["Preparada para", data.recipientName],
      ...(data.projectName ? ([["Proyecto", data.projectName]] as [string, string][]) : []),
      ...(data.platform ? ([["Modalidad", PLATFORM_LABEL[data.platform] ?? data.platform]] as [string, string][]) : []),
    ];
    const boxTop = doc.y;
    const boxH = rows.length * 18 + 16;
    doc.roundedRect(left, boxTop, width, boxH, 6).fillColor(PANEL).fill();
    rows.forEach(([k, v], i) => {
      const y = boxTop + 10 + i * 18;
      doc.font("Helvetica-Bold").fontSize(9.5).fillColor(NAVY).text(k, left + 14, y, { width: 100 });
      doc.font("Helvetica").fontSize(10).fillColor(INK).text(v, left + 120, y, { width: width - 134, lineBreak: false, ellipsis: true });
    });
    doc.y = boxTop + boxH + 20;

    // ----- resumen -----
    const heading = (text: string) => {
      ensure(40);
      doc.font("Helvetica-Bold").fontSize(13).fillColor(NAVY).text(text, left, doc.y);
      doc.moveTo(left, doc.y + 2).lineTo(left + 44, doc.y + 2).lineWidth(2).strokeColor(ORANGE).stroke();
      doc.y += 10;
    };

    heading("Resumen de lo conversado");
    for (const raw of data.minuteText.replace(/\r/g, "").split("\n")) {
      const line = raw.replace(/\*\*/g, "").trimEnd();
      if (!line.trim()) { doc.y += 4; continue; }
      ensure(20);
      const h = line.match(/^#{1,6}\s*(.+)$/);
      const b = line.match(/^\s*[-*•]\s+(.+)$/);
      if (h) {
        doc.font("Helvetica-Bold").fontSize(11).fillColor(NAVY).text(h[1], left, doc.y + 4, { width });
      } else if (b) {
        const y = doc.y;
        doc.circle(left + 5, y + 6, 2).fillColor(ORANGE).fill();
        doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(b[1], left + 16, y, { width: width - 16, lineGap: 2 });
      } else {
        doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(line, left, doc.y, { width, lineGap: 2 });
      }
      doc.y += 3;
    }
    doc.y += 12;

    // ----- acuerdos -----
    const group = (owner: "architect" | "client", label: string) => {
      const items = data.agreements.filter((a) => a.owner === owner);
      if (!items.length) return;
      heading(label);
      for (const a of items) {
        ensure(26);
        const y = doc.y;
        const done = a.status === "done";
        doc.rect(left, y + 1, 11, 11).lineWidth(1).strokeColor(done ? ORANGE : MUTED).stroke();
        if (done) doc.moveTo(left + 2.5, y + 7).lineTo(left + 5, y + 10).lineTo(left + 9, y + 3.5).lineWidth(1.6).strokeColor(ORANGE).stroke();
        const due = a.dueDate ? `  (para el ${a.dueDate.toLocaleDateString("es-CL", { day: "numeric", month: "long", timeZone: "America/Santiago" })})` : "";
        doc.font("Helvetica").fontSize(10.5).fillColor(done ? MUTED : INK).text(a.description + due, left + 20, y, { width: width - 20, lineGap: 2 });
        doc.y += 5;
      }
      doc.y += 8;
    };
    group("architect", "Lo que hará el arquitecto");
    group("client", "Lo que necesitamos de ti");

    // ----- pie de página en todas las hojas -----
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      // El pie va dentro del margen inferior: sin esto pdfkit agrega una hoja en blanco por cada pie
      const savedBottom = doc.page.margins.bottom;
      doc.page.margins.bottom = 0;
      const fy = doc.page.height - 52;
      doc.moveTo(left, fy).lineTo(left + width, fy).lineWidth(0.7).strokeColor("#757F8A").stroke();
      doc.font("Helvetica-Bold").fontSize(8.5).fillColor(NAVY).text("Arq. Patricio Becar Elissegaray", left, fy + 8, { width: width / 2, lineBreak: false });
      doc.font("Helvetica").fontSize(8.5).fillColor(MUTED).text("arquitectochile.com · contacto@arquitectochile.com", left, fy + 20, { width: width / 2, lineBreak: false });
      doc.text(`Página ${i - range.start + 1} de ${range.count}`, left + width / 2, fy + 8, { width: width / 2, align: "right", lineBreak: false });
      doc.page.margins.bottom = savedBottom;
    }
    doc.end();
  });
}
