import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function AiAnalyticsPage() {
  const {
    events,
    selectedAiEvent,
    setSelectedAiEvent,
    aiOutputs,
    cardClass,
    borderCol,
    textTitle,
    textSec,
    bgInput,
    inputClass,
    theme
  } = useDiskHub();

  return (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Disk AI Analytics Control</h2>
                  <p className={`text-xs ${textSec} mb-0`}>Auditoria autônoma de margens de eventos, anomalías fiscais e controle de conciliação.</p>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-8 mb-3">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                    <div>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Relatório de Auditoria Contábil Automática</h3>
                      <div className="space-y-3 text-xs leading-relaxed">
                        <div className={`p-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'} border ${borderCol} rounded`}>
                          <h4 className="text-xs font-bold text-[#22C55E] flex items-center mb-1">
                            <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                            Nenhuma Anomalia Crítica Encontrada
                          </h4>
                          <p className={`${textSec} mb-0`}>Os borderôs de eventos batem 100% com as taxas de comissionamento de lote acordadas em contrato.</p>
                        </div>

                        <div className={`p-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'} border ${borderCol} rounded`}>
                          <h4 className="text-xs font-bold text-[#3B82F6] flex items-center mb-1">
                            <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                            Spread e Markup de Operações
                          </h4>
                          <p className={`${textSec} mb-0`}>Custo médio de Gateway de Pagamentos fixado em 3.0% da receita bruta dos eventos. Margem preservada.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4 pt-3 border-top border-light/5">
                      <button 
                        onClick={() => triggerAIResponse('conciliacao')}
                        className="btn btn-primary py-2 px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0 cursor-pointer"
                      >
                        Auditar Conciliação
                      </button>
                      <button 
                        onClick={() => triggerAIResponse('dre')}
                        className="btn btn-primary py-2 px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0 cursor-pointer"
                      >
                        Análise Margens DRE
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 mb-3">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                    <div>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Copilot Widget</h3>
                      <p className={`text-xs ${textSec} leading-relaxed`}>
                        O copiloto fiscal está ativo e pode ser acessado também através do balão flutuante no canto inferior direito da tela.
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setChatOpen(true)}
                      className="btn btn-primary w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0 cursor-pointer"
                    >
                      Abrir Janela Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
  );
}
