
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Lock } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação de login
    setTimeout(() => {
      // Aqui seria a integração com um backend real
      if (email && senha) {
        localStorage.setItem('raiz_urbana_usuario', JSON.stringify({
          email,
          nome: email.split('@')[0],
          isLogado: true
        }));
        
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta ao Raiz Urbana.",
        });
        
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "Erro no login",
          description: "Por favor, verifique seu email e senha.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
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
        <div className="flex items-center justify-between">
          <Label htmlFor="senha">Senha</Label>
          <a href="#" className="text-xs text-raiz-green-dark hover:underline">
            Esqueceu a senha?
          </a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="senha"
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="lembrar" 
          checked={lembrar}
          onCheckedChange={(checked) => setLembrar(checked === true)}
        />
        <Label htmlFor="lembrar" className="text-sm cursor-pointer">
          Lembrar de mim
        </Label>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-raiz-green-dark hover:bg-raiz-green-light"
        disabled={isLoading}
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
};

export default LoginForm;
