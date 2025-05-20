
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
            Solicite o plantio de árvores na sua calçada e ajude a construir uma cidade mais fresca, saudável e bonita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/solicitar-plantio" className="btn-primary flex items-center justify-center gap-2 px-4 py-2.5 text-sm sm:text-base">
              Solicitar Plantio
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/consultar-status" className="btn-secondary flex items-center justify-center gap-2 px-4 py-2.5 text-sm sm:text-base">
              Acompanhar Solicitação
            </Link>
          </div>
        </div>
        
        {/* Mobile-first capybara illustration */}
        <div className="flex-1 flex justify-center items-center mt-4 md:mt-0">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-raiz-green-light rounded-full flex justify-center items-center">
            <svg viewBox="0 0 100 100" width="60%" height="60%" fill="white">
              <path d="M85,50 C85,25 70,15 50,15 C30,15 15,25 15,50 C15,75 30,85 50,85 C70,85 85,75 85,50 Z" />
              <circle cx="30" cy="40" r="4" />
              <circle cx="70" cy="40" r="4" />
              <path d="M40,55 C43,60 50,65 60,55" fill="none" stroke="black" strokeWidth="2" />
              <ellipse cx="50" cy="65" rx="10" ry="5" />
              <path d="M25,25 C20,20 15,25 15,30" fill="none" stroke="black" strokeWidth="2" />
              <path d="M75,25 C80,20 85,25 85,30" fill="none" stroke="black" strokeWidth="2" />
              <ellipse cx="22" cy="60" rx="10" ry="6" transform="rotate(-20 22 60)" />
              <ellipse cx="78" cy="60" rx="10" ry="6" transform="rotate(20 78 60)" />
            </svg>
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
