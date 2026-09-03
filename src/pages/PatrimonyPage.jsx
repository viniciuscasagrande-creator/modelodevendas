import React from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { Terminal } from 'lucide-react';

export default function PatrimonyPage() {
  const {
    posTerminals,
    cardClass,
    borderCol,
    textTitle,
    textSec,
    theme,
    triggerToast
  } = useDiskHub();

  return (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Patrimônio & Terminais POS</h2>
                <p className={`text-xs ${textSec} mb-0`}>Monitore a entrega, status de manutenção e distribuição física das maquininhas de cartão.</p>
              </div>

              <div className={`card ${cardClass} p-4`}>
                <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Terminais Ativos</h3>
                <div className="table-responsive">
                  <table className={`table table-striped table-hover text-xs ${textBody}`}>
                    <thead>
                      <tr className={`border-bottom ${borderCol} ${textSec} font-semibold text-[10px] uppercase text-left`}>
                        <th className="p-3 border-0">Nº de Série</th>
                        <th className="p-3 border-0">Evento Vinculado</th>
                        <th className="p-3 border-0">Operador</th>
                        <th className="p-3 border-0 text-center">Bateria</th>
                        <th className="p-3 border-0 text-center">Status</th>
                        <th className="p-3 border-0 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posTerminals.map(pos => (
                        <tr key={pos.id} className={`border-bottom ${borderCol}/40 hover:bg-light/5`}>
                          <td className={`p-3 border-0 font-mono font-semibold ${textTitle}`}>{pos.serial}</td>
                          <td className={`p-3 border-0 font-semibold ${textTitle}`}>{pos.event}</td>
                          <td className={`p-3 border-0 ${textSec}`}>{pos.operator}</td>
                          <td className="p-3 border-0 text-center font-mono font-semibold">{pos.battery}%</td>
                          <td className="p-3 border-0 text-center">
                            <span className={`badge ${
                              pos.status === 'Em uso' 
                                ? 'badge-success bg-[#22C55E]/12 text-[#22C55E]' 
                                : pos.status === 'Disponível' 
                                ? 'badge-primary bg-[#3B82F6]/12 text-[#3B82F6]'
                                : 'badge-danger bg-[#EF4444]/12 text-[#EF4444]'
                            } text-[9px] font-bold px-2 py-0.5 rounded-full`}>
                              {pos.status}
                            </span>
                          </td>
                          <td className="p-3 border-0 text-right">
                            <button 
                              onClick={() => triggerToast("Comando Enviado", "Terminal resetado ou pingado com sucesso.")}
                              className="btn btn-primary btn-sm px-2.5 py-1 text-[10px] font-semibold rounded border-0 cursor-pointer"
                            >
                              Ping
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
  );
}
