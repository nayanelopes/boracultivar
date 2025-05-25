import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Mail, Lock } from 'lucide-react';
import SuccessMessage from '@/components/SuccessMessage';

const CadastroForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [preferenciaNotificacoes, setPreferenciaNotificacoes] = useState({
    atualizacoesPlantio: true,
    reclamacoesArvores: false,
    alertasCapiba: true
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckboxChange = (field: keyof typeof preferenciaNotificacoes) => {
    setPreferenciaNotificacoes(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (senha !== confirmarSenha) {
      toast({
        variant: "destructive",
        title: "Senhas não coincidem",
        description: "Por favor, verifique se as senhas digitadas são iguais.",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulação de cadastro
    setTimeout(() => {
      // Aqui seria a integração com um backend real
      localStorage.setItem('raiz_urbana_usuario', JSON.stringify({
        nome,
        email,
        isLogado: true,
        preferencias: preferenciaNotificacoes
      }));
      
      setIsLoading(false);
      setShowSuccessMessage(true);
    }, 1000);
  };

  const handleSuccessClose = () => {
    setShowSuccessMessage(false);
    navigate('/solicitar-plantio?newUser=true');
  };

  return (
    <>
      <SuccessMessage 
        show={showSuccessMessage} 
        onClose={handleSuccessClose} 
      />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome completo</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="nome"
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email-cadastro">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email-cadastro"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="senha-cadastro">Senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="senha-cadastro"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="pl-10"
              minLength={6}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmar-senha">Confirmar senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmar-senha"
              type="password"
              placeholder="••••••••"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="pl-10"
              minLength={6}
              required
            />
          </div>
        </div>
        
        <div className="space-y-3 pt-2">
          <Label>Preferências de notificações</Label>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="atualizacoes-plantio" 
              checked={preferenciaNotificacoes.atualizacoesPlantio}
              onCheckedChange={() => handleCheckboxChange('atualizacoesPlantio')}
            />
            <Label htmlFor="atualizacoes-plantio" className="text-sm cursor-pointer">
              Receber atualizações do plantio
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="reclamacoes-arvores" 
              checked={preferenciaNotificacoes.reclamacoesArvores}
              onCheckedChange={() => handleCheckboxChange('reclamacoesArvores')}
            />
            <Label htmlFor="reclamacoes-arvores" className="text-sm cursor-pointer">
              Receber atualizações de reclamações de árvores
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="alertas-capiba" 
              checked={preferenciaNotificacoes.alertasCapiba}
              onCheckedChange={() => handleCheckboxChange('alertasCapiba')}
            />
            <Label htmlFor="alertas-capiba" className="text-sm cursor-pointer">
              Notificações de cupons e outros prêmios (moeda Capiba)
            </Label>
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-raiz-green-dark hover:bg-raiz-green-light mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
    </>
  );
};

export default CadastroForm;
