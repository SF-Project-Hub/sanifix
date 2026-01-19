import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/ui/Sidebar';
import { AuthGuard } from '@/components/auth/AuthGuard';

export const metadata: Metadata = {
  title: 'Sanifix',
  description: 'Sanifix – Kostenvoranschläge effizient erstellen und versenden'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <AuthGuard />
        <div className="min-h-screen flex">
          <Sidebar />
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}

