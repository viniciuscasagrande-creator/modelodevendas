import React from 'react';
import { addons } from '../../config/addons';
import { useDiskHub } from '../../context/DiskHubContext';
import { Plus, ArrowRight } from 'lucide-react';

export default function SubscriptionAddons({ subscription }) {
  const { navigateTo } = useDiskHub();
  const activeAddonIds = subscription.addons || [];

  const contractedAddons = addons.filter(a => activeAddonIds.includes(a.id));
  const availableAddonsList = addons.filter(a => !activeAddonIds.includes(a.id));

  return (
    <div data-testid="subscription-addons" className="space-y-6 animate-fadeIn font-sans">
      
      {/* 1. ADD-ONS CONTRATADOS */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white mb-0.5">
            Add-ons Contratados ({contractedAddons.length})
          </h3>
          <p className="text-xs text-slate-400 mb-0">
            Recursos adicionais ativos e integrados à franquia do seu plano.
          </p>
        </div>

        {contractedAddons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contractedAddons.map(addon => (
              <div key={addon.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs text-slate-900 dark:text-white">{addon.name}</span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
                    Ativo
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-0">{addon.description}</p>
                <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Franquia: {addon.includedQuota}</span>
                  <span className="font-bold text-[#F97316]">Cobrança Recorrente</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center bg-slate-50 dark:bg-[#1E293B]/20 rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
            <p className="text-xs text-slate-400 mb-0">Nenhum add-on contratado no momento.</p>
          </div>
        )}
      </div>

      {/* 2. EXPANDA SUA ASSINATURA */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm space-y-4">
        <div>
          <div className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-[#F97316]" />
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-0">
              Expanda sua Assinatura (Add-ons Disponíveis)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-0">
            Personalize sua operação com serviços específicos sob medida.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {availableAddonsList.map(addon => (
            <div key={addon.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-3 flex flex-col justify-between">
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white block mb-1">{addon.name}</span>
                <p className="text-[11px] text-slate-400 leading-snug mb-2">{addon.description}</p>
                <span className="text-[10px] font-bold text-slate-500 block">{addon.includedQuota}</span>
              </div>
              
              <button
                type="button"
                onClick={() => navigateTo(`/contratacao?addon=${addon.id}`)}
                className="w-full py-2 px-3 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-[#F97316] hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold border-0 cursor-pointer transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Adicionar ao Plano</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
