import React, { useState, useEffect } from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { subscriptionService } from '../services/subscriptionService';
import { apiService } from '../services/apiService';
// Subcomponents
import SubscriptionOverview from '../components/subscription/SubscriptionOverview';
import SubscriptionApps from '../components/subscription/SubscriptionApps';
import SubscriptionAddons from '../components/subscription/SubscriptionAddons';
import InvoiceList from '../components/subscription/InvoiceList';
import SubscriptionTimeline from '../components/subscription/SubscriptionTimeline';
import AccountOwnerCard from '../components/subscription/AccountOwnerCard';
import DowngradeImpactModal from '../components/subscription/DowngradeImpactModal';
import CancelSubscriptionModal from '../components/subscription/CancelSubscriptionModal';
import UsersManagementPage from './subscription/UsersManagementPage';

import { 
  CreditCard, 
  Sparkles, 
  Boxes, 
  Users, 
  History, 
  Building2, 
  AlertTriangle,
  RotateCcw,
  ShieldAlert
} from 'lucide-react';

export default function SubscriptionPage() {
  const { navigateTo, setAppsOpen, triggerToast, textTitle, textSec } = useDiskHub();

  const [activeTab, setActiveTab] = useState('visao_geral');
  const [subscription, setSubscription] = useState(() => subscriptionService.getSubscription());
  const [usage, setUsage] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [events, setEvents] = useState([]);

  // Modals
  const [showDowngradeModal, setShowDowngradeModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Sync with URL route subpaths
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('/usuarios')) setActiveTab('usuarios');
      else if (path.includes('/apps')) setActiveTab('apps');
      else if (path.includes('/addons')) setActiveTab('addons');
      else if (path.includes('/cobranca') || path.includes('/faturas')) setActiveTab('cobranca');
      else if (path.includes('/historico')) setActiveTab('historico');
      else if (path.includes('/empresa') || path.includes('/configuracoes')) setActiveTab('empresa');
    }
  }, []);

  const loadData = async () => {
    const sub = subscriptionService.getSubscription();
    setSubscription(sub);
    const u = await apiService.getUsage();
    setUsage(u);
    const inv = await apiService.getInvoices();
    setInvoices(inv);
    const ev = await apiService.getEvents();
    setEvents(ev);
  };

  useEffect(() => {
    loadData();
    const unsub = subscriptionService.subscribe(() => {
      loadData();
    });
    return unsub;
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      const subpath = tabId === 'visao_geral' ? '/assinatura' : `/assinatura/${tabId}`;
      window.history.pushState({}, '', subpath);
    }
  };

  const handleUpgrade = () => {
    navigateTo('/planos?upgrade=true');
  };

  const handleResetDemo = () => {
    subscriptionService.resetToDefault();
    loadData();
    triggerToast("Assinatura Reiniciada", "Simulação restaurada para o plano Standard.");
  };

  const handleConfirmDowngrade = async (targetPlan, reason) => {
    setShowDowngradeModal(false);
    await apiService.requestPlanChange(targetPlan, reason);
    await loadData();
    triggerToast("Downgrade Agendado", `A alteração para o plano ${targetPlan.toUpperCase()} foi agendada para a próxima renovação.`);
  };

  const handleConfirmCancel = async (reason) => {
    setShowCancelModal(false);
    await apiService.cancelSubscription(reason);
    await loadData();
    triggerToast("Assinatura Cancelada", "A renovação automática foi cancelada. Seu acesso permanecerá ativo até o fim do ciclo pago.");
  };

  const isSuspended = subscription.status === 'suspended';
  const isPastDue = subscription.status === 'past_due';

  // Empty state if no subscription
  if (!subscription || subscription.status === 'none') {
    return (
      <div className="py-16 px-4 text-center max-w-lg mx-auto animate-fadeIn font-sans">
        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-[#F97316] flex items-center justify-center mx-auto mb-4">
          <Boxes className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">
          Você ainda não possui uma assinatura DiskHub
        </h2>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Escolha o nível de gestão ideal para sua operação e comece a utilizar os módulos comerciais e operacionais.
        </p>
        <div className="flex items-center justify-center space-x-3">
          <button
            type="button"
            onClick={() => navigateTo('/planos')}
            className="px-5 py-2.5 rounded-xl bg-[#F97316] text-white text-xs font-black border-0 cursor-pointer shadow-md"
          >
            Conhecer Planos
          </button>
          <button
            type="button"
            onClick={() => {
              navigateTo('/dashboard');
              setAppsOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 text-xs font-bold border-0 cursor-pointer"
          >
            Explorar Aplicativos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="subscription-page" className="space-y-6 pb-16 animate-fadeIn font-sans max-w-6xl mx-auto">
      
      {/* 1. SUSPENSION OR PAST DUE BANNERS */}
      {isSuspended && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-rose-700 dark:text-rose-400 font-bold">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>Sua assinatura está temporariamente suspensa. Alguns aplicativos estão indisponíveis.</span>
          </div>
          <button
            type="button"
            onClick={() => handleTabChange('cobranca')}
            className="px-4 py-1.5 rounded-xl bg-rose-600 text-white font-black border-0 cursor-pointer text-xs shrink-0"
          >
            Regularizar Assinatura
          </button>
        </div>
      )}

      {isPastDue && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-bold">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>Existe uma cobrança pendente na sua assinatura. Regularize o pagamento para evitar interrupções.</span>
          </div>
          <button
            type="button"
            onClick={() => handleTabChange('cobranca')}
            className="px-4 py-1.5 rounded-xl bg-amber-600 text-white font-black border-0 cursor-pointer text-xs shrink-0"
          >
            Ver Cobrança
          </button>
        </div>
      )}

      {/* 2. TOP HEADER STRIP */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-500/10 text-[#F97316] flex items-center justify-center shrink-0 shadow-xs">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className={`text-xl font-black ${textTitle} tracking-tight mb-0`}>
                Minha Assinatura & Contrato
              </h1>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-[#F97316]">
                Plano {subscription.plan.toUpperCase()}
              </span>
            </div>
            <p className={`text-xs ${textSec} mb-0`}>
              Gestão comercial, licenças de módulos, usuários autorizados e faturamento.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleResetDemo}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs font-bold border-0 cursor-pointer transition-all flex items-center space-x-1"
            title="Restaurar simulação de teste"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('/planos')}
            className="px-4 py-2 rounded-xl bg-slate-800 dark:bg-white/10 hover:bg-slate-900 text-white text-xs font-bold border-0 cursor-pointer transition-all"
          >
            Comparar Planos
          </button>

          {subscription.plan !== 'expert' && (
            <button
              type="button"
              data-testid="upgrade-button"
              onClick={handleUpgrade}
              className="px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black border-0 cursor-pointer shadow-md shadow-[#F97316]/25 flex items-center space-x-1.5 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Fazer Upgrade</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. TABS NAVIGATION BAR */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-white/10 pb-1 text-xs overflow-x-auto">
        {[
          { id: 'visao_geral', label: 'Visão Geral', icon: CreditCard },
          { id: 'apps', label: 'Aplicativos Contratados', icon: Boxes },
          { id: 'addons', label: 'Add-ons', icon: Sparkles },
          { id: 'usuarios', label: 'Usuários & Permissões', icon: Users },
          { id: 'cobranca', label: 'Cobrança & Faturas', icon: CreditCard },
          { id: 'historico', label: 'Histórico', icon: History },
          { id: 'empresa', label: 'Dados da Conta', icon: Building2 }
        ].map(t => {
          const IconComponent = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => handleTabChange(t.id)}
              className={`px-4 py-2 rounded-xl font-bold border-0 cursor-pointer transition-all flex items-center space-x-1.5 shrink-0 ${
                isActive
                  ? 'bg-[#F97316] text-white shadow-xs'
                  : 'bg-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. TAB CONTENTS */}
      {activeTab === 'visao_geral' && (
        <SubscriptionOverview
          subscription={subscription}
          usage={usage}
          onUpgrade={handleUpgrade}
          onManageUsers={() => handleTabChange('usuarios')}
          onTabChange={handleTabChange}
        />
      )}

      {activeTab === 'apps' && (
        <SubscriptionApps />
      )}

      {activeTab === 'addons' && (
        <SubscriptionAddons subscription={subscription} />
      )}

      {activeTab === 'usuarios' && (
        <UsersManagementPage onUpgrade={handleUpgrade} />
      )}

      {activeTab === 'cobranca' && (
        <InvoiceList
          invoices={invoices}
          subscription={subscription}
        />
      )}

      {activeTab === 'historico' && (
        <SubscriptionTimeline events={events} />
      )}

      {activeTab === 'empresa' && (
        <AccountOwnerCard
          subscription={subscription}
          onOpenCancelModal={() => setShowCancelModal(true)}
        />
      )}

      {/* 5. MODALS */}
      {showDowngradeModal && (
        <DowngradeImpactModal
          currentPlan={subscription.plan}
          targetPlan="standard"
          onClose={() => setShowDowngradeModal(false)}
          onConfirm={handleConfirmDowngrade}
        />
      )}

      {showCancelModal && (
        <CancelSubscriptionModal
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleConfirmCancel}
        />
      )}

    </div>
  );
}
