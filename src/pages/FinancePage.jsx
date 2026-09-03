import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';

export default function FinancePage() {
  const {
    financeSubTab,
    setFinanceSubTab,
    receivables,
    setReceivables,
    payables,
    setPayables,
    costCenters,
    newReceivable,
    setNewReceivable,
    newPayable,
    setNewPayable,
    accounts,
    setAccounts,
    setLancamentos,
    conciliationItems,
    setConciliationItems,
    transfer,
    setTransfer,
    triggerToast,
    theme,
    cardClass,
    inputClass,
    borderCol,
    textTitle,
    textSec,
    textBody
  } = useDiskHub();

    const handleAccountTransfer = (e) => {
    e.preventDefault();
    const amountVal = parseFloat(transfer.amount);
    if (!amountVal || amountVal <= 0) return;

    const sourceAcc = accounts.find(a => a.id === transfer.from);
    if (sourceAcc.balance < amountVal) {
      triggerToast("Saldo Insuficiente", `A conta ${sourceAcc.name} não possui saldo suficiente para esta transferência.`, "warning");
      return;
    }

    setAccounts(prev => prev.map(a => {
      if (a.id === transfer.from) return { ...a, balance: a.balance - amountVal };
      if (a.id === transfer.to) return { ...a, balance: a.balance + amountVal };
      return a;
    }));

    const entry = {
      id: `lan-${Date.now()}`,
      type: 'despesa',
      desc: `Transf. de ${accounts.find(a=>a.id === transfer.from).name} para ${accounts.find(a=>a.id === transfer.to).name}`,
      amount: amountVal,
      category: 'Transferência',
      costCenter: 'Interno',
      date: 'Hoje',
      status: 'Pago'
    };
    setLancamentos(prev => [entry, ...prev]);
    setTransfer(prev => ({ ...prev, amount: '' }));
    triggerToast("Transferência Efetuada", `R$ ${amountVal.toLocaleString('pt-BR')} transferidos.`);
  };

  return (
            <div className="space-y-4 animate-fadeIn">
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Gestão Financeira (ERP)</h2>
                  <p className={`text-xs ${textSec} mb-0`}>Fluxo de caixa, conciliação contábil, contas a pagar/receber e DRE gerencial.</p>
                </div>
                
                <div className={`flex ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'} border ${borderCol} p-1 rounded space-x-1 overflow-x-auto text-xs`}>
                  <button 
                    onClick={() => setFinanceSubTab('dashboard')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      financeSubTab === 'dashboard' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Dashboard Financeiro
                  </button>
                  <button 
                    onClick={() => setFinanceSubTab('contasReceber')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      financeSubTab === 'contasReceber' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Contas a Receber
                  </button>
                  <button 
                    onClick={() => setFinanceSubTab('contasPagar')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      financeSubTab === 'contasPagar' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Contas a Pagar
                  </button>
                  <button 
                    onClick={() => setFinanceSubTab('conciliacao')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      financeSubTab === 'conciliacao' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Bancos & Conciliação
                  </button>
                  <button 
                    onClick={() => setFinanceSubTab('dre')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      financeSubTab === 'dre' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    DRE Gerencial
                  </button>
                </div>
              </div>

              {/* Sub-Tab 1: Dashboard Financeiro */}
              {financeSubTab === 'dashboard' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="row">
                    {accounts.map(acc => (
                      <div key={acc.id} className="col-md-4 mb-3">
                        <div className={`card ${cardClass} p-4`}>
                          <span className={`text-[9px] ${textSec} font-bold uppercase tracking-wider block`}>{acc.type}</span>
                          <h4 className={`text-xs font-semibold ${textTitle} mt-1 mb-0`}>{acc.name}</h4>
                          <div className={`mt-3 font-mono font-bold text-md ${textTitle}`}>
                            R$ {acc.balance.toLocaleString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="row">
                    {/* Cash Flow Line Chart simulation */}
                    <div className="col-lg-8 mb-3">
                      <div className={`card ${cardClass} p-4 h-100`}>
                        <div>
                          <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Projeção de Fluxo de Caixa</h3>
                          <p className={`text-xs ${textSec} mb-0`}>Entradas e saídas de caixa previstas para a semana.</p>
                        </div>
                        <div className="relative w-full h-48 mt-4">
                          <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                            <path d="M 0 150 Q 100 80, 200 110 T 400 40 L 500 60 L 500 150 L 0 150 Z" fill="rgba(59,130,246,0.1)"/>
                            <path d="M 0 150 Q 100 80, 200 110 T 400 40 L 500 60" fill="none" stroke="#3b82f6" strokeWidth="2"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 mb-3">
                      <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                        <div>
                          <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Transferência Interna</h3>
                          <form onSubmit={handleAccountTransfer} className="space-y-3 text-xs">
                            <div className="form-group mb-2">
                              <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Origem</label>
                              <select 
                                value={transfer.from} 
                                onChange={(e) => setTransfer(prev => ({ ...prev, from: e.target.value }))}
                                className={`form-control form-control-sm ${inputClass}`}
                              >
                                {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                              </select>
                            </div>
                            <div className="form-group mb-2">
                              <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Destino</label>
                              <select 
                                value={transfer.to} 
                                onChange={(e) => setTransfer(prev => ({ ...prev, to: e.target.value }))}
                                className={`form-control form-control-sm ${inputClass}`}
                              >
                                {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                              </select>
                            </div>
                            <div className="form-group mb-2">
                              <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Valor (R$)</label>
                              <input 
                                type="number" 
                                value={transfer.amount} 
                                onChange={(e) => setTransfer(prev => ({ ...prev, amount: e.target.value }))}
                                placeholder="0,00" 
                                className={`form-control form-control-sm ${inputClass}`} 
                              />
                            </div>
                            <button type="submit" className="btn btn-primary w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0 cursor-pointer">
                              Executar Transferência
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Contas a Receber */}
              {financeSubTab === 'contasReceber' && (
                <div className="row animate-fadeIn">
                  <div className="col-lg-8 mb-3">
                    <div className={`card ${cardClass} p-4 h-100`}>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Duplicatas e Receitas Futuras</h3>
                      <div className="table-responsive">
                        <table className={`table table-striped table-hover text-xs ${textBody}`}>
                          <thead>
                            <tr className={`border-bottom ${borderCol} ${textSec} font-semibold text-[10px] uppercase text-left`}>
                              <th className="p-3 border-0">Descrição</th>
                              <th className="p-3 border-0">Vencimento</th>
                              <th className="p-3 border-0 text-center">Método</th>
                              <th className="p-3 border-0 text-right">Valor</th>
                              <th className="p-3 border-0 text-center">Status</th>
                              <th className="p-3 border-0 text-right">Ação</th>
                            </tr>
                          </thead>
                          <tbody>
                            {receivables.map(rec => (
                              <tr key={rec.id} className={`border-bottom ${borderCol}/40`}>
                                <td className={`p-3 border-0 font-semibold ${textTitle}`}>{rec.desc}</td>
                                <td className="p-3 border-0">{rec.due}</td>
                                <td className="p-3 border-0 text-center font-mono">{rec.method}</td>
                                <td className="p-3 border-0 text-right font-mono font-bold text-[#22C55E]">R$ {rec.amount.toLocaleString('pt-BR')}</td>
                                <td className="p-3 border-0 text-center">
                                  <span className={`badge ${
                                    rec.status === 'Recebido' 
                                      ? 'badge-success bg-[#22C55E]/12 text-[#22C55E]' 
                                      : rec.status === 'Pendente' 
                                      ? 'badge-primary bg-[#3B82F6]/12 text-[#3B82F6]'
                                      : 'badge-danger bg-[#EF4444]/12 text-[#EF4444]'
                                  } text-[8px] font-bold px-2 py-0.5 rounded-full`}>
                                    {rec.status}
                                  </span>
                                </td>
                                <td className="p-3 border-0 text-right">
                                  {rec.status !== 'Recebido' && (
                                    <button 
                                      onClick={() => {
                                        setReceivables(prev => prev.map(r => r.id === rec.id ? { ...r, status: 'Recebido' } : r));
                                        setFinancialStats(stats => ({ ...stats, saldo: stats.saldo + rec.amount }));
                                        triggerToast("Recebimento Efetuado ✔", `R$ ${rec.amount.toLocaleString('pt-BR')} creditados em conta.`);
                                      }}
                                      className="btn btn-primary btn-sm px-2.5 py-1 text-[10px] font-semibold rounded border-0 cursor-pointer"
                                    >
                                      Liquidar
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

                  {/* Add Receivable Form */}
                  <div className="col-lg-4 mb-3">
                    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                      <div>
                        <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Lançar Nova Receita</h3>
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          if (!newReceivable.desc || !newReceivable.amount) {
                            triggerToast("Aviso", "Preencha todos os campos do contas a receber.", "warning");
                            return;
                          }
                          const amount = parseFloat(newReceivable.amount);
                          const item = {
                            id: `rec-${Date.now()}`,
                            desc: newReceivable.desc,
                            amount,
                            method: newReceivable.method,
                            due: newReceivable.due,
                            status: 'Pendente'
                          };
                          setReceivables([item, ...receivables]);
                          setNewReceivable({ desc: '', amount: '', method: 'PIX', due: '2026-07-20' });
                          triggerToast("Lançamento Adicionado 💰", "Conta a receber cadastrada com sucesso!");
                        }} className="space-y-3 text-xs">
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Descrição da Receita</label>
                            <input 
                              type="text" 
                              value={newReceivable.desc}
                              onChange={(e) => setNewReceivable(prev => ({ ...prev, desc: e.target.value }))}
                              placeholder="Ex: Patrocínio Lote 2"
                              className={`form-control form-control-sm ${inputClass}`}
                            />
                          </div>
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Valor (R$)</label>
                            <input 
                              type="number" 
                              value={newReceivable.amount}
                              onChange={(e) => setNewReceivable(prev => ({ ...prev, amount: e.target.value }))}
                              placeholder="0,00"
                              className={`form-control form-control-sm ${inputClass}`}
                            />
                          </div>
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Método de Cobrança</label>
                            <select 
                              value={newReceivable.method}
                              onChange={(e) => setNewReceivable(prev => ({ ...prev, method: e.target.value }))}
                              className={`form-control form-control-sm ${inputClass}`}
                            >
                              <option value="PIX">PIX (QR Code)</option>
                              <option value="Cartão">Cartão de Crédito</option>
                              <option value="Boleto">Boleto Bancário</option>
                            </select>
                          </div>
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Data de Vencimento</label>
                            <input 
                              type="date" 
                              value={newReceivable.due}
                              onChange={(e) => setNewReceivable(prev => ({ ...prev, due: e.target.value }))}
                              className={`form-control form-control-sm ${inputClass}`}
                            />
                          </div>
                          <button type="submit" className="btn btn-primary w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0 cursor-pointer">
                            Adicionar Lançamento
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Contas a Pagar */}
              {financeSubTab === 'contasPagar' && (
                <div className="row animate-fadeIn">
                  <div className="col-lg-8 mb-3">
                    <div className={`card ${cardClass} p-4 h-100`}>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Contas a Pagar & Despesas Fiscais</h3>
                      <div className="table-responsive">
                        <table className={`table table-striped table-hover text-xs ${textBody}`}>
                          <thead>
                            <tr className={`border-bottom ${borderCol} ${textSec} font-semibold text-[10px] uppercase text-left`}>
                              <th className="p-3 border-0">Despesa / Fornecedor</th>
                              <th className="p-3 border-0">Categoria</th>
                              <th className="p-3 border-0">Centro de Custo</th>
                              <th className="p-3 border-0 text-center">Vencimento</th>
                              <th className="p-3 border-0 text-right">Valor</th>
                              <th className="p-3 border-0 text-center">Status</th>
                              <th className="p-3 border-0 text-right">Ação</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payables.map(pay => (
                              <tr key={pay.id} className={`border-bottom ${borderCol}/40`}>
                                <td className={`p-3 border-0 font-semibold ${textTitle}`}>{pay.desc}</td>
                                <td className="p-3 border-0">{pay.category}</td>
                                <td className="p-3 border-0 font-semibold">{pay.costCenter}</td>
                                <td className="p-3 border-0 text-center">{pay.due}</td>
                                <td className="p-3 border-0 text-right font-mono font-bold text-[#EF4444]">R$ {pay.amount.toLocaleString('pt-BR')}</td>
                                <td className="p-3 border-0 text-center">
                                  <span className={`badge ${
                                    pay.status === 'Pago' 
                                      ? 'badge-success bg-[#22C55E]/12 text-[#22C55E]' 
                                      : pay.status === 'Pendente' 
                                      ? 'badge-warning bg-[#F59E0B]/12 text-[#FB923C]'
                                      : 'badge-primary bg-blue-500/12 text-[#3B82F6]'
                                  } text-[8px] font-bold px-2 py-0.5 rounded-full`}>
                                    {pay.status}
                                  </span>
                                </td>
                                <td className="p-3 border-0 text-right">
                                  {pay.status !== 'Pago' && (
                                    <button 
                                      onClick={() => {
                                        setPayables(prev => prev.map(p => p.id === pay.id ? { ...p, status: 'Pago' } : p));
                                        setFinancialStats(stats => ({ ...stats, saldo: stats.saldo - pay.amount }));
                                        triggerToast("Despesa Paga 💸", `R$ ${pay.amount.toLocaleString('pt-BR')} debitados.`);
                                      }}
                                      className="btn btn-primary btn-sm px-2.5 py-1 text-[10px] font-semibold rounded border-0 cursor-pointer"
                                    >
                                      Pagar
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

                  {/* Add Payable Form */}
                  <div className="col-lg-4 mb-3">
                    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                      <div>
                        <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Lançar Nova Despesa</h3>
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          if (!newPayable.desc || !newPayable.amount) {
                            triggerToast("Aviso", "Preencha todos os campos do contas a pagar.", "warning");
                            return;
                          }
                          const amount = parseFloat(newPayable.amount);
                          const item = {
                            id: `pay-${Date.now()}`,
                            desc: newPayable.desc,
                            amount,
                            category: newPayable.category,
                            due: newPayable.due,
                            costCenter: newPayable.costCenter,
                            status: 'Pendente'
                          };
                          setPayables([item, ...payables]);
                          setNewPayable({ desc: '', amount: '', category: 'Fornecedor', due: '2026-07-20', costCenter: 'Eventos' });
                          triggerToast("Lançamento Efetuado 💸", "Despesa agendada com sucesso!");
                        }} className="space-y-3 text-xs">
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Fornecedor / Descrição</label>
                            <input 
                              type="text" 
                              value={newPayable.desc}
                              onChange={(e) => setNewPayable(prev => ({ ...prev, desc: e.target.value }))}
                              placeholder="Ex: Fornecedor de Copos"
                              className={`form-control form-control-sm ${inputClass}`}
                            />
                          </div>
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Valor (R$)</label>
                            <input 
                              type="number" 
                              value={newPayable.amount}
                              onChange={(e) => setNewPayable(prev => ({ ...prev, amount: e.target.value }))}
                              placeholder="0,00"
                              className={`form-control form-control-sm ${inputClass}`}
                            />
                          </div>
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Categoria</label>
                            <select 
                              value={newPayable.category}
                              onChange={(e) => setNewPayable(prev => ({ ...prev, category: e.target.value }))}
                              className={`form-control form-control-sm ${inputClass}`}
                            >
                              <option value="Fornecedor">Fornecedor de Evento</option>
                              <option value="Infraestrutura">Locação e Estrutura</option>
                              <option value="Marketing">Tráfego & Anúncios</option>
                              <option value="Repasse">Repasse de Produtor</option>
                            </select>
                          </div>
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Centro de Custo</label>
                            <select 
                              value={newPayable.costCenter}
                              onChange={(e) => setNewPayable(prev => ({ ...prev, costCenter: e.target.value }))}
                              className={`form-control form-control-sm ${inputClass}`}
                            >
                              {costCenters.map(cc => <option key={cc.id} value={cc.name}>{cc.name}</option>)}
                            </select>
                          </div>
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Data de Vencimento</label>
                            <input 
                              type="date" 
                              value={newPayable.due}
                              onChange={(e) => setNewPayable(prev => ({ ...prev, due: e.target.value }))}
                              className={`form-control form-control-sm ${inputClass}`}
                            />
                          </div>
                          <button type="submit" className="btn btn-primary w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0 cursor-pointer">
                            Agendar Despesa
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 4: Bancos & Conciliação */}
              {financeSubTab === 'conciliacao' && (
                <div className="row animate-fadeIn">
                  <div className="col-lg-6 mb-3">
                    <div className={`card ${cardClass} p-4 h-100`}>
                      <div className="flex justify-between items-center border-bottom border-light/5 pb-3 mb-3">
                        <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Importação de Extrato Bancário</h3>
                        <button 
                          type="button"
                          onClick={() => {
                            setConciliationItems(prev => prev.map(item => ({ ...item, matched: true })));
                            triggerToast("Conciliação Realizada 🤝", "Todos os lançamentos foram conciliados com sucesso!");
                          }}
                          className="btn btn-primary py-1 px-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-semibold rounded border-0 cursor-pointer"
                        >
                          Simular Importação OFX
                        </button>
                      </div>
                      
                      <div className="space-y-1.5">
                        {conciliationItems.map(item => (
                          <div key={item.id} className={`p-3 rounded border ${borderCol} flex justify-between items-center text-xs ${
                            item.matched ? 'bg-green-500/5 border-green-500/30' : theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'
                          }`}>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className={`font-semibold ${textTitle}`}>{item.desc}</span>
                                <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold ${
                                  item.type === 'in' ? 'bg-[#22C55E]/12 text-[#22C55E]' : 'bg-[#EF4444]/12 text-[#EF4444]'
                                }`}>
                                  {item.type === 'in' ? 'Entrada' : 'Saída'}
                                </span>
                              </div>
                              <span className={`text-[9px] ${textSec} block mt-0.5`}>Sugestão Contábil: {item.matchInvoice}</span>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <span className="font-mono font-bold text-slate-400">R$ {item.amount.toLocaleString('pt-BR')}</span>
                              {item.matched ? (
                                <span className="text-[#22C55E] font-bold">✔ Conciliado</span>
                              ) : (
                                <button 
                                  type="button"
                                  onClick={() => {
                                    setConciliationItems(prev => prev.map(i => i.id === item.id ? { ...i, matched: true } : i));
                                    triggerToast("Item Conciliado", "Lançamento contábil integrado automaticamente.");
                                  }}
                                  className="btn btn-primary btn-sm px-2 py-1 text-[9px] rounded border-0 cursor-pointer"
                                >
                                  Conciliar
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bank Accounts Grid list */}
                  <div className="col-lg-6 mb-3">
                    <div className={`card ${cardClass} p-4 h-100`}>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Contas Bancárias Cadastradas</h3>
                      <div className="space-y-3">
                        {accounts.map(acc => (
                          <div key={acc.id} className={`p-3 rounded border ${borderCol} flex justify-between items-center`}>
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-blue-500/10 text-[#3B82F6] font-bold`}>
                                {acc.name[0]}
                              </div>
                              <div>
                                <span className={`text-xs font-semibold ${textTitle} block`}>{acc.name}</span>
                                <span className={`text-[9px] ${textSec} block`}>Agência: 0001 / Conta: Ativa</span>
                              </div>
                            </div>
                            <span className="font-mono text-xs font-bold text-[#22C55E]">R$ {acc.balance.toLocaleString('pt-BR')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 5: DRE Gerencial */}
              {financeSubTab === 'dre' && (
                <div className={`card ${cardClass} p-4 animate-fadeIn`}>
                  <div className={`flex justify-between items-center border-bottom ${borderCol} pb-3 mb-4`}>
                    <div>
                      <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Demonstrativo de Resultado do Exercício (DRE Gerencial)</h3>
                      <p className={`text-xs ${textSec} mb-0`}>Visão gerencial de faturamento acumulado, deduções e margem.</p>
                    </div>
                    <span className={`text-xs ${textSec} font-mono font-bold`}>Período: Julho/2026</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between font-bold border-bottom border-dashed border-slate-700/30 pb-2">
                      <span className={textTitle}>Receita Bruta com Eventos (Venda Ingressos)</span>
                      <span className="font-mono text-[#22C55E]">R$ 2.580.000,00</span>
                    </div>
                    
                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Taxas de Gateway e Conectividade (1.5%)</span>
                      <span className="font-mono text-[#EF4444]">-R$ 38.700,00</span>
                    </div>

                    <div className="flex justify-between font-bold border-bottom border-dashed border-slate-700/30 pb-2">
                      <span className={textTitle}>Receita Líquida do Ecossistema</span>
                      <span className="font-mono text-[#22C55E]">R$ 2.541.300,00</span>
                    </div>

                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Repasses efetuados a Produtores e Bandas</span>
                      <span className="font-mono text-[#EF4444]">-R$ 620.000,00</span>
                    </div>

                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Custos Operacionais locais (LED, Segurança, Insumos Bar)</span>
                      <span className="font-mono text-[#EF4444]">-R$ 83.400,00</span>
                    </div>

                    <div className="flex justify-between font-bold border-bottom border-dashed border-slate-700/30 pb-2">
                      <span className={textTitle}>Margem de Contribuição Bruta</span>
                      <span className="font-mono text-[#22C55E]">R$ 1.837.900,00</span>
                    </div>

                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Despesas Administrativas e Pessoal Fixo</span>
                      <span className="font-mono text-[#EF4444]">-R$ 48.000,00</span>
                    </div>

                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Tráfego Pago e Marketing de Atração</span>
                      <span className="font-mono text-[#EF4444]">-R$ 12.500,00</span>
                    </div>

                    <div className="flex justify-between font-black text-sm border-top border-slate-500 pt-2">
                      <span className={textTitle}>LUCRO LÍQUIDO OPERACIONAL (EBITDA)</span>
                      <span className="font-mono text-[#22C55E]">R$ 1.777.400,00</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
  );
}
