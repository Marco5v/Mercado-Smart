
import React, { useState, useEffect } from 'react';
import type { UserProfile } from '../types';
import { UserCircleIcon, ArrowLeftIcon, CameraIcon } from '@heroicons/react/24/outline';

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
    gender: '',
    birthDate: '',
  });

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

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    setFormData(prev => ({ ...prev, cep: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    alert("Perfil atualizado com sucesso!");
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
             <label className="block text-xs font-bold text-brand-blue-medium uppercase tracking-wider mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
             <div className="flex-1">
                 <label className="block text-xs font-bold text-brand-blue-medium uppercase tracking-wider mb-1">CEP</label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleCepChange}
                  maxLength={9}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-brand-gold focus:outline-none"
                />
             </div>
             <div className="flex-1">
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
             <label className="block text-xs font-bold text-brand-blue-medium uppercase tracking-wider mb-1">Sexo</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-brand-gold focus:outline-none"
            >
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
    </div>
  );
};

export default ProfileScreen;
