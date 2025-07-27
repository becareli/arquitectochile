# Configuración TidyCal + Google Meet

## Pasos para configurar la integración completa:

### 1. Crear API Token en TidyCal
**✅ Ya estás en la página correcta (OAuth)**

1. Haz clic en **"Create New Token"** en la sección "Personal Access Tokens"
2. Dale un nombre como: `ArquitectoChile-Integration`
3. Copia el token generado (guárdalo seguro, no se mostrará de nuevo)

### 2. Configurar Google Meet automático
1. Ve a **Booking Types** en el menú principal
2. Selecciona tu tipo de cita existente
3. En la configuración de la cita:
   - Ve a **"Meeting Settings"** o **"Location"**
   - Selecciona **"Google Meet"** como ubicación predeterminada
   - Asegúrate de que esté conectado a tu Google Calendar

### 3. Configurar Webhooks
1. Ve a **"Integrations"** → **"Webhooks"**
2. Crea un nuevo webhook con esta URL:
   ```
   https://tu-dominio-replit.replit.app/api/webhooks/tidycal
   ```
3. Selecciona estos eventos:
   - ✅ Appointment Scheduled
   - ✅ Appointment Cancelled  
   - ✅ Appointment Completed
   - ✅ Appointment Rescheduled

### 4. Variables de entorno a configurar
Una vez que tengas el token, agrega estas variables:

```bash
TIDYCAL_API_KEY=tu_token_aquí
TIDYCAL_ENABLED=true
TIDYCAL_WEBHOOK_URL=https://tu-dominio.replit.app/api/webhooks/tidycal
```

### 5. Verificación
Después de configurar todo, usa el panel de admin en:
`/admin/integrations` para probar que todo funciona.

## ¿Qué hace cada cosa?

- **API Token**: Permite que tu sistema se comunique con TidyCal
- **Google Meet**: Se genera automáticamente para cada cita
- **Webhooks**: TidyCal notifica a tu sistema cuando pasa algo
- **Sistema de validación**: Tu plataforma verifica que el enlace de Meet llegue correctamente

## Resultado esperado:
Cuando alguien agenda una cita:
1. 📅 Se crea en TidyCal
2. 🔗 Se genera enlace de Google Meet automáticamente
3. 📨 TidyCal envía webhook a tu sistema
4. 💾 Tu sistema registra el lead con el enlace de Meet
5. ✅ El cliente recibe confirmación con enlace incluido