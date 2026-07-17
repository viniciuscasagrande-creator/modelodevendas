import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import KPICard from '../components/KPICard';
import RevenueChart from '../components/RevenueChart';
import SalesChart from '../components/SalesChart';
import Funnel from '../components/Funnel';
import FinanceCard from '../components/FinanceCard';
import Calendar from '../components/Calendar';
import Activities from '../components/Activities';
import EventList from '../components/EventList';
import TableSales from '../components/TableSales';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar as CalendarIcon, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function Dashboard() {
  const { 
    financialStats, 
    theme, 
    cardClass, 
    textTitle, 
    textSec, 
    borderCol,
    setCurrentTab
  } = useDiskHub();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4 border-[#E2E8F0] dark:border-[#1F2937]">
        <div>
          <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Visão Geral do Ecossistema</h2>
          <p className={`text-xs ${textSec} mb-0`}>Métricas consolidadas de vendas, acessos e auditoria inteligente em tempo real.</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border ${borderCol} text-xs font-semibold ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'}`}>
            <CalendarIcon className={`w-3.5 h-3.5 ${textSec}`} />
            <span>Período: Últimos 30 dias</span>
          </div>
        </div>
      </div>

      {/* Hero promo widget */}
      <div className={`card ${cardClass} p-5 relative overflow-hidden bg-white dark:bg-[#111827] border-0 shadow-sm`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${textSec} block mb-1`}>Receita Consolidada do Mês</span>
            <div className="flex items-baseline space-x-3">
              <span className={`text-4xl md:text-5xl font-black ${textTitle} tracking-tighter`}>
                R$ {financialStats.receita.toLocaleString('pt-BR')}
              </span>
              <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded-full font-mono flex items-center shrink-0">
                ▲ 14%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 mb-0">Previsão estimada de faturamento de R$ 3.1M baseado no ritmo de vendas atual.</p>
          </div>
          <button 
            onClick={() => setCurrentTab('marketing')}
            className="btn btn-primary bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold py-2.5 px-4 rounded-xl border-0 cursor-pointer shadow-md shadow-[#F97316]/20 transition-all flex items-center space-x-1.5 self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ver Otimizações de Marketing</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="absolute right-0 bottom-[-50px] w-96 h-96 bg-[#F97316]/5 dark:bg-[#F97316]/10 rounded-full blur-[80px] pointer-events-none"></div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Faturamento Bruto" 
          value={`R$ ${financialStats.receita.toLocaleString('pt-BR')}`}
          icon={DollarSign}
          trend="+14.2%"
          borderLeftColor="#F97316"
        />
        <KPICard 
          title="Saldo de Caixa" 
          value={`R$ ${financialStats.saldo.toLocaleString('pt-BR')}`}
          icon={TrendingUp}
          trend="Estável"
          trendColor="text-blue-500"
          trendBg="bg-blue-500/10"
          borderLeftColor="#3B82F6"
        />
        <KPICard 
          title="Lucro Líquido" 
          value={`R$ ${financialStats.lucro.toLocaleString('pt-BR')}`}
          icon={Sparkles}
          trend="+18.5%"
          borderLeftColor="#10B981"
        />
        <KPICard 
          title="Ingressos Vendidos" 
          value={`${financialStats.ingressos.toLocaleString('pt-BR')} un`}
          icon={Users}
          trend="+8.2%"
          borderLeftColor="#8B5CF6"
        />
      </div>

      {/* Main Grid: charts and details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column (2/3 size): charts & lists */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RevenueChart />
            <SalesChart />
          </div>
          <TableSales />
        </div>

        {/* Right column (1/3 size): widgets */}
        <div className="space-y-4">
          <Funnel />
          <FinanceCard />
          <EventList />
          <Calendar />
          <Activities />
        </div>
      </div>
    </div>
  );
}
