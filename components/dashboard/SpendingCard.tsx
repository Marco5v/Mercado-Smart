import React from 'react';

interface SpendingCardProps {
  current: number;
  budget: number;
}

const SpendingCard: React.FC<SpendingCardProps> = ({ current, budget }) => {
  const spentPercentage = Math.min(current / budget, 1);
  
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - spentPercentage);

  return (
    <div className="w-72 flex-shrink-0 p-5 rounded-2xl shadow-xl shadow-blue-800/30 bg-gradient-to-br from-blue-800 to-blue-500 text-white flex items-center justify-between h-full">
        <div className="flex-grow">
            <p className="text-sm text-blue-200">Gasto Mensal</p>
            <p className="font-bold text-3xl mt-1">R$ {current.toFixed(2)}</p>
            <p className="text-xs text-blue-100 mt-1">Meta: R$ {budget.toFixed(2)}</p>
        </div>
        <div className="w-16 h-16 relative flex-shrink-0">
            <svg className="w-full h-full" viewBox="0 0 64 64">
              <circle
                className="text-blue-900/50"
                strokeWidth="6"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="32"
                cy="32"
              />
              <circle
                className="text-white"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="32"
                cy="32"
                transform="rotate(-90 32 32)"
              />
            </svg>
        </div>
    </div>
  );
};

export default SpendingCard;