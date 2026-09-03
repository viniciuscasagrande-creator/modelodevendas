import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { Plus } from 'lucide-react';

export default function PdvPage() {
  const {
    pdvs,
    handlePdvBleeding,
    setShowAddPdvModal,
    cardClass,
    borderCol,
    textTitle,
    textSec,
    theme
  } = useDiskHub();

  return (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Gestão de Pontos de Venda (PDV)</h2>
                  <p className={`text-xs ${textSec} mb-0`}>Controle de caixas físicos, operadores, sangrias de dinheiro e saldos em tempo real.</p>
                </div>
                <button 
                  onClick={() => setShowAddPdvModal(true)}
                  className="btn btn-primary flex items-center space-x-1.5 px-3 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded text-xs font-semibold border-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ativar Novo PDV</span>
                </button>
              </div>

              <div className="row">
                {pdvs.map(pdv => (
                  <div key={pdv.id} className="col-md-4 mb-3">
                    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className={`text-xs font-bold ${textTitle} mb-0`}>{pdv.name}</h3>
                          <span className={`badge ${pdv.status === 'Aberto' ? 'badge-success bg-[#22C55E]/12 text-[#22C55E]' : 'bg-[#EF4444]/12 text-[#EF4444]'} text-[8px] font-bold px-1.5 py-0.5 rounded-full`}>
                            {pdv.status}
                          </span>
                        </div>
                        <p className={`text-[10px] ${textSec} mt-1 mb-3`}>Operador: {pdv.manager} ({pdv.type})</p>

                        <div className={`p-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'} border ${borderCol} rounded text-center`}>
                          <span className={`text-[9px] ${textSec} uppercase block`}>Saldo Retido no Caixa</span>
                          <span className="text-md font-mono font-bold text-[#22C55E] mt-1 block">R$ {pdv.balance.toLocaleString('pt-BR')}</span>
                        </div>
                      </div>

                      {pdv.balance > 0 && (
                        <button 
                          onClick={() => handlePdvBleeding(pdv.id, pdv.balance)}
                          className="btn btn-primary w-full mt-3 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0"
                        >
                          Realizar Sangria Total
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
  );
}
