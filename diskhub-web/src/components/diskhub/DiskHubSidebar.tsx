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
  Crown,
  ArrowRight,
  X,
  Boxes,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface DiskHubSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiskHubSidebar({ isOpen, onClose }: DiskHubSidebarProps) {
  const navigate = useNavigate();

  const mainNav = [
    { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Central de Apps', path: '/app/apps', icon: LayoutGrid },
    { name: 'Planos', path: '/app/planos', icon: CreditCard },
    { name: 'CRM', path: '/app/crm', icon: Users },
    { name: 'ERP', path: '/app/erp', icon: Building },
    { name: 'Financeiro', path: '/app/financeiro', icon: DollarSign },
    { name: 'Marketing', path: '/app/marketing', icon: Megaphone },
    { name: 'SAC', path: '/app/sac', icon: Headphones },
    { name: 'BI & Analytics', path: '/app/bi', icon: BarChart3 },
    { name: 'Contabilidade', path: '/app/contabilidade', icon: FileSpreadsheet },
    { name: 'Automação', path: '/app/automacao', icon: Zap },
    { name: 'Inteligência Artificial', path: '/app/ia', icon: Sparkles },
    { name: 'Integrações', path: '/app/integracoes', icon: Plug },
  ];

  const secondaryNav = [
    { name: 'Minha Assinatura', path: '/app/assinatura', icon: ShieldCheck },
    { name: 'Configurações', path: '/app/configuracoes', icon: Settings },
    { name: 'Ajuda', path: '/app/ajuda', icon: HelpCircle },
  ];

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
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-base tracking-tight text-white block leading-tight">
                DiskHub
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">
                Business Cloud
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
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {mainNav.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={({ isActive }) =>
                cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                )
              }
            >
              <item.icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}

          {/* Divider */}
          <div className="pt-2 pb-1 border-t border-white/[0.06] my-2" />

          {secondaryNav.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={({ isActive }) =>
                cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                )
              }
            >
              <item.icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Bottom Commercial Promo Card */}
        <div className="p-3 border-t border-white/[0.08]">
          <div className="p-3 rounded-xl bg-[#111721] border border-white/[0.08] flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
              <Crown className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-slate-300 font-medium leading-tight mb-2">
                Evolua sua operação com o DiskHub.
              </p>
              <button
                onClick={() => {
                  navigate('/app/planos');
                  if (window.innerWidth < 1024) onClose();
                }}
                className="w-full py-1.5 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center justify-center space-x-1 cursor-pointer transition-all shadow-sm"
              >
                <span>Ver planos</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
