/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      tablet: '640px',
      desktop: '1024px',
      lgDesktop: '1200px',
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      light: '#d0dbdd',
      sand: '#e0c2a0',
      blue: '#98c0d9',
      fuchsia: '#b76ca4',
      dark: '#293241',
      mint: '#9adbba',
      papaya: '#ffa266',
      coral: '#ff6f61',
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
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
