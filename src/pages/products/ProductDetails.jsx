import React, { useState } from 'react';
import { useDiskHub } from '../../context/DiskHubContext';
import { subscriptionService } from '../../services/subscriptionService';
import { products } from '../../config/products';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  HelpCircle, 
  X, 
  Send,
  Zap,
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
  TrendingUp,
  CreditCard,
  UserCheck,
  History,
  Target,
  Truck,
  FileText,
  PieChart,
  ShoppingCart,
  Clock,
  RotateCcw,
  Star,
  MapPin,
  Activity,
  FileCheck,
  Percent,
  BookOpen,
  Archive,
  GitBranch,
  Webhook,
  ShieldAlert,
  MessageCircle,
  Smile,
  Key,
  ListFilter,
  Terminal,
  Code,
  Tag,
  Filter,
  Inbox,
  Layout
} from 'lucide-react';

const iconLookup = {
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
  TrendingUp,
  CreditCard,
  UserCheck,
  History,
  Target,
  Truck,
  FileText,
  PieChart,
  ShoppingCart,
  Clock,
  RotateCcw,
  Star,
  MapPin,
  Activity,
  FileCheck,
  Percent,
  BookOpen,
  Archive,
  GitBranch,
  Webhook,
  ShieldAlert,
  MessageCircle,
  Smile,
  Key,
  ListFilter,
  Terminal,
  Code,
  Tag,
  Filter,
  Inbox,
  Layout
};

