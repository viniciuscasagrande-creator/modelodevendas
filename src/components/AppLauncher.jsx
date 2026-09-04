import React, { useState, useEffect, useRef } from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { subscriptionService } from '../services/subscriptionService';
import { apps } from '../config/apps';
import { 
  X, 
  Search, 
  Users, 
  Boxes, 
  WalletCards, 
  Megaphone, 
  Headphones, 
  BarChart3, 
  Calculator, 
  Workflow, 
  BrainCircuit, 
  Plug,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Layers
} from 'lucide-react';

const iconMap = {
  Users,
  Boxes,
  WalletCards,
  Megaphone,
  Headphones,
  BarChart3,
  Calculator,
  Workflow,
  BrainCircuit,
  Plug
};

export default function AppLauncher() {
  const { appsOpen, setAppsOpen, navigateTo } = useDiskHub();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'active' | 'available' | 'upgrade'
  const [subscription, setSubscription] = useState(() => subscriptionService.getSubscription());
  const modalRef = useRef(null);

  useEffect(() => {
    const unsub = subscriptionService.subscribe((sub) => {
      setSubscription(sub);
    });
    return unsub;
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && appsOpen) {
        setAppsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appsOpen, setAppsOpen]);

  // Lock body scroll while open
  useEffect(() => {
    if (appsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [appsOpen]);

  if (!appsOpen) return null;

  // Compute status per app
  const appsWithStatus = apps.map(app => {
    const status = subscriptionService.getAppStatus(app.id);
    return {
      ...app,
      status
    };
  });

  // Filter apps
  const filteredApps = appsWithStatus.filter(app => {
    const term = search.toLowerCase();
    const matchSearch = app.name.toLowerCase().includes(term) ||
                        app.description.toLowerCase().includes(term) ||
                        app.category.toLowerCase().includes(term);

    if (!matchSearch) return false;

    if (activeFilter === 'active') return app.status === 'active';
    if (activeFilter === 'available') return app.status === 'available';
    if (activeFilter === 'upgrade') return app.status === 'upgrade';
    return true;
  });

  const myApps = filteredApps.filter(a => a.status === 'active' || a.status === 'trial' || a.status === 'implementing');
  const marketplaceApps = filteredApps.filter(a => a.status === 'available' || a.status === 'upgrade' || a.status === 'coming-soon');

  const handleAppAction = (app) => {
    setAppsOpen(false);
    if (app.status === 'active') {
      navigateTo(app.route);
    } else {
      navigateTo(app.productRoute || `/produtos/${app.id}`);
    }
  };

  const renderCard = (app) => {
    const IconComponent = iconMap[app.icon] || Layers;

    return (
      <div
        key={app.id}
        data-testid={app.testId}
        onClick={() => handleAppAction(app)}
        className="p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50/70 dark:bg-[#1E293B]/40 hover:bg-white dark:hover:bg-[#1E293B] hover:border-[#F97316] hover:shadow-lg transition-all flex flex-col justify-between group text-left relative cursor-pointer"
      >
        {app.aliasTestId && (
          <span data-testid={app.aliasTestId} className="sr-only" aria-hidden="true" />
        )}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105 ${
              app.status === 'active' 
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                : 'bg-orange-500/10 text-[#F97316]'
            }`}>
              <IconComponent className="w-5 h-5" />
            </div>

            {/* Status Badge */}
            {app.status === 'active' && (
              <span data-testid={`${app.testId}-status`} className="text-[9.5px] font-black px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Ativo
              </span>
            )}
            {app.status === 'available' && (
              <span data-testid={`${app.testId}-status`} className="text-[9.5px] font-black px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Disponível
              </span>
            )}
            {app.status === 'upgrade' && (
              <span data-testid={`${app.testId}-status`} className="text-[9.5px] font-black px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-[#F97316] uppercase tracking-wider">
                {app.plan === 'expert' ? 'Expert' : 'Advanced'}
              </span>
            )}
            {app.status === 'implementing' && (
              <span data-testid={`${app.testId}-status`} className="text-[9.5px] font-black px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Em implantação
              </span>
            )}
          </div>

          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
            {app.category}
          </span>
          <h3 className="text-sm font-black text-slate-900 dark:text-white mb-1 group-hover:text-[#F97316] transition-colors">
            {app.name}
          </h3>
          <p className="text-[11px] text-slate-400 leading-snug line-clamp-2 mb-0">
            {app.description}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between">
          {app.status === 'active' ? (
            <button
              type="button"
              onClick={() => handleAppAction(app)}
              className="w-full py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold border-0 cursor-pointer shadow-xs flex items-center justify-center space-x-1.5 transition-all"
            >
              <span>Abrir Módulo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : app.status === 'upgrade' ? (
            <button
              type="button"
              onClick={() => handleAppAction(app)}
              className="w-full py-1.5 px-3 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold border-0 cursor-pointer shadow-xs flex items-center justify-center space-x-1.5 transition-all"
            >
              <span>Ver Upgrade</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleAppAction(app)}
              className="w-full py-1.5 px-3 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-[#F97316] hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold border-0 cursor-pointer transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Conhecer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Central de Aplicativos DiskHub Business Cloud"
      onClick={(e) => {
        if (e.target === e.currentTarget) setAppsOpen(false);
      }}
    >
      <div 
        ref={modalRef}
        data-testid="app-launcher"
        className="w-full max-w-5xl max-h-[88vh] flex flex-col bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] rounded-3xl shadow-2xl overflow-hidden animate-scaleUp font-sans"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-[#F97316] flex items-center justify-center shadow-xs">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-0">
                  DiskHub Business Cloud
                </h2>
                <span data-testid="current-plan" className="text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-[#F97316]">
                  Plano {subscription.plan.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-0">
                Seu hub empresarial de soluções e módulos digitais para produtores
              </p>
            </div>
          </div>

          <button 
            type="button"
            onClick={() => setAppsOpen(false)}
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#1E293B] text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center border-0 cursor-pointer transition-colors"
            title="Fechar (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="px-5 pt-4 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              data-testid="app-search"
              placeholder="Buscar aplicativo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#F97316]"
            />
          </div>

          <div className="flex items-center space-x-1.5 text-xs overflow-x-auto">
            <button
              type="button"
              data-testid="app-filter-all"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold border-0 cursor-pointer transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#F97316] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#1E293B] text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              type="button"
              data-testid="app-filter-active"
              onClick={() => setActiveFilter('active')}
              className={`px-3 py-1.5 rounded-xl font-bold border-0 cursor-pointer transition-all ${
                activeFilter === 'active'
                  ? 'bg-[#F97316] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#1E293B] text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Meus Apps ({myApps.length})
            </button>
            <button
              type="button"
              data-testid="app-filter-available"
              onClick={() => setActiveFilter('available')}
              className={`px-3 py-1.5 rounded-xl font-bold border-0 cursor-pointer transition-all ${
                activeFilter === 'available'
                  ? 'bg-[#F97316] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#1E293B] text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Disponíveis
            </button>
            <button
              type="button"
              data-testid="app-filter-upgrade"
              onClick={() => setActiveFilter('upgrade')}
              className={`px-3 py-1.5 rounded-xl font-bold border-0 cursor-pointer transition-all ${
                activeFilter === 'upgrade'
                  ? 'bg-[#F97316] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#1E293B] text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Upgrade
            </button>
          </div>
        </div>

        {/* Content Scroll Area */}
        <div className="p-5 overflow-y-auto max-h-[calc(88vh-200px)] space-y-6">
          
          {/* SECTION 1: MEUS APPS */}
          {(activeFilter === 'all' || activeFilter === 'active') && myApps.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-0">
                  Meus Aplicativos Liberados
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {myApps.map(renderCard)}
              </div>
            </div>
          )}

          {/* SECTION 2: EXPANDA SUA OPERAÇÃO (MARKETPLACE) */}
          {(activeFilter === 'all' || activeFilter === 'available' || activeFilter === 'upgrade') && marketplaceApps.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#F97316]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-0">
                  Expanda sua Operação (Marketplace)
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {marketplaceApps.map(renderCard)}
              </div>
            </div>
          )}

          {filteredApps.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs font-semibold">Nenhum aplicativo encontrado para "{search}".</p>
            </div>
          )}

        </div>

        {/* Bottom Banner: Planos & Assinatura */}
        <div className="px-5 py-3.5 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#111827] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
            <Sparkles className="w-4 h-4 text-[#F97316]" />
            <span>Quer liberar mais ferramentas? Conheça os planos <strong>DiskHub Business Cloud</strong>.</span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setAppsOpen(false);
                navigateTo('/planos');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs border-0 cursor-pointer shadow-xs transition-all"
            >
              Comparar Planos
            </button>
            <button
              type="button"
              onClick={() => {
                setAppsOpen(false);
                navigateTo('/assinatura');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 font-bold text-xs border-0 cursor-pointer transition-all flex items-center space-x-1"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Minha Assinatura</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
