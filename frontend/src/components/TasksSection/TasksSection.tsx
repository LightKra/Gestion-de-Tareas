import { List as ListIcon, Plus, MoreVertical } from "lucide-react";
import { useState } from "react";
import { useSelectedList } from "../../contexts/useSelectedList";
import {
  useTasksByListId,
  useTasksWithoutList,
  useCreateTask,
  useMarkTaskAsCompleted,
  useMarkTaskAsPending,
} from "../../queries/tasks";
import { useLists } from "../../queries/lists";
import type { Task } from "../../types";

const TasksSection = () => {
  const { selectedListId } = useSelectedList();
  const [newTask, setNewTask] = useState("");
  const { data: lists = [] } = useLists();
  const createTaskMutation = useCreateTask();
  const markAsCompletedMutation = useMarkTaskAsCompleted();
  const markAsPendingMutation = useMarkTaskAsPending();

  // Obtener tareas según si hay una lista seleccionada o no
  // Llamar ambos hooks siempre para cumplir con las reglas de React Hooks
  const tasksByListQuery = useTasksByListId(selectedListId || 0);
  const tasksWithoutListQuery = useTasksWithoutList();

  // Usar el query apropiado según si hay lista seleccionada
  const tasksQuery = selectedListId ? tasksByListQuery : tasksWithoutListQuery;
  const { data: tasks = [], isLoading, isError } = tasksQuery;

  // Función para obtener el nombre de la lista
  const getListName = (listId: number | null): string => {
    if (!listId) return "";
    const list = lists.find((l) => l.id === listId);
    return list ? list.name.toUpperCase() : "";
  };

  const handleAddTask = async () => {
    if (!newTask.trim() || !selectedListId) {
      return;
    }

    try {
      await createTaskMutation.mutateAsync({
        listId: selectedListId,
        title: newTask.trim(),
        description: null,
        dueDate: null,
        priority: 2, // Prioridad media por defecto
      });
      setNewTask("");
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      if (task.isCompleted) {
        // Si está completada, marcarla como pendiente
        await markAsPendingMutation.mutateAsync(task.id);
      } else {
        // Si está pendiente, marcarla como completada
        await markAsCompletedMutation.mutateAsync(task.id);
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la tarea:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <ListIcon className="w-5 h-5 text-gray-400" />
        <h3 className="text-lg font-semibold text-white">Tareas</h3>
      </div>

      {/* Estado de carga */}
      {isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-400">Cargando tareas...</p>
        </div>
      )}

      {/* Estado de error */}
      {isError && (
        <div className="text-center py-8">
          <p className="text-red-400">Error al cargar las tareas</p>
        </div>
      )}

      {/* Mensaje cuando no hay lista seleccionada */}
      {!selectedListId && !isLoading && (
        <div className="text-center py-8 mb-4">
          <p className="text-gray-400">
            Selecciona una lista para ver sus tareas
          </p>
        </div>
      )}

      {/* Lista de tareas - Cada tarea en su propia card */}
      {tasks.length > 0 && !isLoading && (
        <div className="h-64 sm:h-80 overflow-y-auto rounded-xl space-y-3 py-4 mb-4">
          {tasks.map((task: Task) => (
            <div
              key={task.id}
              className="bg-gray-900 rounded-lg p-4 flex items-start gap-4"
            >
              {/* Checkbox circular */}
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleToggleComplete(task)}
                className="
                w-5 h-5
                appearance-none
                rounded-full
                border-2 border-gray-600
                checked:bg-purple-600
                checked:border-purple-600
                cursor-pointer
              "
              />

              {/* Contenido de la tarea */}
              <div className="flex-1 min-w-0">
                {/* Etiqueta de categoría */}
                {task.listId && (
                  <div className="text-xs text-gray-400 mb-1 uppercase">
                    MIS LISTAS &gt; {getListName(task.listId)}
                  </div>
                )}
                {!task.listId && (
                  <div className="text-xs text-gray-400 mb-1 uppercase">
                    SIN LISTA
                  </div>
                )}

                {/* Descripción de la tarea */}
                <div
                  className={`text-white ${
                    task.isCompleted ? "line-through opacity-60" : ""
                  }`}
                >
                  {task.title}
                </div>
              </div>

              {/* Icono de tres puntos */}
              <button
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Opciones de tarea"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje cuando no hay tareas */}
      {tasks.length === 0 && !isLoading && !isError && selectedListId && (
        <div className="h-64 sm:h-80 text-center py-8 mb-4">
          <p className="text-gray-400">No hay tareas en esta lista</p>
        </div>
      )}

      {/* Input para agregar nueva tarea */}
      {selectedListId && (
        <div className="flex items-center gap-3 bg-gray-900 rounded-4xl p-2 mb-16 sm:mb-0">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Agregar tarea"
              className="w-full rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 border-none outline-none"
              disabled={createTaskMutation.isPending}
            />
            <button
              onClick={handleAddTask}
              disabled={createTaskMutation.isPending || !newTask.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Agregar tarea"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <button
            className="mr-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            aria-label="Opciones de lista"
          >
            <ListIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TasksSection;
