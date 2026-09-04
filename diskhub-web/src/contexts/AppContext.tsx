import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContextData, User, Tenant, Subscription, AppEntitlement } from '../types/context';
import { authService } from '../services/authService';

interface AppContextValue {
  context: AppContextData | null;
  user: User | null;
  tenant: Tenant | null;
  subscription: Subscription | null;
  apps: AppEntitlement[];
  permissions: string[];
  features: string[];
  isLoading: boolean;
  error: Error | null;
  refreshContext: () => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<AppContextData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadContext = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.getContext();
      setContext(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContext();
  }, []);

  const logout = () => {
    authService.logout();
    setContext(null);
    window.location.href = '/login';
  };

  return (
    <AppContext.Provider
      value={{
        context,
        user: context?.user || null,
        tenant: context?.tenant || null,
        subscription: context?.subscription || null,
        apps: context?.apps || [],
        permissions: context?.permissions || [],
        features: context?.features || [],
        isLoading,
        error,
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
