const OPENAQ_BASE_URL = 'https://api.openaq.org/v3'
const OPEN_METEO_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality'

const STATION_RADIUS_METERS = 25_000
const MAX_STATION_DATA_AGE_HOURS = 3
const MAX_STATIONS_TO_CHECK = 3
const REQUEST_TIMEOUT_MS = 5_000

const HOURLY_VARS = [
  'pm10',
  'pm2_5',
  'carbon_monoxide',
  'nitrogen_dioxide',
  'ozone',
  'us_aqi',
  'european_aqi',
]
const CURRENT_VARS = [
  'us_aqi',
  'european_aqi',
  'pm10',
  'pm2_5',
  'carbon_monoxide',
  'nitrogen_dioxide',
  'ozone',
]

const PARAMETER_FIELDS = {
  pm25: 'pm2_5',
  pm10: 'pm10',
  no2: 'no2',
  o3: 'o3',
  co: 'co',
}

async function fetchJson(url, { headers = {}, timeoutMs = REQUEST_TIMEOUT_MS } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, { headers, signal: controller.signal })
    const body = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(
        body?.detail?.[0]?.msg ||
          body?.message ||
          `Request failed with status ${response.status}`,
      )
    }

    return body
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('The air-quality provider timed out')
    }
    throw error
  } finally {
    clearTimeout(timer)
  }
}

function parameterKey(name) {
  return String(name ?? '')
    .toLowerCase()
    .replace(/[\s._-]/g, '')
}

function normalizedUnit(unit) {
  return String(unit ?? '')
    .toLowerCase()
    .replace(/μ/g, 'µ')
    .replace(/\s/g, '')
}

function toMicrogramsPerCubicMeter(value, unit) {
  const number = Number(value)
  if (!Number.isFinite(number) || number < 0) return null

  const cleanUnit = normalizedUnit(unit)
  if (['µg/m³', 'µg/m3', 'ug/m³', 'ug/m3'].includes(cleanUnit)) return number
  if (['mg/m³', 'mg/m3'].includes(cleanUnit)) return number * 1000

  // Do not guess conversions from ppm or ppb. Those require gas-specific assumptions.
  return null
}

function supportsExistingFrontendUnit(sensor) {
  const key = PARAMETER_FIELDS[parameterKey(sensor?.parameter?.name)]
  return Boolean(key && toMicrogramsPerCubicMeter(1, sensor?.parameter?.units) != null)
}

function distanceInKm(latitude, longitude, stationCoordinates) {
  const stationLat = Number(stationCoordinates?.latitude)
  const stationLon = Number(stationCoordinates?.longitude)
  if (!Number.isFinite(stationLat) || !Number.isFinite(stationLon)) return Infinity

  const toRadians = (degrees) => (degrees * Math.PI) / 180
  const earthRadiusKm = 6371
  const latitudeDelta = toRadians(stationLat - latitude)
  const longitudeDelta = toRadians(stationLon - longitude)
  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(toRadians(latitude)) *
      Math.cos(toRadians(stationLat)) *
      Math.sin(longitudeDelta / 2) ** 2

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function normalizeStationMeasurements(location, measurements) {
  const sensorById = new Map((location.sensors ?? []).map((sensor) => [sensor.id, sensor]))
  const latestByField = new Map()
  const freshnessCutoff = Date.now() - MAX_STATION_DATA_AGE_HOURS * 60 * 60 * 1000

  for (const measurement of measurements) {
    const sensor = sensorById.get(measurement.sensorsId)
    const field = PARAMETER_FIELDS[parameterKey(sensor?.parameter?.name)]
    if (!field) continue

    const value = toMicrogramsPerCubicMeter(measurement.value, sensor?.parameter?.units)
    const measuredAt = measurement.datetime?.utc
    const measuredAtMs = Date.parse(measuredAt)
    if (value == null || !Number.isFinite(measuredAtMs) || measuredAtMs < freshnessCutoff) {
      continue
    }

    const previous = latestByField.get(field)
    if (!previous || measuredAtMs > previous.measuredAtMs) {
      latestByField.set(field, { value, measuredAt, measuredAtMs })
    }
  }

  if (latestByField.size === 0) return null

  const current = {
    time: null,
    aqi: null,
    europeanAqi: null,
    pm2_5: null,
    pm10: null,
    no2: null,
    o3: null,
    co: null,
  }

  for (const [field, measurement] of latestByField) {
    current[field] = measurement.value
  }

  const updatedAt = [...latestByField.values()].sort(
    (a, b) => b.measuredAtMs - a.measuredAtMs,
  )[0].measuredAt
  current.time = updatedAt

  return { current, updatedAt }
}

async function fetchNearestOpenAqStation(latitude, longitude) {
  const apiKey = process.env.OPENAQ_API_KEY?.trim()
  if (!apiKey) return null

  const params = new URLSearchParams({
    coordinates: `${latitude.toFixed(4)},${longitude.toFixed(4)}`,
    radius: String(STATION_RADIUS_METERS),
    mobile: 'false',
    limit: '20',
    page: '1',
  })

  const headers = { 'X-API-Key': apiKey }
  const locationResponse = await fetchJson(`${OPENAQ_BASE_URL}/locations?${params}`, {
    headers,
  })

  const candidates = (locationResponse.results ?? [])
    .filter(
      (location) =>
        location.isMobile !== true &&
        (location.sensors ?? []).some(supportsExistingFrontendUnit),
    )
    .map((location) => ({
      ...location,
      distanceKm: distanceInKm(latitude, longitude, location.coordinates),
    }))
    .filter((location) => Number.isFinite(location.distanceKm))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, MAX_STATIONS_TO_CHECK)

  const datetimeMin = new Date(
    Date.now() - MAX_STATION_DATA_AGE_HOURS * 60 * 60 * 1000,
  ).toISOString()

  for (const location of candidates) {
    try {
      const latestParams = new URLSearchParams({
        datetime_min: datetimeMin,
        limit: '100',
        page: '1',
      })
      const latestResponse = await fetchJson(
        `${OPENAQ_BASE_URL}/locations/${location.id}/latest?${latestParams}`,
        { headers },
      )
      const normalized = normalizeStationMeasurements(location, latestResponse.results ?? [])
      if (!normalized) continue

      return {
        ...normalized,
        stationName: location.name || location.locality || 'Nearest OpenAQ station',
        provider: location.provider?.name || null,
        owner: location.owner?.name || null,
        distanceKm: Math.round(location.distanceKm * 10) / 10,
        timezone: location.timezone || 'UTC',
      }
    } catch (error) {
      console.warn(`OpenAQ station ${location.id} was skipped: ${error.message}`)
    }
  }

  return null
}

