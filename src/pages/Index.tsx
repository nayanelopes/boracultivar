
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InfoSection from '@/components/InfoSection';
import StatusCheck from '@/components/StatusCheck';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Trees, ArrowRight } from 'lucide-react';

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
        
        <StatusCheck />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
