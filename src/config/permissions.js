export const permissionsCatalog = {
  crm: {
    name: 'CRM & Pipeline',
    permissions: [
      { id: 'crm.clients.read', label: 'Visualizar clientes e leads' },
      { id: 'crm.clients.create', label: 'Criar clientes e contatos' },
      { id: 'crm.clients.update', label: 'Editar cadastros de clientes' },
      { id: 'crm.clients.delete', label: 'Excluir clientes e contatos' },
      { id: 'crm.pipeline.manage', label: 'Movimentar e alterar etapas do funil' }
    ]
  },
  erp: {
    name: 'ERP & Vendas',
    permissions: [
      { id: 'erp.orders.read', label: 'Consultar pedidos e faturamento de eventos' },
      { id: 'erp.orders.create', label: 'Emitir pedidos manuais e ordens de venda' },
      { id: 'erp.orders.cancel', label: 'Cancelar pedidos e ingressos' },
      { id: 'erp.pdv.operate', label: 'Operar caixas e fechamento de PDV' }
    ]
  },
  finance: {
    name: 'Financeiro & Fluxo de Caixa',
    permissions: [
      { id: 'finance.cashflow.read', label: 'Visualizar fluxo de caixa consolidado' },
      { id: 'finance.dre.read', label: 'Acessar Demonstrativo de Resultados (DRE)' },
      { id: 'finance.repasses.approve', label: 'Aprovar repasses a produtores e fornecedores' },
      { id: 'finance.accounts.manage', label: 'Gerenciar contas bancárias e conciliação' }
    ]
  },
  marketing: {
    name: 'Marketing & Campanhas',
    permissions: [
      { id: 'marketing.campaigns.read', label: 'Visualizar campanhas e relatórios' },
      { id: 'marketing.campaigns.create', label: 'Criar rascunhos de campanhas' },
      { id: 'marketing.campaigns.publish', label: 'Disparar WhatsApp e E-mail em massa' },
      { id: 'marketing.pixels.manage', label: 'Gerenciar pixels de rastreamento (Meta, GA4)' }
    ]
  },
  support: {
    name: 'SAC & Suporte 360º',
    permissions: [
      { id: 'support.tickets.read', label: 'Visualizar chamados e tickets de suporte' },
      { id: 'support.tickets.create', label: 'Abrir novos chamados de atendimento' },
      { id: 'support.tickets.assign', label: 'Atribuir tickets a atendentes da equipe' },
      { id: 'support.tickets.close', label: 'Concluir tickets e registrar CSAT' },
      { id: 'support.refunds.approve', label: 'Aprovar solicitações de estorno de compras' }
    ]
  },
  analytics: {
    name: 'BI & Inteligência Analítica',
    permissions: [
      { id: 'analytics.dashboards.read', label: 'Acessar painéis e gráficos executivos' },
      { id: 'analytics.forecast.read', label: 'Visualizar projeções de receita e vendas' },
      { id: 'analytics.reports.export', label: 'Exportar relatórios em Excel e PDF' }
    ]
  },
  accounting: {
    name: 'Contabilidade & Fiscal',
    permissions: [
      { id: 'accounting.nfe.issue', label: 'Emitir notas fiscais eletrônicas (NF-e)' },
      { id: 'accounting.reports.read', label: 'Acessar livros contábeis e balancetes' }
    ]
  },
  automation: {
    name: 'Automação & Workflows',
    permissions: [
      { id: 'automation.workflows.manage', label: 'Criar e acionar automações e triggers' }
    ]
  },
  administration: {
    name: 'Administração da Empresa',
    permissions: [
      { id: 'users.read', label: 'Visualizar membros da equipe' },
      { id: 'users.invite', label: 'Convidar novos membros' },
      { id: 'users.manage', label: 'Alterar papéis e permissões de usuários' },
      { id: 'users.suspend', label: 'Suspender ou remover usuários da conta' },
      { id: 'subscription.manage', label: 'Gerenciar contrato, planos e cobrança' },
      { id: 'audit.read', label: 'Consultar trilha de auditoria de acessos' }
    ]
  }
};
