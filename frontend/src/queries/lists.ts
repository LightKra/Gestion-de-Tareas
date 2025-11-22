import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllLists,
  getListById,
  createList,
  updateList,
  deleteList,
} from "../api/lists";
import type { CreateListData, UpdateListData } from "../types";

// Query keys
export const listsKeys = {
  all: ["lists"] as const,
  lists: () => [...listsKeys.all, "list"] as const,
  list: (id: number) => [...listsKeys.all, "detail", id] as const,
};

// Hooks de queries (GET)

/**
 * Hook para obtener todas las listas
 */
export function useLists() {
  return useQuery({
    queryKey: listsKeys.lists(),
    queryFn: getAllLists,
  });
}

/**
 * Hook para obtener una lista por ID
 */
export function useList(id: number) {
  return useQuery({
    queryKey: listsKeys.list(id),
    queryFn: () => getListById(id),
    enabled: !!id,
  });
}

// Hooks de mutaciones (POST, PUT, DELETE)

/**
 * Hook para crear una nueva lista
 */
export function useCreateList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateListData) => createList(data),
    onSuccess: () => {
      // Invalidar la lista de listas para refrescar
      queryClient.invalidateQueries({ queryKey: listsKeys.lists() });
    },
  });
}

/**
 * Hook para actualizar una lista
 */
export function useUpdateList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateListData }) =>
      updateList(id, data),
    onSuccess: (_data, variables) => {
      // Invalidar la lista específica y la lista general
      queryClient.invalidateQueries({ queryKey: listsKeys.list(variables.id) });
      queryClient.invalidateQueries({ queryKey: listsKeys.lists() });
    },
  });
}

/**
 * Hook para eliminar una lista
 */
export function useDeleteList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteList(id),
    onSuccess: (_data, id) => {
      // Invalidar la lista específica y la lista general
      queryClient.invalidateQueries({ queryKey: listsKeys.list(id) });
      queryClient.invalidateQueries({ queryKey: listsKeys.lists() });
      // También invalidar las tareas ya que pueden estar relacionadas
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
