/**
 * Alert Rule Engine - DiskHub Business Cloud (Fase 27.1.8.4)
 * Responsável por avaliar regras operacionais, deduplicar alertas e gerenciar ciclo de vida:
 * open -> acknowledged -> resolved / dismissed.
 */

import { subscriptionService } from './subscriptionService';
import { userAccessService } from './userAccessService';

export class AlertRuleEngine {
  constructor() {
    this.alerts = [];
    this.rules = [];
    this.initDefaultRules();
    this.initInitialAlerts();
  }

  initDefaultRules() {
    this.rules = [
      // Financeiro
      {
        ruleId: 'fin_conciliacao_pendente',
        appId: 'finance',
        category: 'Financeiro',
        severity: 'info',
        title: 'Conciliação bancária pendente',
        messageTemplate: (data) => `${data.count || 3} transações aguardando conciliação automática.`,
        route: '/financeiro'
      },
      {
        ruleId: 'fin_estorno_elevado',
        appId: 'finance',
        category: 'Financeiro',
        severity: 'warning',
        title: 'Estorno acima da média detectado',
        messageTemplate: (data) => `Volume de estornos atingiu ${data.pct || '1.8%'} do faturamento diário.`,
        route: '/financeiro'
      },
      // Eventos
      {
        ruleId: 'ev_capacidade_critica',
        appId: 'eventos',
        category: 'Eventos',
        severity: 'warning',
        title: 'Setor próximo da capacidade máxima',
        messageTemplate: (data) => `${data.eventName || 'Metal Fest'}: Setor Pista atingiu ${data.occupancy || '82%'} dos ingressos.`,
        route: '/eventos'
      },
      {
        ruleId: 'ev_lote_esgotando',
        appId: 'eventos',
        category: 'Eventos',
        severity: 'info',
        title: 'Lote promocional prestes a esgotar',
        messageTemplate: (data) => `Restam menos de ${data.remaining || 50} ingressos no 1º Lote.`,
        route: '/eventos'
      },
      // SAC & Atendimento
      {
        ruleId: 'sac_sla_em_risco',
        appId: 'support',
        category: 'SAC',
        severity: 'critical',
        title: 'Tickets de SAC próximos do limite de SLA',
        messageTemplate: (data) => `${data.count || 7} chamados de suporte P1/P2 atingem SLA em menos de 30 min.`,
        route: '/sac'
      },
      // Marketing
      {
        ruleId: 'mkt_roas_baixo',
        appId: 'marketing',
        category: 'Marketing',
        severity: 'warning',
        title: 'Queda de ROAS em campanha ativa',
        messageTemplate: (data) => `Campanha "Primavera VIP" com ROAS abaixo da meta mínima (2.1x vs 4.0x).`,
        route: '/marketing'
      },
      // Integrações
      {
        ruleId: 'int_terminal_pdv_offline',
        appId: 'integrations',
        category: 'Integrações',
        severity: 'critical',
        title: 'Terminal PDV 03 físico desconectado',
        messageTemplate: (data) => `Equipamento sem resposta na Portaria A há mais de ${data.minutes || 8} minutos.`,
        route: '/vendas'
      },
      // Sistema & Licença
      {
        ruleId: 'sys_licenca_expirando',
        appId: 'system',
        category: 'Sistema',
        severity: 'warning',
        title: 'Ciclo de renovação de plano próximo',
        messageTemplate: (data) => `Próxima fatura do plano ${data.planName || 'Omnichannel'} vence em 5 dias.`,
        route: '/assinatura'
      }
    ];
  }

