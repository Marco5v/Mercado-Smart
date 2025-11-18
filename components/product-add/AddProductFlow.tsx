
import React, { useState } from 'react';
import CameraScreen from './CameraScreen';
import ProductForm from './ProductForm';
import type { Product, ProductFormData } from '../../types';

interface AddProductFlowProps {
  onClose: () => void;
  onProductAdd: (newProduct: Product, destination: 'inventory' | 'list') => void;
}

const AddProductFlow: React.FC<AddProductFlowProps> = ({ onClose, onProductAdd }) => {
  const [step, setStep] = useState<'camera' | 'form'>('camera');
  const [initialFormData, setInitialFormData] = useState<Partial<ProductFormData>>({});
  const [photoData, setPhotoData] = useState<{b64: string, url: string} | null>(null);

  const handlePhotoTaken = async (base64Data: string) => {
    const fullDataUrl = `data:image/jpeg;base64,${base64Data}`;
    setPhotoData({ b64: base64Data, url: fullDataUrl });

    // Skip AI identification, just pass the image to the form
    setInitialFormData({
      imageUrl: fullDataUrl,
    });
    setStep('form');
  };

  const handleManualEntry = () => {
    setInitialFormData({});
    setStep('form');
  };

  const handleSaveProduct = (formData: ProductFormData) => {
    const newProduct: Product = {
      id: Date.now(), // simple unique ID
      name: formData.name,
      brand: formData.brand,
      weight: formData.weight,
      imageUrl: photoData?.url || 'https://picsum.photos/id/1/200/200', // placeholder
      stock: formData.destination === 'inventory' ? (formData.stock || 1) : 0,
      minStock: formData.minStock || 1,
      avgPrice: formData.currentPrice || 0,
      currentPrice: formData.currentPrice || 0,
      category: formData.category,
      consumptionRate: 0, // Default value
    };
    onProductAdd(newProduct, formData.destination);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black z-20">
      {step === 'camera' && (
        <CameraScreen 
          onPhotoTaken={handlePhotoTaken} 
          onManualEntry={handleManualEntry} 
          onClose={onClose} 
        />
      )}
      {step === 'form' && (
        <ProductForm 
            initialData={initialFormData}
            onSave={handleSaveProduct}
            onClose={onClose}
        />
        )}
    </div>
  );
};

export default AddProductFlow;
