export const commercialPlans = {
  standard: {
    id: 'standard',
    name: 'Standard',
    tagline: 'Organize sua operação',
    badge: 'Essencial',
    description: 'Para produtores que precisam centralizar clientes, gestão administrativa e financeiro em um único ambiente.',
    outcome: 'MAIS ORGANIZAÇÃO. MAIS CONTROLE. MENOS PLANILHAS.',
    audience: 'Produtores estruturando a operação comercial e centralizando controles básicos.',
    modules: ['crm', 'erp', 'finance'],
    featured: false,
    color: 'from-slate-600 to-slate-800',
    accentColor: 'text-slate-400',
    borderColor: 'border-slate-300 dark:border-slate-700',
    benefits: [
      'Centralize seus clientes e contatos',
      'Organize fornecedores e contratos',
      'Controle contas a pagar e receber',
      'Acompanhe seu fluxo de caixa em tempo real',
      'Gerencie oportunidades e pipeline comercial',
      'Reduza controles paralelos em planilhas'
    ],
    results: [
      'Organização de clientes e leads',
      'Centralização de informações financeiras',
      'Controle básico de fluxo de caixa',
      'Gestão de fornecedores e parceiros',
      'Acompanhamento de oportunidades comerciais',
      'Redução de processos manuais'
    ],
    moduleDetails: [
      { id: 'crm', name: 'CRM & Vendas', desc: 'Centralize clientes, histórico de compras e oportunidades comerciais.' },
      { id: 'erp', name: 'ERP Empresarial', desc: 'Organize processos administrativos, fornecedores e contratos da operação.' },
      { id: 'finance', name: 'Financeiro', desc: 'Fluxo de caixa, conciliação e controle de repasses de vendas.' }
    ],
    cta: {
      visitor: 'Escolher Standard',
      current: 'Seu plano atual',
      upgrade: 'Plano base'
    },
    pricingNote: 'Consulte condições comerciais'
  },

  advanced: {
    id: 'advanced',
    name: 'Advanced',
    tagline: 'Venda mais e tenha mais controle',
    badge: 'MAIS RECOMENDADO',
    description: 'Para produtores que querem crescer utilizando marketing ativo, atendimento estruturado e inteligência de dados.',
    outcome: 'MAIS VENDAS. MAIS RELACIONAMENTO. MAIS INTELIGÊNCIA.',
    audience: 'Operações em crescimento, múltiplos eventos e necessidade de impulsionar receita e conversão.',
    modules: ['crm', 'erp', 'finance', 'marketing', 'support', 'analytics'],
    featured: true,
    color: 'from-[#F97316] to-amber-600',
    accentColor: 'text-[#F97316]',
    borderColor: 'border-[#F97316] shadow-lg shadow-[#F97316]/15 ring-2 ring-[#F97316]/30',
    benefits: [
      'Tudo incluído no plano Standard',
      'Crie campanhas e trabalhe sua base de clientes',
      'Utilize WhatsApp Marketing e E-mail Marketing',
      'Crie cupons, promoções e rastreamento por UTMs',
      'Estruture atendimento ao cliente com SLA e SAC 360º',
      'Analise KPIs, funil de conversão e performance de receita'
    ],
    results: [
      'Aumento nas vendas com disparos e campanhas',
      'Recuperação de carrinhos e checkouts incompletos',
      'Atendimento omnicanal com gestão de chamados',
      'Visão 360º de compras e tickets do cliente',
      'Forecast de receita e inteligência de conversão',
      'Acompanhamento de canais de aquisição'
    ],
    moduleDetails: [
      { id: 'crm', name: 'CRM & Vendas', desc: 'Histórico unificado, segmentação de público e pipelines comerciais.' },
      { id: 'erp', name: 'ERP Empresarial', desc: 'Gestão da estrutura empresarial, contratos e operação de eventos.' },
      { id: 'finance', name: 'Financeiro', desc: 'Controle consolidado, conciliação de repasses e extratos.' },
      { id: 'marketing', name: 'Marketing Digital', desc: 'Campanhas de WhatsApp, e-mails promocionais, cupons e UTMs.' },
      { id: 'support', name: 'SAC 360º', desc: 'Atendimento integrado, gestão de chamados e controle de SLA.' },
      { id: 'analytics', name: 'BI & Analytics', desc: 'Dashboards executivos, funis de conversão e forecast de vendas.' }
    ],
    cta: {
      visitor: 'Escolher Advanced',
      current: 'Seu plano atual',
      upgrade: 'Fazer upgrade para Advanced'
    },
    pricingNote: 'Consulte condições comerciais'
  },

  expert: {
    id: 'expert',
    name: 'Expert',
    tagline: 'Automatize e escale sua operação',
    badge: 'Estrutura Completa',
    description: 'Para operações profissionais que precisam integrar sistemas, automatizar processos e utilizar inteligência para tomar decisões.',
    outcome: 'MAIS AUTOMAÇÃO. MAIS INTELIGÊNCIA. MAIS ESCALA.',
    audience: 'Grandes produtoras, grupos de entretenimento e eventos de grande porte exigindo automação e alta capacidade.',
    modules: ['crm', 'erp', 'finance', 'marketing', 'support', 'analytics', 'accounting', 'automation', 'ai', 'integrations'],
    featured: false,
    color: 'from-purple-600 to-indigo-700',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/50 dark:border-purple-500/30',
    benefits: [
      'Tudo incluído no plano Advanced',
      'Automatize processos e workflows com gatilhos em tempo real',
      'Utilize Inteligência Artificial para análises e previsões',
      'Integre sistemas externos com APIs dedicadas e Webhooks',
      'Estruture gestão contábil integrada e emissão de NF-e em lote',
      'Centralize documentos fiscais e amplie a capacidade operacional'
    ],
    results: [
      'Eliminação de tarefas manuais repetitivas',
      'Workflows acionados por eventos comerciais',
      'Geração de insights preditivos com Disk AI',
      'Emissão automatizada de notas fiscais (NF-e)',
      'Conexão bidirecional via Webhooks e APIs corporativas',
      'Escalabilidade operacional sem inchaço de equipe'
    ],
    moduleDetails: [
      { id: 'crm', name: 'CRM & Vendas', desc: 'Pipelines customizados e regras de score comercial.' },
      { id: 'erp', name: 'ERP Empresarial', desc: 'Gestão de múltiplos centros de custos e contratos.' },
      { id: 'finance', name: 'Financeiro', desc: 'Controle financeiro avançado e conciliação bancária.' },
      { id: 'marketing', name: 'Marketing Digital', desc: 'Automações de jornada e clusters inteligentes.' },
      { id: 'support', name: 'SAC 360º', desc: 'Atendimento omnichannel avançado com bots.' },
      { id: 'analytics', name: 'BI & Analytics', desc: 'Relatórios preditivos e análise multidimensional.' },
      { id: 'accounting', name: 'Contabilidade & NF-e', desc: 'Fiscal integrado com emissão em lote e plano de contas.' },
      { id: 'automation', name: 'Automação & Workflows', desc: 'Triggers, webhooks e ações automáticas sem código.' },
      { id: 'ai', name: 'Disk AI (Copilot)', desc: 'Assistente inteligente e precificação dinâmica.' },
      { id: 'integrations', name: 'Hub de APIs & Conectores', desc: 'Acesso completo a APIs REST e Webhooks para devs.' }
    ],
    cta: {
      visitor: 'Escolher Expert',
      current: 'Seu plano atual',
      upgrade: 'Fazer upgrade para Expert'
    },
    pricingNote: 'Consulte condições comerciais'
  }
};

