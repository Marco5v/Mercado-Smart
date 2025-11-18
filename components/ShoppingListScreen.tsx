import React, { useMemo } from 'react';
import type { Product } from '../types';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';

interface ShoppingListScreenProps {
  shoppingCart: Map<number, number>;
  products: Product[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onClearCart: () => void;
}

const ShoppingListScreen: React.FC<ShoppingListScreenProps> = ({ shoppingCart, products, onUpdateQuantity, onClearCart }) => {
  const cartItems = useMemo(() => {
    return Array.from(shoppingCart.entries()).map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return { product, quantity };
    }).filter(item => item.product);
  }, [shoppingCart, products]);

  const totalCost = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + (item.product!.currentPrice * item.quantity);
    }, 0);
  }, [cartItems]);

  const handleClearCart = () => {
    if (window.confirm('Tem certeza que deseja limpar sua lista de compras?')) {
        onClearCart();
    }
  };

  return (
    <div className="h-full bg-gray-100">
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-gray-800">Minha Lista de Compras</h2>
        <p className="text-sm text-gray-500">{cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} na lista</p>
      </header>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8 mt-16">
          <p className="text-lg font-semibold text-gray-600">Sua lista está vazia.</p>
          <p className="text-gray-500">Adicione produtos da tela inicial para começar.</p>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {cartItems.map(({ product, quantity }) => (
            <div key={product!.id} className="bg-white rounded-lg shadow-sm p-3 flex items-center gap-4">
              <img src={product!.imageUrl} alt={product!.name} className="w-16 h-16 object-contain rounded-md bg-white" />
              <div className="flex-grow">
                <p className="font-semibold text-gray-800">{product!.name}</p>
                <p className="text-sm text-gray-600 font-bold">R$ {(product!.currentPrice * quantity).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 border border-gray-300 rounded-md">
                <button onClick={() => onUpdateQuantity(product!.id, quantity - 1)} className="p-1.5"><MinusIcon className="w-5 h-5"/></button>
                <span className="font-bold text-lg px-2">{quantity}</span>
                <button onClick={() => onUpdateQuantity(product!.id, quantity + 1)} className="p-1.5"><PlusIcon className="w-5 h-5"/></button>
              </div>
            </div>
          ))}

          <div className="mt-6 pt-4 border-t border-gray-200">
             <div className="flex justify-between items-center text-xl font-bold p-3 bg-white rounded-lg">
                <span>Total Estimado:</span>
                <span>R$ {totalCost.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex flex-col gap-2">
                 <button className="w-full bg-black text-white font-bold py-3 rounded-md hover:bg-gray-800 transition-colors">
                    Finalizar Compra
                </button>
                 <button onClick={handleClearCart} className="w-full bg-red-100 text-red-700 font-bold py-2 rounded-md hover:bg-red-200 transition-colors">
                    Limpar Lista
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingListScreen;
