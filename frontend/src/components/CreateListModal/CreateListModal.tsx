import { useState } from "react";
import { useCreateList } from "../../queries/lists";
import Modal from "../Modal/Modal";
import type { CreateListData } from "../../types";

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateListModal = ({ isOpen, onClose }: CreateListModalProps) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");

  const createListMutation = useCreateList();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validación
    if (!name.trim()) {
      setError("El nombre de la lista es requerido");
      return;
    }

    if (name.trim().length > 150) {
      setError("El nombre no puede exceder 150 caracteres");
      return;
    }

    if (color && color.length > 20) {
      setError("El color no puede exceder 20 caracteres");
      return;
    }

    try {
      const data: CreateListData = {
        name: name.trim(),
        color: color.trim() || null,
      };

      await createListMutation.mutateAsync(data);
      
      // Limpiar formulario y cerrar modal
      setName("");
      setColor("");
      setError("");
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al crear la lista"
      );
    }
  };

  const handleClose = () => {
    setName("");
    setColor("");
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Crear Nueva Lista">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label
            htmlFor="list-name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Nombre de la lista
          </label>
          <input
            id="list-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Trabajo, Personal, Compras..."
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            autoFocus
            maxLength={150}
          />
        </div>

        {/* Color (opcional) */}
        <div>
          <label
            htmlFor="list-color"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Color (opcional)
          </label>
          <input
            id="list-color"
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Ej: #FF0000, red, blue..."
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            maxLength={20}
          />
          <p className="mt-1 text-xs text-gray-400">
            Puedes usar códigos hexadecimales (#FF0000) o nombres de color
          </p>
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
            disabled={createListMutation.isPending}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={createListMutation.isPending || !name.trim()}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createListMutation.isPending ? "Creando..." : "Crear Lista"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateListModal;

