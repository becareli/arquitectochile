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
  userAgent?: string;
  timestamp: string;
}

interface IntegrationResult {
  email: { ok: boolean; error?: string };
  trello: { ok: boolean; error?: string; cardId?: string };
  crm: { ok: boolean; error?: string };
}

export async function sendEmailNotification(lead: LeadData): Promise<{ ok: boolean; error?: string }> {
  const notifyEmail = process.env.LEADS_NOTIFY_EMAIL;
  if (!notifyEmail) {
    console.warn("⚠️ LEADS_NOTIFY_EMAIL not set, skipping email");
    return { ok: false, error: "LEADS_NOTIFY_EMAIL not configured" };
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn("⚠️ SMTP credentials incomplete, skipping email");
    return { ok: false, error: "SMTP not configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const subject = `🏗️ Nuevo Lead: ${lead.comuna} - ${lead.tipo_proyecto} - ${lead.nombre}`;
    const html = `
      <h2>Nuevo Lead desde ArquitectoChile.com</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Nombre</td><td style="padding:8px;border:1px solid #ddd;">${lead.nombre}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${lead.email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Comuna</td><td style="padding:8px;border:1px solid #ddd;">${lead.comuna}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Tipo Proyecto</td><td style="padding:8px;border:1px solid #ddd;">${lead.tipo_proyecto}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Etapa</td><td style="padding:8px;border:1px solid #ddd;">${lead.etapa}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Presupuesto</td><td style="padding:8px;border:1px solid #ddd;">${lead.presupuesto || "No indicado"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Mensaje</td><td style="padding:8px;border:1px solid #ddd;">${lead.mensaje}</td></tr>
        ${lead.branch ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Rama</td><td style="padding:8px;border:1px solid #ddd;">${lead.branch}</td></tr>` : ""}
        ${lead.service ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Servicio</td><td style="padding:8px;border:1px solid #ddd;">${lead.service}</td></tr>` : ""}
        ${lead.direccion ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Dirección</td><td style="padding:8px;border:1px solid #ddd;">${lead.direccion}</td></tr>` : ""}
        ${lead.classification ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Clasificación</td><td style="padding:8px;border:1px solid #ddd;">${lead.classification}</td></tr>` : ""}
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Fecha</td><td style="padding:8px;border:1px solid #ddd;">${lead.timestamp}</td></tr>
      </table>
    `;

    await transporter.sendMail({
      from: smtpFrom,
      to: notifyEmail,
      subject,
      html,
    });

    console.log("✅ Email de notificación enviado a", notifyEmail);

    if (process.env.SEND_AUTOREPLY === "true" && lead.email) {
      try {
        await transporter.sendMail({
          from: smtpFrom,
          to: lead.email,
          subject: "Recibimos tu solicitud - ArquitectoChile.com",
          html: `
            <h2>Hola ${lead.nombre},</h2>
            <p>Hemos recibido tu solicitud correctamente. Nuestro equipo revisará tu caso y te contactará a la brevedad.</p>
            <p>Datos recibidos:</p>
            <ul>
              <li><strong>Tipo de proyecto:</strong> ${lead.tipo_proyecto}</li>
              <li><strong>Comuna:</strong> ${lead.comuna}</li>
              <li><strong>Etapa:</strong> ${lead.etapa}</li>
            </ul>
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

export async function createTrelloCard(lead: LeadData): Promise<{ ok: boolean; error?: string; cardId?: string }> {
  const key = process.env.TRELLO_KEY;
  const token = process.env.TRELLO_TOKEN;
  const listId = process.env.TRELLO_LIST_ID;

  if (!key || !token || !listId) {
    console.warn("⚠️ Trello credentials incomplete, skipping");
    return { ok: false, error: "Trello not configured" };
  }

  try {
    const name = `Lead: ${lead.comuna} - ${lead.tipo_proyecto} - ${lead.nombre}`;
    const desc = [
      `📧 Email: ${lead.email}`,
      `📍 Comuna: ${lead.comuna}`,
      `🏗️ Tipo: ${lead.tipo_proyecto}`,
      `📊 Etapa: ${lead.etapa}`,
      `💰 Presupuesto: ${lead.presupuesto || "No indicado"}`,
      `💬 Mensaje: ${lead.mensaje}`,
      lead.branch ? `🏢 Rama: ${lead.branch}` : "",
      lead.service ? `🔧 Servicio: ${lead.service}` : "",
      lead.direccion ? `📌 Dirección: ${lead.direccion}` : "",
      lead.classification ? `⭐ Clasificación: ${lead.classification}` : "",
      `🌐 Ref: https://arquitectochile.com/contacto`,
      lead.userAgent ? `🖥️ UA: ${lead.userAgent}` : "",
      `📅 Fecha: ${lead.timestamp}`,
    ].filter(Boolean).join("\n");

    const url = `https://api.trello.com/1/cards?idList=${listId}&key=${key}&token=${token}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, desc }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Trello API ${response.status}: ${errText}`);
    }

    const card = await response.json() as { id: string };
    console.log("✅ Tarjeta Trello creada:", card.id);
    return { ok: true, cardId: card.id };
  } catch (err: any) {
    console.error("❌ Trello falló:", err.message);
    return { ok: false, error: err.message };
  }
}

export async function sendToCRM(lead: LeadData): Promise<{ ok: boolean; error?: string }> {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("⚠️ CRM_WEBHOOK_URL not set, skipping CRM");
    return { ok: false, error: "CRM_WEBHOOK_URL not configured" };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "arquitectochile.com",
        ...lead,
      }),
    });

    if (!response.ok) {
      throw new Error(`CRM webhook ${response.status}`);
    }

    console.log("✅ Lead enviado a CRM");
    return { ok: true };
  } catch (err: any) {
    console.error("❌ CRM falló:", err.message);
    return { ok: false, error: err.message };
  }
}

export async function processLeadIntegrations(lead: LeadData): Promise<IntegrationResult> {
  const [email, trello, crm] = await Promise.allSettled([
    sendEmailNotification(lead),
    createTrelloCard(lead),
    sendToCRM(lead),
  ]);

  return {
    email: email.status === "fulfilled" ? email.value : { ok: false, error: "unexpected error" },
    trello: trello.status === "fulfilled" ? trello.value : { ok: false, error: "unexpected error" },
    crm: crm.status === "fulfilled" ? crm.value : { ok: false, error: "unexpected error" },
  };
}