export default function ProductDetails({ productId }) {
  const { navigateTo, setAppsOpen, triggerToast, textTitle, textSec } = useDiskHub();
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });

  // Fallback if productId not provided directly
  let currentId = productId;
  if (!currentId && typeof window !== 'undefined') {
    const parts = window.location.pathname.split('/');
    currentId = parts[parts.length - 1] || 'crm';
  }

  const product = products[currentId];

  if (!product) {
    return (
      <div className="py-16 px-4 text-center max-w-lg mx-auto animate-fadeIn font-sans">
        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-[#F97316] flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Produto não encontrado</h2>
        <p className="text-xs text-slate-400 mb-6">O módulo solicitado não está disponível no catálogo de soluções.</p>
        <button
          type="button"
          onClick={() => {
            setAppsOpen(true);
            navigateTo('/dashboard');
          }}
          className="px-6 py-2.5 rounded-xl bg-[#F97316] text-white text-xs font-bold border-0 cursor-pointer shadow-md"
        >
          Voltar para Central de Apps
        </button>
      </div>
    );
  }

  const status = subscriptionService.getAppStatus(product.id);
  const IconComponent = iconLookup[product.icon] || Layers;

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setShowDemoModal(false);
    triggerToast(
      "Demonstração Solicitada",
      `Recebemos seu pedido para o módulo ${product.name}. Nossa equipe comercial entrará em contato em até 2 horas úteis!`
    );
  };

  return (
    <div data-testid="product-page" className={`space-y-6 pb-16 animate-fadeIn font-sans product-${product.id}`}>
      
      {/* 1. Breadcrumb & Back button */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            navigateTo('/dashboard');
            setAppsOpen(true);
          }}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-[#F97316] bg-transparent border-0 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Central de Apps</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Central de Apps</span>
          <span>&gt;</span>
          <span className="font-bold text-slate-700 dark:text-slate-200">{product.name}</span>
        </div>
      </div>

      {/* 2. PRODUCT HERO SECTION */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-[#F97316] flex items-center justify-center shrink-0 shadow-sm">
                <IconComponent className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-widest block">
                  {product.category}
                </span>
                <h1 data-testid="product-name" className={`text-2xl md:text-3xl font-black ${textTitle} tracking-tight mb-0`}>
                  {product.name}
                </h1>
              </div>
            </div>

            <p className="text-base md:text-lg font-bold text-slate-700 dark:text-slate-200 leading-snug">
              {product.headline}
            </p>

            <p className={`text-xs md:text-sm ${textSec} leading-relaxed`}>
              {product.description}
            </p>

            {/* CTAs according to product status */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {status === 'active' ? (
                <button
                  type="button"
                  data-testid="product-primary-cta"
                  onClick={() => navigateTo(product.route)}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black border-0 cursor-pointer shadow-lg shadow-emerald-600/25 flex items-center space-x-2 transition-all"
                >
                  <span>Abrir {product.shortName}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : status === 'upgrade' ? (
                <button
                  type="button"
                  data-testid="product-primary-cta"
                  onClick={() => navigateTo(`/planos?produto=${product.id}&upgrade=true`)}
                  className="px-6 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black border-0 cursor-pointer shadow-lg shadow-[#F97316]/25 flex items-center space-x-2 transition-all"
                >
                  <span>Fazer Upgrade para {product.minimumPlan.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  data-testid="product-primary-cta"
                  onClick={() => navigateTo(`/planos?produto=${product.id}`)}
                  className="px-6 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black border-0 cursor-pointer shadow-lg shadow-[#F97316]/25 flex items-center space-x-2 transition-all"
                >
                  <span>Contratar {product.shortName}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                data-testid="product-demo-cta"
                onClick={() => setShowDemoModal(true)}
                className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border-0 cursor-pointer transition-all"
              >
                Solicitar Demonstração
              </button>
            </div>
          </div>

          {/* Right Card: Plan Badge & Status Details */}
          <div className="w-full lg:w-72 p-5 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/60 border border-slate-200 dark:border-white/5 space-y-3.5 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Plano Mínimo</span>
              <span data-testid="product-plan" className="text-xs font-black px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-500/20 text-[#F97316] uppercase tracking-wider">
                {product.minimumPlan.toUpperCase()}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span>Disponibilidade:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {status === 'active' ? 'Liberado na Conta' : 'Disponível para Upgrade'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Implantação:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">Imediata via Cloud</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Suporte:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">Especialistas DiskHub</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('/planos')}
              className="w-full py-2 rounded-xl bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 text-xs font-bold border-0 cursor-pointer transition-all flex items-center justify-center space-x-1"
            >
              <span>Comparar Todos os Planos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* 3. BENEFITS SECTION */}
      <div data-testid="product-benefits" className="space-y-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#F97316]" />
          <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider mb-0">
            Por Que Usar Este Módulo?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {product.benefits.map((b, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-[#F97316] flex items-center justify-center font-black text-xs mb-2">
                0{idx + 1}
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">{b.title}</h3>
              <p className="text-xs text-slate-400 leading-snug mb-0">{b.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. MAIN FEATURES GRID */}
      <div data-testid="product-features" className="space-y-3">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-[#F97316]" />
          <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider mb-0">
            Principais Funcionalidades
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {product.features.map((f, idx) => {
            const FeatureIcon = iconLookup[f.icon] || CheckCircle2;
            return (
              <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#1E293B] text-slate-700 dark:text-slate-200 flex items-center justify-center">
                  <FeatureIcon className="w-4 h-4 text-[#F97316]" />
                </div>
                <h3 className="text-xs font-black text-slate-900 dark:text-white mb-0.5">{f.title}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-0">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. HOW IT WORKS FLOW */}
      {product.flow && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] space-y-3">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Fluxo de Operação</span>
          <div className="flex flex-wrap items-center gap-2">
            {product.flow.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className="px-3.5 py-1.5 rounded-xl bg-orange-50 dark:bg-[#1E293B] border border-orange-200 dark:border-white/5 text-xs font-bold text-[#F97316]">
                  {idx + 1}. {step}
                </span>
                {idx < product.flow.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* 6. NATIVE INTEGRATIONS & METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Integrations */}
        <div data-testid="product-integrations" className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] space-y-3">
          <div className="flex items-center space-x-2">
            <Plug className="w-4 h-4 text-purple-500" />
            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0">Integrações Nativas</h3>
          </div>
          <p className="text-xs text-slate-400">Este módulo se conecta instantaneamente com outras ferramentas do ecossistema:</p>
          <div className="flex flex-wrap gap-2">
            {product.integrations.map((item, idx) => (
              <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/5">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics provided */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] space-y-3">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0">Indicadores Disponibilizados</h3>
          </div>
          <p className="text-xs text-slate-400">Métricas analíticas que sua operação passa a acompanhar:</p>
          <div className="flex flex-wrap gap-2">
            {product.metrics.map((met, idx) => (
              <span key={idx} className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                {met}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* 7. FAQ ACCORDION */}
      {product.faq && (
        <div data-testid="product-faq" className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] space-y-3">
          <h3 className="text-sm font-black text-slate-900 dark:text-white mb-1">Perguntas Frequentes sobre o {product.shortName}</h3>
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {product.faq.map((item, idx) => (
              <div key={idx} className="py-2.5">
                <span className="font-bold text-xs text-slate-900 dark:text-white block mb-1">{item.q}</span>
                <p className="text-xs text-slate-400 mb-0">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. MODAL DE SOLICITAÇÃO DE DEMONSTRAÇÃO */}
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
                <h3 className="text-base font-black text-slate-900 dark:text-white mb-0.5">Solicitar Demonstração</h3>
                <p className="text-xs text-slate-400 mb-0">Módulo: <strong>{product.name}</strong></p>
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
                  placeholder="Ex: Prime Show Entretenimento"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">E-mail Corporativo</label>
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
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Objetivo / Dúvidas (Opcional)</label>
                <textarea
                  rows="2"
                  value={demoForm.message}
                  onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })}
                  placeholder="Conte um pouco sobre suas expectativas para este módulo..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                />
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
