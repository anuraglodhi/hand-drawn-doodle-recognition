/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      boxShadow: {
        'mid': '0 0 50px 0 rgba(255, 255, 255, 0.5)',
      },
      cursor: {
        pen: "url('/pencil.svg'), default",
      }
    },
  },
  plugins: [],
}

