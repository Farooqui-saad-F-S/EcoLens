import {
  Bike,
  Building2,
  Car,
  Droplets,
  Factory,
  Flame,
  FlaskConical,
  Footprints,
  HeartPulse,
  Leaf,
  Recycle,
  ShieldCheck,
  Trash2,
  Waves,
  Wind,
} from 'lucide-react'

export const AWARENESS_CATEGORIES = {
  air: {
    id: 'air',
    label: 'Air Pollution',
    eyebrow: 'Breathe with awareness',
    icon: Wind,
    glow: 'cyan',
    gradient: 'from-cyan-accent/15 via-blue-accent/10 to-transparent',
    intro:
      'Air pollution comes from a mixture of human activities and natural conditions. Understanding common sources helps communities notice patterns and reduce avoidable emissions.',
    flow: ['Source', 'Airborne pollutants', 'People & ecosystems'],
    topics: [
      {
        id: 'air-causes',
        title: 'Major causes',
        subtitle: 'Where outdoor air pollution often begins',
        icon: Factory,
        items: [
          {
            title: 'Vehicle emissions',
            text: 'Cars, buses, and trucks release gases and fine particles when fuel burns, especially in congestion.',
            icon: Car,
          },
          {
            title: 'Industrial emissions',
            text: 'Factories, power generation, and construction activity can release gases, smoke, and particles.',
            icon: Building2,
          },
          {
            title: 'Dust',
            text: 'Road dust, exposed soil, construction, and dry weather can raise coarse particle levels.',
            icon: Wind,
          },
          {
            title: 'Waste burning',
            text: 'Burning mixed waste produces smoke and pollutants that can spread beyond the immediate area.',
            icon: Flame,
          },
        ],
      },
      {
        id: 'air-impacts',
        title: 'Why it matters',
        subtitle: 'General environmental and wellbeing impacts',
        icon: HeartPulse,
        items: [
          {
            title: 'Breathing comfort',
            text: 'Polluted air can irritate the eyes and airways and may affect sensitive people more strongly.',
            icon: HeartPulse,
          },
          {
            title: 'Visibility and climate',
            text: 'Particles can create haze, while some air pollutants also influence warming and weather patterns.',
            icon: Wind,
          },
          {
            title: 'Plants and wildlife',
            text: 'Ozone, particles, and deposited pollutants can affect plant growth, soil, water, and habitats.',
            icon: Leaf,
          },
        ],
      },
      {
        id: 'air-actions',
        title: 'Actions we can take',
        subtitle: 'Small choices that reduce avoidable emissions',
        icon: Footprints,
        items: [
          {
            title: 'Choose shared or active travel',
            text: 'Walk, cycle, car-share, or use public transport when practical and suitable for the journey.',
            icon: Bike,
          },
          {
            title: 'Avoid burning waste',
            text: 'Separate waste and use local collection or recycling options instead of open burning.',
            icon: Trash2,
          },
          {
            title: 'Reduce unnecessary energy use',
            text: 'Switch off unused equipment and choose efficient appliances to lower energy demand.',
            icon: ShieldCheck,
          },
          {
            title: 'Check local AQI',
            text: 'Use current air-quality information to understand patterns and plan outdoor activity thoughtfully.',
            icon: Wind,
          },
        ],
      },
    ],
  },
  water: {
    id: 'water',
    label: 'Water Pollution',
    eyebrow: 'Protect every drop',
    icon: Droplets,
    glow: 'blue',
    gradient: 'from-blue-accent/15 via-cyan-accent/10 to-transparent',
    intro:
      'Water pollution happens when waste or chemicals enter rivers, lakes, groundwater, or coastal areas. Prevention begins by keeping pollutants out of drains and natural water systems.',
    flow: ['Pollution source', 'Water pathway', 'Ecosystem effects'],
    topics: [
      {
        id: 'water-causes',
        title: 'Major causes',
        subtitle: 'How pollutants reach water systems',
        icon: FlaskConical,
        items: [
          {
            title: 'Plastic waste',
            text: 'Bags, bottles, wrappers, and tiny plastic fragments can travel through drains into waterways.',
            icon: Recycle,
          },
          {
            title: 'Sewage',
            text: 'Untreated or poorly managed wastewater can add organic waste, nutrients, and microorganisms.',
            icon: Droplets,
          },
          {
            title: 'Industrial discharge',
            text: 'Wastewater from industrial activity may carry heat, dyes, metals, oils, or other substances.',
            icon: Factory,
          },
          {
            title: 'Chemical contamination',
            text: 'Fertilisers, pesticides, cleaners, and oils can enter water through runoff or improper disposal.',
            icon: FlaskConical,
          },
        ],
      },
      {
        id: 'water-impacts',
        title: 'Effects on ecosystems',
        subtitle: 'What changes when pollution enters water',
        icon: Waves,
        items: [
          {
            title: 'Less oxygen',
            text: 'Excess nutrients and organic waste can encourage growth and decay that reduce dissolved oxygen.',
            icon: Droplets,
          },
          {
            title: 'Habitat disruption',
            text: 'Sediment, litter, and chemicals can alter feeding areas, breeding grounds, and aquatic habitats.',
            icon: Waves,
          },
          {
            title: 'Pollutants in food webs',
            text: 'Some persistent substances can build up in organisms and move through connected food webs.',
            icon: Leaf,
          },
        ],
      },
      {
        id: 'water-actions',
        title: 'Conserve and prevent pollution',
        subtitle: 'Practical actions at home and nearby',
        icon: ShieldCheck,
        items: [
          {
            title: 'Use water thoughtfully',
            text: 'Repair leaks, turn taps off when not needed, and reuse suitable water where practical.',
            icon: Droplets,
          },
          {
            title: 'Keep waste out of drains',
            text: 'Do not pour oils, paints, medicines, or strong chemicals into sinks or storm drains.',
            icon: Trash2,
          },
          {
            title: 'Reduce single-use plastic',
            text: 'Carry reusable items, sort waste, and prevent litter from reaching streets and waterways.',
            icon: Recycle,
          },
          {
            title: 'Support clean surroundings',
            text: 'Join safe local clean-ups and report visible leaks or illegal dumping to local authorities.',
            icon: Footprints,
          },
        ],
      },
    ],
  },
}
