import React, { useState } from 'react';
import { User, Building, Users, Shield, Check } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { useAppContext } from '../hooks/useAppContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function SettingsPage() {
  const { user, tenant } = useAppContext();
  const [activeTab, setActiveTab] = useState<'profile' | 'company' | 'users' | 'security'>('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Meu Perfil', icon: User },
    { id: 'company', label: 'Empresa & Tenant', icon: Building },
    { id: 'users', label: 'Usuários & Permissões', icon: Users },
    { id: 'security', label: 'Segurança & API', icon: Shield },
  ] as const;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <PageHeader
        title="Configurações do Sistema"
        description="Gerenciamento de perfil, informações cadastrais e segurança do tenant."
      />

      {/* Tabs */}
      <div className="flex border-b border-white/[0.08] space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-blue-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {saved && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center space-x-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Configurações salvas com sucesso!</span>
        </div>
      )}

      {/* Tab Contents */}
      {activeTab === 'profile' && (
        <div className="max-w-xl p-6 rounded-2xl bg-[#111721] border border-white/[0.08]">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="text-sm font-black text-white mb-2">Dados do Usuário</h3>
            <Input label="Nome Completo" defaultValue={user?.name || 'Vinicius Casagrande'} />
            <Input label="E-mail Corporativo" defaultValue={user?.email || 'vinicius@diskhub.com.br'} />
            <Input label="Cargo / Função" defaultValue={user?.role || 'CEO & Fundador'} disabled />
            <Button type="submit" size="sm">
              Salvar Alterações
            </Button>
          </form>
        </div>
      )}

      {activeTab === 'company' && (
        <div className="max-w-xl p-6 rounded-2xl bg-[#111721] border border-white/[0.08]">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="text-sm font-black text-white mb-2">Informações da Produtora</h3>
            <Input label="Razão Social" defaultValue={tenant?.name || 'Diskingressos & Produtores Associados'} />
            <Input label="CNPJ" defaultValue={tenant?.document || '12.345.678/0001-90'} />
            <Input label="Produtor Responsável" defaultValue={tenant?.activeProducer || 'Produtor Exemplo'} />
            <Button type="submit" size="sm">
              Atualizar Empresa
            </Button>
          </form>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="p-6 rounded-2xl bg-[#111721] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-white">Membros da Equipe</h3>
              <p className="text-xs text-slate-400">Usuários com acesso ao ambiente operacional.</p>
            </div>
            <Button size="sm">Convidar Membro</Button>
          </div>
          <div className="divide-y divide-white/[0.06] text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Vinicius Casagrande</span>
                <span className="text-[10px] text-slate-400">vinicius@diskhub.com.br</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 font-bold text-[10px]">
                Administrador
              </span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Roberto Carlos</span>
                <span className="text-[10px] text-slate-400">roberto@diskhub.com.br</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold text-[10px]">
                Financeiro
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="max-w-xl p-6 rounded-2xl bg-[#111721] border border-white/[0.08] space-y-4">
          <h3 className="text-sm font-black text-white mb-2">Chaves de API & Acesso</h3>
          <p className="text-xs text-slate-400">
            Chaves para integração do backend com webhooks e parceiros credenciados.
          </p>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs text-slate-300 break-all">
            dh_live_pk_9a8b7c6d5e4f3a2b1c
          </div>
          <Button size="sm" variant="outline">
            Regenerar Chave de API
          </Button>
        </div>
      )}
    </div>
  );
}
