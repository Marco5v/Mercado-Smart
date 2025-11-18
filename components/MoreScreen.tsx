import React from 'react';
import StatsIcon from './icons/StatsIcon';
import { SparklesIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  isFeatured?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, isFeatured, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center p-4 rounded-lg transition-colors duration-150 ${
      isFeatured
        ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
        : 'bg-white text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className={`mr-4 ${isFeatured ? 'text-white' : 'text-blue-600'}`}>
      {icon}
    </div>
    <span className={`font-semibold ${isFeatured ? 'text-lg' : 'text-base'}`}>{label}</span>
  </button>
);

interface MoreScreenProps {
    onNavigate: (tab: string) => void;
}

const MoreScreen: React.FC<MoreScreenProps> = ({ onNavigate }) => {
  const menuItems = [
    { id: 'stats', label: 'Estatísticas e Relatórios', icon: <StatsIcon className="w-8 h-8" />, isFeatured: true, onClick: () => alert('Navegando para Estatísticas...') },
    { id: 'profile', label: 'Meu Perfil', icon: <SparklesIcon className="w-6 h-6" />, isFeatured: false, onClick: () => onNavigate('profile') },
    { id: 'history', label: 'Histórico de Compras', icon: <ArchiveBoxIcon className="w-6 h-6" />, isFeatured: false, onClick: () => alert('Navegando para Histórico...') },
    { id: 'settings', label: 'Configurar Alertas', icon: <Cog6ToothIcon className="w-6 h-6" />, isFeatured: false, onClick: () => alert('Navegando para Configurações...') },
    { id: 'logout', label: 'Sair', icon: <ArrowLeftOnRectangleIcon className="w-6 h-6" />, isFeatured: false, onClick: () => alert('Saindo...') },
  ];

  return (
    <div>
      <header className="bg-white p-4 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">Mais Opções</h2>
      </header>
      <div className="p-4 space-y-3">
        {menuItems.map(item => (
          <MenuItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            isFeatured={item.isFeatured}
            onClick={item.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MoreScreen;
