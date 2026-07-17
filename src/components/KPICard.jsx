import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';

export default function KPICard({ title, value, icon: Icon, trend, trendColor = 'text-[#10B981]', trendBg = 'bg-[#10B981]/10', borderLeftColor }) {
  const { cardClass, textTitle, textSec } = useDiskHub();

  return (
    <div 
      className={`card ${cardClass} p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-lg`}
      style={borderLeftColor ? { borderLeft: `4px solid ${borderLeftColor}` } : {}}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-300">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div>
        <div className="flex items-baseline space-x-2">
          <span className={`text-xl font-extrabold ${textTitle} tracking-tight`}>
            {value}
          </span>
          {trend && (
            <span className={`text-[9px] font-bold ${trendColor} ${trendBg} px-2 py-0.5 rounded-full font-mono shrink-0`}>
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
