import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  LayoutGrid,
  Bell,
  ChevronDown,
  LogOut,
  User as UserIcon,
  Shield,
} from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { GlobalSearch } from './GlobalSearch';

interface DiskHubHeaderProps {
  onToggleSidebar: () => void;
}

export function DiskHubHeader({ onToggleSidebar }: DiskHubHeaderProps) {
  const { user, tenant, logout } = useAppContext();
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header
        data-testid="diskhub-header"
        className="sticky top-0 z-30 h-16 bg-[#0d1118]/90 backdrop-blur-md border-b border-white/[0.08] px-3 sm:px-6 flex items-center justify-between max-w-full overflow-hidden"
      >
        {/* Left: Mobile Toggle & Context */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 lg:hidden cursor-pointer"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Tenant Context Indicator (Desktop Only) */}
          <div className="hidden lg:flex items-center space-x-2 text-xs">
            <span className="text-[10px] font-black uppercase text-slate-400">Contexto:</span>
            <span className="font-bold text-white truncate max-w-[140px]">
              {tenant?.name || 'Diskingressos'}
            </span>
            <span className="text-slate-400">›</span>
            <span className="font-bold text-slate-300 truncate max-w-[140px]">
              {tenant?.activeProducer || 'Produtor Exemplo'}
            </span>
          </div>
        </div>

        {/* Right: Search, Apps, Notifications, Profile */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
          {/* Global Search Button */}
          <button
            type="button"
            data-testid="global-search-button"
            onClick={() => setSearchOpen(true)}
            className="flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#111721] border border-white/10 text-slate-400 hover:border-white/20 text-xs cursor-pointer transition-all w-24 sm:w-56 md:w-64 justify-between"
          >
            <div className="flex items-center space-x-1.5 truncate">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate text-[11px] text-slate-400">Buscar...</span>
            </div>
            <kbd className="hidden md:inline-block text-[9px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-slate-300 shrink-0">
              Ctrl K
            </kbd>
          </button>

          {/* Apps Launcher */}
          <button
            type="button"
            onClick={() => navigate('/app/apps')}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-[#111721] border border-white/10 cursor-pointer transition-all"
            title="Central de Apps"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          {/* Notification Bell */}
          <button
            type="button"
            onClick={() => navigate('/app/dashboard')}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-[#111721] border border-white/10 cursor-pointer transition-all relative"
            title="Notificações"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-2 p-1 rounded-xl hover:bg-white/5 cursor-pointer transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-md shrink-0">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : 'DH'}
              </div>
              <div className="hidden md:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-white truncate max-w-[110px]">
                  {user?.name || 'Vinicius Casagrande'}
                </span>
                <span className="text-[10px] text-slate-400 font-medium flex items-center">
                  <span className="truncate max-w-[90px]">{user?.role || 'CEO & Fundador'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5 shrink-0" />
                </span>
              </div>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-xl bg-[#111721] border border-white/10 shadow-2xl py-1.5 z-50 animate-fadeIn">
                <div className="px-3 py-2 border-b border-white/[0.06]">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Conectado como</span>
                  <span className="text-xs font-bold text-white block truncate">{user?.name}</span>
                  <span className="text-[10px] text-slate-400 block truncate">{user?.email}</span>
                </div>
                <div className="p-1">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/app/configuracoes');
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>Meu Perfil</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/app/assinatura');
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-slate-400" />
                    <span>Minha Assinatura</span>
                  </button>
                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Encerrar Sessão</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Search Dialog Modal */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
