import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';
import WhoWeAre from '@/components/WhoWeAre';
import ComoFuncionaCarousel from '@/components/ComoFuncionaCarousel';
import ChatbaseWidget from '@/components/ChatbaseWidget'; // <-- Adicione esta linha
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Star, BadgePercent, Check, Leaf } from 'lucide-react';

// Componente para o ícone da árvore
const TreeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" stroke="currentColor" strokeWidth="0.5">
    <path d="M12 2.5a5 5 0 00-5 5c0 2.76 2.24 5 5 5s5-2.24 5-5a5 5 0 00-5-5zm0 8.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
    <path d="M12 12v9.5M8.5 16h7" />
    <path d="M7 20h10" />
  </svg>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
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
        
        {/* Como funciona - Agora usando carousel */}
        <ComoFuncionaCarousel />

        {/* Benefícios Section */}
        <section className="section bg-green-100">
          <div className="container px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-8">Benefícios das Árvores</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Check className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Redução da Temperatura</h3>
                <p className="text-gray-600">Árvores podem reduzir a temperatura local em até 8°C, criando um microclima mais agradável.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Check className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Ar mais Limpo</h3>
                <p className="text-gray-600">Uma única árvore adulta pode absorver até 22kg de CO₂ por ano e filtrar poluentes do ar.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Check className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Bem-estar</h3>
                <p className="text-gray-600">Áreas verdes reduzem o estresse, melhoram a saúde mental e incentivam atividades ao ar livre.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Where NOT to plant - New warning section */}
        <section className="section bg-amber-100">
          <div className="container px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-amber-800 mb-8">⚠️ Atenção: Onde NÃO plantar árvores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-amber-700 mb-4">Locais Inadequados:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="bg-amber-200 rounded-full p-1 mt-1">⚠️</span>
                    <span>Sob fiação elétrica ou próximo a postes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-amber-200 rounded-full p-1 mt-1">⚠️</span>
                    <span>Próximo a esquinas (mínimo de 5m de distância)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-amber-200 rounded-full p-1 mt-1">⚠️</span>
                    <span>Calçadas muito estreitas (menos de 1,5m)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-amber-200 rounded-full p-1 mt-1">⚠️</span>
                    <span>Sobre tubulações de água, gás ou esgoto</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden shadow">
                <img 
                  src="https://s2-g1.glbimg.com/2wn6q-nGeU-1-cEgzZ81ybdWgCA=/0x0:1280x720/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/U/g/FfZCtKQIOkIYVUsj46xA/whatsapp-image-2019-01-28-at-10.51.22.jpeg" 
                  alt="Calçada arborizada em Recife" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
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
       </main>
      <Footer />
      <ChatbaseWidget />
    </div>
  );
};

export default Index;
