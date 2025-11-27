import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      neoSansProRegular: ['var(--font-regular)'],
      neoSansProBlack: ['var(--font-black)'],
      neoSansProBlackItalic: ['var(--font-black-italic)'],
      neoSansProBold: ['var(--font-bold)'],
      neoSansProBoldItalic: ['var(--font-bold-italic)'],
      neoSansProItalic: ['var(--font-italic)'],
      neoSansProLight: ['var(--font-light)'],
      neoSansProLightItalic: ['var(--font-light-italic)'],
      neoSansProMedium: ['var(--font-medium)'],
      neoSansProMediumItalic: ['var(--font-medium-italic)'],
      neoSansProUltra: ['var(--font-ultra)'],
      neoSansProUltraItalic: ['var(--font-ultra-italic)'],
    },
    extend: {
      spacing: {
        18: '4.5rem',
        navbarHeight: 'var(--navbar-height)',
        navbarHeightBig: 'var(--navbar-height-big)',
      },
      boxShadow: {
        'navbar-bottom': '0px -5px 4px rgba(121, 121, 121, 0.10)',
      },
      borderRadius: {
        'navbar-bottom': '25px 25px 0px 0px',
      },
    },
  },
  plugins: [],
}

export default config
