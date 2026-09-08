import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import GlassCard from '../ui/GlassCard.jsx'
import ChartTooltip from '../charts/ChartTooltip.jsx'
import { getAQICategory } from '../../utils/aqi.js'

function formatHour(time) {
  const d = new Date(time)
  if (Number.isNaN(d.getTime())) return time
  return d.toLocaleTimeString(undefined, { hour: 'numeric' })
}

/**
 * HourlyPatternChart
 * Today's 24-hour AQI pattern (local time, from the hourly series),
 * with the current hour highlighted so the person can see where "now"
 * sits relative to the rest of the day.
 */
export default function HourlyPatternChart({ todayHourly, currentHourTime }) {
  const chartData = todayHourly.filter((h) => h.aqi != null)

  if (chartData.length === 0) return null

  return (
    <GlassCard hover={false} glow="purple" className="min-w-0">
      <div>
        <p className="text-sm font-medium text-white">Today, Hour by Hour</p>
        <p className="mt-0.5 text-xs text-white/45">See when AQI rises or falls during the day</p>
      </div>
      <div className="mt-4 h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="time"
              tickFormatter={formatHour}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={34}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} labelFormatter={formatHour} />
            <Bar dataKey="aqi" name="AQI" radius={[5, 5, 0, 0]} maxBarSize={22}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.time}
                  fill={getAQICategory(entry.aqi).color}
                  opacity={entry.time === currentHourTime ? 1 : 0.55}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}
