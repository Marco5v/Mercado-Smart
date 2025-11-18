import React from 'react';
import QrCodeScannerIcon from './icons/QrCodeScannerIcon';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 z-20"
      aria-label="Escanear produto"
    >
      <QrCodeScannerIcon className="w-8 h-8" />
    </button>
  );
};

export default FloatingActionButton;
