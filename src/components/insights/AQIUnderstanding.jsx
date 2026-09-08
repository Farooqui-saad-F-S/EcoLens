import GlassCard from '../ui/GlassCard.jsx'
import InsightExplanation from './InsightExplanation.jsx'

const AQI_RANGES = [
  { label: 'Good', range: '0–50', width: 10, color: '#10B981' },
  { label: 'Moderate', range: '51–100', width: 10, color: '#FBBF24' },
  { label: 'Poor for sensitive groups', range: '101–150', width: 10, color: '#FB923C' },
  { label: 'Poor', range: '151–200', width: 10, color: '#FB7185' },
  { label: 'Very poor', range: '201–300', width: 20, color: '#E11D48' },
  { label: 'Severe', range: '301–500', width: 40, color: '#8B5CF6' },
]

export default function AQIUnderstanding({ currentAqi }) {
  const marker =
    currentAqi == null ? null : Math.max(0, Math.min(100, (Number(currentAqi) / 500) * 100))

  return (
    <GlassCard hover={false} glow="emerald" className="flex h-full min-w-0 flex-col">
      <div>
        <p className="text-lg font-semibold text-white">Understanding AQI Levels</p>
        <p className="mt-1 text-xs text-white/45">See how AQI numbers connect to clear condition levels</p>
      </div>

      <div className="mt-8">
        <div className="relative pt-7">
          {marker != null && (
            <div
              className="absolute top-0 -translate-x-1/2"
              style={{ left: `${marker}%` }}
              aria-label={`Current AQI ${currentAqi}`}
            >
              <span className="block whitespace-nowrap rounded-full border border-white/15 bg-canvas-100 px-2 py-1 font-mono text-[10px] text-white shadow-glass">
                {currentAqi} now
              </span>
              <span className="mx-auto block h-3 w-px bg-white/60" />
            </div>
          )}

          <div className="flex h-5 overflow-hidden rounded-full border border-white/10">
            {AQI_RANGES.map((item) => (
              <span
                key={item.label}
                style={{ width: `${item.width}%`, backgroundColor: item.color }}
                title={`${item.label}: ${item.range}`}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-white/35">
            <span>0</span>
            <span>100</span>
            <span>200</span>
            <span>300</span>
            <span>500</span>
          </div>
        </div>

        <div className="mt-7 grid gap-2 sm:grid-cols-2">
          {AQI_RANGES.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5"
            >
              <span className="flex items-center gap-2 text-xs text-white/65">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.label}
              </span>
              <span className="font-mono text-[11px] text-white/40">{item.range}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <InsightExplanation>
          AQI combines several pollutants into one number. As the number rises, the colour and
          condition level change. Use the pollutant chart to see what may be influencing it.
        </InsightExplanation>
      </div>
    </GlassCard>
  )
}
