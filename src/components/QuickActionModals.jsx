import React, { useState } from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { 
  X, 
  ShoppingCart, 
  Calendar, 
  UserPlus, 
  Ticket, 
  AlertOctagon, 
  CheckCircle 
} from 'lucide-react';

export default function QuickActionModals() {
  const {
    showQuickSaleModal, setShowQuickSaleModal,
    showQuickEventModal, setShowQuickEventModal,
    showQuickClientModal, setShowQuickClientModal,
    showQuickCourtesyModal, setShowQuickCourtesyModal,
    showQuickCancelModal, setShowQuickCancelModal,
    events,
    setEvents,
    setClients,
    triggerToast,
    bgCard,
    borderCol,
    textTitle,
    textSec,
    setFinancialStats,
    setEventLogs
  } = useDiskHub();

  // Quick Sale State
  const [saleEvent, setSaleEvent] = useState('ev-1');
  const [saleSector, setSaleSector] = useState('Pista Premium');
  const [saleQty, setSaleQty] = useState(1);
  const [salePayment, setSalePayment] = useState('pix');
  const [saleCustomer, setSaleCustomer] = useState('');

  // Quick Event State
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventCity, setEventCity] = useState('Curitiba - PR');
  const [eventVenue, setEventVenue] = useState('Pedreira Paulo Leminski');
  const [eventCapacity, setEventCapacity] = useState('5000');

  // Quick Client State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientDoc, setClientDoc] = useState('');

  // Quick Courtesy State
  const [courtesyEvent, setCourtesyEvent] = useState('ev-1');
  const [courtesySector, setCourtesySector] = useState('VIP Open Bar');
  const [courtesyBeneficiary, setCourtesyBeneficiary] = useState('');
  const [courtesyReason, setCourtesyReason] = useState('Imprensa & Mídia');
  const [courtesyQty, setCourtesyQty] = useState(2);

  // Quick Cancel State
  const [cancelCode, setCancelCode] = useState('');
  const [cancelReason, setCancelReason] = useState('Desistência do Comprador (Art. 49 CDC)');

  const handleProcessQuickSale = (e) => {
    e.preventDefault();
    const totalAmount = saleQty * 140;
    setFinancialStats(prev => ({
      ...prev,
      receita: prev.receita + totalAmount,
      saldo: prev.saldo + totalAmount,
      ingressos: prev.ingressos + saleQty,
      lucro: prev.lucro + (totalAmount * 0.82)
    }));
    setEventLogs(prev => [
      { 
        id: `log-${Date.now()}`, 
        timestamp: new Date().toLocaleTimeString(), 
        type: 'Venda Rápida', 
        message: `Venda concluída: ${saleQty}x ${saleSector} via ${salePayment.toUpperCase()} (R$ ${totalAmount.toFixed(2)})` 
      },
      ...prev.slice(0, 4)
    ]);
    triggerToast("⚡ Venda Rápida Concluída", `${saleQty} ingresso(s) emitido(s) com sucesso! Total: R$ ${totalAmount.toFixed(2)}`);
    setShowQuickSaleModal(false);
  };

  const handleProcessQuickEvent = (e) => {
    e.preventDefault();
    if (!eventName.trim()) return;
    const newEv = {
      id: `ev-${Date.now()}`,
      name: eventName,
      date: eventDate || '2026-10-15',
      time: '20:00',
      venue: eventVenue,
      city: eventCity,
      status: 'Ativo',
      capacity: parseInt(eventCapacity) || 5000,
      sold: 0,
      revenue: 0,
      category: 'Show / Festival'
    };
    setEvents(prev => [newEv, ...prev]);
    triggerToast("🎉 Evento Criado", `O evento "${eventName}" foi publicado com sucesso!`);
    setShowQuickEventModal(false);
    setEventName('');
  };

  const handleProcessQuickClient = (e) => {
    e.preventDefault();
    if (!clientName.trim()) return;
    const newCl = {
      id: `cli-${Date.now()}`,
      name: clientName,
      email: clientEmail || 'cliente@email.com',
      phone: clientPhone || '(41) 99999-0000',
      document: clientDoc || '000.000.000-00',
      totalSpent: 0,
      eventsCount: 0,
      status: 'Ativo'
    };
    setClients(prev => [newCl, ...prev]);
    triggerToast("👤 Cliente Cadastrado", `Cliente ${clientName} adicionado à base CRM.`);
    setShowQuickClientModal(false);
    setClientName('');
  };

  const handleProcessQuickCourtesy = (e) => {
    e.preventDefault();
    triggerToast("🎁 Cortesia Emitida", `${courtesyQty} cortesia(s) gerada(s) para ${courtesyBeneficiary || 'Convidado Especial'}.`);
    setShowQuickCourtesyModal(false);
  };

  const handleProcessQuickCancel = (e) => {
    e.preventDefault();
    triggerToast("🚫 Venda Cancelada", `Venda #${cancelCode || '89241'} cancelada e estorno solicitado.`);
    setShowQuickCancelModal(false);
  };

  return (
    <>
      {/* 1. MODAL NOVA VENDA RÁPIDA */}
      {showQuickSaleModal && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className={`${bgCard} border ${borderCol} rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-scaleUp`}>
            <div className={`p-4 border-b ${borderCol} flex justify-between items-center`}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#F97316]/10 text-[#F97316] flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${textTitle} mb-0`}>Nova Venda Rápida</h3>
                  <p className={`text-[10.5px] ${textSec} mb-0`}>Emita ingressos no balcão em 3 passos</p>
                </div>
              </div>
              <button onClick={() => setShowQuickSaleModal(false)} className={`bg-transparent border-0 cursor-pointer ${textSec} hover:text-white`}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleProcessQuickSale} className="p-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Evento</label>
                <select 
                  value={saleEvent} 
                  onChange={(e) => setSaleEvent(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  {events.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.name} ({ev.date})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Setor</label>
                  <select 
                    value={saleSector} 
                    onChange={(e) => setSaleSector(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="Pista Comum">Pista Comum (R$ 90)</option>
                    <option value="Pista Premium">Pista Premium (R$ 140)</option>
                    <option value="VIP Open Bar">Camarote VIP (R$ 250)</option>
                    <option value="Mezanino">Mezanino (R$ 110)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Quantidade</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10"
                    value={saleQty}
                    onChange={(e) => setSaleQty(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Forma de Pagamento</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'pix', label: '⚡ PIX', desc: 'Instantâneo' },
                    { id: 'cartao', label: '💳 Cartão', desc: 'POS / Link' },
                    { id: 'dinheiro', label: '💵 Dinheiro', desc: 'Em espécie' }
                  ].map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSalePayment(p.id)}
                      className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                        salePayment === p.id 
                          ? 'border-[#F97316] bg-[#F97316]/10 text-[#F97316] font-bold' 
                          : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#1E293B]/40 text-slate-400'
                      }`}
                    >
                      <span className="block text-xs font-bold">{p.label}</span>
                      <span className="block text-[9px] opacity-75">{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nome do Comprador (Opcional)</label>
                <input 
                  type="text" 
                  placeholder="Ex: João da Silva"
                  value={saleCustomer}
                  onChange={(e) => setSaleCustomer(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Total a Pagar:</span>
                  <span className="text-base font-black text-[#F97316]">R$ {(saleQty * 140).toFixed(2)}</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    type="button" 
                    onClick={() => setShowQuickSaleModal(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent text-slate-400 text-xs font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-1.5 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold border-0 cursor-pointer shadow-lg shadow-[#F97316]/20 flex items-center space-x-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Concluir Venda</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. MODAL NOVO EVENTO */}
      {showQuickEventModal && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className={`${bgCard} border ${borderCol} rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-scaleUp`}>
            <div className={`p-4 border-b ${borderCol} flex justify-between items-center`}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${textTitle} mb-0`}>Criar Novo Evento</h3>
                  <p className={`text-[10.5px] ${textSec} mb-0`}>Publique um novo show, festa ou festival</p>
                </div>
              </div>
              <button onClick={() => setShowQuickEventModal(false)} className={`bg-transparent border-0 cursor-pointer ${textSec} hover:text-white`}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleProcessQuickEvent} className="p-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nome do Evento</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Rock Festival 2026"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Data</label>
                  <input 
                    type="date" 
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Capacidade Total</label>
                  <input 
                    type="number" 
                    value={eventCapacity}
                    onChange={(e) => setEventCapacity(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Local / Venue</label>
                  <input 
                    type="text" 
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Cidade - UF</label>
                  <input 
                    type="text" 
                    value={eventCity}
                    onChange={(e) => setEventCity(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setShowQuickEventModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent text-slate-400 text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-1.5 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold border-0 cursor-pointer shadow-lg flex items-center space-x-1"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Publicar Evento</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. MODAL NOVO CLIENTE */}
      {showQuickClientModal && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className={`${bgCard} border ${borderCol} rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp`}>
            <div className={`p-4 border-b ${borderCol} flex justify-between items-center`}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 text-[#10B981] flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${textTitle} mb-0`}>Novo Cliente CRM</h3>
                  <p className={`text-[10.5px] ${textSec} mb-0`}>Cadastre comprador ou lead comercial</p>
                </div>
              </div>
              <button onClick={() => setShowQuickClientModal(false)} className={`bg-transparent border-0 cursor-pointer ${textSec} hover:text-white`}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleProcessQuickClient} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  placeholder="Nome do cliente"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">E-mail</label>
                <input 
                  type="email" 
                  placeholder="cliente@email.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Telefone / WhatsApp</label>
                  <input 
                    type="text" 
                    placeholder="(41) 99999-9999"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">CPF</label>
                  <input 
                    type="text" 
                    placeholder="000.000.000-00"
                    value={clientDoc}
                    onChange={(e) => setClientDoc(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setShowQuickClientModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent text-slate-400 text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold border-0 cursor-pointer shadow-lg"
                >
                  Cadastrar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL EMITIR CORTESIA */}
      {showQuickCourtesyModal && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className={`${bgCard} border ${borderCol} rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp`}>
            <div className={`p-4 border-b ${borderCol} flex justify-between items-center`}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center">
                  <Ticket className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${textTitle} mb-0`}>Emitir Cortesia</h3>
                  <p className={`text-[10.5px] ${textSec} mb-0`}>Liberação VIP com código de autorização</p>
                </div>
              </div>
              <button onClick={() => setShowQuickCourtesyModal(false)} className={`bg-transparent border-0 cursor-pointer ${textSec} hover:text-white`}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleProcessQuickCourtesy} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Evento</label>
                <select 
                  value={courtesyEvent} 
                  onChange={(e) => setCourtesyEvent(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                >
                  {events.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Setor</label>
                  <select 
                    value={courtesySector} 
                    onChange={(e) => setCourtesySector(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="VIP Open Bar">VIP Open Bar</option>
                    <option value="Pista Premium">Pista Premium</option>
                    <option value="Camarote Produtor">Camarote Produtor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Qtd Ingressos</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    value={courtesyQty} 
                    onChange={(e) => setCourtesyQty(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nome do Beneficiário</label>
                <input 
                  type="text" 
                  required
                  placeholder="Nome do convidado / influenciador"
                  value={courtesyBeneficiary}
                  onChange={(e) => setCourtesyBeneficiary(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Motivo da Cortesia</label>
                <input 
                  type="text" 
                  value={courtesyReason}
                  onChange={(e) => setCourtesyReason(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setShowQuickCourtesyModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent text-slate-400 text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-1.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold border-0 cursor-pointer shadow-lg"
                >
                  Gerar Cortesia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL CANCELAR VENDA */}
      {showQuickCancelModal && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className={`${bgCard} border ${borderCol} rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp`}>
            <div className={`p-4 border-b ${borderCol} flex justify-between items-center`}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#EF4444]/10 text-[#EF4444] flex items-center justify-center">
                  <AlertOctagon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${textTitle} mb-0`}>Cancelar Venda / Estorno</h3>
                  <p className={`text-[10.5px] ${textSec} mb-0`}>Invalidação de ingresso e estorno financeiro</p>
                </div>
              </div>
              <button onClick={() => setShowQuickCancelModal(false)} className={`bg-transparent border-0 cursor-pointer ${textSec} hover:text-white`}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleProcessQuickCancel} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Código da Venda ou Ingresso</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: #VND-89241 ou Código de Barras"
                  value={cancelCode}
                  onChange={(e) => setCancelCode(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Motivo do Cancelamento</label>
                <select 
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                >
                  <option value="Desistência do Comprador (Art. 49 CDC)">Desistência do Comprador (Art. 49 CDC - 7 dias)</option>
                  <option value="Duplicidade de Cobrança">Duplicidade de Cobrança / Erro do Cartão</option>
                  <option value="Fraude ou Estorno Solicitado pelo Banco">Suspeita de Fraude / Chargeback</option>
                  <option value="Cancelamento ou Mudança de Data do Evento">Alteração de Data do Evento</option>
                </select>
              </div>

              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10.5px]">
                ⚠️ <strong>Atenção:</strong> Ao confirmar, o QR Code do ingresso será imediatamente bloqueado nas catracas físicas e o estorno será enviado ao gateway.
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setShowQuickCancelModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent text-slate-400 text-xs font-semibold cursor-pointer"
                >
                  Fechar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-1.5 rounded-lg bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-bold border-0 cursor-pointer shadow-lg"
                >
                  Confirmar Cancelamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
