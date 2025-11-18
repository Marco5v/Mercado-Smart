import React from 'react';
import type { Product } from '../../types';
import ProductCard from '../ProductCard';

interface SuggestionsSectionProps {
  products: Product[];
  shoppingCart: Map<number, number>;
  onAddToCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onConsumeItem: (productId: number) => void;
}

const SuggestionsSection: React.FC<SuggestionsSectionProps> = ({ products, shoppingCart, onAddToCart, onUpdateQuantity, onConsumeItem }) => {
    if (products.length === 0) {
        return null;
    }

  return (
    <div className="py-4">
        <h2 className="text-lg font-bold text-gray-800 px-4 mb-2">Sugestões para Você</h2>
        <div className="flex space-x-4 overflow-x-auto px-4 pb-2">
            {products.map((product) => (
                <div key={product.id} className="w-48 flex-shrink-0">
                    <ProductCard
                        product={product}
                        cartQuantity={shoppingCart.get(product.id) || 0}
                        onAddToCart={onAddToCart}
                        onUpdateQuantity={onUpdateQuantity}
                        onConsumeItem={onConsumeItem}
                    />
                </div>
            ))}
        </div>
    </div>
  );
};

export default SuggestionsSection;
