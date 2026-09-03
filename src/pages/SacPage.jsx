import React, { useState } from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { 
  Headphones, 
  Search, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  User, 
  Plus, 
  RotateCcw,
  Star
} from 'lucide-react';

export default function SacPage() {
  const { triggerToast, textTitle, textSec } = useDiskHub();

  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const [tickets, setTickets] = useState([
    {
      id: 'TICK-4819',
      customer: 'Renata Albuquerque',
      email: 'renata.alb@gmail.com',
      event: 'Rock Festival 2025',
      subject: 'Dúvida sobre transferência de titularidade de ingresso',
      channel: 'WhatsApp SAC',
      status: 'Em Aberto',
      priority: 'Média',
      sla: 'Restam 2h',
      date: 'Hoje, 11:42'
    },
    {
      id: 'TICK-4818',
      customer: 'Carlos Eduardo Ramos',
      email: 'carlos.ramos@empresa.com.br',
      event: 'Show do Artista X',
      subject: 'Solicitação de cancelamento dentro de 7 dias (CDC Art. 49)',
      channel: 'Portal do Cliente',
      status: 'Em Análise',
      priority: 'Alta',
      sla: 'Restam 45m',
      date: 'Hoje, 10:15'
    },
    {
      id: 'TICK-4815',
      customer: 'Fernanda Martins',
      email: 'fernanda.m@outlook.com',
      event: 'Festival Kids',
      subject: 'Não recebi o voucher por e-mail após pagamento via PIX',
      channel: 'E-mail',
      status: 'Resolvido',
      priority: 'Alta',
      sla: 'Atendido em 8m',
      date: 'Hoje, 09:20'
    },
    {
      id: 'TICK-4812',
      customer: 'Bruno Silveira',
      email: 'bruno.silv@uol.com.br',
      event: 'Teatro: A Comédia',
      subject: 'Acesso PNE e assento especial para cadeirante',
      channel: 'Telefone',
      status: 'Resolvido',
      priority: 'Normal',
      sla: 'Atendido em 15m',
      date: 'Ontem, 16:30'
    }
  ]);

  const handleResolveTicket = (ticketId) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'Resolvido' } : t));
    triggerToast("Chamado Resolvido", `O ticket #${ticketId} foi marcado como finalizado.`);
  };

  const filteredTickets = tickets.filter(t => {
    const matchSearch = t.customer.toLowerCase().includes(searchFilter.toLowerCase()) ||
                        t.subject.toLowerCase().includes(searchFilter.toLowerCase()) ||
                        t.id.toLowerCase().includes(searchFilter.toLowerCase());
    const matchStatus = statusFilter === 'Todos' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-4 pb-12 animate-fadeIn font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white dark:bg-[#111827] p-4 rounded-xl border border-slate-200 dark:border-[#1F2937] shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-[#F97316] flex items-center justify-center shrink-0 shadow-sm">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h1 className={`text-xl font-black ${textTitle} tracking-tight mb-0.5`}>
              SAC 360º & Suporte ao Cliente
            </h1>
            <p className={`text-xs ${textSec} mb-0`}>
              Atendimento omnicanal, gestão de chamados, ouvidoria e solicitações de pós-venda.
            </p>
          </div>
        </div>

        <button 
          type="button"
          onClick={() => triggerToast("Novo Ticket", "Abrindo formulário de chamado presencial ou telefônico...")}
          className="px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold border-0 cursor-pointer shadow-md shadow-[#F97316]/25 flex items-center space-x-1.5 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Abrir Chamado Manual</span>
        </button>
      </div>

      {/* SAC KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm">
          <div className="flex items-center space-x-2 text-slate-400 mb-1">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Tempo Médio Resposta</span>
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white block">11 min</span>
          <span className="text-[10px] text-emerald-500 font-bold">Meta: &lt; 30 min (SLA 98%)</span>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm">
          <div className="flex items-center space-x-2 text-slate-400 mb-1">
            <MessageSquare className="w-4 h-4 text-[#F97316]" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Chamados Hoje</span>
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white block">48</span>
          <span className="text-[10px] text-slate-400">42 resolvidos (87,5%)</span>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm">
          <div className="flex items-center space-x-2 text-slate-400 mb-1">
            <RotateCcw className="w-4 h-4 text-purple-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Estornos Solicitados</span>
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white block">6</span>
          <span className="text-[10px] text-purple-500 font-bold">Encaminhados ao Financeiro</span>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-3.5 rounded-xl shadow-sm">
          <div className="flex items-center space-x-2 text-slate-400 mb-1">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider">CSAT Atendimento</span>
          </div>
          <span className="text-xl font-black text-amber-500 block">4,8 / 5,0</span>
          <span className="text-[10px] text-emerald-500 font-bold">Excelente (94% aprovação)</span>
        </div>
      </div>

      {/* Tickets List Card */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-4 rounded-xl shadow-sm space-y-3">
        
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-2 border-b border-slate-100 dark:border-white/5">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Buscar chamado por cliente, ID ou assunto..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center space-x-1.5 text-xs">
            {['Todos', 'Em Aberto', 'Em Análise', 'Resolvido'].map(st => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all border-0 cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#F97316] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#1E293B] text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Table of tickets */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-[9.5px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-white/5">
                <th className="pb-2 font-black">Chamado</th>
                <th className="pb-2 font-black">Cliente / Evento</th>
                <th className="pb-2 font-black">Canal</th>
                <th className="pb-2 font-black text-center">Status</th>
                <th className="pb-2 font-black text-center">SLA</th>
                <th className="pb-2 font-black text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredTickets.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-[#1E293B]/60 transition-colors">
                  <td className="py-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                    <span className="block text-[#F97316]">{t.id}</span>
                    <span className="text-[9.5px] text-slate-400 font-sans block">{t.date}</span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-start space-x-2">
                      <User className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{t.customer}</span>
                        <span className="text-[10px] text-slate-400 block">{t.email} • <strong>{t.event}</strong></span>
                        <p className="text-[10.5px] text-slate-600 dark:text-slate-300 mt-1 mb-0 max-w-md">{t.subject}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                      {t.channel}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                      t.status === 'Resolvido' 
                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                        : t.status === 'Em Análise'
                        ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
                        : 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 text-center font-semibold text-slate-500 text-[10px]">
                    {t.sla}
                  </td>
                  <td className="py-3 text-right">
                    {t.status !== 'Resolvido' ? (
                      <button
                        type="button"
                        onClick={() => handleResolveTicket(t.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10.5px] border-0 cursor-pointer shadow-xs"
                      >
                        Concluir
                      </button>
                    ) : (
                      <span className="text-[10px] text-emerald-500 font-bold flex items-center justify-end space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Finalizado</span>
                      </span>
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
}
