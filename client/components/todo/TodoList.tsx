import { Todo } from '@/lib/todos'
import { SkeletonList, TodoItem } from '@/components/todo'
import NoTasks from './NoTasks'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function TodoList({
  todos,
  isLoading,
  onToggle,
  onDelete,
  onEdit,
  deleteDisabled,
}: {
  todos: Todo[]
  isLoading?: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, next: string) => void
  deleteDisabled?: boolean
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    const el = listRef.current
    if (!el) return

    const checkOverflow = () => {
      setIsOverflowing(el.scrollHeight > el.clientHeight)
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [todos])

  if (isLoading) return <SkeletonList />
  if (todos.length === 0) return <NoTasks />

  return (
    <div className='relative'>
      <motion.div
        ref={listRef}
        layout
        className='flex flex-col gap-3 min-h-[55vh] max-h-[55vh] overflow-y-scroll pt-3 pe-5'
      >
        <AnimatePresence initial={false} mode='popLayout'>
          {todos.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, height: 0, margin: 0, padding: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <TodoItem
                todo={t}
                onToggle={() => onToggle(t.id)}
                onDelete={() => onDelete(t.id)}
                onEdit={(next) => onEdit(t.id, next)}
                deleteDisabled={deleteDisabled}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {isOverflowing && (
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-100 to-transparent' />
      )}
    </div>
  )
}
