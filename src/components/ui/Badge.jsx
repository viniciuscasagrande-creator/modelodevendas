import React from 'react';

export function Badge({ children, className = '', variant = 'default', ...props }) {
  const baseStyle = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none';
  
  const variants = {
    default: 'bg-[#2563EB]/10 text-[#2563EB]',
    success: 'bg-[#10B981]/10 text-[#10B981]',
    warning: 'bg-[#F97316]/10 text-[#F97316]',
    danger: 'bg-red-500/10 text-red-500',
    secondary: 'bg-slate-100 text-slate-800 dark:bg-white/5 dark:text-slate-350'
  };

  const variantStyle = variants[variant] || variants.default;

  return (
    <span className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </span>
  );
}
