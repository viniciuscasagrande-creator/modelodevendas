import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const { navigateTo, bgCard, borderCol, textTitle, textSec } = useDiskHub();

  return (
    <div data-testid="not-found-page" className="py-16 px-4 flex items-center justify-center font-sans animate-fadeIn">
      <div className={`max-w-md w-full ${bgCard} border ${borderCol} rounded-3xl p-8 text-center shadow-xl space-y-5`}>
        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-[#F97316] flex items-center justify-center mx-auto shadow-sm">
          <Compass className="w-8 h-8 font-black" />
        </div>

        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#F97316] px-2.5 py-0.5 rounded-full bg-orange-50 dark:bg-orange-500/10 inline-block mb-2">
            Erro 404 • Rota Não Encontrada
          </span>
          <h2 className={`text-xl font-black ${textTitle} tracking-tight mb-1`}>
            Página não encontrada
          </h2>
          <p className={`text-xs ${textSec} max-w-sm mx-auto leading-relaxed mb-0`}>
            A URL solicitada não existe ou foi movida. Verifique o caminho ou retorne ao painel principal.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-3 pt-2">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold border-0 cursor-pointer flex items-center space-x-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('/dashboard')}
            className="px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black border-0 cursor-pointer shadow-md flex items-center space-x-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Voltar ao Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
