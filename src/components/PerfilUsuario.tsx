
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Bell, Calendar } from 'lucide-react';

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
        <div className="space-y-2">
          <Label htmlFor="perfil-nome">Nome completo</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="perfil-nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="perfil-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="perfil-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="perfil-data-nascimento">Data de nascimento</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="perfil-data-nascimento"
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-raiz-green-dark" />
            <Label className="font-medium">Preferências de notificações</Label>
          </div>
          
          <div className="ml-7 space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="pref-atualizacoes-plantio" 
                checked={preferencias.atualizacoesPlantio}
                onCheckedChange={() => handleCheckboxChange('atualizacoesPlantio')}
              />
              <Label htmlFor="pref-atualizacoes-plantio" className="text-sm cursor-pointer">
                Receber atualizações do plantio
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="pref-reclamacoes-arvores" 
                checked={preferencias.reclamacoesArvores}
                onCheckedChange={() => handleCheckboxChange('reclamacoesArvores')}
              />
              <Label htmlFor="pref-reclamacoes-arvores" className="text-sm cursor-pointer">
                Receber atualizações de reclamações de árvores
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="pref-alertas-capiba" 
                checked={preferencias.alertasCapiba}
                onCheckedChange={() => handleCheckboxChange('alertasCapiba')}
              />
              <Label htmlFor="pref-alertas-capiba" className="text-sm cursor-pointer">
                Notificações de cupons e outros prêmios (moeda Capiba)
              </Label>
            </div>
          </div>
        </div>
        
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
