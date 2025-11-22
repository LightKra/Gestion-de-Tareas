import { Home, Clock, CheckSquare, Calendar, List } from 'lucide-react';

const MobileNav = () => {
  const navItems = [
    { icon: Home, label: 'MI DÍA', id: 'mi-dia' },
    { icon: Clock, label: '7 DÍAS', id: '7-dias' },
    { icon: CheckSquare, label: 'TAREAS', id: 'tareas' },
    { icon: Calendar, label: 'CALENDARIO', id: 'calendario' },
    { icon: List, label: 'MIS LISTAS', id: 'mis-listas' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className="flex flex-col items-center gap-1 sm:px-3 py-2 text-gray-400 hover:text-white transition-colors"
            >
              <Icon className="sm:w-5 sm:h-5 w-4 h-4" />
              <span className="text-[10px] sm:text-sm font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;

