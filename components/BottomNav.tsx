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
  { id: 'home', label: 'Início', icon: <HomeIcon className="w-6 h-6" /> },
  { id: 'categories', label: 'Dispensa', icon: <ShelvesIcon className="w-6 h-6" /> },
  { id: 'list', label: 'Lista', icon: <ChecklistIcon className="w-6 h-6" /> },
  { id: 'more', label: 'Perfil', icon: <MoreIcon className="w-6 h-6" /> },
];

interface BottomNavProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] rounded-t-2xl">
      <div className="flex justify-around items-center h-20 pb-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center w-full transition-all duration-200
                ${isActive ? 'text-brand-navy' : 'text-brand-blue-light hover:text-brand-blue-medium'}`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-brand-navy/5 -translate-y-1' : ''}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
              
              {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 bg-brand-navy rounded-full"></span>
              )}
            </button>
          )
        })}
      </div>
    </footer>
  );
};

export default BottomNav;