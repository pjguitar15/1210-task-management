import { FormEvent } from "react";
import { cx } from "@/lib/utils";

export default function TodoForm({
  value,
  onChange,
  onSubmit,
  isPending,
}: {
  value: string;
  onChange: (next: string) => void;
  onSubmit: (e: FormEvent) => void;
  isPending?: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className='mb-6 flex gap-2'>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Write it down or forget it forever 🙄'
        className='h-12 flex-1 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-300 focus:border-zinc-400 font-bold'
      />
      <button
        type='submit'
        disabled={isPending}
        className={cx(
          'h-12 rounded-xl px-4 text-sm font-medium shadow-sm transition',
          'bg-[var(--brand-gold)] text-white hover:bg-[var(--brand-gold)] disabled:opacity-60 disabled:hover:bg-zinc-900 cursor-pointer hover:scale-105',
        )}
      >
        {isPending ? 'Adding…' : 'Add'}
      </button>
    </form>
  )
}