export const planGoals = [
  {
    id: 'goal-organize',
    title: 'Quero organizar minha empresa',
    description: 'Centralizar clientes, financeiro e processos administrativos.',
    recommendedPlan: 'standard',
    planName: 'STANDARD',
    badge: 'Organização',
    ctaText: 'Conhecer Standard'
  },
  {
    id: 'goal-grow',
    title: 'Quero aumentar minhas vendas',
    description: 'Utilizar campanhas, atendimento e dados para gerar novas oportunidades.',
    recommendedPlan: 'advanced',
    planName: 'ADVANCED',
    badge: 'Crescimento',
    ctaText: 'Conhecer Advanced'
  },
  {
    id: 'goal-scale',
    title: 'Quero automatizar minha operação',
    description: 'Integrar sistemas, reduzir tarefas manuais e utilizar inteligência para escalar.',
    recommendedPlan: 'expert',
    planName: 'EXPERT',
    badge: 'Automação & Escala',
    ctaText: 'Conhecer Expert'
  }
];

export const commercialBenefits = [
  {
    id: 'centralization',
    title: 'Centralização',
    description: 'Clientes, financeiro, gestão e operação no mesmo ecossistema integrado.',
    icon: 'Layers'
  },
  {
    id: 'productivity',
    title: 'Mais Produtividade',
    description: 'Reduza planilhas, controles paralelos e tarefas manuais repetitivas.',
    icon: 'TrendingUp'
  },
  {
    id: 'sales',
    title: 'Mais Vendas',
    description: 'Use relacionamento, campanhas e dados para gerar novas oportunidades.',
    icon: 'Zap'
  },
  {
    id: 'control',
    title: 'Mais Controle',
    description: 'Acompanhe financeiro, clientes, atendimento e operação em tempo real.',
    icon: 'ShieldCheck'
  },
  {
    id: 'intelligence',
    title: 'Mais Inteligência',
    description: 'Transforme dados brutos da operação em decisões estratégicas.',
    icon: 'BrainCircuit'
  },
  {
    id: 'scale',
    title: 'Mais Escala',
    description: 'Prepare sua estrutura para crescer sem elevar a complexidade proporcionalmente.',
    icon: 'Workflow'
  }
];

