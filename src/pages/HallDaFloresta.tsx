
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Trophy, Crown, Medal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { userLevels, getUserLevel } from '@/components/UserLevelSystem';

// Mock data do ranking com bairros do Recife
const rankingData = [
  { id: 1, nome: "Maria Silva", treesPlanted: 245, bairro: "Casa Amarela" },
  { id: 2, nome: "João Santos", treesPlanted: 198, bairro: "Ibura" },
  { id: 3, nome: "Ana Costa", treesPlanted: 156, bairro: "Arruda" },
  { id: 4, nome: "Pedro Lima", treesPlanted: 134, bairro: "Várzea" },
  { id: 5, nome: "Carla Oliveira", treesPlanted: 112, bairro: "Espinheiro" },
  { id: 6, nome: "Rafael Souza", treesPlanted: 98, bairro: "Sancho" },
  { id: 7, nome: "Lucia Ferreira", treesPlanted: 87, bairro: "Porto da Madeira" },
  { id: 8, nome: "Carlos Mendes", treesPlanted: 76, bairro: "Alto do Pascoal" },
  { id: 9, nome: "Beatriz Rocha", treesPlanted: 65, bairro: "Jardim São Paulo" },
  { id: 10, nome: "Fernando Alves", treesPlanted: 54, bairro: "Coque" }
];

const HallDaFloresta = () => {
  // Verificar se o usuário está logado e obter suas informações
  const [currentUser, setCurrentUser] = React.useState<{
    nome: string;
    treesPlanted: number;
    bairro: string;
  } | null>(null);
  const [userPosition, setUserPosition] = React.useState<number | null>(null);

  React.useEffect(() => {
    try {
      const usuario = localStorage.getItem('raiz_urbana_usuario');
      if (usuario) {
        const dadosUsuario = JSON.parse(usuario);
        if (dadosUsuario.isLogado) {
          // Simular dados do usuário logado
          const userData = {
            nome: dadosUsuario.nome || "Usuário Logado",
            treesPlanted: 89, // Simulando árvores plantadas
            bairro: "Boa Viagem"
          };
          setCurrentUser(userData);
          
          // Calcular posição no ranking
          const position = rankingData.filter(user => user.treesPlanted > userData.treesPlanted).length + 1;
          setUserPosition(position);
        }
      }
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
    }
  }, []);

  const getRankIcon = (position: number) => {
    if (position === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
    if (position === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (position === 3) return <Trophy className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-500">#{position}</span>;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-raiz-green-light/10 py-10 flex-grow">
        <div className="container">
          <Link to="/" className="flex items-center gap-1 text-raiz-green-dark hover:text-raiz-green-light transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar à página inicial</span>
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-raiz-green-dark mb-4">
              🌳 Hall da Floresta 🌳
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conheça os maiores Embaixadores da Natureza do Recife! 
              Estes heróis verdes estão transformando nossa cidade, uma árvore por vez.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Posição do Usuário Logado */}
            {currentUser && userPosition && (
              <Card className="mb-8 border-2 border-raiz-green bg-gradient-to-r from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-raiz-green-dark">
                    🎯 Sua Posição no Ranking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg">
                    <div className="flex items-center justify-center w-12">
                      {getRankIcon(userPosition)}
                    </div>
                    
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {currentUser.nome.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{currentUser.nome}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {getUserLevel(currentUser.treesPlanted).emoji} {getUserLevel(currentUser.treesPlanted).name}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{currentUser.bairro}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {currentUser.treesPlanted}
                      </div>
                      <div className="text-xs text-gray-500">árvores</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Níveis de Plantio */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ✨ Níveis de Plantio ✨
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userLevels.map((level) => (
                    <div key={level.level} className="border rounded-lg p-4 hover:bg-green-50 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{level.emoji}</span>
                        <div>
                          <Badge variant="outline">Nível {level.level}</Badge>
                          <h4 className="font-semibold text-raiz-green-dark">{level.name}</h4>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{level.description}</p>
                      <p className="text-xs text-green-600 mt-2">
                        {level.maxTrees === Infinity 
                          ? `${level.minTrees}+ árvores` 
                          : `${level.minTrees}-${level.maxTrees} árvores`
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ranking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🏆 Ranking dos Embaixadores da Natureza
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rankingData.map((user, index) => {
                    const position = index + 1;
                    const userLevel = getUserLevel(user.treesPlanted);
                    
                    return (
                      <div 
                        key={user.id} 
                        className={`flex items-center gap-4 p-4 rounded-lg border ${
                          position <= 3 ? 'bg-gradient-to-r from-yellow-50 to-green-50 border-yellow-200' : 'bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-center w-12">
                          {getRankIcon(position)}
                        </div>
                        
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-green-100 text-green-700">
                            {user.nome.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{user.nome}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {userLevel.emoji} {userLevel.name}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{user.bairro}, Recife</p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {user.treesPlanted}
                          </div>
                          <div className="text-xs text-gray-500">árvores</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Cadastre-se e plante árvores para aparecer no ranking!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HallDaFloresta;
