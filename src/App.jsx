import React from 'react';
import { 
  CheckCircle, 
  Home, 
  CreditCard, 
  Calendar, 
  Users, 
  Menu 
} from 'lucide-react';
import { DiskHubProvider, useDiskHub } from './context/DiskHubContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AiChatDrawer from './components/AiChatDrawer';
import SpotlightSearch from './components/SpotlightSearch';
import QuickActionModals from './components/QuickActionModals';
import AppLauncher from './components/AppLauncher';
import AppBootstrap from './components/common/AppBootstrap';
import ModuleShell from './components/common/ModuleShell';
import AppEntryGuard from './components/common/AppEntryGuard';

// Pages
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import FinancePage from './pages/FinancePage';
import AccountingPage from './pages/AccountingPage';
import CrmPage from './pages/CrmPage';
import EventsPage from './pages/EventsPage';
import MarketingPage from './pages/MarketingPage';
import SalesPage from './pages/SalesPage';
import SacPage from './pages/SacPage';
import PreparationPage from './pages/PreparationPage';
import LogisticsPage from './pages/LogisticsPage';
import BarInventoryPage from './pages/BarInventoryPage';
import PatrimonyPage from './pages/PatrimonyPage';
import AiAnalyticsPage from './pages/AiAnalyticsPage';
import AppStorePage from './pages/AppStorePage';
import PlansPage from './pages/plans/PlansPage';
import ProductDetails from './pages/products/ProductDetails';
import CheckoutPage from './pages/checkout/CheckoutPage';
import SubscriptionPage from './pages/SubscriptionPage';
import RoadmapPage from './pages/RoadmapPage';

