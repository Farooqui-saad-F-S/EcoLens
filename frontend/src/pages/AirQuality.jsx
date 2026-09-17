import { useMemo } from 'react'
import { AlertCircle, BarChart3, Compass, MapPin, RadioTower } from 'lucide-react'

import PageContainer from '../components/layout/PageContainer.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'
import LocationSearch from '../components/airquality/LocationSearch.jsx'
import AQIMainCard from '../components/airquality/AQIMainCard.jsx'
import PollutantCard from '../components/airquality/PollutantCard.jsx'
import AQITrendChart from '../components/airquality/AQITrendChart.jsx'
import HourlyPatternChart from '../components/airquality/HourlyPatternChart.jsx'
import PollutantComparisonChart from '../components/airquality/PollutantComparisonChart.jsx'
import StateNotice from '../components/airquality/StateNotice.jsx'

import { useAirQualityExplorer } from '../hooks/useAirQualityExplorer.js'
import { POLLUTANTS } from '../data/pollutantInfo.js'
import { findNearestHourly, dateOnly } from '../utils/time.js'

const POPULAR_CITIES = ['Bhiwandi', 'Mumbai', 'Delhi', 'London', 'Tokyo', 'Sydney']

function formatUpdatedAt(value, timezone) {
  if (!value) return 'Time unavailable'

  const hasUtcOffset = /(?:Z|[+-]\d{2}:\d{2})$/.test(value)
  if (!hasUtcOffset) {
    return `${value.replace('T', ' ')} (${timezone || 'local time'})`
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Time unavailable' : date.toLocaleString()
}

export default function AirQuality() {
  const {
    query,
    setQuery,
    suggestions,
    searchLoading,
    searchError,
    location,
    data,
    status,
    error,
    selectLocation,
    retry,
  } = useAirQualityExplorer()

  const nearestNow = useMemo(() => {
    if (!data) return null
    return findNearestHourly(data.hourly, data.aqiUpdatedAt ?? data.current?.time)
  }, [data])

  const todayHourly = useMemo(() => {
    if (!data || !nearestNow) return []
    const todayKey = dateOnly(nearestNow.time)
    return data.hourly.filter((h) => dateOnly(h.time) === todayKey)
  }, [data, nearestNow])

  const locationLabel = location
    ? [location.name, location.admin1, location.country].filter(Boolean).join(', ')
    : ''

  const pollutantCards = data
    ? POLLUTANTS.map((p) => ({ ...p, value: data.current[p.key] }))
    : []

  return (
    <PageContainer
      eyebrow="Section 01 — Air"
      title="How Clean Is the Air?"
      subtitle="Search your city to see today’s air quality and understand what the numbers mean."
    >
      {/* Search */}
      <div className="flex flex-col items-start gap-3">
        <label className="flex items-center gap-2 text-sm font-medium text-white/80">
          <MapPin size={16} className="text-cyan-accent" aria-hidden="true" />
          Search for your city
        </label>
        <LocationSearch
          query={query}
          onQueryChange={setQuery}
          suggestions={suggestions}
          loading={searchLoading}
          error={searchError}
          onSelect={selectLocation}
          placeholder="Search for your city..."
        />
        {status === 'idle' && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/40">
            <Compass size={13} />
            Try:
            {POPULAR_CITIES.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setQuery(city)}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-white/60 transition-colors hover:border-cyan-accent/40 hover:text-white"
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* States */}
      <div className="mt-8">
        {status === 'idle' && (
          <StateNotice
            variant="empty"
            title="Search a city to begin"
            message="Type a city name above, then choose the correct place from the list."
          />
        )}

        {status === 'loading' && (
          <StateNotice
            variant="loading"
            title={`Checking the air in ${locationLabel}…`}
            message="Getting the latest available reading. This usually takes only a moment."
          />
        )}

        {status === 'error' && (
          <StateNotice
            variant="error"
            title="We couldn’t load the air-quality data"
            message={error}
            onRetry={retry}
          />
        )}

        {status === 'success' && data && (
          <div className="flex flex-col gap-6">
            {data.current.aqi != null ? (
              <AQIMainCard
                location={locationLabel}
                aqi={data.current.aqi}
                time={data.aqiUpdatedAt ?? data.current.time}
              />
            ) : (
              <GlassCard hover={false}>
                <p className="text-sm font-medium text-white">AQI estimate unavailable</p>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  Recent station pollutant measurements are available below, but the model AQI
                  could not be loaded. No AQI has been calculated from the station values.
                </p>
              </GlassCard>
            )}

            <GlassCard hover={false} className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-accent/10 text-cyan-accent">
                <RadioTower size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">
                  {data.sourceType === 'station'
                    ? 'Measured Monitoring Station Data'
                    : 'Model Estimate'}
                </p>

                {data.sourceType === 'station' ? (
                  <div className="mt-2 space-y-1 text-xs leading-relaxed text-white/55">
                    <p>Station: {data.stationName}</p>
                    {data.provider && <p>Provider: {data.provider}</p>}
                    {data.owner && data.owner !== data.provider && <p>Owner: {data.owner}</p>}
                    {data.distanceKm != null && <p>Distance: {data.distanceKm} km</p>}
                    <p>Updated: {formatUpdatedAt(data.updatedAt, data.timezone)}</p>
                    <p className="pt-1 text-white/40">
                      AQI and hourly charts:{' '}
                      {data.aqiSourceName
                        ? `${data.aqiSourceName} model estimate`
                        : 'currently unavailable'}
                    </p>
                  </div>
                ) : (
                  <div className="mt-2 space-y-1 text-xs leading-relaxed text-white/55">
                    <p>Source: {data.sourceName}</p>
                    <p>Updated: {formatUpdatedAt(data.updatedAt, data.timezone)}</p>
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Pollutant cards */}
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-white">What’s in the air?</h2>
                <p className="mt-2 text-sm text-white/50">
                  These measurements help explain what may be influencing the AQI.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {pollutantCards.map((p) => (
                  <PollutantCard
                    key={p.key}
                    label={p.label}
                    fullName={p.fullName}
                    simpleMeaning={p.simpleMeaning}
                    whyItMatters={p.whyItMatters}
                    value={p.value}
                    unit={p.unit}
                    safe={p.safe}
                    color={p.color}
                    description={p.description}
                  />
                ))}
              </div>
            </div>

            {/* Charts */}
            <section aria-labelledby="air-patterns-title" className="mt-4 flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 text-cyan-accent/80">
                  <BarChart3 size={17} aria-hidden="true" />
                  <p className="eyebrow">Look a little deeper</p>
                </div>
                <h2 id="air-patterns-title" className="mt-3 text-2xl font-semibold text-white">
                  See how the air changes
                </h2>
                <p className="mt-2 text-sm text-white/50">
                  These charts turn hourly readings into patterns that are easier to notice.
                </p>
                {data.chartSourceName && (
                  <p className="mt-2 text-xs text-white/40">
                    AQI chart source: {data.chartSourceName} model estimate
                  </p>
                )}
              </div>
              {data.hourly.length > 0 && (
                <>
                  <AQITrendChart hourly={data.hourly} nowTime={nearestNow?.time} />
                  <HourlyPatternChart
                    todayHourly={todayHourly}
                    currentHourTime={nearestNow?.time}
                  />
                </>
              )}
              <PollutantComparisonChart current={data.current} />
            </section>

            <GlassCard hover={false} className="flex items-center gap-4">
              <AlertCircle size={20} className="text-warning shrink-0" />
              <p className="text-sm text-white/60">
                {data.sourceType === 'station'
                  ? 'Pollutant cards use recent OpenAQ station measurements. AQI and time-series charts use Open-Meteo (CAMS) model estimates, so the two sources are not silently mixed.'
                  : 'Data comes from Open-Meteo (CAMS atmospheric composition models). Values are model estimates, not direct sensor readings, and may differ from official local monitoring stations.'}
              </p>
            </GlassCard>
          </div>
        )}
      </div>
    </PageContainer>
  )
}
