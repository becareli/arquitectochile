// Vercel Function: recibe los formularios por servicio (asesoría a domicilio, diseño, regularización,
// revisor independiente y colaboradores) y los envía por correo a contacto@.
// Usa las mismas variables de entorno que /api/contacto (SMTP_USER, SMTP_PASS, CONTACT_TO).
import nodemailer from "nodemailer";

const SERVICIOS = {
  "asesoria-domicilio": "Asesoría a domicilio",
  "diseno-arquitectura": "Diseño de arquitectura",
  regularizacion: "Regularización de inmuebles",
  "revisor-independiente": "Revisor independiente",
  colaboradores: "Postulación de colaborador",
};

const limpiar = (v, n = 3000) => String(v ?? "").trim().slice(0, n);
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  if (limpiar(body.empresa_web)) return res.status(200).json({ ok: true }); // trampa para robots

  const servicio = SERVICIOS[body.servicio];
  const nombre = limpiar(body.nombre, 200);
  const correo = limpiar(body.correo, 200);
  const telefono = limpiar(body.telefono, 60);
  if (!servicio || !nombre || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const respuestas = (Array.isArray(body.respuestas) ? body.respuestas : [])
    .slice(0, 40)
    .map((r) => ({ p: limpiar(r?.p, 300), r: limpiar(r?.r) }))
    .filter((r) => r.p && r.r);
  const adjuntos = (Array.isArray(body.adjuntos) ? body.adjuntos : [])
    .filter((a) => a && typeof a.url === "string" && a.url.includes(".blob.vercel-storage.com/"))
    .slice(0, 16)
    .map((a) => ({ etiqueta: limpiar(a.etiqueta, 200), nombre: limpiar(a.nombre, 200), url: a.url }));
  const fallaron = Number(body.adjuntosFallaron) || 0;

  const fila = (k, v) =>
    `<tr><td style="padding:6px 10px;color:#5B6573;vertical-align:top">${esc(k)}</td><td style="padding:6px 10px;color:#1D2530">${esc(v).replace(/\n/g, "<br>")}</td></tr>`;
  const tel = telefono.replace(/[^\d]/g, "");
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px">
    <h2 style="color:#1D2530">Nueva solicitud web: ${esc(servicio)}</h2>
    <table style="border-collapse:collapse">${[["Nombre", nombre], ["Correo", correo], ["Teléfono / WhatsApp", telefono], ...respuestas.map((x) => [x.p, x.r])]
      .filter(([, v]) => v)
      .map(([k, v]) => fila(k, v))
      .join("")}</table>
    ${adjuntos.length ? `<h3>Archivos adjuntos</h3><ul>${adjuntos.map((a) => `<li>${esc(a.etiqueta)}: <a href="${esc(a.url)}">${esc(a.nombre)}</a></li>`).join("")}</ul>` : ""}
    ${fallaron ? `<p style="color:#C2410C">El cliente intentó adjuntar ${fallaron} archivo(s) pero la subida falló. Pídalos por WhatsApp.</p>` : ""}
    <p>${tel ? `<a href="https://wa.me/${tel}">Responder por WhatsApp</a> · ` : ""}Responda a este correo para escribirle a ${esc(nombre)}.</p>
  </div>`;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return res.status(500).json({ error: "Correo no configurado" });
  try {
    const transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });
    await transporter.sendMail({
      from: `"Web ArquitectoChile" <${user}>`,
      to: process.env.CONTACT_TO || "contacto@arquitectochile.com",
      replyTo: `"${nombre.replace(/"/g, "")}" <${correo}>`,
      subject: `Solicitud web (${servicio}): ${nombre}`,
      html,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("sendMail error:", err?.message);
    return res.status(502).json({ error: "No se pudo enviar el correo" });
  }
}
