/** @type {import('tailwindcss').Config} */
const konstaConfig = require('konsta/config')
module.exports = konstaConfig({
  konsta: {
    colors: {
      primary: '#9b1553',
      'brand-primary': '#007aff',
      'brand-red': '#ff3b30',
      'brand-green': '#4cd964',
      'brand-yellow': '#ffcc00',
      'brand-purple': '#9c27b0',
      'brand-blue': '#2196f3'
    }
  },
  content: ['./index.html', './src/**/*.{vue,js,ts,md}'],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: []
})
