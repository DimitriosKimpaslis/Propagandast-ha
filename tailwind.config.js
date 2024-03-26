/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "fira": ["Fira Sans", "sans-serif"],
        "unna": ["Unna", "serif"],
      },
      colors: {
        'dark-gray': '#202020',
        'light-white': '#FFFFF7',
        'pink': 'rgb(252 165 165)'
      },
    },
    plugins: [],
  }
}

