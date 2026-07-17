import React from 'react';

export function Button({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  ...props 
}) {
  const baseStyle = 'inline-flex items-center justify-center font-bold transition-all border-0 rounded-lg cursor-pointer select-none';
  
  const variants = {
    primary: 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white',
    outline: 'bg-transparent border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]/5',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white',
    ghost: 'bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'
  };

  const sizes = {
    xs: 'px-2 py-1.5 text-[10px]',
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-xs',
    lg: 'px-5 py-2.5 text-sm'
  };

  const variantStyle = variants[variant] || variants.primary;
  const sizeStyle = sizes[size] || sizes.md;
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${disabledStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
