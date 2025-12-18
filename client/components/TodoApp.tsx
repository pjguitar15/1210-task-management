'use client'

import { FormEvent, useMemo, useState } from 'react'
import { useTodos } from '@/hooks/useTodos'
import { UI } from '@/lib/constants'
import { useDebouncedValue } from '@/lib/utils'
import { TodoForm, TodoList, SearchInput, SkeletonList } from '@/components/todo'
import Image from 'next/image'
import logo from '@/public/assets/logo.png'

export default function TodoApp() {
  const [title, setTitle] = useState('')
  const [q, setQ] = useState('')
  const debouncedQ = useDebouncedValue(q, UI.searchDebounceMs)

  const {
    todos,
    isLoading,
    isFetching,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    onToggle,
    onDelete,
    onEdit,
  } = useTodos(debouncedQ)
  
  const stats = useMemo(() => {
    const total = todos.length
    const done = todos.filter((t) => t.is_completed).length
    return { total, done, left: total - done }
  }, [todos])

  function onCreate(e: FormEvent) {
    e.preventDefault()
    const v = title.trim()
    if (!v) return

    createTodo.mutate(
      { title: v },
      {
        onSuccess: () => setTitle(''),
      },
    )
  }

  return (
    <div className='w-full'>
      <Image width={200} height={200} src={logo} alt='1210' />
      <div className='mb-8 flex items-start justify-between gap-4 mt-6 text-zinc-500'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-zinc-950'>
            Tasks
          </h1>
          <p className='mt-2 text-sm'>
            {stats.left} left • {stats.done} done • {stats.total} total
            {isFetching ? ' • syncing…' : ''}
          </p>
        </div>

        <SearchInput value={q} onChange={setQ} />
      </div>

      <TodoForm
        value={title}
        onChange={setTitle}
        onSubmit={onCreate}
        isPending={createTodo.isPending}
      />

      {error ? (
        <div className='rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800'>
          Failed to load tasks.{' '}
          <button
            className='underline underline-offset-2'
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      ) : null}

      <div className='flex flex-col gap-3'>
        <TodoList
          todos={todos}
          isLoading={isLoading}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          deleteDisabled={deleteTodo.isPending}
        />
      </div>
    </div>
  )
}
