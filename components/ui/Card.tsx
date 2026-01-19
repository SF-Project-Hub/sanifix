import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  // twMerge stellt sicher, dass Hintergrund-Klassen (bg-*) korrekt zusammengeführt werden
  const classes = twMerge('bg-white rounded-2xl shadow-card p-6', className);
  return <div className={classes}>{children}</div>;
}

