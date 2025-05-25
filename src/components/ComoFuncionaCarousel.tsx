
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Componente para o ícone da árvore
const TreeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" stroke="currentColor" strokeWidth="0.5">
    <path d="M12 2.5a5 5 0 00-5 5c0 2.76 2.24 5 5 5s5-2.24 5-5a5 5 0 00-5-5zm0 8.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
    <path d="M12 12v9.5M8.5 16h7" />
    <path d="M7 20h10" />
  </svg>
);

const ComoFuncionaCarousel = () => {
  const steps = [
    {
      number: 1,
      title: "Solicite",
      description: "Preencha o formulário de solicitação com seus dados e o endereço onde deseja o plantio."
    },
    {
      number: 2,
      title: "Aguarde",
      description: "Nossa equipe técnica fará uma avaliação do local para verificar a viabilidade do plantio."
    },
    {
      number: 3,
      title: "Celebrate",
      description: "Após o plantio, cuide da sua árvore e compartilhe fotos com a gente. Sua cidade agradece!"
    }
  ];

  return (
    <section className="section bg-white">
      <div className="container px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-8 sm:mb-12">Como Funciona</h2>
        
        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {steps.map((step) => (
                <CarouselItem key={step.number} className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-green-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow h-full">
                    <div className="bg-green-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold mx-auto mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/solicitar-plantio" className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2 mx-auto w-fit px-6 py-3 rounded-full font-bold transition-colors">
            <TreeIcon />
            Solicitar plantio gratuito
            <ArrowRight className="h-4 w-4" />
            <span className="bg-white text-green-700 text-xs px-2 py-0.5 rounded-full ml-1">Serviço 100% gratuito — oferecido pela Prefeitura</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComoFuncionaCarousel;
