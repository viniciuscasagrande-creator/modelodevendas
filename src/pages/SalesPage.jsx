import React, { useState } from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { 
  ShoppingCart, 
  Plus 
} from 'lucide-react';

export default function SalesPage() {
  const {
    pdvs,
    handlePdvBleeding,
    setShowAddPdvModal,
    setShowQuickSaleModal,
    triggerToast,
    cardClass,
    textTitle,
    textSec,
    theme
  } = useDiskHub();

  const [salesTab, setSalesTab] = useState('dashboard'); // 'dashboard' | 'kanban' | 'pdvs' | 'propostas' | 'planos'

  // Pipeline Kanban Deals State
  const [deals, setDeals] = useState([
    { id: 'deal-1', title: 'Turnê Festival de Rock 2026', client: 'Produtora Prime Show', value: 125000, stage: 'contrato', prob: '90%', rep: 'Vinicius Casagrande', date: 'Hoje' },
    { id: 'deal-2', title: 'Bordero & Ingressos Stand-Up Tour', client: 'Curitiba Comedy Club', value: 42000, stage: 'negociacao', prob: '60%', rep: 'Sandra Costa', date: 'Amanhã' },
    { id: 'deal-3', title: 'Festival Gastronômico & Shows', client: 'Arena Eventos PR', value: 80000, stage: 'proposta', prob: '75%', rep: 'Daniel Santos', date: 'Hoje' },
    { id: 'deal-4', title: 'Credenciamento e Catracas AgroFest', client: 'Sindicato Rural', value: 65000, stage: 'qualificacao', prob: '40%', rep: 'Vinicius Casagrande', date: '10 Set' },
    { id: 'deal-5', title: 'Convenção Corporativa Inova 2026', client: 'Grupo Tech Sul', value: 95000, stage: 'lead', prob: '20%', rep: 'Sandra Costa', date: '12 Set' },
    { id: 'deal-6', title: 'Réveillon das Águas 2026', client: 'Iate Clube Litoral', value: 210000, stage: 'fechado', prob: '100%', rep: 'Vinicius Casagrande', date: 'Concluído' }
  ]);

  const stages = [
    { id: 'lead', label: 'Lead' },
    { id: 'qualificacao', label: 'Qualificação' },
    { id: 'proposta', label: 'Proposta' },
    { id: 'negociacao', label: 'Negociação' },
    { id: 'contrato', label: 'Contrato' },
    { id: 'fechado', label: 'Fechado' }
  ];

  const handleMoveStage = (dealId, nextStage) => {
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage: nextStage } : d));
    triggerToast("Pipeline Atualizado", `Oportunidade movida para a etapa "${stages.find(s => s.id === nextStage)?.label}".`);
  };

  return (
    <div className="space-y-4 pb-12 animate-fadeIn font-sans" data-testid="sales-page">
      
      {/* 1. Header Comercial */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white dark:bg-[#111827] p-4 rounded-xl border border-slate-200 dark:border-[#1F2937] shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-[#F97316] flex items-center justify-center shrink-0 shadow-sm">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <h1 className={`text-xl font-black ${textTitle} tracking-tight mb-0.5`}>
              Gestão Comercial & Vendas
            </h1>
            <p className={`text-xs ${textSec} mb-0`}>
              Pipeline de produtores, funil comercial, PDVs físicos, propostas e inteligência de vendas.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            type="button"
            onClick={() => setShowQuickSaleModal(true)}
            className="px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold border-0 cursor-pointer shadow-md shadow-[#F97316]/25 flex items-center space-x-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Venda / Proposta</span>
          </button>
        </div>
      </div>

      {/* 2. Top Commercial KPIs (Fase 27.0 Specifics) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm">
          <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5">Receita</span>
          <span className="text-sm font-black text-slate-900 dark:text-white block">R$ 1.284.750</span>
          <span className="text-[9px] text-emerald-500 font-bold">↑ 14,2%</span>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm">
          <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5">Vendas</span>
          <span className="text-sm font-black text-slate-900 dark:text-white block">4.286</span>
          <span className="text-[9px] text-slate-400">pedidos</span>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm">
          <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5">Ticket Médio</span>
          <span className="text-sm font-black text-slate-900 dark:text-white block">R$ 299,76</span>
          <span className="text-[9px] text-emerald-500 font-bold">↑ 4,3%</span>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm">
          <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5">Conversão</span>
          <span className="text-sm font-black text-slate-900 dark:text-white block">18,7%</span>
          <span className="text-[9px] text-emerald-500 font-bold">↑ 1,2 p.p.</span>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm">
          <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5">Pipeline</span>
          <span className="text-sm font-black text-[#F97316] block">R$ 3.850.000</span>
          <span className="text-[9px] text-slate-400">em aberto</span>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm">
          <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5">Meta</span>
          <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 block">82%</span>
          <span className="text-[9px] text-slate-400">R$ 1.5M</span>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm">
          <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5">Forecast</span>
          <span className="text-sm font-black text-blue-600 dark:text-blue-400 block">R$ 1.570.000</span>
          <span className="text-[9px] text-emerald-500 font-bold">Cobertura 3,2x</span>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3 rounded-xl shadow-sm">
          <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5">Novos Clientes</span>
          <span className="text-sm font-black text-purple-600 dark:text-purple-400 block">+328</span>
          <span className="text-[9px] text-slate-400">neste mês</span>
        </div>
      </div>

      {/* 3. Subtabs Bar */}
      <div className="flex items-center space-x-1.5 border-b border-slate-200 dark:border-white/10 pb-2 overflow-x-auto text-xs">
        {[
          { id: 'dashboard', label: 'Visão Geral Comercial' },
          { id: 'kanban', label: 'Pipeline / Kanban' },
          { id: 'pdvs', label: 'PDVs Físicos & Caixas' },
          { id: 'planos', label: 'Produtos & Planos' }
        ].map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSalesTab(t.id)}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all border-0 cursor-pointer whitespace-nowrap ${
              salesTab === t.id
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-[#1E293B]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 4. TAB: DASHBOARD COMERCIAL */}
      {salesTab === 'dashboard' && (
        <div className="space-y-4">
          {/* Critical Deals Table */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5 mb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">Oportunidades Críticas</h3>
                <p className="text-[10px] text-slate-400 mb-0">Contratos e negociações com fechamento prioritário</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-[#F97316] text-[10px] font-bold">
                3 pendentes de ação
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-[9.5px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-white/5">
                    <th className="pb-2 font-black">Cliente / Produtor</th>
                    <th className="pb-2 font-black">Oportunidade</th>
                    <th className="pb-2 font-black">Valor Potencial</th>
                    <th className="pb-2 font-black">Etapa</th>
                    <th className="pb-2 font-black text-center">Probabilidade</th>
                    <th className="pb-2 font-black text-right">Próxima Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {[
                    { client: 'Produtora Prime Show', deal: 'Turnê Festival de Rock 2026', val: 'R$ 125.000', stage: 'Contrato', prob: '90%', action: 'Assinatura', urgency: 'text-emerald-500' },
                    { client: 'Arena Eventos PR', deal: 'Festival Gastronômico & Shows', val: 'R$ 80.000', stage: 'Proposta', prob: '75%', action: 'Hoje', urgency: 'text-[#F97316]' },
                    { client: 'Curitiba Comedy Club', deal: 'Bordero & Ingressos Stand-Up', val: 'R$ 42.000', stage: 'Negociação', prob: '60%', action: 'Amanhã', urgency: 'text-blue-500' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-[#1E293B]/60 transition-colors">
                      <td className="py-2.5 font-bold text-slate-900 dark:text-white">
                        {row.client}
                      </td>
                      <td className="py-2.5 text-slate-500">
                        {row.deal}
                      </td>
                      <td className="py-2.5 font-black text-slate-900 dark:text-white">
                        {row.val}
                      </td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-[10.5px] font-semibold text-slate-700 dark:text-slate-300">
                          {row.stage}
                        </span>
                      </td>
                      <td className="py-2.5 text-center font-bold text-slate-800 dark:text-slate-200">
                        {row.prob}
                      </td>
                      <td className={`py-2.5 text-right font-black ${row.urgency}`}>
                        {row.action}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB: KANBAN PIPELINE */}
      {salesTab === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {stages.map(stage => {
            const stageDeals = deals.filter(d => d.stage === stage.id);
            const totalStageValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

            return (
              <div key={stage.id} className="p-3 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/5">
                  <div>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase block">{stage.label}</span>
                    <span className="text-[9.5px] text-slate-400 font-mono">R$ {totalStageValue.toLocaleString('pt-BR')}</span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-white/10 text-[10px] font-bold flex items-center justify-center text-slate-600 dark:text-slate-300">
                    {stageDeals.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {stageDeals.map(deal => (
                    <div key={deal.id} className="p-2.5 rounded-lg bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-white/5 shadow-xs space-y-1.5 hover:border-[#F97316] transition-colors">
                      <span className="font-bold text-xs text-slate-900 dark:text-white block leading-tight">{deal.title}</span>
                      <span className="text-[10px] text-slate-400 block">{deal.client}</span>
                      
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-black text-[#F97316]">R$ {deal.value.toLocaleString('pt-BR')}</span>
                        <span className="text-[9.5px] font-bold text-slate-400 font-mono">{deal.prob}</span>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-100 dark:border-white/5">
                        <span>{deal.rep}</span>
                        <span>{deal.date}</span>
                      </div>

                      {/* Advance Stage button */}
                      {stage.id !== 'fechado' && (
                        <button
                          type="button"
                          onClick={() => {
                            const currentIdx = stages.findIndex(s => s.id === stage.id);
                            if (currentIdx < stages.length - 1) {
                              handleMoveStage(deal.id, stages[currentIdx + 1].id);
                            }
                          }}
                          className="w-full mt-1 py-1 rounded bg-slate-100 dark:bg-white/5 hover:bg-[#F97316] hover:text-white text-[9.5px] font-bold text-slate-500 dark:text-slate-300 border-0 cursor-pointer transition-colors"
                        >
                          Avançar etapa &gt;
                        </button>
                      )}
                    </div>
                  ))}
                  {stageDeals.length === 0 && (
                    <div className="p-3 text-center text-slate-400 text-[10.5px]">
                      Nenhum negócio nesta etapa
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 6. TAB: PDVS FÍSICOS & CAIXAS (Preserves original PDV features) */}
      {salesTab === 'pdvs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className={`text-base font-bold ${textTitle} tracking-tight mb-0`}>Pontos de Venda Físicos (PDVs)</h2>
              <p className={`text-xs ${textSec} mb-0`}>Operadores de caixa, sangrias de dinheiro e saldos em tempo real.</p>
            </div>
            <button 
              onClick={() => setShowAddPdvModal(true)}
              className="btn btn-primary flex items-center space-x-1.5 px-3.5 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl text-xs font-semibold border-0 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ativar Novo PDV</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {pdvs.map(pdv => (
              <div key={pdv.id} className={`card ${cardClass} p-4 flex flex-col justify-between rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#111827]`}>
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className={`text-xs font-bold ${textTitle} mb-0`}>{pdv.name}</h3>
                    <span className={`badge ${pdv.status === 'Aberto' ? 'bg-[#22C55E]/12 text-[#22C55E]' : 'bg-[#EF4444]/12 text-[#EF4444]'} text-[9px] font-bold px-2 py-0.5 rounded-full`}>
                      {pdv.status}
                    </span>
                  </div>
                  <p className={`text-[10.5px] ${textSec} mt-1 mb-3`}>Operador: {pdv.manager} ({pdv.type})</p>

                  <div className={`p-3 ${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-50'} border border-slate-200 dark:border-white/5 rounded-lg text-center`}>
                    <span className={`text-[9px] ${textSec} uppercase block font-semibold`}>Saldo Retido no Caixa</span>
                    <span className="text-base font-mono font-bold text-[#22C55E] mt-1 block">R$ {pdv.balance.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                {pdv.balance > 0 && (
                  <button 
                    onClick={() => handlePdvBleeding(pdv.id, pdv.balance)}
                    className="w-full mt-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg border-0 cursor-pointer"
                  >
                    Realizar Sangria Total
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. TAB: PRODUTOS & PLANOS (Fase 27.3) */}
      {salesTab === 'planos' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-black text-slate-900 dark:text-white">STANDARD</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">Básico</span>
            </div>
            <p className="text-xs text-slate-500">Ideal para produtores independentes e eventos locais.</p>
            <span className="text-2xl font-black text-slate-900 dark:text-white block">R$ 490 <span className="text-xs font-normal text-slate-400">/mês</span></span>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pl-4 list-disc">
              <li>ERP Comercial básico</li>
              <li>Módulo Financeiro & Fluxo</li>
              <li>Gestão de Eventos e Portaria</li>
              <li>Relatórios operacionais</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-orange-50/40 dark:bg-[#F97316]/5 border-2 border-[#F97316] space-y-3 relative">
            <span className="absolute -top-2.5 right-4 bg-[#F97316] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              Mais Vendido
            </span>
            <div className="flex justify-between items-center">
              <h3 className="text-base font-black text-[#F97316]">ADVANCED</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-500/20 text-[#F97316]">Intermediário</span>
            </div>
            <p className="text-xs text-slate-500">Para agências, festivais e médias produtoras.</p>
            <span className="text-2xl font-black text-slate-900 dark:text-white block">R$ 990 <span className="text-xs font-normal text-slate-400">/mês</span></span>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pl-4 list-disc">
              <li>Tudo do Standard</li>
              <li>CRM 360º de Produtores e Leads</li>
              <li>Marketing, Pixels & Automações</li>
              <li>BI & Analytics Comercial</li>
              <li>Integrações com Gateways e POS</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-black text-slate-900 dark:text-white">EXPERT</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">Enterprise</span>
            </div>
            <p className="text-xs text-slate-500">Para grandes operadoras de arenas e festivais nacionais.</p>
            <span className="text-2xl font-black text-slate-900 dark:text-white block">R$ 1.990 <span className="text-xs font-normal text-slate-400">/mês</span></span>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pl-4 list-disc">
              <li>Tudo do Advanced</li>
              <li>Contabilidade & NF-e automáticas</li>
              <li>Disk AI Preditiva e Forecast</li>
              <li>SLA de Suporte Premium 24/7</li>
              <li>API completa e White Label</li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}
