import React, { useState, useEffect } from 'react';
import { useDiskHub } from '../../context/DiskHubContext';
import { subscriptionService } from '../../services/subscriptionService';
import { plans } from '../../config/plans';
import { products } from '../../config/products';
import { addons } from '../../config/addons';
import { 
  Sparkles, 
  Check, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle, 
  Plus, 
  X, 
  Send,
  Zap,
  Star
} from 'lucide-react';

export default function PlansPage() {
  const { navigateTo, triggerToast, textTitle, textSec } = useDiskHub();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [subscription, setSubscription] = useState(() => subscriptionService.getSubscription());
  const [highlightProduct, setHighlightProduct] = useState(null);
  const [isUpgradeContext, setIsUpgradeContext] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', company: '', email: '', phone: '', plan: 'advanced' });

  useEffect(() => {
    const unsub = subscriptionService.subscribe((sub) => {
      setSubscription(sub);
    });
    return unsub;
  }, []);

  // Parse URL query params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const prod = params.get('produto');
      const up = params.get('upgrade');
      if (prod) setHighlightProduct(prod);
      if (up === 'true') setIsUpgradeContext(true);
    }
  }, []);

  const currentPlanId = subscription.plan || 'standard';

  const handleSelectPlan = (planId) => {
    if (planId === currentPlanId) {
      navigateTo('/assinatura');
      return;
    }
    navigateTo(`/contratacao?plan=${planId}`);
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setShowDemoModal(false);
    triggerToast(
      "Solicitação Enviada",
      `Recebemos seu pedido de demonstração para o plano ${demoForm.plan.toUpperCase()}. Retornaremos em breve!`
    );
  };

  const allModuleKeys = [
    { key: 'crm', name: 'CRM & Vendas' },
    { key: 'erp', name: 'ERP Empresarial' },
    { key: 'financeiro', name: 'Financeiro Avançado' },
    { key: 'marketing', name: 'Marketing Digital' },
    { key: 'sac', name: 'SAC 360º' },
    { key: 'bi', name: 'BI & Analytics' },
    { key: 'contabilidade', name: 'Contabilidade & NF-e' },
    { key: 'automacao', name: 'Automação & Workflows' },
    { key: 'ia', name: 'Disk AI (Copilot)' },
    { key: 'integracoes', name: 'Hub de APIs & Webhooks' }
  ];

  return (
    <div data-testid="plans-page" className="space-y-8 pb-16 animate-fadeIn font-sans max-w-6xl mx-auto">
      
      {/* 1. Contextual Notification Banners */}
      {highlightProduct && (
        <div className="p-4 rounded-2xl bg-orange-50 dark:bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5 text-[#F97316]">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>
              Você está comparando planos para liberar <strong>{products[highlightProduct]?.name || highlightProduct.toUpperCase()}</strong>.
              Este módulo está disponível nos planos <strong>ADVANCED</strong> e <strong>EXPERT</strong>.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setHighlightProduct(null)}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white bg-transparent border-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {isUpgradeContext && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5 text-emerald-700 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              Faça upgrade do seu plano <strong>{currentPlanId.toUpperCase()}</strong> para liberar recursos estratégicos de expansão com ativação automática.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsUpgradeContext(false)}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white bg-transparent border-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Top Header Hero */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 text-[11px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#F97316]" />
          <span>Planos DiskHub Business Cloud</span>
        </div>

        <h1 className={`text-2xl sm:text-4xl font-black ${textTitle} tracking-tight`}>
          Escolha o nível de gestão ideal para sua operação
        </h1>

        <p className={`text-xs sm:text-sm ${textSec} max-w-2xl mx-auto leading-relaxed`}>
          Do essencial à inteligência preditiva, tenha as ferramentas certas para organizar, acelerar vendas e escalar seus eventos.
        </p>

        {/* Current Plan Badge */}
        <div className="pt-1">
          <span data-testid="plan-current-badge" className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-black">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Seu plano atual: {currentPlanId.toUpperCase()}</span>
          </span>
        </div>

        {/* Monthly / Annual Billing Toggle */}
        <div className="pt-3 flex items-center justify-center space-x-2 text-xs">
          <button
            type="button"
            data-testid="billing-monthly"
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 rounded-xl font-bold transition-all border-0 cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'bg-slate-100 dark:bg-[#1E293B] text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Cobrança Mensal
          </button>
          <button
            type="button"
            data-testid="billing-annual"
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-1.5 rounded-xl font-bold transition-all border-0 cursor-pointer ${
              billingCycle === 'annual'
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'bg-slate-100 dark:bg-[#1E293B] text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Cobrança Anual
          </button>
        </div>
      </div>

      {/* 3. TIER CARDS GRID (STANDARD / ADVANCED / EXPERT) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: STANDARD */}
        <div 
          data-testid="plan-standard"
          className={`p-6 rounded-3xl bg-white dark:bg-[#111827] border ${
            currentPlanId === 'standard' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200 dark:border-[#1F2937]'
          } shadow-sm flex flex-col justify-between space-y-6 relative`}
        >
          {currentPlanId === 'standard' && (
            <span className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider">
              Plano Atual
            </span>
          )}

          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                {plans.standard.tagline}
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                {plans.standard.name}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-0">
                {plans.standard.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-2">
              <span className="text-sm font-black text-slate-900 dark:text-white block">
                {plans.standard.pricing.monthly}
              </span>
              <span className="text-[10px] text-slate-400 block">Ativação sob demanda para sua empresa</span>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[10.5px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                O que está incluído:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 p-0 m-0 list-none">
                {plans.standard.includedFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            {currentPlanId === 'standard' ? (
              <button
                type="button"
                data-testid="plan-standard-cta"
                onClick={() => navigateTo('/assinatura')}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-bold border-0 cursor-pointer hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              >
                Gerenciar Assinatura
              </button>
            ) : (
              <button
                type="button"
                data-testid="plan-standard-cta"
                onClick={() => handleSelectPlan('standard')}
                className="w-full py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-bold border-0 cursor-pointer shadow-sm transition-all"
              >
                Escolher Standard
              </button>
            )}
          </div>
        </div>

        {/* CARD 2: ADVANCED (MAIS RECOMENDADO) */}
        <div 
          data-testid="plan-advanced"
          className={`p-6 rounded-3xl bg-white dark:bg-[#111827] border-2 ${
            currentPlanId === 'advanced' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-[#F97316]'
          } shadow-xl shadow-[#F97316]/5 flex flex-col justify-between space-y-6 relative`}
        >
          <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#F97316] text-white text-[9.5px] font-black uppercase tracking-wider flex items-center space-x-1 shadow-xs">
            <Star className="w-3 h-3 fill-white" />
            <span>Mais Recomendado</span>
          </span>

          {currentPlanId === 'advanced' && (
            <span className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider">
              Plano Atual
            </span>
          )}

          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#F97316] block mb-1">
                {plans.advanced.tagline}
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                {plans.advanced.name}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-0">
                {plans.advanced.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-2">
              <span className="text-sm font-black text-slate-900 dark:text-white block">
                {plans.advanced.pricing.monthly}
              </span>
              <span className="text-[10px] text-slate-400 block">Equilíbrio perfeito entre operação, marketing e dados</span>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[10.5px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Tudo do Standard mais:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 p-0 m-0 list-none">
                {plans.advanced.includedFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#F97316] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            {currentPlanId === 'advanced' ? (
              <button
                type="button"
                data-testid="plan-advanced-cta"
                onClick={() => navigateTo('/assinatura')}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-bold border-0 cursor-pointer hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              >
                Gerenciar Assinatura
              </button>
            ) : (
              <button
                type="button"
                data-testid="plan-advanced-cta"
                onClick={() => handleSelectPlan('advanced')}
                className="w-full py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black border-0 cursor-pointer shadow-lg shadow-[#F97316]/25 flex items-center justify-center space-x-2 transition-all"
              >
                <span>{currentPlanId === 'standard' ? 'Fazer Upgrade para Advanced' : 'Escolher Advanced'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* CARD 3: EXPERT */}
        <div 
          data-testid="plan-expert"
          className={`p-6 rounded-3xl bg-white dark:bg-[#111827] border ${
            currentPlanId === 'expert' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-purple-300 dark:border-purple-800'
          } shadow-sm flex flex-col justify-between space-y-6 relative`}
        >
          {currentPlanId === 'expert' && (
            <span className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider">
              Plano Atual
            </span>
          )}

          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-1">
                {plans.expert.tagline}
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                {plans.expert.name}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-0">
                {plans.expert.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-2">
              <span className="text-sm font-black text-slate-900 dark:text-white block">
                {plans.expert.pricing.monthly}
              </span>
              <span className="text-[10px] text-slate-400 block">Camada corporativa com inteligência e escala máxima</span>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[10.5px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Tudo do Advanced mais:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 p-0 m-0 list-none">
                {plans.expert.includedFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            {currentPlanId === 'expert' ? (
              <button
                type="button"
                data-testid="plan-expert-cta"
                onClick={() => navigateTo('/assinatura')}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-bold border-0 cursor-pointer hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              >
                Gerenciar Assinatura
              </button>
            ) : (
              <button
                type="button"
                data-testid="plan-expert-cta"
                onClick={() => handleSelectPlan('expert')}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold border-0 cursor-pointer shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Fazer Upgrade para Expert</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* 4. PLAN COMPARISON MATRIX TABLE */}
      <div data-testid="plan-comparison" className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight mb-0.5">
            Matriz de Recursos & Módulos
          </h3>
          <p className="text-xs text-slate-400 mb-0">
            Compare o que está disponível em cada plano. Clique em qualquer módulo para conhecer detalhes.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 uppercase text-[10px] font-black">
                <th className="py-3 px-2">Módulo / Solução</th>
                <th className="py-3 px-4 text-center">STANDARD</th>
                <th className="py-3 px-4 text-center text-[#F97316]">ADVANCED</th>
                <th className="py-3 px-4 text-center text-purple-500">EXPERT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {allModuleKeys.map(mod => {
                const isStandard = ['crm', 'erp', 'financeiro'].includes(mod.key);
                const isAdvanced = ['crm', 'erp', 'financeiro', 'marketing', 'sac', 'bi'].includes(mod.key);
                const isExpert = true;

                return (
                  <tr key={mod.key} className="hover:bg-slate-50 dark:hover:bg-[#1E293B]/40 transition-colors">
                    <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-200">
                      <button
                        type="button"
                        onClick={() => navigateTo(`/produtos/${mod.key}`)}
                        className="text-left font-bold text-xs text-slate-800 dark:text-slate-200 hover:text-[#F97316] bg-transparent border-0 cursor-pointer p-0"
                      >
                        {mod.name}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {isStandard ? (
                        <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <Minus className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {isAdvanced ? (
                        <Check className="w-4 h-4 text-[#F97316] mx-auto" />
                      ) : (
                        <Minus className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {isExpert ? (
                        <Check className="w-4 h-4 text-purple-500 mx-auto" />
                      ) : (
                        <Minus className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. ADD-ONS SECTION */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm space-y-4">
        <div>
          <div className="flex items-center space-x-2">
            <Plus className="w-4 h-4 text-[#F97316]" />
            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight mb-0">
              Recursos Adicionais & Add-ons
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-0">
            Personalize sua operação com serviços específicos sob medida.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {addons.map(addon => (
            <div key={addon.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-2 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white mb-1">{addon.name}</h4>
                <p className="text-[11px] text-slate-400 leading-snug mb-2">{addon.description}</p>
                <span className="text-[10px] font-bold text-slate-500 block">{addon.includedQuota}</span>
              </div>
              <span className="text-[10.5px] font-black text-[#F97316] pt-2 border-t border-slate-200 dark:border-white/5 block">
                {addon.pricingNote}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. CTA FINAL & DEMO BANNER */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-purple-500/10 border border-[#F97316]/20 text-center space-y-4">
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
          Precisa de uma estrutura personalizada para sua operação?
        </h3>
        <p className="text-xs text-slate-500 max-w-lg mx-auto mb-0">
          Nosso time de engenharia comercial pode estruturar um plano personalizado com limites sob medida e integração dedicada.
        </p>
        <button
          type="button"
          onClick={() => setShowDemoModal(true)}
          className="px-6 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold border-0 cursor-pointer shadow-md transition-all"
        >
          Falar com Especialista Comercial
        </button>
      </div>

      {/* 7. DEMO REQUEST MODAL */}
      {showDemoModal && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDemoModal(false);
          }}
        >
          <div className="max-w-md w-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] rounded-3xl p-6 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white mb-0.5">Solicitar Demonstração dos Planos</h3>
                <p className="text-xs text-slate-400 mb-0">Atendimento consultivo DiskHub</p>
              </div>
              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-white flex items-center justify-center border-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDemoSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                  placeholder="Ex: Vinicius Casagrande"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Empresa / Produtora</label>
                <input
                  type="text"
                  required
                  value={demoForm.company}
                  onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                  placeholder="Ex: Prime Show Eventos"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">E-mail</label>
                  <input
                    type="email"
                    required
                    value={demoForm.email}
                    onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                    placeholder="contato@empresa.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={demoForm.phone}
                    onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                    placeholder="(41) 99999-9999"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Plano de Interesse</label>
                <select
                  value={demoForm.plan}
                  onChange={(e) => setDemoForm({ ...demoForm, plan: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                >
                  <option value="standard">Standard (Organização)</option>
                  <option value="advanced">Advanced (Crescimento & Marketing)</option>
                  <option value="expert">Expert (Automação & IA)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowDemoModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 font-bold border-0 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-black border-0 cursor-pointer shadow-md flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Solicitação</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
