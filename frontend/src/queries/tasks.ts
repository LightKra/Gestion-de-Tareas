import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTasks,
  getTaskById,
  getTasksByListId,
  getTasksWithoutList,
  getCompletedTasks,
  getPendingTasks,
  createTask,
  updateTask,
  markTaskAsCompleted,
  markTaskAsPending,
  deleteTask,
} from "../api/tasks";
import type { CreateTaskData, UpdateTaskData } from "../types";

// Query keys
export const tasksKeys = {
  all: ["tasks"] as const,
  lists: {
    all: () => [...tasksKeys.all, "list"] as const,
    detail: (listId: number) => [...tasksKeys.lists.all(), listId] as const,
  },
  detail: (id: number) => [...tasksKeys.all, "detail", id] as const,
  allTasks: () => [...tasksKeys.all, "all"] as const,
  withoutList: () => [...tasksKeys.all, "without-list"] as const,
  completed: () => [...tasksKeys.all, "completed"] as const,
  pending: () => [...tasksKeys.all, "pending"] as const,
};

// Hooks de queries (GET)

/**
 * Hook para obtener todas las tareas (opcionalmente filtradas por listId)
 */
export function useTasks(listId?: number) {
  return useQuery({
    queryKey: listId ? tasksKeys.lists.detail(listId) : tasksKeys.allTasks(),
    queryFn: () => getAllTasks(listId),
  });
}

/**
 * Hook para obtener una tarea por ID
 */
export function useTask(id: number) {
  return useQuery({
    queryKey: tasksKeys.detail(id),
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });
}

/**
 * Hook para obtener tareas por lista
 */
export function useTasksByListId(listId: number) {
  return useQuery({
    queryKey: tasksKeys.lists.detail(listId),
    queryFn: () => getTasksByListId(listId),
    enabled: !!listId,
  });
}

/**
 * Hook para obtener tareas sin lista
 */
export function useTasksWithoutList() {
  return useQuery({
    queryKey: tasksKeys.withoutList(),
    queryFn: getTasksWithoutList,
  });
}

/**
 * Hook para obtener tareas completadas
 */
export function useCompletedTasks() {
  return useQuery({
    queryKey: tasksKeys.completed(),
    queryFn: getCompletedTasks,
  });
}

/**
 * Hook para obtener tareas pendientes
 */
export function usePendingTasks() {
  return useQuery({
    queryKey: tasksKeys.pending(),
    queryFn: getPendingTasks,
  });
}

// Hooks de mutaciones (POST, PUT, PATCH, DELETE)

/**
 * Hook para crear una nueva tarea
 */
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskData) => createTask(data),
    onSuccess: (data) => {
      // Invalidar todas las queries de tareas
      queryClient.invalidateQueries({ queryKey: tasksKeys.all });
      // Si la tarea tiene una lista, invalidar también esa lista específica
      if (data.listId) {
        queryClient.invalidateQueries({
          queryKey: tasksKeys.lists.detail(data.listId),
        });
      }
    },
  });
}

/**
 * Hook para actualizar una tarea
 */
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskData }) =>
      updateTask(id, data),
    onSuccess: (data, variables) => {
      // Invalidar la tarea específica y todas las listas relacionadas
      queryClient.invalidateQueries({
        queryKey: tasksKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: tasksKeys.all });

      // Si la tarea tiene una lista, invalidar también esa lista específica
      if (data.listId) {
        queryClient.invalidateQueries({
          queryKey: tasksKeys.lists.detail(data.listId),
        });
      }
    },
  });
}

/**
 * Hook para marcar tarea como completada
 */
export function useMarkTaskAsCompleted() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => markTaskAsCompleted(id),
    onSuccess: (data, id) => {
      // Invalidar la tarea específica y todas las queries relacionadas
      queryClient.invalidateQueries({ queryKey: tasksKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: tasksKeys.all });

      // Invalidar queries de completadas y pendientes
      queryClient.invalidateQueries({ queryKey: tasksKeys.completed() });
      queryClient.invalidateQueries({ queryKey: tasksKeys.pending() });

      // Si la tarea tiene una lista, invalidar también esa lista específica
      if (data.listId) {
        queryClient.invalidateQueries({
          queryKey: tasksKeys.lists.detail(data.listId),
        });
      }
    },
  });
}

/**
 * Hook para marcar tarea como pendiente
 */
export function useMarkTaskAsPending() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => markTaskAsPending(id),
    onSuccess: (data, id) => {
      // Invalidar la tarea específica y todas las queries relacionadas
      queryClient.invalidateQueries({ queryKey: tasksKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: tasksKeys.all });

      // Invalidar queries de completadas y pendientes
      queryClient.invalidateQueries({ queryKey: tasksKeys.completed() });
      queryClient.invalidateQueries({ queryKey: tasksKeys.pending() });

      // Si la tarea tiene una lista, invalidar también esa lista específica
      if (data.listId) {
        queryClient.invalidateQueries({
          queryKey: tasksKeys.lists.detail(data.listId),
        });
      }
    },
  });
}

/**
 * Hook para eliminar una tarea
 */
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: (_, id) => {
      // Invalidar todas las queries de tareas
      queryClient.invalidateQueries({ queryKey: tasksKeys.all });
      // También remover la tarea específica del caché
      queryClient.removeQueries({ queryKey: tasksKeys.detail(id) });
    },
  });
}
