import { useState } from 'react'
import { BookOpenCheck, Droplets, Wind } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer.jsx'
import QuestionCard from '../components/qa/QuestionCard.jsx'
import KnowledgeQuiz from '../components/qa/KnowledgeQuiz.jsx'
import { QA_CATEGORIES } from '../data/qaContent.js'

export default function InteractiveQA() {
  const [activeCategory, setActiveCategory] = useState('air')
  const category = QA_CATEGORIES[activeCategory]

  return (
    <PageContainer
      eyebrow="Section 05 — Interactive learning"
      title="Curious About Air & Water?"
      subtitle="Tap a question to get a simple answer, then try a quick knowledge check."
    >
      <section aria-labelledby="questions-title">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Questions &amp; answers</p>
            <h2 id="questions-title" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Choose a topic and explore
            </h2>
          </div>
          <p className="text-sm text-white/45">Click a question to reveal its answer.</p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2" role="tablist" aria-label="Question categories">
          {[
            { key: 'air', label: 'Air Questions', icon: Wind },
            { key: 'water', label: 'Water Questions', icon: Droplets },
          ].map(({ key, label, icon: Icon }) => {
            const isActive = activeCategory === key
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="qa-question-panel"
                onClick={() => setActiveCategory(key)}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-all ${
                  isActive
                    ? 'border-cyan-accent/35 bg-linear-to-r/srgb from-cyan-accent/10 to-blue-accent/[0.06] text-white shadow-[0_0_28px_rgba(34,211,238,0.08)]'
                    : 'border-white/10 bg-white/[0.025] text-white/55 hover:border-white/20 hover:text-white/80'
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan-accent">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-medium">{label}</span>
                  <span className="mt-0.5 block text-xs text-white/40">8 quick explainers</span>
                </span>
              </button>
            )
          })}
        </div>

        <div id="qa-question-panel" role="tabpanel" className="mt-5 grid items-start gap-4 lg:grid-cols-2">
          {category.questions.map((item) => (
            <QuestionCard key={item.id} item={item} glow={category.glow} />
          ))}
        </div>
      </section>

      <section aria-labelledby="quiz-title" className="mt-20">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-purple-accent/20 bg-purple-accent/10 text-purple-300">
            <BookOpenCheck size={21} aria-hidden="true" />
          </span>
          <p className="eyebrow mt-5">Friendly awareness activity</p>
          <h2 id="quiz-title" className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Quick Knowledge Check
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
            See how much you’ve learned in just a few questions. Choose an answer and learn from
            the short explanation—this is not a formal examination.
          </p>
        </div>

        <KnowledgeQuiz />
      </section>
    </PageContainer>
  )
}
