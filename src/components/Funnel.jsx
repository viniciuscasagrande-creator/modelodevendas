import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';

export default function Funnel() {
  const { cardClass, textTitle, textSec } = useDiskHub();

  const funnelStages = [
    { stage: 'Visualizações (Site/App)', count: '458.200', pct: '100%', bg: 'bg-slate-400 dark:bg-slate-500' },
    { stage: 'Cliques no Link', count: '74.310', pct: '16.2%', bg: 'bg-blue-500' },
    { stage: 'Checkout Iniciado', count: '18.420', pct: '4.0%', bg: 'bg-indigo-500' },
    { stage: 'Ingressos Pagos', count: '4.890', pct: '1.06%', bg: 'bg-[#F97316]' }
  ];

  return (
    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
      <div className="border-b border-slate-100 dark:border-white/5 pb-3 mb-4">
        <h4 className={`text-sm font-black ${textTitle} uppercase tracking-wider mb-1`}>Funil de Vendas de Marketing</h4>
        <p className={`text-xs ${textSec} mb-0`}>Taxa de conversão por etapa da campanha.</p>
      </div>

      <div className="space-y-3.5 flex-1 flex flex-col justify-center">
        {funnelStages.map((f, fIdx) => (
          <div key={fIdx} className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold">
              <span className={textTitle}>{f.stage}</span>
              <span className="font-mono text-slate-400">{f.count} ({f.pct})</span>
            </div>
            <div className="progress rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800" style={{ height: '8px' }}>
              <div className={`progress-bar ${f.bg} h-full rounded-lg`} style={{ width: f.pct }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
