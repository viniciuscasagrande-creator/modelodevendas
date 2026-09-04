import React, { useState } from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { 
  DollarSign, 
  Ticket, 
  TrendingUp, 
  Calendar, 
  XCircle, 
  Monitor, 
  Layers, 
  ShieldCheck, 
  Plus, 
  UserPlus, 
  RotateCcw, 
  MoreHorizontal, 
  ChevronRight, 
  ChevronDown, 
  ExternalLink,
  Users,
  ShoppingBag,
  Settings,
  Building,
  Headphones,
  WalletCards,
  Eye,
  CheckCircle
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

  const [dateRange] = useState('Hoje, 03 de setembro');
  const [channelPeriod] = useState('Hoje');
  const [eventsPeriod] = useState('Hoje');

  const topEventsData = [
    {
      id: 'ev-1',
      name: 'Metal Fest Curitiba 2026',
      date: '05 Set • A partir 18h',
      sold: '2.842',
      occupancy: 82,
      revenue: 'R$ 284.520',
      tagColor: 'bg-emerald-500',
      status: 'Ativo'
    },
    {
      id: 'ev-2',
      name: 'Festival de Inverno 2026',
      date: '12 Set • A partir 20h',
      sold: '1.910',
      occupancy: 64,
      revenue: 'R$ 124.380',
      tagColor: 'bg-emerald-500',
      status: 'Ativo'
    },
    {
      id: 'ev-3',
      name: 'Rock Festival 2025',
      date: '20 Set • A partir 19h',
      sold: '1.320',
      occupancy: 43,
      revenue: 'R$ 68.420',
      tagColor: 'bg-lime-500',
      status: 'Ativo'
    },
    {
      id: 'ev-4',
      name: 'Festival Kids 2026',
      date: '28 Set • A partir 15h',
      sold: '849',
      occupancy: 28,
      revenue: 'R$ 32.180',
      tagColor: 'bg-amber-500',
      status: 'Ativo'
    }
  ];

  const handleOpenEvent = (eventItem) => {
    setSelectedEventForDetail(eventItem);
    setSelectedEventContext(eventItem.name);
    setCurrentTab('eventos');
    triggerToast("Navegando para o Evento", `Abrindo painel operacional: ${eventItem.name}`);
  };

  return (
    <div className="dashboard-container space-y-5 pb-6 font-sans w-full max-w-[1600px] mx-auto animate-fadeIn">
      
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
              <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
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

      {/* 2. HEADER DO DASHBOARD (TÍTULO + PERÍODO) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-1">
        <div>
          <h1 className={`text-2xl font-black ${textTitle} tracking-tight mb-0.5 flex items-center gap-2`}>
            <span>Dashboard</span>
          </h1>
          <p className={`text-xs ${textSec} mb-0`}>
            Visão consolidada em tempo real das vendas, operações e métricas do produtor.
          </p>
        </div>

        {/* Date & Customizer Buttons */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Período: {dateRange}</span>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-1" />
          </div>

          <button 
            type="button"
            onClick={() => triggerToast("Personalização", "Modo de layout customizável ativo.")}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all"
          >
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>Personalizar</span>
          </button>
        </div>
      </div>

      {/* 3. QUICK ACTIONS BAR (AÇÕES RÁPIDAS) */}
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
            <span className="text-[10px] text-slate-400 block truncate">Criar venda rápida</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setShowQuickEventModal(true)}
          className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] hover:border-[#3B82F6] hover:shadow-md transition-all text-left flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-[#3B82F6] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">Novo evento</span>
            <span className="text-[10px] text-slate-400 block truncate">Criar novo evento</span>
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
            <span className="text-[10px] text-slate-400 block truncate">Cadastrar cliente</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setShowQuickCourtesyModal(true)}
          className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] hover:border-[#8B5CF6] hover:shadow-md transition-all text-left flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-[#8B5CF6] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Ticket className="w-4 h-4" />
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
            <span className="text-[10px] text-slate-400 block truncate">Cancelar uma venda</span>
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

      {/* 4. TOP 4 KPIS GRID (FATURAMENTO, SALDO CAIXA, LUCRO, INGRESSOS VENDIDOS) */}
      <div className="dashboard-kpis grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="dashboard-kpis">
        
        {/* KPI 1: Faturamento */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Faturamento Hoje
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[#10B981] flex items-center justify-center shrink-0">
              <DollarSign className="w-4 h-4 font-black" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2 flex-wrap">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">R$ 284.520</span>
              <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                ↑ 14,2%
              </span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
              vs ontem (R$ 248.980)
            </span>
          </div>
        </div>

        {/* KPI 2: Saldo Caixa */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Saldo em Caixa
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#3B82F6] flex items-center justify-center shrink-0">
              <WalletCards className="w-4 h-4 font-black" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2 flex-wrap">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">R$ 142.850</span>
              <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                ↑ 8,5%
              </span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
              vs ontem (R$ 131.650)
            </span>
          </div>
        </div>

        {/* KPI 3: Lucro */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Lucro Líquido
            </span>
            <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-500/10 text-[#8B5CF6] flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 font-black" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2 flex-wrap">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">R$ 98.420</span>
              <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
                ↑ 11,4%
              </span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
              Margem operacional de 34,6%
            </span>
          </div>
        </div>

        {/* KPI 4: Ingressos Vendidos */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Ingressos Vendidos
            </span>
            <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0">
              <Ticket className="w-4 h-4 font-black" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2 flex-wrap">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">4.921</span>
              <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                ↑ 8,2%
              </span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
              vs ontem (4.548 ingressos)
            </span>
          </div>
        </div>

      </div>

      {/* 5. PRIMARY GRID (SEGUNDA LINHA: 3 GRÁFICOS PRINCIPAIS UNIFORMES) */}
      <div 
        className="dashboard-primary-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch"
        data-testid="dashboard-primary-grid"
      >
        
        {/* CARD 1: CONVERSÃO & RECEITA X META */}
        <div className="dashboard-chart-card min-h-[300px] h-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">Conversão & Receita x Meta</h3>
                <p className="text-[10px] text-slate-400 mb-0">Acompanhamento diário consolidado</p>
              </div>
              <div className="flex items-center space-x-1 text-xs text-slate-500 bg-slate-100 dark:bg-[#1E293B] px-2 py-1 rounded-md border border-slate-200 dark:border-white/5 cursor-pointer">
                <span>Receita</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center space-x-4 pt-3 text-[10px] font-semibold text-slate-500">
              <span className="flex items-center space-x-1">
                <span className="w-3 h-1 bg-[#F97316] rounded-full inline-block"></span>
                <span className="text-slate-700 dark:text-slate-300">Realizada</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-3 h-0.5 border-b border-dashed border-[#3B82F6] inline-block"></span>
                <span>Meta</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-3 h-0.5 border-b border-dotted border-slate-400 inline-block"></span>
                <span>Projeção</span>
              </span>
            </div>

            {/* SVG Chart Graphic */}
            <div className="chart-wrapper relative w-full h-[180px] py-2">
              <svg viewBox="0 0 450 160" className="w-full h-full overflow-visible">
                <line x1="40" y1="20" x2="440" y2="20" stroke="currentColor" strokeOpacity="0.07" />
                <line x1="40" y1="55" x2="440" y2="55" stroke="currentColor" strokeOpacity="0.07" />
                <line x1="40" y1="90" x2="440" y2="90" stroke="currentColor" strokeOpacity="0.07" />
                <line x1="40" y1="125" x2="440" y2="125" stroke="currentColor" strokeOpacity="0.07" />

                <text x="5" y="24" className="text-[9px] fill-slate-400 font-mono">R$ 400K</text>
                <text x="5" y="59" className="text-[9px] fill-slate-400 font-mono">R$ 300K</text>
                <text x="5" y="94" className="text-[9px] fill-slate-400 font-mono">R$ 200K</text>
                <text x="5" y="129" className="text-[9px] fill-slate-400 font-mono">R$ 100K</text>

                <path
                  d="M 50 145 C 110 130, 180 100, 240 75 C 310 50, 370 38, 430 30"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />

                <path
                  d="M 50 150 C 110 135, 180 110, 240 88 C 300 68, 340 60, 390 48"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="3"
                />

                <circle cx="390" cy="48" r="4.5" fill="#F97316" className="drop-shadow" />
                
                <g transform="translate(345, 18)">
                  <rect width="65" height="18" rx="4" fill="#F97316" />
                  <text x="32.5" y="12" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                    R$ 284.520
                  </text>
                </g>

                <text x="50" y="155" className="text-[8.5px] fill-slate-400" textAnchor="middle">28 Ago</text>
                <text x="115" y="155" className="text-[8.5px] fill-slate-400" textAnchor="middle">29 Ago</text>
                <text x="180" y="155" className="text-[8.5px] fill-slate-400" textAnchor="middle">30 Ago</text>
                <text x="245" y="155" className="text-[8.5px] fill-slate-400" textAnchor="middle">31 Ago</text>
                <text x="310" y="155" className="text-[8.5px] fill-slate-400" textAnchor="middle">01 Set</text>
                <text x="375" y="155" className="text-[8.5px] fill-slate-400" textAnchor="middle">02 Set</text>
                <text x="430" y="155" className="text-[8.5px] fill-slate-400 font-bold" textAnchor="middle">03 Set</text>
              </svg>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/5 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="text-[9px] text-slate-400 block font-semibold">Meta</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">R$ 3.100.000</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-semibold">Realizado</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">85,2%</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-semibold">Projeção</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">R$ 3.120.000</span>
            </div>
          </div>
        </div>

        {/* CARD 2: DESEMPENHO POR SETOR & CANAL */}
        <div className="dashboard-chart-card min-h-[300px] h-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">Desempenho por Setor & Canal</h3>
                <p className="text-[10px] text-slate-400 mb-0">Distribuição da receita por ponto de contato</p>
              </div>
              <div className="flex items-center space-x-1 text-xs text-slate-500 bg-slate-100 dark:bg-[#1E293B] px-2 py-1 rounded-md border border-slate-200 dark:border-white/5 cursor-pointer">
                <span>{channelPeriod}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>

            <div className="py-3 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90 transform">
                  <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F97316" strokeWidth="13" strokeDasharray="162.4 238.7" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="38" fill="transparent" stroke="#3B82F6" strokeWidth="13" strokeDasharray="43.0 238.7" strokeDashoffset="-162.4" />
                  <circle cx="50" cy="50" r="38" fill="transparent" stroke="#8B5CF6" strokeWidth="13" strokeDasharray="23.9 238.7" strokeDashoffset="-205.4" />
                  <circle cx="50" cy="50" r="38" fill="transparent" stroke="#14B8A6" strokeWidth="13" strokeDasharray="9.5 238.7" strokeDashoffset="-229.3" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] font-black text-slate-900 dark:text-white">R$ 284K</span>
                  <span className="text-[8.5px] text-slate-400 uppercase font-bold tracking-wider">Total</span>
                </div>
              </div>

              <div className="space-y-1.5 w-full max-w-[160px] text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] shrink-0"></span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">Online</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-[11px]">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shrink-0"></span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">PDV Físico</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-[11px]">18%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shrink-0"></span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">Totens</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-[11px]">10%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] shrink-0"></span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">Bilheteria</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-[11px]">4%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-white/5 text-center">
            <button 
              type="button"
              onClick={() => setCurrentTab('financeiro')}
              className="text-xs font-bold text-[#F97316] hover:underline bg-transparent border-0 cursor-pointer inline-flex items-center space-x-1"
            >
              <span>Ver canais detalhados</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 3: FUNIL COMERCIAL DE VENDAS */}
        <div className="dashboard-chart-card min-h-[300px] h-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">Funil de Vendas</h3>
                <p className="text-[10px] text-slate-400 mb-0">Conversão de visitantes em compradores</p>
              </div>
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">
                Tx. Conv: 2,9%
              </span>
            </div>

            {/* Funnel bars */}
            <div className="py-3 space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1 font-semibold text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5"><Eye className="w-3 h-3 text-indigo-500" /> Visitantes</span>
                  <span className="font-bold">73.815 (100%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-2 rounded-full w-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-semibold text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5"><Users className="w-3 h-3 text-blue-500" /> Interessados</span>
                  <span className="font-bold">14.025 (19%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '19%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-semibold text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5"><ShoppingBag className="w-3 h-3 text-teal-500" /> Carrinhos</span>
                  <span className="font-bold">4.921 (6,7%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: '6.7%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-semibold text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /> Compras Efetuadas</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">2.116 (2,9%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '2.9%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-white/5 text-center">
            <button 
              type="button"
              onClick={() => setCurrentTab('crm')}
              className="text-xs font-bold text-[#F97316] hover:underline bg-transparent border-0 cursor-pointer inline-flex items-center space-x-1"
            >
              <span>Ver CRM & Leads</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 6. SECONDARY GRID (TERCEIRA LINHA: 2FR ESQUERDA / 1FR DIREITA) */}
      <div 
        className="dashboard-secondary-grid grid grid-cols-1 lg:grid-cols-3 gap-4"
        data-testid="dashboard-secondary-grid"
      >
        
        {/* COLUNA ESQUERDA (2FR): RECEITA/VENDAS + TOP EVENTOS */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* CARD TOP EVENTOS / OPERAÇÃO */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5 mb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">Top Eventos & Operação</h3>
                <p className="text-[10px] text-slate-400 mb-0">Desempenho dos eventos ativos em tempo real</p>
              </div>
              <div className="flex items-center space-x-1 text-xs text-slate-500 bg-slate-100 dark:bg-[#1E293B] px-2 py-1 rounded-md border border-slate-200 dark:border-white/5 cursor-pointer">
                <span>{eventsPeriod}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-white/5">
                    <th className="pb-2 font-black">Evento</th>
                    <th className="pb-2 font-black text-center">Vendidos</th>
                    <th className="pb-2 font-black text-center">Ocupação</th>
                    <th className="pb-2 font-black text-right">Receita</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {topEventsData.map((ev) => (
                    <tr 
                      key={ev.id} 
                      onClick={() => handleOpenEvent(ev)}
                      className="hover:bg-slate-50 dark:hover:bg-[#1E293B]/60 transition-colors cursor-pointer group"
                    >
                      <td className="py-2.5">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                            🎫
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block group-hover:text-[#F97316] transition-colors">
                              {ev.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block">{ev.date}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 text-center font-bold text-slate-800 dark:text-slate-200">
                        {ev.sold}
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center justify-center space-x-2 max-w-[130px] mx-auto">
                          <div className="flex-1 bg-slate-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${ev.tagColor}`} 
                              style={{ width: `${ev.occupancy}%` }}
                            ></div>
                          </div>
                          <span className="text-[10.5px] font-bold text-slate-700 dark:text-slate-300 w-8 text-right">
                            {ev.occupancy}%
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 text-right font-black text-slate-900 dark:text-white">
                        {ev.revenue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

          {/* CARD INDICADORES OPERACIONAIS E CANAIS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-full bg-red-50 dark:bg-red-500/10 text-[#EF4444] flex items-center justify-center shrink-0">
                <XCircle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-extrabold uppercase text-slate-400 block truncate">Cancelamentos</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">132</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[#10B981] flex items-center justify-center shrink-0">
                <Monitor className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-extrabold uppercase text-slate-400 block truncate">PDVs Online</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">16 / 18</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-full bg-purple-50 dark:bg-purple-500/10 text-[#8B5CF6] flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-extrabold uppercase text-slate-400 block truncate">Totens</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">7 / 8</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[#10B981] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-extrabold uppercase text-slate-400 block truncate">Gateway</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">100% OK</span>
              </div>
            </div>
          </div>

        </div>

        {/* COLUNA DIREITA (1FR): EVENTOS/ATIVIDADES + ALERTAS + RESUMO */}
        <div className="lg:col-span-1 space-y-4">
          
          {/* EVENTOS / ATIVIDADES EM DESTAQUE */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5 mb-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0">Eventos / Atividades</h3>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded">
                2 Principais
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div 
                onClick={() => handleOpenEvent(topEventsData[0])}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 hover:border-[#F97316] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-slate-900 dark:text-white text-xs block">Metal Fest Curitiba 2026</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    Ativo
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>2.842 ingressos</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">R$ 284.520</span>
                </div>
              </div>

              <div 
                onClick={() => handleOpenEvent(topEventsData[1])}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 hover:border-[#F97316] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-slate-900 dark:text-white text-xs block">Festival de Inverno 2026</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    Ativo
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>1.910 ingressos</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">R$ 124.380</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-center mt-3">
              <button 
                type="button" 
                onClick={() => setCurrentTab('eventos')}
                className="text-xs font-bold text-[#F97316] hover:underline bg-transparent border-0 cursor-pointer inline-flex items-center space-x-1"
              >
                <span>Ver todos</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ALERTAS INTELIGENTES */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5 mb-3">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0">Alertas / Insights</h3>
                <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center">
                  3
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl border border-red-200 dark:border-red-500/20 bg-red-50/50 dark:bg-red-500/5 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="font-bold text-red-600 dark:text-red-400 block text-[11px]">PDV 03 offline</span>
                  <span className="text-[10px] text-slate-500 block leading-tight">Verifique a conexão ou reinicie o terminal.</span>
                </div>
                <button 
                  onClick={() => {
                    setCurrentTab('pdv');
                    triggerToast("Terminal PDV", "Abrindo diagnóstico do PDV 03...");
                  }}
                  className="text-[10px] font-bold text-red-600 hover:underline bg-transparent border-0 cursor-pointer shrink-0"
                >
                  Resolver &gt;
                </button>
              </div>

              <div className="p-2.5 rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="font-bold text-amber-600 dark:text-amber-400 block text-[11px]">Setor Pista atingiu 82%</span>
                  <span className="text-[10px] text-slate-500 block leading-tight">Lote atual próximo do limite.</span>
                </div>
                <button 
                  onClick={() => {
                    setCurrentTab('eventos');
                    triggerToast("Setores do Evento", "Abrindo gestão de lotes e setores...");
                  }}
                  className="text-[10px] font-bold text-amber-600 hover:underline bg-transparent border-0 cursor-pointer shrink-0"
                >
                  Ver &gt;
                </button>
              </div>

              <div className="p-2.5 rounded-xl border border-orange-200 dark:border-orange-500/20 bg-orange-50/50 dark:bg-orange-500/5 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="font-bold text-[#F97316] block text-[11px]">Rock Festival 2025</span>
                  <span className="text-[10px] text-slate-500 block leading-tight">Vendas abaixo da projeção em 18%.</span>
                </div>
                <button 
                  onClick={() => {
                    setCurrentTab('ai');
                    triggerToast("Análise IA", "Abrindo diagnóstico preditivo Disk AI...");
                  }}
                  className="text-[10px] font-bold text-[#F97316] hover:underline bg-transparent border-0 cursor-pointer shrink-0"
                >
                  Analisar &gt;
                </button>
              </div>
            </div>
          </div>

          {/* RESUMO RÁPIDO */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-black text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-white/5 mb-3">
              Resumo Operacional
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#1E293B]/40">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Vendas em andamento</span>
                <span className="text-sm font-black text-blue-600 dark:text-blue-400 font-mono">24</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#1E293B]/40">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Cortesias emitidas</span>
                <span className="text-sm font-black text-purple-600 dark:text-purple-400 font-mono">38</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#1E293B]/40">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Clientes novos (hoje)</span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">156</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#1E293B]/40">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Avaliações (média)</span>
                <span className="text-sm font-black text-amber-500 font-mono">4,7 / 5</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 7. BOTTOM STATUS STRIP */}
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
            <strong className="text-slate-700 dark:text-slate-200">v2.8.1</strong>
          </div>
          <div>
            <span>Uptime: </span>
            <strong className="text-emerald-600 dark:text-emerald-400">99,98%</strong>
          </div>
        </div>
      </div>

      {/* 8. FLOATING SUPPORT BUTTON */}
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
