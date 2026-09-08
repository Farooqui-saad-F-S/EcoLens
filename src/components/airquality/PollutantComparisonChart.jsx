import { ResponsiveContainer, ComposedChart, Bar, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import GlassCard from '../ui/GlassCard.jsx'
import ChartTooltip from '../charts/ChartTooltip.jsx'
import { POLLUTANTS } from '../../data/pollutantInfo.js'

/**
 * PollutantComparisonChart
 * Compares each pollutant's current concentration against its WHO
 * guideline "safe" level. CO is excluded from the shared axis (its scale
 * is ~100x larger than the others) and shown separately in its own card.
 */
export default function PollutantComparisonChart({ current }) {
  const chartData = POLLUTANTS.filter((p) => p.key !== 'co')
    .map((p) => ({
      name: p.label,
      value: current[p.key] ?? null,
      safe: p.safe,
      color: p.color,
    }))
    .filter((d) => d.value != null)

  if (chartData.length === 0) return null

  return (
    <GlassCard hover={false} glow="emerald" className="min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-white">Compare Pollutant Levels</p>
          <p className="mt-0.5 text-xs text-white/45">Current readings shown beside reference values</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-white/45">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-accent" />
            Current
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 bg-white/30" />
            Reference
          </span>
        </div>
      </div>
      <div className="mt-4 h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={34}
            />
            <Tooltip content={<ChartTooltip valueSuffix=" µg/m³" />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <Bar dataKey="value" name="Level" radius={[6, 6, 0, 0]} maxBarSize={42}>
              {chartData.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="safe"
              name="Reference"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: '#07111F', stroke: 'rgba(255,255,255,0.6)', strokeWidth: 1.5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}
