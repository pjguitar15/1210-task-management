type ConfirmModalProps = {
  isOpen: boolean
  title?: string
  children?: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({
  isOpen,
  title = 'Are you sure?',
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-lg"
      >
        <h3 className="mb-2 text-lg font-semibold text-zinc-900">{title}</h3>
        <p className="mb-6 text-sm text-zinc-600">{children}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 cursor-pointer"
          >
            {cancelLabel}
          </button>

          <button
            onClick={onConfirm}
            className={
              `rounded-lg px-4 py-2 text-sm font-medium cursor-pointer ` +
              (destructive
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-[var(--brand-gold)] text-black hover:brightness-95')
            }
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
