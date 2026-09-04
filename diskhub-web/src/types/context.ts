import { User } from './auth';

export interface Membership {
  role: 'owner' | 'admin' | 'manager' | 'analyst' | 'operator' | 'viewer';
  status: 'active' | 'suspended' | 'pending';
  tenantId: string;
}

export interface Tenant {
  id: string;
  name: string;
  document: string;
  activeProducer: string;
  activeCompany: string;
  status: 'active' | 'suspended' | 'pending';
  plan: 'standard' | 'advanced' | 'expert';
}

export interface TenantSummary {
  id: string;
  name: string;
  role: string;
  plan: 'standard' | 'advanced' | 'expert';
}

export interface Subscription {
  id: string;
  plan: 'standard' | 'advanced' | 'expert';
  planName: string;
  status: 'active' | 'trial' | 'past_due' | 'suspended' | 'canceled' | 'expired';
  monthlyPrice: number;
  billingCycle: 'monthly' | 'annual';
  renewsAt: string;
  usersCount: number;
  maxUsers: number;
  activeAppsCount: number;
}

export interface LicenseEntitlement {
  id?: string;
  app: string;
  name: string;
  status: 'active' | 'upgrade_required' | 'permission_denied';
  access: boolean;
  tier: 'standard' | 'advanced' | 'expert';
  icon?: string;
  path?: string;
  description?: string;
}

export type AppEntitlement = LicenseEntitlement;

export type AccessReason =
  | 'allowed'
  | 'no_license'
  | 'upgrade_required'
  | 'permission_denied'
  | 'subscription_inactive'
  | 'tenant_inactive'
  | 'feature_disabled';

export interface AppContextData {
  user: User;
  membership: Membership;
  tenant: Tenant;
  availableTenants: TenantSummary[];
  subscription: Subscription;
  licenses: LicenseEntitlement[];
  apps?: LicenseEntitlement[];
  permissions: string[];
  features: string[];
}

