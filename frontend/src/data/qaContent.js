import {
  Activity,
  BarChart3,
  Building2,
  Car,
  CircleDot,
  CloudSun,
  Droplet,
  Eye,
  Factory,
  FlaskConical,
  Gauge,
  HeartPulse,
  Layers3,
  Microscope,
  Scale,
  Waves,
  Wind,
} from 'lucide-react'

export const QA_CATEGORIES = {
  air: {
    label: 'Air Quality',
    icon: Wind,
    glow: 'cyan',
    questions: [
      {
        id: 'what-is-aqi',
        question: 'What is AQI?',
        icon: Gauge,
        answer:
          'AQI stands for Air Quality Index. It turns measurements of common air pollutants into one number and category, making current air conditions easier to understand.',
      },
      {
        id: 'high-aqi',
        question: 'What does a high AQI mean?',
        icon: BarChart3,
        answer:
          'A higher AQI means pollution levels are higher and there may be greater concern, especially for children, older adults, and people who are sensitive to air pollution.',
      },
      {
        id: 'what-is-pm25',
        question: 'What is PM2.5?',
        icon: Microscope,
        answer:
          'PM2.5 is made of extremely small airborne particles with a width of 2.5 micrometres or less. Common sources include smoke, vehicle exhaust, and fuel burning.',
      },
      {
        id: 'what-is-pm10',
        question: 'What is PM10?',
        icon: CircleDot,
        answer:
          'PM10 means airborne particles with a width of 10 micrometres or less. Dust, pollen, road activity, and construction can all add PM10 to the air.',
      },
      {
        id: 'pm-difference',
        question: 'What is the difference between PM2.5 and PM10?',
        icon: Scale,
        answer:
          'The main difference is size. PM2.5 particles are much finer than PM10 particles. Because they are smaller, they can travel deeper into the respiratory system.',
      },
      {
        id: 'ground-ozone',
        question: 'What is ground-level ozone?',
        icon: CloudSun,
        answer:
          'Ground-level ozone is a gas formed when sunlight reacts with pollutants released by vehicles, industry, and other sources. It is different from the protective ozone layer high in the atmosphere.',
      },
      {
        id: 'air-causes',
        question: 'What causes air pollution?',
        icon: Factory,
        answer:
          'Major causes include vehicle exhaust, industrial activity, power generation, construction dust, fuel burning, and open waste burning. Weather can also affect how pollution spreads or builds up.',
      },
      {
        id: 'air-monitoring',
        question: 'Why is air quality monitoring important?',
        icon: Eye,
        answer:
          'Monitoring helps us notice pollution changes, compare locations and times, understand possible sources, and make better-informed decisions about everyday activities and environmental action.',
      },
    ],
  },
  water: {
    label: 'Water Quality',
    icon: Droplet,
    glow: 'blue',
    questions: [
      {
        id: 'what-is-water-quality',
        question: 'What is water quality?',
        icon: Waves,
        answer:
          'Water quality describes the physical, chemical, and biological condition of water. Different measurements help explain its appearance, composition, and ability to support ecosystems or particular uses.',
      },
      {
        id: 'what-is-ph',
        question: 'What is pH?',
        icon: FlaskConical,
        answer:
          'pH shows whether water is more acidic, neutral, or alkaline. The scale runs from 0 to 14, and a reading near 7 is neutral.',
      },
      {
        id: 'what-is-tds',
        question: 'What does TDS mean?',
        icon: Layers3,
        answer:
          'TDS means Total Dissolved Solids. It estimates the total amount of dissolved material, such as minerals and salts, but does not identify each substance individually.',
      },
      {
        id: 'what-is-turbidity',
        question: 'What is turbidity?',
        icon: Eye,
        answer:
          'Turbidity describes how clear or cloudy water appears. Higher turbidity generally means more suspended particles such as soil, algae, or organic matter.',
      },
      {
        id: 'what-is-do',
        question: 'What is dissolved oxygen?',
        icon: Activity,
        answer:
          'Dissolved oxygen is oxygen mixed into water. It enters through contact with the air, moving water, and photosynthesis by aquatic plants and algae.',
      },
      {
        id: 'do-importance',
        question: 'Why is dissolved oxygen important?',
        icon: HeartPulse,
        answer:
          'Fish and many other aquatic organisms need dissolved oxygen. Its level is therefore a useful signal when studying the condition of rivers, lakes, and other freshwater ecosystems.',
      },
      {
        id: 'water-causes',
        question: 'What causes water pollution?',
        icon: Building2,
        answer:
          'Water pollution can come from plastic waste, untreated sewage, industrial discharge, farm runoff, oils, cleaners, and other chemicals reaching rivers, lakes, groundwater, or coastal water.',
      },
      {
        id: 'water-monitoring',
        question: 'Why is water quality monitoring important?',
        icon: Eye,
        answer:
          'Regular monitoring helps reveal changes, identify possible pollution, understand ecosystem conditions, and guide further testing or action. One measurement alone rarely tells the whole story.',
      },
    ],
  },
}

export const QUIZ_QUESTIONS = [
  {
    question: 'What does AQI stand for?',
    options: ['Air Quality Index', 'Atmospheric Quantity Indicator', 'Air Question Information'],
    correctIndex: 0,
    explanation:
      'AQI stands for Air Quality Index. It combines air-pollution information into a simpler number and category.',
  },
  {
    question: 'What does a higher AQI generally indicate?',
    options: ['More rainfall', 'Higher air pollution', 'Higher water temperature'],
    correctIndex: 1,
    explanation:
      'A higher AQI generally indicates higher pollution and increasing concern about current air conditions.',
  },
  {
    question: 'Which particles are smaller?',
    options: ['PM10', 'PM2.5', 'They are the same size'],
    correctIndex: 1,
    explanation:
      'PM2.5 particles are 2.5 micrometres or smaller, making them finer than PM10 particles.',
  },
  {
    question: 'A pH reading near 7 is usually described as…',
    options: ['Neutral', 'Highly acidic', 'Highly alkaline'],
    correctIndex: 0,
    explanation:
      'The middle of the pH scale is around 7, which is described as neutral.',
  },
  {
    question: 'What does TDS estimate?',
    options: ['Water speed', 'Total dissolved material', 'Only plastic particles'],
    correctIndex: 1,
    explanation:
      'TDS estimates the total amount of dissolved material, including minerals and salts, in water.',
  },
  {
    question: 'Turbidity mainly describes…',
    options: ['Cloudiness', 'Sound', 'Water pressure'],
    correctIndex: 0,
    explanation:
      'Turbidity describes water clarity or cloudiness caused by suspended particles.',
  },
  {
    question: 'Why is dissolved oxygen important?',
    options: [
      'It gives water a blue colour',
      'Aquatic organisms depend on it',
      'It measures plastic waste',
    ],
    correctIndex: 1,
    explanation:
      'Fish and many other aquatic organisms depend on oxygen dissolved in water.',
  },
]
