import React, { useState } from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { 
  DollarSign, 
  Ticket, 
  CreditCard, 
  Filter, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Monitor, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Plus, 
  UserPlus, 
  RotateCcw, 
  MoreHorizontal, 
  ChevronRight, 
  ChevronDown, 
  ExternalLink,
  Users,
  ShoppingBag,
  Star,
  Settings,
  Building,
  Headphones
} from 'lucide-react';

export default function Dashboard() {
  const {
    setCurrentTab,
    selectedCompany,
    selectedProducer,
    selectedEventContext, setSelectedEventContext,
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
      name: 'Rock Festival 2025',
      date: '05 Set • A partir 18h',
      sold: '2.842',
      occupancy: 82,
      revenue: 'R$ 284.520',
      tagColor: 'bg-emerald-500'
    },
    {
      id: 'ev-2',
      name: 'Show do Artista X',
      date: '12 Set • A partir 20h',
      sold: '1.910',
      occupancy: 64,
      revenue: 'R$ 124.380',
      tagColor: 'bg-emerald-500'
    },
    {
      id: 'ev-3',
      name: 'Teatro: A Comédia',
      date: '20 Set • A partir 19h',
      sold: '1.320',
      occupancy: 43,
      revenue: 'R$ 68.420',
      tagColor: 'bg-lime-500'
    },
    {
      id: 'ev-4',
      name: 'Festival Kids',
      date: '28 Set • A partir 15h',
      sold: '849',
      occupancy: 28,
      revenue: 'R$ 32.180',
      tagColor: 'bg-amber-500'
    }
  ];

  const handleOpenEvent = (eventItem) => {
    setSelectedEventForDetail(eventItem);
    setSelectedEventContext(eventItem.name);
    setCurrentTab('eventos');
    triggerToast("Navegando para o Evento", `Abrindo painel operacional: ${eventItem.name}`);
  };

  return (
    <div className="space-y-4 pb-12 animate-fadeIn font-sans">
      
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

      {/* 2. HEADER DA CENTRAL DE OPERAÇÕES */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-1">
        <div>
          <h1 className={`text-2xl font-black ${textTitle} tracking-tight mb-0.5 flex items-center gap-2`}>
            <span>Central de Operações</span>
          </h1>
          <p className={`text-xs ${textSec} mb-0`}>
            Acompanhe em tempo real o desempenho do seu ecossistema de vendas.
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
            <span>Personalizar dashboard</span>
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

      {/* 4. PRIMARY KPIS GRID (ROW 1 - 6 CARDS) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Card 1: Receita Hoje */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[#10B981] flex items-center justify-center shrink-0">
              <DollarSign className="w-4 h-4 font-black" />
            </div>
            <span className="text-[9.5px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Receita Hoje
            </span>
          </div>
          <div>
            <div className="flex items-baseline space-x-1.5 flex-wrap">
              <span className="text-lg font-black text-slate-900 dark:text-white">R$ 284.520</span>
              <span className="inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                ↑ 14,2%
              </span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 block">
              vs ontem (R$ 248.980)
            </span>
          </div>
        </div>

        {/* Card 2: Ingressos Vendidos */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#3B82F6] flex items-center justify-center shrink-0">
              <Ticket className="w-4 h-4 font-black" />
            </div>
            <span className="text-[9.5px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Ingressos Vendidos
            </span>
          </div>
          <div>
            <div className="flex items-baseline space-x-1.5 flex-wrap">
              <span className="text-lg font-black text-slate-900 dark:text-white">4.921</span>
              <span className="inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                ↑ 8,2%
              </span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 block">
              vs ontem (4.548)
            </span>
          </div>
        </div>

        {/* Card 3: Ticket Médio */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-500/10 text-[#8B5CF6] flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4 font-black" />
            </div>
            <span className="text-[9.5px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Ticket Médio
            </span>
          </div>
          <div>
            <div className="flex items-baseline space-x-1.5 flex-wrap">
              <span className="text-lg font-black text-slate-900 dark:text-white">R$ 57,81</span>
              <span className="inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                ↑ 4,3%
              </span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 block">
              vs ontem (R$ 55,41)
            </span>
          </div>
        </div>

        {/* Card 4: Conversão */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0">
              <Filter className="w-4 h-4 font-black" />
            </div>
            <span className="text-[9.5px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Conversão
            </span>
          </div>
          <div>
            <div className="flex items-baseline space-x-1.5 flex-wrap">
              <span className="text-lg font-black text-slate-900 dark:text-white">8,7%</span>
              <span className="inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                ↑ 1,2 p.p.
              </span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 block">
              vs ontem (7,5%)
            </span>
          </div>
        </div>

        {/* Card 5: Ocupação Média */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 font-black" />
            </div>
            <span className="text-[9.5px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Ocupação Média
            </span>
          </div>
          <div>
            <div className="flex items-baseline space-x-1.5 flex-wrap">
              <span className="text-lg font-black text-slate-900 dark:text-white">68%</span>
              <span className="inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                ↑ 6%
              </span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 block">
              vs ontem (62%)
            </span>
          </div>
        </div>

        {/* Card 6: Eventos Ativos */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-pink-50 dark:bg-pink-500/10 text-pink-500 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 font-black" />
            </div>
            <span className="text-[9.5px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Eventos Ativos
            </span>
          </div>
          <div>
            <div className="flex items-baseline space-x-1.5 flex-wrap">
              <span className="text-lg font-black text-slate-900 dark:text-white">12</span>
              <span className="inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                —
              </span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 block">
              sem alteração
            </span>
          </div>
        </div>
      </div>

      {/* 5. SECONDARY OPERATIONAL INDICATORS (ROW 2 - 6 CARDS) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Cancelamentos */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm flex items-center space-x-3">
          <div className="w-7 h-7 rounded-full bg-red-50 dark:bg-red-500/10 text-[#EF4444] flex items-center justify-center shrink-0">
            <XCircle className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1">
              <span className="text-[9px] font-extrabold uppercase text-slate-400">Cancelamentos</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-black text-slate-900 dark:text-white">132</span>
              <span className="text-[8px] font-bold text-red-500 bg-red-100 dark:bg-red-500/20 px-1 py-0.2 rounded">↑ 12%</span>
            </div>
            <span className="text-[8.5px] text-slate-400 block truncate">vs ontem (118)</span>
          </div>
        </div>

        {/* Estornos */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm flex items-center space-x-3">
          <div className="w-7 h-7 rounded-full bg-orange-50 dark:bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-extrabold uppercase text-slate-400 block">Estornos</span>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-black text-slate-900 dark:text-white">R$ 18.450</span>
              <span className="text-[8px] font-bold text-red-500 bg-red-100 dark:bg-red-500/20 px-1 py-0.2 rounded">↑ 8%</span>
            </div>
            <span className="text-[8.5px] text-slate-400 block truncate">vs ontem (R$ 17.050)</span>
          </div>
        </div>

        {/* PDVs Online */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm flex items-center space-x-3">
          <div className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[#10B981] flex items-center justify-center shrink-0">
            <Monitor className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-extrabold uppercase text-slate-400 block">PDVs Online</span>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-black text-slate-900 dark:text-white">16 / 18</span>
              <span className="text-[8px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20 px-1 py-0.2 rounded">● 88%</span>
            </div>
            <span className="text-[8.5px] text-slate-400 block truncate">PDVs operacionais</span>
          </div>
        </div>

        {/* Totens Online */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm flex items-center space-x-3">
          <div className="w-7 h-7 rounded-full bg-purple-50 dark:bg-purple-500/10 text-[#8B5CF6] flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-extrabold uppercase text-slate-400 block">Totens Online</span>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-black text-slate-900 dark:text-white">7 / 8</span>
              <span className="text-[8px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20 px-1 py-0.2 rounded">● 88%</span>
            </div>
            <span className="text-[8.5px] text-slate-400 block truncate">Totens operacionais</span>
          </div>
        </div>

        {/* Gateway */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm flex items-center space-x-3">
          <div className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[#10B981] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-extrabold uppercase text-slate-400 block">Gateway</span>
            <span className="text-sm font-black text-slate-900 dark:text-white block">Operacional</span>
            <span className="text-[8.5px] text-slate-400 block truncate">Todas as transações</span>
          </div>
        </div>

        {/* Última Atualização */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm flex items-center space-x-3">
          <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-[#1E293B] text-slate-400 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-extrabold uppercase text-slate-400 block">Última Atualização</span>
            <span className="text-sm font-black text-slate-900 dark:text-white block">12:05:23</span>
            <span className="text-[8.5px] text-slate-400 block truncate">Atualizado agora</span>
          </div>
        </div>
      </div>

      {/* 6. MIDDLE GRID: CHARTS + PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* LEFT COLUMN: RECEITA X META (5 COLS) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">Receita x Meta</h3>
                <p className="text-[10px] text-slate-400 mb-0">Acompanhamento diário</p>
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
                <span className="text-slate-700 dark:text-slate-300">Receita realizada</span>
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
            <div className="py-4 relative">
              <svg viewBox="0 0 450 180" className="w-full h-44 overflow-visible">
                {/* Horizontal Grid lines */}
                <line x1="40" y1="20" x2="440" y2="20" stroke="currentColor" strokeOpacity="0.07" />
                <line x1="40" y1="60" x2="440" y2="60" stroke="currentColor" strokeOpacity="0.07" />
                <line x1="40" y1="100" x2="440" y2="100" stroke="currentColor" strokeOpacity="0.07" />
                <line x1="40" y1="140" x2="440" y2="140" stroke="currentColor" strokeOpacity="0.07" />

                {/* Y-axis labels */}
                <text x="5" y="24" className="text-[9px] fill-slate-400 font-mono">R$ 400K</text>
                <text x="5" y="64" className="text-[9px] fill-slate-400 font-mono">R$ 300K</text>
                <text x="5" y="104" className="text-[9px] fill-slate-400 font-mono">R$ 200K</text>
                <text x="5" y="144" className="text-[9px] fill-slate-400 font-mono">R$ 100K</text>
                <text x="18" y="175" className="text-[9px] fill-slate-400 font-mono">R$ 0</text>

                {/* Meta Curve (Blue Dashed) */}
                <path
                  d="M 50 160 C 110 140, 180 110, 240 85 C 310 60, 370 45, 430 35"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />

                {/* Receita Realizada Curve (Orange Solid) */}
                <path
                  d="M 50 165 C 110 150, 180 120, 240 98 C 300 75, 340 70, 390 55"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="3"
                />

                {/* Marker at current point */}
                <circle cx="390" cy="55" r="4.5" fill="#F97316" className="drop-shadow" />
                
                {/* Badge on point */}
                <g transform="translate(350, 25)">
                  <rect width="65" height="18" rx="4" fill="#F97316" />
                  <text x="32.5" y="12" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                    R$ 284.520
                  </text>
                </g>

                {/* X-axis date labels */}
                <text x="50" y="175" className="text-[8.5px] fill-slate-400" textAnchor="middle">28 Ago</text>
                <text x="110" y="175" className="text-[8.5px] fill-slate-400" textAnchor="middle">29 Ago</text>
                <text x="175" y="175" className="text-[8.5px] fill-slate-400" textAnchor="middle">30 Ago</text>
                <text x="240" y="175" className="text-[8.5px] fill-slate-400" textAnchor="middle">31 Ago</text>
                <text x="300" y="175" className="text-[8.5px] fill-slate-400" textAnchor="middle">01 Set</text>
                <text x="360" y="175" className="text-[8.5px] fill-slate-400" textAnchor="middle">02 Set</text>
                <text x="420" y="175" className="text-[8.5px] fill-slate-400 font-bold" textAnchor="middle">03 Set</text>
              </svg>
            </div>
          </div>

          {/* Bottom Summary Indicators */}
          <div className="pt-3 border-t border-slate-100 dark:border-white/5 grid grid-cols-4 gap-2 text-center text-xs">
            <div>
              <span className="text-[9px] text-slate-400 block font-semibold">Meta do período</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">R$ 3.100.000</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-semibold">Realizado</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">R$ 2.642.000</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-semibold">% da meta</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">85,2%</span>
              <div className="w-full bg-slate-100 dark:bg-white/10 h-1 rounded-full mt-1 overflow-hidden">
                <div className="bg-emerald-500 h-1 rounded-full" style={{ width: '85.2%' }}></div>
              </div>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-semibold">Projeção final</span>
              <div className="flex items-center justify-center space-x-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">R$ 3.120.000</span>
                <span className="text-[8px] text-emerald-500 font-bold">↑ 0,6%</span>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: PERFORMANCE POR CANAL (4 COLS) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">Performance por canal</h3>
                <p className="text-[10px] text-slate-400 mb-0">Receita por canal de venda</p>
              </div>
              <div className="flex items-center space-x-1 text-xs text-slate-500 bg-slate-100 dark:bg-[#1E293B] px-2 py-1 rounded-md border border-slate-200 dark:border-white/5 cursor-pointer">
                <span>{channelPeriod}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>

            {/* Donut Chart and legend */}
            <div className="py-4 flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* SVG Donut */}
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-36 h-36 -rotate-90 transform">
                  {/* Segment 1: Online 68% (Orange) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#F97316"
                    strokeWidth="14"
                    strokeDasharray="162.4 238.7"
                    strokeDashoffset="0"
                  />
                  {/* Segment 2: PDV 18% (Blue) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#3B82F6"
                    strokeWidth="14"
                    strokeDasharray="43.0 238.7"
                    strokeDashoffset="-162.4"
                  />
                  {/* Segment 3: Totem 10% (Purple) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#8B5CF6"
                    strokeWidth="14"
                    strokeDasharray="23.9 238.7"
                    strokeDashoffset="-205.4"
                  />
                  {/* Segment 4: Bilheteria 4% (Teal) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#14B8A6"
                    strokeWidth="14"
                    strokeDasharray="9.5 238.7"
                    strokeDashoffset="-229.3"
                  />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[12px] font-black text-slate-900 dark:text-white">R$ 284.520</span>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Total</span>
                </div>
              </div>

              {/* Channel Stats List */}
              <div className="space-y-2 w-full max-w-[170px] text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] shrink-0"></span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">Online</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white block text-[11px]">R$ 193.473</span>
                    <span className="text-[9px] text-slate-400">68% <span className="text-emerald-500 font-bold">↑ 15%</span></span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shrink-0"></span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">PDV</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white block text-[11px]">R$ 51.178</span>
                    <span className="text-[9px] text-slate-400">18% <span className="text-emerald-500 font-bold">↑ 8%</span></span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shrink-0"></span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">Totem</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white block text-[11px]">R$ 28.452</span>
                    <span className="text-[9px] text-slate-400">10% <span className="text-emerald-500 font-bold">↑ 6%</span></span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] shrink-0"></span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">Bilheteria</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white block text-[11px]">R$ 7.984</span>
                    <span className="text-[9px] text-slate-400">4% <span className="text-red-500 font-bold">↓ -2%</span></span>
                  </div>
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
              <span>Ver análise completa</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: ALERTAS INTELIGENTES (3 COLS) */}
        <div className="lg:col-span-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0">Alertas inteligentes</h3>
                <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center">
                  3
                </span>
              </div>
            </div>

            <div className="py-2 space-y-2 text-xs">
              {/* Alert 1 */}
              <div className="p-2.5 rounded-xl border border-red-200 dark:border-red-500/20 bg-red-50/50 dark:bg-red-500/5 flex items-start justify-between gap-2">
                <div className="flex items-start space-x-2 min-w-0">
                  <div className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    !
                  </div>
                  <div>
                    <span className="font-bold text-red-600 dark:text-red-400 block text-[11px]">PDV 03 offline</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">Verifique a conexão ou reinicie o terminal.</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[8.5px] text-slate-400 block mb-1">Há 8 minutos</span>
                  <button 
                    onClick={() => {
                      setCurrentTab('pdv');
                      triggerToast("Terminal PDV", "Abrindo diagnóstico do PDV 03...");
                    }}
                    className="text-[10px] font-bold text-red-600 hover:underline bg-transparent border-0 cursor-pointer"
                  >
                    Resolver &gt;
                  </button>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="p-2.5 rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5 flex items-start justify-between gap-2">
                <div className="flex items-start space-x-2 min-w-0">
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    !
                  </div>
                  <div>
                    <span className="font-bold text-amber-600 dark:text-amber-400 block text-[11px]">Setor Pista atingiu 82%</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">Lote atual próximo do limite de ocupação.</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <button 
                    onClick={() => {
                      setCurrentTab('eventos');
                      triggerToast("Setores do Evento", "Abrindo gestão de lotes e setores...");
                    }}
                    className="text-[10px] font-bold text-amber-600 hover:underline bg-transparent border-0 cursor-pointer"
                  >
                    Ver evento &gt;
                  </button>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="p-2.5 rounded-xl border border-orange-200 dark:border-orange-500/20 bg-orange-50/50 dark:bg-orange-500/5 flex items-start justify-between gap-2">
                <div className="flex items-start space-x-2 min-w-0">
                  <div className="w-5 h-5 rounded-full bg-[#F97316] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    !
                  </div>
                  <div>
                    <span className="font-bold text-[#F97316] block text-[11px]">Evento Rock Festival 2025</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">Vendas abaixo da projeção em 18%.</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <button 
                    onClick={() => {
                      setCurrentTab('ai');
                      triggerToast("Análise IA", "Abrindo diagnóstico preditivo Disk AI...");
                    }}
                    className="text-[10px] font-bold text-[#F97316] hover:underline bg-transparent border-0 cursor-pointer"
                  >
                    Analisar &gt;
                  </button>
                </div>
              </div>

              {/* Gateway Status OK */}
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#1E293B]/40 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <div>
                    <span className="text-[10.5px] font-bold text-slate-800 dark:text-slate-200 block">Gateway de pagamento</span>
                    <span className="text-[9px] text-slate-400 block">Operação normal em todos os métodos.</span>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-white/5 text-center">
            <button 
              type="button" 
              onClick={() => triggerToast("Central de Alertas", "Nenhum novo alerta crítico pendente.")}
              className="text-xs font-bold text-[#F97316] hover:underline bg-transparent border-0 cursor-pointer inline-flex items-center space-x-1"
            >
              <span>Ver todos os alertas</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 7. BOTTOM ROW: TOP EVENTOS + RESUMO RÁPIDO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* TOP EVENTOS (8 COLS) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5 mb-3">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">Top eventos</h3>
              <p className="text-[10px] text-slate-400 mb-0">Desempenho dos eventos ativos</p>
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

        {/* RESUMO RÁPIDO (4 COLS) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-white/5 mb-3">
              Resumo rápido
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#1E293B]/40">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Vendas em andamento</span>
                </div>
                <span className="text-sm font-black text-blue-600 dark:text-blue-400 font-mono">24</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#1E293B]/40">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-md bg-purple-50 dark:bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Cortesias emitidas</span>
                </div>
                <span className="text-sm font-black text-purple-600 dark:text-purple-400 font-mono">38</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#1E293B]/40">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Clientes novos (hoje)</span>
                </div>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">156</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#1E293B]/40">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Avaliações (média)</span>
                </div>
                <span className="text-sm font-black text-amber-500 font-mono">4,7 / 5</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <span>Produtora Responsável:</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">{selectedProducer}</span>
          </div>
        </div>
      </div>

      {/* 8. BOTTOM STATUS STRIP */}
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

      {/* 9. FLOATING SUPPORT BUTTON */}
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
