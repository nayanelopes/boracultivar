
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PerfilInfo from '@/components/PerfilInfo';
import PerfilUsuario from '@/components/PerfilUsuario';
import FeedAtividades from '@/components/FeedAtividades';
import { ArrowLeft, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MeuPerfil = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [activeTab, setActiveTab] = useState<'perfil' | 'atividades'>('perfil');

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleBackToProfile = () => {
    setShowEditProfile(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-raiz-green-light/10 py-10 flex-grow">
        <div className="container">
          <Link to="/" className="flex items-center gap-1 text-raiz-green-dark hover:text-raiz-green-light transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar à página inicial</span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-raiz-green-dark mb-8">
            {showEditProfile ? 'Editar Perfil' : 'Meu Perfil'}
          </h1>
          
          {showEditProfile ? (
            <div className="max-w-2xl mx-auto">
              <Button
                onClick={handleBackToProfile}
                variant="ghost"
                className="mb-6 flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao perfil
              </Button>
              <PerfilUsuario />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Tabs */}
              <div className="flex gap-4 mb-8">
                <Button
                  onClick={() => setActiveTab('perfil')}
                  variant={activeTab === 'perfil' ? 'default' : 'outline'}
                  className="flex items-center gap-2"
                >
                  Meu Perfil
                </Button>
                <Button
                  onClick={() => setActiveTab('atividades')}
                  variant={activeTab === 'atividades' ? 'default' : 'outline'}
                  className="flex items-center gap-2"
                >
                  <Activity className="h-4 w-4" />
                  Minhas Atividades
                </Button>
              </div>

              {/* Content */}
              {activeTab === 'perfil' ? (
                <PerfilInfo onEditProfile={handleEditProfile} />
              ) : (
                <FeedAtividades />
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MeuPerfil;
