import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { Download } from 'lucide-react';

export default function AccountingPage() {
  const {
    accountingSubTab,
    setAccountingSubTab,
    contabilPlanoContas,
    contabilLancamentos,
    contabilAuditorias,
    theme,
    cardClass,
    borderCol,
    textTitle,
    textSec,
    textBody,
    triggerToast
  } = useDiskHub();

  return (
            <div className="space-y-4 animate-fadeIn">
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Contabilidade Disk</h2>
                  <p className={`text-xs ${textSec} mb-0`}>Balancetes de verificação, livros diários, plano de contas e DRE contábil oficial.</p>
                </div>
                
                <div className={`flex ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'} border ${borderCol} p-1 rounded space-x-1 overflow-x-auto text-xs`}>
                  <button 
                    onClick={() => setAccountingSubTab('dashboard')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      accountingSubTab === 'dashboard' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Dashboard & Auditoria
                  </button>
                  <button 
                    onClick={() => setAccountingSubTab('lancamentos')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      accountingSubTab === 'lancamentos' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Lançamentos & Livros
                  </button>
                  <button 
                    onClick={() => setAccountingSubTab('balancete')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      accountingSubTab === 'balancete' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Plano & Balancetes
                  </button>
                  <button 
                    onClick={() => setAccountingSubTab('dreContabil')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      accountingSubTab === 'dreContabil' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    DRE Contábil
                  </button>
                </div>
              </div>

              {/* Sub-Tab 1: Dashboard & Auditoria */}
              {accountingSubTab === 'dashboard' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="row">
                    <div className="col-md-6 col-lg-4 mb-3">
                      <div className={`card ${cardClass} p-4`}>
                        <span className={`text-[9px] ${textSec} font-bold uppercase tracking-wider block`}>Lucro Líquido Fiscal</span>
                        <h4 className="text-xl font-mono font-bold text-[#22C55E] mt-2 mb-0">R$ 1.777.400,00</h4>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-3">
                      <div className={`card ${cardClass} p-4`}>
                        <span className={`text-[9px] ${textSec} font-bold uppercase tracking-wider block`}>EBITDA Projetado</span>
                        <h4 className="text-xl font-mono font-bold text-[#3B82F6] mt-2 mb-0">R$ 1.837.900,00</h4>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-4 mb-3">
                      <div className={`card ${cardClass} p-4`}>
                        <span className={`text-[9px] ${textSec} font-bold uppercase tracking-wider block`}>Obrigações Fiscais Pendentes</span>
                        <h4 className="text-xl font-mono font-bold text-[#F59E0B] mt-2 mb-0">0 Pendentes</h4>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {/* Audit trail */}
                    <div className="col-lg-8 mb-3">
                      <div className={`card ${cardClass} p-4 h-100`}>
                        <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Trilha de Auditoria Contábil</h3>
                        <div className="space-y-3">
                          {contabilAuditorias.map(aud => (
                            <div key={aud.id} className={`p-3 rounded border ${borderCol} flex justify-between items-start text-xs ${
                              aud.type === 'Sucesso' ? 'bg-green-500/5 border-green-500/30' : 'bg-warning/5 border-warning/30'
                            }`}>
                              <div>
                                <span className={`font-semibold ${textTitle} block`}>{aud.msg}</span>
                                <span className={`text-[9px] ${textSec} block mt-0.5`}>Data da auditoria: {aud.date}</span>
                              </div>
                              <span className={`badge ${
                                aud.type === 'Sucesso' ? 'badge-success bg-[#22C55E]/12 text-[#22C55E]' : 'badge-warning bg-[#F59E0B]/12 text-[#FB923C]'
                              } text-[8px] font-bold px-2 py-0.5 rounded-full`}>
                                {aud.type}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tax Obligations checklists */}
                    <div className="col-lg-4 mb-3">
                      <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                        <div>
                          <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Obrigações & Declarações</h3>
                          <div className="space-y-3 text-xs">
                            <div className="flex justify-between items-center p-2 border-bottom border-light/5">
                              <span className={textBody}>SPED EFD Contribuições</span>
                              <span className="text-[#22C55E] font-bold">Transmitido ✔</span>
                            </div>
                            <div className="flex justify-between items-center p-2 border-bottom border-light/5">
                              <span className={textBody}>Declaração DCTF Mensal</span>
                              <span className="text-[#22C55E] font-bold">Transmitido ✔</span>
                            </div>
                            <div className="flex justify-between items-center p-2 border-bottom border-light/5">
                              <span className={textBody}>Gia Mensal ICMS/ISS</span>
                              <span className="text-[#22C55E] font-bold">Transmitido ✔</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => triggerToast("Integração SPED", "Lote fiscal SPED consolidado e pronto para envio.")}
                          className="btn btn-primary mt-4 w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0 cursor-pointer"
                        >
                          Gerar Exportação SPED
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Lançamentos & Livros */}
              {accountingSubTab === 'lancamentos' && (
                <div className="row animate-fadeIn">
                  <div className="col-lg-8 mb-3">
                    <div className={`card ${cardClass} p-4 h-100`}>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Partidas Dobradas Lançadas</h3>
                      <div className="table-responsive">
                        <table className={`table table-striped table-hover text-xs ${textBody}`}>
                          <thead>
                            <tr className={`border-bottom ${borderCol} ${textSec} font-semibold text-[10px] uppercase text-left`}>
                              <th className="p-3 border-0">Data</th>
                              <th className="p-3 border-0">Histórico / Descrição</th>
                              <th className="p-3 border-0">Conta Débito</th>
                              <th className="p-3 border-0">Conta Crédito</th>
                              <th className="p-3 border-0 text-right">Valor</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contabilLancamentos.map(lan => (
                              <tr key={lan.id} className={`border-bottom ${borderCol}/40`}>
                                <td className="p-3 border-0">{lan.date}</td>
                                <td className={`p-3 border-0 font-semibold ${textTitle}`}>{lan.desc}</td>
                                <td className="p-3 border-0 font-mono text-[#3B82F6]">{lan.debit}</td>
                                <td className="p-3 border-0 font-mono text-[#F97316]">{lan.credit}</td>
                                <td className="p-3 border-0 text-right font-mono font-bold text-slate-850 dark:text-white">R$ {lan.amount.toLocaleString('pt-BR')}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Books actions */}
                  <div className="col-lg-4 mb-3">
                    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                      <div>
                        <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Emissão de Livros Contábeis</h3>
                        <p className={`text-xs ${textSec} leading-relaxed`}>
                          Gere e assine digitalmente os livros oficiais em conformidade com as diretrizes do SPED Contábil.
                        </p>
                        <div className="space-y-2 mt-4 text-xs">
                          <button 
                            type="button"
                            onClick={() => triggerToast("Relatório Exportado", "Livro Diário Oficial gerado com sucesso.")}
                            className={`btn w-full text-left p-2.5 ${theme === 'dark' ? 'bg-[#111827] text-white border-white/5' : 'bg-slate-50 text-slate-800 border-slate-300/40'} font-semibold rounded flex justify-between items-center cursor-pointer`}
                          >
                            <span>Emitir Livro Diário</span>
                            <Download className="w-3.5 h-3.5 text-[#3B82F6]" />
                          </button>
                          
                          <button 
                            type="button"
                            onClick={() => triggerToast("Relatório Exportado", "Livro Razão de Fechamento gerado com sucesso.")}
                            className={`btn w-full text-left p-2.5 ${theme === 'dark' ? 'bg-[#111827] text-white border-white/5' : 'bg-slate-50 text-slate-800 border-slate-300/40'} font-semibold rounded flex justify-between items-center cursor-pointer`}
                          >
                            <span>Emitir Livro Razão</span>
                            <Download className="w-3.5 h-3.5 text-[#3B82F6]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Plano & Balancetes */}
              {accountingSubTab === 'balancete' && (
                <div className="row animate-fadeIn">
                  <div className="col-lg-12 mb-3">
                    <div className={`card ${cardClass} p-4`}>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Balancete de Verificação</h3>
                      <div className="table-responsive">
                        <table className={`table table-striped table-hover text-xs ${textBody}`}>
                          <thead>
                            <tr className={`border-bottom ${borderCol} ${textSec} font-semibold text-[10px] uppercase text-left`}>
                              <th className="p-3 border-0">Classificação</th>
                              <th className="p-3 border-0">Descrição da Conta</th>
                              <th className="p-3 border-0">Grupo</th>
                              <th className="p-3 border-0 text-right">Saldo Atual</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contabilPlanoContas.map(acc => (
                              <tr key={acc.code} className={`border-bottom ${borderCol}/40`}>
                                <td className="p-3 border-0 font-mono font-semibold">{acc.code}</td>
                                <td className={`p-3 border-0 font-semibold ${textTitle}`}>{acc.name}</td>
                                <td className="p-3 border-0">{acc.type}</td>
                                <td className="p-3 border-0 text-right font-mono font-bold text-slate-850 dark:text-white">R$ {acc.balance.toLocaleString('pt-BR')}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 4: DRE Contábil */}
              {accountingSubTab === 'dreContabil' && (
                <div className={`card ${cardClass} p-4 animate-fadeIn`}>
                  <div className={`flex justify-between items-center border-bottom ${borderCol} pb-3 mb-4`}>
                    <div>
                      <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Demonstrativo de Resultado do Exercício (DRE Contábil)</h3>
                      <p className={`text-xs ${textSec} mb-0`}>Demonstrativo oficial de receitas, despesas contábeis e resultado líquido fiscal.</p>
                    </div>
                    <span className={`text-xs ${textSec} font-mono font-bold`}>Exercício: 2026 / Julho</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between font-bold border-bottom border-dashed border-slate-700/30 pb-2">
                      <span className={textTitle}>Receita Bruta com Eventos (Código 3.1.01)</span>
                      <span className="font-mono text-[#22C55E]">R$ 2.580.000,00</span>
                    </div>

                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Custos dos Serviços Prestados (Código 4.1.01)</span>
                      <span className="font-mono text-[#EF4444]">-R$ 620.000,00</span>
                    </div>

                    <div className="flex justify-between font-bold border-bottom border-dashed border-slate-700/30 pb-2">
                      <span className={textTitle}>LUCRO BRUTO</span>
                      <span className="font-mono text-[#22C55E]">R$ 1.960.000,00</span>
                    </div>

                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Despesas Administrativas e Gerais (Código 4.1.02)</span>
                      <span className="font-mono text-[#EF4444]">-R$ 148.000,00</span>
                    </div>

                    <div className="flex justify-between font-bold border-bottom border-dashed border-slate-700/30 pb-2">
                      <span className={textTitle}>RESULTADO ANTES DOS IMPOSTOS (LAIR)</span>
                      <span className="font-mono text-[#22C55E]">R$ 1.812.000,00</span>
                    </div>

                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Provisão Impostos sobre o Lucro (CSSL / IRPJ)</span>
                      <span className="font-mono text-[#EF4444]">-R$ 34.600,00</span>
                    </div>

                    <div className="flex justify-between font-black text-sm border-top border-slate-500 pt-2">
                      <span className={textTitle}>RESULTADO LÍQUIDO DO PERÍODO</span>
                      <span className="font-mono text-[#22C55E]">R$ 1.777.400,00</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
  );
}
