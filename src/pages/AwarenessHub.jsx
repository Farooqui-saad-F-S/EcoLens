import { useState } from 'react'
import { Droplets, Leaf, Wind } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer.jsx'
import PollutionCategory from '../components/awareness/PollutionCategory.jsx'
import { AWARENESS_CATEGORIES } from '../data/awarenessContent.js'

export default function AwarenessHub() {
  const [activeCategory, setActiveCategory] = useState('air')
  const category = AWARENESS_CATEGORIES[activeCategory]

  return (
    <PageContainer
      eyebrow="Section 04 — Take action"
      title="Learn About Pollution"
      subtitle="See where pollution comes from, how it affects the environment, and simple actions people can take."
    >
      <div className="mb-8 grid gap-3 sm:grid-cols-2" role="tablist" aria-label="Pollution categories">
        {[
          { key: 'air', label: 'Air Pollution', icon: Wind, hint: 'Sources, impacts, and cleaner choices' },
          { key: 'water', label: 'Water Pollution', icon: Droplets, hint: 'Contamination, ecosystems, and prevention' },
        ].map(({ key, label, icon: Icon, hint }) => {
          const isActive = activeCategory === key
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="pollution-category-panel"
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all sm:p-5 ${
                isActive
                  ? 'border-cyan-accent/35 bg-gradient-to-r from-cyan-accent/10 to-blue-accent/[0.06] shadow-[0_0_28px_rgba(34,211,238,0.08)]'
                  : 'border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                  isActive
                    ? 'border-cyan-accent/25 bg-cyan-accent/10 text-cyan-accent'
                    : 'border-white/10 bg-white/[0.03] text-white/45'
                }`}
              >
                <Icon size={21} aria-hidden="true" />
              </span>
              <span>
                <span className={`block font-medium ${isActive ? 'text-white' : 'text-slate-200'}`}>
                  {label}
                </span>
                <span className="mt-1 block text-xs text-slate-400">{hint}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div id="pollution-category-panel" role="tabpanel">
        <PollutionCategory category={category} />
      </div>

      <div className="mt-12 flex items-start gap-3 rounded-2xl border border-emerald-accent/15 bg-emerald-accent/[0.05] p-4 sm:p-5">
        <Leaf size={19} className="mt-0.5 shrink-0 text-emerald-accent" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-slate-300">
          Environmental improvement is a shared effort. Individual choices help most when they are
          supported by responsible infrastructure, industry practices, and community action.
        </p>
      </div>
    </PageContainer>
  )
}
