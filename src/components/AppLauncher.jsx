import React, { useState, useEffect, useRef } from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { 
  X, 
  Search, 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Wallet, 
  Megaphone, 
  Headphones, 
  Calendar, 
  Receipt, 
  FileText, 
  Brain, 
  Zap, 
  Blocks, 
  Settings,
  ArrowRight
} from 'lucide-react';

export default function AppLauncher() {
  const {
    appsOpen,
    setAppsOpen,
    navigateTo
  } = useDiskHub();

  const [search, setSearch] = useState('');
  const modalRef = useRef(null);

  const apps = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard,
      route: '/dashboard',
      description: 'Visão geral e central de operações',
      status: 'active',
      testId: 'app-dashboard',
      color: 'bg-emerald-500/10 text-emerald-500'
    },
    {
      id: 'sales',
      name: 'Vendas',
      icon: ShoppingCart,
      route: '/vendas',
      description: 'Pipeline, propostas e gestão comercial',
      status: 'active',
      testId: 'app-sales',
      color: 'bg-orange-500/10 text-[#F97316]'
    },
    {
      id: 'crm',
      name: 'CRM',
      icon: Users,
      route: '/crm',
      description: 'Clientes, leads e relacionamento 360º',
      status: 'active',
      testId: 'app-crm',
      color: 'bg-blue-500/10 text-blue-500'
    },
    {
      id: 'finance',
      name: 'Financeiro',
      icon: Wallet,
      route: '/financeiro',
      description: 'Fluxo de caixa, conciliação e DRE',
      status: 'active',
      testId: 'app-finance',
      color: 'bg-emerald-500/10 text-emerald-600'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: Megaphone,
      route: '/marketing',
      description: 'Campanhas, automações e pixels',
      status: 'active',
      testId: 'app-marketing',
      color: 'bg-purple-500/10 text-purple-500'
    },
    {
      id: 'support',
      name: 'SAC',
      icon: Headphones,
      route: '/sac',
      description: 'Atendimento, tickets e suporte ao cliente',
      status: 'active',
      testId: 'app-sac',
      color: 'bg-amber-500/10 text-amber-500'
    },
    {
      id: 'events',
      name: 'Eventos',
      icon: Calendar,
      route: '/eventos',
      description: 'Gestão de eventos, lotes e portaria',
      status: 'active',
      testId: 'app-events',
      color: 'bg-rose-500/10 text-rose-500'
    },
    {
      id: 'accounting',
      name: 'Contabilidade',
      icon: Receipt,
      route: '/contabilidade',
      description: 'Emissão de NF-e, balancetes e fiscal',
      status: 'active',
      testId: 'app-accounting',
      color: 'bg-teal-500/10 text-teal-500'
    },
    {
      id: 'reports',
      name: 'Relatórios',
      icon: FileText,
      route: '/relatorios',
      description: 'Exportações e relatórios consolidados',
      status: 'beta',
      testId: 'app-reports',
      color: 'bg-indigo-500/10 text-indigo-500'
    },
    {
      id: 'bi',
      name: 'BI & Analytics',
      icon: Brain,
      route: '/bi',
      description: 'Disk AI e inteligência preditiva',
      status: 'beta',
      testId: 'app-bi',
      color: 'bg-cyan-500/10 text-cyan-500'
    },
    {
      id: 'automation',
      name: 'Automação',
      icon: Zap,
      route: '/automacao',
      description: 'Workflows comerciais e triggers automáticos',
      status: 'coming-soon',
      testId: 'app-automation',
      color: 'bg-yellow-500/10 text-yellow-600'
    },
    {
      id: 'integrations',
      name: 'Integrações',
      icon: Blocks,
      route: '/integracoes',
      description: 'Gateways, APIs e Webhooks',
      status: 'active',
      testId: 'app-integrations',
      color: 'bg-violet-500/10 text-violet-500'
    },
    {
      id: 'settings',
      name: 'Configurações',
      icon: Settings,
      route: '/configuracoes',
      description: 'Preferências do sistema e permissões',
      status: 'active',
      testId: 'app-settings',
      color: 'bg-slate-500/10 text-slate-500'
    }
  ];

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

  if (!appsOpen) return null;

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    app.description.toLowerCase().includes(search.toLowerCase())
  );

  const openApp = (app) => {
    setAppsOpen(false);
    navigateTo(app.route);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Ativo
          </span>
        );
      case 'beta':
        return (
          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Beta
          </span>
        );
      case 'coming-soon':
        return (
          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            Em breve
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) setAppsOpen(false);
      }}
    >
      <div 
        ref={modalRef}
        data-testid="app-launcher"
        className={`w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] rounded-3xl shadow-2xl overflow-hidden animate-scaleUp font-sans`}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-[#F97316] flex items-center justify-center shadow-xs">
              <Blocks className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-0.5">
                Central de Aplicativos DiskHub
              </h2>
              <p className="text-xs text-slate-400 mb-0">
                Selecione um módulo para navegar instantaneamente
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

        {/* Search Input Bar */}
        <div className="px-5 pt-4 pb-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Buscar aplicativo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#F97316]"
            />
          </div>
        </div>

        {/* Responsive Apps Grid */}
        <div className="p-5 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {filteredApps.map(app => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  data-testid={app.testId}
                  onClick={() => openApp(app)}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50/70 dark:bg-[#1E293B]/40 hover:bg-white dark:hover:bg-[#1E293B] hover:border-[#F97316] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-11 h-11 rounded-2xl ${app.color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {getStatusBadge(app.status)}
                    </div>

                    <h3 className="text-sm font-black text-slate-900 dark:text-white mb-1 group-hover:text-[#F97316] transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-snug line-clamp-2 mb-0">
                      {app.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[10.5px] font-bold text-slate-400 group-hover:text-[#F97316] transition-colors">
                    <span>Acessar</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {filteredApps.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs font-semibold">Nenhum aplicativo encontrado para "{search}".</p>
            </div>
          )}
        </div>

        {/* Bottom Footer Info */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#111827] flex flex-wrap items-center justify-between text-[11px] text-slate-400">
          <span>Pressione <strong>ESC</strong> ou clique fora para fechar</span>
          <span className="font-semibold text-slate-600 dark:text-slate-300">DiskHub Launchpad • 13 módulos</span>
        </div>
      </div>
    </div>
  );
}
