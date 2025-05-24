
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, User, Leaf, UserPen } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [usuario, setUsuario] = useState(null);
  
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
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-green-600 p-1 rounded-full">
            <Leaf className="h-5 w-5 text-white" fill="currentColor" strokeWidth={1} />
          </div>
          <span className="font-bold text-xl text-green-700">Bora cultivar?</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-base text-gray-700 hover:text-green-600 transition-colors">
            Início
          </Link>
          <Link to="/consultar-status" className="text-base text-gray-700 hover:text-green-600 transition-colors">
            Consultar Status
          </Link>
          <Link to="/solicitar-plantio" className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-full text-sm font-medium transition-colors">
            Quero plantar
          </Link>
          
          {usuario ? (
            <div className="relative ml-2 group">
              <button className="flex items-center gap-2 text-green-800 hover:text-green-600 transition-colors">
                <span className="text-sm">{usuario.nome}</span>
                <User size={18} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
                <div className="p-2 text-sm text-gray-700">
                  <p className="px-4 py-2 font-medium">{usuario.email}</p>
                  <hr className="my-1" />
                  <Link 
                    to="/meu-perfil"
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-green-50 text-gray-700 hover:text-green-800 rounded-md transition-colors"
                  >
                    <UserPen size={16} />
                    Meu Perfil
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-green-50 text-gray-700 hover:text-green-800 rounded-md transition-colors"
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/autenticacao" className="flex items-center gap-2 text-green-800 hover:text-green-600 transition-colors ml-2">
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
            <X className="h-5 w-5 text-gray-700" />
          ) : (
            <Menu className="h-5 w-5 text-gray-700" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden w-full absolute bg-white shadow-md transition-all duration-300 ease-in-out",
        isMenuOpen ? "max-h-[calc(100vh-3.5rem)] py-4 opacity-100 overflow-auto" : "max-h-0 py-0 opacity-0 overflow-hidden"
      )}>
        <div className="container flex flex-col space-y-3 px-4">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-green-600 transition-colors px-2 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Início
          </Link>
          <Link 
            to="/consultar-status" 
            className="text-gray-700 hover:text-green-600 transition-colors px-2 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Consultar Status
          </Link>
          <Link 
            to="/solicitar-plantio" 
            className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-full text-center transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Quero plantar
          </Link>
          
          {usuario ? (
            <div className="border-t pt-3">
              <p className="px-2 py-1 text-sm text-gray-700">{usuario.email}</p>
              <Link 
                to="/meu-perfil"
                className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPen size={16} />
                Meu Perfil
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-2 py-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link 
              to="/autenticacao" 
              className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors px-2 py-2 mt-2 border-t"
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
