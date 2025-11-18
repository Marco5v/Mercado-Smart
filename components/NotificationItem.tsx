import React from 'react';
import type { Notification, NotificationType } from '../types';
import { FireIcon, ExclamationTriangleIcon, LightBulbIcon, ClockIcon } from '@heroicons/react/24/solid';

const notificationConfig: Record<NotificationType, { icon: React.ReactNode; color: string }> = {
  critical: {
    icon: <FireIcon className="w-6 h-6 text-white" />,
    color: 'bg-red-500',
  },
  low_stock: {
    icon: <ExclamationTriangleIcon className="w-6 h-6 text-white" />,
    color: 'bg-yellow-500',
  },
  suggestion: {
    icon: <LightBulbIcon className="w-6 h-6 text-white" />,
    color: 'bg-blue-500',
  },
  expiry: {
    icon: <ClockIcon className="w-6 h-6 text-white" />,
    color: 'bg-purple-500',
  },
};

interface NotificationItemProps {
  notification: Notification;
  onAction: (productId: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onAction }) => {
  const config = notificationConfig[notification.type];
  
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " anos";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " meses";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " dias";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " horas";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutos";
    return Math.floor(seconds) + " segundos";
  }

  return (
    <div className={`p-4 rounded-lg shadow-md flex items-start gap-4 ${notification.read ? 'bg-gray-200' : 'bg-white'}`}>
      <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${config.color}`}>
        {config.icon}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-gray-800">{notification.title}</h4>
          <p className="text-xs text-gray-500">{timeAgo(notification.timestamp)} atrás</p>
        </div>
        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
        {notification.productId && notification.type === 'critical' && (
             <button 
                onClick={() => onAction(notification.productId!)}
                className="mt-2 bg-black text-white text-sm font-bold py-1.5 px-3 rounded-md hover:bg-gray-800 transition-colors"
            >
                Adicionar à Lista
            </button>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
