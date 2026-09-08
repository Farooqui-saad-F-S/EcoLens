import { ArrowRight } from 'lucide-react'
import AwarenessTopicCard from './AwarenessTopicCard.jsx'

export default function PollutionCategory({ category }) {
  const Icon = category.icon

  return (
    <section aria-labelledby={`${category.id}-category-title`}>
      <div
        className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${category.gradient} p-6 sm:p-8`}
      >
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border border-cyan-accent/10" />
        <div className="relative max-w-3xl">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-accent/20 bg-cyan-accent/10 text-cyan-accent">
            <Icon size={23} aria-hidden="true" />
          </span>
          <p className="eyebrow mt-5">{category.eyebrow}</p>
          <h2 id={`${category.id}-category-title`} className="mt-2 text-3xl font-semibold text-white">
            {category.label}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {category.intro}
          </p>
        </div>

        <div className="relative mt-7 grid gap-2 sm:grid-cols-3">
          {category.flow.map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-canvas/35 px-3 py-2.5 text-xs text-slate-300 backdrop-blur-sm"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-accent/10 font-mono text-[10px] text-cyan-accent">
                {index + 1}
              </span>
              <span>{step}</span>
              {index < category.flow.length - 1 && (
                <ArrowRight size={13} className="ml-auto hidden text-white/25 sm:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-400">Open a topic to explore short, practical explanations.</p>
      <div className="mt-4 grid items-start gap-5 lg:grid-cols-3">
        {category.topics.map((topic) => (
          <AwarenessTopicCard key={topic.id} topic={topic} glow={category.glow} />
        ))}
      </div>
    </section>
  )
}
