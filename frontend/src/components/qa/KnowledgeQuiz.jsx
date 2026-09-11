import { useState } from 'react'
import { ArrowRight, Check, CheckCircle2, MessageCircle, RotateCcw, Sparkles, X } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import { QUIZ_QUESTIONS } from '../../data/qaContent.js'
import { saveQuizResult } from '../../services/quizApi.js'

const FEEDBACK_CHOICES = [
  { value: 'YES_A_LOT', label: 'Yes, a lot' },
  { value: 'SOMEWHAT', label: 'Somewhat' },
  { value: 'NOT_REALLY', label: 'Not really' },
]

export default function KnowledgeQuiz() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState(null)
  const [feedbackStatus, setFeedbackStatus] = useState('idle')

  const question = QUIZ_QUESTIONS[questionIndex]
  const answered = selectedIndex != null
  const isCorrect = answered && selectedIndex === question.correctIndex
  const progress = ((questionIndex + (answered ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100

  function chooseAnswer(index) {
    if (answered) return
    setSelectedIndex(index)
    if (index === question.correctIndex) setScore((current) => current + 1)
  }

  function nextQuestion() {
    if (!answered) return
    if (questionIndex === QUIZ_QUESTIONS.length - 1) {
      setFinished(true)
      return
    }
    setQuestionIndex((current) => current + 1)
    setSelectedIndex(null)
  }

  function restartQuiz() {
    setQuestionIndex(0)
    setSelectedIndex(null)
    setScore(0)
    setFinished(false)
    setSelectedFeedback(null)
    setFeedbackStatus('idle')
  }

  async function submitFeedback(feedback) {
    if (feedbackStatus === 'saving' || feedbackStatus === 'success') return

    setSelectedFeedback(feedback)
    setFeedbackStatus('saving')

    try {
      await saveQuizResult({
        score,
        totalQuestions: QUIZ_QUESTIONS.length,
        feedback,
      })
      setFeedbackStatus('success')
    } catch {
      setFeedbackStatus('error')
    }
  }

  if (finished) {
    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100)
    return (
      <GlassCard hover={false} glow="emerald" className="mx-auto max-w-3xl py-10 text-center sm:py-14">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-accent/20 bg-emerald-accent/10 text-emerald-accent">
          <Sparkles size={28} aria-hidden="true" />
        </span>
        <p className="eyebrow mt-6">Activity complete</p>
        <h3 className="mt-2 text-3xl font-semibold text-white">You scored {score} out of {QUIZ_QUESTIONS.length}</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55">
          {percentage >= 80
            ? 'Excellent awareness! You have a strong grasp of the key ideas.'
            : percentage >= 50
              ? 'Nice work! Revisit any topic above and try again when you are ready.'
              : 'Good start! Every question is another chance to learn something useful.'}
        </p>

        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-accent/10 text-cyan-accent">
              <MessageCircle size={18} aria-hidden="true" />
            </span>
            <div>
              <h4 className="font-semibold text-white">
                Did EcoLens make air and water quality easier to understand?
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-white/45">
                Your score and this answer are saved anonymously. No personal details are collected.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3" aria-label="Awareness feedback choices">
            {FEEDBACK_CHOICES.map((choice) => {
              const isSelected = selectedFeedback === choice.value
              return (
                <button
                  key={choice.value}
                  type="button"
                  aria-pressed={isSelected}
                  disabled={feedbackStatus === 'saving' || feedbackStatus === 'success'}
                  onClick={() => submitFeedback(choice.value)}
                  className={`min-h-11 rounded-xl border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed ${
                    isSelected
                      ? 'border-cyan-accent/40 bg-cyan-accent/10 text-white'
                      : 'border-white/10 bg-white/[0.025] text-white/65 hover:border-cyan-accent/30 hover:text-white'
                  }`}
                >
                  {choice.label}
                </button>
              )
            })}
          </div>

          <div className="mt-3 min-h-5 text-center text-xs" aria-live="polite">
            {feedbackStatus === 'saving' && <p className="text-white/50">Saving anonymous response…</p>}
            {feedbackStatus === 'success' && (
              <p className="text-emerald-accent">Thank you—your anonymous response was saved.</p>
            )}
            {feedbackStatus === 'error' && (
              <p className="text-warning">
                Your score is still available. The response could not be saved right now; select an option to try again.
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={restartQuiz}
          disabled={feedbackStatus === 'saving'}
          className="btn-primary mt-7 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw size={16} aria-hidden="true" />
          Try Again
        </button>
      </GlassCard>
    )
  }

  return (
    <GlassCard hover={false} glow="purple" className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">
          Question {questionIndex + 1} of {QUIZ_QUESTIONS.length}
        </p>
        <p className="text-xs text-white/40">Score: {score}</p>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <div
          className="h-full rounded-full bg-linear-to-r/srgb from-cyan-accent to-emerald-accent transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <fieldset className="mt-7">
        <legend className="text-xl font-semibold leading-snug text-white sm:text-2xl">
          {question.question}
        </legend>
        <div className="mt-5 grid gap-3">
          {question.options.map((option, index) => {
            const isSelected = selectedIndex === index
            const isCorrectOption = answered && index === question.correctIndex
            const isWrongSelection = answered && isSelected && !isCorrectOption

            return (
              <button
                key={option}
                type="button"
                disabled={answered}
                onClick={() => chooseAnswer(index)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all sm:text-base ${
                  isCorrectOption
                    ? 'border-emerald-accent/45 bg-emerald-accent/10 text-white'
                    : isWrongSelection
                      ? 'border-danger/45 bg-danger/10 text-white'
                      : answered
                        ? 'border-white/[0.07] bg-white/[0.015] text-white/35'
                        : 'border-white/10 bg-white/[0.025] text-white/70 hover:border-cyan-accent/30 hover:bg-cyan-accent/[0.05] hover:text-white'
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs ${
                    isCorrectOption
                      ? 'border-emerald-accent bg-emerald-accent text-canvas'
                      : isWrongSelection
                        ? 'border-danger bg-danger text-canvas'
                        : 'border-white/15 text-white/45'
                  }`}
                >
                  {isCorrectOption ? (
                    <Check size={14} aria-hidden="true" />
                  ) : isWrongSelection ? (
                    <X size={14} aria-hidden="true" />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </span>
                <span>{option}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      {answered && (
        <div
          aria-live="polite"
          className={`mt-6 rounded-2xl border p-4 sm:p-5 ${
            isCorrect
              ? 'border-emerald-accent/20 bg-emerald-accent/[0.07]'
              : 'border-danger/20 bg-danger/[0.07]'
          }`}
        >
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <CheckCircle2 size={18} className="text-emerald-accent" aria-hidden="true" />
            ) : (
              <X size={18} className="text-danger" aria-hidden="true" />
            )}
            <p className="font-semibold text-white">{isCorrect ? 'That’s right!' : 'Not quite—keep learning!'}</p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{question.explanation}</p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={nextQuestion}
          disabled={!answered}
          className="btn-primary justify-center disabled:cursor-not-allowed disabled:opacity-35"
        >
          {questionIndex === QUIZ_QUESTIONS.length - 1 ? 'See My Score' : 'Next Question'}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </GlassCard>
  )
}
