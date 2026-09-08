import { Lightbulb } from 'lucide-react'

export default function InsightExplanation({ children }) {
  return (
    <div className="mt-5 flex items-start gap-3 border-t border-white/10 pt-5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-accent/10 text-cyan-accent">
        <Lightbulb size={16} aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-semibold text-white/85">What does this chart tell us?</p>
        <p className="mt-1 text-sm leading-relaxed text-white/55">{children}</p>
      </div>
    </div>
  )
}
