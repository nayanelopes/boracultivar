
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PersonalInfoForm from './PersonalInfoForm';
import NotificationPreferences from './NotificationPreferences';

interface PreferenciaNotificacoes {
  atualizacoesPlantio: boolean;
  reclamacoesArvores: boolean;
  alertasCapiba: boolean;
}

interface Usuario {
  nome: string;
  email: string;
  dataNascimento?: string;
  isLogado: boolean;
  preferencias: PreferenciaNotificacoes;
}

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [preferencias, setPreferencias] = useState<PreferenciaNotificacoes>({
    atualizacoesPlantio: true,
    reclamacoesArvores: false,
    alertasCapiba: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const usuarioLocal = localStorage.getItem('raiz_urbana_usuario');
    if (usuarioLocal) {
      try {
        const usuarioParsed = JSON.parse(usuarioLocal);
        setUsuario(usuarioParsed);
        setNome(usuarioParsed.nome || '');
        setEmail(usuarioParsed.email || '');
        setDataNascimento(usuarioParsed.dataNascimento || '');
        if (usuarioParsed.preferencias) {
          setPreferencias(usuarioParsed.preferencias);
        }
      } catch (error) {
        console.error("Erro ao processar dados do usuário:", error);
      }
    }
  }, []);

  const handleCheckboxChange = (field: keyof PreferenciaNotificacoes) => {
    setPreferencias(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Atualizar dados do usuário
    setTimeout(() => {
      if (usuario) {
        const novoUsuario = {
          ...usuario,
          nome,
          email,
          dataNascimento,
          preferencias
        };
        
        localStorage.setItem('raiz_urbana_usuario', JSON.stringify(novoUsuario));
        
        toast({
          title: "Perfil atualizado!",
          description: "Suas informações foram salvas com sucesso.",
        });
      }
      
      setIsLoading(false);
    }, 500);
  };

  if (!usuario) {
    return (
      <div className="text-center py-10">
        <p>Usuário não encontrado</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6 text-raiz-green-dark">Editar Perfil</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalInfoForm
          nome={nome}
          email={email}
          dataNascimento={dataNascimento}
          onNomeChange={setNome}
          onEmailChange={setEmail}
          onDataNascimentoChange={setDataNascimento}
        />
        
        <NotificationPreferences
          preferencias={preferencias}
          onPreferenciaChange={handleCheckboxChange}
        />
        
        <Button
          type="submit"
          className="w-full bg-raiz-green-dark hover:bg-raiz-green-light"
          disabled={isLoading}
        >
          {isLoading ? "Salvando..." : "Salvar alterações"}
        </Button>
      </form>
    </div>
  );
};

export default PerfilUsuario;
