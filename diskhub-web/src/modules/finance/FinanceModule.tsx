import React from 'react';
import { DollarSign } from 'lucide-react';
import { ModulePlaceholderPage } from '../../pages/ModulePlaceholderPage';

export function FinanceModule() {
  return (
    <ModulePlaceholderPage
      moduleId="financeiro"
      name="Financeiro & Conciliação"
      category="Financeiro"
      requiredTier="standard"
      description="Contas a pagar e receber, fluxo de caixa unificado, conciliação de adquirentes e borderôs por evento."
      icon={<DollarSign className="w-6 h-6" />}
    />
  );
}
