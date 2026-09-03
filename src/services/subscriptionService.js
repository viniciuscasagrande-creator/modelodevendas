import { planAccess } from '../config/apps';

const STORAGE_KEY = 'diskhub_subscription';

const DEFAULT_SUBSCRIPTION = {
  plan: 'standard',
  status: 'active',
  producerId: 'prod_001',
  producerName: 'Produtor Exemplo',
  company: {
    legalName: 'Produtora Prime Show Ltda',
    tradeName: 'Prime Show Eventos',
    document: '12.345.678/0001-90',
    email: 'financeiro@primeshow.com.br',
    phone: '(41) 3322-1100'
  },
  users: 3,
  addons: [],
  billingCycle: 'monthly',
  createdAt: '2026-01-15T10:00:00Z',
  renewsAt: '2026-10-15T10:00:00Z'
};

class SubscriptionService {
  constructor() {
    this.listeners = new Set();
    this.subscription = this.loadSubscription();
  }

  loadSubscription() {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch {
        // fallback
      }
    }
    return { ...DEFAULT_SUBSCRIPTION };
  }

  saveSubscription(sub) {
    this.subscription = sub;
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sub));
      } catch {
        // fallback
      }
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.subscription);
    }
  }

  getSubscription() {
    return this.subscription;
  }

  getPlan() {
    return this.subscription.plan || 'standard';
  }

  getEntitlements() {
    const plan = this.getPlan();
    const activeModuleIds = planAccess[plan] || planAccess.standard;
    return activeModuleIds;
  }

  getAppStatus(appId) {
    const plan = this.getPlan();
    const allowed = planAccess[plan] || planAccess.standard;
    
    if (allowed.includes(appId)) {
      return 'active';
    }

    // Check if available in higher tier
    if (plan === 'standard' && (planAccess.advanced.includes(appId) || planAccess.expert.includes(appId))) {
      return 'upgrade';
    }

    if (plan === 'advanced' && planAccess.expert.includes(appId)) {
      return 'upgrade';
    }

    return 'available';
  }

  canAccess(appId) {
    const plan = this.getPlan();
    const allowed = planAccess[plan] || planAccess.standard;
    return allowed.includes(appId);
  }

  activateSubscription(plan, addons = [], users = 1, companyData = {}) {
    const updated = {
      ...this.subscription,
      plan: plan || this.subscription.plan,
      status: 'active',
      addons,
      users: users || this.subscription.users,
      company: {
        ...this.subscription.company,
        ...companyData
      },
      renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };
    this.saveSubscription(updated);
    return updated;
  }

  resetToDefault() {
    this.saveSubscription({ ...DEFAULT_SUBSCRIPTION });
  }
}

export const subscriptionService = new SubscriptionService();
