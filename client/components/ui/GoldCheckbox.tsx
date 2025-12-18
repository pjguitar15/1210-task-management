import clsx from 'clsx'
import { IoCheckmarkSharp } from 'react-icons/io5'

type GoldCheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const SIZE_MAP = {
  sm: {
    box: 'h-5 w-5',
    icon: 'h-3 w-3',
  },
  md: {
    box: 'h-7 w-7',
    icon: 'h-4 w-4',
  },
  lg: {
    box: 'h-9 w-9',
    icon: 'h-5 w-5',
  },
}

export function GoldCheckbox({
  checked,
  onChange,
  className,
  size = 'md',
  disabled = false,
}: GoldCheckboxProps) {
  const { box, icon } = SIZE_MAP[size]

  return (
    <label
      className={clsx(
        'relative inline-flex items-center justify-center',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      )}
    >
      <input
        type='checkbox'
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className={clsx(
          'peer appearance-none rounded-lg transition-colors duration-200 cursor-pointer',
          box,
          checked ? 'bg-[var(--brand-gold)]' : 'bg-zinc-100 hover:bg-zinc-200',
        )}
      />

      <IoCheckmarkSharp
        className={clsx(
          'pointer-events-none absolute text-white transition-opacity duration-200',
          icon,
          checked ? 'text-white' : 'text-zinc-400',
        )}
      />
    </label>
  )
}
