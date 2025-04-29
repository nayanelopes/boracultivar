
import React from 'react';
import { Link } from 'react-router-dom';
import { Trees, Mail, MapPin, Calendar } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-raiz-green-dark text-white pt-10 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Trees className="h-6 w-6" />
              <span className="font-bold text-xl">Raiz Urbana</span>
            </div>
            <p className="text-white/80 mb-4">
              Transformando nossas cidades através da arborização urbana. Um projeto de cidadania e cuidado com o meio ambiente.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-raiz-earth transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-raiz-earth transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-raiz-earth transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/solicitar-plantio" className="text-white/80 hover:text-white transition-colors">
                  Solicitar Plantio
                </Link>
              </li>
              <li>
                <Link to="/consultar-status" className="text-white/80 hover:text-white transition-colors">
                  Consultar Status
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Sobre o Projeto
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-raiz-earth" />
                <span>contato@raizurbana.org.br</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-raiz-earth" />
                <span>Secretaria de Meio Ambiente, Centro</span>
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-raiz-earth" />
                <span>Segunda a Sexta: 08h às 17h</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Raiz Urbana Brasil. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
