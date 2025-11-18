
import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { UserCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface RegistrationModalProps {
  onComplete: (profile: UserProfile) => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    phone: '',
    email: '',
    cep: '',
    gender: '',
    birthDate: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  // Simple masking logic
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
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.email || !formData.cep || !formData.gender || !formData.birthDate) {
      alert("Por favor, preencha todos os campos.");
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
      <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl p-8 flex flex-col items-center animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <CheckCircleIcon className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Tudo Pronto!</h2>
            <p className="text-gray-500 text-center">Seu perfil foi criado com sucesso.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm">
      <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-xl shadow-2xl h-[90vh] sm:h-auto flex flex-col overflow-hidden animate-[slide-up_0.3s_ease-out]">
        <header className="bg-blue-600 p-6 text-center">
           <UserCircleIcon className="w-16 h-16 text-white mx-auto mb-2" />
           <h2 className="text-xl font-bold text-white">Bem-vindo ao Mercado Smart!</h2>
           <p className="text-blue-100 text-sm">Vamos criar o seu perfil para personalizar a experiência.</p>
        </header>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-grow">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ex: João Silva"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              maxLength={15}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="joao@email.com"
            />
          </div>

          <div className="flex gap-4">
             <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleCepChange}
                  maxLength={9}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="00000-000"
                />
             </div>
             <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nascimento</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="NaoInformar">Não Informar</option>
            </select>
          </div>
        </form>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-colors active:scale-95"
          >
            Concluir Cadastro
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
