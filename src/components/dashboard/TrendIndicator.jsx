import React from 'react';

export default function TrendIndicator({ value = 0, suffix = '%', label = null }) {
  const num = typeof value === 'number' ? value : parseFloat(value) || 0;
  const isPositive = num > 0;
  const isNegative = num < 0;

  if (isPositive) {
    return (
      <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
        <span>↑</span>
        <span>{num > 0 ? `+${num}` : num}{suffix}</span>
        {label && <span className="text-[9px] text-emerald-700/70 dark:text-emerald-300/70 font-normal ml-0.5">{label}</span>}
      </span>
    );
  }

  if (isNegative) {
    return (
      <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400">
        <span>↓</span>
        <span>{num}{suffix}</span>
        {label && <span className="text-[9px] text-rose-700/70 dark:text-rose-300/70 font-normal ml-0.5">{label}</span>}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400">
      <span>—</span>
      <span>0,0{suffix}</span>
      {label && <span className="text-[9px] text-slate-400 font-normal ml-0.5">{label}</span>}
    </span>
  );
}
