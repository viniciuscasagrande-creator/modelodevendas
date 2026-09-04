import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Ocorreu um erro inesperado',
  message = 'Não foi possível carregar os dados. Verifique a conexão com o servidor.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-rose-950/20 border border-rose-500/20 my-4">
      <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-3 border border-rose-500/20">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-black text-white tracking-tight mb-1">{title}</h3>
      <p className="text-xs text-rose-300/80 max-w-sm mb-4 leading-relaxed">{message}</p>
      {onRetry && (
        <Button size="sm" variant="secondary" onClick={onRetry} className="flex items-center space-x-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Tentar novamente</span>
        </Button>
      )}
    </div>
  );
}
