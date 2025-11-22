import { db } from "../db/index";
import { tasks, lists, type Task, type NewTask } from "../db/schema";
import { eq, and, or, isNull, isNotNull, desc, asc } from "drizzle-orm";

export class TasksService {
  // Obtener todas las tareas
  async getAll(listId?: number): Promise<Task[]> {
    if (listId) {
      return await db.select().from(tasks).where(eq(tasks.listId, listId));
    }
    return await db.select().from(tasks);
  }

  // Obtener una tarea por ID
  async getById(id: number): Promise<Task | null> {
    const result = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
    return result[0] || null;
  }

  // Obtener tareas por lista
  async getByListId(listId: number): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.listId, listId));
  }

  // Obtener tareas sin lista
  async getWithoutList(): Promise<Task[]> {
    return await db.select().from(tasks).where(isNull(tasks.listId));
  }

  // Obtener tareas completadas
  async getCompleted(): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.isCompleted, true));
  }

  // Obtener tareas pendientes
  async getPending(): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.isCompleted, false));
  }

  // Crear una nueva tarea
  async create(data: Omit<NewTask, "id" | "createdAt" | "updatedAt">): Promise<Task> {
    const newTask: NewTask = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await db.insert(tasks).values(newTask).returning();
    return result[0];
  }

  // Actualizar una tarea
  async update(id: number, data: Partial<Omit<NewTask, "id" | "createdAt">>): Promise<Task | null> {
    const updateData = {
      ...data,
      updatedAt: new Date(),
    };
    const result = await db
      .update(tasks)
      .set(updateData)
      .where(eq(tasks.id, id))
      .returning();
    return result[0] || null;
  }

  // Marcar tarea como completada
  async markAsCompleted(id: number): Promise<Task | null> {
    return await this.update(id, { isCompleted: true });
  }

  // Marcar tarea como pendiente
  async markAsPending(id: number): Promise<Task | null> {
    return await this.update(id, { isCompleted: false });
  }

  // Eliminar una tarea
  async delete(id: number): Promise<boolean> {
    const result = await db.delete(tasks).where(eq(tasks.id, id)).returning();
    return result.length > 0;
  }

  // Eliminar todas las tareas de una lista
  async deleteByListId(listId: number): Promise<number> {
    const result = await db.delete(tasks).where(eq(tasks.listId, listId)).returning();
    return result.length;
  }
}

export const tasksService = new TasksService();

