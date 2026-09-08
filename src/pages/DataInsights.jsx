import { ArrowRight, BarChart3, Database, MapPin } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'
import PollutantComparisonInsight from '../components/insights/PollutantComparisonInsight.jsx'
import AirQualityTrendInsight from '../components/insights/AirQualityTrendInsight.jsx'
import AQIUnderstanding from '../components/insights/AQIUnderstanding.jsx'
import { readAirQualitySnapshot } from '../utils/airQualitySession.js'

export default function DataInsights() {
  const snapshot = readAirQualitySnapshot()
  const locationLabel = snapshot
    ? [snapshot.location.name, snapshot.location.admin1, snapshot.location.country]
        .filter(Boolean)
        .join(', ')
    : ''

  return (
    <PageContainer
      eyebrow="Section 03 — Visual learning"
      title="Understand the Data"
      subtitle="See simple charts that turn air-quality readings into patterns anyone can understand."
    >
      {!snapshot ? (
        <GlassCard hover={false} glow="cyan" className="mx-auto max-w-3xl py-12 text-center sm:py-16">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-accent/20 bg-cyan-accent/10 text-cyan-accent">
            <Database size={28} aria-hidden="true" />
          </span>
          <h2 className="mt-6 text-2xl font-semibold text-white">First, choose a city</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base">
            Insights uses the real air-quality data selected on the Air page. Search for a city
            there, then come back to see its charts explained simply.
          </p>
          <NavLink to="/air-quality" className="btn-primary mt-7 w-full justify-center sm:w-auto">
            Go to the Air Page
            <ArrowRight size={16} aria-hidden="true" />
          </NavLink>
        </GlassCard>
      ) : (
        <div>
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-accent/10 text-cyan-accent">
                <MapPin size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.16em] text-white/35">Showing insights for</p>
                <p className="mt-1 break-words text-sm font-medium text-white/85">{locationLabel}</p>
              </div>
            </div>
            <NavLink to="/air-quality" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-accent hover:text-cyan-200">
              Choose another city
              <ArrowRight size={15} aria-hidden="true" />
            </NavLink>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <PollutantComparisonInsight current={snapshot.data.current} />
            <AQIUnderstanding currentAqi={snapshot.data.current.aqi} />
          </div>

          <AirQualityTrendInsight
            hourly={snapshot.data.hourly}
            nowTime={snapshot.data.current.time}
          />

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-accent/20 bg-blue-accent/[0.05] p-4 text-sm leading-relaxed text-white/55">
            <BarChart3 size={18} className="mt-0.5 shrink-0 text-blue-300" aria-hidden="true" />
            <p>
              These charts use the same Open-Meteo data shown on the Air page. Values are model
              estimates and may differ from official local monitoring stations.
            </p>
          </div>
        </div>
      )}
    </PageContainer>
  )
}
