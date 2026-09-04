import { apiClient } from './apiClient';

export const dashboardService = {
  async getSummary(params = {}) {
    await apiClient.get('/dashboard/summary', params);
    const { period = '30d', eventId = 'all' } = params;

    const baseRevenue = eventId === 'all' ? 284520 : (eventId === 'ev-1' ? 184250 : 100270);
    const multiplier = period === 'today' ? 0.08 : (period === '7d' ? 0.35 : 1);

    return {
      revenue: Math.round(baseRevenue * multiplier),
      revenueGrowth: 12.4,
      orders: Math.round(4921 * multiplier),
      ordersGrowth: 8.2,
      conversion: 8.7,
      conversionGrowth: 1.2,
      ticketAverage: 57.81,
      ticketAverageGrowth: 4.3,
      balance: Math.round(142850 * multiplier),
      balanceGrowth: 8.5
    };
  },

  async getPerformance(params = {}) {
    await apiClient.get('/dashboard/performance', params);
    return {
      periodLabel: '01–30 Set vs 01–30 Ago',
      data: [
        { label: '01 Set', current: 24, previous: 20 },
        { label: '05 Set', current: 42, previous: 32 },
        { label: '10 Set', current: 58, previous: 45 },
        { label: '15 Set', current: 85, previous: 65 },
        { label: '20 Set', current: 124, previous: 98 },
        { label: '25 Set', current: 198, previous: 154 },
        { label: '30 Set', current: 284, previous: 230 }
      ]
    };
  },

  async getFunnel(params = {}) {
    await apiClient.get('/dashboard/funnel', params);
    return {
      stages: [
        { name: 'Visualizações', count: 48320, pct: '100%', dropPct: null },
        { name: 'Checkout Iniciado', count: 7840, pct: '16,2%', dropPct: '16,2% do total' },
        { name: 'Pedidos Gerados', count: 4360, pct: '9,0%', dropPct: '55,6% do checkout' },
        { name: 'Pagamentos Confirmados', count: 4110, pct: '8,5%', dropPct: '94,3% dos pedidos' }
      ],
      sources: [
        { channel: 'Direto / Orgânico', pct: 38, val: 'R$ 108.117' },
        { channel: 'Instagram Ads', pct: 30, val: 'R$ 85.356' },
        { channel: 'WhatsApp Disparos', pct: 18, val: 'R$ 51.213' },
        { channel: 'Google Search', pct: 10, val: 'R$ 28.452' },
        { channel: 'Afiliados / Parcerias', pct: 4, val: 'R$ 11.382' }
      ]
    };
  },

  async getFinanceSummary(params = {}) {
    await apiClient.get('/dashboard/finance', params);
    return {
      grossRevenue: 284520,
      platformFees: 22761,
      approvedRepasses: 118400,
      availableBalance: 142850,
      pendingBalance: 46210,
      refunds: 4280,
      marginPct: 34.6
    };
  },

  async getEvents(params = {}) {
    await apiClient.get('/dashboard/events', params);
    return [
      {
        id: 'ev-1',
        name: 'Metal Fest Curitiba 2026',
        date: '05 Set • 18h',
        venue: 'Pedreira Paulo Leminski',
        sold: 2847,
        capacity: 4250,
        occupancy: 67,
        status: 'Ativo',
        statusColor: 'emerald',
        revenue: 'R$ 284.520'
      },
      {
        id: 'ev-2',
        name: 'Festival de Inverno 2026',
        date: '12 Set • 20h',
        venue: 'Teatro Positivo',
        sold: 1910,
        capacity: 2980,
        occupancy: 64,
        status: 'Ativo',
        statusColor: 'emerald',
        revenue: 'R$ 124.380'
      },
      {
        id: 'ev-3',
        name: 'Réveillon das Estrelas 2027',
        date: '31 Dez • 21h',
        venue: 'Arena Expotrade',
        sold: 1320,
        capacity: 5000,
        occupancy: 26,
        status: 'Em breve',
        statusColor: 'blue',
        revenue: 'R$ 68.420'
      },
      {
        id: 'ev-4',
        name: 'Festival Kids Curitiba',
        date: '28 Set • 15h',
        venue: 'Parque Barigui',
        sold: 849,
        capacity: 3000,
        occupancy: 28,
        status: 'Ativo',
        statusColor: 'emerald',
        revenue: 'R$ 32.180'
      }
    ];
  },

  async getAlerts(params = {}) {
    await apiClient.get('/dashboard/alerts', params);
    return [
      {
        id: 'alt-1',
        level: 'critical', // 'critical' | 'warning' | 'info'
        title: 'PDV 03 físico desconectado',
        description: 'Terminal sem sincronização há 8 minutos.',
        actionLabel: 'Ver PDVs',
        tab: 'pdv'
      },
      {
        id: 'alt-2',
        level: 'warning',
        title: '7 tickets SAC próximos do SLA',
        description: 'Fila de suporte geral exige atendimento prioritário.',
        actionLabel: 'Ver Tickets',
        tab: 'sac'
      },
      {
        id: 'alt-3',
        level: 'warning',
        title: 'Setor Pista atingiu 82% da capacidade',
        description: 'Lote promocional prestes a esgotar no Metal Fest.',
        actionLabel: 'Ver Lotes',
        tab: 'eventos'
      },
      {
        id: 'alt-4',
        level: 'info',
        title: 'Conciliação bancária pendente',
        description: '3 repasses aguardando validação de fechamento.',
        actionLabel: 'Ver Financeiro',
        tab: 'financeiro'
      }
    ];
  },

  async getActivity(params = {}) {
    await apiClient.get('/dashboard/activity', params);
    return [
      {
        id: 'act-1',
        time: 'Há 4 min',
        type: 'venda',
        description: 'Pedido #10493 confirmado via Pix (2x Metal Fest)',
        amount: 'R$ 280,00'
      },
      {
        id: 'act-2',
        time: 'Há 18 min',
        type: 'marketing',
        description: 'Campanha "Primavera VIP" ativada no WhatsApp API',
        amount: '1.200 disparos'
      },
      {
        id: 'act-3',
        time: 'Há 42 min',
        type: 'financeiro',
        description: 'Repasse operacional de lote aprovado para produtor',
        amount: 'R$ 45.000,00'
      },
      {
        id: 'act-4',
        time: 'Há 1h',
        type: 'usuario',
        description: 'Novo operador adicionado à equipe da portaria',
        amount: 'Mariana Souza'
      },
      {
        id: 'act-5',
        time: 'Há 2h',
        type: 'sac',
        description: 'Chamado #432 encerrado com avaliação 5 estrelas',
        amount: 'Atendido'
      }
    ];
  },

  async getInsights(params = {}) {
    await apiClient.get('/dashboard/insights', params);
    return [
      {
        id: 'ins-1',
        type: 'crescimento',
        title: 'Conversão acelerada em canais diretos',
        text: 'Sua taxa de conversão aumentou 1,2 p.p. nesta semana impulsionada pelo checkout rápido em 1 clique.'
      },
      {
        id: 'ins-2',
        type: 'destaque',
        title: 'Metal Fest Curitiba concentra 64% da receita',
        text: 'O evento lidera a tração comercial do período. A virada de lote no próximo dia 10 aumentará a margem.'
      },
      {
        id: 'ins-3',
        type: 'otimizacao',
        title: 'WhatsApp possui a maior conversão rastreada',
        text: 'Os disparos comerciais via WhatsApp API geraram R$ 51.213 com taxa de abertura de 88%.'
      }
    ];
  }
};
