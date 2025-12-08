import React from 'react';
import { cn } from '@/lib/utils';
import { number, string } from 'prop-types';

export default function CircularProgressWithLabel({ value = 50, colorClass = 'text-green-500' }) {
  const circumference = 2 * Math.PI * 18; // radius = 18
  const progress = ((100 - value) / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
        {/* Background circle */}
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="4"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
        />
        {/* Progress circle */}
        <circle
          className={cn("stroke-current transition-all duration-300", colorClass)}
          strokeWidth="4"
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
      <span className={cn("absolute text-xs font-semibold", colorClass)}>
        {value}
      </span>
    </div>
  );
}

CircularProgressWithLabel.propTypes = {
  value: number,
  colorClass: string,
};
