import React from 'react';

interface EconomyCardProps {
  savings: number;
}

const EconomyCard: React.FC<EconomyCardProps> = ({ savings }) => {
  return (
    <div className="w-64 flex-shrink-0 p-5 rounded-2xl bg-blue-50 flex flex-col justify-center h-full">
        <p className="font-bold text-blue-800 text-center">Economia</p>
        <p className="font-bold text-blue-900 text-3xl text-center my-2">R$ {savings.toFixed(2)}</p>
        <p className="text-xs text-blue-700 text-center">Economizados este mês</p>
    </div>
  );
};

export default EconomyCard;
