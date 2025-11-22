import { Request, Response } from "express";
import { listsService } from "../services/lists.service";

// GET /api/lists - Obtener todas las listas
export async function getAll(_req: Request, res: Response): Promise<void> {
  try {
    const lists = await listsService.getAll();
    res.json(lists);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las listas",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// GET /api/lists/:id - Obtener una lista por ID
export async function getById(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const list = await listsService.getById(id);
    if (!list) {
      res.status(404).json({ error: "Lista no encontrada" });
      return;
    }

    res.json(list);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener la lista",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// POST /api/lists - Crear una nueva lista
export async function create(req: Request, res: Response): Promise<void> {
  try {
    const { name, color } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res.status(400).json({ error: "El nombre es requerido" });
      return;
    }

    if (name.length > 150) {
      res
        .status(400)
        .json({ error: "El nombre no puede exceder 150 caracteres" });
      return;
    }

    if (color && color.length > 20) {
      res
        .status(400)
        .json({ error: "El color no puede exceder 20 caracteres" });
      return;
    }

    const newList = await listsService.create({
      name: name.trim(),
      color: color?.trim() || null,
    });
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear la lista",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// PUT /api/lists/:id - Actualizar una lista
export async function update(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const { name, color } = req.body;

    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length === 0) {
        res.status(400).json({ error: "El nombre no puede estar vacío" });
        return;
      }
      if (name.length > 150) {
        res
          .status(400)
          .json({ error: "El nombre no puede exceder 150 caracteres" });
        return;
      }
    }

    if (color !== undefined && color !== null && color.length > 20) {
      res
        .status(400)
        .json({ error: "El color no puede exceder 20 caracteres" });
      return;
    }

    const updateData: { name?: string; color?: string | null } = {};
    if (name !== undefined) updateData.name = name.trim();
    if (color !== undefined) updateData.color = color?.trim() || null;

    const updatedList = await listsService.update(id, updateData);
    if (!updatedList) {
      res.status(404).json({ error: "Lista no encontrada" });
      return;
    }

    res.json(updatedList);
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar la lista",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// DELETE /api/lists/:id - Eliminar una lista
export async function deleteList(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const deleted = await listsService.delete(id);
    if (!deleted) {
      res.status(404).json({ error: "Lista no encontrada" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar la lista",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}
