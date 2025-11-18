import React from 'react';

export interface Product {
  id: number;
  name: string;
  brand?: string;
  weight?: string;
  imageUrl: string;
  stock: number;
  minStock: number;
  avgPrice: number;
  currentPrice: number;
  category: string;
  consumptionRate: number; // For "Mais Consumidos"
}

export interface FilterCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
  visualPriority: number;
  isPerishable: boolean;
}

export type ProductFormData = Omit<Product, 'id' | 'imageUrl' | 'consumptionRate' | 'avgPrice'> & {
    imageUrl?: string;
    destination: 'inventory' | 'list';
};

export type NotificationType = 'critical' | 'low_stock' | 'suggestion' | 'expiry';

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  productId?: number;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  cep: string;
  gender: 'Masculino' | 'Feminino' | 'NaoInformar' | '';
  birthDate: string;
}
