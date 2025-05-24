
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PerfilUsuario from '@/components/PerfilUsuario';
import FeedAtividades from '@/components/FeedAtividades';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MeuPerfil = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-raiz-green-light/10 py-10 flex-grow">
        <div className="container">
          <Link to="/" className="flex items-center gap-1 text-raiz-green-dark hover:text-raiz-green-light transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar à página inicial</span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-raiz-green-dark mb-8">Meu Perfil</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Profile Edit Section */}
            <div className="lg:col-span-1">
              <PerfilUsuario />
            </div>
            
            {/* Activity Feed Section */}
            <div className="lg:col-span-2">
              <FeedAtividades />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MeuPerfil;
