import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface KpiCardProps {
  title: string;
  value: string;
  growth: string;
  isPositive: boolean;
  subtext?: string;
  icon: ReactNode;
  sparklineColor?: string;
  sparklineData?: number[];
  testId?: string;
}

export function KpiCard({
  title,
  value,
  growth,
  isPositive,
  subtext = 'vs. período anterior',
  icon,
  sparklineColor = '#2563EB',
  sparklineData = [20, 35, 25, 45, 30, 55, 60],
  testId,
}: KpiCardProps) {
  // Simple sparkline points calculation
  const max = Math.max(...sparklineData);
  const min = Math.min(...sparklineData);
  const range = max - min || 1;
  const width = 80;
  const height = 24;
  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div
      data-testid={testId}
      className="p-4 rounded-2xl bg-[#111721] border border-white/[0.08] hover:border-white/15 transition-all flex flex-col justify-between shadow-sm relative group"
    >
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-base xl:text-lg font-black text-white tracking-tight block whitespace-nowrap">
            {value}
          </span>
          <span className="text-xs text-slate-400 font-semibold block -mt-0.5 truncate">
            {title}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
        <div className="flex items-center space-x-1.5">
          <span
            className={cn(
              'text-xs font-bold',
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            {growth}
          </span>
          <span className="text-[10px] text-slate-400 truncate">{subtext}</span>
        </div>

        {/* Sparkline Visual */}
        <div className="w-16 h-5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <polyline
              fill="none"
              stroke={sparklineColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
