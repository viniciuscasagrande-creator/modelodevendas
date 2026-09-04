import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertTriangle, ShieldAlert, RefreshCw, LogIn } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { authService } from '../../services/authService';

interface AppBootstrapProps {
  children: ReactNode;
}

export function AppBootstrap({ children }: AppBootstrapProps) {
  const { status, error, tenant, availableTenants, switchTenant, refreshContext, logout } = useAppContext();
  const navigate = useNavigate();

  // 1. Loading State
  if (status === 'loading') {
    return (
      <div
        data-testid="app-bootstrap-loading"
        className="min-h-screen bg-[#0b0f17] flex flex-col items-center justify-center p-4"
      >
        <div className="flex flex-col items-center space-y-4 text-center max-w-sm">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-600/25 animate-pulse">
              <span className="font-black text-white text-xl tracking-wider">DH</span>
            </div>
            <Loader2 className="w-6 h-6 text-blue-400 animate-spin absolute -bottom-2 -right-2 bg-[#0b0f17] rounded-full p-0.5" />
          </div>
          <div>
            <h2 className="text-base font-black text-white tracking-tight">DiskHub Business Cloud</h2>
            <p className="text-xs text-slate-400 mt-1">Carregando contexto e autorizações...</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated State
  if (status === 'unauthenticated') {
    return (
      <div
        data-testid="app-bootstrap-unauthenticated"
        className="min-h-screen bg-[#0b0f17] flex flex-col items-center justify-center p-4 text-center"
      >
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#111721] border border-white/10 shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-black text-white tracking-tight mb-2">Sessão Não Autenticada</h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            É necessário fazer login com as credenciais do seu produtor para acessar a plataforma.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            Ir para a Tela de Login
          </button>
        </div>
      </div>
    );
  }

  // 3. Error State
  if (status === 'error') {
    return (
      <div
        data-testid="app-bootstrap-error"
        className="min-h-screen bg-[#0b0f17] flex flex-col items-center justify-center p-4 text-center"
      >
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#111721] border border-rose-500/30 shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-black text-white tracking-tight mb-2">Erro ao Iniciar Sessão</h2>
          <p className="text-xs text-rose-300/80 mb-6 leading-relaxed">
            {error?.message || 'Não foi possível carregar os dados do seu produtor. Verifique a conexão ou tente novamente.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => refreshContext()}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-blue-600/30 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Tentar Novamente</span>
            </button>
            <button
              onClick={logout}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs border border-white/10 cursor-pointer"
            >
              Trocar de Conta
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Subscription Inactive State
  if (status === 'subscription_inactive') {
    return (
      <div
        data-testid="app-bootstrap-subscription-inactive"
        className="min-h-screen bg-[#0b0f17] flex flex-col items-center justify-center p-4 text-center"
      >
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#111721] border border-amber-500/30 shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-black text-white tracking-tight mb-2">Assinatura Suspensa ou Inativa</h2>
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            A assinatura associada ao produtor <strong className="text-white">{tenant?.name}</strong> está inativa ou com faturas pendentes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/app/assinatura')}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-600/30 cursor-pointer"
            >
              Regularizar Assinatura
            </button>
            <button
              onClick={logout}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs border border-white/10 cursor-pointer"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5. Tenant Required State (e.g. multiple tenants and none active)
  if (status === 'tenant_required') {
    return (
      <div
        data-testid="app-bootstrap-tenant-required"
        className="min-h-screen bg-[#0b0f17] flex flex-col items-center justify-center p-4 text-center"
      >
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#111721] border border-white/10 shadow-2xl text-left">
          <h2 className="text-lg font-black text-white tracking-tight mb-2 text-center">Selecione o Produtor</h2>
          <p className="text-xs text-slate-400 mb-6 text-center leading-relaxed">
            Sua conta tem acesso a múltiplos ambientes. Selecione qual deseja gerenciar agora:
          </p>
          <div className="space-y-2 mb-6">
            {availableTenants.map((t) => (
              <button
                key={t.id}
                onClick={() => switchTenant(t.id)}
                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-white">{t.name}</div>
                  <div className="text-[10px] text-slate-400 capitalize">{t.role} • Plano {t.plan}</div>
                </div>
                <span className="text-xs text-blue-400 font-bold">Acessar ›</span>
              </button>
            ))}
          </div>
          <button
            onClick={logout}
            className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-bold border border-white/5 text-center cursor-pointer"
          >
            Encerrar Sessão
          </button>
        </div>
      </div>
    );
  }

  // 6. Authenticated: Render children application
  return <>{children}</>;
}
