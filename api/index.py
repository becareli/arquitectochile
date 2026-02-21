"""
ArquitectoChile - Lead Processing API
Backend Flask para procesar leads del formulario de contacto de Agustín.

Funcionalidades:
- Recepción y validación de leads
- Notificación por email a contacto@arquitectochile.com y arquitectopatriciobecar@gmail.com
- Integración con Trello (tablero 1wGKEkO8) para gestión de leads
- Clasificación automática de leads VIP vs Nuevos

Variables de entorno requeridas (configurar en Secrets):
- SMTP_HOST: Servidor SMTP (ej: smtp.gmail.com)
- SMTP_PORT: Puerto SMTP (ej: 587)
- SMTP_USER: Usuario SMTP
- SMTP_PASSWORD: Contraseña SMTP o App Password
- TRELLO_API_KEY: API Key de Trello
- TRELLO_TOKEN: Token de autenticación de Trello
- TRELLO_BOARD_ID: ID del tablero (default: 1wGKEkO8)
- TRELLO_LIST_VIP_ID: ID de la lista para leads VIP
- TRELLO_LIST_NEW_ID: ID de la lista para leads nuevos
"""

import os
import json
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

try:
    import requests
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False

try:
    from flask import Flask, request, jsonify
    from flask_cors import CORS
    HAS_FLASK = True
except ImportError:
    HAS_FLASK = False

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

VIP_SERVICES = [
    "Revisoría Independiente de Arquitectura",
    "Inspección Técnica de Obras (ITO)",
    "Construcción de Obras Menores para Empresas",
    "Diseño de Arquitectura para Empresas",
    "Proyecto desde Cero",
    "Autorización SEREMI de Salud",
]

NOTIFICATION_EMAILS = [
    "contacto@arquitectochile.com",
    "arquitectopatriciobecar@gmail.com",
]


def classify_lead(lead_data):
    """Clasifica un lead como VIP o Nuevo basado en reglas de negocio."""
    if lead_data.get("branch") == "empresa":
        return "VIP"
    if lead_data.get("service") in VIP_SERVICES:
        return "VIP"
    if lead_data.get("propertyType") == "Industrial":
        return "VIP"
    return "NUEVO"


def build_email_html(lead_data, classification):
    """Genera el HTML del email de notificación."""
    now = datetime.now().strftime("%d/%m/%Y %H:%M")
    badge_color = "#dc2626" if classification == "VIP" else "#2563eb"

    return f"""
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
        <div style="background: #0f172a; color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 18px;">🏗️ Nuevo Lead - ArquitectoChile</h1>
        </div>
        <div style="background: white; padding: 24px; border: 1px solid #e2e8f0;">
            <div style="text-align: center; margin-bottom: 20px;">
                <span style="background: {badge_color}; color: white; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                    {classification}
                </span>
                <p style="color: #64748b; font-size: 12px; margin-top: 8px;">{now}</p>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569; width: 35%;">Tipo</td>
                    <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">{lead_data.get('branch', '-').capitalize()}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Servicio</td>
                    <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">{lead_data.get('service', '-')}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Dirección</td>
                    <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">{lead_data.get('direccion', '-')}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Comuna</td>
                    <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">{lead_data.get('comuna', '-')}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">ROL</td>
                    <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">{lead_data.get('rol', 'No proporcionado')}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Tipo Propiedad</td>
                    <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">{lead_data.get('propertyType', '-')}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Audio</td>
                    <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">{'✅ Sí' if lead_data.get('hasAudio') else '❌ No'}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 8px;">
                <p style="font-weight: bold; color: #475569; margin: 0 0 8px 0; font-size: 13px;">Descripción:</p>
                <p style="color: #334155; margin: 0; font-size: 14px;">{lead_data.get('descripcion', 'Sin descripción')}</p>
            </div>
        </div>
        <div style="text-align: center; padding: 16px; color: #94a3b8; font-size: 11px;">
            ArquitectoChile.com — Sistema de Leads Agustín
        </div>
    </div>
    """


def send_email_notification(lead_data, classification):
    """Envía email de notificación a los destinatarios configurados."""
    smtp_host = os.environ.get("SMTP_HOST")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER")
    smtp_password = os.environ.get("SMTP_PASSWORD")

    if not all([smtp_host, smtp_user, smtp_password]):
        logger.warning("⚠️ SMTP no configurado. Email de notificación no enviado.")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"[{classification}] Nuevo Lead: {lead_data.get('service', 'General')} - {lead_data.get('comuna', 'Sin comuna')}"
        msg["From"] = smtp_user
        msg["To"] = ", ".join(NOTIFICATION_EMAILS)

        html_content = build_email_html(lead_data, classification)
        msg.attach(MIMEText(html_content, "html"))

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, NOTIFICATION_EMAILS, msg.as_string())

        logger.info(f"✅ Email enviado a {NOTIFICATION_EMAILS}")
        return True
    except Exception as e:
        logger.error(f"❌ Error enviando email: {e}")
        return False


