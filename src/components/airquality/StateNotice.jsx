import { Loader2, AlertTriangle, MapPinOff, RotateCcw } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'

const ICONS = {
  loading: Loader2,
  error: AlertTriangle,
  empty: MapPinOff,
}

/**
 * StateNotice
 * Shared visual for the explorer's non-data states: idle/empty (no city
 * chosen yet), loading, and error (with a retry action).
 */
export default function StateNotice({ variant = 'empty', title, message, onRetry }) {
  const Icon = ICONS[variant] ?? MapPinOff
  const iconColor =
    variant === 'error' ? 'text-danger' : variant === 'loading' ? 'text-cyan-accent' : 'text-white/40'

  return (
    <GlassCard
      hover={false}
      className="mx-auto max-w-lg text-center"
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'loading' ? 'polite' : undefined}
    >
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
          <Icon size={24} className={`${iconColor} ${variant === 'loading' ? 'animate-spin' : ''}`} />
        </div>
        <div>
          <p className="text-base font-medium text-white">{title}</p>
          {message && <p className="mt-2 text-sm leading-relaxed text-white/55">{message}</p>}
        </div>
        {variant === 'error' && onRetry && (
          <button type="button" onClick={onRetry} className="btn-ghost mt-1 text-sm">
            <RotateCcw size={15} />
            Try again
          </button>
        )}
      </div>
    </GlassCard>
  )
}
