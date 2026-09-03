import React, { useState, useEffect } from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { subscriptionService } from '../services/subscriptionService';
import { plans } from '../config/plans';
import { 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Building2, 
  Calendar, 
  ArrowRight, 
  RotateCcw,
  Boxes
} from 'lucide-react';

export default function SubscriptionPage() {
  const { navigateTo, setAppsOpen, triggerToast, textTitle, textSec } = useDiskHub();
  const [subscription, setSubscription] = useState(() => subscriptionService.getSubscription());

  useEffect(() => {
    const unsub = subscriptionService.subscribe((sub) => {
      setSubscription(sub);
    });
    return unsub;
  }, []);

  const planData = plans[subscription.plan] || plans.standard;

  const handleResetDemo = () => {
    subscriptionService.resetToDefault();
    triggerToast("Assinatura Reiniciada", "Assinatura retornada ao plano Standard padrão para simulação.");
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white dark:bg-[#111827] p-5 rounded-2xl border border-slate-200 dark:border-[#1F2937] shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-orange-50 dark:bg-orange-500/10 text-[#F97316] flex items-center justify-center shrink-0 shadow-xs">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h1 className={`text-xl font-black ${textTitle} tracking-tight mb-0.5`}>
              Minha Assinatura & Licenças
            </h1>
            <p className={`text-xs ${textSec} mb-0`}>
              Gestão de plano, módulos contratados, usuários corporativos e renovação.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleResetDemo}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs font-bold border-0 cursor-pointer transition-all flex items-center space-x-1.5"
            title="Restaurar simulação inicial Standard"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resetar Demonstração</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('/planos')}
            className="px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black border-0 cursor-pointer shadow-md shadow-[#F97316]/25 flex items-center space-x-1.5 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Fazer Upgrade de Plano</span>
          </button>
        </div>
      </div>

      {/* Subscription Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Plan card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase text-slate-400">Plano Atual</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase">
              {subscription.status}
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase">{planData.name}</h2>
          <p className="text-xs text-slate-400 mb-0">{planData.tagline}</p>
          <div className="pt-2 border-t border-slate-100 dark:border-white/5 text-[11px] text-slate-500">
            {planData.includedModules.length} aplicativos empresariais liberados
          </div>
        </div>

        {/* Company card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs space-y-3">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Empresa Titular</span>
          <h2 className="text-base font-black text-slate-900 dark:text-white truncate">
            {subscription.company?.legalName || 'Produtor Exemplo Ltda'}
          </h2>
          <p className="text-xs text-slate-400 mb-0 font-mono">
            {subscription.company?.document || '12.345.678/0001-90'}
          </p>
          <div className="pt-2 border-t border-slate-100 dark:border-white/5 text-[11px] text-slate-500">
            {subscription.users || 3} acessos com perfis configurados
          </div>
        </div>

        {/* Billing cycle card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs space-y-3">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Renovação da Licença</span>
          <h2 className="text-xl font-black text-[#F97316]">
            Mensal Automática
          </h2>
          <p className="text-xs text-slate-400 mb-0">
            Próxima cobrança: <strong>15/10/2026</strong>
          </p>
          <div className="pt-2 border-t border-slate-100 dark:border-white/5 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Faturamento em dia (100% regular)</span>
          </div>
        </div>

      </div>

      {/* Active Modules Grid */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">
              Aplicativos Liberados para sua Operação ({planData.includedModules.length})
            </h3>
            <p className="text-xs text-slate-400 mb-0">Módulos com licença corporativa ativa no ecossistema DiskHub.</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setAppsOpen(true);
              navigateTo('/dashboard');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs border-0 cursor-pointer transition-all flex items-center space-x-1.5"
          >
            <Boxes className="w-4 h-4" />
            <span>Abrir Central de Apps</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {planData.includedModules.map(modId => (
            <div key={modId} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase">{modId}</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Ativo</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
