/**
 * Pollutant metadata: display info + a short plain-language explanation
 * shown when a pollutant card is expanded, plus a WHO air quality
 * guideline value used as a "safe reference" line in the comparison chart.
 * Source for guideline values: WHO Global Air Quality Guidelines (2021).
 */
export const POLLUTANTS = [
  {
    key: 'pm2_5',
    label: 'PM2.5',
    fullName: 'Fine Particulate Matter',
    simpleMeaning: 'Very small particles in the air.',
    whyItMatters: 'They are small enough to travel deep into the lungs.',
    unit: 'µg/m³',
    color: '#22D3EE',
    safe: 15,
    description:
      'Tiny airborne particles under 2.5 micrometers wide — small enough to reach deep into the lungs and bloodstream. Common sources include vehicle exhaust, smoke, and industrial emissions.',
  },
  {
    key: 'pm10',
    label: 'PM10',
    fullName: 'Coarse Particulate Matter',
    simpleMeaning: 'Dust-like particles floating in the air.',
    whyItMatters: 'They can irritate the eyes, nose, throat, and airways.',
    unit: 'µg/m³',
    color: '#3B82F6',
    safe: 45,
    description:
      'Larger airborne particles under 10 micrometers wide, such as dust, pollen, and mold spores. They mainly irritate the eyes, nose, and throat.',
  },
  {
    key: 'no2',
    label: 'NO₂',
    fullName: 'Nitrogen Dioxide',
    simpleMeaning: 'A gas mainly produced when fuel is burned.',
    whyItMatters: 'Higher levels can affect breathing and add to urban smog.',
    unit: 'µg/m³',
    color: '#8B5CF6',
    safe: 25,
    description:
      'A gas produced mainly by burning fuel in vehicles and power plants. Long-term exposure is linked to reduced lung function and respiratory infections.',
  },
  {
    key: 'o3',
    label: 'O₃',
    fullName: 'Ground-Level Ozone',
    simpleMeaning: 'A gas that forms near the ground in sunlight.',
    whyItMatters: 'It can make breathing uncomfortable, especially during activity.',
    unit: 'µg/m³',
    color: '#34D399',
    safe: 100,
    description:
      'Formed when sunlight reacts with pollutants from vehicles and industry. Unlike the protective ozone layer high above us, ground-level ozone can trigger asthma and breathing difficulty.',
  },
  {
    key: 'co',
    label: 'CO',
    fullName: 'Carbon Monoxide',
    simpleMeaning: 'An invisible gas from incomplete fuel burning.',
    whyItMatters: 'High concentrations reduce how much oxygen the blood can carry.',
    unit: 'µg/m³',
    color: '#FBBF24',
    safe: 4000,
    description:
      'A colorless, odorless gas from incomplete fuel combustion. At high concentrations it reduces the blood\u2019s ability to carry oxygen.',
  },
]
