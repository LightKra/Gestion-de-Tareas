import { useState } from "react";
import { useCreateTask } from "../../queries/tasks";
import { useSelectedList } from "../../contexts/useSelectedList";
import Modal from "../Modal/Modal";
import type { CreateTaskData } from "../../types";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTaskModal = ({ isOpen, onClose }: CreateTaskModalProps) => {
  const { selectedListId } = useSelectedList();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<number>(2); // Por defecto prioridad media
  const [error, setError] = useState("");

  const createTaskMutation = useCreateTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validación
    if (!title.trim()) {
      setError("El título de la tarea es requerido");
      return;
    }

    if (title.trim().length > 300) {
      setError("El título no puede exceder 300 caracteres");
      return;
    }

    if (priority < 1 || priority > 3) {
      setError("La prioridad debe ser 1 (alta), 2 (media) o 3 (baja)");
      return;
    }

    if (!selectedListId) {
      setError("Debes seleccionar una lista primero");
      return;
    }

    try {
      const data: CreateTaskData = {
        listId: selectedListId,
        title: title.trim(),
        description: description.trim() || null,
        dueDate: dueDate || null,
        priority: priority,
      };

      await createTaskMutation.mutateAsync(data);

      // Limpiar formulario y cerrar modal
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority(2);
      setError("");
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al crear la tarea"
      );
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority(2);
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Crear Nueva Tarea">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título */}
        <div>
          <label
            htmlFor="task-title"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Título <span className="text-red-400">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Completar informe mensual..."
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            autoFocus
            maxLength={300}
          />
        </div>

        {/* Descripción */}
        <div>
          <label
            htmlFor="task-description"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Descripción (opcional)
          </label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Agrega detalles adicionales sobre la tarea..."
            rows={3}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Fecha de vencimiento */}
        <div>
          <label
            htmlFor="task-due-date"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Fecha de vencimiento (opcional)
          </label>
          <input
            id="task-due-date"
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Prioridad */}
        <div>
          <label
            htmlFor="task-priority"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Prioridad
          </label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value={1}>Alta</option>
            <option value={2}>Media</option>
            <option value={3}>Baja</option>
          </select>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            disabled={createTaskMutation.isPending}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={createTaskMutation.isPending || !title.trim()}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createTaskMutation.isPending ? "Creando..." : "Crear Tarea"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;

