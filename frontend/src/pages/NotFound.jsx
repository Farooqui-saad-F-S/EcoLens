import { NavLink } from 'react-router-dom'
import { Compass } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'

export default function NotFound() {
  return (
    <PageContainer>
      <GlassCard hover={false} className="mx-auto max-w-md text-center" padding="p-6 sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/10">
          <Compass size={24} className="text-cyan-accent" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-white">Off the map</h1>
        <p className="mt-2 text-sm text-white/55">This page doesn't exist yet in EcoLens.</p>
        <NavLink to="/" className="btn-primary mt-6">
          Back to Home
        </NavLink>
      </GlassCard>
    </PageContainer>
  )
}
