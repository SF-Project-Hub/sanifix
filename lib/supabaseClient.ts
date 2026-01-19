import { createClient } from '@supabase/supabase-js';

const PUBLIC_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const PUBLIC_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(PUBLIC_URL && PUBLIC_ANON);

// Fallback: Mock-Client, damit UI im Demo-Modus ohne ENV nicht crasht
function createMockClient() {
  return {
    auth: {
      async getSession() {
        return { data: { session: null }, error: null };
      },
      async signInWithOtp() {
        return { data: {}, error: null };
      },
      async signInWithOAuth() {
        return { data: {}, error: null };
      },
      async signOut() {
        return { error: null };
      },
      async getUser() {
        return { data: { user: null }, error: null };
      },
      onAuthStateChange() {
        return { data: { subscription: { unsubscribe() {} } } } as any;
      }
    }
  } as any;
}

export const supabase = isSupabaseConfigured
  ? createClient(PUBLIC_URL as string, PUBLIC_ANON as string)
  : createMockClient();


