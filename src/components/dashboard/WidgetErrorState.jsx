import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function WidgetErrorState({ 
  title = 'Não foi possível carregar este módulo', 
  message = 'Ocorreu uma falha na consulta aos dados operacionais.',
  onRetry 
}) {
  return (
    <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/20 bg-rose-50/40 dark:bg-rose-500/5 flex flex-col items-center justify-center text-center space-y-2 py-6">
      <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center">
        <AlertCircle className="w-4 h-4" />
      </div>
      <div>
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{title}</h4>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 max-w-xs">{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Tentar novamente</span>
        </button>
      )}
    </div>
  );
}
