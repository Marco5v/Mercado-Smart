import React from 'react';

interface QuickAccessItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface QuickAccessProps {
  items: QuickAccessItem[];
  onItemClick: (itemId: string) => void;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ items, onItemClick }) => {
  return (
    <div className="px-4 py-6">
       <h2 className="text-base font-bold text-gray-700 mb-4 px-2">Acesso Rápido</h2>
      <div className="flex items-center justify-around">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className="flex flex-col items-center flex-shrink-0 w-20 transition-transform duration-200 ease-in-out hover:scale-105 group"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-lg shadow-blue-500/10 group-hover:shadow-blue-500/20 transition-shadow"
            >
              {item.icon}
            </div>
            <span className="mt-2 text-xs font-semibold text-center text-gray-600">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;