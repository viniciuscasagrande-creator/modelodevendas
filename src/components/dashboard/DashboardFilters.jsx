import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

export default function DashboardFilters({ 
  period = '30d', 
  eventId = 'all', 
  onPeriodChange, 
  onEventChange 
}) {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-09-30');

  const periodOptions = [
    { id: 'today', label: 'Hoje' },
    { id: '7d', label: 'Últimos 7 dias' },
    { id: '30d', label: 'Últimos 30 dias' },
    { id: 'month', label: 'Este mês' },
    { id: 'custom', label: 'Personalizado...' }
  ];

  const eventOptions = [
    { id: 'all', label: 'Todos os eventos' },
    { id: 'ev-1', label: 'Metal Fest Curitiba 2026' },
    { id: 'ev-2', label: 'Festival de Inverno 2026' },
    { id: 'ev-3', label: 'Réveillon das Estrelas 2027' },
    { id: 'ev-4', label: 'Festival Kids Curitiba' }
  ];

  const handlePeriodSelect = (pId) => {
    if (pId === 'custom') {
      setShowCustomModal(true);
    } else {
      onPeriodChange(pId);
    }
  };

  const handleApplyCustom = (e) => {
    e.preventDefault();
    onPeriodChange('custom', { startDate, endDate });
    setShowCustomModal(false);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
      
      {/* LEFT: Event Filter */}
      <div className="flex items-center space-x-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
          Filtro:
        </span>
        <div className="relative inline-flex items-center">
          <select
            data-testid="dashboard-event-filter"
            value={eventId}
            onChange={(e) => onEventChange(e.target.value)}
            className="appearance-none bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] text-slate-800 dark:text-slate-200 text-xs font-bold py-1.5 pl-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:border-[#F97316] cursor-pointer"
          >
            {eventOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
        </div>
      </div>

      {/* RIGHT: Period Quick Select Buttons + Dropdown */}
      <div className="flex items-center space-x-1.5">
        <div className="relative inline-flex items-center">
          <select
            data-testid="dashboard-period-filter"
            value={period}
            onChange={(e) => handlePeriodSelect(e.target.value)}
            className="appearance-none bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] text-slate-800 dark:text-slate-200 text-xs font-bold py-1.5 pl-8 pr-8 rounded-lg shadow-sm focus:outline-none focus:border-[#F97316] cursor-pointer"
          >
            {periodOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
          <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
        </div>
      </div>

      {/* CUSTOM MODAL */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] rounded-2xl p-5 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <span className="font-bold text-slate-900 dark:text-white text-sm">Selecionar Período Personalizado</span>
              <button 
                type="button" 
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleApplyCustom} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Data Inicial</label>
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Data Final</label>
                <input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-mono"
                />
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold border-0 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#F97316] text-white font-bold border-0 cursor-pointer shadow-md"
                >
                  Aplicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
