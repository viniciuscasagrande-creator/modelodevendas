import React, { useState } from 'react';
import { AlertTriangle, X, ArrowDownRight, ShieldCheck } from 'lucide-react';
import { plans } from '../../config/plans';

export default function DowngradeImpactModal({ currentPlan, targetPlan, onClose, onConfirm }) {
  const [understood, setUnderstood] = useState(false);
  const [reason, setReason] = useState('');

  const currentDef = plans[currentPlan] || plans.advanced;
  const targetDef = plans[targetPlan] || plans.standard;

  // Impacted modules
  const impactedModules = currentDef.includedModules.filter(m => !targetDef.includedModules.includes(m));

  const handleConfirm = () => {
    if (!understood) return;
    onConfirm(targetPlan, reason);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[160] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn font-sans"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-w-lg w-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] rounded-3xl p-6 shadow-2xl space-y-4 animate-scaleUp">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center space-x-2 text-amber-600">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-0">
              Análise de Impacto de Downgrade
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-white flex items-center justify-center border-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300">
            Você está solicitando a alteração de plano de <strong>{currentDef.name.toUpperCase()}</strong> para <strong>{targetDef.name.toUpperCase()}</strong>.
          </div>

          <div className="space-y-1.5">
            <span className="font-bold text-slate-700 dark:text-slate-300 block">
              Módulos que deixarão de ter acesso ativo ({impactedModules.length}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {impactedModules.map(m => (
                <span key={m} className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 font-bold uppercase text-[10px]">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Critical Guarantee Alert */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/60 border border-slate-200 dark:border-white/5 space-y-1 text-slate-600 dark:text-slate-300">
            <div className="flex items-center space-x-1.5 font-bold text-slate-800 dark:text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Seus dados continuam 100% seguros</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-0">
              Nenhum dado cadastrado, cliente, histórico financeiro ou relatório será excluído. O acesso será apenas congelado conforme as regras do novo plano.
            </p>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Motivo da alteração (Opcional):
            </label>
            <textarea
              rows="2"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ex: Adequação orçamentária do semestre..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <label className="flex items-start space-x-2 pt-1 cursor-pointer text-slate-700 dark:text-slate-300 font-semibold">
            <input
              type="checkbox"
              checked={understood}
              onChange={(e) => setUnderstood(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-[#F97316]"
            />
            <span>Entendo quais recursos serão suspensos no encerramento do ciclo atual.</span>
          </label>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-bold border-0 cursor-pointer"
          >
            Voltar
          </button>
          <button
            type="button"
            disabled={!understood}
            onClick={handleConfirm}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-black border-0 cursor-pointer shadow-md flex items-center space-x-1.5 transition-all"
          >
            <span>Solicitar Downgrade Agendado</span>
            <ArrowDownRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
