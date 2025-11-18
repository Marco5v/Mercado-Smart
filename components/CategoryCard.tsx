import React, { useState } from 'react';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  hasShortage: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, hasShortage }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Reset the animation state after it completes
    setTimeout(() => setIsClicked(false), 300); 
  };

  return (
    <button 
      onClick={handleClick}
      className={`relative flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-200 aspect-square hover:shadow-md hover:border-blue-300 transition-all duration-200 ${
        isClicked ? 'scale-105 border-blue-500 shadow-lg' : ''
      }`}
    >
       {hasShortage && (
        <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white" aria-label="Itens em falta"></span>
      )}
      <div className="flex-grow flex items-center justify-center">
        {category.icon}
      </div>
      <span className="mt-2 text-sm font-medium text-center text-gray-700">{category.name}</span>
    </button>
  );
};

export default CategoryCard;
