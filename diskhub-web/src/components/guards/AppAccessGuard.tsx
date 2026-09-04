import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { AccessReason } from '../../types/context';

interface AppAccessGuardProps {
  app: string;
  fallback?: ReactNode;
  children: ReactNode;
}

export function AppAccessGuard({ app, fallback, children }: AppAccessGuardProps) {
  const { getAccessReason, getLicense, subscription, tenant } = useAppContext();
  const navigate = useNavigate();

  const reason: AccessReason = getAccessReason(app);
  const license = getLicense(app);
  const appName = license?.name || app.toUpperCase();
  const requiredTier = (license?.tier || 'expert').toUpperCase();

  // If allowed, render protected children directly
  if (reason === 'allowed') {
    return <>{children}</>;
  }

  // If custom fallback is provided, render it (never return null!)
  if (fallback !== undefined) {
    return <>{fallback}</>;
  }

  // Handle specific block reasons with rich commercial views
  if (reason === 'upgrade_required' || reason === 'no_license') {
    return (
      <div
        data-testid={`access-guard-upgrade-${app}`}
        className="p-8 my-8 rounded-2xl bg-gradient-to-b from-[#131b2e] to-[#111721] border border-blue-500/30 text-center max-w-xl mx-auto shadow-2xl animate-fadeIn"
      >
        <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block mb-1">
          Módulo Bloqueado
        </span>
        <h3 className="text-xl font-black text-white tracking-tight mb-2">
          {appName} requer o Plano {requiredTier}
        </h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
          Seu produtor atual (<strong className="text-white">{tenant?.name}</strong>) está no plano{' '}
          <strong className="text-blue-400 uppercase">{subscription?.plan || 'standard'}</strong>.
          Faça upgrade da assinatura para ter acesso imediato a todos os recursos deste módulo.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/app/dashboard')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold border border-white/10 flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Dashboard</span>
          </button>
          <button
            onClick={() => navigate(`/app/planos?highlight=${license?.tier || 'expert'}`)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <span>Fazer Upgrade para {requiredTier}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  if (reason === 'permission_denied') {
    return (
      <div
        data-testid={`access-guard-forbidden-${app}`}
        className="p-8 my-8 rounded-2xl bg-[#111721] border border-rose-500/30 text-center max-w-xl mx-auto shadow-xl animate-fadeIn"
      >
        <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block mb-1">
          Acesso Restrito
        </span>
        <h3 className="text-xl font-black text-white tracking-tight mb-2">
          Permissão Insuficiente
        </h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
          Seu perfil no produtor <strong className="text-white">{tenant?.name}</strong> não possui permissão para acessar o módulo <strong>{appName}</strong>.
          Solicite autorização a um administrador.
        </p>
        <button
          onClick={() => navigate('/app/dashboard')}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold border border-white/10 cursor-pointer"
        >
          Voltar ao Dashboard
        </button>
      </div>
    );
  }

  // Fallback for subscription_inactive or tenant_inactive
  return (
    <div
      data-testid={`access-guard-inactive-${app}`}
      className="p-8 my-8 rounded-2xl bg-[#111721] border border-amber-500/30 text-center max-w-xl mx-auto shadow-xl animate-fadeIn"
    >
      <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
        <ShieldAlert className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-black text-white tracking-tight mb-2">
        Acesso Temporariamente Indisponível
      </h3>
      <p className="text-xs text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
        O acesso ao módulo {appName} está indisponível devido ao status da assinatura do produtor.
      </p>
      <button
        onClick={() => navigate('/app/assinatura')}
        className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold cursor-pointer"
      >
        Ver Detalhes da Assinatura
      </button>
    </div>
  );
}
