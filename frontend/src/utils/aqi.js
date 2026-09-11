/**
 * AQI helpers
 * Shared logic for mapping a numeric AQI value to a human category,
 * a theme color, and a short health note. Used across Air Quality and
 * (later) Data Insights pages so the scale stays consistent app-wide.
 */

export const AQI_SCALE = [
  {
    max: 50,
    label: 'Good',
    simpleLabel: 'Good',
    color: '#10B981',
    note: 'The air is clean for most people. Enjoy normal outdoor activities.',
  },
  {
    max: 100,
    label: 'Moderate',
    simpleLabel: 'Moderate',
    color: '#FBBF24',
    note: 'Air is acceptable for most people. Sensitive people may prefer shorter outdoor activity.',
  },
  {
    max: 150,
    label: 'Unhealthy for Sensitive Groups',
    simpleLabel: 'Poor for Sensitive Groups',
    color: '#FB923C',
    note: 'Sensitive people may notice effects and may choose to reduce long outdoor activity.',
  },
  {
    max: 200,
    label: 'Unhealthy',
    simpleLabel: 'Poor',
    color: '#FB7185',
    note: 'Air pollution is high enough that everyone should be more careful outdoors.',
  },
  {
    max: 300,
    label: 'Very Unhealthy',
    simpleLabel: 'Very Poor',
    color: '#E11D48',
    note: 'Air pollution is very high. Consider limiting time and effort outdoors.',
  },
  {
    max: Infinity,
    label: 'Hazardous',
    simpleLabel: 'Severe',
    color: '#8B5CF6',
    note: 'Air pollution is severe. Follow guidance from your local air-quality authority.',
  },
]

export function getAQICategory(value) {
  return AQI_SCALE.find((tier) => value <= tier.max) ?? AQI_SCALE[AQI_SCALE.length - 1]
}

export function aqiPercent(value, max = 300) {
  return Math.max(0, Math.min(100, (value / max) * 100))
}
