
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeachableMachine from '@/components/TeachableMachine';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeachableMachinePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-raiz-green-light/10 py-10 flex-grow">
        <div className="container">
          <Link to="/" className="flex items-center gap-1 text-raiz-green-dark hover:text-raiz-green-light transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar à página inicial</span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-raiz-green-dark mb-4">Verificar Local para Plantio</h1>
          
          <p className="text-raiz-gray mb-8 max-w-3xl">
            Use a câmera para verificar se o local é adequado para o plantio de árvores.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm max-w-xl">
            <TeachableMachine />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeachableMachinePage;
