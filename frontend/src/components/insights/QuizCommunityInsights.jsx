import { useCallback, useEffect, useState } from 'react'
import { BarChart3, RefreshCw, Trophy, Users } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import { getQuizStats } from '../../services/quizApi.js'

const FEEDBACK_ROWS = [
  { key: 'yesALot', label: 'Yes, a lot', color: 'bg-emerald-accent' },
  { key: 'somewhat', label: 'Somewhat', color: 'bg-cyan-accent' },
  { key: 'notReally', label: 'Not really', color: 'bg-warning' },
]

export default function QuizCommunityInsights() {
  const [stats, setStats] = useState(null)
  const [status, setStatus] = useState('loading')

  const loadStats = useCallback(async (signal) => {
    setStatus('loading')

    try {
      const response = await getQuizStats({ signal })
      setStats(response.stats)
      setStatus('success')
    } catch (error) {
      if (error.name !== 'AbortError') setStatus('error')
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    loadStats(controller.signal)
    return () => controller.abort()
  }, [loadStats])

  if (status === 'loading') {
    return (
      <GlassCard hover={false} className="mt-12 text-center" aria-live="polite">
        <p className="text-sm text-white/55">Loading anonymous quiz insights…</p>
      </GlassCard>
    )
  }

  if (status === 'error') {
    return (
      <GlassCard hover={false} className="mt-12 text-center">
        <p className="text-sm text-white/55">
          Community quiz insights are unavailable right now. The rest of EcoLens still works normally.
        </p>
        <button type="button" onClick={() => loadStats()} className="btn-ghost mt-4">
          <RefreshCw size={15} aria-hidden="true" />
          Try Again
        </button>
      </GlassCard>
    )
  }

  const totalFeedback = Object.values(stats.feedback).reduce((sum, count) => sum + count, 0)

  return (
    <section className="mt-12" aria-labelledby="quiz-insights-title">
      <div className="mb-6">
        <p className="eyebrow">Anonymous awareness activity</p>
        <h2 id="quiz-insights-title" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
          Community Knowledge Snapshot
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/50">
          These totals come from anonymous EcoLens quiz responses. No names or contact details are collected.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Quiz Participants', value: stats.totalResponses, icon: Users },
          { label: 'Average Knowledge Score', value: `${stats.averagePercentage}%`, icon: BarChart3 },
          { label: 'Users Scoring 80%+', value: stats.highScoreResponses, icon: Trophy },
        ].map(({ label, value, icon: Icon }) => (
          <GlassCard key={label} hover={false} className="p-5 sm:p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-accent/10 text-cyan-accent">
              <Icon size={19} aria-hidden="true" />
            </span>
            <p className="mt-4 text-2xl font-semibold text-white">{value}</p>
            <p className="mt-1 text-sm text-white/50">{label}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard hover={false} className="mt-4 p-5 sm:p-6">
        <h3 className="font-semibold text-white">Did EcoLens make the topic easier to understand?</h3>
        {totalFeedback === 0 ? (
          <p className="mt-3 text-sm text-white/50">No feedback responses have been recorded yet.</p>
        ) : (
          <div className="mt-5 grid gap-4">
            {FEEDBACK_ROWS.map((row) => {
              const count = stats.feedback[row.key]
              const percentage = Math.round((count / totalFeedback) * 100)

              return (
                <div key={row.key}>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-white/70">{row.label}</span>
                    <span className="font-mono text-xs text-white/50">{count} · {percentage}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className={`h-full rounded-full ${row.color}`} style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </GlassCard>
    </section>
  )
}
