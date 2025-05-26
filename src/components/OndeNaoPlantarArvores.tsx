
import React from 'react';

const OndeNaoPlantarArvores = () => {
  return (
    <section className="section bg-amber-100">
      <div className="container px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-amber-800 mb-8">⚠️ Atenção: Onde NÃO plantar árvores</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-amber-700 mb-4">Locais Inadequados:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="bg-amber-200 rounded-full p-1 mt-1">⚠️</span>
                <span>Sob fiação elétrica ou próximo a postes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-amber-200 rounded-full p-1 mt-1">⚠️</span>
                <span>Próximo a esquinas (mínimo de 5m de distância)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-amber-200 rounded-full p-1 mt-1">⚠️</span>
                <span>Calçadas muito estreitas (menos de 1,5m)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-amber-200 rounded-full p-1 mt-1">⚠️</span>
                <span>Sobre tubulações de água, gás ou esgoto</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-amber-200 rounded-full p-1 mt-1">⚠️</span>
                <span>Evite calçadas com entrada de veículos</span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg overflow-hidden shadow relative">
            <div className="absolute inset-0 bg-yellow-300 opacity-20 z-10"></div>
            <img 
              src="https://s2-g1.glbimg.com/2wn6q-nGeU-1-cEgzZ81ybdWgCA=/0x0:1280x720/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/U/g/FfZCtKQIOkIYVUsj46xA/whatsapp-image-2019-01-28-at-10.51.22.jpeg" 
              alt="Calçada arborizada em Recife" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OndeNaoPlantarArvores;
