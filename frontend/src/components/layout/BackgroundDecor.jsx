/**
 * BackgroundDecor
 * Fixed, full-viewport ambient layer: large soft blurred gradient orbs
 * drifting slowly behind the app content, plus a faint grid to suggest
 * "instrumentation" without looking like a typical admin dashboard.
 * Purely decorative — pointer-events disabled, aria-hidden.
 */
export default function BackgroundDecor() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* base wash */}
      <div className="absolute inset-0 bg-canvas" />

      {/* faint instrumentation grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* blurred gradient orbs */}
      <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-cyan-accent/20 blur-[110px] animate-drift-slow" />
      <div className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-purple-accent/20 blur-[120px] animate-drift-slower" />
      <div className="absolute bottom-[-10rem] left-1/4 h-[26rem] w-[26rem] rounded-full bg-emerald-accent/[0.15] blur-[110px] animate-drift-slow" />
      <div className="absolute bottom-0 right-1/4 h-[20rem] w-[20rem] rounded-full bg-blue-accent/[0.15] blur-[100px] animate-drift-slower" />

      {/* subtle vignette to keep edges dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#07111F_95%)]" />
    </div>
  )
}
