import React, { useState } from 'react';
import type { ProductFormData } from '../../types';
import { categoriesData } from '../../data/categories';
import XMarkIcon from '../icons/XMarkIcon';

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSave: (data: ProductFormData) => void;
  onClose: () => void;
}

const units = ['un', 'g', 'kg', 'ml', 'L'];
const uniqueCategories = [...new Set(categoriesData.map(c => c.name))];

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<ProductFormData>>({
    name: initialData?.name || '',
    brand: initialData?.brand || '',
    weight: initialData?.weight || '',
    category: initialData?.category || uniqueCategories[0],
    currentPrice: initialData?.currentPrice || 0,
    stock: initialData?.stock || 1,
    minStock: initialData?.minStock || 1,
    destination: 'inventory',
    imageUrl: initialData?.imageUrl,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, destination: e.target.checked ? 'list' : 'inventory' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert("O nome do produto é obrigatório.");
      return;
    }
    onSave(formData as ProductFormData);
  };

  return (
    <div className="w-full h-full bg-gray-100 overflow-y-auto">
        <header className="bg-white p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
            <h2 className="text-lg font-bold">Cadastrar Produto</h2>
            <button onClick={onClose}><XMarkIcon className="w-6 h-6" /></button>
        </header>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {formData.imageUrl && (
                <div className="flex justify-center">
                    <img src={formData.imageUrl} alt="Product" className="w-32 h-32 object-contain rounded-lg bg-white p-2 shadow-sm" />
                </div>
            )}
            
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
            </div>

            <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Marca</label>
                <input type="text" name="brand" id="brand" value={formData.brand} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>

            <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Peso/Volume</label>
                <input type="text" name="weight" id="weight" value={formData.weight} onChange={handleChange} placeholder="ex: 500g, 1L" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            
             <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
                <select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700">Preço Atual (R$)</label>
                    <input type="number" name="currentPrice" id="currentPrice" value={formData.currentPrice} onChange={handleChange} step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Qtd. em Estoque</label>
                    <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
            </div>

             <div>
                <label htmlFor="minStock" className="block text-sm font-medium text-gray-700">Estoque Mínimo</label>
                <input type="number" name="minStock" id="minStock" value={formData.minStock} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>

            <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                <span className="font-medium">Destino: <span className="font-bold">{formData.destination === 'inventory' ? 'Inventário' : 'Lista de Compras'}</span></span>
                <label htmlFor="destination-toggle" className="inline-flex relative items-center cursor-pointer">
                  <input type="checkbox" id="destination-toggle" className="sr-only peer" onChange={handleToggle} checked={formData.destination === 'list'} />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>

            <button type="submit" className="w-full bg-black text-white font-bold py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200">
                Salvar Produto
            </button>
        </form>
    </div>
  );
};

export default ProductForm;
