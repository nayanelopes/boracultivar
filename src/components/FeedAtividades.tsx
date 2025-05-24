
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Leaf, Camera, Heart, MessageSquare, Share2, Calendar } from 'lucide-react';

interface Atividade {
  id: string;
  tipo: 'plantio' | 'foto' | 'conquista';
  titulo: string;
  descricao: string;
  data: string;
  imagem?: string;
  likes: number;
  comentarios: number;
  compartilhamentos: number;
  isLiked: boolean;
}

const FeedAtividades = () => {
  const [usuario, setUsuario] = useState<any>(null);
  const [atividades, setAtividades] = useState<Atividade[]>([
    {
      id: '1',
      tipo: 'plantio',
      titulo: 'Nova árvore plantada!',
      descricao: 'Plantei uma muda de ipê amarelo na Rua das Flores. Mais uma contribuição para um Recife mais verde! 🌳',
      data: '2024-01-15T10:30:00Z',
      likes: 12,
      comentarios: 3,
      compartilhamentos: 2,
      isLiked: false
    },
    {
      id: '2',
      tipo: 'foto',
      titulo: 'Crescimento impressionante!',
      descricao: 'Olha só como está crescendo a árvore que plantei há 3 meses. A natureza é incrível! 🌱',
      data: '2024-01-10T14:45:00Z',
      imagem: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      likes: 8,
      comentarios: 5,
      compartilhamentos: 1,
      isLiked: true
    },
    {
      id: '3',
      tipo: 'conquista',
      titulo: 'Conquistei o badge "Plantador Verde"!',
      descricao: 'Completei meu 5º plantio e ganhei 50 moedas Capiba! Vamos continuar verdejando nossa cidade! 🏆',
      data: '2024-01-05T09:15:00Z',
      likes: 15,
      comentarios: 7,
      compartilhamentos: 4,
      isLiked: false
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
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getIconeAtividade = (tipo: string) => {
    switch (tipo) {
      case 'plantio':
        return <Leaf className="h-5 w-5 text-green-600" />;
      case 'foto':
        return <Camera className="h-5 w-5 text-blue-600" />;
      case 'conquista':
        return <div className="h-5 w-5 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">🏆</div>;
      default:
        return <Leaf className="h-5 w-5 text-green-600" />;
    }
  };

  if (!usuario) {
    return (
      <div className="text-center py-10">
        <p>Faça login para ver suas atividades</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-raiz-green-dark mb-4">Meu Feed de Atividades</h2>
        <p className="text-gray-600 mb-6">Acompanhe suas contribuições para um Recife mais verde!</p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">5</div>
            <div className="text-sm text-gray-600">Árvores Plantadas</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-600">Fotos Compartilhadas</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">250</div>
            <div className="text-sm text-gray-600">Moedas Capiba</div>
          </div>
        </div>
      </div>

      {/* Feed de Atividades */}
      <div className="space-y-4">
        {atividades.map((atividade) => (
          <Card key={atividade.id} className="bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {usuario.nome?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{usuario.nome}</span>
                    {getIconeAtividade(atividade.tipo)}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {formatData(atividade.data)}
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
                    className={`flex items-center gap-1 ${atividade.isLiked ? 'text-red-600' : 'text-gray-600'}`}
                  >
                    <Heart className={`h-4 w-4 ${atividade.isLiked ? 'fill-current' : ''}`} />
                    {atividade.likes}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                    <MessageSquare className="h-4 w-4" />
                    {atividade.comentarios}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                    <Share2 className="h-4 w-4" />
                    {atividade.compartilhamentos}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeedAtividades;
