import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { CheckCircle, Lock } from 'lucide-react';

export default function RoadmapPage() {
  const {
    theme,
    cardClass,
    borderCol,
    textTitle,
    textSec,
    textBody
  } = useDiskHub();

  return (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Status & Roadmap do Projeto</h2>
                <p className={`text-xs ${textSec} mb-0`}>Acompanhe as fases de desenvolvimento do novo ecossistema ERP/CRM.</p>
              </div>

              {/* Progress Summary */}
              <div className={`card ${cardClass} p-4 space-y-3`}>
                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider">
                  <span className="text-[#3B82F6]">Progresso Geral do Protótipo (Fases 1 e 2)</span>
                  <span className={textTitle}>100% Concluído</span>
                </div>
                <div className={`w-full ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-200'} rounded-full h-3 border ${borderCol} overflow-hidden p-0.5`}>
                  <div className="bg-[#3B82F6] h-full rounded-full w-full"></div>
                </div>
                <p className={`text-xs ${textSec} leading-relaxed mb-0`}>
                  Todas as especificações de navegação simulada, layouts multibanco, gestão de borderôs e comissionamento foram entregues como protótipo interativo e modular.
                </p>
              </div>

              {/* Phases Grid */}
              <div className="row">
                
                {/* Phase 1 */}
                <div className="col-lg-4 mb-3">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                    <div>
                      <div className={`flex items-center justify-between mb-3 border-bottom ${borderCol} pb-2`}>
                        <h3 className={`text-xs font-semibold ${textTitle} uppercase tracking-wider mb-0`}>Fase 1: Demonstração</h3>
                        <span className="badge badge-success bg-[#22C55E]/12 text-[#22C55E] text-[9px] px-2 py-0.5 rounded-full font-bold">Entregue</span>
                      </div>
                      <ul className={`space-y-2 text-xs ${textBody} list-unstyled pl-0`}>
                        <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" /><span>Dashboard navegável estruturado</span></li>
                        <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" /><span>Marketplace de módulos comercializáveis</span></li>
                        <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" /><span>Níveis de Planos e Upgrade simulados</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="col-lg-4 mb-3">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                    <div>
                      <div className={`flex items-center justify-between mb-3 border-bottom ${borderCol} pb-2`}>
                        <h3 className={`text-xs font-semibold ${textTitle} uppercase tracking-wider mb-0`}>Fase 2: Protótipo</h3>
                        <span className="badge badge-success bg-[#22C55E]/12 text-[#22C55E] text-[9px] px-2 py-0.5 rounded-full font-bold">Entregue</span>
                      </div>
                      <ul className={`space-y-2 text-xs ${textBody} list-unstyled pl-0`}>
                        <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" /><span>Navegação completa entre abas e módulos</span></li>
                        <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" /><span>Banco de dados em memória React dinâmico</span></li>
                        <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" /><span>Fluxos realistas: Sangrias de PDV e emissões</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="col-lg-4 mb-3">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                    <div>
                      <div className={`flex items-center justify-between mb-3 border-bottom ${borderCol} pb-2`}>
                        <h3 className={`text-xs font-semibold ${textTitle} uppercase tracking-wider mb-0`}>Fase 3: Produção</h3>
                        <span className="badge badge-primary bg-[#3B82F6]/10 text-[#3B82F6] text-[9px] px-2 py-0.5 rounded font-bold uppercase animate-pulse">Planejado</span>
                      </div>
                      <ul className={`space-y-2 text-xs ${textBody} list-unstyled pl-0`}>
                        <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" /><span>Migração estática React + Vite e Tailwind</span></li>
                        <li className="flex items-start space-x-2 text-[#64748B]"><Lock className="w-4 h-4 shrink-0 mt-0.5" /><span>Integrações Open Finance & Bancos de dados</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
  );
}
