export interface KpiData {
  revenue: number;
  revenueGrowth: number;
  orders: number;
  ordersGrowth: number;
  conversion: number;
  conversionGrowth: number;
  ticketAverage: number;
  ticketAverageGrowth: number;
}

export interface ChartPoint {
  date: string;
  receita: number;
  pedidos: number;
}

export interface AlertItem {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'error' | 'success';
  time: string;
}

export interface ActivityItem {
  id: string;
  event: string;
  user: string;
  time: string;
}

export interface DashboardSummaryResponse {
  kpis: KpiData;
  series: ChartPoint[];
  alerts: AlertItem[];
  recentActivity: ActivityItem[];
  subscription: {
    plan: string;
    planName: string;
    status: string;
    users: number;
    activeApps: number;
  };
}
