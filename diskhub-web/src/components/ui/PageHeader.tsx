import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({ title, description, badge, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
      <div>
        <div className="flex items-center space-x-2.5">
          <h1 className="text-2xl font-black text-white tracking-tight">{title}</h1>
          {badge}
        </div>
        {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
      </div>
      {actions && <div className="flex items-center space-x-2.5">{actions}</div>}
    </div>
  );
}
