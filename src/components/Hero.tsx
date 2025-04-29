
import React from 'react';
import { Link } from 'react-router-dom';
import { TreePalm, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-raiz-green-light/10 to-raiz-background">
      <div className="container flex flex-col md:flex-row items-center py-16 md:py-24 gap-8">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-raiz-green-dark leading-tight">
            Transforme sua rua com mais sombra e vida
          </h1>
          <p className="text-lg md:text-xl text-raiz-gray max-w-2xl">
            Solicite o plantio de árvores na sua calçada e ajude a construir uma cidade mais fresca, saudável e bonita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/solicitar-plantio" className="btn-primary flex items-center justify-center gap-2">
              Solicitar Plantio
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/consultar-status" className="btn-secondary flex items-center justify-center gap-2">
              Acompanhar Solicitação
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 bg-raiz-green-light rounded-full flex justify-center items-center">
            <TreePalm className="text-white w-32 h-32 md:w-40 md:h-40" />
            <div className="absolute -top-4 -right-4 bg-raiz-earth text-white rounded-full w-20 h-20 flex items-center justify-center text-sm font-medium p-2 text-center">
              Mais vida para a cidade
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
