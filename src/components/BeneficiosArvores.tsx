
import React from 'react';
import { Thermometer, Wind, Heart } from 'lucide-react';

const BeneficiosArvores = () => {
  const beneficios = [
    {
      icon: Thermometer,
      title: "Redução da Temperatura",
      description: "Árvores podem reduzir a temperatura local em até 8°C, criando um microclima mais agradável.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      hoverBg: "hover:bg-blue-200"
    },
    {
      icon: Wind,
      title: "Ar mais Limpo",
      description: "Uma única árvore adulta pode absorver até 22kg de CO₂ por ano e filtrar poluentes do ar.",
      color: "text-green-600",
      bgColor: "bg-green-100",
      hoverBg: "hover:bg-green-200"
    },
    {
      icon: Heart,
      title: "Bem-estar",
      description: "Áreas verdes reduzem o estresse, melhoram a saúde mental e incentivam atividades ao ar livre.",
      color: "text-red-600",
      bgColor: "bg-red-100",
      hoverBg: "hover:bg-red-200"
    }
  ];

  return (
    <section className="section bg-green-100">
      <div className="container px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-12">Benefícios das Árvores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {beneficios.map((beneficio, index) => {
            const IconComponent = beneficio.icon;
            return (
              <div 
                key={index}
                className={`bg-white p-8 rounded-xl shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2 group ${beneficio.hoverBg}`}
              >
                <div className={`${beneficio.bgColor} p-6 rounded-full mb-6 transition-all duration-300 group-hover:scale-110`}>
                  <IconComponent size={48} className={`${beneficio.color} transition-all duration-300`} />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-4 transition-colors duration-300 group-hover:text-green-900">
                  {beneficio.title}
                </h3>
                <p className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                  {beneficio.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BeneficiosArvores;
