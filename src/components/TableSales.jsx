import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { Send } from 'lucide-react';

export default function TableSales() {
  const { campaigns, handleTriggerCampaign, cardClass, textTitle, textSec, borderCol } = useDiskHub();

  return (
    <div className={`card ${cardClass} p-4`}>
      <div className="border-b border-slate-100 dark:border-white/5 pb-3 mb-4 flex justify-between items-center">
        <h4 className={`text-sm font-black ${textTitle} uppercase tracking-wider mb-0`}>Monitoramento Geral de Campanhas Ativas</h4>
        <span className="text-[10px] text-slate-400 font-mono">Status em Tempo Real</span>
      </div>

      <div className="table-responsive">
        <table className="table text-xs mb-0 align-middle">
          <thead>
            <tr className={`border-bottom ${borderCol} text-slate-400 font-semibold text-[9.5px] uppercase`}>
              <th className="pb-2 border-0">Campanha</th>
              <th className="pb-2 border-0">Canal</th>
              <th className="pb-2 border-0 text-center">Disparos</th>
              <th className="pb-2 border-0 text-center">Conversões</th>
              <th className="pb-2 border-0 text-right">Faturamento</th>
              <th className="pb-2 border-0 text-center">Status</th>
              <th className="pb-2 border-0 text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.slice(0, 5).map((c) => (
              <tr key={c.id} className={`border-bottom ${borderCol}/40 hover:bg-slate-50/30 dark:hover:bg-white/1 transition-all`}>
                <td className="py-2.5 border-0">
                  <div className="font-bold text-slate-800 dark:text-slate-100">{c.name}</div>
                  <div className="text-[9px] text-slate-400 font-medium">Data: {c.date}</div>
                </td>
                <td className="py-2.5 border-0">
                  <span className="badge bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 font-semibold text-[9px] px-2 py-0.5 rounded">
                    {c.channel}
                  </span>
                </td>
                <td className="py-2.5 border-0 text-center font-mono font-medium">{c.sent.toLocaleString('pt-BR')}</td>
                <td className="py-2.5 border-0 text-center font-mono font-medium text-blue-500">{c.conversions}</td>
                <td className="py-2.5 border-0 text-right font-mono font-bold text-emerald-500">R$ {c.revenue.toLocaleString('pt-BR')}</td>
                <td className="py-2.5 border-0 text-center">
                  <span className={`badge ${
                    c.status === 'Concluída' ? 'bg-emerald-500/10 text-emerald-500' :
                    c.status === 'Ativa' ? 'bg-blue-500/10 text-blue-500' :
                    c.status === 'Disparando' ? 'bg-amber-500/10 text-amber-500 animate-pulse' :
                    'bg-slate-400/10 text-slate-400'
                  } text-[8.5px] font-mono px-2 py-0.5 rounded-full font-bold`}>
                    {c.status}
                  </span>
                </td>
                <td className="py-2.5 border-0 text-center">
                  {(c.status === 'Ativa' || c.status === 'Agendada') ? (
                    <button 
                      onClick={() => handleTriggerCampaign(c.id)}
                      className="btn btn-xs py-1 px-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded border-0 cursor-pointer transition-all flex items-center space-x-1"
                    >
                      <Send className="w-2.5 h-2.5" />
                      <span>Disparar</span>
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-bold font-mono">---</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
