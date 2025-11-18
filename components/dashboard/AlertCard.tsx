import React from 'react';
import ShelvesIcon from '../icons/ShelvesIcon';

interface AlertCardProps {
  count: number;
}

const AlertCard: React.FC<AlertCardProps> = ({ count }) => {
    if (count === 0) return null;

  return (
    <div className="w-64 flex-shrink-0 p-5 rounded-2xl shadow-lg shadow-gray-400/10 bg-white border border-blue-100 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <ShelvesIcon className="w-5 h-5 text-blue-800" />
            </div>
            <p className="font-bold text-gray-600">Atenção</p>
        </div>
        <p className="font-bold text-blue-900 text-xl mt-4">
            {count} {count === 1 ? 'item acabou' : 'itens acabaram'}
        </p>
      </div>
      <button className="text-left text-sm text-gray-500 font-semibold mt-2 hover:underline">
        Toque para repor
      </button>
    </div>
  );
};

export default AlertCard;