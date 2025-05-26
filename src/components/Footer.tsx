
import React from 'react';
import { Link } from 'react-router-dom';
import { Trees, Mail, MapPin, Calendar } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-raiz-green-dark text-white pt-8 pb-6">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Trees className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="font-bold text-lg sm:text-xl">Bora Cultivar</span>
            </div>
            <p className="text-white/80 mb-4 text-sm sm:text-base">
              Transformando nossas cidades através da arborização urbana. Um projeto de cidadania e cuidado com o meio ambiente.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-raiz-earth transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-raiz-earth transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-raiz-earth transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <h3 className="font-semibold text-lg mb-3">Links Úteis</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link to="/quem-somos" className="text-white/80 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white/80 hover:text-white transition-colors">
                  Termos De Uso
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white/80 hover:text-white transition-colors">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white/80 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="mt-4 md:mt-0">
            <h3 className="font-semibold text-lg mb-3">Contato</h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-raiz-earth flex-shrink-0" />
                <span className="break-all">boracultivar@gmail.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-raiz-earth flex-shrink-0" />
                <span>Prefeitura do Centro do Recife, Recife Antigo</span>
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-raiz-earth flex-shrink-0" />
                <span>Segunda a Sexta: 08h às 17h</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 text-center text-xs sm:text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Bora Cultivar Brasil. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
