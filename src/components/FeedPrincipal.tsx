
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Leaf, 
  Camera, 
  Heart, 
  MessageSquare, 
  Share2, 
  Calendar, 
  Trophy,
  Users,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface AtividadeFeed {
  id: string;
  tipo: 'plantio' | 'foto' | 'conquista' | 'comentario';
  usuario: {
    nome: string;
    avatar?: string;
    nivel: string;
  };
  titulo: string;
  descricao: string;
  data: string;
  imagem?: string;
  localizacao?: string;
  likes: number;
  comentarios: number;
  compartilhamentos: number;
  isLiked: boolean;
}

const FeedPrincipal = () => {
  const [usuario, setUsuario] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'todos' | 'seguindo' | 'local'>('todos');
  const [atividades, setAtividades] = useState<AtividadeFeed[]>([
    {
      id: '1',
      tipo: 'plantio',
      usuario: {
        nome: 'Maria Silva',
        nivel: 'Plantador Verde'
      },
      titulo: 'Nova árvore plantada na Boa Viagem!',
      descricao: 'Plantei uma muda de pau-brasil na Rua José de Alencar. Que alegria contribuir para um Recife mais verde! 🌳',
      data: '2024-01-20T08:30:00Z',
      localizacao: 'Boa Viagem, Recife',
      likes: 24,
      comentarios: 8,
      compartilhamentos: 5,
      isLiked: false
    },
    {
      id: '2',
      tipo: 'foto',
      usuario: {
        nome: 'João Santos',
        nivel: 'Raiz Ativa'
      },
      titulo: 'Crescimento incrível em 6 meses!',
      descricao: 'Olha só como está a árvore que plantei no Casa Forte. A natureza é mesmo surpreendente! 🌱',
      data: '2024-01-19T16:45:00Z',
      imagem: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      localizacao: 'Casa Forte, Recife',
      likes: 18,
      comentarios: 12,
      compartilhamentos: 3,
      isLiked: true
    },
    {
      id: '3',
      tipo: 'conquista',
      usuario: {
        nome: 'Ana Costa',
        nivel: 'Guardião da Calçada'
      },
      titulo: 'Conquistou o badge "Capibara Verde"!',
      descricao: 'Completei 25 plantios e agora sou oficialmente uma Capibara Verde! 250 moedas Capiba conquistadas! 🏆',
      data: '2024-01-18T12:15:00Z',
      likes: 32,
      comentarios: 15,
      compartilhamentos: 8,
      isLiked: false
    },
    {
      id: '4',
      tipo: 'comentario',
      usuario: {
        nome: 'Carlos Oliveira',
        nivel: 'Mestre da Floresta Urbana'
      },
      titulo: 'Dicas para cuidar das mudas',
      descricao: 'Pessoal, lembrem-se: regar de manhã cedo ou no final da tarde é fundamental nos primeiros meses! 💧',
      data: '2024-01-17T19:20:00Z',
      likes: 45,
      comentarios: 23,
      compartilhamentos: 12,
      isLiked: true
    }
  ]);

  useEffect(() => {
    const usuarioLocal = localStorage.getItem('raiz_urbana_usuario');
    if (usuarioLocal) {
      try {
        const usuarioParsed = JSON.parse(usuarioLocal);
        setUsuario(usuarioParsed);
      } catch (error) {
        console.error("Erro ao processar dados do usuário:", error);
      }
    }
  }, []);

  const handleLike = (atividadeId: string) => {
    setAtividades(prev => prev.map(atividade => 
      atividade.id === atividadeId 
        ? { 
            ...atividade, 
            isLiked: !atividade.isLiked,
            likes: atividade.isLiked ? atividade.likes - 1 : atividade.likes + 1
          }
        : atividade
    ));
  };

  const formatData = (dataString: string) => {
    const data = new Date(dataString);
    const agora = new Date();
    const diff = agora.getTime() - data.getTime();
    const horas = Math.floor(diff / (1000 * 60 * 60));
    
    if (horas < 1) return 'Agora mesmo';
    if (horas < 24) return `${horas}h atrás`;
    const dias = Math.floor(horas / 24);
    return `${dias}d atrás`;
  };

  const getIconeAtividade = (tipo: string) => {
    switch (tipo) {
      case 'plantio':
        return <Leaf className="h-5 w-5 text-green-600" />;
      case 'foto':
        return <Camera className="h-5 w-5 text-blue-600" />;
      case 'conquista':
        return <Trophy className="h-5 w-5 text-yellow-600" />;
      case 'comentario':
        return <MessageSquare className="h-5 w-5 text-purple-600" />;
      default:
        return <Leaf className="h-5 w-5 text-green-600" />;
    }
  };

  const getCorTipo = (tipo: string) => {
    switch (tipo) {
      case 'plantio':
        return 'bg-green-100 text-green-800';
      case 'foto':
        return 'bg-blue-100 text-blue-800';
      case 'conquista':
        return 'bg-yellow-100 text-yellow-800';
      case 'comentario':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!usuario) {
    return null; // Não mostra o feed se não estiver logado
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header do Feed */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-green-800">Feed da Comunidade</h2>
              <p className="text-gray-600">Veja as últimas atividades dos plantadores do Recife</p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-green-600" />
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">1.2k</div>
                <div className="text-xs text-gray-600">Membros</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de Filtro */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="todos" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Todos
          </TabsTrigger>
          <TabsTrigger value="seguindo" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Seguindo
          </TabsTrigger>
          <TabsTrigger value="local" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Meu Bairro
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {atividades.map((atividade) => (
            <Card key={atividade.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={atividade.usuario.avatar} />
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {atividade.usuario.nome.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{atividade.usuario.nome}</span>
                        {getIconeAtividade(atividade.tipo)}
                      </div>
                      <Badge variant="secondary" className={`text-xs ${getCorTipo(atividade.tipo)}`}>
                        {atividade.usuario.nivel}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Calendar className="h-3 w-3" />
                        {formatData(atividade.data)}
                        {atividade.localizacao && (
                          <>
                            <span>•</span>
                            <MapPin className="h-3 w-3" />
                            {atividade.localizacao}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <h3 className="font-semibold text-gray-900 mb-2">{atividade.titulo}</h3>
                <p className="text-gray-700 mb-3">{atividade.descricao}</p>
                
                {atividade.imagem && (
                  <div className="mb-4">
                    <img 
                      src={atividade.imagem} 
                      alt="Atividade" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(atividade.id)}
                      className={`flex items-center gap-2 ${atividade.isLiked ? 'text-red-600' : 'text-gray-600'}`}
                    >
                      <Heart className={`h-4 w-4 ${atividade.isLiked ? 'fill-current' : ''}`} />
                      {atividade.likes}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600">
                      <MessageSquare className="h-4 w-4" />
                      {atividade.comentarios}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600">
                      <Share2 className="h-4 w-4" />
                      {atividade.compartilhamentos}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedPrincipal;
