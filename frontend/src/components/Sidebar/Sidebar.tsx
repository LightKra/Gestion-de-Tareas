import {
  Home,
  Calendar,
  CheckSquare,
  Clock,
  List,
  HelpCircle,
  Settings,
  Plus,
  HatGlasses,
} from "lucide-react";
import NavigationItem from "../NavigationItem/NavigationItem";
import UserProfile from "../UserProfile/UserProfile";
import CreateListModal from "../CreateListModal/CreateListModal";
import { useState } from "react";
import { useLists } from "../../queries/lists";
import { useSelectedList } from "../../contexts/useSelectedList";
import type { ListType } from "../../types";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Mi día");
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  const { data } = useLists();
  const { selectedListId, setSelectedListId } = useSelectedList();

  const navigationItems = [
    { icon: Home, label: "Mi día", id: "Mi día" },
    { icon: Clock, label: "Próximos 7 días", id: "Próximos 7 días" },
    { icon: CheckSquare, label: "Tareas", id: "Tareas" },
    { icon: Calendar, label: "Mi calendario", id: "Mi calendario" },
  ];

  const supportItems = [
    { icon: HelpCircle, label: "Soporte", id: "Soporte" },
    { icon: Settings, label: "Ajustes", id: "Ajustes" },
  ];

  return (
    <aside
      className={`hidden sm:flex flex-col h-screen bg-gray-900 text-white w-64 border-r border-gray-800`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold">
              <HatGlasses />
            </span>
          </div>
          <span className="text-3xl font-bold">eureky</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navigationItems.map((item) => (
          <NavigationItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
          />
        ))}

        {/* Mis Listas Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between px-3 py-2 mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Mis Listas
            </span>
            <button
              onClick={() => setIsCreateListModalOpen(true)}
              className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded"
              aria-label="Agregar nueva lista"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1">
            {data?.map((list: ListType) => (
              <NavigationItem
                key={list.id}
                icon={List}
                label={list.name}
                isActive={selectedListId === list.id}
                onClick={() => {
                  setSelectedListId(list.id);
                  setActiveItem(""); // Limpiar activeItem cuando se selecciona una lista
                }}
              />
            ))}
          </div>
        </div>

        {/* Support Items */}
        <div className="mt-8 space-y-1">
          {supportItems.map((item) => (
            <NavigationItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={false}
              onClick={() => {}}
            />
          ))}
        </div>
      </nav>

      {/* Upgrade Button */}
      <div className="p-4 border-t border-gray-800">
        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all">
          Mejora tu plan
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800">
        <UserProfile name="Roger" email="roger@untitledui.com" avatarUrl="" />
      </div>

      {/* Create List Modal */}
      <CreateListModal
        isOpen={isCreateListModalOpen}
        onClose={() => setIsCreateListModalOpen(false)}
      />
    </aside>
  );
};

export default Sidebar;
