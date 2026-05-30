/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        dark: '#0C0C0C',
        rose: { DEFAULT: '#C9739A', lt: '#E8A0BF' },
        lav: '#D8B4D8',
        mauve: '#9B6BA8',
        txt: '#D7E2EA',
        muted: '#9E9EAA',
      },
    },
  },
  plugins: [],
}
