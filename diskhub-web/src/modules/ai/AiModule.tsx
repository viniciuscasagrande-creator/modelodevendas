import React from 'react';
import { Sparkles } from 'lucide-react';
import { ModulePlaceholderPage } from '../../pages/ModulePlaceholderPage';

export function AiModule() {
  return (
    <ModulePlaceholderPage
      moduleId="ia"
      name="Inteligência Artificial"
      category="Inteligência"
      requiredTier="expert"
      description="Previsão de demanda, precificação dinâmica e recomendações preditivas para produtores de eventos."
      icon={<Sparkles className="w-6 h-6" />}
    />
  );
}
