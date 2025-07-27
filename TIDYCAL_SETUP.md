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

- **TidyCal**: Crea la cita Y genera el Google Meet automáticamente
- **API Token**: Permite comunicación entre sistemas (opcional para webhooks)
- **Webhooks**: TidyCal te notifica cuando alguien agenda, incluyendo el enlace de Meet
- **Tu sistema**: Recibe el enlace que TidyCal ya creó y lo guarda con los datos del cliente

## Flujo real:
Cuando alguien agenda una cita:
1. 📅 Cliente agenda en TidyCal
2. 🔗 **TidyCal genera Google Meet automáticamente**
3. 📨 TidyCal envía webhook con todos los datos (incluyendo enlace de Meet)
4. 💾 Tu sistema recibe y registra: cliente + fecha + enlace de Meet
5. ✅ Tienes toda la información centralizada para la cita

**Tu sistema NO crea el Google Meet - solo recibe y organiza la información que TidyCal ya procesó.**