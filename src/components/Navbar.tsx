
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

// Ícone personalizado para a capivara
const CapibaraIcon = () => (
  <svg viewBox="0 0 100 100" width="24" height="24" fill="currentColor">
    <path d="M85,50 C85,25 70,15 50,15 C30,15 15,25 15,50 C15,75 30,85 50,85 C70,85 85,75 85,50 Z" />
    <circle cx="30" cy="40" r="4" />
    <circle cx="70" cy="40" r="4" />
    <path d="M40,55 C43,60 50,65 60,55" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
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
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link to="/" className="text-sm lg:text-base text-raiz-gray hover:text-raiz-green-dark transition-colors">
            Início
          </Link>
          <Link to="/quem-somos" className="text-sm lg:text-base text-raiz-gray hover:text-raiz-green-dark transition-colors">
            Quem Somos
          </Link>
          <Link to="/consultar-status" className="text-sm lg:text-base text-raiz-gray hover:text-raiz-green-dark transition-colors">
            Consultar Status
          </Link>
          <Link to="/gamificacao" className="text-sm lg:text-base text-raiz-gray hover:text-raiz-green-dark transition-colors">
            Recompensas
          </Link>
          <Link to="/solicitar-plantio" className="btn-primary text-sm px-3 py-1.5 lg:px-4 lg:py-2">
            Solicitar Plantio
          </Link>
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
      
      {/* Mobile Navigation */}
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
            to="/quem-somos" 
            className="text-raiz-gray hover:text-raiz-green-dark transition-colors px-2 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Quem Somos
          </Link>
          <Link 
            to="/consultar-status" 
            className="text-raiz-gray hover:text-raiz-green-dark transition-colors px-2 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Consultar Status
          </Link>
          <Link 
            to="/gamificacao"
            className="text-raiz-gray hover:text-raiz-green-dark transition-colors px-2 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Recompensas
          </Link>
          <Link 
            to="/solicitar-plantio" 
            className="btn-primary w-full text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Solicitar Plantio
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
