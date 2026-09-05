---
name: arquitectochile-operaciones
description: Gestiona las operaciones digitales de la oficina de arquitectura, construcción e ingeniería de ArquitectoChile (Patricio Becar y colaboradores/freelancers), incluyendo la experiencia y onboarding de clientes nuevos. Define las fases de cada proyecto -desde el primer contacto hasta la recepción final y postventa-, checklist de documentos, estructura de carpetas en Drive, informes de visita a obra, minutas, seguimiento semanal, delegación de tareas, y el contenido del portal del cliente en cada etapa. Usa este skill cuando se mencione un proyecto o cliente de ArquitectoChile, una obra, un permiso de edificación, una visita a terreno, el estado de un proyecto, organizar el Drive de un proyecto, coordinar con un colaborador, el onboarding o bienvenida a un cliente, el portal del cliente, solicitud de reseñas, o un informe/minuta/cotización/checklist de la oficina - aunque no se diga "operaciones" explícitamente.
---

# Operaciones ArquitectoChile

Este skill le da a Claude un modelo operativo único para la oficina: mismas fases, mismas carpetas, mismos formatos, sin importar si Patricio, un colaborador o un freelancer es quien pregunta. El problema que resuelve no es falta de información, sino que hoy vive repartida entre Drive, Excel y WhatsApp sin un hilo conductor. Este skill es ese hilo conductor.

Equipo típico: Patricio + 1-2 colaboradores o freelancers por proyecto. No asumas que existe un software de gestión de proyectos dedicado - si el usuario menciona uno (Notion, Trello, etc.), adapta el flujo a esa herramienta en vez de imponer la tuya.

## Modelo de fases de proyecto

Todo proyecto de ArquitectoChile pasa por estas fases (ver `references/fases-proyecto.md` para el detalle completo de entradas, entregables, checklist y riesgos de cada una):

0. Prospección / primer contacto
1. Diagnóstico y propuesta de honorarios
2. Anteproyecto (diseño preliminar + 3D)
3. Proyecto de arquitectura y especialidades
4. Permisos (ingreso y tramitación en la DOM)
5. Construcción / ejecución de obra
6. Inspección técnica de obra (ITO)
7. Recepción final y entrega
8. Postventa

Cuando te pregunten por el estado de un proyecto, ubícalo en una de estas fases antes de responder. Si no tienes información suficiente para saberlo, pregúntalo una sola vez ("¿en qué fase están: diseño, permisos, obra...?") en vez de asumir.

**Nota de precisión:** los requisitos exactos de expedientes municipales (DOM) pueden variar según la comuna y cambian con el tiempo. Trata las listas de documentos en `fases-proyecto.md` como un punto de partida a validar, no como verdad legal definitiva - dilo explícitamente si el usuario va a usarlas para un ingreso real.

## Seguimiento de proyectos

Mantén un tablero simple por proyecto con estas columnas: Proyecto/Cliente | Fase actual | Última acción | Próxima acción | Responsable | Fecha límite.

- Si es la primera vez que se menciona un proyecto en la conversación, créalo como tabla markdown en el chat (no como artifact salvo que el usuario pida guardarlo).
- Si Google Drive está conectado (usa `tool_search` con algo como "google drive files" para cargar las herramientas) y el usuario quiere que el seguimiento viva ahí, ofrece crear o actualizar una hoja de cálculo en la carpeta `05_Seguimiento` del proyecto (ver estructura de carpetas abajo) en vez de duplicar la fuente de verdad.
- Cuando el usuario pida "el estado de todos los proyectos", pide primero la lista de proyectos activos si no la tienes - no la inventes.

## Estructura de carpetas en Drive

Estructura estándar por proyecto (una carpeta raíz por cliente/proyecto):

```
[Cliente] - [Dirección o nombre del proyecto]/
├── 01_Contacto y Propuesta
├── 02_Diseño (Anteproyecto y Proyecto)
├── 03_Permisos
├── 04_Construcción
├── 05_Seguimiento (tablero, informes de visita, minutas)
├── 06_Contratos y Facturación
└── 07_Comunicación con Cliente
```

Si el usuario pide "organizar" o "crear la carpeta" de un proyecto nuevo, y Google Drive está conectado, ofrécete a crearla con esta estructura antes de preguntar si prefiere otra - es más rápido para el usuario corregir una propuesta que armar una desde cero.

## Plantillas operativas

Usa las plantillas de `references/plantillas.md` para generar (según lo que pida el usuario):

- Informe de visita a obra / inspección
- Minuta de reunión
- Checklist de expediente para permiso de edificación
- Ficha de delegación de tarea a un colaborador/freelancer
- Cotización / propuesta de honorarios (estructura, no montos - los montos los define Patricio)

No inventes datos que falten (fecha, avance %, nombre del colaborador, etc.): pide el dato puntual o dejá el campo marcado como `[pendiente]`.

## Comunicación con clientes y colaboradores

El tono de ArquitectoChile hacia clientes es cercano y tranquilizador, con énfasis en la seguridad legal del proceso ("construir sin dolores de cabeza legales"), sin sonar corporativo ni distante. Hacia colaboradores/freelancers el tono es directo y concreto: qué se necesita, para cuándo, en qué formato.

Si Gmail está conectado y el usuario pide "avisarle a [cliente]" o "pedirle esto a [colaborador]", ofrece redactar el correo (o el borrador, si prefiere revisarlo antes de enviarlo) en vez de solo describir qué debería decir.

## Delegar una tarea a un colaborador/freelancer

Toda delegación debe dejar claro: contexto (a qué proyecto/fase pertenece), entregable concreto, plazo, formato esperado y a quién/dónde enviarlo. Una delegación vaga es la causa más común de reprocesos en un equipo chico - por eso vale la pena ser explícito aunque parezca obvio. Usa la plantilla de `references/plantillas.md`.

## Experiencia del cliente, onboarding y portal del cliente

Cuando te pidan diseñar o mejorar el onboarding de clientes nuevos, el contenido del portal del cliente, mensajes de bienvenida, o la forma de pedir reseñas, ve a `references/experiencia-cliente.md`. Ahí están los compromisos de tiempo por etapa, qué debería mostrar el portal en cada fase, la plantilla de bienvenida, y el protocolo para conseguir reseñas positivas de forma honesta (sin filtrar a quién se le pide - eso es review-gating y está prohibido en la mayoría de las plataformas).
