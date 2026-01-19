import clsx from 'clsx';

export function Alert({
  kind = 'info',
  children
}: {
  kind?: 'success' | 'error' | 'info' | 'warning';
  children: React.ReactNode;
}) {
  const styles =
    kind === 'success'
      ? 'bg-green-50 text-green-800 border-green-200'
      : kind === 'error'
      ? 'bg-red-50 text-red-800 border-red-200'
      : kind === 'warning'
      ? 'bg-yellow-50 text-yellow-800 border-yellow-200'
      : 'bg-blue-50 text-blue-800 border-blue-200';
  const role = kind === 'error' ? 'alert' : 'status';
  const ariaLive = kind === 'error' ? 'assertive' : 'polite';
  return (
    <div
      role={role}
      aria-live={ariaLive}
      className={clsx('rounded-xl border px-3 py-2 text-sm', styles)}
    >
      {children}
    </div>
  );
}


