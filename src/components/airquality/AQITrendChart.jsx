import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts'
import GlassCard from '../ui/GlassCard.jsx'
import ChartTooltip from '../charts/ChartTooltip.jsx'

function formatTick(time) {
  const d = new Date(time)
  if (Number.isNaN(d.getTime())) return time
  return d.toLocaleDateString(undefined, { weekday: 'short' }) + ' ' + d.toLocaleTimeString(undefined, { hour: 'numeric' })
}

/**
 * AQITrendChart
 * Multi-day AQI trend (past 2 days through the next 2 days) built from
 * the hourly `us_aqi` series returned by the Open-Meteo Air Quality API.
 */
export default function AQITrendChart({ hourly, nowTime }) {
  const chartData = hourly
    .filter((h) => h.aqi != null)
    .map((h) => ({ time: h.time, aqi: h.aqi }))

  return (
    <GlassCard hover={false} glow="cyan" className="min-w-0">
      <div>
        <p className="text-sm font-medium text-white">How Air Quality Changes</p>
        <p className="mt-0.5 text-xs text-white/45">Hourly AQI across the available past and forecast days</p>
      </div>
      <div className="mt-4 h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="aqiTrendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="time"
              tickFormatter={formatTick}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
              interval={Math.max(0, Math.floor(chartData.length / 6) - 1)}
              minTickGap={20}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={34}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(34,211,238,0.3)' }} labelFormatter={formatTick} />
            {nowTime && (
              <ReferenceLine
                x={nowTime}
                stroke="rgba(255,255,255,0.35)"
                strokeDasharray="3 3"
                label={{ value: 'Now', position: 'insideTopRight', fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
              />
            )}
            <Area
              type="monotone"
              dataKey="aqi"
              name="AQI"
              stroke="#22D3EE"
              strokeWidth={2}
              fill="url(#aqiTrendFill)"
              activeDot={{ r: 5, fill: '#22D3EE', stroke: '#07111F', strokeWidth: 2 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}
