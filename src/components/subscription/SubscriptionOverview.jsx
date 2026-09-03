import React from 'react';
import { plans } from '../../config/plans';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Users, 
  Boxes 
} from 'lucide-react';

export default function SubscriptionOverview({ 
  subscription, 
  usage, 
  onUpgrade, 
  onManageUsers, 
  onTabChange 
}) {
  const planData = plans[subscription.plan] || plans.standard;
  const isSuspended = subscription.status === 'suspended';
  const isCancelled = subscription.status === 'cancelled';

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      
      {/* 1. TOP 5 KPIS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        
        {/* KPI 1: PLANO ATUAL */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Plano Atual
          </span>
          <div className="flex items-center space-x-1.5">
            <h3 data-testid="subscription-plan" className="text-lg font-black text-slate-900 dark:text-white uppercase mb-0">
              {planData.name}
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">{planData.tagline}</span>
        </div>

        {/* KPI 2: STATUS */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Status do Contrato
          </span>
          <div className="flex items-center space-x-1.5">
            <span 
              data-testid="subscription-status" 
              className={`text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                isSuspended 
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400' 
                  : isCancelled
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
              }`}
            >
              {isSuspended ? 'Suspensa' : isCancelled ? 'Cancelada' : 'Ativa'}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">100% regular</span>
        </div>

        {/* KPI 3: PRÓXIMA RENOVAÇÃO */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Próxima Renovação
          </span>
          <div className="flex items-center space-x-1 text-slate-800 dark:text-slate-200">
            <Calendar className="w-4 h-4 text-[#F97316] shrink-0" />
            <span data-testid="subscription-renewal" className="text-sm font-black font-mono">
              15/10/2026
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">Ciclo Mensal</span>
        </div>

        {/* KPI 4: APPS ATIVOS */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Módulos Ativos
          </span>
          <div className="flex items-center space-x-1 text-slate-800 dark:text-slate-200">
            <Boxes className="w-4 h-4 text-purple-500 shrink-0" />
            <span data-testid="subscription-app-count" className="text-lg font-black font-mono">
              {planData.includedModules.length}
            </span>
            <span className="text-xs text-slate-400">aplicativos</span>
          </div>
          <button 
            type="button" 
            onClick={() => onTabChange('apps')}
            className="text-[10px] text-[#F97316] font-bold hover:underline bg-transparent border-0 cursor-pointer p-0 block mt-0.5"
          >
            Ver detalhes
          </button>
        </div>

        {/* KPI 5: USUÁRIOS */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Usuários
          </span>
          <div className="flex items-center space-x-1 text-slate-800 dark:text-slate-200">
            <Users className="w-4 h-4 text-blue-500 shrink-0" />
            <span data-testid="subscription-user-usage" className="text-sm font-black font-mono">
              {usage?.users?.used || 8} / {usage?.users?.limit || 10}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-1.5 mt-1.5 overflow-hidden">
            <div 
              className="bg-[#F97316] h-full rounded-full transition-all"
              style={{ width: `${usage?.users?.percent || 80}%` }}
            ></div>
          </div>
        </div>

      </div>

      {/* 2. MAIN PLAN CARD & UPGRADE OPPORTUNITY */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-[#F97316] text-[10px] font-black uppercase tracking-wider">
              Plano {planData.name}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-400">Contrato sob demanda</span>
          </div>

          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-0">
            {planData.description}
          </h2>

          <p className="text-xs text-slate-500 leading-relaxed mb-0">
            {subscription.plan === 'standard' && 'Sua operação possui CRM, ERP e Financeiro. Faça upgrade para o plano Advanced para liberar campanhas de Marketing, SAC 360º e BI Executivo.'}
            {subscription.plan === 'advanced' && 'Sua operação possui CRM, ERP, Financeiro, Marketing, SAC e BI. Leve sua operação para o nível máximo com o plano Expert (Contabilidade, Automação, IA e APIs).'}
            {subscription.plan === 'expert' && 'Você possui o plano mais completo do ecossistema DiskHub Business Cloud com todos os 10 módulos corporativos liberados.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          {subscription.plan !== 'expert' ? (
            <button
              type="button"
              data-testid="upgrade-button"
              onClick={onUpgrade}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black border-0 cursor-pointer shadow-lg shadow-[#F97316]/25 flex items-center justify-center space-x-2 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{subscription.plan === 'standard' ? 'Upgrade para Advanced' : 'Upgrade para Expert'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onTabChange('addons')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black border-0 cursor-pointer shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Conhecer Add-ons Disponíveis</span>
            </button>
          )}

          <button
            type="button"
            data-testid="manage-users-button"
            onClick={onManageUsers}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold border-0 cursor-pointer transition-all flex items-center justify-center space-x-1.5"
          >
            <Users className="w-4 h-4" />
            <span>Gerenciar Equipe</span>
          </button>
        </div>
      </div>

      {/* 3. USAGE PROGRESS SECTION */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">Consumo de Franquias do Plano</h3>
          <p className="text-xs text-slate-400 mb-0">Monitore o uso em tempo real dos recursos da sua assinatura.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">Licenças de Usuário</span>
              <span className="font-mono font-black text-[#F97316]">{usage?.users?.used} / {usage?.users?.limit}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="bg-[#F97316] h-full rounded-full" style={{ width: `${usage?.users?.percent}%` }}></div>
            </div>
            <span className="text-[10px] text-slate-400 block">{usage?.users?.percent}% da capacidade utilizada</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">Execuções de Automação</span>
              <span className="font-mono font-black text-purple-500">3.250 / 10.000</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: '32.5%' }}></div>
            </div>
            <span className="text-[10px] text-slate-400 block">32,5% do pacote mensal</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">Mensagens WhatsApp API</span>
              <span className="font-mono font-black text-emerald-500">4.820 / 10.000</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '48.2%' }}></div>
            </div>
            <span className="text-[10px] text-slate-400 block">48,2% da franquia mensal</span>
          </div>

        </div>
      </div>

    </div>
  );
}
