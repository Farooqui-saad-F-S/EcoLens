import {
  Activity,
  Droplet,
  FlaskConical,
  Gauge,
  Thermometer,
} from 'lucide-react'

export const WATER_PARAMETERS = [
  {
    id: 'ph',
    name: 'pH',
    simpleMeaning: 'Acidity & alkalinity',
    icon: FlaskConical,
    accent: 'cyan',
    summary: 'Shows whether water is more acidic, neutral, or alkaline.',
    importance:
      'Large changes in pH can affect aquatic life, pipe corrosion, and how other substances behave in water.',
    learnMore:
      'The pH scale runs from 0 to 14. A value near 7 is neutral, lower values are acidic, and higher values are alkaline. Natural geology, rainfall, runoff, and human activity can all influence a reading.',
  },
  {
    id: 'tds',
    name: 'TDS',
    simpleMeaning: 'Dissolved material in water',
    icon: Gauge,
    accent: 'blue',
    summary: 'Estimates the total amount of dissolved material in water.',
    importance:
      'TDS can reflect naturally occurring minerals, salts, and other dissolved substances that affect taste and water systems.',
    learnMore:
      'TDS means Total Dissolved Solids and is commonly shown in milligrams per litre (mg/L). It does not identify which substances are present, so a single TDS value cannot describe overall water quality by itself.',
  },
  {
    id: 'turbidity',
    name: 'Turbidity',
    simpleMeaning: 'How clear the water is',
    icon: Droplet,
    accent: 'cyan',
    summary: 'Describes how clear or cloudy water appears.',
    importance:
      'Cloudiness can come from soil, algae, organic matter, or other suspended particles and may affect light in aquatic environments.',
    learnMore:
      'Turbidity is often measured in NTU. A low reading generally means fewer suspended particles, while a higher reading suggests greater cloudiness. It does not tell us exactly what the particles are.',
  },
  {
    id: 'oxygen',
    name: 'Dissolved Oxygen',
    simpleMeaning: 'Oxygen available for aquatic life',
    icon: Activity,
    accent: 'emerald',
    summary: 'Measures oxygen mixed into water and available to aquatic organisms.',
    importance:
      'Fish, plants, and microorganisms depend on dissolved oxygen, making it an important signal when studying freshwater ecosystems.',
    learnMore:
      'Dissolved oxygen is commonly measured in mg/L. Temperature, water movement, plant activity, and organic matter can change it throughout the day and between locations.',
  },
  {
    id: 'temperature',
    name: 'Water Temperature',
    simpleMeaning: 'How warm or cool the water is',
    icon: Thermometer,
    accent: 'blue',
    summary: 'Shows how warm or cool the water is at the time of measurement.',
    importance:
      'Temperature influences aquatic habitats, chemical reactions, and the amount of oxygen water can hold.',
    learnMore:
      'A useful temperature reading should include the location, depth, time, and season. The same number may have different meaning in a mountain stream, a lake, or a treated-water system.',
  },
]

export const EXPLORER_PARAMETERS = {
  ph: {
    label: 'pH',
    unit: '',
    min: 0,
    max: 14,
    step: 0.1,
    initial: 7,
    decimals: 1,
    color: '#22D3EE',
    explain(value) {
      if (value < 5.5) {
        return {
          title: 'More acidic than neutral water',
          text: 'This example is on the acidic side of the pH scale. Rainfall, local rocks, runoff, and other conditions can influence the reading.',
        }
      }
      if (value < 6.5) {
        return {
          title: 'A little more acidic than neutral',
          text: 'This value is below neutral. That can happen naturally, so the water source, season, and nearby conditions help explain it.',
        }
      }
      if (value <= 8.5) {
        return {
          title: 'Close to neutral',
          text: 'This example is near the middle of the pH scale. Remember that pH alone cannot describe the complete condition of water.',
        }
      }
      if (value <= 10) {
        return {
          title: 'A little more alkaline than neutral',
          text: 'This value is above neutral. Dissolved minerals and local rocks can make water naturally more alkaline.',
        }
      }
      return {
        title: 'More alkaline than neutral water',
        text: 'This example is on the alkaline side of the pH scale. Other measurements are needed to understand why.',
      }
    },
  },
  tds: {
    label: 'TDS',
    unit: 'mg/L',
    min: 0,
    max: 1500,
    step: 10,
    initial: 300,
    decimals: 0,
    color: '#3B82F6',
    explain(value) {
      if (value < 100) {
        return {
          title: 'A small amount of dissolved material',
          text: 'This example suggests relatively little dissolved material. TDS cannot tell us which substances are present.',
        }
      }
      if (value < 500) {
        return {
          title: 'A moderate amount of dissolved material',
          text: 'This example suggests a moderate amount of dissolved material, which may include natural minerals and salts.',
        }
      }
      if (value < 1000) {
        return {
          title: 'More dissolved material is present',
          text: 'This example has a higher TDS reading. Depending on the substances, mineral taste or scaling may become more noticeable.',
        }
      }
      return {
        title: 'A large amount of dissolved material',
        text: 'This example has a high TDS reading. Only laboratory analysis can identify the individual substances.',
      }
    },
  },
  turbidity: {
    label: 'Turbidity',
    unit: 'NTU',
    min: 0,
    max: 25,
    step: 0.1,
    initial: 2,
    decimals: 1,
    color: '#2DD4BF',
    explain(value) {
      if (value < 1) {
        return {
          title: 'The water appears very clear',
          text: 'Very low turbidity usually means few suspended particles. Clear-looking water can still contain dissolved substances or microorganisms.',
        }
      }
      if (value < 5) {
        return {
          title: 'The water has low cloudiness',
          text: 'A small amount of suspended material may be present. Weather, soil, algae, and sampling can all affect the reading.',
        }
      }
      if (value < 15) {
        return {
          title: 'The water is becoming cloudier',
          text: 'Higher turbidity usually means more suspended particles are present, possibly from soil, algae, or other material.',
        }
      }
      return {
        title: 'The water is very cloudy',
        text: 'This example suggests many suspended particles. Turbidity shows cloudiness, but not what the particles are.',
      }
    },
  },
  oxygen: {
    label: 'Dissolved Oxygen',
    unit: 'mg/L',
    min: 0,
    max: 14,
    step: 0.1,
    initial: 7.5,
    decimals: 1,
    color: '#34D399',
    explain(value) {
      if (value < 3) {
        return {
          title: 'Less oxygen is available',
          text: 'Many aquatic organisms may struggle when dissolved oxygen is low. Warm, still water or decaying material can contribute.',
        }
      }
      if (value < 6) {
        return {
          title: 'A moderate amount of oxygen is available',
          text: 'Different aquatic organisms need different oxygen levels. Temperature, depth, and time of day also affect the reading.',
        }
      }
      if (value < 10) {
        return {
          title: 'More oxygen is available',
          text: 'This example has more oxygen for aquatic life, often helped by cooler water, movement, or plant activity.',
        }
      }
      return {
        title: 'A very high oxygen reading',
        text: 'Cold, fast-moving water or strong plant activity can produce high readings. Temperature adds useful context.',
      }
    },
  },
}
