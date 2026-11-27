import type { DisciplineCode } from "./classification";

/**
 * Catálogo de perfiles de la red de colaboradores (solo diseño y gestión de proyectos; sin ejecución de obras).
 * Cada perfil trae su disciplina por defecto, que es la que se usa al crearle tareas y nombrar sus entregas.
 */
export type RoleDef = { code: string; label: string; group: string; discipline: DisciplineCode; registry?: boolean };

export const ROLE_GROUPS = ["Arquitectura y gestión", "Revisión independiente", "Ingeniería", "Instalaciones y especialidades", "Terreno y obra (sin ejecución)"] as const;

export const ROLES: RoleDef[] = [
  { code: "arq-proyectista", label: "Arquitecto proyectista", group: "Arquitectura y gestión", discipline: "ARQ" },
  { code: "tramitador", label: "Tramitador municipal", group: "Arquitectura y gestión", discipline: "LEG" },
  { code: "bim-coord", label: "Arquitecto coordinador BIM", group: "Arquitectura y gestión", discipline: "BIM" },
  { code: "bim-modelador", label: "Modelador BIM", group: "Arquitectura y gestión", discipline: "BIM" },
  { code: "cubicador", label: "Cubicador / presupuestista", group: "Arquitectura y gestión", discipline: "PRE" },
  { code: "paisajista", label: "Paisajista", group: "Arquitectura y gestión", discipline: "PAI" },
  { code: "rev-arq-1", label: "Revisor independiente de arquitectura, 1ª categoría", group: "Revisión independiente", discipline: "REV", registry: true },
  { code: "rev-arq-2", label: "Revisor independiente de arquitectura, 2ª categoría", group: "Revisión independiente", discipline: "REV", registry: true },
  { code: "rev-arq-3", label: "Revisor independiente de arquitectura, 3ª categoría", group: "Revisión independiente", discipline: "REV", registry: true },
  { code: "rev-calculo", label: "Revisor independiente de cálculo estructural", group: "Revisión independiente", discipline: "REV", registry: true },
  { code: "ing-estructural", label: "Ingeniero civil calculista / estructural", group: "Ingeniería", discipline: "EST" },
  { code: "ing-hidraulico", label: "Ingeniero hidráulico", group: "Ingeniería", discipline: "HID" },
  { code: "ing-transito", label: "Ingeniero de tránsito (IMIV)", group: "Ingeniería", discipline: "VIA" },
  { code: "ing-suelos", label: "Ingeniero mecánico de suelos / geotecnia", group: "Ingeniería", discipline: "MDS" },
  { code: "proy-sanitario", label: "Proyectista sanitario (agua potable)", group: "Instalaciones y especialidades", discipline: "SAN" },
  { code: "proy-alcantarillado", label: "Proyectista de alcantarillado", group: "Instalaciones y especialidades", discipline: "ALC" },
  { code: "proy-electrico", label: "Proyectista eléctrico", group: "Instalaciones y especialidades", discipline: "ELE", registry: true },
  { code: "proy-gas", label: "Proyectista de gas", group: "Instalaciones y especialidades", discipline: "GAS", registry: true },
  { code: "proy-corrientes-debiles", label: "Proyectista de corrientes débiles", group: "Instalaciones y especialidades", discipline: "CDB" },
  { code: "proy-clima", label: "Proyectista de climatización y ventilación", group: "Instalaciones y especialidades", discipline: "CLI" },
  { code: "proy-ernc", label: "Proyectista de energías renovables (ERNC)", group: "Instalaciones y especialidades", discipline: "ERN" },
  { code: "proy-piscinas", label: "Proyectista de piscinas", group: "Instalaciones y especialidades", discipline: "PIS" },
  { code: "proy-incendio", label: "Proyectista de seguridad contra incendio", group: "Instalaciones y especialidades", discipline: "INC" },
  { code: "proy-termico", label: "Especialista en eficiencia térmica / calificación energética", group: "Instalaciones y especialidades", discipline: "TER" },
  { code: "proy-acustica", label: "Especialista en acústica", group: "Instalaciones y especialidades", discipline: "ACU" },
  { code: "topografo", label: "Topógrafo", group: "Terreno y obra (sin ejecución)", discipline: "TOP" },
  { code: "constructor-civil", label: "Constructor civil", group: "Terreno y obra (sin ejecución)", discipline: "OBR" },
  { code: "ito", label: "Inspector técnico de obra (ITO)", group: "Terreno y obra (sin ejecución)", discipline: "OBR" },
];

export const roleByCode = (code: string | null | undefined) => ROLES.find((r) => r.code === code) ?? null;
