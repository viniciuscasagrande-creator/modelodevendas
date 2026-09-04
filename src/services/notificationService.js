/**
 * Notification Service - DiskHub Business Cloud (Fase 27.1.8.4)
 * Gerenciamento centralizado de notificações multi-tenant com persistência e listeners.
 */

import { apiClient } from './apiClient';
import { subscriptionService } from './subscriptionService';
import { userAccessService } from './userAccessService';

class NotificationService {
  constructor() {
    this.listeners = new Set();
    this.initDefaultNotifications();
  }

  initDefaultNotifications() {
    const sub = subscriptionService.getSubscription();
    const tenantId = sub.producerId || 'prod_001';
    const userId = userAccessService.getCurrentUserId();

    this.notifications = [
      {
        id: 'notif_001',
        tenantId,
        userId,
        appId: 'integrations',
        type: 'alert',
        severity: 'critical',
        title: 'Terminal PDV 03 desconectado',
        message: 'O terminal físico de portaria perdeu conectividade há 8 minutos.',
        status: 'unread',
        route: '/vendas',
        entityType: 'terminal',
        entityId: 'pos_03',
        createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
        readAt: null
      },
      {
        id: 'notif_002',
        tenantId,
        userId,
        appId: 'support',
        type: 'sla',
        severity: 'critical',
        title: '7 tickets SAC próximos do SLA',
        message: 'Chamados classificados como P1/P2 necessitam de atendimento imediato.',
        status: 'unread',
        route: '/sac',
        entityType: 'ticket',
        entityId: 'sac_queue',
        createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        readAt: null
      },
      {
        id: 'notif_003',
        tenantId,
        userId,
        appId: 'eventos',
        type: 'capacity',
        severity: 'warning',
        title: 'Setor Pista atingiu 82% da lotação',
        message: 'Metal Fest Brasil: restam poucos ingressos no lote vigente.',
        status: 'unread',
        route: '/eventos',
        entityType: 'event',
        entityId: 'ev_001',
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        readAt: null
      },
      {
        id: 'notif_004',
        tenantId,
        userId,
        appId: 'finance',
        type: 'reconciliation',
        severity: 'info',
        title: 'Conciliação pendente de 3 repasses',
        message: 'Lotes financeiros operacionais aguardando conferência bancária.',
        status: 'unread',
        route: '/financeiro',
        entityType: 'repasse',
        entityId: 'rep_003',
        createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        readAt: null
      },
      {
        id: 'notif_005',
        tenantId,
        userId,
        appId: 'marketing',
        type: 'campaign',
        severity: 'success',
        title: 'Campanha "Primavera VIP" atingiu 1.200 envios',
        message: 'Disparos via WhatsApp API concluídos com taxa de abertura de 68%.',
        status: 'unread',
        route: '/marketing',
        entityType: 'campaign',
        entityId: 'camp_002',
        createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
        readAt: null
      },
      {
        id: 'notif_006',
        tenantId,
        userId,
        appId: 'finance',
        type: 'payment',
        severity: 'success',
        title: 'Venda de R$ 850,00 aprovada no Pix',
        message: 'Pedido #10493 liquidado instantaneamente para Show de Rock.',
        status: 'read',
        route: '/financeiro',
        entityType: 'order',
        entityId: 'ord_10493',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        readAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString()
      },
      {
        id: 'notif_007',
        tenantId,
        userId,
        appId: 'crm',
        type: 'lead',
        severity: 'info',
        title: 'Novo lead corporativo cadastrado',
        message: 'Agência Star Eventos solicitou proposta de parceria comercial.',
        status: 'read',
        route: '/crm',
        entityType: 'lead',
        entityId: 'lead_084',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        readAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString()
      }
    ];
  }

  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback();
      } catch (err) {
        console.error('Erro no listener de notificação:', err);
      }
    });
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  async getNotifications(filters = {}) {
    await apiClient.get('/notifications', filters);
    const sub = subscriptionService.getSubscription();
    const currentTenant = sub.producerId || 'prod_001';

    let result = this.notifications.filter(n => n.tenantId === currentTenant && n.status !== 'archived');

    // Filtro por status
    if (filters.status && filters.status !== 'all' && filters.status !== 'Todos') {
      if (filters.status === 'unread' || filters.status === 'Não lidas') {
        result = result.filter(n => n.status === 'unread');
      } else if (filters.status === 'read' || filters.status === 'Lidas') {
        result = result.filter(n => n.status === 'read');
      } else if (filters.status === 'critical' || filters.status === 'Críticas') {
        result = result.filter(n => n.severity === 'critical');
      } else if (filters.status === 'alert' || filters.status === 'Alertas') {
        result = result.filter(n => n.type === 'alert' || n.severity === 'warning' || n.severity === 'critical');
      } else if (filters.status === 'archived' || filters.status === 'Arquivadas') {
        result = this.notifications.filter(n => n.tenantId === currentTenant && n.status === 'archived');
      }
    }

    // Filtro por appId / módulo
    if (filters.appId && filters.appId !== 'all' && filters.appId !== 'Todos') {
      const appMap = {
        'Financeiro': 'finance',
        'CRM': 'crm',
        'ERP': 'erp',
        'Marketing': 'marketing',
        'SAC': 'support',
        'BI': 'analytics',
        'Contabilidade': 'accounting',
        'Automação': 'automation',
        'IA': 'ai',
        'Integrações': 'integrations',
        'Sistema': 'system'
      };
      const targetApp = appMap[filters.appId] || filters.appId.toLowerCase();
      result = result.filter(n => n.appId === targetApp);
    }

    // Filtro por severidade
    if (filters.severity && filters.severity !== 'all' && filters.severity !== 'Todas') {
      result = result.filter(n => n.severity === filters.severity.toLowerCase());
    }

    // Filtro por busca textual
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.message.toLowerCase().includes(q)
      );
    }

    // Mascaramento de dados sensíveis para usuários sem permissão (RBAC)
    const hasFinanceRead = userAccessService.hasPermission('finance.dashboard.read');
    if (!hasFinanceRead) {
      result = result.map(n => {
        if (n.appId === 'finance') {
          return {
            ...n,
            title: 'Pendência financeira registrada',
            message: 'Existe uma movimentação financeira que requer atenção operacional.'
          };
        }
        return n;
      });
    }

    // Ordenação: primeiro críticas, depois não lidas, depois mais recentes
    return result.sort((a, b) => {
      if (a.severity === 'critical' && b.severity !== 'critical') return -1;
      if (b.severity === 'critical' && a.severity !== 'critical') return 1;
      if (a.status === 'unread' && b.status === 'read') return -1;
      if (b.status === 'unread' && a.status === 'read') return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  async getUnreadCount() {
    await apiClient.get('/notifications/unread-count');
    const sub = subscriptionService.getSubscription();
    const currentTenant = sub.producerId || 'prod_001';
    return this.notifications.filter(n => n.tenantId === currentTenant && n.status === 'unread').length;
  }

  async markAsRead(id) {
    await apiClient.patch(`/notifications/${id}/read`, { status: 'read' });
    const notif = this.notifications.find(n => n.id === id);
    if (notif) {
      notif.status = 'read';
      notif.readAt = new Date().toISOString();
      this.notifyListeners();
    }
    return notif;
  }

  async markAllAsRead() {
    await apiClient.post('/notifications/read-all');
    const sub = subscriptionService.getSubscription();
    const currentTenant = sub.producerId || 'prod_001';
    const now = new Date().toISOString();

    this.notifications.forEach(n => {
      if (n.tenantId === currentTenant && n.status === 'unread') {
        n.status = 'read';
        n.readAt = now;
      }
    });

    this.notifyListeners();
    return true;
  }

  async archiveNotification(id) {
    await apiClient.post(`/notifications/${id}/archive`);
    const notif = this.notifications.find(n => n.id === id);
    if (notif) {
      notif.status = 'archived';
      this.notifyListeners();
    }
    return notif;
  }

  resetForTenant(newTenantId) {
    this.notifications = this.notifications.filter(n => n.tenantId === newTenantId);
    if (this.notifications.length === 0) {
      this.initDefaultNotifications();
    }
    this.notifyListeners();
  }
}

export const notificationService = new NotificationService();
