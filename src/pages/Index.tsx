
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InfoSection from '@/components/InfoSection';
import StatusCheck from '@/components/StatusCheck';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Trees, ArrowRight, Trophy, Star, BadgePercent } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <InfoSection />
        
        {/* Como funciona */}
        <section className="section bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center text-raiz-green-dark mb-12">Como Funciona</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-raiz-green-dark/5 p-6 rounded-lg text-center">
                <div className="bg-raiz-green-dark rounded-full w-12 h-12 flex items-center justify-center text-white font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-raiz-green-dark mb-3">Solicite</h3>
                <p className="text-raiz-gray mb-4">
                  Preencha o formulário de solicitação com seus dados e o endereço onde deseja o plantio.
                </p>
              </div>
              
              <div className="bg-raiz-green-dark/5 p-6 rounded-lg text-center">
                <div className="bg-raiz-green-dark rounded-full w-12 h-12 flex items-center justify-center text-white font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-raiz-green-dark mb-3">Aguarde</h3>
                <p className="text-raiz-gray mb-4">
                  Nossa equipe técnica fará uma avaliação do local para verificar a viabilidade do plantio.
                </p>
              </div>
              
              <div className="bg-raiz-green-dark/5 p-6 rounded-lg text-center">
                <div className="bg-raiz-green-dark rounded-full w-12 h-12 flex items-center justify-center text-white font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-raiz-green-dark mb-3">Celebrate</h3>
                <p className="text-raiz-gray mb-4">
                  Após o plantio, cuide da sua árvore e compartilhe fotos com a gente. Sua cidade agradece!
                </p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/solicitar-plantio" className="btn-primary flex items-center gap-2 mx-auto w-fit">
                <Trees className="h-5 w-5" />
                Solicitar Agora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Sistema de Gamificação */}
        <section className="section bg-raiz-green-light/10">
          <div className="container">
            <h2 className="text-3xl font-bold text-center text-raiz-green-dark mb-6">Sistema Capiba Verde</h2>
            <p className="text-center text-raiz-gray max-w-2xl mx-auto mb-10">
              Participe do nosso programa de recompensas e ganhe moedas Capiba toda vez que contribuir para deixar Recife mais verde!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <Trophy className="h-12 w-12 text-raiz-earth mb-4" />
                <h3 className="text-xl font-semibold text-raiz-green-dark mb-2">Ranking de Solicitações</h3>
                <p className="text-raiz-gray mb-4">
                  Suba no ranking à medida que solicita mais árvores. Os melhores ganhadores recebem prêmios exclusivos!
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <Star className="h-12 w-12 text-raiz-earth mb-4" fill="currentColor" />
                <h3 className="text-xl font-semibold text-raiz-green-dark mb-2">Moedas Capiba</h3>
                <p className="text-raiz-gray mb-4">
                  Ganhe moedas Capiba para cada ação sustentável realizada. Use-as para resgatar recompensas!
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <BadgePercent className="h-12 w-12 text-raiz-earth mb-4" />
                <h3 className="text-xl font-semibold text-raiz-green-dark mb-2">Cupons de Desconto</h3>
                <p className="text-raiz-gray mb-4">
                  Troque suas moedas por cupons de desconto da Uber, 99Pop e outros parceiros que apoiam nossa causa!
                </p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/gamificacao" className="btn-secondary flex items-center gap-2 mx-auto w-fit">
                <Trophy className="h-5 w-5" />
                Conhecer o Sistema de Recompensas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        <StatusCheck />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
