# Plantillas operativas - ArquitectoChile

Genera estas plantillas rellenas con los datos que el usuario dé. Si falta un dato puntual, escribe `[pendiente]` en ese campo en vez de inventarlo, y pregunta por los datos críticos que falten (no lo obvio).

## Informe de visita a obra / inspección

```
INFORME DE VISITA A OBRA
Proyecto: [nombre/dirección]
Fecha: [fecha]
Asistentes: [nombres]
Avance estimado: [%]

Estado general:
[descripción breve]

Observaciones / desviaciones respecto al proyecto:
- [observación 1]
- [observación 2]

Fotos adjuntas: [sí/no - cuáles]

Próximos pasos:
- [acción] — responsable: [nombre] — fecha: [fecha]
```

## Minuta de reunión

```
MINUTA DE REUNIÓN
Proyecto: [nombre]
Fecha: [fecha]
Asistentes: [nombres]

Temas tratados:
1. [tema]
2. [tema]

Acuerdos:
- [acuerdo] — responsable: [nombre] — plazo: [fecha]

Pendientes para la próxima reunión:
- [pendiente]
```

## Checklist de expediente para permiso de edificación

Usa la lista de la Fase 4 en `fases-proyecto.md` como base, pero preséntala como checklist marcable y agrega siempre esta advertencia al final:

> Esta lista es un punto de partida general. Verifica los requisitos específicos con la Dirección de Obras Municipales de la comuna correspondiente antes de ingresar el expediente, ya que pueden variar según comuna y tipo de proyecto.

## Ficha de delegación de tarea

```
DELEGACIÓN DE TAREA
Proyecto: [nombre]
Para: [colaborador/freelancer]
Fecha de entrega: [fecha]

Contexto:
[por qué se necesita esto y en qué fase del proyecto encaja]

Entregable esperado:
[qué exactamente debe entregar]

Formato:
[PDF, planos DWG, foto, informe, etc.]

Enviar a:
[correo / carpeta de Drive / canal]
```

## Cotización / propuesta de honorarios (estructura)

No definas montos - esos los fija Patricio. Genera la estructura para que él la complete:

```
PROPUESTA DE HONORARIOS
Cliente: [nombre]
Proyecto: [dirección / descripción breve]
Fecha: [fecha]

Alcance del servicio:
- [ítem 1: p.ej. diseño de arquitectura]
- [ítem 2: p.ej. gestión de permiso de edificación]
- [ítem 3: p.ej. inspección técnica de obra]

Fuera de alcance (para evitar ambigüedad):
- [ítem]

Plazo estimado: [pendiente]
Honorarios: [pendiente]
Forma de pago: [pendiente]
Validez de la propuesta: [pendiente]
```

## Seguimiento semanal de proyectos (tabla)

```
| Proyecto/Cliente | Fase actual | Última acción | Próxima acción | Responsable | Fecha límite |
|---|---|---|---|---|---|
```

Complétala solo con proyectos que el usuario mencione como activos - no inventes proyectos ni fechas.
