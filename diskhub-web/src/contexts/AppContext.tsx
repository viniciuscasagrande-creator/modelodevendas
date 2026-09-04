import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  AppContextData,
  Tenant,
  Subscription,
  LicenseEntitlement,
  Membership,
  TenantSummary,
  AccessReason,
} from '../types/context';
import { User } from '../types/auth';
import { authService } from '../services/authService';
import { queryClient } from '../app/queryClient';

export type AppStatus =
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'
  | 'tenant_required'
  | 'subscription_inactive'
  | 'error';

export interface AppContextValue {
  context: AppContextData | null;
  user: User | null;
  membership: Membership | null;
  tenant: Tenant | null;
  availableTenants: TenantSummary[];
  subscription: Subscription | null;
  licenses: LicenseEntitlement[];
  apps: LicenseEntitlement[];
  permissions: string[];
  features: string[];
  status: AppStatus;
  isLoading: boolean;
  isSwitchingTenant: boolean;
  error: Error | null;
  switchTenant: (tenantId: string) => Promise<boolean>;
  hasPermission: (permission: string) => boolean;
  hasLicense: (app: string) => boolean;
  getLicense: (app: string) => LicenseEntitlement | undefined;
  hasFeature: (feature: string) => boolean;
  getAccessReason: (app: string) => AccessReason;
  refreshContext: (tenantId?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<AppContextData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSwitchingTenant, setIsSwitchingTenant] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadContext = useCallback(async (targetTenantId?: string) => {
    if (!authService.isAuthenticated()) {
      setIsLoading(false);
      setContext(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.getContext(targetTenantId);
      setContext(data);
    } catch (err: any) {
      console.error('[AppContext] Failed to load producer context:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContext();
  }, [loadContext]);

  const switchTenant = useCallback(
    async (targetTenantId: string): Promise<boolean> => {
      setIsSwitchingTenant(true);
      try {
        await authService.switchTenant(targetTenantId);
        // Invalidate tenant-scoped queries to guarantee strict isolation
        queryClient.removeQueries({ queryKey: ['dashboard'] });
        queryClient.removeQueries({ queryKey: ['subscription'] });
        queryClient.removeQueries({ queryKey: ['modules'] });

        const data = await authService.getContext(targetTenantId);
        setContext(data);
        return true;
      } catch (err: any) {
        console.error('[AppContext] Failed to switch tenant:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        return false;
      } finally {
        setIsSwitchingTenant(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      queryClient.clear();
      setContext(null);
      window.location.href = '/login';
    }
  }, []);

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!context?.permissions) return false;
      if (context.permissions.includes('*')) return true;
      if (context.permissions.includes(permission)) return true;

      // Handle wildcard prefixes like "crm.*"
      const parts = permission.split('.');
      if (parts.length > 1) {
        const wildcard = `${parts[0]}.*`;
        if (context.permissions.includes(wildcard)) return true;
      }

      return false;
    },
    [context]
  );

  const getLicense = useCallback(
    (app: string): LicenseEntitlement | undefined => {
      if (!context?.licenses) return undefined;
      return context.licenses.find(
        (l) => l.app.toLowerCase() === app.toLowerCase()
      );
    },
    [context]
  );

  const hasLicense = useCallback(
    (app: string): boolean => {
      const license = getLicense(app);
      if (!license) return false;
      return license.access === true && license.status === 'active';
    },
    [getLicense]
  );

  const hasFeature = useCallback(
    (feature: string): boolean => {
      if (!context?.features) return false;
      return context.features.includes(feature);
    },
    [context]
  );

  const getAccessReason = useCallback(
    (app: string): AccessReason => {
      if (!context) return 'no_license';
      if (context.tenant?.status !== 'active') return 'tenant_inactive';
      if (
        context.subscription &&
        context.subscription.status !== 'active' &&
        context.subscription.status !== 'trial'
      ) {
        return 'subscription_inactive';
      }

      const license = getLicense(app);
      if (!license) return 'no_license';
      if (license.status === 'upgrade_required') return 'upgrade_required';
      if (license.status === 'permission_denied') return 'permission_denied';
      if (!license.access) return 'upgrade_required';

      return 'allowed';
    },
    [context, getLicense]
  );

  // Derive status
  let status: AppStatus = 'loading';
  if (isLoading) {
    status = 'loading';
  } else if (!authService.isAuthenticated()) {
    status = 'unauthenticated';
  } else if (error) {
    status = 'error';
  } else if (
    context?.subscription &&
    ['suspended', 'canceled', 'expired'].includes(context.subscription.status)
  ) {
    status = 'subscription_inactive';
  } else if (!context?.tenant || !context?.membership) {
    status = 'tenant_required';
  } else if (context) {
    status = 'authenticated';
  }

  return (
    <AppContext.Provider
      value={{
        context,
        user: context?.user || null,
        membership: context?.membership || null,
        tenant: context?.tenant || null,
        availableTenants: context?.availableTenants || [],
        subscription: context?.subscription || null,
        licenses: context?.licenses || [],
        apps: context?.licenses || [],
        permissions: context?.permissions || [],
        features: context?.features || [],
        status,
        isLoading,
        isSwitchingTenant,
        error,
        switchTenant,
        hasPermission,
        hasLicense,
        getLicense,
        hasFeature,
        getAccessReason,
        refreshContext: loadContext,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return ctx;
}
