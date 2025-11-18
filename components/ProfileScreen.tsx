
import React, { useState, useEffect } from 'react';
import type { UserProfile } from '../types';
import { UserCircleIcon, ArrowLeftIcon, CameraIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { fetchAddressByCEP } from '../services/cepService';

interface ProfileScreenProps {
  userProfile: UserProfile | null;
  onUpdateProfile: (profile: UserProfile) => void;
  onBack: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userProfile, onUpdateProfile, onBack }) => {
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
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile]);

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
    onUpdateProfile(formData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-brand-bg pb-20">
      <header className="bg-brand-navy p-4 shadow-md sticky top-0 z-10 flex items-center gap-3 text-white">
        <button onClick={onBack} className="p-1 rounded-full hover:bg-white/10">
           <ArrowLeftIcon className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-xl font-bold">Meu Perfil</h2>
      </header>

      <div className="p-4">
        <div className="flex flex-col items-center mb-8 mt-4">
            <div className="relative">
                <div className="w-28 h-28 bg-brand-blue-medium/10 rounded-full flex items-center justify-center text-brand-blue-medium mb-2 border-4 border-white shadow-sm">
                    <UserCircleIcon className="w-24 h-24" />
                </div>
                <div className="absolute bottom-2 right-0 bg-brand-gold p-2 rounded-full border-2 border-white shadow-sm">
                    <CameraIcon className="w-5 h-5 text-brand-navy" />
                </div>
            </div>
            <h3 className="font-bold text-xl text-brand-navy mt-2">{formData.name || 'Usuário'}</h3>
            <p className="text-sm text-brand-blue-medium">{formData.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <label className="block text-xs font-bold text-brand-blue-medium uppercase tracking-wider mb-1">Nome Completo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                 <label className="block text-xs font-bold text-brand-blue-medium uppercase tracking-wider mb-1">Telefone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  maxLength={15}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-brand-gold focus:outline-none"
                />
            </div>
            <div>
                 <label className="block text-xs font-bold text-brand-blue-medium uppercase tracking-wider mb-1">Nascimento</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-brand-gold focus:outline-none"
                />
             </div>
          </div>

          <div>
             <label className="block text-xs font-bold text-brand-blue-medium uppercase tracking-wider mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div className="pt-4 pb-2 border-b border-gray-100">
            <p className="text-sm font-bold text-brand-navy">Endereço</p>
          </div>

          <div className="flex gap-4">
             <div className="w-1/3">
                 <label className="block text-xs font-bold text-brand-blue-medium uppercase tracking-wider mb-1">CEP</label>
                 <div className="relative">
                    <input
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleCepChange}
                    maxLength={9}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-brand-gold focus:outline-none"
                    />
                    {isLoadingCep && (
                    <div className="absolute right-3 top-3 w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                    )}
                 </div>
             </div>
             <div className="flex-1">
                 <label className="block text-xs font-bold text-brand-blue-medium uppercase tracking-wider mb-1">Cidade/UF</label>
                 <div className="flex gap-2">
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        readOnly
                        className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 text-sm"
                    />
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        readOnly
                        className="w-16 p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 text-center text-sm"
                    />
                 </div>
             </div>
          </div>

          <div className="flex gap-4">
              <div className="flex-grow">
                <label className="block text-xs font-bold text-brand-blue-medium uppercase tracking-wider mb-1">Endereço</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-brand-gold focus:outline-none"
                />
              </div>
              <div className="w-24">
                <label className="block text-xs font-bold text-brand-blue-medium uppercase tracking-wider mb-1">Número</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-brand-gold focus:outline-none"
                />
              </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-blue-medium uppercase tracking-wider mb-1">Bairro</label>
            <input
              type="text"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div className="pt-4">
             <label className="block text-xs font-bold text-brand-blue-medium uppercase tracking-wider mb-1">Sexo</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-brand-gold focus:outline-none"
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="NaoInformar">Não Informar</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-gold text-brand-navy font-bold py-4 rounded-xl shadow-lg shadow-brand-gold/30 hover:brightness-105 transition-all mt-6"
          >
            Salvar Alterações
          </button>
        </form>
        
        <button className="w-full mt-6 text-red-500 font-medium text-sm py-2 hover:bg-red-50 rounded-lg transition-colors">
            Sair do Aplicativo
        </button>
      </div>

      <div className={`fixed bottom-10 left-0 right-0 flex justify-center pointer-events-none z-50 transition-all duration-500 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-brand-navy text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 pointer-events-auto ring-1 ring-brand-gold/20">
          <CheckCircleIcon className="w-6 h-6 text-brand-gold" />
          <span className="font-medium text-sm">Perfil atualizado com sucesso!</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
