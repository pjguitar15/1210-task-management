import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineSortDescending,
  HiOutlineSortAscending,
  HiOutlineFilter,
  HiFilter,
} from 'react-icons/hi'
import {
  IoCheckmarkDoneCircleOutline,
  IoCheckmarkDoneCircle,
} from 'react-icons/io5'

interface TodoUtilsProps {
  completedAtBottom: boolean
  setCompletedAtBottom: React.Dispatch<React.SetStateAction<boolean>>
  newestFirst: boolean
  setNewestFirst: React.Dispatch<React.SetStateAction<boolean>>
  showOnlyDone: boolean
  setShowOnlyDone: React.Dispatch<React.SetStateAction<boolean>>
}

const TodoUtils: React.FC<TodoUtilsProps> = ({
  completedAtBottom,
  setCompletedAtBottom,
  newestFirst,
  setNewestFirst,
  showOnlyDone,
  setShowOnlyDone,
}) => {
  return (
    <div className='flex items-center gap-1 p-1 mb-6 w-fit bg-zinc-100/80 backdrop-blur-sm rounded-lg border border-zinc-200/50'>
      <UtilButton
        onClick={() => setCompletedAtBottom((v) => !v)}
        isActive={completedAtBottom}
        tooltip='Move completed tasks to bottom'
      >
        <span className='relative z-10 flex items-center gap-1.5'>
          {completedAtBottom ? (
            <IoCheckmarkDoneCircle />
          ) : (
            <IoCheckmarkDoneCircleOutline />
          )}
          Done bottom
        </span>
        {completedAtBottom && <ActiveBackground id='bottom' />}
      </UtilButton>

      <Divider />

      <UtilButton
        onClick={() => setShowOnlyDone((v) => !v)}
        isActive={showOnlyDone}
        tooltip='Filter by completed tasks'
      >
        <span className='relative z-10 flex items-center gap-1.5'>
          {showOnlyDone ? <HiFilter /> : <HiOutlineFilter />}
          Only Done
        </span>
        {showOnlyDone && <ActiveBackground id='filter' />}
      </UtilButton>

      <Divider />

      <UtilButton
        onClick={() => setNewestFirst((v) => !v)}
        isActive={newestFirst}
        tooltip='Toggle sort order'
      >
        <span className='relative z-10 flex items-center gap-1.5'>
          <AnimatePresence mode='wait' initial={false}>
            <motion.div
              key={newestFirst ? 'newest' : 'oldest'}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              className='flex items-center gap-1.5'
            >
              {newestFirst ? (
                <HiOutlineSortDescending />
              ) : (
                <HiOutlineSortAscending />
              )}
              {newestFirst ? 'Newest' : 'Oldest'}
            </motion.div>
          </AnimatePresence>
        </span>
        {newestFirst && <ActiveBackground id='sort' />}
      </UtilButton>
    </div>
  )
}

const ActiveBackground = ({ id }: { id: string }) => (
  <motion.div
    layoutId={`active-pill-${id}`} // Unique ID so they can all be active at once
    className='absolute inset-0 bg-zinc-900 rounded-md'
    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
  />
)

const Divider = () => <div className='w-[1px] h-3 bg-zinc-300 mx-0.5' />

const UtilButton = ({ children, onClick, isActive, tooltip }: any) => {
  const [hover, setHover] = useState(false)
  return (
    <div className='relative'>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onClick}
        className={`relative px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors ${
          isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-800'
        }`}
      >
        {children}
      </motion.button>
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 text-white text-[10px] rounded whitespace-nowrap pointer-events-none'
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TodoUtils
