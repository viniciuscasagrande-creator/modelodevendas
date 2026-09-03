import React, { useState } from 'react';
import { X, Check, Save, ExternalLink } from 'lucide-react';
import { defaultRoles } from '../../config/roles';
import { permissionsCatalog } from '../../config/permissions';
import { subscriptionService } from '../../services/subscriptionService';
import { useDiskHub } from '../../context/DiskHubContext';

export default function UserPermissionsModal({ user, onClose, onSaveRole }) {
  const { navigateTo } = useDiskHub();
  const [selectedRole, setSelectedRole] = useState(user.role);
  const contractedApps = subscriptionService.getEntitlements();

  const handleSave = () => {
    onSaveRole(user.id, selectedRole);
    onClose();
  };

  const roleDef = defaultRoles[selectedRole] || defaultRoles.operator;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      data-testid="permission-matrix"
      className="fixed inset-0 z-[160] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn font-sans"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-w-2xl w-full max-h-[85vh] flex flex-col bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] rounded-3xl p-6 shadow-2xl space-y-4 animate-scaleUp overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-[#F97316] flex items-center justify-center font-black text-sm">
              {user.avatar}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400">Perfil de Acesso & Permissões</span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-0">{user.name}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-white flex items-center justify-center border-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role Selector */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 dark:text-slate-300">Papel do Usuário:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white"
            >
              {Object.entries(defaultRoles).map(([k, r]) => (
                <option key={k} value={k}>{r.name}</option>
              ))}
            </select>
          </div>
          <p className="text-[11px] text-slate-400 mb-0 leading-relaxed">
            {roleDef.description}
          </p>
        </div>

        {/* Permissions Matrix by Module */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-400 block">
            Matriz de Ações por Módulo Licenciado
          </span>

          {Object.entries(permissionsCatalog).map(([modKey, mod]) => {
            const isContracted = modKey === 'administration' || contractedApps.includes(modKey);

            return (
              <div 
                key={modKey} 
                data-testid={`permission-module-${modKey}`}
                className={`p-4 rounded-2xl border ${
                  isContracted 
                    ? 'border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-[#1E293B]/20' 
                    : 'border-slate-200/50 dark:border-white/5 opacity-60 bg-slate-100/50 dark:bg-white/5'
                } space-y-2.5`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <span>{mod.name}</span>
                    {!isContracted && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-500 uppercase">
                        Não Contratado
                      </span>
                    )}
                  </span>

                  {!isContracted && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        navigateTo(`/produtos/${modKey}`);
                      }}
                      className="text-[10px] text-[#F97316] font-bold hover:underline bg-transparent border-0 cursor-pointer p-0 inline-flex items-center space-x-1"
                    >
                      <span>Conhecer Módulo</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {isContracted ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {mod.permissions.map(p => {
                      const isAllowed = roleDef.permissions.includes('*') || 
                                        roleDef.permissions.includes(p.id) ||
                                        roleDef.permissions.includes(`${modKey}.*`);

                      return (
                        <div key={p.id} className="flex items-center space-x-2 text-[11px] text-slate-600 dark:text-slate-300">
                          <div className={`w-4 h-4 rounded flex items-center justify-center ${
                            isAllowed ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-400'
                          }`}>
                            {isAllowed ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          </div>
                          <span className={isAllowed ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-400 line-through'}>
                            {p.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 mb-0">
                    Este módulo não está ativo no plano da sua empresa. Para configurar permissões nesta área, realize o upgrade do plano.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-bold border-0 cursor-pointer"
          >
            Fechar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-black border-0 cursor-pointer shadow-md flex items-center space-x-1.5 transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Salvar Alterações de Papel</span>
          </button>
        </div>

      </div>
    </div>
  );
}
