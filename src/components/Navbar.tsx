
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, User } from 'lucide-react';

// Ícone personalizado para a capivara
const CapibaraIcon = () => (
  <svg viewBox="0 0 100 100" width="24" height="24" fill="currentColor">
    <path d="M85,50 C85,25 70,15 50,15 C30,15 15,25 15,50 C15,75 30,85 50,85 C70,85 85,75 85,50 Z" />
    <circle cx="30" cy="40" r="4" />
    <circle cx="70" cy="40" r="4" />
    <path d="M40,55 C43,60 50,65 60,55" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// Interface para o usuário
interface Usuario {
  nome: string;
  email: string;
  isLogado: boolean;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  
  // Verificar se o usuário está logado
  useEffect(() => {
    const usuarioLocal = localStorage.getItem('raiz_urbana_usuario');
    if (usuarioLocal) {
      try {
        const usuarioParsed = JSON.parse(usuarioLocal);
        if (usuarioParsed.isLogado) {
          setUsuario(usuarioParsed);
        }
      } catch (error) {
        console.error("Erro ao processar dados do usuário:", error);
      }
    }
  }, []);
  
  // Add scroll event listener to change navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('raiz_urbana_usuario');
    setUsuario(null);
    // Fechar menu se estiver aberto
    if (isMenuOpen) setIsMenuOpen(false);
  };
  
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-white shadow-md" : "bg-white/95 shadow-sm"
    )}>
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <CapibaraIcon />
          <span className="font-bold text-lg sm:text-xl text-raiz-green-dark">Raiz Urbana</span>
        </Link>
        
        {/* Desktop Navigation - REMOVED "Quem Somos" and "Recompensas" */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link to="/" className="text-sm lg:text-base text-raiz-gray hover:text-raiz-green-dark transition-colors">
            Início
          </Link>
          <Link to="/consultar-status" className="text-sm lg:text-base text-raiz-gray hover:text-raiz-green-dark transition-colors">
            Consultar Status
          </Link>
          <Link to="/solicitar-plantio" className="btn-primary text-sm px-3 py-1.5 lg:px-4 lg:py-2">
            Solicitar Plantio
          </Link>
          
          {usuario ? (
            <div className="relative ml-2 group">
              <button className="flex items-center gap-2 text-raiz-green-dark hover:text-raiz-green-light transition-colors">
                <span className="text-sm">{usuario.nome}</span>
                <User size={18} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
                <div className="p-2 text-sm text-raiz-gray">
                  <p className="px-4 py-2 font-medium">{usuario.email}</p>
                  <hr className="my-1" />
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-raiz-green-light/10 text-raiz-gray hover:text-raiz-green-dark rounded-md transition-colors"
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/autenticacao" className="flex items-center gap-2 text-raiz-green-dark hover:text-raiz-green-light transition-colors ml-2">
              <User size={18} />
              <span className="text-sm">Entrar</span>
            </Link>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 text-raiz-gray" />
          ) : (
            <Menu className="h-5 w-5 text-raiz-gray" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation - REMOVED "Quem Somos" and "Recompensas" */}
      <div className={cn(
        "md:hidden w-full absolute bg-white shadow-md transition-all duration-300 ease-in-out",
        isMenuOpen ? "max-h-[calc(100vh-3.5rem)] py-4 opacity-100 overflow-auto" : "max-h-0 py-0 opacity-0 overflow-hidden"
      )}>
        <div className="container flex flex-col space-y-3 px-4">
          <Link 
            to="/" 
            className="text-raiz-gray hover:text-raiz-green-dark transition-colors px-2 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Início
          </Link>
          <Link 
            to="/consultar-status" 
            className="text-raiz-gray hover:text-raiz-green-dark transition-colors px-2 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Consultar Status
          </Link>
          <Link 
            to="/solicitar-plantio" 
            className="btn-primary w-full text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Solicitar Plantio
          </Link>
          
          {usuario ? (
            <div className="border-t pt-3">
              <p className="px-2 py-1 text-sm text-raiz-gray">{usuario.email}</p>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-2 py-2 text-raiz-gray hover:text-raiz-green-dark transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link 
              to="/autenticacao" 
              className="flex items-center gap-2 text-raiz-gray hover:text-raiz-green-dark transition-colors px-2 py-2 mt-2 border-t"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={18} />
              <span>Entrar</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
