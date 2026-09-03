export const defaultRoles = {
  owner: {
    id: 'owner',
    name: 'Owner (Proprietário)',
    description: 'Acesso total à gestão da empresa, assinatura, faturamento e configurações.',
    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
    canManageBilling: true,
    canManageUsers: true,
    canDeleteAccount: true,
    permissions: ['*']
  },
  admin: {
    id: 'admin',
    name: 'Administrador',
    description: 'Gerencia equipe, parâmetros operacionais e configurações dos módulos contratados.',
    badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    canManageBilling: false,
    canManageUsers: true,
    canDeleteAccount: false,
    permissions: [
      'users.*',
      'crm.*',
      'erp.*',
      'finance.*',
      'marketing.*',
      'support.*',
      'analytics.*',
      'accounting.*',
      'automation.*',
      'audit.read'
    ]
  },
  manager: {
    id: 'manager',
    name: 'Gestor (Manager)',
    description: 'Supervisiona equipes, acompanha metas, aprova repasses e emite relatórios.',
    badgeColor: 'bg-orange-100 text-[#F97316] dark:bg-orange-500/20',
    canManageBilling: false,
    canManageUsers: false,
    canDeleteAccount: false,
    permissions: [
      'crm.clients.read',
      'crm.clients.create',
      'crm.clients.update',
      'crm.pipeline.manage',
      'erp.orders.read',
      'erp.orders.create',
      'finance.cashflow.read',
      'finance.repasses.approve',
      'marketing.campaigns.read',
      'marketing.campaigns.create',
      'support.tickets.read',
      'support.tickets.assign',
      'analytics.dashboards.read'
    ]
  },
  analyst: {
    id: 'analyst',
    name: 'Analista de Operações',
    description: 'Analisa indicadores, gera forecast, exporta relatórios e acompanha métricas.',
    badgeColor: 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400',
    canManageBilling: false,
    canManageUsers: false,
    canDeleteAccount: false,
    permissions: [
      'crm.clients.read',
      'finance.cashflow.read',
      'finance.dre.read',
      'analytics.dashboards.read',
      'analytics.forecast.read',
      'analytics.reports.export'
    ]
  },
  operator: {
    id: 'operator',
    name: 'Operador / Atendente',
    description: 'Executa atividades diárias de atendimento no SAC, caixa de PDV e rotinas comerciais.',
    badgeColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    canManageBilling: false,
    canManageUsers: false,
    canDeleteAccount: false,
    permissions: [
      'crm.clients.read',
      'support.tickets.read',
      'support.tickets.create',
      'support.tickets.update',
      'erp.orders.create'
    ]
  },
  viewer: {
    id: 'viewer',
    name: 'Visualizador (Viewer)',
    description: 'Acesso estritamente para consulta e leitura, sem permissão de edição ou aprovação.',
    badgeColor: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
    canManageBilling: false,
    canManageUsers: false,
    canDeleteAccount: false,
    permissions: [
      'crm.clients.read',
      'erp.orders.read',
      'finance.cashflow.read',
      'analytics.dashboards.read'
    ]
  }
};
