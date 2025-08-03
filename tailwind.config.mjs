/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Merriweather', 'Georgia', 'serif'],
      },
      colors: {
        'warm': {
          50: '#fefdfb',
          100: '#fcf8f3',
          200: '#f9f0e7',
          300: '#f4e5d3',
          400: '#ead5b8',
          500: '#dcc094',
          600: '#c9a66b',
          700: '#b18a4a',
          800: '#8f6d37',
          900: '#6d5228',
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}