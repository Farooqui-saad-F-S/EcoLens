/**
 * ChartTooltip
 * A glassmorphism-styled tooltip shared across all Recharts instances in
 * the app, so every chart matches the rest of the UI instead of using
 * Recharts' plain default tooltip box.
 */
export default function ChartTooltip({ active, payload, label, valueSuffix = '' }) {
  if (!active || !payload?.length) return null

  return (
    <div className="glass-panel min-w-[9rem] px-3.5 py-2.5 shadow-glass">
      {label && (
        <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-white/45">
          {label}
        </p>
      )}
      <div className="flex flex-col gap-1">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-white/70">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color || entry.fill }}
              />
              {entry.name}
            </span>
            <span className="font-medium text-white">
              {entry.value}
              {valueSuffix}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
