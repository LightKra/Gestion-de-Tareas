import { db } from "../db/index";
import { lists, type List, type NewList } from "../db/schema";
import { eq } from "drizzle-orm";

export class ListsService {
  // Obtener todas las listas
  async getAll(): Promise<List[]> {
    return await db.select().from(lists);
  }

  // Obtener una lista por ID
  async getById(id: number): Promise<List | null> {
    const result = await db.select().from(lists).where(eq(lists.id, id)).limit(1);
    return result[0] || null;
  }

  // Crear una nueva lista
  async create(data: Omit<NewList, "id" | "createdAt" | "updatedAt">): Promise<List> {
    const newList: NewList = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await db.insert(lists).values(newList).returning();
    return result[0];
  }

  // Actualizar una lista
  async update(id: number, data: Partial<Omit<NewList, "id" | "createdAt">>): Promise<List | null> {
    const updateData = {
      ...data,
      updatedAt: new Date(),
    };
    const result = await db
      .update(lists)
      .set(updateData)
      .where(eq(lists.id, id))
      .returning();
    return result[0] || null;
  }

  // Eliminar una lista
  async delete(id: number): Promise<boolean> {
    const result = await db.delete(lists).where(eq(lists.id, id)).returning();
    return result.length > 0;
  }
}

export const listsService = new ListsService();

