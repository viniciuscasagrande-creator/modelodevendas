import React from 'react';
import { apps } from '../../config/apps';
import { subscriptionService } from '../../services/subscriptionService';
import { useDiskHub } from '../../context/DiskHubContext';
import { 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Sparkles,
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

export default function SubscriptionApps() {
  const { navigateTo } = useDiskHub();

  const appsWithStatus = apps.map(app => ({
    ...app,
    status: subscriptionService.getAppStatus(app.id)
  }));

  const activeApps = appsWithStatus.filter(a => a.status === 'active');
  const otherApps = appsWithStatus.filter(a => a.status !== 'active');

  return (
    <div data-testid="subscription-apps" className="space-y-6 animate-fadeIn font-sans">
      
      {/* 1. SECTION: APLICATIVOS ATIVOS CONTRATADOS */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm space-y-4">
        <div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-0">
              Aplicativos Contratados e Licenciados ({activeApps.length})
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-0">
            Módulos corporativos liberados para uso imediato pela equipe da sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {activeApps.map(app => {
            const IconComp = iconMap[app.icon] || Layers;
            return (
              <div 
                key={app.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 flex flex-col justify-between space-y-3 hover:border-emerald-500 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      Ativo
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {app.category}
                  </span>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1">
                    {app.name}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-0">
                    {app.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigateTo(app.route)}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold border-0 cursor-pointer shadow-xs flex items-center justify-center space-x-1.5 transition-all"
                >
                  <span>Abrir {app.shortName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. SECTION: OUTROS MÓDULOS DISPONÍVEIS OU EM EXPANSÃO */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm space-y-4">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#F97316]" />
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-0">
              Módulos Disponíveis para Contratação ou Upgrade ({otherApps.length})
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-0">
            Expanda os limites da sua operação ativando novas ferramentas digitais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {otherApps.map(app => {
            const IconComp = iconMap[app.icon] || Layers;
            return (
              <div 
                key={app.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 flex flex-col justify-between space-y-3 opacity-90 hover:opacity-100 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-[#F97316] flex items-center justify-center">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-[#F97316]">
                      {app.plan === 'expert' ? 'Plano Expert' : 'Plano Advanced'}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {app.category}
                  </span>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1">
                    {app.name}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-0">
                    {app.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => navigateTo(app.productRoute)}
                    className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold border-0 cursor-pointer transition-all"
                  >
                    Conhecer
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo(`/planos?produto=${app.id}&upgrade=true`)}
                    className="flex-1 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold border-0 cursor-pointer shadow-xs transition-all"
                  >
                    Fazer Upgrade
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
