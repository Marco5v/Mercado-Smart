import React, { useState, useEffect, useRef } from 'react';
import type { Product } from '../types';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';
import TrashIcon from './icons/TrashIcon';

interface ProductCardProps {
  product: Product;
  cartQuantity: number;
  onAddToCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onConsumeItem: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, cartQuantity, onAddToCart, onUpdateQuantity, onConsumeItem }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAnimatingQuantity, setIsAnimatingQuantity] = useState(false);
  const [animatedButton, setAnimatedButton] = useState<'plus' | 'minus' | null>(null);
  const prevCartQuantity = useRef(cartQuantity);
  const isInCart = cartQuantity > 0;

  useEffect(() => {
    if (cartQuantity !== prevCartQuantity.current && isInCart) {
      setIsAnimatingQuantity(true);
      const timer = setTimeout(() => setIsAnimatingQuantity(false), 300); // Animation duration
      return () => clearTimeout(timer);
    }
    prevCartQuantity.current = cartQuantity;
  }, [cartQuantity, isInCart]);

  const getStockBadge = () => {
    if (product.stock === 0) {
      return (
        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          Esgotado
        </span>
      );
    }
    if (product.stock <= product.minStock) {
      return (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          Sugerido
        </span>
      );
    }
    return null; // Don't show a badge for items comfortably in stock
  };
  
  const handleDetailClick = () => {
    onConsumeItem(product.id);
  };

  const handleAnimateButton = (type: 'plus' | 'minus') => {
    setAnimatedButton(type);
    setTimeout(() => setAnimatedButton(null), 300); // Animation duration
  };

  const handleDecreaseQuantity = () => {
    handleAnimateButton('minus');
    if (cartQuantity === 1) {
        onUpdateQuantity(product.id, 0);
    } else {
      onUpdateQuantity(product.id, cartQuantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    handleAnimateButton('plus');
    onUpdateQuantity(product.id, cartQuantity + 1);
  };

  const handleRemoveItem = () => {
    onUpdateQuantity(product.id, 0);
  };

  const handleAddClick = () => {
    onAddToCart(product.id);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 400); // Animation duration
  };

  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
      <div 
        className="relative p-4 cursor-pointer"
        onClick={handleDetailClick}
      >
        <div className="absolute top-2 left-2 z-10">{getStockBadge()}</div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-32 object-contain mx-auto"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 
          className="font-bold text-gray-800 h-12 overflow-hidden"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
          onClick={handleDetailClick}
        >
          {product.name}
        </h3>
        <div className="mt-2" onClick={handleDetailClick}>
          {product.currentPrice < product.avgPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-green-600">
                R$ {product.currentPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                R$ {product.avgPrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-gray-800">
              R$ {product.currentPrice.toFixed(2)}
            </span>
          )}
          <p className="text-xs text-gray-500">Preço médio pago</p>
        </div>
        <div className="mt-auto pt-4">
          {!isInCart ? (
            <button
              onClick={handleAddClick}
              className={`w-full bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 ${isAdding ? 'animate-button-pulse' : ''}`}
            >
              Adicionar
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-between border border-gray-400 rounded-md w-full">
                <button
                  onClick={handleDecreaseQuantity}
                  className={`p-2 text-black rounded-l-md hover:bg-gray-100 transition-colors ${animatedButton === 'minus' ? 'animate-button-flash' : ''}`}
                  aria-label="Diminuir quantidade"
                >
                  <MinusIcon className="w-5 h-5" />
                </button>
                <span className={`font-bold text-lg text-gray-800 inline-block ${isAnimatingQuantity ? 'animate-quantity-pop' : ''}`}>
                  {cartQuantity}
                </span>
                <button
                  onClick={handleIncreaseQuantity}
                  className={`p-2 text-black rounded-r-md hover:bg-gray-100 transition-colors ${animatedButton === 'plus' ? 'animate-button-flash' : ''}`}
                  aria-label="Aumentar quantidade"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleRemoveItem}
                className="w-full flex items-center justify-center gap-1 text-center text-sm py-1.5 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors"
              >
                <TrashIcon className="w-4 h-4" />
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;