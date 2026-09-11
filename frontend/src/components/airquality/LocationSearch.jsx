import { useState, useRef, useEffect } from 'react'
import { Search, MapPin, Loader2, X } from 'lucide-react'

/**
 * LocationSearch
 * Debounced city search box with a suggestions dropdown. Purely
 * presentational — all search state and network calls are owned by
 * useAirQualityExplorer and passed in as props.
 */
export default function LocationSearch({
  query,
  onQueryChange,
  suggestions,
  loading,
  error,
  onSelect,
  placeholder = 'Search for your city...',
}) {
  const [focused, setFocused] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const showDropdown = focused && (query.trim().length >= 2)
  const suggestionsId = 'location-search-suggestions'

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5">
        <Search size={18} className="shrink-0 text-white/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-hidden"
          aria-label="Search for a city"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-controls={suggestionsId}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setFocused(false)
          }}
        />
        {loading && <Loader2 size={16} className="shrink-0 animate-spin text-cyan-accent" />}
        {!loading && query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            className="shrink-0 text-white/30 hover:text-white/70"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          id={suggestionsId}
          role="listbox"
          className="glass absolute inset-x-0 top-[calc(100%+0.5rem)] z-20 max-h-80 overflow-y-auto rounded-2xl p-2 shadow-glass-hover"
        >
          {error && (
            <p className="px-3 py-3 text-sm text-danger">{error}</p>
          )}

          {!error && !loading && suggestions.length === 0 && query.trim().length >= 2 && (
            <p className="px-3 py-3 text-sm text-white/45">No cities found for "{query}".</p>
          )}

          {!error &&
            suggestions.map((place) => (
              <button
                key={place.id}
                type="button"
                onClick={() => {
                  setFocused(false)
                  onSelect(place)
                }}
                role="option"
                aria-selected="false"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <MapPin size={15} className="shrink-0 text-cyan-accent/80" />
                <span className="flex-1 truncate">
                  <span className="font-medium text-white">{place.name}</span>
                  {(place.admin1 || place.country) && (
                    <span className="text-white/45">
                      {', '}
                      {[place.admin1, place.country].filter(Boolean).join(', ')}
                    </span>
                  )}
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  )
}
