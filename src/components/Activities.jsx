import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { Clock } from 'lucide-react';

export default function Activities() {
  const { eventLogs, cardClass, textTitle, textSec } = useDiskHub();

  return (
    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
      <div>
        <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-3`}>Atividades e Log de Operações</h4>
        <div className="space-y-2.5">
          {eventLogs.slice(0, 4).map((log) => (
            <div 
              key={log.id} 
              className="flex items-start space-x-2.5 p-2 rounded-xl bg-slate-50/50 dark:bg-white/2 border border-slate-100 dark:border-white/5 text-[10px]"
            >
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className={`badge ${
                    log.type === 'Check-in' ? 'bg-emerald-500/10 text-emerald-500' :
                    log.type === 'Venda PDV' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-amber-500/10 text-amber-500'
                  } font-mono text-[7.5px] px-1.5 py-0.5 rounded uppercase font-black`}>
                    {log.type}
                  </span>
                  <span className="text-slate-400 text-[8.5px] font-semibold">{log.timestamp}</span>
                </div>
                <p className={`mb-0 leading-relaxed text-slate-600 dark:text-slate-300 font-medium`}>
                  {log.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
