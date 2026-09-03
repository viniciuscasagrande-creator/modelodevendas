import { subscriptionService } from './subscriptionService';
import { defaultRoles } from '../config/roles';

// Mock storage keys
const INVOICES_STORAGE_KEY = 'diskhub_invoices';
const USERS_STORAGE_KEY = 'diskhub_tenant_users';
const EVENTS_STORAGE_KEY = 'diskhub_subscription_events';

const DEFAULT_INVOICES = [
  {
    id: 'inv_1024',
    number: '#1024',
    date: '15/09/2026',
    amount: 'R$ 990,00',
    status: 'paid', // paid | open | pending | overdue | cancelled
    items: [
      { desc: 'Plano Advanced (Mensal)', amount: 'R$ 990,00' },
      { desc: 'Franquia de 10 Usuários', amount: 'Incluso' }
    ],
    pdfUrl: '#'
  },
  {
    id: 'inv_0988',
    number: '#0988',
    date: '15/08/2026',
    amount: 'R$ 990,00',
    status: 'paid',
    items: [
      { desc: 'Plano Advanced (Mensal)', amount: 'R$ 990,00' }
    ],
    pdfUrl: '#'
  },
  {
    id: 'inv_0941',
    number: '#0941',
    date: '15/07/2026',
    amount: 'R$ 490,00',
    status: 'paid',
    items: [
      { desc: 'Plano Standard (Mensal)', amount: 'R$ 490,00' }
    ],
    pdfUrl: '#'
  }
];

const DEFAULT_USERS = [
  {
    id: 'usr_001',
    name: 'Vinicius Casagrande',
    email: 'vinicius@primeshow.com.br',
    role: 'owner',
    status: 'active', // active | pending | suspended
    apps: ['crm', 'erp', 'finance', 'marketing', 'support', 'analytics'],
    department: 'Diretoria Executiva',
    avatar: 'VC',
    joinedAt: '15/01/2026',
    lastActive: 'Agora'
  },
  {
    id: 'usr_002',
    name: 'Mariana Souza',
    email: 'mariana.souza@primeshow.com.br',
    role: 'manager',
    status: 'active',
    apps: ['crm', 'erp', 'marketing', 'analytics'],
    department: 'Gerência Comercial',
    avatar: 'MS',
    joinedAt: '01/02/2026',
    lastActive: 'Hoje, 14:20'
  },
  {
    id: 'usr_003',
    name: 'Carlos Alberto Lima',
    email: 'carlos.lima@primeshow.com.br',
    role: 'operator',
    status: 'active',
    apps: ['support', 'crm'],
    department: 'Atendimento & SAC',
    avatar: 'CL',
    joinedAt: '10/02/2026',
    lastActive: 'Hoje, 11:05'
  },
  {
    id: 'usr_004',
    name: 'Ana Paula Costa',
    email: 'ana.costa@primeshow.com.br',
    role: 'analyst',
    status: 'active',
    apps: ['finance', 'analytics'],
    department: 'Controladoria & Finanças',
    avatar: 'AC',
    joinedAt: '18/02/2026',
    lastActive: 'Ontem'
  },
  {
    id: 'usr_005',
    name: 'Pedro Henrique Alves',
    email: 'pedro.alves@primeshow.com.br',
    role: 'operator',
    status: 'pending', // Convite pendente
    apps: ['erp'],
    department: 'Operações de Eventos',
    avatar: 'PA',
    joinedAt: '01/09/2026',
    lastActive: 'Aguardando aceite'
  }
];