  initInitialAlerts() {
    const sub = subscriptionService.getSubscription();
    const tenantId = sub.producerId || 'prod_001';

    this.alerts = [
      {
        id: 'alt_001',
        tenantId,
        appId: 'integrations',
        ruleId: 'int_terminal_pdv_offline',
        severity: 'critical',
        title: 'Terminal PDV 03 físico desconectado',
        message: 'Equipamento sem resposta na Portaria A há mais de 8 minutos.',
        status: 'open',
        route: '/vendas',
        entityType: 'terminal_pos',
        entityId: 'pos_03',
        createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
        acknowledgedAt: null,
        resolvedAt: null
      },
      {
        id: 'alt_002',
        tenantId,
        appId: 'support',
        ruleId: 'sac_sla_em_risco',
        severity: 'critical',
        title: '7 tickets SAC próximos do limite de SLA',
        message: 'Fila de suporte geral exige atendimento prioritário antes do estouro de SLA.',
        status: 'open',
        route: '/sac',
        entityType: 'ticket_queue',
        entityId: 'queue_p1',
        createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
        acknowledgedAt: null,
        resolvedAt: null
      },
      {
        id: 'alt_003',
        tenantId,
        appId: 'eventos',
        ruleId: 'ev_capacidade_critica',
        severity: 'warning',
        title: 'Setor Pista atingiu 82% da capacidade',
        message: 'Lote promocional prestes a esgotar no Metal Fest Brasil.',
        status: 'open',
        route: '/eventos',
        entityType: 'event_sector',
        entityId: 'sec_pista',
        createdAt: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
        acknowledgedAt: null,
        resolvedAt: null
      },
      {
        id: 'alt_004',
        tenantId,
        appId: 'finance',
        ruleId: 'fin_conciliacao_pendente',
        severity: 'info',
        title: 'Conciliação bancária pendente',
        message: '3 repasses operacionais aguardando validação de fechamento.',
        status: 'open',
        route: '/financeiro',
        entityType: 'reconciliation',
        entityId: 'rec_batch_09',
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        acknowledgedAt: null,
        resolvedAt: null
      }
    ];
  }

  /**
   * Deduplicação lógica: tenantId + ruleId + entityId
   */
  getDeduplicationKey(tenantId, ruleId, entityId) {
    return `${tenantId || 'global'}::${ruleId}::${entityId || 'general'}`;
  }

  createOrUpdateAlert(alertData) {
    const sub = subscriptionService.getSubscription();
    const tenantId = alertData.tenantId || sub.producerId || 'prod_001';
    const key = this.getDeduplicationKey(tenantId, alertData.ruleId, alertData.entityId);

    const existingIndex = this.alerts.findIndex(a => 
      this.getDeduplicationKey(a.tenantId, a.ruleId, a.entityId) === key && a.status !== 'resolved' && a.status !== 'dismissed'
    );

    if (existingIndex >= 0) {
      // Atualiza alerta existente sem duplicar
      this.alerts[existingIndex] = {
        ...this.alerts[existingIndex],
        ...alertData,
        title: alertData.title || this.alerts[existingIndex].title,
        message: alertData.message || this.alerts[existingIndex].message,
        severity: alertData.severity || this.alerts[existingIndex].severity,
        updatedAt: new Date().toISOString()
      };
      return this.alerts[existingIndex];
    }

    const newAlert = {
      id: `alt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      tenantId,
      appId: alertData.appId || 'system',
      ruleId: alertData.ruleId,
      severity: alertData.severity || 'info',
      title: alertData.title,
      message: alertData.message,
      status: 'open',
      route: alertData.route || '/dashboard',
      entityType: alertData.entityType || 'operational',
      entityId: alertData.entityId || 'op_001',
      createdAt: new Date().toISOString(),
      acknowledgedAt: null,
      resolvedAt: null
    };

    this.alerts.unshift(newAlert);
    return newAlert;
  }

  acknowledgeAlert(id) {
    const alert = this.alerts.find(a => a.id === id);
    if (alert && alert.status === 'open') {
      alert.status = 'acknowledged';
      alert.acknowledgedAt = new Date().toISOString();
    }
    return alert;
  }

  resolveAlert(id) {
    const alert = this.alerts.find(a => a.id === id);
    if (alert) {
      alert.status = 'resolved';
      alert.resolvedAt = new Date().toISOString();
    }
    return alert;
  }

  getAlerts(tenantId) {
    return this.alerts.filter(a => !tenantId || a.tenantId === tenantId);
  }

  resetForTenant(newTenantId) {
    this.alerts = this.alerts.filter(a => a.tenantId === newTenantId);
    if (this.alerts.length === 0) {
      this.initInitialAlerts();
    }
  }
}

export const alertRuleEngine = new AlertRuleEngine();
