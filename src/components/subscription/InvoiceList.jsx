import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  X, 
  Eye
} from 'lucide-react';
import { useDiskHub } from '../../context/DiskHubContext';

export default function InvoiceList({ invoices = [] }) {
  const { triggerToast } = useDiskHub();
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const statusBadges = {
    paid: { label: 'Paga', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' },
    open: { label: 'Aberta', color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' },
    pending: { label: 'Pendente', color: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' },
    overdue: { label: 'Vencida', color: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400' },
    cancelled: { label: 'Cancelada', color: 'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400' }
  };

  const handleDownload = (type) => {
    triggerToast("Download Solicitado", `O arquivo de ${type} da fatura ${selectedInvoice.number} está sendo gerado.`);
  };

  return (
    <div data-testid="subscription-invoices" className="space-y-6 animate-fadeIn font-sans">
      
      {/* 1. COBRANÇA E FORMA DE PAGAMENTO */}
      <div data-testid="subscription-billing" className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-[#F97316]" />
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-0">
              Forma de Pagamento Principal
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-mono text-xs font-black shadow-xs">
              MC
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 dark:text-white block font-mono">
                Mastercard •••• 4582
              </span>
              <span className="text-[11px] text-slate-400 block">Expira em 12/29 • Faturamento automático</span>
            </div>
          </div>
        </div>

        <div className="space-y-1 md:text-right text-xs">
          <span className="text-slate-400 block">Próxima cobrança programada:</span>
          <span className="font-mono text-base font-black text-slate-900 dark:text-white block">15/10/2026</span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block">Cobrança Mensal Regular</span>
        </div>
      </div>

      {/* 2. TABELA DE FATURAS */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white mb-0.5">
            Histórico de Faturas e Pagamentos ({invoices.length})
          </h3>
          <p className="text-xs text-slate-400 mb-0">
            Acompanhe o faturamento, recibos e notas fiscais emitidas para sua empresa.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 uppercase text-[10px] font-black">
                <th className="py-3 px-3">Data</th>
                <th className="py-3 px-3">Fatura Nº</th>
                <th className="py-3 px-3">Valor Total</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {invoices.map(inv => {
                const badge = statusBadges[inv.status] || statusBadges.paid;
                return (
                  <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-[#1E293B]/40 transition-colors">
                    <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300">{inv.date}</td>
                    <td className="py-3 px-3 font-black text-slate-900 dark:text-white font-mono">{inv.number}</td>
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white font-mono">{inv.amount}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${badge.color}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedInvoice(inv)}
                        className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-[#F97316] hover:text-white text-slate-700 dark:text-slate-300 text-xs font-bold border-0 cursor-pointer transition-all inline-flex items-center space-x-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. MODAL DE DETALHE DA FATURA */}
      {selectedInvoice && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedInvoice(null);
          }}
        >
          <div className="max-w-md w-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] rounded-3xl p-6 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400">Detalhamento da Fatura</span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-0">Fatura {selectedInvoice.number}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-white flex items-center justify-center border-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Data de Emissão:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{selectedInvoice.date}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Status de Pagamento:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">Confirmado (Cartão)</span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
                <span className="text-[10.5px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Itens Faturados:</span>
                {selectedInvoice.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>{item.desc}</span>
                    <span className="font-mono font-bold">{item.amount}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex justify-between items-center text-sm font-black text-slate-900 dark:text-white">
                <span>Total Faturado:</span>
                <span className="font-mono text-base text-[#F97316]">{selectedInvoice.amount}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => handleDownload('recibo')}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold border-0 cursor-pointer transition-all flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Recibo</span>
              </button>
              <button
                type="button"
                onClick={() => handleDownload('PDF da fatura')}
                className="px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black border-0 cursor-pointer shadow-md flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Fatura (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
