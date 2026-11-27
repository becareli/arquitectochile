import { eq } from "drizzle-orm";
import { db } from "./db";
import { clientProjects, projectLedger } from "@shared/schema";

export const ADMIN_NAME = "Patricio Becar";

export type LedgerEntry = {
  projectId: number | null | undefined;
  taskId?: number | null;
  fileId?: number | null;
  docName?: string | null;
  docVersion?: number | null;
  action: string;
  role: "Asignó" | "Diseñó / ejecutó" | "Revisó" | "Aprobó" | "Devolvió" | "Publicó" | "Solicitó" | "Cerró";
  actorType: "admin" | "collaborator" | "agent" | "system";
  actorName: string;
  detail?: string | null;
};

/** Agrega un registro a la bitácora del proyecto. Nunca falla la operación principal. Tareas internas (sin proyecto) no se registran. */
export async function recordLedger(e: LedgerEntry): Promise<void> {
  if (!e.projectId) return;
  try {
    const [p] = await db.select({ code: clientProjects.code }).from(clientProjects).where(eq(clientProjects.id, e.projectId)).limit(1);
    await db.insert(projectLedger).values({
      projectId: e.projectId,
      projectCode: p?.code ?? null,
      taskId: e.taskId ?? null,
      fileId: e.fileId ?? null,
      docName: e.docName ?? null,
      docVersion: e.docVersion ?? null,
      action: e.action,
      role: e.role,
      actorType: e.actorType,
      actorName: e.actorName,
      detail: e.detail ?? null,
    });
  } catch (err) {
    console.error("ledger error:", (err as Error).message);
  }
}
