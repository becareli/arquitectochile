import { and, asc, eq, isNull, like, sql } from "drizzle-orm";
import { db } from "./db";
import { clientProjects, clientDocuments, officeTaskFiles, officeTasks } from "@shared/schema";

/** Siguiente código libre del año: AC-2026-001, AC-2026-002... */
async function nextCode(year: number): Promise<string> {
  const prefix = `AC-${year}-`;
  const [row] = await db
    .select({ max: sql<number>`coalesce(max(cast(substring(${clientProjects.code} from '[0-9]+$') as integer)), 0)::int` })
    .from(clientProjects)
    .where(like(clientProjects.code, `${prefix}%`));
  return `${prefix}${String((row?.max ?? 0) + 1).padStart(3, "0")}`;
}

/** Asigna código a un proyecto que no lo tiene. Reintenta si dos proyectos piden el mismo número a la vez. */
export async function assignProjectCode(projectId: number, createdAt: Date): Promise<string | null> {
  const year = createdAt.getFullYear();
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = await nextCode(year);
    try {
      const [row] = await db
        .update(clientProjects)
        .set({ code })
        .where(and(eq(clientProjects.id, projectId), isNull(clientProjects.code)))
        .returning({ code: clientProjects.code });
      return row?.code ?? null; // null = ya tenía código
    } catch (err) {
      if ((err as { code?: string }).code !== "23505") throw err;
    }
  }
  return null;
}

/** Códigos para todos los proyectos existentes, del más antiguo al más nuevo. */
export async function backfillProjectCodes(): Promise<number> {
  const pending = await db
    .select({ id: clientProjects.id, createdAt: clientProjects.createdAt })
    .from(clientProjects)
    .where(isNull(clientProjects.code))
    .orderBy(asc(clientProjects.createdAt), asc(clientProjects.id));
  let n = 0;
  for (const p of pending) if (await assignProjectCode(p.id, p.createdAt)) n++;
  return n;
}

/**
 * Versión siguiente de una lámina o documento. Es la misma lámina si coinciden proyecto, disciplina, tipo y
 * descripción (slug), sin importar qué tarea o colaborador la suba. Mira lo de la oficina y lo del portal.
 */
export async function nextDocVersion(projectId: number, discipline: string, docKind: string, docSlug: string): Promise<number> {
  const [office] = await db
    .select({ v: sql<number>`coalesce(max(${officeTaskFiles.version}), 0)::int` })
    .from(officeTaskFiles)
    .innerJoin(officeTasks, eq(officeTaskFiles.taskId, officeTasks.id))
    .where(and(eq(officeTasks.projectId, projectId), eq(officeTasks.discipline, discipline), eq(officeTaskFiles.docKind, docKind), eq(officeTaskFiles.docSlug, docSlug)));
  const [portal] = await db
    .select({ v: sql<number>`coalesce(max(${clientDocuments.version}), 0)::int` })
    .from(clientDocuments)
    .where(and(eq(clientDocuments.projectId, projectId), eq(clientDocuments.discipline, discipline), eq(clientDocuments.docKind, docKind), eq(clientDocuments.docSlug, docSlug)));
  return Math.max(office?.v ?? 0, portal?.v ?? 0) + 1;
}
