import React from 'react';

export default function FeatureBadge({ checked, text, color = '#2563EB' }) {
  return (
    <li className="flex items-center space-x-2.5 text-xs text-slate-650 dark:text-slate-400">
      <span 
        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: checked ? `${color}15` : 'transparent', color: color }}
      >
        {checked ? (
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <span className="text-slate-350 dark:text-slate-700 font-normal">—</span>
        )}
      </span>
      <span className="text-[10.5px] truncate">{text}</span>
    </li>
  );
}
