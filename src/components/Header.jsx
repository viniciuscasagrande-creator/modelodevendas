import React from 'react';
import { useDiskHub, usersDatabase } from '../context/DiskHubContext';
import { 
  Menu, 
  Search, 
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
    <header className={`navbar navbar-expand-md ${headerClass} px-4 py-2.5 flex items-center justify-between sticky top-0 z-40 transition-colors duration-250 border-b border-white/[0.06] bg-[#0D111D]/95 backdrop-blur-md`}>
      
      {/* Left: Mobile Menu + Cascading Context */}
      <div className="flex items-center space-x-3">
        <button 
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="md:hidden p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white border-0 bg-transparent cursor-pointer"
          title="Abrir Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Context Hierarchy */}
        <div className="hidden sm:flex items-center space-x-2 text-xs">
          <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
            Contexto atual
          </span>
          <div className="flex items-center space-x-1.5">
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 font-semibold border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
              <Building className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[11px]">{selectedCompany}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 font-semibold border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[11px]">{selectedProducer}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 font-bold border border-blue-500/30 cursor-pointer">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[11px]">{selectedEventContext}</span>
              <ChevronDown className="w-3 h-3 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Search, Theme, Notifications, User */}
      <div className="flex items-center space-x-3">
        {/* Search Bar with Ctrl K Badge */}
        <button 
          onClick={() => setSpotlightOpen(true)}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#111625] border border-white/[0.08] text-slate-400 text-xs w-56 sm:w-64 justify-between cursor-pointer hover:border-white/20 transition-all shadow-inner"
        >
          <div className="flex items-center space-x-2 truncate">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate text-[11px] text-slate-400">Buscar vendas, eventos, clientes no DiskHub...</span>
          </div>
          <kbd className="text-[9px] font-mono bg-white/10 border border-white/10 px-1.5 py-0.5 rounded text-slate-300 shadow-2xs">
            Ctrl K
          </kbd>
        </button>

        {/* Central Apps Launcher Button (Fase 27.1) */}
        <button
          type="button"
          data-testid="app-launcher-button"
          onClick={() => setAppsOpen(true)}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 bg-[#111625] border border-white/[0.08] cursor-pointer transition-all flex items-center justify-center"
          title="Menu Central de Apps"
        >
          <LayoutGrid className="w-4 h-4" />
        </button>


        {/* Notifications Bell with Badge & Drawer (Fase 27.1.8.4) */}
        <NotificationBell />

        {/* User Profile Block */}
        <div className="relative group pl-1.5 border-l border-white/10">
          <button className="flex items-center space-x-2.5 bg-transparent border-0 cursor-pointer p-1 rounded-xl hover:bg-white/5 transition-all">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-xs flex items-center justify-center shadow-md">
              {currentUser?.name ? currentUser.name.split(' ').map(n=>n[0]).join('').substring(0, 2).toUpperCase() : 'VC'}
            </div>
            <div className="hidden md:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-white">
                {currentUser?.name || "Vinicius Casagrande"}
              </span>
              <span className="text-[10px] text-slate-400 font-medium flex items-center">
                <span>{currentUser?.role || "CEO & Fundador"}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
              </span>
            </div>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1.5 w-48 bg-[#111625] border border-white/10 rounded-xl shadow-2xl py-1.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
            <div className="px-3 py-1.5 border-b border-white/5 mb-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Usuário Conectado</span>
              <span className="text-xs font-bold text-white block truncate">{currentUser?.name || "Vinicius Casagrande"}</span>
              <span className="text-[10px] text-slate-400 block truncate">{currentUser?.email || "vinicius@diskhub.com.br"}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-xs font-bold text-blue-400 hover:bg-white/5 border-0 bg-transparent cursor-pointer flex items-center justify-between"
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
