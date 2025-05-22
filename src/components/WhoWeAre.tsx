
import React from 'react';
import { TreeDeciduous } from 'lucide-react';

const WhoWeAre = () => {
  return (
    <section className="section bg-raiz-green-light/10">
      <div className="container px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-raiz-green-dark mb-8 sm:mb-12">Quem Somos</h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3 flex justify-center">
            <div className="bg-raiz-green-dark/10 p-6 rounded-full">
              <TreeDeciduous size={120} className="text-raiz-green-dark" />
            </div>
          </div>
          <div className="md:w-2/3">
            <p className="text-raiz-gray mb-4">
              A capivara é um símbolo importante da fauna de Recife, especialmente nas áreas próximas aos rios como o Capibaribe, de onde vem o nome do nosso programa "Capiba Verde". 
            </p>
            <p className="text-raiz-gray mb-4">
              Este animal representa a harmonia entre natureza e cidade, coexistindo nos espaços urbanos. Assim como queremos que nossas árvores façam parte da paisagem urbana, as capivaras nos lembram que é possível integrar elementos naturais ao ambiente da cidade.
            </p>
            <p className="text-raiz-gray">
              Nossa missão é tornar Recife uma cidade mais verde, saudável e resiliente às mudanças climáticas através do plantio sistemático de árvores e da educação ambiental.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
