import { useState } from 'react'
import { InlineEditableTitle } from '@/components/todo'
import { Todo } from '@/lib/todos'
import { FaTrash } from 'react-icons/fa'
import { GoldCheckbox } from '../ui/GoldCheckbox'
import ConfirmModal from '../ui/ConfirmModal' 

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  deleteDisabled,
}: {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
  onEdit: (next: string) => void
  deleteDisabled?: boolean
}) {
  const createdAt = todo.created_at
    ? new Date(todo.created_at).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : null

  const [isConfirmOpen, setIsConfirmOpen] = useState(false) 

  return (<> 
    <div className='group flex items-center justify-between gap-3 p-4 rounded-xl bg-white shadow-sm transition hover:bg-zinc-50'>
      <div className='flex items-center gap-3 w-1/2'>
        <GoldCheckbox
          checked={Boolean(todo.is_completed)}
          onChange={onToggle}
        />

        <div className='flex flex-col gap-0.5 width-full grow'>
          <InlineEditableTitle
            value={todo.title}
            is_completed={Boolean(todo.is_completed)}
            onSave={onEdit}
          />
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <span className='text-xs text-zinc-300 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0'>
          Added {createdAt}
        </span>
        <button
          onClick={() => !deleteDisabled && setIsConfirmOpen(true)}
          disabled={deleteDisabled}
          className='ml-auto rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 cursor-pointer'
          title='Delete'
        >
          <FaTrash className='text-zinc-300 text-lg transition duration-200 hover:text-[var(--brand-gold)] hover:scale-110' />
        </button>
      </div>
    </div>

    <ConfirmModal
      isOpen={isConfirmOpen}
      title='Delete task'
      destructive
      confirmLabel='Delete'
      onCancel={() => setIsConfirmOpen(false)}
      onConfirm={() => {
        setIsConfirmOpen(false)
        onDelete()
      }}
    >
      Are you sure you want to delete this task? This action cannot be undone.
    </ConfirmModal>
  </>)
}
