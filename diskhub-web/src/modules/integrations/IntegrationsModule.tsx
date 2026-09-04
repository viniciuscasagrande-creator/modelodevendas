import React from 'react';
import { Plug } from 'lucide-react';
import { ModulePlaceholderPage } from '../../pages/ModulePlaceholderPage';

export function IntegrationsModule() {
  return (
    <ModulePlaceholderPage
      moduleId="integracoes"
      name="Webhooks & Integrações"
      category="Tecnologia"
      requiredTier="expert"
      description="Conectores de API, webhooks transacionais em tempo real e integração com ERPs externos."
      icon={<Plug className="w-6 h-6" />}
    />
  );
}
