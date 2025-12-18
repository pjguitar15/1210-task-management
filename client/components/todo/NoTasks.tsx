import { motion } from 'framer-motion'
import { FaTasks } from 'react-icons/fa'

const NoTasks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='flex flex-col items-center justify-center space-y-4 rounded-3xl p-12 text-center'
    >
      {/* Icon Container with Glassmorphism / Layering */}
      <div className='relative'>
        <div className='absolute inset-0 scale-150 blur-2xl bg-indigo-50/50 rounded-full' />
        <div className='relative flex items-center justify-center rounded-2xl'>
          <FaTasks className='h-14 w-14 text-zinc-400' />
        </div>
      </div>

      {/* Text Content */}
      <div className='flex flex-col items-center justify-center'>
        <h3 className='text-2xl font-bold text-zinc-600'>
          This list is empty… suspiciously empty.
        </h3>
        <p className='text-md leading-relaxed text-zinc-500'>
          Ready to be productive?
        </p>
        <p className='text-md leading-relaxed text-zinc-500'>
          Create your first task to see it here.
        </p>
      </div>
    </motion.div>
  )
}

export default NoTasks
