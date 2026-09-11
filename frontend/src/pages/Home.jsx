import { NavLink } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  BarChart3,
  Droplets,
  Leaf,
  MessagesSquare,
  Waves,
  Wind,
} from 'lucide-react'
import GlassCard from '../components/ui/GlassCard.jsx'

const SECTIONS = [
  {
    to: '/data-insights',
    icon: BarChart3,
    glow: 'purple',
    title: 'Understand the Data',
    desc: 'See simple charts that explain pollutants, AQI levels, and changes over time.',
  },
  {
    to: '/awareness-hub',
    icon: Leaf,
    glow: 'green',
    title: 'Learn About Pollution',
    desc: 'Explore common causes, environmental effects, and actions people can take.',
  },
  {
    to: '/qa',
    icon: MessagesSquare,
    glow: 'purple',
    title: 'Q&A and Quiz',
    desc: 'Tap common questions for simple answers, then try a friendly knowledge check.',
  },
]

export default function Home() {
  return (
    <main id="main-content" className="relative z-0 mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8 xl:px-10">
      <section className="grid min-h-[70vh] items-center gap-12 pb-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 xl:gap-16">
        <div className="max-w-2xl text-center lg:text-left">
          <p className="eyebrow mx-auto mb-5 w-fit lg:mx-0">Air &amp; water quality made simple</p>
          <h1 className="text-4xl font-semibold leading-[1.08] text-white sm:text-6xl xl:text-7xl">
            Know Your Air.
            <span className="gradient-text block">Understand Your Water.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0">
            Check real air-quality data, understand water-quality basics, and learn what
            environmental numbers actually mean.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <NavLink to="/air-quality" className="btn-primary justify-center px-6 py-3">
              <Wind size={18} aria-hidden="true" />
              Check Air Quality
              <ArrowRight size={16} aria-hidden="true" />
            </NavLink>
            <NavLink to="/water-quality" className="btn-ghost justify-center px-6 py-3">
              <Droplets size={18} aria-hidden="true" />
              Explore Water
            </NavLink>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/40 lg:justify-start">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-cyan-accent" />Real city data</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-blue-accent" />Interactive learning</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-accent" />Simple explanations</span>
          </div>
        </div>

        <div
          role="img"
          className="relative mx-auto h-[370px] w-full max-w-xl sm:h-[440px]"
          aria-label="Example EcoLens cards showing AQI, PM2.5, pH, turbidity, and a small trend chart"
        >
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-accent/15 sm:h-72 sm:w-72" />
          <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-accent/20 sm:h-48 sm:w-48" />
          <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br/srgb from-cyan-accent/20 via-blue-accent/15 to-emerald-accent/20 blur-2xl" />

          <GlassCard hover={false} glow="cyan" padding="p-4 sm:p-5" className="float-card-slow absolute left-0 top-3 w-[13rem] sm:left-4 sm:top-5 sm:w-[15rem]">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-xs font-medium text-white/65"><Wind size={15} className="text-cyan-accent" />Air quality</span>
              <span className="rounded-full bg-warning/10 px-2 py-1 text-[10px] font-medium text-warning">Example</span>
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div><p className="text-4xl font-semibold text-white">72</p><p className="mt-1 text-xs text-warning">Moderate AQI</p></div>
              <div className="text-right"><p className="text-[10px] uppercase tracking-wider text-white/35">PM2.5</p><p className="mt-1 text-sm font-medium text-white/70">18 µg/m³</p></div>
            </div>
          </GlassCard>

          <GlassCard hover={false} glow="blue" padding="p-4 sm:p-5" className="float-card-slower absolute right-0 top-[8.5rem] w-[12rem] sm:right-2 sm:top-[10rem] sm:w-[14rem]">
            <div className="flex items-center gap-2 text-xs font-medium text-white/65"><Droplets size={15} className="text-blue-300" />Water basics</div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div><p className="text-[10px] uppercase tracking-wider text-white/35">pH</p><p className="mt-1 text-xl font-semibold text-white">7.0</p><p className="text-[10px] text-cyan-accent/70">Neutral</p></div>
              <div><p className="text-[10px] uppercase tracking-wider text-white/35">Turbidity</p><p className="mt-1 text-xl font-semibold text-white">2.0</p><p className="text-[10px] text-blue-300/70">Low cloudiness</p></div>
            </div>
          </GlassCard>

          <GlassCard hover={false} glow="purple" padding="p-4" className="float-card-slow absolute bottom-2 left-3 w-[13rem] sm:bottom-6 sm:left-12 sm:w-[15rem]">
            <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-xs font-medium text-white/65"><Activity size={15} className="text-purple-300" />Understand trends</span><Waves size={15} className="text-cyan-accent/60" /></div>
            <div className="mt-4 flex h-12 items-end gap-2" aria-hidden="true">
              {[35, 52, 44, 72, 58, 82, 66].map((height, index) => (
                <span key={index} className="flex-1 rounded-t bg-linear-to-t/srgb from-blue-accent/35 to-cyan-accent/80" style={{ height: `${height}%` }} />
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Section explorer */}
      <section className="border-t border-white/[0.07] pb-28 pt-16 sm:pt-20">
        <div className="mb-9 max-w-2xl">
          <p className="eyebrow">Explore at your own pace</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Learn more when you’re ready</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">Start with air or water above, then use these sections to understand the bigger environmental picture.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map(({ to, icon: Icon, glow, title, desc }) => (
            <NavLink key={to} to={to} className="group">
              <GlassCard glow={glow} className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] border border-white/10">
                  <Icon size={20} className="text-cyan-accent" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-accent/90">
                  View section
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </GlassCard>
            </NavLink>
          ))}
        </div>
      </section>
    </main>
  )
}
