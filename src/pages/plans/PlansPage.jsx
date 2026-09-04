import React, { useState, useEffect, useRef } from 'react';
import { useDiskHub } from '../../context/DiskHubContext';
import { subscriptionService } from '../../services/subscriptionService';
import { commercialPlans, planGoals, commercialBenefits, comparisonCategories, commercialFaqs } from '../../config/commercialPlans';
import { products, productList } from '../../config/products';
import { addons } from '../../config/addons';
import { 
  Sparkles, 
  Check, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Plus, 
  X, 
  Send,
  Star,
  ChevronDown,
  ChevronUp,
  Layers,
  TrendingUp,
  Zap,
  BrainCircuit,
  Workflow,
  HelpCircle,
  ExternalLink,
  Target,
  CheckCircle2,
  PhoneCall,
  Clock,
  Compass
} from 'lucide-react';

const benefitIconMap = {
  Layers,
  TrendingUp,
  Zap,
  ShieldCheck,
  BrainCircuit,
  Workflow
};

export default function PlansPage() {
  const { navigateTo, triggerToast, textTitle, textSec, bgCard, borderCol } = useDiskHub();
  const [subscription, setSubscription] = useState(() => subscriptionService.getSubscription());
  const [highlightProduct, setHighlightProduct] = useState(null);
  const [isUpgradeContext, setIsUpgradeContext] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [highlightedPlan, setHighlightedPlan] = useState(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', company: '', email: '', phone: '', plan: 'advanced', notes: '' });
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState({ 0: true });

  const plansGridRef = useRef(null);
  const comparisonRef = useRef(null);
  const goalsRef = useRef(null);

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
      const rec = params.get('recommended');
      if (prod) {
        setHighlightProduct(prod.toLowerCase());
        if (prod.toLowerCase() === 'ia' || prod.toLowerCase() === 'automacao' || prod.toLowerCase() === 'contabilidade') {
          setHighlightedPlan('expert');
        } else if (prod.toLowerCase() === 'marketing' || prod.toLowerCase() === 'sac' || prod.toLowerCase() === 'bi') {
          setHighlightedPlan('advanced');
        }
      }
      if (up === 'true') {
        setIsUpgradeContext(true);
        if (subscription?.plan === 'standard') setHighlightedPlan('advanced');
        if (subscription?.plan === 'advanced') setHighlightedPlan('expert');
      }
      if (rec) {
        setHighlightedPlan(rec.toLowerCase());
      }
    }
  }, [subscription]);

  const currentPlanId = subscription?.plan || 'standard';

  const handleSelectPlan = (planId) => {
    if (planId === currentPlanId) {
      navigateTo('/assinatura');
      return;
    }
    navigateTo(`/contratacao?plan=${planId}`);
  };

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal.id);
    setHighlightedPlan(goal.recommendedPlan);
    if (plansGridRef.current) {
      plansGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    triggerToast("Plano Recomendado", `Com base no seu objetivo, recomendamos o pacote ${goal.planName}.`);
  };

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setShowDemoModal(false);
    triggerToast(
      "Solicitação Enviada",
      `Recebemos seu pedido de demonstração para o plano ${demoForm.plan.toUpperCase()}. Retornaremos em breve!`
    );
  };

  const toggleMobileCategory = (idx) => {
    setMobileCategoryOpen(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div data-testid="plans-page" className="space-y-12 pb-24 animate-fadeIn font-sans max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* 1. Contextual Notification Banners */}
      {highlightProduct && (
        <div className="p-4 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-between gap-3 text-xs animate-fadeIn">
          <div className="flex items-center space-x-2.5 text-[#F97316]">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>
              Você está comparando planos para liberar <strong>{products[highlightProduct]?.name || highlightProduct.toUpperCase()}</strong>.{' '}
              {highlightProduct === 'ia' || highlightProduct === 'automacao' || highlightProduct === 'contabilidade' ? (
                <span>O recurso de IA está disponível no plano <strong>EXPERT</strong>.</span>
              ) : (
                <span>O módulo de Marketing está disponível nos planos <strong>ADVANCED</strong> e <strong>EXPERT</strong>.</span>
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setHighlightProduct(null)}
            className="text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer p-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {isUpgradeContext && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs animate-fadeIn">
          <div className="flex items-center space-x-2.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              Faça upgrade do seu plano <strong>{currentPlanId.toUpperCase()}</strong> para liberar recursos estratégicos de expansão com ativação imediata.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsUpgradeContext(false)}
            className="text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer p-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Top Hero Section */}
      <div data-testid="plans-hero" className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[11px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#F97316]" />
          <span>Pacotes Comerciais DiskHub Business Cloud</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto leading-tight">
          Um DiskHub para cada fase da sua operação
        </h1>

        <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Organize sua empresa, aumente suas vendas e evolua para uma operação integrada, automatizada e orientada por dados.
        </p>

        {/* Current Plan Indicator */}
        <div className="pt-1">
          <span data-testid="plan-current-badge" className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Seu plano atual: {currentPlanId.toUpperCase()}</span>
          </span>
        </div>

        {/* Evolution Progress Bar */}
        <div data-testid="plan-evolution" className="pt-4 max-w-xl mx-auto">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#111625] border border-white/[0.06] text-xs font-bold">
            <div className="flex items-center space-x-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span>STANDARD: <span className="font-normal text-slate-400">Organize</span></span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <div className="flex items-center space-x-1.5 text-[#F97316]">
              <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
              <span>ADVANCED: <span className="font-normal text-orange-400">Cresça</span></span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <div className="flex items-center space-x-1.5 text-purple-400">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              <span>EXPERT: <span className="font-normal text-purple-300">Escale</span></span>
            </div>
          </div>
        </div>

        {/* Hero Quick Navigation CTAs */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3 text-xs">
          <button
            type="button"
            onClick={() => scrollToSection(plansGridRef)}
            className="px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold border-0 cursor-pointer shadow-md shadow-[#F97316]/20 transition-all flex items-center space-x-2"
          >
            <span>Conhecer os pacotes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection(comparisonRef)}
            className="px-5 py-2.5 rounded-xl bg-[#111625] hover:bg-white/10 text-slate-200 font-bold border border-white/10 cursor-pointer transition-all"
          >
            Comparar planos
          </button>
          <button
            type="button"
            onClick={() => scrollToSection(goalsRef)}
            className="px-5 py-2.5 rounded-xl bg-transparent hover:bg-white/5 text-[#F97316] font-bold border border-[#F97316]/30 cursor-pointer transition-all"
          >
            Descobrir meu plano
          </button>
        </div>
      </div>

      {/* 3. Objective Selector ("O que você quer melhorar na sua operação?") */}
      <div ref={goalsRef} data-testid="goal-selector" className="space-y-4 pt-4 border-t border-white/[0.06]">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            O que você quer melhorar na sua operação?
          </h2>
          <p className="text-xs text-slate-400">
            Selecione seu momento e veja a solução recomendada para o seu perfil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {planGoals.map((goal) => {
            const isSelected = selectedGoal === goal.id || highlightedPlan === goal.recommendedPlan;
            return (
              <div
                key={goal.id}
                onClick={() => handleGoalSelect(goal)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#161D33] to-[#111625] border-[#F97316] shadow-lg shadow-[#F97316]/10 ring-1 ring-[#F97316]'
                    : 'bg-[#111625] border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/5">
                      {goal.badge}
                    </span>
                    <span className="text-xs font-bold text-[#F97316] flex items-center space-x-1">
                      <span>Plano {goal.planName}</span>
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white mb-1.5 group-hover:text-[#F97316] transition-colors">
                    {goal.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {goal.description}
                  </p>
                </div>
                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-xl bg-white/5 group-hover:bg-[#F97316] group-hover:text-white text-slate-300 text-xs font-bold border border-white/10 group-hover:border-transparent cursor-pointer transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>{goal.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. The 3 Plan Cards (Standard, Advanced, Expert) */}
      <div ref={plansGridRef} className="space-y-6 pt-4 border-t border-white/[0.06]">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Escolha seu pacote de soluções
          </h2>
          <p className="text-xs text-slate-400">
            Valores sob consulta comercial personalizada conforme a escala e porte da sua operação.
          </p>
        </div>

        <div data-testid="plans-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* CARD 1: STANDARD */}
          <div
            data-testid="plan-standard"
            className={`p-6 rounded-2xl flex flex-col justify-between transition-all relative border ${
              highlightedPlan === 'standard'
                ? 'bg-gradient-to-b from-[#161D33] to-[#111625] border-blue-500 ring-2 ring-blue-500/50 shadow-xl'
                : 'bg-[#111625] border-white/[0.06] hover:border-white/20 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/5">
                  {commercialPlans.standard.badge}
                </span>
                {currentPlanId === 'standard' && (
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Seu Plano
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight mb-1">
                {commercialPlans.standard.name}
              </h3>
              <p className="text-xs font-bold text-[#F97316] mb-2">
                {commercialPlans.standard.tagline}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {commercialPlans.standard.description}
              </p>

              {/* Outcome Promessa */}
              <div className="p-3 rounded-xl bg-white/5 text-[10.5px] font-bold text-slate-300 mb-4 border border-white/5">
                <span>Resultado: </span>
                <span className="text-white">{commercialPlans.standard.outcome}</span>
              </div>

              {/* Price placeholder */}
              <div className="pb-4 mb-4 border-b border-white/[0.06]">
                <span className="text-xs font-semibold text-slate-400 block">Investimento:</span>
                <span className="text-sm font-black text-slate-200">
                  {commercialPlans.standard.pricingNote}
                </span>
              </div>

              {/* Módulos incluídos */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Módulos Inclusos:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">CRM & Vendas</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">ERP Empresarial</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">Financeiro</span>
                </div>
              </div>

              {/* Vantagens */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Principais Vantagens:
                </span>
                <ul className="list-none p-0 m-0 space-y-2 text-xs text-slate-300">
                  {commercialPlans.standard.benefits.map((b, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-white/[0.06] mt-auto">
              <button
                type="button"
                data-testid="plan-standard-cta"
                onClick={() => handleSelectPlan('standard')}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 cursor-pointer transition-all flex items-center justify-center space-x-2"
              >
                <span>{currentPlanId === 'standard' ? commercialPlans.standard.cta.current : commercialPlans.standard.cta.visitor}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CARD 2: ADVANCED (MAIS RECOMENDADO) */}
          <div
            data-testid="plan-advanced"
            className="p-6 rounded-2xl flex flex-col justify-between transition-all relative border-2 border-blue-500/80 ring-1 ring-blue-500/50 bg-gradient-to-b from-[#161D33] to-[#111625] shadow-2xl shadow-blue-500/10"
          >
            {/* Top Featured Ribbon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="px-3.5 py-1 rounded-full bg-[#00D2FF] text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md flex items-center space-x-1">
                <Star className="w-3 h-3 fill-current" />
                <span>MAIS RECOMENDADO</span>
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3 pt-1">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Aceleração Comercial
                </span>
                {currentPlanId === 'advanced' && (
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Seu Plano
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight mb-1">
                {commercialPlans.advanced.name}
              </h3>
              <p className="text-xs font-bold text-blue-400 mb-2">
                {commercialPlans.advanced.tagline}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {commercialPlans.advanced.description}
              </p>

              {/* Outcome Promessa */}
              <div className="p-3 rounded-xl bg-blue-500/10 text-[10.5px] font-bold text-blue-200 mb-4 border border-blue-500/20">
                <span>Resultado: </span>
                <span className="text-blue-400">{commercialPlans.advanced.outcome}</span>
              </div>

              {/* Price placeholder */}
              <div className="pb-4 mb-4 border-b border-white/[0.06]">
                <span className="text-xs font-semibold text-slate-400 block">Investimento:</span>
                <span className="text-sm font-black text-slate-200">
                  {commercialPlans.advanced.pricingNote}
                </span>
              </div>

              {/* Módulos incluídos */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Módulos Inclusos (Tudo do Standard +):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-400 border border-blue-500/20">Marketing Digital</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-400 border border-blue-500/20">SAC 360º</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-400 border border-blue-500/20">BI & Analytics</span>
                </div>
              </div>

              {/* Vantagens */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Principais Vantagens:
                </span>
                <ul className="list-none p-0 m-0 space-y-2 text-xs text-slate-300">
                  {commercialPlans.advanced.benefits.map((b, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-white/[0.06] mt-auto">
              <button
                type="button"
                data-testid="plan-advanced-cta"
                onClick={() => handleSelectPlan('advanced')}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black border-0 cursor-pointer shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
              >
                <span>{currentPlanId === 'advanced' ? commercialPlans.advanced.cta.current : currentPlanId === 'standard' ? commercialPlans.advanced.cta.upgrade : commercialPlans.advanced.cta.visitor}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CARD 3: EXPERT */}
          <div
            data-testid="plan-expert"
            className={`p-6 rounded-2xl flex flex-col justify-between transition-all relative border ${
              highlightedPlan === 'expert'
                ? 'bg-gradient-to-b from-[#161D33] to-[#111625] border-purple-500 ring-2 ring-purple-500/50 shadow-xl'
                : 'bg-[#111625] border-white/[0.06] hover:border-white/20 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  {commercialPlans.expert.badge}
                </span>
                {currentPlanId === 'expert' && (
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Seu Plano
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight mb-1">
                {commercialPlans.expert.name}
              </h3>
              <p className="text-xs font-bold text-purple-400 mb-2">
                {commercialPlans.expert.tagline}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {commercialPlans.expert.description}
              </p>

              {/* Outcome Promessa */}
              <div className="p-3 rounded-xl bg-purple-500/10 text-[10.5px] font-bold text-purple-300 mb-4 border border-purple-500/20">
                <span>Resultado: </span>
                <span className="text-purple-400">{commercialPlans.expert.outcome}</span>
              </div>

              {/* Price placeholder */}
              <div className="pb-4 mb-4 border-b border-white/[0.06]">
                <span className="text-xs font-semibold text-slate-400 block">Investimento:</span>
                <span className="text-sm font-black text-slate-200">
                  {commercialPlans.expert.pricingNote}
                </span>
              </div>

              {/* Módulos incluídos */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Módulos Inclusos (Tudo do Advanced +):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-400 border border-purple-500/20">Automação</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-400 border border-purple-500/20">IA (Copilot)</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-400 border border-purple-500/20">Contabilidade & NF-e</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-400 border border-purple-500/20">Hub de APIs</span>
                </div>
              </div>

              {/* Vantagens */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Principais Vantagens:
                </span>
                <ul className="list-none p-0 m-0 space-y-2 text-xs text-slate-300">
                  {commercialPlans.expert.benefits.map((b, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-white/[0.06] mt-auto flex flex-col gap-2">
              <button
                type="button"
                data-testid="plan-expert-cta"
                onClick={() => handleSelectPlan('expert')}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold border-0 cursor-pointer shadow-md shadow-purple-600/20 transition-all flex items-center justify-center space-x-2"
              >
                <span>{currentPlanId === 'expert' ? commercialPlans.expert.cta.current : commercialPlans.expert.cta.upgrade}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 cursor-pointer transition-all"
              >
                Falar com especialista
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 5. Commercial Benefits ("O que muda na sua operação?") */}
      <div className="space-y-6 pt-4 border-t border-white/[0.06]">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            O que muda na sua operação com o DiskHub?
          </h2>
          <p className="text-xs text-slate-400">
            Muito mais que módulos isolados: um ecossistema projetado para transformar eficiência em lucro.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {commercialBenefits.map((ben) => {
            const Icon = benefitIconMap[ben.icon] || ShieldCheck;
            return (
              <div
                key={ben.id}
                className="p-5 rounded-2xl bg-[#111625] border border-white/[0.06] space-y-2 hover:border-[#F97316]/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-[#F97316] border border-orange-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-white">
                  {ben.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {ben.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Comparison Matrix ("Compare os pacotes") */}
      <div ref={comparisonRef} data-testid="plan-comparison" className="space-y-6 pt-4 border-t border-white/[0.06]">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Compare os pacotes
          </h2>
          <p className="text-xs text-slate-400">
            Veja exatamente quais recursos e capacidades estão incluídos em cada nível.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block rounded-2xl border border-white/[0.06] bg-[#111625] overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#161D33] border-b border-white/[0.06]">
                <th className="py-4 px-5 font-black text-slate-200 w-2/5">Recursos & Soluções</th>
                <th className="py-4 px-4 font-black text-slate-200 text-center w-1/5">Standard</th>
                <th className="py-4 px-4 font-black text-blue-400 text-center w-1/5 bg-blue-500/10">
                  Advanced (Recomendado)
                </th>
                <th className="py-4 px-4 font-black text-purple-400 text-center w-1/5">Expert</th>
              </tr>
            </thead>
            <tbody>
              {comparisonCategories.map((cat, catIdx) => (
                <React.Fragment key={catIdx}>
                  <tr className="bg-[#131b2e] border-t border-white/[0.06]">
                    <td colSpan={4} className="py-2.5 px-5 font-black text-[11px] uppercase tracking-wider text-slate-300">
                      {cat.category}
                    </td>
                  </tr>
                  {cat.items.map((item, itemIdx) => (
                    <tr key={itemIdx} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5">
                        <span className="font-bold text-white block">{item.name}</span>
                        <span className="text-[10px] text-slate-400">{item.desc}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {item.standard ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <Minus className="w-4 h-4 text-slate-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-center bg-blue-500/[0.04]">
                        {item.advanced ? (
                          <Check className="w-4 h-4 text-blue-400 font-bold mx-auto" />
                        ) : (
                          <Minus className="w-4 h-4 text-slate-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {item.expert ? (
                          <Check className="w-4 h-4 text-purple-400 font-bold mx-auto" />
                        ) : (
                          <Minus className="w-4 h-4 text-slate-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Accordion */}
        <div data-testid="plan-comparison-mobile" className="md:hidden space-y-3">
          {comparisonCategories.map((cat, catIdx) => {
            const isOpen = mobileCategoryOpen[catIdx] !== false;
            return (
              <div key={catIdx} className="rounded-2xl border border-white/[0.06] bg-[#111625] overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleMobileCategory(catIdx)}
                  className="w-full p-4 text-left flex items-center justify-between font-black text-xs text-white bg-transparent border-0 cursor-pointer hover:bg-white/[0.02]"
                >
                  <span>{cat.category}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 border-t border-white/[0.06] space-y-3 text-xs">
                    {cat.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="pt-2 border-b border-white/[0.04] last:border-0 pb-2">
                        <span className="font-bold text-white block">{item.name}</span>
                        <span className="text-[10.5px] text-slate-400 block mb-2">{item.desc}</span>
                        <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
                          <div className={`p-1.5 rounded-lg border ${item.standard ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-slate-500 border-white/5'}`}>
                            Standard: {item.standard ? '✓' : '—'}
                          </div>
                          <div className={`p-1.5 rounded-lg border ${item.advanced ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' : 'bg-white/5 text-slate-500 border-white/5'}`}>
                            Advanced: {item.advanced ? '✓' : '—'}
                          </div>
                          <div className={`p-1.5 rounded-lg border ${item.expert ? 'bg-purple-500/15 text-purple-400 border-purple-500/30' : 'bg-white/5 text-slate-500 border-white/5'}`}>
                            Expert: {item.expert ? '✓' : '—'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Modules / Solutions Catalog */}
      <div data-testid="modules-by-plan" className="space-y-6 pt-4 border-t border-white/[0.06]">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Soluções que fazem parte do DiskHub
          </h2>
          <p className="text-xs text-slate-400">
            Conheça os detalhes de cada módulo e acesse a página individual de demonstração.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productList.map((prod) => (
            <div
              key={prod.id}
              className="p-5 rounded-2xl bg-[#111625] border border-white/[0.06] flex flex-col justify-between hover:border-white/20 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className={`text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    prod.minimumPlan === 'standard'
                      ? 'bg-white/5 text-slate-300 border border-white/5'
                      : prod.minimumPlan === 'advanced'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  }`}>
                    {prod.minimumPlan === 'standard' ? 'Incluído em todos' : `A partir do ${prod.minimumPlan.toUpperCase()}`}
                  </span>
                </div>
                <h3 className="text-sm font-black text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {prod.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {prod.tagline || prod.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigateTo(`/produtos/${prod.id}`)}
                className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-blue-600 hover:text-white text-slate-300 text-xs font-bold border border-white/10 hover:border-transparent cursor-pointer transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Conhecer solução</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Add-ons Section ("Personalize seu DiskHub") */}
      <div data-testid="addons-section" className="space-y-6 pt-4 border-t border-white/[0.06]">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Personalize seu DiskHub
          </h2>
          <p className="text-xs text-slate-400">
            Adicione capacidade operacional e serviços conforme sua operação crescer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {addons.map((add) => (
            <div
              key={add.id}
              className="p-5 rounded-2xl bg-[#111625] border border-white/[0.06] flex flex-col justify-between hover:border-white/20"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {add.type === 'one-time' ? 'Serviço Único' : 'Assinatura Recorrente'}
                  </span>
                  <span className="text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5">
                    {add.includedQuota}
                  </span>
                </div>
                <h3 className="text-sm font-black text-white mb-1">
                  {add.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {add.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-400">
                  {add.pricingNote}
                </span>
                <button
                  type="button"
                  onClick={() => setShowDemoModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold border border-white/10 cursor-pointer transition-all"
                >
                  Consultar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. Commercial FAQ */}
      <div data-testid="plans-faq" className="space-y-6 pt-4 border-t border-white/[0.06] max-w-4xl mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-xs text-slate-400">
            Tire suas dúvidas sobre pacotes, migração e contratação.
          </p>
        </div>

        <div className="space-y-3">
          {commercialFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="rounded-2xl border border-white/[0.06] bg-[#111625] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between font-bold text-xs text-white bg-transparent border-0 cursor-pointer hover:bg-white/[0.02]"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <Minus className="w-4 h-4 text-[#F97316]" /> : <Plus className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 border-t border-white/[0.06] text-xs text-slate-400 leading-relaxed animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 10. Final CTA Banner */}
      <div data-testid="plans-final-cta" className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/30 via-indigo-900/40 to-purple-900/30 border border-blue-500/30 text-center space-y-4 shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Sua operação pode ir mais longe
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Escolha a estrutura que acompanha o momento do seu negócio e evolua conforme sua operação cresce.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => scrollToSection(plansGridRef)}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold border-0 cursor-pointer shadow-lg shadow-blue-600/25 transition-all flex items-center space-x-2"
          >
            <span>Escolher meu plano</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowDemoModal(true)}
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 cursor-pointer transition-all"
          >
            Solicitar demonstração
          </button>
        </div>
      </div>

      {/* 11. Modal: Solicitação de Demonstração */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#111625] border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <h3 className="text-base font-black text-white mb-0.5">
                  Solicitar Demonstração Comercial
                </h3>
                <span className="text-[11px] text-slate-400">
                  Nossos especialistas apresentarão o DiskHub para a sua equipe.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDemoSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: João da Silva"
                  value={demoForm.name}
                  onChange={(e) => setDemoForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-[#0D111D] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Empresa / Produtora</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Prime Eventos Ltda"
                  value={demoForm.company}
                  onChange={(e) => setDemoForm(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-[#0D111D] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">E-mail Corporativo</label>
                  <input
                    type="email"
                    required
                    placeholder="joao@empresa.com"
                    value={demoForm.email}
                    onChange={(e) => setDemoForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D111D] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">WhatsApp / Telefone</label>
                  <input
                    type="tel"
                    required
                    placeholder="(41) 99999-9999"
                    value={demoForm.phone}
                    onChange={(e) => setDemoForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D111D] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Plano de Interesse</label>
                <select
                  value={demoForm.plan}
                  onChange={(e) => setDemoForm(prev => ({ ...prev, plan: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-[#0D111D] border border-white/10 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="standard">Standard (Organizar Operação)</option>
                  <option value="advanced">Advanced (Vender Mais & Inteligência)</option>
                  <option value="expert">Expert (Automatizar & Escala Completa)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowDemoModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold border border-white/10 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold border-0 cursor-pointer shadow-md shadow-blue-600/20 transition-all flex items-center space-x-1.5"
                >
                  <span>Enviar Solicitação</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
