import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { 
  X, 
  ChevronRight,
  Sparkles,
  Home,
  CreditCard,
  Receipt,
  Calendar,
  Users,
  Megaphone,
  ShoppingBag,
  Briefcase,
  Database,
  Landmark,
  Brain,
  Settings,
  Crown,
  Map
} from 'lucide-react';

export default function Sidebar() {
  const {
    currentTab,
    setCurrentTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    theme,
    plan,
    invoices,
    events,
    leads,
    installedApps,
    sidebarClass,
    borderCol,
    textTitle,
    textSec
  } = useDiskHub();

  const selectTab = (tabName) => {
    setCurrentTab(tabName);
    setMobileSidebarOpen(false);
  };

  const mainMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'financeiro', label: 'Financeiro', icon: CreditCard },
    { id: 'contabilidade', label: 'Contabilidade', icon: Receipt, badge: invoices.filter(inv => inv.status === 'Pendente').length },
    { id: 'eventos', label: 'Eventos', icon: Calendar, badge: events.filter(e => e.status === 'Ativo').length, condition: installedApps.eventos === true },
    { id: 'crm', label: 'CRM de Vendas', icon: Users, badge: leads.filter(l => l.stage !== 'won').length, condition: installedApps.crm === true },
    { id: 'marketing', label: 'Marketing & Campanhas', icon: Megaphone, condition: installedApps.mkt === true },
    { id: 'pdv', label: 'Ponto de Venda', icon: ShoppingBag, condition: installedApps.pdv === true },
    { id: 'logistica', label: 'Logística & Ingressos', icon: Briefcase, condition: installedApps.logistica === true },
    { id: 'bar', label: 'Bar & Estoque', icon: Database, condition: installedApps.bar === true },
    { id: 'patrimonio', label: 'Patrimônio & POS', icon: Landmark, condition: installedApps.patrimonio === true },
    { id: 'ai', label: 'Disk AI Analytics', icon: Brain, condition: installedApps.ai === true }
  ];

  const configMenuItems = [
    { id: 'appstore', label: 'Central de Apps', icon: ShoppingBag },
    { id: 'marketplace', label: 'Planos & Upgrades', icon: Crown },
    { id: 'roadmap', label: 'Status & Roadmap', icon: Map }
  ];

  return (
    <aside className={`aside-sidebar flex flex-col justify-between shrink-0 z-30 transition-all duration-300 ${
      sidebarCollapsed ? 'w-[72px]' : 'w-64'
    } bg-[#0B0D17] border-r border-white/5 ${
      mobileSidebarOpen ? 'sidebar-mobile-expanded' : ''
    }`}>
      <div>
        {/* Logo Area */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="animate-fadeIn">
              <h1 className="text-xl font-black tracking-tight text-white flex items-center mb-0">
                Disk<span className="text-[#F97316] font-extrabold ml-0.5">Hub</span>
              </h1>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden p-1 rounded hover:bg-white/10 text-white/65 border-0 bg-transparent cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Profile info in Sidebar */}
        {!sidebarCollapsed && (
          <div className={`p-3 border-b ${borderCol} bg-light/5 animate-fadeIn`}>
            <div className="flex items-center space-x-3 text-left">
              <div className="w-9 h-9 rounded-full bg-[#F97316]/10 text-[#F97316] flex items-center justify-center font-bold text-sm shadow border border-[#F97316]/20">
                V
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-0">Vinicius</h4>
                <p className="text-[10px] text-slate-400 mb-0 uppercase tracking-widest font-mono font-bold">
                  Plano {plan.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Nav Links */}
        <div className="py-3 px-2 overflow-y-auto max-h-[calc(100vh-170px)]">
          <ul className="nav nav-sidebar flex flex-col space-y-1 p-0 m-0 list-none">
            {!sidebarCollapsed && (
              <li className="px-2 py-1 text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1 animate-fadeIn">
                Navegação Principal
              </li>
            )}

            {mainMenuItems.map(item => {
              if (item.condition === false) return null;
              const active = currentTab === item.id;
              const Icon = item.icon;
              return (
                <li key={item.id} className="w-full">
                  <button 
                    onClick={() => selectTab(item.id)} 
                    className={`w-full text-left flex items-center justify-between px-3 py-2 text-xs transition-all rounded-lg border-0 ${
                      active 
                        ? 'bg-white/10 text-white font-bold'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white bg-transparent cursor-pointer'
                    }`}
                    title={sidebarCollapsed ? item.label : ''}
                  >
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#F97316]' : 'text-slate-400'}`} />
                      {!sidebarCollapsed && <span className="truncate text-slate-300">{item.label}</span>}
                    </div>
                    {!sidebarCollapsed && item.badge && (
                      <span className="badge bg-[#3B82F6]/15 text-[#3B82F6] text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}

            {!sidebarCollapsed && (
              <li className="px-2 py-1 text-[9px] font-black uppercase tracking-widest text-slate-500 mt-4 mb-1 animate-fadeIn">
                Configurações & Loja
              </li>
            )}

            {configMenuItems.map(item => {
              const active = currentTab === item.id;
              const Icon = item.icon;
              return (
                <li key={item.id} className="w-full">
                  <button 
                    onClick={() => selectTab(item.id)} 
                    className={`w-full text-left flex items-center px-3 py-2 text-xs transition-all rounded-lg border-0 ${
                      active 
                        ? 'bg-white/10 text-white font-bold'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white bg-transparent cursor-pointer'
                    }`}
                    title={sidebarCollapsed ? item.label : ''}
                  >
                    <Icon className={`w-4 h-4 mr-3 shrink-0 ${active ? 'text-[#F97316]' : 'text-slate-400'}`} />
                    {!sidebarCollapsed && <span className="text-slate-300">{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Promocional Widget inside Sidebar */}
      {!sidebarCollapsed && (
        <div className="p-3 mx-2 mb-3 bg-[#F97316]/5 border border-[#F97316]/10 rounded-xl space-y-2.5 text-left">
          <div className="w-8 h-8 rounded-lg bg-[#F97316]/10 text-[#F97316] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-white leading-snug mb-0">Escale seu negócio com o plano ideal para você!</p>
          </div>
          <button 
            onClick={() => selectTab('marketplace')} 
            className="btn btn-xs w-full py-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-[10px] font-bold rounded-lg border-0 cursor-pointer transition-colors"
          >
            Falar com especialista
          </button>
        </div>
      )}

      {/* Sidebar Collapse Toggle Button at the bottom */}
      <div className={`p-3 border-t border-white/5 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!sidebarCollapsed && (
          <span className="text-[9px] text-slate-500 font-mono">v4.0.0 Enterprise</span>
        )}
        <button 
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-1.5 rounded hover:bg-white/5 text-slate-400 hover:text-white border-0 bg-transparent cursor-pointer"
          title={sidebarCollapsed ? "Expandir Menu" : "Recolher Menu"}
        >
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>
    </aside>
  );
}
