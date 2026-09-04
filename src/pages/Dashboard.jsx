import React, { useState, useEffect } from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { dashboardService } from '../services/dashboardService';
import TrendIndicator from '../components/dashboard/TrendIndicator';
import DashboardFilters from '../components/dashboard/DashboardFilters';
import { 
  DollarSign, 
  Ticket, 
  TrendingUp, 
  ShieldCheck, 
  Plus, 
  UserPlus, 
  RotateCcw, 
  MoreHorizontal, 
  ChevronRight, 
  ChevronDown, 
  ExternalLink,
  Users,
  Building,
  Headphones,
  WalletCards,
  AlertTriangle,
  Activity,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function Dashboard() {
  const {
    setCurrentTab,
    selectedCompany,
    selectedProducer,
    selectedEventContext, 
    setSelectedEventContext,
    setShowQuickSaleModal,
    setShowQuickEventModal,
    setShowQuickClientModal,
    setShowQuickCourtesyModal,
    setShowQuickCancelModal,
    setSelectedEventForDetail,
    triggerToast,
    textTitle,
    textSec
  } = useDiskHub();

  const [period, setPeriod] = useState('30d');
  const [eventId, setEventId] = useState('all');
  const [summary, setSummary] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [funnel, setFunnel] = useState(null);
  const [finance, setFinance] = useState(null);
  const [events, setEvents] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [insights, setInsights] = useState([]);

  // Load dashboard data whenever filters change
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      const [sum, perf, fun, fin, evs, alts, acts, ins] = await Promise.all([
        dashboardService.getSummary({ period, eventId }),
        dashboardService.getPerformance({ period, eventId }),
        dashboardService.getFunnel({ period, eventId }),
        dashboardService.getFinanceSummary({ period, eventId }),
        dashboardService.getEvents({ period, eventId }),
        dashboardService.getAlerts({ period, eventId }),
        dashboardService.getActivity({ period, eventId }),
        dashboardService.getInsights({ period, eventId })
      ]);
      if (isMounted) {
        setSummary(sum);
        setPerformance(perf);
        setFunnel(fun);
        setFinance(fin);
        setEvents(evs);
        setAlerts(alts);
        setActivities(acts);
        setInsights(ins);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, [period, eventId]);

  const handleOpenEvent = (eventItem) => {
    setSelectedEventForDetail(eventItem);
    setSelectedEventContext(eventItem.name);
    setCurrentTab('eventos');
    triggerToast("Navegando para o Evento", `Abrindo painel operacional: ${eventItem.name}`);
  };

  return (
    <div data-testid="dashboard-page" className="dashboard-container space-y-5 font-sans w-full max-w-[1600px] mx-auto animate-fadeIn">
      
      {/* 1. CONTEXT CASCADE CONTROLLER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#111827] p-2.5 px-3.5 rounded-xl border border-slate-200 dark:border-[#1F2937] shadow-sm">
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-slate-500 tracking-wider">
            Contexto atual
          </span>
          <div className="flex items-center space-x-1.5 flex-wrap">
            {/* Org */}
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/5 font-semibold text-slate-800 dark:text-slate-200">
              <Building className="w-3.5 h-3.5 text-[#F97316]" />
              <span>{selectedCompany}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </div>

            <span className="text-slate-300 dark:text-slate-600">/</span>

            {/* Produtor */}
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/5 font-semibold text-slate-800 dark:text-slate-200">
              <Users className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>{selectedProducer}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </div>

            <span className="text-slate-300 dark:text-slate-600">/</span>

            {/* Evento */}
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-[#F97316]/10 border border-[#F97316]/30 font-bold text-[#F97316]">
              <Ticket className="w-3.5 h-3.5 text-[#F97316]" />
              <span>{selectedEventContext}</span>
              <ChevronDown className="w-3 h-3 text-[#F97316] ml-0.5" />
            </div>
          </div>
        </div>

        {/* Action Right Button */}
        <div className="flex items-center space-x-2">
          <button 
            type="button"
            onClick={() => {
              setCurrentTab('eventos');
              triggerToast("Configurações do Evento", "Abrindo painel do evento selecionado...");
            }}
            className="text-[11px] font-bold text-[#F97316] hover:underline flex items-center space-x-1 cursor-pointer bg-transparent border-0"
          >
            <span>Gerenciar este evento</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. HEADER EXECUTIVO + FILTROS GLOBAIS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-1">
        <div>
          <h1 className={`text-2xl font-black ${textTitle} tracking-tight mb-0.5`}>
            Dashboard Executivo
          </h1>
          <p className={`text-xs ${textSec} mb-0`}>
            Indicadores unificados de receita, conversão, eventos e operação comercial.
          </p>
        </div>

        {/* FILTROS GLOBAIS DE PERÍODO E EVENTO */}
        <DashboardFilters 
          period={period}
          eventId={eventId}
          onPeriodChange={(p) => setPeriod(p)}
          onEventChange={(e) => setEventId(e)}
        />
      </div>

      {/* 3. AÇÕES RÁPIDAS (ATALHOS OPERACIONAIS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <button
          type="button"
          onClick={() => setShowQuickSaleModal(true)}
          className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] hover:border-[#F97316] hover:shadow-md transition-all text-left flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-orange-50 dark:bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Plus className="w-5 h-5 font-bold" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">Nova venda</span>
            <span className="text-[10px] text-slate-400 block truncate">Lançar pedido</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setShowQuickEventModal(true)}
          className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] hover:border-[#3B82F6] hover:shadow-md transition-all text-left flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-[#3B82F6] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Ticket className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">Novo evento</span>
            <span className="text-[10px] text-slate-400 block truncate">Criar evento</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setShowQuickClientModal(true)}
          className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] hover:border-[#10B981] hover:shadow-md transition-all text-left flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-[#10B981] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <UserPlus className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">Novo cliente</span>
            <span className="text-[10px] text-slate-400 block truncate">Cadastrar lead</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setShowQuickCourtesyModal(true)}
          className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] hover:border-[#8B5CF6] hover:shadow-md transition-all text-left flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-[#8B5CF6] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">Emitir cortesia</span>
            <span className="text-[10px] text-slate-400 block truncate">Gerar cortesia</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setShowQuickCancelModal(true)}
          className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] hover:border-[#EF4444] hover:shadow-md transition-all text-left flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-500/10 text-[#EF4444] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">Cancelar venda</span>
            <span className="text-[10px] text-slate-400 block truncate">Estorno rápido</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => triggerToast("Mais Ações", "Exportar DRE, Fechamento de Caixa e Integrações.")}
          className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] hover:bg-slate-50 dark:hover:bg-white/5 hover:shadow-md transition-all text-left flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-[#1E293B] text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0">
            <MoreHorizontal className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex items-center space-x-1">
            <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">Mais ações</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </button>
      </div>

      {/* 4. BLOCO 1: RESUMO EXECUTIVO (4 KPIs PRINCIPAIS) */}
      <div className="dashboard-kpis grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="dashboard-kpis">
        
        {/* KPI 1: RECEITA */}
        <div data-testid="kpi-revenue" className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Receita Total
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[#10B981] flex items-center justify-center shrink-0">
              <DollarSign className="w-4 h-4 font-black" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2 flex-wrap">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                R$ {(summary?.revenue || 284520).toLocaleString('pt-BR')}
              </span>
              <TrendIndicator value={summary?.revenueGrowth || 12.4} />
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
              vs. período anterior
            </span>
          </div>
        </div>

        {/* KPI 2: PEDIDOS */}
        <div data-testid="kpi-orders" className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Pedidos Confirmados
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#3B82F6] flex items-center justify-center shrink-0">
              <Ticket className="w-4 h-4 font-black" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2 flex-wrap">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {(summary?.orders || 4921).toLocaleString('pt-BR')}
              </span>
              <TrendIndicator value={summary?.ordersGrowth || 8.2} />
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
              ingressos emitidos
            </span>
          </div>
        </div>

        {/* KPI 3: CONVERSÃO */}
        <div data-testid="kpi-conversion" className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Taxa de Conversão
            </span>
            <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-500/10 text-[#8B5CF6] flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 font-black" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2 flex-wrap">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {summary?.conversion || 8.7}%
              </span>
              <TrendIndicator value={summary?.conversionGrowth || 1.2} suffix=" p.p." />
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
              visitas para compras
            </span>
          </div>
        </div>

        {/* KPI 4: TICKET MÉDIO */}
        <div data-testid="kpi-ticket-average" className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Ticket Médio
            </span>
            <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0">
              <WalletCards className="w-4 h-4 font-black" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2 flex-wrap">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                R$ {(summary?.ticketAverage || 57.81).toFixed(2).replace('.', ',')}
              </span>
              <TrendIndicator value={summary?.ticketAverageGrowth || 4.3} />
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
              por transação
            </span>
          </div>
        </div>

      </div>

      {/* 5. BLOCO 2: PERFORMANCE (2/3) + FUNIL DE VENDAS (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        
        {/* PERFORMANCE DE VENDAS (2/3) */}
        <div 
          data-testid="sales-performance-chart"
          className="lg:col-span-2 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">
                  Performance de Vendas
                </h3>
                <p className="text-[10px] text-slate-400 mb-0">
                  {performance?.periodLabel || 'Período atual vs. anterior'}
                </p>
              </div>

              {/* Legenda simples */}
              <div className="flex items-center space-x-3 text-[11px] font-semibold">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-1 bg-[#F97316] rounded-full inline-block"></span>
                  <span className="text-slate-700 dark:text-slate-300">Atual</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-0.5 border-b border-dashed border-[#3B82F6] inline-block"></span>
                  <span className="text-slate-400">Anterior</span>
                </span>
              </div>
            </div>

            {/* Gráfico SVG de performance com curvas */}
            <div className="chart-wrapper relative w-full h-[220px] py-2">
              <svg viewBox="0 0 600 180" className="w-full h-full overflow-visible">
                <line x1="40" y1="25" x2="580" y2="25" stroke="currentColor" strokeOpacity="0.07" />
                <line x1="40" y1="65" x2="580" y2="65" stroke="currentColor" strokeOpacity="0.07" />
                <line x1="40" y1="105" x2="580" y2="105" stroke="currentColor" strokeOpacity="0.07" />
                <line x1="40" y1="145" x2="580" y2="145" stroke="currentColor" strokeOpacity="0.07" />

                <text x="5" y="29" className="text-[9px] fill-slate-400 font-mono">R$ 300K</text>
                <text x="5" y="69" className="text-[9px] fill-slate-400 font-mono">R$ 200K</text>
                <text x="5" y="109" className="text-[9px] fill-slate-400 font-mono">R$ 100K</text>
                <text x="5" y="149" className="text-[9px] fill-slate-400 font-mono">R$ 0</text>

                {/* Linha período anterior (Azul tracejado) */}
                <path
                  d="M 50 160 C 130 145, 210 120, 300 95 C 380 75, 460 55, 560 38"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Linha período atual (Laranja contínuo) */}
                <path
                  d="M 50 155 C 130 135, 210 100, 300 70 C 380 48, 460 35, 560 22"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="3"
                />

                <circle cx="560" cy="22" r="5" fill="#F97316" className="drop-shadow" />

                <g transform="translate(485, 2)">
                  <rect width="80" height="20" rx="5" fill="#F97316" />
                  <text x="40" y="14" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                    R$ 284.520
                  </text>
                </g>

                {/* Eixo X */}
                <text x="50" y="168" className="text-[9px] fill-slate-400" textAnchor="middle">01 Set</text>
                <text x="135" y="168" className="text-[9px] fill-slate-400" textAnchor="middle">05 Set</text>
                <text x="220" y="168" className="text-[9px] fill-slate-400" textAnchor="middle">10 Set</text>
                <text x="305" y="168" className="text-[9px] fill-slate-400" textAnchor="middle">15 Set</text>
                <text x="390" y="168" className="text-[9px] fill-slate-400" textAnchor="middle">20 Set</text>
                <text x="475" y="168" className="text-[9px] fill-slate-400" textAnchor="middle">25 Set</text>
                <text x="560" y="168" className="text-[9px] fill-slate-400 font-bold" textAnchor="middle">30 Set</text>
              </svg>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/5 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Meta de Vendas</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">R$ 3.100.000</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Atingimento</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">85,2%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Projeção Final</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">R$ 3.120.000 (↑ 0,6%)</span>
            </div>
          </div>
        </div>

        {/* FUNIL DE CONVERSÃO + ORIGEM (1/3) */}
        <div 
          data-testid="conversion-funnel"
          className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5 mb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">
                  Funil de Conversão
                </h3>
                <p className="text-[10px] text-slate-400 mb-0">
                  Taxas de passagem entre etapas
                </p>
              </div>
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded">
                Geral: 8,5%
              </span>
            </div>

            {/* Etapas do Funil com Taxas Relativas */}
            <div className="space-y-2.5 text-xs">
              {(funnel?.stages || [
                { name: 'Visualizações', count: 48320, pct: '100%', dropPct: null },
                { name: 'Checkout Iniciado', count: 7840, pct: '16,2%', dropPct: '16,2% do total' },
                { name: 'Pedidos Gerados', count: 4360, pct: '9,0%', dropPct: '55,6% do checkout' },
                { name: 'Pagamentos Confirmados', count: 4110, pct: '8,5%', dropPct: '94,3% dos pedidos' }
              ]).map((stage, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200 text-[11px] mb-0.5">
                    <span>{stage.name}</span>
                    <span>{stage.count.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Participação: <strong>{stage.pct}</strong></span>
                    {stage.dropPct && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {stage.dropPct}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Origem das Vendas Compacta */}
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                Origem das Vendas
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                {(funnel?.sources || [
                  { channel: 'Direto / Orgânico', pct: 38 },
                  { channel: 'Instagram Ads', pct: 30 },
                  { channel: 'WhatsApp Disparos', pct: 18 },
                  { channel: 'Google Search', pct: 10 }
                ]).slice(0, 4).map((src, i) => (
                  <div key={i} className="flex items-center justify-between p-1.5 rounded bg-slate-100/50 dark:bg-white/5">
                    <span className="truncate max-w-[90px]">{src.channel}</span>
                    <strong className="text-slate-700 dark:text-slate-300">{src.pct}%</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-center mt-2">
            <button 
              type="button"
              onClick={() => setCurrentTab('marketing')}
              className="text-xs font-bold text-[#F97316] hover:underline bg-transparent border-0 cursor-pointer inline-flex items-center space-x-1"
            >
              <span>Ver Marketing & Origens</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 6. BLOCO 3: FINANCEIRO RESUMIDO (1/2) + OPERAÇÃO DE EVENTOS (1/2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        
        {/* FINANCEIRO RESUMIDO (1/2) */}
        <div 
          data-testid="finance-summary"
          className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5 mb-3">
              <div className="flex items-center space-x-2">
                <WalletCards className="w-4 h-4 text-[#F97316]" />
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0">
                  Resumo Financeiro
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCurrentTab('financeiro')}
                className="text-xs font-bold text-[#F97316] hover:underline bg-transparent border-0 cursor-pointer inline-flex items-center space-x-1"
              >
                <span>Ver Financeiro</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block font-semibold">Receita Bruta</span>
                <span className="text-base font-black text-slate-900 dark:text-white block mt-0.5">
                  R$ {(finance?.grossRevenue || 284520).toLocaleString('pt-BR')}
                </span>
                <span className="text-[9px] text-slate-400">Total transacionado</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block font-semibold">Saldo Disponível</span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">
                  R$ {(finance?.availableBalance || 142850).toLocaleString('pt-BR')}
                </span>
                <span className="text-[9px] text-emerald-600/70 dark:text-emerald-400/70">Livre para repasse</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block font-semibold">Saldo a Liberar</span>
                <span className="text-base font-black text-blue-600 dark:text-blue-400 block mt-0.5">
                  R$ {(finance?.pendingBalance || 46210).toLocaleString('pt-BR')}
                </span>
                <span className="text-[9px] text-slate-400">D+2 / D+14</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block font-semibold">Repasses Aprovados</span>
                <span className="text-base font-black text-slate-900 dark:text-white block mt-0.5">
                  R$ {(finance?.approvedRepasses || 118400).toLocaleString('pt-BR')}
                </span>
                <span className="text-[9px] text-slate-400">Transferidos</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block font-semibold">Taxas e Serviços</span>
                <span className="text-base font-black text-slate-700 dark:text-slate-300 block mt-0.5">
                  R$ {(finance?.platformFees || 22761).toLocaleString('pt-BR')}
                </span>
                <span className="text-[9px] text-slate-400">8,0% consolidado</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block font-semibold">Estornos & Chargeback</span>
                <span className="text-base font-black text-rose-600 dark:text-rose-400 block mt-0.5">
                  R$ {(finance?.refunds || 4280).toLocaleString('pt-BR')}
                </span>
                <span className="text-[9px] text-rose-600/70 dark:text-rose-400/70">1,5% de cancelamento</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
            <span className="text-emerald-700 dark:text-emerald-300 font-bold">
              Margem Líquida da Operação: {finance?.marginPct || 34.6}%
            </span>
            <span className="text-[10px] text-slate-500">Conciliação automática ativa</span>
          </div>
        </div>

        {/* OPERAÇÃO DE EVENTOS (1/2) */}
        <div 
          data-testid="event-performance"
          className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5 mb-3">
              <div className="flex items-center space-x-2">
                <Ticket className="w-4 h-4 text-[#3B82F6]" />
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0">
                  Operação de Eventos
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-400">
                {events.length} eventos monitorados
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {events.slice(0, 3).map((ev) => (
                <div 
                  key={ev.id}
                  onClick={() => handleOpenEvent(ev)}
                  className="p-3 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 hover:border-[#F97316] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block group-hover:text-[#F97316] transition-colors">
                        {ev.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block">{ev.date} • {ev.venue}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        ev.status === 'Ativo' 
                          ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                      }`}>
                        {ev.status}
                      </span>
                      <span className="text-xs font-black text-slate-800 dark:text-slate-200 block mt-1">
                        {ev.revenue}
                      </span>
                    </div>
                  </div>

                  {/* Barra de progresso */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{ev.sold.toLocaleString('pt-BR')} de {ev.capacity.toLocaleString('pt-BR')} vendidos</span>
                      <strong className="text-slate-700 dark:text-slate-300">{ev.occupancy}%</strong>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#F97316] h-1.5 rounded-full" 
                        style={{ width: `${ev.occupancy}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-center mt-2">
            <button 
              type="button" 
              onClick={() => setCurrentTab('eventos')}
              className="text-xs font-bold text-[#F97316] hover:underline bg-transparent border-0 cursor-pointer inline-flex items-center space-x-1"
            >
              <span>Ver todos os eventos</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 7. BLOCO 4: CENTRAL DE ALERTAS (1/2) + ATIVIDADE RECENTE (1/2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        
        {/* CENTRAL DE ALERTAS (1/2) */}
        <div 
          data-testid="alerts-panel"
          className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5 mb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0">
                  Alertas Operacionais
                </h3>
              </div>
              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center">
                {alerts.length}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {alerts.map((alt) => {
                const isCrit = alt.level === 'critical';
                const isWarn = alt.level === 'warning';
                return (
                  <div 
                    key={alt.id}
                    className={`p-2.5 rounded-xl border flex items-start justify-between gap-2 ${
                      isCrit 
                        ? 'border-red-200 dark:border-red-500/20 bg-red-50/50 dark:bg-red-500/5' 
                        : (isWarn 
                          ? 'border-amber-200 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5' 
                          : 'border-blue-200 dark:border-blue-500/20 bg-blue-50/50 dark:bg-blue-500/5')
                    }`}
                  >
                    <div className="min-w-0">
                      <span className={`font-bold block text-[11px] ${
                        isCrit ? 'text-red-600 dark:text-red-400' : (isWarn ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400')
                      }`}>
                        {alt.title}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight">
                        {alt.description}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentTab(alt.tab);
                        triggerToast("Central de Alertas", `Abrindo módulo: ${alt.actionLabel}`);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 hover:bg-slate-100 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 cursor-pointer shrink-0 transition-colors"
                    >
                      {alt.actionLabel}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-center mt-2">
            <span className="text-[11px] text-slate-400">
              Gateway e rotinas de conciliação operando normalmente.
            </span>
          </div>
        </div>

        {/* ATIVIDADE RECENTE (1/2) */}
        <div 
          data-testid="recent-activity"
          className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5 mb-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-[#10B981]" />
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0">
                  Atividade Recente
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">
                Tempo real
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {activities.map((act) => (
                <div key={act.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-white/5">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span className="text-[9.5px] font-mono text-slate-400 shrink-0">
                      {act.time}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium text-[11px] truncate">
                      {act.description}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-[11px] shrink-0 ml-2">
                    {act.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-center mt-2">
            <button 
              type="button" 
              onClick={() => setCurrentTab('relatorios')}
              className="text-xs font-bold text-[#F97316] hover:underline bg-transparent border-0 cursor-pointer inline-flex items-center space-x-1"
            >
              <span>Ver histórico completo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 8. BLOCO 5: INSIGHTS EXECUTIVOS (LARGURA TOTAL) */}
      <div 
        data-testid="insights-panel"
        className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm"
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5 mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#F97316]" />
            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0">
              Insights & Oportunidades Comerciais
            </h3>
          </div>
          <span className="text-[10px] font-bold text-slate-400">
            Baseado no comportamento das vendas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {insights.map((ins) => (
            <div key={ins.id} className="p-3 rounded-xl bg-orange-50/40 dark:bg-[#F97316]/5 border border-[#F97316]/20 flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-xs block mb-1">
                  {ins.title}
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-0 leading-relaxed">
                  {ins.text}
                </p>
              </div>
              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={() => triggerToast("Insight Comercial", ins.title)}
                  className="text-[10px] font-bold text-[#F97316] hover:underline bg-transparent border-0 cursor-pointer inline-flex items-center space-x-0.5"
                >
                  <span>Explorar</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. STATUS STRIP DO RODAPÉ */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] px-4 py-2.5 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-slate-800 dark:text-slate-200">Status do sistema:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Todos os sistemas operacionais</span>
        </div>

        <div className="flex items-center space-x-6 text-[11px] text-slate-400">
          <div>
            <span>Ambiente: </span>
            <strong className="text-slate-700 dark:text-slate-200">Produção</strong>
          </div>
          <div>
            <span>Versão: </span>
            <strong className="text-slate-700 dark:text-slate-200">v2.8.2</strong>
          </div>
          <div>
            <span>Uptime: </span>
            <strong className="text-emerald-600 dark:text-emerald-400">99,98%</strong>
          </div>
        </div>
      </div>

      {/* 10. FLOATING SUPPORT BUTTON */}
      <button 
        type="button"
        onClick={() => triggerToast("Suporte DiskHub", "Canal de suporte com o gerente de contas aberto.")}
        className="fixed bottom-6 right-20 z-40 w-12 h-12 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white shadow-xl flex items-center justify-center border-0 cursor-pointer hover:scale-105 transition-transform"
        title="Falar com suporte"
      >
        <Headphones className="w-5 h-5" />
      </button>

    </div>
  );
}
