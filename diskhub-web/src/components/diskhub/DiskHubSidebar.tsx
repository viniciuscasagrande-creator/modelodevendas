import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  LayoutGrid,
  CreditCard,
  Users,
  Building,
  DollarSign,
  Megaphone,
  Headphones,
  BarChart3,
  FileSpreadsheet,
  Zap,
  Sparkles,
  Plug,
  ShieldCheck,
  Settings,
  HelpCircle,
  ArrowRight,
  X,
} from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { cn } from '../../utils/cn';

interface DiskHubSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiskHubSidebar({ isOpen, onClose }: DiskHubSidebarProps) {
  const { subscription, apps } = useAppContext();
  const navigate = useNavigate();

  const currentPlan = subscription?.plan || 'advanced';

  const menuSections = [
    {
      title: 'PRINCIPAL',
      items: [
        { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
        { name: 'Central de Apps', path: '/app/apps', icon: LayoutGrid },
        { name: 'Planos', path: '/app/planos', icon: CreditCard },
      ],
    },
    {
      title: 'MÓDULOS DE NEGÓCIO',
      items: [
        { id: 'crm', name: 'CRM Comercial', path: '/app/crm', icon: Users, tier: 'standard' },
        { id: 'erp', name: 'ERP Operacional', path: '/app/erp', icon: Building, tier: 'standard' },
        { id: 'financeiro', name: 'Financeiro', path: '/app/financeiro', icon: DollarSign, tier: 'standard' },
        { id: 'marketing', name: 'Marketing', path: '/app/marketing', icon: Megaphone, tier: 'advanced' },
        { id: 'sac', name: 'SAC & Suporte', path: '/app/sac', icon: Headphones, tier: 'advanced' },
        { id: 'bi', name: 'BI & Analytics', path: '/app/bi', icon: BarChart3, tier: 'advanced' },
        { id: 'contabilidade', name: 'Contabilidade', path: '/app/contabilidade', icon: FileSpreadsheet, tier: 'expert' },
        { id: 'automacao', name: 'Automação', path: '/app/automacao', icon: Zap, tier: 'expert' },
        { id: 'ia', name: 'Inteligência Artificial', path: '/app/ia', icon: Sparkles, tier: 'expert' },
        { id: 'integracoes', name: 'Integrações', path: '/app/integracoes', icon: Plug, tier: 'expert' },
      ],
    },
    {
      title: 'GESTÃO & CONTRATO',
      items: [
        { name: 'Minha Assinatura', path: '/app/assinatura', icon: ShieldCheck },
        { name: 'Configurações', path: '/app/configuracoes', icon: Settings },
      ],
    },
  ];

  const getModuleBadge = (tier?: string) => {
    if (!tier) return null;
    if (currentPlan === 'expert') {
      return <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400">ATIVO</span>;
    }
    if (currentPlan === 'advanced') {
      if (tier === 'expert') {
        return <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400">EXPERT</span>;
      }
      return <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400">ATIVO</span>;
    }
    if (tier === 'standard') {
      return <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400">ATIVO</span>;
    }
    return <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400">UPGRADE</span>;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Aside */}
      <aside
        data-testid="diskhub-sidebar"
        className={cn(
          'fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0d1118] border-r border-white/[0.08] z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <span className="font-black text-lg font-mono">D</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-sm tracking-tight text-white">DiskHub</span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Cloud
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block font-medium">
                Business Platform
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white lg:hidden cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {menuSections.map((sec) => (
            <div key={sec.title}>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 mb-2 block">
                {sec.title}
              </span>
              <div className="space-y-1">
                {sec.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group',
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.05]'
                      )
                    }
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <item.icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {'tier' in item && getModuleBadge(item.tier)}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Commercial Promo Card */}
        <div className="p-3 border-t border-white/[0.08]">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-900/30 to-indigo-900/20 border border-blue-500/20">
            <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evolua sua operação</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2 leading-tight">
              Desbloqueie BI, IA e automações avançadas.
            </p>
            <button
              onClick={() => {
                navigate('/app/planos');
                if (window.innerWidth < 1024) onClose();
              }}
              className="w-full py-1.5 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center space-x-1 cursor-pointer transition-all shadow-xs"
            >
              <span>Ver planos</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
