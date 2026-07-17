import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';

export default function SalesChart() {
  const { cardClass, textTitle, textSec } = useDiskHub();

  const data = [
    { label: 'Pista L1', value: 80, color: 'bg-blue-500' },
    { label: 'VIP L1', value: 65, color: 'bg-[#F97316]' },
    { label: 'Camarotes', value: 45, color: 'bg-purple-500' },
    { label: 'Front Stage', value: 90, color: 'bg-emerald-500' }
  ];

  return (
    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
      <div className="border-b border-slate-100 dark:border-white/5 pb-3 mb-4">
        <h4 className={`text-sm font-black ${textTitle} uppercase tracking-wider mb-1`}>Desempenho de Vendas por Setor</h4>
        <p className={`text-xs ${textSec} mb-0`}>Velocidade de vendas e percentual de lote vendido.</p>
      </div>

      <div className="space-y-4 flex-1 flex flex-col justify-center">
        {data.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold">
              <span className={textTitle}>{item.label}</span>
              <span className="font-mono text-slate-400">{item.value}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
              <div 
                className={`${item.color} h-full rounded-full transition-all duration-500`} 
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
