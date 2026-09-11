import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'

export default function QuestionCard({ item, glow }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = item.icon
  const answerId = `${item.id}-answer`

  return (
    <GlassCard hover={false} glow={glow} padding="p-0" className="h-fit">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={answerId}
        onClick={() => setExpanded((current) => !current)}
        className="flex w-full items-center gap-3 p-4 text-left sm:gap-4 sm:p-5"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-accent/15 bg-cyan-accent/[0.08] text-cyan-accent">
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-slate-100 sm:text-base">
          {item.question}
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`shrink-0 text-white/40 transition-transform duration-300 ${
            expanded ? 'rotate-180 text-cyan-accent' : ''
          }`}
        />
      </button>

      <div
        id={answerId}
        aria-hidden={!expanded}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="border-t border-white/10 px-4 pb-5 pt-4 text-sm leading-relaxed text-slate-300 sm:px-5">
            {item.answer}
          </p>
        </div>
      </div>
    </GlassCard>
  )
}
