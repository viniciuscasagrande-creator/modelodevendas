import React, { useState } from 'react';
import { X, Send, Users } from 'lucide-react';
import { apps } from '../../config/apps';
import { subscriptionService } from '../../services/subscriptionService';

export default function InviteUserModal({ onClose, onInvite }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('operator');
  const [department, setDepartment] = useState('Comercial');
  const [selectedApps, setSelectedApps] = useState(['crm', 'erp']);

  // Only show modules contracted by the company
  const contractedAppIds = subscriptionService.getEntitlements();
  const availableApps = apps.filter(a => contractedAppIds.includes(a.id));

  const toggleApp = (id) => {
    if (selectedApps.includes(id)) {
      setSelectedApps(selectedApps.filter(a => a !== id));
    } else {
      setSelectedApps([...selectedApps, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    onInvite({
      name,
      email,
      role,
      department,
      apps: selectedApps
    });
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      data-testid="invite-modal"
      className="fixed inset-0 z-[160] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn font-sans"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-w-lg w-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] rounded-3xl p-6 shadow-2xl space-y-4 animate-scaleUp">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center space-x-2 text-[#F97316]">
            <Users className="w-5 h-5" />
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-0">
              Convidar Membro para a Equipe
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

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nome Completo *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: João da Silva"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">E-mail Corporativo *</label>
            <input
              type="email"
              required
              data-testid="invite-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="joao@empresa.com.br"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Papel de Acesso (RBAC) *</label>
              <select
                data-testid="invite-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
              >
                <option value="owner">Owner (Proprietário)</option>
                <option value="admin">Admin (Administrador)</option>
                <option value="manager">Manager (Gestor)</option>
                <option value="analyst">Analyst (Analista)</option>
                <option value="operator">Operator (Operador)</option>
                <option value="viewer">Viewer (Visualizador)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Departamento</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Ex: Comercial, Atendimento"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-1.5">
            <span className="font-bold text-slate-700 dark:text-slate-300 block">
              Módulos Liberados para este Usuário:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {availableApps.map(app => (
                <label 
                  key={app.id} 
                  className={`p-2 rounded-xl border flex items-center space-x-2 cursor-pointer transition-all ${
                    selectedApps.includes(app.id)
                      ? 'border-[#F97316] bg-orange-50/40 dark:bg-[#F97316]/5 text-[#F97316]'
                      : 'border-slate-200 dark:border-white/5 text-slate-500'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedApps.includes(app.id)}
                    onChange={() => toggleApp(app.id)}
                    className="rounded border-slate-300 text-[#F97316]"
                  />
                  <span className="text-[11px] font-bold">{app.shortName}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-bold border-0 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              data-testid="invite-submit"
              className="px-5 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-black border-0 cursor-pointer shadow-md flex items-center space-x-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar Convite</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
