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
    <header className="bg-gradient-to-br from-brand-navy to-brand-blue-medium text-white p-4 pb-6 rounded-b-3xl sticky top-0 z-10 shadow-xl shadow-brand-navy/20">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
            <h1 className="text-2xl font-bold whitespace-nowrap">
            Olá, {userName}
            </h1>
             <p className="text-sm text-brand-blue-light">
                Sua despensa está {pantryStatus}% abastecida.
            </p>
        </div>
        <button
          onClick={onNotificationClick}
          className="relative p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label={`Notificações com ${notificationCount} não lidas`}
        >
          <NotificationIcon className="w-6 h-6 text-brand-gold" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 inline-flex items-center justify-center w-2.5 h-2.5 bg-red-500 rounded-full border border-brand-navy">
            </span>
          )}
        </button>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="O que você procura?"
          className="w-full pl-10 pr-4 py-3.5 bg-white text-brand-navy rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold placeholder-brand-blue-light shadow-inner"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-blue-medium" />
      </div>
    </header>
  );
};

export default DashboardHeader;