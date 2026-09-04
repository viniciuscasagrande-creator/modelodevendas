import { User } from './auth';

export interface Tenant {
  id: string;
  name: string;
  document: string;
  activeProducer: string;
  activeCompany: string;
  plan: 'standard' | 'advanced' | 'expert';
}

export interface Subscription {
  id: string;
  plan: 'standard' | 'advanced' | 'expert';
  planName: string;
  status: 'active' | 'past_due' | 'canceled';
  monthlyPrice: number;
  billingCycle: 'monthly' | 'annual';
  renewsAt: string;
  usersCount: number;
  maxUsers: number;
  activeAppsCount: number;
}

export interface AppEntitlement {
  id: string;
  name: string;
  status: 'active' | 'upgrade_required' | 'coming_soon';
  tier: 'standard' | 'advanced' | 'expert';
  icon?: string;
  path?: string;
  description?: string;
}

export interface AppContextData {
  user: User;
  tenant: Tenant;
  subscription: Subscription;
  apps: AppEntitlement[];
  permissions: string[];
  features: string[];
}
