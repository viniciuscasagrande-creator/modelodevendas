export const products = {
  crm: {
    id: 'crm',
    name: 'CRM Comercial & Relacionamento',
    shortName: 'CRM',
    category: 'Vendas e Relacionamento',
    headline: 'Transforme contatos em relacionamentos e oportunidades em vendas.',
    description: 'Centralize leads, clientes, negociações, tarefas e histórico comercial em uma única plataforma integrada ao ecossistema DiskHub.',
    icon: 'Users',
    minimumPlan: 'standard',
    route: '/crm',
    commercialRoute: '/produtos/crm',
    benefits: [
      { title: 'Centralização Total', description: 'Todos os contatos, clientes e oportunidades organizados em um único lugar.' },
      { title: 'Alta Produtividade', description: 'Menos controles paralelos e eliminação de planilhas manuais.' },
      { title: 'Visibilidade em Tempo Real', description: 'Acompanhe cada negociação e etapa do funil instantaneamente.' },
      { title: 'Conversão Maximizar', description: 'Identifique onde as oportunidades estão sendo perdidas e aja rápido.' }
    ],
    features: [
      { title: 'Leads & Prospecção', description: 'Captação e qualificação ágil de novos produtores e parceiros.', icon: 'UserCheck' },
      { title: 'Pipeline Kanban', description: 'Visualize e arraste negociações pelas etapas de venda.', icon: 'Kanban' },
      { title: 'Histórico 360º', description: 'Timeline completa com todas as interações e compras.', icon: 'History' },
      { title: 'Metas & Follow-up', description: 'Lembretes automáticos e gestão de metas da equipe comercial.', icon: 'Target' }
    ],
    flow: ['Lead', 'Qualificação', 'Oportunidade', 'Proposta', 'Negociação', 'Cliente'],
    integrations: ['Marketing', 'Financeiro', 'SAC', 'BI & Analytics'],
    metrics: ['Taxa de Conversão', 'Valor do Pipeline', 'Ticket Médio', 'Forecast de Fechamento', 'Novos Clientes'],
    faq: [
      { q: 'Posso contratar apenas o módulo de CRM?', a: 'Sim, o CRM faz parte do plano Standard e também pode ser contratado de forma independente.' },
      { q: 'Quantos contatos posso cadastrar?', a: 'Não há limite rígido de contatos; o armazenamento escala com a sua operação.' },
      { q: 'Possui integração com WhatsApp?', a: 'Sim, através do nosso add-on de WhatsApp Business integrado.' }
    ]
  },
  erp: {
    id: 'erp',
    name: 'ERP Empresarial & Gestão',
    shortName: 'ERP',
    category: 'Gestão',
    headline: 'Controle sua operação empresarial em um único sistema centralizado.',
    description: 'Gerencie cadastros, compras, pedidos, contratos e centros de custo de forma nativa e descomplicada.',
    icon: 'Boxes',
    minimumPlan: 'standard',
    route: '/vendas',
    commercialRoute: '/produtos/erp',
    benefits: [
      { title: 'Operação Unificada', description: 'Conecte vendas, compras, estoque e financeiro sem redundâncias.' },
      { title: 'Redução de Custos', description: 'Controle centros de custos e contratos para evitar desperdícios.' },
      { title: 'Governança', description: 'Permissões por usuário, trilhas de auditoria e segurança dos dados.' },
      { title: 'Conformidade', description: 'Mantenha cadastros de fornecedores e prestadores organizados.' }
    ],
    features: [
      { title: 'Controle de Fornecedores', description: 'Histórico de contratações e pagamentos a terceiros.', icon: 'Truck' },
      { title: 'Gestão de Contratos', description: 'Alertas de vencimento e controle de reajustes.', icon: 'FileText' },
      { title: 'Centros de Custo', description: 'Alocação precisa de receitas e despesas por evento ou área.', icon: 'PieChart' },
      { title: 'Pedidos & Vendas', description: 'Rastreabilidade de ordens e pedidos comerciais.', icon: 'ShoppingCart' }
    ],
    flow: ['Cadastro', 'Pedido', 'Compra', 'Fornecedor', 'Financeiro', 'Gestão'],
    integrations: ['Financeiro', 'Contabilidade', 'Estoque', 'Eventos'],
    metrics: ['Gasto por Fornecedor', 'Ordens em Aberto', 'Margem Operacional', 'Custos por Centro'],
    faq: [
      { q: 'O ERP substitui planilhas de compras?', a: 'Sim, centraliza requisições, cotações e ordens de compra.' },
      { q: 'Como funciona o controle de centros de custo?', a: 'Você pode criar centros por evento, filial ou departamento.' }
    ]
  },
  financeiro: {
    id: 'financeiro',
    name: 'Financeiro Avançado & DRE',
    shortName: 'Financeiro',
    category: 'Financeiro',
    headline: 'Tenha controle total e previsibilidade financeira da sua operação.',
    description: 'Gestão de contas a pagar, receber, fluxo de caixa, conciliação bancária automática e demonstrativo de resultados.',
    icon: 'WalletCards',
    minimumPlan: 'standard',
    route: '/financeiro',
    commercialRoute: '/produtos/financeiro',
    benefits: [
      { title: 'Visão de Caixa em Tempo Real', description: 'Saldo consolidado de bancos, caixas físicos e gateway digital.' },
      { title: 'Conciliação Automática', description: 'Identifique recebimentos de PIX, cartão e boletos instantaneamente.' },
      { title: 'DRE Gerencial', description: 'Demonstrativo completo de receitas, custos diretos e lucro operacional.' },
      { title: 'Segurança nos Repasses', description: 'Cálculo transparente de taxas, deduções e valores líquidos.' }
    ],
    features: [
      { title: 'Contas a Pagar & Receber', description: 'Agenda de vencimentos com baixa manual ou automatizada.', icon: 'CreditCard' },
      { title: 'Conciliação de Gateway', description: 'Batimento automático entre ingressos vendidos e valores transferidos.', icon: 'CheckCircle' },
      { title: 'DRE & Demonstrativos', description: 'Relatório estruturado de desempenho financeiro do período.', icon: 'TrendingUp' },
      { title: 'Múltiplas Contas', description: 'Controle contas correntes e contas digitais em um painel.', icon: 'Landmark' }
    ],
    flow: ['Lançamento', 'Conciliação', 'Aprovação', 'Liquidação', 'DRE', 'Previsão'],
    integrations: ['Contabilidade', 'Vendas', 'CRM', 'BI'],
    metrics: ['Fluxo de Caixa', 'Inadimplência', 'Lucro Operacional', 'Prazo Médio de Recebimento'],
    faq: [
      { q: 'A conciliação suporta PIX e cartão?', a: 'Sim, o sistema concilia automaticamente recebimentos do gateway e arquivos bancários.' }
    ]
  },
  marketing: {
    id: 'marketing',
    name: 'Marketing & Campanhas Digitais',
    shortName: 'Marketing',
    category: 'Marketing',
    headline: 'Transforme dados de compradores em campanhas inteligentes que geram vendas.',
    description: 'Disparo de WhatsApp, E-mail marketing, pixels de conversão, UTM tracking e segmentação avançada de público.',
    icon: 'Megaphone',
    minimumPlan: 'advanced',
    route: '/marketing',
    commercialRoute: '/produtos/marketing',
    benefits: [
      { title: 'Engajamento Direto', description: 'Fale com o comprador no canal preferido dele com alta taxa de abertura.' },
      { title: 'Recuperação de Carrinho', description: 'Campanhas automáticas para quem iniciou a compra e não concluiu.' },
      { title: 'Públicos Semelhantes', description: 'Exporte listas segmentadas para Meta Ads e Google Ads.' },
      { title: 'ROI Comprovado', description: 'Rastreamento por UTM para saber exatamente de onde vieram as vendas.' }
    ],
    features: [
      { title: 'Disparo WhatsApp & E-mail', description: 'Comunicação em massa com personalização por evento.', icon: 'Send' },
      { title: 'Pixels Multi-plataforma', description: 'Integração com Meta Pixel, GA4, Google Ads e TikTok.', icon: 'Code' },
      { title: 'Cupons & Descontos', description: 'Crie cupons dinâmicos com limite de uso e validade.', icon: 'Tag' },
      { title: 'Segmentação RFV', description: 'Classifique clientes por Recência, Frequência e Valor.', icon: 'Filter' }
    ],
    flow: ['Público', 'Segmentação', 'Campanha', 'Disparo', 'Conversão', 'Remarketing'],
    integrations: ['CRM', 'Eventos', 'BI & Analytics', 'SAC'],
    metrics: ['Taxa de Abertura', 'Conversões por UTM', 'ROAS', 'Receita Gerada por Campanha'],
    faq: [
      { q: 'O envio de WhatsApp exige plano adicional?', a: 'O módulo inclui mensagens padrão; volumes elevados utilizam o add-on de WhatsApp.' }
    ]
  },
  sac: {
    id: 'sac',
    name: 'SAC 360º & Suporte ao Cliente',
    shortName: 'SAC',
    category: 'Atendimento',
    headline: 'Centralize atendimento, ouvidoria e solicitações de pós-venda.',
    description: 'Atendimento omnicanal com gestão de tickets, controle de SLA, central de estornos e visão unificada do cliente.',
    icon: 'Headphones',
    minimumPlan: 'advanced',
    route: '/sac',
    commercialRoute: '/produtos/sac',
    benefits: [
      { title: 'Resolução Rápida', description: 'Diminua o tempo de resposta e aumente a satisfação do cliente.' },
      { title: 'Histórico Integrado', description: 'Ao atender, veja compras anteriores, ingressos e reclamações.' },
      { title: 'Tratamento de Estornos', description: 'Fluxo em conformidade com o CDC integrado diretamente ao Financeiro.' },
      { title: 'Controle de SLA', description: 'Monitore chamados com risco de estouro de prazo com alertas visuais.' }
    ],
    features: [
      { title: 'Gestão de Tickets', description: 'Triagem e distribuição inteligente de solicitações.', icon: 'Inbox' },
      { title: 'SLA Automático', description: 'Contagem regressiva de tempo de resposta e priorização.', icon: 'Clock' },
      { title: 'Central de Estornos', description: 'Aprovação e liquidação de cancelamentos com 1 clique.', icon: 'RotateCcw' },
      { title: 'Avaliação CSAT', description: 'Pesquisas automáticas de satisfação após fechamento do ticket.', icon: 'Star' }
    ],
    flow: ['Entrada', 'Triagem', 'Atendimento', 'Solução', 'CSAT', 'Encerramento'],
    integrations: ['CRM', 'Financeiro', 'Eventos', 'Marketing'],
    metrics: ['Tempo Médio de Atendimento (TMA)', 'SLA Cumprido', 'CSAT Médio', 'Chamados Abertos'],
    faq: [
      { q: 'Integra com canais de redes sociais?', a: 'Sim, reúne solicitações de formulários web, e-mails e WhatsApp.' }
    ]
  },
  bi: {
    id: 'bi',
    name: 'BI Estratégico & Analytics',
    shortName: 'BI & Analytics',
    category: 'Dados',
    headline: 'Transforme sua operação em decisões precisas orientadas por dados.',
    description: 'Dashboards executivos, projeções preditivas, curvas de vendas, ocupação de setores e inteligência de mercado.',
    icon: 'BarChart3',
    minimumPlan: 'advanced',
    route: '/bi',
    commercialRoute: '/produtos/bi',
    benefits: [
      { title: 'Previsibilidade Comercial', description: 'Saiba quando os lotes devem esgotar com modelos estatísticos.' },
      { title: 'Precificação Inteligente', description: 'Identifique o preço ótimo de cada setor baseado na demanda.' },
      { title: 'Análise de Cohort', description: 'Compreenda a fidelidade e retenção dos seus compradores ao longo do tempo.' },
      { title: 'Decisão Rápida', description: 'Dashboards executivos com atualização em tempo real.' }
    ],
    features: [
      { title: 'Dashboards Customizáveis', description: 'Gráficos interativos com exportação para PDF e planilhas.', icon: 'Layout' },
      { title: 'Forecast de Receita', description: 'Projeções de fechamento baseadas em histórico de edições passadas.', icon: 'TrendingUp' },
      { title: 'Mapa de Calor de Vendas', description: 'Geolocalização dos compradores por cidade e bairro.', icon: 'MapPin' },
      { title: 'Curvas de Conversão', description: 'Funil detalhado de visualização até o checkout concluído.', icon: 'Activity' }
    ],
    flow: ['Coleta', 'Tratamento', 'Modelagem', 'Visualização', 'Insights', 'Ação'],
    integrations: ['Vendas', 'CRM', 'Marketing', 'Financeiro'],
    metrics: ['Taxa de Conversão por Canal', 'Ticket Médio Ponderado', 'LTV do Comprador', 'CAC Médio'],
    faq: [
      { q: 'Posso exportar os relatórios?', a: 'Sim, em formatos PDF executivo, Excel e CSV com dados brutos.' }
    ]
  },
  contabilidade: {
    id: 'contabilidade',
    name: 'Contabilidade & Fiscal Integrada',
    shortName: 'Contabilidade',
    category: 'Administração',
    headline: 'Organize sua gestão contábil e fiscal diretamente dentro da plataforma.',
    description: 'Emissão automática de notas fiscais, retenções de impostos (ISS, PIS, COFINS), plano de contas e conciliação fiscal.',
    icon: 'Calculator',
    minimumPlan: 'expert',
    route: '/contabilidade',
    commercialRoute: '/produtos/contabilidade',
    benefits: [
      { title: 'Zero Burocracia', description: 'Emissão de NF-e em lote diretamente conectada à venda de ingressos.' },
      { title: 'Cálculo de Retenções', description: 'Apuração correta de tributos municipais e federais de entretenimento.' },
      { title: 'Livro Caixa & Balancete', description: 'Classificação contábil automática de receitas e despesas.' },
      { title: 'Exportação para Contadores', description: 'Arquivos no formato padrão do seu escritório contábil.' }
    ],
    features: [
      { title: 'Emissão em Lote', description: 'Emita milhares de notas fiscais com apenas um clique.', icon: 'FileCheck' },
      { title: 'Apuração Tributária', description: 'Simulação e cálculo de impostos incidentes sobre o bordero.', icon: 'Percent' },
      { title: 'Plano de Contas', description: 'Estruturação contábil compatível com as normas fiscais.', icon: 'BookOpen' },
      { title: 'Armazenamento de XMLs', description: 'Guarda segura de comprovantes fiscais por 5 anos.', icon: 'Archive' }
    ],
    flow: ['Venda', 'Cálculo Imposto', 'Autorização NF-e', 'Envio ao Cliente', 'Livro Fiscal'],
    integrations: ['Financeiro', 'ERP', 'Vendas'],
    metrics: ['Carga Tributária Efetiva', 'Notas Emitidas', 'Volume de Retenções', 'Inconsistências Fiscais'],
    faq: [
      { q: 'Suporta prefeituras de todo o Brasil?', a: 'Sim, compatível com os principais provedores de NFS-e do país.' }
    ]
  },
  automacao: {
    id: 'automacao',
    name: 'Automação & Workflows de Processos',
    shortName: 'Automação',
    category: 'Automação',
    headline: 'Automatize tarefas repetitivas e conecte toda a sua operação.',
    description: 'Crie gatilhos automáticos, rotinas de follow-up, notificações de bordero e alertas de risco sem escrever código.',
    icon: 'Workflow',
    minimumPlan: 'expert',
    route: '/automacao',
    commercialRoute: '/produtos/automacao',
    benefits: [
      { title: 'Economia de Tempo', description: 'Elimine tarefas manuais e foque na produção do evento.' },
      { title: 'Erros Zero', description: 'Gatilhos padronizados executam rotinas sem falhas humanas.' },
      { title: 'Resposta Imediata', description: 'Notifique gerentes quando propostas de alto valor chegarem.' },
      { title: 'Conectividade Ampla', description: 'Integre via webhooks com CRMs externos, ERPs e mensageria.' }
    ],
    features: [
      { title: 'Editor Visual de Fluxos', description: 'Construa lógica "Se isso acontecer, faça aquilo" intuitivamente.', icon: 'GitBranch' },
      { title: 'Triggers de Venda', description: 'Ações automáticas quando lotes atingirem 80% ou 100%.', icon: 'Zap' },
      { title: 'Webhooks Customizados', description: 'Envie dados estruturados para qualquer endpoint em tempo real.', icon: 'Webhook' },
      { title: 'Alertas de Fraude', description: 'Bloqueio automático de tentativas suspeitas de transação.', icon: 'ShieldAlert' }
    ],
    flow: ['Gatilho', 'Condição', 'Ação', 'Notificação', 'Registro'],
    integrations: ['Vendas', 'CRM', 'Marketing', 'Financeiro'],
    metrics: ['Tarefas Automatizadas', 'Horas Economizadas', 'Erros Prevenidos', 'Gatilhos Executados'],
    faq: [
      { q: 'Precisa saber programação?', a: 'Não, o editor é 100% visual e intuitivo em formato arrasta e solta.' }
    ]
  },
  ia: {
    id: 'ia',
    name: 'Disk AI — Inteligência Preditiva',
    shortName: 'IA',
    category: 'Dados',
    headline: 'Adicione assistentes cognitivos e inteligência preditiva à sua operação.',
    description: 'Modelos de machine learning treinados no mercado de eventos para otimização de preços, previsão de no-show e copilot comercial.',
    icon: 'BrainCircuit',
    minimumPlan: 'expert',
    route: '/bi',
    commercialRoute: '/produtos/ia',
    benefits: [
      { title: 'Otimização de Margem', description: 'Ajuste de preços de lotes no momento exato de pico de procura.' },
      { title: 'Copilot Estratégico', description: 'Pergunte em linguagem natural sobre finanças, vendas e produtores.' },
      { title: 'Detecção de Risco', description: 'Identifique previamente desvios de meta de vendas com tempo hábil.' },
      { title: 'Previsão de Consumo', description: 'Estime estoques de bar e portaria com base no clima e histórico.' }
    ],
    features: [
      { title: 'Chatbot Operacional Copilot', description: 'Assistente interno para consultas rápidas e insights.', icon: 'MessageCircle' },
      { title: 'Smart Pricing', description: 'Recomendações de valor por lote orientadas por elasticidade.', icon: 'Sparkles' },
      { title: 'Análise de Sentimento', description: 'Classificação automática de menções e feedbacks de clientes.', icon: 'Smile' },
      { title: 'Previsão de Ocupação', description: 'Modelagem com 94% de acurácia sobre a lotação final.', icon: 'Users' }
    ],
    flow: ['Ingestão de Dados', 'Processamento ML', 'Detecção de Padrões', 'Recomendação', 'Aplicação'],
    integrations: ['Vendas', 'BI', 'CRM', 'Marketing'],
    metrics: ['Ganho por Smart Pricing', 'Acurácia das Projeções', 'Tempo de Resposta do Copilot'],
    faq: [
      { q: 'A IA utiliza meus dados para treinar modelos externos?', a: 'Não, os dados são estritamente confidenciais e isolados por produtor.' }
    ]
  },
  integracoes: {
    id: 'integracoes',
    name: 'Hub de Integrações & APIs',
    shortName: 'Integrações',
    category: 'Administração',
    headline: 'Conecte o DiskHub a qualquer ferramenta que faça parte da sua operação.',
    description: 'API REST completa, webhooks com entrega garantida e conectores prontos para gateways, contabilidade e CRM.',
    icon: 'Plug',
    minimumPlan: 'expert',
    route: '/integracoes',
    commercialRoute: '/produtos/integracoes',
    benefits: [
      { title: 'Sem Silos de Informação', description: 'Dados sincronizados entre o DiskHub e suas plataformas existentes.' },
      { title: 'API Documentada', description: 'Documentação Swagger com exemplos em várias linguagens.' },
      { title: 'Webhooks Resilientes', description: 'Tentativas automáticas de entrega em caso de indisponibilidade.' },
      { title: 'Ecossistema Aberto', description: 'Crie soluções customizadas e ferramentas exclusivas para seu evento.' }
    ],
    features: [
      { title: 'API Keys & Permissões', description: 'Gerencie tokens com escopos de leitura e escrita específicos.', icon: 'Key' },
      { title: 'Logs de Requisições', description: 'Auditoria e monitoramento de latência e payload de chamadas.', icon: 'ListFilter' },
      { title: 'Conectores Prontos', description: 'Instale plugins de parceiros com apenas um clique.', icon: 'Blocks' },
      { title: 'Modo Sandbox', description: 'Ambiente de testes seguro para desenvolvimento de integrações.', icon: 'Terminal' }
    ],
    flow: ['Autenticação', 'Requisição', 'Validação', 'Processamento', 'Resposta', 'Log'],
    integrations: ['Todas as ferramentas do DiskHub'],
    metrics: ['Uptime da API (99,99%)', 'Requisições / Mês', 'Latência Média (<50ms)', 'Webhooks Entregues'],
    faq: [
      { q: 'A API possui limitação de chamadas?', a: 'O plano Expert inclui cota de 500.000 requisições mensais com alta performance.' }
    ]
  }
};
