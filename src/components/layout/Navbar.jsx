import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Wind, Droplets, BarChart3, Leaf, MessagesSquare, Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: null, end: true },
  { to: '/air-quality', label: 'Air', icon: Wind },
  { to: '/water-quality', label: 'Water', icon: Droplets },
  { to: '/data-insights', label: 'Insights', icon: BarChart3 },
  { to: '/awareness-hub', label: 'Learn', icon: Leaf },
  { to: '/qa', label: 'Q&A', icon: MessagesSquare },
]

function LogoMark() {
  return (
    <div className="relative h-8 w-8 shrink-0">
      <div className="absolute inset-0 rounded-full border border-cyan-accent/40 animate-spin-slow" />
      <div className="absolute inset-[5px] rounded-full border border-emerald-accent/50" />
      <div className="absolute inset-[11px] rounded-full bg-gradient-to-br from-cyan-accent to-blue-accent animate-pulse-soft" />
    </div>
  )
}

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  // Close the mobile menu on route change (route change re-mounts nothing here,
  // so we simply close whenever a link inside the menu is clicked).
  const closeMenu = () => setOpen(false)

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-3' : 'py-5',
      ].join(' ')}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
          <NavLink to="/" className="flex items-center gap-3" onClick={closeMenu} aria-label="EcoLens home">
            <LogoMark />
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              Eco<span className="gradient-text">Lens</span>
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
            {NAV_ITEMS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {({ isActive }) => (
                  <span className="flex flex-col items-center gap-1">
                    {label}
                    <span
                      className={`h-px w-full bg-gradient-to-r from-cyan-accent to-emerald-accent transition-all duration-300 ${
                        isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                      }`}
                    />
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden xl:block">
            <NavLink to="/qa" className="btn-primary text-sm">
              Quick Quiz
            </NavLink>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={[
            'grid transition-all duration-300 ease-out xl:hidden',
            open ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          ].join(' ')}
        >
          <div className="overflow-hidden">
            <nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="glass flex max-h-[calc(100vh-7.5rem)] flex-col gap-1 overflow-y-auto rounded-2xl p-3"
            >
              {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-white/[0.06] text-white'
                        : 'text-white/70 hover:bg-white/[0.04] hover:text-white',
                    ].join(' ')
                  }
                >
                  {Icon && <Icon size={18} className="text-cyan-accent/80" />}
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
