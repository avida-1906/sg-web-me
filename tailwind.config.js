/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  corePlugins: false,
  theme: {
    extend: {
      colors: {
        'tg-primary': 'var(--tg-primary-main)',
      },
      spacing: Array.from({ length: 2000 }, (_, i) => `${i}px`),
      containers: {
        lg: '1000px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}
