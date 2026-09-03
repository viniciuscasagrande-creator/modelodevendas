import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  AlertCircle,
  Trash2,
  Key
} from 'lucide-react';
import { apiService } from '../../services/apiService';
import { defaultRoles } from '../../config/roles';
import { useDiskHub } from '../../context/DiskHubContext';
import InviteUserModal from '../../components/users/InviteUserModal';
import UserPermissionsModal from '../../components/users/UserPermissionsModal';

export default function UsersManagementPage({ onUpgrade }) {
  const { triggerToast } = useDiskHub();
  const [users, setUsers] = useState([]);
  const [usage, setUsage] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | active | pending | suspended | admin
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editingPermissionsUser, setEditingPermissionsUser] = useState(null);

  const loadData = async () => {
    const list = await apiService.getUsers();
    setUsers(list);
    const u = await apiService.getUsage();
    setUsage(u);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInvite = async (inviteData) => {
    // Check user limit
    if (usage && usage.users.used >= usage.users.limit) {
      triggerToast("Limite Atingido", "Você atingiu o limite de usuários do seu plano. Adicione mais licenças.");
      return;
    }

    setShowInviteModal(false);
    await apiService.inviteUser(inviteData);
    await loadData();
    triggerToast("Convite Enviado!", `O convite para ${inviteData.name} (${inviteData.email}) foi enviado.`);
  };

  const handleSaveRole = async (userId, newRole) => {
    try {
      await apiService.updateUserRole(userId, newRole);
      await loadData();
      triggerToast("Papel Atualizado", "As permissões do usuário foram sincronizadas.");
    } catch (err) {
      triggerToast("Atenção", err.message);
    }
  };

  const handleToggleSuspend = async (user) => {
    try {
      await apiService.suspendUser(user.id);
      await loadData();
      const statusText = user.status === 'suspended' ? 'reativado' : 'suspenso';
      triggerToast("Status Alterado", `O usuário ${user.name} foi ${statusText}.`);
    } catch (err) {
      triggerToast("Atenção", err.message);
    }
  };

  const handleRemoveUser = async (user) => {
    try {
      await apiService.removeUser(user.id);
      await loadData();
      triggerToast("Usuário Removido", `${user.name} foi desvinculado desta empresa.`);
    } catch (err) {
      triggerToast("Atenção", err.message);
    }
  };

  const filteredUsers = users.filter(u => {
    const term = search.toLowerCase();
    const matchSearch = u.name.toLowerCase().includes(term) ||
                        u.email.toLowerCase().includes(term) ||
                        u.role.toLowerCase().includes(term) ||
                        u.department.toLowerCase().includes(term);

    if (!matchSearch) return false;

    if (statusFilter === 'active') return u.status === 'active';
    if (statusFilter === 'pending') return u.status === 'pending';
    if (statusFilter === 'suspended') return u.status === 'suspended';
    if (statusFilter === 'admin') return u.role === 'owner' || u.role === 'admin';
    return true;
  });

  const activeCount = users.filter(u => u.status === 'active').length;
  const pendingCount = users.filter(u => u.status === 'pending').length;

  return (
    <div data-testid="users-page" className="space-y-6 animate-fadeIn font-sans">
      
      {/* 1. TOP STATS AND ACTIONS STRIP */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#F97316]" />
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-0">
              Equipe & Gestão de Acessos (RBAC)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mb-0">
            {users.length} membros na conta • {activeCount} ativos • {pendingCount} convites pendentes
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            data-testid="invite-user-button"
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black border-0 cursor-pointer shadow-md flex items-center space-x-1.5 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Convidar Usuário</span>
          </button>
        </div>
      </div>

      {/* 2. USER LIMIT ALERT IF CLOSE OR REACHED */}
      {usage && usage.users.used >= usage.users.limit && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300 font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Limite de usuários do seu plano atingido ({usage.users.used} de {usage.users.limit}). Adicione licenças para convidar mais pessoas.</span>
          </div>
          <button
            type="button"
            onClick={onUpgrade}
            className="px-3.5 py-1.5 rounded-xl bg-[#F97316] text-white font-black border-0 cursor-pointer text-xs shrink-0"
          >
            Adicionar Licenças
          </button>
        </div>
      )}

      {/* 3. SEARCH & FILTERS BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            data-testid="user-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, e-mail, papel ou departamento..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#F97316]"
          />
        </div>

        <div data-testid="user-status-filter" className="flex items-center space-x-1.5 text-xs overflow-x-auto">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'active', label: `Ativos (${activeCount})` },
            { id: 'pending', label: `Convites (${pendingCount})` },
            { id: 'admin', label: 'Administradores' },
            { id: 'suspended', label: 'Suspensos' }
          ].map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl font-bold border-0 cursor-pointer transition-all ${
                statusFilter === f.id
                  ? 'bg-[#F97316] text-white shadow-xs'
                  : 'bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. USERS TABLE */}
      <div data-testid="users-table" className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 uppercase text-[10px] font-black">
                <th className="py-3 px-4">Membro</th>
                <th className="py-3 px-4">Papel (Role)</th>
                <th className="py-3 px-4">Apps Liberados</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredUsers.map(u => {
                const roleDef = defaultRoles[u.role] || defaultRoles.operator;
                return (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-[#1E293B]/40 transition-colors">
                    
                    {/* User Profile */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-[#F97316] flex items-center justify-center font-black text-xs shrink-0">
                          {u.avatar}
                        </div>
                        <div>
                          <span className="font-black text-slate-900 dark:text-white text-xs block">
                            {u.name}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono block">
                            {u.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="py-3.5 px-4">
                      <span data-testid="user-role" className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${roleDef.badgeColor}`}>
                        {roleDef.name.split(' ')[0]}
                      </span>
                    </td>

                    {/* Apps Access */}
                    <td className="py-3.5 px-4">
                      <div data-testid="user-app-access" className="flex flex-wrap gap-1">
                        {u.role === 'owner' ? (
                          <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400">Todos os contratados</span>
                        ) : (
                          u.apps?.map(appId => (
                            <span key={appId} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-[9.5px] font-semibold text-slate-600 dark:text-slate-300 uppercase">
                              {appId}
                            </span>
                          ))
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {u.status === 'active' && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase">
                          Ativo
                        </span>
                      )}
                      {u.status === 'pending' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold text-[10px] uppercase">
                          Convite Pendente
                        </span>
                      )}
                      {u.status === 'suspended' && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 font-bold text-[10px] uppercase">
                          Suspenso
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingPermissionsUser(u)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-[#F97316] hover:text-white text-slate-700 dark:text-slate-300 text-xs font-bold border-0 cursor-pointer transition-all inline-flex items-center space-x-1"
                          title="Visualizar e editar matriz de permissões"
                        >
                          <Key className="w-3 h-3" />
                          <span>Permissões</span>
                        </button>

                        {u.role !== 'owner' && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleToggleSuspend(u)}
                              className={`px-2 py-1 rounded-lg text-xs font-bold border-0 cursor-pointer transition-all ${
                                u.status === 'suspended'
                                  ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200'
                              }`}
                              title={u.status === 'suspended' ? 'Reativar acesso' : 'Suspender usuário'}
                            >
                              {u.status === 'suspended' ? 'Ativar' : 'Suspender'}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRemoveUser(u)}
                              className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-rose-100 hover:text-rose-600 text-slate-400 flex items-center justify-center border-0 cursor-pointer transition-all"
                              title="Remover da empresa"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. MODALS */}
      {showInviteModal && (
        <InviteUserModal
          onClose={() => setShowInviteModal(false)}
          onInvite={handleInvite}
        />
      )}

      {editingPermissionsUser && (
        <UserPermissionsModal
          user={editingPermissionsUser}
          onClose={() => setEditingPermissionsUser(null)}
          onSaveRole={handleSaveRole}
        />
      )}

    </div>
  );
}
