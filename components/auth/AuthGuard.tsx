'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export function AuthGuard() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Demo-Modus ohne Supabase: kein Redirect, App darf frei geladen werden
    if (!isSupabaseConfigured) return;
    if (pathname?.startsWith('/login')) return;
    let cancelled = false;
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!cancelled && !data.session) {
        router.replace('/login');
      }
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && !pathname?.startsWith('/login')) {
        router.replace('/login');
      }
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [pathname, router]);
  return null;
}


