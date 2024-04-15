/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
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
  plugins: [
    flowbite.plugin(),
  ],
}

