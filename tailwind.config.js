/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "base" conflicts with Tailwind's built-in `text-base` font-size
        // utility and can make responsive body copy inherit this dark color.
        canvas: {
          DEFAULT: '#07111F',
          50: '#0B1626',
          100: '#0E1B2E',
        },
        cyan: {
          accent: '#22D3EE',
        },
        blue: {
          accent: '#3B82F6',
        },
        emerald: {
          accent: '#34D399',
        },
        green: {
          accent: '#10B981',
        },
        purple: {
          accent: '#8B5CF6',
        },
        warning: {
          DEFAULT: '#FBBF24',
        },
        danger: {
          DEFAULT: '#FB7185',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glass-hover': '0 12px 40px 0 rgba(34, 211, 238, 0.15)',
        glow: '0 0 40px rgba(34, 211, 238, 0.25)',
      },
      animation: {
        'drift-slow': 'drift 22s ease-in-out infinite',
        'drift-slower': 'drift 30s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 25px) scale(0.97)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.03)' },
        },
      },
    },
  },
  plugins: [],
}
