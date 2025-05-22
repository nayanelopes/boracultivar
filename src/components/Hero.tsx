
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-green-600 to-green-700 relative overflow-hidden">
      <div className="container px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="relative z-10 flex-1 space-y-6 text-white max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Let's save Recife with trees
          </h1>
          <p className="text-xl md:text-2xl font-light">
            🌳 Transforme sua calçada em um espaço de vida. Solicite o plantio gratuito de árvores e ajude a refrescar o Recife.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/solicitar-plantio" className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-full flex items-center justify-center gap-2 font-bold transition-colors">
              Quero plantar uma árvore
              <ArrowRight className="h-4 w-4" />
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full ml-1">100% gratuito</span>
            </Link>
            <Link to="/consultar-status" className="bg-green-700 text-white hover:bg-green-800 px-6 py-3 rounded-full flex items-center justify-center gap-2 font-bold transition-colors">
              Acompanhar Solicitação
            </Link>
          </div>
        </div>
        <div className="flex-1 mt-8 md:mt-0 relative">
          <div className="relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86" 
              alt="Árvores na cidade" 
              className="rounded-2xl shadow-xl max-w-full h-auto"
            />
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <Leaf className="absolute top-10 right-10 text-green-500 h-20 w-20 opacity-30" />
      <Leaf className="absolute bottom-10 left-10 text-green-500 h-16 w-16 opacity-30" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-green-500 rounded-full -mt-20 -mr-20 opacity-30"></div>
      <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-green-500 rounded-full -mb-40 opacity-10"></div>
    </section>
  );
};

export default Hero;
