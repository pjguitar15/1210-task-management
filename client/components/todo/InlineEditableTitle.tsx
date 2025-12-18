import { useState } from 'react'
import { cx } from '@/lib/utils'

export default function InlineEditableTitle({
  value,
  is_completed,
  onSave,
}: {
  value: string
  is_completed: boolean
  onSave: (next: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  // keep draft in sync when cache updates
  if (!editing && draft !== value) setDraft(value)

  function commit() {
    const v = draft.trim()
    setEditing(false)
    if (!v || v === value) return
    onSave(v)
  }

  return editing ? (
    <input
      autoFocus
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') commit()
        if (e.key === 'Escape') {
          setDraft(value)
          setEditing(false)
        }
      }}
      className='h-10 flex-1 px-3 text-sm text-zinc-900 outline-none focus:border-zinc-400 font-bold border-b capitalize'
    />
  ) : (
    <div className='relative group flex-1'>
      <button
        type='button'
        onClick={() => setEditing(true)}
        className={cx(
          'w-full text-left text-sm cursor-pointer font-bold capitalize duration-150 hover:text-zinc-700 focus:outline-none',
          is_completed ? 'text-zinc-400 line-through' : 'text-zinc-900',
        )}
        aria-label='Edit task title'
      >
        {value}
      </button>

      {/* custom tooltip */}
      <div
        role='tooltip'
        className='
          pointer-events-none
          absolute left-0 top-full mt-2
          z-10
          w-max max-w-xs
          rounded-lg border border-zinc-200 bg-white px-2 py-1
          text-xs text-zinc-700 shadow-sm
          opacity-0 translate-y-1
          transition
          group-hover:opacity-100 group-hover:translate-y-0
          group-focus-within:opacity-100 group-focus-within:translate-y-0
        '
      >
        Click to edit • Enter to save • Esc to cancel
      </div>
    </div>
  )
}
