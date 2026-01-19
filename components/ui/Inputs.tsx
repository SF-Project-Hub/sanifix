import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx(
        'w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm',
        'focus-visible:outline-none focus-ring',
        props.className
      )}
    />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={clsx(
        'w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm',
        'focus-visible:outline-none focus-ring',
        props.className
      )}
    />
  );
}





