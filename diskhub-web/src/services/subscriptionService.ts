import { apiClient } from './api/apiClient';
import { Subscription } from '../types/context';
import { Plan } from '../types/plans';

export const subscriptionService = {
  async getCurrentSubscription(): Promise<Subscription> {
    try {
      return await apiClient.get<Subscription>('/api/subscription/current');
    } catch {
      return {
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
      };
    }
  },

  async getPlans(): Promise<Plan[]> {
    try {
      return await apiClient.get<Plan[]>('/api/plans');
    } catch {
      return [
        {
          id: 'standard',
          name: 'Standard',
          tagline: 'Organize sua operação.',
          price: 'Sob Consulta',
          features: ['CRM Essencial', 'ERP Operacional', 'Financeiro & Conciliação', 'Até 5 usuários'],
          ctaText: 'Falar com Consultor',
          description: 'Para quem está saindo do controle manual e precisa centralizar cadastros, vendas e controle financeiro.',
        },
        {
          id: 'advanced',
          name: 'Advanced',
          tagline: 'Venda mais e tenha mais controle.',
          price: 'R$ 890/mês',
          popular: true,
          features: ['Tudo do Standard', 'Marketing & Audiência', 'SAC & Atendimento', 'BI & Analytics', 'Até 15 usuários'],
          ctaText: 'Assinar Advanced',
          description: 'Para negócios em expansão que precisam aumentar vendas, reter clientes e gerenciar canais com inteligência.',
        },
        {
          id: 'expert',
          name: 'Expert',
          tagline: 'Automatize e escale sua operação.',
          price: 'R$ 1.890/mês',
          features: ['Tudo do Advanced', 'Contabilidade Integrada', 'Automações Avançadas', 'Inteligência Artificial', 'Webhooks & APIs', 'Usuários ilimitados'],
          ctaText: 'Conhecer Expert',
          description: 'Para operações profissionais que precisam integrar sistemas, automatizar processos e utilizar inteligência.',
        },
      ];
    }
  },
};
