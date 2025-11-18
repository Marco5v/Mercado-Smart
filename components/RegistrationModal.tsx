
import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { UserCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { fetchAddressByCEP } from '../services/cepService';

interface RegistrationModalProps {
  onComplete: (profile: UserProfile) => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    phone: '',
    email: '',
    cep: '',
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    gender: '',
    birthDate: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    
    setFormData(prev => ({ ...prev, cep: value }));

    const cleanCep = value.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      setIsLoadingCep(true);
      const addressData = await fetchAddressByCEP(cleanCep);
      setIsLoadingCep(false);

      if (addressData) {
        setFormData(prev => ({
          ...prev,
          address: addressData.street,
          neighborhood: addressData.neighborhood,
          city: addressData.city,
          state: addressData.state
        }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email || !formData.cep || !formData.number || !formData.gender || !formData.birthDate) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!formData.email.includes('@')) {
      alert("E-mail inválido.");
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
        onComplete(formData);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[60] bg-brand-navy/90 flex items-center justify-center p-4 backdrop-blur-md transition-all duration-500">
        <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-[scale-up_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)] border border-gray-100">
            <div className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mb-6 animate-bounce ring-4 ring-brand-gold/10">
                <CheckCircleIcon className="w-12 h-12 text-brand-gold" />
            </div>
            <h2 className="text-2xl font-bold text-brand-navy mb-2 text-center">Bem-vindo!</h2>
            <p className="text-brand-blue-medium text-center leading-relaxed">Seu perfil foi criado com sucesso.<br/>O Mercado Smart está pronto para você.</p>
        </div>
      </div>
    );
  }

  // Updated styles using brand palette
  const inputClasses = "w-full p-3.5 bg-white border border-gray-200 rounded-xl text-brand-navy placeholder-gray-400 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all duration-200 shadow-sm text-sm font-medium";
  const labelClasses = "block text-xs font-bold text-brand-blue-medium uppercase tracking-wider mb-1.5 ml-1";

  return (
    <div className="fixed inset-0 z-[60] bg-brand-navy/90 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-sm transition-all duration-300">
      <div className="bg-brand-bg w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl shadow-2xl h-[95vh] sm:h-auto sm:max-h-[90vh] flex flex-col overflow-hidden animate-[slide-up_0.4s_ease-out]">
        
        {/* Header with Brand Identity */}
        <header className="bg-gradient-to-br from-brand-navy to-[#2A4060] p-8 text-center relative overflow-hidden flex-shrink-0">
           {/* Decorative background elements */}
           <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
           <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl"></div>
           
           <div className="relative z-10 flex flex-col items-center">
