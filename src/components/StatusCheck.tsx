
import React, { useState } from 'react';
import { Search } from 'lucide-react';

type StatusProps = {
  compact?: boolean;
};

const StatusCheck: React.FC<StatusProps> = ({ compact = false }) => {
  const [protocolo, setProtocolo] = useState('');
  const [status, setStatus] = useState<null | {
    etapa: string;
    data: string;
    descricao: string;
    cor: string;
  }>(null);
  
  // Dados simulados para demonstração
  const mockStatuses: Record<string, {
    etapa: string;
    data: string;
    descricao: string;
    cor: string;
  }> = {
    '123456': {
      etapa: 'Análise Técnica',
      data: '15/04/2025',
      descricao: 'Sua solicitação está sendo avaliada pela equipe técnica.',
      cor: 'bg-yellow-500',
    },
    '234567': {
      etapa: 'Agendado',
      data: '22/04/2025',
      descricao: 'O plantio foi agendado. Nossa equipe visitará o local em breve.',
      cor: 'bg-blue-500',
    },
    '345678': {
      etapa: 'Concluído',
      data: '10/04/2025',
      descricao: 'O plantio foi realizado com sucesso! Agora é só cuidar da árvore.',
      cor: 'bg-green-600',
    },
  };
  
  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular busca em uma API
    setTimeout(() => {
      const result = mockStatuses[protocolo];
      setStatus(result || null);
    }, 500);
  };
  
  return (
    <div className={`${compact ? 'bg-transparent' : 'section bg-gray-50'}`}>
      <div className={`${compact ? '' : 'container'}`}>
        {!compact && (
          <h2 className="text-3xl font-bold text-center text-raiz-green-dark mb-8">
            Acompanhe sua Solicitação
          </h2>
        )}
        
        <div className={`${compact ? '' : 'max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm'}`}>
          <form onSubmit={handleCheck} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="protocolo" className="font-medium">
                Número do Protocolo
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="protocolo"
                  placeholder="Ex: 123456"
                  className="flex-1 rounded-l-md border border-gray-300 px-4 py-2"
                  value={protocolo}
                  onChange={(e) => setProtocolo(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-raiz-green-dark hover:bg-raiz-green-light p-2 rounded-r-md text-white flex items-center"
                >
                  <Search className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            {status === null && protocolo && (
              <div className="bg-red-50 text-red-700 p-3 rounded">
                Protocolo não encontrado. Verifique o número e tente novamente.
              </div>
            )}
            
            {status && (
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center mb-3">
                  <div className={`${status.cor} w-3 h-3 rounded-full mr-2`}></div>
                  <h3 className="font-semibold text-lg">{status.etapa}</h3>
                </div>
                <p className="text-sm mb-2">Data da atualização: {status.data}</p>
                <p>{status.descricao}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default StatusCheck;
