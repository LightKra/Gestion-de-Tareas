import { HatGlasses, Menu } from 'lucide-react';
 
const MobileHeader = () => {
  return (
    <header className="md:hidden flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-xl font-bold">
          <HatGlasses />
          </span>
        </div>
        <span className="text-3xl font-bold text-white">eureky</span>
      </div>
      <button className="p-2 text-gray-400 hover:text-white transition-colors">
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
};

export default MobileHeader;

