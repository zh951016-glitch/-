/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          200: '#8bdcff',
          300: '#55c5ff',
          400: '#27a0ff',
          500: '#087ee8',
          600: '#075fbe',
        },
      },
      boxShadow: {
        neon: '0 0 34px rgba(39, 160, 255, 0.22)',
      },
    },
  },
  plugins: [],
}
