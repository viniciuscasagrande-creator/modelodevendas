import React, { useState, useEffect } from 'react';
import { subscriptionService } from '../../services/subscriptionService';
import { userAccessService } from '../../services/userAccessService';
import { Sparkles, AlertCircle, RotateCcw } from 'lucide-react';

export default function AppBootstrap({ children }) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    try {
      // Hydrate subscription and tenant
      subscriptionService.getSubscription();
      userAccessService.getCurrentUser().then(() => {
        if (isMounted) setIsReady(true);
      }).catch(err => {
        if (isMounted) setError(err.message || 'Falha ao inicializar o ambiente.');
      });
    } catch (err) {
      if (isMounted) setError(err.message || 'Falha ao inicializar o ambiente.');
    }
    return () => { isMounted = false; };
  }, []);

  if (error) {
    return (
      <div data-testid="app-bootstrap" className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4 font-sans">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#111827] border border-white/10 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-black">Não foi possível preparar seu ambiente</h2>
          <p className="text-xs text-slate-400">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-xl bg-[#F97316] text-white text-xs font-bold border-0 cursor-pointer shadow-md inline-flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tentar Novamente</span>
          </button>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div data-testid="app-bootstrap" className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-sans">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-[#F97316] flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-400 block">Preparando seu ambiente DiskHub...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
