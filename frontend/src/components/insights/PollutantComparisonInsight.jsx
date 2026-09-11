import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import GlassCard from '../ui/GlassCard.jsx'
import InsightExplanation from './InsightExplanation.jsx'
import { POLLUTANTS } from '../../data/pollutantInfo.js'

function PollutantTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const item = payload[0]?.payload

  return (
    <div className="glass-panel min-w-[11rem] px-3.5 py-3 shadow-glass">
      <p className="text-sm font-semibold text-white">{item.name}</p>
      <p className="mt-1 text-xs text-white/55">
        {item.value.toLocaleString()} {item.unit}
      </p>
      <p className="mt-1 text-xs text-cyan-accent">{item.percent}% of reference</p>
    </div>
  )
}

export default function PollutantComparisonInsight({ current }) {
  const chartData = POLLUTANTS.map((pollutant) => ({
    name: pollutant.label,
    value: current[pollutant.key],
    unit: pollutant.unit,
    percent:
      current[pollutant.key] == null
        ? null
        : Math.round((current[pollutant.key] / pollutant.safe) * 100),
    color: pollutant.color,
  })).filter((item) => item.percent != null)

  return (
    <GlassCard hover={false} glow="cyan" className="flex h-full min-w-0 flex-col">
      <div>
        <p className="text-lg font-semibold text-white">What’s in the Air?</p>
        <p className="mt-1 text-xs text-white/45">
          See which pollutant readings stand out compared with their own references
        </p>
      </div>

      <div className="mt-5 h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 12, right: 8, left: -14, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <YAxis
              unit="%"
              tick={{ fill: 'rgba(255,255,255,0.42)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip content={<PollutantTooltip />} cursor={{ fill: 'rgba(255,255,255,0.035)' }} />
            <Bar dataKey="percent" name="Reference percentage" radius={[7, 7, 0, 0]} maxBarSize={48}>
              {chartData.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InsightExplanation>
        Every pollutant uses a different scale. These bars show how each current reading compares
        with its own reference, so a taller bar means it stands out more at this moment.
      </InsightExplanation>
    </GlassCard>
  )
}
