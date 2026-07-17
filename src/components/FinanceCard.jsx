import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { Landmark, ArrowUpRight } from 'lucide-react';

export default function FinanceCard() {
  const { accounts, cardClass, textTitle, textSec } = useDiskHub();

  return (
    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
      <div className="border-b border-slate-100 dark:border-white/5 pb-3 mb-4 flex justify-between items-center">
        <div>
          <h4 className={`text-sm font-black ${textTitle} uppercase tracking-wider mb-1`}>Contas e Saldos de Liquidez</h4>
          <p className={`text-xs ${textSec} mb-0`}>Saldos correntes e gateway digital.</p>
        </div>
      </div>

      <div className="space-y-3 flex-1 flex flex-col justify-center">
        {accounts.map((acc) => (
          <div 
            key={acc.id} 
            className="p-3.5 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/2 hover:shadow-sm transition-all flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#F97316]/10 text-[#F97316] flex items-center justify-center">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <span className={`text-[11px] font-bold ${textTitle} block`}>
                  {acc.name}
                </span>
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                  {acc.type}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-xs font-black ${textTitle} block font-mono`}>
                R$ {acc.balance.toLocaleString('pt-BR')}
              </span>
              <span className="text-[8px] text-[#10B981] font-bold bg-[#10B981]/10 px-2 py-0.5 rounded-full">
                Disponível
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
