import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';

export default function BarInventoryPage() {
  const {
    barInventory,
    cardClass,
    borderCol,
    textTitle,
    textSec,
    theme
  } = useDiskHub();

  return (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Bar & Controle de Estoque</h2>
                  <p className={`text-xs ${textSec} mb-0`}>Monitore o nível de estoque de bebidas/insumos nos caixas e simule vendas.</p>
                </div>
              </div>

              <div className="row">
                {/* Live POS simulator */}
                <div className="col-lg-6 mb-3">
                  <div className={`card ${cardClass} p-4 h-100`}>
                    <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Simulador de Vendas no Bar</h3>
                    <p className={`text-xs ${textSec} mb-4`}>Clique nos produtos abaixo para simular vendas rápidas nos terminais e deduzir estoque.</p>
                    
                    <div className="row">
                      {barInventory.map(item => (
                        <div key={item.id} className="col-sm-6 mb-3">
                          <button 
                            onClick={() => {
                              if (item.stock <= 0) {
                                triggerToast("Estoque Esgotado", `O item ${item.name} não possui estoque disponível.`, "warning");
                                return;
                              }
                              // Deduct stock, increase sold, increase money
                              setBarInventory(prev => prev.map(inv => inv.id === item.id ? { ...inv, stock: inv.stock - 1, sold: inv.sold + 1 } : inv));
                              setFinancialStats(stats => ({
                                ...stats,
                                receita: stats.receita + item.price,
                                saldo: stats.saldo + item.price,
                                lucro: stats.lucro + item.price
                              }));
                              triggerToast("Venda Registrada 🍻", `1x ${item.name} vendida por R$ ${item.price.toFixed(2)}.`);
                            }}
                            className={`w-full text-left p-3 rounded border transition-all ${theme === 'dark' ? 'bg-[#111827] border-white/5 hover:border-[#3B82F6]' : 'bg-slate-50 border-slate-300 hover:border-[#3B82F6]'} cursor-pointer`}
                          >
                            <span className={`text-xs font-semibold ${textTitle} block truncate`}>{item.name}</span>
                            <span className="text-[10px] text-[#3B82F6] font-semibold mt-1 block">Preço: R$ {item.price.toFixed(2)}</span>
                            <span className={`text-[9px] ${textSec} block mt-0.5`}>Estoque: {item.stock} uni</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Inventory management */}
                <div className="col-lg-6 mb-3">
                  <div className={`card ${cardClass} p-4 h-100`}>
                    <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Nível de Insumos</h3>
                    <div className="space-y-3">
                      {barInventory.map(item => {
                        const pct = Math.max(0, Math.min(100, Math.round((item.stock / item.maxStock) * 100)));
                        return (
                          <div key={item.id} className="space-y-1 text-xs">
                            <div className="flex justify-between font-semibold">
                              <span className={textTitle}>{item.name}</span>
                              <span className={textSec}>{item.stock.toLocaleString()} / {item.maxStock.toLocaleString()} ({pct}%)</span>
                            </div>
                            <div className={`w-full ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-200'} rounded-full h-2 overflow-hidden`}>
                              <div 
                                className={`h-full ${pct < 20 ? 'bg-[#EF4444]' : pct < 50 ? 'bg-[#F59E0B]' : 'bg-[#22C55E]'} transition-all duration-300`} 
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
}
