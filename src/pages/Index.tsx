
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';
import WhoWeAre from '@/components/WhoWeAre';
import ComoFuncionaCarousel from '@/components/ComoFuncionaCarousel';
import BeneficiosArvores from '@/components/BeneficiosArvores';
import OndeNaoPlantarArvores from '@/components/OndeNaoPlantarArvores';
import ChatbaseWidget from '@/components/ChatbaseWidget';
import FeedPrincipal from '@/components/FeedPrincipal';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Star, BadgePercent, Leaf } from 'lucide-react';

const Index = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioLocal = localStorage.getItem('raiz_urbana_usuario');
    if (usuarioLocal) {
      try {
        const usuarioParsed = JSON.parse(usuarioLocal);
        if (usuarioParsed.isLogado) {
          setUsuario(usuarioParsed);
        }
      } catch (error) {
        console.error("Erro ao processar dados do usuário:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {usuario ? (
          // Versão para usuário logado - mostra APENAS o feed
          <section className="bg-green-50 py-8">
            <div className="container px-4">
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-green-800 mb-2">
                  Olá, {usuario.nome}! 👋
                </h1>
                <p className="text-gray-600">
                  Bem-vindo de volta ao seu jardim urbano. Veja as novidades da comunidade!
                </p>
              </div>
              <FeedPrincipal />
            </div>
          </section>
        ) : (
          // Versão para visitantes - mostra o hero e demais seções
          <>
            {/* Hero Section - Redesigned */}
            <section className="bg-green-600 relative overflow-hidden">
              <div className="container px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
                <div className="relative z-10 flex-1 space-y-6 text-white max-w-2xl">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                    Uma cidade mais verde começa com você.
                  </h1>
                  <p className="text-xl md:text-2xl">
                     Transforme sua calçada em um espaço de vida. Solicite o plantio gratuito de árvores e ajude a refrescar o Recife.🌳
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/solicitar-plantio" className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-full flex items-center justify-center gap-2 font-bold transition-colors">
                      Quero plantar uma árvore
                      <ArrowRight className="h-4 w-4" />
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full ml-1">Serviço 100% gratuito — oferecido pela Prefeitura</span>
                    </Link>
                    <Link to="/consultar-status" className="bg-green-700 text-white hover:bg-green-800 px-6 py-3 rounded-full flex items-center justify-center gap-2 font-bold transition-colors">
                      Acompanhar Solicitação
                    </Link>
                  </div>
                </div>
                <div className="flex-1 mt-8 md:mt-0 relative">
                  <div className="relative z-10">
                    <img 
                      src="https://movimentoeconomico.com.br/wp-content/uploads/2023/03/Plantio-de-arvores-no-Recife.1-Wagner-Ramos-PCR-Imagem.jpeg" 
                      alt="Árvores na cidade" 
                      className="rounded-2xl shadow-xl max-w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              {/* Decorative leaves */}
              <Leaf className="absolute top-10 right-10 text-green-500 h-20 w-20 opacity-30" />
              <Leaf className="absolute bottom-10 left-10 text-green-500 h-16 w-16 opacity-30" />
              <Leaf className="absolute top-1/2 left-1/4 text-green-500 h-24 w-24 opacity-20" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-500 rounded-full -mt-20 -mr-20 opacity-30"></div>
              <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-green-500 rounded-full -mb-40 opacity-10"></div>
            </section>
        
            {/* Como funciona - sempre visível */}
            <ComoFuncionaCarousel />

            {/* Benefícios Section - Novo componente com animações */}
            <BeneficiosArvores />
            
            {/* Where NOT to plant - Novo componente melhorado */}
            <OndeNaoPlantarArvores />
            
            {/* Who We Are section */}
            <WhoWeAre />
            
            {/* Saiba Mais section with updated content */}
            <InfoSection />
            
            {/* Sistema Capiba Verde */}
            <section className="section bg-green-50">
              <div className="container px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-4 sm:mb-6">Sistema Capiba Verde</h2>
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
                  Participe do nosso programa de recompensas e ganhe moedas Capiba toda vez que contribuir para deixar Recife mais verde!
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8 sm:mb-10">
                  <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                    <Star className="h-12 w-12 text-amber-500 mb-4" fill="currentColor" />
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Moedas Capiba</h3>
                    <p className="text-gray-600 mb-4">
                      Ganhe moedas Capiba para cada ação sustentável realizada. Use-as para resgatar recompensas!
                    </p>
                    <p className="text-xs text-gray-500 italic mt-auto">
                      Cadastre-se e solicite um plantio para ver mais.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                    <Trophy className="h-12 w-12 text-amber-500 mb-4" />
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Desafios Ambientais</h3>
                    <p className="text-gray-600 mb-4">
                      Complete desafios especiais e ganhe bônus de moedas Capiba. Fique atento às missões semanais!
                    </p>
                    <p className="text-xs text-gray-500 italic mt-auto">
                      Cadastre-se e solicite um plantio para ver mais.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center sm:col-span-2 md:col-span-1 sm:max-w-md sm:mx-auto md:max-w-none">
                    <BadgePercent className="h-12 w-12 text-amber-500 mb-4" />
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Cupons de Desconto</h3>
                    <p className="text-gray-600 mb-4">
                      Troque suas moedas por cupons de desconto da Uber, 99Pop e outros parceiros que apoiam nossa causa!
                    </p>
                    <p className="text-xs text-gray-500 italic mt-auto">
                      Cadastre-se e solicite um plantio para ver mais.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Link to="/gamificacao" className="bg-amber-500 text-white hover:bg-amber-600 flex items-center gap-2 mx-auto w-fit px-6 py-3 rounded-full font-bold transition-colors">
                    <Trophy className="h-5 w-5" />
                    Conhecer as Recompensas
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}
       </main>
      <Footer />
      <ChatbaseWidget />
    </div>
  );
};

export default Index;
