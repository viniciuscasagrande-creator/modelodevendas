import React from 'react';
import { ShieldX, ArrowLeft } from 'lucide-react';

export default function AccessDenied({ reason = 'PERMISSION_DENIED', customMessage = null }) {

  const messages = {
    PERMISSION_DENIED: 'Você não possui permissão para acessar esta área ou executar esta ação. Se precisar deste acesso, solicite ao administrador da sua empresa.',
    APP_ACCESS_DENIED: 'Sua empresa possui este módulo contratado, mas seu perfil de usuário não possui acesso liberado a ele. Solicite liberação ao administrador.',
    USER_SUSPENDED: 'Seu usuário está temporariamente suspenso no ambiente desta empresa. Entre em contato com o gestor da sua conta.',
    ROLE_REQUIRED: 'Esta funcionalidade requer um nível de permissão administrativo mais elevado.'
  };

  const message = customMessage || messages[reason] || messages.PERMISSION_DENIED;

  return (
    <div data-testid="access-denied" className="py-16 px-4 flex items-center justify-center animate-fadeIn font-sans">
      <div className="max-w-md w-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] rounded-3xl p-8 text-center shadow-xl space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-sm">
          <ShieldX className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10">
            Acesso Não Autorizado
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-0">
            Permissão Insuficiente
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-0">
            {message}
          </p>
        </div>

        <div className="pt-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold border-0 cursor-pointer transition-all inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para Tela Anterior</span>
          </button>
        </div>
      </div>
    </div>
  );
}
