import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        goodiiz: {
          green: '#143D28',
          'green-dark': '#0B2417',
          'green-light': '#215A3B',
          'green-emerald': '#10B981',
          'green-sage': '#6B8E23',
          gold: '#C88E3E',
          'gold-dark': '#A97026',
          'gold-light': '#E8B974',
          cream: '#FAF6EE',
          'cream-light': '#FFFDF9',
          'cream-dark': '#EFE7D8',
          brown: '#4A3528',
          'brown-light': '#7A5B46',
          'earth-clay': '#9C5B38',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(20, 61, 40, 0.08)',
        'card-hover': '0 12px 30px -4px rgba(20, 61, 40, 0.16)',
        'glow-gold': '0 0 25px rgba(200, 142, 62, 0.35)',
        'glow-green': '0 0 25px rgba(20, 61, 40, 0.25)',
      },
      backgroundImage: {
        'agro-radial': 'radial-gradient(circle at top right, rgba(200,142,62,0.12), transparent 60%)',
        'agro-mesh': 'radial-gradient(at 0% 0%, rgba(20,61,40,0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(200,142,62,0.08) 0px, transparent 50%)',
      }
    },
  },
  plugins: [],
}
export default config