export function AppContent() {
  const {
    currentUser,
    currentTab,
    setCurrentTab,
    setTheme,
    setMobileSidebarOpen,
    toast,
    triggerToast,
    setFinancialStats,
    setEventLogs,
    setContabilAuditorias,
    bgMain,
    bgCard,
    borderCol,
    textTitle,
    textSec
  } = useDiskHub();

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className={`page-content flex-1 flex ${bgMain} min-h-screen overflow-hidden transition-colors duration-250`}>
      {/* SIDEBAR NAVIGATION */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <main className="content-wrapper flex-1 flex flex-col min-w-0 overflow-y-auto relative pb-16 md:pb-5 z-10 transition-colors duration-250">
        {/* HEADER / TOP NAVBAR */}
        <Header />

        {/* CONTENT AREA */}
        <div className="content p-4 max-w-7xl w-full mx-auto space-y-4">
          {currentTab === 'dashboard' && <Dashboard />}
          {currentTab === 'produtos' && <ProductDetails />}
          {currentTab === 'planos' && <PlansPage />}
          {currentTab === 'contratacao' && <CheckoutPage />}
          {currentTab === 'assinatura' && <SubscriptionPage />}
          
          {currentTab === 'crm' && (
            <AppEntryGuard appId="crm">
              <ModuleShell appId="crm" title="CRM & Vendas" subtitle="Clientes e Leads">
                <CrmPage />
              </ModuleShell>
            </AppEntryGuard>
          )}

          {(currentTab === 'vendas' || currentTab === 'pdv') && (
            <AppEntryGuard appId="erp">
              <ModuleShell appId="erp" title="ERP Empresarial" subtitle="Vendas & PDVs">
                <SalesPage />
              </ModuleShell>
            </AppEntryGuard>
          )}

          {currentTab === 'financeiro' && (
            <AppEntryGuard appId="finance">
              <ModuleShell appId="finance" title="Financeiro" subtitle="Fluxo de Caixa & Contas">
                <FinancePage />
              </ModuleShell>
            </AppEntryGuard>
          )}

          {currentTab === 'marketing' && (
            <AppEntryGuard appId="marketing">
              <ModuleShell appId="marketing" title="Marketing Digital" subtitle="Campanhas & Disparos">
                <MarketingPage />
              </ModuleShell>
            </AppEntryGuard>
          )}

          {currentTab === 'sac' && (
            <AppEntryGuard appId="support">
              <ModuleShell appId="support" title="SAC 360º" subtitle="Atendimento & Chamados">
                <SacPage />
              </ModuleShell>
            </AppEntryGuard>
          )}

          {(currentTab === 'ai' || currentTab === 'bi') && (
            <AppEntryGuard appId="analytics">
              <ModuleShell appId="analytics" title="BI & Analytics" subtitle="Inteligência Analítica">
                <AiAnalyticsPage />
              </ModuleShell>
            </AppEntryGuard>
          )}

          {currentTab === 'contabilidade' && (
            <AppEntryGuard appId="accounting">
              <ModuleShell appId="accounting" title="Contabilidade" subtitle="Fiscal & NF-e">
                <AccountingPage />
              </ModuleShell>
            </AppEntryGuard>
          )}

          {currentTab === 'automacao' && (
            <AppEntryGuard appId="automation">
              <ModuleShell appId="automation" title="Automação" subtitle="Workflows & Triggers">
                <PreparationPage moduleName="Automação Comercial" />
              </ModuleShell>
            </AppEntryGuard>
          )}

          {currentTab === 'ia' && (
            <AppEntryGuard appId="ai">
              <ModuleShell appId="ai" title="Disk AI" subtitle="Copilot Operacional">
                <PreparationPage moduleName="Disk AI (Copilot)" />
              </ModuleShell>
            </AppEntryGuard>
          )}

          {(currentTab === 'appstore' || currentTab === 'integracoes') && (
            <AppEntryGuard appId="integrations">
              <ModuleShell appId="integrations" title="Integrações" subtitle="Hub de APIs">
                <AppStorePage />
              </ModuleShell>
            </AppEntryGuard>
          )}
          
          {currentTab === 'eventos' && <EventsPage />}
          {currentTab === 'logistica' && <LogisticsPage />}
          {(currentTab === 'bar' || currentTab === 'estoque') && <BarInventoryPage />}
          {currentTab === 'patrimonio' && <PatrimonyPage />}
          {(currentTab === 'appstore' || currentTab === 'integracoes') && <AppStorePage />}
          {(currentTab === 'roadmap' || currentTab === 'configuracoes') && <RoadmapPage />}
          {currentTab === 'relatorios' && <PreparationPage moduleName="Relatórios Consolidados" />}
          
          {![
            'dashboard', 'produtos', 'planos', 'contratacao', 'assinatura',
            'vendas', 'pdv', 'financeiro', 'contabilidade', 'crm',
            'eventos', 'marketing', 'sac', 'logistica', 'bar', 'estoque',
            'patrimonio', 'ai', 'bi', 'appstore', 'integracoes', 'marketplace',
            'roadmap', 'configuracoes', 'automacao', 'relatorios'
          ].includes(currentTab) && <PreparationPage moduleName="Módulo" />}
        </div>

        {/* NOTIFICATION TOAST */}
        {toast.show && (
          <div className={`fixed bottom-6 left-6 z-50 ${bgCard} border ${borderCol} ${textTitle} px-4 py-3 rounded shadow-2xl flex items-center space-x-3 transition-all duration-300 animate-slideUp`}>
            <div className="p-1 bg-[#3B82F6]/10 text-[#3B82F6] rounded shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white mb-0">{toast.title}</h4>
              <p className={`text-[10px] ${textSec} mt-0.5 mb-0`}>{toast.body}</p>
            </div>
          </div>
        )}

        {/* DISK AI WIDGET (COPILOT) */}
        <AiChatDrawer />
      </main>

      {/* SPOTLIGHT SEARCH OVERLAY */}
      <SpotlightSearch />

      {/* CENTRAL APPS LAUNCHPAD OVERLAY (FASE 27.1) */}
      <AppLauncher />

      {/* QUICK ACTIONS MODALS (NOVA VENDA, NOVO EVENTO, ETC.) */}
      <QuickActionModals />

      {/* FLOATING SIMULATOR CONTROL BAR (DEVELOPER TOOLBAR) */}
      <div className="fixed bottom-16 md:bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/90 dark:bg-[#111827]/90 backdrop-blur border border-slate-200 dark:border-[#1F2937] px-3.5 py-2 rounded-2xl md:rounded-full shadow-xl flex items-center justify-center gap-2 flex-wrap max-w-[95%] text-[10.5px]">
        <span className="font-mono text-slate-400 font-bold tracking-wider uppercase text-[9px] border-r border-slate-200 dark:border-white/5 pr-2 mr-0.5 select-none">
          ⚙️ SIMULADOR
        </span>
        
        <button 
          type="button"
          onClick={() => {
            setFinancialStats(prev => ({
              ...prev,
              receita: prev.receita + 850,
              saldo: prev.saldo + 850,
              ingressos: prev.ingressos + 2,
              lucro: prev.lucro + 645
            }));
            setEventLogs(prev => [
              { id: `log-${Date.now()}`, timestamp: new Date().toLocaleTimeString(), type: 'Venda', message: `Nova compra de 2 ingressos (Show de Rock) via Pix: R$ 850,00` },
              ...prev.slice(0, 4)
            ]);
            triggerToast("⚡ Venda Simulação", "Nova compra de ingresso de R$ 850 confirmada!");
          }}
          className="btn btn-xs bg-[#2563EB]/10 hover:bg-[#2563EB] text-[#2563EB] hover:text-white border-0 px-3 py-1.5 rounded-full font-bold cursor-pointer transition-all flex items-center space-x-1"
        >
          <span>⚡ Venda</span>
        </button>

        <button 
          type="button"
          onClick={() => {
            setFinancialStats(prev => {
              const currentPresente = prev.presente !== undefined ? prev.presente : 1540;
              const currentEsperado = prev.esperado !== undefined ? prev.esperado : 2500;
              const nextPresente = Math.min(currentPresente + 12, currentEsperado);
              return {
                ...prev,
                presente: nextPresente,
                esperado: currentEsperado,
                ingressos: prev.ingressos + 5
              };
            });
            setEventLogs(prev => [
              { id: `log-${Date.now()}`, timestamp: new Date().toLocaleTimeString(), type: 'Check-in', message: `+12 check-ins validados na Catraca Principal A (Sucesso).` },
              ...prev.slice(0, 4)
            ]);
            triggerToast("🎫 Acesso Simulação", "Portaria: +12 check-ins validados com sucesso.");
          }}
          className="btn btn-xs bg-[#10B981]/10 hover:bg-[#10B981] text-[#10B981] hover:text-white border-0 px-3 py-1.5 rounded-full font-bold cursor-pointer transition-all flex items-center space-x-1"
        >
          <span>🎫 Acesso</span>
        </button>

        <button 
          type="button"
          onClick={() => {
            const warnings = [
              "Fila de espera no Portão Norte ultrapassou 15 min.",
              "POS Termo-04 offline na Bilheteria Principal.",
              "Conciliação automática: Divergência de R$ 0.12 no PIX.",
              "Queda de conectividade detectada no link redundante de internet."
            ];
            const randomMsg = warnings[Math.floor(Math.random() * warnings.length)];
            setContabilAuditorias(prev => [
              { id: `aud-${Date.now()}`, type: 'Alerta', msg: randomMsg, date: new Date().toLocaleTimeString() },
              ...prev.slice(0, 3)
            ]);
            setEventLogs(prev => [
              { id: `log-${Date.now()}`, timestamp: new Date().toLocaleTimeString(), type: 'Alerta', message: `Alerta do Sistema: ${randomMsg}` },
              ...prev.slice(0, 4)
            ]);
            triggerToast("⚠️ Novo Alerta", randomMsg);
          }}
          className="btn btn-xs bg-[#F59E0B]/10 hover:bg-[#F59E0B] text-[#F59E0B] hover:text-white border-0 px-3 py-1.5 rounded-full font-bold cursor-pointer transition-all flex items-center space-x-1"
        >
          <span>⚠️ Alerta</span>
        </button>

        <button 
          type="button"
          onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
          className="btn btn-xs bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-300 border-0 px-2.5 py-1.5 rounded-full font-bold cursor-pointer transition-all"
          title="Alternar Tema"
        >
          🌗
        </button>
      </div>

      {/* MOBILE FLOATING BOTTOM TAB BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B0D17]/90 backdrop-blur-md border-t border-white/5 py-2 px-4 md:hidden flex justify-around items-center shadow-lg">
        {[
          { id: 'dashboard', label: 'Início', icon: Home },
          { id: 'financeiro', label: 'Finanças', icon: CreditCard },
          { id: 'eventos', label: 'Eventos', icon: Calendar },
          { id: 'crm', label: 'CRM', icon: Users }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center justify-center space-y-0.5 bg-transparent border-0 cursor-pointer active:scale-90 transition-transform duration-150 ${
                isActive ? 'text-[#F97316]' : 'text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-bold">{tab.label}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="flex flex-col items-center justify-center space-y-0.5 bg-transparent border-0 cursor-pointer text-slate-400 active:scale-90 transition-transform duration-150"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[9px] font-bold">Menu</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DiskHubProvider>
      <AppBootstrap>
        <AppContent />
      </AppBootstrap>
    </DiskHubProvider>
  );
}
