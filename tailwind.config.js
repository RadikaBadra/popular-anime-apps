module.exports = {
  content: [
    "./index.html",
    "./src/**/*",
  ],
  theme: {
    extend: {
      spacing: {
        'almost': '90%',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}