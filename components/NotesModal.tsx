
import React, { useState, useEffect } from 'react';
import XMarkIcon from './icons/XMarkIcon';

interface NotesModalProps {
  initialNotes: string;
  onSave: (notes: string) => void;
  onClose: () => void;
}

const NotesModal: React.FC<NotesModalProps> = ({ initialNotes, onSave, onClose }) => {
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  const handleSave = () => {
    onSave(notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0">
      <div className="bg-white w-full sm:max-w-md rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[80vh] animate-cart-bounce">
        <header className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="font-bold text-lg text-gray-800">Minhas Anotações</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </header>
        
        <div className="p-4 flex-grow">
          <textarea
            className="w-full h-64 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none font-medium"
            placeholder="Digite suas anotações, lembretes ou itens rápidos aqui..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <div className="p-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesModal;
