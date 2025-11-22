import { Request, Response } from "express";
import { tasksService } from "../services/tasks.service";

// GET /api/tasks - Obtener todas las tareas (opcionalmente filtradas por listId)
export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const listId = req.query.listId ? parseInt(req.query.listId as string) : undefined;
    
    if (listId !== undefined && isNaN(listId)) {
      res.status(400).json({ error: "listId inválido" });
      return;
    }

    const tasks = await tasksService.getAll(listId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas", message: error instanceof Error ? error.message : "Error desconocido" });
  }
}

// GET /api/tasks/:id - Obtener una tarea por ID
export async function getById(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const task = await tasksService.getById(id);
    if (!task) {
      res.status(404).json({ error: "Tarea no encontrada" });
      return;
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tarea", message: error instanceof Error ? error.message : "Error desconocido" });
  }
}

// GET /api/tasks/list/:listId - Obtener tareas por lista
export async function getByListId(req: Request, res: Response): Promise<void> {
  try {
    const listId = parseInt(req.params.listId);
    if (isNaN(listId)) {
      res.status(400).json({ error: "listId inválido" });
      return;
    }

    const tasks = await tasksService.getByListId(listId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas", message: error instanceof Error ? error.message : "Error desconocido" });
  }
}

// GET /api/tasks/without-list - Obtener tareas sin lista
export async function getWithoutList(req: Request, res: Response): Promise<void> {
  try {
    const tasks = await tasksService.getWithoutList();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas", message: error instanceof Error ? error.message : "Error desconocido" });
  }
}

// GET /api/tasks/completed - Obtener tareas completadas
export async function getCompleted(req: Request, res: Response): Promise<void> {
  try {
    const tasks = await tasksService.getCompleted();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas completadas", message: error instanceof Error ? error.message : "Error desconocido" });
  }
}

// GET /api/tasks/pending - Obtener tareas pendientes
export async function getPending(req: Request, res: Response): Promise<void> {
  try {
    const tasks = await tasksService.getPending();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas pendientes", message: error instanceof Error ? error.message : "Error desconocido" });
  }
}

// POST /api/tasks - Crear una nueva tarea
export async function create(req: Request, res: Response): Promise<void> {
  try {
    const { listId, title, description, dueDate, priority } = req.body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      res.status(400).json({ error: "El título es requerido" });
      return;
    }

    if (title.length > 300) {
      res.status(400).json({ error: "El título no puede exceder 300 caracteres" });
      return;
    }

    if (priority !== undefined && (priority < 1 || priority > 3)) {
      res.status(400).json({ error: "La prioridad debe ser 1 (alta), 2 (media) o 3 (baja)" });
      return;
    }

    if (listId !== undefined && listId !== null && isNaN(parseInt(listId))) {
      res.status(400).json({ error: "listId inválido" });
      return;
    }

    const newTask = await tasksService.create({
      listId: listId ? parseInt(listId) : null,
      title: title.trim(),
      description: description?.trim() || null,
      dueDate: dueDate ? new Date(dueDate) : null,
      isCompleted: false,
      priority: priority || 2, // Por defecto prioridad media
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea", message: error instanceof Error ? error.message : "Error desconocido" });
  }
}

// PUT /api/tasks/:id - Actualizar una tarea
export async function update(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const { listId, title, description, dueDate, isCompleted, priority } = req.body;

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length === 0) {
        res.status(400).json({ error: "El título no puede estar vacío" });
        return;
      }
      if (title.length > 300) {
        res.status(400).json({ error: "El título no puede exceder 300 caracteres" });
        return;
      }
    }

    if (priority !== undefined && (priority < 1 || priority > 3)) {
      res.status(400).json({ error: "La prioridad debe ser 1 (alta), 2 (media) o 3 (baja)" });
      return;
    }

    if (listId !== undefined && listId !== null && isNaN(parseInt(listId))) {
      res.status(400).json({ error: "listId inválido" });
      return;
    }

    const updateData: {
      listId?: number | null;
      title?: string;
      description?: string | null;
      dueDate?: Date | null;
      isCompleted?: boolean;
      priority?: number;
    } = {};

    if (listId !== undefined) updateData.listId = listId ? parseInt(listId) : null;
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description?.trim() || null;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    if (isCompleted !== undefined) updateData.isCompleted = Boolean(isCompleted);
    if (priority !== undefined) updateData.priority = priority;

    const updatedTask = await tasksService.update(id, updateData);
    if (!updatedTask) {
      res.status(404).json({ error: "Tarea no encontrada" });
      return;
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea", message: error instanceof Error ? error.message : "Error desconocido" });
  }
}

// PATCH /api/tasks/:id/complete - Marcar tarea como completada
export async function markAsCompleted(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const task = await tasksService.markAsCompleted(id);
    if (!task) {
      res.status(404).json({ error: "Tarea no encontrada" });
      return;
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al marcar la tarea como completada", message: error instanceof Error ? error.message : "Error desconocido" });
  }
}

// PATCH /api/tasks/:id/pending - Marcar tarea como pendiente
export async function markAsPending(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const task = await tasksService.markAsPending(id);
    if (!task) {
      res.status(404).json({ error: "Tarea no encontrada" });
      return;
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al marcar la tarea como pendiente", message: error instanceof Error ? error.message : "Error desconocido" });
  }
}

// DELETE /api/tasks/:id - Eliminar una tarea
export async function deleteTask(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const deleted = await tasksService.delete(id);
    if (!deleted) {
      res.status(404).json({ error: "Tarea no encontrada" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea", message: error instanceof Error ? error.message : "Error desconocido" });
  }
}
