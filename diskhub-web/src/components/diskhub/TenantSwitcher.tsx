import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Building2, Shield, Loader2 } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { Badge } from '../ui/Badge';

export function TenantSwitcher() {
  const { tenant, availableTenants, switchTenant, isSwitchingTenant } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTenant = async (tenantId: string) => {
    if (tenantId === tenant?.id) {
      setIsOpen(false);
      return;
    }
    await switchTenant(tenantId);
    setIsOpen(false);
  };

  const getPlanBadgeVariant = (plan?: string) => {
    switch (plan?.toLowerCase()) {
      case 'expert':
        return 'warning';
      case 'advanced':
        return 'primary';
      case 'standard':
      default:
        return 'neutral';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        data-testid="tenant-switcher-trigger"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isSwitchingTenant}
        className="flex items-center space-x-2.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-[240px] sm:max-w-[280px]"
      >
        <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
          {isSwitchingTenant ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Building2 className="w-3.5 h-3.5" />
          )}
        </div>
        <div className="flex flex-col truncate leading-tight">
          <span
            data-testid="tenant-active-name"
            className="text-xs font-bold text-white truncate"
          >
            {tenant?.name || 'Diskingressos'}
          </span>
          <span className="text-[10px] text-slate-400 truncate flex items-center space-x-1">
            <span>{tenant?.activeProducer || 'Produtor Exemplo'}</span>
          </span>
        </div>
        <div className="flex items-center space-x-1 shrink-0 ml-auto">
          <Badge
            data-testid="tenant-active-badge"
            variant={getPlanBadgeVariant(tenant?.plan)}
            className="text-[9px] uppercase px-1.5 py-0"
          >
            {tenant?.plan || 'advanced'}
          </Badge>
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div
          data-testid="tenant-switcher-dropdown"
          className="absolute left-0 top-full mt-2 w-72 rounded-2xl bg-[#111721] border border-white/15 shadow-2xl p-1.5 z-50 animate-fadeIn"
        >
          <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Ambientes & Produtores
            </span>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Alterne o contexto de dados e assinaturas.
            </p>
          </div>

          <div className="space-y-1 max-h-64 overflow-y-auto">
            {availableTenants.map((t) => {
              const isCurrent = t.id === tenant?.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  data-testid={`tenant-option-${t.id}`}
                  onClick={() => handleSelectTenant(t.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-blue-600/15 border border-blue-500/30 text-white font-bold'
                      : 'hover:bg-white/5 text-slate-300 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      <Building2 className="w-3 h-3" />
                    </div>
                    <div className="truncate">
                      <span className="block truncate font-bold">{t.name}</span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        Função: {t.role}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0 ml-2">
                    <Badge
                      variant={getPlanBadgeVariant(t.plan)}
                      className="text-[9px] uppercase px-1.5 py-0"
                    >
                      {t.plan}
                    </Badge>
                    {isCurrent && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-2 mt-1 border-t border-white/[0.06] text-[10px] text-slate-400 flex items-center space-x-1.5">
            <Shield className="w-3 h-3 text-blue-400 shrink-0" />
            <span>Dados isolados por produtor (multitenant)</span>
          </div>
        </div>
      )}
    </div>
  );
}
