'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { useState } from 'react';
import type { Route } from 'next';

const nav: Array<{ href: Route; label: string; locked?: boolean }> = [
  { href: '/', label: 'Dashboard' },
  { href: '/kostenvoranschlaege/new', label: 'KVA-Prozess starten' },
  { href: '/kostenvoranschlaege', label: 'Kostenvoranschläge' },
  { href: '/statistiken', label: 'Statistiken' },
  { href: '/settings', label: 'Einstellungen' },
  { href: '/vertraege', label: 'Verträge', locked: true }
];

export function Sidebar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      window.location.assign('/login');
    } finally {
      setLoading(false);
    }
  };
  return (
    <aside className="hidden md:flex w-64 bg-sidebar text-white flex-col">
      <div className="p-6 text-lg font-semibold tracking-wide">Sanifix</div>
      <nav className="flex-1 px-3 space-y-1">
        {nav.map((n) => {
          const active = pathname === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              className={clsx(
                'block px-3 py-2 rounded-lg',
                active ? 'bg-white/10' : 'hover:bg-white/5'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <span className="inline-flex items-center gap-2">
                {n.label}
                {n.locked && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 text-white/80"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6 10V8a6 6 0 1 1 12 0v2h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1Zm2 0h8V8a4 4 0 1 0-8 0v2Z" />
                  </svg>
                )}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 flex items-center justify-between">
        <span className="text-xs text-white/70">Demo-MVP</span>
        {isSupabaseConfigured ? (
          <button
            onClick={logout}
            disabled={loading}
            className="text-xs underline text-white/90 disabled:opacity-50"
          >
            Logout
          </button>
        ) : (
          <span className="text-xs text-white/60">ohne Login</span>
        )}
      </div>
    </aside>
  );
}

