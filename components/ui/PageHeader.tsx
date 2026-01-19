import Link from 'next/link';
import type { Route } from 'next';

export function PageHeader({
  title,
  subtitle,
  cta
}: {
  title: string;
  subtitle?: string;
  cta?: { href: Route; label: string };
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:opacity-95 focus-visible:outline-none focus-ring"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}





