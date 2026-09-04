import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { RequireAuth } from '../routes/RequireAuth';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AppsPage } from '../pages/AppsPage';
import { PlansPage } from '../pages/PlansPage';
import { SubscriptionPage } from '../pages/SubscriptionPage';
import { SettingsPage } from '../pages/SettingsPage';

// Module implementations
import { CrmModule } from '../modules/crm/CrmModule';
import { ErpModule } from '../modules/erp/ErpModule';
import { FinanceModule } from '../modules/finance/FinanceModule';
import { MarketingModule } from '../modules/marketing/MarketingModule';
import { SupportModule } from '../modules/support/SupportModule';
import { AnalyticsModule } from '../modules/analytics/AnalyticsModule';
import { AccountingModule } from '../modules/accounting/AccountingModule';
import { AutomationModule } from '../modules/automation/AutomationModule';
import { AiModule } from '../modules/ai/AiModule';
import { IntegrationsModule } from '../modules/integrations/IntegrationsModule';

export const router = createBrowserRouter([
  // Public Auth Routes
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },

  // Protected App Routes
  {
    path: '/app',
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/app/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'apps',
        element: <AppsPage />,
      },
      {
        path: 'planos',
        element: <PlansPage />,
      },
      {
        path: 'assinatura',
        element: <SubscriptionPage />,
      },
      {
        path: 'configuracoes',
        element: <SettingsPage />,
      },
      // Business Modules
      {
        path: 'crm',
        element: <CrmModule />,
      },
      {
        path: 'erp',
        element: <ErpModule />,
      },
      {
        path: 'financeiro',
        element: <FinanceModule />,
      },
      {
        path: 'marketing',
        element: <MarketingModule />,
      },
      {
        path: 'sac',
        element: <SupportModule />,
      },
      {
        path: 'bi',
        element: <AnalyticsModule />,
      },
      {
        path: 'contabilidade',
        element: <AccountingModule />,
      },
      {
        path: 'automacao',
        element: <AutomationModule />,
      },
      {
        path: 'ia',
        element: <AiModule />,
      },
      {
        path: 'integracoes',
        element: <IntegrationsModule />,
      },
    ],
  },

  // Root redirection: redirect to /app/dashboard if logged in, or /login if not
  {
    path: '/',
    element: <Navigate to="/app/dashboard" replace />,
  },

  // Catch-all: redirect to /app/dashboard
  {
    path: '*',
    element: <Navigate to="/app/dashboard" replace />,
  },
]);
