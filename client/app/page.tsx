import TodoApp from '@/components/TodoApp'

export default function Home() {
  return (
    <main className='flex w-full max-w-3xl flex-col items-center justify-center py-20 px-6 sm:px-12 mx-auto'>
      <div className='w-full'>
        <TodoApp />
      </div>
    </main>
  )
}
