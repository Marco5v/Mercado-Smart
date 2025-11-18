import React from 'react';
import HomeIcon from './icons/HomeIcon';
import MoreIcon from './icons/MoreIcon';
import ShelvesIcon from './icons/ShelvesIcon';
import ChecklistIcon from './icons/ChecklistIcon';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Início', icon: <HomeIcon className="w-7 h-7" /> },
  { id: 'categories', label: 'Dispensa', icon: <ShelvesIcon className="w-7 h-7" /> },
  { id: 'list', label: 'Lista', icon: <ChecklistIcon className="w-7 h-7" /> },
  { id: 'more', label: 'Mais', icon: <MoreIcon className="w-7 h-7" /> },
];

interface BottomNavProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center w-full transition-colors duration-200
                ${isActive ? 'text-blue-900' : 'text-gray-400 hover:text-blue-700'}`}
            >
              {item.icon}
              <span className={`text-xs mt-1 ${isActive ? 'font-bold' : 'font-normal'}`}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </footer>
  );
};

export default BottomNav;
