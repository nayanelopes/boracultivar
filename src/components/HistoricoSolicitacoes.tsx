
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type Solicitacao = {
  id: string;
  numero_protocolo: string;
  endereco: string;
  data_criacao: string;
  status: 'Recebido' | 'Análise Técnica' | 'Agendado' | 'Concluído' | 'Rejeitado';
  observacoes: string;
};

const HistoricoSolicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSolicitacoes();
    
    // Configurar realtime para atualizações automáticas
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'protocolos'
        },
        () => {
          fetchSolicitacoes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchSolicitacoes = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setSolicitacoes([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('protocolos')
        .select('*')
        .eq('user_id', session.user.id)
        .order('data_criacao', { ascending: false });

      if (error) {
        console.error('Erro ao buscar solicitações:', error);
        toast({
          title: "Erro",
          description: "Erro ao carregar histórico de solicitações.",
          variant: "destructive"
        });
        return;
      }

      setSolicitacoes(data || []);
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar histórico de solicitações.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recebido':
        return 'bg-gray-500';
      case 'Análise Técnica':
        return 'bg-yellow-500';
      case 'Agendado':
        return 'bg-blue-500';
      case 'Concluído':
        return 'bg-green-600';
      case 'Rejeitado':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusDescription = (status: string) => {
    const descriptions: Record<string, string> = {
      'Recebido': 'Sua solicitação foi registrada no sistema e será analisada em breve pela nossa equipe técnica.',
      'Análise Técnica': 'Nossa equipe técnica está avaliando a viabilidade do local solicitado. Verificamos aspectos como tipo de solo, proximidade com fiação elétrica, espaço disponível e características do terreno para garantir o melhor desenvolvimento da árvore.',
      'Agendado': 'Parabéns! Sua solicitação foi aprovada e o plantio foi agendado. Nossa equipe especializada visitará o local nos próximos dias úteis para realizar o plantio da árvore. Você receberá uma notificação com o horário exato da visita.',
      'Concluído': 'Sucesso! O plantio foi realizado com êxito. Uma linda árvore nativa foi plantada no local solicitado. Agora é importante cuidar dela: regue regularmente (principalmente nos primeiros meses), proteja de danos e observe seu crescimento. Você acabou de contribuir para um Recife mais verde!',
      'Rejeitado': 'Infelizmente, após análise técnica, identificamos que o local não é adequado para plantio. Sugerimos que você indique outro local em sua região.',
    };
    return descriptions[status] || 'Status não reconhecido.';
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-raiz-green-dark mb-6">Histórico de Solicitações</h2>
        <div className="text-center py-8 text-gray-500">
          <p>Carregando histórico...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-raiz-green-dark mb-6">Histórico de Solicitações</h2>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Protocolo</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Descrição Detalhada</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {solicitacoes.map((solicitacao) => (
              <TableRow key={solicitacao.id}>
                <TableCell className="font-medium">{solicitacao.numero_protocolo}</TableCell>
                <TableCell>{solicitacao.endereco}</TableCell>
                <TableCell>{new Date(solicitacao.data_criacao).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(solicitacao.status)} text-white`}>
                    {solicitacao.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md">
                  <p className="text-sm leading-relaxed">
                    {solicitacao.observacoes || getStatusDescription(solicitacao.status)}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {solicitacoes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Você ainda não possui solicitações de plantio.</p>
        </div>
      )}
    </div>
  );
};

export default HistoricoSolicitacoes;
