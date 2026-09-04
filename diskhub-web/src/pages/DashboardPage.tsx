import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { useDashboardQuery } from '../hooks/useDashboardQuery';
import { KpiCard } from '../components/premium/KpiCard';
import { SalesChart } from '../components/premium/SalesChart';
import { ActivityCard } from '../components/premium/ActivityCard';
import { AlertsCard } from '../components/premium/AlertsCard';
import { CurrentPlan } from '../components/premium/CurrentPlan';
import { GrowthBanner } from '../components/premium/GrowthBanner';
import { PlanCard } from '../components/premium/PlanCard';
import { formatCurrency, formatNumber } from '../utils/formatters';

export function DashboardPage() {
  const { user } = useAppContext();
  const { data, refetch, isFetching } = useDashboardQuery();
  const navigate = useNavigate();

  const kpis = data?.kpis;

  const kpiItems = [
    {
      label: 'Receita',
      value: formatCurrency(kpis?.revenue || 184320),
      change: `+${kpis?.revenueGrowth || 12.4}%`,
      tone: 'green',
    },
    {
      label: 'Pedidos',
      value: formatNumber(kpis?.orders || 2184),
      change: `+${kpis?.ordersGrowth || 8.1}%`,
      tone: 'blue',
    },
    {
      label: 'Conversão',
      value: `${(kpis?.conversion || 3.8).toFixed(1)}%`,
      change: `+${kpis?.conversionGrowth || 0.6}%`,
      tone: 'purple',
    },
    {
      label: 'Ticket Médio',
      value: formatCurrency(kpis?.ticketAverage || 84.39),
      change: `+${kpis?.ticketAverageGrowth || 3.2}%`,
      tone: 'amber',
    },
  ];

  return (
    <div data-testid="dashboard-page" className="dashboard animate-fadeIn">
      {/* 1. Dashboard Top Bar */}
      <section className="dashboard-top">
        <div>
          <h1>Bom dia, {user?.name?.split(' ')[0] || 'Ana'}!</h1>
          <p>Sua operação está em crescimento. Veja os principais indicadores de hoje.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="period"
            onClick={() => refetch()}
            title="Atualizar dados"
            aria-label="Atualizar dados"
          >
            <CalendarDays size={16} className={isFetching ? 'animate-spin' : ''} />
            <span>Atualizar</span>
          </button>
          <button className="period">
            <span>Últimos 30 dias</span>
            <span>⌄</span>
          </button>
        </div>
      </section>

      {/* 2. Overview Grid (4 KPIs + Current Plan Card) */}
      <section className="overview-grid" data-testid="dashboard-kpis">
        <div className="kpi-grid">
          {kpiItems.map((k, i) => (
            <KpiCard key={k.label} index={i} {...k} />
          ))}
        </div>
        <CurrentPlan />
      </section>

      {/* 3. Analytics Grid (Sales Chart + Activity + Alerts) */}
      <section className="analytics-grid">
        <SalesChart />
        <ActivityCard />
        <AlertsCard />
      </section>

      {/* 4. Growth Banner */}
      <GrowthBanner />

      {/* 5. Commercial Plans Showcase (3 Tiers) */}
      <section className="plans-section">
        <div className="plans-copy">
          <div className="eyebrow">PLANOS DISKHUB</div>
          <div className="tiny-line" />
          <h2>
            Um DiskHub
            <br />
            para <span>cada fase</span>
            <br />
            da sua <span>operação.</span>
          </h2>
          <p>
            Organize sua empresa, aumente suas vendas e evolua para uma operação integrada, automatizada e orientada por dados.
          </p>
          <div className="plan-copy-actions">
            <button
              onClick={() => navigate('/app/planos')}
              className="primary-light"
            >
              Conhecer os pacotes <span>→</span>
            </button>
            <button
              onClick={() => navigate('/app/planos')}
              className="secondary-dark"
            >
              Comparar planos
            </button>
          </div>
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate('/app/planos');
            }}
            href="#planos"
          >
            Descobrir meu plano <span>→</span>
          </a>
        </div>

        <div className="plans-grid">
          <PlanCard
            kind="standard"
            title="Organize sua operação."
            subtitle="Para produtores que precisam centralizar clientes, gestão administrativa e financeiro."
            items={['CRM', 'ERP', 'Financeiro', 'Mais controle', 'Menos planilhas']}
          />
          <PlanCard
            kind="advanced"
            recommended
            title="Venda mais e tenha mais controle."
            subtitle="Para produtores que querem crescer utilizando marketing, atendimento estruturado e inteligência de dados."
            items={[
              'Tudo do Standard',
              'Marketing',
              'SAC',
              'BI & Analytics',
              'Mais vendas',
              'Mais inteligência',
            ]}
          />
          <PlanCard
            kind="expert"
            title="Automatize e escale sua operação."
            subtitle="Para operações profissionais que precisam integrar sistemas, automatizar processos e utilizar inteligência."
            items={[
              'Tudo do Advanced',
              'Contabilidade',
              'Automação',
              'Inteligência Artificial',
              'Integrações',
              'Mais escala',
            ]}
          />
        </div>
      </section>
    </div>
  );
}
