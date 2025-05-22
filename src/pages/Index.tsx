
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';
import WhoWeAre from '@/components/WhoWeAre';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Star, BadgePercent } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Benefícios Section - Moved up as requested */}
        <section className="section bg-green-100">
          <div className="container px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-raiz-green-dark mb-8">Benefícios das Árvores</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-raiz-green-light/20 p-4 rounded-full mb-4">
                  <Check className="h-10 w-10 text-raiz-green-dark" />
                </div>
                <h3 className="text-lg font-semibold text-raiz-green-dark mb-2">Redução da Temperatura</h3>
                <p className="text-raiz-gray">Árvores podem reduzir a temperatura local em até 8°C, criando um microclima mais agradável.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-raiz-green-light/20 p-4 rounded-full mb-4">
                  <Check className="h-10 w-10 text-raiz-green-dark" />
                </div>
                <h3 className="text-lg font-semibold text-raiz-green-dark mb-2">Ar mais Limpo</h3>
                <p className="text-raiz-gray">Uma única árvore adulta pode absorver até 22kg de CO₂ por ano e filtrar poluentes do ar.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none">
                <div className="bg-raiz-green-light/20 p-4 rounded-full mb-4">
                  <Check className="h-10 w-10 text-raiz-green-dark" />
                </div>
                <h3 className="text-lg font-semibold text-raiz-green-dark mb-2">Bem-estar</h3>
                <p className="text-raiz-gray">Áreas verdes reduzem o estresse, melhoram a saúde mental e incentivam atividades ao ar livre.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Como funciona */}
        <section className="section bg-white">
          <div className="container px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-raiz-green-dark mb-8 sm:mb-12">Como Funciona</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-raiz-green-dark/5 p-4 sm:p-6 rounded-lg text-center">
                <div className="bg-raiz-green-dark rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white font-bold mx-auto mb-3 sm:mb-4">
                  1
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-raiz-green-dark mb-2 sm:mb-3">Solicite</h3>
                <p className="text-sm sm:text-base text-raiz-gray mb-3 sm:mb-4">
                  Preencha o formulário de solicitação com seus dados e o endereço onde deseja o plantio.
                </p>
              </div>
              
              <div className="bg-raiz-green-dark/5 p-4 sm:p-6 rounded-lg text-center">
                <div className="bg-raiz-green-dark rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white font-bold mx-auto mb-3 sm:mb-4">
                  2
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-raiz-green-dark mb-2 sm:mb-3">Aguarde</h3>
                <p className="text-sm sm:text-base text-raiz-gray mb-3 sm:mb-4">
                  Nossa equipe técnica fará uma avaliação do local para verificar a viabilidade do plantio.
                </p>
              </div>
              
              <div className="bg-raiz-green-dark/5 p-4 sm:p-6 rounded-lg text-center sm:col-span-2 md:col-span-1 sm:max-w-md sm:mx-auto md:max-w-none">
                <div className="bg-raiz-green-dark rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white font-bold mx-auto mb-3 sm:mb-4">
                  3
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-raiz-green-dark mb-2 sm:mb-3">Celebrate</h3>
                <p className="text-sm sm:text-base text-raiz-gray mb-3 sm:mb-4">
                  Após o plantio, cuide da sua árvore e compartilhe fotos com a gente. Sua cidade agradece!
                </p>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-10 text-center">
              <Link to="/solicitar-plantio" className="btn-primary flex items-center gap-2 mx-auto w-fit text-sm sm:text-base px-4 py-2">
                <TreeIcon />
                Solicitar plantio gratuito
                <ArrowRight className="h-4 w-4" />
                <span className="bg-white text-raiz-green-dark text-xs px-2 py-0.5 rounded-full ml-1">Serviço 100% gratuito — oferecido pela Prefeitura</span>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Who We Are section */}
        <WhoWeAre />
        
        {/* Saiba Mais section with updated content */}
        <InfoSection />
        
        {/* Sistema de Gamificação */}
        <section className="section bg-raiz-green-light/10">
          <div className="container px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-raiz-green-dark mb-4 sm:mb-6">Sistema Capiba Verde</h2>
            <p className="text-center text-sm sm:text-base text-raiz-gray max-w-2xl mx-auto mb-8 sm:mb-10">
              Participe do nosso programa de recompensas e ganhe moedas Capiba toda vez que contribuir para deixar Recife mais verde!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8 sm:mb-10">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <Star className="h-8 w-8 sm:h-12 sm:w-12 text-raiz-earth mb-3 sm:mb-4" fill="currentColor" />
                <h3 className="text-lg sm:text-xl font-semibold text-raiz-green-dark mb-2">Moedas Capiba</h3>
                <p className="text-sm sm:text-base text-raiz-gray mb-3 sm:mb-4">
                  Ganhe moedas Capiba para cada ação sustentável realizada. Use-as para resgatar recompensas!
                </p>
                <p className="text-xs text-raiz-gray italic mt-auto">
                  Cadastre-se e solicite um plantio para ver mais.
                </p>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <Trophy className="h-8 w-8 sm:h-12 sm:w-12 text-raiz-earth mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-raiz-green-dark mb-2">Desafios Ambientais</h3>
                <p className="text-sm sm:text-base text-raiz-gray mb-3 sm:mb-4">
                  Complete desafios especiais e ganhe bônus de moedas Capiba. Fique atento às missões semanais!
                </p>
                <p className="text-xs text-raiz-gray italic mt-auto">
                  Cadastre-se e solicite um plantio para ver mais.
                </p>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm flex flex-col items-center text-center sm:col-span-2 md:col-span-1 sm:max-w-md sm:mx-auto md:max-w-none">
                <BadgePercent className="h-8 w-8 sm:h-12 sm:w-12 text-raiz-earth mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-raiz-green-dark mb-2">Cupons de Desconto</h3>
                <p className="text-sm sm:text-base text-raiz-gray mb-3 sm:mb-4">
                  Troque suas moedas por cupons de desconto da Uber, 99Pop e outros parceiros que apoiam nossa causa!
                </p>
                <p className="text-xs text-raiz-gray italic mt-auto">
                  Cadastre-se e solicite um plantio para ver mais.
                </p>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8 text-center">
              <Link to="/gamificacao" className="btn-secondary flex items-center gap-2 mx-auto w-fit text-sm sm:text-base px-4 py-2">
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
                Conhecer as Recompensas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Componente para o ícone da árvore
const TreeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V12" />
    <path d="M9 10V7c0-1.1.9-2 2-2h2a2 2 0 012 2v3" />
    <path d="M5 16c0-2.8 2.2-5 5-5h4c2.8 0 5 2.2 5 5v6H5z" />
  </svg>
);

export default Index;
