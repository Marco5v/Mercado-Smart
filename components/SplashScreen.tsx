import React from 'react';
import ShoppingCartIcon from './icons/ShoppingCartIcon';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-brand-navy flex flex-col items-center justify-center text-white transition-opacity duration-500">
      <div className="relative mb-8">
        {/* Outer ring pulsing */}
        <div className="absolute inset-0 bg-white rounded-full opacity-10 animate-ping"></div>
        
        {/* Icon Container */}
        <div className="bg-white/10 p-6 rounded-full shadow-xl animate-cart-bounce backdrop-blur-sm">
          <ShoppingCartIcon className="w-20 h-20 text-brand-gold" />
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-2 animate-pulse text-white tracking-widest">MERCADO SMART</h1>
      <p className="text-brand-blue-light text-sm font-medium">
        Preparando sua despensa inteligente...
      </p>
      
      <div className="mt-8 w-32 h-1 bg-brand-blue-medium rounded-full overflow-hidden">
        <div className="h-full bg-brand-gold animate-[slide-up_2s_ease-in-out_infinite] w-full origin-left scale-x-0 animate-[width-progress]"></div>
      </div>
    </div>
  );
};

export default SplashScreen;