export const comparisonCategories = [
  {
    category: 'Clientes & Vendas',
    items: [
      { name: 'CRM & Gestão de Clientes', standard: true, advanced: true, expert: true, desc: 'Centralize contatos, histórico e cadastro unificado.' },
      { name: 'Pipeline Comercial & Leads', standard: true, advanced: true, expert: true, desc: 'Acompanhe oportunidades de venda e etapas de fechamento.' },
      { name: 'Controle de Ingressos & Pedidos', standard: true, advanced: true, expert: true, desc: 'Gestão integrada de vendas online e presenciais.' }
    ]
  },
  {
    category: 'Gestão & Financeiro',
    items: [
      { name: 'ERP & Gestão Empresarial', standard: true, advanced: true, expert: true, desc: 'Cadastros de fornecedores, contratos e suprimentos.' },
      { name: 'Contas a Pagar & Receber', standard: true, advanced: true, expert: true, desc: 'Fluxo financeiro com centros de custos.' },
      { name: 'Conciliação de Repasses & Taxas', standard: true, advanced: true, expert: true, desc: 'Visão transparente das taxas e saldos a liberar.' }
    ]
  },
  {
    category: 'Crescimento & Relacionamento',
    items: [
      { name: 'Marketing Ativo & Campanhas', standard: false, advanced: true, expert: true, desc: 'Disparos promocionais e segmentação da base.' },
      { name: 'WhatsApp Marketing & E-mail', standard: false, advanced: true, expert: true, desc: 'Comunicação direta com compradores.' },
      { name: 'Cupons, Promoções & UTMs', standard: false, advanced: true, expert: true, desc: 'Rastreamento de origens de tráfego e conversão.' },
      { name: 'SAC 360º & Gestão de Chamados', standard: false, advanced: true, expert: true, desc: 'Atendimento estruturado com controle de SLA.' }
    ]
  },
  {
    category: 'Inteligência & Dados',
    items: [
      { name: 'BI Executivo & Forecast', standard: false, advanced: true, expert: true, desc: 'Projeção de receitas e análise histórica.' },
      { name: 'Funil de Conversão em Tempo Real', standard: false, advanced: true, expert: true, desc: 'Métricas de visualização até pagamento aprovado.' }
    ]
  },
  {
    category: 'Automação & Escala Corporativa',
    items: [
      { name: 'Contabilidade & NF-e em Lote', standard: false, advanced: false, expert: true, desc: 'Emissão fiscal integrada e plano de contas.' },
      { name: 'Automação de Workflows & Triggers', standard: false, advanced: false, expert: true, desc: 'Gatilhos automáticos em eventos de negócio.' },
      { name: 'Disk AI (Copilot Operacional)', standard: false, advanced: false, expert: true, desc: 'Recomendações e análise inteligente de tendências.' },
      { name: 'Hub de APIs REST & Webhooks', standard: false, advanced: false, expert: true, desc: 'Conectores externos para desenvolvedores e integrações.' }
    ]
  }
];

export const commercialFaqs = [
  {
    q: 'Qual plano é ideal para a minha operação?',
    a: 'O Standard é ideal para quem está organizando clientes e finanças. O Advanced é perfeito para quem quer acelerar vendas e estruturar marketing/atendimento. O Expert é a solução definitiva para operações de grande escala que necessitam de automação, integrações via API e contabilidade integrada.'
  },
  {
    q: 'Posso mudar de plano depois?',
    a: 'Sim. A plataforma DiskHub foi construída para acompanhar sua evolução. O upgrade é imediato e preserva 100% do seu histórico e dados cadastrados.'
  },
  {
    q: 'O upgrade apaga meus dados ou configurações?',
    a: 'Não. Ao fazer upgrade, os novos módulos e recursos são imediatamente liberados na sua conta sem qualquer perda de dados.'
  },
  {
    q: 'Posso adicionar mais usuários à equipe?',
    a: 'Sim. Cada plano possui uma cota de membros incluída e você pode contratar pacotes de usuários adicionais como add-on a qualquer momento.'
  },
  {
    q: 'Existem serviços de implantação e treinamento?',
    a: 'Sim. Disponibilizamos onboarding assistido, treinamento para equipe e consultoria operacional especializada para produtores de eventos.'
  },
  {
    q: 'O DiskHub integra com outros sistemas e ferramentas?',
    a: 'Sim. No plano Expert você conta com API REST completa, webhooks em tempo real e conectores prontos para o seu ecossistema de software.'
  }
];
