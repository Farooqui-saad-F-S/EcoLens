import { getAirQuality } from '../services/airQualityService.js'

function readCoordinate(value, minimum, maximum) {
  if (typeof value !== 'string' || value.trim() === '') return null
  const number = Number(value)
  if (!Number.isFinite(number) || number < minimum || number > maximum) return null
  return number
}

export async function getAirQualityForCoordinates(req, res) {
  const latitude = readCoordinate(req.query.lat, -90, 90)
  const longitude = readCoordinate(req.query.lon, -180, 180)

  if (latitude == null || longitude == null) {
    return res.status(400).json({
      success: false,
      message: 'Valid lat and lon query parameters are required',
    })
  }

  try {
    const data = await getAirQuality(latitude, longitude)
    return res.json({ success: true, data })
  } catch (error) {
    console.error('Air-quality request failed:', error.message)
    return res.status(502).json({
      success: false,
      message: 'Air-quality data is temporarily unavailable. Please try again shortly.',
    })
  }
}