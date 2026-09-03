import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { Sparkles, ArrowLeft, Clock } from 'lucide-react';

export default function PreparationPage({ moduleName = 'Módulo', onBack }) {
  const { navigateTo, bgCard, borderCol, textTitle, textSec } = useDiskHub();

  const handleReturn = () => {
    if (onBack) {
      onBack();
    } else {
      navigateTo('/dashboard');
    }
  };

  return (
    <div className="py-12 px-4 flex items-center justify-center animate-fadeIn font-sans">
      <div className={`max-w-lg w-full ${bgCard} border ${borderCol} rounded-2xl p-8 text-center shadow-xl space-y-5`}>
        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-[#F97316] flex items-center justify-center mx-auto shadow-sm">
          <Clock className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F97316] bg-orange-50 dark:bg-orange-500/10 px-2.5 py-1 rounded-full">
            Em Desenvolvimento
          </span>
          <h2 className={`text-xl font-black ${textTitle} mt-2.5 mb-1`}>
            {moduleName} em preparação
          </h2>
          <p className={`text-xs ${textSec} max-w-sm mx-auto mb-0`}>
            Este módulo será disponibilizado em breve com integração nativa ao ecossistema comercial do DiskHub.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 text-left text-xs space-y-1.5">
          <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Fase 27.0 em execução ativa</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-0">
            Nossa equipe de engenharia está finalizando as regras de automação e relatórios analíticos para este módulo.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={handleReturn}
            className="px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold border-0 cursor-pointer shadow-lg shadow-[#F97316]/20 flex items-center space-x-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
