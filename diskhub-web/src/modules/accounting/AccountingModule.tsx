import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { ModulePlaceholderPage } from '../../pages/ModulePlaceholderPage';

export function AccountingModule() {
  return (
    <ModulePlaceholderPage
      moduleId="contabilidade"
      name="Contabilidade & DRE"
      category="Controladoria"
      requiredTier="expert"
      description="Plano de contas gerencial, conciliação contábil automática e demonstrativo de resultados do exercício."
      icon={<FileSpreadsheet className="w-6 h-6" />}
    />
  );
}
