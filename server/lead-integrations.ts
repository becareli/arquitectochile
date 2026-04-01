import nodemailer from "nodemailer";

interface LeadData {
  nombre: string;
  email: string;
  comuna: string;
  tipo_proyecto: string;
  etapa: string;
  presupuesto?: string;
  mensaje: string;
  branch?: string;
  service?: string;
  propertyType?: string;
  direccion?: string;
  rol?: string;
  classification?: string;
  timestamp: string;
}

export async function sendLeadEmail(lead: LeadData): Promise<{ ok: boolean; error?: string }> {
  const notifyEmail = process.env.LEADS_NOTIFY_EMAIL;
  if (!notifyEmail) {
    console.log("ℹ️ LEADS_NOTIFY_EMAIL no configurado — email omitido");
    return { ok: false, error: "LEADS_NOTIFY_EMAIL not configured" };
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("ℹ️ SMTP no configurado (faltan SMTP_HOST/SMTP_USER/SMTP_PASS) — email omitido");
    return { ok: false, error: "SMTP not configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const subject = `🏗️ Nuevo Lead [${lead.classification || "WEB"}]: ${lead.nombre} — ${lead.comuna || "Sin comuna"} — ${lead.tipo_proyecto}`;

    const rows = [
      ["Nombre", lead.nombre],
      ["Email", lead.email],
      ["Comuna", lead.comuna],
      ["Tipo Proyecto", lead.tipo_proyecto],
      ["Servicio", lead.service || "—"],
      ["Rama", lead.branch || "—"],
      ["Etapa", lead.etapa || "—"],
      ["Presupuesto", lead.presupuesto || "No indicado"],
      ["Dirección", lead.direccion || "—"],
      ["ROL", lead.rol || "—"],
      ["Tipo Propiedad", lead.propertyType || "—"],
      ["Clasificación", lead.classification || "—"],
      ["Mensaje", lead.mensaje || "—"],
      ["Fecha", lead.timestamp],
    ];

    const html = `
      <h2 style="color:#1e3a5f;">Nuevo Lead desde ArquitectoChile.com</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
        ${rows.map(([k, v]) => `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:bold;background:#f8fafc;width:140px;">${k}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">${v}</td></tr>`).join("")}
      </table>
      <p style="margin-top:16px;font-size:12px;color:#94a3b8;">Enviado automáticamente desde arquitectochile.com</p>
    `;

    await transporter.sendMail({
      from: smtpFrom,
      to: notifyEmail,
      cc: "contacto@arquitectochile.com",
      subject,
      html,
    });

    console.log("✅ Email de notificación enviado a", notifyEmail, "+ CC contacto@arquitectochile.com");

    if (process.env.SEND_AUTOREPLY === "true" && lead.email) {
      try {
        await transporter.sendMail({
          from: smtpFrom,
          to: lead.email,
          subject: "Recibimos tu solicitud — ArquitectoChile.com",
          html: `
            <h2>Hola ${lead.nombre},</h2>
            <p>Hemos recibido tu solicitud correctamente. Nuestro equipo revisará tu caso y te contactará a la brevedad.</p>
            <p><strong>Tipo de proyecto:</strong> ${lead.tipo_proyecto}</p>
            <p><strong>Comuna:</strong> ${lead.comuna}</p>
            <p>Atentamente,<br/>Equipo ArquitectoChile.com<br/>Arq. Patricio Becar Elissegaray</p>
          `,
        });
        console.log("✅ Auto-reply enviado a", lead.email);
      } catch (replyErr) {
        console.warn("⚠️ Auto-reply falló:", replyErr);
      }
    }

    return { ok: true };
  } catch (err: any) {
    console.error("❌ Email falló:", err.message);
    return { ok: false, error: err.message };
  }
}
