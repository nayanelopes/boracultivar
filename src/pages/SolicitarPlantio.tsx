
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RequestForm from '@/components/RequestForm';
import { ArrowLeft, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolicitarPlantio = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-raiz-green-light/10 py-10">
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
          
          <RequestForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SolicitarPlantio;
