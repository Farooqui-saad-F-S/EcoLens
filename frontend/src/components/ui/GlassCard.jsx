/**
 * GlassCard
 * The core surface used across EcoLens: a semi-transparent, blurred glass
 * panel with a soft border, shadow, and gentle hover lift.
 *
 * Props:
 * - as: element/component to render as (default 'div')
 * - hover: enable hover lift + glow (default true)
 * - glow: named accent for a soft top-edge glow ('cyan' | 'blue' | 'emerald' | 'green' | 'purple' | 'warning' | 'danger' | null)
 * - padding: tailwind padding class override (responsive by default)
 * - className: extra classes
 */
const GLOW_MAP = {
  cyan: 'from-cyan-accent/60',
  blue: 'from-blue-accent/60',
  emerald: 'from-emerald-accent/60',
  green: 'from-green-accent/60',
  purple: 'from-purple-accent/60',
  warning: 'from-warning/60',
  danger: 'from-danger/60',
}

export default function GlassCard({
  as: Component = 'div',
  hover = true,
  glow = null,
  padding = 'p-5 sm:p-6',
  className = '',
  children,
  ...rest
}) {
  return (
    <Component
      className={[
        'relative glass-card',
        padding,
        hover ? '' : 'hover:translate-y-0 hover:shadow-glass hover:border-white/10',
        'overflow-hidden',
        className,
      ].join(' ')}
      {...rest}
    >
      {glow && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r/srgb ${GLOW_MAP[glow]} via-transparent to-transparent`}
        />
      )}
      {children}
    </Component>
  )
}
