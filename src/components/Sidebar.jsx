import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { 
  X, 
  ChevronLeft,
  ChevronRight,
  Home,
  CreditCard,
  Receipt,
  Calendar,
  Users,
  Megaphone,
  ShoppingBag,
  Ticket,
  Database,
  Landmark,
  Brain,
  Sliders,
  ShieldCheck,
  Blocks,
  Compass,
  Headphones,
  Bell,
  Sparkles,
  LayoutGrid,
  Crown,
  ArrowRight,
  HelpCircle,
  Cpu
} from 'lucide-react';

export default function Sidebar() {
  const {
    currentTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    invoices,
    events,
    leads,
    installedApps,
    navigateTo,
    triggerToast
  } = useDiskHub();

  const selectTab = (tabName) => {
    const routeMap = {
      dashboard: '/dashboard',
      vendas: '/vendas',
      erp: '/vendas',
      pdv: '/vendas',
      financeiro: '/financeiro',
      crm: '/crm',
      marketing: '/marketing',
      sac: '/sac',
      eventos: '/eventos',
      contabilidade: '/contabilidade',
      relatorios: '/relatorios',
      ai: '/bi',
      bi: '/bi',
      automacao: '/automacao',
      ia: '/ia',
      appstore: '/appstore',
      integracoes: '/integracoes',
      usuarios: '/usuarios',
      roadmap: '/configuracoes',
      configuracoes: '/configuracoes',
      marketplace: '/planos',
      planos: '/planos',
      assinatura: '/assinatura',
      notificacoes: '/notificacoes',
      logistica: '/logistica',
      bar: '/estoque',
      patrimonio: '/patrimonio'
    };
    navigateTo(routeMap[tabName] || `/${tabName}`);
    setMobileSidebarOpen(false);
  };

  const navSections = [
    {
      title: 'VISÃO GERAL',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'appstore', label: 'Central de Apps', icon: LayoutGrid },
        { id: 'planos', label: 'Planos & Soluções', icon: CreditCard }
      ]
    },
    {
      title: 'MÓDULOS & SOLUÇÕES',
      items: [
        { id: 'crm', label: 'CRM', icon: Users, badge: leads.filter(l => l.stage !== 'won').length },
        { id: 'vendas', label: 'ERP', icon: ShoppingBag },
        { id: 'financeiro', label: 'Financeiro', icon: CreditCard },
        { id: 'marketing', label: 'Marketing', icon: Megaphone },
        { id: 'sac', label: 'SAC', icon: Headphones },
        { id: 'ai', label: 'BI & Analytics', icon: Brain },
        { id: 'contabilidade', label: 'Contabilidade', icon: Receipt, badge: invoices.filter(inv => inv.status === 'Pendente').length },
        { id: 'automacao', label: 'Automação', icon: Blocks },
        { id: 'ia', label: 'Inteligência Artificial', icon: Sparkles },
        { id: 'integracoes', label: 'Integrações', icon: Cpu }
      ]
    },
    {
      title: 'SISTEMA',
      items: [
        { id: 'assinatura', label: 'Minha Assinatura', icon: ShieldCheck },
        { id: 'roadmap', label: 'Configurações', icon: Sliders },
        { id: 'ajuda', label: 'Ajuda', icon: HelpCircle }
      ]
    }
  ];

  return (
    <aside className={`aside-sidebar flex flex-col justify-between shrink-0 z-30 transition-all duration-300 ${
      sidebarCollapsed ? 'w-[72px]' : 'w-60'
    } bg-[#0D111D] border-r border-white/[0.06] ${
      mobileSidebarOpen ? 'sidebar-mobile-expanded' : ''
    }`}>
      <div className="flex flex-col h-full justify-between overflow-hidden">
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Logo */}
          <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-sm font-black tracking-tight text-white flex items-center mb-0">
                    DiskHub
                  </h1>
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider block -mt-0.5">
                    Business Cloud
                  </span>
                </div>
              )}
            </div>
            <button 
              type="button" 
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1 rounded hover:bg-white/10 text-white/65 border-0 bg-transparent cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="py-2 px-2.5 overflow-y-auto flex-1 space-y-4">
            {navSections.map((sec, secIdx) => (
              <div key={secIdx} className="space-y-1">
                {!sidebarCollapsed && (
                  <span className="px-2.5 text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-1">
                    {sec.title}
                  </span>
                )}
                <ul className="list-none p-0 m-0 space-y-1">
                  {sec.items.map(item => {
                    const active = currentTab === item.id || (item.id === 'vendas' && currentTab === 'pdv') || (item.id === 'ai' && currentTab === 'bi');
                    const Icon = item.icon;
                    return (
                      <li key={`${sec.title}-${item.id}`}>
                        <button 
                          onClick={() => {
                            if (item.id === 'ajuda') {
                              triggerToast("Central de Ajuda", "Documentação do sistema DiskHub v2.8.1 aberta.");
                            } else {
                              selectTab(item.id);
                            }
                          }} 
                          className={`w-full text-left flex items-center justify-between px-3 py-2 text-xs transition-all rounded-xl border-0 cursor-pointer ${
                            active 
                              ? 'bg-[#2563EB] text-white font-bold shadow-md shadow-blue-600/30'
                              : 'text-slate-400 hover:bg-white/5 hover:text-white bg-transparent'
                          }`}
                          title={sidebarCollapsed ? item.label : ''}
                        >
                          <div className="flex items-center space-x-3 overflow-hidden">
                            <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                            {!sidebarCollapsed && (
                              <span className={`truncate ${active ? 'text-white font-bold' : 'text-slate-300'}`}>
                                {item.label}
                              </span>
                            )}
                          </div>
                          {!sidebarCollapsed && item.badge && (
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
                              active 
                                ? 'bg-white/20 text-white' 
                                : 'bg-white/10 text-slate-400'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Area: Promo Card + Collapser Button */}
        <div className="p-2 border-t border-white/[0.06] bg-[#0D111D] space-y-2">
          {!sidebarCollapsed && (
            <div className="p-3 rounded-2xl bg-gradient-to-b from-[#1E293B]/70 to-[#0F172A] border border-white/[0.08] text-left">
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
                <Crown className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-[11px] font-bold text-white mb-2 leading-tight">
                Evolua sua operação com o DiskHub.
              </p>
              <button
                type="button"
                onClick={() => selectTab('planos')}
                className="w-full py-1.5 px-3 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white text-[11px] font-bold border-0 cursor-pointer shadow-sm flex items-center justify-center space-x-1 transition-all"
              >
                <span>Ver planos</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          <button 
            type="button" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full py-1.5 px-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 text-xs font-semibold flex items-center justify-center space-x-2 border-0 bg-transparent cursor-pointer transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Colapsar menu</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
