import React from 'react';
import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon';
import NotificationIcon from './icons/NotificationIcon';

interface HeaderProps {
  notificationCount: number;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onNotificationsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ notificationCount, searchTerm, onSearchChange, onNotificationsClick }) => {
  return (
    <header className="bg-white sticky top-0 z-10 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-blue-700 whitespace-nowrap hidden sm:block">
          Mercado Smart
        </h1>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Busque no seu estoque..."
            className="w-full pl-10 pr-4 py-2 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
        </div>
        <button
          onClick={onNotificationsClick}
          className="relative p-2"
          aria-label={`Notifications with ${notificationCount} unread alerts`}
        >
          <NotificationIcon className="w-7 h-7 text-gray-800" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {notificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
