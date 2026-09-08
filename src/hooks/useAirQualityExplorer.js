import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchAirQuality, searchLocations } from '../services/airQualityApi.js'
import {
  clearAirQualitySnapshot,
  readAirQualitySnapshot,
  saveAirQualitySnapshot,
} from '../utils/airQualitySession.js'

const SEARCH_DEBOUNCE_MS = 350

/**
 * useAirQualityExplorer
 * Owns all state for the Air Quality Explorer page: the search query and
 * its debounced results, the selected location, the fetched air quality
 * data, and loading/error status for both. Components stay presentational
 * and call back into the setters/actions this hook returns.
 */
export function useAirQualityExplorer() {
  const [initialSnapshot] = useState(readAirQualitySnapshot)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState(null)

  const [location, setLocation] = useState(initialSnapshot?.location ?? null) // { id, name, country, admin1, latitude, longitude }
  const [data, setData] = useState(initialSnapshot?.data ?? null)
  const [status, setStatus] = useState(initialSnapshot ? 'success' : 'idle') // 'idle' | 'loading' | 'error' | 'success'
  const [error, setError] = useState(null)

  const searchRequestId = useRef(0)
  const dataRequestId = useRef(0)

  // Debounced city search as the user types.
  useEffect(() => {
    const trimmed = query.trim()
    if (trimmed.length < 2) {
      setSuggestions([])
      setSearchLoading(false)
      setSearchError(null)
      return
    }

    setSearchLoading(true)
    setSearchError(null)
    const thisRequest = ++searchRequestId.current

    const timer = setTimeout(async () => {
      try {
        const results = await searchLocations(trimmed)
        if (searchRequestId.current !== thisRequest) return // stale response
        setSuggestions(results)
      } catch (err) {
        if (searchRequestId.current !== thisRequest) return
        setSearchError(err.message || 'Could not search for that city.')
        setSuggestions([])
      } finally {
        if (searchRequestId.current === thisRequest) setSearchLoading(false)
      }
    }, SEARCH_DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [query])

  const loadAirQuality = useCallback(async (loc) => {
    setLocation(loc)
    setSuggestions([])
    setQuery('')
    setStatus('loading')
    setError(null)
    const thisRequest = ++dataRequestId.current

    try {
      const result = await fetchAirQuality(loc)
      if (dataRequestId.current !== thisRequest) return
      setData(result)
      setStatus('success')
      saveAirQualitySnapshot(loc, result)
    } catch (err) {
      if (dataRequestId.current !== thisRequest) return
      setError(err.message || 'Could not load air quality data for this location.')
      setStatus('error')
    }
  }, [])

  const retry = useCallback(() => {
    if (location) loadAirQuality(location)
  }, [location, loadAirQuality])

  const reset = useCallback(() => {
    setLocation(null)
    setData(null)
    setStatus('idle')
    setError(null)
    setQuery('')
    setSuggestions([])
    clearAirQualitySnapshot()
  }, [])

  return {
    query,
    setQuery,
    suggestions,
    searchLoading,
    searchError,
    location,
    data,
    status,
    error,
    selectLocation: loadAirQuality,
    retry,
    reset,
  }
}
