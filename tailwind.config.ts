import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        anuphan: ['var(--font-anuphan)'],
        'cloud-soft': ['var(--font-cloud-soft)'],
      },
    },
  },
}

export default config
