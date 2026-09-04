import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ModulePlaceholderPage } from '../../pages/ModulePlaceholderPage';

export function AnalyticsModule() {
  return (
    <ModulePlaceholderPage
      moduleId="bi"
      name="BI & Analytics"
      category="Inteligência"
      requiredTier="advanced"
      description="Painéis executivos, taxas de conversão de checkout, perfil demográfico e curvas de vendas consolidadas."
      icon={<BarChart3 className="w-6 h-6" />}
    />
  );
}
