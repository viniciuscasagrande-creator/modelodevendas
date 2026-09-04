export interface AppDefinition {
  id: string;
  name: string;
  category: string;
  tier: 'standard' | 'advanced' | 'expert';
  description: string;
  path: string;
}

export const catalogApps: AppDefinition[] = [
  {
    id: 'crm',
    name: 'CRM Comercial',
    category: 'Vendas',
    tier: 'standard',
    description: 'Gestão de leads, funil comercial, histórico de compradores e propostas de patrocínio.',
    path: '/app/crm',
  },
  {
    id: 'erp',
    name: 'ERP Operacional',
    category: 'Operação',
    tier: 'standard',
    description: 'Controle de ingressos, lotes, catracas de acesso, pontos de venda e estoque local.',
    path: '/app/erp',
  },
  {
    id: 'financeiro',
    name: 'Financeiro & Borderô',
    category: 'Financeiro',
    tier: 'standard',
    description: 'Contas a pagar e receber, fluxo de caixa, conciliação de adquirentes e borderôs por evento.',
    path: '/app/financeiro',
  },
  {
    id: 'marketing',
    name: 'Marketing & Audiência',
    category: 'Crescimento',
    tier: 'advanced',
    description: 'Campanhas de e-mail e WhatsApp, segmentação de fãs, rastreamento de links e cupons.',
    path: '/app/marketing',
  },
  {
    id: 'sac',
    name: 'SAC & Atendimento',
    category: 'Suporte',
    tier: 'advanced',
    description: 'Central unificada de chamados, cancelamentos, solicitações de estorno e suporte a compradores.',
    path: '/app/sac',
  },
  {
    id: 'bi',
    name: 'BI & Analytics',
    category: 'Inteligência',
    tier: 'advanced',
    description: 'Painéis executivos, taxas de conversão de checkout, perfil demográfico e curvas de vendas.',
    path: '/app/bi',
  },
  {
    id: 'contabilidade',
    name: 'Contabilidade & DRE',
    category: 'Controladoria',
    tier: 'expert',
    description: 'Plano de contas gerencial, balancetes automáticos, provisões fiscais e conciliação contábil.',
    path: '/app/contabilidade',
  },
  {
    id: 'automacao',
    name: 'Automações Avançadas',
    category: 'Produtividade',
    tier: 'expert',
    description: 'Regras automáticas para virada de lotes, envio de alertas de risco e workflows operacionais.',
    path: '/app/automacao',
  },
  {
    id: 'ia',
    name: 'Inteligência Artificial',
    category: 'Inteligência',
    tier: 'expert',
    description: 'Previsão de demanda, precificação dinâmica e recomendações preditivas para produtores.',
    path: '/app/ia',
  },
  {
    id: 'integracoes',
    name: 'Webhooks & APIs',
    category: 'Tecnologia',
    tier: 'expert',
    description: 'Conectores com sistemas legados, gateways de pagamento, ERPs externos e webhooks seguros.',
    path: '/app/integracoes',
  },
];
