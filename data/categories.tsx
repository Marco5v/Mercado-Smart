import React from 'react';
import type { Category } from '../types';
import PackageVariantIcon from '../components/icons/categories/PackageVariantIcon';
import FruitWatermelonIcon from '../components/icons/categories/FruitWatermelonIcon';
import FoodSteakIcon from '../components/icons/categories/FoodSteakIcon';
import CheeseIcon from '../components/icons/categories/CheeseIcon';
import BottleSodaIcon from '../components/icons/categories/BottleSodaIcon';
import SprayBottleIcon from '../components/icons/categories/SprayBottleIcon';
import ToothbrushPasteIcon from '../components/icons/categories/ToothbrushPasteIcon';
import BreadSliceIcon from '../components/icons/categories/BreadSliceIcon';
import PastaIcon from '../components/icons/categories/PastaIcon';
import DogIcon from '../components/icons/categories/DogIcon';
import BabyCarriageIcon from '../components/icons/categories/BabyCarriageIcon';
import DotsGridIcon from '../components/icons/categories/DotsGridIcon';

const rawCategories: (Omit<Category, 'icon'> & { icon: React.FC<React.SVGProps<SVGSVGElement>> })[] = [
  { id: 1, name: 'Mercearia', icon: PackageVariantIcon, visualPriority: 1, isPerishable: false },
  { id: 2, name: 'Hortifruti', icon: FruitWatermelonIcon, visualPriority: 2, isPerishable: true },
  { id: 3, name: 'Açougue', icon: FoodSteakIcon, visualPriority: 3, isPerishable: true },
  { id: 4, name: 'Frios e Leite', icon: CheeseIcon, visualPriority: 4, isPerishable: true },
  { id: 5, name: 'Bebidas', icon: BottleSodaIcon, visualPriority: 5, isPerishable: false },
  { id: 6, name: 'Limpeza', icon: SprayBottleIcon, visualPriority: 6, isPerishable: false },
  { id: 7, name: 'Higiene', icon: ToothbrushPasteIcon, visualPriority: 7, isPerishable: false },
  { id: 8, name: 'Padaria', icon: BreadSliceIcon, visualPriority: 8, isPerishable: true },
  { id: 9, name: 'Massas e Molhos', icon: PastaIcon, visualPriority: 9, isPerishable: false },
  { id: 10, name: 'Casa e Pet', icon: DogIcon, visualPriority: 10, isPerishable: false },
  { id: 11, name: 'Bebê', icon: BabyCarriageIcon, visualPriority: 11, isPerishable: false },
  { id: 12, name: 'Outros', icon: DotsGridIcon, visualPriority: 12, isPerishable: false },
];

export const categoriesData: Category[] = rawCategories
  .sort((a, b) => a.visualPriority - b.visualPriority)
  .map(category => {
    // In JSX, component names must start with a capital letter to be recognized as React components.
    // The original code <category.icon ... /> was invalid because 'category.icon' is not a capitalized identifier.
    const IconComponent = category.icon;
    return {
      ...category,
      // FIX: Replaced JSX with React.createElement to avoid TSX parsing errors in a .ts file.
      icon: React.createElement(IconComponent, { className: "w-10 h-10 text-blue-600" }),
    }; // <-- Ponto e vírgula e parêntese extra removidos
  });
