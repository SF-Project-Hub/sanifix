'use client';
import React from 'react';

type Point = { label: string; value: number };

export function BarMini({ data, height = 120 }: { data: Point[]; height?: number }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="w-full">
      <div className="flex items-end gap-2 h-[120px]" style={{ height }}>
        {data.map((d) => {
          const h = Math.round((d.value / max) * (height - 30));
          return (
            <div key={d.label} className="flex flex-col items-center justify-end flex-1">
              <div
                className="w-full bg-primary/20 rounded-t-md relative"
                style={{ height: `${h}px` }}
                aria-label={`${d.label}: ${d.value}`}
              >
                <span className="absolute top-1 inset-x-0 text-center text-[10px] font-semibold text-gray-900">
                  {d.value}
                </span>
              </div>
              <div className="text-[10px] text-gray-600 mt-1">{d.label}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-xs text-gray-700">
        Höchstwert: {max}
      </div>
    </div>
  );
}


