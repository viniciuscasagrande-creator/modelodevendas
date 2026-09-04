/**
 * Activity Service - DiskHub Business Cloud (Fase 27.1.8.4)
 * Feed auditável de atividade recente e eventos operacionais multi-tenant.
 */

import { apiClient } from './apiClient';
import { subscriptionService } from './subscriptionService';
import { userAccessService } from './userAccessService';

class ActivityService {
  constructor() {
    this.listeners = new Set();
    this.initDefaultActivities();
  }

  initDefaultActivities() {
    const sub = subscriptionService.getSubscription();
    const tenantId = sub.producerId || 'prod_001';

    this.activities = [
      {
        id: 'act_001',
        tenantId,
        actorId: 'usr_001',
        actorName: 'Vinicius Casagrande',
        appId: 'vendas',
        action: 'payment.confirmed',
        title: 'Pedido #10493 confirmado via Pix',
        description: '2x Ingressos Metal Fest Brasil liquidados',
        entityType: 'order',
        entityId: 'ord_10493',
        route: '/vendas',
        amount: 'R$ 280,00',
        createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString()
      },
      {
        id: 'act_002',
        tenantId,
        actorId: 'usr_002',
        actorName: 'Mariana Costa',
        appId: 'marketing',
        action: 'campaign.activated',
        title: 'Campanha "Primavera VIP" ativada',
        description: 'Disparos no WhatsApp API em lote de 1.200 contatos',
        entityType: 'campaign',
        entityId: 'camp_002',
        route: '/marketing',
        amount: '1.200 envios',
        createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString()
      },
      {
        id: 'act_003',
        tenantId,
        actorId: 'usr_003',
        actorName: 'Roberto Carlos',
        appId: 'finance',
        action: 'repasse.approved',
        title: 'Repasse operacional de lote aprovado',
        description: 'Transferência bancária programada para produtor',
        entityType: 'repasse',
        entityId: 'rep_003',
        route: '/financeiro',
        amount: 'R$ 45.000,00',
        createdAt: new Date(Date.now() - 1000 * 60 * 42).toISOString()
      },
      {
        id: 'act_004',
        tenantId,
        actorId: 'usr_001',
        actorName: 'Vinicius Casagrande',
        appId: 'usuarios',
        action: 'user.invited',
        title: 'Novo operador adicionado à equipe',
        description: 'Mariana Souza vinculada à Portaria Principal',
        entityType: 'user',
        entityId: 'usr_084',
        route: '/usuarios',
        amount: 'Portaria',
        createdAt: new Date(Date.now() - 1000 * 60 * 65).toISOString()
      },
      {
        id: 'act_005',
        tenantId,
        actorId: 'usr_004',
        actorName: 'Gisele Lima',
        appId: 'support',
        action: 'support.ticket.closed',
        title: 'Chamado #432 encerrado com sucesso',
        description: 'Reenvio de voucher validado e finalizado com 5 estrelas',
        entityType: 'ticket',
        entityId: 'ticket_432',
        route: '/sac',
        amount: 'Atendido',
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
      },
      {
        id: 'act_006',
        tenantId,
        actorId: 'usr_001',
        actorName: 'Vinicius Casagrande',
        appId: 'eventos',
        action: 'lot.created',
        title: '2º Lote do Metal Fest aberto',
        description: '1.500 novos ingressos liberados no sistema',
        entityType: 'lot',
        entityId: 'lot_002',
        route: '/eventos',
        amount: 'R$ 140,00',
        createdAt: new Date(Date.now() - 1000 * 60 * 190).toISOString()
      }
    ];
  }

  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback();
      } catch (err) {
        console.error('Erro no listener de atividade:', err);
      }
    });
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  async getActivity(params = {}) {
    await apiClient.get('/activity', params);
    const sub = subscriptionService.getSubscription();
    const currentTenant = sub.producerId || 'prod_001';
    const limit = params.limit || 15;

    let list = this.activities.filter(a => a.tenantId === currentTenant);

    if (params.appId && params.appId !== 'all') {
      list = list.filter(a => a.appId === params.appId);
    }

    return list
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  logActivity(activityData) {
    const sub = subscriptionService.getSubscription();
    const currentTenant = sub.producerId || 'prod_001';
    const userId = userAccessService.getCurrentUserId();

    const newActivity = {
      id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      tenantId: currentTenant,
      actorId: activityData.actorId || userId,
      actorName: activityData.actorName || 'Operador',
      appId: activityData.appId || 'system',
      action: activityData.action || 'system.event',
      title: activityData.title,
      description: activityData.description || '',
      entityType: activityData.entityType || 'record',
      entityId: activityData.entityId || 'rec_01',
      route: activityData.route || '/dashboard',
      amount: activityData.amount || '',
      createdAt: new Date().toISOString()
    };

    this.activities.unshift(newActivity);
    this.notifyListeners();
    return newActivity;
  }

  resetForTenant(newTenantId) {
    this.activities = this.activities.filter(a => a.tenantId === newTenantId);
    if (this.activities.length === 0) {
      this.initDefaultActivities();
    }
    this.notifyListeners();
  }
}

export const activityService = new ActivityService();
