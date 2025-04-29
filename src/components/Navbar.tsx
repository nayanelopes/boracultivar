
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Trees, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Trees className="h-6 w-6 text-raiz-green-dark" />
          <span className="font-bold text-xl text-raiz-green-dark">Raiz Urbana</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-raiz-gray hover:text-raiz-green-dark transition-colors">
            Início
          </Link>
          <Link to="/solicitar-plantio" className="text-raiz-gray hover:text-raiz-green-dark transition-colors">
            Solicitar Plantio
          </Link>
          <Link to="/consultar-status" className="text-raiz-gray hover:text-raiz-green-dark transition-colors">
            Consultar Status
          </Link>
          <Link to="/solicitar-plantio" className="btn-primary">
            Quero Plantar
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-raiz-gray" />
          ) : (
            <Menu className="h-6 w-6 text-raiz-gray" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden w-full absolute bg-white shadow-md transition-all duration-300 ease-in-out",
        isMenuOpen ? "max-h-64 py-4 opacity-100" : "max-h-0 py-0 opacity-0 overflow-hidden"
      )}>
        <div className="container flex flex-col space-y-4">
          <Link 
            to="/" 
            className="text-raiz-gray hover:text-raiz-green-dark transition-colors px-2 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Início
          </Link>
          <Link 
            to="/solicitar-plantio" 
            className="text-raiz-gray hover:text-raiz-green-dark transition-colors px-2 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Solicitar Plantio
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
            Quero Plantar
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
