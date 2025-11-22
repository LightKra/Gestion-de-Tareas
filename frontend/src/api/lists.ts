import { API_URL } from "./config";
import type { ListType, CreateListData, UpdateListData } from "../types";

// Funciones fetch para listas

/**
 * Obtener todas las listas
 */
export async function getAllLists(): Promise<ListType[]> {
  const response = await fetch(`${API_URL}/api/lists`);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      error.message || error.error || "Error al obtener las listas"
    );
  }

  return response.json();
}

/**
 * Obtener una lista por ID
 */
export async function getListById(id: number): Promise<ListType> {
  const response = await fetch(`${API_URL}/api/lists/${id}`);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      error.message || error.error || "Error al obtener la lista"
    );
  }

  return response.json();
}

/**
 * Crear una nueva lista
 */
export async function createList(data: CreateListData): Promise<ListType> {
  const response = await fetch(`${API_URL}/api/lists`, {
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
    throw new Error(error.message || error.error || "Error al crear la lista");
  }

  return response.json();
}

/**
 * Actualizar una lista
 */
export async function updateList(
  id: number,
  data: UpdateListData
): Promise<ListType> {
  const response = await fetch(`${API_URL}/api/lists/${id}`, {
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
      error.message || error.error || "Error al actualizar la lista"
    );
  }

  return response.json();
}

/**
 * Eliminar una lista
 */
export async function deleteList(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/lists/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      error.message || error.error || "Error al eliminar la lista"
    );
  }
}
