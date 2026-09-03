import React, { useState } from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { 
  Calendar, 
  MapPin, 
  Ticket, 
  CheckCircle2, 
  ArrowLeft, 
  Plus, 
  Settings 
} from 'lucide-react';

export default function EventDashboardPage({ onBack }) {
  const {
    selectedEventForDetail,
    selectedEventContext,
    selectedProducer,
    setShowQuickSaleModal,
    setShowQuickCourtesyModal,
    triggerToast,
    textTitle
  } = useDiskHub();

  const event = selectedEventForDetail || {
    id: 'ev-1',
    name: selectedEventContext || 'Rock Festival 2025',
    date: '03 a 05 de Setembro de 2026',
    venue: 'Pedreira Paulo Leminski',
    city: 'Curitiba - PR',
    status: 'Ativo',
    sold: 2842,
    capacity: 3500,
    revenue: 284520,
    ticketAvg: 100.11,
    cancellations: 32,
    refunds: 4280
  };

  const [activeTab, setActiveTab] = useState('visao-geral');

  // Marketing Inheritance State
  const [metaPixelMode, setMetaPixelMode] = useState('personalizado'); // 'herdar' | 'personalizado'
  const [metaPixelId, setMetaPixelId] = useState('89124892019482');
  const [gaId, setGaId] = useState('G-98420194');
  const [googleAdsId, setGoogleAdsId] = useState('AW-8821094');
  const [tiktokPixelId, setTiktokPixelId] = useState('');

  // Lotes State
  const batches = [
    { id: 1, name: 'Lote 1 (Promocional)', total: 1000, sold: 1000, price: 90, status: 'Esgotado', color: 'bg-slate-500' },
    { id: 2, name: 'Lote 2', total: 2000, sold: 1440, price: 140, status: 'Ativo', color: 'bg-emerald-500' },
    { id: 3, name: 'Lote 3', total: 3000, sold: 402, price: 180, status: 'Programado', color: 'bg-blue-500' }
  ];

  // Sectors State
  const sectors = [
    { name: 'Pista Comum', occupancy: 82, total: 3000, sold: 2460, price: 'R$ 140,00' },
    { name: 'VIP Open Bar', occupancy: 64, total: 1000, sold: 640, price: 'R$ 250,00' },
    { name: 'Camarote Produtor', occupancy: 43, total: 500, sold: 215, price: 'R$ 450,00' }
  ];

  // Sessions State
  const sessions = [
    { id: 's1', date: '03 Set • 18:00', status: 'Ativa', sold: 2842, capacity: 3500 },
    { id: 's2', date: '04 Set • 18:00', status: 'Ativa', sold: 1920, capacity: 3500 },
    { id: 's3', date: '05 Set • 18:00', status: 'Programada', sold: 0, capacity: 3500 }
  ];

  return (
    <div className="space-y-4 pb-12 animate-fadeIn font-sans">
      
      {/* 1. TOP HEADER DO EVENTO */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 sm:p-5 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div className="flex items-start space-x-3.5">
            {onBack && (
              <button 
                type="button"
                onClick={onBack}
                className="p-2 rounded-xl bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white border-0 cursor-pointer transition-colors"
                title="Voltar para lista de eventos"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {event.status || '● ATIVO'}
                </span>
                <span className="text-xs text-slate-400">Produtor: <strong>{selectedProducer}</strong></span>
              </div>

              <h1 className={`text-2xl font-black ${textTitle} tracking-tight mb-1 flex items-center gap-2`}>
                <span>🎵 {event.name}</span>
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>{event.date}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{event.venue} — {event.city}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 flex-wrap">
            <button 
              type="button"
              onClick={() => setShowQuickSaleModal(true)}
              className="px-3.5 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold border-0 cursor-pointer shadow-md shadow-[#F97316]/25 flex items-center space-x-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Nova venda</span>
            </button>

            <button 
              type="button"
              onClick={() => setShowQuickCourtesyModal(true)}
              className="px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-100 text-xs font-bold border border-purple-200 dark:border-purple-500/20 cursor-pointer flex items-center space-x-1.5 transition-all"
            >
              <Ticket className="w-4 h-4" />
              <span>Emitir cortesia</span>
            </button>

            <button 
              type="button"
              onClick={() => triggerToast("Configurações do Evento", "Painel de taxas e integrações do evento.")}
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5 cursor-pointer transition-all"
              title="Configurar Evento"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Navigation Subtabs */}
        <div className="flex items-center space-x-1 pt-4 mt-4 border-t border-slate-100 dark:border-white/5 overflow-x-auto text-xs">
          {[
            { id: 'visao-geral', label: 'Visão Geral' },
            { id: 'vendas', label: 'Vendas em Tempo Real' },
            { id: 'lotes', label: 'Ingressos & Lotes' },
            { id: 'setores', label: 'Mapa de Setores' },
            { id: 'sessoes', label: 'Sessões' },
            { id: 'marketing', label: 'Marketing & Pixel' },
            { id: 'financeiro', label: 'Financeiro' },
            { id: 'saude', label: 'Saúde Operacional' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all border-0 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#F97316] text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. TAB: VISÃO GERAL */}
      {activeTab === 'visao-geral' && (
        <div className="space-y-4">
          {/* Event Specific KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm">
              <span className="text-[9.5px] font-black uppercase text-slate-400 block mb-1">Ingressos Vendidos</span>
              <span className="text-xl font-black text-slate-900 dark:text-white block">2.842</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">82% da capacidade</span>
            </div>

            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm">
              <span className="text-[9.5px] font-black uppercase text-slate-400 block mb-1">Receita do Evento</span>
              <span className="text-xl font-black text-slate-900 dark:text-white block">R$ 284.520</span>
              <span className="text-[10px] text-slate-400">Meta: R$ 320.000</span>
            </div>

            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm">
              <span className="text-[9.5px] font-black uppercase text-slate-400 block mb-1">Ocupação do Local</span>
              <span className="text-xl font-black text-slate-900 dark:text-white block">82%</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Lote 2 em alta</span>
            </div>

            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm">
              <span className="text-[9.5px] font-black uppercase text-slate-400 block mb-1">Ticket Médio</span>
              <span className="text-xl font-black text-slate-900 dark:text-white block">R$ 100,11</span>
              <span className="text-[10px] text-slate-400">vs R$ 92 (anterior)</span>
            </div>

            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm">
              <span className="text-[9.5px] font-black uppercase text-slate-400 block mb-1">Cancelamentos</span>
              <span className="text-xl font-black text-red-500 block">32</span>
              <span className="text-[10px] text-slate-400">1,1% do total</span>
            </div>

            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm">
              <span className="text-[9.5px] font-black uppercase text-slate-400 block mb-1">Estornos</span>
              <span className="text-xl font-black text-slate-900 dark:text-white block">R$ 4.280</span>
              <span className="text-[10px] text-slate-400">Gateway processado</span>
            </div>
          </div>

          {/* Quick Real-Time Sales Feed & Sector Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Feed Vendas */}
            <div className="lg:col-span-7 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5 mb-3">
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0">Vendas em Tempo Real deste Evento</h3>
                <span className="text-[10px] text-emerald-500 font-bold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block"></span>
                  <span>Transações ao vivo</span>
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { time: '12:05:23', channel: 'Online', val: 'R$ 180,00', buyer: 'Camila Rocha', sector: 'Pista Premium' },
                  { time: '12:05:11', channel: 'PDV 04 (Shopping)', val: 'R$ 250,00', buyer: 'Lucas Peixoto', sector: 'VIP Open Bar' },
                  { time: '12:04:58', channel: 'Totem 02 (Bilheteria)', val: 'R$ 120,00', buyer: 'Mariana Duarte', sector: 'Pista Comum' },
                  { time: '12:04:42', channel: 'Online (App Disk)', val: 'R$ 350,00', buyer: 'Rodrigo Antunes', sector: 'Camarote' },
                  { time: '12:03:15', channel: 'Online (PIX)', val: 'R$ 140,00', buyer: 'Fabiana Lima', sector: 'Pista Premium' }
                ].map((s, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#1E293B]/40 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-[10px] text-slate-400">{s.time}</span>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{s.buyer}</span>
                        <span className="text-[10px] text-slate-400">{s.channel} • {s.sector}</span>
                      </div>
                    </div>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Setores Resumo */}
            <div className="lg:col-span-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-white/5 mb-3">
                  Ocupação por Setor
                </h3>

                <div className="space-y-4 text-xs">
                  {sectors.map((sec, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-800 dark:text-slate-200">{sec.name}</span>
                        <span className="text-slate-500">{sec.sold} / {sec.total} ({sec.occupancy}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#F97316] h-full rounded-full" 
                          style={{ width: `${sec.occupancy}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-slate-400 block">Preço unitário: {sec.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/5 mt-4">
                <button 
                  type="button" 
                  onClick={() => setActiveTab('setores')}
                  className="w-full py-2 rounded-lg bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs border-0 cursor-pointer"
                >
                  Ver mapa visual do palco &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB: LOTES */}
      {activeTab === 'lotes' && (
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-5 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">Lotes de Ingressos do Evento</h3>
              <p className="text-xs text-slate-400">Defina transição automática de lotes e precificação dinâmica</p>
            </div>
            <button 
              type="button"
              onClick={() => triggerToast("Novo Lote", "Criando lote adicional de ingressos...")}
              className="px-3 py-1.5 rounded-lg bg-[#F97316] text-white text-xs font-bold border-0 cursor-pointer flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Criar Próximo Lote</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {batches.map(b => (
              <div key={b.id} className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1E293B]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{b.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${b.status === 'Esgotado' ? 'bg-slate-500' : 'bg-emerald-500'}`}>
                    {b.status}
                  </span>
                </div>

                <div>
                  <span className="text-2xl font-black text-[#F97316]">R$ {b.price.toFixed(2)}</span>
                  <span className="text-[10.5px] text-slate-400 block">{b.sold} de {b.total} vendidos</span>
                </div>

                <div className="w-full bg-slate-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#F97316] h-full rounded-full" 
                    style={{ width: `${(b.sold / b.total) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <button 
                    type="button"
                    onClick={() => triggerToast("Editar Preço", `Ajustando preço do ${b.name}`)}
                    className="flex-1 py-1.5 rounded-lg bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50"
                  >
                    Alterar Preço
                  </button>
                  <button 
                    type="button"
                    onClick={() => triggerToast("Lote Encerrado", `${b.name} encerrado manualmente.`)}
                    className="py-1.5 px-3 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-200 dark:border-red-500/20 text-xs font-semibold cursor-pointer"
                  >
                    Encerrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TAB: MAPA DE SETORES */}
      {activeTab === 'setores' && (
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-5 rounded-2xl shadow-sm space-y-4">
          <div className="text-center max-w-lg mx-auto pb-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">Mapa Esquemático de Setores</h3>
            <p className="text-xs text-slate-400">Visualização espacial da arena e capacidade em tempo real</p>
          </div>

          {/* Graphical Stage Simulation */}
          <div className="max-w-xl mx-auto space-y-3">
            {/* Stage */}
            <div className="w-full py-4 rounded-xl bg-slate-900 text-white font-black text-center uppercase tracking-widest text-sm shadow-md border border-white/20">
              🎤 PALCO PRINCIPAL
            </div>

            {/* Pista Premium */}
            <div className="p-4 rounded-xl bg-orange-500/10 border-2 border-[#F97316] text-center space-y-1">
              <span className="text-xs font-black text-[#F97316] uppercase block">PISTA PREMIUM</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold">
                82% Ocupado (2.460 / 3.000 ingressos)
              </span>
              <div className="max-w-xs mx-auto bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#F97316] h-full rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>

            {/* VIP & Camarote Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-400 text-center space-y-1">
                <span className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase block">VIP OPEN BAR</span>
                <span className="text-[10px] text-slate-400 block">64% Ocupado (640 / 1.000)</span>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-400 text-center space-y-1">
                <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase block">CAMAROTE PRODUTOR</span>
                <span className="text-[10px] text-slate-400 block">43% Ocupado (215 / 500)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB: SESSÕES */}
      {activeTab === 'sessoes' && (
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-5 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">Sessões do Evento</h3>
              <p className="text-xs text-slate-400">Configure múltiplos dias ou horários de apresentações</p>
            </div>
            <button 
              type="button"
              onClick={() => triggerToast("Nova Sessão", "Cadastrando nova data de sessão...")}
              className="px-3 py-1.5 rounded-lg bg-[#F97316] text-white text-xs font-bold border-0 cursor-pointer flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Sessão</span>
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            {sessions.map(s => (
              <div key={s.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1E293B]/40 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F97316]/10 text-[#F97316] flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white block">{s.date}</span>
                    <span className="text-slate-400">{s.sold} ingressos confirmados (Capacidade: {s.capacity})</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    s.status === 'Ativa' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-400'
                  }`}>
                    {s.status}
                  </span>
                  <button 
                    type="button"
                    onClick={() => triggerToast("Configurar Sessão", `Ajustando sessão ${s.date}`)}
                    className="px-2.5 py-1 rounded-md bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 font-semibold cursor-pointer"
                  >
                    Gerenciar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. TAB: MARKETING & PIXEL (REGRA DE HERANÇA PRODUTOR -> EVENTO) */}
      {activeTab === 'marketing' && (
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-5 rounded-2xl shadow-sm space-y-5">
          <div className="pb-3 border-b border-slate-100 dark:border-white/5">
            <h3 className="text-base font-black text-slate-900 dark:text-white">Marketing, Pixels & Rastreamento (Regra de Herança)</h3>
            <p className="text-xs text-slate-400">
              Configure Pixels individuais para este evento ou herde as tags globais do produtor <strong>{selectedProducer}</strong>.
            </p>
          </div>

          {/* Inheritance Selector */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1E293B]/40 space-y-3">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block uppercase tracking-wider">
              Modo de Herança das Tags
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMetaPixelMode('herdar')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  metaPixelMode === 'herdar'
                    ? 'border-[#F97316] bg-[#F97316]/10 text-slate-900 dark:text-white font-bold'
                    : 'border-slate-200 dark:border-white/5 bg-white dark:bg-[#111827] text-slate-500'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <input type="radio" checked={metaPixelMode === 'herdar'} readOnly className="accent-[#F97316]" />
                  <span className="text-xs font-bold">Herdar do Produtor</span>
                </div>
                <span className="text-[10.5px] text-slate-400 block">
                  Usa o Meta Pixel ID e Google Analytics configurados na conta corporativa do produtor.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMetaPixelMode('personalizado')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  metaPixelMode === 'personalizado'
                    ? 'border-[#F97316] bg-[#F97316]/10 text-slate-900 dark:text-white font-bold'
                    : 'border-slate-200 dark:border-white/5 bg-white dark:bg-[#111827] text-slate-500'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <input type="radio" checked={metaPixelMode === 'personalizado'} readOnly className="accent-[#F97316]" />
                  <span className="text-xs font-bold">Personalizar neste Evento</span>
                </div>
                <span className="text-[10.5px] text-slate-400 block">
                  Insira IDs de Pixel específicos da agência ou contratante exclusivo deste show.
                </span>
              </button>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Meta Pixel ID (Facebook / Instagram)</label>
              <input 
                type="text" 
                value={metaPixelId}
                onChange={(e) => setMetaPixelId(e.target.value)}
                disabled={metaPixelMode === 'herdar'}
                className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 font-mono text-xs text-slate-900 dark:text-white disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Google Analytics 4 (GA4 ID)</label>
              <input 
                type="text" 
                value={gaId}
                onChange={(e) => setGaId(e.target.value)}
                disabled={metaPixelMode === 'herdar'}
                className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 font-mono text-xs text-slate-900 dark:text-white disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Google Ads Conversion ID</label>
              <input 
                type="text" 
                value={googleAdsId}
                onChange={(e) => setGoogleAdsId(e.target.value)}
                disabled={metaPixelMode === 'herdar'}
                className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 font-mono text-xs text-slate-900 dark:text-white disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">TikTok Pixel ID</label>
              <input 
                type="text" 
                placeholder="Ex: C8920194819"
                value={tiktokPixelId}
                onChange={(e) => setTiktokPixelId(e.target.value)}
                disabled={metaPixelMode === 'herdar'}
                className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 font-mono text-xs text-slate-900 dark:text-white disabled:opacity-50"
              />
            </div>
          </div>

          {/* Monitored Events Checklist */}
          <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block uppercase tracking-wider">
              Eventos Automáticos no Checkout DiskIngressos
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
              {['PageView', 'ViewContent', 'InitiateCheckout', 'Purchase', 'AddToCart', 'Refund'].map((ev, i) => (
                <div key={i} className="flex items-center space-x-1.5 p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="font-semibold text-[11px] text-slate-700 dark:text-slate-300">{ev}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex justify-end">
            <button 
              type="button"
              onClick={() => triggerToast("Pixel Salvo", "Configurações de rastreamento do evento atualizadas com sucesso!")}
              className="px-4 py-2 rounded-lg bg-[#F97316] text-white text-xs font-bold border-0 cursor-pointer shadow-md"
            >
              Salvar Configurações de Rastreamento
            </button>
          </div>
        </div>
      )}

      {/* 7. TAB: FINANCEIRO DO EVENTO */}
      {activeTab === 'financeiro' && (
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-5 rounded-2xl shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-white/5">
            <h3 className="text-base font-black text-slate-900 dark:text-white">Demonstrativo Financeiro do Evento</h3>
            <p className="text-xs text-slate-400">Apuração de taxas de conveniência, spread de gateway e borderô líquido</p>
          </div>

          <div className="max-w-xl mx-auto p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1E293B]/40 space-y-2.5 font-mono text-xs">
            <div className="flex justify-between py-1">
              <span className="text-slate-600 dark:text-slate-400">RECEITA BRUTA (Vendas)</span>
              <span className="font-bold text-slate-900 dark:text-white">R$ 284.520,00</span>
            </div>
            <div className="flex justify-between py-1 text-red-500">
              <span>(-) Taxas DiskIngressos (Conveniente)</span>
              <span>-R$ 18.420,00</span>
            </div>
            <div className="flex justify-between py-1 text-red-500">
              <span>(-) Gateway de Pagamentos / Cartão</span>
              <span>-R$ 8.540,00</span>
            </div>
            <div className="flex justify-between py-1 text-red-500">
              <span>(-) Cancelamentos e Estornos</span>
              <span>-R$ 3.200,00</span>
            </div>

            <div className="border-t-2 border-slate-300 dark:border-white/20 pt-2.5 flex justify-between font-black text-sm">
              <span className="text-slate-900 dark:text-white">RECEITA LÍQUIDA A REPASSAR</span>
              <span className="text-emerald-600 dark:text-emerald-400">R$ 254.360,00</span>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button 
              type="button" 
              onClick={() => triggerToast("Borderô Baixado", "PDF do borderô de repasse emitido com sucesso.")}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold border-0 cursor-pointer shadow"
            >
              Exportar Borderô Financeiro (.PDF)
            </button>
          </div>
        </div>
      )}

      {/* 8. TAB: SAÚDE OPERACIONAL */}
      {activeTab === 'saude' && (
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-5 rounded-2xl shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-white/5">
            <h3 className="text-base font-black text-slate-900 dark:text-white">Saúde Operacional da Portaria e Bilheteria</h3>
            <p className="text-xs text-slate-400">Status em tempo real das integrações físicas e digitais</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {[
              { title: 'Gateway de Pagamentos', status: 'Operacional', sub: 'Latência: 120ms', ok: true },
              { title: 'Site de Vendas Online', status: 'Operacional', sub: '99.98% Uptime', ok: true },
              { title: 'Catracas de Acesso', status: 'Operacional', sub: '4/4 Conectadas', ok: true },
              { title: 'Lotes de Ingressos', status: 'Atenção (82%)', sub: 'Lote 2 quase esgotado', ok: false }
            ].map((item, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1E293B]/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{item.title}</span>
                  <span className={`w-2.5 h-2.5 rounded-full ${item.ok ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                </div>
                <span className={`text-xs font-bold block ${item.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600'}`}>
                  {item.status}
                </span>
                <span className="text-[10px] text-slate-400 block">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
