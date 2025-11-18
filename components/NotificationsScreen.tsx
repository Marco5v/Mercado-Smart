import React from 'react';
import type { Notification } from '../types';
import NotificationItem from './NotificationItem';

interface NotificationsScreenProps {
  notifications: Notification[];
  onNotificationAction: (productId: number) => void;
  onClearNotifications: () => void;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ notifications, onNotificationAction, onClearNotifications }) => {
  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja limpar todas as notificações?')) {
        onClearNotifications();
    }
  }
  return (
    <div>
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Notificações</h2>
          <p className="text-sm text-gray-500">Alertas importantes sobre seu estoque.</p>
        </div>
        {notifications.length > 0 && (
             <button 
                onClick={handleClear}
                className="text-sm text-blue-600 font-semibold hover:underline"
            >
                Limpar Tudo
            </button>
        )}
      </header>
      {notifications.length === 0 ? (
         <div className="flex flex-col items-center justify-center text-center p-8 mt-16">
            <p className="text-lg font-semibold text-gray-600">Nenhuma notificação por aqui.</p>
            <p className="text-gray-500">Seus alertas de estoque aparecerão aqui.</p>
        </div>
      ) : (
        <div className="p-4 space-y-3">
            {notifications.map(notification => (
                <NotificationItem 
                    key={notification.id}
                    notification={notification}
                    onAction={onNotificationAction}
                />
            ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsScreen;
