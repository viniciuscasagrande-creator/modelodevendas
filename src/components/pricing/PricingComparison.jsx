import React from 'react';
import { Card } from '../ui/Card';

export default function PricingComparison({ cardClass, textTitle }) {
  const comparisonRows = [
    { name: '🎫 Eventos Ilimitados', matrix: [true, true, true, true, true] },
    { name: '👥 CRM de Vendas & Clientes', matrix: [false, true, true, true, true] },
    { name: '📈 Marketing & Campanhas', matrix: [false, true, true, true, true] },
    { name: '🛒 Ponto de Venda (PDV)', matrix: [true, true, true, true, true] },
    { name: '🍹 Bar & Controle de Estoque', matrix: [false, false, true, true, true] },
    { name: '🤖 Disk AI Analytics', matrix: [false, false, false, true, true] },
    { name: '✨ Central de Apps & Plugins', matrix: [false, false, false, false, true] },
  ];

  return (
    <Card className={`card ${cardClass || 'bg-[#111625]'} p-4 mt-4 border border-white/[0.06] rounded-2xl shadow-sm overflow-hidden`}>
      <h3 className={`text-xs font-bold text-white uppercase tracking-wider mb-4`}>Tabela Comparativa (Padrão Stripe / Vercel)</h3>
      <div className="table-responsive">
        <table className="table text-xs mb-0 align-middle">
          <thead>
            <tr className="border-b border-white/[0.06] text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-[#161D33]">
              <th className="p-3 border-0">Recurso do Ecossistema</th>
              <th className="p-3 border-0 text-center text-[#10B981]">ESSENCIAL</th>
              <th className="p-3 border-0 text-center text-[#2563EB]">PROFISSIONAL</th>
              <th className="p-3 border-0 text-center text-[#8B5CF6]">PREMIUM</th>
              <th className="p-3 border-0 text-center text-[#F97316]">ENTERPRISE</th>
              <th className="p-3 border-0 text-center text-[#7C3AED]">OMNICHANNEL</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, rIdx) => (
              <tr key={rIdx} className="border-b border-slate-100 dark:border-[#1F2937] hover:bg-slate-50/30 dark:hover:bg-[#1E293B]/10">
                <td className="p-3 border-0 font-medium text-slate-700 dark:text-slate-350">{row.name}</td>
                {row.matrix.map((chk, cIdx) => (
                  <td key={cIdx} className="p-3 border-0 text-center font-bold font-mono">
                    {chk ? (
                      <span className="text-[#10B981] text-sm">✔</span>
                    ) : (
                      <span className="text-slate-300 dark:text-slate-700 font-normal">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
