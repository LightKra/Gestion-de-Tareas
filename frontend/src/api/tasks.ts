import { API_URL } from "./config";
import type { Task, CreateTaskData, UpdateTaskData } from "../types";

// Funciones fetch para tareas

/**
 * Obtener todas las tareas (opcionalmente filtradas por listId)
 */
export async function getAllTasks(listId?: number): Promise<Task[]> {
  const url = listId
    ? `${API_URL}/api/tasks?listId=${listId}`
    : `${API_URL}/api/tasks`;

  const response = await fetch(url);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      error.message || error.error || "Error al obtener las tareas"
    );
  }

  return response.json();
}

/**
 * Obtener una tarea por ID
 */
export async function getTaskById(id: number): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/${id}`);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      error.message || error.error || "Error al obtener la tarea"
    );
  }

  return response.json();
}

/**
 * Obtener tareas por lista
 */
export async function getTasksByListId(listId: number): Promise<Task[]> {
  const response = await fetch(`${API_URL}/api/tasks/list/${listId}`);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      error.message || error.error || "Error al obtener las tareas"
    );
  }

  return response.json();
}

/**
 * Obtener tareas sin lista
 */
export async function getTasksWithoutList(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/api/tasks/without-list`);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      error.message || error.error || "Error al obtener las tareas"
    );
  }

  return response.json();
}

/**
 * Obtener tareas completadas
 */
export async function getCompletedTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/api/tasks/completed`);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      error.message || error.error || "Error al obtener las tareas completadas"
    );
  }

  return response.json();
}

/**
 * Obtener tareas pendientes
 */
export async function getPendingTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/api/tasks/pending`);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      error.message || error.error || "Error al obtener las tareas pendientes"
    );
  }

  return response.json();
}

/**
 * Crear una nueva tarea
 */
export async function createTask(data: CreateTaskData): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(error.message || error.error || "Error al crear la tarea");
  }

  return response.json();
}

/**
 * Actualizar una tarea
 */
export async function updateTask(
  id: number,
  data: UpdateTaskData
): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      error.message || error.error || "Error al actualizar la tarea"
    );
  }

  return response.json();
}

/**
 * Marcar tarea como completada
 */
export async function markTaskAsCompleted(id: number): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/${id}/complete`, {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      error.message || error.error || "Error al marcar la tarea como completada"
    );
  }

  return response.json();
}

/**
 * Marcar tarea como pendiente
 */
export async function markTaskAsPending(id: number): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/${id}/pending`, {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      error.message || error.error || "Error al marcar la tarea como pendiente"
    );
  }

  return response.json();
}

/**
 * Eliminar una tarea
 */
export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      error.message || error.error || "Error al eliminar la tarea"
    );
  }
}
