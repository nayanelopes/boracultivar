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
import { supabase } from '@/integrations/supabase/client';

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
  const [formValido, setFormValido] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [protocolo, setProtocolo] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('newUser') === 'true') {
      setShowSuccessMessage(true);
    }
  }, [location]);

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
      setImagemLocal(leitor.result);
    };
    leitor.readAsDataURL(arquivo);
  };

  const handleCapturarImagem = () => fileInputRef.current?.click();
  const handleRemoverImagem = () => {
    setImagemLocal(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
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

      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <Input name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} required />
        <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} type="email" required />
        <Input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} required />
        <Input name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} required />
        <Input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} required />
        <Input name="numero" placeholder="Número" value={form.numero} onChange={handleChange} required />
        <Input name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} required />
        <Input name="referencia" placeholder="Ponto de referência (opcional)" value={form.referencia} onChange={handleChange} />

        <Textarea
          name="observacoes"
          placeholder="Alguma observação?"
          value={form.observacoes}
          onChange={handleChange}
        />

        <div className="flex items-center gap-2">
          <Checkbox
            id="concordaTermos"
            name="concordaTermos"
            checked={form.concordaTermos}
            onCheckedChange={(checked) => setForm(prev => ({ ...prev, concordaTermos: checked }))}
          />
          <label htmlFor="concordaTermos" className="text-sm">Li e concordo com os termos</label>
        </div>

        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImagemCaptura}
            hidden
          />
          {!imagemLocal ? (
            <Button type="button" onClick={handleCapturarImagem} variant="outline" className="w-full">
              <Camera className="mr-2 h-4 w-4" />
              Enviar imagem do local
            </Button>
          ) : (
            <div className="space-y-2">
              <img src={imagemLocal} alt="Imagem do local" className="w-full rounded-md" />
              <Button type="button" onClick={handleRemoverImagem} variant="destructive" className="w-full">
                Remover imagem
              </Button>
            </div>
          )}
        </div>

        <Button type="submit" disabled={!formValido || submitting} className="w-full">
          {submitting ? "Enviando..." : "Enviar solicitação"}
        </Button>
      </form>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitação registrada com sucesso!</DialogTitle>
          </DialogHeader>
          <p>O seu protocolo é: <strong>{protocolo}</strong></p>
          <DialogFooter>
            <Button onClick={handleConfirmar}>Consultar status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestForm;
