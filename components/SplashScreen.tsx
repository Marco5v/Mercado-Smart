import React from 'react';
import ShoppingCartIcon from './icons/ShoppingCartIcon';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-blue-600 flex flex-col items-center justify-center text-white transition-opacity duration-500">
      <div className="relative mb-8">
        {/* Outer ring pulsing */}
        <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-ping"></div>
        
        {/* Icon Container */}
        <div className="bg-white p-6 rounded-full shadow-xl animate-cart-bounce">
          <ShoppingCartIcon className="w-16 h-16 text-blue-600" />
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2 animate-pulse">Um momento...</h1>
      <p className="text-blue-100 text-sm font-medium">
        Mercado Smart está a preparar a sua despensa inteligente
      </p>
    </div>
  );
};

export default SplashScreen;
