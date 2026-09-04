import React from 'react';
import { Headphones } from 'lucide-react';
import { ModulePlaceholderPage } from '../../pages/ModulePlaceholderPage';

export function SupportModule() {
  return (
    <ModulePlaceholderPage
      moduleId="sac"
      name="SAC & Atendimento"
      category="Suporte"
      requiredTier="advanced"
      description="Central unificada de chamados, cancelamentos, solicitações de estorno e suporte a compradores."
      icon={<Headphones className="w-6 h-6" />}
    />
  );
}
