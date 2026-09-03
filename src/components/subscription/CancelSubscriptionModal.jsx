import React, { useState } from 'react';
import { X, ShieldAlert } from 'lucide-react';

export default function CancelSubscriptionModal({ onClose, onConfirm }) {
  const [reason, setReason] = useState('price');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (!confirmed) return;
    onConfirm(reason);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[160] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn font-sans"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-w-md w-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] rounded-3xl p-6 shadow-2xl space-y-4 animate-scaleUp">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center space-x-2 text-rose-600">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-0">
              Cancelar Assinatura
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-white flex items-center justify-center border-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-300 space-y-1">
            <span className="font-bold block">Antes de cancelar, saiba que:</span>
            <ul className="m-0 pl-4 space-y-1">
              <li>Seu acesso permanecerá ativo até o fim do período pago (15/10/2026).</li>
              <li>Seus dados de clientes, financeiro e eventos <strong>NÃO serão apagados</strong>.</li>
              <li>Você poderá reativar seu plano a qualquer momento sem perda de histórico.</li>
            </ul>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Qual o principal motivo do cancelamento?
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
            >
              <option value="price">Preço / Adequação de Custos</option>
              <option value="not_using">Não estou utilizando no momento</option>
              <option value="missing_features">Falta de funcionalidades específicas</option>
              <option value="temporary_pause">Pausa temporária de eventos</option>
              <option value="other">Outro motivo</option>
            </select>
          </div>

          <label className="flex items-start space-x-2 pt-2 cursor-pointer text-slate-700 dark:text-slate-300 font-semibold">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-rose-600"
            />
            <span>Confirmo o cancelamento da renovação automática da minha assinatura.</span>
          </label>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-bold border-0 cursor-pointer"
          >
            Manter Minha Assinatura
          </button>
          <button
            type="button"
            data-testid="cancel-subscription-button"
            disabled={!confirmed}
            onClick={handleConfirm}
            className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-black border-0 cursor-pointer shadow-md transition-all"
          >
            Confirmar Cancelamento
          </button>
        </div>
      </div>
    </div>
  );
}
