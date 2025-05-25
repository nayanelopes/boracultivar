
import React from 'react';
import { Check } from 'lucide-react';

interface SuccessMessageProps {
  show: boolean;
  onClose: () => void;
}

const SuccessMessage = ({ show, onClose }: SuccessMessageProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center animate-scale-in">
        <div className="bg-green-100 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          Obrigado por cuidar do Recife comigo! 🌳
        </h2>
        <p className="text-gray-600 mb-6">
          Seja bem-vindo(a) ao movimento Bora Cultivar! Agora você pode solicitar o plantio de árvores e acompanhar o crescimento da nossa cidade verde.
        </p>
        <button
          onClick={onClose}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
