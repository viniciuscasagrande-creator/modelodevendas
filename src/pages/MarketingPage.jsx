import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import {
  Users,
  ShoppingBag,
  Brain,
  Plus,
  Percent,
  X,
  TrendingUp,
  Sparkles,
  Send,
  Lock,
  Megaphone
} from 'lucide-react';

export default function MarketingPage() {
  const {
    marketingSubTab,
    setMarketingSubTab,
    marketingActivePlan,
    setMarketingActivePlan,
    marketingModulesStatus,
    setMarketingModulesStatus,
    campaigns,
    setCampaigns,
    coupons,
    influencers,
    setInfluencers,
    loyaltyRules,
    setLoyaltyRules,
    showAddCampaignModal,
    setShowAddCampaignModal,
    newCampaign,
    setNewCampaign,
    showAddCouponModal,
    setShowAddCouponModal,
    newCoupon,
    setNewCoupon,
    handleCreateCampaign,
    handleCreateCoupon,
    triggerToast,
    theme,
    cardClass,
    bgCard,
    inputClass,
    borderCol,
    textTitle,
    textSec,
    bgInput,
    selectThemeText
  } = useDiskHub();

  const btnSecondary = theme === 'dark' 
    ? 'bg-[#1E293B] text-slate-350 hover:bg-[#273449] hover:text-white border-0 cursor-pointer' 
    : 'bg-slate-100 text-slate-650 hover:bg-slate-200 border border-slate-200 cursor-pointer';

  return (
    <>
      {(() => {
                    const modulesList = [
              { id: 1, plan: 'start', name: 'Módulo 1 – Divulgação Básica', desc: 'Publicação automática no site/app, agenda de eventos, página personalizada, compartilhamento social e link inteligente.' },
              { id: 2, plan: 'start', name: 'Módulo 2 – Social Starter', desc: '4 posts por mês, 8 stories, artes para divulgação, templates de Reels e banners promocionais.' },
              { id: 3, plan: 'profissional', name: 'Módulo 3 – Redes Sociais Integradas', desc: 'Facebook, Instagram, TikTok, LinkedIn, Threads, Google Business. Calendário editorial, Reels e vídeos.' },
              { id: 4, plan: 'profissional', name: 'Módulo 4 – Tráfego Pago', desc: 'Google, Meta, TikTok, YouTube Ads. Lookalike, remarketing, Pixels e Tag Manager com GA4 integrado.' },
              { id: 5, plan: 'profissional', name: 'Módulo 5 – CRM', desc: 'Cadastro automático, segmentação de base de dados, funil de vendas, e-mail marketing, SMS e WhatsApp.' },
              { id: 6, plan: 'premium', name: 'Módulo 6 – Inteligência Artificial', desc: 'IA para recomendação, público semelhante, melhor horário de postagem, previsão de vendas/lotação e preço inteligente.' },
              { id: 7, plan: 'premium', name: 'Módulo 7 – Influenciadores', desc: 'Busca automática, contratação, links rastreáveis, cupons exclusivos e rastreamento de ROI e vendas.' },
              { id: 8, plan: 'premium', name: 'Módulo 8 – Programa de Fidelidade', desc: 'Cashback de ingressos, pontos acumuláveis, VIP Club, missões para clientes e mecânicas de gamificação.' },
              { id: 9, plan: 'premium', name: 'Módulo 9 – Business Intelligence', desc: 'Painéis consolidados, visualização de conversão por canal de venda, ROI de campanhas e Benchmark.' },
              { id: 10, plan: 'premium', name: 'Módulo 10 – Automações de Fluxo', desc: 'Disparos automáticos por WhatsApp/SMS pós-compra, lembretes de carrinho abandonado e pesquisas NPS.' },
              { id: 11, plan: 'premium', name: 'Módulo 11 – Landing Pages', desc: 'Páginas exclusivas focadas em conversão, venda corporativa B2B, camarotes e formulários de captação de leads.' },
              { id: 12, plan: 'premium', name: 'Módulo 12 – Produção de Conteúdo', desc: 'Suporte à captação de imagem e vídeo, drone, making of do evento, lives e confecção de aftermovie profissional.' },
              { id: 13, plan: 'enterprise', name: 'Módulo 13 – Branding & Identidade', desc: 'Posicionamento estratégico, manual de marca completo, kit de vendas comercial e patrocínios.' },
              { id: 14, plan: 'enterprise', name: 'Módulo 14 – Assessoria de Imprensa', desc: 'Envio automático de releases para portais de notícias, contatos com TV, rádios e influenciadores de mídia local.' },
              { id: 15, plan: 'enterprise', name: 'Módulo 15 – Patrocínio Avançado', desc: 'Apresentações interativas, assessoria de captação via leis de incentivo (Rouanet) e relatórios de prestação de contas.' },
              { id: 16, plan: 'enterprise', name: 'Módulo 16 – Marketplace de Serviços', desc: 'Venda de produtos adicionais: alimentos, bebidas, copos ecológicos, estacionamento antecipado e experiências VIP.' },
              { id: 17, plan: 'enterprise', name: 'Módulo 17 – BI Executivo Financeiro', desc: 'Visualização macroeconômica: margem operacional de lote, despesas de infraestrutura e break-even reativo.' },
              { id: 18, plan: 'omnichannel', name: 'Módulo 18 – Omnichannel Integrado', desc: 'Conexão unificada: Site, App, PDV físico, totens eletrônicos, TV Indoor e painéis de LED da Arena.' },
              { id: 19, plan: 'omnichannel', name: 'Módulo 19 – Marketing Local', desc: 'Campanhas por proximidade geográfica via geolocalização no Waze, Google Maps e notificações push.' },
              { id: 20, plan: 'omnichannel', name: 'Módulo 20 – Central de Campanhas', desc: 'Ferramenta avançada para cupons flexíveis, indique-e-ganhe, flash sales de lote relâmpago e combos casados.' },
              { id: 21, plan: 'omnichannel', name: 'Módulo 21 – Analytics 360', desc: 'Controle de LTV/CAC em tempo real, fluxo de vendas por minuto, mapa de calor de compradores e jornada 360.' }
            ];

            const applyPlanModules = (planId) => {
              setMarketingActivePlan(planId);
              setMarketingModulesStatus(prev => {
                const updated = { ...prev };
                modulesList.forEach(m => {
                  if (planId === 'start') {
                    updated[m.id] = (m.plan === 'start');
                  } else if (planId === 'profissional') {
                    updated[m.id] = (m.plan === 'start' || m.plan === 'profissional');
                  } else if (planId === 'premium') {
                    updated[m.id] = (m.plan === 'start' || m.plan === 'profissional' || m.plan === 'premium');
                  } else if (planId === 'enterprise') {
                    updated[m.id] = (m.plan === 'start' || m.plan === 'profissional' || m.plan === 'premium' || m.plan === 'enterprise');
                  } else if (planId === 'omnichannel') {
                    updated[m.id] = true;
                  }
                });
                return updated;
              });
              triggerToast("Mudar Plano", `Plano alterado para ${planId.toUpperCase()}. Módulos licenciados atualizados.`);
            };

            const toggleModuleDirect = (modId) => {
              setMarketingModulesStatus(prev => ({
                ...prev,
                [modId]: !prev[modId]
              }));
              triggerToast("Configuração MaaS", `Módulo ${modId} alterado manualmente.`);
            };


            const handleSimulateAi = () => {
              setAiOutputs({
                bestTime: ["Quinta-feira às 20:00", "Segunda-feira às 18:00", "Domingo às 15:30"][Math.floor(Math.random()*3)],
                salesForecast: `Faltam apenas 120 ingressos para mudar o lote. Projeção de virada de lote em ${Math.floor(Math.random()*24) + 12} horas.`,
                smartPrice: `R$ ${(Math.random()*80 + 120).toFixed(2)} (Margem baseada no lote atual)`,
                occupancy: `${Math.floor(Math.random()*20) + 78}% de ocupação estimada para o local`,
                sentiment: { pos: Math.floor(Math.random()*15) + 80, neu: Math.floor(Math.random()*5) + 5, neg: Math.floor(Math.random()*5) }
              });
              triggerToast("Inteligência Artificial", "Previsões de mercado e recomendação de IA recalculadas.");
            };

            const renderModuleLock = (moduleIds, _title) => {
              const active = moduleIds.every(id => marketingModulesStatus[id]);
              if (!active) {
                return (
                  <div className={`card ${cardClass} border-dashed border-[#F59E0B]/50 p-5 text-center flex flex-col items-center justify-center space-y-3 my-4`}>
                    <div className="w-12 h-12 rounded-full bg-[#F59E0B]/10 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-[#F59E0B]" />
                    </div>
                    <h4 className={`text-sm font-bold ${textTitle} mb-0`}>Módulo Bloqueado no Licenciamento</h4>
                    <p className={`text-xs ${textSec} max-w-md mx-auto mb-0`}>
                      Esta seção requer os seguintes módulos ativos: <br />
                      <strong>{moduleIds.map(id => modulesList.find(m => m.id === id)?.name).join(', ')}</strong>.
                    </p>
                    <button 
                      onClick={() => setMarketingSubTab('licensing')} 
                      className="btn btn-warning btn-sm bg-[#F59E0B] text-slate-900 border-0 px-4 py-2 font-bold text-xs rounded cursor-pointer mt-2"
                    >
                      Ativar Módulos no Painel MaaS
                    </button>
                  </div>
                );
              }
              return null;
            };

            return (
              <div className="space-y-4 animate-fadeIn">
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-bottom pb-3 border-slate-200 dark:border-white/5">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>DiskIngressos Marketing Hub</h2>
                      <span className="badge bg-[#3B82F6]/10 text-[#3B82F6] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#3B82F6]/20">MaaS</span>
                    </div>
                    <p className={`text-xs ${textSec} mb-0 italic`}>"Venda mais ingressos com inteligência, automação e marketing integrado."</p>
                  </div>
                  
                  <div className={`flex flex-wrap ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'} border ${borderCol} p-1 rounded-lg space-x-1 text-xs`}>
                    {[
                      { id: 'dashboard', label: 'Dashboard Performance' },
                      { id: 'campanhas', label: 'Central Campanhas' },
                      { id: 'ia_engine', label: 'Inteligência IA' },
                      { id: 'influencers', label: 'Influenciadores' },
                      { id: 'fidelidade', label: 'Fidelidade' },
                      { id: 'analytics360', label: 'Analytics 360 & BI' },
                      { id: 'licensing', label: 'Planos & Módulos MaaS' }
                    ].map(tab => (
                      <button 
                        key={tab.id}
                        onClick={() => setMarketingSubTab(tab.id)}
                        className={`px-3 py-1.5 rounded-md font-bold transition-all border-0 cursor-pointer ${
                          marketingSubTab === tab.id 
                            ? 'bg-[#F97316] text-white shadow-sm' 
                            : `${textSec} bg-transparent hover:text-slate-900 dark:hover:text-white`
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {marketingSubTab === 'licensing' && (
                  <div className="space-y-5 animate-fadeIn">
                    <div>
                      <h3 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-3`}>1. Planos de Comercialização MaaS</h3>
                      <div className="row g-3">
                        {[
                          { id: 'start', name: 'Essencial / Start', modules: 'Módulos 1 a 2', price: 'R$ 299/mês', desc: 'Pequenos produtores e eventos locais de até 1.000 ingressos.' },
                          { id: 'profissional', name: 'Profissional', modules: 'Módulos 1 a 5', price: 'R$ 799/mês', desc: 'Produtores em crescimento constante e casas de espetáculo regionais.' },
                          { id: 'premium', name: 'Premium', modules: 'Módulos 1 a 12', price: 'R$ 1.999/mês', desc: 'Grandes festivais, rodeios e promotores regionais robustos.' },
                          { id: 'enterprise', name: 'Enterprise', modules: 'Módulos 1 a 17', price: 'Sob Consulta', desc: 'Arenas, parques temáticos e corporações nacionais.' },
                          { id: 'omnichannel', name: 'Omnichannel', modules: 'Módulos 1 a 21', price: 'Customizado', desc: 'Integração completa de rede física e painéis eletrônicos.' }
                        ].map(pl => (
                          <div key={pl.id} className="col-lg">
                            <div className={`card ${cardClass} p-3 h-100 flex flex-col justify-between border-2 transition-all ${
                              marketingActivePlan === pl.id ? 'border-[#3B82F6] shadow bg-[#3B82F6]/5' : 'border-transparent'
                            }`}>
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className={`text-xs font-bold ${textTitle} mb-0`}>{pl.name}</h4>
                                  {marketingActivePlan === pl.id && (
                                    <span className="badge bg-[#3B82F6] text-white text-[8px] font-bold px-1.5 py-0.5 rounded">Ativo</span>
                                  )}
                                </div>
                                <span className={`text-[10px] ${textSec} block font-semibold mb-1`}>{pl.modules}</span>
                                <p className={`text-[9.5px] text-slate-400 leading-normal`}>{pl.desc}</p>
                              </div>
                              
                              <div className="mt-3">
                                <span className={`text-xs font-black ${textTitle} block mb-2`}>{pl.price}</span>
                                {marketingActivePlan !== pl.id ? (
                                  <button 
                                    onClick={() => applyPlanModules(pl.id)}
                                    className="btn btn-outline-primary btn-sm w-full text-[10px] py-1 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white bg-transparent rounded cursor-pointer"
                                  >
                                    Ativar Plano
                                  </button>
                                ) : (
                                  <button className="btn btn-primary btn-sm w-full text-[10px] py-1 bg-[#22C55E] text-white border-0 rounded cursor-not-allowed" disabled>
                                    Ativo
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-1`}>2. Controle dos Módulos MaaS (Ativação Granular)</h3>
                          <p className={`text-[10px] ${textSec} mb-0`}>Ative ou desative cada serviço contratado individualmente. O status de cada módulo afeta os recursos liberados no Hub.</p>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {Object.values(marketingModulesStatus).filter(Boolean).length} de 21 ativos
                        </span>
                      </div>

                      <div className="row g-2">
                        {['start', 'profissional', 'premium', 'enterprise', 'omnichannel'].map(tierName => {
                          const tierModules = modulesList.filter(m => m.plan === tierName);
                          return (
                            <div key={tierName} className="col-md-12 mb-3">
                              <div className={`p-2.5 rounded bg-slate-100/50 dark:bg-white/1 border ${borderCol} mb-2`}>
                                <h4 className={`text-[10px] font-bold ${textTitle} uppercase tracking-wide mb-0 flex justify-between`}>
                                  <span>Plano {tierName.toUpperCase()} - Módulos Licenciados</span>
                                  <span className="text-slate-400 font-normal">({tierModules.length} módulos)</span>
                                </h4>
                              </div>
                              <div className="row g-2">
                                {tierModules.map(mod => {
                                  const isActive = marketingModulesStatus[mod.id] === true;
                                  return (
                                    <div key={mod.id} className="col-lg-4 col-md-6">
                                      <div className={`card ${cardClass} p-3 flex flex-row items-start justify-between space-x-3 transition-all ${
                                        isActive ? 'border-l-4 border-l-[#22C55E]' : 'border-l-4 border-l-slate-400 opacity-60'
                                      }`}>
                                        <div className="flex-1">
                                          <h5 className={`text-[10.5px] font-bold ${textTitle} mb-1 flex items-center`}>
                                            {mod.name}
                                          </h5>
                                          <p className="text-[9.5px] text-slate-400 mb-0 leading-normal">{mod.desc}</p>
                                        </div>
                                        <div className="form-check form-switch pt-1">
                                          <input 
                                            type="checkbox" 
                                            checked={isActive} 
                                            onChange={() => toggleModuleDirect(mod.id)} 
                                            className="form-check-input cursor-pointer"
                                            style={{ width: '1.8em', height: '1em' }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {marketingSubTab === 'dashboard' && (() => {
                  const checkLock = renderModuleLock([1, 21], "Dashboard Geral");
                  if (checkLock) return checkLock;

                  return (
                    <div className="space-y-6 animate-fadeIn text-slate-800 dark:text-slate-200">
                      
                      {/* Top KPI Cards with Sparklines */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                          { title: 'Cliques no Link Único', value: '74.310', change: '+9.2%', trend: [20, 35, 25, 45, 30, 55, 45], color: '#3B82F6', icon: Users, desc: 'Cliques acumulados em redes sociais' },
                          { title: 'Taxa de Conversão', value: '6.58%', change: '+1.4%', trend: [30, 25, 40, 35, 50, 45, 60], color: '#10B981', icon: Percent, desc: 'Visita ➔ Ingresso Pago' },
                          { title: 'Ingressos via Campanhas', value: '4.890', change: '+22.1%', trend: [10, 20, 15, 30, 25, 40, 35], color: '#8B5CF6', icon: ShoppingBag, desc: 'Vendas rastreadas por UTMs' },
                          { title: 'ROI Médio MaaS', value: '480%', change: '+45%', trend: [25, 35, 30, 50, 45, 65, 55], color: '#F59E0B', icon: TrendingUp, desc: 'Retorno sobre investimento' }
                        ].map((kpi, idx) => {
                          const IconComponent = kpi.icon;
                          return (
                            <div key={idx} className={`card ${cardClass} p-4 relative overflow-hidden transition-all duration-300 hover:shadow-md border border-slate-200 dark:border-white/5`}>
                              <div className="flex justify-between items-start mb-2">
                                <div className="space-y-1">
                                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{kpi.title}</span>
                                  <span className={`text-2xl font-black ${textTitle} block`}>{kpi.value}</span>
                                </div>
                                <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400" style={{ color: kpi.color }}>
                                  <IconComponent className="w-4 h-4" />
                                </div>
                              </div>

                              {/* Custom Sparkline Chart */}
                              <div className="h-10 w-full mt-2">
                                <svg viewBox="0 0 100 30" className="w-full h-full overflow-hidden">
                                  <path
                                    d={`M ${kpi.trend.map((val, i) => `${(i * 100) / (kpi.trend.length - 1)} ${30 - val / 2.5}`).join(' L ')}`}
                                    fill="none"
                                    stroke={kpi.color}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>

                              <div className="mt-2.5 flex items-center justify-between text-[10px]">
                                <span className="text-emerald-500 font-bold">{kpi.change}</span>
                                <span className="text-slate-400 truncate max-w-[120px]">{kpi.desc}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Main Charts & Funnel Row */}
                      <div className="row g-4">
                        {/* Interactive Area Chart */}
                        <div className="col-lg-8">
                          <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                            <div className="border-b border-slate-100 dark:border-white/5 pb-3 mb-4 flex justify-between items-center">
                              <div>
                                <h4 className={`text-sm font-black ${textTitle} uppercase tracking-wider mb-1`}>Conversão e Faturamento das Campanhas (7 dias)</h4>
                                <p className={`text-xs ${textSec} mb-0`}>Histórico semanal de vendas rastreadas e volume de tráfego.</p>
                              </div>
                              <span className="badge bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full">Atualizado em Tempo Real</span>
                            </div>

                            {/* SVG Area Chart */}
                            <div className="w-full flex-1 flex flex-col justify-end">
                              <svg viewBox="0 0 500 150" className="w-full h-44 overflow-visible">
                                <defs>
                                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#F97316" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
                                  </linearGradient>
                                </defs>
                                {/* Grid lines */}
                                <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                                <line x1="0" y1="60" x2="500" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                                <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                                <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                                
                                {/* Area */}
                                <path d="M 0 120 Q 80 50 150 90 T 300 30 T 450 60 L 500 50 L 500 150 L 0 150 Z" fill="url(#areaGrad)" />
                                {/* Line */}
                                <path d="M 0 120 Q 80 50 150 90 T 300 30 T 450 60 L 500 50" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
                                
                                {/* Points & Tooltips */}
                                <g className="cursor-pointer group">
                                  <circle cx="150" cy="90" r="4.5" fill="#F97316" stroke="#fff" strokeWidth="1.5" />
                                  <text x="150" y="75" textAnchor="middle" className="text-[9px] font-mono fill-[#F97316] font-bold opacity-0 group-hover:opacity-100 transition-opacity">R$ 48K</text>
                                </g>
                                <g className="cursor-pointer group">
                                  <circle cx="300" cy="30" r="4.5" fill="#F97316" stroke="#fff" strokeWidth="1.5" />
                                  <text x="300" y="15" textAnchor="middle" className="text-[9px] font-mono fill-[#F97316] font-bold opacity-0 group-hover:opacity-100 transition-opacity">R$ 115K</text>
                                </g>
                                <g className="cursor-pointer group">
                                  <circle cx="450" cy="60" r="4.5" fill="#F97316" stroke="#fff" strokeWidth="1.5" />
                                  <text x="450" y="45" textAnchor="middle" className="text-[9px] font-mono fill-[#F97316] font-bold opacity-0 group-hover:opacity-100 transition-opacity">R$ 82K</text>
                                </g>
                              </svg>

                              {/* X Axis Labels */}
                              <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono mt-3 px-2">
                                <span>Segunda</span>
                                <span>Terça</span>
                                <span>Quarta</span>
                                <span>Quinta</span>
                                <span>Sexta</span>
                                <span>Sábado</span>
                                <span>Domingo</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Conversion Funnel */}
                        <div className="col-lg-4">
                          <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                            <div className="border-b border-slate-100 dark:border-white/5 pb-3 mb-4">
                              <h4 className={`text-sm font-black ${textTitle} uppercase tracking-wider mb-1`}>Funil de Vendas de Marketing</h4>
                              <p className={`text-xs ${textSec} mb-0`}>Taxa de conversão por etapa da campanha.</p>
                            </div>

                            <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                              {[
                                { stage: 'Visualizações (Site/App)', count: '458.200', pct: '100%', bg: 'bg-slate-400 dark:bg-slate-500' },
                                { stage: 'Cliques no Link', count: '74.310', pct: '16.2%', bg: 'bg-blue-500' },
                                { stage: 'Checkout Iniciado', count: '18.420', pct: '4.0%', bg: 'bg-indigo-500' },
                                { stage: 'Ingressos Pagos', count: '4.890', pct: '1.06%', bg: 'bg-[#F97316]' }
                              ].map((f, fIdx) => (
                                <div key={fIdx} className="space-y-1">
                                  <div className="flex justify-between text-[10px] font-bold">
                                    <span className={textTitle}>{f.stage}</span>
                                    <span className="font-mono text-slate-400">{f.count} ({f.pct})</span>
                                  </div>
                                  <div className="progress rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800" style={{ height: '8px' }}>
                                    <div className={`progress-bar ${f.bg} h-full rounded-lg`} style={{ width: f.pct }}></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom row: Campaign list & AI Suggestions */}
                      <div className="row g-4">
                        {/* Table List of Campaigns */}
                        <div className="col-lg-8">
                          <div className={`card ${cardClass} p-4`}>
                            <div className="border-b border-slate-100 dark:border-white/5 pb-3 mb-4 flex justify-between items-center">
                              <h4 className={`text-sm font-black ${textTitle} uppercase tracking-wider mb-0`}>Monitoramento Geral de Campanhas Ativas</h4>
                              <span className="text-[10px] text-slate-400 font-mono">Status em Tempo Real</span>
                            </div>

                            <div className="table-responsive">
                              <table className="table text-xs mb-0 align-middle">
                                <thead>
                                  <tr className={`border-bottom ${borderCol} text-slate-400 font-semibold text-[9.5px] uppercase`}>
                                    <th className="pb-2 border-0">Campanha</th>
                                    <th className="pb-2 border-0">Canal</th>
                                    <th className="pb-2 border-0 text-center">Disparos</th>
                                    <th className="pb-2 border-0 text-center">Abertura</th>
                                    <th className="pb-2 border-0 text-center">Cliques</th>
                                    <th className="pb-2 border-0 text-right">Vendas</th>
                                    <th className="pb-2 border-0 text-right">Faturamento</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {campaigns.slice(0, 5).map(c => (
                                    <tr key={c.id} className={`border-bottom ${borderCol}/40 hover:bg-slate-50/10`}>
                                      <td className="py-2.5 border-0">
                                        <span className={`font-bold ${textTitle} block`}>{c.name}</span>
                                        <span className="text-[9px] text-slate-400 block">{c.audience || 'Público Geral'}</span>
                                      </td>
                                      <td className="py-2.5 border-0">
                                        <span className="badge bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-350 font-mono text-[9px] px-2.5 py-0.5 rounded-full">
                                          {c.channel}
                                        </span>
                                      </td>
                                      <td className="py-2.5 border-0 text-center font-mono text-slate-500">{c.sent.toLocaleString()}</td>
                                      <td className="py-2.5 border-0 text-center text-[#22C55E] font-bold font-mono">{c.openRate}%</td>
                                      <td className="py-2.5 border-0 text-center font-mono text-slate-500">
                                        {((c.sent * c.clickRate) / 100).toFixed(0)} ({c.clickRate}%)
                                      </td>
                                      <td className="py-2.5 border-0 text-right font-semibold text-blue-500">{c.conversions}</td>
                                      <td className="py-2.5 border-0 text-right font-black text-[#22C55E]">R$ {c.revenue.toLocaleString()}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        {/* AI Recommendations & Actions */}
                        <div className="col-lg-4">
                          <div className={`card ${cardClass} p-4 space-y-4`}>
                            <div className="border-b border-slate-100 dark:border-white/5 pb-3">
                              <h4 className={`text-sm font-black ${textTitle} uppercase tracking-wider mb-1 flex items-center space-x-1.5`}>
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                <span>IA Copilot Recomendações</span>
                              </h4>
                              <p className={`text-xs ${textSec} mb-0`}>Insights preditivos baseados nas vendas locais de Curitiba.</p>
                            </div>

                            <div className="space-y-3">
                              <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 space-y-1">
                                <span className="text-[10px] font-bold text-amber-500 uppercase block">Gatilho de Escassez Lote 2</span>
                                <p className="text-[10.5px] leading-relaxed text-slate-600 dark:text-slate-300 mb-0">
                                  O Lote Pista VIP do **Festival de Inverno Curitiba** atingiu 92% da capacidade limite. Agende um disparo de "Últimos Ingressos" via WhatsApp para o público semelhante.
                                </p>
                              </div>

                              <div className="p-3 rounded-lg border border-blue-500/20 bg-blue-500/5 space-y-1">
                                <span className="text-[10px] font-bold text-blue-500 uppercase block">Otimização de CPC (Meta Ads)</span>
                                <p className="text-[10.5px] leading-relaxed text-slate-600 dark:text-slate-300 mb-0">
                                  O custo por clique nos stories do **Metal Fest 2026** caiu 15%. É recomendado mover R$ 2.000 do orçamento de remarketing geral para esta campanha de atração.
                                </p>
                              </div>
                            </div>

                            <button onClick={() => setMarketingSubTab('campanhas')} className="btn btn-primary w-full py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-lg border-0 cursor-pointer transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-[#F97316]/20">
                              <Megaphone className="w-3.5 h-3.5" />
                              <span>Configurar Nova Ação de Vendas</span>
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })()}

                {marketingSubTab === 'campanhas' && (() => {
                  const checkLock = renderModuleLock([5, 20], "Central de Campanhas");
                  if (checkLock) return checkLock;

                  const playbookCategories = [
                    {
                      title: '🎯 1. Pré-Venda & Escassez',
                      desc: 'Desperte desejo e exclusividade logo no lançamento do show.',
                      color: '#F97316',
                      accent: 'bg-[#F97316]',
                      strategies: [
                        {
                          name: 'Listas VIP no WhatsApp',
                          desc: 'Acesso antecipado com desconto exclusivo nos grupos de maior engajamento.',
                          channel: 'WhatsApp',
                          templateName: 'Lista VIP WhatsApp - Pré-Venda Artista'
                        },
                        {
                          name: 'Ingressos Early Bird (Lote Cego)',
                          desc: 'Primeiro lote promocional de curtíssima duração para criar senso de imediatismo.',
                          channel: 'E-mail',
                          templateName: 'Lote Early Bird - Lançamento Exclusivo'
                        }
                      ]
                    },
                    {
                      title: '📈 2. Tráfego Pago & Ads',
                      desc: 'Alavanque alcance e atinja quem realmente busca seu artista.',
                      color: '#3B82F6',
                      accent: 'bg-blue-500',
                      strategies: [
                        {
                          name: 'Meta Ads (Instagram Reels)',
                          desc: 'Criativos em vídeo e stories segmentados por gênero e região.',
                          channel: 'Instagram Ads',
                          templateName: 'Meta Ads - Divulgação Instagram Reels'
                        },
                        {
                          name: 'Google Ads (Fundo de Funil)',
                          desc: 'Capture buscas ativas por "ingresso" e nome do show no buscador.',
                          channel: 'Google Ads',
                          templateName: 'Google Search Ads - Fundo de Funil'
                        },
                        {
                          name: 'Remarketing de Checkout',
                          desc: 'Re-impacte clientes que iniciaram compra mas abandonaram o carrinho.',
                          channel: 'Google Ads',
                          templateName: 'Remarketing Dinâmico - Abandono de Checkout'
                        }
                      ]
                    },
                    {
                      title: '📣 3. Influência & Parcerias',
                      desc: 'Utilize a autoridade de embaixadores locais para vender.',
                      color: '#8B5CF6',
                      accent: 'bg-purple-500',
                      strategies: [
                        {
                          name: 'Embaixadores (Cupom VIP)',
                          desc: 'Parcerias com influenciadores do gênero oferecendo códigos comissionados.',
                          channel: 'Instagram Ads',
                          templateName: 'Campanha Embaixadores - Cupom Afiliado'
                        },
                        {
                          name: 'Collabs de Co-Autoria',
                          desc: 'Posts divididos entre o perfil oficial do show, marcas e artistas.',
                          channel: 'Instagram Ads',
                          templateName: 'Collab Instagram - Post Duplo Artista'
                        }
                      ]
                    },
                    {
                      title: '🎬 4. Engajamento & Conteúdo',
                      desc: 'Comunique a experiência e os bastidores do evento.',
                      color: '#10B981',
                      accent: 'bg-emerald-500',
                      strategies: [
                        {
                          name: 'Reels / TikTok Trends',
                          desc: 'Bastidores da montagem do palco, convites em vídeo e desafios de setlist.',
                          channel: 'Instagram Ads',
                          templateName: 'Trends Reels/TikTok - Bastidores do Show'
                        },
                        {
                          name: 'Lives de Aquecimento',
                          desc: 'Lives rápidas de 15 minutos com os músicos dias antes de abrir vendas.',
                          channel: 'WhatsApp',
                          templateName: 'Disparo Live - Aquecimento ao Vivo'
                        },
                        {
                          name: 'Sorteios VIP (Meet & Greet)',
                          desc: 'Sorteio de camarim virtual para aumentar compartilhamentos e menções.',
                          channel: 'E-mail',
                          templateName: 'Sorteio Promocional - Meet & Greet VIP'
                        }
                      ]
                    },
                    {
                      title: '📧 5. Funis Automatizados',
                      desc: 'E-mail e mensagens diretas automáticas para conversão instantânea.',
                      color: '#EC4899',
                      accent: 'bg-pink-500',
                      strategies: [
                        {
                          name: 'Reativação de Compradores',
                          desc: 'Oferta especial de lote secreto enviada para quem comprou shows passados.',
                          channel: 'E-mail',
                          templateName: 'Reativação Base - Desconto Clientes Antigos'
                        },
                        {
                          name: 'Carrinho Abandonado (SMS/WA)',
                          desc: 'Mensagem automatizada lembrando que os ingressos expiram em 2 horas.',
                          channel: 'SMS',
                          templateName: 'Carrinho Abandonado - Lembrete Final de Lote'
                        }
                      ]
                    }
                  ];

                  const loadStrategy = (strat) => {
                    const nameInput = document.getElementById('camp-form-name');
                    const channelSelect = document.getElementById('camp-form-channel');
                    if (nameInput) nameInput.value = strat.templateName;
                    if (channelSelect) channelSelect.value = strat.channel;
                    triggerToast("Estratégia Selecionada", `Modelo "${strat.name}" carregado. Dispare abaixo.`);
                    nameInput.focus();
                  };

                  return (
                    <div className="space-y-6 animate-fadeIn text-slate-800 dark:text-slate-200">
                      
                      {/* Dashboard Metrics Header */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className={`card ${cardClass} p-4 relative overflow-hidden transition-all duration-300 hover:shadow-md border-b-4 border-b-[#F97316]`}>
                          <div className="flex justify-between items-start">
                            <div className="space-y-1.5">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Faturamento</span>
                              <span className={`text-2xl font-black ${textTitle} block`}>R$ 599.700,00</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-[#F97316]/10 text-[#F97316]">
                              <TrendingUp className="w-5 h-5" />
                            </div>
                          </div>
                          <div className="mt-3 flex items-center space-x-1">
                            <span className="text-[10px] text-emerald-500 font-bold">▲ +18.4%</span>
                            <span className="text-[10px] text-slate-400">em relação ao mês anterior</span>
                          </div>
                        </div>

                        <div className={`card ${cardClass} p-4 relative overflow-hidden transition-all duration-300 hover:shadow-md border-b-4 border-b-slate-200 dark:border-b-white/10`}>
                          <div className="flex justify-between items-start">
                            <div className="space-y-1.5">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Conversão Ingressos</span>
                              <span className={`text-2xl font-black ${textTitle} block`}>4.960 un</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-slate-500/10 text-slate-500">
                              <Users className="w-5 h-5" />
                            </div>
                          </div>
                          <div className="mt-3 flex items-center space-x-1">
                            <span className="text-[10px] text-emerald-500 font-bold">12.8%</span>
                            <span className="text-[10px] text-slate-400">taxa média de conversão</span>
                          </div>
                        </div>

                        <div className={`card ${cardClass} p-4 relative overflow-hidden transition-all duration-300 hover:shadow-md border-b-4 border-b-emerald-500`}>
                          <div className="flex justify-between items-start">
                            <div className="space-y-1.5">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Retorno (ROI)</span>
                              <span className={`text-2xl font-black ${textTitle} block`}>435% ROI</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                              <Percent className="w-5 h-5" />
                            </div>
                          </div>
                          <div className="mt-3 flex items-center space-x-1">
                            <span className="text-[10px] text-emerald-500 font-bold">Excelente</span>
                            <span className="text-[10px] text-slate-400">retorno sobre ad spend</span>
                          </div>
                        </div>

                        <div className={`card ${cardClass} p-4 relative overflow-hidden transition-all duration-300 hover:shadow-md border-b-4 border-b-slate-200 dark:border-b-white/10`}>
                          <div className="flex justify-between items-start">
                            <div className="space-y-1.5">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Alcance Estimado</span>
                              <span className={`text-2xl font-black ${textTitle} block`}>198K</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-slate-500/10 text-slate-500">
                              <Send className="w-5 h-5" />
                            </div>
                          </div>
                          <div className="mt-3 flex items-center space-x-1">
                            <span className="text-[10px] text-slate-400">WhatsApp, E-mail e SMS ativos</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Workspace Row */}
                      <div className="row g-4">
                        {/* Playbook - Guia Estratégico */}
                        <div className="col-lg-8">
                          <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                            <div className="border-b border-slate-100 dark:border-white/5 pb-3 mb-4 flex justify-between items-center">
                              <div>
                                <h4 className={`text-sm font-black ${textTitle} uppercase tracking-wider mb-1 flex items-center space-x-2`}>
                                  <Sparkles className="w-4 h-4 text-blue-500" />
                                  <span>Roteiro de Esgotamento de Bilheteria</span>
                                </h4>
                                <p className={`text-xs ${textSec} mb-0`}>Siga a jornada recomendada de marketing para atingir sold out rapidamente.</p>
                              </div>
                              <span className="badge bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/20 font-bold text-[9px] px-2.5 py-1 rounded-full">Visual Playbook Active</span>
                            </div>

                            <div className="space-y-6">
                              {playbookCategories.map((cat, idx) => (
                                <div key={idx} className="relative pl-9 border-l-2 border-slate-200 dark:border-white/5 pb-6 last:pb-0">
                                  {/* Timeline Dot Step Indicator */}
                                  <div 
                                    className="absolute left-0 top-0 -translate-x-[17px] w-8 h-8 rounded-full border-2 text-white flex items-center justify-center font-bold text-xs shadow-sm"
                                    style={{ 
                                      backgroundColor: '#F97316', 
                                      borderColor: theme === 'dark' ? '#090A0F' : '#ffffff' 
                                    }}
                                  >
                                    {idx + 1}
                                  </div>
                                  
                                  {/* Step details */}
                                  <div className="space-y-3">
                                    <div className="pl-1">
                                      <h5 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-0.5`}>
                                        {cat.title}
                                      </h5>
                                      <p className="text-[10.5px] text-slate-700 dark:text-slate-300 mb-0 font-semibold">
                                        {cat.desc}
                                      </p>
                                    </div>
                                    
                                    {/* Strategy Cards Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                      {cat.strategies.map((strat, sIdx) => (
                                        <div 
                                          key={sIdx} 
                                          className="p-3.5 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3"
                                          style={{ backgroundColor: theme === 'dark' ? '#131520' : '#ffffff' }}
                                        >
                                          <div>
                                            <div className="flex justify-between items-start mb-1.5 gap-2">
                                              <span className={`text-[11px] font-black ${textTitle} leading-snug`}>
                                                {strat.name}
                                              </span>
                                              <span className="badge bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 font-mono text-[8.5px] font-bold px-2 py-0.5 rounded-full shrink-0">
                                                {strat.channel}
                                              </span>
                                            </div>
                                            <p className="text-[10.5px] text-slate-800 dark:text-slate-200 leading-relaxed mb-0 font-medium">
                                              {strat.desc}
                                            </p>
                                          </div>
                                          
                                          <button
                                            type="button"
                                            onClick={() => loadStrategy(strat)}
                                            className="btn btn-xs py-1.5 px-3 bg-[#F97316] text-white hover:bg-[#EA580C] rounded-lg border-0 text-[9.5px] font-black cursor-pointer transition-all flex items-center space-x-1.5 shadow-sm shadow-[#F97316]/20 self-start"
                                          >
                                            <Send className="w-3 h-3" />
                                            <span>Usar Modelo</span>
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Criador de Campanhas */}
                        <div className="col-lg-4">
                          <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between bg-gradient-to-b from-white to-slate-50/30 dark:from-slate-900 dark:to-slate-900/50`}>
                            <div className="border-b border-slate-150 dark:border-white/5 pb-3 mb-4">
                              <h4 className={`text-sm font-black ${textTitle} uppercase tracking-wider mb-1 flex items-center space-x-1.5`}>
                                <Megaphone className="w-4 h-4 text-blue-500" />
                                <span>Criador de Campanhas</span>
                              </h4>
                              <p className={`text-xs ${textSec} mb-0`}>Revise o modelo selecionado e efetue o disparo de vendas.</p>
                            </div>

                            <form onSubmit={(e) => {
                              e.preventDefault();
                              const data = new FormData(e.target);
                              const name = data.get('name') || 'Nova Campanha';
                              const channel = data.get('channel') || 'WhatsApp';
                              
                              const newCamp = {
                                id: `camp-${Date.now()}`,
                                name,
                                channel,
                                sent: Math.floor(Math.random()*15000) + 2000,
                                openRate: (Math.random()*30 + 70).toFixed(1),
                                clickRate: (Math.random()*12 + 8).toFixed(1),
                                conversions: Math.floor(Math.random()*400) + 60,
                                revenue: Math.floor(Math.random()*60000) + 8000,
                                status: 'Ativa',
                                date: new Date().toLocaleDateString(),
                                roi: Math.floor(Math.random()*300) + 200,
                                audience: 'Público Alvo Selecionado'
                              };

                              setCampaigns(prev => [newCamp, ...prev]);
                              triggerToast("Campanha Iniciada", `Campanha "${name}" foi disparada pelo canal ${channel}.`);
                              e.target.reset();
                            }} className="space-y-4 text-xs flex-1 flex flex-col justify-between">
                              <div className="space-y-3.5">
                                <div>
                                  <label className={`text-[10px] font-bold ${textSec} uppercase block mb-1`}>Nome da Ação</label>
                                  <input id="camp-form-name" type="text" name="name" placeholder="Ex: Black Friday Pista VIP" className={`form-control ${inputClass} text-xs p-3 rounded-lg w-full bg-transparent`} required />
                                </div>

                                <div>
                                  <label className={`text-[10px] font-bold ${textSec} uppercase block mb-1`}>Canal de Comunicação</label>
                                  <select id="camp-form-channel" name="channel" className={`form-control form-select ${inputClass} text-xs p-3 rounded-lg w-full bg-transparent`}>
                                    <option value="WhatsApp">WhatsApp API</option>
                                    <option value="E-mail">E-mail Marketing</option>
                                    <option value="SMS">SMS Direto</option>
                                    <option value="Instagram Ads">Instagram Ads</option>
                                    <option value="Google Ads">Google Ads</option>
                                  </select>
                                </div>

                                <div>
                                  <label className={`text-[10px] font-bold ${textSec} uppercase block mb-1`}>Show Associado</label>
                                  <select name="targetEvent" className={`form-control form-select ${inputClass} text-xs p-3 rounded-lg w-full bg-transparent`}>
                                    {events.map(ev => (
                                      <option key={ev.id} value={ev.name}>{ev.name}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              <button type="submit" className="btn btn-primary w-full py-3 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg border-0 cursor-pointer transition-all shadow-md shadow-blue-500/10 mt-4 flex items-center justify-center space-x-1.5">
                                <Send className="w-3.5 h-3.5" />
                                <span>Iniciar Disparos em Lote</span>
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>

                      {/* History & Active Coupons Rows */}
                      <div className="row g-4">
                        {/* Listagem de campanhas */}
                        <div className="col-lg-8">
                          <div className={`card ${cardClass} p-4`}>
                            <div className="border-b border-slate-100 dark:border-white/5 pb-3 mb-4 flex justify-between items-center">
                              <h4 className={`text-sm font-black ${textTitle} uppercase tracking-wider mb-0`}>Histórico e Status das Campanhas ({campaigns.length})</h4>
                              <span className="text-[10px] text-slate-400 font-mono">Real-time stats</span>
                            </div>
                            <div className="table-responsive">
                              <table className="table text-xs mb-0 align-middle">
                                <thead>
                                  <tr className={`border-bottom ${borderCol} text-slate-400 font-semibold text-[9.5px] uppercase`}>
                                    <th className="pb-2 border-0">Campanha</th>
                                    <th className="pb-2 border-0">Canal</th>
                                    <th className="pb-2 border-0 text-center">Desempenho</th>
                                    <th className="pb-2 border-0 text-center">Status</th>
                                    <th className="pb-2 border-0 text-center">ROI</th>
                                    <th className="pb-2 border-0 text-right">Vendas</th>
                                    <th className="pb-2 border-0 text-right">Faturamento</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {campaigns.map(c => (
                                    <tr key={c.id} className={`border-bottom ${borderCol}/40 hover:bg-slate-50/10`}>
                                      <td className="py-3 border-0">
                                        <span className={`font-bold ${textTitle} block`}>{c.name}</span>
                                        <span className="text-[9px] text-slate-400 block">{c.audience || 'Público Geral'}</span>
                                      </td>
                                      <td className="py-3 border-0">
                                        <span className="badge bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-350 font-mono text-[9.5px] px-2.5 py-1 rounded-full">
                                          {c.channel}
                                        </span>
                                      </td>
                                      <td className="py-3 border-0 text-center text-slate-400">
                                        <span className={`font-bold ${textTitle}`}>{c.openRate}%</span>
                                        <span className="block text-[8px] text-slate-400">clique: {c.clickRate}%</span>
                                      </td>
                                      <td className="py-3 border-0 text-center">
                                        <span className={`badge ${c.status === 'Concluída' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#3B82F6]/10 text-[#3B82F6]'} text-[9px] font-bold px-2.5 py-1 rounded-full`}>
                                          {c.status}
                                        </span>
                                      </td>
                                      <td className="py-3 border-0 text-center">
                                        <span className="text-[#22C55E] font-mono font-black">{c.roi || '—'}%</span>
                                      </td>
                                      <td className="py-3 border-0 text-right font-semibold">{c.conversions}</td>
                                      <td className="py-3 border-0 text-right font-black text-[#22C55E]">R$ {c.revenue.toLocaleString()}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        {/* Cupons Promocionais */}
                        <div className="col-lg-4">
                          <div className={`card ${cardClass} p-4`}>
                            <div className="border-b border-slate-100 dark:border-white/5 pb-3 mb-4 flex justify-between items-center">
                              <h4 className={`text-sm font-black ${textTitle} uppercase tracking-wider mb-0`}>Cupons Promocionais</h4>
                              <button onClick={() => setShowAddCouponModal(true)} className="btn btn-primary btn-xs bg-blue-500 hover:bg-blue-600 border-0 px-3 py-1.5 text-[9.5px] rounded-lg font-bold cursor-pointer flex items-center space-x-1">
                                <Plus className="w-2.5 h-2.5" />
                                <span>Criar Cupom</span>
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-3">
                              {coupons.map(cp => (
                                <div key={cp.id} className="relative rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30 p-3.5 overflow-hidden flex justify-between items-center transition-all duration-300 hover:shadow-md">
                                  {/* Ticket Visual Cutouts */}
                                  <div className="absolute top-1/2 left-0 w-3 h-3 bg-[#F4F6F9] dark:bg-[#0F172A] rounded-full border-r border-slate-200 dark:border-white/5 -translate-y-1/2 -translate-x-1.5"></div>
                                  <div className="absolute top-1/2 right-0 w-3 h-3 bg-[#F4F6F9] dark:bg-[#0F172A] rounded-full border-l border-slate-200 dark:border-white/5 -translate-y-1/2 translate-x-1.5"></div>
                                  
                                  <div className="pl-2.5 space-y-1">
                                    <span className="font-mono font-black text-[13.5px] text-blue-500 block leading-none">{cp.code}</span>
                                    <span className="text-[10px] text-slate-400 block truncate max-w-[150px] leading-snug">{cp.event}</span>
                                    <span className="text-[9px] text-slate-500 block font-mono">{cp.usages} usos registrados</span>
                                  </div>
                                  
                                  <div className="text-right pr-2.5 space-y-1">
                                    <span className="text-[13px] font-black text-emerald-500 block leading-none">{cp.discount}% OFF</span>
                                    <button 
                                      onClick={() => {
                                        navigator.clipboard.writeText(cp.code);
                                        triggerToast("Copiado!", `Cupom "${cp.code}" copiado.`);
                                      }}
                                      className="btn btn-xs py-1 px-2.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded border-0 cursor-pointer text-[8px] font-bold transition-all"
                                    >
                                      Copiar
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })()}

                {marketingSubTab === 'ia_engine' && (() => {
                  const checkLock = renderModuleLock([6], "Inteligência Artificial");
                  if (checkLock) return checkLock;

                  return (
                    <div className="space-y-4 animate-fadeIn">
                      <div className={`card ${cardClass} p-4`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 border-bottom border-light/5 pb-3">
                          <div>
                            <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-1`}>IA Engine (Otimizador de Lançamentos)</h4>
                            <p className={`text-[10px] ${textSec} mb-0`}>Selecione um evento para carregar previsões operacionais de bilheteria e sentimentos.</p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <select 
                              value={selectedAiEvent} 
                              onChange={(e)=>setSelectedAiEvent(e.target.value)} 
                              className={`form-control form-select ${inputClass} text-xs p-2 rounded focus:outline-none`}
                            >
                              {events.map(ev=>(
                                  <option key={ev.id} value={ev.id}>{ev.name}</option>
                              ))}
                            </select>
                            <button 
                              onClick={handleSimulateAi}
                              className="btn btn-primary py-2 px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded border-0 cursor-pointer flex items-center space-x-1.5"
                            >
                              <Brain className="w-3.5 h-3.5" />
                              <span>Simular Predição</span>
                            </button>
                          </div>
                        </div>

                        <div className="row g-3">
                          <div className="col-md-6 col-lg-4">
                            <div className="p-3.5 rounded bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 h-100 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] font-bold text-slate-400 block uppercase mb-2">Melhor Horário para Postar / Disparar</span>
                                <h5 className={`text-sm font-black ${textTitle} mb-2`}>{aiOutputs.bestTime}</h5>
                                <p className="text-[10px] text-slate-400 mb-0 leading-relaxed">Calculado com base na taxa histórica de leitura de mensagens e cliques no app por parte dos compradores deste evento.</p>
                              </div>
                              <span className="text-[8px] font-mono text-slate-500 mt-3 block">IA - Módulo 6 Ativo</span>
                            </div>
                          </div>

                          <div className="col-md-6 col-lg-4">
                            <div className="p-3.5 rounded bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 h-100 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] font-bold text-slate-400 block uppercase mb-2">Preço Inteligente Recomendado</span>
                                <h5 className="text-sm font-black text-[#22C55E] mb-2">{aiOutputs.smartPrice}</h5>
                                <p className="text-[10px] text-slate-400 mb-0 leading-relaxed">Avaliação de elasticidade de preço de ingressos. O aumento de 10% no preço não afetará a velocidade de vendas do lote atual.</p>
                              </div>
                              <span className="text-[8px] font-mono text-slate-500 mt-3 block">IA - Otimizador de Receita</span>
                            </div>
                          </div>

                          <div className="col-md-6 col-lg-4">
                            <div className="p-3.5 rounded bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 h-100 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] font-bold text-slate-400 block uppercase mb-2">Previsão de Lotação & Velocidade</span>
                                <h5 className="text-sm font-black text-[#3B82F6] mb-2">{aiOutputs.occupancy}</h5>
                                <p className="text-[10px] text-slate-400 mb-0 leading-relaxed">{aiOutputs.salesForecast}</p>
                              </div>
                              <span className="text-[8px] font-mono text-slate-500 mt-3 block">IA - Previsão de Lote</span>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="p-4 rounded bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5">
                              <span className="text-[9px] font-bold text-slate-400 block uppercase mb-2">Análise de Sentimento das Redes Sociais</span>
                              <div className="row items-center">
                                <div className="col-md-4">
                                  <div className="flex items-center space-x-3">
                                    <span className="text-2xl font-black text-[#22C55E]">{aiOutputs.sentiment.pos}%</span>
                                    <div>
                                      <span className={`text-xs font-bold ${textTitle} block`}>Sentimento Positivo</span>
                                    <span className="text-[10px] text-slate-400">Interações e menções favoráveis</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-8 pt-2 md:pt-0">
                                  <div className="progress rounded bg-slate-200 dark:bg-white/12" style={{ height: '12px' }}>
                                    <div className="progress-bar bg-[#22C55E]" role="progressbar" style={{ width: `${aiOutputs.sentiment.pos}%` }}></div>
                                    <div className="progress-bar bg-slate-400" role="progressbar" style={{ width: `${aiOutputs.sentiment.neu}%` }}></div>
                                    <div className="progress-bar bg-[#EF4444]" role="progressbar" style={{ width: `${aiOutputs.sentiment.neg}%` }}></div>
                                  </div>
                                  <div className="flex space-x-3 mt-1.5 text-[9px] text-slate-400 font-mono">
                                    <span>● Positivo: {aiOutputs.sentiment.pos}%</span>
                                    <span>● Neutro: {aiOutputs.sentiment.neu}%</span>
                                    <span>● Negativo: {aiOutputs.sentiment.neg}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {marketingSubTab === 'influencers' && (() => {
                  const checkLock = renderModuleLock([7], "Influenciadores");
                  if (checkLock) return checkLock;

                  const handleHireInfluencer = (infId) => {
                    if (backendConnected) {
                      fetch(`http://localhost:3001/api/marketing/influencers/${infId}/hire`, {
                        method: 'POST'
                      }).catch(err => console.error('Error hiring influencer on API:', err));
                    }
                    setInfluencers(prev => prev.map(inf => {
                      if (inf.id === infId) {
                        const newHired = !inf.hired;
                        return {
                          ...inf,
                          hired: newHired,
                          activeCampaign: newHired ? 'Festival de Inverno Curitiba' : 'Nenhum',
                          roi: newHired ? '150%' : '0%',
                          codeSales: newHired ? Math.floor(Math.random()*150) + 20 : 0
                        };
                      }
                      return inf;
                    }));
                    triggerToast("Influencers", "Status de contratação alterado.");
                  };

                  return (
                    <div className="space-y-4 animate-fadeIn">
                      <div className={`card ${cardClass} p-4`}>
                        <div className="flex justify-between items-center mb-3 border-bottom border-light/5 pb-3">
                          <div>
                            <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-1`}>Módulo 7 - Painel MaaS Influenciadores</h4>
                            <p className={`text-[10px] ${textSec} mb-0`}>Contrate e gerencie influenciadores locais com cupons exclusivos. O ROI de vendas é medido em tempo real.</p>
                          </div>
                        </div>

                        <div className="table-responsive">
                          <table className="table text-xs mb-0">
                            <thead>
                              <tr className={`border-bottom ${borderCol} text-slate-400 font-semibold text-[9.5px] uppercase text-left`}>
                                <th className="pb-2 border-0">Nome do Influenciador</th>
                                <th className="pb-2 border-0">Categoria</th>
                                <th className="pb-2 border-0 text-center">Seguidores</th>
                                <th className="pb-2 border-0 text-right">Custo de Campanha</th>
                                <th className="pb-2 border-0">Campanha Ativa</th>
                                <th className="pb-2 border-0 font-mono">Cupom Exclusivo</th>
                                <th className="pb-2 border-0 text-center">Vendas Geradas</th>
                                <th className="pb-2 border-0 text-center">ROI</th>
                                <th className="pb-2 border-0 text-center">Ações</th>
                              </tr>
                            </thead>
                            <tbody>
                              {influencers.map(inf => (
                                <tr key={inf.id} className={`border-bottom ${borderCol}/40`}>
                                  <td className="py-3 border-0">
                                    <div className="flex items-center space-x-2">
                                      <div className="w-7 h-7 rounded-circle bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center font-bold text-xs">
                                        {inf.name[0]}
                                      </div>
                                      <span className={`font-bold ${textTitle}`}>{inf.name}</span>
                                    </div>
                                  </td>
                                  <td className="py-3 border-0 text-slate-400">{inf.genre}</td>
                                  <td className="py-3 border-0 text-center font-bold font-mono">{inf.followers}</td>
                                  <td className="py-3 border-0 text-right font-mono">R$ {inf.cachet.toLocaleString()}</td>
                                  <td className="py-3 border-0">
                                    <span className={`badge ${inf.activeCampaign !== 'Nenhum' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'bg-slate-400/10 text-slate-400'} text-[9px] px-2 py-0.5 rounded-full`}>
                                      {inf.activeCampaign}
                                    </span>
                                  </td>
                                  <td className="py-3 border-0 font-mono font-bold text-[#F59E0B]">{inf.coupon}</td>
                                  <td className="py-3 border-0 text-center font-bold">{inf.codeSales}</td>
                                  <td className="py-3 border-0 text-center text-[#22C55E] font-black font-mono">{inf.roi}</td>
                                  <td className="py-3 border-0 text-center">
                                    {inf.hired ? (
                                      <button 
                                        onClick={()=>handleHireInfluencer(inf.id)}
                                        className="btn btn-outline-danger btn-xs border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white bg-transparent px-2.5 py-1 text-[9px] rounded font-bold cursor-pointer"
                                      >
                                        Desvincular
                                      </button>
                                    ) : (
                                      <button 
                                        onClick={()=>handleHireInfluencer(inf.id)}
                                        className="btn btn-primary btn-xs bg-[#2563EB] text-white px-2.5 py-1 text-[9px] rounded font-bold border-0 cursor-pointer"
                                      >
                                        Vincular
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {marketingSubTab === 'fidelidade' && (() => {
                  const checkLock = renderModuleLock([8], "Fidelidade");
                  if (checkLock) return checkLock;

                  return (
                    <div className="row g-3 animate-fadeIn">
                      <div className="col-lg-4">
                        <div className={`card ${cardClass} p-4 space-y-4`}>
                          <div>
                            <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-1`}>Módulo 8 - Regras do Clube Fidelidade</h4>
                            <p className={`text-[10px] ${textSec} mb-0`}>Configure parâmetros de gamificação e cashback integrados ao checkout de ingressos.</p>
                          </div>

                          <div className="space-y-3 text-xs">
                            <div>
                              <label className={`text-[9px] font-bold ${textSec} uppercase block mb-1`}>Nome do Clube VIP</label>
                              <input 
                                type="text" 
                                value={loyaltyRules.vipClubName}
                                onChange={(e)=>setLoyaltyRules(prev=>({ ...prev, vipClubName: e.target.value }))}
                                className={`form-control ${inputClass} text-xs p-2.5 rounded w-full`} 
                              />
                            </div>

                            <div>
                              <label className={`text-[9px] font-bold ${textSec} uppercase block mb-1`}>Cashback nos Ingressos (%)</label>
                              <input 
                                type="number" 
                                value={loyaltyRules.cashbackPercentage}
                                onChange={(e)=>setLoyaltyRules(prev=>({ ...prev, cashbackPercentage: parseFloat(e.target.value) || 0 }))}
                                className={`form-control ${inputClass} text-xs p-2.5 rounded w-full`} 
                              />
                            </div>

                            <div>
                              <label className={`text-[9px] font-bold ${textSec} uppercase block mb-1`}>Pontos por Real Gasto (R$ 1)</label>
                              <input 
                                type="number" 
                                value={loyaltyRules.pointsPerReal}
                                onChange={(e)=>setLoyaltyRules(prev=>({ ...prev, pointsPerReal: parseInt(e.target.value) || 0 }))}
                                className={`form-control ${inputClass} text-xs p-2.5 rounded w-full`} 
                              />
                            </div>

                            <div>
                              <label className={`text-[9px] font-bold ${textSec} uppercase block mb-1`}>Mínimo de Pontos para Resgate</label>
                              <input 
                                type="number" 
                                value={loyaltyRules.minimumRedeemPoints}
                                onChange={(e)=>setLoyaltyRules(prev=>({ ...prev, minimumRedeemPoints: parseInt(e.target.value) || 0 }))}
                                className={`form-control ${inputClass} text-xs p-2.5 rounded w-full`} 
                              />
                            </div>

                            <button 
                              onClick={() => {
                                if (backendConnected) {
                                  fetch('http://localhost:3001/api/marketing/loyalty', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(loyaltyRules)
                                  }).catch(err => console.error('Error saving loyalty rules on API:', err));
                                }
                                triggerToast("Configurações Salvas", "Regras de fidelidade atualizadas no banco.");
                              }}
                              className="btn btn-primary w-full py-2 bg-[#22C55E] hover:bg-[#16a34a] text-white text-xs font-bold rounded border-0 cursor-pointer"
                            >
                              Salvar Configurações
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-8">
                        <div className={`card ${cardClass} p-4`}>
                          <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-3`}>Missões e Desafios para Clientes (Gamificação)</h4>
                          <div className="table-responsive">
                            <table className="table text-xs mb-0">
                              <thead>
                                <tr className={`border-bottom ${borderCol} text-slate-400 font-semibold text-[9.5px] uppercase text-left`}>
                                  <th className="pb-2 border-0">Desafio / Missão</th>
                                  <th className="pb-2 border-0">Regra de Conclusão</th>
                                  <th className="pb-2 border-0 text-center">Recompensa</th>
                                  <th className="pb-2 border-0 text-center">Status</th>
                                  <th className="pb-2 border-0 text-center">Ações</th>
                                </tr>
                              </thead>
                              <tbody>
                                {loyaltyRules.missions.map(m => (
                                  <tr key={m.id} className={`border-bottom ${borderCol}/40`}>
                                    <td className={`py-3 border-0 font-bold ${textTitle}`}>{m.title}</td>
                                    <td className="py-3 border-0 text-slate-400">{m.desc}</td>
                                    <td className="py-3 border-0 font-bold text-[#F59E0B]">{m.reward}</td>
                                    <td className="py-3 border-0 text-center">
                                      <span className={`badge ${m.status === 'Ativa' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-slate-400/10 text-slate-400'} text-[9px] px-2 py-0.5 rounded-full`}>
                                        {m.status}
                                      </span>
                                    </td>
                                    <td className="py-3 border-0 text-center">
                                      <button 
                                        onClick={() => {
                                          const updatedMissions = loyaltyRules.missions.map(mi => mi.id === m.id ? { ...mi, status: mi.status === 'Ativa' ? 'Inativa' : 'Ativa' } : mi);
                                          const updatedRules = {
                                            ...loyaltyRules,
                                            missions: updatedMissions
                                          };
                                          setLoyaltyRules(updatedRules);
                                          if (backendConnected) {
                                            fetch('http://localhost:3001/api/marketing/loyalty', {
                                              method: 'POST',
                                              headers: { 'Content-Type': 'application/json' },
                                              body: JSON.stringify(updatedRules)
                                            }).catch(err => console.error('Error toggling mission status on API:', err));
                                          }
                                          triggerToast("Missão Gamificada", "Status da missão alterado.");
                                        }}
                                        className="btn btn-outline-primary btn-xs border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white bg-transparent px-2 py-0.5 rounded text-[9px] cursor-pointer"
                                      >
                                        Alternar
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {marketingSubTab === 'analytics360' && (() => {
                  const checkLock = renderModuleLock([9, 21], "Analytics 360 & BI");
                  if (checkLock) return checkLock;

                  return (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="row g-3">
                        <div className="col-lg-6">
                          <div className={`card ${cardClass} p-4`}>
                            <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-3`}>Origem de Tráfego de Compradores (Módulo 21)</h4>
                            <div className="space-y-3 text-xs">
                              {[
                                { source: 'Meta Ads (Facebook/Instagram)', value: '42.500 cliques', share: '45%' },
                                { source: 'Acesso Direto (Site/App)', value: '28.100 cliques', share: '30%' },
                                { source: 'Google Search & Maps', value: '14.200 cliques', share: '15%' },
                                { source: 'Disparos WhatsApp / E-mail', value: '9.500 cliques', share: '10%' }
                              ].map((src, i) => (
                                <div key={i} className="space-y-1">
                                  <div className="flex justify-between text-[11px]">
                                    <span className={`font-bold ${textTitle}`}>{src.source}</span>
                                    <span className="font-mono text-slate-400">{src.value} ({src.share})</span>
                                  </div>
                                  <div className="progress rounded bg-slate-200 dark:bg-white/10" style={{ height: '8px' }}>
                                    <div className="progress-bar bg-[#3B82F6]" role="progressbar" style={{ width: src.share }}></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className={`card ${cardClass} p-4 flex flex-col justify-between`}>
                            <div>
                              <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-2`}>Fluxo de Vendas por Minuto (Real-time Analytics 360)</h4>
                              <p className={`text-[10px] ${textSec} mb-4`}>Monitoramento instantâneo do volume de transações por minuto nos servidores DiskHub.</p>
                            </div>
                            
                            <div className="flex items-end justify-between h-[120px] px-2 border-bottom border-light/10 pb-1">
                              {[35, 42, 28, 55, 62, 48, 74, 98, 88, 78, 65, 82, 91, 105, 94].map((h, i) => (
                                <div 
                                  key={i} 
                                  className="w-[5.5%] bg-[#22C55E] rounded-t hover:bg-[#16a34a] transition-all cursor-pointer relative group" 
                                  style={{ height: `${h}%` }}
                                >
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-mono p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mb-1">
                                    {h} tix/min
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-2">
                              <span>-15 min atrás</span>
                              <span>Tempo Real (Agora)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`card ${cardClass} p-4`}>
                        <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-1`}>Mapa de Calor de Concentração de Compradores (Geolocalização Módulo 19/21)</h4>
                        <p className={`text-[10px] ${textSec} mb-3`}>Visualização geográfica dos bairros e cidades com maior conversão de vendas para anúncios e tráfego local.</p>
                        
                        <div className="relative rounded border border-white/5 overflow-hidden bg-slate-900 flex items-center justify-center" style={{ height: '280px' }}>
                          <div className="absolute inset-0 opacity-15 flex flex-wrap gap-2 text-[6px] text-slate-500 font-mono select-none overflow-hidden">
                            {Array.from({ length: 50 }).map((_, i) => (
                              <div key={i} className="w-[18%] p-2 border border-slate-600 rounded">
                                Curitiba Map Sector - Loteamento #{i+100}
                              </div>
                            ))}
                          </div>
                          
                          <div className="absolute w-24 h-24 rounded-full bg-[#EF4444]/25 blur-xl animate-pulse" style={{ top: '25%', left: '35%' }}></div>
                          <div className="absolute w-36 h-36 rounded-full bg-[#EF4444]/20 blur-2xl animate-pulse" style={{ top: '40%', left: '55%' }}></div>
                          <div className="absolute w-16 h-16 rounded-full bg-[#EF4444]/30 blur-lg animate-pulse" style={{ top: '65%', left: '20%' }}></div>

                          <div className="absolute bg-slate-950/80 border border-[#EF4444]/50 rounded px-2 py-1 text-[9px] font-mono text-white flex items-center space-x-1.5" style={{ top: '30%', left: '38%' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-ping"></span>
                            <span>Pedreira Paulo Leminski (1.420 vendas)</span>
                          </div>
                          <div className="absolute bg-slate-950/80 border border-[#EF4444]/30 rounded px-2 py-1 text-[9px] font-mono text-white flex items-center space-x-1.5" style={{ top: '50%', left: '58%' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                            <span>Centro Cívico (980 vendas)</span>
                          </div>
                          <div className="absolute bg-slate-950/80 border border-[#3B82F6]/30 rounded px-2 py-1 text-[9px] font-mono text-white flex items-center space-x-1.5" style={{ top: '70%', left: '25%' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                            <span>Batel (510 vendas)</span>
                          </div>

                          <div className="z-10 text-center">
                            <span className="badge bg-slate-950 text-slate-400 font-mono text-[9px] p-2 border border-white/10 rounded">
                              ● SIMULAÇÃO DE MAPA DE CALOR COMPRADORES REAL-TIME ATIVO
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

              </div>
            );
      })()}

            {/* 3. CREATE COUPON MODAL */}
      {showAddCouponModal && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${bgCard} border ${borderCol} rounded w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp`}>
            <div className={`p-4 border-bottom ${borderCol} flex justify-between items-center ${bgCard}`}>
              <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Criar Cupom de Desconto</h3>
              <button onClick={() => setShowAddCouponModal(false)} className={`bg-transparent border-0 cursor-pointer ${textSec} ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-905'}`}>
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreateCoupon} className="p-4 space-y-3">
              <div className="form-group mb-2">
                <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Código do Cupom *</label>
                <input 
                  type="text" 
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, code: e.target.value }))}
                  placeholder="Ex: PROMO20"
                  className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle} uppercase tracking-wider font-mono`}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Percentual de Desconto (%) *</label>
                <input 
                  type="number" 
                  value={newCoupon.discount}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, discount: e.target.value }))}
                  placeholder="Ex: 20"
                  className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle} font-mono`}
                  min="1"
                  max="100"
                  required
                />
              </div>

              <div className="pt-3 flex space-x-3 justify-end border-top border-light/5 mt-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddCouponModal(false)}
                  className={`btn ${btnSecondary} text-xs font-semibold rounded py-2 px-3`}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary text-white text-xs font-semibold rounded py-2 px-3 border-0 bg-[#2563EB] hover:bg-[#1D4ED8]"
                >
                  Salvar Cupom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

            {/* 5. ADD CAMPAIGN MODAL */}
      {showAddCampaignModal && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${bgCard} border ${borderCol} rounded w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp`}>
            <div className={`p-4 border-bottom ${borderCol} flex justify-between items-center ${bgCard}`}>
              <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Criar Nova Campanha de Marketing</h3>
              <button onClick={() => setShowAddCampaignModal(false)} className={`bg-transparent border-0 cursor-pointer ${textSec} ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-905'}`}>
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreateCampaign} className="p-4 space-y-3">
              <div className="form-group mb-2">
                <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Nome da Campanha *</label>
                <input 
                  type="text" 
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Pré-venda Festival de Inverno"
                  className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle}`}
                  required
                />
              </div>

              <div className="row mb-2">
                <div className="col-6 form-group">
                  <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Canal de Disparo</label>
                  <select 
                    value={newCampaign.channel}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, channel: e.target.value }))}
                    className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${selectThemeText}`}
                  >
                    <option value="E-mail">E-mail</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="SMS">SMS</option>
                  </select>
                </div>
                <div className="col-6 form-group">
                  <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Data de Envio *</label>
                  <input 
                    type="text" 
                    value={newCampaign.date}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, date: e.target.value }))}
                    placeholder="20/07/2026"
                    className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle} font-mono`}
                    required
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Assunto / Conteúdo Notificação *</label>
                <input 
                  type="text" 
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Ex: Não perca! Lote exclusivo com 20% de desconto..."
                  className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle}`}
                  required
                />
              </div>

              <div className="pt-3 flex space-x-3 justify-end border-top border-light/5 mt-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddCampaignModal(false)}
                  className={`btn ${btnSecondary} text-xs font-semibold rounded py-2 px-3`}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary text-white text-xs font-semibold rounded py-2 px-3 border-0 bg-[#2563EB] hover:bg-[#1D4ED8]"
                >
                  Agendar Campanha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
