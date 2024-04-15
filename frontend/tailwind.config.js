/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'], // Using Open Sans as the default sans-serif font
        raleway: ['Raleway', 'sans-serif'], // Adding Raleway font
        roboto: ['Roboto', 'sans-serif'], // Adding Roboto font
        slab: ['Roboto Slab', 'serif'], // Adding Roboto Slab font
      },
    },
  },
  plugins: [],
}

