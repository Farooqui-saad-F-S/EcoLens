/**
 * Given an hourly series (each item with a `time` ISO string) and a
 * reference ISO time, return the entry whose time is closest to it.
 * Used to line up "now" markers with an exact category value on charts.
 */
export function findNearestHourly(hourly, referenceIso) {
  if (!hourly?.length) return null
  const refMs = referenceIso ? new Date(referenceIso).getTime() : Date.now()
  if (Number.isNaN(refMs)) return hourly[0]

  let closest = hourly[0]
  let smallestDiff = Infinity
  for (const entry of hourly) {
    const t = new Date(entry.time).getTime()
    if (Number.isNaN(t)) continue
    const diff = Math.abs(t - refMs)
    if (diff < smallestDiff) {
      smallestDiff = diff
      closest = entry
    }
  }
  return closest
}

/** Returns the yyyy-mm-dd date prefix of an ISO time string. */
export function dateOnly(isoTime) {
  return isoTime ? isoTime.slice(0, 10) : null
}
