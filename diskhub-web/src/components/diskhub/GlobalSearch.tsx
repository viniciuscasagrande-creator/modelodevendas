import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  LayoutGrid,
  CreditCard,
  Users,
  Building,
  DollarSign,
  Megaphone,
  Headphones,
  BarChart3,
  ShieldCheck,
  Settings,
  X,
} from 'lucide-react';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const searchableItems = [
    { title: 'Dashboard Executivo', section: 'Navegação', path: '/app/dashboard', icon: LayoutDashboard },
    { title: 'Central de Apps', section: 'Navegação', path: '/app/apps', icon: LayoutGrid },
    { title: 'Planos & Soluções', section: 'Comercial', path: '/app/planos', icon: CreditCard },
    { title: 'Minha Assinatura', section: 'Gestão', path: '/app/assinatura', icon: ShieldCheck },
    { title: 'Configurações do Tenant', section: 'Gestão', path: '/app/configuracoes', icon: Settings },
    { title: 'CRM Comercial', section: 'Módulos', path: '/app/crm', icon: Users },
    { title: 'ERP Operacional', section: 'Módulos', path: '/app/erp', icon: Building },
    { title: 'Financeiro & Conciliação', section: 'Módulos', path: '/app/financeiro', icon: DollarSign },
    { title: 'Marketing & Audiência', section: 'Módulos', path: '/app/marketing', icon: Megaphone },
    { title: 'SAC & Suporte', section: 'Módulos', path: '/app/sac', icon: Headphones },
    { title: 'BI & Analytics', section: 'Módulos', path: '/app/bi', icon: BarChart3 },
  ];

  const filteredItems = useMemo(() => {
    if (!query.trim()) return searchableItems;
    const lower = query.toLowerCase();
    return searchableItems.filter(
      (item) => item.title.toLowerCase().includes(lower) || item.section.toLowerCase().includes(lower)
    );
  }, [query]);

  // Handle keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
          setQuery('');
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div
        className="w-full max-w-xl rounded-2xl bg-[#111721] border border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/[0.08] flex items-center space-x-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar páginas, módulos, planos..."
            className="w-full bg-transparent border-0 text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              Nenhum resultado encontrado para &quot;{query}&quot;.
            </div>
          ) : (
            filteredItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  onClose();
                  navigate(item.path);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 text-left cursor-pointer transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-all">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block group-hover:text-blue-300">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.section}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Abrir ↵</span>
              </button>
            ))
          )}
        </div>

        {/* Search Footer */}
        <div className="px-4 py-2 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-400">
          <span>Use ↵ para selecionar</span>
          <span>ESC para fechar</span>
        </div>
      </div>
    </div>
  );
}
