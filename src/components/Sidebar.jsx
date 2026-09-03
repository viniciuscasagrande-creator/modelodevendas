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
  Headphones
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
    navigateTo
  } = useDiskHub();

  const selectTab = (tabName) => {
    const routeMap = {
      dashboard: '/dashboard',
      vendas: '/vendas',
      pdv: '/vendas',
      financeiro: '/financeiro',
      crm: '/crm',
      marketing: '/marketing',
      sac: '/sac',
      eventos: '/eventos',
      contabilidade: '/contabilidade',
      relatorios: '/relatorios',
      ai: '/bi',
      automacao: '/automacao',
      appstore: '/integracoes',
      roadmap: '/configuracoes',
      marketplace: '/planos',
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
        { id: 'dashboard', label: 'Dashboard', icon: Home }
      ]
    },
    {
      title: 'OPERAÇÃO',
      items: [
        { id: 'vendas', label: 'Vendas', icon: Compass, badge: 'Online', condition: installedApps.pdv === true },
        { id: 'eventos', label: 'Eventos', icon: Calendar, badge: events.filter(e => e.status === 'Ativo').length, condition: installedApps.eventos === true },
        { id: 'pdv', label: 'PDVs', icon: ShoppingBag, condition: installedApps.pdv === true },
        { id: 'logistica', label: 'Ingressos', icon: Ticket, condition: installedApps.logistica === true }
      ]
    },
    {
      title: 'CLIENTES',
      items: [
        { id: 'crm', label: 'CRM', icon: Users, badge: leads.filter(l => l.stage !== 'won').length, condition: installedApps.crm === true },
        { id: 'sac', label: 'SAC 360º', icon: Headphones }
      ]
    },
    {
      title: 'GESTÃO',
      items: [
        { id: 'financeiro', label: 'Financeiro', icon: CreditCard },
        { id: 'contabilidade', label: 'Contabilidade', icon: Receipt, badge: invoices.filter(inv => inv.status === 'Pendente').length },
        { id: 'bar', label: 'Estoque', icon: Database, condition: installedApps.bar === true },
        { id: 'patrimonio', label: 'Patrimônio', icon: Landmark, condition: installedApps.patrimonio === true }
      ]
    },
    {
      title: 'CRESCIMENTO',
      items: [
        { id: 'marketing', label: 'Marketing', icon: Megaphone, condition: installedApps.mkt === true },
        { id: 'ai', label: 'Analytics', icon: Brain, condition: installedApps.ai === true }
      ]
    },
    {
      title: 'SISTEMA',
      items: [
        { id: 'appstore', label: 'Integrações', icon: Blocks },
        { id: 'marketplace', label: 'Usuários e Permissões', icon: ShieldCheck },
        { id: 'roadmap', label: 'Configurações', icon: Sliders }
      ]
    }
  ];

  return (
    <aside className={`aside-sidebar flex flex-col justify-between shrink-0 z-30 transition-all duration-300 ${
      sidebarCollapsed ? 'w-[72px]' : 'w-60'
    } bg-[#0B0D17] border-r border-white/5 ${
      mobileSidebarOpen ? 'sidebar-mobile-expanded' : ''
    }`}>
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Brand Logo */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <h1 className="text-xl font-black tracking-tight text-white flex items-center mb-0">
                Disk<span className="text-[#F97316] font-extrabold ml-0.5">Hub</span>
              </h1>
            </div>
            <button 
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1 rounded hover:bg-white/10 text-white/65 border-0 bg-transparent cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-4 pt-1 pb-3">
            {!sidebarCollapsed && (
              <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider mb-0">
                Business Cloud ERP & CRM
              </p>
            )}
          </div>

          {/* Navigation Items Organized by 6 Sections */}
          <div className="py-1 px-2.5 overflow-y-auto max-h-[calc(100vh-140px)] space-y-4">
            {navSections.map((sec, secIdx) => (
              <div key={secIdx} className="space-y-1">
                {!sidebarCollapsed && (
                  <span className="px-2.5 text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-1">
                    {sec.title}
                  </span>
                )}
                <ul className="list-none p-0 m-0 space-y-1">
                  {sec.items.map(item => {
                    if (item.condition === false) return null;
                    const active = currentTab === item.id || (item.id === 'vendas' && currentTab === 'pdv');
                    const Icon = item.icon;
                    return (
                      <li key={`${sec.title}-${item.label}`}>
                        <button 
                          onClick={() => selectTab(item.id)} 
                          className={`w-full text-left flex items-center justify-between px-3 py-2 text-xs transition-all rounded-xl border-0 cursor-pointer ${
                            active 
                              ? 'bg-[#F97316] text-white font-bold shadow-md shadow-[#F97316]/25'
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

        {/* Bottom Menu Collapser Button */}
        <div className="p-3 border-t border-white/5">
          <button 
            type="button" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full py-2 px-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 text-xs font-semibold flex items-center justify-center space-x-2 border-0 bg-transparent cursor-pointer transition-colors"
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
