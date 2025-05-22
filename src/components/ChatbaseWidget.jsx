import { useEffect } from 'react';

const ChatbaseWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.id = 'C276rNidP52qj-ZTWaJ0w'; // Substitua pelo seu ID real do Chatbase se necessário
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Este componente não renderiza nada visualmente
};

export default ChatbaseWidget;
