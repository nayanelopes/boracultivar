
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RequestForm from '@/components/RequestForm';
import { ArrowLeft, Camera, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SolicitarPlantio = () => {
  const [isLogado, setIsLogado] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Verificar se o usuário está logado
    const usuarioLocal = localStorage.getItem('raiz_urbana_usuario');
    if (usuarioLocal) {
      try {
        const usuario = JSON.parse(usuarioLocal);
        setIsLogado(usuario.isLogado);
      } catch (error) {
        console.error("Erro ao processar dados do usuário:", error);
      }
    }
  }, []);
  
  const handleRedirectToLogin = () => {
    toast({
      title: "Login necessário",
      description: "Você precisa fazer login para solicitar um plantio.",
    });
    navigate('/autenticacao');
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
          
          <h1 className="text-3xl md:text-4xl font-bold text-raiz-green-dark mb-4">Solicitar Plantio de Árvore</h1>
          
          <p className="text-raiz-gray mb-3 max-w-3xl">
            Preencha o formulário abaixo para solicitar o plantio de uma árvore. Nossa equipe técnica
            analisará o pedido e entrará em contato para agendar uma visita ao local.
          </p>
          
          <div className="bg-white rounded-lg p-4 mb-8 flex items-center gap-3 border-l-4 border-raiz-green shadow-sm max-w-3xl">
            <Camera className="h-6 w-6 text-raiz-green flex-shrink-0" />
            <p className="text-sm text-raiz-gray">
              <strong>Novidade:</strong> Agora você pode enviar uma foto do local diretamente pelo seu celular! 
              Isso nos ajuda a avaliar melhor o espaço e agilizar sua solicitação.
            </p>
          </div>
          
          {isLogado ? (
            <RequestForm />
          ) : (
            <div className="bg-white rounded-lg p-6 shadow-sm max-w-3xl">
              <div className="text-center py-8">
                <h2 className="text-xl font-semibold text-raiz-green-dark mb-2">
                  Faça login para solicitar um plantio
                </h2>
                <p className="text-raiz-gray mb-6">
                  É necessário ter uma conta para acompanhar o status do seu pedido e receber notificações sobre o plantio.
                </p>
                <Button
                  onClick={handleRedirectToLogin}
                  className="bg-raiz-green-dark hover:bg-raiz-green-light flex items-center gap-2 mx-auto"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Entrar ou Cadastrar</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SolicitarPlantio;