def send_to_trello(lead_data, classification):
    """Envía el lead a Trello como una tarjeta en el tablero configurado."""
    if not HAS_REQUESTS:
        logger.warning("⚠️ Módulo 'requests' no disponible. Trello no disponible.")
        return False

    api_key = os.environ.get("TRELLO_API_KEY")
    token = os.environ.get("TRELLO_TOKEN")
    list_vip_id = os.environ.get("TRELLO_LIST_VIP_ID")
    list_new_id = os.environ.get("TRELLO_LIST_NEW_ID")

    if not all([api_key, token]):
        logger.warning("⚠️ Trello no configurado. Tarjeta no creada.")
        return False

    target_list = list_vip_id if classification == "VIP" else list_new_id
    if not target_list:
        logger.warning(f"⚠️ Lista Trello para '{classification}' no configurada.")
        return False

    now = datetime.now().strftime("%d/%m/%Y %H:%M")
    card_name = f"[{classification}] {lead_data.get('service', 'General')} - {lead_data.get('comuna', 'Sin comuna')}"
    card_desc = f"""**Tipo:** {lead_data.get('branch', '-').capitalize()}
**Servicio:** {lead_data.get('service', '-')}
**Dirección:** {lead_data.get('direccion', '-')}
**Comuna:** {lead_data.get('comuna', '-')}
**ROL:** {lead_data.get('rol', 'No proporcionado')}
**Tipo Propiedad:** {lead_data.get('propertyType', '-')}
**Audio:** {'Sí' if lead_data.get('hasAudio') else 'No'}
**Descripción:** {lead_data.get('descripcion', 'Sin descripción')}
---
_Recibido: {now}_
_Fuente: ArquitectoChile.com (Agustín)_"""

    try:
        url = "https://api.trello.com/1/cards"
        params = {
            "key": api_key,
            "token": token,
            "idList": target_list,
            "name": card_name,
            "desc": card_desc,
            "pos": "top",
        }

        if classification == "VIP":
            board_id = os.environ.get("TRELLO_BOARD_ID", "1wGKEkO8")
            labels_url = f"https://api.trello.com/1/boards/{board_id}/labels"
            labels_resp = requests.get(labels_url, params={"key": api_key, "token": token})
            if labels_resp.ok:
                red_labels = [l["id"] for l in labels_resp.json() if l.get("color") == "red"]
                if red_labels:
                    params["idLabels"] = red_labels[0]

        response = requests.post(url, params=params)

        if response.ok:
            logger.info(f"✅ Tarjeta Trello creada: {card_name}")
            return True
        else:
            logger.error(f"❌ Error Trello: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        logger.error(f"❌ Error Trello: {e}")
        return False


def process_lead(lead_data):
    """Procesa un lead completo: clasifica, notifica y registra."""
    classification = classify_lead(lead_data)
    logger.info(f"📋 Lead clasificado como: {classification}")
    logger.info(f"📦 Datos: {json.dumps(lead_data, ensure_ascii=False)}")

    email_sent = send_email_notification(lead_data, classification)
    trello_sent = send_to_trello(lead_data, classification)

    return {
        "success": True,
        "classification": classification,
        "email_sent": email_sent,
        "trello_sent": trello_sent,
    }


if HAS_FLASK:
    app = Flask(__name__)
    CORS(app)

    @app.route("/api/lead", methods=["POST"])
    def handle_lead():
        try:
            lead_data = request.get_json()
            if not lead_data:
                return jsonify({"error": "No se recibieron datos"}), 400

            result = process_lead(lead_data)
            return jsonify(result), 200
        except Exception as e:
            logger.error(f"❌ Error procesando lead: {e}")
            return jsonify({"error": str(e)}), 500

    @app.route("/api/health", methods=["GET"])
    def health():
        smtp_configured = bool(os.environ.get("SMTP_HOST"))
        trello_configured = bool(os.environ.get("TRELLO_API_KEY"))
        return jsonify({
            "status": "ok",
            "smtp": "configured" if smtp_configured else "not_configured",
            "trello": "configured" if trello_configured else "not_configured",
        })

    if __name__ == "__main__":
        port = int(os.environ.get("FLASK_PORT", "5001"))
        app.run(host="0.0.0.0", port=port, debug=True)
