/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F4F1E3',
        green: {
          deep: '#526C35',
          mid: '#638C46',
          light: '#B1CD82',
        },
        pink: {
          hot: '#F258B0',
          soft: '#DE73B1',
          pale: '#FFA2D9',
        },
      },
      fontFamily: {
        serif: ['"Fraunces"', '"Playfair Display"', 'serif'],
        sans: ['"Outfit"', '"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'aura': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
