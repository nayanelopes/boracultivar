import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Mail, Camera, Check } from 'lucide-react';
import { formatPhone, formatCEP, generateProtocol } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import SuccessMessage from '@/components/SuccessMessage';

const RequestForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    numero: '',
    bairro: '',
    cep: '',
    referencia: '',
    tipoLocal: 'calçada',
    observacoes: '',
    concordaTermos: false
  });
  
  const [imagemLocal, setImagemLocal] = useState<string | null>(null);
  const [isCapturando, setIsCapturando] = useState(false);
  const [formValido, setFormValido] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [protocolo, setProtocolo] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Verificar se o usuário acabou de se cadastrar
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('newUser') === 'true') {
      setShowSuccessMessage(true);
    }
  }, [location]);
  
  // Verificar a validade do formulário sempre que os campos mudam
  useEffect(() => {
    const { nome, email, telefone, endereco, numero, bairro, cep, tipoLocal, concordaTermos } = form;
    const camposObrigatoriosPreenchidos = 
      nome.trim() !== '' && 
      email.trim() !== '' && 
      telefone.trim() !== '' && 
      endereco.trim() !== '' && 
      numero.trim() !== '' && 
      bairro.trim() !== '' && 
      cep.trim() !== '' && 
      tipoLocal.trim() !== '' && 
      concordaTermos && 
      imagemLocal !== null;
      
    setFormValido(camposObrigatoriosPreenchidos);
  }, [form, imagemLocal]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'telefone') {
      setForm(prev => ({
        ...prev,
        [name]: formatPhone(value)
      }));
    } else if (name === 'cep') {
      setForm(prev => ({
        ...prev,
        [name]: formatCEP(value)
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleImagemCaptura = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    
    if (arquivo) {
      if (!arquivo.type.startsWith('image/')) {
        toast({
          title: "Formato inválido",
          description: "Por favor, envie apenas imagens.",
          variant: "destructive"
        });
        return;
      }
      
      if (arquivo.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "A imagem deve ter no máximo 5MB.",
          variant: "destructive"
        });
        return;
      }
      
      const leitorURL = new FileReader();
      leitorURL.onload = () => {
        setImagemLocal(leitorURL.result as string);
        setIsCapturando(false);
      };
      leitorURL.readAsDataURL(arquivo);
      
      toast({
        title: "Imagem carregada",
        description: "A foto do local foi adicionada com sucesso.",
      });
    }
  };
  
  const handleCapturarImagem = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleRemoverImagem = () => {
    setImagemLocal(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagemLocal) {
      toast({
        title: "Imagem obrigatória",
        description: "Por favor, adicione uma foto do local para o plantio.",
        variant: "destructive"
      });
      return;
    }
    
    const novoProtocolo = generateProtocol();
    setProtocolo(novoProtocolo);
    
    try {
      localStorage.setItem('plantio_protocolo', novoProtocolo);
    } catch (error) {
      console.error("Erro ao salvar protocolo:", error);
    }
    
    setDialogOpen(true);
  };
  
  const handleConfirmar = () => {
    setDialogOpen(false);
    navigate(`/consultar-status?protocolo=${protocolo}`);
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setForm(prev => ({
      ...prev,
      concordaTermos: checked
    }));
  };
  
  return (
    <>
      <SuccessMessage 
        show={showSuccessMessage} 
        onClose={() => setShowSuccessMessage(false)} 
      />
      
      <div className="bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <div>
            <h2 className="text-2xl font-semibold text-raiz-green-dark mb-6">Dados Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="nome" className="font-medium">Nome Completo *</label>
                <Input
                  type="text"
                  id="nome"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-medium">E-mail *</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label htmlFor="telefone" className="font-medium">Telefone *</label>
                <Input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  required
                  placeholder="(XX) XXXXX-XXXX"
                />
              </div>
            </div>
          </div>
          
          {/* Endereço do Plantio */}
          <div>
            <h2 className="text-2xl font-semibold text-raiz-green-dark mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Endereço do Plantio
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="endereco" className="font-medium">Rua/Avenida *</label>
                <Input
                  type="text"
                  id="endereco"
                  name="endereco"
                  value={form.endereco}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label htmlFor="numero" className="font-medium">Número *</label>
                <Input
                  type="text"
                  id="numero"
                  name="numero"
                  value={form.numero}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label htmlFor="bairro" className="font-medium">Bairro *</label>
                <Input
                  type="text"
                  id="bairro"
                  name="bairro"
                  value={form.bairro}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label htmlFor="cep" className="font-medium">CEP *</label>
                <Input
                  type="text"
                  id="cep"
                  name="cep"
                  value={form.cep}
                  onChange={handleChange}
                  required
                  placeholder="00000-000"
                />
              </div>
              
              <div className="flex flex-col gap-1 md:col-span-2">
                <label htmlFor="referencia" className="font-medium">Ponto de Referência</label>
                <Input
                  type="text"
                  id="referencia"
                  name="referencia"
                  value={form.referencia}
                  onChange={handleChange}
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
                <Textarea
                  id="observacoes"
                  name="observacoes"
                  value={form.observacoes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Informações adicionais sobre o local..."
                />
              </div>
            </div>
          </div>
          
          {/* Seção de Upload de Imagem */}
          <div>
            <h2 className="text-2xl font-semibold text-raiz-green-dark mb-6 flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Foto do Local *
            </h2>
            
            <div className="flex flex-col items-center border-2 border-dashed border-raiz-green-light/50 rounded-lg p-6 bg-raiz-green-light/5">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImagemCaptura}
                ref={fileInputRef}
                className="hidden"
              />
              
              {!imagemLocal ? (
                <div className="flex flex-col items-center">
                  <Camera className="h-16 w-16 text-raiz-green mb-4" />
                  <p className="text-center text-raiz-gray mb-4">
                    Tire uma foto do local onde deseja o plantio da árvore. Isso nos ajuda a avaliar melhor o espaço.
                  </p>
                  <p className="text-center text-red-500 mb-4 font-medium">
                    Este campo é obrigatório para análise da solicitação.
                  </p>
                  <Button 
                    type="button"
                    variant="outline"
                    className="bg-raiz-green-light/20 border-raiz-green-light text-raiz-green-dark hover:bg-raiz-green-light/30"
                    onClick={handleCapturarImagem}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Capturar Imagem
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center w-full">
                  <div className="relative w-full max-w-md mb-4">
                    <img src={imagemLocal} alt="Local para plantio" className="w-full h-auto rounded-lg shadow-sm" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={handleRemoverImagem}
                    >
                      Remover
                    </Button>
                  </div>
                  <p className="text-sm text-green-600 italic flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    Foto do local adicionada com sucesso.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Termos e condições */}
          <div className="flex items-start gap-2 mt-4">
            <Checkbox
              id="concordaTermos"
              checked={form.concordaTermos}
              onCheckedChange={handleCheckboxChange}
              className="mt-1 bg-gray-100"
            />
            <label htmlFor="concordaTermos" className="text-sm">
              Concordo em compartilhar meus dados para fins de avaliação da solicitação e me 
              comprometo a cuidar da árvore após o plantio, garantindo sua rega regular nos primeiros meses. *
            </label>
          </div>
          
          {/* Botão de envio com estado condicional */}
          <div className="flex justify-center pt-4">
            <Button 
              type="submit" 
              className={`flex items-center gap-2 transition-all duration-300 ${
                formValido 
                  ? "bg-gray-800 text-white hover:bg-gray-700 scale-105" 
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              disabled={!formValido}
            >
              <Mail className="h-5 w-5" />
              Enviar Solicitação
            </Button>
          </div>
          
          {!formValido && (
            <p className="text-center text-sm text-red-500 mt-2">
              Por favor, preencha todos os campos obrigatórios e adicione uma foto do local.
            </p>
          )}
          
          <p className="text-center text-sm text-raiz-gray mt-4">
            * Campos obrigatórios
          </p>
        </form>

        {/* Diálogo de confirmação */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-raiz-green-dark text-xl">
                Sua solicitação foi confirmada!
              </DialogTitle>
            </DialogHeader>
            <div className="py-6 flex flex-col items-center">
              <div className="bg-raiz-green-light/20 rounded-full p-3 mb-4">
                <Check className="h-10 w-10 text-raiz-green-dark" />
              </div>
              <p className="text-center mb-2">
                Agradecemos por contribuir com a arborização urbana!
              </p>
              <div className="border border-raiz-green-light/50 rounded-lg p-3 bg-raiz-green-light/10 mt-2 text-center">
                <p className="text-sm mb-1">Seu número de protocolo é:</p>
                <p className="text-xl font-bold text-raiz-green-dark">{protocolo}</p>
                <p className="text-xs text-raiz-gray mt-2">
                  Guarde este número para consultar o status da sua solicitação.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                className="w-full bg-raiz-green text-white hover:bg-raiz-green-dark"
                onClick={handleConfirmar}
              >
                Acompanhar solicitação
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default RequestForm;
