import React, { useState } from 'react';
import { Building2, UserCheck, Edit, Save } from 'lucide-react';
import { useDiskHub } from '../../context/DiskHubContext';

export default function AccountOwnerCard({ subscription, onOpenCancelModal }) {
  const { triggerToast } = useDiskHub();
  const [isEditing, setIsEditing] = useState(false);
  const company = subscription.company || {};

  const [formData, setFormData] = useState({
    legalName: company.legalName || 'Prime Show Produções e Eventos Ltda',
    tradeName: company.tradeName || 'Prime Show Eventos',
    document: company.document || '12.345.678/0001-90',
    email: company.email || 'financeiro@primeshow.com.br',
    phone: company.phone || '(41) 3322-1100',
    ownerName: 'Vinicius Casagrande',
    ownerEmail: 'vinicius@primeshow.com.br',
    ownerRole: 'Diretor Executivo (Owner)'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    triggerToast("Dados Atualizados", "As informações da empresa e do responsável foram salvas com sucesso.");
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      
      {/* 1. DADOS DA EMPRESA */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-[#F97316]" />
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-0">
              Dados da Empresa Contratante
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold border-0 cursor-pointer transition-all flex items-center space-x-1.5"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancelar Edição' : 'Editar Dados'}</span>
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Razão Social</label>
                <input
                  type="text"
                  value={formData.legalName}
                  onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nome Fantasia</label>
                <input
                  type="text"
                  value={formData.tradeName}
                  onChange={(e) => setFormData({ ...formData, tradeName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">CNPJ (Faturamento)</label>
                <input
                  type="text"
                  disabled
                  value={formData.document}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-400 font-mono cursor-not-allowed"
                  title="Alteração de CNPJ requer validação cadastral"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">E-mail Financeiro</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Telefone Principal</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs border-0 cursor-pointer shadow-md flex items-center space-x-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Salvar Alterações</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Razão Social:</span>
              <p className="font-black text-slate-900 dark:text-white mb-0">{formData.legalName}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Nome Fantasia:</span>
              <p className="font-black text-slate-900 dark:text-white mb-0">{formData.tradeName}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">CNPJ:</span>
              <p className="font-mono font-black text-slate-900 dark:text-white mb-0">{formData.document}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">E-mail Financeiro:</span>
              <p className="font-black text-slate-900 dark:text-white mb-0">{formData.email}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Telefone de Contato:</span>
              <p className="font-black text-slate-900 dark:text-white mb-0">{formData.phone}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Sede Cadastrada:</span>
              <p className="font-black text-slate-900 dark:text-white mb-0">Curitiba / PR</p>
            </div>
          </div>
        )}
      </div>

      {/* 2. RESPONSÁVEL DA CONTA (ACCOUNT OWNER) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm space-y-3">
        <div className="flex items-center space-x-2">
          <UserCheck className="w-5 h-5 text-purple-500" />
          <h3 className="text-base font-black text-slate-900 dark:text-white mb-0">
            Responsável Legal da Conta (Account Owner)
          </h3>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-500/5 border border-purple-200 dark:border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-black text-sm text-slate-900 dark:text-white block">
              {formData.ownerName}
            </span>
            <span className="text-slate-500 block">{formData.ownerRole}</span>
            <span className="font-mono text-slate-400 block">{formData.ownerEmail}</span>
          </div>

          <div className="text-[11px] text-slate-400 sm:text-right">
            <span>Titular com plenos poderes de contratação e administração.</span>
          </div>
        </div>
      </div>

      {/* 3. GERENCIAR OU CANCELAR ASSINATURA */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#1E293B]/20 border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">Encerramento da Assinatura</span>
          <p className="text-slate-400 mb-0 text-[11px]">Você pode desativar a renovação automática a qualquer momento.</p>
        </div>

        <button
          type="button"
          onClick={onOpenCancelModal}
          className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-200 dark:border-rose-500/20 cursor-pointer transition-all"
        >
          Cancelar Assinatura
        </button>
      </div>

    </div>
  );
}
