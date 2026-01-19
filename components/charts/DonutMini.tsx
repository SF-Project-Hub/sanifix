'use client';
import React from 'react';

export function DonutMini({
  value = 98,
  size = 140,
  stroke = 14,
  label = 'Erfolgsquote'
}: {
  value?: number;
  size?: number;
  stroke?: number;
  label?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const dash = (clamped / 100) * circumference;
  const rest = circumference - dash;
  const center = size / 2;
  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${label}: ${clamped}%`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E5E7EB" /* gray-200 */
          strokeWidth={stroke}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#10B981" /* emerald-500 */
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${rest}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
        <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" className="fill-gray-900" style={{ fontSize: 18, fontWeight: 700 }}>
          {clamped}%
        </text>
      </svg>
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-xl font-semibold">{clamped}%</div>
      </div>
    </div>
  );
}






