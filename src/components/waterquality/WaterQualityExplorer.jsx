import { useMemo, useState } from 'react'
import { Beaker, Info, RotateCcw } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import { EXPLORER_PARAMETERS } from '../../data/waterParameters.js'

const PARAMETER_KEYS = Object.keys(EXPLORER_PARAMETERS)

export default function WaterQualityExplorer() {
  const [activeKey, setActiveKey] = useState('ph')
  const [values, setValues] = useState(() =>
    Object.fromEntries(
      Object.entries(EXPLORER_PARAMETERS).map(([key, parameter]) => [key, parameter.initial]),
    ),
  )

  const parameter = EXPLORER_PARAMETERS[activeKey]
  const value = values[activeKey]
  const explanation = useMemo(() => parameter.explain(value), [parameter, value])
  const progress = ((value - parameter.min) / (parameter.max - parameter.min)) * 100

  const formattedValue = Number(value).toFixed(parameter.decimals)

  function resetCurrent() {
    setValues((current) => ({ ...current, [activeKey]: parameter.initial }))
  }

  return (
    <section aria-labelledby="water-explorer-title" className="mt-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Interactive learning</p>
        <h2 id="water-explorer-title" className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          Try example water readings
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
          Choose a measurement and move the slider. EcoLens will explain the example in simple
          words. These are not readings from a real water sample.
        </p>
      </div>

      <div className="mt-9 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <GlassCard hover={false} glow="blue" className="h-fit">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            Choose a measurement
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-1">
            {PARAMETER_KEYS.map((key) => {
              const item = EXPLORER_PARAMETERS[key]
              const isActive = key === activeKey

              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveKey(key)}
                  className={`rounded-xl border px-3 py-3 text-left text-sm font-medium transition-all sm:px-4 ${
                    isActive
                      ? 'border-cyan-accent/40 bg-gradient-to-r from-cyan-accent/15 to-blue-accent/10 text-white shadow-[0_0_24px_rgba(34,211,238,0.08)]'
                      : 'border-white/10 bg-white/[0.025] text-white/55 hover:border-white/20 hover:text-white/80'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </GlassCard>

        <GlassCard hover={false} glow="cyan" className="relative min-h-[390px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-cyan-accent/10 blur-3xl"
          />

          <div className="relative">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-white/45">Example value</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <output
                    htmlFor={`${activeKey}-range`}
                    aria-live="polite"
                    className="font-display text-4xl font-semibold text-white sm:text-5xl"
                  >
                    {formattedValue}
                  </output>
                  {parameter.unit && (
                    <span className="font-mono text-sm text-cyan-accent/80">{parameter.unit}</span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={resetCurrent}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/55 transition-colors hover:border-cyan-accent/30 hover:text-white"
              >
                <RotateCcw size={14} aria-hidden="true" />
                Reset
              </button>
            </div>

            <div className="mt-9">
              <label htmlFor={`${activeKey}-range`} className="sr-only">
                Adjust example {parameter.label} value
              </label>
              <input
                id={`${activeKey}-range`}
                type="range"
                min={parameter.min}
                max={parameter.max}
                step={parameter.step}
                value={value}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [activeKey]: Number(event.target.value),
                  }))
                }
                className="water-range w-full"
                style={{
                  '--range-progress': `${progress}%`,
                  '--range-color': parameter.color,
                }}
              />
              <div className="mt-2 flex justify-between font-mono text-[11px] text-white/35">
                <span>{parameter.min}</span>
                <span>{parameter.max} {parameter.unit}</span>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-cyan-accent/15 bg-gradient-to-br from-cyan-accent/[0.08] to-blue-accent/[0.04] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-accent/10 text-cyan-accent">
                  <Beaker size={18} aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-white">{explanation.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/65">{explanation.text}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-accent/20 bg-blue-accent/[0.06] p-4 sm:p-5">
        <Info size={19} className="mt-0.5 shrink-0 text-blue-300" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-white/60">
          <strong className="font-semibold text-white/85">Educational awareness tool:</strong>{' '}
          This explorer explains general patterns only. It does not test your water, certify it for
          drinking, or replace laboratory analysis and guidance from qualified local authorities.
        </p>
      </div>
    </section>
  )
}
