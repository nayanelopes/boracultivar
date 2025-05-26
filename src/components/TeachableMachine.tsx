import React, { useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';

const TeachableMachine: React.FC = () => {
  const [message, setMessage] = useState('');
  const webcamRef = useRef<HTMLVideoElement>(null);
  const modelURL = 'https://teachablemachine.withgoogle.com/models/04ijzUI11/';

  const init = async () => {
    const model = await tmImage.load(`${modelURL}model.json`, `${modelURL}metadata.json`);
    const webcam = new tmImage.Webcam(200, 200, true);
    await webcam.setup();
    await webcam.play();


    if (webcamRef.current) {
      webcamRef.current.srcObject = webcam.webcam.srcObject;
    }

    const loop = async () => {
      webcam.update();
      const prediction = await model.predict(webcam.canvas);
      prediction.sort((a, b) => b.probability - a.probability);
      const topPrediction = prediction[0];
      const mensagens: { [key: string]: string } = {
        'Apto para plantio': '✅ Este local está apto para plantio! Sua solicitação foi registrada e será analisada por nossa equipe técnica.',
        'Calçada estreita': '🚫 A calçada tem menos de 1,90m. Isso impede o crescimento saudável da árvore e a circulação segura.',
        'Obstáculos urbanos': '🚫 Há muitos equipamentos urbanos no local, como postes, rampas ou entradas de garagem.',
        'Solo inadequado': '🚫 O solo está muito compactado ou pavimentado. Isso prejudica o desenvolvimento da árvore.',
        'Rua estreita': '🚫 Ruas com menos de 7 metros não podem ser arborizadas devido à segurança do trânsito.',
        'Fiação elétrica': '🚫 Há fiação elétrica de média/alta tensão. Plantio aqui não é permitido por segurança.',
        'Sem área permeável': '🚫 O local precisa ter solo permeável para infiltrar água e nutrir a árvore.',
        'Muito próximo de edificações': '🚫 A árvore poderia causar danos estruturais a construções próximas.',
      };
      setMessage(mensagens[topPrediction.className] || 'Resultado não identificado. Tente novamente.');
      requestAnimationFrame(loop);
    };

    loop();
  };

  return (
    <div>
      <button onClick={init}>Iniciar Verificação</button>
      <video ref={webcamRef} autoPlay playsInline width="200" height="200" />
      <p>{message}</p>
    </div>
  );
};

export default TeachableMachine;

