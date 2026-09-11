export default function Footer() {
  return (
    <footer className="relative z-0 mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8 xl:px-10">
      <div className="glass-panel flex flex-col items-center justify-between gap-3 px-4 py-5 text-center text-sm text-white/50 sm:flex-row sm:px-6 sm:text-left">
        <p className="leading-relaxed">© {new Date().getFullYear()} EcoLens. Understand the air around us and the water we depend on.</p>
        <p className="font-mono text-xs uppercase tracking-widest text-white/30">
          Data awareness project
        </p>
      </div>
    </footer>
  )
}
