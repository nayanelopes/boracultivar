import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SolicitarPlantio from "./pages/SolicitarPlantio";
import ConsultarStatus from "./pages/ConsultarStatus";
import Gamificacao from "./pages/Gamificacao";
import NotFound from "./pages/NotFound";
import QuemSomos from "./pages/QuemSomos";
import Autenticacao from "./pages/Autenticacao";
import MeuPerfil from "./pages/MeuPerfil";
import HallDaFloresta from "./pages/HallDaFloresta";
import { useState } from 'react';

// Remove App.css import
// import './App.css';

const App = () => {
  // Move QueryClient creation inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/solicitar-plantio" element={<SolicitarPlantio />} />
            <Route path="/consultar-status" element={<ConsultarStatus />} />
            <Route path="/gamificacao" element={<Gamificacao />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/autenticacao" element={<Autenticacao />} />
            <Route path="/meu-perfil" element={<MeuPerfil />} />
            <Route path="/hall-da-floresta" element={<HallDaFloresta />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
