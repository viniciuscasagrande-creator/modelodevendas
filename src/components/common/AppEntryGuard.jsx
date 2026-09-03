import React, { useState, useEffect } from 'react';
import { subscriptionService } from '../../services/subscriptionService';
import { userAccessService } from '../../services/userAccessService';
import { appRegistry } from '../../config/apps';
import { products } from '../../config/products';
import { useDiskHub } from '../../context/DiskHubContext';
import { 
  Lock, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  UserX
} from 'lucide-react';

export default function AppEntryGuard({ appId, children }) {
  const { navigateTo, bgCard, borderCol, textTitle, textSec } = useDiskHub();
  const [accessState, setAccessState] = useState({
    allowed: true,
    reason: null, // 'NO_LICENSE' | 'NO_PERMISSION' | 'SUSPENDED' | 'IMPLEMENTING'
    plan: 'standard'
  });

  const checkAccess = async () => {
    const sub = subscriptionService.getSubscription();
    const plan = subscriptionService.getPlan();

    // 1. Subscription suspended
    if (sub.status === 'suspended') {
      setAccessState({ allowed: false, reason: 'SUSPENDED', plan });
      return;
    }

    // 2. Company license check
    const hasLicense = subscriptionService.canAccess(appId);
    if (!hasLicense) {
      setAccessState({ allowed: false, reason: 'NO_LICENSE', plan });
      return;
    }

    // 3. App implementing status check
    const appDef = appRegistry[appId];
    if (appDef && appDef.status === 'implementing') {
      setAccessState({ allowed: false, reason: 'IMPLEMENTING', plan });
      return;
    }

    // 4. User access check (RBAC)
    const userAccess = await userAccessService.canUserAccess({ appId });
    if (!userAccess.allowed) {
      setAccessState({ allowed: false, reason: 'NO_PERMISSION', plan });
      return;
    }

    setAccessState({ allowed: true, reason: null, plan });
  };

  useEffect(() => {
    checkAccess();
    const unsub = subscriptionService.subscribe(() => checkAccess());
    return unsub;
  }, [appId]);

  if (accessState.allowed) {
    return <div data-testid="app-entry-guard">{children}</div>;
  }

  const product = products[appId] || {
    name: appRegistry[appId]?.name || 'Módulo DiskHub',
    headline: 'Este módulo faz parte do ecossistema DiskHub Business Cloud.',
    minimumPlan: 'advanced'
  };

  const requiredPlanName = product.minimumPlan === 'expert' ? 'Expert' : 'Advanced';

  // 1. STATE: SUSPENDED
  if (accessState.reason === 'SUSPENDED') {
    return (
      <div data-testid="access-subscription" className="py-12 px-4 flex items-center justify-center animate-fadeIn font-sans">
        <div className={`max-w-lg w-full ${bgCard} border border-rose-500/30 rounded-3xl p-8 text-center shadow-xl space-y-5`}>
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-1">
              Assinatura Temporariamente Suspensa
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-0 leading-relaxed">
              O acesso aos módulos operacionais foi pausado. Regularize sua fatura pendente para restabelecer os serviços imediatamente.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('/assinatura/cobranca')}
            className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold border-0 cursor-pointer shadow-md inline-flex items-center space-x-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Ver Cobrança & Regularizar</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. STATE: IMPLEMENTING
  if (accessState.reason === 'IMPLEMENTING') {
    return (
      <div data-testid="access-implementing" className="py-12 px-4 flex items-center justify-center animate-fadeIn font-sans">
        <div className={`max-w-lg w-full ${bgCard} border ${borderCol} rounded-3xl p-8 text-center shadow-xl space-y-5`}>
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10">
              Módulo em Implantação
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mt-2 mb-1">
              {product.name} está sendo preparado
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-0 leading-relaxed">
              Nossa equipe de engenharia está provisionando os workflows e triggers deste módulo para sua empresa.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <button
              type="button"
              onClick={() => navigateTo('/assinatura')}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 text-xs font-bold border-0 cursor-pointer"
            >
              Acompanhar na Assinatura
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. STATE: USER HAS NO PERMISSION (Company has license, but user role is restricted)
  if (accessState.reason === 'NO_PERMISSION') {
    return (
      <div data-testid="access-no-permission" className="py-12 px-4 flex items-center justify-center animate-fadeIn font-sans">
        <div className={`max-w-lg w-full ${bgCard} border ${borderCol} rounded-3xl p-8 text-center shadow-xl space-y-5`}>
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <UserX className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10">
              Acesso Restrito ao Perfil
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mt-2 mb-1">
              Permissão Insuficiente
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-0 leading-relaxed">
              Sua empresa possui este módulo contratado, mas seu perfil de usuário não tem permissão para acessá-lo.
            </p>
          </div>
          <p className="text-[11px] text-slate-500 mb-0">
            Solicite a liberação deste aplicativo ao administrador ou proprietário da sua conta.
          </p>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold border-0 cursor-pointer"
          >
            Voltar para Tela Anterior
          </button>
        </div>
      </div>
    );
  }

  // 4. STATE: NO LICENSE (Company needs upgrade)
  return (
    <div data-testid="access-no-license" className="py-12 px-4 flex items-center justify-center animate-fadeIn font-sans">
      <div className={`max-w-lg w-full ${bgCard} border ${borderCol} rounded-3xl p-8 text-center shadow-xl space-y-5`}>
        
        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-[#F97316] flex items-center justify-center mx-auto shadow-sm">
          <Lock className="w-8 h-8" />
        </div>

        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 text-[#F97316] text-[10px] font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Disponível no Plano {requiredPlanName}</span>
          </div>

          <h2 className={`text-xl font-black ${textTitle} tracking-tight mb-1.5`}>
            {product.name}
          </h2>
          <p className={`text-xs ${textSec} max-w-md mx-auto leading-relaxed mb-0`}>
            {product.headline}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/50 border border-slate-200 dark:border-white/5 text-left text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-200 font-bold">
            <span className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#F97316]" />
              <span>Seu Plano Atual: {accessState.plan.toUpperCase()}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal">Requer Upgrade</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-0">
            Ao fazer upgrade para o plano <strong>{requiredPlanName}</strong>, este módulo e todos os recursos de expansão serão liberados automaticamente para sua empresa.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo(`/produtos/${appId}`)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold border-0 cursor-pointer transition-all"
          >
            Conhecer Módulo
          </button>

          <button
            type="button"
            onClick={() => navigateTo(`/planos?produto=${appId}&upgrade=true`)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black border-0 cursor-pointer shadow-lg shadow-[#F97316]/25 flex items-center justify-center space-x-2 transition-all"
          >
            <span>Ver Planos & Upgrade</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
