/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        sans:  ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        forest: {
          50:'#f2f7f2',100:'#e0ede0',200:'#c2dbc2',300:'#96c196',
          400:'#63a163',500:'#3d7f3d',600:'#2d6630',700:'#245227',
          800:'#1e421f',900:'#18361a',950:'#0c1e0d',
        },
        earth: {
          50:'#fdf8f1',100:'#f9eddb',200:'#f2d9b5',300:'#e8be85',
          400:'#dc9e53',500:'#d28332',600:'#c36b24',700:'#a25220',
          800:'#834222',900:'#6b381f',950:'#3a1b0e',
        },
        cream: '#faf6ef',
      },
    },
  },
  plugins: [],
}
