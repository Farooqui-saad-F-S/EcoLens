/**
 * airQualityApi
 * All network access for the Air Quality Explorer lives here — geocoding
 * (city search) and the Open-Meteo Air Quality fetch, plus response
 * normalization. UI components never call fetch() directly; they call
 * these functions through the useAirQualityExplorer hook.
 *
 * APIs used (both free, no key required):
 * - Geocoding: https://open-meteo.com/en/docs/geocoding-api
 * - Air Quality: https://open-meteo.com/en/docs/air-quality-api
 */

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const AIR_QUALITY_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality'

const HOURLY_VARS = ['pm10', 'pm2_5', 'carbon_monoxide', 'nitrogen_dioxide', 'ozone', 'us_aqi', 'european_aqi']
const CURRENT_VARS = ['us_aqi', 'european_aqi', 'pm10', 'pm2_5', 'carbon_monoxide', 'nitrogen_dioxide', 'ozone']

const REQUEST_TIMEOUT_MS = 10000

/** Fetch with a timeout so a hung request doesn't leave the UI loading forever. */
async function fetchWithTimeout(url, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { signal: controller.signal })
    if (!response.ok) {
      let reason = `Request failed with status ${response.status}`
      try {
        const body = await response.json()
        if (body?.reason) reason = body.reason
      } catch {
        // response wasn't JSON — keep the generic reason
      }
      throw new Error(reason)
    }
    return await response.json()
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('The request timed out. Please check your connection and try again.')
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Search for a city by name.
 * @param {string} query
 * @returns {Promise<Array<{id:number,name:string,country:string,admin1?:string,latitude:number,longitude:number}>>}
 */
export async function searchLocations(query) {
  const trimmed = query.trim()
  if (trimmed.length < 2) return []

  const url = `${GEOCODING_URL}?name=${encodeURIComponent(trimmed)}&count=6&language=en&format=json`
  const data = await fetchWithTimeout(url)
  return (data.results ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    country: r.country ?? '',
    admin1: r.admin1 ?? '',
    latitude: r.latitude,
    longitude: r.longitude,
  }))
}

/**
 * Fetch air quality data for a coordinate and normalize it into a flat,
 * chart-friendly shape.
 * @param {{latitude:number, longitude:number}} coords
 */
export async function fetchAirQuality({ latitude, longitude }) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    hourly: HOURLY_VARS.join(','),
    current: CURRENT_VARS.join(','),
    timezone: 'auto',
    past_days: '2',
    forecast_days: '2',
  })

  const raw = await fetchWithTimeout(`${AIR_QUALITY_URL}?${params.toString()}`)
  return normalizeAirQuality(raw)
}

function normalizeAirQuality(raw) {
  const hourlySource = raw.hourly ?? {}
  const times = hourlySource.time ?? []

  const hourly = times.map((time, i) => ({
    time,
    aqi: hourlySource.us_aqi?.[i] ?? null,
    europeanAqi: hourlySource.european_aqi?.[i] ?? null,
    pm2_5: hourlySource.pm2_5?.[i] ?? null,
    pm10: hourlySource.pm10?.[i] ?? null,
    no2: hourlySource.nitrogen_dioxide?.[i] ?? null,
    o3: hourlySource.ozone?.[i] ?? null,
    co: hourlySource.carbon_monoxide?.[i] ?? null,
  }))

  const c = raw.current ?? {}
  const current = {
    time: c.time ?? null,
    aqi: c.us_aqi ?? null,
    europeanAqi: c.european_aqi ?? null,
    pm2_5: c.pm2_5 ?? null,
    pm10: c.pm10 ?? null,
    no2: c.nitrogen_dioxide ?? null,
    o3: c.ozone ?? null,
    co: c.carbon_monoxide ?? null,
  }

  return {
    current,
    hourly,
    units: raw.hourly_units ?? {},
    timezone: raw.timezone ?? 'UTC',
    latitude: raw.latitude,
    longitude: raw.longitude,
  }
}
