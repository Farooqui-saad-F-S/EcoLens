import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'

/**
 * PollutantCard
 * Shows a pollutant's current reading with a status dot relative to a
 * "safe" reference level. Tapping/clicking expands a short plain-language
 * explanation of what the pollutant is.
 */
export default function PollutantCard({
  label,
  fullName,
  simpleMeaning,
  whyItMatters,
  value,
  unit,
  safe,
  description,
  color,
}) {
  const [expanded, setExpanded] = useState(false)
  const hasValue = typeof value === 'number' && !Number.isNaN(value)
  const overSafe = hasValue && safe ? value > safe : false
  const descriptionId = `pollutant-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-description`

  return (
    <GlassCard hover className="flex h-full w-full flex-col text-left">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-white">{label}</p>
          </div>
          <p className="mt-0.5 text-xs text-white/45">{fullName}</p>
        </div>
        <span
          className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 14px ${color}80` }}
        />
      </div>

      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="text-2xl font-semibold text-white">{hasValue ? value.toFixed(1) : '—'}</span>
        <span className="text-xs text-white/40">{unit}</span>
      </div>

      <p className="mt-3 text-sm font-medium leading-relaxed text-white/75">{simpleMeaning}</p>
      <div className="mt-3 border-l-2 border-white/10 pl-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
          Why it matters
        </p>
        <p className="mt-1 text-xs leading-relaxed text-white/50">{whyItMatters}</p>
      </div>

      {hasValue && safe != null && (
        <p className={`mt-3 text-[11px] ${overSafe ? 'text-danger' : 'text-emerald-accent'}`}>
          {overSafe ? 'Above' : 'Below'} reference value ({safe} {unit})
        </p>
      )}

      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
        aria-controls={descriptionId}
        className="mt-auto flex w-full items-center justify-between pt-4 text-xs font-medium text-cyan-accent/85 hover:text-cyan-accent"
      >
        <span>{expanded ? 'Show less' : 'Learn more'}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        id={descriptionId}
        aria-hidden={!expanded}
        className={`grid overflow-hidden transition-all duration-300 ease-out ${
          expanded ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="border-t border-white/10 pt-3 text-xs leading-relaxed text-white/55">
            {description}
          </p>
        </div>
      </div>
    </GlassCard>
  )
}
