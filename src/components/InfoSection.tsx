
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';

const InfoSection = () => {
  return (
    <section className="section bg-green-50">
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-6">
              <Info className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl sm:text-3xl font-bold text-green-800">Saiba mais sobre arborização urbana</h2>
            </div>
            
            <div className="prose prose-green max-w-none">
              <p className="text-gray-700 mb-4">
                A arborização urbana é uma das formas mais eficazes de melhorar a qualidade do ar. 
                As árvores ajudam a filtrar poluentes, aumentar a umidade e reduzir a temperatura, 
                tornando o ambiente mais saudável e equilibrado.
              </p>
              
              <p className="text-gray-700 mb-4">
                A qualidade do ar refere-se à pureza do ar que respiramos, e é avaliada pela quantidade 
                de poluentes presentes na atmosfera, como poeira fina (PM2,5 e PM10), monóxido de carbono, 
                dióxido de nitrogênio e ozônio. Quando esses níveis estão altos, podem causar problemas 
                respiratórios, irritações e agravar doenças crônicas.
              </p>
              
              <p className="text-gray-700 mb-4">
                Infelizmente, mais de 90% da população mundial vive em locais com má qualidade do ar. 
                No Brasil, incêndios florestais e poluição urbana têm contribuído para esse problema. 
                Em setembro de 2024, São Paulo tinha um dos piores níveis de qualidade do ar do mundo.
              </p>
              
              <p className="text-gray-700 font-medium">
                Portanto, plantar árvores é uma ação simples mas poderosa para cuidar da saúde das pessoas e do planeta.
              </p>
            </div>
            
            <div className="mt-6">
              <Link to="/quem-somos" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
                Saiba mais sobre nossa iniciativa
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
              alt="Árvores urbanas" 
              className="rounded-xl shadow-md max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
