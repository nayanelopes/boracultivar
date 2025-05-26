
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type Solicitacao = {
  protocolo: string;
  endereco: string;
  data: string;
  status: 'Recebido' | 'Análise Técnica' | 'Agendado' | 'Concluído' | 'Rejeitado';
  descricao: string;
};

const HistoricoSolicitacoes = () => {
  // Dados simulados de histórico do usuário logado
  const solicitacoes: Solicitacao[] = [
    {
      protocolo: '123456',
      endereco: 'Rua das Flores, 123 - Boa Viagem',
      data: '15/04/2025',
      status: 'Análise Técnica',
      descricao: 'Sua solicitação está sendo avaliada pela equipe técnica.'
    },
    {
      protocolo: '234567',
      endereco: 'Av. Conselheiro Aguiar, 456 - Boa Viagem',
      data: '10/04/2025',
      status: 'Agendado',
      descricao: 'O plantio foi agendado. Nossa equipe visitará o local em breve.'
    },
    {
      protocolo: '345678',
      endereco: 'Rua do Sol, 789 - Recife Antigo',
      data: '05/04/2025',
      status: 'Concluído',
      descricao: 'O plantio foi realizado com sucesso!'
    },
    {
      protocolo: '456789',
      endereco: 'Rua da Hora, 321 - Espinheiro',
      data: '28/03/2025',
      status: 'Rejeitado',
      descricao: 'Local não adequado para plantio devido à proximidade com fiação elétrica.'
    }
  ];

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
              <TableHead>Descrição</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {solicitacoes.map((solicitacao) => (
              <TableRow key={solicitacao.protocolo}>
                <TableCell className="font-medium">{solicitacao.protocolo}</TableCell>
                <TableCell>{solicitacao.endereco}</TableCell>
                <TableCell>{solicitacao.data}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(solicitacao.status)} text-white`}>
                    {solicitacao.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">{solicitacao.descricao}</TableCell>
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
