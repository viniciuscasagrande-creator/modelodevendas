import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  ShoppingCart,
  Percent,
  Receipt,
  Bell,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronDown,
  RotateCcw,
  Check,
} from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { useDashboardQuery } from '../hooks/useDashboardQuery';
import { KpiCard } from '../components/diskhub/KpiCard';
import { CurrentPlanCard } from '../components/diskhub/CurrentPlanCard';
import { GrowthBanner } from '../components/diskhub/GrowthBanner';
import { Skeleton } from '../components/ui/Skeleton';
import { formatCurrency, formatNumber, formatPercent } from '../utils/formatters';

export function DashboardPage() {
  const { user } = useAppContext();
  const { data, isLoading, refetch, isFetching } = useDashboardQuery();
  const [period, setPeriod] = useState('30d');
  const navigate = useNavigate();

  const kpis = data?.kpis;
  const series = data?.series || [];
  const alerts = data?.alerts || [];
  const activities = data?.recentActivity || [];

  return (
    <div data-testid="dashboard-page" className="space-y-6 pb-12 animate-fadeIn font-sans text-slate-100 max-w-full overflow-x-hidden">
      
      {/* 1. TOP GREETING & FILTERS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
            Bom dia, {user?.name?.split(' ')[0] || 'Produtor'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mb-0">
            Veja os principais indicadores da sua operação.
          </p>
        </div>

        {/* Period & Refresh Controls */}
        <div className="flex items-center space-x-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#111721] hover:bg-[#161d29] text-slate-300 border border-white/[0.08] text-xs font-semibold cursor-pointer transition-all disabled:opacity-50"
            title="Atualizar dados"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-slate-400 ${isFetching ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Atualizar</span>
          </button>

          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none text-xs bg-[#111721] hover:bg-[#161d29] text-white border border-white/[0.08] rounded-xl pl-3.5 pr-8 py-2 font-bold focus:outline-none focus:border-blue-500 cursor-pointer transition-all shadow-xs"
            >
              <option value="today">Hoje</option>
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="month">Mês atual</option>
              <option value="all">Todo o período</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 2. ROW 1: 4 KPIS + CURRENT PLAN CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 items-stretch">
        
        {/* LEFT 4 KPIS */}
        <div className="xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="dashboard-kpis">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))
          ) : (
            <>
              <KpiCard
                testId="kpi-revenue"
                title="Receita"
                value={formatCurrency(kpis?.revenue || 184320)}
                growth={formatPercent(kpis?.revenueGrowth || 12.4)}
                isPositive={(kpis?.revenueGrowth || 12.4) >= 0}
                icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
                sparklineColor="#10B981"
                sparklineData={[110, 130, 125, 145, 160, 155, 184]}
              />

              <KpiCard
                testId="kpi-orders"
                title="Pedidos"
                value={formatNumber(kpis?.orders || 2184)}
                growth={formatPercent(kpis?.ordersGrowth || 8.1)}
                isPositive={(kpis?.ordersGrowth || 8.1) >= 0}
                icon={<ShoppingCart className="w-5 h-5 text-blue-400" />}
                sparklineColor="#3B82F6"
                sparklineData={[140, 160, 170, 165, 190, 205, 218]}
              />

              <KpiCard
                testId="kpi-conversion"
                title="Conversão"
                value={`${(kpis?.conversion || 3.8).toFixed(1)}%`}
                growth={formatPercent(kpis?.conversionGrowth || 0.6)}
                isPositive={(kpis?.conversionGrowth || 0.6) >= 0}
                icon={<Percent className="w-5 h-5 text-indigo-400" />}
                sparklineColor="#6366F1"
                sparklineData={[3.1, 3.2, 3.4, 3.3, 3.6, 3.7, 3.8]}
              />

              <KpiCard
                testId="kpi-ticket"
                title="Ticket Médio"
                value={formatCurrency(kpis?.ticketAverage || 84.39)}
                growth={formatPercent(kpis?.ticketAverageGrowth || 3.2)}
                isPositive={(kpis?.ticketAverageGrowth || 3.2) >= 0}
                icon={<Receipt className="w-5 h-5 text-amber-400" />}
                sparklineColor="#F59E0B"
                sparklineData={[78, 80, 81, 79, 82, 83, 84]}
              />
            </>
          )}
        </div>

        {/* RIGHT: CURRENT PLAN CARD */}
        <div className="xl:col-span-1">
          <CurrentPlanCard />
        </div>
      </div>

      {/* 3. ROW 2: PERFORMANCE CHART + RECENT ACTIVITY + ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        
        {/* SALES PERFORMANCE BARS */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#111721] border border-white/[0.08] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
            <div>
              <h3 className="text-sm font-black text-white tracking-tight mb-0">
                Performance de Vendas
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Volume diário transacionado nos canais oficiais
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              +12,4% vs mês anterior
            </span>
          </div>

          {/* Bar Chart Representation */}
          <div className="h-44 flex items-end justify-between gap-3 px-2 pt-4">
            {series.length > 0 ? (
              series.map((pt, i) => {
                const maxVal = Math.max(...series.map((s) => s.receita)) || 1;
                const heightPct = Math.round((pt.receita / maxVal) * 80) + 20;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {formatCurrency(pt.receita)}
                    </div>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-blue-700 to-indigo-500 group-hover:from-blue-600 group-hover:to-cyan-400 transition-all shadow-inner"
                    />
                    <span className="text-[10px] text-slate-400 font-semibold">{pt.date}</span>
                  </div>
                );
              })
            ) : (
              <div className="w-full flex items-center justify-center text-xs text-slate-500">
                Nenhum dado disponível para o período selecionado.
              </div>
            )}
          </div>
        </div>

        {/* ALERTS & RECENT ACTIVITY */}
        <div className="p-5 rounded-2xl bg-[#111721] border border-white/[0.08] flex flex-col justify-between shadow-sm space-y-4">
          {/* Active Alerts */}
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06] mb-3">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
                  Alertas Operacionais
                </h4>
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                {alerts.length} ativos
              </span>
            </div>

            <div className="space-y-2.5">
              {alerts.map((alt) => (
                <div key={alt.id} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{alt.title}</span>
                    <span className="text-[9px] text-slate-500">{alt.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{alt.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div>
            <div className="flex items-center space-x-2 pb-2 border-b border-white/[0.06] mb-2.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
                Atividade Recente
              </h4>
            </div>

            <div className="space-y-2">
              {activities.slice(0, 3).map((act) => (
                <div key={act.id} className="flex items-center justify-between text-xs py-1">
                  <div className="min-w-0 pr-2">
                    <span className="text-slate-200 block truncate font-medium">{act.event}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{act.user}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0 font-mono">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 4. GROWTH BANNER */}
      <GrowthBanner />

      {/* 5. COMMERCIAL SHOWCASE: 3 TIERS */}
      <div className="p-6 rounded-2xl bg-[#111721] border border-white/[0.08] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06] mb-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block mb-1">
              PLANOS DISKHUB
            </span>
            <h3 className="text-lg font-black text-white tracking-tight">
              Um DiskHub para cada fase da sua operação
            </h3>
          </div>
          <button
            onClick={() => navigate('/app/planos')}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Ver comparativo completo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* STANDARD */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-wide block mb-1">Standard</span>
              <h4 className="text-sm font-bold text-white mb-1">Organize sua operação.</h4>
              <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                Centralize cadastros, vendas e controle financeiro essencial sem complexidade.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 mb-6">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>CRM & ERP Operacional</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Financeiro & Borderôs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Até 5 usuários inclusos</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => navigate('/app/planos?select=standard')}
              className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 cursor-pointer transition-all"
            >
              Falar com Consultor
            </button>
          </div>

          {/* ADVANCED */}
          <div className="p-5 rounded-xl bg-gradient-to-b from-blue-900/20 to-indigo-900/10 border border-blue-500/40 relative flex flex-col justify-between shadow-lg shadow-blue-500/5">
            <span className="absolute -top-2.5 right-4 text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
              MAIS RECOMENDADO
            </span>
            <div>
              <span className="text-xs font-black text-blue-400 uppercase tracking-wide block mb-1">Advanced</span>
              <h4 className="text-sm font-bold text-white mb-1">Venda mais e tenha mais controle.</h4>
              <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                Impulsione vendas através de marketing e inteligência de dados em tempo real.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 mb-6">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Tudo do Standard</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Marketing, SAC & BI Executivo</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Até 15 usuários inclusos</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => navigate('/app/planos?select=advanced')}
              className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer transition-all shadow-md shadow-blue-600/30"
            >
              Assinar Advanced
            </button>
          </div>

          {/* EXPERT */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-black text-amber-400 uppercase tracking-wide block mb-1">Expert</span>
              <h4 className="text-sm font-bold text-white mb-1">Automatize e escale sua operação.</h4>
              <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                Para grandes eventos e redes que demandam automações avançadas e inteligência.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 mb-6">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Tudo do Advanced</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Contabilidade, IA & Webhooks</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Usuários ilimitados</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => navigate('/app/planos?select=expert')}
              className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 cursor-pointer transition-all"
            >
              Conhecer Expert
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
