import { AlertTriangle, Clock, CloudSun, Leaf, MapPin, OctagonAlert, SunMedium } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import { getAQICategory, aqiPercent } from '../../utils/aqi.js'

function formatLocalTime(isoTime) {
  if (!isoTime) return null
  const d = new Date(isoTime)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleString(undefined, {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  })
}

/**
 * AQIMainCard
 * The hero glass card: large AQI number, category badge, location name,
 * a visual severity ring, and a short plain-language explanation of what
 * AQI means.
 */
export default function AQIMainCard({ location, aqi, time }) {
  const category = getAQICategory(aqi ?? 0)
  const percent = aqiPercent(aqi ?? 0, 300)
  const readableTime = formatLocalTime(time)
  const StatusIcon =
    (aqi ?? 0) <= 50
      ? Leaf
      : (aqi ?? 0) <= 100
        ? SunMedium
        : (aqi ?? 0) <= 150
          ? CloudSun
          : (aqi ?? 0) <= 300
            ? AlertTriangle
            : OctagonAlert

  return (
    <GlassCard hover={false} className="relative overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r/srgb from-transparent via-white/40 to-transparent"
        style={{ backgroundImage: `linear-gradient(90deg, transparent, ${category.color}80, transparent)` }}
      />

      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: identity + explanation */}
        <div className="order-2 min-w-0 flex-1 sm:order-1">
          <div className="flex items-start gap-2 break-words text-sm text-white/55">
            <MapPin size={15} className="text-cyan-accent" />
            {location}
          </div>
          <p className="eyebrow mt-4 sm:mt-2">What this means</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            {category.simpleLabel}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/65">{category.note}</p>
          <p className="mt-4 max-w-lg text-xs leading-relaxed text-white/40">
            AQI means Air Quality Index. It combines several pollutant readings into one number;
            lower numbers generally mean cleaner air.
          </p>
          {readableTime && (
            <p className="mt-4 flex items-center gap-1.5 text-xs text-white/40">
              <Clock size={13} />
              Updated {readableTime} (local time)
            </p>
          )}
        </div>

        {/* Right: AQI gauge */}
        <div className="order-1 mx-auto flex w-fit flex-col items-center sm:order-2">
          <div className="relative h-44 w-44 shrink-0 sm:h-52 sm:w-52">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={category.color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={2 * Math.PI * 52 * (1 - percent / 100)}
                style={{ transition: 'stroke-dashoffset 0.6s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="aqi-value text-6xl font-semibold text-white sm:text-7xl">{aqi ?? '—'}</span>
              <span className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/40">
                US AQI
              </span>
            </div>
          </div>

          <span
            className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium"
            style={{ color: category.color, backgroundColor: `${category.color}1A` }}
          >
            <StatusIcon size={15} aria-hidden="true" />
            {category.simpleLabel}
          </span>
          {category.simpleLabel !== category.label && (
            <p className="mt-2 text-center text-[11px] text-white/35">
              Official category: {category.label}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  )
}
