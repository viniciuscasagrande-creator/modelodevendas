import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export function GrowthBanner() {
  const navigate = useNavigate();

  return (
    <div
      data-testid="growth-banner"
      className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-950/40 to-[#111721] border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm relative overflow-hidden"
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 block mb-0.5">
            Oportunidade Comercial
          </span>
          <h3 className="text-lg font-black text-white tracking-tight mb-1">
            Expanda sua operação com soluções integradas
          </h3>
          <p className="text-xs text-slate-300/80 max-w-xl leading-relaxed mb-0">
            Adicione automação de marketing, conciliação contábil e inteligência preditiva ao seu ecossistema com condições exclusivas.
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate('/app/planos')}
        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 flex items-center justify-center space-x-2 cursor-pointer transition-all shadow-md shadow-blue-600/25"
      >
        <span>Conhecer soluções</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
