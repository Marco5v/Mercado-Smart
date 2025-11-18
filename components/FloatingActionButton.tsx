
import React from 'react';

interface FloatingActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  onClick, 
  icon, 
  className = "", 
  ariaLabel 
}) => {
  return (
    <button
      onClick={onClick}
      className={`fixed rounded-full flex items-center justify-center shadow-lg transition-all duration-200 z-20 active:scale-95 hover:brightness-110 ${className}`}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default FloatingActionButton;
