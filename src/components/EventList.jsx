import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { MapPin, Calendar, Users } from 'lucide-react';

export default function EventList() {
  const { events, cardClass, textTitle, textSec, setCurrentTab } = useDiskHub();

  return (
    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
      <div className="border-b border-slate-100 dark:border-white/5 pb-3 mb-4 flex justify-between items-center">
        <div>
          <h4 className={`text-sm font-black ${textTitle} uppercase tracking-wider mb-1`}>Painel Geral de Eventos</h4>
          <p className={`text-xs ${textSec} mb-0`}>Lista de shows e feiras em andamento.</p>
        </div>
        <button 
          onClick={() => setCurrentTab('eventos')}
          className="btn btn-xs py-1 px-3 bg-[#F97316]/10 text-[#F97316] hover:bg-[#F97316] hover:text-white rounded border-0 text-[10px] font-bold cursor-pointer"
        >
          Ver Todos
        </button>
      </div>

      <div className="space-y-3 flex-1 flex flex-col justify-center">
        {events.slice(0, 3).map((ev) => (
          <div 
            key={ev.id} 
            className="p-3 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/2 hover:shadow-sm transition-all flex justify-between items-center"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-sm">
                🎫
              </div>
              <div>
                <span className={`text-[11.5px] font-bold ${textTitle} block mb-0.5`}>
                  {ev.name}
                </span>
                <div className="flex items-center space-x-2 text-[9px] text-slate-400 font-semibold uppercase">
                  <span className="flex items-center"><MapPin className="w-2.5 h-2.5 mr-0.5" />{ev.city}</span>
                  <span>•</span>
                  <span className="flex items-center"><Calendar className="w-2.5 h-2.5 mr-0.5" />{ev.date}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className={`badge ${
                ev.status === 'Ativo' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-slate-400/10 text-slate-400'
              } text-[8.5px] font-mono font-bold uppercase py-0.5 px-2 rounded-full`}>
                {ev.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
