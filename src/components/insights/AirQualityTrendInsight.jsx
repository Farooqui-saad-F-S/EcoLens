import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import GlassCard from '../ui/GlassCard.jsx'
import ChartTooltip from '../charts/ChartTooltip.jsx'
import InsightExplanation from './InsightExplanation.jsx'

function formatTick(time) {
  const date = new Date(time)
  if (Number.isNaN(date.getTime())) return time
  return `${date.toLocaleDateString(undefined, { weekday: 'short' })} ${date.toLocaleTimeString(
    undefined,
    { hour: 'numeric' },
  )}`
}

export default function AirQualityTrendInsight({ hourly, nowTime }) {
  const chartData = hourly
    .filter((item) => item.aqi != null)
    .map((item) => ({ time: item.time, aqi: item.aqi }))

  return (
    <GlassCard hover={false} glow="blue" className="mt-6 min-w-0">
      <div>
        <p className="text-lg font-semibold text-white">How Air Quality Changes Over Time</p>
        <p className="mt-1 text-xs text-white/45">
          Hourly US AQI across the available past and forecast period
        </p>
      </div>

      <div className="mt-5 h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 12, right: 10, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="insightAqiFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.42} />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="time"
              tickFormatter={formatTick}
              tick={{ fill: 'rgba(255,255,255,0.42)', fontSize: 11 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
              interval={Math.max(0, Math.floor(chartData.length / 6) - 1)}
              minTickGap={18}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.42)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={42}
            />
            <Tooltip
              content={<ChartTooltip />}
              labelFormatter={formatTick}
              cursor={{ stroke: 'rgba(34,211,238,0.3)' }}
            />
            {nowTime && (
              <ReferenceLine
                x={nowTime}
                stroke="rgba(255,255,255,0.35)"
                strokeDasharray="3 3"
                label={{
                  value: 'Now',
                  position: 'insideTopRight',
                  fill: 'rgba(255,255,255,0.5)',
                  fontSize: 11,
                }}
              />
            )}
            <Area
              type="monotone"
              dataKey="aqi"
              name="AQI"
              stroke="#22D3EE"
              strokeWidth={2.5}
              fill="url(#insightAqiFill)"
              activeDot={{ r: 5, fill: '#22D3EE', stroke: '#07111F', strokeWidth: 2 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <InsightExplanation>
        Higher points show hours with higher AQI, while lower points show comparatively cleaner
        periods. The forecast part is an estimate and can change.
      </InsightExplanation>
    </GlassCard>
  )
}
