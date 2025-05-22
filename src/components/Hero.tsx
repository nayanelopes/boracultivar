
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TreeDeciduous } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-raiz-green-light/10 to-raiz-background">
      <div className="container px-4 flex flex-col items-center py-10 md:py-16 lg:py-24 gap-8">
        <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-raiz-green-dark leading-tight">
            Mais árvores, mais vida
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-raiz-earth">
            Um Recife mais verde começa com você
          </p>
          <p className="text-base md:text-lg text-raiz-gray max-w-2xl">
            🌳 Transforme sua calçada em um espaço de vida. Solicite o plantio gratuito de árvores e ajude a refrescar o Recife.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/solicitar-plantio" className="btn-primary flex items-center justify-center gap-2 px-4 py-2.5 text-sm sm:text-base">
              Quero plantar uma árvore
              <ArrowRight className="h-4 w-4" />
              <span className="bg-white text-raiz-green-dark text-xs px-2 py-0.5 rounded-full ml-1">100% gratuito</span>
            </Link>
            <Link to="/consultar-status" className="btn-secondary flex items-center justify-center gap-2 px-4 py-2.5 text-sm sm:text-base">
              Acompanhar Solicitação
            </Link>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center items-center mt-4 md:mt-0">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-raiz-green-light rounded-full flex justify-center items-center">
            <TreeDeciduous size={160} className="text-white" />
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-raiz-earth text-white rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-xs sm:text-sm font-medium p-2 text-center">
              Mais vida para a cidade
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
