
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // Carregar protocolo salvo ao inicializar o componente
  useEffect(() => {
    try {
      const savedProtocolo = localStorage.getItem('plantio_protocolo');
      if (savedProtocolo) {
        setProtocolo(savedProtocolo);
      }
    } catch (error) {
      console.error("Erro ao recuperar protocolo:", error);
    }
  }, []);
  
  const getStatusDetails = (status: string, data_atualizacao: string) => {
    const statusMap: Record<string, { cor: string; descricao: string }> = {
      'Recebido': {
        cor: 'bg-gray-500',
        descricao: 'Sua solicitação foi registrada no sistema e será analisada em breve.',
      },
      'Análise Técnica': {
        cor: 'bg-yellow-500',
        descricao: 'Sua solicitação está sendo avaliada pela equipe técnica.',
      },
      'Agendado': {
        cor: 'bg-blue-500',
        descricao: 'O plantio foi agendado. Nossa equipe visitará o local em breve.',
      },
      'Concluído': {
        cor: 'bg-green-600',
        descricao: 'O plantio foi realizado com sucesso! Agora é só cuidar da árvore.',
      },
      'Rejeitado': {
        cor: 'bg-red-500',
        descricao: 'Infelizmente, o local não é adequado para plantio.',
      },
    };

    const statusInfo = statusMap[status] || statusMap['Recebido'];
    
    return {
      etapa: status,
      data: new Date(data_atualizacao).toLocaleDateString('pt-BR'),
      cor: statusInfo.cor,
      descricao: statusInfo.descricao,
    };
  };
  
  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!protocolo.trim()) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('protocolos')
        .select('*')
        .eq('numero_protocolo', protocolo.trim())
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao buscar protocolo:', error);
        toast({
          title: "Erro",
          description: "Erro ao consultar protocolo. Tente novamente.",
          variant: "destructive"
        });
        return;
      }

      if (data) {
        setStatus(getStatusDetails(data.status, data.data_atualizacao));
      } else {
        setStatus(null);
      }
    } catch (error) {
      console.error('Erro ao buscar protocolo:', error);
      toast({
        title: "Erro",
        description: "Erro ao consultar protocolo. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Se temos um protocolo automaticamente ao carregar, verificar o status
  useEffect(() => {
    if (protocolo) {
      // Verificar status após um pequeno delay para dar tempo da UI renderizar
      setTimeout(() => {
        handleCheck({ preventDefault: () => {} } as React.FormEvent);
      }, 100);
    }
  }, [protocolo]);
  
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
                  disabled={loading}
                  className="bg-raiz-green-dark hover:bg-raiz-green-light p-2 rounded-r-md text-white flex items-center disabled:opacity-50"
                >
                  <Search className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            {status === null && protocolo && !loading && (
              <div className="bg-red-50 text-red-700 p-3 rounded">
                Protocolo não encontrado. Verifique o número e tente novamente.
              </div>
            )}
            
            {loading && (
              <div className="bg-blue-50 text-blue-700 p-3 rounded">
                Consultando protocolo...
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
