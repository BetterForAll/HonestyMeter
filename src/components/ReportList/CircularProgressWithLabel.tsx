import React from 'react';
import { cn } from '@/lib/utils';
interface CircularProgressWithLabelProps {
  value?: number;
  colorClass?: string;
}

export default function CircularProgressWithLabel({ value = 50, colorClass = 'text-emerald-600' }: CircularProgressWithLabelProps) {
  const circumference = 2 * Math.PI * 18; // radius = 18
  // Cap at 93% to ensure visible gap for values < 100 (round strokeLinecap adds visual length)
  const visualValue = value >= 100 ? 100 : Math.min(value, 93);
  const progress = ((100 - visualValue) / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center drop-shadow-sm">
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 40 40">
        {/* Background circle - softer gray */}
        <circle
          className="text-gray-100 stroke-current"
          strokeWidth="3"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
        />
        {/* Progress circle */}
        <circle
          className={cn("stroke-current transition-all duration-500 ease-out", colorClass)}
          strokeWidth="3"
          strokeLinecap="round"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: progress,
          }}
        />
      </svg>
      <span className={cn("absolute text-sm font-bold tracking-tight", colorClass)}>
        {value}
      </span>
    </div>
  );
}
