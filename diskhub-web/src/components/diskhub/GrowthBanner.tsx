import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, ArrowRight, TrendingUp } from 'lucide-react';

export function GrowthBanner() {
  const navigate = useNavigate();

  return (
    <div
      data-testid="growth-banner"
      className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#121929] via-[#101b33] to-[#121929] border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg relative overflow-hidden"
    >
      <div className="flex items-center space-x-4 z-10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600/30 to-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-black text-white tracking-tight mb-0.5">
            Expanda sua operação
          </h3>
          <p className="text-xs text-slate-300/90 leading-relaxed mb-0">
            Novas oportunidades para vender mais, automatizar processos e tomar decisões com dados.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4 z-10 shrink-0 self-end md:self-auto">
        <button
          onClick={() => navigate('/app/planos')}
          className="px-4 py-2.5 rounded-xl bg-[#152033] hover:bg-[#1a2942] text-white text-xs font-bold border border-white/10 flex items-center space-x-2 cursor-pointer transition-all shadow-sm"
        >
          <span>Conhecer soluções</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* 3D Isometric Chart Visual representation */}
        <div className="hidden lg:flex items-end space-x-1.5 opacity-90 pl-2">
          <div className="w-3 h-6 bg-gradient-to-t from-blue-700 to-indigo-500 rounded-t-sm" />
          <div className="w-3 h-9 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm" />
          <div className="w-3 h-14 bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t-sm relative">
            <TrendingUp className="w-4 h-4 text-cyan-300 absolute -top-5 -right-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
