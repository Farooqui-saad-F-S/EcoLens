import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'

const ICON_ACCENTS = {
  cyan: 'border-cyan-accent/20 bg-cyan-accent/10 text-cyan-accent',
  blue: 'border-blue-accent/20 bg-blue-accent/10 text-blue-300',
  emerald: 'border-emerald-accent/20 bg-emerald-accent/10 text-emerald-accent',
}

export default function WaterParameterCard({ parameter }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = parameter.icon
  const panelId = `water-parameter-${parameter.id}`

  return (
    <GlassCard glow={parameter.accent} className="flex h-full flex-col">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${ICON_ACCENTS[parameter.accent]}`}
      >
        <Icon size={22} aria-hidden="true" />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-white">{parameter.name}</h3>
      <p className="mt-2 text-sm font-medium leading-relaxed text-cyan-accent/80">
        {parameter.simpleMeaning}
      </p>

      <div className="mt-5 border-l-2 border-cyan-accent/30 pl-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-accent/75">
          Why it matters
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/55">{parameter.importance}</p>
      </div>

      <div className="mt-auto pt-5">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded((current) => !current)}
          className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm font-medium text-white/80 transition-colors hover:border-cyan-accent/30 hover:bg-cyan-accent/[0.06] hover:text-white"
        >
          <span>{expanded ? 'Show Less' : 'Learn More'}</span>
          <ChevronDown
            size={17}
            aria-hidden="true"
            className={`text-cyan-accent transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>

        <div
          id={panelId}
          aria-hidden={!expanded}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ${
            expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-1 pt-4 text-sm leading-relaxed text-white/55">
              <p>{parameter.summary}</p>
              <p className="mt-3">{parameter.learnMore}</p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
