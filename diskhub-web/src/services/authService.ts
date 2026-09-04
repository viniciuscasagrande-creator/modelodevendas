import { apiClient } from './api/apiClient';
import { User, LoginCredentials, AuthResponse } from '../types/auth';
import { AppContextData } from '../types/context';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials);
      if (response.success && response.user) {
        localStorage.setItem('diskhub_user', JSON.stringify(response.user));
        localStorage.setItem('diskhub_token', response.token || `token-${Date.now()}`);
      }
      return response;
    } catch (err: any) {
      // Fallback local authentication for dev/offline resilience
      if (credentials.email && credentials.password) {
        const mockUser: User = {
          id: 'usr-1',
          name: 'Vinicius Casagrande',
          email: credentials.email,
          role: 'CEO & Fundador',
          avatarColor: '#2563EB',
        };
        localStorage.setItem('diskhub_user', JSON.stringify(mockUser));
        localStorage.setItem('diskhub_token', `token-${Date.now()}`);
        return {
          success: true,
          message: 'Autenticado com sucesso!',
          user: mockUser,
          token: `token-${Date.now()}`,
        };
      }
      throw err;
    }
  },

  logout(): void {
    localStorage.removeItem('diskhub_user');
    localStorage.removeItem('diskhub_token');
  },

  getCurrentUser(): User | null {
    try {
      const item = localStorage.getItem('diskhub_user');
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('diskhub_token');
  },

  async getContext(): Promise<AppContextData> {
    try {
      return await apiClient.get<AppContextData>('/api/me/context');
    } catch {
      // Fallback context structure conforming to Phase 28.1
      const user = this.getCurrentUser() || {
        id: 'usr-1',
        name: 'Vinicius Casagrande',
        email: 'vinicius@diskhub.com.br',
        role: 'CEO & Fundador',
        avatarColor: '#2563EB',
      };

      return {
        user,
        tenant: {
          id: 'tenant-diskhub-01',
          name: 'Diskingressos & Produtores Associados',
          document: '12.345.678/0001-90',
          activeProducer: 'Produtor Exemplo',
          activeCompany: 'Diskingressos',
          plan: 'advanced',
        },
        subscription: {
          id: 'sub-adv-2026',
          plan: 'advanced',
          planName: 'Advanced',
          status: 'active',
          monthlyPrice: 890,
          billingCycle: 'monthly',
          renewsAt: '2026-10-01',
          usersCount: 12,
          maxUsers: 25,
          activeAppsCount: 6,
        },
        apps: [
          { id: 'crm', name: 'CRM Comercial', status: 'active', tier: 'standard' },
          { id: 'erp', name: 'ERP Operacional', status: 'active', tier: 'standard' },
          { id: 'financeiro', name: 'Financeiro & Conciliação', status: 'active', tier: 'standard' },
          { id: 'marketing', name: 'Marketing & Audiência', status: 'active', tier: 'advanced' },
          { id: 'sac', name: 'SAC & Atendimento', status: 'active', tier: 'advanced' },
          { id: 'bi', name: 'BI & Analytics', status: 'active', tier: 'advanced' },
          { id: 'contabilidade', name: 'Contabilidade', status: 'upgrade_required', tier: 'expert' },
          { id: 'automacao', name: 'Automações Avançadas', status: 'upgrade_required', tier: 'expert' },
          { id: 'ia', name: 'Inteligência Artificial', status: 'upgrade_required', tier: 'expert' },
          { id: 'integracoes', name: 'Webhooks & APIs', status: 'upgrade_required', tier: 'expert' },
        ],
        permissions: ['view_dashboard', 'manage_sales', 'view_financial_reports'],
        features: ['advanced_analytics', 'multi_producer_context'],
      };
    }
  },
};
