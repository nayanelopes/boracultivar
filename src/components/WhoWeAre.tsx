
import React from 'react';
import { TreeDeciduous } from 'lucide-react';

const WhoWeAre = () => {
  return (
    <section className="section bg-raiz-green-light/10">
      <div className="container px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-raiz-green-dark mb-8 sm:mb-12">Quem somos? 🌱</h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3 flex justify-center">
            <div className="bg-raiz-green-dark/10 p-6 rounded-full">
              <img 
                src="/lovable-uploads/9c9a217d-8d6a-41a6-89d6-14669b99c654.png" 
                alt="Mascote Bora Cultivar" 
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <p className="text-raiz-gray mb-4">
              Somos o Bora Cultivar?, um movimento que acredita no poder transformador das árvores e da participação coletiva. Nosso sonho é cultivar uma cidade mais verde, fresca e viva — começando por onde tudo começa: as calçadas da nossa vizinhança.
            </p>
            <p className="text-raiz-gray mb-4">
              A gente nasceu do desejo de reconectar as pessoas com a natureza no meio urbano. Por isso, criamos um jeito simples, gratuito e colaborativo de plantar árvores nas ruas do Recife, sem burocracia e com muito carinho.
            </p>
            <p className="text-raiz-gray mb-4">
              Mais do que plantar mudas, queremos semear pertencimento, cuidado e futuro. Cada árvore é um convite para respirar melhor, para conviver com mais sombra e beleza, e para lembrar que a cidade é de todos — e pode florescer com a nossa ajuda.
            </p>
            <p className="text-raiz-gray">
              Se você também sente que algo precisa mudar, vem com a gente. Bora cultivar?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
