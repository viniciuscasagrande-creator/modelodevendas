import React from 'react';
import { useDiskHub, usersDatabase } from '../context/DiskHubContext';
import { 
  Menu, 
  Search, 
  Sun, 
  Moon, 
  Bell 
} from 'lucide-react';

export default function Header() {
  const {
    currentTab,
    setCurrentTab,
    currentUser,
    setCurrentUser,
    theme,
    setTheme,
    setMobileSidebarOpen,
    setSpotlightOpen,
    backendConnected,
    triggerToast,
    headerClass,
    textSec,
    textTitle
  } = useDiskHub();

  const handleLogout = () => {
    // Toggles between demo users instead of absolute null so there's always a user context
    const currentIndex = usersDatabase.findIndex(u => u.email === currentUser.email);
    const nextIndex = (currentIndex + 1) % usersDatabase.length;
    setCurrentUser(usersDatabase[nextIndex]);
    triggerToast("Perfil Alterado", `Logado como ${usersDatabase[nextIndex].name} (${usersDatabase[nextIndex].role}).`);
  };

  return (
    <header className={`navbar navbar-expand-md ${headerClass} px-4 py-3 flex items-center justify-between sticky top-0 z-40 transition-colors duration-250`}>
      <div className="flex items-center space-x-3">
        <button 
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="md:hidden p-1 rounded hover:bg-light/10 text-slate-500 hover:text-slate-900 border-0 bg-transparent cursor-pointer"
          title="Abrir Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-sm">🏢</span>
          <span className={`text-xs ${textSec} font-bold tracking-tight uppercase`}>DiskIngressos</span>
        </div>
        <span className="text-slate-300 dark:text-slate-700">/</span>
        <span className={`text-xs font-semibold ${textTitle} capitalize`}>
          {currentTab === 'appstore' ? 'Central de Aplicativos' : currentTab === 'marketplace' ? 'Planos e Upgrades' : currentTab === 'marketing' ? 'Marketing & Campanhas' : currentTab === 'contabilidade' ? 'Contabilidade Disk' : currentTab}
        </span>
      </div>
      
      <div className="flex items-center space-x-3">
        {/* Spotlight Search Trigger (Cmd + K) */}
        <button 
          onClick={() => setSpotlightOpen(true)}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-left text-xs ${
            theme === 'dark' 
              ? 'bg-[#1E293B]/40 text-[#94A3B8] border-[#1F2937] hover:bg-[#1E293B]' 
              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
          } w-60 justify-between cursor-pointer border-0`}
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5" />
            <span>Pesquisar...</span>
          </div>
          <kbd className="text-[9px] font-mono bg-slate-200/50 dark:bg-[#111827] px-1.5 py-0.5 rounded text-slate-400">⌘K</kbd>
        </button>

        {/* Connection Status */}
        <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
          <span className={`w-1.5 h-1.5 rounded-full ${backendConnected ? 'bg-[#22C55E]' : 'bg-[#94A3B8]'}`}></span>
          <span className="text-[9px] font-bold text-slate-400 font-mono">
            {backendConnected ? 'API OK' : 'LOCAL'}
          </span>
        </div>
        
        {/* Theme switch button */}
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`p-2 rounded border transition-all ${
            theme === 'dark' 
              ? 'text-[#94A3B8] hover:text-white bg-[#1E293B]/40 border-[#1F2937] hover:bg-[#1E293B]' 
              : 'text-slate-500 hover:text-slate-900 bg-slate-100 border-slate-200 hover:bg-slate-200'
          } border-0 cursor-pointer`}
          title={theme === 'dark' ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        <button className={`p-2 ${textSec} hover:text-slate-900 dark:hover:text-white ${theme === 'dark' ? 'bg-[#1E293B]/40 border-[#1F2937]' : 'bg-slate-100 border-slate-200'} rounded border relative transition-all border-0 cursor-pointer`}>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#3B82F6] rounded-full"></span>
          <Bell className="w-3.5 h-3.5" />
        </button>

        {/* User Profile Info & Logout dropdown */}
        <div className="flex items-center space-x-2.5 pl-2.5 border-l border-slate-200 dark:border-white/10">
          <div className="flex flex-col text-right">
            <span className={`text-[11px] font-bold ${textTitle} leading-none`}>{currentUser?.name}</span>
            <span className="text-[9px] text-[#F97316] font-semibold leading-none mt-1">{currentUser?.role}</span>
          </div>
          <div className="relative group">
            <button className="w-8 h-8 rounded-full text-white font-black text-xs flex items-center justify-center border-0 cursor-pointer overflow-hidden relative" style={{ backgroundColor: currentUser?.avatarColor || '#F97316' }}>
              {currentUser?.name?.[0]}
            </button>
            <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg shadow-xl py-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
              <button 
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-[10.5px] text-indigo-500 hover:bg-slate-100 dark:hover:bg-white/5 font-bold border-0 bg-transparent cursor-pointer"
              >
                Alternar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
