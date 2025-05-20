
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GamificationSystem from '@/components/GamificationSystem';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';

const Gamificacao = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-raiz-green-light/10 py-10">
        <div className="container">
          <Link to="/" className="flex items-center gap-1 text-raiz-green-dark hover:text-raiz-green-light transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar à página inicial</span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-raiz-green-dark mb-4 flex items-center gap-3">
            <Trophy className="h-8 w-8 text-raiz-earth" />
            Sistema de Recompensas Capiba Verde
          </h1>
          
          <p className="text-raiz-gray mb-8 max-w-3xl">
            Participe do nosso programa de gamificação e ganhe moedas Capiba ao solicitar o plantio de árvores. 
            Troque suas moedas por cupons de desconto e contribua para um Recife mais verde e sustentável.
          </p>
          
          <GamificationSystem />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gamificacao;
