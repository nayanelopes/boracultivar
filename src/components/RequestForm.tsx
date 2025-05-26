import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Mail, Camera, Check, Info } from 'lucide-react';
import { formatPhone, formatCEP, generateProtocol } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import SuccessMessage from '@/components/SuccessMessage';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

const RequestForm = () => {
  const navigate = useNavigate();
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
  const [formValido, setFormValido] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [protocolo, setProtocolo] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const {
      nome, email, telefone, endereco, numero, bairro,
      cep, tipoLocal, concordaTermos
    } = form;

    const camposObrigatoriosPreenchidos =
      nome.trim() &&
      email.trim() &&
      telefone.trim() &&
      endereco.trim() &&
      numero.trim() &&
      bairro.trim() &&
      cep.trim() &&
      tipoLocal.trim() &&
      concordaTermos &&
      imagemLocal;

    setFormValido(Boolean(camposObrigatoriosPreenchidos));
  }, [form, imagemLocal]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: e.target.checked }));
    } else if (name === 'telefone') {
      setForm(prev => ({ ...prev, [name]: formatPhone(value) }));
    } else if (name === 'cep') {
      setForm(prev => ({ ...prev, [name]: formatCEP(value) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImagemCaptura = (e) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;

    if (!arquivo.type.startsWith('image/')) {
      toast({ title: "Formato inválido", description: "Envie apenas imagens.", variant: "destructive" });
      return;
    }

    if (arquivo.size > 5 * 1024 * 1024) {
      toast({ title: "Arquivo muito grande", description: "Imagem até 5MB.", variant: "destructive" });
      return;
    }

    const leitor = new FileReader();
    leitor.onload = () => {
      setImagemLocal(leitor.result as string);
    };
    leitor.readAsDataURL(arquivo);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValido || submitting) return;

    setSubmitting(true);
    const novoProtocolo = generateProtocol();

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const enderecoCompleto = `${form.endereco}, ${form.numero} - ${form.bairro}${form.referencia ? ` (${form.referencia})` : ''}`;

      const protocoloData = {
        numero_protocolo: novoProtocolo,
        nome_usuario: form.nome,
        email: form.email,
        endereco: enderecoCompleto,
        status: 'Recebido',
        observacoes: form.observacoes || 'Solicitação de plantio registrada.',
        user_id: session?.user?.id || null
      };

      const { error } = await supabase.from('protocolos').insert([protocoloData]);

      if (error) throw error;

      localStorage.setItem('plantio_protocolo', novoProtocolo);
      setProtocolo(novoProtocolo);
      setDialogOpen(true);
      toast({ title: "Solicitação enviada!", description: `Protocolo ${novoProtocolo} gerado.` });
    } catch (error) {
      toast({ title: "Erro ao enviar", description: "Verifique os dados e tente novamente.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmar = () => {
    setDialogOpen(false);
    navigate(`/consultar-status?protocolo=${protocolo}`);
  };

  return (
    <>
      <SuccessMessage show={showSuccessMessage} onClose={() => setShowSuccessMessage(false)} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-800 flex items-center gap-2">
              <User className="h-5 w-5" />
              Dados Pessoais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome completo</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-800 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Endereço do Plantio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="endereco">Rua/Avenida</Label>
                <Input
                  id="endereco"
                  name="endereco"
                  value={form.endereco}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="numero">Número</Label>
                <Input
                  id="numero"
                  name="numero"
                  value={form.numero}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  name="cep"
                  value={form.cep}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  name="bairro"
                  value={form.bairro}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="referencia">Ponto de referência (opcional)</Label>
                <Input
                  id="referencia"
                  name="referencia"
                  value={form.referencia}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-800 flex items-center gap-2">
              <Info className="h-5 w-5" />
              Informações Adicionais
            </h2>
            <div>
              <Label htmlFor="observacoes">Observações (opcional)</Label>
              <Textarea
                id="observacoes"
                name="observacoes"
                value={form.observacoes}
                onChange={handleChange}
                className="mt-1"
                placeholder="Adicione informações relevantes sobre o local do plantio..."
              />
            </div>
          </div>

          {/* Imagem do Local */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-800 flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Imagem do Local
            </h2>
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImagemCaptura}
                hidden
              />
              {!imagemLocal ? (
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full h-32 border-dashed"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="h-8 w-8 text-gray-400" />
                    <span>Clique para adicionar uma foto do local</span>
                  </div>
                </Button>
              ) : (
                <div className="relative">
                  <img
                    src={imagemLocal}
                    alt="Local do plantio"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setImagemLocal(null)}
                  >
                    Remover
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Termos */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="concordaTermos"
                name="concordaTermos"
                checked={form.concordaTermos}
                onCheckedChange={(checked) => setForm(prev => ({ ...prev, concordaTermos: checked === true }))}
              />
              <Label
                htmlFor="concordaTermos"
                className="text-sm text-gray-600 leading-relaxed"
              >
                Li e concordo com os termos de uso e me comprometo a cuidar da árvore após o plantio,
                mantendo a calçada limpa e regando regularmente.
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            disabled={!formValido || submitting}
          >
            {submitting ? (
              <div className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Enviando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                Enviar Solicitação
              </div>
            )}
          </Button>
        </form>
      </motion.div>

      {/* Success Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Solicitação registrada com sucesso! 🌱</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Seu protocolo é: <span className="font-mono font-bold text-green-600">{protocolo}</span>
            </p>
            <p className="text-sm text-gray-600">
              Guarde este número para acompanhar o status da sua solicitação.
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={handleConfirmar}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Acompanhar Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestForm;