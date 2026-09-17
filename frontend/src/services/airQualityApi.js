/**
 * airQualityApi
 * All network access for the Air Quality Explorer lives here — geocoding
 * (city search) and the EcoLens backend air-quality endpoint. UI components
 * never call fetch() directly; they call these functions through the
 * useAirQualityExplorer hook.
 *
 * APIs used:
 * - Geocoding: https://open-meteo.com/en/docs/geocoding-api
 * - Air quality: the EcoLens backend, which tries OpenAQ first and keeps
 *   Open-Meteo as its fallback
 */

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '')

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
        if (body?.message || body?.reason) reason = body.message || body.reason
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
 * Fetch normalized air-quality data from the EcoLens backend.
 * @param {{latitude:number, longitude:number}} coords
 */
export async function fetchAirQuality({ latitude, longitude }) {
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
  })

  const payload = await fetchWithTimeout(
    `${API_BASE_URL}/api/air-quality?${params.toString()}`,
  )
  if (!payload?.data?.current || !Array.isArray(payload.data.hourly)) {
    throw new Error('The server returned incomplete air-quality data.')
  }

  return payload.data
}