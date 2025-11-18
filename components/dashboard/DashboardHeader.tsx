import React from 'react';
import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';
import NotificationIcon from '../icons/NotificationIcon';

interface DashboardHeaderProps {
  userName: string;
  pantryStatus: number;
  notificationCount: number;
  onNotificationClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, pantryStatus, notificationCount, onNotificationClick }) => {
  return (
    <header className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-4 pb-6 rounded-b-2xl sticky top-0 z-10 shadow-lg shadow-blue-900/20">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
            <h1 className="text-2xl font-bold whitespace-nowrap">
            Olá, {userName}
            </h1>
             <p className="text-sm text-blue-200">
                Sua despensa está {pantryStatus}% abastecida.
            </p>
        </div>
        <button
          onClick={onNotificationClick}
          className="relative p-2"
          aria-label={`Notificações com ${notificationCount} não lidas`}
        >
          <NotificationIcon className="w-7 h-7" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-white bg-cyan-400 rounded-full">
            </span>
          )}
        </button>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar produto..."
          className="w-full pl-10 pr-4 py-3 bg-white/15 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-300 placeholder-blue-200"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200" />
      </div>
    </header>
  );
};

export default DashboardHeader;