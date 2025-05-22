
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Gift, Star, BadgePercent } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data do sistema de gamificação
const recompensas = [
  { id: 1, nome: "Cupom 15% de desconto na Uber", custo: 100, icone: "uber" },
  { id: 2, nome: "Cupom 10% de desconto na 99Pop", custo: 80, icone: "99pop" },
  { id: 3, nome: "Vale Planta - Desconto em Jardinagem", custo: 150, icone: "plant" },
  { id: 4, nome: "Kit Sementes Nativas", custo: 200, icone: "seeds" },
];

const GamificationSystem = () => {
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
          
          <div>
            <p className="text-sm text-raiz-gray mb-4">
              Troque suas moedas Capiba por recompensas exclusivas! Quanto mais você contribui com o verde da cidade, mais benefícios você recebe.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recompensas.map((reward, index) => (
                <div key={reward.id} className="border rounded-lg p-4 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-raiz-green-dark">{reward.nome}</h4>
                    <BadgePercent className="h-8 w-8 text-raiz-earth" />
                  </div>
                  <div className="text-sm text-raiz-gray mb-3">
                    Válido por 30 dias após o resgate
                  </div>
                  <div className="mt-auto flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold flex items-center gap-1">
                        <Star className="h-4 w-4 text-raiz-earth" fill="currentColor" />
                        {reward.custo} moedas
                      </span>
                      <Button
                        size="sm"
                        className={index < 2 ? "bg-gray-300" : (userMoedas >= reward.custo ? "bg-raiz-green" : "bg-gray-300")}
                        disabled={true}
                      >
                        Resgatar
                      </Button>
                    </div>
                    <p className="text-xs text-raiz-gray italic text-center">
                      Cadastre-se e solicite um plantio para ver mais.
                    </p>
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
        </div>
      </div>
    </section>
  );
};

export default GamificationSystem;
