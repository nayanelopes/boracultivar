
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from '@/components/LoginForm';
import CadastroForm from '@/components/CadastroForm';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Autenticacao = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-raiz-green-light/10 py-10 flex-grow">
        <div className="container">
          <Link to="/" className="flex items-center gap-1 text-raiz-green-dark hover:text-raiz-green-light transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar à página inicial</span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-raiz-green-dark mb-4">Acesse sua conta</h1>
          
          <p className="text-raiz-gray mb-8 max-w-3xl">
            Faça login ou cadastre-se para solicitar plantios, acompanhar suas solicitações e receber
            notificações sobre atualizações e recompensas.
          </p>
          
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="cadastro">
                <CadastroForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Autenticacao;
