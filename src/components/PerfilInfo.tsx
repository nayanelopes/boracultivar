import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Leaf, Coins, UserPen } from 'lucide-react';
import UserLevelDisplay from './UserLevelSystem';

interface Usuario {
  nome: string;
  email: string;
  dataNascimento?: string;
  isLogado: boolean;
  preferencias?: any;
}

interface PerfilInfoProps {
  onEditProfile: () => void;
}

const PerfilInfo = ({ onEditProfile }: PerfilInfoProps) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

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

  if (!usuario) {
    return (
      <div className="text-center py-10">
        <p>Usuário não encontrado</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      {/* Header com foto e nome */}
      <div className="flex flex-col items-center mb-8">
        <Avatar className="h-32 w-32 mb-4">
          <AvatarImage src="" />
          <AvatarFallback className="bg-green-100 text-green-700 text-3xl">
            {usuario.nome?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold text-raiz-green-dark mb-2">{usuario.nome}</h2>
        <p className="text-gray-600">{usuario.email}</p>
      </div>

      {/* Nível do Usuário */}
      <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-raiz-green-dark mb-4">Seu Nível de Plantio</h3>
        <UserLevelDisplay treesPlanted={5} showProgress={true} />
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center mb-3">
            <Leaf className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-1">5</div>
          <div className="text-sm text-gray-600">Árvores Plantadas</div>
        </div>
        
        <div className="text-center p-6 bg-yellow-50 rounded-lg">
          <div className="flex items-center justify-center mb-3">
            <Coins className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-yellow-600 mb-1">250</div>
          <div className="text-sm text-gray-600">Moedas Capiba</div>
        </div>
      </div>

      {/* Botão Editar Perfil */}
      <div className="text-center">
        <Button
          onClick={onEditProfile}
          className="bg-raiz-green-dark hover:bg-raiz-green-light flex items-center gap-2"
        >
          <UserPen className="h-4 w-4" />
          Editar Perfil
        </Button>
      </div>
    </div>
  );
};

export default PerfilInfo;
