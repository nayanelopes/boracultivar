
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatusCheck from '@/components/StatusCheck';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const ConsultarStatus = () => {
  const location = useLocation();
  const [protocolo, setProtocolo] = useState<string | null>(null);
  
  useEffect(() => {
    // Extrair número de protocolo da query string se existir
    const params = new URLSearchParams(location.search);
    const protocoloParam = params.get('protocolo');
    if (protocoloParam) {
      setProtocolo(protocoloParam);
    }
  }, [location]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-raiz-green-light/10 py-10 flex-grow">
        <div className="container">
          <Link to="/" className="flex items-center gap-1 text-raiz-green-dark hover:text-raiz-green-light transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar à página inicial</span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-raiz-green-dark mb-4">Consultar Status da Solicitação</h1>
          
          <p className="text-raiz-gray mb-8 max-w-3xl">
            Digite o número do protocolo recebido por e-mail para verificar o status da sua solicitação de plantio.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm max-w-xl">
            {/* Passamos o protocolo da query string para pré-preencher o campo */}
            <StatusCheck compact={true} />
            
            <div className="mt-8 p-4 bg-blue-50 rounded-md border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Prazos estimados para cada etapa:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="bg-gray-400 w-3 h-3 rounded-full"></div>
                  <span><strong>Recebido:</strong> Sua solicitação foi registrada no sistema (imediato)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-yellow-500 w-3 h-3 rounded-full"></div>
                  <span><strong>Análise Técnica:</strong> Avaliação da viabilidade (até 15 dias)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-blue-500 w-3 h-3 rounded-full"></div>
                  <span><strong>Agendado:</strong> Plantio programado (15-30 dias após aprovação)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-green-600 w-3 h-3 rounded-full"></div>
                  <span><strong>Concluído:</strong> Árvore plantada (processo finalizado)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConsultarStatus;
