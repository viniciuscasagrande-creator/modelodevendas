import React from 'react';
import { useDiskHub, usersDatabase } from '../context/DiskHubContext';
import { 
  Menu, 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  HelpCircle, 
  Building, 
  Users, 
  Calendar, 
  ChevronDown,
  LayoutGrid
} from 'lucide-react';
import NotificationBell from './notifications/NotificationBell';

export default function Header() {
  const {
    currentUser,
    setCurrentUser,
    theme,
    setTheme,
    setMobileSidebarOpen,
    setSpotlightOpen,
    selectedCompany,
    selectedProducer,
    selectedEventContext,
    setAppsOpen,
    triggerToast,
    headerClass,
    textTitle
  } = useDiskHub();

  const handleLogout = () => {
    const currentIndex = usersDatabase.findIndex(u => u.email === currentUser.email);
    const nextIndex = (currentIndex + 1) % usersDatabase.length;
    setCurrentUser(usersDatabase[nextIndex]);
    triggerToast("Perfil Alterado", `Logado como ${usersDatabase[nextIndex].name} (${usersDatabase[nextIndex].role}).`);
  };

  return (
    <header className={`navbar navbar-expand-md ${headerClass} px-4 py-2.5 flex items-center justify-between sticky top-0 z-40 transition-colors duration-250 border-b border-slate-200 dark:border-[#1F2937] bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md`}>
      
      {/* Left: Mobile Menu + Cascading Context */}
      <div className="flex items-center space-x-3">
        <button 
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white border-0 bg-transparent cursor-pointer"
          title="Abrir Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Context Hierarchy */}
        <div className="hidden sm:flex items-center space-x-2 text-xs">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
            Contexto atual
          </span>
          <div className="flex items-center space-x-1.5">
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-white/5 cursor-pointer">
              <Building className="w-3.5 h-3.5 text-[#F97316]" />
              <span className="text-[11px]">{selectedCompany}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-white/5 cursor-pointer">
              <Users className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span className="text-[11px]">{selectedProducer}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-[#F97316]/10 text-[#F97316] font-bold border border-[#F97316]/30 cursor-pointer">
              <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
              <span className="text-[11px]">{selectedEventContext}</span>
              <ChevronDown className="w-3 h-3 text-[#F97316]" />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Search, Theme, Notifications, User */}
      <div className="flex items-center space-x-3">
        {/* Search Bar with ⌘K Badge */}
        <button 
          onClick={() => setSpotlightOpen(true)}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#1E293B]/60 border border-slate-200 dark:border-white/5 text-slate-400 text-xs w-56 sm:w-64 justify-between cursor-pointer hover:border-slate-300 dark:hover:border-white/10 transition-colors"
        >
          <div className="flex items-center space-x-2 truncate">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate text-[11px]">Buscar vendas, eventos, clientes...</span>
          </div>
          <kbd className="text-[9px] font-mono bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 px-1.5 py-0.5 rounded text-slate-400 shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* Central Apps Launcher Button (Fase 27.1) */}
        <button
          type="button"
          data-testid="app-launcher-button"
          onClick={() => setAppsOpen(true)}
          className="p-2 rounded-lg text-slate-400 hover:text-[#F97316] hover:bg-orange-50 dark:hover:bg-orange-500/10 bg-slate-100 dark:bg-[#1E293B]/60 border border-slate-200 dark:border-white/5 cursor-pointer transition-all flex items-center justify-center"
          title="Menu Central de Apps"
        >
          <LayoutGrid className="w-4 h-4" />
        </button>

        {/* Theme Switcher */}
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#1E293B]/60 border border-slate-200 dark:border-white/5 cursor-pointer transition-all"
          title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Notifications Bell with Badge & Drawer (Fase 27.1.8.4) */}
        <NotificationBell />

        {/* Help Circle */}
        <button 
          onClick={() => triggerToast("Central de Ajuda", "Documentação do sistema DiskHub v2.8.1 aberta.")}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#1E293B]/60 border border-slate-200 dark:border-white/5 cursor-pointer transition-all hidden sm:flex"
          title="Ajuda"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* User Profile Block */}
        <div className="relative group pl-1.5 border-l border-slate-200 dark:border-white/10">
          <button className="flex items-center space-x-2.5 bg-transparent border-0 cursor-pointer p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
            <div className="w-8 h-8 rounded-full bg-[#F97316] text-white font-black text-xs flex items-center justify-center shadow-sm">
              VC
            </div>
            <div className="hidden md:flex flex-col text-left leading-tight">
              <span className={`text-xs font-bold ${textTitle}`}>
                Vinicius Casagrande
              </span>
              <span className="text-[10px] text-[#F97316] font-semibold flex items-center">
                <span>CEO & Fundador</span>
                <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
              </span>
            </div>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1.5 w-48 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] rounded-xl shadow-2xl py-1.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
            <div className="px-3 py-1.5 border-b border-slate-100 dark:border-white/5 mb-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Usuário Conectado</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">{currentUser?.name}</span>
              <span className="text-[10px] text-slate-400 block truncate">{currentUser?.email}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-xs font-bold text-[#F97316] hover:bg-slate-100 dark:hover:bg-white/5 border-0 bg-transparent cursor-pointer flex items-center justify-between"
            >
              <span>Alternar Perfil Demo</span>
              <span className="text-[10px] text-slate-400 font-mono">({currentUser?.role})</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
