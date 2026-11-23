// Vercel Function: recibe el formulario de contacto y lo envía por correo a contacto@.
// Usa el SMTP de Google Workspace con una "contraseña de aplicación".
// Variables de entorno (se configuran en Vercel → Settings → Environment Variables):
//   SMTP_USER   = patricio@arquitectochile.com
//   SMTP_PASS   = contraseña de aplicación de Google (16 letras)
//   CONTACT_TO  = contacto@arquitectochile.com   (opcional; por defecto esta)
import nodemailer from "nodemailer";

const CAMPOS = [
  ["area", "Área"],
  ["tipo", "Tipo de edificación"],
  ["superficie", "Superficie (m²)"],
  ["direccion", "Dirección"],
  ["comuna", "Comuna y región"],
  ["necesidad", "Necesidad"],
  ["urgencia", "Urgencia"],
  ["presupuesto", "Presupuesto"],
  ["cip", "¿Tiene CIP?"],
  ["nombre", "Nombre"],
  ["correo", "Correo"],
  ["telefono", "Teléfono / WhatsApp"],
];
const OBLIGATORIOS = ["area", "tipo", "direccion", "comuna", "necesidad", "urgencia", "nombre", "correo", "telefono"];

const limpiar = (v) => String(v ?? "").trim().slice(0, 3000);
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  // Trampa para robots: si viene lleno, respondemos OK pero no enviamos nada.
  if (limpiar(body.empresa_web)) return res.status(200).json({ ok: true });

  const d = Object.fromEntries(CAMPOS.map(([k]) => [k, limpiar(body[k])]));
  const faltan = OBLIGATORIOS.filter((k) => !d[k]);
  if (faltan.length || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.correo)) {
    return res.status(400).json({ error: "Faltan datos obligatorios", faltan });
  }

  const adjuntos = Array.isArray(body.adjuntos)
    ? body.adjuntos
        .filter((a) => a && typeof a.url === "string" && a.url.includes(".blob.vercel-storage.com/"))
        .slice(0, 8)
        .map((a) => ({ nombre: limpiar(a.nombre).slice(0, 200), url: a.url }))
    : [];
  const fallaron = Number(body.adjuntosFallaron) || 0;

  const filas = CAMPOS.filter(([k]) => d[k])
    .map(([k, etiqueta]) => `<tr><td style="padding:6px 10px;color:#64748b;vertical-align:top">${etiqueta}</td><td style="padding:6px 10px;color:#0f172a">${esc(d[k]).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");
  const listaAdjuntos = adjuntos.length
    ? `<h3 style="font-family:Arial">Antecedentes adjuntos</h3><ul>${adjuntos.map((a) => `<li><a href="${esc(a.url)}">${esc(a.nombre)}</a></li>`).join("")}</ul>`
    : "";
  const avisoFallo = fallaron ? `<p style="color:#c2410c">El cliente intentó adjuntar ${fallaron} archivo(s) pero la subida falló. Pídeselos por WhatsApp.</p>` : "";
  const telLimpio = d.telefono.replace(/[^\d]/g, "");

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px">
    <h2 style="color:#0f172a">Nueva solicitud desde arquitectochile.com</h2>
    <table style="border-collapse:collapse">${filas}</table>
    ${listaAdjuntos}${avisoFallo}
    <p><a href="https://wa.me/${telLimpio}">Responder por WhatsApp</a> · Responde a este correo para escribirle a ${esc(d.nombre)}.</p>
  </div>`;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.error("Faltan SMTP_USER / SMTP_PASS en Vercel");
    return res.status(500).json({ error: "Correo no configurado" });
  }

  try {
    const transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });
    await transporter.sendMail({
      from: `"Web ArquitectoChile" <${user}>`,
      to: process.env.CONTACT_TO || "contacto@arquitectochile.com",
      replyTo: `"${d.nombre.replace(/"/g, "")}" <${d.correo}>`,
      subject: `Solicitud web: ${d.area} · ${d.comuna}${d.urgencia.startsWith("URGENTE") ? " · URGENTE" : ""}`,
      html,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("sendMail error:", err?.message);
    return res.status(502).json({ error: "No se pudo enviar el correo" });
  }
}
