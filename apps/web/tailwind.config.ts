import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        colors: {
            'dmg-light': '#1d63cc',
            'dmg-dark': '#0c1560',
            'dmg-sidebar-bg': '#141f7a',
            'dmg-sidebar-item': '#1d63cc',
        },
        boxShadow: {
            'dmg': '0 35px 60px -15px rgba(0, 0, 0, 0.1)',
        },
    }
  },
  plugins: [],
}
export default config
