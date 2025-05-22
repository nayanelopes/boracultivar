
import React from 'react';
import { AlertTriangle, MapPin, Check } from 'lucide-react';

const InfoSection = () => {
  // Lista de locais não permitidos para plantio
  const restricoes = [
    'Sob redes elétricas de alta tensão',
    'Em frente a garagens ou entradas de veículos',
    'Em calçadas com menos de 1,2m de largura',
    'Próximo a esquinas (distância mínima de 5m)',
    'Em cima de tubulações de água ou esgoto',
    'Em frente a pontos de ônibus',
  ];

  // Lista de benefícios
  const beneficios = [
    'Redução da temperatura em até 8°C',
    'Melhoria da qualidade do ar',
    'Redução de enchentes e alagamentos',
    'Aumento da biodiversidade urbana',
    'Valorização dos imóveis',
    'Melhoria da saúde física e mental dos moradores'
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold text-center text-raiz-green-dark mb-12">Saiba Mais Sobre Arborização</h2>
        
        <div className="mb-10 mx-auto max-w-3xl text-raiz-gray">
          <p className="mb-4">
            A arborização urbana é uma das formas mais eficazes de melhorar a qualidade do ar. As árvores ajudam a filtrar poluentes, aumentar a umidade e reduzir a temperatura, tornando o ambiente mais saudável e equilibrado. A qualidade do ar refere-se à pureza do ar que respiramos, e é avaliada pela quantidade de poluentes presentes na atmosfera, como poeira fina (PM2,5 e PM10), monóxido de carbono, dióxido de nitrogênio e ozônio.
          </p>
          <p className="mb-4">
            Quando esses níveis estão altos, podem causar problemas respiratórios, irritações e agravar doenças crônicas. Infelizmente, mais de 90% da população mundial vive em locais com má qualidade do ar. No Brasil, incêndios florestais e poluição urbana têm contribuído para esse problema. Em setembro de 2024, São Paulo tinha um dos piores níveis de qualidade do ar do mundo.
          </p>
          <p className="mb-4">
            Portanto, plantar árvores é uma ação simples, mas poderosa, para cuidar da saúde das pessoas e do planeta.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Áreas restritas para plantio - com destaque visual de alerta */}
          <div className="bg-red-100 p-6 rounded-lg border border-red-300">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-red-500 h-8 w-8" />
              <h3 className="text-xl font-semibold text-raiz-gray">⚠️ Atenção: Onde NÃO plantar árvores</h3>
            </div>
            <ul className="space-y-3">
              {restricoes.map((restricao, index) => (
                <li key={index} className="flex items-start gap-2">
                  <MapPin className="text-red-500 h-6 w-6 mt-0.5 flex-shrink-0" />
                  <span className="text-base">{restricao}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Benefícios */}
          <div className="bg-green-100 p-6 rounded-lg border border-green-300">
            <div className="flex items-center gap-2 mb-4">
              <Check className="text-green-600 h-8 w-8" />
              <h3 className="text-xl font-semibold text-raiz-gray">Benefícios das Árvores</h3>
            </div>
            <ul className="space-y-3">
              {beneficios.map((beneficio, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="text-green-600 h-6 w-6 mt-0.5 flex-shrink-0" />
                  <span className="text-base">{beneficio}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            <img 
              src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
              alt="Calçada com árvores em Recife" 
              className="w-full h-64 object-cover rounded-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86" 
              alt="Árvores em calçada de Recife" 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
