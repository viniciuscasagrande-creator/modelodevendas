import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { Search } from 'lucide-react';
import { downloadSimulatedCSV } from '../utils/csvExport';

export default function SpotlightSearch() {
  const {
    spotlightOpen,
    setSpotlightOpen,
    spotlightQuery,
    setSpotlightQuery,
    setCurrentTab,
    triggerToast,
    textTitle,
    events,
    setTheme,
    setEventWizardStep
  } = useDiskHub();

  if (!spotlightOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={() => setSpotlightOpen(false)}
    >
      <div 
        className="w-full max-w-lg bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] rounded-xl shadow-2xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Area */}
        <div className="relative border-b border-slate-200 dark:border-[#1F2937] p-3 flex items-center">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
          <input 
            type="text" 
            placeholder="Pesquisar no ecossistema (Ex: eventos, crm, metal...)" 
            autoFocus
            value={spotlightQuery}
            onChange={(e) => setSpotlightQuery(e.target.value)}
            className="w-full bg-transparent border-0 text-xs text-slate-900 dark:text-white focus:outline-none p-1"
          />
          <button 
            onClick={() => setSpotlightOpen(false)}
            className="text-[10px] text-slate-400 border border-slate-200 dark:border-[#1F2937] rounded px-1.5 py-0.5 bg-slate-50 dark:bg-white/5 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1.5">
          
          {/* Category: Telas / Módulos */}
          <div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 py-1 block">Módulos & Telas</span>
            {[
              { id: 'dashboard', label: '🏠 Dashboard Geral', desc: 'Visão agregada de performance, receitas e portaria' },
              { id: 'financeiro', label: '💰 Financeiro (ERP)', desc: 'Controle de contas, conciliações e fluxo de caixa' },
              { id: 'contabilidade', label: '🧾 Contabilidade & Borderôs', desc: 'Emissão de NFes e auditoria de fechamento' },
              { id: 'eventos', label: '🎫 Gestão de Eventos', desc: 'Cadastro, setores, lotes e controle de ingressos' },
              { id: 'crm', label: '👥 CRM de Vendas', desc: 'Funil Kanban, captação de leads e contratos' },
              { id: 'marketing', label: '📈 Marketing & Campanhas (MaaS)', desc: 'Ativação granular de módulos, cupons e disparos' },
              { id: 'pdv', label: '🛒 Gestão de PDVs', desc: 'Controle de caixas físicos e operadores' },
              { id: 'bar', label: '🍹 Bar & Estoque', desc: 'Comandas de consumo e controle de insumos' },
              { id: 'ai', label: '🤖 Disk AI Analytics', desc: 'Copiloto de IA e insights de negócio' }
            ].filter(tab => tab.label.toLowerCase().includes(spotlightQuery.toLowerCase()) || tab.desc.toLowerCase().includes(spotlightQuery.toLowerCase()))
            .map(tab => (
              <button 
                key={tab.id}
                onClick={() => {
                  setCurrentTab(tab.id);
                  setSpotlightOpen(false);
                  setSpotlightQuery('');
                  triggerToast("Spotlight", `Navegando para o módulo: ${tab.id.toUpperCase()}`);
                }}
                className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B]/60 transition-all border-0 bg-transparent flex justify-between items-center cursor-pointer text-xs"
              >
                <div>
                  <span className={`font-semibold ${textTitle} block`}>{tab.label}</span>
                  <span className="text-[10px] text-slate-400 block">{tab.desc}</span>
                </div>
                <span className="text-[10px] text-[#3B82F6] font-mono font-bold">Ir ➔</span>
              </button>
            ))}
          </div>

          {/* Category: Ações Rápidas */}
          <div className="pt-2 border-t border-slate-100 dark:border-white/5">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 py-1 block">⚡ Acoes Rapidas</span>
            {[
              { 
                label: '🚀 Criar Novo Evento (Wizard)', 
                desc: 'Iniciar o assistente passo a passo de cadastro de eventos', 
                action: () => {
                  setCurrentTab('eventos');
                  setEventWizardStep(1);
                }
              },
              { 
                label: '👤 Novo Lead Comercial', 
                desc: 'Cadastrar prospeccao no funil Kanban do CRM', 
                action: () => {
                  setCurrentTab('crm');
                }
              },
              { 
                label: '🌗 Alternar Tema Visual', 
                desc: 'Alternar entre Modo Claro e Escuro (DHDS)', 
                action: () => {
                  setTheme(prev => prev === 'dark' ? 'light' : 'dark');
                }
              },
              { 
                label: '📥 Baixar Fechamento Contabil (.csv)', 
                desc: 'Baixar planilha simulada de conciliacao e bordero', 
                action: () => {
                  downloadSimulatedCSV();
                  triggerToast("Exportação Sucesso 📥", "Arquivo fechamento_contabil.csv baixado.");
                }
              }
            ].filter(act => act.label.toLowerCase().includes(spotlightQuery.toLowerCase()) || act.desc.toLowerCase().includes(spotlightQuery.toLowerCase()))
            .map((act, index) => (
              <button 
                key={index}
                onClick={() => {
                  act.action();
                  setSpotlightOpen(false);
                  setSpotlightQuery('');
                }}
                className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B]/60 transition-all border-0 bg-transparent flex justify-between items-center cursor-pointer text-xs"
              >
                <div>
                  <span className={`font-semibold ${textTitle} block`}>{act.label}</span>
                  <span className="text-[10px] text-slate-400 block">{act.desc}</span>
                </div>
                <span className="text-[10px] text-[#10B981] font-mono font-bold">Executar ⚡</span>
              </button>
            ))}
          </div>

          {/* Category: Eventos */}
          {events.filter(ev => ev.name.toLowerCase().includes(spotlightQuery.toLowerCase()) || ev.city.toLowerCase().includes(spotlightQuery.toLowerCase())).length > 0 && (
            <div className="pt-2 border-t border-slate-100 dark:border-white/5">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 py-1 block">Eventos Ativos</span>
              {events.filter(ev => ev.name.toLowerCase().includes(spotlightQuery.toLowerCase()) || ev.city.toLowerCase().includes(spotlightQuery.toLowerCase()))
              .map(ev => (
                <button 
                  key={ev.id}
                  onClick={() => {
                    setCurrentTab('eventos');
                    setSpotlightOpen(false);
                    setSpotlightQuery('');
                    triggerToast("Spotlight", `Foco no evento: ${ev.name}`);
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B]/60 transition-all border-0 bg-transparent flex justify-between items-center cursor-pointer text-xs"
                >
                  <div>
                    <span className={`font-semibold ${textTitle} block`}>🎫 {ev.name}</span>
                    <span className="text-[10px] text-slate-400 block">{ev.venue} — {ev.city}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">{ev.status}</span>
                </button>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