async function fetchOpenMeteo(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    hourly: HOURLY_VARS.join(','),
    current: CURRENT_VARS.join(','),
    timezone: 'auto',
    past_days: '2',
    forecast_days: '2',
  })

  const raw = await fetchJson(`${OPEN_METEO_URL}?${params}`)
  const hourlySource = raw.hourly ?? {}
  const times = hourlySource.time ?? []

  const hourly = times.map((time, index) => ({
    time,
    aqi: hourlySource.us_aqi?.[index] ?? null,
    europeanAqi: hourlySource.european_aqi?.[index] ?? null,
    pm2_5: hourlySource.pm2_5?.[index] ?? null,
    pm10: hourlySource.pm10?.[index] ?? null,
    no2: hourlySource.nitrogen_dioxide?.[index] ?? null,
    o3: hourlySource.ozone?.[index] ?? null,
    co: hourlySource.carbon_monoxide?.[index] ?? null,
  }))

  const currentSource = raw.current ?? {}
  const current = {
    time: currentSource.time ?? null,
    aqi: currentSource.us_aqi ?? null,
    europeanAqi: currentSource.european_aqi ?? null,
    pm2_5: currentSource.pm2_5 ?? null,
    pm10: currentSource.pm10 ?? null,
    no2: currentSource.nitrogen_dioxide ?? null,
    o3: currentSource.ozone ?? null,
    co: currentSource.carbon_monoxide ?? null,
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

export async function getAirQuality(latitude, longitude) {
  let stationData = null
  let stationError = null
  let modelData = null
  let modelError = null

  try {
    stationData = await fetchNearestOpenAqStation(latitude, longitude)
  } catch (error) {
    stationError = error
    console.warn(`OpenAQ unavailable; trying Open-Meteo: ${error.message}`)
  }

  try {
    modelData = await fetchOpenMeteo(latitude, longitude)
  } catch (error) {
    modelError = error
    console.warn(`Open-Meteo unavailable: ${error.message}`)
  }

  if (stationData) {
    return {
      sourceType: 'station',
      sourceName: 'OpenAQ',
      stationName: stationData.stationName,
      provider: stationData.provider,
      owner: stationData.owner,
      distanceKm: stationData.distanceKm,
      updatedAt: stationData.updatedAt,
      aqiSourceName: modelData ? 'Open-Meteo / CAMS' : null,
      aqiUpdatedAt: modelData?.current?.time ?? null,
      chartSourceName: modelData ? 'Open-Meteo / CAMS' : null,
      current: {
        ...stationData.current,
        aqi: modelData?.current?.aqi ?? null,
        europeanAqi: modelData?.current?.europeanAqi ?? null,
      },
      hourly: modelData?.hourly ?? [],
      units: {
        ...modelData?.units,
        pm2_5: 'µg/m³',
        pm10: 'µg/m³',
        no2: 'µg/m³',
        o3: 'µg/m³',
        co: 'µg/m³',
      },
      timezone: modelData?.timezone ?? stationData.timezone,
      latitude,
      longitude,
    }
  }

  if (modelData) {
    return {
      sourceType: 'model',
      sourceName: 'Open-Meteo / CAMS',
      stationName: null,
      provider: null,
      owner: null,
      distanceKm: null,
      updatedAt: modelData.current.time,
      aqiSourceName: 'Open-Meteo / CAMS',
      aqiUpdatedAt: modelData.current.time,
      chartSourceName: 'Open-Meteo / CAMS',
      ...modelData,
    }
  }

  throw new Error(
    `Air-quality data is temporarily unavailable from both sources. OpenAQ: ${
      stationError?.message || 'no recent station data'
    }. Open-Meteo: ${modelError?.message || 'unavailable'}.`,
  )
}