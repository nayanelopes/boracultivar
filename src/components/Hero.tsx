
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="bg-white relative overflow-hidden py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left content - Text and CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6 text-green-800 max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-600 p-2 rounded-full">
                <Leaf className="h-6 w-6 text-white" fill="currentColor" strokeWidth={1} />
              </div>
              <span className="font-bold text-xl text-green-700">Bora cultivar?</span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-green-800"
            >
              Uma cidade mais verde começa com você
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl font-light text-gray-700"
            >
              Transforme sua calçada em um espaço de vida. Solicite o plantio gratuito de árvores e ajude a refrescar o Recife.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="pt-4"
            >
              <Link 
                to="/solicitar-plantio" 
                className="bg-green-600 text-white hover:bg-green-700 px-8 py-4 rounded-full flex items-center justify-center gap-2 font-bold transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Quero plantar
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right content - Image with overlay */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/6f47ea23-d7bf-4d80-a75c-8cc6ae80c385.png" 
                alt="Trabalhadores plantando árvores em Recife" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-green-800/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating 3D leaves */}
      <FloatingLeaves />
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-green-500 rounded-full -mt-20 -mr-20 opacity-5"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-400 rounded-full -mb-48 opacity-5"></div>
    </section>
  );
};

// Component for the floating 3D leaves effect
const FloatingLeaves = () => {
  // Array of leaf configurations with different sizes, positions, and animations
  const leaves = [
    { top: '10%', left: '5%', size: 'h-8 w-8', delay: 0, duration: 15, rotation: 360 },
    { top: '15%', right: '15%', size: 'h-10 w-10', delay: 2, duration: 20, rotation: -360 },
    { top: '35%', left: '8%', size: 'h-6 w-6', delay: 1, duration: 12, rotation: 360 },
    { top: '60%', right: '10%', size: 'h-12 w-12', delay: 0.5, duration: 18, rotation: -360 },
    { top: '75%', left: '20%', size: 'h-8 w-8', delay: 3, duration: 16, rotation: 360 },
    { bottom: '10%', right: '25%', size: 'h-6 w-6', delay: 2.5, duration: 14, rotation: -360 },
  ];

  return (
    <>
      {leaves.map((leaf, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.2, 0.1, 0.3, 0.1],
            y: [0, -15, 5, -25, 0],
            rotate: leaf.rotation,
          }}
          transition={{ 
            delay: leaf.delay, 
            duration: leaf.duration, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{ 
            position: 'absolute',
            top: leaf.top,
            left: leaf.left,
            right: leaf.right,
            bottom: leaf.bottom,
          }}
          className={`text-green-500 ${leaf.size} opacity-20 pointer-events-none`}
        >
          <Leaf fill="currentColor" strokeWidth={1} />
        </motion.div>
      ))}
    </>
  );
};

export default Hero;
