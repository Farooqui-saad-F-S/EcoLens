/**
 * PageContainer
 * Consistent page-level wrapper: max width, horizontal padding, top offset
 * for the fixed navbar, and an optional eyebrow/title/subtitle header block
 * so every page starts with the same visual rhythm.
 */
export default function PageContainer({
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
}) {
  return (
    <main
      id="main-content"
      className={`relative z-0 mx-auto w-full max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8 xl:px-10 ${className}`}
    >
      {(eyebrow || title || subtitle) && (
        <header className="mb-10 max-w-3xl sm:mb-12">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          {title && (
            <h1 className="text-3xl font-semibold leading-tight text-white sm:text-5xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-lg">{subtitle}</p>
          )}
        </header>
      )}
      {children}
    </main>
  )
}
