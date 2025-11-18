import React, { useState } from 'react';
import CameraScreen from './CameraScreen';
import ProductForm from './ProductForm';
import { identifyProductFromImage } from '../../services/geminiService';
import type { Product, ProductFormData } from '../../types';

interface AddProductFlowProps {
  onClose: () => void;
  onProductAdd: (newProduct: Product, destination: 'inventory' | 'list') => void;
}

const LoadingOverlay: React.FC<{ message: string }> = ({ message }) => (
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-lg mt-4">{message}</p>
    </div>
);

const AddProductFlow: React.FC<AddProductFlowProps> = ({ onClose, onProductAdd }) => {
  const [step, setStep] = useState<'camera' | 'form' | 'loading'>('camera');
  const [initialFormData, setInitialFormData] = useState<Partial<ProductFormData>>({});
  const [photoData, setPhotoData] = useState<{b64: string, url: string} | null>(null);

  const handlePhotoTaken = async (base64Data: string) => {
    setStep('loading');
    const fullDataUrl = `data:image/jpeg;base64,${base64Data}`;
    setPhotoData({ b64: base64Data, url: fullDataUrl });

    const aiResult = await identifyProductFromImage(base64Data);
    if (aiResult) {
      setInitialFormData({
        name: aiResult.nome_produto,
        brand: aiResult.marca,
        weight: aiResult.peso_volume,
        category: aiResult.categoria_sugerida,
        imageUrl: fullDataUrl,
      });
    } else {
       // Se a IA falhar, ainda mostramos a foto no formulário em branco
       setInitialFormData({ imageUrl: fullDataUrl });
       alert("Não foi possível identificar o produto. Por favor, preencha os dados manualmente.");
    }
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
      {step === 'loading' && <LoadingOverlay message="Identificando produto..." />}
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
