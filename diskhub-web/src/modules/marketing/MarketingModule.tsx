import React from 'react';
import { Megaphone } from 'lucide-react';
import { ModulePlaceholderPage } from '../../pages/ModulePlaceholderPage';

export function MarketingModule() {
  return (
    <ModulePlaceholderPage
      moduleId="marketing"
      name="Marketing & Audiência"
      category="Crescimento"
      requiredTier="advanced"
      description="Campanhas de e-mail e WhatsApp, segmentação de fãs, rastreamento de links e cupons de desconto."
      icon={<Megaphone className="w-6 h-6" />}
    />
  );
}
