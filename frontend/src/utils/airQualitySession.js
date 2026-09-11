const SNAPSHOT_KEY = 'ecolens-air-quality-snapshot-v1'

/**
 * Keeps the most recently explored city available while the current browser
 * tab is open, allowing Data Insights to reuse the same real API response.
 */
export function saveAirQualitySnapshot(location, data) {
  if (!location || !data) return

  try {
    window.sessionStorage.setItem(
      SNAPSHOT_KEY,
      JSON.stringify({ location, data, savedAt: new Date().toISOString() }),
    )
  } catch {
    // Storage can be unavailable in privacy modes; the explorer still works.
  }
}

export function readAirQualitySnapshot() {
  try {
    const raw = window.sessionStorage.getItem(SNAPSHOT_KEY)
    if (!raw) return null

    const snapshot = JSON.parse(raw)
    if (!snapshot?.location || !snapshot?.data?.current || !Array.isArray(snapshot?.data?.hourly)) {
      return null
    }

    return snapshot
  } catch {
    return null
  }
}

export function clearAirQualitySnapshot() {
  try {
    window.sessionStorage.removeItem(SNAPSHOT_KEY)
  } catch {
    // Nothing else is required when storage is unavailable.
  }
}
