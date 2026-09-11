import { Droplets, Sparkles, Waves } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer.jsx'
import WaterParameterCard from '../components/waterquality/WaterParameterCard.jsx'
import WaterQualityExplorer from '../components/waterquality/WaterQualityExplorer.jsx'
import { WATER_PARAMETERS } from '../data/waterParameters.js'

export default function WaterQuality() {
  return (
    <PageContainer
      eyebrow="Section 02 — Water awareness"
      title="Understand Your Water"
      subtitle="Explore the important measurements that help us understand water quality."
      className="water-page"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-20 -z-10 overflow-hidden">
        <div className="mx-auto h-72 max-w-5xl rounded-[50%] bg-linear-to-r/srgb from-blue-accent/10 via-cyan-accent/15 to-emerald-accent/10 blur-3xl" />
      </div>
      <div aria-hidden="true" className="water-ripple pointer-events-none absolute right-[8%] top-36 -z-10 h-40 w-40 rounded-full border border-cyan-accent/20 sm:h-56 sm:w-56" />
      <div aria-hidden="true" className="water-ripple water-ripple-delay pointer-events-none absolute right-[13%] top-48 -z-10 h-24 w-24 rounded-full border border-blue-accent/20 sm:h-36 sm:w-36" />

      <section aria-labelledby="parameter-title">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Five useful signals</p>
            <h2 id="parameter-title" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              What makes up water quality?
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-cyan-accent/65">
            <Waves size={17} aria-hidden="true" />
            <span>Tap each card to learn more</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WATER_PARAMETERS.map((parameter) => (
            <WaterParameterCard key={parameter.id} parameter={parameter} />
          ))}

          <div className="relative hidden overflow-hidden rounded-2xl border border-cyan-accent/10 bg-linear-to-br/srgb from-cyan-accent/[0.07] to-blue-accent/[0.03] p-6 lg:flex lg:min-h-[310px] lg:flex-col lg:justify-between">
            <div className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full border border-cyan-accent/15" />
            <div className="absolute -bottom-5 -right-2 h-24 w-24 rounded-full border border-blue-accent/15" />
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-accent/20 bg-cyan-accent/10 text-cyan-accent">
              <Droplets size={22} aria-hidden="true" />
            </span>
            <div className="relative">
              <Sparkles size={18} className="mb-3 text-cyan-accent/70" aria-hidden="true" />
              <p className="max-w-[14rem] text-lg font-medium leading-relaxed text-white/75">
                A clearer picture comes from several measurements considered together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaterQualityExplorer />
    </PageContainer>
  )
}