const DEFAULT_EVENTS = [
  {
    id: 'evt_001',
    date: '15/09/2026 08:30',
    type: 'payment_confirmed',
    category: 'cobranca',
    title: 'Pagamento de Fatura Confirmado',
    description: 'Fatura #1024 no valor de R$ 990,00 foi processada com sucesso via Cartão de Crédito.'
  },
  {
    id: 'evt_002',
    date: '01/09/2026 14:15',
    type: 'subscription_upgraded',
    category: 'plano',
    title: 'Upgrade para Plano Advanced',
    description: 'Plano alterado com sucesso de Standard para Advanced. Recursos de expansão ativados.'
  },
  {
    id: 'evt_003',
    date: '01/09/2026 14:16',
    type: 'license_activated',
    category: 'aplicativos',
    title: 'Módulo Marketing Ativado',
    description: 'Licença corporativa de Marketing e automação de campanhas provisionada no ambiente.'
  },
  {
    id: 'evt_004',
    date: '01/09/2026 14:16',
    type: 'license_activated',
    category: 'aplicativos',
    title: 'Módulo SAC 360º Ativado',
    description: 'Licença corporativa de atendimento e central de suporte disponibilizada.'
  },
  {
    id: 'evt_005',
    date: '15/01/2026 10:00',
    type: 'subscription_created',
    category: 'plano',
    title: 'Criação da Conta DiskHub Business Cloud',
    description: 'Assinatura inicial configurada para Prime Show Eventos.'
  }
];

class ApiService {
  constructor() {
    this.invoices = this.load(INVOICES_STORAGE_KEY, DEFAULT_INVOICES);
    this.users = this.load(USERS_STORAGE_KEY, DEFAULT_USERS);
    this.events = this.load(EVENTS_STORAGE_KEY, DEFAULT_EVENTS);
  }

  load(key, fallback) {
    if (typeof window !== 'undefined') {
      try {
        const item = sessionStorage.getItem(key);
        if (item) return JSON.parse(item);
      } catch {
        // fallback
      }
    }
    return [...fallback];
  }

