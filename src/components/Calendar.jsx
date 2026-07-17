import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { Clock } from 'lucide-react';

export default function Calendar() {
  const { appointments, cardClass, textTitle, textSec, setCurrentTab, setCrmSubTab } = useDiskHub();

  const handleGoToAgenda = () => {
    setCurrentTab('contabilidade');
    setCrmSubTab('agenda');
  };

  return (
    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
      <div>
        <h3 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-3`}>Agenda Próximos Compromissos</h3>
        <div className="space-y-2.5">
          {appointments.slice(0, 3).map(apt => (
            <div 
              key={apt.id} 
              className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-50/50 dark:bg-white/2 border border-slate-100 dark:border-white/5 transition-all hover:shadow-sm"
            >
              <Clock className="w-3.5 h-3.5 text-[#3B82F6] shrink-0 mt-0.5" />
              <div>
                <p className={`text-xs font-bold ${textTitle} mb-0.5 leading-snug`}>
                  {apt.title}
                </p>
                <p className="text-[9.5px] text-slate-400 mb-0 font-semibold">
                  {apt.date} às {apt.time} • <span className="text-[#3B82F6]">{apt.type}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button 
        onClick={handleGoToAgenda} 
        className="text-xs font-bold text-[#3B82F6] hover:underline mt-4 text-left border-0 bg-transparent cursor-pointer p-0"
      >
        Ver agenda completa &rarr;
      </button>
    </div>
  );
}
