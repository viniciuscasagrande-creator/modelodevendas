import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { DISK_HUB_APPS_CATALOG } from '../data/appsCatalog';
import { 
  ShoppingBag, 
  CheckCircle, 
  X, 
  Search, 
  Sparkles, 
  Loader2, 
  Lock 
} from 'lucide-react';

export default function AppStorePage() {
  const {
    mktCategory,
    setMktCategory,
    mktPlan,
    setMktPlan,
    mktSearch,
    setMktSearch,
    mktSort,
    setMktSort,
    selectedApp,
    setSelectedApp,
    appDetailTab,
    setAppDetailTab,
    installedApps,
    setInstalledApps,
    plan,
    navigateTo,
    triggerToast,
    theme,
    cardClass,
    borderCol,
    textTitle,
    textSec,
    textBody
  } = useDiskHub();

  const isPlanEligible = (planRequired) => {
    const currentPlan = plan ? plan.toLowerCase() : 'essencial';
    const planLevels = {
      'essencial': 1,
      'standard': 1,
      'profissional': 2,
      'advanced': 2,
      'premium': 3,
      'enterprise': 4,
      'omnichannel': 5
    };
    const requiredLevels = {
      'standard': 1,
      'advanced': 2,
      'expert': 3
    };
    const currentLevel = planLevels[currentPlan] || 1;
    const requiredLevel = requiredLevels[planRequired] || 1;
    return currentLevel >= requiredLevel;
  };

  const handleInstallApp = (appId, appName) => {
    setInstalledApps(prev => ({ ...prev, [appId]: 'installing' }));
    
    setTimeout(() => {
      setInstalledApps(prev => ({ ...prev, [appId]: true }));
      triggerToast(
        "Módulo Ativado!",
        "O módulo de " + appName + " foi instalado com sucesso. Uma nova aba foi adicionada à sua barra lateral!"
      );
    }, 1800);
  };

              // Filter and sort apps catalog locally
            const filteredApps = DISK_HUB_APPS_CATALOG.filter(app => {
              // Category filter
              if (mktCategory !== 'Todos') {
                if (mktCategory === '⭐ Recomendados') {
                  const recommendedIds = (plan === 'standard' || plan === 'essencial') ? ['crm', 'mkt', 'pdv'] : ['bar', 'ai', 'patrimonio'];
                  if (!recommendedIds.includes(app.id)) return false;
                } else if (mktCategory === '💰 Financeiro') {
                  if (app.category !== 'Finanças' && app.category !== 'Fiscal') return false;
                } else if (mktCategory === '📊 Gestão') {
                  if (app.category !== 'Logística' && app.category !== 'Patrimônio') return false;
                } else if (mktCategory === '📣 Marketing') {
                  if (app.category !== 'Marketing' && app.category !== 'Vendas') return false;
                } else if (mktCategory === '🧠 IA') {
                  if (app.category !== 'Inteligência') return false;
                } else if (mktCategory === '🏢 Operações') {
                  if (app.category !== 'Operações') return false;
                }
              }

              // Plan filter
              if (mktPlan !== 'Todos') {
                if (mktPlan === 'standard' && app.planRequired !== 'standard') return false;
                if (mktPlan === 'advanced' && app.planRequired !== 'advanced') return false;
                if (mktPlan === 'expert' && app.planRequired !== 'expert') return false;
              }

              // Search filter
              if (mktSearch.trim() !== '') {
                const term = mktSearch.toLowerCase();
                if (!app.name.toLowerCase().includes(term) && !app.desc.toLowerCase().includes(term)) return false;
              }

              return true;
            });

            // Sort logic
            if (mktSort === 'Popular') {
              filteredApps.sort((a, b) => b.downloads - a.downloads);
            } else if (mktSort === 'Avaliacao') {
              filteredApps.sort((a, b) => b.rating - a.rating);
            }

            return (
              <div className="space-y-4 animate-fadeIn">
                
                {/* 1. HERO BANNER */}
                <div className={`p-4 md:p-5 rounded-2xl ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-blue-900/40 via-slate-900/60 to-indigo-900/40 border border-white/5' 
                    : 'bg-gradient-to-r from-blue-500/10 via-[#6366F1]/5 to-indigo-500/10 border border-slate-200'
                } relative overflow-hidden shadow-sm`}>
                  <div className="relative z-10 max-w-xl space-y-2">
                    <span className="badge badge-primary bg-[#3B82F6]/10 text-[#3B82F6] text-[9px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">Marketplace oficial</span>
                    <h2 className={`text-xl md:text-2xl font-black tracking-tight ${textTitle} mb-1`}>Conheça o Disk Hub Marketplace</h2>
                    <p className={`text-xs ${textSec} leading-relaxed mb-3`}>
                      Mais de 40 módulos integrados para gerenciar bilheterias, vendas físicas de bar, logística de entregas e auditorias fiscais avançadas.
                    </p>
                    <button 
                      onClick={() => navigateTo('/planos')}
                      className="btn btn-primary bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold px-4 py-2 rounded-lg border-0 cursor-pointer shadow-sm transition-all"
                    >
                      Conhecer Planos & Upgrades
                    </button>
                  </div>
                  {/* Subtle decorative background graphic */}
                  <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-6 translate-x-6 hidden md:block">
                    <Sparkles className="w-64 h-64 text-[#3B82F6]" />
                  </div>
                </div>

                {/* 2. CATEGORY SELECTOR */}
                <div className="flex items-center overflow-x-auto pb-2 gap-1.5 scrollbar-thin text-xs">
                  {['Todos', '⭐ Recomendados', '💰 Financeiro', '📊 Gestão', '📣 Marketing', '🧠 IA', '🏢 Operações'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setMktCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full font-medium transition-all shrink-0 cursor-pointer ${
                        mktCategory === cat 
                          ? 'bg-[#3B82F6] text-white shadow-sm font-semibold' 
                          : 'bg-[#111625] text-slate-400 hover:text-white border border-white/[0.06] hover:border-white/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* 3. SEARCH & FILTERS BAR */}
                <div className={`p-3 card bg-[#111625] border border-white/[0.06] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs`}>
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-3.5 w-3.5 text-slate-400" />
                    </span>
                    <input 
                      type="text" 
                      placeholder="Pesquisar módulo comercial..." 
                      value={mktSearch}
                      onChange={(e) => setMktSearch(e.target.value)}
                      className="pl-9 pr-4 py-2 w-full bg-[#0D111D] text-white placeholder-slate-500 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-xs"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-slate-400">Plano:</span>
                      <select 
                        value={mktPlan} 
                        onChange={(e) => setMktPlan(e.target.value)}
                        className="bg-[#0D111D] text-white border border-white/10 py-1.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-xs"
                      >
                        <option value="Todos" className="bg-[#0D111D] text-white">Todos os Planos</option>
                        <option value="standard" className="bg-[#0D111D] text-white">Standard</option>
                        <option value="advanced" className="bg-[#0D111D] text-white">Advanced</option>
                        <option value="expert" className="bg-[#0D111D] text-white">Expert</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <span className="text-slate-400">Ordenar:</span>
                      <select 
                        value={mktSort} 
                        onChange={(e) => setMktSort(e.target.value)}
                        className="bg-[#0D111D] text-white border border-white/10 py-1.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-xs"
                      >
                        <option value="Popular" className="bg-[#0D111D] text-white">Mais Populares</option>
                        <option value="Avaliacao" className="bg-[#0D111D] text-white">Melhor Avaliados</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. CARDS GRID */}
                <div className="row">
                  {filteredApps.length === 0 ? (
                    <div className="col-12 py-8 text-center text-slate-500">
                      <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="mb-0 text-xs">Nenhum módulo encontrado correspondente aos filtros.</p>
                    </div>
                  ) : (
                    filteredApps.map(app => {
                      const IconComponent = app.icon;
                      const eligible = isPlanEligible(app.planRequired);
                      const installed = installedApps[app.id] === true;
                      const installing = installedApps[app.id] === 'installing';

                      return (
                        <div key={app.id} className="col-md-6 col-lg-4 mb-3">
                          <div className="card bg-[#111625] border border-white/[0.06] rounded-2xl p-4 h-100 flex flex-col justify-between hover:border-[#3B82F6] transition-all duration-200 group relative">
                            
                            <div>
                              {/* Header Card: Icon & Compatibility badges */}
                              <div className="flex items-start justify-between mb-3">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                                  eligible ? 'bg-blue-500/10 text-[#3B82F6]' : 'bg-white/5 text-slate-400'
                                }`}>
                                  <IconComponent className="w-5 h-5" />
                                </div>
                                
                                <div className="text-right">
                                  <span className="text-[8px] uppercase tracking-wider font-bold block text-slate-400 mb-1">{app.category}</span>
                                  {installed ? (
                                    <span className="badge badge-success bg-[#22C55E]/12 text-[#22C55E] text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Ativo ✔</span>
                                  ) : eligible ? (
                                    <span className="badge badge-primary bg-blue-500/10 text-[#3B82F6] text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Compatível</span>
                                  ) : (
                                    <span className="badge badge-warning bg-[#F59E0B]/12 text-[#FB923C] text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center space-x-1">
                                      <Lock className="w-2.5 h-2.5" />
                                      <span>Upgrade</span>
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Title, rating and description */}
                              <div className="space-y-1">
                                <h3 className="text-sm font-bold text-white mb-0">{app.name}</h3>
                                <div className="flex items-center space-x-2">
                                  <span className="text-[#F59E0B] font-semibold text-[10px]">★ {app.rating}</span>
                                  <span className="text-[9px] text-slate-400">({app.downloads}+ empresas)</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-2 mb-3 leading-relaxed min-h-[40px]">{app.desc}</p>
                              </div>

                              {/* Features Checklist */}
                              <div className="p-3 rounded-xl bg-[#0D111D]/80 border border-white/[0.06] mb-3">
                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-2">O que inclui:</span>
                                <ul className="space-y-1.5 pl-0 mb-0 list-unstyled text-[10px]">
                                  {app.features.slice(0, 3).map((feat, idx) => (
                                    <li key={idx} className="flex items-center space-x-1.5 text-slate-400">
                                      <CheckCircle className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                                      <span className="text-slate-300">{feat}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Button actions footer */}
                            <div className="flex items-center space-x-2 mt-2">
                              <button 
                                onClick={() => setSelectedApp(app)}
                                className="bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-semibold px-3 py-2 rounded-xl flex-1 border border-white/10 cursor-pointer transition-all"
                              >
                                Ver Detalhes
                              </button>

                              {installed ? (
                                <button 
                                  disabled 
                                  className="py-2 px-3 bg-white/5 text-slate-500 text-xs font-semibold rounded-xl cursor-not-allowed border border-white/5"
                                  title="Módulo Instalado"
                                >
                                  Ativo
                                </button>
                              ) : installing ? (
                                <button 
                                  disabled 
                                  className="py-2 px-3 bg-white/5 text-slate-400 text-xs font-semibold rounded-xl border border-white/5"
                                >
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                </button>
                              ) : eligible ? (
                                <button 
                                  onClick={() => handleInstallApp(app.id, app.name)}
                                  className="btn btn-primary py-2 px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-xl border-0 cursor-pointer shadow-sm transition-all"
                                >
                                  Instalar
                                </button>
                              ) : (
                                <button 
                                  onClick={() => {
                                    navigateTo('/planos');
                                    triggerToast("Upgrade Necessário", `O plano atual não dá suporte ao módulo ${app.name}.`, "warning");
                                  }}
                                  className="py-2 px-3 bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white text-xs font-semibold rounded-xl border-0 cursor-pointer shadow-sm transition-all"
                                >
                                  Upgrade
                                </button>
                              )}
                            </div>

                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* 5. HTML APP DETAILS DIALOG MODAL */}
                {selectedApp && (
                  <div className="modal-backdrop fade show" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div className="card bg-[#111625] border border-white/10 w-100 max-w-2xl rounded-2xl overflow-hidden shadow-2xl animate-scaleUp" style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                      
                      {/* Modal Header */}
                      <div className="p-4 border-b border-white/[0.06] flex items-start justify-between bg-[#161D33]">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-[#3B82F6]/10 rounded-2xl flex items-center justify-center text-[#3B82F6]">
                            {(() => {
                              const ModalIcon = selectedApp.icon;
                              return <ModalIcon className="w-7 h-7" />;
                            })()}
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{selectedApp.category}</span>
                            <h3 className="text-lg font-bold text-white mb-0">{selectedApp.name}</h3>
                            <div className="flex items-center space-x-2 mt-1 text-xs">
                              <span className="text-[#F59E0B] font-semibold">★ {selectedApp.rating}</span>
                              <span className="text-slate-400">({selectedApp.downloads}+ instalados)</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedApp(null)}
                          className="text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer p-1 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Modal Tabs Selector */}
                      <div className="flex border-b border-white/[0.06] px-4 bg-[#0D111D]/60 text-xs">
                        <button 
                          onClick={() => setAppDetailTab('overview')}
                          className={`px-3 py-3 border-b-2 ${appDetailTab === 'overview' ? 'border-[#3B82F6] font-bold text-[#3B82F6]' : 'border-transparent text-slate-400 hover:text-slate-200'} bg-transparent cursor-pointer mr-2 transition-colors`}
                        >
                          Visão Geral
                        </button>
                        <button 
                          onClick={() => setAppDetailTab('features')}
                          className={`px-3 py-3 border-b-2 ${appDetailTab === 'features' ? 'border-[#3B82F6] font-bold text-[#3B82F6]' : 'border-transparent text-slate-400 hover:text-slate-200'} bg-transparent cursor-pointer mr-2 transition-colors`}
                        >
                          Recursos & Avaliações
                        </button>
                        <button 
                          onClick={() => setAppDetailTab('plans')}
                          className={`px-3 py-3 border-b-2 ${appDetailTab === 'plans' ? 'border-[#3B82F6] font-bold text-[#3B82F6]' : 'border-transparent text-slate-400 hover:text-slate-200'} bg-transparent cursor-pointer transition-colors`}
                        >
                          Planos & Preços
                        </button>
                      </div>

                      {/* Modal Body */}
                      <div className="p-4 overflow-y-auto flex-1 text-xs space-y-4" style={{ maxHeight: '50vh' }}>
                        
                        {appDetailTab === 'overview' && (
                          <div className="space-y-4 animate-fadeIn">
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Sobre o Aplicativo</h4>
                              <p className="text-slate-400 leading-relaxed">{selectedApp.detailedDesc}</p>
                            </div>

                            {/* Screenshots mockup box */}
                            <div className="border border-white/[0.06] rounded-xl overflow-hidden bg-[#0D111D]/80 p-2 text-center">
                              <div className="rounded-lg border border-white/5 bg-[#0D111D] text-slate-400 p-4 flex flex-col items-center justify-center min-h-[140px]">
                                {(() => {
                                  const ScreenIcon = selectedApp.icon;
                                  return <ScreenIcon className="w-10 h-10 mb-2 text-[#3B82F6]" />;
                                })()}
                                <span className="font-semibold text-xs text-white">Interface do Módulo Comercial</span>
                                <span className="text-[10px] text-slate-400 mt-1">Painéis integrados, relatórios interativos e gráficos analíticos.</span>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Principais Benefícios</h4>
                              <ul className="space-y-2 pl-0 list-unstyled mb-0">
                                {selectedApp.benefits.map((b, idx) => (
                                  <li key={idx} className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                                    <span className="text-slate-300">{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {appDetailTab === 'features' && (
                          <div className="space-y-4 animate-fadeIn">
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Recursos Incluídos</h4>
                              <div className="row">
                                {selectedApp.features.map((feature, idx) => (
                                  <div key={idx} className="col-md-6 mb-2">
                                    <div className="p-2.5 rounded-xl border border-white/[0.06] bg-[#0D111D]/60 flex items-center space-x-2">
                                      <CheckCircle className="w-4 h-4 text-[#3B82F6]" />
                                      <span className="font-semibold text-white">{feature}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Avaliações do Ecossistema</h4>
                              <div className="p-3 rounded-xl border border-white/[0.06] bg-[#0D111D]/60">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-bold text-white">Vinicius C. (DiskIngressos)</span>
                                  <span className="text-[#F59E0B]">★★★★★ 5.0</span>
                                </div>
                                <p className="text-slate-400 mb-0 leading-relaxed">
                                  "Módulo muito completo e totalmente integrado. Reduziu nosso tempo de auditoria manual e melhorou as margens das nossas vendas locais."
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {appDetailTab === 'plans' && (
                          <div className="space-y-4 animate-fadeIn">
                            <div className="p-4 rounded-xl border border-white/[0.06] bg-[#0D111D]/60 flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-bold text-white mb-1">Plano Necessário: {selectedApp.planRequired === 'standard' ? 'Essencial' : selectedApp.planRequired === 'advanced' ? 'Profissional' : 'Premium'}</h4>
                                <p className="text-slate-400 mb-0">
                                  {isPlanEligible(selectedApp.planRequired) 
                                    ? "Seu plano atual é compatível com este aplicativo!" 
                                    : `Seu plano atual não dá suporte a este módulo. Faça upgrade para o plano ${selectedApp.planRequired === 'standard' ? 'Essencial' : selectedApp.planRequired === 'advanced' ? 'Profissional' : 'Premium'}.`}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="badge badge-success bg-[#22C55E]/12 text-[#22C55E] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                                  {selectedApp.planRequired === 'standard' ? 'Gratuito' : selectedApp.planRequired === 'advanced' ? 'Profissional' : 'Premium'}
                                </span>
                              </div>
                            </div>

                            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-center">
                              <Sparkles className="w-5 h-5 text-[#3B82F6] mx-auto mb-2" />
                              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Assinatura Anual & Economia</h4>
                              <p className="text-slate-400 mb-0 mt-1">Assine o plano {selectedApp.planRequired === 'standard' ? 'Essencial' : selectedApp.planRequired === 'advanced' ? 'Profissional' : 'Premium'} no ciclo anual e economize até 25% na mensalidade geral.</p>
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Modal Footer */}
                      <div className="p-4 border-t border-white/[0.06] flex items-center justify-end space-x-2 bg-[#0D111D]/60">
                        <button 
                          onClick={() => setSelectedApp(null)}
                          className="bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-semibold rounded-xl px-4 py-2 border border-white/10 cursor-pointer transition-all"
                        >
                          Fechar
                        </button>

                        {installedApps[selectedApp.id] === true ? (
                          <button 
                            disabled 
                            className="bg-white/5 text-slate-500 text-xs font-semibold rounded-xl px-4 py-2 border border-white/5 cursor-not-allowed"
                          >
                            Modulo Ja Instalado
                          </button>
                        ) : installedApps[selectedApp.id] === 'installing' ? (
                          <button 
                            disabled 
                            className="bg-white/5 text-slate-400 text-xs font-semibold rounded-xl px-4 py-2 border border-white/5 cursor-not-allowed"
                          >
                            <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5 inline" />
                            Instalando...
                          </button>
                        ) : isPlanEligible(selectedApp.planRequired) ? (
                          <button 
                            onClick={() => {
                              handleInstallApp(selectedApp.id, selectedApp.name);
                              setSelectedApp(null);
                            }}
                            className="btn btn-primary bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-xl px-4 py-2 border-0 cursor-pointer shadow-sm transition-all"
                          >
                            Instalar Modulo
                          </button>
                        ) : (
                          <button 
                            onClick={() => {
                              setSelectedApp(null);
                              navigateTo('/planos');
                              triggerToast("Upgrade de Plano", `Redirecionando para a pagina de Planos para adquirir ${selectedApp.name}.`);
                            }}
                            className="btn btn-primary bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white text-xs font-semibold rounded-xl px-4 py-2 border-0 cursor-pointer shadow-sm transition-all"
                          >
                            Fazer Upgrade do Plano
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                )}

              </div>
            );
}
