import React, { ReactNode } from 'react';
import { ShieldAlert } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';

interface PermissionGuardProps {
  permission: string | string[];
  requireAll?: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}

export function PermissionGuard({
  permission,
  requireAll = false,
  fallback,
  children,
}: PermissionGuardProps) {
  const { hasPermission } = useAppContext();

  const permissions = Array.isArray(permission) ? permission : [permission];
  const hasAccess = requireAll
    ? permissions.every((p) => hasPermission(p))
    : permissions.some((p) => hasPermission(p));

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback !== undefined) {
    return <>{fallback}</>;
  }

  return (
    <div
      data-testid="permission-denied-message"
      className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center space-x-3 my-2"
    >
      <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
      <div>
        <p className="font-bold text-white">Ação ou recurso restrito</p>
        <p className="text-[11px] text-rose-300/80">
          Você não possui permissão para visualizar este item ({permissions.join(', ')}).
        </p>
      </div>
    </div>
  );
}
