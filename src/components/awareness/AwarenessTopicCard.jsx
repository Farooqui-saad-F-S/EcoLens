import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'

export default function AwarenessTopicCard({ topic, glow }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = topic.icon
  const contentId = `${topic.id}-content`

  return (
    <GlassCard hover={false} glow={glow} className="h-fit" padding="p-0">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={() => setExpanded((current) => !current)}
        className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-accent/15 bg-cyan-accent/[0.08] text-cyan-accent">
          <Icon size={20} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-semibold text-white">{topic.title}</span>
          <span className="mt-1 block text-xs leading-relaxed text-slate-400">{topic.subtitle}</span>
        </span>
        <ChevronDown
          size={19}
          aria-hidden="true"
          className={`shrink-0 text-white/45 transition-transform duration-300 ${expanded ? 'rotate-180 text-cyan-accent' : ''}`}
        />
      </button>

      <div
        id={contentId}
        aria-hidden={!expanded}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ${
          expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-3 border-t border-white/10 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
            {topic.items.map((item) => {
              const ItemIcon = item.icon
              return (
                <div
                  key={item.title}
                  className="group flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3.5 transition-colors hover:border-cyan-accent/20 hover:bg-cyan-accent/[0.035]"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-cyan-accent/80">
                    <ItemIcon size={15} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-100">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
