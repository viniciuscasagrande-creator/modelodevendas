/**
 * Alert Service - DiskHub Business Cloud (Fase 27.1.8.4)
 * Gestão de alertas operacionais com ciclo de vida (open -> acknowledged -> resolved) e RBAC.
 */

import { apiClient } from './apiClient';
import { alertRuleEngine } from './alertRuleEngine';
import { subscriptionService } from './subscriptionService';
import { userAccessService } from './userAccessService';

class AlertService {
  constructor() {
    this.listeners = new Set();
  }

  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback();
      } catch (err) {
        console.error('Erro no listener de alerta:', err);
      }
    });
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  async getAlerts(filters = {}) {
    await apiClient.get('/alerts', filters);
    const sub = subscriptionService.getSubscription();
    const currentTenant = sub.producerId || 'prod_001';

    let list = alertRuleEngine.getAlerts(currentTenant);

    // Filtrar alertas não resolvidos por padrão a menos que solicitado
    if (!filters.includeResolved) {
      list = list.filter(a => a.status === 'open' || a.status === 'acknowledged');
    }

    if (filters.severity && filters.severity !== 'all') {
      list = list.filter(a => a.severity === filters.severity.toLowerCase());
    }

    if (filters.appId && filters.appId !== 'all') {
      list = list.filter(a => a.appId === filters.appId.toLowerCase());
    }

    // Ordenação por prioridade: critical -> warning -> info
    const priorityOrder = { critical: 1, warning: 2, info: 3 };
    return list.sort((a, b) => {
      const pA = priorityOrder[a.severity] || 4;
      const pB = priorityOrder[b.severity] || 4;
      if (pA !== pB) return pA - pB;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  async acknowledgeAlert(id) {
    await apiClient.post(`/alerts/${id}/acknowledge`);
    const alert = alertRuleEngine.acknowledgeAlert(id);
    this.notifyListeners();
    return alert;
  }

  async resolveAlert(id) {
    // Validação de permissão RBAC: somente usuários com permissão de resolução ou admin
    const currentUser = await userAccessService.getCurrentUser();
    if (currentUser.role === 'operator' && !currentUser.permissions?.includes('alerts.resolve')) {
      throw new Error('Você não possui permissão para resolver alertas operacionais.');
    }

    await apiClient.post(`/alerts/${id}/resolve`);
    const alert = alertRuleEngine.resolveAlert(id);
    this.notifyListeners();
    return alert;
  }

  resetForTenant(newTenantId) {
    alertRuleEngine.resetForTenant(newTenantId);
    this.notifyListeners();
  }
}

export const alertService = new AlertService();