  save(key, data) {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(key, JSON.stringify(data));
      } catch {
        // ignore
      }
    }
  }

  // --- SUBSCRIPTION ENDPOINTS ---

  async getSubscription() {
    return subscriptionService.getSubscription();
  }

  async getInvoices() {
    return [...this.invoices];
  }

  async getUsage() {
    const sub = subscriptionService.getSubscription();
    const activeUsers = this.users.filter(u => u.status === 'active' || u.status === 'pending').length;
    const maxUsers = sub.plan === 'standard' ? 3 : sub.plan === 'advanced' ? 10 : 50;

    return {
      users: {
        used: activeUsers,
        limit: maxUsers,
        percent: Math.min(100, Math.round((activeUsers / maxUsers) * 100))
      },
      automations: {
        used: 3250,
        limit: 10000,
        percent: 32.5
      },
      whatsappMessages: {
        used: 4820,
        limit: 10000,
        percent: 48.2
      },
      storage: {
        used: '12.4 GB',
        limit: '100 GB',
        percent: 12.4
      }
    };
  }

  async getEvents() {
    return [...this.events];
  }

  async requestPlanChange(newPlanId, reason = '') {
    const event = {
      id: `evt_${Date.now()}`,
      date: new Date().toLocaleString('pt-BR'),
      type: 'scheduled_change',
      category: 'plano',
      title: `Solicitação de Alteração de Plano para ${newPlanId.toUpperCase()}`,
      description: `Agendamento registrado para a próxima data de renovação. Motivo: ${reason || 'Ajuste operacional'}.`
    };
    this.events.unshift(event);
    this.save(EVENTS_STORAGE_KEY, this.events);

    return {
      success: true,
      message: `Solicitação de alteração para ${newPlanId.toUpperCase()} agendada com sucesso.`
    };
  }

  async cancelSubscription(reason = '') {
    const sub = subscriptionService.getSubscription();
    const updated = {
      ...sub,
      status: 'cancelled',
      cancelledAt: new Date().toISOString(),
      cancellationReason: reason
    };
    subscriptionService.saveSubscription(updated);

    const event = {
      id: `evt_${Date.now()}`,
      date: new Date().toLocaleString('pt-BR'),
      type: 'subscription_cancelled',
      category: 'plano',
      title: 'Assinatura Cancelada',
      description: `Cancelamento registrado. Acesso mantido até o final do período faturado. Motivo: ${reason}`
    };
    this.events.unshift(event);
    this.save(EVENTS_STORAGE_KEY, this.events);

    return { success: true, updated };
  }

  async reactivateSubscription() {
    const sub = subscriptionService.getSubscription();
    const updated = {
      ...sub,
      status: 'active',
      cancelledAt: null,
      cancellationReason: null
    };
    subscriptionService.saveSubscription(updated);

    const event = {
      id: `evt_${Date.now()}`,
      date: new Date().toLocaleString('pt-BR'),
      type: 'subscription_activated',
      category: 'plano',
      title: 'Assinatura Reativada',
      description: 'Assinatura e licenças restabelecidas com sucesso.'
    };
    this.events.unshift(event);
    this.save(EVENTS_STORAGE_KEY, this.events);

    return { success: true, updated };
  }

  // --- USERS & ACCESS ENDPOINTS ---

  async getUsers() {
    return [...this.users];
  }

  async inviteUser({ name, email, role, apps = [], department = 'Operações' }) {
    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role: role || 'operator',
      status: 'pending',
      apps,
      department,
      avatar: name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase(),
      joinedAt: new Date().toLocaleDateString('pt-BR'),
      lastActive: 'Aguardando aceite'
    };

    this.users.push(newUser);
    this.save(USERS_STORAGE_KEY, this.users);

    const event = {
      id: `evt_${Date.now()}`,
      date: new Date().toLocaleString('pt-BR'),
      type: 'user_invited',
      category: 'usuarios',
      title: `Convite enviado para ${name}`,
      description: `Papel: ${defaultRoles[role]?.name || role} (${email})`
    };
    this.events.unshift(event);
    this.save(EVENTS_STORAGE_KEY, this.events);

    return newUser;
  }

  async resendInvite(userId) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.lastActive = 'Convite reenviado hoje';
      this.save(USERS_STORAGE_KEY, this.users);
      return { success: true, user };
    }
    return { success: false };
  }

  async revokeInvite(userId) {
    this.users = this.users.filter(u => u.id !== userId);
    this.save(USERS_STORAGE_KEY, this.users);
    return { success: true };
  }

  async updateUserRole(userId, newRole) {
    const user = this.users.find(u => u.id === userId);
    if (!user) return { success: false };

    // Prevent removing the only Owner
    if (user.role === 'owner' && newRole !== 'owner') {
      const ownersCount = this.users.filter(u => u.role === 'owner' && u.status === 'active').length;
      if (ownersCount <= 1) {
        throw new Error('A empresa deve possuir pelo menos 1 proprietário (Owner) ativo.');
      }
    }

    user.role = newRole;
    this.save(USERS_STORAGE_KEY, this.users);

    const event = {
      id: `evt_${Date.now()}`,
      date: new Date().toLocaleString('pt-BR'),
      type: 'role_changed',
      category: 'usuarios',
      title: `Papel de ${user.name} atualizado`,
      description: `Novo papel atribuído: ${defaultRoles[newRole]?.name || newRole}`
    };
    this.events.unshift(event);
    this.save(EVENTS_STORAGE_KEY, this.events);

    return { success: true, user };
  }

  async suspendUser(userId) {
    const user = this.users.find(u => u.id === userId);
    if (!user) return { success: false };

    if (user.role === 'owner') {
      throw new Error('O proprietário (Owner) da conta não pode ser suspenso.');
    }

    user.status = user.status === 'suspended' ? 'active' : 'suspended';
    this.save(USERS_STORAGE_KEY, this.users);
    return { success: true, user };
  }

  async removeUser(userId) {
    const user = this.users.find(u => u.id === userId);
    if (!user) return { success: false };

    if (user.role === 'owner') {
      throw new Error('O proprietário (Owner) não pode ser removido da empresa.');
    }

    this.users = this.users.filter(u => u.id !== userId);
    this.save(USERS_STORAGE_KEY, this.users);
    return { success: true };
  }

  async getEffectiveAccess(userId = 'usr_001') {
    const user = this.users.find(u => u.id === userId) || this.users[0];
    const sub = subscriptionService.getSubscription();
    const role = defaultRoles[user.role] || defaultRoles.operator;

    return {
      userId: user.id,
      name: user.name,
      role: user.role,
      status: user.status,
      tenantId: sub.producerId || 'prod_001',
      companyName: sub.company?.legalName,
      allowedApps: user.apps,
      permissions: role.permissions
    };
  }
}

export const apiService = new ApiService();
