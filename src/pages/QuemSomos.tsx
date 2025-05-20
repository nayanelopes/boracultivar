
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const QuemSomos = () => {
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
            <CapibaraIcon className="h-8 w-8 text-raiz-earth" />
            Quem Somos
          </h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mt-6">
            <h2 className="text-2xl font-semibold text-raiz-green-dark mb-4">Nossa Missão</h2>
            <p className="text-raiz-gray mb-6">
              Esta página será atualizada em breve com informações completas sobre nosso projeto e missão. Estamos trabalhando para trazer mais detalhes sobre nossa iniciativa de tornar Recife uma cidade mais verde e sustentável.
            </p>
            
            <h2 className="text-2xl font-semibold text-raiz-green-dark mb-4">Por que a Capivara?</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-raiz-green-light/20 p-6 rounded-full">
                  <CapibaraIcon className="h-32 w-32 text-raiz-green-dark" />
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-raiz-gray mb-4">
                  A capivara é um símbolo importante da fauna de Recife, especialmente nas áreas próximas aos rios como o Capibaribe, de onde vem o nome do nosso programa "Capiba Verde". 
                </p>
                <p className="text-raiz-gray mb-4">
                  Este animal representa a harmonia entre natureza e cidade, coexistindo nos espaços urbanos. Assim como queremos que nossas árvores façam parte da paisagem urbana, as capivaras nos lembram que é possível integrar elementos naturais ao ambiente da cidade.
                </p>
              </div>
            </div>
            
            <div className="bg-raiz-green-light/10 p-6 rounded-lg">
              <h3 className="font-semibold text-raiz-green-dark mb-2">Contribua com o Raiz Urbana</h3>
              <p className="text-raiz-gray mb-4">
                Você pode ajudar a transformar Recife em uma cidade mais verde solicitando o plantio de árvores, compartilhando nosso projeto e participando do programa de recompensas Capiba Verde.
              </p>
              <div className="flex justify-center">
                <Link to="/solicitar-plantio" className="btn-primary">
                  Solicitar Plantio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Componente para o ícone da capivara
const CapibaraIcon = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M85,50 C85,25 70,15 50,15 C30,15 15,25 15,50 C15,75 30,85 50,85 C70,85 85,75 85,50 Z" />
    <circle cx="30" cy="40" r="4" />
    <circle cx="70" cy="40" r="4" />
    <path d="M40,55 C43,60 50,65 60,55" fill="none" stroke="currentColor" strokeWidth="2" />
    <ellipse cx="50" cy="65" rx="10" ry="5" />
    <path d="M25,25 C20,20 15,25 15,30" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M75,25 C80,20 85,25 85,30" fill="none" stroke="currentColor" strokeWidth="2" />
    <ellipse cx="22" cy="60" rx="10" ry="6" transform="rotate(-20 22 60)" />
    <ellipse cx="78" cy="60" rx="10" ry="6" transform="rotate(20 78 60)" />
  </svg>
);

export default QuemSomos;
