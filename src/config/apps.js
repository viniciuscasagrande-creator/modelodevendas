export const apps = [
  {
    id: 'crm',
    name: 'CRM',
    description: 'Gestão de clientes, leads e relacionamento 360º.',
    icon: 'Users',
    route: '/crm',
    productRoute: '/produtos/crm',
    plan: 'standard',
    category: 'Vendas e Relacionamento',
    enabled: true,
    testId: 'app-crm'
  },
  {
    id: 'erp',
    name: 'ERP',
    description: 'Gestão integrada da operação empresarial do produtor.',
    icon: 'Boxes',
    route: '/vendas',
    productRoute: '/produtos/erp',
    plan: 'standard',
    category: 'Gestão',
    enabled: true,
    testId: 'app-sales',
    aliasTestId: 'app-erp'
  },
  {
    id: 'finance',
    name: 'Financeiro',
    description: 'Fluxo de caixa, conciliação e controle de repasses.',
    icon: 'WalletCards',
    route: '/financeiro',
    productRoute: '/produtos/financeiro',
    plan: 'standard',
    category: 'Financeiro',
    enabled: true,
    testId: 'app-finance'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Campanhas, públicos, automações e inteligência comercial.',
    icon: 'Megaphone',
    route: '/marketing',
    productRoute: '/produtos/marketing',
    plan: 'advanced',
    category: 'Marketing',
    enabled: true,
    testId: 'app-marketing'
  },
  {
    id: 'support',
    name: 'SAC',
    description: 'Atendimento integrado, ouvidoria e suporte 360º.',
    icon: 'Headphones',
    route: '/sac',
    productRoute: '/produtos/sac',
    plan: 'advanced',
    category: 'Atendimento',
    enabled: true,
    testId: 'app-sac',
    aliasTestId: 'app-support'
  },
  {
    id: 'analytics',
    name: 'BI & Analytics',
    description: 'Indicadores estratégicos, forecast e inteligência de dados.',
    icon: 'BarChart3',
    route: '/bi',
    productRoute: '/produtos/bi',
    plan: 'advanced',
    category: 'Dados',
    enabled: true,
    testId: 'app-analytics'
  },
  {
    id: 'accounting',
    name: 'Contabilidade',
    description: 'Gestão contábil e fiscal integrada com emissão de NF-e.',
    icon: 'Calculator',
    route: '/contabilidade',
    productRoute: '/produtos/contabilidade',
    plan: 'expert',
    category: 'Administração',
    enabled: true,
    testId: 'app-accounting'
  },
  {
    id: 'automation',
    name: 'Automação',
    description: 'Automatize processos comerciais e operacionais com triggers.',
    icon: 'Workflow',
    route: '/automacao',
    productRoute: '/produtos/automacao',
    plan: 'expert',
    category: 'Automação',
    enabled: true,
    testId: 'app-automation'
  },
  {
    id: 'ai',
    name: 'IA',
    description: 'Assistentes inteligentes para vendas, financeiro e operação.',
    icon: 'BrainCircuit',
    route: '/bi',
    productRoute: '/produtos/ia',
    plan: 'expert',
    category: 'Dados',
    enabled: true,
    testId: 'app-ai'
  },
  {
    id: 'integrations',
    name: 'Integrações',
    description: 'Conectores com gateways, APIs, Webhooks e ferramentas externas.',
    icon: 'Plug',
    route: '/integracoes',
    productRoute: '/produtos/integracoes',
    plan: 'expert',
    category: 'Administração',
    enabled: true,
    testId: 'app-integrations'
  }
];

export const planAccess = {
  standard: ['crm', 'erp', 'finance'],
  advanced: ['crm', 'erp', 'finance', 'marketing', 'support', 'analytics'],
  expert: ['crm', 'erp', 'finance', 'marketing', 'support', 'analytics', 'accounting', 'automation', 'ai', 'integrations']
};

export const appRegistry = {
  crm: { id: 'crm', name: 'CRM & Vendas', shortName: 'CRM', route: '/crm', permissionPrefix: 'crm', requiredLicense: 'crm', status: 'active', testId: 'module-crm' },
  erp: { id: 'erp', name: 'ERP & Vendas', shortName: 'ERP', route: '/vendas', permissionPrefix: 'erp', requiredLicense: 'erp', status: 'active', testId: 'module-erp' },
  finance: { id: 'finance', name: 'Financeiro', shortName: 'Financeiro', route: '/financeiro', permissionPrefix: 'finance', requiredLicense: 'finance', status: 'active', testId: 'module-finance' },
  marketing: { id: 'marketing', name: 'Marketing Digital', shortName: 'Marketing', route: '/marketing', permissionPrefix: 'marketing', requiredLicense: 'marketing', status: 'active', testId: 'module-marketing' },
  support: { id: 'support', name: 'SAC & Suporte 360º', shortName: 'SAC', route: '/sac', permissionPrefix: 'support', requiredLicense: 'support', status: 'active', testId: 'module-support' },
  analytics: { id: 'analytics', name: 'BI & Inteligência Analítica', shortName: 'BI', route: '/bi', permissionPrefix: 'analytics', requiredLicense: 'analytics', status: 'active', testId: 'module-analytics' },
  accounting: { id: 'accounting', name: 'Contabilidade & Fiscal', shortName: 'Contabilidade', route: '/contabilidade', permissionPrefix: 'accounting', requiredLicense: 'accounting', status: 'active', testId: 'module-accounting' },
  automation: { id: 'automation', name: 'Automação & Workflows', shortName: 'Automação', route: '/automacao', permissionPrefix: 'automation', requiredLicense: 'automation', status: 'implementing', testId: 'module-automation' },
  ai: { id: 'ai', name: 'Disk AI (Copilot Operacional)', shortName: 'Disk AI', route: '/ia', permissionPrefix: 'ai', requiredLicense: 'ai', status: 'active', testId: 'module-ai' },
  integrations: { id: 'integrations', name: 'Hub de Integrações & APIs', shortName: 'Integrações', route: '/integracoes', permissionPrefix: 'integrations', requiredLicense: 'integrations', status: 'active', testId: 'module-integrations' }
};
