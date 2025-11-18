
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
        <span className="bg-brand-gold-light text-brand-navy text-xs font-semibold px-2.5 py-0.5 rounded-full">
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden h-full">
      <div 
        className="relative p-4 cursor-pointer bg-white"
        onClick={handleDetailClick}
      >
        <div className="absolute top-2 left-2 z-10">{getStockBadge()}</div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-28 object-contain mx-auto"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow bg-white">
        <h3 
          className="font-bold text-brand-text-dark text-sm h-10 overflow-hidden leading-tight"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
          onClick={handleDetailClick}
        >
          {product.name}
        </h3>
        <div className="mt-2" onClick={handleDetailClick}>
          {product.currentPrice < product.avgPrice ? (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-brand-navy">
                R$ {product.currentPrice.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                R$ {product.avgPrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-brand-navy">
              R$ {product.currentPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="mt-auto pt-3">
          {!isInCart ? (
            <button
              onClick={handleAddClick}
              className={`w-full bg-brand-navy text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-navy/90 transition-all duration-200 text-sm ${isAdding ? 'animate-button-pulse' : ''}`}
            >
              Adicionar
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-between border border-brand-navy rounded-lg w-full overflow-hidden">
                <button
                  onClick={handleDecreaseQuantity}
                  className={`p-2 text-brand-navy hover:bg-gray-100 transition-colors ${animatedButton === 'minus' ? 'animate-button-flash' : ''}`}
                  aria-label="Diminuir quantidade"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className={`font-bold text-brand-navy inline-block ${isAnimatingQuantity ? 'animate-quantity-pop' : ''}`}>
                  {cartQuantity}
                </span>
                <button
                  onClick={handleIncreaseQuantity}
                  className={`p-2 text-brand-navy hover:bg-gray-100 transition-colors ${animatedButton === 'plus' ? 'animate-button-flash' : ''}`}
                  aria-label="Aumentar quantidade"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
