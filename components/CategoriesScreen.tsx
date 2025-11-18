import React, { useMemo } from 'react';
import type { Product } from '../types';
import { categoriesData } from '../data/categories';
import CategoryCard from './CategoryCard';

interface CategoriesScreenProps {
  products: Product[];
}

const CategoriesScreen: React.FC<CategoriesScreenProps> = ({ products }) => {
  const categoriesWithShortages = useMemo(() => {
    const shortageSet = new Set<string>();
    products.forEach(product => {
      if (product.stock <= product.minStock) {
        shortageSet.add(product.category);
      }
    });
    return shortageSet;
  }, [products]);

  return (
    <div className="p-4">
      <header className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Minha Dispensa</h2>
        <p className="text-sm text-gray-500">Gerencie seu estoque por setor</p>
      </header>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {categoriesData.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            hasShortage={categoriesWithShortages.has(category.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesScreen;
