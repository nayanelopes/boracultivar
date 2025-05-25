
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Calendar } from 'lucide-react';

interface PersonalInfoFormProps {
  nome: string;
  email: string;
  dataNascimento: string;
  onNomeChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onDataNascimentoChange: (value: string) => void;
}

const PersonalInfoForm = ({
  nome,
  email,
  dataNascimento,
  onNomeChange,
  onEmailChange,
  onDataNascimentoChange
}: PersonalInfoFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="perfil-nome">Nome completo</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="perfil-nome"
            type="text"
            value={nome}
            onChange={(e) => onNomeChange(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="perfil-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="perfil-email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="perfil-data-nascimento">Data de nascimento</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="perfil-data-nascimento"
            type="date"
            value={dataNascimento}
            onChange={(e) => onDataNascimentoChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </>
  );
};

export default PersonalInfoForm;
