export const plans = {
  standard: {
    id: 'standard',
    name: 'Standard',
    tagline: 'Organize sua operação.',
    badge: 'Essencial',
    description: 'As ferramentas essenciais para estruturar clientes, operação comercial e gestão financeira.',
    recommended: false,
    color: 'from-slate-500 to-slate-700',
    borderCol: 'border-slate-300 dark:border-slate-700',
    includedModules: ['crm', 'erp', 'finance'],
    includedFeatures: [
      'Gestão de clientes e leads',
      'Pipeline comercial básico',
      'Gestão de fornecedores e compras',
      'Contas a pagar e receber',
      'Fluxo de caixa consolidado',
      'Até 3 usuários incluídos',
      'Suporte comercial em horário comercial'
    ],
    pricing: {
      monthly: 'Consulte condições comerciais',
      annual: 'Consulte condições comerciais',
      setup: null
    }
  },
  advanced: {
    id: 'advanced',
    name: 'Advanced',
    tagline: 'Acelere seu crescimento.',
    badge: 'Mais Recomendado',
    description: 'Adicione marketing ativo, atendimento ao cliente omnicanal e inteligência analítica à sua operação.',
    recommended: true,
    color: 'from-orange-500 to-amber-600',
    borderCol: 'border-[#F97316]',
    includedModules: ['crm', 'erp', 'finance', 'marketing', 'support', 'analytics'],
    includedFeatures: [
      'Tudo incluído no plano Standard',
      'Campanhas de WhatsApp e E-mail marketing',
      'Pixels de conversão (Meta, GA4, TikTok)',
      'SAC 360º com gestão de tickets e SLA',
      'Central de estornos integrada ao financeiro',
      'BI executivo com forecast de receita',
      'Até 10 usuários incluídos',
      'Suporte prioritário via WhatsApp e portal'
    ],
    pricing: {
      monthly: 'Consulte condições comerciais',
      annual: 'Consulte condições comerciais',
      setup: null
    }
  },
  expert: {
    id: 'expert',
    name: 'Expert',
    tagline: 'Automatize e escale sua operação.',
    badge: 'Enterprise',
    description: 'A camada mais completa do DiskHub, com automações avançadas, inteligência preditiva, contabilidade e API.',
    recommended: false,
    color: 'from-purple-600 to-indigo-700',
    borderCol: 'border-purple-500 dark:border-purple-600',
    includedModules: ['crm', 'erp', 'finance', 'marketing', 'support', 'analytics', 'accounting', 'automation', 'ai', 'integrations'],
    includedFeatures: [
      'Tudo incluído no plano Advanced',
      'Emissão de notas fiscais (NF-e) em lote',
      'Plano de contas e demonstrativos contábeis',
      'Motor de automação de workflows e triggers',
      'Disk AI: Copilot operacional e Smart Pricing',
      'Acesso completo a API REST e Webhooks',
      'Usuários ilimitados',
      'Gerente de conta dedicado e SLA 24/7'
    ],
    pricing: {
      monthly: 'Consulte condições comerciais',
      annual: 'Consulte condições comerciais',
      setup: null
    }
  }
};
