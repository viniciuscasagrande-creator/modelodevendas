import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';

export default function RevenueChart() {
  const { cardClass, textTitle, textSec } = useDiskHub();

  return (
    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
      <div className="border-b border-slate-100 dark:border-white/5 pb-3 mb-4 flex justify-between items-center">
        <div>
          <h4 className={`text-sm font-black ${textTitle} uppercase tracking-wider mb-1`}>Conversão e Faturamento das Campanhas (7 dias)</h4>
          <p className={`text-xs ${textSec} mb-0`}>Histórico semanal de vendas rastreadas e volume de tráfego.</p>
        </div>
        <span className="badge bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full">Atualizado em Tempo Real</span>
      </div>

      {/* SVG Area Chart */}
      <div className="w-full flex-1 flex flex-col justify-end">
        <svg viewBox="0 0 500 150" className="w-full h-44 overflow-visible">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
          <line x1="0" y1="60" x2="500" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
          <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
          <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
          
          {/* Area */}
          <path d="M 0 120 Q 80 50 150 90 T 300 30 T 450 60 L 500 50 L 500 150 L 0 150 Z" fill="url(#areaGrad)" />
          
          {/* Line */}
          <path d="M 0 120 Q 80 50 150 90 T 300 30 T 450 60 L 500 50" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Points & Tooltips */}
          <g className="cursor-pointer group">
            <circle cx="150" cy="90" r="4.5" fill="#F97316" stroke="#fff" strokeWidth="1.5" />
            <text x="150" y="75" textAnchor="middle" className="text-[9px] font-mono fill-[#F97316] font-bold opacity-0 group-hover:opacity-100 transition-opacity">R$ 48K</text>
          </g>
          <g className="cursor-pointer group">
            <circle cx="300" cy="30" r="4.5" fill="#F97316" stroke="#fff" strokeWidth="1.5" />
            <text x="300" y="15" textAnchor="middle" className="text-[9px] font-mono fill-[#F97316] font-bold opacity-0 group-hover:opacity-100 transition-opacity">R$ 115K</text>
          </g>
          <g className="cursor-pointer group">
            <circle cx="450" cy="60" r="4.5" fill="#F97316" stroke="#fff" strokeWidth="1.5" />
            <text x="450" y="45" textAnchor="middle" className="text-[9px] font-mono fill-[#F97316] font-bold opacity-0 group-hover:opacity-100 transition-opacity">R$ 82K</text>
          </g>
        </svg>

        {/* X Axis Labels */}
        <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono mt-3 px-2">
          <span>Segunda</span>
          <span>Terça</span>
          <span>Quarta</span>
          <span>Quinta</span>
          <span>Sexta</span>
          <span>Sábado</span>
          <span>Domingo</span>
        </div>
      </div>
    </div>
  );
}
