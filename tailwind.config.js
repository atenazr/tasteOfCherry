/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/components/singleMovie.vue',
    './src/pages/theHome.vue',
    './public/**/*.html', './src/**/*.vue'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/aspect-ratio'),
  ],
}
