import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  shoppingCart: Map<number, number>;
  onAddToCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onConsumeItem: (productId: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, shoppingCart, onAddToCart, onUpdateQuantity, onConsumeItem }) => {
  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          cartQuantity={shoppingCart.get(product.id) || 0}
          onAddToCart={onAddToCart}
          onUpdateQuantity={onUpdateQuantity}
          onConsumeItem={onConsumeItem}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
