import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';

export default function LogisticsPage() {
  const {
    logisticsBatches,
    cardClass,
    borderCol,
    textTitle,
    textSec,
    theme
  } = useDiskHub();

  return (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Logística & Ingressos Físicos</h2>
                <p className={`text-xs ${textSec} mb-0`}>Monitore lotes impressos, remessas físicas e entregas de ingressos nas bilheterias.</p>
              </div>

              <div className={`card ${cardClass} p-4`}>
                <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Lotes de Ingressos Físicos</h3>
                <div className="table-responsive">
                  <table className={`table table-striped table-hover text-xs ${textBody}`}>
                    <thead>
                      <tr className={`border-bottom ${borderCol} ${textSec} font-semibold text-[10px] uppercase text-left`}>
                        <th className="p-3 border-0">Lote ID</th>
                        <th className="p-3 border-0">Evento</th>
                        <th className="p-3 border-0">Tipo de Ingresso</th>
                        <th className="p-3 border-0 text-center">Quantidade</th>
                        <th className="p-3 border-0 text-center">Impresso</th>
                        <th className="p-3 border-0 text-center">Status</th>
                        <th className="p-3 border-0 text-right">Rastreio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logisticsBatches.map(batch => (
                        <tr key={batch.id} className={`border-bottom ${borderCol}/40 hover:bg-light/5`}>
                          <td className={`p-3 border-0 font-mono font-semibold ${textTitle} uppercase`}>{batch.id}</td>
                          <td className={`p-3 border-0 font-semibold ${textTitle}`}>{batch.event}</td>
                          <td className={`p-3 border-0 ${textSec}`}>{batch.type}</td>
                          <td className="p-3 border-0 text-center font-mono">{batch.qty.toLocaleString()}</td>
                          <td className="p-3 border-0 text-center font-mono">{batch.printed.toLocaleString()}</td>
                          <td className="p-3 border-0 text-center">
                            <span className={`badge ${
                              batch.status === 'Entregue' 
                                ? 'badge-success bg-[#22C55E]/12 text-[#22C55E]' 
                                : batch.status === 'Enviado' 
                                ? 'badge-primary bg-[#3B82F6]/12 text-[#3B82F6]'
                                : 'badge-warning bg-[#F59E0B]/12 text-[#F59E0B] animate-pulse'
                            } text-[9px] font-bold px-2 py-0.5 rounded-full`}>
                              {batch.status}
                            </span>
                          </td>
                          <td className="p-3 border-0 text-right font-mono text-[#3B82F6]">{batch.tracking}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
  );
}
