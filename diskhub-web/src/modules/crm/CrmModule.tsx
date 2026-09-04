import React from 'react';
import { Users } from 'lucide-react';
import { ModulePlaceholderPage } from '../../pages/ModulePlaceholderPage';

export function CrmModule() {
  return (
    <ModulePlaceholderPage
      moduleId="crm"
      name="CRM Comercial"
      category="Vendas"
      requiredTier="standard"
      description="Gestão de leads, histórico de compras, relacionamento com clientes e propostas de patrocínio."
      icon={<Users className="w-6 h-6" />}
    />
  );
}
