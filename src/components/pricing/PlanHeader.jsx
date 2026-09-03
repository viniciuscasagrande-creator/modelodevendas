import React from 'react';
import { Crown } from 'lucide-react';

export default function PlanHeader({ billingCycle, setBillingCycle, textTitle, textSec }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-200 dark:border-white/5 gap-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-white shrink-0">
          <Crown className="w-6 h-6 text-[#F97316]" />
        </div>
        <div>
          <h2 className={`text-xl font-bold ${textTitle} mb-0`}>Planos & Upgrades</h2>
          <p className={`text-xs ${textSec} mb-0`}>Escolha o plano ideal para o seu negócio e escale suas operações com eficiência.</p>
        </div>
      </div>

      {/* Ciclo de Cobrança Anual / Mensal */}
      <div className="flex items-center bg-slate-100 dark:bg-white/5 p-1 rounded-lg border border-slate-200 dark:border-white/10 text-xs">
        <button 
          onClick={() => setBillingCycle('monthly')}
          className={`px-3 py-1.5 rounded-md font-bold transition-all border-0 cursor-pointer ${
            billingCycle === 'monthly' ? 'bg-[#2563EB] text-white' : 'text-slate-450 dark:text-slate-400 bg-transparent'
          }`}
        >
          Mensal
        </button>
        <button 
          onClick={() => setBillingCycle('annual')}
          className={`px-3 py-1.5 rounded-md font-bold transition-all border-0 cursor-pointer flex items-center space-x-1 ${
            billingCycle === 'annual' ? 'bg-[#2563EB] text-white' : 'text-slate-400 bg-transparent'
          }`}
        >
          <span>Anual</span>
          <span className="bg-[#10B981] text-white text-[8px] px-1 py-0.2 rounded font-black uppercase tracking-wider">Economize 20%</span>
        </button>
      </div>
    </div>
  );
}
