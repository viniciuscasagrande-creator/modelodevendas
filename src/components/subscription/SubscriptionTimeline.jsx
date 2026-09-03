import React, { useState } from 'react';
import { 
  History, 
  CreditCard, 
  Sparkles, 
  Boxes, 
  Users, 
  Clock 
} from 'lucide-react';

export default function SubscriptionTimeline({ events = [] }) {
  const [filter, setFilter] = useState('all'); // all | plano | aplicativos | cobranca | usuarios

  const filteredEvents = events.filter(e => {
    if (filter === 'all') return true;
    return e.category === filter;
  });

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'cobranca': return <CreditCard className="w-3.5 h-3.5 text-emerald-500" />;
      case 'plano': return <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />;
      case 'aplicativos': return <Boxes className="w-3.5 h-3.5 text-purple-500" />;
      case 'usuarios': return <Users className="w-3.5 h-3.5 text-blue-500" />;
      default: return <Clock className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div data-testid="subscription-history" className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm space-y-4 animate-fadeIn font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-[#F97316]" />
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-0">
              Trilha de Auditoria & Histórico da Assinatura
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-0">
            Registro cronológico de upgrades, ativações de módulos e eventos de faturamento.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center space-x-1.5 text-xs overflow-x-auto">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'plano', label: 'Plano' },
            { id: 'aplicativos', label: 'Aplicativos' },
            { id: 'cobranca', label: 'Cobrança' },
            { id: 'usuarios', label: 'Usuários' }
          ].map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1 rounded-xl font-bold border-0 cursor-pointer transition-all ${
                filter === f.id
                  ? 'bg-[#F97316] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline list */}
      <div className="pt-2 space-y-3">
        {filteredEvents.length > 0 ? (
          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-white/10">
            {filteredEvents.map(evt => (
              <div key={evt.id} className="relative group text-xs">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-white dark:bg-[#111827] border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center">
                  {getCategoryIcon(evt.category)}
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 dark:text-white text-xs">{evt.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{evt.date}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mb-0 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-slate-400">
            <p className="text-xs">Ainda não existem eventos na assinatura para esta categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
