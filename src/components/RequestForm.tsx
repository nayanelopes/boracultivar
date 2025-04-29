
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Mail } from 'lucide-react';

const RequestForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    numero: '',
    bairro: '',
    cep: '',
    referencia: '',
    tipoLocal: 'calçada', // calçada, praça, outro
    observacoes: '',
    concordaTermos: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de envio para API
    setTimeout(() => {
      // Gerar número de protocolo aleatório simulado
      const protocolo = `${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Mostrar toast de sucesso
      toast({
        title: "Solicitação enviada com sucesso!",
        description: `Seu número de protocolo é: ${protocolo}`,
        duration: 5000,
      });
      
      // Redirecionar para página de consulta com o protocolo
      navigate(`/consultar-status?protocolo=${protocolo}`);
    }, 1500);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-raiz-green-dark mb-6">Dados Pessoais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="nome" className="font-medium">Nome Completo *</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium">E-mail *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="telefone" className="font-medium">Telefone *</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                required
                placeholder="(XX) XXXXX-XXXX"
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-raiz-green-dark mb-6 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Endereço do Plantio
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="endereco" className="font-medium">Rua/Avenida *</label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                value={form.endereco}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="numero" className="font-medium">Número *</label>
              <input
                type="text"
                id="numero"
                name="numero"
                value={form.numero}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="bairro" className="font-medium">Bairro *</label>
              <input
                type="text"
                id="bairro"
                name="bairro"
                value={form.bairro}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="cep" className="font-medium">CEP *</label>
              <input
                type="text"
                id="cep"
                name="cep"
                value={form.cep}
                onChange={handleChange}
                required
                placeholder="00000-000"
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="referencia" className="font-medium">Ponto de Referência</label>
              <input
                type="text"
                id="referencia"
                name="referencia"
                value={form.referencia}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="tipoLocal" className="font-medium">Tipo do Local *</label>
              <select
                id="tipoLocal"
                name="tipoLocal"
                value={form.tipoLocal}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="calçada">Calçada em frente à residência</option>
                <option value="praca">Praça</option>
                <option value="canteiro">Canteiro central</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="observacoes" className="font-medium">Observações</label>
              <textarea
                id="observacoes"
                name="observacoes"
                value={form.observacoes}
                onChange={handleChange}
                rows={3}
                className="border border-gray-300 rounded-md px-3 py-2"
                placeholder="Informações adicionais sobre o local..."
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-2 mt-4">
          <input
            type="checkbox"
            id="concordaTermos"
            name="concordaTermos"
            checked={form.concordaTermos}
            onChange={handleChange}
            required
            className="mt-1"
          />
          <label htmlFor="concordaTermos" className="text-sm">
            Concordo em compartilhar meus dados para fins de avaliação da solicitação e me 
            comprometo a cuidar da árvore após o plantio, garantindo sua rega regular nos primeiros meses. *
          </label>
        </div>
        
        <div className="flex justify-center pt-4">
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Enviar Solicitação
          </button>
        </div>
        
        <p className="text-center text-sm text-raiz-gray mt-4">
          * Campos obrigatórios
        </p>
      </form>
    </div>
  );
};

export default RequestForm;
