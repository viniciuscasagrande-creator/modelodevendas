import React from 'react';
import { Building } from 'lucide-react';
import { ModulePlaceholderPage } from '../../pages/ModulePlaceholderPage';

export function ErpModule() {
  return (
    <ModulePlaceholderPage
      moduleId="erp"
      name="ERP Operacional"
      category="Operação"
      requiredTier="standard"
      description="Emissão de ingressos, controle de lotes, catracas de acesso e gestão de estoque local."
      icon={<Building className="w-6 h-6" />}
    />
  );
}
