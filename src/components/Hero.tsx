
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-white relative overflow-hidden">
      <div className="container px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        {/* Left content - Text and CTA */}
        <div className="relative z-10 flex-1 space-y-6 text-green-800 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-green-600 p-2 rounded-full">
              <Leaf className="h-6 w-6 text-white" fill="currentColor" strokeWidth={1} />
            </div>
            <span className="font-bold text-xl text-green-700">Bora cultivar?</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-green-800">
            Uma cidade mais verde começa com você
          </h1>
          
          <p className="text-xl md:text-2xl font-light text-gray-700">
            Transforme sua calçada em um espaço de vida. Solicite o plantio gratuito de árvores e ajude a refrescar o Recife.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/solicitar-plantio" 
              className="bg-green-600 text-white hover:bg-green-700 px-8 py-4 rounded-full flex items-center justify-center gap-2 font-bold transition-colors text-lg"
            >
              Quero plantar
            </Link>
            <Link 
              to="/consultar-status" 
              className="bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 px-6 py-3 rounded-full flex items-center justify-center gap-2 font-bold transition-colors"
            >
              Acompanhar Solicitação
            </Link>
          </div>
          
          {/* Social media icons */}
          <div className="flex gap-4 pt-6">
            <a href="#" className="bg-green-100 p-2 rounded-full hover:bg-green-200 transition-colors">
              <Facebook className="h-5 w-5 text-green-700" />
            </a>
            <a href="#" className="bg-green-100 p-2 rounded-full hover:bg-green-200 transition-colors">
              <Twitter className="h-5 w-5 text-green-700" />
            </a>
            <a href="#" className="bg-green-100 p-2 rounded-full hover:bg-green-200 transition-colors">
              <Instagram className="h-5 w-5 text-green-700" />
            </a>
            <a href="#" className="bg-green-100 p-2 rounded-full hover:bg-green-200 transition-colors">
              <MessageCircle className="h-5 w-5 text-green-700" />
            </a>
          </div>
        </div>
        
        {/* Right content - Image */}
        <div className="flex-1 mt-8 md:mt-0 relative">
          <div className="relative z-10 bg-green-500 rounded-3xl overflow-hidden">
            <img 
              src="/lovable-uploads/2c4eb92c-2862-451e-acd9-5f44c3a13972.png" 
              alt="Trabalhadores plantando árvores em Recife" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Decorative leaves */}
      <div className="absolute top-10 right-1/4 opacity-20">
        <Leaf className="h-24 w-24 text-green-500" fill="currentColor" />
      </div>
      <div className="absolute bottom-20 left-1/3 opacity-10">
        <Leaf className="h-32 w-32 text-green-600" fill="currentColor" />
      </div>
      <div className="absolute top-1/2 right-10 opacity-30">
        <Leaf className="h-16 w-16 text-green-400" fill="currentColor" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-20">
        <Leaf className="h-20 w-20 text-green-500" fill="currentColor" />
      </div>
      
      {/* Green blob shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full -mt-20 -mr-20 opacity-10"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-green-400 rounded-full -mb-40 opacity-5"></div>
    </section>
  );
};

export default Hero;
