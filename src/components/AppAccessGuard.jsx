import React, { useState, useEffect } from 'react';
import { subscriptionService } from '../services/subscriptionService';
import { useDiskHub } from '../context/DiskHubContext';
import { Lock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { products } from '../config/products';

export default function AppAccessGuard({ appId, children }) {
  const { navigateTo, bgCard, borderCol, textTitle, textSec } = useDiskHub();
  const [canAccess, setCanAccess] = useState(() => subscriptionService.canAccess(appId));
  const [currentPlan, setCurrentPlan] = useState(() => subscriptionService.getPlan());

  useEffect(() => {
    const unsub = subscriptionService.subscribe(() => {
      setCanAccess(subscriptionService.canAccess(appId));
      setCurrentPlan(subscriptionService.getPlan());
    });
    return unsub;
  }, [appId]);

  if (canAccess) {
    return <>{children}</>;
  }

  const product = products[appId] || {
    name: 'Módulo DiskHub',
    headline: 'Este módulo faz parte dos planos avançados do DiskHub Business Cloud.',
    minimumPlan: 'advanced'
  };

  const requiredPlanName = product.minimumPlan === 'expert' ? 'Expert' : 'Advanced';

  return (
    <div data-testid="access-blocked" className="py-12 px-4 flex items-center justify-center animate-fadeIn font-sans">
      <div className={`max-w-lg w-full ${bgCard} border ${borderCol} rounded-3xl p-8 text-center shadow-xl space-y-5`}>
        
        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-[#F97316] flex items-center justify-center mx-auto shadow-sm">
          <Lock className="w-8 h-8" />
        </div>

        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 text-[#F97316] text-[10px] font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Disponível no Plano {requiredPlanName}</span>
          </div>

          <h2 className={`text-xl font-black ${textTitle} tracking-tight mb-1.5`}>
            {product.name}
          </h2>
          <p className={`text-xs ${textSec} max-w-md mx-auto leading-relaxed mb-0`}>
            {product.headline}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/50 border border-slate-200 dark:border-white/5 text-left text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-200 font-bold">
            <span className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#F97316]" />
              <span>Seu Plano Atual: {currentPlan.toUpperCase()}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal">Requer Upgrade</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-0">
            Ao fazer upgrade para o plano <strong>{requiredPlanName}</strong>, este módulo e todos os recursos de expansão serão liberados automaticamente para sua empresa.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo(`/produtos/${appId}`)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border-0 cursor-pointer transition-all"
          >
            Conhecer Módulo
          </button>

          <button
            type="button"
            onClick={() => navigateTo(`/planos?produto=${appId}&upgrade=true`)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black border-0 cursor-pointer shadow-lg shadow-[#F97316]/25 flex items-center justify-center space-x-2 transition-all"
          >
            <span>Ver Planos & Upgrade</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
