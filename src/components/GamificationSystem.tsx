
import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Leaf, Gift, Star, BadgePercent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock data do sistema de gamificação
const rankingData = [
  { posicao: 1, usuario: "Maria Silva", solicitacoes: 12, moedas: 240 },
  { posicao: 2, usuario: "João Pereira", solicitacoes: 10, moedas: 200 },
  { posicao: 3, usuario: "Ana Costa", solicitacoes: 8, moedas: 160 },
  { posicao: 4, usuario: "Carlos Santos", solicitacoes: 7, moedas: 140 },
  { posicao: 5, usuario: "Juliana Lima", solicitacoes: 6, moedas: 120 },
];

const recompensas = [
  { id: 1, nome: "Cupom 15% de desconto na Uber", custo: 100, icone: "uber" },
  { id: 2, nome: "Cupom 10% de desconto na 99Pop", custo: 80, icone: "99pop" },
  { id: 3, nome: "Vale Planta - Desconto em Jardinagem", custo: 150, icone: "plant" },
  { id: 4, nome: "Kit Sementes Nativas", custo: 200, icone: "seeds" },
];

const GamificationSystem = () => {
  const [activeTab, setActiveTab] = React.useState<'ranking' | 'rewards'>('ranking');
  const [userMoedas, setUserMoedas] = React.useState(120); // Mock de moedas do usuário atual

  const handleRedeemReward = (rewardId: number, custo: number) => {
    if (userMoedas >= custo) {
      setUserMoedas(prev => prev - custo);
      // Aqui entraria a lógica real para resgatar a recompensa
      alert(`Recompensa resgatada com sucesso! Seu saldo atual: ${userMoedas - custo} moedas Capiba.`);
    } else {
      alert("Você não possui moedas Capiba suficientes para esta recompensa.");
    }
  };

  return (
    <section className="section bg-raiz-green-light/10 py-12">
      <div className="container">
        <h2 className="text-3xl font-bold text-center text-raiz-green-dark mb-6">Programa Capiba Verde</h2>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-raiz-green" />
              <h3 className="text-xl font-semibold text-raiz-green-dark">Sistema de Recompensas</h3>
            </div>
            <div className="flex items-center gap-2 bg-raiz-green-light/20 px-4 py-2 rounded-full">
              <Star className="h-5 w-5 text-raiz-earth" fill="currentColor" />
              <span className="font-semibold text-raiz-green-dark">{userMoedas} Moedas Capiba</span>
            </div>
          </div>
          
          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'ranking' ? 'border-b-2 border-raiz-green text-raiz-green-dark' : 'text-raiz-gray'}`}
              onClick={() => setActiveTab('ranking')}
            >
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Ranking
              </div>
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'rewards' ? 'border-b-2 border-raiz-green text-raiz-green-dark' : 'text-raiz-gray'}`}
              onClick={() => setActiveTab('rewards')}
            >
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                Recompensas
              </div>
            </button>
          </div>
          
          {activeTab === 'ranking' && (
            <div>
              <p className="text-sm text-raiz-gray mb-4">
                Participe plantando árvores e subindo no ranking! Quanto mais solicitações aprovadas, mais moedas Capiba você ganha!
              </p>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Posição</TableHead>
                    <TableHead>Participante</TableHead>
                    <TableHead className="text-right">Solicitações</TableHead>
                    <TableHead className="text-right">Moedas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankingData.map((item) => (
                    <TableRow key={item.posicao}>
                      <TableCell className="font-medium">
                        {item.posicao === 1 && <Trophy className="h-5 w-5 text-yellow-500 inline mr-1" />}
                        {item.posicao > 1 && item.posicao <= 3 && <Trophy className="h-5 w-5 text-gray-400 inline mr-1" />}
                        {item.posicao}
                      </TableCell>
                      <TableCell>{item.usuario}</TableCell>
                      <TableCell className="text-right">{item.solicitacoes}</TableCell>
                      <TableCell className="text-right font-medium">
                        {item.moedas} <Star className="h-4 w-4 text-raiz-earth inline" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-raiz-gray mb-2">Você ganha 20 moedas Capiba por cada solicitação aprovada!</p>
                <Link to="/solicitar-plantio" className="btn-primary inline-flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Solicitar Plantio
                </Link>
              </div>
            </div>
          )}
          
          {activeTab === 'rewards' && (
            <div>
              <p className="text-sm text-raiz-gray mb-4">
                Troque suas moedas Capiba por recompensas exclusivas! Quanto mais você contribui com o verde da cidade, mais benefícios você recebe.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recompensas.map((reward) => (
                  <div key={reward.id} className="border rounded-lg p-4 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-raiz-green-dark">{reward.nome}</h4>
                      <BadgePercent className="h-8 w-8 text-raiz-earth" />
                    </div>
                    <div className="text-sm text-raiz-gray mb-3">
                      Válido por 30 dias após o resgate
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-semibold flex items-center gap-1">
                        <Star className="h-4 w-4 text-raiz-earth" fill="currentColor" />
                        {reward.custo} moedas
                      </span>
                      <Button
                        size="sm"
                        className={userMoedas >= reward.custo ? "bg-raiz-green" : "bg-gray-300"}
                        disabled={userMoedas < reward.custo}
                        onClick={() => handleRedeemReward(reward.id, reward.custo)}
                      >
                        Resgatar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-raiz-green-light/10 p-4 rounded-lg">
                <h4 className="font-medium text-raiz-green-dark mb-2">Como ganhar mais moedas Capiba?</h4>
                <ul className="list-disc list-inside text-sm text-raiz-gray">
                  <li>Solicite o plantio de árvores (20 moedas por solicitação aprovada)</li>
                  <li>Compartilhe fotos da sua árvore após o plantio (10 moedas)</li>
                  <li>Convide amigos para o programa (15 moedas por amigo)</li>
                  <li>Participe de eventos de plantio coletivo (50 moedas)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GamificationSystem;
