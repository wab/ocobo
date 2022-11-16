/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      light: '#d0dbdd',
      blue: '#98c0d9',
      dark: '#293241',
      mint: '#9adbba',
      papaya: '#ffa266',
      coral: '#ff6f61',
    },
    fontFamily: {
      sans: ['Arial', 'sans-serif'],
      title: ['Montserrat Alternates', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        texture: "url('/texture.svg')",
      },
    },
  },
  plugins: [],
};
