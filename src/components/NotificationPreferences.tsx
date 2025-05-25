
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Bell } from 'lucide-react';

interface PreferenciaNotificacoes {
  atualizacoesPlantio: boolean;
  reclamacoesArvores: boolean;
  alertasCapiba: boolean;
}

interface NotificationPreferencesProps {
  preferencias: PreferenciaNotificacoes;
  onPreferenciaChange: (field: keyof PreferenciaNotificacoes) => void;
}

const NotificationPreferences = ({
  preferencias,
  onPreferenciaChange
}: NotificationPreferencesProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 text-raiz-green-dark" />
        <Label className="font-medium">Preferências de notificações</Label>
      </div>
      
      <div className="ml-7 space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="pref-atualizacoes-plantio" 
            checked={preferencias.atualizacoesPlantio}
            onCheckedChange={() => onPreferenciaChange('atualizacoesPlantio')}
          />
          <Label htmlFor="pref-atualizacoes-plantio" className="text-sm cursor-pointer">
            Receber atualizações do plantio
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="pref-reclamacoes-arvores" 
            checked={preferencias.reclamacoesArvores}
            onCheckedChange={() => onPreferenciaChange('reclamacoesArvores')}
          />
          <Label htmlFor="pref-reclamacoes-arvores" className="text-sm cursor-pointer">
            Receber atualizações de reclamações de árvores
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="pref-alertas-capiba" 
            checked={preferencias.alertasCapiba}
            onCheckedChange={() => onPreferenciaChange('alertasCapiba')}
          />
          <Label htmlFor="pref-alertas-capiba" className="text-sm cursor-pointer">
            Notificações de cupons e outros prêmios (moeda Capiba)
          </Label>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;
